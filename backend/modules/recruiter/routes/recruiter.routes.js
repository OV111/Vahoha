import process from "node:process";
import { Router } from "express";
import { ipKeyGenerator } from "express-rate-limit";
import { sharedRateLimit } from "../../../middleware/sharedRateLimit.js";
import { authenticate } from "../../../middleware/authenticate.js";
import { requireRecruiter } from "../../../middleware/requireRecruiter.js";
import { validate } from "../../../middleware/validate.js";
import { candidatesQuerySchema, settingsSchema, usernameParamSchema } from "../schemas/recruiter.schemas.js";
import { getScorecard, getSettings, listCandidates, saveSettings } from "../controllers/recruiter.controller.js";

const router = Router();

// Public and unauthenticated, so keyed per IP (trust proxy is set in app.js).
// Generous for a recruiter opening a few links, tight enough to stop scraping
// every username.
const scorecardLimiter = sharedRateLimit("recruiter.scorecard", {
  windowMs: 60_000,
  limit: 60,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many requests. Please wait a minute.", code: 429 },
});

// Recruiters only, from trust level "limited" up (browsing; contact needs "verified").
// The list is built from many scorecards, so it is the costly
// call here: a tighter limit than the single public scorecard.
const candidatesLimiter = sharedRateLimit("recruiter.candidates", {
  windowMs: 60_000,
  limit: 30,
  // Per account, not per IP: scraping from many IPs with one login stays capped.
  keyGenerator: (req) => (req.user?._id ? `user:${req.user._id}` : ipKeyGenerator(req.ip)),
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many requests. Please wait a minute.", code: 429 },
});

// Closed until CANDIDATES_ENABLED=true. Read per request, not at import: the
// env is loaded after modules are imported. Answers exactly like an unknown
// route, so a closed feature cannot be told apart from one that never existed.
const candidatesOpen = (req, res, next) =>
  process.env.CANDIDATES_ENABLED === "true"
    ? next()
    : res.status(404).json({ success: false, message: "Not found" });

router.get("/candidates", candidatesOpen, authenticate, requireRecruiter("limited"), candidatesLimiter, validate({ query: candidatesQuerySchema }), listCandidates);
router.get("/scorecards/:username", scorecardLimiter, validate({ params: usernameParamSchema }), getScorecard);

// Everything below is the signed-in developer's own settings.
router.get("/settings", authenticate, getSettings);
router.put("/settings", authenticate, validate({ body: settingsSchema }), saveSettings);

export default router;
