import { API_BASE_URL, authHeaders, apiFetch } from "@/constants/api";

export const fetchSeenTours = async () => {
  const res = await apiFetch(`${API_BASE_URL}/api/onboarding`, { headers: authHeaders() });
  if (!res.ok) throw new Error(`Failed to load tours (${res.status})`);
  const { seen } = await res.json();
  return seen;
};

export const markTourSeen = (tourId) =>
  apiFetch(`${API_BASE_URL}/api/onboarding/${encodeURIComponent(tourId)}/seen`, {
    method: "PUT",
    headers: authHeaders(),
  });
