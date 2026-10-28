import { Router } from "express";
import { authenticate } from "../../../middleware/authenticate.js";
import { challengeSubmitLimiter } from "../../../middleware/rateLimits.js";
import { submit, runnerStatus } from "../controllers/submission.controller.js";

const router = Router();

router.get("/runner", authenticate, runnerStatus);
router.post("/:id", authenticate, challengeSubmitLimiter, submit);

export default router;
