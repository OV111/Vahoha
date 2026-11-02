/**
 * Team stats for the /team leaderboard and the /team/admin health overview.
 *
 * Computed on read: four parallel queries for all the teams asked for, then the
 * pure rules in lib/teamScore.js. Stats change on sync, rating and defense, so
 * storing them would mean updating three write paths; at pilot scale (tens of
 * teams) reading is milliseconds. Materialise onto the team doc when it isn't.
 *
 * Same counting rules as the evidence snapshot: only passed, unflagged defenses
 * count, and peer averages follow MIN_RATERS (ratingService.js).
 */

import { CONTRIBUTIONS, RATINGS, SPRINTS, TASKS, TEAMS, TEAM_DEFENSES, TEAM_EVIDENCE, ensureIndexes } from "../teamsData.js";
import { getTeamHealthForAdmin } from "../ai-lead/teamPulseService.js";
import { AI_LEAD } from "../../../../../constants/teams.js";
import { MIN_RATERS } from "../proof/ratingService.js";
import { MIN_PRS_TO_RANK, computeTeamStats, scoreTeam, teamFlags } from "../../lib/teamScore.js";

const LEADERBOARD_LIMIT = 50;
const key = (teamId, userId) => `${teamId}:${userId}`;

/** Group docs into Map<teamIdString, doc[]>. */
const byTeam = (docs) => {
  const map = new Map();
  for (const d of docs) {
    const id = d.teamId.toString();
    if (!map.has(id)) map.set(id, []);
    map.get(id).push(d);
  }
  return map;
};

/** Load everything needed to score `teams`, keyed for O(1) lookup per team. */
const loadInputs = async (db, teams) => {
  const teamIds = teams.map((t) => t._id);
  const [contributions, defenses, ratings, evidence] = await Promise.all([
    db
      .collection(CONTRIBUTIONS)
      .find({ teamId: { $in: teamIds } }, { projection: { teamId: 1, authorId: 1, reviewers: 1, mergedAt: 1 } })
      .toArray(),
    // Best passed, unflagged score per (team, member).
    db
      .collection(TEAM_DEFENSES)
      .aggregate([
        { $match: { teamId: { $in: teamIds }, status: "graded", "result.passed": true, "flags.0": { $exists: false } } },
        { $group: { _id: { teamId: "$teamId", userId: "$userId" }, best: { $max: "$result.score" } } },
      ])
      .toArray(),
    db
      .collection(RATINGS)
      .aggregate([
        { $match: { teamId: { $in: teamIds } } },
        { $group: { _id: { teamId: "$teamId", rateeId: "$rateeId" }, average: { $avg: "$score" }, raters: { $sum: 1 } } },
        { $match: { raters: { $gte: MIN_RATERS } } },
      ])
      .toArray(),
    db
      .collection(TEAM_EVIDENCE)
      .find({ teamId: { $in: teamIds } }, { projection: { teamId: 1, publicId: 1, revoked: 1, issuedAt: 1, updatedAt: 1 } })
      .toArray(),
  ]);

  return {
    contributions: byTeam(contributions),
    defense: new Map(defenses.map((d) => [key(d._id.teamId, d._id.userId), d.best])),
    peer: new Map(ratings.map((r) => [key(r._id.teamId, r._id.rateeId), r.average])),
    evidence: new Map(evidence.map((e) => [e.teamId.toString(), e])),
  };
};

/** Per-member lookups scoped to one team, in the shape computeTeamStats expects. */
const scoped = (map, team) => {
  const out = new Map();
  for (const m of team.members) {
    const v = map.get(key(team._id, m.userId));
    if (v != null) out.set(m.userId.toString(), v);
  }
  return out;
};

const statsFor = (team, inputs, now) => {
  const stats = computeTeamStats(
    team,
    inputs.contributions.get(team._id.toString()) ?? [],
    scoped(inputs.defense, team),
    scoped(inputs.peer, team),
    now,
  );
  return { stats, ...scoreTeam(stats) };
};

const byScore = (x, y) => y.score - x.score || y.mergedPrs - x.mergedPrs || x.name.localeCompare(y.name);

/**
 * Ranked teams for any signed-in user. Only teams with a live (issued, not
 * revoked) evidence page are listed: issuing evidence is the consent step.
 * Returns no internal ids, member names or flags, only what the evidence page
 * already shows publicly, plus the score.
 */
export const getLeaderboardService = async (db, viewerId, { trackId } = {}) => {
  await ensureIndexes(db);
  const live = await db.collection(TEAM_EVIDENCE).find({ revoked: false }, { projection: { teamId: 1 } }).toArray();
  const teams = await db
    .collection(TEAMS)
    .find({ _id: { $in: live.map((e) => e.teamId) }, status: { $ne: "disbanded" } })
    .toArray();

  const inputs = await loadInputs(db, teams);
  const now = new Date();
  const eligible = teams
    .map((team) => {
      const { stats, score, breakdown } = statsFor(team, inputs, now);
      return {
        name: team.name,
        trackId: team.trackId,
        status: team.status,
        memberCount: stats.memberCount,
        mergedPrs: stats.mergedPrs,
        prsLast7d: stats.prsLast7d,
        score,
        breakdown,
        evidencePath: `/evidence/${inputs.evidence.get(team._id.toString()).publicId}`,
        isMine: team.members.some((m) => m.status === "active" && m.userId.toString() === String(viewerId)),
      };
    })
    .filter((row) => row.mergedPrs >= MIN_PRS_TO_RANK);

  const tracks = [...new Set(eligible.map((r) => r.trackId))].sort();
  const rows = eligible
    .filter((r) => !trackId || r.trackId === trackId)
    .sort(byScore)
    .slice(0, LEADERBOARD_LIMIT)
    .map((r, i) => ({ rank: i + 1, ...r }));

  return { tracks, rows, minPrs: MIN_PRS_TO_RANK };
};

