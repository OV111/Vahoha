import process from "node:process";
import { HttpError } from "../../../utils/httpErrors.js";
import { sendIntroRequestEmail } from "../../../utils/emailService.js";
import { notify } from "../../../queues/notify.js";
import { INTRO_RULES } from "../../../../constants/hiringRules.js";
import { describeLayers, getJob } from "./jobService.js";
import { optedInIds } from "./savedService.js";
import {
  BLOCKS,
  DAY_MS,
  INTROS,
  LIST_MAX,
  daysAgo,
  expireStale,
  expiresFrom,
  forRecruiter,
  moveIntro,
  openFilter,
  shapeAll,
  shapeOne,
} from "./introData.js";

/**
 * The recruiter side of intro requests. Every query is scoped by the company
 * from requireRecruiter, never by anything in the request. The checks behind
 * GET /check run again on send: the button the client shows proves nothing.
 */

const frontendUrl = () => (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "");

const dailyLimitOf = (company) => (company.type === "agency" ? INTRO_RULES.perAgencyDaily : INTRO_RULES.perCompanyDaily);

const loadCompany = async (db, companyId) => {
  const company = await db
    .collection("companies")
    .findOne({ _id: companyId }, { projection: { name: 1, type: 1, "trust.level": 1 } });
  if (!company) throw new HttpError(404, "Company not found");
  return company;
};

/** An opted-in developer (not a recruiter) behind a username, or a 404 that says nothing more. */
const findCandidate = async (db, username) => {
  const user = await db
    .collection("users")
    .findOne({ username }, { projection: { username: 1, role: 1, firstName: 1, lastName: 1, email: 1 } });
  if (!user || user.role === "recruiter") throw new HttpError(404, "Candidate not found");
  const live = await optedInIds(db, [user._id]);
  if (!live.has(String(user._id))) throw new HttpError(404, "Candidate not found");
  return user;
};

const formatDate = (date) => date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

/**
 * Whether this company may ask this developer now. The first rule that fails
 * is the reason. `existing` is the open request when there is one.
 */
const evaluate = async (db, company, candidate) => {
  const pair = { companyId: company._id, candidateId: candidate._id };
  await expireStale(db, { candidateId: candidate._id });
  const now = new Date();
  const [blocked, existing, lastDecline, sentToday, developerPending] = await Promise.all([
    db.collection(BLOCKS).findOne(pair, { projection: { _id: 1 } }),
    db.collection(INTROS).findOne({ ...pair, ...openFilter() }),
    db
      .collection(INTROS)
      .findOne(
        { ...pair, status: "declined", respondedAt: { $gt: daysAgo(INTRO_RULES.declineCooldownDays, now) } },
        { sort: { respondedAt: -1 }, projection: { respondedAt: 1 } },
      ),
    db.collection(INTROS).countDocuments({ companyId: company._id, createdAt: { $gt: daysAgo(1, now) } }),
    db.collection(INTROS).countDocuments({ candidateId: candidate._id, ...openFilter() }),
  ]);

  const no = (reason) => ({ canSend: false, reason, existing });
  if (company.trust?.level !== "verified") return no("Your company needs to be verified to contact developers.");
  if (blocked) return no("This developer isn't accepting requests from your company.");
  if (existing) return no("You already have an open request with this developer.");
  if (lastDecline) {
    const again = new Date(lastDecline.respondedAt.getTime() + INTRO_RULES.declineCooldownDays * DAY_MS);
    return no(`They declined your last request. You can ask again after ${formatDate(again)}.`);
  }
  if (sentToday >= dailyLimitOf(company)) {
    return no(`You've sent ${dailyLimitOf(company)} requests in the last 24 hours, your daily limit. Try again tomorrow.`);
  }
  if (developerPending >= INTRO_RULES.maxPendingPerDeveloper) {
    return no("This developer has too many open requests right now. Try again later.");
  }
  return { canSend: true, reason: null, existing: null };
};

