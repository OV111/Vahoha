import { ObjectId } from "mongodb";
import { escapeRegex } from "../../../utils/regex.js";

// Exported so /context can report the real caps instead of hardcoding them in
// the UI — the old context panel drifted into fiction exactly that way.
export const MAX_TURNS = 20;
export const DAILY_MESSAGE_CAP = 30;

// ── Sessions ──────────────────────────────────────────────────

export const createSession = async (db, userId, title) => {
  const col = db.collection("agent_sessions");
  const doc = {
    userId: new ObjectId(userId),
    title: title?.slice(0, 80) ?? "New conversation",
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await col.insertOne(doc);
  return { ...doc, _id: result.insertedId };
};

export const listSessions = async (db, userId, limit = 20) => {
  const col = db.collection("agent_sessions");
  return col
    .find({ userId: new ObjectId(userId) })
    // Pinned first, then most recent. Documents created before pinning existed
    // have no `pinned` field; missing sorts below true under -1, which is the
    // behaviour we want without needing a migration.
    .sort({ pinned: -1, updatedAt: -1 })
    .limit(limit)
    .project({ messages: 0 })
    .toArray();
};

/** Most pinned chats the first page carries; pinning is a handful, not a library. */
const MAX_PINNED_LISTED = 50;

/**
 * One page of a learner's chats for the sidebar.
 *
 *   - First page (no `before`, no `q`): every pinned chat, then the newest `limit`
 *     unpinned ones. Pinned chats ride only on this page, so later pages never
 *     repeat them.
 *   - `before` (no `q`): unpinned chats strictly older than that timestamp.
 *   - `q`: a case-insensitive title search across pinned and unpinned alike,
 *     newest first, paged with `before`.
 *
 *   - `challengeOnly`: only chats tied to a challenge. Like a search it spans pinned
 *     and unpinned, newest first, and can be combined with `q`.
 *
 * `total` is always the learner's unfiltered chat count, so the sidebar can word
 * "Delete all chats" correctly while a search or a partial load is showing.
 * Fetching `limit + 1` is how `hasMore` is known without a second count query.
 */
export const listSessionsPage = async (
  db,
  userId,
  { limit = 30, before = null, q = "", challengeOnly = false } = {},
) => {
  const col = db.collection("agent_sessions");
  const uid = new ObjectId(userId);
  const text = typeof q === "string" ? q.trim() : "";
  const cursor = before ? new Date(before) : null;
  // Both are views over ALL the learner's chats, so pinned ones are not hoisted.
  const search = text !== "" || challengeOnly;
  const filters = {
    ...(text && { title: { $regex: escapeRegex(text), $options: "i" } }),
    ...(challengeOnly && { challengeSlug: { $type: "string" } }),
  };

  const page = (filter) =>
    col
      .find({ userId: uid, ...filter })
      .sort({ updatedAt: -1 })
      .limit(limit + 1)
      .project({ messages: 0 })
      .toArray();

  const [total, rows, pinned] = await Promise.all([
    col.countDocuments({ userId: uid }),
    search
      ? page({ ...filters, ...(cursor && { updatedAt: { $lt: cursor } }) })
      : page({ pinned: { $ne: true }, ...(cursor && { updatedAt: { $lt: cursor } }) }),
    // Pinned chats only belong to the first, unsearched page.
    search || cursor
      ? []
      : col
          .find({ userId: uid, pinned: true })
          .sort({ updatedAt: -1 })
          .limit(MAX_PINNED_LISTED)
          .project({ messages: 0 })
          .toArray(),
  ]);

  const hasMore = rows.length > limit;
  return { sessions: [...pinned, ...rows.slice(0, limit)], hasMore, total };
};

export const getSession = async (db, userId, sessionId) => {
  const col = db.collection("agent_sessions");
  return col.findOne({
    _id: new ObjectId(sessionId),
    userId: new ObjectId(userId),
  });
};

/**
 * Partial update of a session — title and/or pinned.
 *
 * The filter includes userId deliberately: matching on _id alone would let any
 * authenticated user rename, pin or delete another user's conversation by
 * guessing an id. Returns null when the session doesn't exist OR isn't theirs —
 * the caller turns both into a 404, so the endpoint never reveals that an id
 * exists.
 */
export const updateSession = async (
  db,
  userId,
  sessionId,
  { title, pinned, titleLocked },
) => {
  const col = db.collection("agent_sessions");

  // updatedAt is deliberately NOT touched here: it means "last conversation turn".
  // Renaming or pinning a chat must not jump it to the top of the list or turn its
  // "3d ago" into "just now". Only appendMessages moves it.
  const $set = {};
  if (title !== undefined) $set.title = title.slice(0, 80);
  if (pinned !== undefined) $set.pinned = pinned;
  // Set when the USER renames a chat, so auto-titling never overwrites a name
  // they chose themselves.
  if (titleLocked !== undefined) $set.titleLocked = titleLocked;

  const filter = { _id: new ObjectId(sessionId), userId: new ObjectId(userId) };
  // An empty $set is a Mongo error; with nothing to change this is just a read.
  if (Object.keys($set).length === 0) {
    return col.findOne(filter, { projection: { messages: 0 } });
  }

  const result = await col.findOneAndUpdate(filter, { $set }, { returnDocument: "after", projection: { messages: 0 } });
  return result?.value ?? result ?? null;
};

/**
 * Pin a chat to one coding challenge, for good.
 *
 * Challenge protection (the focus prompt and the SolutionGuard) must not depend
 * on the browser re-sending "I'm on a challenge" with every message, or a learner
 * could drop that field and get a solution. Once a chat has touched a challenge it
 * stays protected. This only ever sets a slug; nothing a client sends can clear it
 * (updateSessionSchema doesn't accept it, and updateSession doesn't write it).
 * Scoped by userId like every other write here.
 */
export const lockSessionChallenge = async (db, userId, sessionId, challengeSlug) => {
  await db
    .collection("agent_sessions")
    .updateOne(
      { _id: new ObjectId(sessionId), userId: new ObjectId(userId) },
      // No updatedAt: protection starting is not a conversation turn.
      { $set: { challengeSlug } },
    );
};

/** Delete a session. Scoped by userId for the same reason as renameSession. */
export const deleteSession = async (db, userId, sessionId) => {
  const col = db.collection("agent_sessions");
  const { deletedCount } = await col.deleteOne({
    _id: new ObjectId(sessionId),
    userId: new ObjectId(userId),
  });
  return deletedCount > 0;
};

/**
 * Delete every chat this learner has, or every one they haven't pinned.
 * Only conversations go: the daily message count (agent_usage) stays, so
 * clearing chats can't reset the cap, and teaching logs stay as the learner's
 * progress record, the same as deleting one chat.
 * @returns {Promise<number>} how many were deleted
 */
export const deleteAllSessions = async (db, userId, { keepPinned = false } = {}) => {
  const filter = { userId: new ObjectId(userId), ...(keepPinned ? { pinned: { $ne: true } } : {}) };
  const { deletedCount } = await db.collection("agent_sessions").deleteMany(filter);
  return deletedCount;
};

/** The part of a turn's usage that rides on the saved assistant message. */
const messageUsage = (usage) => ({
  promptTokens: usage.promptTokens,
  completionTokens: usage.completionTokens,
  totalTokens: usage.totalTokens,
  rounds: usage.rounds,
  estimated: usage.estimated,
});

/**
 * Append a user + assistant pair and keep the last MAX_TURNS turns.
 *
 * One atomic update ($push with $slice), not read-modify-write: two tabs or two
 * quick sends on the same chat used to read the same messages array and the
 * second write erased the first turn. Returns false when the chat no longer
 * exists (deleted while the answer streamed).
 */
export const appendMessages = async (db, sessionId, userMsg, assistantMsg, usage = null) => {
  const now = new Date();

  const result = await db.collection("agent_sessions").updateOne(
    { _id: new ObjectId(sessionId) },
    {
      $push: {
        messages: {
          $each: [
            { role: "user", content: userMsg, at: now },
            {
              role: "assistant",
              content: assistantMsg,
              at: now,
              ...(usage && { usage: messageUsage(usage) }),
            },
          ],
          // each turn = user + assistant = 2 entries
          $slice: -(MAX_TURNS * 2),
        },
      },
      $set: { updatedAt: now },
      // Running totals live beside the window, so a chat's lifetime cost
      // survives the 20-turn trim.
      ...(usage && {
        $inc: { "usageTotals.totalTokens": usage.totalTokens, "usageTotals.turns": 1 },
      }),
    },
  );

  return Boolean(result?.matchedCount);
};

// ── Day boundary (the user's own day) ─────────────────────────

/**
 * A usable IANA zone name, or null. The Settings page used to store free text
 * like "UTC +4", which Intl rejects; those fall back to the server-local day
 * rather than breaking the cap.
 */
export const resolveTimezone = (raw) => {
  if (typeof raw !== "string") return null;
  const tz = raw.trim();
  if (!tz) return null;
  try {
    new Intl.DateTimeFormat("en", { timeZone: tz });
    return tz;
  } catch {
    return null;
  }
};

/** The learner's zone from their profile, validated. One projected read per request. */
export const getUserTimezone = async (db, userId) => {
  try {
    const stats = await db
      .collection("usersStats")
      .findOne({ userId: new ObjectId(userId) }, { projection: { timezone: 1 } });
    return resolveTimezone(stats?.timezone);
  } catch (err) {
    // Day boundaries are a nicety; a failed lookup must not block the mentor.
    console.error("timezone lookup failed, using server day:", err);
    return null;
  }
};

const formatters = new Map();
const zonedParts = (date, tz) => {
  let fmt = formatters.get(tz);
  if (!fmt) {
    fmt = new Intl.DateTimeFormat("en-CA", {
      timeZone: tz,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    formatters.set(tz, fmt);
  }
  const parts = fmt.formatToParts(date);
  const get = (type) => Number(parts.find((p) => p.type === type).value);
  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
    second: get("second"),
  };
};

// How far the zone's wall clock is ahead of UTC at this instant, in ms.
const zoneOffsetMs = (date, tz) => {
  const p = zonedParts(date, tz);
  const wallAsUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return wallAsUtc - Math.floor(date.getTime() / 1000) * 1000;
};

/**
 * Midnight at the start of the day, `daysAgo` days back (negative = ahead): the
 * boundary the cap and the usage page share. With `tz` it is that zone's
 * midnight; without, the server's local midnight, as before.
 */
export const startOfDay = (daysAgo = 0, tz = null) => {
  if (!tz) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - daysAgo);
    return d;
  }

  const today = zonedParts(new Date(), tz);
  // Calendar arithmetic on the zone's own date, so DST days of 23 or 25 hours
  // can't shift the boundary.
  const wallMidnightAsUtc = Date.UTC(today.year, today.month - 1, today.day - daysAgo);
  // The offset must be read at the instant being solved for, which is why it is
  // applied twice: the first pass lands within an hour, the second settles a DST jump.
  const first = wallMidnightAsUtc - zoneOffsetMs(new Date(wallMidnightAsUtc), tz);
  return new Date(wallMidnightAsUtc - zoneOffsetMs(new Date(first), tz));
};

