import { API_BASE_URL, authHeaders, apiFetch } from "../../../../constants/api";

const request = async (path, options = {}) => {
  const res = await apiFetch(`${API_BASE_URL}/my-profile/chats${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...authHeaders() },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

export const setRoomMuted = (roomId, muted) =>
  request(`/rooms/${roomId}/mute`, {
    method: "PATCH",
    body: JSON.stringify({ muted }),
  });

export const clearRoom = (roomId) =>
  request(`/rooms/${roomId}/clear`, { method: "POST" });

export const getBlockedIds = () => request("/blocks");

export const blockUser = (userId) =>
  request(`/blocks/${userId}`, { method: "PUT" });

export const unblockUser = (userId) =>
  request(`/blocks/${userId}`, { method: "DELETE" });

// Blocked people with name / username / avatar, for the Blocked users page.
export const getBlockedUserList = async () => {
  const res = await apiFetch(`${API_BASE_URL}/my-profile/blocked-users`, {
    headers: authHeaders(),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Failed to load blocked users");
  return data.users;
};

// Photo or PDF/Word file. The server tells them apart by their bytes and
// broadcasts the saved message over the websocket.
export const sendAttachment = async (roomId, file) => {
  const form = new FormData();
  form.append("file", file, file.name);
  const res = await apiFetch(`${API_BASE_URL}/my-profile/chats/rooms/${roomId}/attachment`, {
    method: "POST",
    headers: authHeaders(),
    body: form,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Couldn't send file");
  return data.message;
};

// Voice note: multipart so the browser sets the boundary itself (no manual
// Content-Type). The server broadcasts the saved message over the websocket.
export const sendVoiceMessage = async (roomId, blob, durationMs) => {
  const form = new FormData();
  form.append("durationMs", String(durationMs));
  form.append("audio", blob, "voice");
  const res = await apiFetch(`${API_BASE_URL}/my-profile/chats/rooms/${roomId}/voice`, {
    method: "POST",
    headers: authHeaders(),
    body: form,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Couldn't send voice message");
  return data.message;
};

// Message requests: a stranger's first message waits until the receiver answers.
// Returns { incoming, outgoing, accepted }; accepted are requests that became chats.
export const getChatRequests = () => request("/requests");

export const acceptChatRequest = (roomId) =>
  request(`/requests/${roomId}/accept`, { method: "POST" });

export const declineChatRequest = (roomId) =>
  request(`/requests/${roomId}/decline`, { method: "POST" });

// Who may send me a message request: "everyone" | "followers" | "nobody".
export const getMessagePolicy = () => request("/policy");

export const setMessagePolicy = (policy) =>
  request("/policy", { method: "PUT", body: JSON.stringify({ policy }) });
