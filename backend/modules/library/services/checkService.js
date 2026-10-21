import { ObjectId } from "mongodb";
import { loadVisibleSource } from "./digestService.js";

const CHECKS = "libraryConceptChecks";

/**
 * Grades one "check yourself" answer for a digest concept and records it.
 *
 * Self-study evidence only: this never awards XP, never touches mastery, layer
 * progress or exams, and never unlocks anything. It is stored in its own
 * collection so it can be shown as a separate, weaker signal than a passed
 * layer exam or challenge.
 *
 * Returns null if the user cannot see this digest or the concept has no check.
 */
export const submitConceptCheckService = async (db, sourceId, conceptKey, userId, answerIndex) => {
  const source = await loadVisibleSource(db, sourceId, userId);
  if (!source) return null;

  const concept = await db
    .collection("libraryConcepts")
    .findOne(
      { sourceId: source._id, key: conceptKey, ...(source.admin ? {} : { reviewed: true }) },
      { projection: { check: 1 } },
    );
  if (!concept?.check) return null;

  const correct = answerIndex === concept.check.answerIndex;
  await db.collection(CHECKS).updateOne(
    { userId: new ObjectId(userId), sourceId: source._id, conceptKey },
    {
      // everCorrect only ever moves to true: a later wrong answer doesn't erase a pass.
      $set: { lastCorrect: correct, at: new Date(), ...(correct ? { everCorrect: true } : {}) },
      $setOnInsert: correct ? {} : { everCorrect: false },
      $inc: { attempts: 1 },
    },
    { upsert: true },
  );

  return { correct, answerIndex: concept.check.answerIndex, explanation: concept.check.explanation };
};
