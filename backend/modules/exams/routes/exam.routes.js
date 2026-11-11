import { Router } from "express";
import { authenticate } from "../../../middleware/authenticate.js";
import { examGenerateLimiter, examSubmitLimiter } from "../../../middleware/rateLimits.js";
import { aiBurstLimiter, teachBackDailyLimiter } from "../../../middleware/aiRateLimit.js";
import {
  getHistory,
  getLastExamResult,
  listWeakSpots,
  addWeakSpotRoute,
  resolveWeakSpotRoute,
} from "../controllers/exam.controller.js";
import { generate, answer, leave, submitTeachBackAnswer, submitTeachBackFollowUpAnswer } from "../controllers/examEngine.controller.js";

const router = Router();

// Exam engine
router.post("/generate", authenticate, examGenerateLimiter, generate);
router.post("/answer", authenticate, examSubmitLimiter, answer);
router.post("/leave", authenticate, examSubmitLimiter, leave);
router.post("/submit-teach-back", authenticate, aiBurstLimiter, teachBackDailyLimiter, submitTeachBackAnswer);
router.post("/submit-teach-back-followup", authenticate, aiBurstLimiter, teachBackDailyLimiter, submitTeachBackFollowUpAnswer);

// Exam history
router.get("/history", authenticate, getHistory);
router.get("/history/last", authenticate, getLastExamResult);
// No client-writable result route: exam rows feed the public recruiter
// scorecard, so only the server-graded POST /answer may create them.

// Weak spots
router.get("/weak-spots", authenticate, listWeakSpots);
router.post("/weak-spots", authenticate, addWeakSpotRoute);
router.patch("/weak-spots/:topic/resolve", authenticate, resolveWeakSpotRoute);

export default router;
