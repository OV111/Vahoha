import { ObjectId } from "mongodb";
import { HttpError } from "../../../utils/httpErrors.js";
import { INTRO_RULES } from "../../../../constants/hiringRules.js";
import { describeLayers } from "./jobService.js";

/**
 * Intro requests: a verified company asks an opted-in developer to talk about
 * one of its open jobs. The developer accepts (both sides then see each
 * other's email), declines, blocks the company or reports the message.
 *
 * intro_requests: { companyId, recruiterId, candidateId, jobId, message, status,
 *                   createdAt, updatedAt, respondedAt | null, expiresAt,
 *                   reported: { reason, details, at } | null }
 *   at most one "pending" per { companyId, candidateId } (partial unique index)
 * intro_blocks:   { candidateId, companyId, createdAt }   a developer blocked a company
 *
 * Only "pending" ever moves (to accepted / declined / withdrawn / expired), and
 * every move filters on status "pending", so two clicks can't both win.
 * Expiry has no cron: a pending row past expiresAt is closed on the next read.
 *
 * This file holds what both sides share: loading, expiry and the two response
 * shapes. introService.js is the recruiter side, introReplyService.js the developer's.
 */

export const INTROS = "intro_requests";
export const BLOCKS = "intro_blocks";
export const DAY_MS = 86_400_000;
export const LIST_MAX = 200;

export const daysAgo = (days, now = new Date()) => new Date(now.getTime() - days * DAY_MS);
export const fullName = (u) =>
  [u?.firstName, u?.lastName].filter(Boolean).join(" ").replace(/\s+/g, " ").trim() || u?.username || "";

export const toIntroId = (id) => {
  if (!ObjectId.isValid(id)) throw new HttpError(404, "Request not found");
  return new ObjectId(id);
};

/** Closes this scope's pending rows whose time ran out. */
export const expireStale = (db, scope) =>
  db
    .collection(INTROS)
    .updateMany(
      { ...scope, status: "pending", expiresAt: { $lte: new Date() } },
      { $set: { status: "expired", updatedAt: new Date() } },
    );

export const openFilter = () => ({ status: "pending", expiresAt: { $gt: new Date() } });

/**
 * Moves one pending row. `scope` pins the owner (companyId or candidateId), so
 * an id from someone else's request answers 404, never "not yours".
 */
export const moveIntro = async (db, id, scope, set) => {
  const _id = toIntroId(id);
  const now = new Date();
  const row = await db
    .collection(INTROS)
    .findOneAndUpdate({ _id, ...scope, ...openFilter() }, { $set: { ...set, updatedAt: now } }, { returnDocument: "after" });
  if (row) return row;
  const existing = await db.collection(INTROS).findOne({ _id, ...scope });
  if (!existing) throw new HttpError(404, "Request not found");
  await expireStale(db, { _id });
  throw new HttpError(409, "This request is no longer open.");
};

const byId = (rows) => new Map(rows.map((r) => [String(r._id), r]));

/** Which of the required layers each candidate has passed, for many rows in one query. */
const passedLayers = async (db, rows, jobs) => {
  const layers = [...new Set([...jobs.values()].flatMap((j) => j.requiredLayers ?? []))];
  const candidates = [...new Set(rows.map((r) => String(r.candidateId)))].map((id) => new ObjectId(id));
  if (!layers.length || !candidates.length) return new Set();
  const passes = await db
    .collection("examHistory")
    .aggregate([
      { $match: { userId: { $in: candidates }, passed: true, layer: { $in: layers } } },
      { $group: { _id: { u: "$userId", l: "$layer" } } },
    ])
    .toArray();
  return new Set(passes.map((p) => `${p._id.u}|${p._id.l}`));
};

