import { randomBytes } from "node:crypto";
import { ObjectId } from "mongodb";
import { canAccessMap, isEligibleForOwner, ownerTypeOf } from "./ownerAccess.js";
import { deleteMapComments } from "./commentService.js";
import { keepVersionBefore } from "./versionService.js";
import { EDITS, MAPS as COLLECTION, VERSIONS } from "./systemMapData.js";
import { EVERYTHING, OpError, applyOps, overlaps, touchedKeys } from "../lib/graphOps.js";
import { upcastGraph } from "../lib/graphVersions.js";
import { graphSchema } from "../schemas/systemMap.schemas.js";
import { fail } from "../../../utils/httpErrors.js";

/** Per-learner cap on personal maps, so a script can't fill the collection. Capstone and team maps don't count. */
export const MAX_MAPS_PER_USER = 10;

// Personal maps (and ones saved before stage 5, which have no ownerType).
const PERSONAL = { $in: [null, "personal"] };

/*
 * system_maps: one document per diagram.
 *   { userId, ownerType, ownerId, title, graph: { v, nodes, edges }, revision, shared, publicId,
 *     drift, createdAt, updatedAt, updatedBy }
 * userId is the creator, updatedBy the last one to save. ownerType is "personal" (ownerId null), "capstone"
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
  graph: upcastGraph(doc.graph),
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

const NOT_FOUND = "Map not found";

/** One map. 404 when it doesn't exist or this learner may not open it. */
export async function getMapService(db, id, userId) {
  const doc = await findAccessible(db, id, userId);
  return doc ? toClient(doc) : fail(404, NOT_FOUND);
}

/** 409 { code: "limit" } past MAX_MAPS_PER_USER personal maps. */
export async function createMapService(db, userId, { title, graph }) {
  const maps = db.collection(COLLECTION);
  if ((await maps.countDocuments({ userId, ownerType: PERSONAL })) >= MAX_MAPS_PER_USER) {
    fail(409, `You can keep up to ${MAX_MAPS_PER_USER} maps. Delete one first.`, { code: "limit" });
  }

  const now = new Date();
  const doc = { userId, ownerType: "personal", ownerId: null, title, graph, revision: 1, createdAt: now, updatedAt: now };
  const { insertedId } = await maps.insertOne(doc);
  return toClient({ ...doc, _id: insertedId });
}

const conflict = (doc) => fail(409, "This map was changed somewhere else.", { code: "conflict", data: toClient(doc) });

/**
 * Writes `graph` over `current` if nobody saved in between (null if someone
 * did). Keeps the old state as a version when this save starts a session or is
 * a big jump, and logs what the save touched for later merges.
 */
async function commitGraph(db, current, graph, { userId, keys, reason, title }) {
  await keepVersionBefore(db, current, reason);
  const updated = await db.collection(COLLECTION).findOneAndUpdate(
    { _id: current._id, revision: current.revision },
    { $set: { graph, ...(title ? { title } : {}), updatedAt: new Date(), updatedBy: userId }, $inc: { revision: 1 } },
    { returnDocument: "after" },
  );
  if (updated) {
    await db.collection(EDITS).insertOne({ mapId: updated._id, revision: updated.revision, userId, keys, createdAt: new Date() });
  }
  return updated;
}

/**
 * Saves a whole map if the client's `revision` is still current. 404 when it isn't
 * this user's; 409 { code: "conflict", data } with the server's version when
 * the revision is old. Team maps are saved by any active member, so two
 * members can conflict too. The editor saves with applyOpsService instead.
 */
export async function updateMapService(db, id, userId, { title, graph, revision }) {
  const current = await findAccessible(db, id, userId);
  if (!current) fail(404, NOT_FOUND);

  if (current.revision === revision) {
    const updated = await commitGraph(db, current, graph, { userId, keys: [EVERYTHING], title });
    if (updated) return toClient(updated);
  }

  // The client's revision is old, or someone saved between our read and the update.
  const latest = await db.collection(COLLECTION).findOne({ _id: current._id });
  if (!latest) fail(404, NOT_FOUND);
  conflict(latest);
}

/**
 * Whether ops diffed against `base` can go on top of `current` (a later
 * revision): every save in between is logged, and none touched what these ops touch.
 */
async function canMerge(db, current, base, mine) {
  if (base > current.revision) return false;
  const between = await db
    .collection(EDITS)
    .find({ mapId: current._id, revision: { $gt: base, $lte: current.revision } }, { projection: { keys: 1 } })
    .toArray();
  // A missing entry (older than the log keeps, or saved before it existed) means we can't tell.
  if (between.length !== current.revision - base) return false;
  return !overlaps(mine, between.flatMap((e) => e.keys));
}

// Retries when another save lands between our read and our write.
const MAX_ATTEMPTS = 3;

/**
 * Saves a map as edits (lib/graphOps.js) made against `revision`. When that
 * revision is old, the edits are merged onto the latest map if nobody touched
 * the same parts, wires or fields since; otherwise 409 { code: "conflict", data }.
 * The reply is the whole merged map, so the editor can pick up teammates' edits.
 */
