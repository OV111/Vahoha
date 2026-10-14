import process from "node:process";
import crypto from "node:crypto";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { sendPasswordResetEmail, sendLoginLinkEmail } from "../../../utils/emailService.js";
import connectDB from "../../../config/db.js";
import { verifyToken, verifyRefreshToken } from "../../../utils/jwtToken.js";
import {
  issueTokenPair,
  rotateRefreshToken,
  revokeRefreshToken,
  revokeAllRefreshTokens,
} from "../services/refreshTokenService.js";
import { OAuth2Client } from "google-auth-library";
import { sanitizeUsername } from "../../../utils/username.js";
import { trackEvent, trackActiveDay } from "../../../services/eventService.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const REFRESH_COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days — matches REFRESH_TOKEN_TTL_MS

// Single source of truth for refresh-cookie options — auth.routes.js reuses
// this for the initial login/signup cookie and for clearing it on logout,
// so the flags can never drift between "set" and "clear".
export const REFRESH_COOKIE_NAME = "refreshToken";
// SameSite=None requires Secure on every modern browser — there is no
// "insecure None" mode, so this cannot be conditional on NODE_ENV the way
// the old `secure: false` session cookie was. Chrome/Edge treat
// http://localhost as a secure context, so `Secure` cookies still work in
// local dev; this does NOT work over a plain http:// LAN/tunnel URL.
export const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
};

const setRefreshCookie = (res, refreshToken) => {
  res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
    ...REFRESH_COOKIE_OPTIONS,
    maxAge: REFRESH_COOKIE_MAX_AGE_MS,
  });
};

// In-memory CSRF nonce store for the GitHub OAuth redirect round-trip.
// Doubles as the identity carrier for "link GitHub to my existing account":
// linkUserId is set only when the redirect was initiated by an already
// logged-in user (proven via their refresh cookie, not a client-supplied
// token) — this replaces putting a JWT in the query string / state param.
// Use Redis in production for multi-instance deployments.
const pendingOAuthNonces = new Map();
const NONCE_TTL_MS = 10 * 60 * 1000; // 10 minutes

const createOAuthNonce = (linkUserId = null) => {
  const nonce = crypto.randomBytes(16).toString("hex");
  pendingOAuthNonces.set(nonce, { expiresAt: Date.now() + NONCE_TTL_MS, linkUserId });
  return nonce;
};

/** Returns the nonce record ({ linkUserId }) if valid, or null. */
const consumeOAuthNonce = (nonce) => {
  if (!nonce) return null;
  const record = pendingOAuthNonces.get(nonce);
  pendingOAuthNonces.delete(nonce);
  if (!record || Date.now() > record.expiresAt) return null;
  return record;
};

const findUniqueUsername = async (users, base) => {
  if (!(await users.findOne({ username: base }))) return base;
  let i = 1;
  while (await users.findOne({ username: `${base}${i}` })) i++;
  return `${base}${i}`;
};

const MAX_USERNAME_TRIES = 25;
const isDuplicateKey = (err, field) => err?.code === 11000 && Boolean(err.keyPattern?.[field]);

/**
 * Insert a new user with a free username. findUniqueUsername alone is a
 * check-then-insert race: concurrent signups can all see the same name as
 * free. The unique index on users.username (config/db.js) is the real guard;
 * the loser of a race gets a duplicate-key error, picks the next free name and
 * tries again. A duplicate email is not retried: the caller reports it.
 */
const insertUser = async (users, doc, baseUsername) => {
  for (let attempt = 0; attempt < MAX_USERNAME_TRIES; attempt++) {
    const username = await findUniqueUsername(users, baseUsername);
    try {
      const result = await users.insertOne({ ...doc, username });
      return { insertedId: result.insertedId, username };
    } catch (err) {
      if (!isDuplicateKey(err, "username")) throw err;
    }
  }
  throw new Error("Could not find a free username");
};

const hashPassword = async (password) => {
  const saltRounds = 13;
  const hashedPasswd = await bcrypt.hash(password, saltRounds);
  return hashedPasswd;
};
const verifyPassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

const buildDefaultUserStats = (userId) => ({
  userId,
  followersCount: 0,
  followingsCount: 0,
  postsCount: 0,
  bio: "",
  githubLink: "",
  linkedinLink: "",
  twitterLink: "",
  location: "",
  profileImage: "",
  bannerImage: "",
  // likesReceived: 0,
  // commentsCount: 0,
  // badges: [],
  // devs-coins: null || 0,
  lastActive: new Date(),
});

