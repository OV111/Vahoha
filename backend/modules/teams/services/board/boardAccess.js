/**
 * Who may see and change a team's board. Active members read and write; an
 * admin reads every board and may plan sprints, but doesn't edit tasks (the
 * board is the team's own record of who did what).
 */

import { ObjectId } from "mongodb";
import { boardIsOpen } from "../../lib/taskRules.js";
import { TEAMS, ensureIndexes } from "../teamsData.js";
import { fail } from "../../../../utils/httpErrors.js";
import { isAdmin } from "../team/teamsService.js";

/**
 * @param {{write?: boolean, adminWrite?: boolean}} opts
 *   write: active member of an open team. adminWrite: admins pass the write check too.
 */
export const loadBoard = async (db, teamId, user, { write = false, adminWrite = false } = {}) => {
  await ensureIndexes(db);
  const uid = new ObjectId(user._id);
  const team = await db.collection(TEAMS).findOne({ _id: new ObjectId(teamId) });
  if (!team) fail(404, "Team not found");

  const isMember = team.members.some((m) => m.status === "active" && m.userId.equals(uid));
  const admin = isMember ? false : await isAdmin(db, uid);
  if (!isMember && !admin) fail(404, "Team not found"); // 404, not 403: don't reveal it exists

  if (write) {
    if (!isMember && !(adminWrite && admin)) fail(403, "Only team members can change the board");
    if (!boardIsOpen(team)) fail(409, "This team is finished, so its board is read-only");
  }
  return { team, uid, isMember, isAdmin: admin };
};

/** An assignee must be an active member of this team. */
export const assertActiveMember = (team, userId) => {
  if (userId == null) return;
  const ok = team.members.some((m) => m.status === "active" && String(m.userId) === String(userId));
  if (!ok) fail(400, "The assignee must be an active member of this team");
};
