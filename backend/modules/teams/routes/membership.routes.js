import { Router } from "express";
import { teamMembershipLimiter } from "../../../middleware/rateLimits.js";
import { validate } from "../../../middleware/validate.js";
import {
  beginTeam,
  getEligibility,
  joinTeam,
  leaveTeam,
  listOpenTeams,
  setRepo,
  startTeam,
} from "../controllers/membership.controller.js";
import { createTeamSchema, leaderboardQuerySchema, setRepoSchema, teamParamSchema } from "../schemas/teams.schemas.js";

const router = Router();

router.get("/me/eligibility", getEligibility);
router.get("/open", validate({ query: leaderboardQuerySchema }), listOpenTeams);
router.post("/start", teamMembershipLimiter, validate({ body: createTeamSchema }), startTeam);

router.post("/:teamId/join", teamMembershipLimiter, validate({ params: teamParamSchema }), joinTeam);
router.post("/:teamId/leave", teamMembershipLimiter, validate({ params: teamParamSchema }), leaveTeam);
router.post("/:teamId/begin", teamMembershipLimiter, validate({ params: teamParamSchema }), beginTeam);
// Admins set any team's repo; a member goes through the ownership checks (in the service).
router.put("/:teamId/repo", teamMembershipLimiter, validate({ params: teamParamSchema, body: setRepoSchema }), setRepo);

export default router;
