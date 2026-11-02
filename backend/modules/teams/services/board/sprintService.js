/**
 * Sprints: a goal and a date range the team's tasks are planned into.
 * planned -> active -> closed (or planned -> closed to cancel). One active
 * sprint per team, enforced by a partial unique index, not by a read-then-write.
 */

import { ObjectId } from "mongodb";
import { canPlanSprints, sprintProgress } from "../../lib/taskRules.js";
import { loadBoard } from "./boardAccess.js";
import { SPRINTS, TASKS } from "../teamsData.js";
import { fail } from "../../../../utils/httpErrors.js";

const MAX_SPRINT_DAYS = 42;
const DAY = 86_400_000;

const NEXT = { planned: ["active", "closed"], active: ["closed"], closed: [] };

const assertDates = (startAt, endAt) => {
  if (endAt <= startAt) fail(400, "A sprint has to end after it starts");
  if (endAt - startAt > MAX_SPRINT_DAYS * DAY) fail(400, `A sprint lasts at most ${MAX_SPRINT_DAYS} days`);
};

const assertPlanner = (board) => {
  if (!canPlanSprints(board.team, board.uid, board.isAdmin)) fail(403, "Only the lead or co-lead plans sprints");
};

export const listSprintsService = async (db, teamId, user) => {
  const { team } = await loadBoard(db, teamId, user);
  const [sprints, tasks] = await Promise.all([
    db.collection(SPRINTS).find({ teamId: team._id }).sort({ startAt: -1 }).limit(50).toArray(),
    db
      .collection(TASKS)
      .find({ teamId: team._id, sprintId: { $ne: null } }, { projection: { sprintId: 1, status: 1 } })
      .toArray(),
  ]);
  return sprints.map((s) => ({ ...s, progress: sprintProgress(tasks.filter((t) => t.sprintId.equals(s._id))) }));
};

export const createSprintService = async (db, teamId, user, body) => {
  const board = await loadBoard(db, teamId, user, { write: true, adminWrite: true });
  assertPlanner(board);
  assertDates(body.startAt, body.endAt);

  const sprint = {
    teamId: board.team._id,
    name: body.name,
    goal: body.goal ?? "",
    startAt: body.startAt,
    endAt: body.endAt,
    status: "planned",
    createdBy: board.uid,
    createdAt: new Date(),
    closedAt: null,
  };
  const { insertedId } = await db.collection(SPRINTS).insertOne(sprint);
  return { ...sprint, _id: insertedId, progress: sprintProgress([]) };
};

export const updateSprintService = async (db, teamId, sprintId, user, patch) => {
  const board = await loadBoard(db, teamId, user, { write: true, adminWrite: true });
  assertPlanner(board);
  const sprint = await db.collection(SPRINTS).findOne({ _id: new ObjectId(sprintId), teamId: board.team._id });
  if (!sprint) fail(404, "Sprint not found");
  if (sprint.status === "closed") fail(409, "This sprint is closed");

  const set = {};
  for (const field of ["name", "goal", "startAt", "endAt"]) if (field in patch) set[field] = patch[field];
  if ("startAt" in set || "endAt" in set) assertDates(set.startAt ?? sprint.startAt, set.endAt ?? sprint.endAt);

  if ("status" in patch && patch.status !== sprint.status) {
    if (!NEXT[sprint.status].includes(patch.status)) fail(409, `A ${sprint.status} sprint can't become ${patch.status}`);
    set.status = patch.status;
    if (patch.status === "closed") set.closedAt = new Date();
  }
  if (!Object.keys(set).length) return sprint;

  let updated;
  try {
    // status in the filter: two people closing or starting the same sprint can't both win.
    updated = await db
      .collection(SPRINTS)
      .findOneAndUpdate({ _id: sprint._id, status: sprint.status }, { $set: set }, { returnDocument: "after" });
  } catch (err) {
    if (err.code === 11000) fail(409, "Another sprint is already active. Close it first");
    throw err;
  }
  if (!updated) fail(409, "Someone changed this sprint just now. Reload and try again");

  // Closing hands unfinished work back to the backlog, ready for the next sprint.
  if (set.status === "closed") {
    await db
      .collection(TASKS)
      .updateMany({ teamId: board.team._id, sprintId: sprint._id, status: { $ne: "done" } }, { $set: { sprintId: null, updatedAt: new Date() } });
  }
  return updated;
};
