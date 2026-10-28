import useCachedResource from "@/hooks/useCachedResource";
import { fetchReadiness } from "../masteryApi";

/** The learner's mid-level readiness, with loading/error state and a manual reload. Cached like useMastery. */
const useReadiness = () => {
  const { data, loading, error, refetch } = useCachedResource("readiness", fetchReadiness, { staleMs: 60_000 });
  return { data, loading, error, reload: refetch };
};

export default useReadiness;
