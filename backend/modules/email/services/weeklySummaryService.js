import process from "node:process";
import { sendEmail } from "../../../utils/emailService.js";
import { trackEvent } from "../../../services/eventService.js";
import { WEEKLY_SUMMARY_COPY as COPY } from "../../../../constants/weeklySummary.js";
import { dueWeekKey } from "../lib/schedule.js";
import { summaryKind, weekStats } from "../lib/summary.js";
import { createUnsubscribeToken } from "../lib/unsubscribeToken.js";
import { renderWeeklySummaryEmail } from "../lib/weeklySummaryEmail.js";
import { loadSummaryData } from "./summaryData.js";

/**
 * One run of the weekly summary: called every hour on Sunday and early Monday
 * UTC (.github/workflows/weekly-summary.yml). Each run sends to the learners
 * whose local Sunday evening it is and who haven't had this week's email yet.
 *
 * `weeklySummaries` holds one row per (userId, weekKey) and is the dedupe: a
 * row is claimed before sending, so overlapping runs or a retried request can't
 * email anyone twice. A failed send is retried by the next run, up to
 * MAX_ATTEMPTS; a "skipped" row (nothing to say) stops it being re-checked
 * every hour.
 *
 * Reads every opted-in user per run. Fine at pilot scale; past a few thousand
 * users, bucket them by timezone instead.
 */

export const SUMMARIES = "weeklySummaries";
const MAX_ATTEMPTS = 3;
// A claim older than this belongs to a run that died mid-send.
const STALE_CLAIM_MS = 30 * 60 * 1000;
// Resend's default limit is 2 requests a second.
const SEND_GAP_MS = 600;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const withUtm = (url, weekKey) =>
  `${url}?utm_source=weekly_summary&utm_medium=email&utm_campaign=${weekKey}`;

/** The one next step: what the Adaptive Engine says, as a sentence and a link. */
export const nextStepFor = (nextAction, activeLayerTitle, frontendUrl) => {
  const { action, title } = nextAction;
  if (action === "start") return { text: COPY.nextStep.start(), ctaLabel: COPY.cta.start, url: `${frontendUrl}/roadmaps` };
  if (action === "advance") {
    return { text: COPY.nextStep.advance(activeLayerTitle), ctaLabel: COPY.cta.roadmap, url: `${frontendUrl}/roadmaps` };
  }
  return { text: COPY.nextStep[action](title), ctaLabel: COPY.cta.mentor, url: `${frontendUrl}/ai-agent` };
};

const claim = async (col, userId, weekKey, now) => {
  try {
    return await col.findOneAndUpdate(
      {
        userId,
        weekKey,
        $or: [
          { status: "failed", attempts: { $lt: MAX_ATTEMPTS } },
          { status: "sending", claimedAt: { $lt: new Date(now.getTime() - STALE_CLAIM_MS) } },
        ],
      },
      { $set: { status: "sending", claimedAt: now }, $inc: { attempts: 1 } },
      { upsert: true, returnDocument: "after" },
    );
  } catch (err) {
    // A row exists that the filter didn't match (sent, skipped, or claimed by
    // another run just now), so the upsert tried a second insert.
    if (err.code === 11000) return null;
    throw err;
  }
};

/**
 * @param {object} [options]
 * @param {Date}    [options.now]
 * @param {boolean} [options.dryRun]  report who would get what; send and write nothing
 * @param {number}  [options.limit]   most emails to send in this run
 * @returns {Promise<{ due: number, sent: number, skipped: number, failed: number, preview?: object[] }>}
 */
export const runWeeklySummaries = async (db, { now = new Date(), dryRun = false, limit = 500 } = {}) => {
  const frontendUrl = process.env.FRONTEND_URL;
  const apiUrl = process.env.API_PUBLIC_URL;
  const col = db.collection(SUMMARIES);

  const users = await db
    .collection("users")
    .find(
      { email: { $type: "string", $ne: "" }, "emailPrefs.weeklySummary": { $ne: false } },
      { projection: { email: 1, firstName: 1 } },
    )
    .toArray();
  const zones = new Map(
    (
      await db
        .collection("usersStats")
        .find({ userId: { $in: users.map((u) => u._id) } }, { projection: { userId: 1, timezone: 1 } })
        .toArray()
    ).map((s) => [String(s.userId), s.timezone]),
  );

  const due = users
    .map((user) => ({ user, timeZone: zones.get(String(user._id)), weekKey: dueWeekKey(now, zones.get(String(user._id))) }))
    .filter((d) => d.weekKey);

  const done = new Set(
    (
      await col
        .find(
          { userId: { $in: due.map((d) => d.user._id) }, status: { $in: ["sent", "skipped"] } },
          { projection: { userId: 1, weekKey: 1 } },
        )
        .toArray()
    ).map((r) => `${r.userId}:${r.weekKey}`),
  );
  const pending = due.filter((d) => !done.has(`${d.user._id}:${d.weekKey}`));

  const result = { due: pending.length, sent: 0, skipped: 0, failed: 0 };
  if (dryRun) result.preview = [];

  for (const { user, timeZone, weekKey } of pending) {
    if (result.sent >= limit) break;

    const data = await loadSummaryData(db, user, { now, timeZone });
    const kind = summaryKind(data);

    if (dryRun) {
      result.preview.push({ userId: String(user._id), weekKey, kind, stats: kind ? weekStats(data) : [] });
      continue;
    }
    if (!kind) {
      await col.updateOne(
        { userId: user._id, weekKey },
        { $setOnInsert: { status: "skipped", claimedAt: now, attempts: 0 } },
        { upsert: true },
      );
      result.skipped++;
      continue;
    }

    const claimed = await claim(col, user._id, weekKey, now);
    if (!claimed) continue;

    const token = createUnsubscribeToken(user._id);
    const nextStep = nextStepFor(data.nextAction, data.activeLayerTitle, frontendUrl);
    const email = renderWeeklySummaryEmail({
      kind,
      firstName: user.firstName,
      stats: weekStats(data),
      layersPassed: data.layersPassed,
      nextStep: { ...nextStep, url: withUtm(nextStep.url, weekKey) },
      unsubscribeUrl: `${frontendUrl}/unsubscribe?token=${token}`,
    });

    try {
      await sendEmail({
        to: user.email,
        ...email,
        // Gmail and Yahoo show their own "Unsubscribe" button from these and
        // require them for bulk senders. The POST target must be the API itself.
        headers: apiUrl
          ? {
              "List-Unsubscribe": `<${apiUrl}/api/email/unsubscribe?token=${token}>`,
              "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
            }
          : undefined,
      });
      await col.updateOne({ _id: claimed._id }, { $set: { status: "sent", kind, sentAt: new Date() }, $unset: { error: "" } });
      await trackEvent(db, user._id, "weekly_summary_sent", { weekKey, kind });
      result.sent++;
    } catch (err) {
      await col.updateOne({ _id: claimed._id }, { $set: { status: "failed", error: String(err.message).slice(0, 300) } });
      console.error("weekly summary send failed:", String(user._id), err.message);
      result.failed++;
    }
    await sleep(SEND_GAP_MS);
  }

  return result;
};
