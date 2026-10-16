export default {
  slug: "fake-clock",
  trackId: "mern",
  layerId: "mern-9",
  type: "CODE",
  difficulty: "med",
  title: "A fake clock for testing timers",
  summary:
    "Schedule callbacks on a virtual clock you advance by hand, like jest.useFakeTimers().",
  description:
    "Tests that wait for real time are slow and flaky. A fake clock replaces timers with a virtual one: you register callbacks, then move time forward explicitly and the due callbacks run immediately, in the right order. The same idea powers jest.useFakeTimers() and sinon's fake timers.",
  task:
    "Write <code>createFakeClock()</code> returning <code>{ schedule(fn, ms), every(fn, ms), cancel(id), tick(ms), runAll(), now(), pending() }</code>. Time starts at 0. <code>schedule</code> runs <code>fn</code> once after <code>ms</code> and returns a numeric id; <code>every</code> runs it repeatedly every <code>ms</code>; <code>cancel(id)</code> removes a scheduled item (unknown ids are ignored). <code>tick(ms)</code> moves time forward by <code>ms</code>, running every callback whose time is due, in order of due time, and for equal times in the order they were created; <code>now()</code> equals the due time while a callback runs and ends at the new time. A callback may schedule more work: items that become due inside the same tick also run during that tick. <code>runAll()</code> runs every pending one-off timer in time order, advancing time to each; if an <code>every</code> timer is pending it throws <code>Error('runAll would never finish: an interval is pending')</code>. <code>pending()</code> returns how many items are scheduled.",
  constraints: [
    "A <code>delay</code> of 0 (or less) runs at the current time during the next <code>tick</code> (even <code>tick(0)</code>).",
    "An interval whose callback calls <code>cancel</code> on itself must stop.",
    "Throw <code>RangeError('interval must be positive')</code> from <code>every</code> if <code>ms &lt;= 0</code>.",
    "Ids are unique, positive and never reused.",
  ],
  example: `const clock = createFakeClock();
const log = [];
clock.schedule(() => log.push('a'), 100);
clock.every(() => log.push('tick'), 40);
clock.tick(100);   // log: ['tick', 'tick', 'a']  (the interval ran at 40 and 80, 'a' at 100)
clock.now();       // 100`,
  tags: ["testing","timers","time","fake-timers"],
  estimatedMins: 40,
  xp: 45,
  starterFiles: [
    {
      name: "createFakeClock.js",
      lang: "js",
      code: `// createFakeClock.js
function createFakeClock() {
  // your code here
}

module.exports = createFakeClock;`,
    },
  ],
  testFile: {
    name: "createFakeClock_test.js",
    lang: "test",
    code: `// createFakeClock_test.js
const createFakeClock = require('./createFakeClock');

test('runs_due_callbacks_and_advances_time', () => {
  // see the hidden tests for the full checks
  expect(typeof createFakeClock).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Store timers as objects <code>{ id, time, seq, fn, interval }</code>. <code>seq</code> is a global creation counter used to break ties between equal due times.",
    },
    {
      order: 2,
      cost: 5,
      text: "In <code>tick</code>, compute <code>target = now + ms</code>, then loop: find the pending timer with the smallest <code>(time, seq)</code> where <code>time &lt;= target</code>; if none, stop. Set <code>now = max(now, timer.time)</code>, remove it (or reschedule it with <code>time += interval</code> and a new seq for an interval) and call it. After the loop set <code>now = target</code>.",
    },
    {
      order: 3,
      cost: 10,
      text: "<code>runAll</code> first checks for any interval and throws; otherwise it repeatedly takes the earliest timer and runs it (jumping <code>now</code> forward) until none are left.",
    },
  ],
  hiddenTests: [
    {
      name: "runs_due_callbacks_and_advances_time",
      code: `const c = createFakeClock();
const log = [];
c.schedule(() => log.push('a'), 50);
c.schedule(() => log.push('b'), 100);
c.tick(49);
assert(log.length === 0 && c.now() === 49, 'nothing is due yet, got ' + JSON.stringify(log));
c.tick(1);
assert(log.join() === 'a' && c.now() === 50, 'a runs at 50');
c.tick(500);
assert(log.join() === 'a,b' && c.now() === 550, 'b runs, time ends at 550, got now=' + c.now());`,
    },
    {
      name: "order_is_by_due_time_then_creation",
      code: `const c = createFakeClock();
const log = [];
c.schedule(() => log.push('late'), 30);
c.schedule(() => log.push('first-at-10'), 10);
c.schedule(() => log.push('second-at-10'), 10);
c.tick(100);
assert(log.join() === 'first-at-10,second-at-10,late', 'got ' + log.join());`,
    },
    {
      name: "now_equals_the_due_time_while_a_callback_runs",
      code: `const c = createFakeClock();
const seen = [];
c.schedule(() => seen.push(c.now()), 30);
c.schedule(() => seen.push(c.now()), 70);
c.tick(100);
assert(seen.join() === '30,70', 'now() inside callbacks, got ' + seen.join());
assert(c.now() === 100, 'and time ends at the target');`,
    },
    {
      name: "intervals_repeat_and_can_cancel_themselves",
      code: `const c = createFakeClock();
let n = 0;
const id = c.every(() => { n++; if (n === 3) c.cancel(id); }, 10);
c.tick(100);
assert(n === 3, 'the interval stopped itself after 3 runs, got ' + n);
assert(c.pending() === 0, 'nothing pending afterwards, got ' + c.pending());`,
    },
    {
      name: "cancel_removes_scheduled_work_and_ignores_unknown_ids",
      code: `const c = createFakeClock();
let ran = false;
const id = c.schedule(() => { ran = true; }, 10);
assert(c.pending() === 1, 'one pending');
c.cancel(id);
c.cancel(9999);
c.tick(100);
assert(ran === false && c.pending() === 0, 'a cancelled timer never runs');`,
    },
    {
      name: "callbacks_can_schedule_work_inside_the_same_tick",
      code: `const c = createFakeClock();
const log = [];
c.schedule(() => { log.push('outer@' + c.now()); c.schedule(() => log.push('inner@' + c.now()), 20); }, 10);
c.tick(100);
assert(log.join() === 'outer@10,inner@30', 'work scheduled by a callback runs in the same tick if due, got ' + log.join());
const d = createFakeClock();
const order = [];
d.schedule(() => { order.push('a'); d.schedule(() => order.push('zero'), 0); }, 5);
d.schedule(() => order.push('b'), 5);
d.tick(5);
assert(order.join() === 'a,b,zero', 'a zero delay runs after already-due items, got ' + order.join());`,
    },
    {
      name: "zero_delay_runs_on_the_next_tick",
      code: `const c = createFakeClock();
let ran = 0;
c.schedule(() => ran++, 0);
c.schedule(() => ran++, -5);
assert(ran === 0, 'nothing runs until time is advanced');
c.tick(0);
assert(ran === 2, 'tick(0) runs zero-delay items, got ' + ran);`,
    },
    {
      name: "run_all_drains_one_off_timers_in_order",
      code: `const c = createFakeClock();
const log = [];
c.schedule(() => log.push('b@' + c.now()), 200);
c.schedule(() => { log.push('a@' + c.now()); c.schedule(() => log.push('c@' + c.now()), 500); }, 100);
c.runAll();
assert(log.join() === 'a@100,b@200,c@600', 'got ' + log.join());
assert(c.pending() === 0 && c.now() === 600, 'drained, now=' + c.now());`,
    },
    {
      name: "run_all_refuses_to_run_forever_with_an_interval",
      code: `const c = createFakeClock();
c.every(() => {}, 10);
let err = null;
try { c.runAll(); } catch (e) { err = e; }
assert(err && err.message === 'runAll would never finish: an interval is pending', 'got ' + (err && err.message));
let e2 = null;
try { c.every(() => {}, 0); } catch (e) { e2 = e; }
assert(e2 instanceof RangeError && e2.message === 'interval must be positive', 'got ' + (e2 && e2.message));`,
    },
    {
      name: "ids_are_unique",
      code: `const c = createFakeClock();
const ids = [c.schedule(() => {}, 1), c.schedule(() => {}, 1), c.every(() => {}, 5)];
assert(new Set(ids).size === 3 && ids.every((i) => typeof i === 'number' && i > 0), 'unique positive numeric ids, got ' + JSON.stringify(ids));`,
    },
  ],
  solution: {
    code: `function createFakeClock() {
  let now = 0;
  let nextId = 1;
  let seq = 0;
  let timers = [];

  const add = (fn, ms, interval) => {
    const timer = { id: nextId++, time: now + Math.max(0, ms), seq: seq++, fn, interval };
    timers.push(timer);
    return timer.id;
  };

  const earliest = (limit) => {
    let best = null;
    for (const t of timers) {
      if (t.time > limit) continue;
      if (!best || t.time < best.time || (t.time === best.time && t.seq < best.seq)) best = t;
    }
    return best;
  };

  const runOne = (timer) => {
    now = Math.max(now, timer.time);
    if (timer.interval !== undefined) {
      timer.time += timer.interval;
      timer.seq = seq++;
    } else {
      timers = timers.filter((t) => t !== timer);
    }
    timer.fn();
  };

  return {
    schedule: (fn, ms) => add(fn, ms),
    every(fn, ms) {
      if (!(ms > 0)) throw new RangeError('interval must be positive');
      return add(fn, ms, ms);
    },
    cancel(id) {
      timers = timers.filter((t) => t.id !== id);
    },
    tick(ms) {
      const target = now + ms;
      let timer = earliest(target);
      while (timer) {
        runOne(timer);
        timer = earliest(target);
      }
      now = target;
    },
    runAll() {
      if (timers.some((t) => t.interval !== undefined)) {
        throw new Error('runAll would never finish: an interval is pending');
      }
      let timer = earliest(Infinity);
      while (timer) {
        runOne(timer);
        timer = earliest(Infinity);
      }
    },
    now: () => now,
    pending: () => timers.length,
  };
}

module.exports = createFakeClock;`,
    explanation:
      "The clock is just a list of timers plus a number. Everything interesting happens in one rule: always run the timer with the smallest (due time, creation order) that is not later than the target, then look again. Looking again after each run, instead of sorting once, is what makes callbacks that schedule more work behave correctly inside the same tick, and the creation counter is what gives a stable order for ties, including a zero-delay timer created by a callback running after the items that were already due. Time jumps to a timer's due time before it runs, so a callback that reads now() sees the moment it was scheduled for, not the end of the tick. An interval is rescheduled before its callback runs, which is why a callback can cancel its own interval and stop it. runAll refuses when an interval exists because draining a repeating timer never terminates, which mirrors the error real fake-timer libraries raise.",
  },
};
