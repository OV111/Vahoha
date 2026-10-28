import { useCallback, useEffect, useSyncExternalStore } from "react";
import { queryCache } from "@/lib/queryCache";

/**
 * One API read, through the shared cache (src/lib/queryCache.js).
 *
 *   const { data, loading, error, refreshing, refetch } = useCachedResource("mastery", fetchMastery, { staleMs: 60_000 });
 *
 * - Coming back to a screen shows the cached data on the first render, then
 *   refreshes it in the background if it is older than staleMs.
 * - Two components asking for the same key share one request.
 * - After a write that affects it (queryInvalidation.js) the data updates in
 *   place, without the screen going blank.
 * - `fetcher` must be a stable function (a module-level one), or the read
 *   restarts on every render.
 *
 * `loading` is only true while there is nothing to show yet; a refresh behind
 * existing data is `refreshing`. `error` can sit next to `data`: a refresh
 * failed, the old copy is still being shown.
 */
export default function useCachedResource(key, fetcher, { staleMs = 30_000, enabled = true } = {}) {
  const subscribe = useCallback((listener) => queryCache.subscribe(key, listener), [key]);
  const read = useCallback(() => queryCache.get(key), [key]);
  // The same snapshot on the server render: there is nothing cached there.
  const entry = useSyncExternalStore(subscribe, read, read);

  useEffect(() => {
    if (!enabled) return undefined;
    const controller = new AbortController();
    // The result lands in the cache, which the snapshot above reads; the promise
    // is only here to stop waiting when this component goes away. Errors are in entry.error.
    queryCache.load(key, fetcher, { staleMs, signal: controller.signal }).catch(() => {});
    return () => controller.abort();
  }, [key, fetcher, staleMs, enabled]);

  const refetch = useCallback(() => queryCache.load(key, fetcher, { staleMs, force: true }), [key, fetcher, staleMs]);

  const hasData = entry.data !== undefined;
  return {
    data: hasData ? entry.data : null,
    error: entry.error,
    loading: enabled && !hasData && !entry.error,
    refreshing: hasData && entry.loading,
    refetch,
  };
}
