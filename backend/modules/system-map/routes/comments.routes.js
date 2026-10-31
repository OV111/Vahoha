import { Router } from "express";
import rateLimit from "express-rate-limit";
import { authenticate } from "../../../middleware/authenticate.js";
import { validate } from "../../../middleware/validate.js";
import { commentBodySchema, commentParamSchema, commentsParamSchema } from "../schemas/comments.schemas.js";
import { add, list, remove } from "../controllers/comments.controller.js";

const router = Router();

// Per user, so it runs after authenticate. Generous for a real discussion, tight for a script.
const commentLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: (req) => String(req.user?._id ?? "anonymous"),
  message: { success: false, message: "You're commenting very fast. Wait a minute and try again.", code: 429 },
});

// GET /api/system-maps/:id/comments: every comment on a team map, oldest first
router.get("/:id/comments", authenticate, validate({ params: commentsParamSchema }), list);

// POST /api/system-maps/:id/comments: { nodeId, text }
router.post("/:id/comments", authenticate, commentLimiter, validate({ params: commentsParamSchema, body: commentBodySchema }), add);

// DELETE /api/system-maps/:id/comments/:commentId: the author removes their own comment
router.delete("/:id/comments/:commentId", authenticate, validate({ params: commentParamSchema }), remove);

export default router;
