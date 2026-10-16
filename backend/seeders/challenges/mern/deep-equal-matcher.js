export default {
  slug: "deep-equal-matcher",
  trackId: "mern",
  layerId: "mern-9",
  type: "CODE",
  difficulty: "med",
  title: "Write toEqual: a deep equality check",
  summary:
    "Compare values structurally, handling NaN, dates, regular expressions and circular references.",
  description:
    "expect(a).toEqual(b) does not use ===; it compares structure. Most bugs in custom matchers come from edge cases: NaN is not equal to itself with ===, two Dates with the same time are different objects, and a circular object would make a naive recursive comparison run forever.",
  task:
    "Write <code>deepEqual(a, b)</code> returning true when the two values are structurally equal. Rules: primitives are equal with <code>Object.is</code>, except that <code>+0</code> and <code>-0</code> are considered equal (so <code>NaN</code> equals <code>NaN</code>). Arrays are equal if they have the same length and equal items in order; an array never equals a non-array. <code>Date</code>s are equal if their times are equal. <code>RegExp</code>s are equal if their source and flags are equal. Plain objects are equal if they have the same set of keys and equal values, where keys whose value is <code>undefined</code> are ignored (so <code>{ a: 1, b: undefined }</code> equals <code>{ a: 1 }</code>), regardless of key order. Values of different kinds (object versus array, Date versus plain object) are never equal. Circular references must not cause infinite recursion: if the same pair of objects is already being compared further up, treat it as equal.",
  constraints: [
    "Functions are equal only if they are the same function (<code>===</code>).",
    "Only own enumerable string keys are compared.",
    "Do not modify the inputs.",
    "The result is always exactly <code>true</code> or <code>false</code>.",
  ],
  example: `deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }); // true
deepEqual(NaN, NaN);                                   // true
deepEqual(new Date(5), new Date(5));                   // true
deepEqual({ a: 1, b: undefined }, { a: 1 });           // true`,
  tags: ["testing","matchers","recursion","equality"],
  estimatedMins: 35,
  xp: 45,
  starterFiles: [
    {
      name: "deepEqual.js",
      lang: "js",
      code: `// deepEqual.js
function deepEqual(a, b) {
  // your code here
}

module.exports = deepEqual;`,
    },
  ],
  testFile: {
    name: "deepEqual_test.js",
    lang: "test",
    code: `// deepEqual_test.js
const deepEqual = require('./deepEqual');

test('primitives', () => {
  // see the hidden tests for the full checks
  expect(typeof deepEqual).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Handle primitives first: if both are not objects (or either is null), compare with <code>Object.is</code>, treating <code>0</code> and <code>-0</code> as equal.",
    },
    {
      order: 2,
      cost: 5,
      text: "Before comparing two objects, compare their kinds: both arrays, both Dates, both RegExps, or both plain objects. Different kinds are false.",
    },
    {
      order: 3,
      cost: 10,
      text: "For cycles, keep a list (or WeakMap) of pairs currently being compared. If <code>(a, b)</code> is already in it, return true; add the pair before recursing and remove it afterwards.",
    },
  ],
  hiddenTests: [
    {
      name: "primitives",
      code: `assert(deepEqual(1, 1) && deepEqual('a', 'a') && deepEqual(null, null) && deepEqual(undefined, undefined), 'equal primitives');
assert(!deepEqual(1, '1') && !deepEqual(0, false) && !deepEqual(null, undefined), 'no coercion');
assert(deepEqual(NaN, NaN) === true, 'NaN equals NaN');
assert(deepEqual(0, -0) === true, '+0 equals -0');`,
    },
    {
      name: "arrays",
      code: `assert(deepEqual([1, [2, 3]], [1, [2, 3]]) === true, 'nested arrays');
assert(deepEqual([1, 2], [2, 1]) === false, 'order matters');
assert(deepEqual([1, 2], [1, 2, 3]) === false, 'length matters');
assert(deepEqual([], {}) === false && deepEqual({}, []) === false, 'array versus object');`,
    },
    {
      name: "objects_ignore_key_order",
      code: `assert(deepEqual({ a: 1, b: { c: 2 } }, { b: { c: 2 }, a: 1 }) === true, 'key order does not matter');
assert(deepEqual({ a: 1 }, { a: 2 }) === false && deepEqual({ a: 1 }, { b: 1 }) === false, 'different values or keys');
assert(deepEqual({ a: 1 }, { a: 1, b: 2 }) === false, 'an extra defined key');`,
    },
    {
      name: "undefined_properties_are_ignored",
      code: `assert(deepEqual({ a: 1, b: undefined }, { a: 1 }) === true, 'undefined property on the left');
assert(deepEqual({ a: 1 }, { a: 1, b: undefined }) === true, 'undefined property on the right');
assert(deepEqual({ a: undefined }, { b: undefined }) === true, 'both only have undefined values');
assert(deepEqual({ a: null }, { a: undefined }) === false, 'null is not undefined');`,
    },
    {
      name: "dates_and_regexps",
      code: `assert(deepEqual(new Date(5), new Date(5)) === true && deepEqual(new Date(5), new Date(6)) === false, 'dates by time');
assert(deepEqual(new Date(5), { }) === false, 'a date is not a plain object');
assert(deepEqual(/a+/gi, /a+/gi) === true && deepEqual(/a+/g, /a+/i) === false && deepEqual(/a/, /b/) === false, 'regexps by source and flags');
assert(deepEqual({ when: new Date(1) }, { when: new Date(1) }) === true, 'dates inside objects');`,
    },
    {
      name: "functions_by_identity",
      code: `const f = () => 1;
assert(deepEqual(f, f) === true, 'same function');
assert(deepEqual(() => 1, () => 1) === false, 'different function objects');
assert(deepEqual({ cb: f }, { cb: f }) === true, 'same function inside an object');`,
    },
    {
      name: "circular_references_terminate",
      code: `const a = { name: 'a' }; a.self = a;
const b = { name: 'a' }; b.self = b;
assert(deepEqual(a, b) === true, 'two structurally equal circular objects');
const c = { name: 'c' }; c.self = c;
assert(deepEqual(a, c) === false, 'circular objects that differ elsewhere');
const x = [1]; x.push(x);
const y = [1]; y.push(y);
assert(deepEqual(x, y) === true, 'circular arrays');`,
    },
    {
      name: "does_not_modify_inputs_and_returns_booleans",
      code: `const a = { n: [1, 2], o: { p: 1 } };
const b = { n: [1, 2], o: { p: 1 } };
const r = deepEqual(a, b);
assert(r === true, 'must be exactly true');
assert(JSON.stringify(a) === JSON.stringify({ n: [1, 2], o: { p: 1 } }), 'inputs are unchanged');
assert(deepEqual({ a: 1 }, null) === false && deepEqual(null, { a: 1 }) === false, 'null against an object is false, not an error');`,
    },
  ],
  solution: {
    code: `function deepEqual(a, b) {
  const seen = [];

  function eq(x, y) {
    if (typeof x !== 'object' || x === null || typeof y !== 'object' || y === null) {
      if (typeof x === 'number' && typeof y === 'number') return x === y || (x !== x && y !== y);
      return Object.is(x, y);
    }
    if (x === y) return true;

    const kind = (v) =>
      Array.isArray(v) ? 'array' : v instanceof Date ? 'date' : v instanceof RegExp ? 'regexp' : 'object';
    if (kind(x) !== kind(y)) return false;
    if (kind(x) === 'date') return x.getTime() === y.getTime();
    if (kind(x) === 'regexp') return x.source === y.source && x.flags === y.flags;

    for (const pair of seen) if (pair[0] === x && pair[1] === y) return true;
    seen.push([x, y]);

    let result;
    if (kind(x) === 'array') {
      result = x.length === y.length && x.every((item, i) => eq(item, y[i]));
    } else {
      const keysX = Object.keys(x).filter((k) => x[k] !== undefined);
      const keysY = Object.keys(y).filter((k) => y[k] !== undefined);
      result =
        keysX.length === keysY.length &&
        keysX.every((k) => Object.prototype.hasOwnProperty.call(y, k) && eq(x[k], y[k]));
    }
    seen.pop();
    return result;
  }

  return eq(a, b);
}

module.exports = deepEqual;`,
    explanation:
      "Primitives are decided first: for numbers the comparison is x === y, which already treats +0 and -0 as equal, plus an explicit check that both are NaN; everything else uses Object.is, so null, undefined and strings behave exactly. For objects, the first question is whether they are the same kind of thing, because an array and an object with the same keys, or a Date and a plain object, must never be equal; Dates and regular expressions are then compared by their value rather than their identity. Plain objects compare the keys that actually hold a value, which is what makes undefined properties invisible, and the length check plus 'every key of x exists in y with an equal value' proves the two key sets are the same. The seen list is the cycle guard: a pair currently being compared is assumed equal when met again, and removing it afterwards means the same objects can be compared in separate branches without the assumption leaking.",
  },
};
