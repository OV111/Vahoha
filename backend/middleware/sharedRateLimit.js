import process from "node:process";
import rateLimit, { MemoryStore } from "express-rate-limit";

// Not imported under Vitest: config/redis.js loads backend/.env (real API keys
// leak into unit tests) and opens a connection in every test file that reaches a route.
const redisConnection = process.env.VITEST ? null : (await import("../config/redis.js")).redisConnection;

// Rate-limit counters in Redis, so a restart or a second instance doesn't hand
// every client a fresh allowance. Falls back to an in-memory count whenever Redis
// is down, so an outage loosens the limits slightly instead of failing or
// hanging requests (ioredis queues commands while reconnecting, it never rejects).

const COMMAND_TIMEOUT_MS = 500;

// INCR and the expiry in one step: with two calls, a crash between them leaves a
// counter that never expires and blocks that client for good.
const INCREMENT_SCRIPT = `
local hits = redis.call("INCR", KEYS[1])
if hits == 1 then redis.call("PEXPIRE", KEYS[1], ARGV[1]) end
return { hits, redis.call("PTTL", KEYS[1]) }
`;

const withTimeout = (promise) =>
  Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("Redis rate-limit timeout")), COMMAND_TIMEOUT_MS)),
  ]);

export class RedisFallbackStore {
  localKeys = false;

  constructor({ prefix, client }) {
    this.prefix = `rl:${prefix}:`;
    this.client = client;
    this.memory = new MemoryStore();
  }

  init(options) {
    this.windowMs = options.windowMs;
    this.memory.init(options);
  }

  get ready() {
    return this.client?.status === "ready";
  }

  async increment(key) {
    if (this.ready) {
      try {
        const [totalHits, ttl] = await withTimeout(this.client.eval(INCREMENT_SCRIPT, 1, this.prefix + key, this.windowMs));
        return { totalHits, resetTime: new Date(Date.now() + (ttl > 0 ? ttl : this.windowMs)) };
      } catch {
        // Fall through to memory: one request counted locally beats a 500.
      }
    }
    return this.memory.increment(key);
  }

  async decrement(key) {
    if (this.ready) {
      try {
        await withTimeout(this.client.decr(this.prefix + key));
        return;
      } catch {
        // The refund lands in memory instead; at worst the client keeps one hit too many.
      }
    }
    await this.memory.decrement(key);
  }

  async resetKey(key) {
    await this.memory.resetKey(key);
    if (this.ready) await withTimeout(this.client.del(this.prefix + key)).catch(() => {});
  }
}

/**
 * express-rate-limit with the shared store. `name` must be unique per limiter:
 * it namespaces the Redis keys, so two limiters never share a counter.
 * Under Vitest the default memory store stays, so suites don't depend on Redis.
 */
export const sharedRateLimit = (name, options) =>
  rateLimit({
    ...options,
    ...(redisConnection ? { store: new RedisFallbackStore({ prefix: name, client: redisConnection }) } : {}),
  });
