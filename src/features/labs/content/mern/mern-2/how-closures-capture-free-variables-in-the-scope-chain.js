// Lab for the mern-2 lesson "How closures capture free variables in the scope chain".
// Debug -> Build -> Review AI code. labs.test.js runs every starter (must fail),
// solution (must pass) and the review task's AI code and proof test.

export default {
  minutes: 15,
  status: "draft",
  tasks: [
    {
      id: "closures-fix-shared-loop-variable",
      type: "fix",
      title: "Every button says 3",
      prompt:
        "A to-do app creates one click handler per item. Clicking **any** item gives `3` instead of its own index. Find out why the handlers share one value, then fix it so each handler returns its own index.",
      goals: ["All three handlers return their own index", "Name the bug in one line"],
      file: "handlers.js",
      starter: `function makeHandlers() {
  var handlers = [];
  for (var i = 0; i < 3; i++) {
    handlers.push(function () {
      return i;
    });
  }
  return handlers;
}

module.exports = makeHandlers;
`,
      tests: `const makeHandlers = require("./handlers");

test("handler 0 returns 0", () => {
  expect(makeHandlers()[0]()).toBe(0);
});

test("handler 1 returns 1", () => {
  expect(makeHandlers()[1]()).toBe(1);
});

test("handler 2 returns 2", () => {
  expect(makeHandlers()[2]()).toBe(2);
});
`,
      solution: `function makeHandlers() {
  const handlers = [];
  for (let i = 0; i < 3; i++) {
    handlers.push(function () {
      return i;
    });
  }
  return handlers;
}

module.exports = makeHandlers;
`,
      cause:
        "`var` is function-scoped, so the loop has one `i` and every handler closes over that same variable; by the time a handler runs, the loop has finished and `i` is 3. `let` creates a new binding per iteration, so each handler captures its own.",
      hints: [
        "How many `i` variables exist while the loop runs: one per iteration, or one in total?",
        "`var` is function-scoped, so every handler closes over the same `i`. By the time you call one, the loop is over.",
        "Change `var i` to `let i`: `let` creates a fresh binding per iteration, so each handler captures its own.",
      ],
    },
    {
      id: "closures-write-private-counter",
      type: "write",
      title: "Build a private counter",
      prompt:
        "Write `makeCounter()`. It returns an object with `increment()` and `value()`. The count must be **private**: nothing outside can read or change it except through those two functions.",
      goals: ["`increment()` adds 1", "`value()` returns the count", "Two counters never share state", "The count isn't a property anyone can touch"],
      file: "counter.js",
      starter: `function makeCounter() {
  // your code here
}

module.exports = makeCounter;
`,
      tests: `const makeCounter = require("./counter");

test("starts at 0", () => {
  expect(makeCounter().value()).toBe(0);
});

test("increment adds 1", () => {
  const counter = makeCounter();
  counter.increment();
  counter.increment();
  expect(counter.value()).toBe(2);
});

test("two counters are independent", () => {
  const a = makeCounter();
  const b = makeCounter();
  a.increment();
  a.increment();
  b.increment();
  expect([a.value(), b.value()]).toEqual([2, 1]);
});

test("the count is private", () => {
  const counter = makeCounter();
  expect(Object.keys(counter).sort()).toEqual(["increment", "value"]);
});
`,
      solution: `function makeCounter() {
  let count = 0;
  return {
    increment: () => {
      count += 1;
    },
    value: () => count,
  };
}

module.exports = makeCounter;
`,
      hints: [
        "Where can a value live so that only two functions can reach it?",
        "Declare `let count = 0` inside `makeCounter`; the functions you return close over it.",
        "Return `{ increment: () => { count += 1; }, value: () => count }`.",
      ],
    },
    {
      id: "closures-review-unbounded-memoize",
      type: "review",
      title: "The AI's memoize leaks memory",
      request: "Write a memoize helper for our Express API so repeated price lookups are fast.",
      prompt:
        "An AI wrote this `memoize`. Its own tests pass and it's fast. It's about to run inside a server that stays up for weeks and sees millions of different product ids. Your team's rule: **an in-memory cache holds at most 100 entries.** Is it production-ready?",
      steps: [
        { label: "Read", detail: "the AI's code and the request it answered" },
        { label: "Find", detail: "what breaks after weeks in production" },
        { label: "Prove", detail: "write one test that fails on the AI's code" },
        { label: "Fix", detail: "make every test pass, including yours" },
        { label: "Name it", detail: "the risk, in one line" },
      ],
      file: "memoize.js",
      starter: `function memoize(fn) {
  const cache = new Map();
  return function (key) {
    if (cache.has(key)) return cache.get(key);
    const result = fn(key);
    cache.set(key, result);
    return result;
  };
}

module.exports = memoize;
`,
      happyTests: `const memoize = require("./memoize");

test("returns the cached result", () => {
  const double = memoize((x) => x * 2);
  expect(double(2)).toBe(4);
  expect(double(2)).toBe(4);
});

test("calls fn once per key", () => {
  const fn = jest.fn((x) => x + 1);
  const cached = memoize(fn);
  cached(1);
  cached(1);
  expect(fn).toHaveBeenCalledTimes(1);
});
`,
      tests: `const memoize = require("./memoize");

test("keeps at most 100 entries: the oldest key is evicted", () => {
  const fn = jest.fn((x) => x);
  const cached = memoize(fn);
  for (let i = 0; i < 101; i++) cached(i);
  cached(0); // evicted, so it is computed again
  expect(fn).toHaveBeenCalledTimes(102);
});

test("recent keys stay cached", () => {
  const fn = jest.fn((x) => x);
  const cached = memoize(fn);
  for (let i = 0; i < 101; i++) cached(i);
  cached(100);
  expect(fn).toHaveBeenCalledTimes(101);
});
`,
      solution: `const LIMIT = 100;

function memoize(fn) {
  const cache = new Map();
  return function (key) {
    if (cache.has(key)) return cache.get(key);
    const result = fn(key);
    cache.set(key, result);
    // A Map keeps insertion order, so the first key is the oldest.
    if (cache.size > LIMIT) cache.delete(cache.keys().next().value);
    return result;
  };
}

module.exports = memoize;
`,
      testFile: "memoize.review.test.js",
      testStarter: `// Prove the problem: this test should FAIL on the AI's code
// and PASS once you've fixed it.
const memoize = require("./memoize");

test("cache never holds more than 100 entries", () => {
  // your test here
});
`,
      proofTest: `const memoize = require("./memoize");

test("cache never holds more than 100 entries", () => {
  const fn = jest.fn((x) => x);
  const cached = memoize(fn);
  for (let i = 0; i < 101; i++) cached(i);
  cached(0);
  expect(fn).toHaveBeenCalledTimes(102);
});
`,
      risk: "performance",
      riskNote:
        "The cache lives in a closure that never lets go: every new key stays in memory forever. In a long-running server that sees millions of ids, memory grows until the process slows down or crashes. Bounding the cache (evict the oldest entry) keeps memory flat.",
      hints: [
        "The cache lives in a closure. When does anything ever leave it?",
        "Every distinct key is stored forever. Test it: fill 101 keys, call the first one again, and count how often `fn` ran (`jest.fn` + `toHaveBeenCalledTimes`).",
        "After `cache.set`, if `cache.size > 100`, delete the oldest key: a Map keeps insertion order, so it's `cache.keys().next().value`.",
      ],
    },
  ],
};
