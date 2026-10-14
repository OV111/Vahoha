import { ObjectId } from "mongodb";
import { resolveActiveLayer, getWeakTopics } from "../lib/activeLayer.js";
import { escapeRegex } from "../../../utils/regex.js";

/**
 * Challenge read layer.
 *
 * Every query in here is public-facing, so the single most important rule is
 * the projection: `solution` and `hiddenTests` must never leave the server on
 * a browse or detail request. They are stripped here rather than in the
 * controller so a future caller can't forget.
 */

const COL = "challenges";

// Fields the client is allowed to see when browsing a list.
const LIST_PROJECTION = {
  slug: 1,
  trackId: 1,
  layerId: 1,
  type: 1,
  difficulty: 1,
  title: 1,
  summary: 1,
  tags: 1,
  estimatedMins: 1,
  xp: 1,
  "stats.solves": 1,
};

// Fields for the arena. Adds the body of the problem and the starter files,
// still without anything that would give the answer away.
const DETAIL_PROJECTION = {
  ...LIST_PROJECTION,
  description: 1,
  task: 1,
  constraints: 1,
  example: 1,
  starterFiles: 1,
  testFile: 1,
  // hints are returned as metadata only — the text is paid for per-hint in
  // stage 2, so it must not ship with the challenge body.
  "hints.order": 1,
  "hints.cost": 1,
};

// Difficulty is stored as text, and "easy" < "hard" < "med" alphabetically,
// so sorting on the raw field put hard before medium. Rank it instead.
const DIFFICULTY_RANK = {
  $switch: {
    branches: [
      { case: { $eq: ["$difficulty", "easy"] }, then: 1 },
      { case: { $eq: ["$difficulty", "med"] }, then: 2 },
      { case: { $eq: ["$difficulty", "hard"] }, then: 3 },
    ],
    default: 4,
  },
};

const TIME_MATCH = {
  under15: { $lt: 15 },
  "15to30": { $gte: 15, $lte: 30 },
  "30to60": { $gt: 30, $lte: 60 },
  "60plus": { $gt: 60 },
};

/**
 * Every catalog filter as one Mongo query. Built as a list of conditions
 * ANDed together, because status, recommended and search are each an $or of
 * their own, and a single object can only hold one $or.
 *
 * `me` carries the per-user sets the status and "recommended" filters need;
 * they are about this learner, not about the challenge documents.
 */
const buildMatch = (filters, me) => {
  const { track, layer, type, difficulty, tags, time, status, recommended, q } = filters;
  const conds = [{ status: "published" }];

  if (track && track !== "all") conds.push({ trackId: track });

  // The UI speaks layer numbers ("3", "4+"); layerIds end in that number
  // ("api-dev-3"), so match the suffix.
  if (layer === "4+") conds.push({ layerId: { $regex: "-([4-9]|[1-9]\\d+)$" } });
  else if (layer) conds.push({ layerId: { $regex: `-${layer}$` } });

  if (type) conds.push({ type: type.toUpperCase() });
  if (difficulty) conds.push({ difficulty });
  if (tags?.length) conds.push({ tags: { $in: tags } });
  if (time && TIME_MATCH[time]) conds.push({ estimatedMins: TIME_MATCH[time] });

  // Statuses are OR'd: two ticked boxes mean "either", as checkboxes read.
  if (status?.length) {
    const startedOnly = [...me.started].filter((s) => !me.solved.has(s));
    const touched = [...new Set([...me.started, ...me.solved])];
    const byStatus = {
      completed: { slug: { $in: [...me.solved] } },
      "in-progress": { slug: { $in: startedOnly } },
      "not-started": { slug: { $nin: touched } },
    };
    conds.push({ $or: status.map((key) => byStatus[key]) });
  }

  // Same rule as the `hot` flag in listChallengesService, as a query.
  if (recommended) {
    const reasons = [];
    if (me.activeLayer) reasons.push({ layerId: me.activeLayer.layerId });
    if (me.weakTopics.size) reasons.push({ tags: { $in: [...me.weakTopics] } });
    conds.push({ slug: { $nin: [...me.solved] } });
    conds.push(reasons.length ? { $or: reasons } : { slug: { $in: [] } });
  }

  // Substring match, escaped: learners type "response ca", which a $text word
  // search would miss. Fine at catalog scale (hundreds of documents).
  if (q) {
    const rx = { $regex: escapeRegex(q), $options: "i" };
    conds.push({ $or: [{ title: rx }, { summary: rx }, { tags: rx }] });
  }

  return { $and: conds };
};

/**
 * Which of these slugs has this user already solved. A Set, not a query per
 * card — one lookup against challengeResults regardless of how many items are
 * on the page.
 */
