import { createHash, timingSafeEqual } from "node:crypto";
import process from "node:process";
import { runWeeklySummaries } from "../services/weeklySummaryService.js";
import { getEmailPrefs, setEmailPrefs, unsubscribeWithToken } from "../services/emailPrefsService.js";

// Hashing first makes both sides the same length, which timingSafeEqual needs,
// and keeps the comparison constant-time whatever the caller sends.
const digest = (value) => createHash("sha256").update(String(value)).digest();

/** Only the scheduler, holding WEEKLY_SUMMARY_CRON_SECRET, may start a run. */
export const requireCronSecret = (req, res, next) => {
  const secret = process.env.WEEKLY_SUMMARY_CRON_SECRET;
  if (!secret) return res.status(503).json({ message: "Weekly summaries are not configured" });
  const given = (req.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!given || !timingSafeEqual(digest(given), digest(secret))) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

/** POST /api/email/weekly-summary/run[?dryRun=1] */
export const runWeeklySummary = async (req, res) => {
  const dryRun = req.query.dryRun === "1" || req.query.dryRun === "true";
  if (!dryRun && (!process.env.RESEND_API_KEY || !process.env.FRONTEND_URL)) {
    return res.status(503).json({ message: "RESEND_API_KEY and FRONTEND_URL must be set to send" });
  }
  try {
    res.json(await runWeeklySummaries(req.app.locals.db, { dryRun }));
  } catch (err) {
    console.error("weekly summary run failed:", err);
    res.status(500).json({ message: "Weekly summary run failed" });
  }
};

export const getPrefs = async (req, res) => {
  try {
    res.json(await getEmailPrefs(req.app.locals.db, req.user._id));
  } catch (err) {
    console.error("getEmailPrefs error:", err);
    res.status(500).json({ message: "Failed to load email settings" });
  }
};

export const putPrefs = async (req, res) => {
  try {
    res.json(await setEmailPrefs(req.app.locals.db, req.user._id, req.body));
  } catch (err) {
    console.error("setEmailPrefs error:", err);
    res.status(500).json({ message: "Failed to save email settings" });
  }
};

/**
 * POST /api/email/unsubscribe?token=...
 *
 * POST only. Mail scanners and link previews fetch every GET link in an email,
 * so a GET that unsubscribed would switch the email off before the person ever
 * read it. Two callers: the /unsubscribe page's button, and Gmail's own
 * one-click button (List-Unsubscribe-Post), which POSTs a form body we ignore.
 */
export const unsubscribe = async (req, res) => {
  try {
    const via = req.is("application/json") ? "link" : "one_click";
    const ok = await unsubscribeWithToken(req.app.locals.db, req.query.token, via);
    if (!ok) return res.status(400).json({ message: "Invalid unsubscribe link" });
    res.json({ unsubscribed: true });
  } catch (err) {
    console.error("unsubscribe error:", err);
    res.status(500).json({ message: "Failed to unsubscribe" });
  }
};
