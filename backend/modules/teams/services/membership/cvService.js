/**
 * CV estimate for Teams, in the background: nothing about it is shown in the
 * UI. When a user is added to a team or opens the team page, the CV already on
 * their profile is read once and feeds their starting level (lib/teamLevel.js
 * caps it at Mid and drops it once platform evidence exists).
 * Only the extracted fields are stored, never the CV text.
 */

import { ObjectId } from "mongodb";
import { groqChat } from "../../../../services/groqChat.js";
import { GroqBusyError } from "../../../../services/groqGate.js";
import { CV_SCHEMA, buildCvMessages, normalizeCv } from "../../lib/cvEstimate.js";
import { readCvText } from "./cvText.js";
import { TEAM_PROFILES, ensureIndexes } from "../teamsData.js";
import { fail } from "../../../../utils/httpErrors.js";

const MODEL = "openai/gpt-oss-120b";
// A failed read (scan, not a CV, AI busy) is retried at most once an hour for the same file.
const RETRY_AFTER_MS = 60 * 60_000;

const cvUrlOf = async (db, uid) =>
  (await db.collection("usersStats").findOne({ userId: uid }, { projection: { cvUrl: 1 } }))?.cvUrl ?? null;

const askModel = async (text) => {
  let completion;
  try {
    completion = await groqChat(
      {
        model: MODEL,
        messages: buildCvMessages(text),
        response_format: { type: "json_schema", json_schema: { name: "cv_extract", strict: true, schema: CV_SCHEMA } },
        reasoning_effort: "low",
        max_tokens: 2000,
        temperature: 0,
      },
      { priority: "interactive" },
    );
  } catch (err) {
    if (err instanceof GroqBusyError || err.status === 429 || err.status === 413) {
      fail(503, "The AI is busy right now. Try again in a minute");
    }
    console.error("cv extract model error:", err.status, err.message);
    fail(502, "Reading your CV failed. Try again in a minute");
  }
  const choice = completion.choices?.[0];
  if (choice?.finish_reason === "length") fail(502, "Reading your CV failed. Try again in a minute");
  try {
    return JSON.parse(choice?.message?.content ?? "");
  } catch {
    fail(502, "Reading your CV failed. Try again in a minute");
  }
};

/**
 * Reads the profile CV if it hasn't been read yet. Never throws: a CV problem
 * must not break adding a member or loading the team page.
 * @returns {Promise<boolean>} true when a new estimate was stored
 */
export const ensureCvEstimate = async (db, userId) => {
  try {
    await ensureIndexes(db);
    const uid = new ObjectId(userId);
    const cvUrl = await cvUrlOf(db, uid);
    if (!cvUrl) return false;
    // The usual case on a page load: this file was read already. One read, no write.
    const known = await db.collection(TEAM_PROFILES).findOne({ userId: uid }, { projection: { "cv.sourceUrl": 1 } });
    if (known?.cv?.sourceUrl === cvUrl) return false;

    // Claim the read atomically: two page loads at once, or a page load during
    // an admin add, read the file only once. Matches only when this file has no
    // estimate and no recent attempt; otherwise the upsert hits the unique
    // userId index (11000) and this call stops.
    await db.collection(TEAM_PROFILES).findOneAndUpdate(
      {
        userId: uid,
        "cv.sourceUrl": { $ne: cvUrl },
        $or: [{ cvTriedUrl: { $ne: cvUrl } }, { cvTriedAt: { $lt: new Date(Date.now() - RETRY_AFTER_MS) } }],
      },
      { $set: { cvTriedUrl: cvUrl, cvTriedAt: new Date() } },
      { upsert: true, projection: { _id: 1 } },
    );

    const raw = await askModel(await readCvText(cvUrl));
    if (!raw.isCv) return false;

    const now = new Date();
    const cv = { ...normalizeCv(raw), sourceUrl: cvUrl, extractedAt: now, confirmedAt: now };
    // A CV replaced while this one was being read must not get the old facts.
    const stillCurrent = (await cvUrlOf(db, uid)) === cvUrl;
    if (!stillCurrent) return false;
    await db.collection(TEAM_PROFILES).updateOne({ userId: uid }, { $set: { cv } });
    return true;
  } catch (err) {
    // 11000: the upsert lost a race with another claim, or this file was already read. Both mean "not ours to do".
    if (err.code !== 11000) console.error("cv estimate skipped:", err.status ?? "", err.message);
    return false;
  }
};

/** Removes the estimate. Called by the profile module when the CV is removed or replaced. */
export const clearCvEstimate = async (db, userId) => {
  await db
    .collection(TEAM_PROFILES)
    .updateOne({ userId: new ObjectId(userId) }, { $unset: { cv: "", cvTriedUrl: "", cvTriedAt: "" } });
};
