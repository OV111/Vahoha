import { Router } from "express";
import { authenticate } from "../../../middleware/authenticate.js";
import { aiBurstLimiter } from "../../../middleware/aiRateLimit.js";
import { validate } from "../../../middleware/validate.js";
import { makeErrorHandler } from "../../../utils/respond.js";
import { decisionBodySchema, runParamSchema, startBodySchema } from "../schemas/judgment.schemas.js";
import { decide, run, scenarios, start } from "../controllers/judgment.controller.js";

const router = Router();

// GET /api/judgment/scenarios: every scenario with the learner's open run and best score
router.get("/scenarios", authenticate, scenarios);

// POST /api/judgment/runs: { scenarioId }. Resumes the open run; the daily cap counts new ones only.
router.post("/runs", authenticate, validate({ body: startBodySchema }), start);

// GET /api/judgment/runs/:id
router.get("/runs/:id", authenticate, validate({ params: runParamSchema }), run);

// POST /api/judgment/runs/:id/decisions: { eventId, optionId, why, confidence }. The last one calls the AI.
router.post("/runs/:id/decisions", authenticate, aiBurstLimiter, validate({ params: runParamSchema, body: decisionBodySchema }), decide);

router.use(makeErrorHandler("judgment", "Something went wrong with the simulator."));

export default router;
