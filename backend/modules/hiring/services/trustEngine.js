import dns from "node:dns/promises";
import { isDisposableEmail, isFreeEmail } from "#shared/emailDomains.js";
import { domainsMatch, emailDomainOf, nameToken, websiteHostOf } from "../lib/domain.js";
import { safeFetchPage } from "../lib/safeFetch.js";
import { createTtlCache } from "../../../utils/ttlCache.js";
import { HttpError } from "../../../utils/httpErrors.js";

/**
 * The company trust engine. Runs automatic checks on a hiring account and turns
 * them into a trust level (see TRUST_LEVELS in shared/hiringRules.js). No
 * person reviews the normal case: the level alone decides what the account may do.
 *
 * Rules (the published logic, kept boring on purpose):
 *   rejected   throwaway email, or the email domain has no mail records
 *   unverified the 6-digit email code hasn't been entered yet
 *   verified   code ✓ + work email ✓ + email matches website ✓ + website live ✓
 *              + the domain is not brand new (registered NEW_DOMAIN_DAYS+ ago, or unknown)
 *   limited    everything else (gmail, mismatch, dead site, new domain): may browse, can't contact
 *
 * An admin override (trust.override, set on the exceptions page) wins over all
 * of this until it is cleared; see applyOverride.
 *
 * Every check is stored with its result, so any level can be explained later.
 */

const MX_TIMEOUT_MS = 4000;
const RDAP_TIMEOUT_MS = 5000;
export const NEW_DOMAIN_DAYS = 30;

// Outbound results cached per host. Repeated sign-ups naming the same website
// then can't use our server to hammer it (amplification), and re-checks are fast.
// Short for the site (it may come back up), long for facts that rarely change.
const siteCache = createTtlCache({ name: "hiring-site", ttlMs: 5 * 60_000, maxEntries: 2000 });
const mxCache = createTtlCache({ name: "hiring-mx", ttlMs: 60 * 60_000, maxEntries: 5000 });
const ageCache = createTtlCache({ name: "hiring-domain-age", ttlMs: 24 * 60 * 60_000, maxEntries: 5000 });

// At most MAX_ACTIVE check runs at once per process (each opens sockets and waits
// on slow sites); up to MAX_WAITING more queue. Past that we answer "busy" at
// once instead of piling up requests until the server falls over.
const MAX_ACTIVE = 4;
const MAX_WAITING = 20;
let active = 0;
const waiting = [];

const withSlot = async (work) => {
  if (active >= MAX_ACTIVE) {
    if (waiting.length >= MAX_WAITING) throw new HttpError(503, "We're checking a lot of companies right now. Try again in a minute.");
    await new Promise((resolve) => waiting.push(resolve));
  }
  active += 1;
  try {
    return await work();
  } finally {
    active -= 1;
    waiting.shift()?.();
  }
};

const withTimeout = (promise, ms) =>
  Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms))]);

const checkMailRecords = async (domain) => {
  try {
    const records = await withTimeout(dns.resolveMx(domain), MX_TIMEOUT_MS);
    return records.length > 0;
  } catch {
    return false;
  }
};

// IANA's list of which registry answers RDAP for which TLD. Fetched once a
// day and kept in memory; rdap.org (a redirector) blocks server clients.
const RDAP_BOOTSTRAP = "https://data.iana.org/rdap/dns.json";
const BOOTSTRAP_TTL_MS = 24 * 60 * 60 * 1000;
let bootstrap = { at: 0, services: null };

const rdapServerFor = async (tld) => {
  if (!bootstrap.services || Date.now() - bootstrap.at > BOOTSTRAP_TTL_MS) {
    const res = await fetch(RDAP_BOOTSTRAP, { signal: AbortSignal.timeout(RDAP_TIMEOUT_MS) });
    if (!res.ok) return null;
    bootstrap = { at: Date.now(), services: (await res.json()).services ?? [] };
  }
  const entry = bootstrap.services.find(([tlds]) => tlds.includes(tld));
  return entry?.[1]?.[0] ?? null;
};

/**
 * Days since the domain was registered, from public RDAP (the successor to
 * whois). Looks up the registrable domain (last two labels; good enough for
 * .com/.io/.am, rough for .co.uk). Null when unknown (registry down, odd TLD):
 * unknown never counts against anyone.
 */
