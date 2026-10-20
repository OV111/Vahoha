// The client side of the session: the in-memory access token, renewing it
// from the httpOnly refresh cookie, and ending the session when renewal fails.
//
// Three layers keep a signed-in user from ever hitting a dead token:
//   1. A timer refreshes the token a minute before it expires.
//   2. Coming back to the tab (sleep, background) refreshes it if it is stale,
//      because timers do not run while a laptop sleeps.
//   3. apiFetch() catches any 401 that still slips through, refreshes once and
//      retries. If the refresh cookie is dead too, the session ends.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const REFRESH_EARLY_MS = 60 * 1000;
const RETRY_MS = 30 * 1000;
// Floor for the refresh timer, so a token that is somehow already stale on
// arrival can never turn the timer into a tight loop.
const MIN_DELAY_MS = 5 * 1000;
const LOCK_NAME = "vahoha-refresh";

let accessToken = null;
let expiresAt = null;
let refreshTimer = null;
let inFlight = null;
let onSessionEnd = () => {};
let watching = false;

export const getAccessToken = () => accessToken;

export const setAccessToken = (token) => {
  accessToken = token;
  const lifetime = tokenLifetimeMs(token);
  expiresAt = lifetime === null ? null : Date.now() + lifetime;
  scheduleRefresh();
};

export const clearAccessToken = () => {
  accessToken = null;
  expiresAt = null;
  clearTimeout(refreshTimer);
};

export const authHeaders = () => ({
  Authorization: `Bearer ${accessToken ?? ""}`,
});

/** The store registers what "session ended" means for the UI. */
export const setSessionEndHandler = (fn) => {
  onSessionEnd = fn;
};

/**
 * How long the token is valid for (exp - iat), in ms, or null if it can't be
 * read. The lifetime is counted from when we received the token, never by
 * comparing exp to this machine's clock: a user whose clock runs ahead of the
 * server would otherwise see every new token as already expired.
 */
export const tokenLifetimeMs = (token) => {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const { exp, iat } = JSON.parse(atob(payload));
    return typeof exp === "number" && typeof iat === "number" ? (exp - iat) * 1000 : null;
  } catch {
    return null;
  }
};

const isStale = () => Boolean(accessToken && expiresAt) && expiresAt - Date.now() < REFRESH_EARLY_MS;

/**
 * POST /refresh. Resolves to one of:
 *   "ok"      new access token is set
 *   "guest"   no refresh cookie (never logged in, or already logged out)
 *   "expired" cookie present but invalid, expired or already used
 *   "offline" network error, 429 or 5xx: transient, the session may be fine
 */
const requestRefresh = async () => {
  let res;
  try {
    res = await fetch(`${API_BASE_URL}/refresh`, { method: "POST", credentials: "include" });
  } catch {
    return "offline";
  }
  if (res.status === 204) {
    clearAccessToken();
    return "guest";
  }
  if (res.status === 401 || res.status === 403) {
    clearAccessToken();
    return "expired";
  }
  if (!res.ok) return "offline";
  try {
    const { accessToken: token } = await res.json();
    setAccessToken(token);
    return "ok";
  } catch {
    return "offline";
  }
};

/**
 * Refresh tokens rotate: each one works once. Two refreshes with the same
 * cookie look like token reuse, the second gets a 401 and its response clears
 * the cookie, logging the user out. So refreshes never overlap:
 *   - inside a tab, concurrent callers share one in-flight promise;
 *   - across tabs, a Web Lock runs them one after another, and the next tab
 *     sends the cookie the previous one just received.
 */
export const refreshSession = () => {
  if (!inFlight) {
    const run = () => requestRefresh();
    const locked = typeof navigator !== "undefined" && navigator.locks
      ? navigator.locks.request(LOCK_NAME, run)
      : run();
    inFlight = locked.finally(() => {
      inFlight = null;
    });
  }
  return inFlight;
};

// A result of "expired" or "guest" while we held a token means the server no
// longer knows this session.
const handleResult = (result) => {
  if (result === "expired" || result === "guest") onSessionEnd();
  return result;
};

function scheduleRefresh() {
  clearTimeout(refreshTimer);
  if (!accessToken || !expiresAt) return;
  const delay = Math.max(expiresAt - Date.now() - REFRESH_EARLY_MS, MIN_DELAY_MS);
  refreshTimer = setTimeout(runScheduledRefresh, delay);
}

async function runScheduledRefresh() {
  if (!accessToken) return;
  const result = handleResult(await refreshSession());
  // Offline: keep the token and try again shortly. A success reschedules
  // itself through setAccessToken.
  if (result === "offline" && accessToken) {
    refreshTimer = setTimeout(runScheduledRefresh, RETRY_MS);
  }
}

/** Refreshes now if the token is about to expire (or already has). */
export const ensureFreshToken = async () => {
  if (!isStale()) return;
  handleResult(await refreshSession());
};

/**
 * Watches for the moments a sleeping timer misses: the tab becoming visible
 * again and the network coming back. Browser only, started once from init.
 */
export const startSessionWatch = () => {
  if (watching || typeof window === "undefined") return;
  watching = true;
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") ensureFreshToken();
  });
  window.addEventListener("online", () => ensureFreshToken());
};

/**
 * Drop-in for fetch() on authenticated requests. Requests that carry no
 * Bearer header go straight through. Requests that do always get the current
 * token (callers often build headers from a token read earlier), and a 401 is
 * answered with one refresh and one retry.
 */
export const apiFetch = async (input, init = {}) => {
  const headers = new Headers(init.headers);
  if (!headers.get("Authorization")?.startsWith("Bearer")) return fetch(input, init);

  await ensureFreshToken();
  const send = () => {
    headers.set("Authorization", `Bearer ${accessToken ?? ""}`);
    return fetch(input, { ...init, headers });
  };

  const sentToken = accessToken;
  const res = await send();
  if (res.status !== 401 || !sentToken) return res;

  // Another request may have refreshed while this one was out.
  if (accessToken && accessToken !== sentToken) return send();

  const result = handleResult(await refreshSession());
  return result === "ok" ? send() : res;
};

