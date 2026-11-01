import { createHmac, timingSafeEqual } from "node:crypto";
import process from "node:process";
import { Buffer } from "node:buffer";

/**
 * The token in an email's unsubscribe link: "<userId>.<signature>".
 *
 * It must work without signing in (that is the point of an unsubscribe link)
 * and must not expire: people unsubscribe from mail that is weeks old. So it
 * is a signature, not a stored token. It can only switch the weekly email off,
 * which is why a token that never expires is acceptable.
 *
 * Signed with JWT_Secret under its own label, so it can never be mistaken for
 * a sign-in token. Rotating JWT_Secret invalidates old links; the Settings
 * toggle still works then.
 */
const LABEL = "weekly-summary-unsubscribe:";

const sign = (userId) =>
  createHmac("sha256", process.env.JWT_Secret).update(LABEL + userId).digest("base64url");

export const createUnsubscribeToken = (userId) => `${userId}.${sign(String(userId))}`;

/** @returns {string|null} the user id, or null for a bad or forged token */
export const verifyUnsubscribeToken = (token) => {
  if (typeof token !== "string") return null;
  const [userId, signature] = token.split(".");
  if (!/^[0-9a-f]{24}$/.test(userId ?? "") || !signature) return null;

  const expected = Buffer.from(sign(userId));
  const given = Buffer.from(signature);
  return given.length === expected.length && timingSafeEqual(given, expected) ? userId : null;
};
