import { ObjectId } from "mongodb";
import { getUserProgress } from "../../../services/userProgressService.js";
import { doneLayerIds } from "../../../services/layerProgress.js";
import { getTracks } from "../../../services/roadmapCache.js";
import {
  LEARNING_EVENT_TYPES,
  currentStreak,
  dayKey,
  previousDay,
  validTimeZone,
} from "../../../services/learningActivity.js";

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Pure: the learner's last 7 calendar days, oldest first, each marked active if
 * any learning event fell on it. Days are in the learner's timezone, the same
 * rule the streak uses, so the strip and the streak can't disagree.
 */
export const buildWeek = (eventDates, now, timeZone) => {
  const active = new Set(eventDates.map((d) => dayKey(d, timeZone)));
  const days = [dayKey(now, timeZone)];
  while (days.length < 7) days.unshift(previousDay(days[0]));
  return days.map((day) => ({ day, active: active.has(day) }));
};

/**
 * Pure: every layer of the track with where the learner stands on it.
 * "done" is server-earned (a passed exam); "current" is the layer currentLayer
 * points at; everything else is "ahead".
 */
export const buildPath = (trackLayers, progress) => {
  const done = new Set(doneLayerIds(progress));
  return [...trackLayers]
    .sort((a, b) => a.order - b.order)
    .map((l) => ({
      layerId: l.layerId,
      title: l.title,
      order: l.order,
      status: done.has(l.layerId) ? "done" : l.order === progress?.currentLayer ? "current" : "ahead",
    }));
};

/**
 * "Where am I?" for the progress page: the active path layer by layer, the
 * streak, XP and this week's learning days. Free for everyone, unlike the
 * per-topic map: knowing where you stand is not a Pro feature.
 */
export const getJourney = async (db, rawUserId, now = new Date()) => {
  const userId = new ObjectId(String(rawUserId));
  const [progress, stats] = await Promise.all([
    getUserProgress(db, userId),
    db.collection("usersStats").findOne({ userId }, { projection: { timezone: 1 } }),
  ]);
  const timeZone = validTimeZone(progress?.streakTimeZone ?? stats?.timezone);

  const [events, trackLayers, tracks] = await Promise.all([
    db
      .collection("userEvents")
      .find(
        { userId, type: { $in: LEARNING_EVENT_TYPES }, createdAt: { $gte: new Date(now.getTime() - 8 * DAY_MS) } },
        { projection: { createdAt: 1, _id: 0 } },
      )
      .toArray(),
    progress?.activePath
      ? db
          .collection("roadmap_layers")
          .find({ trackId: progress.activePath }, { projection: { _id: 0, layerId: 1, title: 1, order: 1 } })
          .toArray()
      : [],
    progress?.activePath ? getTracks(db, [progress.activePath]) : new Map(),
  ]);

  const layers = buildPath(trackLayers, progress);
  return {
    track: progress?.activePath
      ? { id: progress.activePath, title: tracks.get(progress.activePath)?.title ?? progress.activePath }
      : null,
    layers,
    passed: layers.filter((l) => l.status === "done").length,
    streak: currentStreak(progress, now),
    xpTotal: progress?.xpTotal ?? 0,
    week: buildWeek(
      events.map((e) => e.createdAt),
      now,
      timeZone,
    ),
  };
};
