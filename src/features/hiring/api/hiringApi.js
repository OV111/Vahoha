import { API_BASE_URL, authHeaders, apiFetch } from "../../../../constants/api";

const BASE = `${API_BASE_URL}/api/hiring`;

// Errors carry the server's message and status; a network failure has no status.
async function request(path, { method = "GET", body, auth = true } = {}, fallback) {
  let res;
  try {
    const init = {
      method,
      headers: { ...(auth ? authHeaders() : {}), ...(body ? { "Content-Type": "application/json" } : {}) },
      credentials: "include",
      ...(body ? { body: JSON.stringify(body) } : {}),
    };
    res = auth ? await apiFetch(`${BASE}${path}`, init) : await fetch(`${BASE}${path}`, init);
  } catch {
    throw new Error("Couldn't reach the server. Check your connection.");
  }
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success)
    throw Object.assign(new Error(json?.message ?? fallback), { status: res.status, trustLevel: json?.trustLevel });
  return json.data;
}

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