/** "YYYY-MM-DD" of an instant in the learner's day (server-local without a zone). */
export const dayKey = (date, tz = null) => {
  if (!tz) {
    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }
  const p = zonedParts(date, tz);
  return `${p.year}-${String(p.month).padStart(2, "0")}-${String(p.day).padStart(2, "0")}`;
};

// ── Rate limiting ─────────────────────────────────────────────

// findOneAndUpdate returns the document in driver 6 and { value } in older
// drivers; normalise so callers don't care.
const unwrap = (result) => (result && "lastErrorObject" in result ? result.value : result) ?? null;

export const checkDailyLimit = async (db, userId, tz = null) => {
  const col = db.collection("agent_usage");

  const today = startOfDay(0, tz);
  const tomorrow = startOfDay(-1, tz);

  const doc = await col.findOne({ userId: new ObjectId(userId), date: today });
  const count = doc?.count ?? 0;

  if (count >= DAILY_MESSAGE_CAP) {
    return { allowed: false, resetAt: tomorrow.toISOString() };
  }

  return { allowed: true, count };
};

/**
 * Take one of today's messages BEFORE the model is called.
 *
 * The old check-then-increment let parallel requests all read "29" and all
 * proceed, so the cap was a suggestion. Here the compare and the increment are
 * one atomic update: only one of several simultaneous requests can take the last
 * slot. The filter is just {userId, date} with the cap test inside the update
 * pipeline; putting `count < cap` in the filter instead would make a user who is
 * AT the cap miss the filter and upsert a second counter document with count 1.
 *
 * Two simultaneous first-messages of the day can both try to create the day
 * document; the unique index makes the loser fail with a duplicate key error and
 * it retries once against the winner's document.
 *
 * @returns {{allowed: boolean, resetAt: string, count: number, date: Date}}
 *   `date` is the day document that was charged, so release and the token
 *   counters hit the same one even if the turn crosses midnight.
 */
