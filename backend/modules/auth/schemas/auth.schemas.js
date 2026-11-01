import { Buffer } from "node:buffer";
import { z } from "zod";
import { PASSWORD_RULES, PASSWORD_MESSAGES } from "../../../../constants/password.js";

/**
 * Schemas for POST /get-started and POST /login.
 *
 * The signup rules mirror the form in src/pages/GetStarted.jsx, but the form
 * is only a convenience: anyone can POST straight to the API, so these are
 * the rules that actually count.
 */

// Strings only. An object like {"$ne": null} would otherwise reach
// users.findOne({ email }) as a Mongo operator (NoSQL injection).
const email = z
  .string()
  .trim()
  .toLowerCase() // "A@x.com" and "a@x.com" must be the same account
  .max(254, "Max 254 characters.")
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address.");

const name = (label) =>
  z
    .string({ required_error: `${label} is required.` })
    .trim()
    .min(2, "At least 2 characters.")
    .max(50, "Max 50 characters.")
    .regex(/^[a-zA-Z\s'-]+$/, "Only letters, spaces, hyphens, apostrophes.");


export const signupPasswordSchema = z
  .string({ required_error: "Password is required." })
  .min(PASSWORD_RULES.minLength, PASSWORD_MESSAGES.minLength)
  .regex(PASSWORD_RULES.symbol, PASSWORD_MESSAGES.symbol)
  .refine((v) => Buffer.byteLength(v, "utf8") <= PASSWORD_RULES.maxBytes, PASSWORD_MESSAGES.maxBytes);

export const signupSchema = z.object({
  firstName: name("First name"),
  lastName: name("Last name"),
  email,
  password: signupPasswordSchema,
  username: z.string().max(50).optional(),
});

// Login does NOT re-apply the symbol rule: it would reveal the password
// policy to attackers and lock out anyone whose password predates the rule.
export const loginSchema = z.object({
  email,
  password: z
    .string({ required_error: "Password is required." })
    .min(1, "Password is required.")
    .max(1024, "Invalid credentials."),
});

// Same normalised email as signup/login, so "Me@X.com" finds the "me@x.com" account.
export const forgotPasswordSchema = z.object({ email });

// The reset token is 32 random bytes as hex (see forgotPassword), so anything
// else can be rejected without a DB lookup. The new password must meet the
// signup policy: otherwise "reset" would be a way around it.
export const resetPasswordSchema = z.object({
  token: z
    .string({ required_error: "Reset link is invalid or has expired." })
    .regex(/^[a-f0-9]{64}$/, "Reset link is invalid or has expired."),
  newPassword: signupPasswordSchema,
});

// Magic sign-in link. Requesting needs only the email; confirming needs the
// 32-byte hex token from the email (anything else is rejected before a DB call).
export const loginLinkRequestSchema = z.object({ email });
export const loginLinkConfirmSchema = z.object({
  token: z
    .string({ required_error: "This sign-in link is invalid or has expired." })
    .regex(/^[a-f0-9]{64}$/, "This sign-in link is invalid or has expired."),
});
