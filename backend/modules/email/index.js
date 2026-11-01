/**
 * Email module: the weekly progress summary and the learner's email settings.
 *
 * Transactional mail (password reset, sign-in links, contact) stays in
 * utils/emailService.js; this module owns the one recurring email, which is
 * the only one that needs preferences and an unsubscribe link.
 */
import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { authenticate } from "../../middleware/authenticate.js";
import { validate } from "../../middleware/validate.js";
import {
  requireCronSecret,
  runWeeklySummary,
  getPrefs,
  putPrefs,
  unsubscribe,
} from "./controllers/email.controller.js";

const prefsSchema = z.object({ weeklySummary: z.boolean() }).strict();

// Public route; a valid token is already unguessable, this only stops a flood.
const unsubscribeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many requests. Please try again later.", code: 429 },
});

const router = Router();

router.post("/weekly-summary/run", requireCronSecret, runWeeklySummary);
router.get("/preferences", authenticate, getPrefs);
router.put("/preferences", authenticate, validate({ body: prefsSchema }), putPrefs);
// Gmail's one-click POST is form-encoded; the token is in the URL either way.
router.post("/unsubscribe", unsubscribeLimiter, unsubscribe);

export default router;
