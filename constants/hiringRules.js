/**
 * Hiring sign-up rules shared by the form (src/features/hiring) and the API
 * (backend/modules/hiring), so the form can't offer a choice the server refuses.
 * Plain values only: the backend imports this file too.
 */

export const ORG_TYPE_IDS = Object.freeze(["company", "agency"]);
export const COMPANY_ROLE_IDS = Object.freeze(["founder", "hiring-manager", "recruiter"]);
export const TEAM_SIZES = Object.freeze(["1-10", "11-50", "51-200", "201-1000", "1000+"]);

// What a hiring account may do, decided by the trust engine:
//   unverified: email code not entered yet; can look around only
//   limited:    email proven, company signals weak; can browse candidates, can't contact
//   verified:   strong signals; full access
//   rejected:   a hard fail (throwaway email, domain that doesn't exist)
export const TRUST_LEVELS = Object.freeze(["unverified", "limited", "verified", "rejected"]);

export const HIRING_CODE_LENGTH = 6;

// A plain website address: http(s), a dotted host name, optional path. No "@"
// (that would be login details, e.g. "https://me@site.com"), no spaces, no port.
export const WEBSITE_PATTERN = /^https?:\/\/[a-z0-9-]+(\.[a-z0-9-]+)+(\/[^\s@]*)?$/i;
export const WEBSITE_MESSAGE = "Enter the site address, like https://acme.com.";

// ── Jobs (private to the company for now; a public board comes later) ──────
export const JOB_LEVELS = Object.freeze(["junior", "mid", "senior"]);
export const JOB_TYPES = Object.freeze(["full-time", "part-time", "contract", "internship"]);
export const WORKPLACES = Object.freeze(["remote", "hybrid", "onsite"]);
export const JOB_STATUSES = Object.freeze(["draft", "open", "closed"]);
export const SALARY_CURRENCIES = Object.freeze(["USD", "EUR", "GBP", "AMD", "RUB"]);
export const SALARY_PERIODS = Object.freeze(["year", "month", "hour"]);
export const JOB_LIMITS = Object.freeze({
  titleMax: 100,
  locationMax: 100,
  descriptionMax: 3000,
  stackMax: 15,
  stackItemMax: 30,
  requiredLayersMax: 10,
  openJobsPerCompany: 25,
});

// ── Intro requests ──────────────────────────────────────────────────────────
// One place for every number, so they're easy to tune after the pilot.
export const INTRO_RULES = Object.freeze({
  expiryDays: 14, // pending → expired
  declineCooldownDays: 90, // same company can't ask the same developer again
  perCompanyDaily: 20,
  perAgencyDaily: 5,
  maxPendingPerDeveloper: 5, // across all companies, so nobody gets flooded
  messageMax: 600,
  reportsToLimit: 3, // reports in reportsWindowDays move a company to "limited"
  reportsWindowDays: 30,
});
export const INTRO_STATUSES = Object.freeze(["pending", "accepted", "declined", "expired", "withdrawn"]);
export const INTRO_REPORT_REASONS = Object.freeze(["spam", "scam", "inappropriate", "other"]);
