/**
 * Team levels and leads. Gathers each member's evidence from its owners
 * (capstone, team stats, readiness rules), then applies the pure rules in
 * lib/teamLevel.js. Nothing here is self-reported except the confirmed CV
 * estimate, which can never make anyone lead-eligible.
 */

import { ObjectId } from "mongodb";
import { getCapstoneEvidence } from "../../../capstone/index.js";
import { buildEvidence, computeReadiness } from "../../../readiness/index.js";
import { computeTeamLevel, pickLeads } from "../../lib/teamLevel.js";
import { getMemberStats } from "./memberStatsService.js";
import { TEAMS, TEAM_PROFILES } from "../teamsData.js";

export const levelFor = async (db, userId) => {
  const uid = new ObjectId(userId);
  const [capstone, stats, profile] = await Promise.all([
    getCapstoneEvidence(db, uid),
    getMemberStats(db, uid),
    db.collection(TEAM_PROFILES).findOne({ userId: uid }, { projection: { cv: 1 } }),
  ]);
  const evidence = buildEvidence(capstone, stats);
  const { overall, spheres } = computeReadiness(evidence);
  const result = computeTeamLevel({
    capstonePassed: evidence.capstonePassed,
    readinessOverall: overall,
    judgment: spheres.judgment,
    finishedTeams: stats.finishedTeams,
    defensesPassed: evidence.defensesPassed,
    peerAverage: stats.peerAverage,
    cv: profile?.cv ?? null,
  });
  return { ...result, peerAverage: stats.peerAverage, mergedPrs: stats.mergedPrs };
};

/** GET /api/teams/me/level: the signed-in user's own level and what is missing for the next one. */
export const getMyTeamLevelService = async (db, userId) => {
  const { level, provisional, next } = await levelFor(db, userId);
  return { level, provisional, next };
};

const activeMembers = (team) => team.members.filter((m) => m.status === "active");

/** Level per active member, keyed by userId, for the team page. Teammates see the level, not the inputs. */
export const getMemberLevelsService = async (db, team) => {
  const members = activeMembers(team);
  const levels = await Promise.all(members.map((m) => levelFor(db, m.userId)));
  return Object.fromEntries(
    members.map((m, i) => [String(m.userId), { level: levels[i].level, provisional: levels[i].provisional }]),
  );
};

const leadStillActive = (team) =>
  team.leadId && (typeof team.leadId === "string" || activeMembers(team).some((m) => m.userId.equals(team.leadId)));

/**
 * Picks the lead and co-lead again. While the team is forming this runs on
 * every member change; after that a human lead stays put (changing lead
 * mid-project would rewrite who owned the plan) unless they left.
 */
export const refreshLeadService = async (db, team) => {
  let current = team;
  for (let attempt = 0; attempt < 3 && current; attempt += 1) {
    if (current.status !== "forming" && leadStillActive(current)) return current;

    const members = activeMembers(current);
    const levels = await Promise.all(members.map((m) => levelFor(db, m.userId)));
    const { leadId, coLeadId } = pickLeads(members.map((m, i) => ({ ...m, ...levels[i] })));

    // Guarded on updatedAt: if members changed while levels were computed,
    // re-read and pick again rather than saving a lead for a stale roster.
    const saved = await db
      .collection(TEAMS)
      .findOneAndUpdate(
        { _id: current._id, updatedAt: current.updatedAt },
        { $set: { leadId, coLeadId } },
        { returnDocument: "after" },
      );
    if (saved) return saved;
    current = await db.collection(TEAMS).findOne({ _id: current._id });
  }
  return current;
};
