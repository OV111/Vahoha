import { API_BASE_URL, authHeaders, apiFetch } from "../../../constants/api";

const BASE = `${API_BASE_URL}/api/system-maps`;

/** Marks a map's drift hints as reviewed. Throws an Error with a plain-words message. */
export async function dismissDrift(mapId) {
  let res;
  try {
    res = await apiFetch(`${BASE}/${mapId}/drift/dismiss`, {
      method: "POST",
      headers: authHeaders(),
      credentials: "include",
    });
  } catch {
    throw new Error("Couldn't reach the server. Check your connection.");
  }
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) throw new Error(json?.message ?? "Couldn't mark this as reviewed.");
}