const signUp = async (data) => {
  try {
    let db = await connectDB();
    const { firstName, lastName, email, password, username } = data;

    const users = db.collection("users");
    const usersStats = db.collection("usersStats");

    const existedUser = await users.findOne({ email });
    if (existedUser) {
      return {
        status: 409,
        message: "User with that Email already registered",
      };
    }

    const baseUsername =
      sanitizeUsername(username) ||
      sanitizeUsername(`${firstName}${lastName}`) ||
      "dev";
    let result;
    try {
      result = await insertUser(
        users,
        { firstName, lastName, email, password: await hashPassword(password) },
        baseUsername,
      );
    } catch (err) {
      // Lost a race with a concurrent signup for the same email: same answer
      // as the findOne check above.
      if (isDuplicateKey(err, "email")) {
        return { status: 409, message: "User with that Email already registered" };
      }
      throw err;
    }
    // here also insert userStats (with default starting values )
    await usersStats.insertOne(buildDefaultUserStats(result.insertedId));
    await trackEvent(db, result.insertedId, "signup", { provider: "email" });
    await trackActiveDay(db, result.insertedId);

    const { accessToken, refreshToken } = await issueTokenPair(db, result.insertedId);

    return {
      status: 201,
      message: "Account created Successfully",
      accessToken,
      refreshToken,
    };
  } catch (err) {
    console.error(err);
    return { code: 500, message: "Sign Up failed", error: err.message };
  }
};

const login = async (data) => {
  let db = await connectDB();
  const { email, password } = data;
  const users = db.collection("users");
  const usersStats = db.collection("usersStats");
  const user = await users.findOne({ email });
  // const decoded = verifyToken(localStorage.getItem("JWT"))
  // if !decoded return 403 forbidden

  // An account created with Google has no password to check. Telling the
  // person so is what lets them recover: "Invalid email or password" sends them
  // round in circles typing a password that was never set. It does confirm the
  // email is registered, but signUp already answers 409 for a taken email, so
  // nothing new is revealed. "No such user" and "wrong password" still share
  // one generic message.
  if (user && !user.password) {
    return {
      status: 401,
      code: "GOOGLE_ONLY",
      message:
        "This account was created with Google. Continue with Google, or use Forgot password to add a password.",
    };
  }

  const isMatch = user?.password
    ? await verifyPassword(password, user.password)
    : false;
  if (!isMatch) {
    return {
      status: 401,
      message: "Invalid email or password",
    };
  }
  const defaultStatsOnInsert = buildDefaultUserStats(user._id);
  delete defaultStatsOnInsert.lastActive;
  await usersStats.updateOne(
    { userId: user._id },
    {
      $setOnInsert: defaultStatsOnInsert,
      $set: { lastActive: new Date() },
    },
    { upsert: true },
  );
  await trackActiveDay(db, user._id);
  const { accessToken, refreshToken } = await issueTokenPair(db, user._id);
  return {
    status: 200,
    message: "Login Successful",
    accessToken,
    refreshToken,
    userId: user._id,
  };
};

const googleAuth = async (data) => {
  try {
    const db = await connectDB();
    const users = db.collection("users");
    const usersStats = db.collection("usersStats");
    const { tokenId } = data; // this maybe tokenId from front i need to check
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, given_name, family_name, sub: googleId, email_verified } = payload;
    // An unverified Google email must not be trusted to match (or create) an
    // account that owns that address.
    if (!email || !email_verified) {
      return { status: 401, message: "Google email is not verified" };
    }

    let user = await users.findOne({ email });
    if (!user) {
      const baseUsername =
        sanitizeUsername(given_name) ||
        sanitizeUsername(`${given_name}${family_name}`) ||
        "dev";
      const result = await insertUser(
        users,
        { firstName: given_name, lastName: family_name, email, password: null, googleId, provider: "google" },
        baseUsername,
      );
      await usersStats.insertOne(buildDefaultUserStats(result.insertedId));
      await trackEvent(db, result.insertedId, "signup", { provider: "google" });
      user = await users.findOne({ _id: result.insertedId });
    }
    await trackActiveDay(db, user._id);

    const { accessToken, refreshToken } = await issueTokenPair(db, user._id);
    return {
      status: 200,
      message: "Google Authentication Successful",
      accessToken,
      refreshToken,
      userId: user._id,
    };
  } catch {
    return {
      status: 500,
      message: "Google Authentication Failed",
    };
  }
};

