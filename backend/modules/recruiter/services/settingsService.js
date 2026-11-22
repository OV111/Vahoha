/**
 * A developer's own recruiter-visibility settings. Always keyed by the signed-in
 * user's id taken from the token, never from the request body.
 */

import { ObjectId } from "mongodb";
import { DEFAULT_RECRUITER_SETTINGS, RECRUITER_SETTINGS, ensureIndexes } from "./recruiterData.js";
import { clearCandidatePool } from "./candidateService.js";

const toView = (doc) => ({
  enabled: doc?.enabled ?? DEFAULT_RECRUITER_SETTINGS.enabled,
  openToWork: doc?.openToWork ?? DEFAULT_RECRUITER_SETTINGS.openToWork,
  show: { ...DEFAULT_RECRUITER_SETTINGS.show, ...doc?.show },
});

export const getSettingsService = async (db, userId) => {
  await ensureIndexes(db);
  return toView(await db.collection(RECRUITER_SETTINGS).findOne({ userId: new ObjectId(userId) }));
};

export const saveSettingsService = async (db, userId, { enabled, openToWork, show }) => {
  await ensureIndexes(db);
  const now = new Date();
  const doc = await db.collection(RECRUITER_SETTINGS).findOneAndUpdate(
    { userId: new ObjectId(userId) },
    { $set: { enabled, openToWork, show, updatedAt: now }, $setOnInsert: { createdAt: now } },
    { upsert: true, returnDocument: "after" },
  );
  clearCandidatePool(); // opting out, or hiding a section, must show on the list at once
  // Opting out closes open intro requests: companies can't reach someone who
  // left, and the developer can't be held to answering them.
  if (!enabled) {
    await db
      .collection("intro_requests")
      .updateMany(
        { candidateId: new ObjectId(userId), status: "pending" },
        { $set: { status: "withdrawn", closedBy: "opt_out", updatedAt: now } },
      );
  }
  return toView(doc);
};
