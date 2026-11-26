import process from "node:process";
import { HttpError } from "../../../utils/httpErrors.js";
import { sendIntroAcceptedEmail } from "../../../utils/emailService.js";
import { notify } from "../../../queues/notify.js";
import { INTRO_RULES } from "#shared/hiringRules.js";
import {
  BLOCKS,
  INTROS,
  LIST_MAX,
  daysAgo,
  expireStale,
  forDeveloper,
  fullName,
  moveIntro,
  openFilter,
  shapeAll,
  shapeOne,
  toIntroId,
} from "./introData.js";

/**
 * The developer side of intro requests. Every query is scoped by the signed-in
 * developer's id, so an id from someone else's request answers 404.
 */

export const REPORT_LIMIT_REASON = "Several developers reported messages from this company.";

const frontendUrl = () => (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "");
const RECRUITER_LINK = "/hiring/intros";

export const listMyIntros = async (db, candidateId, { status } = {}) => {
  await expireStale(db, { candidateId });
  const rows = await db
    .collection(INTROS)
    .find({ candidateId, ...(status ? { status } : {}) })
    .sort({ createdAt: -1 })
    .limit(LIST_MAX)
    .toArray();
  // Stable sort: pending first, newest first inside each group.
  rows.sort((a, b) => Number(b.status === "pending") - Number(a.status === "pending"));
  return shapeAll(db, rows, forDeveloper);
};

export const myIntroSummary = async (db, candidateId) => ({
  pending: await db.collection(INTROS).countDocuments({ candidateId, ...openFilter() }),
});

/** Tells the recruiter who sent it. Never fails the reply that caused it. */
const tellRecruiter = async (db, row, type) => {
  const [recruiter, job, developer] = await Promise.all([
    db.collection("users").findOne({ _id: row.recruiterId }, { projection: { firstName: 1, email: 1 } }),
    db.collection("jobs").findOne({ _id: row.jobId }, { projection: { title: 1 } }),
    db.collection("users").findOne({ _id: row.candidateId }, { projection: { username: 1, firstName: 1, lastName: 1, email: 1 } }),
  ]);
  if (!recruiter) return;
  const name = fullName(developer);
  const jobTitle = job?.title ?? "your job";
  const verb = type === "intro_accepted" ? "accepted" : "declined";
  notify({
    type,
    targetUserId: String(recruiter._id),
    ref: { kind: "intro", id: String(row._id) },
    meta: { message: `${name} ${verb} your request about ${jobTitle}`, link: RECRUITER_LINK, developer: name, jobTitle },
  });
  if (type !== "intro_accepted") return;
  await sendIntroAcceptedEmail(recruiter.email, {
    firstName: recruiter.firstName,
    developerName: name,
    developerEmail: developer.email,
    jobTitle,
    url: `${frontendUrl()}${RECRUITER_LINK}`,
  });
};

const tellRecruiterLater = (db, row, type) =>
  tellRecruiter(db, row, type).catch((err) => console.error(`${type} notice failed:`, err.message));

export const acceptIntro = async (db, candidateId, id) => {
  const row = await moveIntro(db, id, { candidateId }, { status: "accepted", respondedAt: new Date() });
  tellRecruiterLater(db, row, "intro_accepted");
  return shapeOne(db, row, forDeveloper);
};

export const declineIntro = async (db, candidateId, id) => {
  const row = await moveIntro(db, id, { candidateId }, { status: "declined", respondedAt: new Date() });
  tellRecruiterLater(db, row, "intro_declined");
  return shapeOne(db, row, forDeveloper);
};

/** Declines it if still open; any other state is left as it is. */
const declineIfOpen = async (db, candidateId, id, extra = {}) => {
  const _id = toIntroId(id);
  const now = new Date();
  const declined = await db
    .collection(INTROS)
    .findOneAndUpdate(
      { _id, candidateId, ...openFilter() },
      { $set: { status: "declined", respondedAt: now, updatedAt: now, ...extra } },
      { returnDocument: "after" },
    );
  if (declined) {
    tellRecruiterLater(db, declined, "intro_declined");
    return declined;
  }
  const row = await db.collection(INTROS).findOne({ _id, candidateId });
  if (!row) throw new HttpError(404, "Request not found");
  return row;
};

export const blockIntroCompany = async (db, candidateId, id) => {
  const row = await declineIfOpen(db, candidateId, id);
  await db
    .collection(BLOCKS)
    .updateOne(
      { candidateId, companyId: row.companyId },
      { $setOnInsert: { candidateId, companyId: row.companyId, createdAt: new Date() } },
      { upsert: true },
    );
  return shapeOne(db, row, forDeveloper);
};

/**
 * Enough reports in the window move the company down to "limited" (can browse,
 * can't contact). The mark lives in trust.reportLimit so a re-check keeps it
 * (see applyOverride); an admin override always wins, so it's skipped then.
 * Never lifts a company: only "verified" or "limited" ones are touched.
 */
const limitIfReported = async (db, companyId) => {
  const reports = await db
    .collection(INTROS)
    .countDocuments({ companyId, "reported.at": { $gt: daysAgo(INTRO_RULES.reportsWindowDays) } });
  if (reports < INTRO_RULES.reportsToLimit) return;
  await db.collection("companies").updateOne(
    { _id: companyId, "trust.override": { $exists: false }, "trust.level": { $in: ["verified", "limited"] } },
    {
      $set: { "trust.level": "limited", "trust.reportLimit": { reason: REPORT_LIMIT_REASON, at: new Date() }, updatedAt: new Date() },
      $addToSet: { "trust.reasons": REPORT_LIMIT_REASON },
    },
  );
};

export const reportIntro = async (db, candidateId, id, { reason, details = "" }) => {
  const reported = { reason, details, at: new Date() };
  let row = await declineIfOpen(db, candidateId, id, { reported });
  if (!row.reported) {
    row = await db
      .collection(INTROS)
      .findOneAndUpdate(
        { _id: row._id, candidateId, reported: null },
        { $set: { reported, updatedAt: new Date() } },
        { returnDocument: "after" },
      ) ?? row;
  }
  await limitIfReported(db, row.companyId);
  return shapeOne(db, row, forDeveloper);
};
