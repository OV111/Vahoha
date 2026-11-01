import { ObjectId } from "mongodb";

/**
 * The learner's streak and `lastActiveAt`, kept on `userProgress`.
 *
 * Only LEARNING counts: an exam, a teach-back, a challenge submission, a mentor
 * message, a capstone or team defense. Opening the app does not (that is
 * `active_day` in eventService, a retention metric, not a habit the learner built).
 *
 * Days are calendar days in the learner's own timezone (usersStats.timezone,
 * UTC when unset): a learner in UTC-8 studying every evening would otherwise
 * see their streak break whenever a session crosses midnight UTC.
 *
 * The stored `streak` is the length of the run that ended on `lastLearningDay`.
 * It goes stale the moment a day is missed, so readers must go through
 * `currentStreak`, never read `progress.streak` directly.
 */

export const LEARNING_EVENT_TYPES = Object.freeze([
  "exam_submitted",
  "teach_back",
  "mentor_message",
  "challenge_submitted",
  "capstone_submitted",
  "team_defense_passed",
]);

const toObjectId = (id) => (id instanceof ObjectId ? id : new ObjectId(String(id)));

export const validTimeZone = (timeZone) => {
  if (!timeZone || typeof timeZone !== "string") return "UTC";
  try {
    new Intl.DateTimeFormat("en-US", { timeZone });
    return timeZone;
  } catch {
    return "UTC";
  }
};

/** "YYYY-MM-DD" of `date` as a calendar day in `timeZone`. */
export const dayKey = (date, timeZone = "UTC") => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: validTimeZone(timeZone),
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type).value;
  return `${get("year")}-${get("month")}-${get("day")}`;
};

export const previousDay = (key) => {
  const d = new Date(`${key}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
};

/** The streak as of `now`: the stored run if it is still alive, else 0. */
export const currentStreak = (progress, now = new Date()) => {
  if (!progress?.lastLearningDay) return 0;
  const today = dayKey(now, progress.streakTimeZone);
  // Day keys compare correctly as strings. ">= yesterday" also keeps the streak
  // when a timezone change puts lastLearningDay one day "ahead" of today.
  return progress.lastLearningDay >= previousDay(today) ? progress.streak ?? 0 : 0;
};

/** Pure, for the backfill: the run of consecutive days ending at the latest one. */
export const streakFromDays = (dayKeys) => {
  const days = [...new Set(dayKeys)].sort().reverse();
  if (!days.length) return { streak: 0, lastLearningDay: null };
  let streak = 1;
  while (streak < days.length && days[streak] === previousDay(days[streak - 1])) streak++;
  return { streak, lastLearningDay: days[0] };
};

/**
 * Count `now` as a learning day. Derived data: it never throws, so a hiccup here
 * can't fail the exam or submission that called it.
 *
 * One pipeline update, so two requests on the same day can't both increment.
 * Upserts: a learner may talk to the mentor before picking a path.
 */
export const recordLearningActivity = async (db, rawUserId, now = new Date()) => {
  try {
    const userId = toObjectId(rawUserId);
    const stats = await db
      .collection("usersStats")
      .findOne({ userId }, { projection: { timezone: 1 } });
    const timeZone = validTimeZone(stats?.timezone);
    const today = dayKey(now, timeZone);

    await db.collection("userProgress").updateOne(
      { userId },
      [
        {
          $set: {
            streak: {
              $switch: {
                branches: [
                  { case: { $gte: ["$lastLearningDay", today] }, then: { $ifNull: ["$streak", 1] } },
                  { case: { $eq: ["$lastLearningDay", previousDay(today)] }, then: { $add: [{ $ifNull: ["$streak", 0] }, 1] } },
                ],
                default: 1,
              },
            },
            lastLearningDay: { $max: ["$lastLearningDay", today] },
            streakTimeZone: timeZone,
            lastActiveAt: now,
            updatedAt: now,
            createdAt: { $ifNull: ["$createdAt", now] },
          },
        },
      ],
      { upsert: true },
    );
  } catch (err) {
    console.error("recordLearningActivity failed (streak not updated):", err.message);
  }
};
