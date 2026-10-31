import { randomBytes } from "node:crypto";
import { ObjectId } from "mongodb";
import { canAccessMap, isEligibleForOwner, ownerTypeOf } from "./ownerAccess.js";
import { deleteMapComments } from "./commentService.js";

const COLLECTION = "system_maps";

/** Per-learner cap on personal maps, so a script can't fill the collection. Capstone and team maps don't count. */
export const MAX_MAPS_PER_USER = 10;

// Personal maps (and ones saved before stage 5, which have no ownerType).
const PERSONAL = { $in: [null, "personal"] };

/*
 * system_maps: one document per diagram.
 *   { userId, ownerType, ownerId, title, graph: { v, nodes, edges }, revision, shared, publicId,
 *     drift, createdAt, updatedAt }
 * userId is the creator. ownerType is "personal" (ownerId null), "capstone"
 * (ownerId = track id, one per learner and track) or "team" (ownerId = team id,
 * one per team, open to every active member: see ownerAccess.js). Maps from
 * before stage 5 have neither field and count as personal.
 * publicId exists only while shared is on: each share mints a new one, so a
 * link that was turned off never works again. Team maps are never shared.
 * drift is written by the drift check when a merged PR may have outdated the map.
 */

const toClient = (doc) => ({
  id: doc._id.toString(),
  title: doc.title,
  graph: doc.graph,
  ownerType: ownerTypeOf(doc),
  ownerId: doc.ownerId ?? null,
  revision: doc.revision,
  shared: Boolean(doc.shared),
  publicId: doc.shared ? doc.publicId : null,
  drift: doc.drift ?? null,
  updatedAt: doc.updatedAt,
});

const toSummary = (doc) => ({
  id: doc._id.toString(),
  title: doc.title,
  updatedAt: doc.updatedAt,
  parts: doc.graph.nodes.length,
  shared: Boolean(doc.shared),
  ownerType: ownerTypeOf(doc),
  ownerId: doc.ownerId ?? null,
});

// The learner's own maps: personal and capstone. Team maps are opened from their team.
const LIST_LIMIT = 50;

/** The learner's personal and capstone maps, newest edit first, without their graphs. */
export async function listMapsService(db, userId) {
  const docs = await db
    .collection(COLLECTION)
    .find(
      { userId, ownerType: { $ne: "team" } },
      { projection: { title: 1, updatedAt: 1, shared: 1, ownerType: 1, ownerId: 1, "graph.nodes.id": 1 } },
    )
    .sort({ updatedAt: -1 })
    .limit(LIST_LIMIT)
    .toArray();
  return docs.map(toSummary);
}

/** The map document if it exists and this learner may open it, else null. */
async function findAccessible(db, id, userId) {
  const doc = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
  return doc && (await canAccessMap(db, doc, userId)) ? doc : null;
}

/** One map, or null when it doesn't exist or this learner may not open it. */
export async function getMapService(db, id, userId) {
  const doc = await findAccessible(db, id, userId);
  return doc ? toClient(doc) : null;
}

/** @returns {Promise<{ map: object } | { error: "limit" }>} */
export async function createMapService(db, userId, { title, graph }) {
  const maps = db.collection(COLLECTION);
  if ((await maps.countDocuments({ userId, ownerType: PERSONAL })) >= MAX_MAPS_PER_USER) return { error: "limit" };

  const now = new Date();
  const doc = { userId, ownerType: "personal", ownerId: null, title, graph, revision: 1, createdAt: now, updatedAt: now };
  const { insertedId } = await maps.insertOne(doc);
  return { map: toClient({ ...doc, _id: insertedId }) };
}

/**
 * Saves a map if the client's `revision` is still current.
 * @returns {Promise<{ map: object } | { error: "conflict", map: object } | null>}
 *   null = no such map for this user; conflict carries the server's version.
 *   Team maps are saved by any active member, so two members can conflict too.
 */
export async function updateMapService(db, id, userId, { title, graph, revision }) {
  const maps = db.collection(COLLECTION);
  const current = await findAccessible(db, id, userId);
  if (!current) return null;

  const updated = await maps.findOneAndUpdate(
    { _id: current._id, revision },
    { $set: { graph, ...(title ? { title } : {}), updatedAt: new Date() }, $inc: { revision: 1 } },
    { returnDocument: "after" },
  );
  if (updated) return { map: toClient(updated) };

  // The client's revision is old, or someone saved between our read and the update.
  const latest = await maps.findOne({ _id: current._id });
  return latest ? { error: "conflict", map: toClient(latest) } : null;
}

