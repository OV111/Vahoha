/**
 * Plan catalogue — the single source of truth for the pricing and billing UI.
 *
 * Everything here is a HYPOTHESIS (2026-10-01), not
 * a shipped entitlement: there is no Stripe, no subscription state and no feature
 * gate yet, so nothing below is enforced. Two consequences shape this file:
 *
 *   1. `soon: true` marks a feature that is planned but not built. The UI shows a
 *      "Soon" tag instead of a check, so the page never advertises something that
 *      does not exist.
 *   2. Prices live here and nowhere else. The $15 price is
 *      still an open willingness-to-pay question — changing it is a one-line edit.
 *
 * When billing is built, the backend's `featureGateService` should read the same
 * limits (move them to the server and have this file consume an API instead).
 */

/** @typedef {{ text: string, soon?: boolean }} PlanFeature */
/**
 * @typedef {Object} Plan
 * @property {"free"|"pro"|"teams"} id
 * @property {string} name
 * @property {string} price      Display price, e.g. "$15".
 * @property {string} period     Suffix shown after the price, e.g. "/month".
 * @property {string} description
 * @property {boolean} [highlighted]
 * @property {PlanFeature[]} features
 */

/** @type {Plan[]} */
export const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "",
    description: "For students and curious developers",
    features: [
      { text: "Every roadmap and every layer" },
      { text: "Layer exams" },
      { text: "Community — blogs, chat, profiles" },
      { text: "Arena — 30 graded submissions / day" },
      { text: "Mentor — 30 messages / day" },
      { text: "1 capstone defense" },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$15",
    period: "/month",
    description: "For developers actively learning",
    highlighted: true,
    features: [
      { text: "Everything in Free" },
      { text: "Unlimited Mentor messages" },
      { text: "Unlimited capstone defenses" },
      { text: "Certificate and evidence page" },
      { text: "Arena — 300 graded submissions / day" },
      { text: "Voice teach-back tests" },
      { text: "Job readiness check", soon: true },
    ],
  },
  {
    id: "teams",
    name: "Bootcamps & universities",
    price: "$60",
    period: "/seat/month",
    description: "For cohorts of learners · min. 3 seats",
    features: [
      { text: "Everything in Pro, per seat" },
      { text: "Admin dashboard and path assignment", soon: true },
      { text: "Exportable progress reports (CSV)", soon: true },
      { text: "Bulk certificate verification", soon: true },
    ],
  },
];

/** Plans are looked up by id in several places; build the index once. */
export const PLANS_BY_ID = Object.fromEntries(PLANS.map((p) => [p.id, p]));
