/**
 * Email domains the hiring trust engine treats specially. ONE source: the
 * backend checks with them (backend/modules/hiring) and the sign-up form warns
 * with them (src/features/hiring), so the two can't disagree.
 */

// Personal mail hosts: allowed, but they prove nothing about a company.
export const FREE_EMAIL_DOMAINS = Object.freeze([
  "gmail.com", "googlemail.com", "yahoo.com", "outlook.com", "hotmail.com", "live.com",
  "icloud.com", "me.com", "aol.com", "proton.me", "protonmail.com", "mail.ru", "yandex.ru",
  "yandex.com", "gmx.com", "gmx.de", "zoho.com", "msn.com",
]);

// Throwaway inboxes: a hard fail, nobody hires from one. Not exhaustive; the
// other checks (mail records, domain match, website) catch most of the rest.
export const DISPOSABLE_EMAIL_DOMAINS = Object.freeze([
  "mailinator.com", "guerrillamail.com", "10minutemail.com", "tempmail.com", "temp-mail.org",
  "yopmail.com", "trashmail.com", "getnada.com", "sharklasers.com", "dispostable.com",
  "maildrop.cc", "throwawaymail.com", "fakeinbox.com", "mintemail.com", "emailondeck.com",
]);

export const emailDomainOf = (email = "") => String(email).split("@")[1]?.trim().toLowerCase() ?? "";
export const isFreeEmail = (email) => FREE_EMAIL_DOMAINS.includes(emailDomainOf(email));
export const isDisposableEmail = (email) => DISPOSABLE_EMAIL_DOMAINS.includes(emailDomainOf(email));
