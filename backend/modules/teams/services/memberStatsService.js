/**
 * One member's team proof as counts, for the readiness model and the mentor.
 *
 * Same counting rules as the public evidence snapshot (evidenceService.js), so
 * readiness never credits something the evidence page would not show:
 * - a merged PR counts for its author;
 * - a review counts when the member's GitHub login is among the PR's reviewers
 *   (case-insensitive; the author is never listed as their own reviewer);
 * - a defense counts once per team, only if passed and not flagged for review;
 * - the peer average follows the MIN_RATERS privacy rule.
 *
 * Every team the user ever joined counts, including ones they left: the work
 * they merged there is still theirs.
 */

import { ObjectId } from "mongodb";
import { CONTRIBUTIONS, TEAMS, TEAM_DEFENSES } from "./teamsData.js";
import { averageReceivedRating } from "./ratingService.js";

const EMPTY = Object.freeze({ teamCount: 0, mergedPrs: 0, reviewsGiven: 0, defensesPassed: 0, peerAverage: null });

/** Pure: count one member's PRs and reviews from their teams' contributions. */
export const countContributions = (contributions, userId, logins) => {
  const mine = new Set(logins.map((l) => l.toLowerCase()));
  let mergedPrs = 0;
  let reviewsGiven = 0;
  for (const c of contributions) {
    if (c.authorId.equals(userId)) mergedPrs += 1;
    if (c.reviewers.some((r) => mine.has(r.toLowerCase()))) reviewsGiven += 1;
  }
  return { mergedPrs, reviewsGiven };
};

export const getMemberStats = async (db, userId) => {
  const uid = new ObjectId(userId);
  const teams = await db
    .collection(TEAMS)
    .find({ "members.userId": uid }, { projection: { members: 1 } })
    .toArray();
  // Most learners are on no team: one indexed query and done, which matters
  // because the mentor calls this on every message.
  if (!teams.length) return EMPTY;

  const teamIds = teams.map((t) => t._id);
  const logins = teams.flatMap((t) => t.members.filter((m) => m.userId.equals(uid)).map((m) => m.githubLogin));

  const [contributions, passedTeamIds, peerAverage] = await Promise.all([
    db
      .collection(CONTRIBUTIONS)
      .find({ teamId: { $in: teamIds } }, { projection: { authorId: 1, reviewers: 1 } })
      .toArray(),
    db.collection(TEAM_DEFENSES).distinct("teamId", {
      userId: uid,
      status: "graded",
      "result.passed": true,
      "flags.0": { $exists: false },
    }),
    averageReceivedRating(db, teamIds, uid),
  ]);

  return {
    teamCount: teams.length,
    ...countContributions(contributions, uid, logins),
    defensesPassed: passedTeamIds.length,
    peerAverage,
  };
};
