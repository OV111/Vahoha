/**
 * Reading teams: a team page, my teams, my level, the leaderboard and a team's
 * merged work. Membership checks happen in the services.
 */

import { getLeaderboardService } from "../services/admin/teamStatsService.js";
import { listContributionsForViewerService } from "../services/proof/contributionService.js";
import { getMyTeamLevelService } from "../services/team/teamLevelService.js";
import { getMyTeamPageService, getTeamPageService, listMyTeamsPageService } from "../services/team/teamPageService.js";
import { dbOf, respond } from "../../../utils/respond.js";

export const getTeam = respond((req) => getTeamPageService(dbOf(req), req.params.teamId, req.user));
export const getMyTeam = respond((req) => getMyTeamPageService(dbOf(req), req.user));
export const listMyTeams = respond((req) => listMyTeamsPageService(dbOf(req), req.user));
export const getMyLevel = respond((req) => getMyTeamLevelService(dbOf(req), req.user._id));
export const getLeaderboard = respond((req) => getLeaderboardService(dbOf(req), req.user._id, { trackId: req.query.track }));
export const listContributions = respond((req) => listContributionsForViewerService(dbOf(req), req.params.teamId, req.user));
