import process from "node:process";
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

// Only the newer limiters pass `offInTests`: under Vitest every request comes from one
// IP and one test user, so a tight ceiling would fail unrelated suites.
const limiter = ({ windowMs, limit, message, perUser = false, offInTests = false }) =>
  rateLimit({
    windowMs,
    limit,
    ...(offInTests && process.env.VITEST ? { skip: () => true } : {}),
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
export const blogCreateLimiter = limiter({ windowMs: HOUR, limit: 30, perUser: true, message: "You've published a lot of posts. Try again later." });
export const blogUpdateLimiter = limiter({ windowMs: HOUR, limit: 120, perUser: true, message: "Too many edits. Try again later." });
// Likes, saves and follows are one-tap toggles: a script can flip them endlessly.
// The numbers sit well above what a person does (a post takes minutes to write,
// the editor autosaves to the browser, not the server), so only scripts hit them.
// Team board: dragging cards is quick, so the ceiling is high; it stops scripts, not people.
export const boardWriteLimiter = limiter({ windowMs: MINUTE, limit: 60, perUser: true, message: "Too many board changes. Wait a minute." });
// Starting, joining and leaving teams: rare actions, so a low ceiling stops churn scripts.
export const teamMembershipLimiter = limiter({ windowMs: HOUR, limit: 10, perUser: true, message: "Too many team changes. Try again later." });
export const toggleLimiter = limiter({ windowMs: MINUTE, limit: 120, perUser: true, message: "Slow down a little. Try again in a minute." });

// Public reads with no login are keyed per IP, so the ceilings leave room for a
// school or office behind one address (the SPA fires several reads per page) while
// stopping a scraper well before the app-wide cap. Search is a typeahead, hence its own.
export const publicReadLimiter = limiter({ windowMs: MINUTE, limit: 120, offInTests: true, message: "Too many requests. Please wait a minute." });
export const userSearchLimiter = limiter({ windowMs: MINUTE, limit: 90, offInTests: true, message: "Too many searches. Please wait a minute." });

// Exams: generate builds a question set and submit grades one, so a person needs a
// minute or more per exam; these only stop retry loops.
export const examGenerateLimiter = limiter({ windowMs: MINUTE, limit: 10, perUser: true, offInTests: true, message: "You're starting exams too fast. Wait a moment and try again." });
export const examSubmitLimiter = limiter({ windowMs: MINUTE, limit: 40, perUser: true, offInTests: true, message: "You're submitting too fast. Wait a moment and try again." });

// Project Map create/edit/share/delete. The editor saves on change, so the ceiling is
// generous; the scan and question routes have their own AI limits.
export const mapWriteLimiter = limiter({ windowMs: MINUTE, limit: 60, perUser: true, offInTests: true, message: "Too many map changes. Wait a minute." });

// Backstop for the whole API: one client IP, every route. The per-route limits above
// are tighter; this only stops a single address flooding endpoints that have none
// (public reads, exam bursts, Project Map writes). The ceiling is high because a
// school or office shares one IP and the SPA fires several requests per page.
// Skipped: CORS preflights (the browser retries them, and they carry no data) and
// Polar's webhook (signed, and its sender IPs are shared). /healthz is answered
// before Express. Off under Vitest, where every request comes from one IP.
export const GLOBAL_IP_LIMIT = 300;

export const createGlobalIpLimiter = ({ limit = GLOBAL_IP_LIMIT, windowMs = MINUTE } = {}) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    skip: (req) => req.method === "OPTIONS" || req.path === "/api/billing/webhook",
    message: { message: "Too many requests from your network. Please wait a minute.", code: 429 },
  });

export const globalIpLimiter = process.env.VITEST ? (req, res, next) => next() : createGlobalIpLimiter();
