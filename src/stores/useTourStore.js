import { create } from "zustand";
import { API_BASE_URL, authHeaders, apiFetch } from "../../constants/api";
import useAuthStore from "./useAuthStore";

/**
 * Which first-visit tours the signed-in user already finished or skipped.
 * The server owns it (users.toursSeen), so it follows the account: a new
 * account always gets the tours, on any browser or device.
 *
 * `seen` is null until the first load answers. Callers must treat null as
 * "unknown, show nothing": showing a tour to someone who may already have
 * seen it is worse than showing it a moment late.
 */
const useTourStore = create((set, get) => ({
  seen: null,
  status: "idle", // idle | loading | loaded | error

  load: async () => {
    if (get().status === "loading" || get().status === "loaded") return;
    set({ status: "loading" });
    try {
      const res = await apiFetch(`${API_BASE_URL}/api/onboarding`, { headers: authHeaders() });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { seen } = await res.json();
      set({ seen, status: "loaded" });
    } catch {
      // `seen` stays null, so no tour shows; the next mount tries again.
      set({ status: "error" });
    }
  },

  // Optimistic: the tour closes immediately, and the save happens behind it.
  // If the save fails the tour simply shows again next visit; that is a
  // better failure than blocking the UI on a network call.
  markSeen: async (tourId) => {
    set((s) => ({ seen: [...new Set([...(s.seen ?? []), tourId])] }));
    try {
      await apiFetch(`${API_BASE_URL}/api/onboarding/${tourId}/seen`, {
        method: "PUT",
        headers: authHeaders(),
      });
    } catch {
      // Non-fatal, see above.
    }
  },

  reset: () => set({ seen: null, status: "idle" }),
}));

// The list belongs to whoever is signed in. Without this, one user's finished
// tours would hide the tours from the next account in the same tab.
useAuthStore.subscribe((state, prev) => {
  if (state.auth !== prev.auth || state.session !== prev.session) {
    useTourStore.getState().reset();
  }
});

export default useTourStore;
