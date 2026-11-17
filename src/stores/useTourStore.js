import { create } from "zustand";
import useAuthStore from "./useAuthStore";
import { fetchSeenTours, markTourSeen } from "../services/tourApi";

const INITIAL_STATE = { seen: null, status: "idle" };

// Tours the user finished or skipped, stored on the account (users.toursSeen).
// `seen` is null until loaded: callers show no tour while it is unknown.
const useTourStore = create((set, get) => ({
  ...INITIAL_STATE,

  load: async () => {
    const { status } = get();
    if (status === "loading" || status === "loaded") return;
    set({ status: "loading" });
    try {
      set({ seen: await fetchSeenTours(), status: "loaded" });
    } catch {
      set({ status: "error" });
    }
  },

  // Optimistic: the tour closes now; if the save fails it simply shows again next visit.
  markSeen: (tourId) => {
    set((s) => ({ seen: [...new Set([...(s.seen ?? []), tourId])] }));
    markTourSeen(tourId).catch(() => {});
  },

  reset: () => set(INITIAL_STATE),
}));

// The list belongs to the signed-in user; drop it when the user changes.
useAuthStore.subscribe((state, prev) => {
  if (state.auth !== prev.auth || state.session !== prev.session) {
    useTourStore.getState().reset();
  }
});

export default useTourStore;