const domainAgeDays = async (host) => {
  const labels = host?.split(".") ?? [];
  if (labels.length < 2) return null;
  const domain = labels.slice(-2).join(".");
  try {
    const server = await rdapServerFor(labels.at(-1));
    if (!server) return null;
    const res = await fetch(`${server.replace(/\/$/, "")}/domain/${encodeURIComponent(domain)}`, {
      signal: AbortSignal.timeout(RDAP_TIMEOUT_MS),
      headers: { accept: "application/rdap+json" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const registered = data.events?.find((e) => e.eventAction === "registration")?.eventDate;
    const time = registered ? Date.parse(registered) : NaN;
    return Number.isFinite(time) ? Math.floor((Date.now() - time) / 86_400_000) : null;
  } catch {
    return null;
  }
};

const checkWebsite = async (website, companyName) => {
  const page = await safeFetchPage(website);
  if (!page.ok) return { live: false, mentionsName: false, error: page.error ?? `status ${page.status}` };
  const token = nameToken(companyName);
  const mentionsName = token.length >= 3 && page.text.toLowerCase().includes(token);
  return { live: true, mentionsName };
};

/**
 * The published rules, with no network involved (see the file header). Pure,
 * so every branch can be tested directly.
 */
export const decideTrust = ({ disposable, mailRecords, emailVerified, checks }) => {
  const reasons = [];
  let level;
  if (disposable) {
    level = "rejected";
    reasons.push("Throwaway email address.");
  } else if (!mailRecords) {
    level = "rejected";
    reasons.push("The email domain can't receive mail.");
  } else if (!emailVerified) {
    level = "unverified";
    reasons.push("Enter the code we emailed you.");
  } else if (checks.workEmail && checks.domainMatch && checks.websiteLive && checks.domainNotNew) {
    level = "verified";
  } else {
    level = "limited";
    if (!checks.workEmail) reasons.push("A personal email can't prove where you work.");
    else if (!checks.domainMatch) reasons.push("Your email domain doesn't match the website.");
    if (!checks.websiteLive) reasons.push("We couldn't open the website.");
    if (!checks.domainNotNew) reasons.push(`The website's domain is under ${NEW_DOMAIN_DAYS} days old.`);
  }

  return { level, reasons };
};

/**
 * @param {{ email: string, website: string, name: string }} company
 * @param {{ emailVerified: boolean }} state
 */
export const runTrustChecks = async (company, { emailVerified }) => {
  const emailDomain = emailDomainOf(company.email);
  const host = websiteHostOf(company.website);

  const disposable = isDisposableEmail(company.email);
  const freeEmail = isFreeEmail(company.email);
  // The site result depends on the name too ("does the page mention it"), so it's in the key.
  const [mailRecords, site, ageDays] = await withSlot(() =>
    Promise.all([
      disposable ? false : mxCache.wrap(emailDomain, () => checkMailRecords(emailDomain)),
      siteCache.wrap(`${company.website}|${nameToken(company.name)}`, () => checkWebsite(company.website, company.name)),
      host ? ageCache.wrap(host, () => domainAgeDays(host)) : null,
    ]),
  );

  const checks = {
    emailVerified,
    notDisposable: !disposable,
    workEmail: !freeEmail,
    mailRecords,
    domainMatch: domainsMatch(emailDomain, host),
    websiteLive: site.live,
    nameOnWebsite: site.mentionsName,
    domainAgeDays: ageDays,
    domainNotNew: ageDays === null || ageDays >= NEW_DOMAIN_DAYS,
  };

  const { level, reasons } = decideTrust({ disposable, mailRecords, emailVerified, checks });
  return { level, checks, reasons, checkedAt: new Date(), ...(site.error ? { siteError: site.error } : {}) };
};

/**
 * An admin's decision on the exceptions page beats the computed level, so a
 * re-check can't silently undo it. The computed level stays stored next to it,
 * so clearing the override falls back to what the checks say.
 *
 * `reportLimit` is set when developers reported the company's intro requests
 * (introReplyService). Below an override, it caps the level at "limited", so a
 * re-check can't lift it either. It only ever lowers "verified".
 */
export const applyOverride = (trust, override, reportLimit = null) => {
  const kept = reportLimit ? { reportLimit } : {};
  if (override) return { ...trust, ...kept, computedLevel: trust.level, level: override.level, override };
  if (reportLimit && trust.level === "verified") {
    return { ...trust, ...kept, level: "limited", reasons: [...trust.reasons, reportLimit.reason] };
  }
  return { ...trust, ...kept };
};
