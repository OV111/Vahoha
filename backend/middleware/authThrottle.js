import { ipKeyGenerator } from "express-rate-limit";
import { attemptLimiter } from "../utils/attemptLimiter.js";

// Failure limits for the endpoints that guess or send. express-rate-limit counts
// per IP only; these also count per account, so a slow attack on one address from
// many IPs is still seen, and they lock out for longer each time (see attemptLimiter).
//
// req.ip, never the X-Forwarded-For header: the header is whatever the client
// sent, so keying on it let a script pick a fresh "IP" per attempt.

const MINUTE = 60;
const HOUR = 60 * MINUTE;

const clientIp = (req) => ipKeyGenerator(req.ip);

// Wrong passwords. Three scopes with different jobs:
//  - account + IP: the tight one. 5 failures lock that one person on that one network, so a
//    stranger typing a victim's address cannot lock the real owner out from elsewhere.
//  - IP: one network guessing across many accounts. Wider, because offices share an IP.
//  - account: a distributed attack on one address. Widest, since it also catches the owner.
export const loginRules = (req) => {
  const email = String(req.body.email ?? "").toLowerCase().trim();
  const ip = clientIp(req);
  return {
    pair: { key: `login:pair:${email}:${ip}`, limit: 5, windowSec: 15 * MINUTE, baseLockSec: 15 * MINUTE, maxLockSec: 6 * HOUR },
    ip: { key: `login:ip:${ip}`, limit: 20, windowSec: 15 * MINUTE, baseLockSec: 15 * MINUTE, maxLockSec: 6 * HOUR },
    account: { key: `login:account:${email}`, limit: 30, windowSec: HOUR, baseLockSec: 15 * MINUTE, maxLockSec: HOUR },
  };
};

export const signupRule = (req) => ({
  key: `signup:ip:${clientIp(req)}`,
  limit: 10,
  windowSec: HOUR,
  baseLockSec: HOUR,
  maxLockSec: 6 * HOUR,
});

export const rejectIfLocked = async (res, rules, message) => {
  const retryAfter = await attemptLimiter.retryAfter(rules);
  if (!retryAfter) return false;
  res.status(429).set("Retry-After", String(retryAfter)).json({
    message: `${message} Try again in ${Math.ceil(retryAfter / 60)} minute(s).`,
    retryAfter,
    code: 429,
  });
  return true;
};

// Emailing is the abusable step: without a per-address cap, a script rotating IPs can
// fill a stranger's inbox. Past the cap the caller gets the same answer as a normal
// request and no email goes out, so the cap can't be used to probe for accounts.
export const capEmailsPerAddress = ({ scope, limit, windowSec, answer }) =>
  async (req, res, next) => {
    const { allowed } = await attemptLimiter.hit(`${scope}:${req.body.email}`, { limit, windowSec });
    if (!allowed) return res.status(answer.status).json(answer);
    next();
  };
