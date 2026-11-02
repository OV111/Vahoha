/**
 * Board sync: read the team repo's recent pull requests and move the cards
 * they name (rules in lib/prLinks.js). Runs when a member opens the board, at
 * most once per team every SYNC_INTERVAL_MS, so a busy team page can't burn
 * through GitHub's rate limit. An admin can force it.
 *
 * This only moves cards. Merged-PR evidence (files, reviewers) is still copied
 * by contributionService, which the admin sync button runs.
 */

import { listRecentPulls } from "../../../capstone/index.js";
import { boardIsOpen, derivePrefix, formatRef } from "../../lib/taskRules.js";
import { pickPullPerTask, planTaskUpdate } from "../../lib/prLinks.js";
import { loadBoard } from "./boardAccess.js";
import { TASKS, TASK_EVENTS, TEAMS } from "../teamsData.js";

export const SYNC_INTERVAL_MS = 2 * 60_000;

// Atomic claim: of two board loads at the same moment, only one syncs.
const claimSync = async (db, team, force) => {
  const now = new Date();
  const due = force
    ? {}
    : { $or: [{ boardSyncedAt: { $exists: false } }, { boardSyncedAt: { $lt: new Date(now - SYNC_INTERVAL_MS) } }] };
  const claimed = await db
    .collection(TEAMS)
    .findOneAndUpdate({ _id: team._id, ...due }, { $set: { boardSyncedAt: now } }, { projection: { _id: 1 } });
  return Boolean(claimed);
};

export const syncBoardService = async (db, teamId, user, { force = false } = {}) => {
  const { team, isAdmin } = await loadBoard(db, teamId, user);
  if (!team.repo) return { synced: false, reason: "no-repo", moved: [] };
  if (!boardIsOpen(team)) return { synced: false, reason: "finished", moved: [] };
  if (!(await claimSync(db, team, force && isAdmin))) return { synced: false, reason: "recent", moved: [] };

  const [owner, repo] = team.repo.fullName.split("/");
  // A GitHub error keeps the claim on purpose: during an outage or rate limit,
  // retrying on every board load would only make it worse. The next try is in 2 minutes.
  const pulls = await listRecentPulls(owner, repo);
  if (!pulls) return { synced: false, reason: "repo-unavailable", moved: [] };

  const prefix = team.taskPrefix ?? derivePrefix(team.name);
  const logins = team.members.filter((m) => m.status === "active").map((m) => m.githubLogin);
  const byKey = pickPullPerTask(prefix, pulls, logins);
  if (!byKey.size) return { synced: true, moved: [] };

  const tasks = await db
    .collection(TASKS)
    .find({ teamId: team._id, key: { $in: [...byKey.keys()] } }, { projection: { comments: 0 } })
    .toArray();

  const moved = [];
  const events = [];
  const now = new Date();
  for (const task of tasks) {
    const change = planTaskUpdate(task, byKey.get(task.key));
    if (!change) continue;
    // Guarded on updatedAt: if a member edits the card mid-sync, their edit
    // wins and the next sync applies the PR state on top of it.
    const res = await db.collection(TASKS).updateOne(
      { _id: task._id, updatedAt: task.updatedAt, status: { $ne: "done" } },
      { $set: { status: change.status, pr: change.pr, doneAt: change.doneAt, updatedAt: now } },
    );
    if (!res.modifiedCount) continue;
    if (change.status !== task.status) {
      events.push({ teamId: team._id, taskId: task._id, actor: "github", type: "moved", from: task.status, to: change.status, at: now, prNumber: change.pr.number });
      moved.push({ ref: formatRef(prefix, task.key), from: task.status, to: change.status, prNumber: change.pr.number });
    }
  }
  if (events.length) await db.collection(TASK_EVENTS).insertMany(events);
  return { synced: true, moved };
};
