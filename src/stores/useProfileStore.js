import { create } from "zustand";
import { getAccessToken } from "@/constants/api";
import posthog, { isPostHogConfigured } from "@/lib/posthog";
import { queryCache } from "@/lib/queryCache";
import { fetchMyProfile } from "@/services/profileApi";
import { fetchUserBlogs } from "@/services/blogsApi";

const PROFILE_KEY = "profile";
const PROFILE_STALE_MS = 60_000;

const useProfileStore = create((set, get) => ({
  user: null,
  stats: null,
  blogs: [],
  isLoading: false,
  isBlogsLoading: false,
  // Skips the request if the profile is under a minute old; a call while one is
  // already out joins it. Writes mark it stale (lib/queryInvalidation.js).
  fetchProfile: async ({ force = false } = {}) => {
    const token = getAccessToken();
    if (!token) return "unauthorized";
    const hasProfile = Boolean(get().user);
    if (!force && hasProfile && queryCache.isFresh(PROFILE_KEY, PROFILE_STALE_MS)) return get().stats;
    // With a profile already showing, refresh behind it: no full-page spinner.
    if (!hasProfile) set({ isLoading: true });
    try {
      const data = await queryCache.load(PROFILE_KEY, fetchMyProfile, { staleMs: PROFILE_STALE_MS, force });
      const user = data.userWithoutPassword;
      const previousUser = get().user;
      set({ user, stats: data.stats });
      if (isPostHogConfigured && user?._id && previousUser?._id !== user._id) {
        posthog.identify(String(user._id), {
          email: user.email,
          name: [user.firstName, user.lastName].filter(Boolean).join(" "),
        });
      }
      return data.stats;
    } catch (err) {
      if (err.unauthorized) return "unauthorized";
      console.error("fetchProfile failed:", err);
    } finally {
      set({ isLoading: false });
    }
  },
  fetchUserBlogs: async (userId) => {
    if (!userId) return;
    set({ isBlogsLoading: true });
    try {
      set({ blogs: await fetchUserBlogs(userId), isBlogsLoading: false });
    } catch (err) {
      console.error("fetchUserBlogs failed:", err);
      set({ isBlogsLoading: false });
    }
  },
  updateStats: (newStats) => set((state) => ({ stats: { ...state.stats, ...newStats } })),
  updateUser: (newUser) => set((state) => ({ user: { ...state.user, ...newUser } })),
  clearProfile: () => set({ user: null, stats: null, blogs: [], isBlogsLoading: false }),
}));

export default useProfileStore;