export const reserveDailyMessage = async (db, userId, tz = null) => {
  const col = db.collection("agent_usage");
  const uid = new ObjectId(userId);
  const date = startOfDay(0, tz);
  const resetAt = startOfDay(-1, tz).toISOString();
  const used = { $ifNull: ["$count", 0] };

  const attempt = () =>
    col.findOneAndUpdate(
      { userId: uid, date },
      [
        {
          $set: {
            count: { $cond: [{ $lt: [used, DAILY_MESSAGE_CAP] }, { $add: [used, 1] }, used] },
            createdAt: { $ifNull: ["$createdAt", new Date()] },
          },
        },
      ],
      { upsert: true, returnDocument: "before" },
    );

  let before;
  try {
    before = unwrap(await attempt());
  } catch (err) {
    if (err?.code !== 11000) throw err;
    before = unwrap(await attempt());
  }

  const countBefore = before?.count ?? 0;
  if (countBefore >= DAILY_MESSAGE_CAP) {
    return { allowed: false, resetAt, count: countBefore, date };
  }
  return { allowed: true, resetAt, count: countBefore + 1, date };
};

/**
 * Give a reserved message back. For turns that failed before the learner got an
 * answer (model error, mentor busy), where it must not cost them a message.
 * Never goes below zero.
 */
