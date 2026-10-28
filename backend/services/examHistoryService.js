import { ObjectId } from "mongodb";
import { toTopicSlug } from "../utils/topicKey.js";
import { getLayers } from "./roadmapCache.js";

export const getExamHistory = async (db, userId, limit = 10) => {
  const collection = db.collection("examHistory");
  return collection
    .find({ userId: new ObjectId(userId) })
    .sort({ takenAt: -1 })
    .limit(limit)
    .toArray();
};

/**
 * Adds `layerTitle` to exam rows. `layer` is an id like "L_03" — meaningless
 * to a person — so the learner-facing history joins roadmap_layers once
 * (one query for all rows, not one per row). Unknown ids fall back to null
 * and the caller shows the id instead.
 */
export const withLayerTitles = async (db, rows) => {
  const ids = [...new Set(rows.map((r) => r.layer).filter(Boolean))];
  if (ids.length === 0) return rows.map((r) => ({ ...r, layerTitle: null }));

  const layers = await getLayers(db, ids);
  return rows.map((r) => ({ ...r, layerTitle: layers.get(r.layer)?.title ?? null }));
};

export const getLastExam = async (db, userId) => {
  const collection = db.collection("examHistory");
  return collection.findOne(
    { userId: new ObjectId(userId) },
    { sort: { takenAt: -1 } },
  );
};

export const saveExamResult = async (
  db,
  userId,
  {
    path,
    layer,
    score,
    passed,
    totalQuestions,
    correctAnswers,
    missedTopics,
    timeTakenSecs,
  },
) => {
  const collection = db.collection("examHistory");
  const missed = missedTopics || [];

  const doc = {
    userId: new ObjectId(userId),
    path,
    layer,
    score,
    passed: Boolean(passed),
    totalQuestions,
    correctAnswers,
    // `missedTopics` stays exactly as the caller passed it — it is what the UI
    // shows. `missedTopicSlugs` is the canonical join key LearnerContext uses to
    // line this exam up against weak spots and teach-back scores for the same
    // topic. Storing both means neither consumer has to slugify at read time.
    missedTopics: missed,
    missedTopicSlugs: [...new Set(missed.map(toTopicSlug).filter(Boolean))],
    timeTakenSecs,
    takenAt: new Date(),
  };
  const result = await collection.insertOne(doc);
  return { ...doc, _id: result.insertedId };
};
