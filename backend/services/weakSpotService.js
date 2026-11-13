import { ObjectId } from "mongodb";
import { toTopicSlug } from "../utils/topicKey.js";

export const getWeakSpots = async (db, userId) => {
  const collection = db.collection("weakSpots");
  return collection
    .find({ userId: new ObjectId(userId), resolvedAt: null })
    .sort({ failCount: -1 })
    .toArray();
};

// The mentor may raise a topic's fail count at most once per day. A test or a
// review is real evidence and always counts; the mentor's note can come from text
// it was steered by (an attached file, a post), so repeating it must not be able
// to make a topic look badly failed.
const AGENT_COOLDOWN_MS = 24 * 60 * 60 * 1000;

export const addWeakSpot = async (
  db,
  userId,
  { topic, path, layer, source, sessionId = null },
) => {
  const collection = db.collection("weakSpots");
  const slug = toTopicSlug(topic);
  const fromAgent = source === "agent";
  const now = new Date();
  // Kept apart from failCount, so what the mentor added can be told from
  // what tests and reviews found, and reviewed or undone later.
  const agentMark = fromAgent
    ? { lastAgentLogAt: now, lastAgentSessionId: sessionId ? new ObjectId(sessionId) : null }
    : {};

  const existing = await collection.findOne({
    userId: new ObjectId(userId),
    // Match on the slug, but also on the legacy uppercase topic so a document
    // written before slugs existed gets incremented rather than duplicated —
    // otherwise the same weak spot would be tracked twice, splitting failCount
    // and under-reporting how much the learner is actually struggling.
    $or: [{ slug }, { topic: topic.toUpperCase() }],
  });

  if (existing) {
    // The cooldown is part of the filter, so two replies arriving together
    // cannot both pass it: only one update can match.
    const filter = fromAgent
      ? {
          _id: existing._id,
          $or: [
            { lastAgentLogAt: { $exists: false } },
            { lastAgentLogAt: { $lt: new Date(now.getTime() - AGENT_COOLDOWN_MS) } },
          ],
        }
      : { _id: existing._id };

    const updated = await collection.findOneAndUpdate(
      filter,
      {
        $inc: { failCount: 1, ...(fromAgent && { agentLogCount: 1 }) },
        // Backfill the slug opportunistically, so legacy documents self-heal on
        // the next write even if the migration script never runs.
        $set: { slug, resolvedAt: null, updatedAt: now, ...agentMark },
      },
      { returnDocument: "after" },
    );
    // No match means the mentor already counted this topic today.
    if (fromAgent && !(updated?.value ?? updated)) return { ...existing, skipped: true };
    return updated;
  }

  const doc = {
    userId: new ObjectId(userId),
    // Stored with the caller's own casing: `slug` is the identity key, so this
    // is only a display string, and the mentor reads it back to the learner.
    topic: topic.trim(),
    slug,
    path,
    layer,
    source,
    failCount: 1,
    ...(fromAgent && { agentLogCount: 1, ...agentMark }),
    resolvedAt: null,
    createdAt: now,
    updatedAt: now,
  };
  const result = await collection.insertOne(doc);
  return { ...doc, _id: result.insertedId };
};

export const resolveWeakSpot = async (db, userId, topic) => {
  const collection = db.collection("weakSpots");
  // Same dual match as addWeakSpot: resolving has to find the document however
  // it was keyed when written, or a learner who just proved mastery keeps an
  // open weak spot and the mentor keeps nagging them about it.
  return collection.findOneAndUpdate(
    {
      userId: new ObjectId(userId),
      $or: [{ slug: toTopicSlug(topic) }, { topic: topic.toUpperCase() }],
    },
    { $set: { resolvedAt: new Date(), updatedAt: new Date() } },
    { returnDocument: "after" },
  );
};
