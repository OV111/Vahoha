export default {
  slug: "sliding-window-rate-limiter",
  trackId: "mern",
  layerId: "mern-7",
  type: "CODE",
  difficulty: "hard",
  title: "A sliding-window rate limiter",
  summary:
    "Limit attempts per key (like login tries per IP) and tell the client when to retry.",
  description:
    "Rate limiting slows down brute-force password guessing and abusive clients. A fixed window lets a client send a double burst across the boundary; a sliding window counts the requests in the last N milliseconds, which is smooth and exact. The limiter also needs to forget old keys so memory does not grow forever.",
  task:
    "Write <code>createRateLimiter({ limit, windowMs, now })</code> where <code>now()</code> returns the current time in milliseconds. Return <code>{ check(key), reset(key), size() }</code>. <code>check(key)</code> counts the key's recorded hits that are still inside the window (a hit at time <code>t</code> is inside while <code>t &gt; now - windowMs</code>). If fewer than <code>limit</code>, record a hit at <code>now()</code> and return <code>{ allowed: true, remaining, retryAfterMs: 0 }</code> where <code>remaining = limit - hitsNowInWindow</code> (counting the new hit). Otherwise do <b>not</b> record anything and return <code>{ allowed: false, remaining: 0, retryAfterMs }</code> where <code>retryAfterMs</code> is how long until the oldest hit in the window leaves it (<code>oldest + windowMs - now</code>). <code>reset(key)</code> forgets a key. <code>size()</code> returns how many keys currently have at least one hit inside the window (drop expired hits and empty keys first).",
  constraints: [
    "A denied request must not extend the block: it adds no hit.",
    "Each key is independent.",
    "Expired hits must be removed so memory use stays proportional to recent activity.",
    "Throw <code>RangeError('limit and windowMs must be positive')</code> if either is not a positive number.",
  ],
  example: `const rl = createRateLimiter({ limit: 2, windowMs: 1000, now });
rl.check('ip1'); // { allowed: true, remaining: 1, retryAfterMs: 0 }
rl.check('ip1'); // { allowed: true, remaining: 0, retryAfterMs: 0 }
rl.check('ip1'); // { allowed: false, remaining: 0, retryAfterMs: 1000 } (at the same instant)`,
  tags: ["security","rate-limiting","brute-force","algorithms"],
  estimatedMins: 40,
  xp: 75,
  starterFiles: [
    {
      name: "createRateLimiter.js",
      lang: "js",
      code: `// createRateLimiter.js
function createRateLimiter({ limit, windowMs, now }) {
  // your code here
}

module.exports = createRateLimiter;`,
    },
  ],
  testFile: {
    name: "createRateLimiter_test.js",
    lang: "test",
    code: `// createRateLimiter_test.js
const createRateLimiter = require('./createRateLimiter');

test('allows_up_to_the_limit_then_denies', () => {
  // see the hidden tests for the full checks
  expect(typeof createRateLimiter).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Keep a <code>Map</code> from key to an array of hit timestamps in ascending order. At the start of <code>check</code>, drop timestamps that are <code>&lt;= now - windowMs</code> from the front.",
    },
    {
      order: 2,
      cost: 5,
      text: "If the array length is less than the limit, push <code>now</code> and report <code>remaining = limit - array.length</code>. Otherwise return the denial with <code>hits[0] + windowMs - now</code> and push nothing.",
    },
    {
      order: 3,
      cost: 10,
      text: "In <code>size()</code>, prune every key the same way and delete the keys whose arrays became empty before returning <code>map.size</code>.",
    },
  ],
  hiddenTests: [
    {
      name: "allows_up_to_the_limit_then_denies",
      code: `let t = 0;
const rl = createRateLimiter({ limit: 2, windowMs: 1000, now: () => t });
const a = rl.check('k'); const b = rl.check('k'); const c = rl.check('k');
assert(a.allowed && a.remaining === 1 && a.retryAfterMs === 0, 'first, got ' + JSON.stringify(a));
assert(b.allowed && b.remaining === 0, 'second, got ' + JSON.stringify(b));
assert(c.allowed === false && c.remaining === 0 && c.retryAfterMs === 1000, 'third is denied with the full window to wait, got ' + JSON.stringify(c));`,
    },
    {
      name: "retry_after_counts_down_to_the_oldest_hit",
      code: `let t = 0;
const rl = createRateLimiter({ limit: 2, windowMs: 1000, now: () => t });
rl.check('k'); t = 400; rl.check('k'); t = 700;
const r = rl.check('k');
assert(r.allowed === false && r.retryAfterMs === 300, 'the oldest hit (t=0) leaves the window at 1000, so wait 300, got ' + JSON.stringify(r));`,
    },
    {
      name: "window_slides_exactly_at_the_boundary",
      code: `let t = 0;
const rl = createRateLimiter({ limit: 1, windowMs: 1000, now: () => t });
rl.check('k');
t = 999;
assert(rl.check('k').allowed === false, 'still inside the window at 999');
t = 1000;
assert(rl.check('k').allowed === true, 'a hit at exactly now - windowMs has left the window');`,
    },
    {
      name: "denied_requests_do_not_extend_the_block",
      code: `let t = 0;
const rl = createRateLimiter({ limit: 1, windowMs: 1000, now: () => t });
rl.check('k');
t = 500; rl.check('k'); t = 900; rl.check('k');
t = 1000;
assert(rl.check('k').allowed === true, 'only the allowed hit at t=0 counts, so t=1000 is free');`,
    },
    {
      name: "sliding_not_fixed_windows",
      code: `let t = 0;
const rl = createRateLimiter({ limit: 2, windowMs: 1000, now: () => t });
t = 900; rl.check('k'); rl.check('k');
t = 1100;
const r = rl.check('k');
assert(r.allowed === false && r.retryAfterMs === 800, 'both hits at 900 are still inside (1100 - 1000 = 100), wait until 1900, got ' + JSON.stringify(r));`,
    },
    {
      name: "keys_are_independent_and_reset_works",
      code: `let t = 0;
const rl = createRateLimiter({ limit: 1, windowMs: 1000, now: () => t });
rl.check('a');
assert(rl.check('b').allowed === true, 'another key has its own budget');
assert(rl.check('a').allowed === false, 'a is exhausted');
rl.reset('a');
assert(rl.check('a').allowed === true, 'reset gives a fresh budget');`,
    },
    {
      name: "size_forgets_expired_keys",
      code: `let t = 0;
const rl = createRateLimiter({ limit: 5, windowMs: 1000, now: () => t });
rl.check('a'); rl.check('b'); t = 500; rl.check('c');
assert(rl.size() === 3, 'three active keys, got ' + rl.size());
t = 1000;
assert(rl.size() === 1, 'a and b have expired, only c remains, got ' + rl.size());
t = 5000;
assert(rl.size() === 0, 'nothing left, got ' + rl.size());`,
    },
    {
      name: "rejects_bad_configuration",
      code: `let e1 = null; let e2 = null;
try { createRateLimiter({ limit: 0, windowMs: 1000, now: () => 0 }); } catch (e) { e1 = e; }
try { createRateLimiter({ limit: 5, windowMs: -1, now: () => 0 }); } catch (e) { e2 = e; }
assert(e1 instanceof RangeError && e1.message === 'limit and windowMs must be positive', 'zero limit');
assert(e2 instanceof RangeError, 'negative window');`,
    },
  ],
  solution: {
    code: `function createRateLimiter({ limit, windowMs, now }) {
  if (!(limit > 0) || !(windowMs > 0)) throw new RangeError('limit and windowMs must be positive');
  const hits = new Map();

  function prune(key, t) {
    const list = hits.get(key);
    if (!list) return null;
    let i = 0;
    while (i < list.length && list[i] <= t - windowMs) i++;
    if (i > 0) list.splice(0, i);
    if (list.length === 0) {
      hits.delete(key);
      return null;
    }
    return list;
  }

  return {
    check(key) {
      const t = now();
      let list = prune(key, t);
      if (!list) {
        list = [];
        hits.set(key, list);
      }
      if (list.length < limit) {
        list.push(t);
        return { allowed: true, remaining: limit - list.length, retryAfterMs: 0 };
      }
      return { allowed: false, remaining: 0, retryAfterMs: list[0] + windowMs - t };
    },
    reset(key) {
      hits.delete(key);
    },
    size() {
      const t = now();
      for (const key of [...hits.keys()]) prune(key, t);
      return hits.size;
    },
  };
}

module.exports = createRateLimiter;`,
    explanation:
      "A sliding window keeps the actual timestamps of recent hits rather than a counter, which is what removes the burst-at-the-boundary problem of fixed windows. Because timestamps are appended in time order, expired ones are always at the front, so pruning is a simple walk from the start. The boundary is deliberate: a hit exactly windowMs old has left the window. Denied requests deliberately record nothing, so an attacker hammering a locked key cannot extend their own lockout, and retryAfterMs is exact: the moment the oldest hit leaves the window is the moment one slot frees up. Pruning empty keys (in check and in size) is what makes memory proportional to recent activity instead of to the number of clients ever seen.",
  },
};
