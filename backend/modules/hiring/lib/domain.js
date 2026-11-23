import { emailDomainOf } from "../../../../constants/emailDomains.js";

export { emailDomainOf };

/** "https://www.Acme.com/jobs" → "acme.com". Empty string when it isn't a URL. */
export const websiteHostOf = (website = "") => {
  try {
    return new URL(website).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return "";
  }
};

/**
 * Does the email belong to the website's organisation? Same domain, or one is
 * a subdomain of the other (jane@eu.acme.com with acme.com, or the reverse).
 */
export const domainsMatch = (emailDomain, host) =>
  Boolean(emailDomain && host) &&
  (emailDomain === host || emailDomain.endsWith(`.${host}`) || host.endsWith(`.${emailDomain}`));

/** The first word of the company name, for "does the site mention it". */
export const nameToken = (name = "") =>
  name
    .toLowerCase()
    .replace(/\b(inc|llc|ltd|gmbh|corp|co|company|the)\b\.?/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .trim()
    .split(/\s+/)[0] ?? "";
