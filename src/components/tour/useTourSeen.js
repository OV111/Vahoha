import { useCallback, useEffect } from "react";
import useAuthStore from "@/stores/useAuthStore";
import useTourStore from "@/stores/useTourStore";

/**
 * Whether the signed-in user already finished or skipped the tour `tourId`
 * (one of the ids in backend/modules/onboarding/schemas/onboarding.schemas.js).
 * The list lives on the account, not in this browser.
 *
 * Reports `seen = true` while it is unknown (not signed in, still loading, or
 * the load failed), so a tour never flashes up for someone who has seen it.
 */
export default function useTourSeen(tourId) {
  const auth = useAuthStore((s) => s.auth);
  // `session` changes when a session is established, which resets the store,
  // so the list is fetched again for whoever is signed in now.
  const session = useAuthStore((s) => s.session);
  const seenList = useTourStore((s) => s.seen);
  const load = useTourStore((s) => s.load);
  const markSeenInStore = useTourStore((s) => s.markSeen);

  useEffect(() => {
    if (auth) load();
  }, [auth, session, load]);

  const seen = !auth || seenList === null || seenList.includes(tourId);
  const markSeen = useCallback(() => markSeenInStore(tourId), [markSeenInStore, tourId]);

  return [seen, markSeen];
}
