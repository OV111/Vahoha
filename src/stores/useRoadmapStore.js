import { create } from "zustand";
import { API_BASE_URL, authHeaders, apiFetch } from "../../constants/api";
import useAuthStore from "./useAuthStore";
import { queryCache } from "../lib/queryCache";

// /roadmaps is public, so every server call below is guarded here — the one
// place all callers pass through — rather than only hiding buttons in the UI.
// Guests get a read-only preview: every layer locked, nothing persisted.
const isGuest = () => !useAuthStore.getState().auth;

const PROGRESS_KEY = "roadmap-progress";

// Throws on a failed request, so a failure is never cached as "no progress".
const requestProgress = async () => {
  const res = await apiFetch(`${API_BASE_URL}/api/roadmaps/progress`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error(`Progress request failed (${res.status})`);
  const { progress } = await res.json();
  return progress;
};

// Reused for 30 s, so going back to a roadmap does not ask again. Starting a
// path or saving progress marks it out of date (lib/queryInvalidation.js).
const fetchProgress = async () => {
  try {
    return await queryCache.load(PROGRESS_KEY, requestProgress, { staleMs: 30_000 });
  } catch {
    return null;
  }
};

const persistProgress = async (layerProgress, activePath) => {
  try {
    await apiFetch(`${API_BASE_URL}/api/roadmaps/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ layerProgress, activePath }),
    });
  } catch {
    // non-fatal — progress will re-sync on next load
  }
};

// Returns whether the save actually succeeded. setTrack's background call
// ignores this (that one's genuinely fire-and-forget — the track-select flow
// shouldn't block/error on it), but submitOnboarding needs it: a user who
// just answered 5 questions and hit "Start path" deserves to know if that
// was silently dropped.
const startPath = async (pathId, skillLevel) => {
  try {
    const body = { activePath: pathId };
    if (skillLevel) body.skillLevel = skillLevel;
    const res = await apiFetch(`${API_BASE_URL}/api/roadmaps/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    return false;
  }
};

const useRoadmapStore = create((set, get) => ({
  selectedCategory: null,
  selectedTrack: null,
  activeLayer: null,
  isPanelOpen: false,
  layerProgress: {},
  progressLoaded: false,

  setCategory: (category) =>
    set({
      selectedCategory: category,
      selectedTrack: null,
      activeLayer: null,
      isPanelOpen: false,
      layerProgress: {},
      progressLoaded: false,
    }),

  setTrack: async (track) => {
    set({
      selectedTrack: track,
      activeLayer: null,
      isPanelOpen: false,
      layerProgress: {},
      progressLoaded: false,
    });

    if (isGuest()) {
      set({ progressLoaded: true });
      return;
    }

    await startPath(track.id);

    const progress = await fetchProgress();
    set({
      layerProgress: progress?.layerProgress ?? {},
      progressLoaded: true,
    });
  },

  // Back to the catalog: drop the track and its progress view.
  clearTrack: () =>
    set({
      selectedTrack: null,
      activeLayer: null,
      isPanelOpen: false,
      layerProgress: {},
      progressLoaded: false,
    }),

  loadProgress: async () => {
    if (isGuest()) return set({ layerProgress: {}, progressLoaded: true });
    const progress = await fetchProgress();
    set({
      layerProgress: progress?.layerProgress ?? {},
      progressLoaded: true,
    });
  },

  // Only skillLevel has a real consumer right now (learnerContextService.js
  // feeds it into the mentor's system prompt) — the onboarding wizard's other
  // answers (goal, background, weeklyTime, about) aren't sent anywhere yet
  // because nothing downstream reads them. Re-sends activePath too since
  // startPath is an upsert either way — cheaper than adding a second route
  // for one extra field.
  submitOnboarding: async (answers) => {
    const track = get().selectedTrack;
    if (!track || isGuest()) return false;
    return startPath(track.id, answers.skillLevel);
  },

  setActiveLayer: (layer) => set({ activeLayer: layer, isPanelOpen: true }),

  closePanel: () => set({ isPanelOpen: false }),

  setLayerStatus: (layerId, status) => {
    if (isGuest()) return;
    set((state) => {
      const updated = { ...state.layerProgress, [layerId]: status };
      persistProgress(updated, state.selectedTrack?.id);
      return { layerProgress: updated };
    });
  },

  reset: () =>
    set({
      selectedCategory: null,
      selectedTrack: null,
      activeLayer: null,
      isPanelOpen: false,
      layerProgress: {},
      progressLoaded: false,
    }),
}));

// Progress belongs to whoever is signed in. Without this, a guest's locked
// preview survives login (and one user's progress survives a logout + another
// login in the same tab), since nothing else clears this store.
useAuthStore.subscribe((state, prev) => {
  if (state.auth !== prev.auth || state.session !== prev.session) {
    useRoadmapStore.getState().reset();
  }
});

export default useRoadmapStore;
