import dns from "node:dns";
import { MongoClient } from "mongodb";
import process from "process";

let db;
let client;

const connectDB = async () => {
  if (db) return db; // reuse existing connection

  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is missing");
    }

    // Local-dev escape hatch: some machines expose a dead resolver (127.0.0.1)
    // to Node, which breaks mongodb+srv lookups. Example: DNS_SERVERS=1.1.1.1,8.8.8.8
    if (process.env.DNS_SERVERS) {
      dns.setServers(process.env.DNS_SERVERS.split(",").map((s) => s.trim()));
    }

    client = new MongoClient(mongoUri);
    await client.connect();
    console.log("MongoDB connected successfully!");
    db = client.db("DevsBlog"); // store reference to DB

    // allSettled, not all: one index that can't be built (for example over
    // existing duplicate data) is logged, but must not stop the server from
    // starting or leave it half connected.
    const indexResults = await Promise.allSettled([
      // Unique accounts. findUniqueUsername / the email check in signUp are
      // check-then-insert races on their own; these indexes are the guard.
      // Email is unique only where it is a string: GitHub users may have none.
      db.collection("users").createIndex({ username: 1 }, { unique: true }),
      // Reset links are looked up by token hash. The TTL index lets Mongo
      // delete expired links on its own (it sweeps about once a minute; the
      // query still checks expiresAt, so a not-yet-swept link never works).
      db.collection("passwordResets").createIndex({ tokenHash: 1 }, { unique: true }),
      db.collection("passwordResets").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
      // Magic sign-in links: looked up by token hash, expired by TTL, and by
      // email + createdAt for the resend cooldown.
      db.collection("loginLinks").createIndex({ tokenHash: 1 }, { unique: true }),
      db.collection("loginLinks").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
      db.collection("loginLinks").createIndex({ email: 1, createdAt: -1 }),
      db.collection("users").createIndex(
        { email: 1 },
        { unique: true, partialFilterExpression: { email: { $type: "string" } } },
      ),
      db.collection("follows").createIndex({ followerId: 1, followingId: 1 }, { unique: true }),
      db.collection("notifications").createIndex({ targetUserId: 1, createdAt: -1 }),
      // Chat blocks: unique pair so a repeated block can't duplicate; the
      // reverse index backs the "did the other side block me" check.
      db.collection("blocks").createIndex({ blockerId: 1, blockedId: 1 }, { unique: true }),
      db.collection("blocks").createIndex({ blockedId: 1, blockerId: 1 }),
      db.collection("blogs").createIndex({ status: 1, category: 1, createdAt: -1 }),
      // "Posts for this layer" in the roadmap drawer (blogService getBlogsService).
      db.collection("blogs").createIndex({ layerIds: 1, status: 1, createdAt: -1 }),
      // Digest concepts: one per book + key. Known-state: one row per learner, book and concept.
      db.collection("system_maps").createIndex({ userId: 1, updatedAt: -1 }),
      db.collection("system_map_checks").createIndex({ userId: 1, mapId: 1, createdAt: -1 }),
      // One capstone map per learner per track, one map per team (the 409 "exists" in createOwnerMapService).
      db.collection("system_maps").createIndex(
        { ownerType: 1, ownerId: 1, userId: 1 },
        { unique: true, partialFilterExpression: { ownerType: "capstone" } },
      ),
      db.collection("system_maps").createIndex(
        { ownerType: 1, ownerId: 1 },
        { unique: true, partialFilterExpression: { ownerType: "team" } },
      ),
      db.collection("system_maps").createIndex(
        { publicId: 1 },
        { unique: true, partialFilterExpression: { publicId: { $type: "string" } } },
      ),
      db.collection("libraryConcepts").createIndex({ sourceId: 1, key: 1 }, { unique: true }),
      db.collection("libraryConceptStates").createIndex({ userId: 1, sourceId: 1, conceptKey: 1 }, { unique: true }),
      db.collection("libraryConceptChecks").createIndex({ userId: 1, sourceId: 1, conceptKey: 1 }, { unique: true }),
      db.collection("exam_attempts").createIndex({ userId: 1, path: 1, layer: 1, startedAt: -1 }),
      db.collection("teach_back_rubrics").createIndex({ path: 1, layer: 1, topic: 1 }, { unique: true }),
      db.collection("teach_back_sessions").createIndex({ userId: 1, path: 1, layer: 1, startedAt: -1 }),
      // LearnerContext runs these five reads on every AI-mentor turn, so they
      // need to be index-backed rather than collection scans.
      db.collection("weakSpots").createIndex({ userId: 1, resolvedAt: 1 }),
      db.collection("weakSpots").createIndex({ userId: 1, slug: 1 }),
      db.collection("examHistory").createIndex({ userId: 1, takenAt: -1 }),
      db.collection("challengeResults").createIndex({ userId: 1, solvedAt: -1 }),
      db.collection("teach_back_sessions").createIndex({ userId: 1, startedAt: -1 }),
      // One mastery row per learner per topic — unique so a concurrent recompute
      // upserts rather than duplicating, which would give readers two statuses
      // for the same topic.
      db.collection("learnerMastery").createIndex({ userId: 1, slug: 1 }, { unique: true }),
      // Teaching log is always read as "recent attempts for these topics".
      db.collection("mentor_teaching_log").createIndex({ userId: 1, slug: 1, at: -1 }),
      // One redirect target per freed-up handle; renaming or reclaiming a
      // username upserts/deletes this row rather than duplicating it.
      db.collection("usernameHistory").createIndex({ oldUsername: 1 }, { unique: true }),
      // Pilot analytics (eventService.js): per-user timelines and per-type counts.
      db.collection("userEvents").createIndex({ userId: 1, createdAt: -1 }),
      db.collection("userEvents").createIndex({ type: 1, createdAt: -1 }),
      // Backs trackActiveDay's upsert; unique so two concurrent token refreshes
      // on the same day can't both insert.
      db.collection("userEvents").createIndex(
        { userId: 1, day: 1 },
        { unique: true, partialFilterExpression: { type: "active_day" } },
      ),
    ]);
    for (const r of indexResults) {
      if (r.status === "rejected") console.error("MongoDB index creation failed:", r.reason?.message);
    }

    return db;
  } catch (err) {
    console.error("MongoDB connection error", err);
    throw err;
  }
};
/**
 * Close the shared client. Used on shutdown so in-flight operations finish and
 * the connection pool is released cleanly instead of being cut by process exit.
 */
export const closeDB = async () => {
  if (!client) return;
  const closing = client;
  client = undefined;
  db = undefined;
  await closing.close();
};

export default connectDB;