const getSolvedSlugs = async (db, userId, slugs) => {
  if (!userId || slugs.length === 0) return new Set();

  const rows = await db
    .collection("challengeResults")
    .find(
      { userId: new ObjectId(userId), challengeId: { $in: slugs }, status: "solved" },
      { projection: { challengeId: 1 } },
    )
    .toArray();

  return new Set(rows.map((r) => r.challengeId));
};

/**
 * Everything about this learner the list needs, read once per request rather
 * than per page: solved and started slugs, where they are on the roadmap, and
 * the topics they have failed.
 */
const loadLearner = async (db, userId) => {
  if (!userId) {
    return { solved: new Set(), started: new Set(), activeLayer: null, weakTopics: new Set() };
  }
  const ownerId = new ObjectId(userId);
  const [solvedRows, startedRows, activeLayer, weakTopics] = await Promise.all([
    db
      .collection("challengeResults")
      .find({ userId: ownerId, status: "solved" }, { projection: { challengeId: 1 } })
      .toArray(),
    db
      .collection("challenge_attempts")
      .find({ userId: ownerId }, { projection: { challengeSlug: 1 } })
      .toArray(),
    resolveActiveLayer(db, userId),
    getWeakTopics(db, userId),
  ]);
  return {
    solved: new Set(solvedRows.map((r) => r.challengeId)),
    started: new Set(startedRows.map((r) => r.challengeSlug)),
    activeLayer,
    weakTopics,
  };
};

/**
 * One page of the catalog, filtered and sorted in the database.
 *
 * `track` absent means "the learner's own path". It is resolved here rather
 * than in the client so the page needs no extra round trip before its first
 * list request; the resolved value is echoed back for the UI to show.
 */
