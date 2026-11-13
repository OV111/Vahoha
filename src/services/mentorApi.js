import { API_BASE_URL, authHeaders, apiFetch } from "../../constants/api";
import { SESSIONS_PAGE_SIZE } from "../../constants/mentor";

const MENTOR_URL = `${API_BASE_URL}/api/mentor`;

// Only bodies need Content-Type; plain GET and DELETE calls send just the token.
const jsonHeaders = () => ({ "Content-Type": "application/json", ...authHeaders() });

// One failure path for every call: a non-2xx answer throws, so callers handle
// errors in a single catch instead of checking `res.ok` each time.
const request = async (url, { method = "GET", json } = {}) => {
  const res = await apiFetch(url, {
    method,
    headers: json === undefined ? authHeaders() : jsonHeaders(),
    ...(json !== undefined && { body: JSON.stringify(json) }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res;
};

/** One page of chats. `params`: `before` (cursor), `q` (title search), `challenge: "true"`. */
export const listSessions = async (params = {}) => {
  const qs = new URLSearchParams({ limit: String(SESSIONS_PAGE_SIZE), ...params });
  return (await request(`${MENTOR_URL}/sessions?${qs}`)).json();
};

export const getSession = async (sessionId) => (await request(`${MENTOR_URL}/sessions/${sessionId}`)).json();

export const createSession = async (title) =>
  (await request(`${MENTOR_URL}/sessions`, { method: "POST", json: { title } })).json();

/** `patch` is `{ title }` and/or `{ pinned }`. */
export const updateSession = async (sessionId, patch) => {
  await request(`${MENTOR_URL}/sessions/${sessionId}`, { method: "PATCH", json: patch });
};

export const deleteSession = async (sessionId) => {
  await request(`${MENTOR_URL}/sessions/${sessionId}`, { method: "DELETE" });
};

export const deleteAllSessions = async ({ keepPinned = false } = {}) => {
  await request(`${MENTOR_URL}/sessions${keepPinned ? "?keepPinned=true" : ""}`, { method: "DELETE" });
};

/** What the `/context` command shows: model, limits, tools and today's usage. */
export const getMentorContext = async () => (await request(`${MENTOR_URL}/context`)).json();

/** Messages and tokens over the last `days` (1 to 90), for the Mentor usage view. */
export const getMentorUsage = async (days = 30) => (await request(`${MENTOR_URL}/usage?days=${days}`)).json();

/**
 * Grade a teach-back explanation. It lives on the exams API but is only used from
 * the mentor chat. Unlike the calls above it reads the error text from the body,
 * because the grader explains why an answer was refused.
 */
export const submitTeachBack = async (body, { followUp = false } = {}) => {
  const res = await apiFetch(
    `${API_BASE_URL}/api/exams/submit-teach-back${followUp ? "-followup" : ""}`,
    { method: "POST", headers: jsonHeaders(), body: JSON.stringify(body) },
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `HTTP ${res.status}`);
  return data;
};
