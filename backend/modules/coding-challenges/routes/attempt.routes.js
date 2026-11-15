import { Router } from "express";
import { authenticate } from "../../../middleware/authenticate.js";
import { aiBurstLimiter, teachBackDailyLimiter } from "../../../middleware/aiRateLimit.js";
import {
  startAttempt,
  getAttempt,
  saveAttemptCode,
  revealHint,
  explainSolution,
} from "../controllers/attempt.controller.js";

const router = Router();

// Every attempt belongs to a user, so there is no anonymous path in here.
router.post("/", authenticate, startAttempt);
router.get("/:id", authenticate, getAttempt);
router.patch("/:id", authenticate, saveAttemptCode);
router.post("/:id/hints/:order", authenticate, revealHint);
// An AI call per request: the same burst and daily budget as exam teach-back.
router.post("/:id/explanation", authenticate, aiBurstLimiter, teachBackDailyLimiter, explainSolution);

export default router;
