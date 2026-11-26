import { create } from "zustand";
import { setAccessToken, clearAccessToken } from "@/constants/api";
import { refreshSession, withSessionLock, setSessionEndHandler, setWriteHandler, startSessionWatch } from "@/lib/session";
import { queryCache } from "@/lib/queryCache";
import { createWriteHandler } from "@/lib/queryInvalidation";
import posthog, { isPostHogConfigured } from "@/lib/posthog";
import { logOut } from "@/services/authApi";

const HINT_KEY = "hasSession";
const PENDING_LOGOUT_KEY = "pendingLogout";
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

// Set from the moment someone logs out until the server confirms it. The refresh
// cookie is httpOnly, so only the server can remove it: without this, logging out
// while the server is down would sign the person back in on the next visit.
let pendingLogout = false; // for when storage is blocked
const isLogoutPending = () => {
  try {
    return localStorage.getItem(PENDING_LOGOUT_KEY) === "1";
  } catch {
    return pendingLogout;
  }
};

const setLogoutPending = (on) => {
  pendingLogout = on;
  try {
    if (on) localStorage.setItem(PENDING_LOGOUT_KEY, "1");
    else localStorage.removeItem(PENDING_LOGOUT_KEY);
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

  // Tells the server about a logout, and keeps trying until it confirms.
  const finishLogout = async () => {
    clearTimeout(retryTimer);
    forgetSession();
    const done = await withSessionLock(async () => {
      if (!isLogoutPending()) return true; // signed in again, or another tab finished it
      try {
        return (await logOut()).ok;
      } catch {
        return false;
      }
    });
    if (get().auth) return; // signed in again meanwhile
    clearAccessToken(); // a refresh that was out when the logout started may have set one
    if (done) setLogoutPending(false);
    else retryTimer = setTimeout(retry, RETRY_MS);
  };

  // "offline" is a network failure, not "no session": keep the hint and retry quietly.
  const refresh = async () => {
    clearTimeout(retryTimer);
    if (isLogoutPending()) return finishLogout();
    const result = await refreshSession();
    // Logged out (here or in another tab) while the refresh was out.
    if (isLogoutPending()) return finishLogout();
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
      listen();
      startSessionWatch();
      set({ isLoading: true });
      await refresh();
      set({ isLoading: false });
    },

    // A returning user whose session check couldn't reach the server: try again now.
    retryNow: () => {
      if (get().sessionHint) retry();
    },

    login: (token) => {
      clearTimeout(retryTimer);
      setLogoutPending(false); // the new session's cookie replaced the old one
      setAccessToken(token);
      signIn();
      broadcast("login");
    },

    logout: async () => {
      setLogoutPending(true);
      signOut();
      broadcast("logout");
      await finishLogout();
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
