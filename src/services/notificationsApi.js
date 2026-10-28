import { API_BASE_URL, authHeaders, apiFetch } from "../../constants/api";
import { queryCache } from "@/lib/queryCache";

const NOTIFICATIONS_KEY = "notifications";
const NOTIFICATIONS_STALE_MS = 30_000;

// Throws on a failed request, so a failure is never cached as an empty inbox.
const fetchNotifications = async () => {
  const request = await apiFetch(`${API_BASE_URL}/my-profile/notifications`, {
    method: "GET",
    headers: authHeaders(),
  });
  if (!request.ok) throw new Error(`Notifications request failed (${request.status})`);
  return request.json();
};

/**
 * The inbox: from the cache when it is under 30 s old (the app loads it at
 * login, so opening the page right after does not ask again), otherwise from
 * the server. `force` always asks. Null when the request fails.
 */
export const getNotifications = async ({ force = false } = {}) => {
  try {
    return await queryCache.load(NOTIFICATIONS_KEY, fetchNotifications, { staleMs: NOTIFICATIONS_STALE_MS, force });
  } catch (err) {
    console.error("getNotifications failed:", err);
    return null;
  }
};

// Writes throw on failure so the page can roll back its optimistic update.
const write = async (path, method) => {
  const res = await apiFetch(`${API_BASE_URL}/my-profile/notifications${path}`, {
    method,
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Notification update failed");
};

export const markNotificationRead = (id) =>
  write(`/${encodeURIComponent(id)}/read`, "PATCH");
export const markAllNotificationsRead = () => write("/read-all", "PATCH");
export const deleteNotification = (id) =>
  write(`/${encodeURIComponent(id)}`, "DELETE");
