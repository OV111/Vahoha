You are a senior engineer writing CODING CHALLENGES for a developer learning platform. Each challenge is a small function/module the learner writes in the browser; their code is run against HIDDEN TESTS in a locked-down JavaScript sandbox. Quality bar: LeetCode-style clarity, but practical for a Dao Developer.

Write 50 challenges for the dao-developer track, listed at the bottom. Answer ONE LAYER per reply (that layer's challenges only), in the order listed. After each reply, stop and wait; I will type "next".

## OUTPUT FORMAT — follow exactly
For each challenge output ONE JavaScript file in its own code block, preceded by its file name on its own line:
FILE: backend/seeders/challenges/dao-developer/<slug>.js
The file must have exactly the same structure, field names and field order as this REAL example (copy the shape, not the content):

```js
export default {
  slug: "combine-reducers",
  trackId: "mern",
  layerId: "mern-4",
  type: "CODE",
  difficulty: "med",
  title: "Write combineReducers",
  summary: "Combine slice reducers into one root reducer that keeps state references stable when nothing changed.",
  description:
    "With <code>useReducer</code> or Redux, big state is split into slice reducers, one per key. <code>combineReducers</code> glues them back together. The detail that matters for React is reference stability: if no slice changed, return the SAME state object so nothing re-renders.",
  task:
    "Write <code>combineReducers(reducers)</code> where <code>reducers</code> maps state keys to <code>(sliceState, action) =&gt; newSliceState</code>. Return a root reducer <code>(state = {}, action) =&gt; nextState</code>.",
  constraints: [
    "The root reducer calls every slice reducer with that slice's previous state (<code>state[key]</code>) and the action, and builds an object with the results.",
    "If every slice returns exactly what it was given AND the state has no keys outside <code>reducers</code>, return the previous <code>state</code> object itself (same reference). Otherwise return a new object containing only the keys in <code>reducers</code>.",
    "An action must be an object with a string <code>type</code>; otherwise throw an <code>Error</code> whose message mentions <code>type</code>.",
    "No slice may ever return <code>undefined</code>. Check this at creation time by calling each reducer with <code>(undefined, { type: '@@INIT' })</code> and throw an <code>Error</code> naming the key. Also throw, naming the key, if a reducer returns <code>undefined</code> for a real action. <code>null</code> is a valid state.",
    "Entries in <code>reducers</code> that are not functions are ignored.",
  ],
  example: `const root = combineReducers({ count: counterReducer, todos: todosReducer }); root(undefined, { type: '@@INIT' }) // { count: 0, todos: [] }`,
  tags: ["redux", "usereducer", "state", "immutability"],
  estimatedMins: 25,
  xp: 40,
  starterFiles: [
    {
      name: "combineReducers.js",
      lang: "js",
      code: `// combineReducers.js
function combineReducers(reducers) {
  // your code here
}

module.exports = combineReducers;`,
    },
  ],
  testFile: {
    name: "combineReducers_test.js",
    lang: "test",
    code: `const combineReducers = require('./combineReducers');
const count = (s = 0, a) => (a.type === 'inc' ? s + 1 : s);
const names = (s = [], a) => (a.type === 'add' ? [...s, a.name] : s);

test('builds initial state', () => {
  const root = combineReducers({ count, names });
  expect(root(undefined, { type: 'x' })).toEqual({ count: 0, names: [] });
});

test('keeps the reference when nothing changes', () => {
  const root = combineReducers({ count, names });
  const s = root(undefined, { type: 'x' });
  expect(root(s, { type: 'unknown' })).toBe(s);
});`,
  },
  hints: [
    { order: 1, cost: 0, text: "Filter <code>reducers</code> down to function entries once, up front, and run the <code>@@INIT</code> check there." },
    { order: 2, cost: 5, text: "In the root reducer track a boolean <code>changed</code>: set it when <code>next !== prev</code> for any key." },
    { order: 3, cost: 15, text: "Also set <code>changed</code> when <code>Object.keys(state).length !== keys.length</code>: that is how stray keys in old state get dropped." },
  ],
  hiddenTests: [
    { name: "builds_initial_state_from_slice_defaults", code: `const count = (s = 0, a) => (a.type === 'inc' ? s + 1 : s);
const names = (s = [], a) => (a.type === 'add' ? [...s, a.name] : s);
const root = combineReducers({ count, names });
const s = root(undefined, { type: 'x' });
assert(JSON.stringify(s) === '{"count":0,"names":[]}', 'got ' + JSON.stringify(s));` },
    { name: "routes_actions_and_keeps_untouched_slices_by_reference", code: `const count = (s = 0, a) => (a.type === 'inc' ? s + 1 : s);
const names = (s = [], a) => (a.type === 'add' ? [...s, a.name] : s);
const root = combineReducers({ count, names });
const s0 = root(undefined, { type: 'x' });
const s1 = root(s0, { type: 'inc' });
assert(s1 !== s0 && s1.count === 1, 'new state object with updated slice');
assert(s1.names === s0.names, 'untouched slice keeps its reference');` },
    { name: "same_state_when_nothing_changed", code: `const count = (s = 0, a) => (a.type === 'inc' ? s + 1 : s);
const root = combineReducers({ count });
const s = root(undefined, { type: 'x' });
assert(root(s, { type: 'nobody-handles-this' }) === s, 'same reference');` },
    { name: "extra_keys_are_dropped", code: `const count = (s = 0) => s;
const root = combineReducers({ count });
const old = { count: 5, legacy: true };
const next = root(old, { type: 'x' });
assert(next !== old, 'a stray key forces a new object');
assert(JSON.stringify(next) === '{"count":5}', 'got ' + JSON.stringify(next));` },
    { name: "slice_reducers_only_see_their_slice", code: `const seen = [];
const a = (s = 'A', act) => { seen.push(['a', s]); return s; };
const b = (s = 'B', act) => { seen.push(['b', s]); return s; };
const root = combineReducers({ a, b });
seen.length = 0;
root({ a: 'x', b: 'y' }, { type: 't' });
assert(JSON.stringify(seen) === '[["a","x"],["b","y"]]', 'got ' + JSON.stringify(seen));` },
    { name: "rejects_invalid_actions", code: `const root = combineReducers({ n: (s = 0) => s });
let e1 = null, e2 = null, e3 = null;
try { root({}, null); } catch (e) { e1 = e; }
try { root({}, { kind: 'x' }); } catch (e) { e2 = e; }
try { root({}, { type: 5 }); } catch (e) { e3 = e; }
assert(e1 && e2 && e3, 'all three invalid actions throw');
assert(/type/.test(e2.message), 'message mentions type: ' + e2.message);` },
    { name: "undefined_initial_state_throws_at_creation_naming_the_key", code: `let err = null;
try { combineReducers({ good: (s = 1) => s, broken: () => undefined }); } catch (e) { err = e; }
assert(err && /broken/.test(err.message), 'names the key: ' + (err && err.message));` },
    { name: "undefined_for_a_real_action_throws_naming_the_key", code: `const flaky = (s = 0, a) => (a.type === 'oops' ? undefined : s);
const root = combineReducers({ flaky });
let err = null;
try { root(undefined, { type: 'oops' }); } catch (e) { err = e; }
assert(err && /flaky/.test(err.message), 'names the key: ' + (err && err.message));` },
    { name: "null_is_a_valid_slice_state", code: `const user = (s = null, a) => (a.type === 'login' ? { id: 1 } : s);
const root = combineReducers({ user });
const s = root(undefined, { type: 'x' });
assert(s.user === null, 'null kept');
assert(root(s, { type: 'login' }).user.id === 1, 'works after');` },
    { name: "non_function_entries_ignored_and_nesting_works", code: `const inner = combineReducers({ x: (s = 1) => s, y: (s = 2) => s });
const root = combineReducers({ inner, junk: 42, n: (s = 0) => s });
const s = root(undefined, { type: 'init' });
assert(JSON.stringify(s) === '{"inner":{"x":1,"y":2},"n":0}', 'got ' + JSON.stringify(s));
assert(root(s, { type: 'noop' }) === s, 'nested stability');` },
  ],
  solution: {
    code: `function combineReducers(reducers) {
  const entries = Object.entries(reducers).filter(([, fn]) => typeof fn === 'function');
  const keys = entries.map(([key]) => key);

  for (const [key, fn] of entries) {
    if (fn(undefined, { type: '@@INIT' }) === undefined) {
      throw new Error('Reducer "' + key + '" returned undefined during initialization');
    }
  }

  return function root(state = {}, action) {
    if (!action || typeof action !== 'object' || typeof action.type !== 'string') {
      throw new Error('Actions must be plain objects with a string "type"');
    }
    const next = {};
    let changed = Object.keys(state).length !== keys.length;
    for (const [key, fn] of entries) {
      const prevSlice = state[key];
      const nextSlice = fn(prevSlice, action);
      if (nextSlice === undefined) {
        throw new Error('Reducer "' + key + '" returned undefined for action "' + action.type + '"');
      }
      next[key] = nextSlice;
      if (nextSlice !== prevSlice) changed = true;
    }
    return changed ? next : state;
  };
}

module.exports = combineReducers;`,
    explanation:
      "The root reducer builds a candidate next object but only returns it if some slice actually changed or a stray key had to be dropped; otherwise it returns the old state. Returning the same reference is what lets React.memo, useSelector and useSyncExternalStore skip work. Probing every reducer with an init action up front surfaces a missing default at startup instead of on the first unlucky render.",
  },
};
```

## HARD RULES (a verifier rejects the file if any is broken)
1. Fields, in this order: slug, trackId ("dao-developer"), layerId, type ("CODE"), difficulty ("easy"|"med"|"hard"), title, summary, description, task, constraints, example, tags, estimatedMins, xp, starterFiles, testFile, hints, hiddenTests, solution.
2. layerId MUST be copied exactly from the layer list below, and the challenge must teach THAT layer's topics. Per layer: 1 easy, 2 med, 2 hard (xp: easy 25, med 45, hard 70; estimatedMins 15-50).
3. slug is kebab-case, unique, and not in the "ALREADY EXISTS" list below.
4. Pure JavaScript, CommonJS (`module.exports`), no imports, no TypeScript, no JSX. If the topic is React/Express/MongoDB/auth/testing/deploy, test the LOGIC with plain functions and injected fakes (fake db, fake req/res objects, fake fetch function passed in, a mini-store, a pure renderer). Never require real libraries, a network, a database or the file system.
5. SANDBOX: there are NO timers, console, require, process, Buffer, fetch, Date.now-dependence in tests. NEVER use setTimeout, setInterval, or real clocks in tests or solutions. If time matters, the function takes an injected `now()` or `sleep()` parameter. Async tests may use async/await and manually-controlled deferred promises.
6. FILE NAMES: for a single-function export, the starter file name MUST equal the function name (`createStore.js` exports `createStore`; the runner binds `const createStore = module.exports`). If a module exports several things (`module.exports = { a, b }`), the starter file name must NOT be one of the exported names. testFile name is `<starterName>_test.js` and requires './<starterName>'.
7. starterFiles[0].code is a stub with `// your code here` and must pass ZERO hidden tests. The full solution in solution.code must pass ALL hidden tests. Self-check this before answering.
8. hiddenTests: 6 to 10, each { name, code }, code uses the global `assert(condition, message)` only (no expect, no test(), no require). Test names are snake_case and describe a behaviour. Cover the edge cases the constraints mention. testFile (visible to the learner) has 2 small `test(...)`/`expect(...)` cases.
9. Inside template-literal code strings, do NOT use `${}`, backticks, or an apostrophe inside a single-quoted string (use double quotes inside, or concatenate with +). Avoid floating-point knife-edges: test clearly inside/outside, never exactly on a boundary of a float calculation.
10. hints: exactly 3, orders 1,2,3, costs 0, 5, 15. Hint 1 nudges, hint 3 nearly gives the algorithm but not the code.
11. description, task, constraints, hints use simple HTML (`<code>`, `&lt;`, `&gt;`). constraints: 3 to 6 concrete, testable bullets; every constraint must be exercised by at least one hidden test. No vague wording.
12. Each challenge in a layer must be a DIFFERENT idea, realistic (something you would hit at work or in an interview), and solvable in under an hour. Do not repeat any idea from the ALREADY EXISTS list.
13. solution.explanation: 2-4 sentences, explains WHY the approach works, not what each line does.
14. No text outside the code blocks except the FILE: lines.

