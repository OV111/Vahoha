/**
 * Pure: a member's team level and the team's lead. No database, no clock, so
 * every rule is unit-tested (tests/unit/teamLevel.unit.test.js).
 *
 * @typedef {Object} LevelEvidence
 * @property {boolean} capstonePassed
 * @property {string} readinessOverall   "entry" | "approaching-mid" | "mid-ready"
 * @property {string} judgment           readiness Judgment sphere: "none" | "shown" | "strong"
 * @property {number} finishedTeams      teams with status "completed" the member was on
 * @property {number} defensesPassed     capstone + team defenses
 * @property {number|null} peerAverage
 * @property {{level: string, confirmedAt: Date|null}|null} cv  extracted CV estimate (stage 4)
 */

import { AI_LEAD, TEAM_LEVELS } from "../../../../constants/teams.js";

// Starting guesses: tune once real teams produce data.
export const LEVEL_RULES = {
  leadMinFinishedTeams: 1,
  leadMinPeerAverage: 4,
  // The CV only counts until the platform has real evidence of its own.
  cvFadesAtFinishedTeams: 1,
  cvFadesAtDefenses: 2,
};

const MID_READINESS = new Set(["approaching-mid", "mid-ready"]);
const rankOf = (level) => TEAM_LEVELS.indexOf(level);

const cvCounts = (e) =>
  Boolean(e.cv?.confirmedAt) &&
  e.cv.level === "mid" &&
  e.finishedTeams < LEVEL_RULES.cvFadesAtFinishedTeams &&
  e.defensesPassed < LEVEL_RULES.cvFadesAtDefenses;

/**
 * @param {LevelEvidence} e
 * @returns {{level: string, provisional: boolean, next: string[]}}
 *   provisional: the level rests on the CV alone.
 *   next: requirement ids still missing for the next level up.
 */
export const computeTeamLevel = (e) => {
  if (!e.capstonePassed) return { level: "starter", provisional: false, next: ["capstone"] };

  const evidenceMid = MID_READINESS.has(e.readinessOverall);
  const leadChecks = {
    readiness: evidenceMid,
    finishedTeam: e.finishedTeams >= LEVEL_RULES.leadMinFinishedTeams,
    peerRating: e.peerAverage !== null && e.peerAverage !== undefined && e.peerAverage >= LEVEL_RULES.leadMinPeerAverage,
    judgment: e.judgment === "strong",
  };
  const missingForLead = Object.keys(leadChecks).filter((k) => !leadChecks[k]);

  if (missingForLead.length === 0) return { level: "lead-eligible", provisional: false, next: [] };
  if (evidenceMid) return { level: "mid", provisional: false, next: missingForLead };
  // A CV can lift a Junior to a provisional Mid, never to lead-eligible.
  if (cvCounts(e)) return { level: "mid", provisional: true, next: missingForLead };
  return { level: "junior", provisional: false, next: ["readiness"] };
};

// Best first: higher level, evidence over CV, better peer rating, more merged
// PRs, longer on the team, then id so the result never depends on input order.
const compareCandidates = (a, b) =>
  rankOf(b.level) - rankOf(a.level) ||
  Number(a.provisional) - Number(b.provisional) ||
  (b.peerAverage ?? 0) - (a.peerAverage ?? 0) ||
  (b.mergedPrs ?? 0) - (a.mergedPrs ?? 0) ||
  new Date(a.joinedAt) - new Date(b.joinedAt) ||
  String(a.userId).localeCompare(String(b.userId));

/**
 * @param {{userId: *, joinedAt: Date, level: string, provisional: boolean, peerAverage: number|null, mergedPrs: number}[]} members
 *   active members only
 * @returns {{leadId: *, coLeadId: *|null}}
 *   A lead-eligible member leads. Otherwise the AI leads, and the best Mid
 *   member (if any) is co-lead.
 */
export const pickLeads = (members) => {
  const ranked = [...members].sort(compareCandidates);
  const best = ranked[0];
  if (best?.level === "lead-eligible") return { leadId: best.userId, coLeadId: null };
  const coLead = ranked.find((m) => m.level === "mid");
  return { leadId: AI_LEAD, coLeadId: coLead?.userId ?? null };
};
