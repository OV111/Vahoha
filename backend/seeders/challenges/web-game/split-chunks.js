export default {
  slug: "split-chunks",
  trackId: "web-game",
  layerId: "web-game-9",
  type: "CODE",
  difficulty: "easy",
  title: "Split shared modules out of route chunks",
  summary:
    "Decide which modules belong in a shared chunk and which stay with a single route.",
  description:
    "Code splitting only helps if modules used by several screens are not duplicated in every screen's bundle. A bundler solves this by moving anything used by two or more entry points into a shared chunk that is downloaded once and cached.",
  task:
    "Write <code>splitChunks(routes)</code>. <code>routes</code> maps a route name to the list of module names it imports. Return <code>{ shared, routes }</code>: <code>shared</code> is the sorted list of modules used by <b>two or more</b> routes, and <code>routes</code> maps each route name to the sorted list of modules that only that route uses (shared modules removed).",
  constraints: [
    "A module listed twice by the same route counts as used by that route once.",
    "Every route from the input must appear in the output <code>routes</code>, even if its list is empty.",
    "Both <code>shared</code> and each route's list are sorted alphabetically.",
    "Do not modify the input object.",
  ],
  example: `splitChunks({
  home: ['engine', 'menu'],
  play: ['engine', 'physics'],
});
// { shared: ['engine'], routes: { home: ['menu'], play: ['physics'] } }`,
  tags: ["bundling","code-splitting","build-tools"],
  estimatedMins: 15,
  xp: 25,
  starterFiles: [
    {
      name: "splitChunks.js",
      lang: "js",
      code: `// splitChunks.js
function splitChunks(routes) {
  // your code here
}

module.exports = splitChunks;`,
    },
  ],
  testFile: {
    name: "splitChunks_test.js",
    lang: "test",
    code: `// splitChunks_test.js
const splitChunks = require('./splitChunks');

test('moves_modules_used_by_two_routes_into_shared', () => {
  // see the hidden tests for the full checks
  expect(typeof splitChunks).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Count, for each module, how many <i>distinct routes</i> list it. A Map from module to a Set of route names makes the \"listed twice\" case disappear on its own.",
    },
    {
      order: 2,
      cost: 5,
      text: "Modules whose Set has size 2 or more are shared. Everything else belongs to the single route in its Set.",
    },
    {
      order: 3,
      cost: 10,
      text: "Build the output for every route key first (so empty routes still appear), then fill each list and call <code>.sort()</code>. Sort a copy, not the input.",
    },
  ],
  hiddenTests: [
    {
      name: "moves_modules_used_by_two_routes_into_shared",
      code: `const r = splitChunks({ home: ['a', 'b'], shop: ['b', 'c'], cart: ['b', 'c', 'd'] });
assert(JSON.stringify(r.shared) === JSON.stringify(['b', 'c']), 'shared should be ["b","c"], got ' + JSON.stringify(r.shared));
assert(JSON.stringify(r.routes.home) === JSON.stringify(['a']), 'home should keep only a, got ' + JSON.stringify(r.routes.home));
assert(JSON.stringify(r.routes.cart) === JSON.stringify(['d']), 'cart should keep only d, got ' + JSON.stringify(r.routes.cart));`,
    },
    {
      name: "route_with_only_shared_modules_gets_an_empty_list",
      code: `const r = splitChunks({ a: ['x'], b: ['x'] });
assert(Array.isArray(r.routes.a) && r.routes.a.length === 0, 'route a must still appear with an empty list');
assert(Array.isArray(r.routes.b) && r.routes.b.length === 0, 'route b must still appear with an empty list');
assert(JSON.stringify(r.shared) === JSON.stringify(['x']), 'x should be shared');`,
    },
    {
      name: "duplicate_in_one_route_does_not_make_it_shared",
      code: `const r = splitChunks({ a: ['m', 'm'], b: ['n'] });
assert(r.shared.length === 0, 'a module repeated inside one route is not shared, got ' + JSON.stringify(r.shared));
assert(JSON.stringify(r.routes.a) === JSON.stringify(['m']), 'duplicates inside a route should be listed once, got ' + JSON.stringify(r.routes.a));`,
    },
    {
      name: "outputs_are_sorted",
      code: `const r = splitChunks({ a: ['z', 'k', 'c'], b: ['k', 'c'] });
assert(JSON.stringify(r.shared) === JSON.stringify(['c', 'k']), 'shared must be sorted, got ' + JSON.stringify(r.shared));
assert(JSON.stringify(r.routes.a) === JSON.stringify(['z']), 'a should keep z');`,
    },
    {
      name: "empty_input",
      code: `const r = splitChunks({});
assert(Array.isArray(r.shared) && r.shared.length === 0, 'shared should be empty');
assert(r.routes && Object.keys(r.routes).length === 0, 'routes should be empty');`,
    },
    {
      name: "does_not_modify_input",
      code: `const input = { a: ['b', 'a'], b: ['a'] };
splitChunks(input);
assert(JSON.stringify(input) === JSON.stringify({ a: ['b', 'a'], b: ['a'] }), 'the input must not be changed');`,
    },
  ],
  solution: {
    code: `function splitChunks(routes) {
  const usedBy = new Map();
  for (const [route, modules] of Object.entries(routes)) {
    for (const m of modules) {
      if (!usedBy.has(m)) usedBy.set(m, new Set());
      usedBy.get(m).add(route);
    }
  }
  const shared = [];
  const result = {};
  for (const route of Object.keys(routes)) result[route] = [];
  for (const [m, set] of usedBy) {
    if (set.size >= 2) shared.push(m);
    else result[[...set][0]].push(m);
  }
  shared.sort();
  for (const route of Object.keys(result)) result[route].sort();
  return { shared, routes: result };
}

module.exports = splitChunks;`,
    explanation:
      "The only question the bundler asks about a module is 'how many different entry points need you?', so the code builds exactly that: a Map from module to a Set of route names. Using a Set is what makes a module listed twice by one route count once. After the counting pass, a module with two or more routes goes to the shared list, and any other module has exactly one route in its Set, so it is pushed onto that route's list. The result object is created from the route keys first so a route whose modules were all moved to the shared chunk still shows up with an empty array. Sorting happens last on the new arrays, so the input is never mutated.",
  },
};
