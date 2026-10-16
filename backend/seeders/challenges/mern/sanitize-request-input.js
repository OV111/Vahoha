export default {
  slug: "sanitize-request-input",
  trackId: "mern",
  layerId: "mern-7",
  type: "CODE",
  difficulty: "med",
  title: "Sanitize request input against NoSQL injection and XSS",
  summary:
    "Strip operator keys and escape HTML in nested request data.",
  description:
    "If a login route passes req.body straight to find(), a client can send { password: { $ne: null } } and match any user. And text stored without escaping can run as script when displayed. Sanitizing at the edge removes both classes of problem before the data reaches your code.",
  task:
    "Write <code>sanitizeInput(value)</code> returning a cleaned deep copy. Strings are trimmed and HTML-escaped by replacing <code>&amp;</code>, <code>&lt;</code>, <code>&gt;</code>, <code>\"</code> and <code>'</code> with <code>&amp;amp;</code>, <code>&amp;lt;</code>, <code>&amp;gt;</code>, <code>&amp;quot;</code> and <code>&amp;#39;</code> (replace <code>&amp;</code> first so existing entities are not double-processed incorrectly in the wrong order). Arrays are cleaned element by element. Plain objects keep only keys that are safe: drop any key that starts with <code>$</code>, contains a <code>.</code>, or is one of <code>__proto__</code>, <code>constructor</code>, <code>prototype</code>; clean the values of the others. Numbers, booleans and <code>null</code> are returned unchanged; <code>undefined</code> values are removed from objects (and become <code>null</code> inside arrays). Dates become ISO strings.",
  constraints: [
    "Throw <code>RangeError('Input is nested too deeply')</code> if nesting goes deeper than 10 levels (the top-level value is level 1).",
    "Never modify the input; the result must share no object or array with it.",
    "Functions and symbols are dropped like <code>undefined</code>.",
    "Keys are compared exactly; <code>'$'</code> alone and <code>'a$b'</code> are different (only a leading <code>$</code> is dropped).",
  ],
  example: `sanitizeInput({ email: ' <b>a@x.io</b> ', password: { $ne: null }, tags: ['<i>'] });
// { email: '&lt;b&gt;a@x.io&lt;/b&gt;', password: {}, tags: ['&lt;i&gt;'] }`,
  tags: ["security","nosql-injection","xss","owasp"],
  estimatedMins: 35,
  xp: 45,
  starterFiles: [
    {
      name: "sanitizeInput.js",
      lang: "js",
      code: `// sanitizeInput.js
function sanitizeInput(value) {
  // your code here
}

module.exports = sanitizeInput;`,
    },
  ],
  testFile: {
    name: "sanitizeInput_test.js",
    lang: "test",
    code: `// sanitizeInput_test.js
const sanitizeInput = require('./sanitizeInput');

test('escapes_html_in_strings_and_trims', () => {
  // see the hidden tests for the full checks
  expect(typeof sanitizeInput).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Write a recursive <code>clean(value, depth)</code>. Throw when <code>depth &gt; 10</code>, then branch on type: string, array, Date, plain object, everything else.",
    },
    {
      order: 2,
      cost: 5,
      text: "For objects, loop over <code>Object.keys(value)</code> and skip unsafe keys with a small <code>isSafeKey</code> helper. Write results with <code>Object.defineProperty</code> or a normal assignment; since you drop <code>__proto__</code> an ordinary assignment is safe.",
    },
    {
      order: 3,
      cost: 10,
      text: "Escape with chained <code>replace</code> calls and do the ampersand first, otherwise the other replacements would be escaped a second time.",
    },
  ],
  hiddenTests: [
    {
      name: "escapes_html_in_strings_and_trims",
      code: `assert(sanitizeInput('  <script>alert("x")</script>  ') === '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;', 'got ' + sanitizeInput('  <script>alert("x")</script>  '));
assert(sanitizeInput("it's & co") === 'it&#39;s &amp; co', 'got ' + sanitizeInput("it's & co"));
assert(sanitizeInput('&lt;') === '&amp;lt;', 'ampersands are escaped first and exactly once, got ' + sanitizeInput('&lt;'));`,
    },
    {
      name: "removes_operator_and_dotted_keys",
      code: `const r = sanitizeInput({ user: 'a', password: { $ne: null }, 'a.b': 1, $where: 'x', nested: { $gt: 5, ok: 1 } });
assert(JSON.stringify(r) === JSON.stringify({ user: 'a', password: {}, nested: { ok: 1 } }), 'got ' + JSON.stringify(r));`,
    },
    {
      name: "drops_prototype_pollution_keys",
      code: `const input = JSON.parse('{"__proto__": {"admin": true}, "constructor": {"x": 1}, "prototype": 1, "name": "ok"}');
const r = sanitizeInput(input);
assert(JSON.stringify(r) === JSON.stringify({ name: 'ok' }), 'got ' + JSON.stringify(r));
assert(({}).admin === undefined && r.admin === undefined, 'nothing may leak onto the prototype');`,
    },
    {
      name: "only_a_leading_dollar_is_dropped",
      code: `const r = sanitizeInput({ a$b: 1, $: 2, price$: 3 });
assert(JSON.stringify(r) === JSON.stringify({ a$b: 1, price$: 3 }), 'got ' + JSON.stringify(r));`,
    },
    {
      name: "arrays_and_primitives",
      code: `const r = sanitizeInput({ list: ['<a>', 1, true, null, undefined, { $x: 1, y: '<' }], n: 5, b: false, z: null });
assert(JSON.stringify(r) === JSON.stringify({ list: ['&lt;a&gt;', 1, true, null, null, { y: '&lt;' }], n: 5, b: false, z: null }), 'got ' + JSON.stringify(r));`,
    },
    {
      name: "undefined_functions_and_dates",
      code: `const r = sanitizeInput({ a: undefined, f: function () {}, d: new Date(0), s: 'x' });
assert(JSON.stringify(r) === JSON.stringify({ d: '1970-01-01T00:00:00.000Z', s: 'x' }), 'got ' + JSON.stringify(r));`,
    },
    {
      name: "returns_a_deep_copy",
      code: `const input = { a: { b: [1, { c: '<' }] } };
const r = sanitizeInput(input);
assert(r !== input && r.a !== input.a && r.a.b !== input.a.b && r.a.b[1] !== input.a.b[1], 'no object may be shared');
assert(input.a.b[1].c === '<', 'the input must not be modified');`,
    },
    {
      name: "rejects_deeply_nested_input",
      code: `let deep = 'x';
for (let i = 0; i < 12; i++) deep = { n: deep };
let err = null;
try { sanitizeInput(deep); } catch (e) { err = e; }
assert(err instanceof RangeError && err.message === 'Input is nested too deeply', 'got ' + (err && err.message));
let ok = 'x';
for (let i = 0; i < 9; i++) ok = { n: ok };
assert(sanitizeInput(ok).n !== undefined, 'ten levels in total are allowed');`,
    },
  ],
  solution: {
    code: `function sanitizeInput(value) {
  const UNSAFE = ['__proto__', 'constructor', 'prototype'];
  const escape = (s) =>
    s.trim()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  const safeKey = (k) => k[0] !== '$' && !k.includes('.') && !UNSAFE.includes(k);
  const drop = (v) => v === undefined || typeof v === 'function' || typeof v === 'symbol';

  function clean(v, depth) {
    if (depth > 10) throw new RangeError('Input is nested too deeply');
    if (typeof v === 'string') return escape(v);
    if (v instanceof Date) return v.toISOString();
    if (Array.isArray(v)) return v.map((x) => (drop(x) ? null : clean(x, depth + 1)));
    if (typeof v === 'object' && v !== null) {
      const out = {};
      for (const key of Object.keys(v)) {
        if (!safeKey(key) || drop(v[key])) continue;
        out[key] = clean(v[key], depth + 1);
      }
      return out;
    }
    return v;
  }

  return clean(value, 1);
}

module.exports = sanitizeInput;`,
    explanation:
      "Two different attacks are handled by two different rules on the same walk. For NoSQL injection the danger is in object keys, not values: a key starting with $ becomes a query operator and a dot reaches into nested fields, so such keys are removed, which turns { password: { $ne: null } } into { password: {} } and breaks the attack. For XSS the danger is in string values, so they are escaped, with the ampersand replaced first because every later replacement introduces new ampersands. Prototype-pollution keys are dropped by name, and since they never get assigned, building the result with a plain object is safe. The depth limit stops a maliciously nested payload from exhausting the stack, and the recursive copy guarantees the result shares nothing with the input, so later changes to one cannot affect the other.",
  },
};