/** Everything the two shapes need, loaded once per list instead of once per row. */
export const hydrate = async (db, rows) => {
  const ids = (key) => [...new Set(rows.map((r) => String(r[key])))].map((id) => new ObjectId(id));
  const userIds = [...ids("candidateId"), ...ids("recruiterId")];
  const [jobs, companies, users] = await Promise.all([
    db.collection("jobs").find({ _id: { $in: ids("jobId") } }).toArray().then(byId),
    db
      .collection("companies")
      .find({ _id: { $in: ids("companyId") } }, { projection: { name: 1, website: 1, type: 1, "trust.level": 1 } })
      .toArray()
      .then(byId),
    db
      .collection("users")
      .find(
        { _id: { $in: userIds } },
        { projection: { username: 1, firstName: 1, lastName: 1, email: 1, companyRole: 1 } },
      )
      .toArray()
      .then(byId),
  ]);
  const passed = await passedLayers(db, rows, jobs);
  const allLayers = [...new Set([...jobs.values()].flatMap((j) => j.requiredLayers ?? []))];
  const layers = new Map((await describeLayers(db, allLayers)).map((l) => [l.layerId, l]));
  return { jobs, companies, users, passed, layers };
};

const matchOf = (ctx, row, job) => {
  const required = (job?.requiredLayers ?? []).filter((id) => ctx.layers.has(id));
  const short = (id) => ({ layerId: id, title: ctx.layers.get(id).title });
  const has = (id) => ctx.passed.has(`${row.candidateId}|${id}`);
  return { met: required.filter(has).map(short), missing: required.filter((id) => !has(id)).map(short), total: required.length };
};

// A pending row read in the instant between its expiry and the sweep still says "expired".
const statusOf = (row) => (row.status === "pending" && row.expiresAt <= new Date() ? "expired" : row.status);

/** What the company sees. The developer's email only after they accepted. */
export const forRecruiter = (ctx, row) => {
  const job = ctx.jobs.get(String(row.jobId));
  const candidate = ctx.users.get(String(row.candidateId));
  const status = statusOf(row);
  return {
    id: String(row._id),
    status,
    candidate: { username: candidate?.username ?? null, name: fullName(candidate) },
    job: job
      ? { id: String(job._id), title: job.title, level: job.level, type: job.type, workplace: job.workplace }
      : null,
    message: row.message,
    match: matchOf(ctx, row, job),
    sentBy: { name: fullName(ctx.users.get(String(row.recruiterId))) },
    createdAt: row.createdAt,
    respondedAt: row.respondedAt ?? null,
    expiresAt: row.expiresAt,
    contactEmail: status === "accepted" ? (candidate?.email ?? null) : null,
  };
};

/** What the developer sees. The recruiter's email only after they accepted. */
export const forDeveloper = (ctx, row) => {
  const job = ctx.jobs.get(String(row.jobId));
  const company = ctx.companies.get(String(row.companyId));
  const recruiter = ctx.users.get(String(row.recruiterId));
  const status = statusOf(row);
  return {
    id: String(row._id),
    status,
    company: {
      name: company?.name ?? "",
      website: company?.website ?? "",
      type: company?.type ?? "company",
      trustLevel: company?.trust?.level ?? "unverified",
    },
    recruiter: { name: fullName(recruiter), role: recruiter?.companyRole ?? null },
    job: job
      ? {
          title: job.title,
          level: job.level,
          type: job.type,
          workplace: job.workplace,
          location: job.location ?? "",
          salary: job.salary ?? null,
          stack: job.stack ?? [],
          description: job.description ?? "",
          requiredLayers: (job.requiredLayers ?? []).filter((id) => ctx.layers.has(id)).map((id) => ctx.layers.get(id)),
        }
      : null,
    match: matchOf(ctx, row, job),
    message: row.message,
    createdAt: row.createdAt,
    respondedAt: row.respondedAt ?? null,
    expiresAt: row.expiresAt,
    recruiterEmail: status === "accepted" ? (recruiter?.email ?? null) : null,
    reported: row.reported ? { reason: row.reported.reason, details: row.reported.details ?? "", at: row.reported.at } : null,
  };
};

export const shapeAll = async (db, rows, shape) => {
  const ctx = await hydrate(db, rows);
  return rows.map((r) => shape(ctx, r));
};

export const shapeOne = async (db, row, shape) => (await shapeAll(db, [row], shape))[0];

export const expiresFrom = (now) => new Date(now.getTime() + INTRO_RULES.expiryDays * DAY_MS);
