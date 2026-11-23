import { create } from "zustand";
import { fetchInboxSummary } from "@/features/hiring/api/hiringApi";

// The developer's count of unanswered intro requests, for the profile sidebar
// badge. The inbox page updates it as the developer answers.
const useIntroStore = create((set) => ({
  pending: 0,
  loadPending: async () => {
    try {
      const { pending } = await fetchInboxSummary();
      set({ pending });
    } catch {
      // A badge isn't worth an error toast; it stays at the last known count.
    }
  },
  setPending: (pending) => set({ pending }),
}));

export default useIntroStore;
