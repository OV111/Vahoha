/**
 * What goes in one learner's weekly email, or whether it goes at all. Pure: the
 * data is loaded in services/summaryData.js.
 *
 * Three outcomes:
 *   "week"  : they learned this week. Show it back to them.
 *   "nudge" : a quiet week, but they were learning recently (or just signed up).
 *             One short email naming the next step.
 *   null    : quiet for longer than QUIET_DAYS. Stop. Weekly mail to someone who
 *             left is how a sender ends up in spam for everyone else.
 */

export const QUIET_DAYS = 21;
const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * @param {object} data
 * @param {Date}   data.now
 * @param {Date}   data.signedUpAt
 * @param {Date|null} data.lastLearnedAt  last learning activity, ever
 * @param {number} data.activeDays        distinct learning days in the last 7
 * @param {string[]} data.layersPassed    layer titles passed in the last 7 days
 * @param {number} data.challengesSolved
 * @param {number} data.xpEarned
 * @param {number} data.streak
 */
export const summaryKind = (data) => {
  const { now, signedUpAt, lastLearnedAt, activeDays, layersPassed, challengesSolved, xpEarned } = data;
  if (activeDays > 0 || layersPassed.length || challengesSolved > 0 || xpEarned > 0) return "week";

  const recent = (date) => date && now - date <= QUIET_DAYS * DAY_MS;
  if (recent(lastLearnedAt)) return "nudge";
  if (!lastLearnedAt && recent(signedUpAt)) return "nudge";
  return null;
};

/** The headline numbers, in display order, leaving out the ones that are zero. */
export const weekStats = ({ streak, activeDays, layersPassed, challengesSolved, xpEarned }) =>
  [
    { label: "day streak", value: streak },
    { label: activeDays === 1 ? "day learning" : "days learning", value: activeDays },
    { label: layersPassed.length === 1 ? "layer passed" : "layers passed", value: layersPassed.length },
    { label: challengesSolved === 1 ? "challenge solved" : "challenges solved", value: challengesSolved },
    { label: "XP earned", value: xpEarned },
  ].filter((s) => s.value > 0);
