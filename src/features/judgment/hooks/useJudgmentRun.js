import { useCallback, useEffect, useRef, useState } from "react";
import { fetchRun, submitDecision } from "@/features/judgment/api/judgmentApi";

/** One run: load it, send decisions. The server owns the world; this only renders it. */
export const useJudgmentRun = (runId) => {
  const [run, setRun] = useState(null);
  const [error, setError] = useState(null);
  const [isBusy, setBusy] = useState(false);
  // A ref, not state: the double-submit guard must see the latest value inside the same tick.
  const busyRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    fetchRun(runId)
      .then((data) => !cancelled && setRun(data))
      .catch((err) => !cancelled && setError(err.message));
    return () => {
      cancelled = true;
    };
  }, [runId]);

  // Resolves true when the decision landed, so the form only clears then.
  const decide = useCallback(
    async (decision) => {
      if (busyRef.current) return false;
      busyRef.current = true;
      setBusy(true);
      setError(null);
      try {
        setRun(await submitDecision(runId, decision));
        return true;
      } catch (err) {
        setError(err.message);
        return false;
      } finally {
        busyRef.current = false;
        setBusy(false);
      }
    },
    [runId],
  );

  return { run, error, isBusy, decide };
};
