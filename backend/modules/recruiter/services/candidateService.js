/**
 * Recruiter candidates list: every developer who opted in, as one row each.
 *
 * A row is built FROM the developer's scorecard (loadScorecard), never from the
 * raw collections, so the list can never show more than the scorecard page
 * does: a hidden section is null here too, and weak spots never appear.
 *
 * The evidence score is deliberately boring and fully published (SCORE_RULES):
 * 0-100, built only from verified results the developer chose to share. XP and
 * activity are not in it. A section the developer hides contributes nothing,
 * which is the honest reading of "no shared evidence", not a penalty hidden
 * behind the number.
 *
 * Scale note: filtering, sorting and paging happen in memory over the opted-in
 * pool (capped at POOL_LIMIT). That is right for a pilot with hundreds of
 * developers. Past that, store a precomputed summary per developer and query it.
 */

import { RECRUITER_SETTINGS, ensureIndexes } from "./recruiterData.js";
import { loadScorecard } from "./scorecardService.js";
import { getTracks } from "../../../services/roadmapCache.js";
import { createTtlCache } from "../../../utils/ttlCache.js";

const POOL_LIMIT = 300;

// Building the pool is up to 300 scorecards (about 1,800 queries). It is the same
// for every recruiter, and filter, sort and page changes only reshape it in memory,
// so it is built once a minute. 60 s: how old a score or a count may be. A
// developer's own privacy choices must NOT wait for it, so saving settings clears
// the cache (clearCandidatePool), and every request re-checks who is still opted
// in (stillOptedIn), which also drops a deleted account at once.
const poolCache = createTtlCache({ name: "candidate-pool", ttlMs: 60_000, maxEntries: 2 });
export const clearCandidatePool = () => poolCache.clear();
const CHUNK = 15; // scorecards loaded at once, so one request never opens hundreds of queries

/** The published rule. Max total: 40 + 20 + 25 + 15 = 100. */
export const SCORE_RULES = Object.freeze({
  layers: { perLayer: 5, maxLayers: 8 }, // up to 40: passed layers
  quality: { max: 20 }, // average best score on passed layers, scaled to 20
  capstone: { first: 20, second: 25 }, // issued, non-revoked capstones
  teams: { perTeam: 5, maxTeams: 3 }, // up to 15: team projects with public evidence
});

const average = (nums) => (nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0);

/** @param {{exams: object[]|null, capstones: object[]|null, teams: object[]|null}} shared */
export const evidenceScore = ({ exams, capstones, teams }) => {
  const layers = Math.min(exams?.length ?? 0, SCORE_RULES.layers.maxLayers) * SCORE_RULES.layers.perLayer;
  const quality = Math.round((average((exams ?? []).map((e) => e.bestScore ?? 0)) / 100) * SCORE_RULES.quality.max);
  const caps = capstones?.length ?? 0;
  const capstone = caps >= 2 ? SCORE_RULES.capstone.second : caps === 1 ? SCORE_RULES.capstone.first : 0;
  const teamPts = Math.min(teams?.length ?? 0, SCORE_RULES.teams.maxTeams) * SCORE_RULES.teams.perTeam;
  return { score: layers + quality + capstone + teamPts, parts: { layers, quality, capstone, teams: teamPts } };
};

/** One list row from a scorecard (pure). Hidden sections stay null. */
export const toCandidateRow = (sc) => {
  const trackIds = new Set([
    ...(sc.exams ?? []).map((e) => e.path),
    ...(sc.capstones ?? []).map((c) => c.track?.id ?? c.track),
  ]);
  trackIds.delete(undefined);
  trackIds.delete(null);

  return {
    username: sc.username,
    name: sc.name,
    headline: sc.headline,
    openToWork: sc.openToWork,
    layersPassed: sc.exams ? sc.exams.length : null,
    avgExamScore: sc.exams?.length ? Math.round(average(sc.exams.map((e) => e.bestScore ?? 0))) : null,
    capstones: sc.capstones ? sc.capstones.length : null,
    teamProjects: sc.teams ? sc.teams.length : null,
    strengths: sc.strengths,
    tracks: [...trackIds],
    evidence: evidenceScore(sc),
    lastActiveAt: sc.activity?.lastActiveAt ?? null,
  };
};

