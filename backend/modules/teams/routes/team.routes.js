import { Router } from "express";
import { validate } from "../../../middleware/validate.js";
import {
  getLeaderboard,
  getMyLevel,
  getMyTeam,
  getTeam,
  listContributions,
  listMyTeams,
} from "../controllers/team.controller.js";
import { leaderboardQuerySchema, teamParamSchema } from "../schemas/teams.schemas.js";

const router = Router();

// Fixed paths first: "/:teamId" below would otherwise read "mine" as an id.
router.get("/leaderboard", validate({ query: leaderboardQuerySchema }), getLeaderboard);
router.get("/mine", getMyTeam);
router.get("/mine/all", listMyTeams);
router.get("/me/level", getMyLevel);

router.get("/:teamId", validate({ params: teamParamSchema }), getTeam);
router.get("/:teamId/contributions", validate({ params: teamParamSchema }), listContributions);

export default router;
