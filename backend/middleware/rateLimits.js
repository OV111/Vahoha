import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import { verifyAccessToken } from "../utils/jwtToken.js";

// Limits for routes that are cheap to call and expensive to abuse (spam, floods,
// sandbox CPU). The AI routes have their own in aiRateLimit.js.
//
// In-memory store: counters are per process and reset on a restart. Fine for the
// single-instance pilot (see docs/engineering/DEPLOYMENT.md, "Scaling out").

const bearerUserId = (req) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return null;
  const decoded = verifyAccessToken(header.split(" ")[1]);
  const id = decoded?.id ?? decoded?._id;
  return id ? String(id) : null;
};

// Some routes (follow) verify the token inside the controller, so `req.user` may
// not be set yet: read the token here without rejecting anything, and count a
// request with no valid token against its IP.
const byUserOrIp = (req) => {
  const id = req.user?._id ?? bearerUserId(req);
  return id ? `user:${id}` : ipKeyGenerator(req.ip);
};

const limiter = ({ windowMs, limit, message, perUser = false }) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    ...(perUser ? { keyGenerator: byUserOrIp } : {}), // the default key is the client IP
    message: { message, code: 429 },
  });

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;

// Public and unauthenticated, so keyed per IP (trust proxy is set in app.js).
export const publicMapLimiter = limiter({ windowMs: MINUTE, limit: 60, message: "Too many requests. Please wait a minute." });

// Runs learner code in the sandbox: a CPU cost on top of the daily quota in the service.
export const challengeSubmitLimiter = limiter({
  windowMs: MINUTE,
  limit: 10,
  perUser: true,
  message: "You're submitting too fast. Wait a moment and try again.",
});

export const commentLimiter = limiter({ windowMs: MINUTE, limit: 20, perUser: true, message: "You're commenting too fast. Wait a minute." });
export const blogCreateLimiter = limiter({ windowMs: HOUR, limit: 10, perUser: true, message: "You've published a lot of posts. Try again later." });
export const blogUpdateLimiter = limiter({ windowMs: HOUR, limit: 60, perUser: true, message: "Too many edits. Try again later." });
// Likes, saves and follows are one-tap toggles: a script can flip them endlessly.
export const toggleLimiter = limiter({ windowMs: MINUTE, limit: 60, perUser: true, message: "Slow down a little. Try again in a minute." });