export const listChallengesService = async (db, query = {}, userId) => {
  // Defaults repeated here (Zod sets them at the route) so direct callers,
  // like the integration tests, behave the same.
  const page = Math.max(1, query.page ?? 1);
  const limit = Math.min(50, Math.max(1, query.limit ?? 24));

  const me = await loadLearner(db, userId);
  const myTrack = me.activeLayer?.trackId ?? null;
  const col = db.collection(COL);

  // Default to the learner's path only when it has challenges; a path with
  // none (fullstack-engineer today) would open the page on an empty grid.
  let track = query.track ?? "all";
  if (!query.track && myTrack) {
    const hasAny = await col.countDocuments({ status: "published", trackId: myTrack }, { limit: 1 });
    if (hasAny) track = myTrack;
  }

  const match = buildMatch({ ...query, track }, me);

  const [items, total] = await Promise.all([
    col
      .aggregate([
        { $match: match },
        { $addFields: { _rank: DIFFICULTY_RANK } },
        // slug last: a unique tie-breaker, so skip/limit pages never repeat
        // or drop an item when two challenges tie on rank and solves.
        { $sort: { _rank: 1, "stats.solves": -1, slug: 1 } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
        { $project: LIST_PROJECTION },
      ])
      .toArray(),
    col.countDocuments(match),
  ]);

  const decorated = items.map((item) => {
    const done = me.solved.has(item.slug);
    return {
      ...item,
      done,
      inProgress: !done && me.started.has(item.slug),
      // "Recommended" has to mean something a user can act on, so it is
      // narrow on purpose: unsolved, AND either sitting in the layer they are
      // working through right now or covering a topic they have actually
      // failed before. A looser rule would flag most of the catalog, which is
      // the same as flagging none of it.
      hot:
        !done &&
        (item.layerId === me.activeLayer?.layerId ||
          (item.tags ?? []).some((t) => me.weakTopics.has(String(t).toLowerCase()))),
    };
  });

  return { items: decorated, total, page, limit, pages: Math.ceil(total / limit), track, myTrack };
};

/**
 * Options for the catalog's Path filter: every track with published
 * challenges, its count and readable title, the learner's own first.
 * Titles come from roadmap_tracks, so a new path appears with no UI change.
 */
export const listTracksService = async (db, userId) => {
  const [counts, activeLayer] = await Promise.all([
    db
      .collection(COL)
      .aggregate([
        { $match: { status: "published" } },
        { $group: { _id: "$trackId", count: { $sum: 1 } } },
      ])
      .toArray(),
    resolveActiveLayer(db, userId),
  ]);

  const trackIds = counts.map((c) => c._id).filter(Boolean);
  const titles = await db
    .collection("roadmap_tracks")
    .find({ trackId: { $in: trackIds } }, { projection: { _id: 0, trackId: 1, title: 1 } })
    .toArray();
  const titleOf = new Map(titles.map((t) => [t.trackId, t.title]));

  const myTrack = activeLayer?.trackId ?? null;
  const tracks = trackIds
    .map((trackId) => ({
      trackId,
      title: titleOf.get(trackId) ?? trackId,
      count: counts.find((c) => c._id === trackId).count,
      isMine: trackId === myTrack,
    }))
    .sort((a, b) => b.isMine - a.isMine || b.count - a.count || a.title.localeCompare(b.title));

  return { tracks, myTrack };
};

export const getChallengeBySlugService = async (db, slug, userId) => {
  const challenge = await db
    .collection(COL)
    .findOne({ slug, status: "published" }, { projection: DETAIL_PROJECTION });

  if (!challenge) {
    const err = new Error("Challenge not found");
    err.status = 404;
    throw err;
  }

  const solved = await getSolvedSlugs(db, userId, [slug]);
  return { ...challenge, done: solved.has(slug) };
};

/**
 * Tag counts for the sidebar filter. Scoped by the same filters as the list so
 * the counts always describe what the user is actually looking at.
 */
export const getTagCountsService = async (db, query) => {
  const match = buildMatch(query);

  const [tags, total] = await Promise.all([
    db
      .collection(COL)
      .aggregate([
        { $match: match },
        { $unwind: "$tags" },
        { $group: { _id: "$tags", count: { $sum: 1 } } },
        { $sort: { count: -1, _id: 1 } },
      ])
      .toArray(),
    db.collection(COL).countDocuments(match),
  ]);

  return {
    total,
    tags: tags.map(({ _id, count }) => ({ label: _id, count })),
  };
};

/**
 * The user's own solve stats for the catalog hero strip. Deliberately no
 * global rank here — ranking needs a defined scoring rule across every user,
 * which is a separate decision from "what did I personally do."
 */
export const getPersonalStatsService = async (db, userId) => {
  const results = await db
    .collection("challengeResults")
    .find({ userId: new ObjectId(userId) })
    .project({ status: 1, solvedAt: 1, challengeId: 1 })
    .toArray();

  const solved = results.filter((r) => r.status === "solved");
  const attempted = results.length;

  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const solvedThisWeek = solved.filter(
    (r) => r.solvedAt && r.solvedAt >= weekAgo,
  ).length;

  // Streak: distinct UTC calendar days with a solve, walked backward from
  // today. A gap of more than one day (i.e. neither today nor yesterday has a
  // solve) breaks it — this is a "keep the streak alive" check, not just a
  // count of solve-days.
  const solveDays = new Set(
    solved
      .filter((r) => r.solvedAt)
      .map((r) => new Date(r.solvedAt).toISOString().slice(0, 10)),
  );
  let streakDays = 0;
  const cursor = new Date();
  cursor.setUTCHours(0, 0, 0, 0);
  // Today not having a solve yet doesn't break a streak earned yesterday —
  // only start counting from today if it's already been solved, otherwise
  // start the walk from yesterday.
  if (!solveDays.has(cursor.toISOString().slice(0, 10))) {
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  while (solveDays.has(cursor.toISOString().slice(0, 10))) {
    streakDays += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }

  const progress = await db
    .collection("userProgress")
    .findOne({ userId: new ObjectId(userId) }, { projection: { xpTotal: 1 } });

  // Last few solves with their titles, for the profile. Titles are joined in
  // one query (not one per row); a solve whose challenge was since removed is
  // simply left out rather than shown as a blank row.
  const recentRows = solved
    .filter((r) => r.solvedAt)
    .sort((a, b) => new Date(b.solvedAt) - new Date(a.solvedAt))
    .slice(0, 5);
  const challenges = recentRows.length
    ? await db
        .collection(COL)
        .find(
          { slug: { $in: recentRows.map((r) => r.challengeId) } },
          { projection: { _id: 0, slug: 1, title: 1, difficulty: 1 } },
        )
        .toArray()
    : [];
  const bySlug = new Map(challenges.map((c) => [c.slug, c]));
  const recentSolved = recentRows
    .filter((r) => bySlug.has(r.challengeId))
    .map((r) => ({ ...bySlug.get(r.challengeId), solvedAt: r.solvedAt }));

  return {
    solved: solved.length,
    solvedThisWeek,
    attempted,
    accuracy: attempted > 0 ? Math.round((solved.length / attempted) * 100) : 0,
    streakDays,
    xpTotal: progress?.xpTotal ?? 0,
    recentSolved,
  };
};

/**
 * Daily challenge — deterministic per UTC day, so every user sees the same one
 * and it stays stable across a refresh. Picking by index into a stable sort
 * avoids storing a schedule collection; swap this for a curated schedule later
 * if you want editorial control over which problem lands on which day.
 */
export const getDailyChallengeService = async (db) => {
  const col = db.collection(COL);
  const match = { status: "published" };

  const total = await col.countDocuments(match);
  if (total === 0) return null;

  const daysSinceEpoch = Math.floor(Date.now() / 86_400_000);

  const [challenge] = await col
    .find(match)
    .project(LIST_PROJECTION)
    .sort({ slug: 1 })
    .skip(daysSinceEpoch % total)
    .limit(1)
    .toArray();

  return challenge ?? null;
};
