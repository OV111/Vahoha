// Which cached reads a write makes out of date. Every write goes through
// apiFetch (src/lib/session.js), which calls this after a request succeeds, so
// the rules live in ONE place instead of at every button that saves something.
// A page that forgets nothing can still never show a learner their old progress
// after they finished a test.
//
// Keys match what the reads register in the cache:
//   mastery, readiness, profile, roadmap-progress, notifications, capstone:<track>
//
// When in doubt, list the key: invalidating too much costs one extra request,
// invalidating too little shows someone stale progress.

const RULES = [
  [/^\/api\/exams\//, ["mastery", "readiness", "roadmap-progress", "profile"]], // a test or a teach-back moves all four
  [/^\/api\/challenges\//, ["mastery", "readiness", "profile"]],
  [/^\/api\/capstone\//, ["capstone", "readiness", "profile"]],
  [/^\/api\/teams\//, ["readiness", "profile"]],
  [/^\/api\/roadmaps\//, ["roadmap-progress", "readiness"]],
  [/^\/my-profile\/notifications/, ["notifications"]],
  [/^\/my-profile\/(settings|cv)/, ["profile"]],
  [/^\/users\/[^/]+\/follow/, ["profile"]],
  [/^\/auth\/(github|google)\//, ["profile"]], // connecting or disconnecting an account
];

/** The cache keys a write to this URL affects. */
export function keysForWrite(url) {
  let pathname;
  try {
    pathname = new URL(String(url), "http://localhost").pathname;
  } catch {
    return [];
  }
  return RULES.find(([pattern]) => pattern.test(pathname))?.[1] ?? [];
}

/** Wires the rules to a cache. Returns the handler apiFetch calls with each successful write. */
export const createWriteHandler = (cache) => (url) => {
  keysForWrite(url).forEach((key) => cache.invalidate(key));
};