## LAYERS TO WRITE (layerId | title | how many | topics)
  - dao-developer-1 | Web, Blockchain, and DAO Fundamentals | write 5 challenges | topics: What is a DAO and why it exists; On-chain vs off-chain governance; Token-weighted voting mechanics; Quorum and proposal thresholds; Timelock and execution delay; Major DAO platforms - Compound, Uniswap, MakerDAO
  - dao-developer-2 | Governance Tokens - ERC-20 with Voting | write 5 challenges | topics: ERC-20Votes and ERC-20Permit extensions; Delegation and self-delegation; Historical vote balance checkpointing; getPastVotes for proposal snapshots; Token distribution strategies; Governance token vs utility token tradeoffs
  - dao-developer-3 | OpenZeppelin Governor Framework | write 5 challenges | topics: OpenZeppelin Governor modules; GovernorVotes and GovernorQuorum; Proposal lifecycle - Pending, Active, Succeeded, Queued, Executed; TimelockController configuration; Proposing and voting in Hardhat tests; Proposal description hash
  - dao-developer-4 | Snapshot - Off-Chain Voting | write 5 challenges | topics: Snapshot space configuration; Voting strategies - token, delegation, NFT; How Snapshot stores votes on IPFS; EIP-712 signature in Snapshot votes; Custom voting strategy development; Snapshot and on-chain execution via SafeSnap
  - dao-developer-5 | DAO Treasury Management | write 5 challenges | topics: Treasury contract patterns; Gnosis Safe as DAO treasury; Governance-gated fund releases; Multi-sig approval thresholds; Budget proposals and spending categories; On-chain reporting of treasury balances
  - dao-developer-6 | Aragon Framework | write 5 challenges | topics: Aragon OSx architecture; DAO and plugin structure; TokenVoting plugin setup; Permission management with ACL; Installing and upgrading plugins; Aragon App for no-code DAO management
  - dao-developer-7 | DAO Frontend and Governance UI | write 5 challenges | topics: Displaying active and past proposals; Voting power and delegation UI; Proposal creation form; Transaction feedback for vote and delegate; Subgraph for governance event indexing; Treasury balance display
  - dao-developer-8 | Advanced Voting Mechanisms | write 5 challenges | topics: Quadratic voting math and implementation; Sybil resistance for quadratic voting; Conviction voting curve; Optimistic approval patterns; Rage quit mechanics; Vote delegation trees
  - dao-developer-9 | DAO Security and Attack Vectors | write 5 challenges | topics: Flash loan governance attacks; Proposal front-running and griefing; Timelock bypass scenarios; Quorum and threshold manipulation; Proxy upgrade via governance attack; Slither and Foundry fuzzing for governance
  - dao-developer-10 | Mainnet DAO Launch and Operations | write 5 challenges | topics: Token distribution and genesis event; Mainnet Governor and timelock deployment; Tally or Boardroom integration; Community proposal process documentation; Treasury diversification strategy; DAO legal and jurisdictional considerations

