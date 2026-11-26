import { create } from "zustand";
import useAuthStore from "@/stores/useAuthStore";
import { queryCache } from "@/lib/queryCache";
import { fetchRoadmapProgress, saveRoadmapProgress, startRoadmapPath } from "@/services/roadmapApi";

const PROGRESS_KEY = "roadmap-progress";
const PROGRESS_STALE_MS = 30_000;

const TRACK_STATE = {
  selectedTrack: null,
  activeLayer: null,
  isPanelOpen: false,
  layerProgress: {},
  progressLoaded: false,
};

const INITIAL_STATE = { selectedCategory: null, ...TRACK_STATE };

// /roadmaps is public, so guests are blocked here rather than only in the UI.
const isGuest = () => !useAuthStore.getState().auth;

const fetchLayerProgress = async () => {
  try {
    const progress = await queryCache.load(PROGRESS_KEY, fetchRoadmapProgress, { staleMs: PROGRESS_STALE_MS });
    return progress?.layerProgress ?? {};
  } catch {
    return {};
  }
};

const startPath = async (activePath, setup) => {
  try {
    await startRoadmapPath(activePath, setup);
    return true;
  } catch {
    return false;
  }
};

const useRoadmapStore = create((set, get) => ({
  ...INITIAL_STATE,

  setCategory: (category) => set({ ...TRACK_STATE, selectedCategory: category }),

  setTrack: async (track) => {
    set({ ...TRACK_STATE, selectedTrack: track });
    if (isGuest()) return set({ progressLoaded: true });

    await startPath(track.id);
    set({ layerProgress: await fetchLayerProgress(), progressLoaded: true });
  },

  // The answers are saved on the learner's progress and read by the mentor.
  submitOnboarding: async ({ skillLevel, goal, background, weeklyTime, about }) => {
    const track = get().selectedTrack;
    if (!track || isGuest()) return false;
    return startPath(track.id, { skillLevel, goal, background, weeklyTime, about });
  },

  setActiveLayer: (layer) => set({ activeLayer: layer, isPanelOpen: true }),

  closePanel: () => set({ isPanelOpen: false }),

  setLayerStatus: (layerId, status) => {
    if (isGuest()) return;
    const { layerProgress, selectedTrack } = get();
    const updated = { ...layerProgress, [layerId]: status };
    set({ layerProgress: updated });
    saveRoadmapProgress(updated, selectedTrack?.id).catch(() => {});
  },

  reset: () => set(INITIAL_STATE),
}));

// Progress belongs to the signed-in user; drop it when the user changes.
useAuthStore.subscribe((state, prev) => {
  if (state.auth !== prev.auth || state.session !== prev.session) {
    useRoadmapStore.getState().reset();
  }
});

export default useRoadmapStore;
