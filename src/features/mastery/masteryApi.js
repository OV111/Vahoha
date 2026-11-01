import { API_BASE_URL, authHeaders, apiFetch } from "../../../constants/api";

const get = async (path, fallbackMessage) => {
  let res;
  try {
    res = await apiFetch(`${API_BASE_URL}${path}`, {
      headers: authHeaders(),
      credentials: "include",
    });
  } catch {
    throw new Error("Couldn't reach the server. Check your connection.");
  }

  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) throw new Error(json?.message ?? fallbackMessage);
  return json.data;
};

export const fetchMastery = () => get("/api/mastery", "Couldn't load your progress.");

export const fetchJourney = () => get("/api/mastery/journey", "Couldn't load your path.");

export const fetchReadiness = () => get("/api/readiness/me", "Couldn't load your readiness.");