## ALREADY EXISTS — do not reuse a slug or an idea
aabb-collision-resolution, all-settled, asset-loader, async-error-wrapper, atlas-frames, audio-mixer, auth-token-refresh, backpressure-writable, batch-async-iterable, build-config, canvas-scale, closure-counter, combine-reducers, compose-middleware, conditional-get, connection-pool, contract-check, controlled-form, cors-origin-matcher, coverage-gate, create-animator, create-body, create-emitter, create-game-stats, create-menu-stack, create-selector, create-tween, cron-next-run, crud-resource, css-specificity, curry-function, cursor-pagination, dataloader-batching, debounce-with-cancel-and-flush, decode-gid, deep-clone, deep-equal, deep-merge, delayed-job-scheduler, detect-memory-leak, di-container, diff-keyed-list, dockerfile-lint, env-interpolate, error-handler, event-bus-wildcards, event-loop-order, fetch-with-retry, find-overlaps, fix-long-running-memory-leak, fixed-timestep-loop, fixture-factory, flex-row-layout, frustum-culling, game-state-machine, glsl-math, graceful-shutdown-tracker, grep-lines, group-by-polyfill, health-check-aggregator, high-scores, html-sanitizer, http-client-interceptors, idempotent-event-handler, image-filter, in-memory-job-queue, input-state-tracker, join-arrays, jwt-verify, line-splitter, load-config, log-deduper, lru-response-cache, mat4, match-object, match-routes, media-query-match, memo-component, memoize-with-cache-limit, migration-planner, mini-event-emitter, mini-redis, mini-router, mini-spy, mini-store, module-registry, mongo-filter-from-query, move-and-collide, n-plus-one-detector, narrow-phase, nested-routes, object-pool, octal-to-symbolic, once-event, orbit-camera, paginate, parse-bearer-token, parse-cache-control, parse-env-file, parse-http-request, parse-multipart-form-data, parse-prisma-schema, parse-url, parse-user-guard, password-policy-check, physics-step-with-bounce, plugin-encapsulation, prisma-where, project-point, prometheus-metrics, promise-combinators, promise-pool, promisify, prototype-chain, quaternions, query-cache, raycast, rbac-check, refresh-token-rotation, reliable-message-buffer, render-shader, render-to-string, request-tester, request-tracker, resolve-api-version, resolve-module, resolve-path, resolve-sphere-collision, rest-route-matcher, retry-async, rolling-update, routes-to-openapi, scene-manager, security-headers, semaphore, semver-compare, semver-satisfies, serialize-by-schema, session-store, split-shell-args, sql-where-builder, ssrf-guard, status-code-picker, streaming-file-upload, strip-mongo-operators, structured-logger, summarize-orders, swr-cache, toast-queue, token-bucket-limiter, trace-context, transaction-runner, ttl-cache, use-state-runtime, user-service, utf8-encode, validate-against-schema, validate-body, validate-markup, value-noise, voice-limiter, wave-surface, with-timeout, workflow-validate, wrap-text, zod-lite