/** The company's open jobs, each with how many of its required layers this developer passed. */
const openJobsFor = async (db, companyId, candidateId) => {
  const jobs = await db
    .collection("jobs")
    .find({ companyId, status: "open" })
    .sort({ updatedAt: -1 })
    .limit(LIST_MAX)
    .toArray();
  const wanted = [...new Set(jobs.flatMap((j) => j.requiredLayers ?? []))];
  const [known, passed] = await Promise.all([
    describeLayers(db, wanted).then((layers) => new Set(layers.map((l) => l.layerId))),
    wanted.length
      ? db.collection("examHistory").distinct("layer", { userId: candidateId, passed: true, layer: { $in: wanted } })
      : [],
  ]);
  const met = new Set(passed);
  return jobs.map((job) => {
    const required = (job.requiredLayers ?? []).filter((id) => known.has(id));
    return {
      id: String(job._id),
      title: job.title,
      level: job.level,
      type: job.type,
      workplace: job.workplace,
      match: { met: required.filter((id) => met.has(id)).length, total: required.length },
    };
  });
};

export const checkIntro = async (db, companyId, username) => {
  const [company, candidate] = await Promise.all([loadCompany(db, companyId), findCandidate(db, username)]);
  const verdict = await evaluate(db, company, candidate);
  const [existing, jobs] = await Promise.all([
    verdict.existing ? shapeOne(db, verdict.existing, forRecruiter) : null,
    openJobsFor(db, companyId, candidate._id),
  ]);
  return { canSend: verdict.canSend, reason: verdict.reason, existing, jobs };
};

const announce = (row, { company, job, candidate }) => {
  const link = "/my-profile/intros";
  notify({
    type: "intro_request",
    targetUserId: String(candidate._id),
    ref: { kind: "intro", id: String(row._id) },
    meta: { message: `${company.name} wants to talk about ${job.title}`, link, company: company.name, jobTitle: job.title },
  });
  // Fire and forget: the request is saved, and a mail outage must not undo that.
  Promise.resolve()
    .then(() =>
      sendIntroRequestEmail(candidate.email, {
        firstName: candidate.firstName,
        company: company.name,
        jobTitle: job.title,
        url: `${frontendUrl()}${link}`,
      }),
    )
    .catch((err) => console.error("intro request email failed:", err.message));
};

export const sendIntro = async (db, companyId, recruiterId, { username, jobId, message }) => {
  const [company, candidate, job] = await Promise.all([
    loadCompany(db, companyId),
    findCandidate(db, username),
    getJob(db, companyId, jobId),
  ]);
  if (job.status !== "open") throw new HttpError(400, "This job isn't open. Open it first to send requests for it.");
  const verdict = await evaluate(db, company, candidate);
  if (!verdict.canSend) throw new HttpError(verdict.existing ? 409 : 403, verdict.reason);

  const now = new Date();
  const doc = {
    companyId,
    recruiterId,
    candidateId: candidate._id,
    jobId: job._id,
    message,
    status: "pending",
    createdAt: now,
    updatedAt: now,
    respondedAt: null,
    expiresAt: expiresFrom(now),
    reported: null,
  };
  try {
    const { insertedId } = await db.collection(INTROS).insertOne(doc);
    doc._id = insertedId;
  } catch (err) {
    // Two sends at once: the partial unique index lets only one pending row in.
    if (err?.code === 11000) throw new HttpError(409, "You already have an open request with this developer.");
    throw err;
  }
  announce(doc, { company, job, candidate });
  return shapeOne(db, doc, forRecruiter);
};

export const listCompanyIntros = async (db, companyId, { status } = {}) => {
  await expireStale(db, { companyId });
  const rows = await db
    .collection(INTROS)
    .find({ companyId, ...(status ? { status } : {}) })
    .sort({ createdAt: -1 })
    .limit(LIST_MAX)
    .toArray();
  return shapeAll(db, rows, forRecruiter);
};

export const companyIntroSummary = async (db, companyId) => {
  await expireStale(db, { companyId });
  const [company, counts, sentToday] = await Promise.all([
    loadCompany(db, companyId),
    db
      .collection(INTROS)
      .aggregate([{ $match: { companyId } }, { $group: { _id: "$status", n: { $sum: 1 } } }])
      .toArray(),
    db.collection(INTROS).countDocuments({ companyId, createdAt: { $gt: daysAgo(1) } }),
  ]);
  const count = (status) => counts.find((c) => c._id === status)?.n ?? 0;
  return {
    pending: count("pending"),
    accepted: count("accepted"),
    declined: count("declined"),
    sentToday,
    dailyLimit: dailyLimitOf(company),
  };
};

export const withdrawIntro = async (db, companyId, id) =>
  shapeOne(db, await moveIntro(db, id, { companyId }, { status: "withdrawn" }), forRecruiter);
