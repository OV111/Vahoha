export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// The access token lives in memory only (never localStorage), so injected
// scripts cannot read it. src/lib/session.js owns it: refreshing it before it
// expires, retrying 401s, and ending the session when the refresh cookie dies.
export {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
  authHeaders,
  apiFetch,
} from "../src/lib/session.js";
