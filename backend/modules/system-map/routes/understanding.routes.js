import { Router } from "express";
import rateLimit from "express-rate-limit";
import { authenticate } from "../../../middleware/authenticate.js";
import { aiBurstLimiter } from "../../../middleware/aiRateLimit.js";
import { validate } from "../../../middleware/validate.js";
import { answersBodySchema, answersParamSchema, questionsParamSchema } from "../schemas/understanding.schemas.js";
import { createQuestions, submitAnswers } from "../controllers/understanding.controller.js";

const router = Router();

// Each new check is one model call; answers are graded once per check.
const questionsDailyLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: (req) => String(req.user?._id ?? "anonymous"),
  message: { message: "Daily limit for map questions reached. Try again tomorrow.", code: 429 },
});

// POST /api/system-maps/checks/:checkId/answers: grade the learner's answers
router.post(
  "/checks/:checkId/answers",
  authenticate,
  aiBurstLimiter,
  validate({ params: answersParamSchema, body: answersBodySchema }),
  submitAnswers,
);

// POST /api/system-maps/:id/questions: 3 questions about this map
router.post(
  "/:id/questions",
  authenticate,
  aiBurstLimiter,
  questionsDailyLimiter,
  validate({ params: questionsParamSchema }),
  createQuestions,
);

export default router;
