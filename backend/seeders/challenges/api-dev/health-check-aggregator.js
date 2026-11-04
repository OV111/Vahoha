export default {
  slug: "health-check-aggregator",
  trackId: "api-dev",
  layerId: "api-dev-10",
  type: "CODE",
  difficulty: "hard",
  title: "Health check endpoint logic",
  summary: "Run dependency checks in parallel with a timeout and decide ok, degraded or down.",
  description:
    "Load balancers and Kubernetes call <code>/health</code> to decide whether to send traffic. A good health check runs the checks in parallel, never hangs, and distinguishes 'down' from 'degraded'.",
  task:
    "Write <code>runHealthChecks(checks, { timeoutMs = 1000, setTimer, clearTimer })</code> (async). <code>checks</code> maps a name to <code>{ fn, critical }</code>, where <code>fn</code> is an async function (resolve = healthy, reject = unhealthy) and <code>critical</code> defaults to true. Return <code>{ status, httpStatus, checks }</code>.",
  constraints: [
    "All checks start at the same time (in parallel).",
    "A check that takes longer than <code>timeoutMs</code> counts as down with <code>error: 'timeout'</code>; a rejection is down with <code>error</code> set to the error's message.",
    "<code>checks[name]</code> is <code>{ status: 'up' }</code> or <code>{ status: 'down', error }</code>.",
    "Overall <code>status</code>: <code>'down'</code> if any critical check is down; else <code>'degraded'</code> if any non-critical check is down; else <code>'ok'</code>.",
    "<code>httpStatus</code> is 503 for 'down' and 200 otherwise. No checks means 'ok'. Clear the timeout timers when a check finishes.",
    "Start and stop timeouts with the <code>setTimer(fn, ms)</code> and <code>clearTimer(id)</code> options, which default to the global <code>setTimeout</code> and <code>clearTimeout</code>. Tests pass in fakes so they can control time.",
  ],
  example: `await runHealthChecks({ db: { fn: pingDb }, cache: { fn: pingRedis, critical: false } }) // { status: 'degraded', httpStatus: 200, ... }`,
  tags: ["production","kubernetes","observability","async"],
  estimatedMins: 40,
  xp: 70,
  starterFiles: [
    {
      name: "runHealthChecks.js",
      lang: "js",
      code: `// runHealthChecks.js
function runHealthChecks(checks, options = {}) {
  // your code here
}

module.exports = runHealthChecks;`,
    },
  ],
  testFile: {
    name: "runHealthChecks_test.js",
    lang: "test",
    code: `const runHealthChecks = require('./runHealthChecks');

test('all_up', () => {
  return runHealthChecks({ db: { fn: async () => {} } }).then((r) => { expect(r.status).toBe('ok'); expect(r.httpStatus).toBe(200); });
});

test('critical_down', () => {
  return runHealthChecks({ db: { fn: async () => { throw new Error('x'); } } }).then((r) => expect(r.httpStatus).toBe(503));
});`,
  },
  hints: [
    { order: 1, cost: 0, text: "Wrap each check in <code>Promise.race([check, timeoutPromise])</code> and run them all with <code>Promise.all</code> over <code>Object.entries(checks)</code>." },
    { order: 2, cost: 5, text: "Make each wrapper catch its own error and return a result object, so one failure never rejects the whole <code>Promise.all</code>." },
    { order: 3, cost: 15, text: "Clear the timer in a <code>finally</code> block so a fast check doesn't leave a timer keeping the process alive." },
  ],
  hiddenTests: [
    { name: "all_healthy", code: `const makeTimers = () => { const pending = []; let seq = 0; return { setTimer(fn, ms) { const id = ++seq; pending.push({ id, fn, ms }); return id; }, clearTimer(id) { const i = pending.findIndex((p) => p.id === id); if (i >= 0) pending.splice(i, 1); }, fire() { const p = pending.shift(); if (p) p.fn(); }, count() { return pending.length; }, delay() { return pending.length ? pending[0].ms : null; } }; };
const timers = makeTimers(); const T = { setTimer: timers.setTimer, clearTimer: timers.clearTimer };
const r = await runHealthChecks({ db: { fn: async () => {} }, redis: { fn: async () => {} } }, T);
assert(r.status === 'ok' && r.httpStatus === 200, 'ok');
assert(r.checks.db.status === 'up' && r.checks.redis.status === 'up', 'both up');` },
    { name: "no_checks", code: `const makeTimers = () => { const pending = []; let seq = 0; return { setTimer(fn, ms) { const id = ++seq; pending.push({ id, fn, ms }); return id; }, clearTimer(id) { const i = pending.findIndex((p) => p.id === id); if (i >= 0) pending.splice(i, 1); }, fire() { const p = pending.shift(); if (p) p.fn(); }, count() { return pending.length; }, delay() { return pending.length ? pending[0].ms : null; } }; };
const timers = makeTimers(); const T = { setTimer: timers.setTimer, clearTimer: timers.clearTimer };
const r = await runHealthChecks({}, T);
assert(r.status === 'ok' && r.httpStatus === 200, 'nothing to fail');` },
    { name: "critical_failure_is_down", code: `const makeTimers = () => { const pending = []; let seq = 0; return { setTimer(fn, ms) { const id = ++seq; pending.push({ id, fn, ms }); return id; }, clearTimer(id) { const i = pending.findIndex((p) => p.id === id); if (i >= 0) pending.splice(i, 1); }, fire() { const p = pending.shift(); if (p) p.fn(); }, count() { return pending.length; }, delay() { return pending.length ? pending[0].ms : null; } }; };
const timers = makeTimers(); const T = { setTimer: timers.setTimer, clearTimer: timers.clearTimer };
const r = await runHealthChecks({ db: { fn: async () => { throw new Error('conn refused'); } }, redis: { fn: async () => {} } }, T);
assert(r.status === 'down' && r.httpStatus === 503, 'down and 503');
assert(r.checks.db.status === 'down' && r.checks.db.error === 'conn refused', 'error message');
assert(r.checks.redis.status === 'up', 'others still reported');` },
    { name: "non_critical_failure_is_degraded", code: `const makeTimers = () => { const pending = []; let seq = 0; return { setTimer(fn, ms) { const id = ++seq; pending.push({ id, fn, ms }); return id; }, clearTimer(id) { const i = pending.findIndex((p) => p.id === id); if (i >= 0) pending.splice(i, 1); }, fire() { const p = pending.shift(); if (p) p.fn(); }, count() { return pending.length; }, delay() { return pending.length ? pending[0].ms : null; } }; };
const timers = makeTimers(); const T = { setTimer: timers.setTimer, clearTimer: timers.clearTimer };
const r = await runHealthChecks({ db: { fn: async () => {} }, cache: { fn: async () => { throw new Error('x'); }, critical: false } }, T);
assert(r.status === 'degraded' && r.httpStatus === 200, 'degraded but still serving');` },
    { name: "critical_beats_noncritical", code: `const makeTimers = () => { const pending = []; let seq = 0; return { setTimer(fn, ms) { const id = ++seq; pending.push({ id, fn, ms }); return id; }, clearTimer(id) { const i = pending.findIndex((p) => p.id === id); if (i >= 0) pending.splice(i, 1); }, fire() { const p = pending.shift(); if (p) p.fn(); }, count() { return pending.length; }, delay() { return pending.length ? pending[0].ms : null; } }; };
const timers = makeTimers(); const T = { setTimer: timers.setTimer, clearTimer: timers.clearTimer };
const r = await runHealthChecks({ a: { fn: async () => { throw new Error('a'); } }, b: { fn: async () => { throw new Error('b'); }, critical: false } }, T);
assert(r.status === 'down', 'any critical failure means down');` },
    { name: "timeout", code: `const makeTimers = () => { const pending = []; let seq = 0; return { setTimer(fn, ms) { const id = ++seq; pending.push({ id, fn, ms }); return id; }, clearTimer(id) { const i = pending.findIndex((p) => p.id === id); if (i >= 0) pending.splice(i, 1); }, fire() { const p = pending.shift(); if (p) p.fn(); }, count() { return pending.length; }, delay() { return pending.length ? pending[0].ms : null; } }; };
const timers = makeTimers(); const T = { setTimer: timers.setTimer, clearTimer: timers.clearTimer };
const p = runHealthChecks({ slow: { fn: () => new Promise(() => {}) } }, { ...T, timeoutMs: 20 });
for (let i = 0; i < 20; i++) await Promise.resolve();
assert(timers.delay() === 20, 'the timeout must use timeoutMs, got ' + timers.delay());
timers.fire();
const r = await p;
assert(r.status === 'down', 'hung check is down');
assert(r.checks.slow.error === 'timeout', 'timeout error, got ' + r.checks.slow.error);` },
    { name: "checks_run_in_parallel", code: `const makeTimers = () => { const pending = []; let seq = 0; return { setTimer(fn, ms) { const id = ++seq; pending.push({ id, fn, ms }); return id; }, clearTimer(id) { const i = pending.findIndex((p) => p.id === id); if (i >= 0) pending.splice(i, 1); }, fire() { const p = pending.shift(); if (p) p.fn(); }, count() { return pending.length; }, delay() { return pending.length ? pending[0].ms : null; } }; };
const timers = makeTimers(); const T = { setTimer: timers.setTimer, clearTimer: timers.clearTimer };
let startedB; const bStarted = new Promise((r) => { startedB = r; });
const r = await runHealthChecks({
  a: { fn: async () => { await bStarted; } },
  b: { fn: async () => { startedB(); } },
}, { ...T, timeoutMs: 500 });
assert(r.status === 'ok', 'check a can only finish if b started while a was still running');` },
    { name: "sync_throw_is_handled", code: `const makeTimers = () => { const pending = []; let seq = 0; return { setTimer(fn, ms) { const id = ++seq; pending.push({ id, fn, ms }); return id; }, clearTimer(id) { const i = pending.findIndex((p) => p.id === id); if (i >= 0) pending.splice(i, 1); }, fire() { const p = pending.shift(); if (p) p.fn(); }, count() { return pending.length; }, delay() { return pending.length ? pending[0].ms : null; } }; };
const timers = makeTimers(); const T = { setTimer: timers.setTimer, clearTimer: timers.clearTimer };
const r = await runHealthChecks({ x: { fn: () => { throw new Error('sync boom'); } } }, T);
assert(r.checks.x.status === 'down' && r.checks.x.error === 'sync boom', 'sync throw becomes down');` },
    { name: "timers_are_cleared_when_checks_finish", code: `const makeTimers = () => { const pending = []; let seq = 0; return { setTimer(fn, ms) { const id = ++seq; pending.push({ id, fn, ms }); return id; }, clearTimer(id) { const i = pending.findIndex((p) => p.id === id); if (i >= 0) pending.splice(i, 1); }, fire() { const p = pending.shift(); if (p) p.fn(); }, count() { return pending.length; }, delay() { return pending.length ? pending[0].ms : null; } }; };
const timers = makeTimers(); const T = { setTimer: timers.setTimer, clearTimer: timers.clearTimer };
await runHealthChecks({ a: { fn: async () => {} }, b: { fn: async () => { throw new Error('x'); }, critical: false } }, T);
assert(timers.count() === 0, 'every timeout timer must be cleared once its check finishes, ' + timers.count() + ' left');` },
  ],
  solution: {
    code: `async function runHealthChecks(checks, { timeoutMs = 1000, setTimer = (fn, ms) => setTimeout(fn, ms), clearTimer = (id) => clearTimeout(id) } = {}) {
  const entries = await Promise.all(
    Object.entries(checks).map(async ([name, check]) => {
      let timer;
      try {
        await Promise.race([
          Promise.resolve().then(check.fn),
          new Promise((_, reject) => {
            timer = setTimer(() => reject(new Error('timeout')), timeoutMs);
          }),
        ]);
        return [name, { status: 'up' }];
      } catch (err) {
        return [name, { status: 'down', error: (err && err.message) || String(err) }];
      } finally {
        clearTimer(timer);
      }
    }),
  );
  const down = entries.filter(([, r]) => r.status === 'down');
  const criticalDown = down.some(([name]) => checks[name].critical !== false);
  const status = criticalDown ? 'down' : down.length > 0 ? 'degraded' : 'ok';
  return {
    status,
    httpStatus: status === 'down' ? 503 : 200,
    checks: Object.fromEntries(entries),
  };
}

module.exports = runHealthChecks;`,
    explanation:
      "Each check catches its own failure, so Promise.all never rejects, and the race against a timer means one hung dependency can't hang the endpoint. Degraded vs down lets you keep serving when only a cache is unhealthy.",
  },
};
