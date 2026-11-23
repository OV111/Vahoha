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

export const createMap = async (map) => data(await request("", { method: "POST", body: map }), "Couldn't save your map.");

export async function saveMap(id, { graph, revision }) {
  const result = await request(`/${id}`, { method: "PUT", body: { graph, revision } });
  if (result.res.status === 409 && result.json?.code === "conflict") return { conflict: result.json.data };
  return { map: data(result, "Couldn't save your map.") };
}

const ownerPath = (ownerType, ownerId) => `/for/${encodeURIComponent(ownerType)}/${encodeURIComponent(ownerId)}`;

export const fetchOwnerMap = async (ownerType, ownerId) =>
  data(await request(ownerPath(ownerType, ownerId)), "Couldn't load this map.");

export async function createOwnerMap(ownerType, ownerId, map) {
  const result = await request(ownerPath(ownerType, ownerId), { method: "POST", body: map });
  if (result.res.status === 409 && result.json?.code === "exists") return result.json.data;
  return data(result, "Couldn't create this map.");
}

export const setSharing = async (id, shared) =>
  data(await request(`/${id}/sharing`, { method: "PUT", body: { shared } }), "Couldn't change sharing.");

export async function fetchPublicMap(publicId) {
  const result = await request(`/public/${encodeURIComponent(publicId)}`, { auth: false });
  if (result.res.status === 404) throw new Error("This map isn't shared, or the link has changed.");
  return data(result, "Couldn't load this map.");
}

export const scanRepo = async (repoUrl, lens) =>
  data(await request("/scan", { method: "POST", body: { repoUrl, ...(lens ? { lens } : {}) } }), "Couldn't read that repo.");

export async function saveOps(id, { revision, ops, reason }) {
  const result = await request(`/${id}/ops`, { method: "PATCH", body: { revision, ops, ...(reason ? { reason } : {}) } });
  if (result.res.status === 409 && result.json?.code === "conflict") return { conflict: result.json.data };
  return { map: data(result, "Couldn't save your map.") };
}

export const fetchVersions = async (id) => data(await request(`/${id}/versions`), "Couldn't load this map's history.");

export const fetchVersion = async (id, versionId) =>
  data(await request(`/${id}/versions/${versionId}`), "Couldn't load that version.");
