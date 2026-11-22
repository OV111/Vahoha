import { ObjectId } from "mongodb";
import { canAccessMap, ownerTypeOf } from "./ownerAccess.js";
import { authorName } from "./commentService.js";
import { MAPS, VERSIONS } from "./systemMapData.js";
import { upcastGraph } from "../lib/graphVersions.js";
import { fail } from "../../../utils/httpErrors.js";

/** Oldest versions go past this, so one busy map can't grow without end. */
export const MAX_VERSIONS = 30;

/** A save after this long a pause starts a new editing session: the map as it was is kept. */
export const SESSION_GAP_MS = 10 * 60 * 1000;

/*
 * system_map_versions: earlier states of a map, as checkpoints to look back at or restore.
 *   { mapId, revision, title, graph, reason, userId, savedAt, createdAt }
 * A version is the map as it was just BEFORE a save, kept when that save
 * starts a new session ("session") or jumps a long way (scan, import, reset,
 * restore). The current state is the map itself, so it is never duplicated here.
 * userId is who saved that state; savedAt is when.
 */

/**
 * Keeps `map` (the stored document, before it is overwritten) as a version
 * when this save is a big jump or starts a new session. Safe to call twice for
 * the same revision: the unique index keeps one.
 */
export async function keepVersionBefore(db, map, reason) {
  const why = reason ?? (Date.now() - map.updatedAt.getTime() >= SESSION_GAP_MS ? "session" : null);
  if (!why) return;

  const versions = db.collection(VERSIONS);
  try {
    await versions.insertOne({
      mapId: map._id,
      revision: map.revision,
      title: map.title,
      graph: map.graph,
      reason: why,
      userId: map.updatedBy ?? map.userId,
      savedAt: map.updatedAt,
      createdAt: new Date(),
    });
  } catch (err) {
    if (err.code === 11000) return;
    throw err;
  }

  const old = await versions.find({ mapId: map._id }, { projection: { _id: 1 } }).sort({ revision: -1 }).skip(MAX_VERSIONS).toArray();
  if (old.length) await versions.deleteMany({ _id: { $in: old.map((v) => v._id) } });
}

async function accessibleMap(db, mapId, userId) {
  const map = await db.collection(MAPS).findOne({ _id: new ObjectId(mapId) }, { projection: { userId: 1, ownerType: 1, ownerId: 1 } });
  if (!map || !(await canAccessMap(db, map, userId))) fail(404, "Map not found");
  return map;
}

/** The map's versions, newest first, without their graphs. `by` is set on team maps only. */
export async function listVersionsService(db, mapId, userId) {
  const map = await accessibleMap(db, mapId, userId);
  const docs = await db
    .collection(VERSIONS)
    .find({ mapId: map._id }, { projection: { revision: 1, reason: 1, savedAt: 1, userId: 1, "graph.nodes.id": 1 } })
    .sort({ revision: -1 })
    .toArray();

  let names = null;
  if (ownerTypeOf(map) === "team") {
    const ids = [...new Set(docs.map((d) => d.userId.toString()))].map((id) => new ObjectId(id));
    const users = await db.collection("users").find({ _id: { $in: ids } }, { projection: { firstName: 1, lastName: 1, username: 1 } }).toArray();
    names = new Map(users.map((u) => [u._id.toString(), authorName(u)]));
  }

  return docs.map((d) => ({
    id: d._id.toString(),
    revision: d.revision,
    reason: d.reason,
    savedAt: d.savedAt,
    parts: d.graph.nodes.length,
    ...(names ? { by: names.get(d.userId.toString()) ?? authorName(null) } : {}),
  }));
}

/** One version with its graph, to preview or restore. */
export async function getVersionService(db, mapId, versionId, userId) {
  const map = await accessibleMap(db, mapId, userId);
  const doc = await db.collection(VERSIONS).findOne({ _id: new ObjectId(versionId), mapId: map._id });
  if (!doc) fail(404, "Version not found");
  return { id: doc._id.toString(), revision: doc.revision, reason: doc.reason, savedAt: doc.savedAt, title: doc.title, graph: upcastGraph(doc.graph) };
}
