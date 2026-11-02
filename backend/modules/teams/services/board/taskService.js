/**
 * Team tasks: the board's cards. Any active member creates and edits tasks;
 * the rules on who assigns, moves and deletes live in lib/taskRules.js.
 * Every change that matters later (status, assignee) is written to
 * team_task_events, so the AI lead and the evidence page can read the history.
 */

import { ObjectId } from "mongodb";
import { TASK_LIMITS } from "../../../../../constants/teams.js";
import { assignRefusal, deleteRefusal, derivePrefix, formatRef, moveRefusal } from "../../lib/taskRules.js";
import { assertActiveMember, loadBoard } from "./boardAccess.js";
import { SPRINTS, TASKS, TASK_EVENTS, TEAMS } from "../teamsData.js";
import { fail } from "../../../../utils/httpErrors.js";

const toId = (v) => (v == null ? null : new ObjectId(v));

const toTask = (team, doc) => {
  const { comments, ...rest } = doc;
  return { ...rest, ref: formatRef(team.taskPrefix ?? derivePrefix(team.name), doc.key), ...(comments ? { comments } : {}) };
};

const logEvents = (db, events) => (events.length ? db.collection(TASK_EVENTS).insertMany(events) : null);

export const assertSprintUsable = async (db, teamId, sprintId) => {
  if (sprintId == null) return;
  const sprint = await db.collection(SPRINTS).findOne({ _id: new ObjectId(sprintId), teamId }, { projection: { status: 1 } });
  if (!sprint) fail(400, "Sprint not found on this team");
  if (sprint.status === "closed") fail(409, "That sprint is closed");
};

const findTask = async (db, teamId, key, projection) => {
  const task = await db.collection(TASKS).findOne({ teamId, key }, projection ? { projection } : undefined);
  return task ?? fail(404, "Task not found");
};

// Atomic: two members creating a task at the same moment get different keys.
// Teams made before the board have no prefix or counter yet; the first task sets them.
const nextKey = async (db, team) => {
  const updated = await db.collection(TEAMS).findOneAndUpdate(
    { _id: team._id },
    [
      {
        $set: {
          nextTaskKey: { $add: [{ $ifNull: ["$nextTaskKey", 0] }, 1] },
          taskPrefix: { $ifNull: ["$taskPrefix", derivePrefix(team.name)] },
        },
      },
    ],
    { returnDocument: "after", projection: { nextTaskKey: 1, taskPrefix: 1 } },
  );
  return updated;
};

export const listTasksService = async (db, teamId, user, { sprint, assignee } = {}) => {
  const { team } = await loadBoard(db, teamId, user);
  const filter = { teamId: team._id };
  if (sprint === "none") filter.sprintId = null;
  else if (sprint) filter.sprintId = new ObjectId(sprint);
  if (assignee === "none") filter.assigneeId = null;
  else if (assignee) filter.assigneeId = new ObjectId(assignee);

  const rows = await db
    .collection(TASKS)
    .find(filter, { projection: { comments: 0 } })
    .sort({ key: 1 })
    .limit(TASK_LIMITS.perTeam)
    .toArray();
  return rows.map((t) => toTask(team, t));
};

export const getTaskService = async (db, teamId, key, user) => {
  const { team } = await loadBoard(db, teamId, user);
  return toTask(team, await findTask(db, team._id, key));
};

export const createTaskService = async (db, teamId, user, body) => {
  const { team, uid } = await loadBoard(db, teamId, user, { write: true });

  const assigneeId = toId(body.assigneeId);
  assertActiveMember(team, assigneeId);
  const refusal = assignRefusal(team, { assigneeId: null }, uid, assigneeId);
  if (refusal) fail(403, refusal);
  await assertSprintUsable(db, team._id, body.sprintId);

  // A soft cap: a race can pass it by one or two, which is harmless.
  if ((await db.collection(TASKS).countDocuments({ teamId: team._id })) >= TASK_LIMITS.perTeam) {
    fail(409, `A team board holds at most ${TASK_LIMITS.perTeam} tasks`);
  }

  return insertTask(db, team, { ...body, assigneeId }, { creatorId: uid, actor: uid });
};

/**
 * Creates one task with the next key. Shared by the board and the AI lead's
 * accepted plans, so both follow the same shape and history.
 * @param {{creatorId: *, actor: *}} who  creatorId and actor are a userId or "ai"
 */
