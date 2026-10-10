import { useCallback, useEffect, useState } from "react";
import { fetchReadiness } from "../masteryApi";

/** The learner's mid-level readiness, with loading/error state and a manual reload. */
const useReadiness = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      setData(await fetchReadiness());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
};

export default useReadiness;
