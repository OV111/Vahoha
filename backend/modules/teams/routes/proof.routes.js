import { Router } from "express";
import { aiBurstLimiter } from "../../../middleware/aiRateLimit.js";
import { validate } from "../../../middleware/validate.js";
import {
  answerDefense,
  getDefense,
  gradeDefense,
  listMyRatings,
  rateMember,
  startDefense,
} from "../controllers/proof.controller.js";
import { defenseAnswerSchema, ratingParamSchema, ratingSchema, teamParamSchema } from "../schemas/teams.schemas.js";

const router = Router();

router.get("/:teamId/defense", validate({ params: teamParamSchema }), getDefense);
// start, answer (the last answer triggers grading) and grade all call the model, so they share
// the per-user AI burst limiter (after authenticate, which keys it) like the capstone routes.
router.post("/:teamId/defense/start", aiBurstLimiter, validate({ params: teamParamSchema }), startDefense);
router.post("/:teamId/defense/answer", aiBurstLimiter, validate({ params: teamParamSchema, body: defenseAnswerSchema }), answerDefense);
router.post("/:teamId/defense/grade", aiBurstLimiter, validate({ params: teamParamSchema }), gradeDefense);

router.get("/:teamId/ratings/mine", validate({ params: teamParamSchema }), listMyRatings);
router.put("/:teamId/ratings/:userId", validate({ params: ratingParamSchema, body: ratingSchema }), rateMember);

export default router;
