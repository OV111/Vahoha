import { createTtlCache, isCachingEnabled } from "../utils/ttlCache.js";

// Cached reads of roadmap_layers and roadmap_tracks, for the places that only
// DISPLAY them (titles, order, track names). They are the same for every user and
// change only when the roadmap seeder runs, which is a separate process: this
// process never writes them, so there is nothing here to invalidate, and 10
// minutes is the longest a re-seeded title can stay old. A layer or track that
// does not exist yet is remembered for only a minute, so a newly seeded one shows
// up quickly.
//
// NOT for access decisions (isPathComplete, assertLayerUnlocked, proposal
// validation): those must read the live data. Cached docs are shared: read only.

const TTL_MS = 10 * 60 * 1000;
const MISSING_TTL_MS = 60 * 1000;

const layerCache = createTtlCache({ name: "roadmap-layers", ttlMs: TTL_MS, maxEntries: 2000 });
const trackCache = createTtlCache({ name: "roadmap-tracks", ttlMs: TTL_MS, maxEntries: 500 });

const LAYER_PROJECTION = { _id: 0, layerId: 1, title: 1, trackId: 1, order: 1 };
const TRACK_PROJECTION = { _id: 0, trackId: 1, title: 1, categoryId: 1 };

/**
 * Looks each id up in the cache and fetches only the ones it lacks, in ONE query.
 * Cached per id (not per call), so callers asking for different sets share entries.
 */
const loadMany = async (cache, ids, fetchMissing, idField) => {
  const unique = [...new Set(ids.filter(Boolean))];
  const found = new Map();
  if (unique.length === 0) return found;

  if (!isCachingEnabled()) {
    for (const doc of await fetchMissing(unique)) found.set(doc[idField], doc);
    return found;
  }

  const missing = [];
  for (const id of unique) {
    const hit = cache.get(id);
    if (hit === undefined) missing.push(id);
    else if (hit !== null) found.set(id, hit); // null = known not to exist
  }
  if (missing.length) {
    const docs = await fetchMissing(missing);
    const byId = new Map(docs.map((d) => [d[idField], d]));
    for (const id of missing) {
      const doc = byId.get(id) ?? null;
      cache.set(id, doc, doc ? TTL_MS : MISSING_TTL_MS);
      if (doc) found.set(id, doc);
    }
  }
  return found;
};

/**
 * @returns {Promise<Map<string, { layerId: string, title: string, trackId: string, order: number }>>}
 *   only the layers that exist
 */
export const getLayers = (db, layerIds) =>
  loadMany(
    layerCache,
    layerIds,
    (ids) => db.collection("roadmap_layers").find({ layerId: { $in: ids } }, { projection: LAYER_PROJECTION }).toArray(),
    "layerId",
  );

/** @returns {Promise<Map<string, { trackId: string, title: string, categoryId?: string }>>} */
export const getTracks = (db, trackIds) =>
  loadMany(
    trackCache,
    trackIds,
    (ids) => db.collection("roadmap_tracks").find({ trackId: { $in: ids } }, { projection: TRACK_PROJECTION }).toArray(),
    "trackId",
  );

/** For tests: forget everything cached. */
export const clearRoadmapCache = () => {
  layerCache.clear();
  trackCache.clear();
};
