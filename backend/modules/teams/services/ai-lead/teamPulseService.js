/**
 * AI lead, part 2: the team's pulse. Keeps team_warnings in step with the
 * rules in lib/teamPulse.js (at most every CHECK_INTERVAL_MS per team, claimed
 * atomically), and writes one weekly update per team: facts from the data, plus
 * a short note from the model when it has room. The model never sees or says
 * anything the facts don't contain.
 */

import { groqChat } from "../../../../services/groqChat.js";
import { computeHealth, computeWarnings, buildUpdateMessages, buildWeeklyFacts, weekStartOf } from "../../lib/teamPulse.js";
import { boardIsOpen, derivePrefix, isTeamLead } from "../../lib/taskRules.js";
import { loadBoard } from "../board/boardAccess.js";
import { levelFor } from "../team/teamLevelService.js";
import { CONTRIBUTIONS, SPRINTS, TASKS, TASK_EVENTS, TEAMS, UPDATES, WARNINGS } from "../teamsData.js";

const MODEL = "openai/gpt-oss-120b";
const CHECK_INTERVAL_MS = 10 * 60_000;
const DAY = 86_400_000;
const STARTED = new Set(["active", "defending"]);

const activeMembers = (team) => team.members.filter((m) => m.status === "active");
const prefixOf = (team) => team.taskPrefix ?? derivePrefix(team.name);

// When the "no merge in 7 days" clock starts: the earliest join on a team that is under way.
const startedAtOf = (team) => {
  if (!STARTED.has(team.status)) return null;
  if (team.startedAt) return team.startedAt; // self-serve teams record when they began
  const joins = activeMembers(team).map((m) => new Date(m.joinedAt).getTime());
  return joins.length ? new Date(Math.min(...joins)) : team.createdAt;
};

const claimCheck = async (db, team) => {
  const now = new Date();
  const claimed = await db.collection(TEAMS).findOneAndUpdate(
    {
      _id: team._id,
      $or: [{ warningsCheckedAt: { $exists: false } }, { warningsCheckedAt: { $lt: new Date(now - CHECK_INTERVAL_MS) } }],
    },
    { $set: { warningsCheckedAt: now } },
    { projection: { _id: 1 } },
  );
  return Boolean(claimed);
};

const lastActivity = async (db, team, memberIds) => {
  const since = new Date(Date.now() - 30 * DAY);
  const [events, merges, comments] = await Promise.all([
    db
      .collection(TASK_EVENTS)
      .aggregate([{ $match: { teamId: team._id, actor: { $in: memberIds }, at: { $gte: since } } }, { $group: { _id: "$actor", at: { $max: "$at" } } }])
      .toArray(),
    db
      .collection(CONTRIBUTIONS)
      .aggregate([{ $match: { teamId: team._id, authorId: { $in: memberIds } } }, { $group: { _id: "$authorId", at: { $max: "$mergedAt" } } }])
      .toArray(),
    db
      .collection(TASKS)
      .aggregate([
        { $match: { teamId: team._id, commentCount: { $gt: 0 } } },
        { $unwind: "$comments" },
        { $match: { "comments.authorId": { $in: memberIds } } },
        { $group: { _id: "$comments.authorId", at: { $max: "$comments.at" } } },
      ])
      .toArray(),
  ]);
  const latest = new Map();
  for (const row of [...events, ...merges, ...comments]) {
    const id = String(row._id);
    if (!latest.has(id) || row.at > latest.get(id)) latest.set(id, row.at);
  }
  return latest;
};

const gather = async (db, team) => {
  const members = activeMembers(team);
  const memberIds = members.map((m) => m.userId);
  const [levels, tasks, reviewMoves, contributions, sprint, lastActive] = await Promise.all([
    Promise.all(members.map((m) => levelFor(db, m.userId))),
    db.collection(TASKS).find({ teamId: team._id }, { projection: { comments: 0 } }).toArray(),
    db
      .collection(TASK_EVENTS)
      .aggregate([{ $match: { teamId: team._id, type: "moved", to: "in_review" } }, { $group: { _id: "$taskId", at: { $max: "$at" } } }])
      .toArray(),
    db
      .collection(CONTRIBUTIONS)
      .find({ teamId: team._id }, { projection: { prNumber: 1, authorId: 1, reviewers: 1, mergedAt: 1 } })
      .toArray(),
    db.collection(SPRINTS).findOne({ teamId: team._id, status: "active" }),
    lastActivity(db, team, memberIds),
  ]);
  return {
    prefix: prefixOf(team),
    members: members.map((m, i) => ({ userId: String(m.userId), login: m.githubLogin, level: levels[i].level, joinedAt: m.joinedAt })),
    tasks,
    inReviewSince: new Map(reviewMoves.map((r) => [String(r._id), r.at])),
    contributions,
    sprint,
    lastActive,
  };
};

