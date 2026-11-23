import { API_BASE_URL, authHeaders, apiFetch } from "../../../constants/api";

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

const data = ({ res, json }, fallback) => {
  if (res.ok && json?.success) return json.data;
  const err = new Error(json?.message ?? fallback);
  err.status = res.status;
  throw err;
};

export const startCheck = async (mapId) =>
  data(await post(`/${mapId}/questions`), "Couldn't write questions for your map. Try again.");

export const submitAnswers = async (checkId, answers) =>
  data(await post(`/checks/${checkId}/answers`, { answers }), "Couldn't grade your answers. Try again.");
