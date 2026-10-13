import { useEffect, useState } from "react";

/**
 * Seconds remaining until `deadlineAt` (ISO string). Derived from the server's
 * absolute deadline, never from a client-only timer, so a refresh or reconnect
 * cannot give the learner extra time.
 */
export const useCountdown = (deadlineAt) => {
  const compute = () =>
    deadlineAt ? Math.max(0, Math.ceil((new Date(deadlineAt) - Date.now()) / 1000)) : 0;

  const [secondsLeft, setSecondsLeft] = useState(compute);

  useEffect(() => {
    setSecondsLeft(compute()); // resync when the deadline prop changes
    if (!deadlineAt) return undefined;
    const id = setInterval(() => setSecondsLeft(compute()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- compute only reads deadlineAt
  }, [deadlineAt]);

  return secondsLeft;
};

export const formatClock = (totalSec) => {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
};
