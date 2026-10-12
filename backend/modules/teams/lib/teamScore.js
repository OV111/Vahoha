/**
 * Team score and health flags. Pure: no DB, no clock (callers pass `now`), so
 * every rule here is unit-tested directly (tests/unit/teamScore.unit.test.js).
 *
 * Score (0-100) is a weighted sum of five signals, each normalised to 0-1:
 *
 *   output   35%  merged PRs per active member, capped at PR_TARGET
 *   defense  25%  each active member's best passed defense score, averaged
 *                 over ALL active members (one person defending is not a team)
 *   review   15%  share of merged PRs that had at least one reviewer
 *   balance  15%  1 - normalised Gini of PR counts: 1 = everyone ships equally
 *   peer     10%  Bayesian average of peer ratings, so one 5-star rating
 *                 cannot outrank many 4.5s (same idea as IMDb's top 250)
 *
 * Per-member and capped so team size and PR-splitting can't buy a rank.
 */

export const WEIGHTS = Object.freeze({ output: 0.35, defense: 0.25, review: 0.15, balance: 0.15, peer: 0.1 });
export const PR_TARGET = 8; // merged PRs per member that earns full "output"
export const MIN_PRS_TO_RANK = 5; // below this a team is too new to rank
export const STALE_DAYS = 7;
export const LOW_PEER = 2.5;

// Peer prior: assume an average "3 out of 5" worth PEER_PRIOR_WEIGHT ratings.
const PEER_PRIOR = 3;
const PEER_PRIOR_WEIGHT = 2;
const DAY_MS = 86_400_000;
const round1 = (n) => Math.round(n * 10) / 10;

/** 1 - normalised Gini. 1 when PRs are spread evenly, 0 when one person did all of it. */
export const balanceOf = (counts) => {
  const n = counts.length;
  const total = counts.reduce((a, b) => a + b, 0);
  if (n < 2 || total === 0) return 0;
  let diffs = 0;
  for (const a of counts) for (const b of counts) diffs += Math.abs(a - b);
  const gini = diffs / (2 * n * total); // 0..(n-1)/n
  return 1 - gini / ((n - 1) / n);
};

/** Shrinks a small sample of averages toward PEER_PRIOR. null when nobody qualifies. */
export const bayesianPeer = (averages) => {
  if (!averages.length) return null;
  const sum = averages.reduce((a, b) => a + b, 0);
  return (PEER_PRIOR * PEER_PRIOR_WEIGHT + sum) / (PEER_PRIOR_WEIGHT + averages.length);
};

/**
 * Raw numbers for one team.
 * @param team           { members: [{ userId, githubLogin, status }] }
 * @param contributions  [{ authorId, reviewers: [login], mergedAt }]
 * @param bestDefense    Map<userIdString, best passed defense score 0-100>
 * @param peerAverages   Map<userIdString, average 1-5> (already MIN_RATERS-filtered)
 */
export const computeTeamStats = (team, contributions, bestDefense, peerAverages, now) => {
  const active = team.members.filter((m) => m.status === "active");
  const prsBy = new Map(active.map((m) => [m.userId.toString(), 0]));
  let reviewed = 0;
  let prsLast7d = 0;
  let lastMergedAt = null;

  for (const c of contributions) {
    const id = c.authorId.toString();
    if (prsBy.has(id)) prsBy.set(id, prsBy.get(id) + 1);
    if (c.reviewers.length > 0) reviewed += 1;
    const merged = new Date(c.mergedAt);
    if (now - merged <= STALE_DAYS * DAY_MS) prsLast7d += 1;
    if (!lastMergedAt || merged > lastMergedAt) lastMergedAt = merged;
  }

  const mergedPrs = contributions.length;
  const memberCount = active.length;
  const passed = active.map((m) => bestDefense.get(m.userId.toString())).filter((s) => s != null);
  const memberPeers = active.map((m) => peerAverages.get(m.userId.toString())).filter((a) => a != null);

  return {
    memberCount,
    mergedPrs,
    prsLast7d,
    prsPerMember: memberCount ? round1(mergedPrs / memberCount) : 0,
    reviewedShare: mergedPrs ? reviewed / mergedPrs : 0,
    balance: balanceOf([...prsBy.values()]),
    // Display value: average of those who passed. The score uses the all-members version.
    defenseAvg: passed.length ? round1(passed.reduce((a, b) => a + b, 0) / passed.length) : null,
    defenseCoverage: memberCount ? passed.reduce((a, b) => a + b, 0) / (memberCount * 100) : 0,
    peerAvg: memberPeers.length ? round1(memberPeers.reduce((a, b) => a + b, 0) / memberPeers.length) : null,
    peerBayes: bayesianPeer(memberPeers),
    minPeer: memberPeers.length ? Math.min(...memberPeers) : null,
    lastMergedAt,
    silentMembers: active.filter((m) => prsBy.get(m.userId.toString()) === 0).map((m) => m.githubLogin),
  };
};

/** { score 0-100, breakdown: each signal 0-1 } */
export const scoreTeam = (stats) => {
  // No merged work, nothing to score: otherwise the peer prior alone gives a
  // brand-new team points.
  if (stats.mergedPrs === 0) {
    return { score: 0, breakdown: Object.fromEntries(Object.keys(WEIGHTS).map((k) => [k, 0])) };
  }
  const breakdown = {
    output: Math.min(stats.prsPerMember / PR_TARGET, 1),
    defense: stats.defenseCoverage,
    review: stats.reviewedShare,
    balance: stats.balance,
    // No qualifying ratings yet scores as the prior (3/5), not as zero.
    peer: (stats.peerBayes ?? PEER_PRIOR) / 5,
  };
  const total = Object.entries(WEIGHTS).reduce((sum, [k, w]) => sum + w * breakdown[k], 0);
  return { score: Math.round(total * 100), breakdown };
};

const CLOSED = new Set(["completed", "disbanded"]);

/**
 * What needs the admin's attention, most urgent first.
 * @param evidence  { revoked, updatedAt?, issuedAt } or null
 */
export const teamFlags = (team, stats, evidence, now) => {
  if (CLOSED.has(team.status)) return [];
  const flags = [];
  if (!team.repo) flags.push("no-repo");
  if (team.repo && (!stats.lastMergedAt || now - stats.lastMergedAt > STALE_DAYS * DAY_MS)) flags.push("stale");
  if (stats.mergedPrs > 0 && stats.silentMembers.length) flags.push("silent-members");
  if (stats.minPeer != null && stats.minPeer < LOW_PEER) flags.push("low-peer");
  const publishedAt = evidence && (evidence.updatedAt ?? evidence.issuedAt);
  if (evidence && !evidence.revoked && stats.lastMergedAt && publishedAt && stats.lastMergedAt > new Date(publishedAt)) {
    flags.push("evidence-stale");
  }
  return flags;
};
