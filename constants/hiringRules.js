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
