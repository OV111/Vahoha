/**
 * Self-serve membership: start, browse, join, leave, set the repo and begin.
 * The acting user always comes from the session, never from the body.
 */

import {
  beginTeamService,
  getEligibilityService,
  joinTeamService,
  leaveTeamService,
  listOpenTeamsService,
  setRepoAsViewerService,
  startTeamService,
} from "../services/membership/selfServeService.js";
import { dbOf, respond } from "../../../utils/respond.js";

export const getEligibility = respond((req) => getEligibilityService(dbOf(req), req.user._id));
export const listOpenTeams = respond((req) => listOpenTeamsService(dbOf(req), req.user._id, { track: req.query.track }));
export const startTeam = respond((req) => startTeamService(dbOf(req), req.user, req.body));
export const joinTeam = respond((req) => joinTeamService(dbOf(req), req.params.teamId, req.user));
export const leaveTeam = respond((req) => leaveTeamService(dbOf(req), req.params.teamId, req.user));
export const beginTeam = respond((req) => beginTeamService(dbOf(req), req.params.teamId, req.user));
export const setRepo = respond((req) => setRepoAsViewerService(dbOf(req), req.params.teamId, req.user, req.body));
