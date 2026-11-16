import { Router } from "express";
import { authenticate } from "../../../middleware/authenticate.js";
import { aiBurstLimiter } from "../../../middleware/aiRateLimit.js";
import { validate } from "../../../middleware/validate.js";
import { makeErrorHandler } from "../../../utils/respond.js";
import { attemptParamSchema, layerParamSchema, startBodySchema, turnBodySchema } from "../schemas/voiceExam.schemas.js";
import { abandon, audioTurn, eligibility, start, turn, verified } from "../controllers/voiceExam.controller.js";

const router = Router();

// GET /api/voice-exam/verified: the signed-in user's verified layers, for the roadmap badge
router.get("/verified", authenticate, verified);

// GET /api/voice-exam/layers/:layerId/eligibility
router.get("/layers/:layerId/eligibility", authenticate, validate({ params: layerParamSchema }), eligibility);

// POST /api/voice-exam/attempts: { layerId, path }. The daily cap is checked inside, per attempt.
router.post("/attempts", authenticate, aiBurstLimiter, validate({ body: startBodySchema }), start);

// POST /api/voice-exam/attempts/:id/turns: { text }
router.post("/attempts/:id/turns", authenticate, aiBurstLimiter, validate({ params: attemptParamSchema, body: turnBodySchema }), turn);

// POST /api/voice-exam/attempts/:id/audio-turns: multipart { audio, turnKey }, transcribed by Whisper
router.post("/attempts/:id/audio-turns", authenticate, aiBurstLimiter, validate({ params: attemptParamSchema }), audioTurn);

// POST /api/voice-exam/attempts/:id/abandon
router.post("/attempts/:id/abandon", authenticate, validate({ params: attemptParamSchema }), abandon);

router.use(makeErrorHandler("voice-exam", "Something went wrong with the voice exam."));

export default router;
