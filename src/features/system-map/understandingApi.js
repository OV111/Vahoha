import { API_BASE_URL, authHeaders, apiFetch } from "../../../constants/api";

// The "can you explain your system?" check on a Project Map: the server asks
// questions about the learner's own map, then grades the answers.

const BASE = `${API_BASE_URL}/api/system-maps`;

async function post(path, body) {
  let res;
  try {
    res = await apiFetch(`${BASE}${path}`, {
      method: "POST",
      headers: { ...authHeaders(), ...(body ? { "Content-Type": "application/json" } : {}) },
      credentials: "include",
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  } catch {
    throw new Error("Couldn't reach the server. Check your connection.");
  }
  return { res, json: await res.json().catch(() => null) };
}

// The status rides on the error, so the card can tell "try again" (503) from
// "these questions are done" (409).
const data = ({ res, json }, fallback) => {
  if (res.ok && json?.success) return json.data;
  const err = new Error(json?.message ?? fallback);
  err.status = res.status;
  throw err;
};

/** @returns {Promise<{ checkId: string, questions: { id: string, q: string, focus: string[] }[] }>} */
export const startCheck = async (mapId) =>
  data(await post(`/${mapId}/questions`), "Couldn't write questions for your map. Try again.");

/**
 * @param {{ id: string, text: string }[]} answers
 * @returns {Promise<{ results: { id: string, score: 0 | 1 | 2, feedback: string, missed: string[], modelAnswer: string }[], passed: boolean }>}
 */
export const submitAnswers = async (checkId, answers) =>
  data(await post(`/checks/${checkId}/answers`, { answers }), "Couldn't grade your answers. Try again.");
