/**
 * The admin "sync" button: copy the team's merged-PR evidence, then move the
 * board's cards from GitHub in the same go. A board problem never hides the
 * evidence result, so it is reported next to it instead of failing the call.
 */

import { syncBoardService } from "../board/boardSyncService.js";
import { syncContributionsService } from "../proof/contributionService.js";

export const adminSyncService = async (db, teamId, admin) => {
  const stats = await syncContributionsService(db, teamId);
  const board = await syncBoardService(db, teamId, admin, { force: true }).catch((err) => ({
    synced: false,
    reason: err.status ? err.message : "error",
    moved: [],
  }));
  return { ...stats, board };
};