const githubRedirect = (req, res) => {
  const nonce = createOAuthNonce();
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user:email&state=${nonce}`;
  res.redirect(url);
};

const githubLinkRedirect = (req, res) => {
  // Identity comes from the httpOnly refresh cookie (sent automatically on
  // this same-site top-level navigation) — never from a client-supplied
  // token in the URL, which would leak into logs/history/Referer headers.
  const decoded = verifyRefreshToken(req.cookies?.refreshToken);
  if (!decoded) {
    return res.redirect(`${process.env.FRONTEND_URL}/oauth-failure?reason=unauthenticated`);
  }

  const nonce = createOAuthNonce(decoded.id);
  const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user:email&state=${nonce}`;
  res.redirect(url);
};

const githubDisconnect = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const verified = verifyToken(token);
    if (!verified) return res.status(401).json({ message: "Unauthorized" });

    const db = await connectDB();
    const users = db.collection("users");
    await users.updateOne(
      { _id: new ObjectId(verified.id) },
      { $unset: { githubId: "", githubLogin: "" } },
    );
    res.json({ message: "GitHub disconnected" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const githubCallback = async (req, res) => {
  try {
    const { code, state } = req.query;
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      },
    );

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userData = await userRes.json();
    const emailRes = await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const emailData = await emailRes.json();

    // A failed code exchange (bad/denied/expired code) returns no access_token
    // and no user id. Bail out before the lookup below: with githubId
    // undefined it would match any user that has no githubId.
    if (!accessToken || !userData?.id) {
      return res.redirect(`${process.env.FRONTEND_URL}/oauth-failure?reason=exchange`);
    }

    const emails = Array.isArray(emailData) ? emailData : [];

    const primaryEmail =
      emails.find((e) => e.primary && e.verified)?.email || null;
    const { id: githubId, login: githubLogin } = userData;

    const db = await connectDB();
    const users = db.collection("users");
    const usersStats = db.collection("usersStats");

    // state is always a nonce from createOAuthNonce — link mode and sign-in
    // mode differ only in whether that nonce carries a linkUserId (proven
    // earlier via the requester's own refresh cookie in githubLinkRedirect).
    const nonceRecord = consumeOAuthNonce(state);
    if (!nonceRecord) {
      return res.redirect(`${process.env.FRONTEND_URL}/oauth-failure?reason=csrf`);
    }

    if (nonceRecord.linkUserId) {
      await users.updateOne(
        { _id: new ObjectId(nonceRecord.linkUserId) },
        { $set: { githubId, githubLogin } },
      );
      setRefreshCookie(res, (await issueTokenPair(db, nonceRecord.linkUserId)).refreshToken);
      return res.redirect(`${process.env.FRONTEND_URL}/oauth-success?linked=github`);
    }

    // Sign-in mode
    // Only match by email when GitHub gave us a verified one: `{ email: null }`
    // matches every user that has no email, which would log this GitHub user
    // in as somebody else.
    const matchers = [{ githubId }];
    if (primaryEmail) matchers.push({ email: primaryEmail.toLowerCase() });
    let user = await users.findOne({ $or: matchers });
    if (!user) {
      const baseUsername = sanitizeUsername(githubLogin) || "dev";
      const result = await insertUser(
        users,
        {
          email: primaryEmail ? primaryEmail.toLowerCase() : null,
          githubId,
          githubLogin,
          provider: "github",
          password: null,
        },
        baseUsername,
      );
      await usersStats.insertOne(buildDefaultUserStats(result.insertedId));
      await trackEvent(db, result.insertedId, "signup", { provider: "github" });
      user = { _id: result.insertedId };
    }
    await trackActiveDay(db, user._id);
    const { refreshToken } = await issueTokenPair(db, user._id);
    setRefreshCookie(res, refreshToken);
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success`);
  } catch (err) {
    console.error(err);
    res.redirect(`${process.env.FRONTEND_URL}/oauth-failure`);
  }
};

const RESET_TOKEN_TTL_MINUTES = 60;
// One answer whether or not the email is registered (and whether or not the
// email actually went out), so this endpoint can't be used to probe for accounts.
const RESET_SENT = {
  status: 200,
  message: "If that email has an account, a reset link is on its way.",
};

// Only the SHA-256 of a token is stored: a leaked DB dump can't be used to
// reset anyone's password. sha256 (not bcrypt) is fine here because the token
// is 256 random bits, not a guessable human password.
const hashResetToken = (raw) => crypto.createHash("sha256").update(raw).digest("hex");

// `email` arrives trimmed + lowercased by forgotPasswordSchema.
const forgotPassword = async ({ email }) => {
  try {
    const db = await connectDB();
    const user = await db.collection("users").findOne({ email });
    if (!user) return RESET_SENT;

    const passwordResets = db.collection("passwordResets");
    // A new link replaces any older one, so only the latest email works.
    await passwordResets.deleteMany({ userId: user._id });

    const rawToken = crypto.randomBytes(32).toString("hex");
    await passwordResets.insertOne({
      userId: user._id,
      tokenHash: hashResetToken(rawToken),
      expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MINUTES * 60 * 1000),
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;
    try {
      await sendPasswordResetEmail(email, {
        resetUrl,
        firstName: user.firstName,
        expiresInMinutes: RESET_TOKEN_TTL_MINUTES,
      });
    } catch (err) {
      // The user still gets the generic answer (see RESET_SENT), so the failure
      // has to be loud here instead. The token is useless without the email.
      console.error("[password-reset] email failed for user", String(user._id), "-", err.message);
      await passwordResets.deleteMany({ userId: user._id });
    }
    return RESET_SENT;
  } catch (err) {
    console.error("[password-reset] forgotPassword failed:", err);
    return { status: 500, message: "Something went wrong. Please try again." };
  }
};

// `token` (64 hex chars) and `newPassword` (signup policy) are already
// validated by resetPasswordSchema.
const resetPassword = async ({ token, newPassword }) => {
  try {
    const db = await connectDB();
    // findOneAndDelete is atomic: find + consume in one step, so two requests
    // racing with the same link can't both succeed. The expiry check is part
    // of the query for the same reason.
    const record = await db.collection("passwordResets").findOneAndDelete({
      tokenHash: hashResetToken(token),
      expiresAt: { $gt: new Date() },
    });
    if (!record) {
      return { status: 400, message: "Reset link is invalid or has expired." };
    }

    await db.collection("users").updateOne(
      { _id: record.userId },
      { $set: { password: await hashPassword(newPassword) } },
    );
    // A password reset means the user believes their credentials — or an
    // active session — may be compromised. Kill every outstanding refresh
    // token so a stolen one stops working immediately instead of surviving
    // up to its remaining lifetime.
    await revokeAllRefreshTokens(db, record.userId);
    return { status: 200, message: "Password updated. You can sign in now." };
  } catch (err) {
    console.error("[password-reset] resetPassword failed:", err);
    return { status: 500, message: "Something went wrong. Please try again." };
  }
};

const LOGIN_LINK_TTL_MINUTES = 10;
// Sending is the abusable action (it emails a stranger), so a second request
// for the same address inside this window is answered but not sent again.
const LOGIN_LINK_COOLDOWN_MS = 60 * 1000;
// The same answer whether the address has an account, is new, was just emailed,
// or the send failed, so this endpoint can't be used to probe for accounts.
const LOGIN_LINK_SENT = {
  status: 200,
  message: "If that email can sign in, a link is on its way. Check your inbox.",
};

// `email` arrives trimmed + lowercased by loginLinkRequestSchema.
const requestLoginLink = async ({ email }) => {
  try {
    const db = await connectDB();
    const loginLinks = db.collection("loginLinks");

    const recent = await loginLinks.findOne({
      email,
      createdAt: { $gt: new Date(Date.now() - LOGIN_LINK_COOLDOWN_MS) },
    });
    if (recent) return LOGIN_LINK_SENT;

    // A new link replaces any older one, so only the latest email works.
    await loginLinks.deleteMany({ email });

    const rawToken = crypto.randomBytes(32).toString("hex");
    await loginLinks.insertOne({
      email,
      tokenHash: hashResetToken(rawToken),
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + LOGIN_LINK_TTL_MINUTES * 60 * 1000),
    });

    // The link opens a page with a "Confirm sign in" button (the frontend then
    // POSTs the token), so a mail scanner that GETs the URL cannot use it up.
    const loginUrl = `${process.env.FRONTEND_URL}/login-link?token=${rawToken}`;
    try {
      await sendLoginLinkEmail(email, { loginUrl, expiresInMinutes: LOGIN_LINK_TTL_MINUTES });
    } catch (err) {
      console.error("[login-link] email failed:", err.message);
    }
    return LOGIN_LINK_SENT;
  } catch (err) {
    console.error("[login-link] requestLoginLink failed:", err);
    return { status: 500, message: "Something went wrong. Please try again." };
  }
};

/**
 * Consumes a magic link and signs the person in, creating the account if the
 * email is new. The account is created here, not when the link is requested,
 * so requesting links for other people's addresses leaves nothing behind.
 * Clicking the link proves the address is theirs, which is why no password
 * or separate verification step is needed.
 */
const confirmLoginLink = async ({ token }) => {
  try {
    const db = await connectDB();
    // findOneAndDelete is atomic: two requests racing with the same link can't
    // both succeed. The expiry check is part of the query for the same reason.
    const record = await db.collection("loginLinks").findOneAndDelete({
      tokenHash: hashResetToken(token),
      expiresAt: { $gt: new Date() },
    });
    if (!record) {
      return {
        status: 400,
        message: "This sign-in link is invalid or has expired. Request a new one.",
      };
    }

    const users = db.collection("users");
    const usersStats = db.collection("usersStats");
    const { email } = record;

    let user = await users.findOne({ email });
    let isNewUser = false;
    if (!user) {
      try {
        const result = await insertUser(
          users,
          {
            firstName: "",
            lastName: "",
            email,
            password: null,
            provider: "email-link",
            emailVerified: true,
          },
          sanitizeUsername(email.split("@")[0]) || "dev",
        );
        await usersStats.insertOne(buildDefaultUserStats(result.insertedId));
        await trackEvent(db, result.insertedId, "signup", { provider: "email-link" });
        user = { _id: result.insertedId };
        isNewUser = true;
      } catch (err) {
        // Lost a race with another signup for this email: sign in to that one.
        if (!isDuplicateKey(err, "email")) throw err;
        user = await users.findOne({ email });
      }
    }

    await trackActiveDay(db, user._id);
    const { accessToken, refreshToken } = await issueTokenPair(db, user._id);
    return {
      status: 200,
      message: isNewUser ? "Account created" : "Signed in",
      accessToken,
      refreshToken,
      userId: user._id,
      isNewUser,
    };
  } catch (err) {
    console.error("[login-link] confirmLoginLink failed:", err);
    return { status: 500, message: "Something went wrong. Please try again." };
  }
};

/**
 * Exchanges a valid, unused refresh token (from the httpOnly cookie) for a
 * new access + refresh token pair, rotating the refresh token in the
 * process. Route handler is responsible for reading/writing the cookie.
 */
const refreshAccessToken = async (refreshTokenValue) => {
  const decoded = verifyRefreshToken(refreshTokenValue);
  if (!decoded) return { status: 401, message: "Invalid or expired refresh token" };

  const db = await connectDB();
  const pair = await rotateRefreshToken(db, decoded.id, decoded.jti);
  if (!pair) return { status: 401, message: "Refresh token was already used or revoked" };

  // Refresh runs on app load and every ~15 min of use, so it doubles as the
  // "came back today" signal; trackActiveDay dedupes to one row per day.
  await trackActiveDay(db, decoded.id);

  return { status: 200, accessToken: pair.accessToken, refreshToken: pair.refreshToken };
};

/** Revokes the refresh token tied to the presented cookie, if any. */
const logoutUser = async (refreshTokenValue) => {
  if (!refreshTokenValue) return { status: 200, message: "Logged out successfully" };

  const decoded = verifyRefreshToken(refreshTokenValue);
  if (decoded) {
    const db = await connectDB();
    await revokeRefreshToken(db, decoded.jti);
  }
  return { status: 200, message: "Logged out successfully" };
};

export {
  signUp,
  login,
  refreshAccessToken,
  logoutUser,
  setRefreshCookie,
  googleAuth,
  githubRedirect,
  githubLinkRedirect,
  githubDisconnect,
  githubCallback,
  forgotPassword,
  resetPassword,
  requestLoginLink,
  confirmLoginLink,
};
