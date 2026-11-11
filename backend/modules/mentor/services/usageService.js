import { ObjectId } from "mongodb";
import { DAILY_MESSAGE_CAP, startOfDay, dayKey } from "./sessionService.js";

/**
 * Mentor usage: the ledger of what each turn cost, and the summary the
 * settings page reads.
 *
 * Two stores, on purpose. `agent_usage` holds one counter doc per user per day
 * (cheap to check against the cap). `agent_usage_events` holds one row per turn
 * (which chat, which tools, how long) and expires after 90 days. Deleting a
 * chat deletes neither, so clearing chats can't reset the numbers.
 *
 * "A day" is the learner's own (their profile time zone), the same boundary the
 * daily cap uses; with no valid zone it is the server's local day.
 */

const MAX_SESSIONS_LISTED = 20;

/**
 * Record one finished turn. Best-effort by design: usage is bookkeeping, and a
 * failed insert must never cost the learner an answer they already received.
 */
export const recordUsageEvent = async (db, userId, sessionId, usage, tz = null, day = startOfDay(0, tz)) => {
  try {
    await db.collection("agent_usage_events").insertOne({
      userId: new ObjectId(userId),
      sessionId: new ObjectId(sessionId),
      at: new Date(),
      day,
      model: usage.model,
      feature: "mentor",
      promptTokens: usage.promptTokens,
      completionTokens: usage.completionTokens,
      totalTokens: usage.totalTokens,
      cachedTokens: usage.cachedTokens,
      rounds: usage.rounds,
      tools: usage.toolCalls,
      estimated: usage.estimated,
      latencyMs: usage.latencyMs,
    });
  } catch (err) {
    console.error("usage event not recorded:", err);
  }
};

/**
 * Everything the "Mentor usage" settings tab shows, for the last `days` days
 * (today included): today's meter, a zero-filled daily series, totals, and the
 * busiest chats.
 */
export const getUsageSummary = async (db, userId, days = 30, tz = null) => {
  const uid = new ObjectId(userId);
  const start = startOfDay(days - 1, tz);

  const [dayDocs, sessionRows] = await Promise.all([
    db.collection("agent_usage").find({ userId: uid, date: { $gte: start } }).toArray(),
    db
      .collection("agent_usage_events")
      .aggregate([
        { $match: { userId: uid, at: { $gte: start } } },
        {
          $group: {
            _id: "$sessionId",
            turns: { $sum: 1 },
            totalTokens: { $sum: "$totalTokens" },
            lastAt: { $max: "$at" },
          },
        },
        { $sort: { lastAt: -1 } },
        { $limit: MAX_SESSIONS_LISTED },
      ])
      .toArray(),
  ]);

  const byDay = new Map(dayDocs.map((d) => [dayKey(d.date, tz), d]));
  const daily = [];
  for (let i = days - 1; i >= 0; i--) {
    const key = dayKey(startOfDay(i, tz), tz);
    const doc = byDay.get(key);
    daily.push({
      date: key,
      messages: doc?.count ?? 0,
      promptTokens: doc?.promptTokens ?? 0,
      completionTokens: doc?.completionTokens ?? 0,
      totalTokens: doc?.totalTokens ?? 0,
    });
  }

  const today = daily[daily.length - 1];
  const messages = daily.reduce((n, d) => n + d.messages, 0);
  const totalTokens = daily.reduce((n, d) => n + d.totalTokens, 0);

  // Titles come from the chats that still exist. A deleted chat keeps its usage
  // row and shows up with a null title.
  const sessionDocs = sessionRows.length
    ? await db
        .collection("agent_sessions")
        .find({ _id: { $in: sessionRows.map((r) => r._id) }, userId: uid })
        .project({ title: 1 })
        .toArray()
    : [];
  const titles = new Map(sessionDocs.map((s) => [String(s._id), s.title]));

  return {
    today: {
      messages: {
        used: today.messages,
        cap: DAILY_MESSAGE_CAP,
        remaining: Math.max(0, DAILY_MESSAGE_CAP - today.messages),
      },
      tokens: {
        prompt: today.promptTokens,
        completion: today.completionTokens,
        total: today.totalTokens,
      },
      resetAt: startOfDay(-1, tz).toISOString(),
    },
    daily,
    totals: {
      days,
      messages,
      totalTokens,
      avgTokensPerMessage: messages ? Math.round(totalTokens / messages) : 0,
    },
    sessions: sessionRows.map((r) => ({
      sessionId: String(r._id),
      title: titles.get(String(r._id)) ?? null,
      turns: r.turns,
      totalTokens: r.totalTokens,
      lastAt: r.lastAt.toISOString(),
    })),
  };
};
