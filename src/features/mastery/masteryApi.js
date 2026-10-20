import { API_BASE_URL, authHeaders, apiFetch } from "../../../constants/api";

export const fetchMastery = async () => {
  let res;
  try {
    res = await apiFetch(`${API_BASE_URL}/api/mastery`, {
      headers: authHeaders(),
      credentials: "include",
    });
  } catch {
    throw new Error("Couldn't reach the server. Check your connection.");
  }

  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) {
    throw new Error(json?.message ?? "Couldn't load your progress.");
  }
  return json.data;
};

export const fetchReadiness = async () => {
  let res;
  try {
    res = await apiFetch(`${API_BASE_URL}/api/readiness/me`, {
      headers: authHeaders(),
      credentials: "include",
    });
  } catch {
    throw new Error("Couldn't reach the server. Check your connection.");
  }

  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) {
    throw new Error(json?.message ?? "Couldn't load your readiness.");
  }
  return json.data;
};
