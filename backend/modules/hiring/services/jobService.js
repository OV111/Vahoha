import { ObjectId } from "mongodb";
import { HttpError } from "../../../utils/httpErrors.js";
import { getLayers, getTracks } from "../../../services/roadmapCache.js";
import { JOB_LIMITS } from "../../../../constants/hiringRules.js";

/**
 * A company's jobs. Private to the company for now: they give an intro request
 * its context (what the job is, what it pays, which Vahoha layers it expects).
 * Every query is scoped by companyId.
 *
 * jobs: { companyId, createdBy, title, level, type, workplace, location,
 *         salary: { min, max, currency, period } | null, stack: [string],
 *         requiredLayers: [layerId], description, status, createdAt, updatedAt }
 *
 * requiredLayers is what no other job site has: the job asks for skills a
 * developer has PROVEN here (a passed layer test), so a candidate can be shown
 * as "matches 4 of 5".
 */

const JOBS = "jobs";

const toId = (id) => {
  if (!ObjectId.isValid(id)) throw new HttpError(404, "Job not found");
  return new ObjectId(id);
};

/** Layer ids that really exist, with their titles and track names, in the order given. */
export const describeLayers = async (db, layerIds) => {
  const layers = await getLayers(db, layerIds);
  const tracks = await getTracks(db, [...layers.values()].map((l) => l.trackId));
  return layerIds
    .filter((id) => layers.has(id))
    .map((id) => {
      const l = layers.get(id);
      return { layerId: id, title: l.title, track: tracks.get(l.trackId)?.title ?? l.trackId };
    });
};

const toPublic = async (db, job) => ({
  id: String(job._id),
  title: job.title,
  level: job.level,
  type: job.type,
  workplace: job.workplace,
  location: job.location,
  salary: job.salary,
  stack: job.stack,
  requiredLayers: await describeLayers(db, job.requiredLayers ?? []),
  description: job.description,
  status: job.status,
  createdAt: job.createdAt,
  updatedAt: job.updatedAt,
});

const cleanFields = async (db, body) => {
  const known = await getLayers(db, body.requiredLayers);
  const unknown = body.requiredLayers.filter((id) => !known.has(id));
  if (unknown.length) throw new HttpError(400, "Some required layers don't exist. Pick them from the list.");
  if (body.salary && body.salary.min > body.salary.max) throw new HttpError(400, "Salary minimum is above the maximum.");
  return { ...body, stack: [...new Set(body.stack)] };
};

export const listJobs = async (db, companyId, { status } = {}) => {
  const jobs = await db
    .collection(JOBS)
    .find({ companyId, ...(status ? { status } : {}) })
    .sort({ status: 1, updatedAt: -1 })
    .limit(200)
    .toArray();
  return Promise.all(jobs.map((j) => toPublic(db, j)));
};

/** One job, only if it belongs to this company (another company's id answers 404). */
export const getJob = async (db, companyId, jobId) => {
  const job = await db.collection(JOBS).findOne({ _id: toId(jobId), companyId });
  if (!job) throw new HttpError(404, "Job not found");
  return job;
};

export const getJobPublic = async (db, companyId, jobId) => toPublic(db, await getJob(db, companyId, jobId));

const assertOpenSlot = async (db, companyId, exceptId = null) => {
  const open = await db
    .collection(JOBS)
    .countDocuments({ companyId, status: "open", ...(exceptId ? { _id: { $ne: exceptId } } : {}) });
  if (open >= JOB_LIMITS.openJobsPerCompany) {
    throw new HttpError(400, `You can have ${JOB_LIMITS.openJobsPerCompany} open jobs at once. Close one first.`);
  }
};

export const createJob = async (db, companyId, userId, body) => {
  const fields = await cleanFields(db, body);
  if (fields.status === "open") await assertOpenSlot(db, companyId);
  const now = new Date();
  const doc = { ...fields, companyId, createdBy: userId, createdAt: now, updatedAt: now };
  const { insertedId } = await db.collection(JOBS).insertOne(doc);
  return toPublic(db, { ...doc, _id: insertedId });
};

export const updateJob = async (db, companyId, jobId, body) => {
  const job = await getJob(db, companyId, jobId);
  const fields = await cleanFields(db, body);
  if (fields.status === "open" && job.status !== "open") await assertOpenSlot(db, companyId, job._id);
  const update = { ...fields, updatedAt: new Date() };
  await db.collection(JOBS).updateOne({ _id: job._id, companyId }, { $set: update });
  return toPublic(db, { ...job, ...update });
};

export const setJobStatus = async (db, companyId, jobId, status) => {
  const job = await getJob(db, companyId, jobId);
  if (status === "open" && job.status !== "open") await assertOpenSlot(db, companyId, job._id);
  await db.collection(JOBS).updateOne({ _id: job._id, companyId }, { $set: { status, updatedAt: new Date() } });
  return toPublic(db, { ...job, status });
};

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** For the "required layers" picker: layers whose title matches, with their track. */
export const searchLayers = async (db, q) => {
  const rows = await db
    .collection("roadmap_layers")
    .find({ title: { $regex: escapeRegex(q), $options: "i" } }, { projection: { _id: 0, layerId: 1, title: 1, trackId: 1 } })
    .limit(20)
    .toArray();
  const tracks = await getTracks(db, rows.map((r) => r.trackId));
  return rows.map((r) => ({ layerId: r.layerId, title: r.title, track: tracks.get(r.trackId)?.title ?? r.trackId }));
};

/**
 * How a developer measures up to a job: which required layers they've passed.
 * Used on the candidate page and in intro requests.
 */
export const matchJob = async (db, job, candidateId) => {
  const required = job.requiredLayers ?? [];
  if (!required.length) return { met: [], missing: [], total: 0 };
  const passed = await db
    .collection("examHistory")
    .distinct("layer", { userId: candidateId, passed: true, layer: { $in: required } });
  const met = new Set(passed);
  return { met: required.filter((l) => met.has(l)), missing: required.filter((l) => !met.has(l)), total: required.length };
};
