import crypto from "node:crypto";
import { Buffer } from "node:buffer";
import { ObjectId } from "mongodb";
import { HIRING_CODE_LENGTH } from "#shared/hiringRules.js";

/**
 * One-time email codes for hiring accounts. Only a hash is stored. A code
 * lives CODE_TTL_MIN minutes and allows MAX_ATTEMPTS guesses; a TTL index
 * (config/db.js) removes expired ones. Issuing a new code replaces the old one.
 */

export const CODE_TTL_MIN = 15;
const MAX_ATTEMPTS = 5;
const COLLECTION = "hiring_email_codes";

const hash = (code) => crypto.createHash("sha256").update(code).digest("hex");

const newCode = () =>
  String(crypto.randomInt(0, 10 ** HIRING_CODE_LENGTH)).padStart(HIRING_CODE_LENGTH, "0");

export const issueCode = async (db, userId) => {
  const code = newCode();
  await db.collection(COLLECTION).replaceOne(
    { userId: new ObjectId(userId) },
    {
      userId: new ObjectId(userId),
      codeHash: hash(code),
      attempts: 0,
      expiresAt: new Date(Date.now() + CODE_TTL_MIN * 60_000),
    },
    { upsert: true },
  );
  return code;
};

/** @returns {Promise<"ok" | "wrong" | "expired" | "locked">} */
export const checkCode = async (db, userId, code) => {
  const codes = db.collection(COLLECTION);
  const row = await codes.findOneAndUpdate(
    { userId: new ObjectId(userId) },
    { $inc: { attempts: 1 } },
    { returnDocument: "after" },
  );
  const doc = row?.value ?? row;
  if (!doc || doc.expiresAt < new Date()) return "expired";
  if (doc.attempts > MAX_ATTEMPTS) return "locked";
  const a = Buffer.from(doc.codeHash, "hex");
  const b = Buffer.from(hash(String(code)), "hex");
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return "wrong";
  await codes.deleteOne({ _id: doc._id });
  return "ok";
};
