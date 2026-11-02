import { Router } from "express";
import { requireAdmin } from "../../../middleware/requireAdmin.js";
import { validate } from "../../../middleware/validate.js";
import {
  addMember,
  createTeam,
  getAdminOverview,
  getEvidenceStatus,
  issueEvidence,
  listTeams,
  removeMember,
  revokeEvidence,
  searchUsers,
  setStatus,
  syncTeam,
} from "../controllers/admin.controller.js";
import {
  addMemberSchema,
  createTeamSchema,
  evidenceRevokeSchema,
  memberParamSchema,
  statusSchema,
  teamParamSchema,
  userSearchSchema,
} from "../schemas/teams.schemas.js";

// Everything here is admin-only.
const router = Router();

router.get("/", requireAdmin, listTeams);
router.get("/admin/users", requireAdmin, validate({ query: userSearchSchema }), searchUsers);
router.get("/admin/overview", requireAdmin, getAdminOverview);

router.post("/", requireAdmin, validate({ body: createTeamSchema }), createTeam);
router.post("/:teamId/members", requireAdmin, validate({ params: teamParamSchema, body: addMemberSchema }), addMember);
router.delete("/:teamId/members/:userId", requireAdmin, validate({ params: memberParamSchema }), removeMember);
router.put("/:teamId/status", requireAdmin, validate({ params: teamParamSchema, body: statusSchema }), setStatus);
router.post("/:teamId/sync", requireAdmin, validate({ params: teamParamSchema }), syncTeam);

router.get("/:teamId/evidence", requireAdmin, validate({ params: teamParamSchema }), getEvidenceStatus);
router.post("/:teamId/evidence", requireAdmin, validate({ params: teamParamSchema }), issueEvidence);
router.put("/:teamId/evidence/revocation", requireAdmin, validate({ params: teamParamSchema, body: evidenceRevokeSchema }), revokeEvidence);

export default router;
