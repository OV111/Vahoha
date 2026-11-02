/**
 * Shared data access for the teams module: collection names, indexes and the
 * error helper. Doc shapes are documented here because the backend is plain JS.
 *
 * teams:              { name, trackId, status, repo: {fullName, id, url}, createdBy (userId, or null if an admin made it),
 *                       startedAt (forming -> active),
 *                       members: [{userId, githubLogin, status, joinedAt, leftAt}],
 *                       leadId (userId, or "ai" when nobody is lead-eligible), coLeadId (userId|null),
 *                       taskPrefix ("TA"), nextTaskKey (last key handed out), boardSyncedAt,
 *                       createdAt, updatedAt }
 * team_contributions: { teamId, prNumber, authorId, authorLogin, reviewers: [login],
 *                       changedFiles: [{path, additions, deletions}], mergedAt, syncedAt }
 * team_defenses:      same shape as capstone_defenses, keyed by teamId + userId
 * team_evidence:      { teamId, publicId, snapshot, issuedAt }
 * team_ratings:       { teamId, raterId, rateeId, score (1-5), comment, createdAt, updatedAt }
 * team_profiles:      { userId,
 *                       cv: {level, skills, technologies, years, roles, areas, sourceUrl, extractedAt, confirmedAt}, cvTriedUrl, cvTriedAt }
 * team_tasks:         { teamId, key (number, per team), title, description, status, assigneeId|null,
 *                       creatorId (userId or "ai"), size, area|null, skills: [layerId], dueAt|null,
 *                       sprintId|null, pr: {number, state, url}|null, comments: [{_id, authorId, body, at}],
 *                       commentCount, createdAt, updatedAt, doneAt|null }
 * team_sprints:       { teamId, name, goal, startAt, endAt, status, createdBy, createdAt, closedAt|null }
 * team_task_events:   { teamId, taskId, actor (userId | "ai" | "github"), type, from, to, at }
 * team_plans:         { teamId, sprintId|null, goal, notes, status (draft|accepted|discarded), tasks: [draft task],
 *                       createdBy, createdAt, acceptedBy, acceptedAt, edits: [{index, change, from, to}], taskKeys }
 * team_warnings:      { teamId, type, subjectKey, open, audience (team|lead), subjectUserId|null, message,
 *                       selfMessage|null, severity, openedAt, lastSeenAt, resolvedAt|null }
 * team_updates:       { teamId, weekStart, facts, note|null, createdAt }
 */

export const TEAMS = "teams";
export const CONTRIBUTIONS = "team_contributions";
export const TEAM_DEFENSES = "team_defenses";
export const TEAM_EVIDENCE = "team_evidence";
export const RATINGS = "team_ratings";
export const TEAM_PROFILES = "team_profiles";
export const TASKS = "team_tasks";
export const SPRINTS = "team_sprints";
export const TASK_EVENTS = "team_task_events";
export const PLANS = "team_plans";
export const WARNINGS = "team_warnings";
export const UPDATES = "team_updates";

export { TEAM_STATUSES } from "../../../../constants/teams.js";
export const MEMBER_STATUSES = ["invited", "active", "left"];

let indexesReady = null;
export const ensureIndexes = (db) => {
  indexesReady ??= Promise.all([
    // "Find my team" runs on every team page load.
    db.collection(TEAMS).createIndex({ "members.userId": 1, status: 1 }),
    // One team per GitHub repo; sparse so teams without a repo yet don't collide on null.
    db.collection(TEAMS).createIndex({ "repo.id": 1 }, { unique: true, sparse: true }),
    // Re-syncing the same PR must update, never duplicate.
    db.collection(CONTRIBUTIONS).createIndex({ teamId: 1, prNumber: 1 }, { unique: true }),
    db.collection(CONTRIBUTIONS).createIndex({ teamId: 1, authorId: 1 }),
    // A double "start" for the same session collides here.
    db.collection(TEAM_DEFENSES).createIndex({ teamId: 1, userId: 1, sessionNumber: 1 }, { unique: true }),
    db.collection(TEAM_DEFENSES).createIndex({ userId: 1, status: 1 }),
    // One rating per (rater, ratee) pair: re-rating updates instead of duplicating.
    db.collection(RATINGS).createIndex({ teamId: 1, raterId: 1, rateeId: 1 }, { unique: true }),
    // The public id IS the evidence URL, so it must be unique.
    db.collection(TEAM_EVIDENCE).createIndex({ publicId: 1 }, { unique: true }),
    // One evidence doc per team: re-issuing refreshes it and keeps the same link.
    db.collection(TEAM_EVIDENCE).createIndex({ teamId: 1 }, { unique: true }),
    db.collection(TEAM_PROFILES).createIndex({ userId: 1 }, { unique: true }),
    // Keys come from an atomic counter on the team; this catches any bug that hands one out twice.
    db.collection(TASKS).createIndex({ teamId: 1, key: 1 }, { unique: true }),
    db.collection(TASKS).createIndex({ assigneeId: 1, status: 1 }),
    db.collection(SPRINTS).createIndex({ teamId: 1, startAt: -1 }),
    // At most one active sprint per team, even when two leads start one at once.
    db.collection(SPRINTS).createIndex(
      { teamId: 1 },
      { unique: true, partialFilterExpression: { status: "active" }, name: "one_active_sprint" },
    ),
    db.collection(TASK_EVENTS).createIndex({ teamId: 1, taskId: 1, at: -1 }),
    db.collection(PLANS).createIndex({ teamId: 1, createdAt: -1 }),
    // At most one draft per team: a new plan replaces the old one.
    db.collection(PLANS).createIndex(
      { teamId: 1 },
      { unique: true, partialFilterExpression: { status: "draft" }, name: "one_draft_plan" },
    ),
    // One open warning per subject; a resolved one can open again later as a new document.
    db.collection(WARNINGS).createIndex(
      { teamId: 1, type: 1, subjectKey: 1 },
      { unique: true, partialFilterExpression: { open: true }, name: "one_open_warning" },
    ),
    db.collection(WARNINGS).createIndex({ teamId: 1, open: 1, openedAt: -1 }),
    // One weekly update per team and week, even when several members open the page at once.
    db.collection(UPDATES).createIndex({ teamId: 1, weekStart: 1 }, { unique: true }),
  ]).catch((err) => {
    indexesReady = null; // retry on the next request instead of caching a failure
    throw err;
  });
  return indexesReady;
};
