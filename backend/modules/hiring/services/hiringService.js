import process from "node:process";
import { ObjectId } from "mongodb";
import { signUp } from "../../auth/controllers/auth.controller.js";
import { sendHiringCodeEmail } from "../../../utils/emailService.js";
import { HttpError } from "../../../utils/httpErrors.js";
import { emailDomainOf, websiteHostOf } from "../lib/domain.js";
import { applyOverride, runTrustChecks } from "./trustEngine.js";
import { checkCode, CODE_TTL_MIN, issueCode } from "./emailCodeService.js";

/**
 * Hiring accounts: a user with role "recruiter" plus the company they belong
 * to. The company carries the trust level the engine computed; the user only
 * points at it. A normal sign-up (/get-started) can never create a recruiter:
 * the role is set here and nowhere else.
 */

const COMPANIES = "companies";

const splitName = (fullName) => {
  const parts = fullName.trim().split(/\s+/);
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") || parts[0] };
};

const sendCode = async (db, userId, email, firstName) => {
  const code = await issueCode(db, userId);
  // Local dev usually has no email provider: print the code so the flow can be tried.
  if (process.env.NODE_ENV !== "production") console.info(`[hiring] code for ${email}: ${code}`);
  try {
    await sendHiringCodeEmail(email, { code, firstName, expiresInMinutes: CODE_TTL_MIN });
  } catch (err) {
    // The account exists either way; "resend code" recovers from a failed send.
    console.error("hiring code email failed:", err.message);
  }
};

const publicCompany = (company) => ({
  id: String(company._id),
  name: company.name,
  website: company.website,
  type: company.type,
  teamSize: company.teamSize,
  trust: {
    level: company.trust.level,
    checks: company.trust.checks,
    reasons: company.trust.reasons,
    checkedAt: company.trust.checkedAt,
    ...(company.trust.override ? { note: company.trust.override.note } : {}),
  },
});

export const signUpRecruiter = async (db, body) => {
  const { orgType, companyRole, fullName, email, password, company, website, teamSize } = body;

  // Hard fails are answered before any account exists, with the reason.
  const precheck = await runTrustChecks({ email, website, name: company }, { emailVerified: false });
  if (precheck.level === "rejected") throw new HttpError(422, precheck.reasons[0]);

  const { firstName, lastName } = splitName(fullName);
  const result = await signUp(
    { firstName, lastName, email, password },
    { role: "recruiter", ...(orgType === "company" ? { companyRole } : {}) },
  );
  if (result.status !== 201) throw new HttpError(result.status ?? 500, result.message);

  const now = new Date();
  const { insertedId: companyId } = await db.collection(COMPANIES).insertOne({
    name: company,
    website,
    websiteHost: websiteHostOf(website),
    emailDomain: emailDomainOf(email),
    teamSize,
    type: orgType,
    createdBy: result.userId,
    members: [result.userId],
    trust: precheck,
    createdAt: now,
    updatedAt: now,
  });
  await db.collection("users").updateOne({ _id: result.userId }, { $set: { companyId } });
  await sendCode(db, result.userId, email, firstName);

  return {
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
    trust: { level: precheck.level, reasons: precheck.reasons },
  };
};

const loadRecruiter = async (db, userId) => {
  const user = await db.collection("users").findOne(
    { _id: new ObjectId(userId) },
    { projection: { role: 1, companyId: 1, companyRole: 1, email: 1, firstName: 1, emailVerified: 1 } },
  );
  if (user?.role !== "recruiter") throw new HttpError(404, "Not found");
  const company = user.companyId ? await db.collection(COMPANIES).findOne({ _id: user.companyId }) : null;
  if (!company) throw new HttpError(404, "Company not found");
  return { user, company };
};

const recheck = async (db, user, company) => {
  const computed = await runTrustChecks(
    { email: user.email, website: company.website, name: company.name },
    { emailVerified: user.emailVerified === true },
  );
  const trust = applyOverride(computed, company.trust?.override, company.trust?.reportLimit);
  await db.collection(COMPANIES).updateOne({ _id: company._id }, { $set: { trust, updatedAt: new Date() } });
  return { ...company, trust };
};

export const verifyRecruiterEmail = async (db, userId, code) => {
  const { user, company } = await loadRecruiter(db, userId);
  if (user.emailVerified !== true) {
    const outcome = await checkCode(db, userId, code);
    if (outcome === "wrong") throw new HttpError(400, "That code isn't right. Check the email and try again.");
    if (outcome === "expired") throw new HttpError(410, "That code has expired. Send a new one.");
    if (outcome === "locked") throw new HttpError(429, "Too many tries. Send a new code.");
    await db.collection("users").updateOne({ _id: user._id }, { $set: { emailVerified: true } });
    user.emailVerified = true;
  }
  return publicCompany(await recheck(db, user, company));
};

export const resendRecruiterCode = async (db, userId) => {
  const { user } = await loadRecruiter(db, userId);
  if (user.emailVerified === true) return { sent: false, reason: "already-verified" };
  await sendCode(db, userId, user.email, user.firstName);
  return { sent: true };
};

export const getRecruiterMe = async (db, userId) => {
  const { user, company } = await loadRecruiter(db, userId);
  return { companyRole: user.companyRole ?? null, emailVerified: user.emailVerified === true, company: publicCompany(company) };
};

/** "Run the checks again", e.g. after the website came back up. */
export const recheckRecruiterCompany = async (db, userId) => {
  const { user, company } = await loadRecruiter(db, userId);
  return publicCompany(await recheck(db, user, company));
};

/**
 * Fix the company's name or website (a typo is the usual reason for "limited"),
 * then re-check at once. Only the company's creator may edit it.
 */
export const updateRecruiterCompany = async (db, userId, { company: name, website }) => {
  const { user, company } = await loadRecruiter(db, userId);
  if (String(company.createdBy) !== String(user._id)) throw new HttpError(403, "Only the person who created this company can edit it.");
  const changes = { name, website, websiteHost: websiteHostOf(website) };
  await db.collection(COMPANIES).updateOne({ _id: company._id }, { $set: { ...changes, updatedAt: new Date() } });
  return publicCompany(await recheck(db, user, { ...company, ...changes }));
};
