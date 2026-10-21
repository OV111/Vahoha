import { API_BASE_URL, authHeaders, apiFetch } from "../../constants/api";

const BASE = `${API_BASE_URL}/api/library/admin`;

// Errors carry the HTTP status (404 = not an admin, 409 = publish refused)
// and, for a bad import file, the Zod issues.
const request = async (path, options = {}) => {
  const res = await apiFetch(`${BASE}${path}`, {
    ...options,
    headers: { ...authHeaders(), ...(options.body ? { "Content-Type": "application/json" } : {}) },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error(data?.message || "Request failed");
    err.status = res.status;
    err.issues = data?.issues ?? [];
    throw err;
  }
  return data;
};

export const libraryAdminApi = {
  digests: () => request("/digests").then((d) => d.data),
  concepts: (sourceId) => request(`/${sourceId}/concepts`).then((d) => d.data),
  setReviewed: (sourceId, conceptKey, reviewed) =>
    request(`/${sourceId}/concepts/${conceptKey}`, { method: "PATCH", body: JSON.stringify({ reviewed }) }),
  setVisibility: (sourceId, visibility) =>
    request(`/${sourceId}/visibility`, { method: "PATCH", body: JSON.stringify({ visibility }) }),
  importDigest: (data, { apply, reviewed }) =>
    request("/import", { method: "POST", body: JSON.stringify({ data, apply, reviewed }) }),
};
