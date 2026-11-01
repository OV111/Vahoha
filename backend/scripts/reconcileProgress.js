/**
 * Bring every userProgress document in line with server-written evidence.
 *
 * Usage:
 *   node backend/scripts/reconcileProgress.js          # dry run: prints, writes nothing
 *   node backend/scripts/reconcileProgress.js --write  # apply
 *
 * Three fixes, each one a field that used to be wrong or never written:
 *   1. layerProgress "done" = exactly the layers with a passed exam_attempt.
 *      Old documents can hold a self-reported "done" (from before the server
 *      sanitized the map), which unlocked layers the certificate gate refused;
 *      those go back to "in-progress". Passed layers missing from the map are added.
 *      completedLayers becomes the mirror of the result.
 *   2. currentLayer = first unpassed layer of the active track (was stuck at 1).
 *   3. streak / lastLearningDay, rebuilt from learning events in userEvents
 *      (was never written). Days before the events log existed are not counted.
 *
 * Run it once after deploying the change that introduced it: until then a layer
 * recorded only in the legacy completedLayers list no longer unlocks the next.
 * Safe to re-run.
 */

import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import process from "process";

dotenv.config({ path: "./backend/.env.local" });
dotenv.config({ path: "./backend/.env" });

const { sanitizeLayerProgress, doneLayerIds, firstOpenLayer } = await import("../services/layerProgress.js");
const { LEARNING_EVENT_TYPES, dayKey, validTimeZone, streakFromDays } = await import(
  "../services/learningActivity.js"
);

const APPLY = process.argv.includes("--write");
// Challenge submissions record activity directly rather than through an event,
// so the history of them is the challenge_solved event.
const HISTORY_TYPES = [...LEARNING_EVENT_TYPES, "challenge_solved"];

const sameSet = (a, b) => a.length === b.length && a.every((x) => b.includes(x));

const run = async () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI env var is required");

  const mongo = new MongoClient(process.env.MONGO_URI);
  await mongo.connect();
  const db = mongo.db("DevsBlog");
  console.log(`Connected. Mode: ${APPLY ? "WRITE" : "DRY RUN (pass --write to apply)"}\n`);

  const docs = await db.collection("userProgress").find({}).toArray();
  const changed = { layers: 0, downgraded: 0, currentLayer: 0, streak: 0 };

  for (const doc of docs) {
    const id = doc.userId.toString();

    const passed = await db
      .collection("exam_attempts")
      .distinct("layer", { userId: doc.userId, passed: true });
    // Strip every "done" first, then sanitize grants exactly the passed ones.
    const withoutDone = Object.fromEntries(
      Object.entries(doc.layerProgress ?? {}).map(([k, v]) => [k, v === "done" ? "in-progress" : v]),
    );
    const layerProgress = sanitizeLayerProgress(withoutDone, passed);
    const completedLayers = doneLayerIds({ layerProgress });
    const before = doneLayerIds(doc);
    const lost = before.filter((l) => !completedLayers.includes(l));
    const legacyOnly = (doc.completedLayers ?? []).filter((l) => !before.includes(l));

    const trackLayers = doc.activePath
      ? await db
          .collection("roadmap_layers")
          .find({ trackId: doc.activePath }, { projection: { layerId: 1, order: 1, _id: 0 } })
          .toArray()
      : [];
    const currentLayer = firstOpenLayer(trackLayers, completedLayers) ?? doc.currentLayer;

    const stats = await db.collection("usersStats").findOne({ userId: doc.userId }, { projection: { timezone: 1 } });
    const timeZone = validTimeZone(stats?.timezone);
    const events = await db
      .collection("userEvents")
      .find({ userId: doc.userId, type: { $in: HISTORY_TYPES } }, { projection: { createdAt: 1 } })
      .toArray();
    const { streak, lastLearningDay } = streakFromDays(events.map((e) => dayKey(e.createdAt, timeZone)));
    const lastEvent = events.reduce((max, e) => (e.createdAt > max ? e.createdAt : max), null);

    const layersChanged =
      !sameSet(before, completedLayers) || !sameSet(doc.completedLayers ?? [], completedLayers);
    const currentChanged = currentLayer !== doc.currentLayer;
    const streakChanged = lastLearningDay && lastLearningDay !== doc.lastLearningDay;
    if (!layersChanged && !currentChanged && !streakChanged) continue;

    console.log(`user ${id}`);
    if (layersChanged) {
      console.log(`  done: ${before.length} -> ${completedLayers.length}`);
      if (lost.length) console.log(`  no passed exam, back to in-progress: ${lost.join(", ")}`);
      if (legacyOnly.length) console.log(`  legacy completedLayers only: ${legacyOnly.join(", ")}`);
      changed.layers++;
      if (lost.length) changed.downgraded++;
    }
    if (currentChanged) {
      console.log(`  currentLayer: ${doc.currentLayer ?? "-"} -> ${currentLayer}`);
      changed.currentLayer++;
    }
    if (streakChanged) {
      console.log(`  streak: ${streak} day(s) ending ${lastLearningDay} (${timeZone})`);
      changed.streak++;
    }

    if (!APPLY) continue;
    const set = { updatedAt: new Date() };
    if (layersChanged) Object.assign(set, { layerProgress, completedLayers });
    if (currentChanged) set.currentLayer = currentLayer;
    if (streakChanged) {
      Object.assign(set, { streak, lastLearningDay, streakTimeZone: timeZone });
      // Only ever move lastActiveAt forward.
      if (!doc.lastActiveAt || lastEvent > doc.lastActiveAt) set.lastActiveAt = lastEvent;
    }
    await db.collection("userProgress").updateOne({ _id: doc._id }, { $set: set });
  }

  console.log(
    `\n${docs.length} learner(s). ${APPLY ? "Updated" : "Would update"}: ` +
      `layers ${changed.layers} (${changed.downgraded} lose a self-reported layer), ` +
      `currentLayer ${changed.currentLayer}, streak ${changed.streak}.`,
  );
  await mongo.close();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
