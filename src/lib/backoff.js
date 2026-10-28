// How long to wait before the next reconnect attempt: 3 s, 6 s, 12 s ... up to
// 60 s, then every 60 s. The random part (75-100% of the wait) keeps every open
// tab from retrying at the same instant after a deploy or an outage, which is
// what would otherwise hit a restarting server all at once.
export const RECONNECT_BASE_MS = 3000;
export const RECONNECT_MAX_MS = 60_000;

/** @param {number} attempt  0 for the first retry */
export const reconnectDelay = (attempt, random = Math.random) => {
  const wait = Math.min(RECONNECT_MAX_MS, RECONNECT_BASE_MS * 2 ** attempt);
  return Math.round(wait * (0.75 + random() * 0.25));
};
