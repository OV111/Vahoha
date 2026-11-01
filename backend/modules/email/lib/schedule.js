import { validTimeZone } from "../../../services/learningActivity.js";

/**
 * When a learner's weekly summary is due: Sunday from 18:00 to midnight in
 * their own timezone. The scheduler calls the run endpoint every hour across
 * the whole span (see .github/workflows/weekly-summary.yml), so each learner
 * gets six chances; a late or skipped GitHub run costs nothing, and the
 * (userId, weekKey) claim makes sure only one of them sends.
 */
export const SEND_WEEKDAY = "Sun";
export const SEND_FROM_HOUR = 18;

const localParts = (now, timeZone) => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: validTimeZone(timeZone),
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type) => parts.find((p) => p.type === type).value;
  return {
    weekday: get("weekday"),
    hour: Number(get("hour")),
    date: `${get("year")}-${get("month")}-${get("day")}`,
  };
};

/**
 * null when it is not send time for this timezone, else the week's key: the
 * learner's local date of that Sunday, e.g. "2026-11-01". Two runs in the same
 * evening produce the same key, which is what the dedupe index is built on.
 */
export const dueWeekKey = (now, timeZone) => {
  const local = localParts(now, timeZone);
  if (local.weekday !== SEND_WEEKDAY || local.hour < SEND_FROM_HOUR) return null;
  return local.date;
};
