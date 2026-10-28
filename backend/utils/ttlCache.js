import process from "node:process";

// A small in-memory cache with a time-to-live, for read-mostly data that is the
// same for every user (roadmap layers, the leaderboard, public lists).
//
// What it gives you over a bare Map:
//  - wrap(): concurrent misses for one key share ONE load, so a burst of requests
//    after expiry runs the query once, not N times (no stampede);
//  - a rejected load is never cached, and the next call retries;
//  - a size cap, so a stream of distinct keys can't grow memory without bound.
//
// Rules for callers:
//  - cache only data that does not depend on who is asking;
//  - put EVERY input that changes the result into the key;
//  - treat the cached value as read-only (it is shared), or pass clone: true;
//  - after a write that must show up at once, call delete()/clear(). Otherwise the
//    TTL is the longest a change can stay hidden, so pick it with that in mind.
//
// The store is per process. That is fine on the single pilot instance. On several
// instances each keeps its own copy, which only matters for the longest TTLs.

/**
 * Off under Vitest, so one test's data never leaks into the next. A test that is
 * about caching sets CACHE_ENABLED=true. CACHE_ENABLED=false turns it off in
 * production (to rule the cache out while debugging).
 */
export const isCachingEnabled = () => (process.env.CACHE_ENABLED ? process.env.CACHE_ENABLED === "true" : !process.env.VITEST);

/**
 * `now` reads the clock on each call, so a test using fake timers can move it.
 * @param {{ name: string, ttlMs: number, maxEntries?: number, now?: () => number }} options
 */
export function createTtlCache({ name, ttlMs, maxEntries = 500, now = () => Date.now() }) {
  const entries = new Map(); // key -> { value, expiresAt }; insertion order = age
  const loading = new Map(); // key -> Promise of the value being loaded
  const stats = { hits: 0, misses: 0 };

  const fresh = (key) => {
    const entry = entries.get(key);
    if (!entry) return undefined;
    if (entry.expiresAt <= now()) {
      entries.delete(key);
      return undefined;
    }
    return entry;
  };

  const set = (key, value, ttl = ttlMs) => {
    entries.delete(key); // re-insert, so it counts as the newest
    entries.set(key, { value, expiresAt: now() + ttl });
    while (entries.size > maxEntries) entries.delete(entries.keys().next().value); // drop the oldest
  };

  return {
    name,

    /** The cached value, or undefined. */
    get(key) {
      return fresh(key)?.value;
    },

    set,

    /**
     * The cached value, or the result of `load()`, which is then cached.
     * @param {string} key
     * @param {() => Promise<any>} load
     * @param {{ ttlMs?: number, clone?: boolean }} [options]
     */
    async wrap(key, load, { ttlMs: ttl = ttlMs, clone = false } = {}) {
      if (!isCachingEnabled()) return load();

      const hit = fresh(key);
      if (hit) {
        stats.hits += 1;
        return clone ? structuredClone(hit.value) : hit.value;
      }
      stats.misses += 1;

      let pending = loading.get(key);
      if (!pending) {
        pending = (async () => {
          try {
            const value = await load();
            set(key, value, ttl);
            return value;
          } finally {
            loading.delete(key); // success or failure: the next miss starts fresh
          }
        })();
        loading.set(key, pending);
      }
      const value = await pending;
      return clone ? structuredClone(value) : value;
    },

    delete: (key) => entries.delete(key),

    /** Everything, or only the keys that start with `prefix` (e.g. one page of a list). */
    clear(prefix) {
      if (prefix === undefined) return entries.clear();
      for (const key of entries.keys()) if (key.startsWith(prefix)) entries.delete(key);
    },

    stats: () => ({ ...stats, size: entries.size }),
  };
}
