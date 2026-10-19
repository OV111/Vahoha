import { useCallback, useEffect, useRef, useState } from "react";

/** Hard kill, longer than the runner's own wait budget (consoleRun.js). */
const KILL_AFTER_MS = 4000;

/**
 * Runs lesson code in a throwaway Web Worker and returns what it printed.
 * Same lifecycle as the Arena's useCodeRunner: one worker per run, always
 * terminated, so an infinite loop can never leak a live thread.
 */
export default function useConsoleRunner() {
  const [running, setRunning] = useState(false);
  const [lines, setLines] = useState(null); // null = not run yet
  const workerRef = useRef(null);

  useEffect(() => () => workerRef.current?.terminate(), []);

  const run = useCallback(async (source) => {
    workerRef.current?.terminate();
    const worker = new Worker(new URL("../lib/consoleRun.worker.js", import.meta.url), { type: "module" });
    workerRef.current = worker;
    setRunning(true);

    const next = await new Promise((resolve) => {
      const finish = (value) => {
        clearTimeout(timer);
        worker.terminate();
        if (workerRef.current === worker) workerRef.current = null;
        resolve(value);
      };
      const timer = setTimeout(
        () => finish([{ level: "error", text: "Stopped after 4 s. Check for an infinite loop.", ms: KILL_AFTER_MS }]),
        KILL_AFTER_MS,
      );
      worker.onmessage = (e) => finish(e.data?.lines ?? []);
      worker.onerror = (e) => finish([{ level: "error", text: e?.message ?? "The code runner crashed.", ms: 0 }]);
      worker.postMessage({ source });
    });

    setLines(next);
    setRunning(false);
  }, []);

  const clear = useCallback(() => setLines(null), []);

  return { run, running, lines, clear };
}
