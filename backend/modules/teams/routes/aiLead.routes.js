import { Router } from "express";
import { aiBurstLimiter } from "../../../middleware/aiRateLimit.js";
import { boardWriteLimiter } from "../../../middleware/rateLimits.js";
import { validate } from "../../../middleware/validate.js";
import { acceptPlan, createPlan, discardPlan, getPlan, getPulse } from "../controllers/aiLead.controller.js";
import { acceptPlanSchema, createPlanSchema, planParamSchema, teamParamSchema } from "../schemas/teams.schemas.js";

const router = Router();

// Health, warnings and last week's update; recomputed at most every 10 minutes per team.
router.get("/:teamId/pulse", validate({ params: teamParamSchema }), getPulse);

// Draft a sprint plan, then a person accepts or discards it.
router.get("/:teamId/ai/plan", validate({ params: teamParamSchema }), getPlan);
router.post("/:teamId/ai/plan", aiBurstLimiter, validate({ params: teamParamSchema, body: createPlanSchema }), createPlan);
router.post("/:teamId/ai/plan/:planId/accept", boardWriteLimiter, validate({ params: planParamSchema, body: acceptPlanSchema }), acceptPlan);
router.delete("/:teamId/ai/plan/:planId", boardWriteLimiter, validate({ params: planParamSchema }), discardPlan);

export default router;
