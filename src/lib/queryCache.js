// A small stale-while-revalidate cache for API reads, so the same data is not
// fetched again on every navigation. Module-level, per tab, in memory only.
//
//   load(key, fetcher, { staleMs })   resolves with FRESH data: instantly if the
//                                     cached copy is younger than staleMs, else
//                                     after one request. The stale copy stays
//                                     readable through get() meanwhile.
//
// Rules this keeps:
//  - one request per key at a time (concurrent callers share it);
//  - a failed request is never stored as data: the old copy stays, the error is
//    recorded, and the next load() tries again;
//  - an AbortSignal only stops THAT caller from waiting; the shared request goes
//    on for the others and still fills the cache;
//  - clear() on logout or a change of user, so one account never sees another's
//    data (see useAuthStore); invalidate() after a write (see queryInvalidation).
//
// Keys are plain strings. Use "name" or "name:detail" (e.g. "capstone:api-dev") so
// invalidate("capstone") reaches every track.

const EMPTY = Object.freeze({ data: undefined, error: null, fetchedAt: 0, loading: false });

const abortError = () => new DOMException("Aborted", "AbortError");

/** Waits for `promise`, but gives up on its own when `signal` aborts. */
const waitFor = (promise, signal) => {
  if (!signal) return promise;
  if (signal.aborted) return Promise.reject(abortError());
  return new Promise((resolve, reject) => {
    const onAbort = () => reject(abortError());
    signal.addEventListener("abort", onAbort, { once: true });
    promise.then(resolve, reject).finally(() => signal.removeEventListener("abort", onAbort));
  });
};

/** @param {{ now?: () => number }} [options] */
export function createQueryCache({ now = () => Date.now() } = {}) {
  /** key -> { state, listeners, inflight, fetcher, staleMs, version, generation } */
  const entries = new Map();

  const ensure = (key) => {
    let entry = entries.get(key);
    if (!entry) {
      entry = { state: EMPTY, listeners: new Set(), inflight: null, fetcher: null, staleMs: 0, version: 0, generation: 0 };
      entries.set(key, entry);
    }
    return entry;
  };

  const patch = (entry, change) => {
    entry.state = { ...entry.state, ...change }; // a new object, so subscribers see a change
    entry.listeners.forEach((listener) => listener());
  };

  const cache = {
    /** The entry's current state; the same object until something changes. */
    get: (key) => entries.get(key)?.state ?? EMPTY,

    /** Whether the cached copy exists and is younger than staleMs. */
    isFresh: (key, staleMs) => {
      const { data, fetchedAt } = cache.get(key);
      return data !== undefined && now() - fetchedAt < staleMs;
    },

    /** Puts data in the cache as if it had just been fetched. */
    set(key, data) {
      patch(ensure(key), { data, error: null, fetchedAt: now() });
    },

    /** Calls `listener` whenever this key's state changes. Returns the unsubscribe. */
    subscribe(key, listener) {
      const entry = ensure(key);
      entry.listeners.add(listener);
      return () => {
        entry.listeners.delete(listener);
        // An entry nobody watches and that holds nothing is just a leak.
        if (!entry.listeners.size && entry.state.data === undefined && !entry.inflight && entries.get(key) === entry) entries.delete(key);
      };
    },

    /**
     * @param {string} key
     * @param {() => Promise<any>} fetcher
     * @param {{ staleMs?: number, signal?: AbortSignal, force?: boolean }} [options]
     */
    load(key, fetcher, { staleMs = 30_000, signal, force = false } = {}) {
      const entry = ensure(key);
      entry.fetcher = fetcher;
      entry.staleMs = staleMs;

      if (!force && cache.isFresh(key, staleMs)) return waitFor(Promise.resolve(entry.state.data), signal);

      if (!entry.inflight) {
        const { version, generation } = entry;
        patch(entry, { loading: true, error: null });

        const request = (async () => {
          try {
            const data = await fetcher();
            // clear() ran meanwhile (logout, another user): drop it, it may be someone else's.
            if (entry.generation !== generation) return data;
            // invalidate() ran meanwhile (a write): this answer may predate it, so keep it
            // but mark it stale, and the next load() fetches again.
            const predatesWrite = entry.version !== version;
            patch(entry, { data, error: null, loading: false, fetchedAt: predatesWrite ? 0 : now() });
            // Somebody is looking at it, so don't leave them on the older answer.
            if (predatesWrite && entry.listeners.size) queueMicrotask(() => cache.load(key, fetcher, { staleMs, force: true }).catch(() => {}));
            return data;
          } catch (error) {
            if (entry.generation === generation) patch(entry, { error, loading: false });
            throw error;
          } finally {
            if (entry.inflight === request) entry.inflight = null;
          }
        })();
        request.catch(() => {}); // callers handle it; this stops a "nobody caught it" report when they all aborted
        entry.inflight = request;
      }
      return waitFor(entry.inflight, signal);
    },

    /**
     * After a write: drop every key that equals `prefix` or starts with it.
     * A key somebody is watching is refetched in place (its old data stays on
     * screen until the new arrives); any other is simply forgotten, so the next
     * view starts from the server.
     */
    invalidate(prefix) {
      for (const [key, entry] of [...entries]) {
        if (!key.startsWith(prefix)) continue;
        entry.version += 1;
        if (entry.listeners.size && entry.fetcher) {
          patch(entry, { fetchedAt: 0 });
          cache.load(key, entry.fetcher, { staleMs: entry.staleMs, force: true }).catch(() => {});
        } else if (!entry.listeners.size) {
          entries.delete(key);
        }
      }
    },

    /** Everything, for good: used when the session ends or the user changes. */
    clear() {
      for (const [key, entry] of [...entries]) {
        entry.generation += 1; // a request already out will not write into the cache
        entry.inflight = null;
        if (entry.listeners.size) patch(entry, { ...EMPTY });
        else entries.delete(key);
      }
    },

    size: () => entries.size,
  };

  return cache;
}

/** The one cache the app shares. */
export const queryCache = createQueryCache();
