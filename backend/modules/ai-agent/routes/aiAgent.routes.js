import { Router } from "express";
import { authenticate } from "../../../middleware/authenticate.js";
import { validate } from "../../../middleware/validate.js";
import { aiBurstLimiter } from "../../../middleware/aiRateLimit.js";
import {
  createSessionSchema,
  sessionIdParamSchema,
  deleteAllSessionsQuerySchema,
  updateSessionSchema,
  streamSchema,
} from "../schemas/aiAgent.schemas.js";
import {
  createSession,
  getSessions,
  getSessionById,
  getContext,
  updateSessionById,
  deleteSessionById,
  deleteAllSessionsForUser,
  stream,
} from "../controllers/aiAgent.controller.js";

const router = Router();

router.get("/context", authenticate, getContext);
router.get("/sessions", authenticate, getSessions);
router.get(
  "/sessions/:id",
  authenticate,
  validate({ params: sessionIdParamSchema }),
  getSessionById,
);
router.post(
  "/sessions",
  authenticate,
  validate({ body: createSessionSchema }),
  createSession,
);
router.patch(
  "/sessions/:id",
  authenticate,
  validate({ params: sessionIdParamSchema, body: updateSessionSchema }),
  updateSessionById,
);
// DELETE /api/ai-agent/sessions?keepPinned=true: clear the learner's chats (all, or all unpinned)
router.delete(
  "/sessions",
  authenticate,
  validate({ query: deleteAllSessionsQuerySchema }),
  deleteAllSessionsForUser,
);
router.delete(
  "/sessions/:id",
  authenticate,
  validate({ params: sessionIdParamSchema }),
  deleteSessionById,
);
router.post(
  "/stream",
  authenticate,
  aiBurstLimiter,
  validate({ body: streamSchema }),
  stream,
);

export default router;