/** A team map can only be deleted by the member who created it: the others rely on it. */
export async function deleteMapService(db, id, userId) {
  const doc = await findAccessible(db, id, userId);
  if (!doc || !doc.userId.equals(userId)) return false;
  const { deletedCount } = await db.collection(COLLECTION).deleteOne({ _id: doc._id });
  if (deletedCount === 1) await deleteMapComments(db, doc._id);
  return deletedCount === 1;
}

/**
 * Turns the public link on (with a fresh publicId) or off. Not a graph edit,
 * so revision and updatedAt stay as they are.
 * Only the creator can share, and never a team map: team maps go public through
 * team evidence, which an admin issues as the members' consent.
 * @returns {Promise<{ map: object } | { error: "team" } | null>} null when it isn't this user's
 */
export async function setSharingService(db, id, userId, shared) {
  const doc = await findAccessible(db, id, userId);
  if (!doc) return null;
  if (ownerTypeOf(doc) === "team") return { error: "team" };

  const update = shared ? { shared: true, publicId: randomBytes(9).toString("base64url") } : { shared: false, publicId: null };
  const updated = await db
    .collection(COLLECTION)
    .findOneAndUpdate({ _id: doc._id, userId }, { $set: update }, { returnDocument: "after" });
  return updated ? { map: toClient(updated) } : null;
}

// One capstone map per learner and track, one team map per team.
const ownerFilter = (ownerType, ownerId, userId) =>
  ownerType === "team" ? { ownerType, ownerId } : { ownerType, ownerId, userId };

/**
 * The map that belongs to a capstone track or a team, if there is one.
 * Never creates.
 * @returns {Promise<{ map: object | null } | { error: "forbidden" }>}
 */
export async function getOwnerMapService(db, ownerType, ownerId, userId) {
  if (!(await isEligibleForOwner(db, ownerType, ownerId, userId))) return { error: "forbidden" };
  const doc = await db.collection(COLLECTION).findOne(ownerFilter(ownerType, ownerId, userId));
  return { map: doc ? toClient(doc) : null };
}

/** @returns {Promise<{ map: object } | { error: "forbidden" } | { error: "exists", map: object }>} */
export async function createOwnerMapService(db, ownerType, ownerId, userId, { title, graph }) {
  if (!(await isEligibleForOwner(db, ownerType, ownerId, userId))) return { error: "forbidden" };

  const maps = db.collection(COLLECTION);
  const filter = ownerFilter(ownerType, ownerId, userId);
  const existing = await maps.findOne(filter);
  if (existing) return { error: "exists", map: toClient(existing) };

  const now = new Date();
  const doc = { userId, ownerType, ownerId, title, graph, revision: 1, createdAt: now, updatedAt: now };
  try {
    const { insertedId } = await maps.insertOne(doc);
    return { map: toClient({ ...doc, _id: insertedId }) };
  } catch (err) {
    // Two requests created at once: the unique index let one win. Hand back the winner.
    if (err.code !== 11000) throw err;
    return { error: "exists", map: toClient(await maps.findOne(filter)) };
  }
}

const displayName = (u) => [u?.firstName, u?.lastName].filter(Boolean).join(" ") || u?.username;

/**
 * A shared map as anyone may see it, or null. Only what the page shows leaves
 * the server: no ids, revision or account details.
 */
export async function getPublicMapService(db, publicId) {
  const doc = await db.collection(COLLECTION).findOne({ publicId, shared: true });
  if (!doc) return null;

  const [user, stats] = await Promise.all([
    db.collection("users").findOne({ _id: doc.userId }, { projection: { firstName: 1, lastName: 1, username: 1 } }),
    db.collection("usersStats").findOne({ userId: doc.userId }, { projection: { profileImage: 1 } }),
  ]);

  return {
    title: doc.title,
    graph: doc.graph,
    updatedAt: doc.updatedAt,
    owner: { username: user?.username ?? null, name: displayName(user) ?? null, avatar: stats?.profileImage ?? null },
  };
}
