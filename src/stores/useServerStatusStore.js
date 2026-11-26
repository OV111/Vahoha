import { create } from "zustand";
import { setServerTroubleHandler } from "@/lib/session";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PROBE_TIMEOUT_MS = 5000;
const RETRY_BASE_MS = 3000;
const RETRY_MAX_MS = 30_000;

/** "up" | "down" | "offline" | "maintenance", from the API's own health check. */
const probe = async () => {
  if (!navigator.onLine) return "offline";
  try {
    const res = await fetch(`${API_BASE_URL}/healthz`, { cache: "no-store", signal: AbortSignal.timeout(PROBE_TIMEOUT_MS) });
    if (!res.ok) return "down";
    const body = await res.json();
    return body.maintenance ? "maintenance" : "up";
  } catch {
    return navigator.onLine ? "down" : "offline";
  }
};

/**
 * Whether the API can answer. One failed request proves nothing (an ad blocker, a
 * cancelled page), so a failure only starts a health check, and the check decides.
 * While it isn't "up" the check repeats: 3 s, 6 s, 12 s ... up to 30 s.
 */
const useServerStatusStore = create((set, get) => {
  let inFlight = null;
  let timer = null;
  let attempts = 0;

  const run = async () => {
    clearTimeout(timer);
    set({ checking: true });
    const status = await probe();
    set({ status, checking: false });
    if (status === "up") {
      attempts = 0;
      return;
    }
    timer = setTimeout(get().check, Math.min(RETRY_BASE_MS * 2 ** attempts, RETRY_MAX_MS));
    attempts += 1;
  };

  return {
    status: "up",
    checking: false,
    pageBlocked: false, // ServerDown is on screen and says it all, so the banner stays away
    setPageBlocked: (pageBlocked) => set({ pageBlocked }),
    check: () => {
      inFlight ??= run().finally(() => {
        inFlight = null;
      });
      return inFlight;
    },
  };
});

// While it is already known to be down, the repeating check is enough.
setServerTroubleHandler(() => {
  if (useServerStatusStore.getState().status === "up") useServerStatusStore.getState().check();
});

if (typeof window !== "undefined") {
  window.addEventListener("offline", () => useServerStatusStore.getState().check());
  window.addEventListener("online", () => useServerStatusStore.getState().check());
}

export default useServerStatusStore;
