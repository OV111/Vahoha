import process from "node:process";

/**
 * Readiness check for the hosting platform (Render's healthCheckPath).
 *
 * "Healthy" means the process can actually serve requests, which for this app
 * means MongoDB answers. A check that returned 200 while the database was gone
 * would let the platform route traffic to an instance that can only 500.
 *
 * The ping is time-boxed: a hung database must turn into a fast 503, not a
 * health request that hangs until the platform's own timeout.
 */
/**
 * Redis is reported, but never decides the status. A restart cannot fix Redis, so
 * answering 503 for it would only make Render restart-loop a healthy service. The
 * value is for whoever reads the endpoint: "up", "down", or "disabled".
 * `redis` undefined skips the check; null means Redis is switched off.
 */
const checkRedis = async (redis, timeoutMs) => {
  if (redis === null) return "disabled";
  // Not connected: say so at once instead of queueing a PING that would wait for it.
  if (redis.status !== "ready") return "down";

  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error("redis ping timed out")), timeoutMs);
  });
  try {
    await Promise.race([redis.ping(), timeout]);
    return "up";
  } catch {
    return "down";
  } finally {
    clearTimeout(timer);
  }
};

export const checkHealth = async (db, { timeoutMs = 3000, redis, redisTimeoutMs = 1500 } = {}) => {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error("database ping timed out")), timeoutMs);
  });

  try {
    await Promise.race([db.command({ ping: 1 }), timeout]);
    const body = { status: "ok", uptimeSec: Math.round(process.uptime()) };
    if (redis !== undefined) body.redis = await checkRedis(redis, redisTimeoutMs);
    return { ok: true, body };
  } catch (err) {
    // The reason goes to the log, not the response — health endpoints are public.
    console.error("health: database check failed:", err.message);
    return { ok: false, body: { status: "unavailable" } };
  } finally {
    clearTimeout(timer);
  }
};

/** Plain http handler, so the check runs before (and independently of) Express. */
export const healthHandler = (db, { redis } = {}) => {
  // The app's own connection, found on the first request. By then server.js has
  // already loaded it, so this creates nothing; a test passes its own.
  let shared;
  const redisOf = async () => {
    if (redis !== undefined) return redis;
    shared ??= (await import("../config/redis.js")).redisConnection;
    return shared;
  };

  return async (req, res) => {
    const { ok, body } = await checkHealth(db, { redis: await redisOf() });
    res.writeHead(ok ? 200 : 503, {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    });
    res.end(req.method === "HEAD" ? undefined : JSON.stringify(body));
  };
};
