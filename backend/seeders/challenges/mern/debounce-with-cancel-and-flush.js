export default {
  slug: "debounce-with-cancel-and-flush",
  trackId: "mern",
  layerId: "mern-2",
  type: "CODE",
  difficulty: "easy",
  title: "debounce() with cancel and flush",
  summary:
    "Implement debounce with the two methods every real implementation needs beyond the basic delay.",
  description:
    "Every debounce tutorial stops at the delay. Real ones — Lodash included — also let the caller cancel a pending call outright, or force it to run immediately. Build both.",
  task:
    "Write <code>debounce(fn, wait, scheduler)</code>, returning a wrapped function. Calling the wrapped function resets a <code>wait</code>-ms timer; when it finally fires, call <code>fn</code> with the most recent arguments. The wrapped function must also expose <code>.cancel()</code>, which discards any pending call with no invocation, and <code>.flush()</code>, which invokes immediately with the most recent pending arguments (and does nothing if nothing is pending). <code>scheduler</code> is <code>{ set(callback, ms), clear(id) }</code>: <code>set</code> starts a timer and returns its id, <code>clear</code> stops it. Use it for every timer instead of the global timer functions. In a real page you would pass <code>{ set: (cb, ms) =&gt; setTimeout(cb, ms), clear: (id) =&gt; clearTimeout(id) }</code>; the tests pass a fake one so they can move time forward by hand.",
  constraints: [
    "Only the most recent set of arguments before the timer fires is ever used, and every call restarts the full <code>wait</code>.",
    "cancel() must prevent the pending call from ever running.",
    "flush() invokes immediately and cancels the pending timer — fn must not also fire later on its own.",
    "flush() with nothing pending must not call fn at all.",
    "Start every timer with <code>scheduler.set</code> and stop it with <code>scheduler.clear</code>; never call a global timer function.",
  ],
  example: `const save = debounce((text) => api.save(text), 300);
input.addEventListener('input', (e) => save(e.target.value));
window.addEventListener('beforeunload', () => save.flush());

// in a test, with a fake clock you control:
const clock = makeClock();
const d = debounce(fn, 100, clock); // clock has set() and clear()
d('a'); clock.advance(99);  // fn has not run yet
clock.advance(1);           // now fn('a') runs`,
  tags: ["timers","closures","async"],
  estimatedMins: 20,
  xp: 35,
  starterFiles: [
    {
      name: "debounce.js",
      lang: "js",
      code: `// debounce.js
function debounce(fn, wait, scheduler) {
  // your code here — the returned function needs .cancel() and .flush() too
}

module.exports = debounce;`,
    },
  ],
  testFile: {
    name: "debounce_test.js",
    lang: "test",
    code: `// debounce_test.js
const debounce = require('./debounce');

const makeClock = () => {
  let now = 0; let nextId = 0; const pending = new Map();
  return {
    set(fn, ms) { const id = ++nextId; pending.set(id, { fn, at: now + ms }); return id; },
    clear(id) { pending.delete(id); },
    advance(ms) {
      now += ms;
      const due = [...pending.entries()].filter(([, t]) => t.at <= now).sort((a, b) => a[1].at - b[1].at);
      for (const [id, t] of due) { if (pending.delete(id)) t.fn(); }
    },
    count() { return pending.size; },
  };
};

test('delays_the_call', () => {
  const clock = makeClock();
  let called = false;
  const fn = debounce(() => { called = true; }, 20, clock);
  fn();
  expect(called).toBe(false);
  clock.advance(20);
  expect(called).toBe(true);
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: {"order":1,"cost":0,"text":"Start timers with <code>scheduler.set(callback, wait)</code> and stop them with <code>scheduler.clear(id)</code>. Keep a single timer id and the last-seen <code>args</code> in the closure; every call clears the previous timer before setting a new one — that reset is the entire 'debounce' behavior."},
    },
    {
      order: 2,
      cost: 5,
      text: {"order":2,"cost":5,"text":{"order":2,"cost":5,"text":"<code>cancel()</code> is just <code>clearTimeout(timeoutId)</code> plus clearing your stored args so a later flush() has nothing to act on."}},
    },
    {
      order: 3,
      cost: 10,
      text: {"order":3,"cost":10,"text":{"order":3,"cost":10,"text":"<code>flush()</code> needs to check whether a call is actually pending (e.g. a boolean flag or checking your stored args aren't empty) before invoking — otherwise flushing an idle debounce would call fn with stale or undefined arguments."}},
    },
  ],
  hiddenTests: [
    {
      name: "delays_and_uses_latest_args",
      code: `const makeClock = () => {
  let now = 0; let nextId = 0; const pending = new Map();
  return {
    set(fn, ms) { const id = ++nextId; pending.set(id, { fn, at: now + ms }); return id; },
    clear(id) { pending.delete(id); },
    advance(ms) {
      now += ms;
      const due = [...pending.entries()].filter(([, t]) => t.at <= now).sort((a, b) => a[1].at - b[1].at);
      for (const [id, t] of due) { if (pending.delete(id)) t.fn(); }
    },
    count() { return pending.size; },
  };
};

const clock = makeClock();
let received = null;
const fn = debounce((v) => { received = v; }, 15, clock);
fn('first');
clock.advance(10);
fn('second');
assert(received === null, 'fn must not run before the wait elapses');
clock.advance(14);
assert(received === null, 'the second call restarts the full wait, so 14ms later it must still be pending');
clock.advance(1);
assert(received === 'second', 'only the most recent call\\'s arguments should be used, got ' + received);`,
    },
    {
      name: "fires_only_once_per_burst",
      code: `const makeClock = () => {
  let now = 0; let nextId = 0; const pending = new Map();
  return {
    set(fn, ms) { const id = ++nextId; pending.set(id, { fn, at: now + ms }); return id; },
    clear(id) { pending.delete(id); },
    advance(ms) {
      now += ms;
      const due = [...pending.entries()].filter(([, t]) => t.at <= now).sort((a, b) => a[1].at - b[1].at);
      for (const [id, t] of due) { if (pending.delete(id)) t.fn(); }
    },
    count() { return pending.size; },
  };
};

const clock = makeClock();
let calls = 0;
const fn = debounce(() => { calls++; }, 10, clock);
fn(); fn(); fn();
clock.advance(100);
assert(calls === 1, 'a burst of calls must produce one invocation, got ' + calls);`,
    },
    {
      name: "cancel_prevents_invocation",
      code: `const makeClock = () => {
  let now = 0; let nextId = 0; const pending = new Map();
  return {
    set(fn, ms) { const id = ++nextId; pending.set(id, { fn, at: now + ms }); return id; },
    clear(id) { pending.delete(id); },
    advance(ms) {
      now += ms;
      const due = [...pending.entries()].filter(([, t]) => t.at <= now).sort((a, b) => a[1].at - b[1].at);
      for (const [id, t] of due) { if (pending.delete(id)) t.fn(); }
    },
    count() { return pending.size; },
  };
};

const clock = makeClock();
let calls = 0;
const fn = debounce(() => { calls++; }, 15, clock);
fn();
fn.cancel();
clock.advance(100);
assert(calls === 0, 'a cancelled call must never invoke fn, got ' + calls + ' calls');`,
    },
    {
      name: "flush_invokes_immediately_with_latest_args",
      code: `const makeClock = () => {
  let now = 0; let nextId = 0; const pending = new Map();
  return {
    set(fn, ms) { const id = ++nextId; pending.set(id, { fn, at: now + ms }); return id; },
    clear(id) { pending.delete(id); },
    advance(ms) {
      now += ms;
      const due = [...pending.entries()].filter(([, t]) => t.at <= now).sort((a, b) => a[1].at - b[1].at);
      for (const [id, t] of due) { if (pending.delete(id)) t.fn(); }
    },
    count() { return pending.size; },
  };
};

const clock = makeClock();
let received = null, calls = 0;
const fn = debounce((v) => { received = v; calls++; }, 1000, clock);
fn('a');
fn('b');
fn.flush();
assert(received === 'b', 'flush must invoke synchronously with the latest pending arguments');
clock.advance(5000);
assert(calls === 1, 'after flush, the original timer must not also fire — fn was called ' + calls + ' times total');`,
    },
    {
      name: "flush_with_nothing_pending_is_a_no_op",
      code: `const makeClock = () => {
  let now = 0; let nextId = 0; const pending = new Map();
  return {
    set(fn, ms) { const id = ++nextId; pending.set(id, { fn, at: now + ms }); return id; },
    clear(id) { pending.delete(id); },
    advance(ms) {
      now += ms;
      const due = [...pending.entries()].filter(([, t]) => t.at <= now).sort((a, b) => a[1].at - b[1].at);
      for (const [id, t] of due) { if (pending.delete(id)) t.fn(); }
    },
    count() { return pending.size; },
  };
};

const clock = makeClock();
let calls = 0;
const fn = debounce(() => { calls++; }, 15, clock);
fn.flush();
assert(calls === 0, 'flushing an idle debounce (nothing pending) must not call fn');
fn('x'); clock.advance(15);
fn.flush();
assert(calls === 1, 'after the call already ran, flush has nothing pending, got ' + calls);`,
    },
    {
      name: "calling_again_after_flush_starts_a_fresh_cycle",
      code: `const makeClock = () => {
  let now = 0; let nextId = 0; const pending = new Map();
  return {
    set(fn, ms) { const id = ++nextId; pending.set(id, { fn, at: now + ms }); return id; },
    clear(id) { pending.delete(id); },
    advance(ms) {
      now += ms;
      const due = [...pending.entries()].filter(([, t]) => t.at <= now).sort((a, b) => a[1].at - b[1].at);
      for (const [id, t] of due) { if (pending.delete(id)) t.fn(); }
    },
    count() { return pending.size; },
  };
};

const clock = makeClock();
const received = [];
const fn = debounce((v) => { received.push(v); }, 15, clock);
fn('a');
fn.flush();
fn('b');
clock.advance(15);
assert(received.join(',') === 'a,b', 'a call after flush must start a normal new debounce cycle, got ' + received.join(','));`,
    },
    {
      name: "uses_the_scheduler_and_leaves_no_timer_pending",
      code: `const makeClock = () => {
  let now = 0; let nextId = 0; const pending = new Map();
  return {
    set(fn, ms) { const id = ++nextId; pending.set(id, { fn, at: now + ms }); return id; },
    clear(id) { pending.delete(id); },
    advance(ms) {
      now += ms;
      const due = [...pending.entries()].filter(([, t]) => t.at <= now).sort((a, b) => a[1].at - b[1].at);
      for (const [id, t] of due) { if (pending.delete(id)) t.fn(); }
    },
    count() { return pending.size; },
  };
};

const clock = makeClock();
const fn = debounce(() => {}, 15, clock);
fn(); fn(); fn();
assert(clock.count() === 1, 'each call must clear the previous timer; exactly one should be pending, got ' + clock.count());
fn.cancel();
assert(clock.count() === 0, 'cancel must clear the timer, got ' + clock.count() + ' pending');`,
    },
  ],
  solution: {
    code: `function debounce(fn, wait, scheduler) {
  const { set, clear } = scheduler;
  let timeoutId = null;
  let pendingArgs = null;
  let hasPending = false;

  const invoke = () => {
    const args = pendingArgs;
    hasPending = false;
    pendingArgs = null;
    timeoutId = null;
    fn(...args);
  };

  function wrapped(...args) {
    pendingArgs = args;
    hasPending = true;
    if (timeoutId !== null) clear(timeoutId);
    timeoutId = set(invoke, wait);
  }

  wrapped.cancel = () => {
    if (timeoutId !== null) clear(timeoutId);
    timeoutId = null;
    pendingArgs = null;
    hasPending = false;
  };

  wrapped.flush = () => {
    if (!hasPending) return;
    if (timeoutId !== null) clear(timeoutId);
    invoke();
  };

  return wrapped;
}

module.exports = debounce;`,
    explanation:
      "The closure holds exactly one pending timer and one set of pending arguments at a time — every call clears whatever timer is scheduled and starts a fresh one, which is the reset behavior debounce is named for, and means only the most recent arguments ever get used. Timers come from the scheduler passed in as the third argument: that small injection is what makes the function testable without waiting real time, and it is a common pattern for any code that depends on a clock. hasPending exists so flush() can tell 'nothing is scheduled' from 'something is scheduled with these arguments' — without it, flushing an idle debounce would throw on undefined args or invoke with stale data. Both cancel() and flush() clear the pending timer before anything else, which stops the original timer from also firing fn a second time after a flush.",
  },
};
