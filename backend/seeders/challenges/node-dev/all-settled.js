export default {
  slug: "all-settled",
  trackId: "node-dev",
  layerId: "node-dev-1",
  type: "CODE",
  difficulty: "med",
  title: "Write Promise.allSettled yourself",
  summary: "Wait for every promise to finish, whether it succeeds or fails, and report each outcome.",
  description:
    "<code>Promise.all</code> rejects as soon as one promise fails and hides the rest. <code>Promise.allSettled</code> waits for everything and reports each result. Rebuilding it shows how promise chaining works.",
  task:
    "Write <code>allSettled(items)</code> returning a promise of an array of <code>{ status: 'fulfilled', value }</code> or <code>{ status: 'rejected', reason }</code>, in input order.",
  constraints: [
    "Do not use <code>Promise.allSettled</code>.",
    "Items can be promises or plain values.",
    "The returned promise never rejects.",
    "Results keep the order of the input, not the order of completion.",
    "All items are awaited concurrently; an empty array resolves to <code>[]</code>.",
  ],
  example: `await allSettled([Promise.resolve(1), Promise.reject(new Error('x'))]) // [{ status: 'fulfilled', value: 1 }, { status: 'rejected', reason: Error }]`,
  tags: ["promises","async","polyfill"],
  estimatedMins: 25,
  xp: 45,
  starterFiles: [
    {
      name: "allSettled.js",
      lang: "js",
      code: `// allSettled.js
function allSettled(items) {
  // your code here
}

module.exports = allSettled;`,
    },
  ],
  testFile: {
    name: "allSettled_test.js",
    lang: "test",
    code: `const allSettled = require('./allSettled');

test('mixed', () => {
  return allSettled([Promise.resolve(1), Promise.reject('no')]).then((r) => expect(r).toEqual([{ status: 'fulfilled', value: 1 }, { status: 'rejected', reason: 'no' }]));
});

test('plain_values', () => {
  return allSettled([5]).then((r) => expect(r[0].value).toBe(5));
});`,
  },
  hints: [
    { order: 1, cost: 0, text: "Turn every item into an outcome object with <code>Promise.resolve(item).then(onFulfilled, onRejected)</code>; both handlers return a plain object, so the chain never rejects." },
    { order: 2, cost: 5, text: "Then <code>Promise.all</code> over those outcome promises: it can't reject, because none of them can." },
    { order: 3, cost: 15, text: "<code>Promise.all</code> preserves input order, which gives you the ordering rule for free." },
  ],
  hiddenTests: [
    { name: "fulfilled_and_rejected_shapes", code: `const err = new Error('x');
const r = await allSettled([Promise.resolve('a'), Promise.reject(err)]);
assert(r[0].status === 'fulfilled' && r[0].value === 'a', 'fulfilled shape');
assert(r[1].status === 'rejected' && r[1].reason === err, 'rejected shape');
assert(!('reason' in r[0]) && !('value' in r[1]), 'no extra keys');` },
    { name: "never_rejects", code: `let rejected = false;
try { await allSettled([Promise.reject(1), Promise.reject(2)]); } catch (e) { rejected = true; }
assert(!rejected, 'must not reject');` },
    { name: "keeps_input_order", code: `const sleep = async (ms) => { for (let i = 0; i < ms * 20; i++) await Promise.resolve(); };
const slow = sleep(20).then(() => 'slow');
const fast = Promise.resolve('fast');
const r = await allSettled([slow, fast]);
assert(r[0].value === 'slow' && r[1].value === 'fast', 'order of input, not completion');` },
    { name: "plain_values_and_thenables", code: `const r = await allSettled([1, 'two', { then(res) { res(3); } }]);
assert(r.map((x) => x.status + ':' + x.value).join(',') === 'fulfilled:1,fulfilled:two,fulfilled:3', 'values: ' + JSON.stringify(r));` },
    { name: "empty_input", code: `const r = await allSettled([]);
assert(Array.isArray(r) && r.length === 0, 'empty array');` },
    { name: "waits_for_all_even_after_a_failure", code: `const sleep = async (ms) => { for (let i = 0; i < ms * 20; i++) await Promise.resolve(); };
let finished = false;
const late = sleep(20).then(() => { finished = true; return 'late'; });
const r = await allSettled([Promise.reject(new Error('early')), late]);
assert(finished === true && r[1].value === 'late', 'must wait for the slow one');` },
    { name: "runs_concurrently", code: `const sleep = async (ms) => { for (let i = 0; i < ms * 20; i++) await Promise.resolve(); };
let active = 0; let peak = 0;
// A thenable starts its work only when allSettled subscribes, so waiting on them one at a time shows a peak of 1.
const job = () => ({ then(res) { active++; peak = Math.max(peak, active); sleep(40).then(() => { active--; res('done'); }); } });
await allSettled([job(), job(), job()]);
assert(peak === 3, 'all three should be in flight together, peak was ' + peak);` },
    { name: "does_not_call_the_builtin", code: `const original = Promise.allSettled;
Promise.allSettled = () => { throw new Error('used the builtin'); };
let ok = true;
try { await allSettled([Promise.resolve(1)]); } catch (e) { ok = false; }
Promise.allSettled = original;
assert(ok, 'must not delegate to Promise.allSettled');` },
  ],
  solution: {
    code: `function allSettled(items) {
  return Promise.all(
    items.map((item) =>
      Promise.resolve(item).then(
        (value) => ({ status: 'fulfilled', value }),
        (reason) => ({ status: 'rejected', reason }),
      ),
    ),
  );
}

module.exports = allSettled;`,
    explanation:
      "Each promise is converted into one that always fulfils with a description of what happened. Promise.all over those can never reject, and it keeps input order.",
  },
};
