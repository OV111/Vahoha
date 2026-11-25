// Data access shared by the capstone services.

import { ObjectId } from "mongodb";

export const BRIEFS = "capstone_briefs";
export const ATTEMPTS = "capstone_attempts";
export const SUBMISSIONS = "capstone_submissions";
export const REVIEWS = "capstone_reviews";
export const DEFENSES = "capstone_defenses";
export const CERTIFICATES = "certificates";
export const ADMIN_ACTIONS = "capstone_admin_actions";

export const fail = (status, message, details) => {
  const err = new Error(message);
  err.status = status;
  if (details) err.details = details;
  throw err;
};

let indexesReady = null;
export const ensureIndexes = (db) => {
  indexesReady ??= Promise.all([
    // attemptNumber is "attempts so far + 1", so two concurrent starts collide here.
    db.collection(ATTEMPTS).createIndex({ userId: 1, trackId: 1, attemptNumber: 1 }, { unique: true }),
    db.collection(ATTEMPTS).createIndex({ updatedAt: -1 }), // admin list

    db.collection(SUBMISSIONS).createIndex({ attemptId: 1, submittedAt: -1 }),
    db.collection(SUBMISSIONS).createIndex({ userId: 1, submittedAt: -1 }), // daily cap
    // Finds the same work submitted by another learner.
    db.collection(SUBMISSIONS).createIndex({ "repo.id": 1 }),
    db.collection(SUBMISSIONS).createIndex({ treeSha: 1 }),

    db.collection(REVIEWS).createIndex({ attemptId: 1, createdAt: -1 }),

    // One session per number per attempt: a double "start" collides here.
    db.collection(DEFENSES).createIndex({ attemptId: 1, sessionNumber: 1 }, { unique: true }),
    db.collection(DEFENSES).createIndex({ userId: 1, status: 1 }), // hasLiveDefense, on every mentor message

    // One certificate per learner per track: issuing twice collides here.
    db.collection(CERTIFICATES).createIndex({ userId: 1, trackId: 1 }, { unique: true }),
    db.collection(CERTIFICATES).createIndex({ publicId: 1 }, { unique: true }), // the verification URL

    db.collection(ADMIN_ACTIONS).createIndex({ attemptId: 1, at: -1 }),

    db.collection("exam_attempts").createIndex({ userId: 1, passed: 1, layer: 1 }), // isPathComplete
  ]).catch((err) => {
    indexesReady = null; // let the next request retry instead of caching a failure
    throw err;
  });
  return indexesReady;
};

// Old versions stay in the collection: attempts point at the exact brief they started with.
export const getLatestBrief = (db, trackId) =>
  db.collection(BRIEFS).find({ trackId, status: "published" }).sort({ version: -1 }).limit(1).next();

// The brief an attempt started with, read again only if it isn't `latest`.
export const getBriefForAttempt = async (db, attempt, latest) =>
  latest && attempt.briefId.equals(latest._id)
    ? latest
    : db.collection(BRIEFS).findOne({ _id: attempt.briefId });

export const getAttempts = (db, userId, trackId) =>
  db
    .collection(ATTEMPTS)
    .find({ userId: new ObjectId(userId), trackId })
    .sort({ attemptNumber: -1 })
    .toArray();

// True for any attempt, whatever its status.
export const hasCapstoneAttempt = async (db, userId, trackId) =>
  Boolean(await db.collection(ATTEMPTS).findOne({ userId: new ObjectId(userId), trackId }, { projection: { _id: 1 } }));
