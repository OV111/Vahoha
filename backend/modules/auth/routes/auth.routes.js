import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  signUp,
  login,
  refreshAccessToken,
  logoutUser,
  setRefreshCookie,
  REFRESH_COOKIE_NAME,
  REFRESH_COOKIE_OPTIONS,
  googleAuth,
  githubRedirect,
  githubLinkRedirect,
  githubDisconnect,
  githubCallback,
  forgotPassword,
  resetPassword,
  requestLoginLink,
  confirmLoginLink,
  RESET_SENT,
  LOGIN_LINK_SENT,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../../../utils/jwtToken.js";
import { attemptLimiter } from "../../../utils/attemptLimiter.js";
import { loginRules, signupRule, rejectIfLocked, capEmailsPerAddress } from "../../../middleware/authThrottle.js";
import { validate } from "../../../middleware/validate.js";
import {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  loginLinkRequestSchema,
  loginLinkConfirmSchema,
} from "../schemas/auth.schemas.js";

// Sends the controller's result as JSON but strips the refresh token first —
// it must only ever leave the server as the httpOnly cookie already set by
// the caller, never in a body a script on the page could read.
const respondWithoutRefreshToken = (res, result) => {
  // eslint-disable-next-line no-unused-vars -- intentionally discarded
  const { refreshToken, ...safeResult } = result;
  res.status(result.status ?? result.code ?? 500).json(safeResult);
};

const router = Router();

// Two limiters, not one shared one: a shared counter meant a few "send link"
// clicks could lock someone out of actually using the link.
// Sending is the abusable action (it emails someone), so it is the tighter one.
const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many reset emails requested. Try again in an hour.", code: 429 },
});
// Guessing a 256-bit token is hopeless, so this only stops hammering; it leaves
// room for someone retyping a password that failed the policy.
const resetPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many attempts. Try again in a few minutes.", code: 429 },
});

// Per IP; the per-email cooldown lives in requestLoginLink. Confirming is a
// 256-bit token guess, so its limiter only stops hammering.
const loginLinkRequestLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many sign-in links requested. Try again in an hour.", code: 429 },
});
const loginLinkConfirmLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many attempts. Try again in a few minutes.", code: 429 },
});

// Sending a reset or sign-in email is capped per address too (the limiters above are per IP).
const forgotPasswordPerEmail = capEmailsPerAddress({ scope: "forgot:email", limit: 3, windowSec: 60 * 60, answer: RESET_SENT });
const loginLinkPerEmail = capEmailsPerAddress({ scope: "login-link:email", limit: 5, windowSec: 60 * 60, answer: LOGIN_LINK_SENT });

/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: Authentication and session management
 */

/**
 * @openapi
 * /accept-cookies:
 *   post:
 *     tags: [Auth]
 *     summary: Accept cookies consent
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               accepted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Cookies accepted
 *       400:
 *         description: Bad request
 */
router.post("/accept-cookies", (req, res) => {
  const { accepted } = req.body;
  if (accepted) {
    res.cookie("cookiesAccepted", "true", {
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 365 * 1000,
      path: "/",
    });
    return res.status(200).json({ message: "Cookies Accepted", code: 200 });
  }
  res.status(400).json({ message: "Bad Request" });
});

/**
 * @openapi
 * /get-started:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email, password]
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: Email already in use
 *       500:
 *         description: Server error
 */
router.post("/get-started", validate({ body: signupSchema }), async (req, res) => {
  try {
    const rule = signupRule(req);
    if (await rejectIfLocked(res, [rule], "Too many sign-up attempts.")) return;
    const result = await signUp(req.body);
    if (result.status !== 201) {
      await attemptLimiter.recordFailure([rule]);
    } else {
      setRefreshCookie(res, result.refreshToken);
    }
    respondWithoutRefreshToken(res, result);
  } catch {
    res
      .status(500)
      .json({ message: "Server Error.", code: 500 });
  }
});

/**
 * @openapi
 * /login:
 *   post:
 *     tags: [Auth]
 *     summary: Login with email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       401:
 *         description: Invalid credentials
 *       429:
 *         description: Too many failed attempts
 */
