export default {
  slug: "graceful-shutdown-tracker",
  trackId: "api-dev",
  layerId: "api-dev-10",
  type: "CODE",
  difficulty: "med",
  title: "Graceful shutdown: drain in-flight requests",
  summary: "Stop accepting work on SIGTERM, wait for running requests to finish, but never wait forever.",
  description:
    "When Kubernetes or Render stops your container it sends SIGTERM and later SIGKILL. A graceful shutdown stops taking new requests, lets in-flight ones finish, then exits, so deploys don't drop users' requests.",
  task:
    "Write <code>createShutdownTracker({ timeoutMs = 10000, setTimer, clearTimer })</code> returning <code>{ begin(), shutdown(), isShuttingDown(), inFlight() }</code>.",
  constraints: [
    "<code>begin()</code> marks one unit of work as started and returns an <code>end</code> function; it returns <code>null</code> once shutdown has started (reject the request with 503).",
    "Calling <code>end()</code> more than once must not count twice.",
    "<code>shutdown()</code> returns a promise: <code>{ drained: true, remaining: 0 }</code> as soon as in-flight reaches 0 (immediately if already 0), or after <code>timeoutMs</code> <code>{ drained: false, remaining: n }</code>.",
    "Calling <code>shutdown()</code> again returns the same promise.",
    "<code>inFlight()</code> is the current count; clear the timeout timer when draining succeeds.",
    "Start and stop the timeout with the <code>setTimer(fn, ms)</code> and <code>clearTimer(id)</code> options, which default to the global <code>setTimeout</code> and <code>clearTimeout</code>. Tests pass in fakes so they can control time.",
  ],
  example: `const t = createShutdownTracker({ timeoutMs: 5000 }); const end = t.begin(); /* handle request */ end(); await t.shutdown();`,
  tags: ["production","docker","kubernetes","reliability"],
  estimatedMins: 30,
  xp: 45,
  starterFiles: [
    {
      name: "createShutdownTracker.js",
      lang: "js",
      code: `// createShutdownTracker.js
function createShutdownTracker(options = {}) {
  // your code here
}

module.exports = createShutdownTracker;`,
    },
  ],
  testFile: {
    name: "createShutdownTracker_test.js",
    lang: "test",
    code: `const createShutdownTracker = require('./createShutdownTracker');

test('counts', () => {
  const t = createShutdownTracker(); const end = t.begin(); expect(t.inFlight()).toBe(1); end(); expect(t.inFlight()).toBe(0);
});

test('idle_shutdown', () => {
  return createShutdownTracker().shutdown().then((r) => expect(r.drained).toBe(true));
});`,
  },
  hints: [
    { order: 1, cost: 0, text: "Keep <code>inflight</code>, a <code>closing</code> flag, and store a <code>finish</code> callback that the last <code>end()</code> calls." },
    { order: 2, cost: 5, text: "Guard each <code>end</code> with its own <code>ended</code> boolean so double calls are harmless." },
    { order: 3, cost: 15, text: "In <code>shutdown</code>, create the promise once and cache it; race a timer (started with <code>setTimer</code>) against the drain." },
  ],
  hiddenTests: [
    { name: "begin_end_counts", code: `const t = createShutdownTracker();
const e1 = t.begin(); const e2 = t.begin();
assert(t.inFlight() === 2, 'two in flight');
e1(); assert(t.inFlight() === 1, 'one left');
e2(); assert(t.inFlight() === 0, 'none');` },
    { name: "end_is_idempotent", code: `const t = createShutdownTracker();
const e1 = t.begin(); t.begin();
e1(); e1(); e1();
assert(t.inFlight() === 1, 'a repeated end() must not decrement again, got ' + t.inFlight());` },
    { name: "idle_shutdown_resolves_immediately", code: `const t = createShutdownTracker();
const r = await t.shutdown();
assert(r.drained === true && r.remaining === 0, 'drained');
assert(t.isShuttingDown() === true, 'flag set');` },
    { name: "begin_after_shutdown_is_rejected", code: `const t = createShutdownTracker();
t.shutdown();
assert(t.begin() === null, 'new work refused');
assert(t.inFlight() === 0, 'and not counted');` },
    { name: "waits_for_in_flight_work", code: `const makeTimers = () => { const pending = []; let seq = 0; return { setTimer(fn, ms) { const id = ++seq; pending.push({ id, fn, ms }); return id; }, clearTimer(id) { const i = pending.findIndex((p) => p.id === id); if (i >= 0) pending.splice(i, 1); }, fire() { const p = pending.shift(); if (p) p.fn(); }, count() { return pending.length; }, delay() { return pending.length ? pending[0].ms : null; } }; };
const timers = makeTimers();
const t = createShutdownTracker({ timeoutMs: 1000, setTimer: timers.setTimer, clearTimer: timers.clearTimer });
const end = t.begin();
let done = false;
const p = t.shutdown().then((r) => { done = true; return r; });
for (let i = 0; i < 20; i++) await Promise.resolve();
assert(done === false, 'must still be waiting while a request is running');
end();
const r = await p;
assert(r.drained === true && r.remaining === 0, 'drained after the last request ended');` },
    { name: "drains_when_last_of_many_ends", code: `const makeTimers = () => { const pending = []; let seq = 0; return { setTimer(fn, ms) { const id = ++seq; pending.push({ id, fn, ms }); return id; }, clearTimer(id) { const i = pending.findIndex((p) => p.id === id); if (i >= 0) pending.splice(i, 1); }, fire() { const p = pending.shift(); if (p) p.fn(); }, count() { return pending.length; }, delay() { return pending.length ? pending[0].ms : null; } }; };
const timers = makeTimers();
const t = createShutdownTracker({ timeoutMs: 1000, setTimer: timers.setTimer, clearTimer: timers.clearTimer });
const a = t.begin(); const b = t.begin();
const p = t.shutdown();
a();
let early = false;
p.then(() => { early = true; });
for (let i = 0; i < 20; i++) await Promise.resolve();
assert(early === false, 'one request still running');
b();
assert((await p).drained === true, 'now drained');` },
    { name: "times_out_with_remaining_count", code: `const makeTimers = () => { const pending = []; let seq = 0; return { setTimer(fn, ms) { const id = ++seq; pending.push({ id, fn, ms }); return id; }, clearTimer(id) { const i = pending.findIndex((p) => p.id === id); if (i >= 0) pending.splice(i, 1); }, fire() { const p = pending.shift(); if (p) p.fn(); }, count() { return pending.length; }, delay() { return pending.length ? pending[0].ms : null; } }; };
const timers = makeTimers();
const t = createShutdownTracker({ timeoutMs: 20, setTimer: timers.setTimer, clearTimer: timers.clearTimer });
t.begin(); t.begin();
const p = t.shutdown();
assert(timers.delay() === 20, 'the timer must use timeoutMs, got ' + timers.delay());
timers.fire();
const r = await p;
assert(r.drained === false && r.remaining === 2, 'forced: ' + JSON.stringify(r));` },
    { name: "clears_the_timer_once_drained", code: `const makeTimers = () => { const pending = []; let seq = 0; return { setTimer(fn, ms) { const id = ++seq; pending.push({ id, fn, ms }); return id; }, clearTimer(id) { const i = pending.findIndex((p) => p.id === id); if (i >= 0) pending.splice(i, 1); }, fire() { const p = pending.shift(); if (p) p.fn(); }, count() { return pending.length; }, delay() { return pending.length ? pending[0].ms : null; } }; };
const timers = makeTimers();
const t = createShutdownTracker({ timeoutMs: 1000, setTimer: timers.setTimer, clearTimer: timers.clearTimer });
const end = t.begin();
const p = t.shutdown();
assert(timers.count() === 1, 'a timeout timer is running while waiting');
end();
await p;
assert(timers.count() === 0, 'the timer must be cleared when draining succeeds');` },
    { name: "shutdown_twice_returns_same_promise", code: `const makeTimers = () => { const pending = []; let seq = 0; return { setTimer(fn, ms) { const id = ++seq; pending.push({ id, fn, ms }); return id; }, clearTimer(id) { const i = pending.findIndex((p) => p.id === id); if (i >= 0) pending.splice(i, 1); }, fire() { const p = pending.shift(); if (p) p.fn(); }, count() { return pending.length; }, delay() { return pending.length ? pending[0].ms : null; } }; };
const timers = makeTimers();
const t = createShutdownTracker({ timeoutMs: 20, setTimer: timers.setTimer, clearTimer: timers.clearTimer });
t.begin();
const p1 = t.shutdown(); const p2 = t.shutdown();
assert(p1 === p2, 'same promise');
assert(timers.count() === 1, 'only one timer, however many times shutdown is called');
timers.fire();
await p1;` },
  ],
  solution: {
    code: `function createShutdownTracker({ timeoutMs = 10000, setTimer = (fn, ms) => setTimeout(fn, ms), clearTimer = (id) => clearTimeout(id) } = {}) {
  let inflight = 0;
  let closing = false;
  let finish = null;
  let shutdownPromise = null;
  return {
    begin() {
      if (closing) return null;
      inflight++;
      let ended = false;
      return function end() {
        if (ended) return;
        ended = true;
        inflight--;
        if (closing && inflight === 0 && finish) finish();
      };
    },
    isShuttingDown() {
      return closing;
    },
    inFlight() {
      return inflight;
    },
    shutdown() {
      if (shutdownPromise) return shutdownPromise;
      closing = true;
      shutdownPromise = new Promise((resolve) => {
        if (inflight === 0) {
          resolve({ drained: true, remaining: 0 });
          return;
        }
        const timer = setTimer(() => resolve({ drained: false, remaining: inflight }), timeoutMs);
        finish = () => {
          clearTimer(timer);
          resolve({ drained: true, remaining: 0 });
        };
      });
      return shutdownPromise;
    },
  };
}

module.exports = createShutdownTracker;`,
    explanation:
      "A counter plus a closing flag. The last end() after shutdown starts fires the finish callback, and a timer races it so a stuck request can't block the deploy forever.",
  },
};
