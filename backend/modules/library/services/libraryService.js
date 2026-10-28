import { ObjectId } from "mongodb";
import { isLayerId } from "../../../utils/layerIds.js";
import { createTtlCache } from "../../../utils/ttlCache.js";

const COL = "libraryResources";

// The catalogue is the same for every visitor and only changes when an admin
// imports a book or flips a digest's visibility (both clear it), so five minutes
// of staleness is fine. The mentor's citation counts also nudge the order, which
// the TTL absorbs.
const libraryCache = createTtlCache({ name: "library", ttlMs: 5 * 60_000, maxEntries: 300 });
export const clearLibraryCache = () => libraryCache.clear();

// Keys longer than this are a sign of a crafted query: skip the cache for them.
const MAX_KEY_LENGTH = 300;

// JSON-encoded, so the string "a,b" and the list ["a", "b"] (which query differently) never share a key.
const asList = (v) => JSON.stringify(v ? [].concat(v).map(String).sort() : []);

// Every input that changes the result, normalised the way the query below reads it.
const listKey = ({ type, path, difficulty, topic, is_free, layer, page = 1, limit = 20 }) =>
  [
    "list",
    asList(type),
    asList(path),
    JSON.stringify(difficulty || ""),
    asList(topic),
    is_free === undefined ? "" : String(is_free === "true" || is_free === true),
    isLayerId(layer) ? layer : "",
    Math.max(1, +page),
    Math.min(100, Math.max(1, +limit)),
  ].join("|");

export const getResourcesService = (db, query) => {
  // Free-text search is open-ended (every typed word is a new key) and ranks by
  // relevance: always go to the database for it.
  const key = query.q ? null : listKey(query);
  if (!key || key.length > MAX_KEY_LENGTH) return loadResources(db, query);
  return libraryCache.wrap(key, () => loadResources(db, query));
};

const loadResources = async (db, query) => {
  const {
    type,
    path,
    difficulty,
    topic,
    is_free,
    layer,
    q,
    page = 1,
    limit = 20,
  } = query;

  const pageNum = Math.max(1, +page);
  const limitNum = Math.min(100, Math.max(1, +limit));

  const match = {};

  if (type) match.type = { $in: Array.isArray(type) ? type : [type] };
  if (path) match.paths = { $in: Array.isArray(path) ? path : [path] };
  if (difficulty) match.difficulty = difficulty;
  if (topic) match.topics = { $in: Array.isArray(topic) ? topic : [topic] };
  if (is_free !== undefined) match.is_free = is_free === "true" || is_free === true;
  if (isLayerId(layer)) match.layerIds = layer;
  if (q) {
    match.$text = { $search: q };
  }

  const col = db.collection(COL);
  const total = await col.countDocuments(match);

  const pipeline = [
    { $match: match },
    { $sort: { agent_citation_count: -1, createdAt: -1 } },
    { $skip: (pageNum - 1) * limitNum },
    { $limit: limitNum },
  ];

  if (q) {
    pipeline.unshift({ $match: match });
    pipeline[0] = { $match: match };
    pipeline.splice(1, 0, { $addFields: { score: { $meta: "textScore" } } });
    pipeline[2] = { $sort: { score: { $meta: "textScore" }, createdAt: -1 } };
  }

  const resources = await col.aggregate(pipeline).toArray();

  return {
    data: resources,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      hasNextPage: pageNum * limitNum < total,
      hasPrevPage: pageNum > 1,
    },
  };
};

export const getResourceByIdService = async (db, id) => {
  const col = db.collection(COL);
  const resource = await col.findOne({ _id: new ObjectId(id) });
  if (!resource) throw new Error("Resource not found");
  return resource;
};

export const getResourcesByLayerService = async (db, layerId) => {
  if (!isLayerId(layerId)) throw new Error("Invalid layer id");
  const col = db.collection(COL);
  const resources = await col
    .find({ layerIds: layerId })
    .sort({ agent_citation_count: -1 })
    .toArray();
  return resources;
};

export const toggleSaveResourceService = async (db, resourceId, userId) => {
  const saves = db.collection("savedLibraryResources");
  const rid = new ObjectId(resourceId);
  const uid = new ObjectId(userId);

  const existing = await saves.findOne({ userId: uid, resourceId: rid });
  if (existing) {
    await saves.deleteOne({ _id: existing._id });
    return { saved: false };
  }
  await saves.insertOne({ userId: uid, resourceId: rid, savedAt: new Date() });
  return { saved: true };
};

export const getSavedResourceIdsService = async (db, userId) => {
  const saves = db.collection("savedLibraryResources");
  const docs = await saves
    .find({ userId: new ObjectId(userId) }, { projection: { resourceId: 1 } })
    .toArray();
  return docs.map((d) => d.resourceId.toString());
};

export const getResourceCountsByTypeService = (db) => libraryCache.wrap("counts", () => loadCountsByType(db));

const loadCountsByType = async (db) => {
  const col = db.collection(COL);
  const counts = await col
    .aggregate([
      { $group: { _id: "$type", count: { $sum: 1 } } },
    ])
    .toArray();

  const result = { total: 0, book: 0, documentation: 0, guide: 0, cheatsheet: 0 };
  for (const c of counts) {
    result[c._id] = c.count;
    result.total += c.count;
  }
  return result;
};