router.post("/login", validate({ body: loginSchema }), async (req, res) => {
  try {
    const { pair, ip, account } = loginRules(req);
    if (await rejectIfLocked(res, [pair, ip, account], "Too many login attempts.")) return;

    const result = await login(req.body);

    if (result.status === 200) {
      // Only the account+IP counter: clearing the IP's would let an attacker reset
      // their own budget by logging in to an account they own.
      await attemptLimiter.clear([pair]);
      setRefreshCookie(res, result.refreshToken);
    } else if (result.status === 401) {
      await attemptLimiter.recordFailure([pair, ip, account]);
    }

    respondWithoutRefreshToken(res, result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server Error.", code: 500, error: err.message });
  }
});

/**
 * @openapi
 * /log-out:
 *   delete:
 *     tags: [Auth]
 *     summary: Logout — revokes the refresh token and clears the cookie
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.delete("/log-out", async (req, res) => {
  try {
    await logoutUser(req.cookies?.[REFRESH_COOKIE_NAME]);
    res.clearCookie(REFRESH_COOKIE_NAME, REFRESH_COOKIE_OPTIONS);
    res.status(200).json({ message: "Logged out succesfully", code: 200 });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Logout Error", code: 500, error: err.message });
  }
});

/**
 * @openapi
 * /refresh:
 *   post:
 *     tags: [Auth]
 *     summary: Exchange the refresh cookie for a new short-lived access token
 *     responses:
 *       200:
 *         description: Returns a new access token
 *       204:
 *         description: No refresh cookie, so the visitor is simply logged out
 *       401:
 *         description: Invalid, expired, or already-used refresh token
 */
router.post("/refresh", async (req, res) => {
  const refreshTokenValue = req.cookies?.[REFRESH_COOKIE_NAME];
  // No cookie is the normal state for a guest, not an error. The app calls this
  // on every page load, so a 401 here put a red error in every guest's console.
  // 401 stays for a cookie that is present but bad.
  if (!refreshTokenValue) {
    return res.status(204).end();
  }

  const result = await refreshAccessToken(refreshTokenValue);
  if (result.status !== 200) {
    // Refresh token was invalid/expired/reused — clear it so the client
    // doesn't keep retrying with a cookie that will never work again.
    res.clearCookie(REFRESH_COOKIE_NAME, REFRESH_COOKIE_OPTIONS);
    return res.status(result.status).json({ message: result.message, code: result.status });
  }

  setRefreshCookie(res, result.refreshToken);
  res.status(200).json({ accessToken: result.accessToken });
});

/**
 * @openapi
 * /verify-token:
 *   get:
 *     tags: [Auth]
 *     summary: Verify if a JWT token is valid
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Returns valid true/false
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 */
router.get("/verify-token", (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const isValid = verifyToken(token);
  res.status(200).json({ valid: !!isValid });
});

/**
 * @openapi
 * /google/auth:
 *   post:
 *     tags: [Auth]
 *     summary: Authenticate with Google OAuth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               credential:
 *                 type: string
 *                 description: Google ID token
 *     responses:
 *       200:
 *         description: Authentication successful
 *       500:
 *         description: Google auth error
 */
router.post("/google/auth", async (req, res) => {
  try {
    const result = await googleAuth(req.body);
    if (result.status === 200) {
      setRefreshCookie(res, result.refreshToken);
    }
    respondWithoutRefreshToken(res, result);
  } catch (err) {
    res.status(500).json({
      message: "Google Authentication Error",
      code: 500,
      error: err.message,
    });
  }
});

/**
 * @openapi
 * /auth/github:
 *   get:
 *     tags: [Auth]
 *     summary: Redirect to GitHub OAuth
 *     responses:
 *       302:
 *         description: Redirects to GitHub
 * /auth/github/link:
 *   get:
 *     tags: [Auth]
 *     summary: Link GitHub account to existing user
 *     responses:
 *       302:
 *         description: Redirects to GitHub
 * /auth/github/disconnect:
 *   delete:
 *     tags: [Auth]
 *     summary: Disconnect GitHub from account
 *     responses:
 *       200:
 *         description: GitHub disconnected
 * /auth/github/callback:
 *   get:
 *     tags: [Auth]
 *     summary: GitHub OAuth callback
 *     responses:
 *       302:
 *         description: Redirects to frontend
 */
router.get("/auth/github", githubRedirect);
router.get("/auth/github/link", githubLinkRedirect);
router.delete("/auth/github/disconnect", githubDisconnect);
router.get("/auth/github/callback", githubCallback);
router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  validate({ body: forgotPasswordSchema }),
  forgotPasswordPerEmail,
  async (req, res) => {
    const result = await forgotPassword(req.body);
    res.status(result.status).json(result);
  },
);
router.post(
  "/reset-password",
  resetPasswordLimiter,
  validate({ body: resetPasswordSchema }),
  async (req, res) => {
    const result = await resetPassword(req.body);
    res.status(result.status).json(result);
  },
);

/**
 * @openapi
 * /login-link:
 *   post:
 *     tags: [Auth]
 *     summary: Email a one-time sign-in link (creates the account on first use)
 *     responses:
 *       200:
 *         description: Always the same answer, whether or not the email has an account
 *       429:
 *         description: Too many links requested
 */
router.post(
  "/login-link",
  loginLinkRequestLimiter,
  validate({ body: loginLinkRequestSchema }),
  loginLinkPerEmail,
  async (req, res) => {
    const result = await requestLoginLink(req.body);
    res.status(result.status).json(result);
  },
);

/**
 * @openapi
 * /login-link/confirm:
 *   post:
 *     tags: [Auth]
 *     summary: Exchange a sign-in link token for a session
 *     responses:
 *       200:
 *         description: Signed in; sets the refresh cookie
 *       400:
 *         description: Link invalid, expired, or already used
 */
router.post(
  "/login-link/confirm",
  loginLinkConfirmLimiter,
  validate({ body: loginLinkConfirmSchema }),
  async (req, res) => {
    const result = await confirmLoginLink(req.body);
    if (result.status === 200) setRefreshCookie(res, result.refreshToken);
    respondWithoutRefreshToken(res, result);
  },
);

export default router;
