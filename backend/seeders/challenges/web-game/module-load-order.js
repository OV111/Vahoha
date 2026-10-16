export default {
  slug: "module-load-order",
  trackId: "web-game",
  layerId: "web-game-9",
  type: "CODE",
  difficulty: "hard",
  title: "Resolve module load order and catch circular imports",
  summary:
    "Order a dependency graph so every module loads after the modules it imports, and report cycles.",
  description:
    "A bundler walks the import graph from the entry point and emits modules so that a module's dependencies always run first. A circular import has no valid order and usually shows up as a confusing 'undefined at runtime' bug. Good tooling reports the exact cycle.",
  task:
    "Write <code>moduleLoadOrder(graph, entry)</code>. <code>graph</code> maps a module name to the array of module names it imports. Return the array of modules reachable from <code>entry</code> in load order: each module's dependencies (in the order listed) come before it, each module appears once, and <code>entry</code> is last.",
  constraints: [
    "Only modules reachable from <code>entry</code> are included.",
    "A dependency that has no key in <code>graph</code> throws <code>Error('Unknown module: NAME')</code>; the same goes for an unknown <code>entry</code>.",
    "A cycle throws <code>Error('Circular dependency: a -&gt; b -&gt; a')</code>, listing the modules of the cycle starting from the first module that repeats.",
    "A shared dependency is loaded once, at its first position (do not report it as a cycle).",
  ],
  example: `moduleLoadOrder({
  main: ['engine', 'ui'],
  engine: ['math'],
  ui: ['math'],
  math: [],
}, 'main');
// ['math', 'engine', 'ui', 'main']`,
  tags: ["bundling","graphs","dependency-resolution"],
  estimatedMins: 35,
  xp: 70,
  starterFiles: [
    {
      name: "moduleLoadOrder.js",
      lang: "js",
      code: `// moduleLoadOrder.js
function moduleLoadOrder(graph, entry) {
  // your code here
}

module.exports = moduleLoadOrder;`,
    },
  ],
  testFile: {
    name: "moduleLoadOrder_test.js",
    lang: "test",
    code: `// moduleLoadOrder_test.js
const moduleLoadOrder = require('./moduleLoadOrder');

test('dependencies_come_first', () => {
  // see the hidden tests for the full checks
  expect(typeof moduleLoadOrder).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Depth-first search with a post-order push: visit each dependency first, and only then push the module itself. That gives dependencies-before-dependents for free.",
    },
    {
      order: 2,
      cost: 5,
      text: "You need two different memories: a <code>done</code> set (finished, never visit again, so shared dependencies are fine) and the current path as an array (to spot a cycle: a module that is already on the path).",
    },
    {
      order: 3,
      cost: 10,
      text: "When you meet a module that is on the current path, slice the path from that module's first position and append the module again to build the message: <code>path.slice(i).concat(name).join(' -&gt; ')</code>.",
    },
  ],
  hiddenTests: [
    {
      name: "dependencies_come_first",
      code: `const order = moduleLoadOrder({ main: ['engine', 'ui'], engine: ['math'], ui: ['math'], math: [] }, 'main');
assert(JSON.stringify(order) === JSON.stringify(['math', 'engine', 'ui', 'main']), 'expected math, engine, ui, main, got ' + JSON.stringify(order));`,
    },
    {
      name: "shared_dependency_loads_once",
      code: `const order = moduleLoadOrder({ a: ['c', 'b'], b: ['c'], c: [] }, 'a');
assert(JSON.stringify(order) === JSON.stringify(['c', 'b', 'a']), 'c is shared and must appear once, first; got ' + JSON.stringify(order));`,
    },
    {
      name: "only_reachable_modules",
      code: `const order = moduleLoadOrder({ main: ['a'], a: [], unused: ['a'] }, 'main');
assert(JSON.stringify(order) === JSON.stringify(['a', 'main']), 'unused must not be included, got ' + JSON.stringify(order));`,
    },
    {
      name: "single_module",
      code: `const order = moduleLoadOrder({ solo: [] }, 'solo');
assert(JSON.stringify(order) === JSON.stringify(['solo']), 'a lone module loads alone, got ' + JSON.stringify(order));`,
    },
    {
      name: "reports_the_circular_path",
      code: `let err = null;
try { moduleLoadOrder({ main: ['a'], a: ['b'], b: ['a'] }, 'main'); } catch (e) { err = e; }
assert(err instanceof Error, 'a cycle must throw');
assert(err.message === 'Circular dependency: a -> b -> a', 'wrong message: ' + (err && err.message));`,
    },
    {
      name: "detects_self_import",
      code: `let err = null;
try { moduleLoadOrder({ x: ['x'] }, 'x'); } catch (e) { err = e; }
assert(err && err.message === 'Circular dependency: x -> x', 'a self import is a cycle, got ' + (err && err.message));`,
    },
    {
      name: "unknown_module_throws",
      code: `let err = null;
try { moduleLoadOrder({ main: ['ghost'] }, 'main'); } catch (e) { err = e; }
assert(err && err.message === 'Unknown module: ghost', 'wrong message: ' + (err && err.message));
let err2 = null;
try { moduleLoadOrder({ a: [] }, 'nope'); } catch (e) { err2 = e; }
assert(err2 && err2.message === 'Unknown module: nope', 'unknown entry must throw too, got ' + (err2 && err2.message));`,
    },
    {
      name: "diamond_is_not_a_cycle",
      code: `const order = moduleLoadOrder({ top: ['l', 'r'], l: ['base'], r: ['base'], base: [] }, 'top');
assert(order.length === 4 && order[0] === 'base' && order[3] === 'top', 'a diamond shape is valid, got ' + JSON.stringify(order));`,
    },
  ],
  solution: {
    code: `function moduleLoadOrder(graph, entry) {
  const order = [];
  const done = new Set();
  const path = [];

  function visit(name) {
    if (!Object.prototype.hasOwnProperty.call(graph, name)) {
      throw new Error('Unknown module: ' + name);
    }
    const at = path.indexOf(name);
    if (at !== -1) {
      throw new Error('Circular dependency: ' + path.slice(at).concat(name).join(' -> '));
    }
    if (done.has(name)) return;
    path.push(name);
    for (const dep of graph[name]) visit(dep);
    path.pop();
    done.add(name);
    order.push(name);
  }

  visit(entry);
  return order;
}

module.exports = moduleLoadOrder;`,
    explanation:
      "This is a depth-first topological sort. Pushing a module only after all its dependencies have been visited (post-order) is what puts dependencies first. Two structures answer two different questions: the done set means 'already placed, skip it', which makes a shared dependency appear once at its first position and keeps diamonds from looking like cycles; the path array means 'currently being resolved', so finding the name on it proves a cycle, and slicing from that position gives exactly the modules in the loop. The unknown-module check runs first so a missing entry or a missing dependency both report the same way. Because the graph is only walked from the entry, unreachable modules never get into the result.",
  },
};