const FLAG_WEIGHT = { "no-repo": 3, stale: 3, "silent-members": 2, "low-peer": 2, "evidence-stale": 1 };
const risk = (flags) => flags.reduce((n, f) => n + FLAG_WEIGHT[f], 0);

const HEALTH_RANK = { red: 2, yellow: 1, green: 0 };
const isOpen = (team) => team.status !== "completed" && team.status !== "disbanded";

// Board figures for every team in two queries: open tasks, and the active sprint's progress.
const loadBoardFigures = async (db, teams) => {
  const ids = teams.map((t) => t._id);
  const [counts, sprints] = await Promise.all([
    db
      .collection(TASKS)
      .aggregate([
        { $match: { teamId: { $in: ids } } },
        { $group: { _id: { teamId: "$teamId", sprintId: "$sprintId", done: { $eq: ["$status", "done"] } }, n: { $sum: 1 } } },
      ])
      .toArray(),
    db.collection(SPRINTS).find({ teamId: { $in: ids }, status: "active" }, { projection: { teamId: 1, name: 1 } }).toArray(),
  ]);
  const figures = new Map(ids.map((id) => [String(id), { openTasks: 0, sprint: null }]));
  const activeSprint = new Map(sprints.map((sp) => [String(sp.teamId), sp]));
  for (const [teamId, sp] of activeSprint) figures.get(teamId).sprint = { name: sp.name, done: 0, total: 0 };
  for (const { _id, n } of counts) {
    const f = figures.get(String(_id.teamId));
    if (!_id.done) f.openTasks += n;
    const sp = activeSprint.get(String(_id.teamId));
    if (sp && _id.sprintId && String(_id.sprintId) === String(sp._id)) {
      f.sprint.total += n;
      if (_id.done) f.sprint.done += n;
    }
  }
  return figures;
};

const loginOf = (team, id) => team.members.find((m) => String(m.userId) === String(id))?.githubLogin ?? null;
const leadOf = (team) => ({
  ai: team.leadId === AI_LEAD,
  login: team.leadId && team.leadId !== AI_LEAD ? loginOf(team, team.leadId) : null,
  coLeadLogin: team.coLeadId ? loginOf(team, team.coLeadId) : null,
});

/** Every team with stats, score, flags and the AI lead's health, riskiest first. Admin only. */
export const getAdminOverviewService = async (db) => {
  await ensureIndexes(db);
  const teams = await db.collection(TEAMS).find({}).toArray();
  const [inputs, boards, pulses] = await Promise.all([
    loadInputs(db, teams),
    loadBoardFigures(db, teams),
    // Health only for teams still running; a finished team's board is frozen.
    Promise.all(teams.map((t) => (isOpen(t) ? getTeamHealthForAdmin(db, t) : null))),
  ]);
  const pulseOf = new Map(teams.map((t, i) => [String(t._id), pulses[i]]));
  const now = new Date();

  const rows = teams.map((team) => {
    const { stats, score, breakdown } = statsFor(team, inputs, now);
    const evidence = inputs.evidence.get(team._id.toString()) ?? null;
    const flags = teamFlags(team, stats, evidence, now);
    return {
      teamId: team._id,
      name: team.name,
      trackId: team.trackId,
      status: team.status,
      hasRepo: Boolean(team.repo),
      memberCount: stats.memberCount,
      mergedPrs: stats.mergedPrs,
      prsLast7d: stats.prsLast7d,
      defenseAvg: stats.defenseAvg,
      peerAvg: stats.peerAvg,
      lastMergedAt: stats.lastMergedAt,
      silentMembers: stats.silentMembers,
      score,
      breakdown,
      flags,
      evidence: evidence ? { revoked: evidence.revoked, path: `/evidence/${evidence.publicId}` } : null,
      health: pulseOf.get(String(team._id))?.health ?? null,
      warnings: pulseOf.get(String(team._id))?.warnings ?? [],
      lead: leadOf(team),
      ...boards.get(String(team._id)),
    };
  });

  rows.sort(
    (x, y) => (HEALTH_RANK[y.health] ?? -1) - (HEALTH_RANK[x.health] ?? -1) || risk(y.flags) - risk(x.flags) || byScore(x, y),
  );

  const open = rows.filter((r) => r.status !== "completed" && r.status !== "disbanded");
  return {
    summary: {
      activeTeams: open.length,
      prsThisWeek: rows.reduce((n, r) => n + r.prsLast7d, 0),
      atRisk: open.filter((r) => r.flags.length > 0 || r.health === "red").length,
      liveEvidence: rows.filter((r) => r.evidence && !r.evidence.revoked).length,
    },
    rows,
  };
};
