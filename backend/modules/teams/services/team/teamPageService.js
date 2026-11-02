/**
 * What the team pages read: a team with the viewer's id and each member's
 * level, and the list of the viewer's teams. Opening either also reads the
 * viewer's profile CV in the background (not awaited: it can take a while and
 * must never slow the page; see membership/cvService.js).
 */

import { ensureCvEstimate } from "../membership/cvService.js";
import { getMemberLevelsService } from "./teamLevelService.js";
import { getMyTeamService, getTeamService, listMyTeamsService } from "./teamsService.js";

// viewerId lets the client tell "me" from teammates without a separate profile call.
const withViewer = async (db, team, viewerId) =>
  team ? { ...team, viewerId, levels: await getMemberLevelsService(db, team) } : null;

export const getTeamPageService = async (db, teamId, viewer) => {
  ensureCvEstimate(db, viewer._id);
  return withViewer(db, await getTeamService(db, teamId, viewer), viewer._id);
};

/** The one team older links (/team) open: the latest running team, else the latest finished one. */
export const getMyTeamPageService = async (db, viewer) => {
  ensureCvEstimate(db, viewer._id);
  return withViewer(db, await getMyTeamService(db, viewer._id), viewer._id);
};

export const listMyTeamsPageService = (db, viewer) => {
  ensureCvEstimate(db, viewer._id);
  return listMyTeamsService(db, viewer._id);
};
