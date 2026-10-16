export default {
  slug: "mini-test-runner",
  trackId: "mern",
  layerId: "mern-9",
  type: "CODE",
  difficulty: "hard",
  title: "Build a tiny describe/test runner with hooks",
  summary:
    "Collect nested suites, run beforeEach/afterEach in the right order, and report each test's result.",
  description:
    "Jest's describe, test, beforeEach and afterEach are surprisingly small ideas: a tree of suites, hooks that apply to everything inside a suite, and a runner that executes them in a defined order while catching failures. Building one explains why hooks run in the order they do and why a failing hook fails the test.",
  task:
    "Write <code>createTestRunner()</code> returning <code>{ describe(name, fn), test(name, fn), beforeEach(fn), afterEach(fn), run() }</code>. <code>describe</code> calls <code>fn</code> immediately to register the suite's contents (nested suites allowed). <code>test</code>, <code>beforeEach</code> and <code>afterEach</code> register into the suite currently being defined (the top level counts as the root suite). <code>run()</code> returns a promise of an array of results <code>{ name, passed, error }</code> (<code>error</code> is the error's message, or <code>undefined</code> when passed), one per test in registration order, depth first, where <code>name</code> joins the suite names and test name with <code>' &gt; '</code>. For each test, run sequentially: every <code>beforeEach</code> from the outermost suite to the innermost (in registration order within a suite), then the test, then every <code>afterEach</code> from the innermost to the outermost. Hooks and tests may be async (return promises). If a <code>beforeEach</code> throws, the test body is skipped and the test fails with that error, but all <code>afterEach</code> hooks still run. If the test body throws, it fails but <code>afterEach</code> hooks still run. If an <code>afterEach</code> throws and the test had not failed yet, the test fails with that error; the first error is the one reported.",
  constraints: [
    "Hooks apply to tests in their own suite and in all nested suites, but not to tests in sibling or parent suites.",
    "Tests run strictly one after another (never in parallel).",
    "<code>describe</code> must restore the previous suite even if <code>fn</code> throws (the error is not caught: it propagates).",
    "Registered tests are not run until <code>run()</code> is called, and calling <code>run()</code> twice runs everything again.",
  ],
  example: `const t = createTestRunner();
t.describe('math', () => {
  t.beforeEach(() => { /* runs before each test in math */ });
  t.test('adds', () => { if (1 + 1 !== 2) throw new Error('bad'); });
});
await t.run(); // [{ name: 'math > adds', passed: true, error: undefined }]`,
  tags: ["testing","jest","async","test-runner"],
  estimatedMins: 50,
  xp: 75,
  starterFiles: [
    {
      name: "createTestRunner.js",
      lang: "js",
      code: `// createTestRunner.js
function createTestRunner() {
  // your code here
}

module.exports = createTestRunner;`,
    },
  ],
  testFile: {
    name: "createTestRunner_test.js",
    lang: "test",
    code: `// createTestRunner_test.js
const createTestRunner = require('./createTestRunner');

test('runs_tests_in_registration_order_and_reports_names', () => {
  // see the hidden tests for the full checks
  expect(typeof createTestRunner).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Model suites as objects <code>{ name, parent, tests: [], beforeEach: [], afterEach: [], children: [] }</code> and keep a <code>current</code> pointer. To keep registration order across tests and nested suites, store both in one <code>items</code> list with a <code>kind</code>.",
    },
    {
      order: 2,
      cost: 5,
      text: "In <code>run</code>, walk the tree depth first. For a test, build the chain of suites from the root to the test's suite; run the beforeEach lists outer to inner, then the body, then the afterEach lists inner to outer, each in its own <code>try/catch</code> that records only the first error.",
    },
    {
      order: 3,
      cost: 10,
      text: "Wrap <code>describe</code>'s call to <code>fn</code> in <code>try/finally</code> so <code>current</code> is restored even if it throws.",
    },
  ],
  hiddenTests: [
    {
      name: "runs_tests_in_registration_order_and_reports_names",
      code: `const t = createTestRunner();
t.test('top', () => {});
t.describe('outer', () => {
  t.test('one', () => {});
  t.describe('inner', () => { t.test('two', () => {}); });
  t.test('three', () => {});
});
const r = await t.run();
assert(r.map((x) => x.name).join('|') === 'top|outer > one|outer > inner > two|outer > three', 'names and order, got ' + r.map((x) => x.name).join('|'));
assert(r.every((x) => x.passed === true && x.error === undefined), 'all passed');`,
    },
    {
      name: "does_nothing_until_run_is_called",
      code: `const t = createTestRunner();
let ran = 0;
t.test('a', () => { ran++; });
assert(ran === 0, 'registering does not run');
await t.run();
assert(ran === 1, 'run executes the test');
await t.run();
assert(ran === 2, 'a second run executes everything again');`,
    },
    {
      name: "hook_order_is_outer_before_each_inner_after_each",
      code: `const t = createTestRunner();
const log = [];
t.beforeEach(() => log.push('root-before'));
t.afterEach(() => log.push('root-after'));
t.describe('s', () => {
  t.beforeEach(() => log.push('s-before-1'));
  t.beforeEach(() => log.push('s-before-2'));
  t.afterEach(() => log.push('s-after'));
  t.test('x', () => log.push('test'));
});
await t.run();
assert(log.join() === 'root-before,s-before-1,s-before-2,test,s-after,root-after', 'got ' + log.join());`,
    },
    {
      name: "hooks_only_apply_inside_their_suite",
      code: `const t = createTestRunner();
const log = [];
t.describe('a', () => { t.beforeEach(() => log.push('a-hook')); t.test('in-a', () => log.push('in-a')); });
t.describe('b', () => { t.test('in-b', () => log.push('in-b')); });
t.test('root-test', () => log.push('root-test'));
await t.run();
assert(log.join() === 'a-hook,in-a,in-b,root-test', 'a hook affects only its own suite, got ' + log.join());`,
    },
    {
      name: "async_hooks_and_tests_are_awaited_in_sequence",
      code: `const t = createTestRunner();
const log = [];
const later = async (label) => { for (let i = 0; i < 5; i++) await Promise.resolve(); log.push(label); };
t.beforeEach(() => later('before'));
t.afterEach(() => later('after'));
t.test('one', async () => { await later('one'); });
t.test('two', async () => { await later('two'); });
await t.run();
assert(log.join() === 'before,one,after,before,two,after', 'strictly sequential, got ' + log.join());`,
    },
    {
      name: "a_failing_test_is_reported_and_the_run_continues",
      code: `const t = createTestRunner();
let after = 0;
t.afterEach(() => { after++; });
t.test('bad', () => { throw new Error('nope'); });
t.test('async bad', async () => { throw new Error('async nope'); });
t.test('good', () => {});
const r = await t.run();
assert(r[0].passed === false && r[0].error === 'nope', 'sync failure, got ' + JSON.stringify(r[0]));
assert(r[1].passed === false && r[1].error === 'async nope', 'async failure, got ' + JSON.stringify(r[1]));
assert(r[2].passed === true, 'later tests still run');
assert(after === 3, 'afterEach runs after failing tests too, got ' + after);`,
    },
    {
      name: "a_failing_before_each_skips_the_test_but_runs_after_each",
      code: `const t = createTestRunner();
const log = [];
t.beforeEach(() => { log.push('before'); throw new Error('setup failed'); });
t.afterEach(() => log.push('after'));
t.test('x', () => log.push('body'));
const r = await t.run();
assert(log.join() === 'before,after', 'the body is skipped but cleanup runs, got ' + log.join());
assert(r[0].passed === false && r[0].error === 'setup failed', 'got ' + JSON.stringify(r[0]));`,
    },
    {
      name: "after_each_errors_only_matter_if_the_test_had_not_failed",
      code: `const t = createTestRunner();
t.afterEach(() => { throw new Error('cleanup failed'); });
t.test('passes body', () => {});
t.test('fails body', () => { throw new Error('body failed'); });
const r = await t.run();
assert(r[0].passed === false && r[0].error === 'cleanup failed', 'a passing test fails on a cleanup error, got ' + JSON.stringify(r[0]));
assert(r[1].passed === false && r[1].error === 'body failed', 'the first error is the one reported, got ' + JSON.stringify(r[1]));`,
    },
    {
      name: "describe_restores_the_suite_when_it_throws",
      code: `const t = createTestRunner();
let threw = false;
try { t.describe('broken', () => { throw new Error('bad describe'); }); } catch (e) { threw = e.message === 'bad describe'; }
assert(threw, 'the error from describe propagates');
t.test('after', () => {});
const r = await t.run();
assert(r.length === 1 && r[0].name === 'after', 'a later test registers at the root, not inside the broken suite, got ' + JSON.stringify(r.map((x) => x.name)));`,
    },
  ],
  solution: {
    code: `function createTestRunner() {
  const root = { name: '', parent: null, items: [], beforeEach: [], afterEach: [] };
  let current = root;

  function describe(name, fn) {
    const suite = { name, parent: current, items: [], beforeEach: [], afterEach: [] };
    current.items.push({ kind: 'suite', suite });
    const previous = current;
    current = suite;
    try {
      fn();
    } finally {
      current = previous;
    }
  }

  const test = (name, fn) => { current.items.push({ kind: 'test', name, fn, suite: current }); };
  const beforeEach = (fn) => { current.beforeEach.push(fn); };
  const afterEach = (fn) => { current.afterEach.push(fn); };

  const chainOf = (suite) => {
    const chain = [];
    for (let s = suite; s; s = s.parent) chain.unshift(s);
    return chain;
  };

  async function runTest(item) {
    const chain = chainOf(item.suite);
    const names = chain.map((s) => s.name).filter((n) => n !== '');
    const fullName = names.concat(item.name).join(' > ');
    let error;
    const attempt = async (fn) => {
      try {
        await fn();
        return true;
      } catch (e) {
        if (error === undefined) error = (e && e.message) || String(e);
        return false;
      }
    };

    let ready = true;
    for (const s of chain) {
      for (const hook of s.beforeEach) {
        if (ready) ready = await attempt(hook);
      }
    }
    if (ready) await attempt(item.fn);
    for (const s of chain.slice().reverse()) {
      for (const hook of s.afterEach) await attempt(hook);
    }
    return { name: fullName, passed: error === undefined, error };
  }

  async function walk(suite, results) {
    for (const item of suite.items) {
      if (item.kind === 'test') results.push(await runTest(item));
      else await walk(item.suite, results);
    }
  }

  async function run() {
    const results = [];
    await walk(root, results);
    return results;
  }

  return { describe, test, beforeEach, afterEach, run };
}

module.exports = createTestRunner;`,
    explanation:
      "The structure is a tree of suites whose items list keeps tests and nested suites in registration order, so a depth-first walk gives exactly the order a reader expects. Hooks are stored on the suite where they were declared and found at run time by walking up the parent chain from the test's suite, which is why they apply to nested suites but not to siblings. The order rule falls out of that chain: beforeEach hooks run along it from the root down, afterEach hooks along it in reverse. Each step runs inside attempt(), which records only the first error; once a beforeEach fails, ready turns false so the remaining setup and the test body are skipped, while the afterEach loop still runs unconditionally, which is the whole point of cleanup hooks. Using try/finally in describe restores the current suite even when the suite function throws, so one broken describe cannot capture every later test.",
  },
};