export const insertTask = async (db, team, fields, { creatorId, actor }) => {
  const counter = await nextKey(db, team);
  const now = new Date();
  const task = {
    teamId: team._id,
    key: counter.nextTaskKey,
    title: fields.title,
    description: fields.description ?? "",
    status: fields.status ?? "backlog",
    assigneeId: toId(fields.assigneeId),
    creatorId,
    size: fields.size ?? "M",
    area: fields.area ?? null,
    skills: fields.skills ?? [],
    dueAt: fields.dueAt ?? null,
    sprintId: toId(fields.sprintId),
    pr: null,
    comments: [],
    commentCount: 0,
    createdAt: now,
    updatedAt: now,
    doneAt: null,
  };
  const { insertedId } = await db.collection(TASKS).insertOne(task);
  await logEvents(db, [{ teamId: team._id, taskId: insertedId, actor, type: "created", from: null, to: task.status, at: now }]);
  const { comments: _omit, ...listed } = task;
  return toTask({ ...team, taskPrefix: counter.taskPrefix }, { ...listed, _id: insertedId });
};

const EDITABLE = ["title", "description", "size", "area", "skills", "dueAt"];

export const updateTaskService = async (db, teamId, key, user, patch) => {
  const { team, uid } = await loadBoard(db, teamId, user, { write: true });
  const task = await findTask(db, team._id, key, { comments: 0 });

  const set = {};
  for (const field of EDITABLE) if (field in patch) set[field] = patch[field];
  const events = [];
  const now = new Date();

  if ("assigneeId" in patch) {
    const next = toId(patch.assigneeId);
    assertActiveMember(team, next);
    const refusal = assignRefusal(team, task, uid, next);
    if (refusal) fail(403, refusal);
    if (String(next) !== String(task.assigneeId)) {
      set.assigneeId = next;
      events.push({ type: "assigned", from: task.assigneeId, to: next });
    }
  }
  if ("status" in patch) {
    const refusal = moveRefusal(task, patch.status);
    if (refusal) fail(409, refusal);
    if (patch.status !== task.status) {
      set.status = patch.status;
      events.push({ type: "moved", from: task.status, to: patch.status });
    }
  }
  if ("sprintId" in patch) {
    await assertSprintUsable(db, team._id, patch.sprintId);
    set.sprintId = toId(patch.sprintId);
  }
  if (!Object.keys(set).length) return toTask(team, task);

  // Guarded on updatedAt: two people editing the same card, or a PR merge
  // landing mid-edit, must not silently overwrite each other.
  const updated = await db
    .collection(TASKS)
    .findOneAndUpdate(
      { _id: task._id, updatedAt: task.updatedAt },
      { $set: { ...set, updatedAt: now } },
      { returnDocument: "after", projection: { comments: 0 } },
    );
  if (!updated) fail(409, "Someone changed this task just now. Reload and try again");
  await logEvents(db, events.map((e) => ({ teamId: team._id, taskId: task._id, actor: uid, at: now, ...e })));
  return toTask(team, updated);
};

export const deleteTaskService = async (db, teamId, key, user) => {
  const { team, uid } = await loadBoard(db, teamId, user, { write: true });
  const task = await findTask(db, team._id, key, { comments: 0 });
  const refusal = deleteRefusal(team, task, uid);
  if (refusal) fail(403, refusal);

  // pr: null in the filter: a PR linked between the read and the delete keeps the task.
  const { deletedCount } = await db.collection(TASKS).deleteOne({ _id: task._id, pr: null });
  if (!deletedCount) fail(409, "This task now has a pull request linked, so it stays");
  await logEvents(db, [{ teamId: team._id, taskId: task._id, actor: uid, type: "deleted", from: task.status, to: null, at: new Date() }]);
  return { deleted: true };
};

export const addCommentService = async (db, teamId, key, user, { body }) => {
  const { team, uid } = await loadBoard(db, teamId, user, { write: true });
  const comment = { _id: new ObjectId(), authorId: uid, body, at: new Date() };
  const updated = await db.collection(TASKS).findOneAndUpdate(
    { teamId: team._id, key },
    // Keeps the newest comments only, so one chatty card can't grow without bound.
    { $push: { comments: { $each: [comment], $slice: -TASK_LIMITS.comments } }, $inc: { commentCount: 1 } },
    { projection: { _id: 1 } },
  );
  if (!updated) fail(404, "Task not found");
  return comment;
};
