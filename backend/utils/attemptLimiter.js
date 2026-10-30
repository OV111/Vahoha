import { redisConnection } from "../config/redis.js";

// Counters for abuse limits that need more than express-rate-limit offers:
// failures counted per scope (IP, account, account+IP) with a lockout that
// doubles each time it is hit again, and plain capped counters.
//
// Redis when it is on, so counters survive restarts and are shared by instances;
// otherwise, or when Redis is slow or down, a per-process Map. Redis is never a
// reason to refuse a request: a limiter that can fail closed is an outage.

const REDIS_TIMEOUT_MS = 300;
const MEMORY_SWEEP_AT = 20_000;

// Count a failure; once `limit` is reached, lock for base * 2^(count - limit)
// seconds up to a cap. The counter outlives the lock by one window, so another
// failure soon after the lock ends escalates it instead of starting over.
// One script, so the count and its expiry can never be set apart.
const FAIL_SCRIPT = `
local count = redis.call("INCR", KEYS[1])
local limit, window, base, cap = tonumber(ARGV[1]), tonumber(ARGV[2]), tonumber(ARGV[3]), tonumber(ARGV[4])
if count < limit then
  redis.call("EXPIRE", KEYS[1], window)
  return 0
end
local lock = math.floor(math.min(base * 2 ^ (count - limit), cap))
redis.call("SET", KEYS[2], 1, "EX", lock)
redis.call("EXPIRE", KEYS[1], lock + window)
return lock
`;

const HIT_SCRIPT = `
local count = redis.call("INCR", KEYS[1])
if count == 1 then redis.call("EXPIRE", KEYS[1], ARGV[1]) end
return count
`;

const withTimeout = (promise) =>
  Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error("redis timeout")), REDIS_TIMEOUT_MS).unref())]);

const countKey = (key) => `attempts:${key}`;
const lockKey = (key) => `lock:${key}`;

export const createAttemptLimiter = ({ redis = redisConnection, now = Date.now } = {}) => {
  const memory = new Map(); // key -> { value, expiresAt }

  const read = (key) => {
    const entry = memory.get(key);
    if (!entry) return null;
    if (entry.expiresAt <= now()) {
      memory.delete(key);
      return null;
    }
    return entry;
  };
  const write = (key, value, ttlSeconds) => {
    if (memory.size >= MEMORY_SWEEP_AT) for (const k of memory.keys()) read(k);
    memory.set(key, { value, expiresAt: now() + ttlSeconds * 1000 });
  };
  const memoryTtl = (key) => {
    const entry = read(key);
    return entry ? Math.ceil((entry.expiresAt - now()) / 1000) : 0;
  };

  // Redis first; the Map answers when Redis is off, slow or erroring.
  const run = async (viaRedis, viaMemory) => {
    if (redis) {
      try {
        return await withTimeout(viaRedis());
      } catch {
        // fall through to the in-process counters
      }
    }
    return viaMemory();
  };

  const failMemory = ({ key, limit, windowSec, baseLockSec, maxLockSec }) => {
    const count = (read(countKey(key))?.value ?? 0) + 1;
    if (count < limit) {
      write(countKey(key), count, windowSec);
      return 0;
    }
    const lock = Math.floor(Math.min(baseLockSec * 2 ** (count - limit), maxLockSec));
    write(lockKey(key), 1, lock);
    write(countKey(key), count, lock + windowSec);
    return lock;
  };

  return {
    /** Seconds until the longest lock among the rules ends; 0 when none is locked. */
    async retryAfter(rules) {
      const ttls = await Promise.all(
        rules.map(({ key }) =>
          run(
            async () => Math.max(await redis.ttl(lockKey(key)), 0),
            () => memoryTtl(lockKey(key)),
          ),
        ),
      );
      return Math.max(0, ...ttls);
    },

    /** Records one failure against every rule; returns the longest lock it started (0 if none). */
    async recordFailure(rules) {
      const locks = await Promise.all(
        rules.map((rule) =>
          run(
            () =>
              redis.eval(FAIL_SCRIPT, 2, countKey(rule.key), lockKey(rule.key), rule.limit, rule.windowSec, rule.baseLockSec, rule.maxLockSec),
            () => failMemory(rule),
          ),
        ),
      );
      return Math.max(0, ...locks.map(Number));
    },

    /** Forgets the failures and any lock for these rules. */
    async clear(rules) {
      await Promise.all(
        rules.map(({ key }) =>
          run(
            () => redis.del(countKey(key), lockKey(key)),
            () => {
              memory.delete(countKey(key));
              memory.delete(lockKey(key));
            },
          ),
        ),
      );
    },

    /** Counts one use of `key` in a fixed window; `allowed` is false once past `limit`. */
    async hit(key, { limit, windowSec }) {
      const count = await run(
        () => redis.eval(HIT_SCRIPT, 1, countKey(key), windowSec),
        () => {
          const next = (read(countKey(key))?.value ?? 0) + 1;
          // keep the original expiry: a window starts at its first hit
          write(countKey(key), next, next === 1 ? windowSec : memoryTtl(countKey(key)));
          return next;
        },
      );
      return { allowed: Number(count) <= limit };
    },
  };
};

export const attemptLimiter = createAttemptLimiter();
