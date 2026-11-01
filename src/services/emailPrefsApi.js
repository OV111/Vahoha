import { API_BASE_URL, authHeaders, apiFetch } from "../../constants/api";

const request = async (path, options = {}) => {
  const res = await apiFetch(`${API_BASE_URL}/api/email${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...authHeaders(), ...options.headers },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

export const getEmailPrefs = () => request("/preferences");

export const setEmailPrefs = (prefs) =>
  request("/preferences", { method: "PUT", body: JSON.stringify(prefs) });

// No sign-in needed: the token in the email link is the proof.
export const unsubscribeWithToken = (token) =>
  request(`/unsubscribe?token=${encodeURIComponent(token)}`, { method: "POST", body: "{}" });
