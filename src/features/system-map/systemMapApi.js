import { API_BASE_URL, authHeaders, apiFetch } from "../../../constants/api";

const BASE = `${API_BASE_URL}/api/system-maps`;

async function request(path, { method = "GET", body, auth = true } = {}) {
  let res;
  try {
    res = await apiFetch(`${BASE}${path}`, {
      method,
      headers: { ...(auth ? authHeaders() : {}), ...(body ? { "Content-Type": "application/json" } : {}) },
      credentials: "include",
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  } catch {
    throw new Error("Couldn't reach the server. Check your connection.");
  }
  return { res, json: await res.json().catch(() => null) };
}

const data = ({ res, json }, fallback) => {
  if (!res.ok || !json?.success) throw new Error(json?.message ?? fallback);
  return json.data;
};

export const fetchMyMaps = async () => data(await request("/mine"), "Couldn't load your maps.");

export const fetchMap = async (id) => data(await request(`/${id}`), "Couldn't load your map.");

/** @param {{ title: string, graph: object }} map */
export const createMap = async (map) => data(await request("", { method: "POST", body: map }), "Couldn't save your map.");

/**
 * Saves a map. A stale `revision` is not an error here: it comes back as
 * { conflict: serverMap } so the page can tell the learner instead of failing.
 * @returns {Promise<{ map: object } | { conflict: object }>}
 */
export async function saveMap(id, { graph, revision }) {
  const result = await request(`/${id}`, { method: "PUT", body: { graph, revision } });
  if (result.res.status === 409 && result.json?.code === "conflict") return { conflict: result.json.data };
  return { map: data(result, "Couldn't save your map.") };
}

const ownerPath = (ownerType, ownerId) => `/for/${encodeURIComponent(ownerType)}/${encodeURIComponent(ownerId)}`;

/**
 * The map that belongs to a capstone or a team, or null when it has none yet.
 * A learner who isn't eligible gets the server's reason as the error message.
 */
export const fetchOwnerMap = async (ownerType, ownerId) =>
  data(await request(ownerPath(ownerType, ownerId)), "Couldn't load this map.");

/**
 * Creates the capstone or team map. Two members opening it at once is not an
 * error: the loser gets the map that already exists (409 "exists").
 * @param {{ title: string, graph: object }} map
 */
export async function createOwnerMap(ownerType, ownerId, map) {
  const result = await request(ownerPath(ownerType, ownerId), { method: "POST", body: map });
  if (result.res.status === 409 && result.json?.code === "exists") return result.json.data;
  return data(result, "Couldn't create this map.");
}

/** Turns the public link on (always a fresh link) or off. Returns the updated map. */
export const setSharing = async (id, shared) =>
  data(await request(`/${id}/sharing`, { method: "PUT", body: { shared } }), "Couldn't change sharing.");

/** A shared map for anyone with the link. No login, so no Authorization header. */
export async function fetchPublicMap(publicId) {
  const result = await request(`/public/${encodeURIComponent(publicId)}`, { auth: false });
  if (result.res.status === 404) throw new Error("This map isn't shared, or the link has changed.");
  return data(result, "Couldn't load this map.");
}

/**
 * Reads a public GitHub repo and suggests the parts and wires it proves.
 * Nothing is saved: the learner picks what goes on the map.
 * @returns {Promise<{ repo: { fullName, sha, htmlUrl }, parts: object[], wires: object[], ai: boolean }>}
 */
export const scanRepo = async (repoUrl, lens) =>
  data(await request("/scan", { method: "POST", body: { repoUrl, ...(lens ? { lens } : {}) } }), "Couldn't read that repo.");
