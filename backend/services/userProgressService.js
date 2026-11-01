import { ObjectId } from "mongodb";
import { doneLayerIds, firstOpenLayer } from "./layerProgress.js";

export const getUserProgress = async (db, userId) => {
  const collection = db.collection("userProgress");
  return collection.findOne({ userId: new ObjectId(userId) });
};

export const createUserProgress = async (db, userId, data = {}) => {
  const collection = db.collection("userProgress");
  const doc = {
    userId: new ObjectId(userId),
    activePath: data.activePath,
    currentLayer: data.currentLayer || 1,
    completedLayers: data.completedLayers || [],
    skillLevel: data.skillLevel || "beginner",
    xpTotal: 0,
    streak: 0,
    lastActiveAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const result = await collection.insertOne(doc);
  return { ...doc, _id: result.insertedId };
};

export const updateUserProgress = async (db, userId, fields) => {
  const collection = db.collection("userProgress");
  return collection.findOneAndUpdate(
    { userId: new ObjectId(userId) },
    { $set: { ...fields, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
    { returnDocument: "after", upsert: true },
  );
};

/**
 * Point `currentLayer` at the first layer of the active track not yet passed.
 *
 * The server owns this: the client never sent it, so before this existed every
 * learner sat on layer 1 forever and challenge readiness and the leaderboard
 * were scoped to the wrong layer. Run after anything that changes the answer:
 * a passed exam, a new or switched path.
 */
export const syncCurrentLayer = async (db, userId) => {
  const progress = await getUserProgress(db, userId);
  if (!progress?.activePath) return progress;

  const trackLayers = await db
    .collection("roadmap_layers")
    .find({ trackId: progress.activePath }, { projection: { layerId: 1, order: 1, _id: 0 } })
    .toArray();
  const currentLayer = firstOpenLayer(trackLayers, doneLayerIds(progress));
  if (currentLayer == null || currentLayer === progress.currentLayer) return progress;

  return updateUserProgress(db, userId, { currentLayer });
};

/**
 * The only write that marks a layer passed. Called by the exam engine after a
 * passing attempt is saved; the map and its completedLayers mirror move in one
 * update so they can't drift apart again.
 */
export const markLayerDone = async (db, userId, layerId) => {
  const now = new Date();
  await db.collection("userProgress").updateOne(
    { userId: new ObjectId(userId) },
    {
      $set: { [`layerProgress.${layerId}`]: "done", updatedAt: now },
      $addToSet: { completedLayers: layerId },
      $setOnInsert: { createdAt: now },
    },
    { upsert: true },
  );
  return syncCurrentLayer(db, userId);
};
