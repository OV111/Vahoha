import { API_BASE_URL, authHeaders, apiFetch } from "../../../constants/api";

const BASE = `${API_BASE_URL}/api/system-maps`;

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
    throw new Error("Couldn't reach the server. Check your connection.");
  }
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) throw new Error(json?.message ?? fallback);
  return json.data;
}

/** Every comment on a team map, oldest first: [{ id, nodeId, text, author, mine, createdAt }]. */
export const fetchComments = (mapId) => request(`/${mapId}/comments`, {}, "Couldn't load the comments.");

/** @returns the new comment */
export const addComment = (mapId, nodeId, text) =>
  request(`/${mapId}/comments`, { method: "POST", body: { nodeId, text } }, "Couldn't post your comment.");

export const deleteComment = (mapId, commentId) =>
  request(`/${mapId}/comments/${commentId}`, { method: "DELETE" }, "Couldn't delete the comment.");
