/**
 * Admin: every team at a glance, member removal, status, sync and the public
 * evidence page (which publishes names, so issuing it stays an admin step).
 * Routes put requireAdmin in front of all of these.
 */

import { adminSyncService } from "../services/admin/adminSyncService.js";
import { getAdminOverviewService } from "../services/admin/teamStatsService.js";
import { getEvidenceStatusService, issueEvidenceService, setEvidenceRevokedService } from "../services/proof/evidenceService.js";
import {
  addMemberService,
  createTeamService,
  listTeamsService,
  removeMemberService,
  searchUsersService,
  setStatusService,
} from "../services/team/teamsService.js";
import { dbOf, respond } from "../../../utils/respond.js";

export const listTeams = respond((req) => listTeamsService(dbOf(req)));
export const searchUsers = respond((req) => searchUsersService(dbOf(req), req.query));
export const getAdminOverview = respond((req) => getAdminOverviewService(dbOf(req)));

export const createTeam = respond((req) => createTeamService(dbOf(req), req.body));
export const addMember = respond((req) => addMemberService(dbOf(req), req.params.teamId, req.body));
export const removeMember = respond((req) => removeMemberService(dbOf(req), req.params.teamId, req.params.userId));
export const setStatus = respond((req) => setStatusService(dbOf(req), req.params.teamId, req.body.status));
export const syncTeam = respond((req) => adminSyncService(dbOf(req), req.params.teamId, req.user));

export const getEvidenceStatus = respond((req) => getEvidenceStatusService(dbOf(req), req.params.teamId));
export const issueEvidence = respond((req) => issueEvidenceService(dbOf(req), req.user._id, req.params.teamId));
export const revokeEvidence = respond((req) => setEvidenceRevokedService(dbOf(req), req.params.teamId, req.body.revoked));
