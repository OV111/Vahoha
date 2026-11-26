import { COLLECTIONS, TOPIC_STATUS } from "../lib/constants.js";

export const topics = (db) => db.collection(COLLECTIONS.TOPICS);
export const progress = (db) => db.collection(COLLECTIONS.PROGRESS);
export const answers = (db) => db.collection(COLLECTIONS.ANSWERS);
export const explanations = (db) => db.collection(COLLECTIONS.EXPLANATIONS);

let indexesReady = null;

/** Call before the first write: the unique indexes are what stop duplicates. */
export const ensureLearnIndexes = (db) => {
  indexesReady ??= Promise.all([
    topics(db).createIndex({ topicId: 1, version: 1 }, { unique: true }),
    // Learners can never get two live versions of one topic.
    topics(db).createIndex(
      { topicId: 1 },
      { unique: true, partialFilterExpression: { status: TOPIC_STATUS.PUBLISHED }, name: "one_published_per_topic" },
    ),

    progress(db).createIndex({ userId: 1, topicId: 1 }, { unique: true }),
    // Which topics are due for review.
    progress(db).createIndex({ userId: 1, reviewAt: 1 }),

    answers(db).createIndex({ userId: 1, topicId: 1, createdAt: -1 }),
    // Which questions everyone gets wrong.
    answers(db).createIndex({ topicId: 1, questionId: 1 }),

    // Two quick submits can't both become the same attempt.
    explanations(db).createIndex({ userId: 1, topicId: 1, version: 1, attempt: 1 }, { unique: true }),
    // The daily limit on AI feedback.
    explanations(db).createIndex({ userId: 1, createdAt: -1 }),
  ]).catch((err) => {
    indexesReady = null; // retry on the next request instead of caching a failure
    throw err;
  });
  return indexesReady;
};
