import { API_BASE_URL, authHeaders, apiFetch } from "../../constants/api";

export const getMentorUsage = async (days = 30) => {
  const res = await apiFetch(`${API_BASE_URL}/api/mentor/usage?days=${days}`, {
    headers: { "Content-Type": "application/json", ...authHeaders() },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};
