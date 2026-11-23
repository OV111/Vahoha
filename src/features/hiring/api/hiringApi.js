import { API_BASE_URL, authHeaders, apiFetch } from "../../../../constants/api";

const BASE = `${API_BASE_URL}/api/hiring`;
const INTROS_BASE = `${API_BASE_URL}/api/intros`;

// Errors carry the server's message and status; a network failure has no status.
async function send(url, { method = "GET", body, auth = true } = {}, fallback) {
  let res;
  try {
    const init = {
      method,
      headers: { ...(auth ? authHeaders() : {}), ...(body ? { "Content-Type": "application/json" } : {}) },
      credentials: "include",
      ...(body ? { body: JSON.stringify(body) } : {}),
    };
    res = auth ? await apiFetch(url, init) : await fetch(url, init);
  } catch {
    throw new Error("Couldn't reach the server. Check your connection.");
  }
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success)
    throw Object.assign(new Error(json?.message ?? fallback), { status: res.status, trustLevel: json?.trustLevel });
  return json.data;
}

const request = (path, opts, fallback) => send(`${BASE}${path}`, opts, fallback);
const inboxRequest = (path, opts, fallback) => send(`${INTROS_BASE}${path}`, opts, fallback);
const statusQuery = (status) => (status ? `?status=${encodeURIComponent(status)}` : "");

/** Creates the recruiter account and company. { accessToken, trust: { level, reasons } } */
export const signUpRecruiter = (payload) =>
  request("/signup", { method: "POST", body: payload, auth: false }, "Couldn't create your hiring account.");

/** { id, name, website, type, teamSize, trust: { level, checks, reasons } } */
export const verifyRecruiterEmail = (code) =>
  request("/verify-email", { method: "POST", body: { code } }, "Couldn't check that code.");

export const resendRecruiterCode = () => request("/resend-code", { method: "POST" }, "Couldn't send a new code.");

/** { companyRole, emailVerified, company } */
export const fetchRecruiterMe = () => request("/me", {}, "Couldn't load your hiring account.");

/** Runs the trust checks again. Returns the company like verifyRecruiterEmail. */
export const recheckCompany = () => request("/recheck", { method: "POST" }, "Couldn't run the checks again.");

/** Fix the company name or website; the checks run again right away. */
export const updateCompany = (body) =>
  request("/company", { method: "PATCH", body }, "Couldn't save your company details.");

// Admin exceptions page.
export const adminListCompanies = (level = "attention") =>
  request(`/admin/companies?level=${encodeURIComponent(level)}`, {}, "Couldn't load companies.");

/** level: "limited" | "verified" | "rejected", or null to clear the override. */
export const adminOverrideCompany = (id, { level, note }) =>
  request(`/admin/companies/${id}/override`, { method: "POST", body: { level, note } }, "Couldn't save the decision.");

// The company's shortlist. Shared by teammates, never visible to other companies.
/** [{ username, name, note, savedAt, updatedAt }] */
export const fetchSaved = () => request("/saved", {}, "Couldn't load your saved candidates.");
/** { saved, note } */
export const fetchSavedStatus = (username) =>
  request(`/saved/${encodeURIComponent(username)}`, {}, "Couldn't load this candidate.");
export const saveCandidate = (username, note = "") =>
  request(`/saved/${encodeURIComponent(username)}`, { method: "PUT", body: { note } }, "Couldn't save this candidate.");
export const unsaveCandidate = (username) =>
  request(`/saved/${encodeURIComponent(username)}`, { method: "DELETE" }, "Couldn't remove this candidate.");

// Jobs (private to the company).
export const fetchJobs = (status) =>
  request(`/jobs${status ? `?status=${encodeURIComponent(status)}` : ""}`, {}, "Couldn't load your jobs.");
export const fetchJob = (id) => request(`/jobs/${id}`, {}, "Couldn't load this job.");
export const createJob = (body) => request("/jobs", { method: "POST", body }, "Couldn't create the job.");
export const updateJob = (id, body) => request(`/jobs/${id}`, { method: "PUT", body }, "Couldn't save the job.");
export const setJobStatus = (id, status) =>
  request(`/jobs/${id}/status`, { method: "POST", body: { status } }, "Couldn't change the job's status.");
export const searchLayers = (q) =>
  request(`/layers?q=${encodeURIComponent(q)}`, {}, "Couldn't search layers.");

// Intro requests, recruiter side.
/** { canSend, reason, existing, jobs: [{ id, title, level, type, workplace, match: { met, total } }] } */
export const checkIntro = (username) =>
  request(`/intros/check/${encodeURIComponent(username)}`, {}, "Couldn't check this candidate.");
export const sendIntro = ({ username, jobId, message }) =>
  request("/intros", { method: "POST", body: { username, jobId, message } }, "Couldn't send the intro request.");
export const fetchSentIntros = (status) =>
  request(`/intros${statusQuery(status)}`, {}, "Couldn't load your intro requests.");
/** { pending, accepted, declined, sentToday, dailyLimit } */
export const fetchSentIntrosSummary = () => request("/intros/summary", {}, "Couldn't load your intro requests.");
export const withdrawIntro = (id) =>
  request(`/intros/${id}/withdraw`, { method: "POST" }, "Couldn't withdraw the request.");

// Intro requests, developer side (the server refuses hiring accounts).
export const fetchInbox = (status) => inboxRequest(statusQuery(status), {}, "Couldn't load your intro requests.");
/** { pending } */
export const fetchInboxSummary = () => inboxRequest("/summary", {}, "Couldn't load your intro requests.");
/** action: "accept" | "decline" | "block" */
export const answerIntro = (id, action) =>
  inboxRequest(`/${id}/${action}`, { method: "POST" }, "Couldn't save your answer.");
export const reportIntro = (id, { reason, details }) =>
  inboxRequest(`/${id}/report`, { method: "POST", body: { reason, details } }, "Couldn't send the report.");
