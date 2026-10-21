import { ObjectId } from "mongodb";

const LIBRARY = "libraryResources";
const CONCEPTS = "libraryConcepts";

// A missing field means admin-only: a digest is never public by accident.
const visibilityOf = (source) => (source.digestVisibility === "public" ? "public" : "admin");

/** Every library item that has digest concepts, with review progress. */
export const listDigests = async (db) => {
  const counts = await db
    .collection(CONCEPTS)
    .aggregate([
      {
        $group: {
          _id: "$sourceId",
          total: { $sum: 1 },
          reviewed: { $sum: { $cond: ["$reviewed", 1, 0] } },
          kept: { $sum: { $cond: ["$keep", 1, 0] } },
        },
      },
    ])
    .toArray();
  if (counts.length === 0) return [];

  const sources = await db
    .collection(LIBRARY)
    .find({ _id: { $in: counts.map((c) => c._id) } }, { projection: { title: 1, digestVisibility: 1 } })
    .toArray();
  const byId = new Map(sources.map((s) => [String(s._id), s]));

  return counts
    .filter((c) => byId.has(String(c._id)))
    .map((c) => {
      const source = byId.get(String(c._id));
      return {
        _id: source._id,
        title: source.title,
        digestVisibility: visibilityOf(source),
        total: c.total,
        reviewed: c.reviewed,
        kept: c.kept,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
};

/** All concepts of one book, reviewed or not, for the review screen. */
export const listConceptsForAdmin = async (db, sourceId) => {
  const source = await db
    .collection(LIBRARY)
    .findOne({ _id: new ObjectId(sourceId) }, { projection: { title: 1, digestVisibility: 1 } });
  if (!source) return null;

  const concepts = await db
    .collection(CONCEPTS)
    .find({ sourceId: source._id }, { projection: { sourceId: 0 } })
    .sort({ order: 1 })
    .toArray();
  return { _id: source._id, title: source.title, digestVisibility: visibilityOf(source), concepts };
};

/** Returns false when the concept does not exist. */
export const setConceptReviewed = async (db, sourceId, key, reviewed) => {
  const result = await db
    .collection(CONCEPTS)
    .updateOne({ sourceId: new ObjectId(sourceId), key }, { $set: { reviewed, updatedAt: new Date() } });
  return result.matchedCount > 0;
};

export class PublishRefusedError extends Error {}

/**
 * Publishing shows the digest's reviewed concepts to every learner, so it is
 * refused while no kept concept has been reviewed. Returns false when the
 * library item does not exist.
 */
export const setDigestVisibility = async (db, sourceId, visibility) => {
  const _id = new ObjectId(sourceId);
  const source = await db.collection(LIBRARY).findOne({ _id }, { projection: { _id: 1 } });
  if (!source) return false;

  if (visibility === "public") {
    const reviewedKept = await db.collection(CONCEPTS).countDocuments({ sourceId: _id, keep: true, reviewed: true });
    if (reviewedKept === 0) {
      throw new PublishRefusedError("Review at least one kept concept before publishing.");
    }
  }

  await db.collection(LIBRARY).updateOne({ _id }, { $set: { digestVisibility: visibility, updatedAt: new Date() } });
  return true;
};
