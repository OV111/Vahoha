import { ObjectId } from "mongodb";
import { canAccessMap, ownerTypeOf } from "./ownerAccess.js";

const MAPS = "system_maps";
const COMMENTS = "system_map_comments";

/** Per map, so one script can't fill the collection. Old comments still show; new ones are refused. */
export const MAX_COMMENTS_PER_MAP = 500;

/*
 * system_map_comments: one note on one part of a TEAM map.
 *   { mapId, nodeId, userId, text, createdAt }
 * Comments live outside the graph, so editing the map (or undoing an edit)
 * never touches them. A comment whose part was deleted stays, and shows again
 * if the part comes back (undo restores the same node id).
 * Only team maps have comments: on a personal map only the owner could write
 * them, and public maps are read-only.
 */

/**
 * The map, when it is a team map this learner can open.
 * @returns {Promise<object | { error: "not-team" } | null>} null when missing or not theirs
 */
async function findTeamMap(db, mapId, userId) {
  const doc = await db.collection(MAPS).findOne({ _id: new ObjectId(mapId) }, { projection: { graph: 1, ownerType: 1, ownerId: 1, userId: 1 } });
  if (!doc || !(await canAccessMap(db, doc, userId))) return null;
  if (ownerTypeOf(doc) !== "team") return { error: "not-team" };
  return doc;
}

const authorName = (u) => {
  if (!u) return "Former member";
  const full = [u.firstName, u.lastName].filter(Boolean).join(" ").trim();
  return full || u.username || "Team member";
};

/** Adds author names and whether the caller wrote it. Ids only, never emails. */
async function toClient(db, docs, userId) {
  const ids = [...new Set(docs.map((d) => d.userId.toString()))].map((id) => new ObjectId(id));
  const users = ids.length
    ? await db.collection("users").find({ _id: { $in: ids } }, { projection: { firstName: 1, lastName: 1, username: 1 } }).toArray()
    : [];
  const byId = new Map(users.map((u) => [u._id.toString(), u]));
  return docs.map((d) => ({
    id: d._id.toString(),
    nodeId: d.nodeId,
    text: d.text,
    author: authorName(byId.get(d.userId.toString())),
    mine: d.userId.equals(userId),
    createdAt: d.createdAt,
  }));
}

/**
 * Every comment on the map, oldest first. The page groups them by part, which
 * also gives it the count badge for each part.
 * @returns {Promise<{ comments: object[] } | { error: "not-team" } | null>}
 */
export async function listCommentsService(db, mapId, userId) {
  const map = await findTeamMap(db, mapId, userId);
  if (!map || map.error) return map;
  const docs = await db.collection(COMMENTS).find({ mapId: map._id }).sort({ createdAt: 1 }).limit(MAX_COMMENTS_PER_MAP).toArray();
  return { comments: await toClient(db, docs, userId) };
}

/**
 * @returns {Promise<{ comment: object } | { error: "not-team" | "no-part" | "full" } | null>}
 */
export async function addCommentService(db, mapId, userId, { nodeId, text }) {
  const map = await findTeamMap(db, mapId, userId);
  if (!map || map.error) return map;
  // Only parts that are on the saved map, so comments can't pile up on made-up ids.
  if (!(map.graph?.nodes ?? []).some((n) => n.id === nodeId)) return { error: "no-part" };

  const comments = db.collection(COMMENTS);
  if ((await comments.countDocuments({ mapId: map._id })) >= MAX_COMMENTS_PER_MAP) return { error: "full" };

  const doc = { mapId: map._id, nodeId, userId, text, createdAt: new Date() };
  const { insertedId } = await comments.insertOne(doc);
  const [comment] = await toClient(db, [{ ...doc, _id: insertedId }], userId);
  return { comment };
}

/**
 * Authors delete their own comments; nobody else's.
 * @returns {Promise<boolean>} false when the comment doesn't exist or isn't theirs
 */
export async function deleteCommentService(db, mapId, commentId, userId) {
  const map = await findTeamMap(db, mapId, userId);
  if (!map || map.error) return false;
  const { deletedCount } = await db.collection(COMMENTS).deleteOne({ _id: new ObjectId(commentId), mapId: map._id, userId });
  return deletedCount === 1;
}

/** Called when a map is deleted, so its comments don't outlive it. */
export async function deleteMapComments(db, mapId) {
  await db.collection(COMMENTS).deleteMany({ mapId: new ObjectId(mapId) });
}
