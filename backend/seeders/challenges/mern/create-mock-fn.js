export default {
  slug: "create-mock-fn",
  trackId: "mern",
  layerId: "mern-9",
  type: "CODE",
  difficulty: "easy",
  title: "Write your own jest.fn()",
  summary:
    "Build a mock function that records its calls and can return or compute fake values.",
  description:
    "Mock functions are how you test code that depends on something slow or unpredictable: you replace the dependency with a function that records how it was called and returns what you tell it to. Writing one yourself shows there is no magic in jest.fn().",
  task:
    "Write <code>createMockFn(implementation)</code> returning a function <code>mock</code>. Every call records its arguments in <code>mock.mock.calls</code> (an array of argument arrays) and its outcome in <code>mock.mock.results</code> (an array of <code>{ type: 'return', value }</code> or <code>{ type: 'throw', value }</code>); a call that throws still records the result and then rethrows the same error. What a call returns is decided in this order: a queued value from <code>mockReturnValueOnce(v)</code> (first in, first out); else the function set with <code>mockImplementation(fn)</code> (called with the same <code>this</code> and arguments); else the value set with <code>mockReturnValue(v)</code>; else the original <code>implementation</code> if one was passed; else <code>undefined</code>. All setter methods return the mock so calls can be chained. <code>mockClear()</code> empties <code>calls</code> and <code>results</code> only. <code>mockReset()</code> does that and also removes queued values, <code>mockImplementation</code> and <code>mockReturnValue</code> (the original <code>implementation</code> argument is kept).",
  constraints: [
    "<code>mock.mock.calls</code> and <code>mock.mock.results</code> are always arrays, even before the first call.",
    "<code>mockImplementation(fn)</code> and <code>mockReturnValue(v)</code> replace each other: the one set last wins.",
    "The recorded arguments are the actual arguments passed, copied into a new array (not the <code>arguments</code> object).",
    "<code>mockReturnValue(undefined)</code> counts as a configured value.",
  ],
  example: `const fn = createMockFn((x) => x * 2);
fn(2);                       // 4
fn.mockReturnValueOnce(10);
fn(3);                       // 10
fn(4);                       // 8
fn.mock.calls;               // [[2], [3], [4]]`,
  tags: ["testing","mocks","jest"],
  estimatedMins: 25,
  xp: 30,
  starterFiles: [
    {
      name: "createMockFn.js",
      lang: "js",
      code: `// createMockFn.js
function createMockFn(implementation) {
  // your code here
}

module.exports = createMockFn;`,
    },
  ],
  testFile: {
    name: "createMockFn_test.js",
    lang: "test",
    code: `// createMockFn_test.js
const createMockFn = require('./createMockFn');

test('records_calls_and_results', () => {
  // see the hidden tests for the full checks
  expect(typeof createMockFn).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Create the function with a closure over <code>calls</code>, <code>results</code>, a <code>queue</code> for once-values and the current <code>impl</code>/<code>fixed</code> settings. Expose them as <code>mock.mock = { calls, results }</code>.",
    },
    {
      order: 2,
      cost: 5,
      text: "Decide the result with a chain of checks in the documented order. Use a <code>try/catch</code> around the part that may throw, record the result, then rethrow.",
    },
    {
      order: 3,
      cost: 10,
      text: "Because <code>mockClear</code> must keep the same arrays visible to callers, empty them in place (<code>calls.length = 0</code>) instead of replacing them.",
    },
  ],
  hiddenTests: [
    {
      name: "records_calls_and_results",
      code: `const fn = createMockFn((a, b) => a + b);
assert(Array.isArray(fn.mock.calls) && fn.mock.calls.length === 0, 'calls start empty');
const out = fn(1, 2);
assert(out === 3, 'the implementation runs, got ' + out);
fn('x');
assert(JSON.stringify(fn.mock.calls) === JSON.stringify([[1, 2], ['x']]), 'calls recorded, got ' + JSON.stringify(fn.mock.calls));
assert(fn.mock.results[0].type === 'return' && fn.mock.results[0].value === 3, 'result recorded, got ' + JSON.stringify(fn.mock.results[0]));`,
    },
    {
      name: "returns_undefined_without_any_configuration",
      code: `const fn = createMockFn();
assert(fn(1) === undefined, 'an unconfigured mock returns undefined');
assert(fn.mock.calls.length === 1, 'the call is still recorded');`,
    },
    {
      name: "return_value_and_implementation_replace_each_other",
      code: `const fn = createMockFn(() => 'original');
fn.mockReturnValue('fixed');
assert(fn() === 'fixed', 'mockReturnValue beats the original implementation');
fn.mockImplementation((n) => n + 1);
assert(fn(1) === 2, 'mockImplementation set later wins');
fn.mockReturnValue('again');
assert(fn(1) === 'again', 'mockReturnValue set later wins over the implementation');
fn.mockReturnValue(undefined);
assert(fn() === undefined, 'undefined is a configured value too');`,
    },
    {
      name: "once_values_come_first_in_order",
      code: `const fn = createMockFn(() => 'default');
fn.mockReturnValueOnce('a').mockReturnValueOnce('b');
assert(fn() === 'a' && fn() === 'b' && fn() === 'default', 'queued values are used once each, then the default applies');`,
    },
    {
      name: "this_and_arguments_are_forwarded",
      code: `const fn = createMockFn(function (x) { return this.base + x; });
const obj = { base: 10, call: fn };
assert(obj.call(5) === 15, 'the implementation receives this, got ' + obj.call(5));
const spy = createMockFn();
const args = [1, 2];
spy(...args);
args.push(3);
assert(spy.mock.calls[0].length === 2, 'recorded arguments are a copy, got ' + spy.mock.calls[0].length);`,
    },
    {
      name: "throwing_implementations_are_recorded_and_rethrown",
      code: `const boom = new Error('boom');
const fn = createMockFn(() => { throw boom; });
let caught = null;
try { fn(7); } catch (e) { caught = e; }
assert(caught === boom, 'the same error is rethrown');
assert(fn.mock.results[0].type === 'throw' && fn.mock.results[0].value === boom, 'the throw is recorded, got ' + JSON.stringify(fn.mock.results[0]));
assert(fn.mock.calls.length === 1, 'the call is recorded');`,
    },
    {
      name: "mock_clear_keeps_configuration_and_mock_reset_removes_it",
      code: `const fn = createMockFn(() => 'orig');
fn.mockReturnValue('set');
fn.mockReturnValueOnce('once');
fn('a');
fn.mockClear();
assert(fn.mock.calls.length === 0 && fn.mock.results.length === 0, 'mockClear empties the records');
assert(fn() === 'set', 'mockClear keeps the configured value');
fn.mockReturnValueOnce('queued');
fn.mockReset();
assert(fn.mock.calls.length === 0, 'mockReset also clears the records');
assert(fn() === 'orig', 'mockReset removes mockReturnValue and queued values but keeps the original implementation, got ' + fn());`,
    },
    {
      name: "setters_are_chainable",
      code: `const fn = createMockFn();
assert(fn.mockReturnValue(1) === fn && fn.mockImplementation(() => 2) === fn && fn.mockReturnValueOnce(3) === fn, 'setters return the mock');
assert(fn.mockClear() === fn && fn.mockReset() === fn, 'clear and reset return the mock too');`,
    },
  ],
  solution: {
    code: `function createMockFn(implementation) {
  const calls = [];
  const results = [];
  const queue = [];
  let impl = null;
  let fixed = { set: false, value: undefined };

  function mock(...args) {
    calls.push([...args]);
    let produce;
    if (queue.length > 0) {
      const v = queue.shift();
      produce = () => v;
    } else if (impl) {
      produce = () => impl.apply(this, args);
    } else if (fixed.set) {
      produce = () => fixed.value;
    } else if (implementation) {
      produce = () => implementation.apply(this, args);
    } else {
      produce = () => undefined;
    }
    try {
      const value = produce();
      results.push({ type: 'return', value });
      return value;
    } catch (error) {
      results.push({ type: 'throw', value: error });
      throw error;
    }
  }

  mock.mock = { calls, results };
  mock.mockReturnValue = (v) => { fixed = { set: true, value: v }; impl = null; return mock; };
  mock.mockImplementation = (fn) => { impl = fn; fixed = { set: false, value: undefined }; return mock; };
  mock.mockReturnValueOnce = (v) => { queue.push(v); return mock; };
  mock.mockClear = () => { calls.length = 0; results.length = 0; return mock; };
  mock.mockReset = () => {
    calls.length = 0;
    results.length = 0;
    queue.length = 0;
    impl = null;
    fixed = { set: false, value: undefined };
    return mock;
  };
  return mock;
}

module.exports = createMockFn;`,
    explanation:
      "A mock is a function wrapped around some bookkeeping. The calls and results arrays live in the closure and are exposed on mock.mock, and mockClear empties them in place so a test that already holds a reference to mock.mock.calls still sees the empty list. The behaviour on each call is a fixed priority chain: a one-off queued value beats everything, then an explicit mockImplementation, then mockReturnValue, then the implementation passed at creation, then undefined. mockReturnValue and mockImplementation reset each other, because they configure the same thing and the one set last should win. A try/catch records a thrown error as a 'throw' result before rethrowing the very same error, which is what lets a test assert both that something threw and what it received. Using apply with the call's this and arguments keeps methods working when the mock is attached to an object.",
  },
};
