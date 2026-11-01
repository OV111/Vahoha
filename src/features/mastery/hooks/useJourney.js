import useCachedResource from "@/hooks/useCachedResource";
import { fetchJourney } from "../masteryApi";

/** Path position, streak, XP and this week. Cached like useMastery; refreshed by lib/queryInvalidation.js. */
const useJourney = () => {
  const { data, loading, error, refetch } = useCachedResource("journey", fetchJourney, { staleMs: 60_000 });
  return { data, loading, error, reload: refetch };
};

export default useJourney;
