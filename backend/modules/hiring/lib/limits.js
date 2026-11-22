import { ipKeyGenerator } from "express-rate-limit";
import { sharedRateLimit } from "../../../middleware/sharedRateLimit.js";
import { emailDomainOf } from "./domain.js";

/**
 * Rate limits for the hiring API, in layers so getting around one isn't enough:
 * per IP (one machine), per user (one account, any IP), per email domain (one
 * "company" from many IPs) and a global ceiling (a botnet across everything).
 * Counters live in Redis via sharedRateLimit, so restarts don't reset them.
 */

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const byIp = (req) => ipKeyGenerator(req.ip);
const byUser = (req) => (req.user?._id ? `user:${req.user._id}` : byIp(req));
// Runs after validate(), so req.body.email is already trimmed and lower-cased.
const byEmailDomain = (req) => `domain:${emailDomainOf(req.body?.email) || "none"}`;
const everyone = () => "all";

const limit = (name, windowMs, max, message, keyGenerator = byIp) =>
  sharedRateLimit(`hiring.${name}`, {
    windowMs,
    limit: max,
    keyGenerator,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { message, code: 429 },
  });

// Sign-up opens a website, a DNS lookup and a registry lookup each time.
export const signupLimits = [
  limit("signup.ip", HOUR, 5, "Too many sign-ups. Try again in an hour."),
  limit("signup.domain", DAY, 10, "Too many sign-ups for this company today.", byEmailDomain),
  limit("signup.global", HOUR, 200, "Sign-ups are busy right now. Try again soon.", everyone),
];

export const verifyLimits = [
  limit("verify.ip", 15 * MINUTE, 20, "Too many tries. Wait a few minutes."),
  limit("verify.user", 15 * MINUTE, 10, "Too many tries. Wait a few minutes.", byUser),
];

// Each resend emails the same inbox: tight per user so it can't be used to flood one.
export const resendLimits = [
  limit("resend.ip", HOUR, 10, "Too many codes sent. Try again in an hour."),
  limit("resend.user", HOUR, 3, "Too many codes sent. Try again in an hour.", byUser),
];

export const recheckLimits = [
  limit("recheck.ip", HOUR, 30, "Too many re-checks. Try again in an hour."),
  limit("recheck.user", HOUR, 10, "Too many re-checks. Try again in an hour.", byUser),
];

// Saving and noting: generous for people, tight enough to stop a script copying everyone.
export const savedLimits = [limit("saved.user", MINUTE, 60, "Slow down a little.", byUser)];

export const adminLimits = [limit("admin.user", MINUTE, 120, "Slow down a little.", byUser)];
