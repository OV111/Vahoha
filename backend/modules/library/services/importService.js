/**
 * Digest import, shared by backend/scripts/importConcepts.js and the admin
 * library page. `data` must already be validated with digestImportSchema.
 *
 * The book is matched to a library item by title and created if missing.
 * Re-importing a concept overwrites its content, so unless `reviewed` is true
 * it goes back to reviewed: false. A digest stays admin-only until its library
 * item is set to digestVisibility: "public"; importing never does that.
 */

import { clearLibraryCache } from "./libraryService.js";

const LIBRARY = "libraryResources";
const CONCEPTS = "libraryConcepts";

const findSource = (db, title) => db.collection(LIBRARY).findOne({ title }, { projection: { _id: 1 } });

export const planDigestImport = async (db, data) => {
  const { source, concepts } = data;
  const existingSource = await findSource(db, source.title);
  const existingKeys = existingSource
    ? new Set(
        (await db.collection(CONCEPTS).find({ sourceId: existingSource._id }, { projection: { key: 1 } }).toArray()).map(
          (c) => c.key,
        ),
      )
    : new Set();

  const overwrittenCount = concepts.filter((c) => existingKeys.has(c.key)).length;
  return {
    sourceExists: Boolean(existingSource),
    total: concepts.length,
    kept: concepts.filter((c) => c.keep).length,
    newCount: concepts.length - overwrittenCount,
    overwrittenCount,
  };
};

export const applyDigestImport = async (db, data, { reviewed = false } = {}) => {
  const { source, promptVersion, concepts } = data;
  const now = new Date();
  const existingSource = await findSource(db, source.title);
  const sourceId =
    existingSource?._id ??
    (
      await db.collection(LIBRARY).insertOne({
        type: "book",
        ...source,
        agent_citation_count: 0,
        read_completion_rate: 0,
        exam_correlation: 0,
        createdAt: now,
        updatedAt: now,
      })
    ).insertedId;
  if (!existingSource) clearLibraryCache(); // a new book belongs on the public list now

  const result = await db.collection(CONCEPTS).bulkWrite(
    concepts.map((concept) => ({
      updateOne: {
        filter: { sourceId, key: concept.key },
        update: {
          $set: { ...concept, sourceId, promptVersion, reviewed, updatedAt: now },
          $setOnInsert: { createdAt: now },
        },
        upsert: true,
      },
    })),
  );
  return { sourceId, inserted: result.upsertedCount, changed: result.modifiedCount };
};
