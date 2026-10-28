import useCachedResource from "@/hooks/useCachedResource";
import { fetchMastery } from "../masteryApi";

/**
 * The learner's mastery view, with loading/error state and a manual reload.
 * Cached for a minute and shared with anything else that reads it; a finished
 * test or challenge refreshes it (see lib/queryInvalidation.js).
 */
const useMastery = () => {
  const { data, loading, error, refetch } = useCachedResource("mastery", fetchMastery, { staleMs: 60_000 });
  return { data, loading, error, reload: refetch };
};

export default useMastery;
