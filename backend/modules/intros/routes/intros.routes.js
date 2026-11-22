import { Router } from "express";
import { authenticate } from "../../../middleware/authenticate.js";
import { sharedRateLimit } from "../../../middleware/sharedRateLimit.js";
import { validate } from "../../../middleware/validate.js";
import { makeErrorHandler } from "../../../utils/respond.js";
import { hiringOpen, introIdParamSchema, introListQuerySchema, introReportSchema } from "../../hiring/index.js";
import { accept, block, decline, list, report, summary } from "../controllers/intros.controller.js";

const router = Router();

const perUser = (name, windowMs, limit, message) =>
  sharedRateLimit(`intros.${name}`, {
    windowMs,
    limit,
    keyGenerator: (req) => `user:${req.user._id}`,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { message, code: 429 },
  });

const replyLimit = perUser("reply", 60_000, 30, "Slow down a little.");
const reportLimit = perUser("report", 60 * 60_000, 10, "Too many reports. Try again in an hour.");
const byId = validate({ params: introIdParamSchema });

router.use(hiringOpen, authenticate);
router.get("/", validate({ query: introListQuerySchema }), list);
router.get("/summary", summary);
router.post("/:id/accept", replyLimit, byId, accept);
router.post("/:id/decline", replyLimit, byId, decline);
router.post("/:id/block", replyLimit, byId, block);
router.post("/:id/report", replyLimit, reportLimit, byId, validate({ body: introReportSchema }), report);

router.use(makeErrorHandler("intros", "Intro request failed"));

export default router;