const SORTS = {
  score: (a, b) => b.evidence.score - a.evidence.score,
  layers: (a, b) => (b.layersPassed ?? -1) - (a.layersPassed ?? -1),
  active: (a, b) => new Date(b.lastActiveAt ?? 0) - new Date(a.lastActiveAt ?? 0),
};

/** Filter, sort and page the rows (pure). Ties fall back to username so order is stable. */
export const applyCandidateQuery = (rows, { track, openToWork, minLayers, hasCapstone, q, sort = "score", page = 1, limit = 20 }) => {
  const needle = q?.toLowerCase();
  const filtered = rows
    .filter((r) => !track || r.tracks.includes(track))
    .filter((r) => !openToWork || r.openToWork)
    .filter((r) => !minLayers || (r.layersPassed ?? 0) >= minLayers)
    .filter((r) => !hasCapstone || (r.capstones ?? 0) > 0)
    .filter((r) => !needle || r.name.toLowerCase().includes(needle) || r.username.toLowerCase().includes(needle))
    .sort((a, b) => SORTS[sort](a, b) || a.username.localeCompare(b.username));

  const pages = Math.max(1, Math.ceil(filtered.length / limit));
  const safePage = Math.min(page, pages);
  return { items: filtered.slice((safePage - 1) * limit, safePage * limit), total: filtered.length, page: safePage, pages };
};

/** The pool as { userId, row } entries: the id stays out of the rows the API returns. */
const loadPool = async (db) => {
  const stored = await db
    .collection(RECRUITER_SETTINGS)
    .find({ enabled: true })
    .sort({ updatedAt: -1 })
    .limit(POOL_LIMIT)
    .toArray();
  if (!stored.length) return [];

  const users = await db
    .collection("users")
    .find({ _id: { $in: stored.map((s) => s.userId) } }, { projection: { username: 1, firstName: 1, lastName: 1 } })
    .toArray();
  const userById = new Map(users.map((u) => [String(u._id), u]));

  const rows = [];
  for (let i = 0; i < stored.length; i += CHUNK) {
    const batch = stored.slice(i, i + CHUNK);
    const built = await Promise.all(
      batch.map(async (s) => {
        const user = userById.get(String(s.userId));
        return user ? { userId: s.userId, row: toCandidateRow(await loadScorecard(db, user, s, { maps: false })) } : null;
      }),
    );
    rows.push(...built.filter(Boolean));
  }
  return rows;
};

/** Track filter options for the people on the list, with readable titles. */
const trackFacets = async (db, rows) => {
  const counts = new Map();
  for (const r of rows) for (const t of r.tracks) counts.set(t, (counts.get(t) ?? 0) + 1);
  if (!counts.size) return [];
  const tracks = await getTracks(db, [...counts.keys()]);
  return [...counts]
    .map(([trackId, count]) => ({ trackId, title: tracks.get(trackId)?.title ?? trackId, count }))
    .sort((a, b) => b.count - a.count || a.title.localeCompare(b.title));
};

/** Drops anyone who has opted out (or been deleted) since the pool was built: one cheap query. */
const stillOptedIn = async (db, pool) => {
  if (!pool.length) return pool;
  const live = await db
    .collection(RECRUITER_SETTINGS)
    .find({ enabled: true, userId: { $in: pool.map((e) => e.userId) } }, { projection: { userId: 1 } })
    .toArray();
  const ids = new Set(live.map((s) => String(s.userId)));
  return pool.filter((e) => ids.has(String(e.userId)));
};

export const listCandidatesService = async (db, query) => {
  await ensureIndexes(db);
  const pool = await stillOptedIn(db, await poolCache.wrap("pool", () => loadPool(db)));
  const rows = pool.map((e) => e.row);
  return {
    ...applyCandidateQuery(rows, query),
    rules: SCORE_RULES,
    facets: { tracks: await trackFacets(db, rows), totalOptedIn: rows.length },
  };
};
