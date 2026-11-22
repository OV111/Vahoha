import { setRefreshCookie } from "../../auth/controllers/auth.controller.js";
import { dbOf, respond } from "../../../utils/respond.js";
import {
  getRecruiterMe,
  recheckRecruiterCompany,
  resendRecruiterCode,
  signUpRecruiter,
  updateRecruiterCompany,
  verifyRecruiterEmail,
} from "../services/hiringService.js";
import { listCompanies, overrideCompany } from "../services/adminService.js";
import { getSavedStatus, listSaved, saveCandidate, unsaveCandidate } from "../services/savedService.js";
import { checkIntro, companyIntroSummary, listCompanyIntros, sendIntro, withdrawIntro } from "../services/introService.js";
import { createJob, getJobPublic, listJobs, searchLayers, setJobStatus, updateJob } from "../services/jobService.js";

const uid = (req) => req.user._id.toString();

// The refresh token leaves only as the httpOnly cookie, never in the body.
export const signup = async (req, res, next) => {
  try {
    const { refreshToken, ...data } = await signUpRecruiter(dbOf(req), req.body);
    setRefreshCookie(res, refreshToken);
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const verifyEmail = respond((req) => verifyRecruiterEmail(dbOf(req), uid(req), req.body.code));
export const resendCode = respond((req) => resendRecruiterCode(dbOf(req), uid(req)));
export const me = respond((req) => getRecruiterMe(dbOf(req), uid(req)));
export const recheck = respond((req) => recheckRecruiterCompany(dbOf(req), uid(req)));
export const updateCompany = respond((req) => updateRecruiterCompany(dbOf(req), uid(req), req.body));

// Shortlist: always scoped to the recruiter's company (req.recruiter from requireRecruiter).
const company = (req) => req.recruiter.companyId;
export const savedList = respond((req) => listSaved(dbOf(req), company(req)));
export const savedStatus = respond((req) => getSavedStatus(dbOf(req), company(req), req.params.username));
export const savedPut = respond((req) =>
  saveCandidate(dbOf(req), company(req), req.user._id, req.params.username, req.body.note),
);
export const savedDelete = respond((req) => unsaveCandidate(dbOf(req), company(req), req.params.username));

export const jobsList = respond((req) => listJobs(dbOf(req), company(req), req.query));
export const jobGet = respond((req) => getJobPublic(dbOf(req), company(req), req.params.id));
export const jobCreate = respond((req) => createJob(dbOf(req), company(req), req.user._id, req.body), { status: 201 });
export const jobUpdate = respond((req) => updateJob(dbOf(req), company(req), req.params.id, req.body));
export const jobStatus = respond((req) => setJobStatus(dbOf(req), company(req), req.params.id, req.body.status));
export const layerSearch = respond((req) => searchLayers(dbOf(req), req.query.q));

export const introCheck = respond((req) => checkIntro(dbOf(req), company(req), req.params.username));
export const introSend = respond((req) => sendIntro(dbOf(req), company(req), req.user._id, req.body), { status: 201 });
export const introList = respond((req) => listCompanyIntros(dbOf(req), company(req), req.query));
export const introSummary = respond((req) => companyIntroSummary(dbOf(req), company(req)));
export const introWithdraw = respond((req) => withdrawIntro(dbOf(req), company(req), req.params.id));

export const adminList = respond((req) => listCompanies(dbOf(req), req.query));
export const adminOverride = respond((req) => overrideCompany(dbOf(req), uid(req), req.params.id, req.body));
