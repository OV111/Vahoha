import { create } from "zustand";
import { API_BASE_URL, setAccessToken, clearAccessToken } from "../../constants/api";
import { refreshSession, setSessionEndHandler, startSessionWatch } from "../lib/session";
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

// Tabs share the refresh cookie, so logging in or out in one tab applies to
// all of them. Created lazily in the browser: the prerender runs in Node,
// where an open channel would keep the process alive.
const CHANNEL_NAME = "vahoha-auth";
let channel = null;
const broadcast = (type) => channel?.postMessage(type);

const useAuthStore = create((set, get) => {
  // Clears this tab's session without calling the server.
  const dropSession = () => {
    if (isPostHogConfigured) posthog.reset();
    clearAccessToken();
    writeHint(false);
    set({ auth: false, sessionHint: false });
  };

  const listen = () => {
    if (channel || typeof BroadcastChannel === "undefined") return;
    channel = new BroadcastChannel(CHANNEL_NAME);
    channel.onmessage = ({ data }) => {
      if (data === "logout" && get().auth) dropSession();
      if (data === "login" && !get().auth) get().init();
    };
  };

  return {
    auth: false,
    isLoading: true,
    sessionHint: readHint(),
    session: 0,
    // Set when the session ends on its own (refresh cookie expired or revoked),
    // not when the user logs out. App.jsx tells the user and sends them to login.
    expiredAt: null,
    // Runs on app load. The only proof of a session is the httpOnly refresh
    // cookie, so we exchange it for a fresh access token.
    init: async () => {
      listen();
      startSessionWatch();
      set({ isLoading: true });
      const result = await refreshSession();
      if (result === "ok") {
        writeHint(true);
        set((state) => ({ auth: true, sessionHint: true, session: state.session + 1 }));
      } else if (result === "offline") {
        // Network failure, not a "no session" answer: keep the hint for next load.
        set({ auth: false });
      } else {
        writeHint(false);
        set({ auth: false, sessionHint: false });
      }
      set({ isLoading: false });
    },
    login: (token) => {
      setAccessToken(token);
      writeHint(true);
      set((state) => ({ auth: true, sessionHint: true, session: state.session + 1 }));
      broadcast("login");
    },
    logout: async () => {
      dropSession();
      broadcast("logout");
      try {
        await fetch(`${API_BASE_URL}/log-out`, {
          method: "DELETE",
          credentials: "include",
        });
      } catch {
        // Best-effort — the client-side state is already cleared either way.
      }
    },
    // The refresh cookie is dead, so there is nothing to revoke on the server.
    // Several failing requests can land here at once; only the first counts.
    expire: () => {
      if (!get().auth) return;
      dropSession();
      broadcast("logout");
      set({ expiredAt: Date.now() });
    },
  };
});

setSessionEndHandler(() => useAuthStore.getState().expire());

export default useAuthStore;
