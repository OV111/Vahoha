import { ObjectId } from "mongodb";

const CONCEPTS = "libraryConcepts";
const STATES = "libraryConceptStates";
const CHECKS = "libraryConceptChecks";

// Fields the client may see. Internals (sourceId, promptVersion, timestamps) stay on the server.
const toClientConcept = (doc) => ({
  id: doc.key,
  chapter: doc.chapter,
  title: doc.title,
  summary: doc.summary,
  example: doc.example,
  why: doc.why,
  detail: doc.detail,
  roles: doc.roles,
  keep: doc.keep,
  dropReason: doc.dropReason,
  interview: doc.interview,
  beyondBook: doc.beyondBook,
  // The answer and explanation stay on the server until the learner answers.
  check: doc.check && { question: doc.check.question, options: doc.check.options },
  reviewed: doc.reviewed === true,
});

const isAdmin = async (db, userId) => {
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(userId) }, { projection: { role: 1 } });
  return user?.role === "admin";
};

/**
 * The source (library item) whose digest this user may see, or null.
 * A digest is admin-only until its source is marked `digestVisibility: "public"`:
 * a missing field means "admin". Public digests only ever show reviewed concepts.
 */
export const loadVisibleSource = async (db, sourceId, userId) => {
  const source = await db
    .collection("libraryResources")
    .findOne({ _id: new ObjectId(sourceId) }, { projection: { digestVisibility: 1 } });
  if (!source) return null;

  const isPublic = source.digestVisibility === "public";
  const admin = await isAdmin(db, userId);
  if (!isPublic && !admin) return null;
  return { _id: source._id, isPublic, admin };
};

export const getDigestService = async (db, sourceId, userId) => {
  const source = await loadVisibleSource(db, sourceId, userId);
  if (!source) return null;

  const filter = { sourceId: source._id, ...(source.admin ? {} : { reviewed: true }) };
  const concepts = await db.collection(CONCEPTS).find(filter).sort({ order: 1 }).toArray();
  if (concepts.length === 0) return null;

  const learner = { userId: new ObjectId(userId), sourceId: source._id };
  const [known, checked] = await Promise.all([
    db.collection(STATES).find(learner, { projection: { conceptKey: 1 } }).toArray(),
    db.collection(CHECKS).find({ ...learner, everCorrect: true }, { projection: { conceptKey: 1 } }).toArray(),
  ]);

  return {
    visibility: source.isPublic ? "public" : "admin",
    concepts: concepts.map(toClientConcept),
    known: known.map((k) => k.conceptKey),
    checked: checked.map((c) => c.conceptKey),
  };
};

/**
 * Records "I already know this". Self-reported, so it lives apart from mastery
 * and never counts as a pass. Returns null if the user cannot see this digest
 * or the concept does not exist.
 */
export const setConceptKnownService = async (db, sourceId, conceptKey, userId, known) => {
  const source = await loadVisibleSource(db, sourceId, userId);
  if (!source) return null;

  const exists = await db.collection(CONCEPTS).findOne({ sourceId: source._id, key: conceptKey }, { projection: { _id: 1 } });
  if (!exists) return null;

  const key = { userId: new ObjectId(userId), sourceId: source._id, conceptKey };
  if (known) {
    await db.collection(STATES).updateOne(key, { $set: { state: "known", at: new Date() } }, { upsert: true });
  } else {
    await db.collection(STATES).deleteOne(key);
  }
  return { known };
};
