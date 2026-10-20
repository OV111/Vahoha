import { revokeAllRefreshTokens } from "./refreshTokenService.js";

/**
 * A provider (Google, GitHub) has just verified that the person signing in owns
 * `user.email`. If that email was already registered with a password and never
 * verified, the password may belong to whoever registered first, not to the
 * owner of the inbox (pre-account hijack: the attacker signs up with a
 * victim's address, waits, and the victim later signs in with Google and lands
 * in the attacker's account).
 *
 * So the first verified sign-in claims the account: the unverified password is
 * wiped, every existing session is revoked, and the account is marked
 * verified. The real owner can set a new password with "forgot password".
 *
 * Accounts that are already verified (email link, earlier provider sign-in)
 * are left alone.
 *
 * @returns {Promise<boolean>} true when old credentials were wiped
 */
export const claimVerifiedEmail = async (db, user) => {
  if (user.emailVerified === true) return false;

  const hadPassword = Boolean(user.password);
  await db.collection("users").updateOne(
    { _id: user._id },
    { $set: { emailVerified: true, ...(hadPassword ? { password: null } : {}) } },
  );
  if (hadPassword) await revokeAllRefreshTokens(db, user._id);
  return hadPassword;
};