export async function applyOpsService(db, id, userId, { revision, ops, reason }) {
  const mine = touchedKeys(ops);
  let current;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    current = await findAccessible(db, id, userId);
    if (!current) fail(404, NOT_FOUND);
    const stale = current.revision !== revision;
    if (stale && !(await canMerge(db, current, revision, mine))) conflict(current);

    let parsed = null;
    try {
      parsed = graphSchema.safeParse(applyOps(upcastGraph(current.graph), ops));
    } catch (err) {
      if (!(err instanceof OpError)) throw err;
    }
    // On a stale base this is a real clash (a wire to a part someone removed); on a current one, a bad request.
    if (!parsed?.success) {
      if (stale) conflict(current);
      fail(400, "These changes don't fit the map.");
    }

    const updated = await commitGraph(db, current, parsed.data, { userId, keys: mine, reason });
    if (updated) return toClient(updated);
  }
  const latest = await db.collection(COLLECTION).findOne({ _id: current._id });
  if (!latest) fail(404, NOT_FOUND);
  conflict(latest);
}

/** A team map can only be deleted by the member who created it: the others rely on it. 404 otherwise. */
export async function deleteMapService(db, id, userId) {
  const doc = await findAccessible(db, id, userId);
  if (!doc || !doc.userId.equals(userId)) fail(404, NOT_FOUND);
  const { deletedCount } = await db.collection(COLLECTION).deleteOne({ _id: doc._id });
  if (deletedCount !== 1) fail(404, NOT_FOUND);
  await Promise.all([
    deleteMapComments(db, doc._id),
    db.collection(VERSIONS).deleteMany({ mapId: doc._id }),
    db.collection(EDITS).deleteMany({ mapId: doc._id }),
  ]);
  return true;
}

/**
 * Turns the public link on (with a fresh publicId) or off. Not a graph edit,
 * so revision and updatedAt stay as they are.
 * Only the creator can share, and never a team map: team maps go public through
 * team evidence, which an admin issues as the members' consent.
 */
export async function setSharingService(db, id, userId, shared) {
  const doc = await findAccessible(db, id, userId);
  if (!doc) fail(404, NOT_FOUND);
  if (ownerTypeOf(doc) === "team") fail(403, "Team maps go public through team evidence.");

  const update = shared ? { shared: true, publicId: randomBytes(9).toString("base64url") } : { shared: false, publicId: null };
  const updated = await db
    .collection(COLLECTION)
    .findOneAndUpdate({ _id: doc._id, userId }, { $set: update }, { returnDocument: "after" });
  return updated ? toClient(updated) : fail(404, NOT_FOUND);
}

// One capstone map per learner and track, one team map per team.
const ownerFilter = (ownerType, ownerId, userId) =>
  ownerType === "team" ? { ownerType, ownerId } : { ownerType, ownerId, userId };

const FORBIDDEN = {
  capstone: "Start this capstone first.",
  team: "Only active team members can open the team map.",
};

const assertEligible = async (db, ownerType, ownerId, userId) => {
  if (!(await isEligibleForOwner(db, ownerType, ownerId, userId))) fail(403, FORBIDDEN[ownerType]);
};

const alreadyExists = (map) => fail(409, "This project already has a map.", { code: "exists", data: map });

/** The map that belongs to a capstone track or a team, or null when none exists yet. Never creates. */
export async function getOwnerMapService(db, ownerType, ownerId, userId) {
  await assertEligible(db, ownerType, ownerId, userId);
  const doc = await db.collection(COLLECTION).findOne(ownerFilter(ownerType, ownerId, userId));
  return doc ? toClient(doc) : null;
}

/** Makes the capstone's or team's map; 409 { code: "exists", data } when it already exists. */
export async function createOwnerMapService(db, ownerType, ownerId, userId, { title, graph }) {
  await assertEligible(db, ownerType, ownerId, userId);

  const maps = db.collection(COLLECTION);
  const filter = ownerFilter(ownerType, ownerId, userId);
  const existing = await maps.findOne(filter);
  if (existing) alreadyExists(toClient(existing));

  const now = new Date();
  const doc = { userId, ownerType, ownerId, title, graph, revision: 1, createdAt: now, updatedAt: now };
  try {
    const { insertedId } = await maps.insertOne(doc);
    return toClient({ ...doc, _id: insertedId });
  } catch (err) {
    // Two requests created at once: the unique index let one win. Hand back the winner.
    if (err.code !== 11000) throw err;
    alreadyExists(toClient(await maps.findOne(filter)));
  }
}

const displayName = (u) => [u?.firstName, u?.lastName].filter(Boolean).join(" ") || u?.username;

/**
 * A shared map as anyone may see it. Only what the page shows leaves the
 * server: no ids, revision or account details.
 */
export async function getPublicMapService(db, publicId) {
  const doc = await db.collection(COLLECTION).findOne({ publicId, shared: true });
  if (!doc) fail(404, NOT_FOUND);

  const [user, stats] = await Promise.all([
    db.collection("users").findOne({ _id: doc.userId }, { projection: { firstName: 1, lastName: 1, username: 1 } }),
    db.collection("usersStats").findOne({ userId: doc.userId }, { projection: { profileImage: 1 } }),
  ]);

  return {
    title: doc.title,
    graph: upcastGraph(doc.graph),
    updatedAt: doc.updatedAt,
    owner: { username: user?.username ?? null, name: displayName(user) ?? null, avatar: stats?.profileImage ?? null },
  };
}
