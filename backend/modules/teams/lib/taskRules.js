/**
 * Pure: task board rules. No database, so every rule is unit-tested
 * (tests/unit/taskRules.unit.test.js). Services call these and turn a
 * refusal into an HTTP error.
 */

import { BOARD_OPEN_STATUSES, MANUAL_TASK_STATUSES } from "../../../../constants/teams.js";

const same = (a, b) => a != null && b != null && String(a) === String(b);

/**
 * "TaskFlow API" -> "TA", "Payments" -> "PAY". Letters only, 2-4 characters,
 * so keys read like TA-12 and a PR title or branch can mention them.
 */
export const derivePrefix = (name) => {
  const words = String(name ?? "")
    .toUpperCase()
    .split(/[^A-Z0-9]+/)
    .map((w) => w.replace(/[^A-Z]/g, ""))
    .filter(Boolean);
  const prefix = words.length > 1 ? words.map((w) => w[0]).join("").slice(0, 4) : (words[0] ?? "").slice(0, 3);
  return prefix.length >= 2 ? prefix : "TM";
};

export const formatRef = (prefix, key) => `${prefix}-${key}`;

export const boardIsOpen = (team) => BOARD_OPEN_STATUSES.includes(team.status);

/** Lead or co-lead. The AI lead is the string "ai", so it never matches a user. */
export const isTeamLead = (team, userId) => same(team.leadId, userId) || same(team.coLeadId, userId);

/**
 * Anyone takes a task for themselves or drops their own; giving a task to
 * someone else, or taking it from someone else, is the lead's call.
 * @returns {string|null} reason for a refusal, or null when allowed
 */
export const assignRefusal = (team, task, actorId, nextAssigneeId) => {
  if (same(nextAssigneeId, task.assigneeId) || (nextAssigneeId == null && task.assigneeId == null)) return null;
  if (isTeamLead(team, actorId)) return null;
  const takingForSelf = same(nextAssigneeId, actorId) && task.assigneeId == null;
  const droppingOwn = nextAssigneeId == null && same(task.assigneeId, actorId);
  if (takingForSelf || droppingOwn) return null;
  return "Only the lead or co-lead can assign a task to someone else";
};

/** @returns {string|null} */
export const moveRefusal = (task, nextStatus) => {
  if (nextStatus === task.status) return null;
  if (task.status === "done") return "A done task is closed by its merged pull request";
  if (!MANUAL_TASK_STATUSES.includes(nextStatus)) return "A task moves to done only when its pull request is merged";
  return null;
};

/** @returns {string|null} */
export const deleteRefusal = (team, task, actorId) => {
  if (task.pr) return "This task has a pull request linked, so it stays on the record";
  if (same(task.creatorId, actorId) || isTeamLead(team, actorId)) return null;
  return "Only the person who created the task, or the lead, can delete it";
};

/** Sprints are planned by the lead or co-lead (an admin can always step in). */
export const canPlanSprints = (team, userId, isAdmin) => isAdmin || isTeamLead(team, userId);

export const sprintProgress = (tasks) => {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "done").length;
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
};
