import { LEARNING_EVENT_TYPES, currentStreak, dayKey } from "../../../services/learningActivity.js";
import { getNextAction } from "../../../services/learnerMasteryService.js";
import { resolveActiveLayer } from "../../coding-challenges/lib/activeLayer.js";

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * The raw numbers behind one learner's weekly email. Reads only server-written
 * evidence (events, exam attempts, challenge results, the XP ledger), never a
 * client-reported field. "This week" is the 7 days before `now`.
 *
 * @param {{ _id: import("mongodb").ObjectId }} user
 */
export const loadSummaryData = async (db, user, { now, timeZone }) => {
  const userId = user._id;
  const since = new Date(now.getTime() - 7 * DAY_MS);

  const [progress, events, passedLayerIds, challengesSolved, xp] = await Promise.all([
    db.collection("userProgress").findOne({ userId }),
    db
      .collection("userEvents")
      .find({ userId, type: { $in: LEARNING_EVENT_TYPES }, createdAt: { $gte: since } }, { projection: { createdAt: 1 } })
      .toArray(),
    db.collection("exam_attempts").distinct("layer", { userId, passed: true, submittedAt: { $gte: since } }),
    db.collection("challengeResults").countDocuments({ userId, status: "solved", solvedAt: { $gte: since } }),
    db
      .collection("xpAwards")
      .aggregate([
        { $match: { userId, applied: true, revokedAt: { $exists: false }, awardedAt: { $gte: since } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ])
      .toArray(),
  ]);

  const [layerDocs, nextAction, activeLayer] = await Promise.all([
    passedLayerIds.length
      ? db
          .collection("roadmap_layers")
          .find({ layerId: { $in: passedLayerIds } }, { projection: { title: 1, order: 1, _id: 0 } })
          .sort({ order: 1 })
          .toArray()
      : [],
    getNextAction(db, userId.toString(), progress),
    resolveActiveLayer(db, userId.toString()),
  ]);

  return {
    now,
    signedUpAt: userId.getTimestamp(),
    lastLearnedAt: progress?.lastActiveAt ?? null,
    activeDays: new Set(events.map((e) => dayKey(e.createdAt, timeZone))).size,
    layersPassed: layerDocs.map((l) => l.title),
    challengesSolved,
    xpEarned: xp[0]?.total ?? 0,
    streak: currentStreak(progress, now),
    nextAction,
    activeLayerTitle: activeLayer?.title ?? null,
  };
};
