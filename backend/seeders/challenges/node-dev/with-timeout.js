export default {
  slug: "with-timeout",
  trackId: "node-dev",
  layerId: "node-dev-1",
  type: "CODE",
  difficulty: "med",
  title: "Add a timeout to any promise",
  summary: "Race a promise against a timer and clean the timer up afterwards.",
  description:
    "A promise can hang forever: a slow database, a dead network. Production code wraps risky calls in a timeout. Done wrong, it also leaves a timer running that keeps Node alive.",
  task:
    "Write <code>withTimeout(promise, ms, { setTimer, clearTimer })</code> returning a promise that settles like <code>promise</code> if it finishes within <code>ms</code> milliseconds, otherwise rejects with an <code>Error</code> whose message is <code>'Timed out after &lt;ms&gt;ms'</code>.",
  constraints: [
    "If the promise fulfils or rejects first, pass that result through unchanged.",
    "The timer must be cleared as soon as the promise settles.",
    "Start and stop the timer with the <code>setTimer(fn, ms)</code> and <code>clearTimer(id)</code> options, which default to the global <code>setTimeout</code> and <code>clearTimeout</code>. Tests pass in fakes so they can control time.",
    "Plain (non-promise) values are accepted and resolve immediately.",
    "A late result after the timeout is ignored (the returned promise has already rejected).",
  ],
  example: `await withTimeout(fetchUser(), 2000); // rejects with 'Timed out after 2000ms' if fetchUser takes longer`,
  tags: ["promises","async","event-loop","timers"],
  estimatedMins: 25,
  xp: 45,
  starterFiles: [
    {
      name: "withTimeout.js",
      lang: "js",
      code: `// withTimeout.js
function withTimeout(promise, ms, options = {}) {
  // your code here
}

module.exports = withTimeout;`,
    },
  ],
  testFile: {
    name: "withTimeout_test.js",
    lang: "test",
    code: `const withTimeout = require('./withTimeout');

test('passes_value', () => {
  return withTimeout(Promise.resolve(5), 100).then((v) => expect(v).toBe(5));
});

test('times_out', () => {
  return withTimeout(new Promise(() => {}), 10).then(() => expect(true).toBe(false), (e) => expect(e.message).toBe('Timed out after 10ms'));
});`,
  },
  hints: [
    { order: 1, cost: 0, text: "Create a second promise that rejects inside a timer started with <code>setTimer</code>, and store the timer id in a variable declared outside it." },
    { order: 2, cost: 5, text: "<code>Promise.race([promise, timeoutPromise])</code> settles with whichever is first." },
    { order: 3, cost: 15, text: "Add <code>.finally(() =&gt; clearTimer(timer))</code> to the race so the timer is always cleaned up." },
  ],
  hiddenTests: [
    { name: "resolves_with_the_value", code: `const makeTimers = () => { const pending = []; let seq = 0; return { setTimer(fn, ms) { const id = ++seq; pending.push({ id, fn, ms }); return id; }, clearTimer(id) { const i = pending.findIndex((p) => p.id === id); if (i >= 0) pending.splice(i, 1); }, fire() { const p = pending.shift(); if (p) p.fn(); }, count() { return pending.length; }, delay() { return pending.length ? pending[0].ms : null; } }; };
const timers = makeTimers(); const T = { setTimer: timers.setTimer, clearTimer: timers.clearTimer };
const v = await withTimeout(Promise.resolve().then(() => 'ok'), 200, T);
assert(v === 'ok', 'value passes through');` },
    { name: "rejects_with_the_original_error", code: `const makeTimers = () => { const pending = []; let seq = 0; return { setTimer(fn, ms) { const id = ++seq; pending.push({ id, fn, ms }); return id; }, clearTimer(id) { const i = pending.findIndex((p) => p.id === id); if (i >= 0) pending.splice(i, 1); }, fire() { const p = pending.shift(); if (p) p.fn(); }, count() { return pending.length; }, delay() { return pending.length ? pending[0].ms : null; } }; };
const timers = makeTimers(); const T = { setTimer: timers.setTimer, clearTimer: timers.clearTimer };
const err = new Error('db down'); let got = null;
try { await withTimeout(Promise.reject(err), 200, T); } catch (e) { got = e; }
assert(got === err, 'same error object');` },
    { name: "times_out_with_message", code: `const makeTimers = () => { const pending = []; let seq = 0; return { setTimer(fn, ms) { const id = ++seq; pending.push({ id, fn, ms }); return id; }, clearTimer(id) { const i = pending.findIndex((p) => p.id === id); if (i >= 0) pending.splice(i, 1); }, fire() { const p = pending.shift(); if (p) p.fn(); }, count() { return pending.length; }, delay() { return pending.length ? pending[0].ms : null; } }; };
const timers = makeTimers(); const T = { setTimer: timers.setTimer, clearTimer: timers.clearTimer };
let got = null;
const p = withTimeout(new Promise(() => {}), 15, T).catch((e) => { got = e; });
for (let i = 0; i < 20; i++) await Promise.resolve();
timers.fire();
await p;
assert(got instanceof Error, 'rejects with an Error');
assert(got.message === 'Timed out after 15ms', 'message: ' + (got && got.message));` },
    { name: "timer_uses_the_ms_given", code: `const makeTimers = () => { const pending = []; let seq = 0; return { setTimer(fn, ms) { const id = ++seq; pending.push({ id, fn, ms }); return id; }, clearTimer(id) { const i = pending.findIndex((p) => p.id === id); if (i >= 0) pending.splice(i, 1); }, fire() { const p = pending.shift(); if (p) p.fn(); }, count() { return pending.length; }, delay() { return pending.length ? pending[0].ms : null; } }; };
const timers = makeTimers(); const T = { setTimer: timers.setTimer, clearTimer: timers.clearTimer };
let settled = false;
const p = withTimeout(new Promise(() => {}), 40, T).catch(() => {}).then(() => { settled = true; });
for (let i = 0; i < 20; i++) await Promise.resolve();
assert(timers.delay() === 40, 'the timer must be started with ms, got ' + timers.delay());
assert(settled === false, 'must not reject before the timer fires');
timers.fire();
await p;
assert(settled === true, 'rejects once the timer fires');` },
    { name: "plain_values", code: `const makeTimers = () => { const pending = []; let seq = 0; return { setTimer(fn, ms) { const id = ++seq; pending.push({ id, fn, ms }); return id; }, clearTimer(id) { const i = pending.findIndex((p) => p.id === id); if (i >= 0) pending.splice(i, 1); }, fire() { const p = pending.shift(); if (p) p.fn(); }, count() { return pending.length; }, delay() { return pending.length ? pending[0].ms : null; } }; };
const timers = makeTimers(); const T = { setTimer: timers.setTimer, clearTimer: timers.clearTimer };
assert(await withTimeout(42, 50, T) === 42, 'plain value');` },
    { name: "late_result_is_ignored", code: `const makeTimers = () => { const pending = []; let seq = 0; return { setTimer(fn, ms) { const id = ++seq; pending.push({ id, fn, ms }); return id; }, clearTimer(id) { const i = pending.findIndex((p) => p.id === id); if (i >= 0) pending.splice(i, 1); }, fire() { const p = pending.shift(); if (p) p.fn(); }, count() { return pending.length; }, delay() { return pending.length ? pending[0].ms : null; } }; };
const timers = makeTimers(); const T = { setTimer: timers.setTimer, clearTimer: timers.clearTimer };
let resolveLate; const slow = new Promise((r) => { resolveLate = r; });
let got = null;
const p = withTimeout(slow, 10, T).catch((e) => { got = e; });
for (let i = 0; i < 20; i++) await Promise.resolve();
timers.fire();
await p;
assert(got && got.message === 'Timed out after 10ms', 'timeout wins');
resolveLate('late');
for (let i = 0; i < 20; i++) await Promise.resolve();
assert(got.message === 'Timed out after 10ms', 'a late result changes nothing');` },
    { name: "clears_the_timer_on_success", code: `const makeTimers = () => { const pending = []; let seq = 0; return { setTimer(fn, ms) { const id = ++seq; pending.push({ id, fn, ms }); return id; }, clearTimer(id) { const i = pending.findIndex((p) => p.id === id); if (i >= 0) pending.splice(i, 1); }, fire() { const p = pending.shift(); if (p) p.fn(); }, count() { return pending.length; }, delay() { return pending.length ? pending[0].ms : null; } }; };
const timers = makeTimers(); const T = { setTimer: timers.setTimer, clearTimer: timers.clearTimer };
await withTimeout(Promise.resolve(1), 1000, T);
assert(timers.count() === 0, 'the timer must be cleared when the promise wins');` },
    { name: "clears_the_timer_on_failure", code: `const makeTimers = () => { const pending = []; let seq = 0; return { setTimer(fn, ms) { const id = ++seq; pending.push({ id, fn, ms }); return id; }, clearTimer(id) { const i = pending.findIndex((p) => p.id === id); if (i >= 0) pending.splice(i, 1); }, fire() { const p = pending.shift(); if (p) p.fn(); }, count() { return pending.length; }, delay() { return pending.length ? pending[0].ms : null; } }; };
const timers = makeTimers(); const T = { setTimer: timers.setTimer, clearTimer: timers.clearTimer };
try { await withTimeout(Promise.reject(new Error('x')), 1000, T); } catch (e) {}
assert(timers.count() === 0, 'also on rejection');` },
  ],
  solution: {
    code: `function withTimeout(promise, ms, { setTimer = (fn, t) => setTimeout(fn, t), clearTimer = (id) => clearTimeout(id) } = {}) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimer(() => reject(new Error('Timed out after ' + ms + 'ms')), ms);
  });
  return Promise.race([Promise.resolve(promise), timeout]).finally(() => clearTimer(timer));
}

module.exports = withTimeout;`,
    explanation:
      "Promise.race settles with the first of the two. finally runs either way, so the timer never outlives the call. The event loop would otherwise stay alive until the timer fires.",
  },
};
