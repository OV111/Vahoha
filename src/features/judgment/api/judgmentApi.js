import { API_BASE_URL, authHeaders, apiFetch } from "@/constants/api";

const BASE = `${API_BASE_URL}/api/judgment`;

async function request(path, { method = "GET", body } = {}, fallback) {
  let res;
  try {
    res = await apiFetch(`${BASE}${path}`, {
      method,
      headers: { ...authHeaders(), ...(body ? { "Content-Type": "application/json" } : {}) },
      credentials: "include",
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  } catch {
    // No status: the request never reached the server, so the same decision can be resent.
    throw new Error("Couldn't reach the server. Check your connection.");
  }
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success)
    throw Object.assign(new Error(json?.message ?? fallback), { status: res.status });
  return json.data;
}

/** { scenarios: [...], quota: { used, limit } } */
export const fetchScenarios = () => request("/scenarios", {}, "Couldn't load the simulations.");

/** Opens a run, or returns the one already open on this scenario. */
export const startRun = (scenarioId) =>
  request("/runs", { method: "POST", body: { scenarioId } }, "Couldn't start the simulation.");

export const fetchRun = (runId) => request(`/runs/${runId}`, {}, "Couldn't load this simulation.");

export const submitDecision = (runId, decision) =>
  request(`/runs/${runId}/decisions`, { method: "POST", body: decision }, "Couldn't send your decision. Try again.");
