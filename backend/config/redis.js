import Redis from "ioredis";
import process from "node:process";
import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env.local" });
dotenv.config({ path: "./backend/.env" });

const REDIS_ENABLED = process.env.REDIS_ENABLED !== "false";

// Wait this long for a connection before an attempt counts as failed.
const CONNECT_TIMEOUT_MS = 10_000;
// Reconnect after 200 ms, 400 ms, ... never more than 5 s apart, and keep trying:
// the web process must come back by itself when Redis does.
export const redisRetryDelay = (attempt) => Math.min(attempt * 200, 5000);

// maxRetriesPerRequest: null is required by BullMQ; ioredis' default retry limit makes blocking commands fail.
export const REDIS_OPTIONS = { maxRetriesPerRequest: null, connectTimeout: CONNECT_TIMEOUT_MS, retryStrategy: redisRetryDelay };

/**
 * Logs a Redis error, but the same message only once per window. While Redis is
 * down ioredis fires the same error on every retry, which would bury the log.
 */
export const createRedisErrorLogger = ({ windowMs = 30_000, now = () => Date.now(), log = console.error } = {}) => {
  const lastLogged = new Map(); // message -> time
  return (err) => {
    const message = err?.message ?? String(err);
    const t = now();
    if (t - (lastLogged.get(message) ?? -Infinity) < windowMs) return;
    lastLogged.set(message, t);
    log(`Redis: ${message}`);
  };
};

/**
 * The ONE Redis connection the app uses (login throttling, the notification
 * queue and its worker). Building it in one place is what keeps credentials
 * consistent — the queue used to build its own connection without the password.
 *
 * Hosted Redis (Render Key Value, Upstash) hands out a single URL that
 * carries host, port, password and TLS, so REDIS_URL wins when present; the
 * host/port/password variables remain for local Docker Redis.
 */
export const redisConnection = !REDIS_ENABLED
  ? null
  : process.env.REDIS_URL
    ? new Redis(process.env.REDIS_URL, REDIS_OPTIONS)
    : new Redis({
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD,
        ...REDIS_OPTIONS,
      });

// ioredis emits "error" on every failed connection attempt, and an "error" event
// with no listener is thrown by Node and ends the process. Handle it: ioredis
// itself keeps reconnecting.
redisConnection?.on("error", createRedisErrorLogger());
