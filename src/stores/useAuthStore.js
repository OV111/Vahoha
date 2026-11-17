import { create } from "zustand";
import { setAccessToken, clearAccessToken } from "../../constants/api";
import { refreshSession, setSessionEndHandler, setWriteHandler, startSessionWatch } from "../lib/session";
import { queryCache } from "../lib/queryCache";
import { createWriteHandler } from "../lib/queryInvalidation";
import posthog, { isPostHogConfigured } from "../lib/posthog";
import { logOut } from "../services/authApi";

const HINT_KEY = "hasSession";
const CHANNEL_NAME = "vahoha-auth";
const RETRY_MS = 5000;

// Only a UI hint (the refresh cookie is the real proof): lets returning users skip the guest layout flash.
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
    // Storage can be blocked in private mode.
  }
};

// Opened lazily: in the Node prerender an open channel keeps the process alive.
let channel = null;
const broadcast = (type) => channel?.postMessage(type);

const useAuthStore = create((set, get) => {
  let retryTimer = null;

  const signIn = () => {
    writeHint(true);
    set((state) => ({ auth: true, sessionHint: true, session: state.session + 1 }));
  };

  const signOut = () => {
    if (isPostHogConfigured) posthog.reset();
    clearAccessToken();
    writeHint(false);
    set({ auth: false, sessionHint: false });
  };

  const forgetSession = () => {
    writeHint(false);
    set({ auth: false, sessionHint: false });
  };

  // "offline" is a network failure, not "no session": keep the hint and retry quietly.
  const refresh = async () => {
    const result = await refreshSession();
    if (result === "ok") signIn();
    else if (result === "offline") retryTimer = setTimeout(retry, RETRY_MS);
    else forgetSession();
  };

  const retry = () => {
    if (!get().auth) refresh();
  };

  const listen = () => {
    if (channel || typeof BroadcastChannel === "undefined") return;
    channel = new BroadcastChannel(CHANNEL_NAME);
    channel.onmessage = ({ data }) => {
      if (data === "logout" && get().auth) signOut();
      if (data === "login" && !get().auth) get().init();
    };
  };

  return {
    auth: false,
    isLoading: true,
    sessionHint: readHint(),
    session: 0,
    expiredAt: null,

    init: async () => {
      clearTimeout(retryTimer);
      listen();
      startSessionWatch();
      set({ isLoading: true });
      await refresh();
      set({ isLoading: false });
    },

    login: (token) => {
      setAccessToken(token);
      signIn();
      broadcast("login");
    },

    logout: async () => {
      signOut();
      broadcast("logout");
      try {
        await logOut();
      } catch {
        // Best effort: the client is already signed out.
      }
    },

    // Refresh cookie expired or revoked. Several failing requests can land here; only the first counts.
    expire: () => {
      if (!get().auth) return;
      signOut();
      broadcast("logout");
      set({ expiredAt: Date.now() });
    },
  };
});

setSessionEndHandler(() => useAuthStore.getState().expire());

// Cached reads belong to the signed-in user; clear them when the user changes.
useAuthStore.subscribe((state, prev) => {
  if (state.auth !== prev.auth || state.session !== prev.session) queryCache.clear();
});

setWriteHandler(createWriteHandler(queryCache));

export default useAuthStore;
