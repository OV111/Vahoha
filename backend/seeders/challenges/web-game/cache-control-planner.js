export default {
  slug: "cache-control-planner",
  trackId: "web-game",
  layerId: "web-game-10",
  type: "CODE",
  difficulty: "med",
  title: "Choose Cache-Control headers for a deployed game",
  summary:
    "Give hashed assets a year-long cache, the HTML and service worker none, and everything else a day.",
  description:
    "When you host a web game on a CDN, caching decides both how fast it loads and whether players get your fixes. Hashed asset files never change, so they can be cached for a year. The HTML page and the service worker must always be re-checked, otherwise players keep running an old build.",
  task:
    "Write <code>cacheControl(path)</code> returning the <code>Cache-Control</code> value for a URL path, strip any <code>?query</code> or <code>#hash</code> first, and ignore case. Rules in this order: (1) the file name <code>sw.js</code> or <code>service-worker.js</code> returns <code>no-cache</code>; (2) a path ending with <code>/</code> or a <code>.html</code> file returns <code>no-cache</code>; (3) a file whose name contains a content hash of <b>8 or more hex characters</b> between <code>.</code> or <code>-</code> and the extension (like <code>main.3f9a1c7b.js</code> or <code>logo-deadbeef.png</code>) returns <code>public, max-age=31536000, immutable</code>; (4) a known static extension (<code>js css json png jpg jpeg webp avif gif svg glb gltf mp3 ogg wav woff woff2 wasm</code>) returns <code>public, max-age=86400</code>; (5) anything else returns <code>no-cache</code>.",
  constraints: [
    "Rules are checked in the order given; the first match wins.",
    "A hash is only recognised directly before the extension: <code>3f9a1c7b/readme.txt</code> has no hash.",
    "Matching is case-insensitive, but return the header text exactly as shown.",
    "A path with no extension, such as <code>/api/state</code>, returns <code>no-cache</code>.",
  ],
  example: `cacheControl('/assets/main.3f9a1c7b.js')   // 'public, max-age=31536000, immutable'
cacheControl('/index.html')                // 'no-cache'
cacheControl('/img/logo.png?v=2')          // 'public, max-age=86400'`,
  tags: ["deployment","caching","cdn","http"],
  estimatedMins: 25,
  xp: 45,
  starterFiles: [
    {
      name: "cacheControl.js",
      lang: "js",
      code: `// cacheControl.js
function cacheControl(path) {
  // your code here
}

module.exports = cacheControl;`,
    },
  ],
  testFile: {
    name: "cacheControl_test.js",
    lang: "test",
    code: `// cacheControl_test.js
const cacheControl = require('./cacheControl');

test('hashed_assets_are_immutable', () => {
  // see the hidden tests for the full checks
  expect(typeof cacheControl).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Normalise first: cut at the first <code>?</code> or <code>#</code>, lowercase it, and take the last path segment as the file name.",
    },
    {
      order: 2,
      cost: 5,
      text: "The hash rule is a regular expression on the file name: <code>/[.-][0-9a-f]{8,}\\.[a-z0-9]+$/</code>. The extension check is the text after the last dot.",
    },
    {
      order: 3,
      cost: 10,
      text: "Write the rules as a chain of early returns in exactly the order from the task, so the first match wins without any extra flags.",
    },
  ],
  hiddenTests: [
    {
      name: "hashed_assets_are_immutable",
      code: `const IMM = 'public, max-age=31536000, immutable';
assert(cacheControl('/assets/main.3f9a1c7b.js') === IMM, 'hashed js should be immutable, got ' + cacheControl('/assets/main.3f9a1c7b.js'));
assert(cacheControl('/assets/logo-deadbeef.png') === IMM, 'a dash before the hash counts, got ' + cacheControl('/assets/logo-deadbeef.png'));
assert(cacheControl('/data/level.0123456789abcdef.json') === IMM, 'longer hashes count too');`,
    },
    {
      name: "html_and_directories_are_never_cached",
      code: `assert(cacheControl('/index.html') === 'no-cache', '.html must be no-cache');
assert(cacheControl('/game/') === 'no-cache', 'a path ending with / must be no-cache');
assert(cacheControl('/INDEX.HTML') === 'no-cache', 'matching is case-insensitive');`,
    },
    {
      name: "service_worker_is_never_cached_even_with_a_js_extension",
      code: `assert(cacheControl('/sw.js') === 'no-cache', 'sw.js must be no-cache');
assert(cacheControl('/app/service-worker.js') === 'no-cache', 'service-worker.js must be no-cache');`,
    },
    {
      name: "plain_static_files_get_a_day",
      code: `const DAY = 'public, max-age=86400';
assert(cacheControl('/img/logo.png') === DAY, 'unhashed png should be a day, got ' + cacheControl('/img/logo.png'));
assert(cacheControl('/IMG/A.PNG') === DAY, 'extensions are case-insensitive');
assert(cacheControl('/models/ship.glb') === DAY && cacheControl('/fonts/ui.woff2') === DAY && cacheControl('/engine.wasm') === DAY, 'glb, woff2 and wasm are known static files');`,
    },
    {
      name: "query_and_fragment_are_ignored",
      code: `assert(cacheControl('/assets/main.3f9a1c7b.js?v=2') === 'public, max-age=31536000, immutable', 'a query string must not hide the hash');
assert(cacheControl('/img/logo.png#top') === 'public, max-age=86400', 'a fragment must be ignored');
assert(cacheControl('/index.html?x=1') === 'no-cache', 'html with a query is still html');`,
    },
    {
      name: "unknown_and_extensionless_paths_are_not_cached",
      code: `assert(cacheControl('/api/state') === 'no-cache', 'no extension means no-cache');
assert(cacheControl('/notes/readme.txt') === 'no-cache', 'unknown extensions are no-cache');
assert(cacheControl('/3f9a1c7b/readme.txt') === 'no-cache', 'a hash in a folder name is not a content hash');`,
    },
    {
      name: "short_hex_names_are_not_hashes",
      code: `assert(cacheControl('/js/vendor.abc123.js') === 'public, max-age=86400', 'six hex characters are too short to be a content hash');`,
    },
  ],
  solution: {
    code: `function cacheControl(path) {
  const clean = path.split(/[?#]/)[0].toLowerCase();
  const name = clean.slice(clean.lastIndexOf('/') + 1);

  if (name === 'sw.js' || name === 'service-worker.js') return 'no-cache';
  if (clean.endsWith('/') || name.endsWith('.html')) return 'no-cache';
  if (/[.-][0-9a-f]{8,}\\.[a-z0-9]+$/.test(name)) {
    return 'public, max-age=31536000, immutable';
  }
  const dot = name.lastIndexOf('.');
  const ext = dot === -1 ? '' : name.slice(dot + 1);
  const known = ['js', 'css', 'json', 'png', 'jpg', 'jpeg', 'webp', 'avif', 'gif', 'svg',
    'glb', 'gltf', 'mp3', 'ogg', 'wav', 'woff', 'woff2', 'wasm'];
  if (known.includes(ext)) return 'public, max-age=86400';
  return 'no-cache';
}

module.exports = cacheControl;`,
    explanation:
      "The rules are ordered from 'must never be stale' to 'safe to cache', so the code is a chain of early returns in that order. The service worker and the HTML come first because a stale copy of either pins players to an old build no matter how long the other files are cached. The hash test is a regular expression anchored to the end of the file name, so a hash must sit right before the extension and be at least 8 hex characters; that is why a folder named like a hash or a short token such as abc123 is not treated as content-addressed. Only after that does the extension decide between a day of caching and none. The path is lowercased and cut at the first query or fragment character up front, so every later rule works on the same normalised text.",
  },
};
