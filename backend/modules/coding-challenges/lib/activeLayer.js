import { ObjectId } from "mongodb";
import { createTtlCache } from "../../../utils/ttlCache.js";

// (track, layer number) -> layer. Same for every learner and changed only by the
// roadmap seeder, like roadmapCache. The learner's own position (userProgress) is
// never cached, so moving up a layer shows at once.
const layerByOrder = createTtlCache({ name: "layer-by-order", ttlMs: 10 * 60 * 1000, maxEntries: 500 });

/**
 * Where the user currently is on their roadmap, resolved to the concrete
 * layerId that challenges are actually tagged with.
 *
 * This join is the whole point of the file: `userProgress` stores the position
 * as an ordinal (`currentLayer: 3`), while challenges reference a layerId
 * (`api-dev-3`). The ordinal on its own is ambiguous — layer 3 of which track?
 * — so `roadmap_layers` is what turns (activePath, currentLayer) into one id.
 *
 * Returns null when the user has no active path yet. Callers must treat that
 * as "no answer", never as layer 1 of something.
 */
export const resolveActiveLayer = async (db, userId) => {
  if (!userId) return null;

  const progress = await db
    .collection("userProgress")
    .findOne(
      { userId: new ObjectId(userId) },
      { projection: { activePath: 1, currentLayer: 1 } },
    );

  if (!progress?.activePath) return null;

  const order = progress.currentLayer || 1;
  const key = `${progress.activePath}|${order}`;
  const layer = await layerByOrder.wrap(key, () =>
    db.collection("roadmap_layers").findOne(
      { trackId: progress.activePath, order },
      { projection: { layerId: 1, trackId: 1, categoryId: 1, order: 1, title: 1 } },
    ),
  );
  // A missing layer is not remembered, so a newly seeded one is found at once.
  if (!layer) layerByOrder.delete(key);

  if (!layer) return null;

  return {
    trackId: layer.trackId,
    categoryId: layer.categoryId,
    layerId: layer.layerId,
    order: layer.order,
    title: layer.title,
  };
};

/**
 * The topics this user has actually failed on and not yet cleared, lowercased
 * so they can be compared against challenge `tags` directly — weakSpots stores
 * topics uppercased, challenge tags are authored lowercase.
 */
export const getWeakTopics = async (db, userId) => {
  if (!userId) return new Set();

  const rows = await db
    .collection("weakSpots")
    .find(
      { userId: new ObjectId(userId), resolvedAt: null },
      { projection: { topic: 1 } },
    )
    .toArray();

  return new Set(rows.map((r) => String(r.topic).toLowerCase()));
};