/** Recomputes warnings if they are stale; opens new ones and resolves the ones that went away. */
const refreshWarnings = async (db, team) => {
  if (!boardIsOpen(team)) return; // a finished team's warnings stay as they were
  if (!(await claimCheck(db, team))) return;

  const ctx = await gather(db, team);
  const now = new Date();
  const current = computeWarnings({ ...ctx, now });

  for (const w of current) {
    try {
      await db.collection(WARNINGS).updateOne(
        { teamId: team._id, type: w.type, subjectKey: w.subjectKey, open: true },
        {
          $set: { audience: w.audience, subjectUserId: w.subjectUserId, message: w.message, selfMessage: w.selfMessage, severity: w.severity, lastSeenAt: now },
          $setOnInsert: { openedAt: now, resolvedAt: null },
        },
        { upsert: true },
      );
    } catch (err) {
      if (err.code !== 11000) throw err; // a concurrent check opened the same warning
    }
  }
  const stillOpen = current.map((w) => `${w.type}|${w.subjectKey}`);
  const open = await db.collection(WARNINGS).find({ teamId: team._id, open: true }, { projection: { type: 1, subjectKey: 1 } }).toArray();
  const gone = open.filter((w) => !stillOpen.includes(`${w.type}|${w.subjectKey}`)).map((w) => w._id);
  if (gone.length) await db.collection(WARNINGS).updateMany({ _id: { $in: gone } }, { $set: { open: false, resolvedAt: now } });
};

const writeNote = async (teamName, facts) => {
  try {
    // Background: nobody is waiting on it, so when the gate is busy the update ships without a note.
    const completion = await groqChat(
      { model: MODEL, messages: buildUpdateMessages(teamName, facts), reasoning_effort: "low", max_tokens: 1200, temperature: 0.4 },
      { priority: "background" },
    );
    const text = completion.choices?.[0]?.message?.content?.trim();
    return text ? text.slice(0, 800) : null;
  } catch (err) {
    console.error("team weekly note skipped:", err.message);
    return null;
  }
};

/** Last week's update, written the first time anyone opens the team page in a new week. */
const ensureWeeklyUpdate = async (db, team) => {
  const weekStart = weekStartOf(new Date());
  const from = new Date(weekStart - 7 * DAY);
  // No update for a week the team didn't exist in.
  if (new Date(team.createdAt) >= weekStart) return null;

  const existing = await db.collection(UPDATES).findOne({ teamId: team._id, weekStart });
  if (existing) return existing;

  const [tasks, events, contributions, warnings] = await Promise.all([
    db.collection(TASKS).find({ teamId: team._id }, { projection: { comments: 0 } }).toArray(),
    db.collection(TASK_EVENTS).find({ teamId: team._id, at: { $gte: from, $lt: weekStart } }).toArray(),
    db.collection(CONTRIBUTIONS).find({ teamId: team._id, mergedAt: { $gte: from, $lt: weekStart } }, { projection: { mergedAt: 1, reviewers: 1 } }).toArray(),
    db.collection(WARNINGS).find({ teamId: team._id, open: true }).toArray(),
  ]);
  const facts = buildWeeklyFacts({ prefix: prefixOf(team), tasks, events, contributions, warnings, from, to: weekStart });

  // Insert the facts first: of two page loads at once, only the winner asks the model.
  try {
    await db.collection(UPDATES).insertOne({ teamId: team._id, weekStart, facts, note: null, createdAt: new Date() });
  } catch (err) {
    if (err.code === 11000) return db.collection(UPDATES).findOne({ teamId: team._id, weekStart });
    throw err;
  }
  const note = await writeNote(team.name, facts);
  if (note) await db.collection(UPDATES).updateOne({ teamId: team._id, weekStart }, { $set: { note } });
  return { teamId: team._id, weekStart, facts, note };
};

const visibleTo = (team, viewerId, isAdmin) => (w) => {
  if (w.audience === "team") return w;
  if (isAdmin || isTeamLead(team, viewerId)) return w;
  if (w.subjectUserId && String(w.subjectUserId) === String(viewerId)) return { ...w, message: w.selfMessage ?? w.message };
  return null;
};

/** GET /api/teams/:teamId/pulse: health, the warnings this viewer may see, and last week's update. */
export const getPulseService = async (db, teamId, user) => {
  const { team, uid, isAdmin } = await loadBoard(db, teamId, user);
  await refreshWarnings(db, team);
  const [open, lastMerge, update] = await Promise.all([
    db.collection(WARNINGS).find({ teamId: team._id, open: true }).sort({ openedAt: 1 }).toArray(),
    db.collection(CONTRIBUTIONS).findOne({ teamId: team._id }, { sort: { mergedAt: -1 }, projection: { mergedAt: 1 } }),
    ensureWeeklyUpdate(db, team),
  ]);

  const health = computeHealth({ openWarnings: open, lastMergeAt: lastMerge?.mergedAt ?? null, startedAt: startedAtOf(team), now: new Date() });
  const show = visibleTo(team, uid, isAdmin);
  const warnings = open
    .map(show)
    .filter(Boolean)
    .map(({ type, subjectKey, audience, message, openedAt }) => ({ type, subjectKey, audience, message, openedAt }));

  return { health, warnings, update: update ? { weekStart: update.weekStart, facts: update.facts, note: update.note } : null };
};

/** For the admin overview (stage 7): health and open warnings of one team, without the viewer filter. */
export const getTeamHealthForAdmin = async (db, team) => {
  await refreshWarnings(db, team);
  const [open, lastMerge] = await Promise.all([
    db.collection(WARNINGS).find({ teamId: team._id, open: true }).sort({ openedAt: 1 }).toArray(),
    db.collection(CONTRIBUTIONS).findOne({ teamId: team._id }, { sort: { mergedAt: -1 }, projection: { mergedAt: 1 } }),
  ]);
  return {
    health: computeHealth({ openWarnings: open, lastMergeAt: lastMerge?.mergedAt ?? null, startedAt: startedAtOf(team), now: new Date() }),
    warnings: open.map(({ type, message, openedAt }) => ({ type, message, openedAt })),
    lastMergeAt: lastMerge?.mergedAt ?? null,
  };
};
