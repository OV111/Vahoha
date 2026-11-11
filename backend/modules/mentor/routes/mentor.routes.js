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
  usageQuerySchema,
  listSessionsQuerySchema,
} from "../schemas/mentor.schemas.js";
import {
  createSession,
  getSessions,
  getSessionById,
  getContext,
  getUsage,
  updateSessionById,
  deleteSessionById,
  deleteAllSessionsForUser,
  stream,
} from "../controllers/mentor.controller.js";

const router = Router();

router.get("/context", authenticate, getContext);
router.get("/usage", authenticate, validate({ query: usageQuerySchema }), getUsage);
router.get("/sessions", authenticate, validate({ query: listSessionsQuerySchema }), getSessions);
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
// DELETE /api/mentor/sessions?keepPinned=true: clear the learner's chats (all, or all unpinned)
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
