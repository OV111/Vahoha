import { API_BASE_URL, authHeaders, apiFetch } from "../../../constants/api";

/**
 * Thin client for /api/recruiter. Resolves to the response's `data` or throws
 * an Error with the server's message plus `status`, so the UI can tell
 * "not found" from "offline".
 */
const request = async (path, { method = "GET", body, auth = true } = {}) => {
  let res;
  try {
    res = await apiFetch(`${API_BASE_URL}/api/recruiter${path}`, {
      method,
      headers: {
        ...(auth ? authHeaders() : {}),
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      credentials: auth ? "include" : "omit",
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw Object.assign(
      new Error("Couldn't reach the server. Check your connection."),
      { status: 0 },
    );
  }

  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) {
    throw Object.assign(
      new Error(json?.message ?? "Something went wrong. Try again."),
      { status: res.status },
    );
  }
  return json.data;
};

export const recruiterApi = {
  // Public: a recruiter opens the link with no account.
  scorecard: (username) =>
    request(`/scorecards/${encodeURIComponent(username)}`, { auth: false }),
  // Signed in. `query` is the page's own query string (see useCandidates).
  candidates: (query = "") => request(`/candidates${query ? `?${query}` : ""}`),
  getSettings: () => request("/settings"),
  saveSettings: (settings) =>
    request("/settings", { method: "PUT", body: settings }),
};
