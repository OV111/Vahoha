import { API_BASE_URL, authHeaders, apiFetch } from "../../constants/api";

// GitHub sign-in and account linking are full-page redirects; the server reads the refresh cookie.
export const GITHUB_AUTH_URL = `${API_BASE_URL}/auth/github`;
export const GITHUB_LINK_URL = `${API_BASE_URL}/auth/github/link`;

// Failed requests throw with the server's message and the HTTP status; network errors have no status.
const postAuth = async (path, body) => {
  const res = await fetch(`${API_BASE_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message ?? "");
    err.status = res.status;
    throw err;
  }
  return data;
};

export const signUp = (payload) => postAuth("get-started", payload);

export const logIn = (credentials) => postAuth("login", credentials);

export const googleAuth = (tokenId) => postAuth("google/auth", { tokenId });

export const logOut = () =>
  fetch(`${API_BASE_URL}/log-out`, { method: "DELETE", credentials: "include" });

export const disconnectGitHub = async () => {
  const res = await apiFetch(`${API_BASE_URL}/auth/github/disconnect`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to disconnect GitHub");
};

export const requestPasswordReset = async (email) => {
  const res = await fetch(`${API_BASE_URL}/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res;
};

export const confirmPasswordReset = async (token, newPassword) => {
  const res = await fetch(`${API_BASE_URL}/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword }),
  });
  return res;
};
