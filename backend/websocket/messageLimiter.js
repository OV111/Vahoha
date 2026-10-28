// Flood control for one WebSocket connection: a sliding window of timestamps.
// REST routes get express-rate-limit; a socket never goes through Express, so
// without this one connection could write chat messages as fast as it can send.

export const MESSAGE_LIMIT = 20; // messages per window, for every message type
export const WINDOW_MS = 10_000;
export const MAX_STRIKES = 5; // refused messages before the connection is closed

/**
 * @param {{ limit?: number, windowMs?: number, maxStrikes?: number, now?: () => number }} [options]
 * @returns {() => "ok" | "limited" | "close"} call once per incoming message
 */
export function createMessageLimiter({ limit = MESSAGE_LIMIT, windowMs = WINDOW_MS, maxStrikes = MAX_STRIKES, now = Date.now } = {}) {
  let times = [];
  let strikes = 0;

  return () => {
    const t = now();
    times = times.filter((at) => t - at < windowMs);
    if (times.length >= limit) {
      strikes += 1;
      return strikes >= maxStrikes ? "close" : "limited";
    }
    times.push(t);
    return "ok";
  };
}
