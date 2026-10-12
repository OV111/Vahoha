import { create } from "zustand";
import { API_BASE_URL, setAccessToken, clearAccessToken } from "../../constants/api";
import posthog, { isPostHogConfigured } from "../lib/posthog";

// "This browser had a session last time." Not proof of anything (the refresh
// cookie is): it only tells the UI whether to wait for the session check or
// show the guest layout straight away, so guests never see the navbar pop in.
const HINT_KEY = "hasSession";
const readHint = () => {
  try {
    return localStorage.getItem(HINT_KEY) === "1";
  } catch {
    return false;
  }
};
const writeHint = (on) => {
  try {
    if (on) localStorage.setItem(HINT_KEY, "1");
    else localStorage.removeItem(HINT_KEY);
  } catch {
    // Storage can be blocked (private mode); the hint is only an optimisation.
  }
};

const useAuthStore = create((set) => ({
  auth: false,
  isLoading: true,
  sessionHint: readHint(),
  session: 0,
  // Runs once on app load. There is no token in localStorage to check anymore —
  // the only proof of a session is the httpOnly refresh cookie, so we exchange
  // it for a fresh access token. A 401 here just means "not logged in."
  init: async () => {
    try {
      set({ isLoading: true });
      const request = await fetch(`${API_BASE_URL}/refresh`, {
        method: "POST",
        credentials: "include",
      });
      // 204 = no session cookie (a guest). It counts as `ok`, so check it
      // before reading a body that isn't there.
      if (request.status === 204 || !request.ok) {
        clearAccessToken();
        writeHint(false);
        set({ auth: false, sessionHint: false });
        return;
      }
      const response = await request.json();
      setAccessToken(response.accessToken);
      writeHint(true);
      set((state) => ({ auth: true, sessionHint: true, session: state.session + 1 }));
    } catch {
      // Network failure, not a "no session" answer: keep the hint for next load.
      clearAccessToken();
      set({ auth: false });
    } finally {
      set({ isLoading: false });
    }
  },
  login: (token) => {
    setAccessToken(token);
    writeHint(true);
    set((state) => ({ auth: true, sessionHint: true, session: state.session + 1 }));
  },
  logout: async () => {
    if (isPostHogConfigured) posthog.reset();
    clearAccessToken();
    writeHint(false);
    set({ auth: false, sessionHint: false });
    try {
      await fetch(`${API_BASE_URL}/log-out`, {
        method: "DELETE",
        credentials: "include",
      });
    } catch {
      // Best-effort — the client-side state is already cleared either way.
    }
  },
}));

export default useAuthStore;