export const releaseDailyMessage = async (db, userId, tz = null, date = startOfDay(0, tz)) => {
  await db
    .collection("agent_usage")
    .updateOne({ userId: new ObjectId(userId), date, count: { $gt: 0 } }, { $inc: { count: -1 } });
};

/**
 * Add a finished turn's tokens to the day. Tokens only: the message itself was
 * already counted by reserveDailyMessage, so counting it here would charge twice.
 */
export const addUsageTokens = async (db, userId, usage, tz = null, date = startOfDay(0, tz)) => {
  if (!usage) return;
  await db.collection("agent_usage").updateOne(
    { userId: new ObjectId(userId), date },
    {
      $inc: {
        promptTokens: usage.promptTokens ?? 0,
        completionTokens: usage.completionTokens ?? 0,
        totalTokens: usage.totalTokens ?? 0,
      },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true },
  );
};

/** Messages used today, for /context. Mirrors checkDailyLimit's day boundary. */
export const getUsageToday = async (db, userId, tz = null) => {
  const today = startOfDay(0, tz);

  const doc = await db
    .collection("agent_usage")
    .findOne({ userId: new ObjectId(userId), date: today });

  const used = doc?.count ?? 0;
  return {
    used,
    cap: DAILY_MESSAGE_CAP,
    remaining: Math.max(0, DAILY_MESSAGE_CAP - used),
    tokens: {
      prompt: doc?.promptTokens ?? 0,
      completion: doc?.completionTokens ?? 0,
      total: doc?.totalTokens ?? 0,
    },
  };
};

/**
 * Count one message against today, plus the tokens it cost when known. Without
 * `usage` it only bumps the message count, as before. The stream no longer uses
 * this (it reserves up front); it stays for callers that count a message after
 * the fact.
 */
export const incrementUsage = async (db, userId, usage = null, tz = null) => {
  const col = db.collection("agent_usage");

  const today = startOfDay(0, tz);

  await col.findOneAndUpdate(
    { userId: new ObjectId(userId), date: today },
    {
      $inc: {
        count: 1,
        ...(usage && {
          promptTokens: usage.promptTokens,
          completionTokens: usage.completionTokens,
          totalTokens: usage.totalTokens,
        }),
      },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true },
  );
};
