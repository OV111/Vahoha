import { ObjectId } from "mongodb";
import { HttpError } from "../../../utils/httpErrors.js";

/**
 * The exceptions page: companies the engine didn't fully trust, and the
 * override an admin can put on them (appeals, obvious false alarms, abuse).
 * Not a review queue: verified companies never show up here unless asked for.
 */

const COMPANIES = "companies";
const PAGE_SIZE = 50;

export const listCompanies = async (db, { level = "attention" } = {}) => {
  const filter =
    level === "attention"
      ? { $or: [{ "trust.level": { $in: ["limited", "rejected"] } }, { "trust.override": { $exists: true } }] }
      : { "trust.level": level };
  const rows = await db
    .collection(COMPANIES)
    .aggregate([
      { $match: filter },
      { $sort: { updatedAt: -1 } },
      { $limit: PAGE_SIZE },
      { $lookup: { from: "users", localField: "createdBy", foreignField: "_id", as: "owner" } },
      {
        $project: {
          name: 1, website: 1, type: 1, teamSize: 1, createdAt: 1, trust: 1,
          ownerEmail: { $first: "$owner.email" },
        },
      },
    ])
    .toArray();
  return rows.map((c) => ({ ...c, id: String(c._id), _id: undefined }));
};

/**
 * Pin a level with a reason, or clear the pin (level null) so the engine's own
 * result applies again. Logged on the company itself: who, when, why.
 */
export const overrideCompany = async (db, adminId, companyId, { level, note }) => {
  const _id = new ObjectId(companyId);
  const company = await db.collection(COMPANIES).findOne({ _id }, { projection: { trust: 1 } });
  if (!company) throw new HttpError(404, "Company not found");

  const computedLevel = company.trust?.computedLevel ?? company.trust?.level;
  const update = level
    ? {
        $set: {
          "trust.level": level,
          "trust.computedLevel": computedLevel,
          "trust.override": { level, note, by: new ObjectId(adminId), at: new Date() },
          updatedAt: new Date(),
        },
      }
    : {
        // Clearing goes back to the checks, still capped by developer reports.
        $set: {
          "trust.level": company.trust?.reportLimit && computedLevel === "verified" ? "limited" : computedLevel,
          updatedAt: new Date(),
        },
        $unset: { "trust.override": "", "trust.computedLevel": "" },
      };
  await db.collection(COMPANIES).updateOne({ _id }, update);
  return { id: companyId, level: level ?? update.$set["trust.level"] };
};
