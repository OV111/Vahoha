import { HttpError } from "../../../utils/httpErrors.js";
import { RECRUITER_SETTINGS } from "../../recruiter/services/recruiterData.js";

/**
 * A company's shortlist: candidates a recruiter saved, each with one private
 * note. It belongs to the COMPANY, not the person, so teammates share it, and
 * every query is scoped by companyId so one company never sees another's list.
 *
 * saved_candidates: { companyId, candidateId, note, savedBy, createdAt, updatedAt }
 *   unique on { companyId, candidateId } (config/db.js)
 *
 * Only developers who opted in to recruiters can be saved, and one who opts out
 * drops out of the list on the next read (the row stays, so opting back in
 * brings the note back).
 */

const SAVED = "saved_candidates";
export const NOTE_MAX = 500;

export const optedInIds = async (db, ids) => {
  if (!ids.length) return new Set();
  const rows = await db
    .collection(RECRUITER_SETTINGS)
    .find({ enabled: true, userId: { $in: ids } }, { projection: { userId: 1 } })
    .toArray();
  return new Set(rows.map((r) => String(r.userId)));
};

/** The opted-in developer behind a username, or a 404 that says nothing more. */
const findCandidate = async (db, username) => {
  const user = await db.collection("users").findOne({ username }, { projection: { _id: 1, role: 1 } });
  if (!user || user.role === "recruiter") throw new HttpError(404, "Candidate not found");
  const ok = await optedInIds(db, [user._id]);
  if (!ok.has(String(user._id))) throw new HttpError(404, "Candidate not found");
  return user;
};

export const getSavedStatus = async (db, companyId, username) => {
  const user = await findCandidate(db, username);
  const row = await db.collection(SAVED).findOne({ companyId, candidateId: user._id }, { projection: { note: 1 } });
  return { saved: Boolean(row), note: row?.note ?? "" };
};

export const saveCandidate = async (db, companyId, recruiterId, username, note = "") => {
  const user = await findCandidate(db, username);
  const now = new Date();
  await db.collection(SAVED).updateOne(
    { companyId, candidateId: user._id },
    {
      $set: { note: note.slice(0, NOTE_MAX), updatedAt: now },
      $setOnInsert: { companyId, candidateId: user._id, savedBy: recruiterId, createdAt: now },
    },
    { upsert: true },
  );
  return { saved: true, note: note.slice(0, NOTE_MAX) };
};

export const unsaveCandidate = async (db, companyId, username) => {
  const user = await db.collection("users").findOne({ username }, { projection: { _id: 1 } });
  if (user) await db.collection(SAVED).deleteOne({ companyId, candidateId: user._id });
  return { saved: false };
};

/** Newest first, opted-out developers left out. */
export const listSaved = async (db, companyId) => {
  const rows = await db
    .collection(SAVED)
    .aggregate([
      { $match: { companyId } },
      { $sort: { updatedAt: -1 } },
      { $limit: 500 },
      { $lookup: { from: "users", localField: "candidateId", foreignField: "_id", as: "u" } },
      { $unwind: "$u" },
      {
        $project: {
          candidateId: 1, note: 1, createdAt: 1, updatedAt: 1,
          username: "$u.username", firstName: "$u.firstName", lastName: "$u.lastName",
        },
      },
    ])
    .toArray();
  const live = await optedInIds(db, rows.map((r) => r.candidateId));
  return rows
    .filter((r) => live.has(String(r.candidateId)))
    .map(({ username, firstName, lastName, note, createdAt, updatedAt }) => ({
      username,
      name: [firstName, lastName].filter(Boolean).join(" ") || username,
      note,
      savedAt: createdAt,
      updatedAt,
    }));
};
