export default {
  slug: "apply-update-operators",
  trackId: "mern",
  layerId: "mern-6",
  type: "CODE",
  difficulty: "med",
  title: "Apply MongoDB update operators to a document",
  summary:
    "Implement $set, $unset, $inc, $push, $pull and $addToSet, including dotted paths.",
  description:
    "updateOne() does not replace a document; it applies operators such as $set and $inc to individual fields, including nested ones addressed with dotted paths like 'stats.views'. Re-creating the operators on plain objects shows exactly what MongoDB does and where it throws.",
  task:
    "Write <code>applyUpdate(doc, update)</code> returning a <b>new</b> document with the update applied (the input is not modified; documents contain only JSON-compatible values). Supported operators: <code>$set</code> (assign; create missing parent objects for dotted paths), <code>$unset</code> (delete the field; ignored if missing), <code>$inc</code> (add a number; a missing field starts at 0; throws <code>TypeError('Cannot apply $inc to a non-numeric value at PATH')</code> if the existing value is not a number), <code>$push</code> (append; a missing field becomes a new array; <code>{ $each: [...] }</code> appends several; throws <code>TypeError('Cannot apply $push to a non-array value at PATH')</code>), <code>$addToSet</code> (like push but skips values already present, compared by JSON equality) and <code>$pull</code> (remove all items equal to the value, by JSON equality; missing field ignored). Throw <code>Error('Unknown update operator: OP')</code> for another key starting with <code>$</code>, and <code>Error('Update must use operators')</code> if any top-level key does not start with <code>$</code>.",
  constraints: [
    "Operators are applied in the order they appear in <code>update</code>, and fields inside an operator in the order they appear.",
    "A dotted path like <code>'a.b.c'</code> reads and writes nested objects; <code>$unset</code> never creates parents.",
    "Equality for <code>$addToSet</code>/<code>$pull</code> is <code>JSON.stringify(a) === JSON.stringify(b)</code>.",
    "The returned document is a deep copy: changing it must not affect the input, and vice versa.",
  ],
  example: `applyUpdate({ name: 'a', stats: { views: 1 }, tags: ['x'] },
  { $set: { 'address.city': 'Oslo' }, $inc: { 'stats.views': 2 }, $push: { tags: 'y' } });
// { name: 'a', stats: { views: 3 }, tags: ['x', 'y'], address: { city: 'Oslo' } }`,
  tags: ["mongodb","update-operators","objects"],
  estimatedMins: 35,
  xp: 45,
  starterFiles: [
    {
      name: "applyUpdate.js",
      lang: "js",
      code: `// applyUpdate.js
function applyUpdate(doc, update) {
  // your code here
}

module.exports = applyUpdate;`,
    },
  ],
  testFile: {
    name: "applyUpdate_test.js",
    lang: "test",
    code: `// applyUpdate_test.js
const applyUpdate = require('./applyUpdate');

test('set_with_dotted_paths_creates_parents', () => {
  // see the hidden tests for the full checks
  expect(typeof applyUpdate).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Start with <code>const out = JSON.parse(JSON.stringify(doc))</code>. Check the keys of <code>update</code> up front so you throw before changing anything.",
    },
    {
      order: 2,
      cost: 5,
      text: "Write two helpers: <code>getParent(obj, path, create)</code> returning <code>[parentObject, lastKey]</code> (creating nested objects when <code>create</code> is true, or <code>null</code> if a parent is missing and create is false).",
    },
    {
      order: 3,
      cost: 10,
      text: "Each operator is then a few lines: read <code>parent[key]</code>, validate its type, write it back. Use <code>JSON.stringify</code> equality for $addToSet and $pull.",
    },
  ],
  hiddenTests: [
    {
      name: "set_with_dotted_paths_creates_parents",
      code: `const r = applyUpdate({ a: 1 }, { $set: { b: 2, 'x.y.z': 3 } });
assert(JSON.stringify(r) === JSON.stringify({ a: 1, b: 2, x: { y: { z: 3 } } }), 'got ' + JSON.stringify(r));`,
    },
    {
      name: "unset_removes_and_ignores_missing",
      code: `const r = applyUpdate({ a: 1, n: { b: 2, c: 3 } }, { $unset: { a: '', 'n.b': '', 'm.q': '' } });
assert(JSON.stringify(r) === JSON.stringify({ n: { c: 3 } }), 'got ' + JSON.stringify(r));`,
    },
    {
      name: "inc_adds_and_creates_missing_fields",
      code: `const r = applyUpdate({ n: 5, s: { v: 1 } }, { $inc: { n: 2, 's.v': -3, fresh: 4, 'deep.count': 1 } });
assert(JSON.stringify(r) === JSON.stringify({ n: 7, s: { v: -2 }, fresh: 4, deep: { count: 1 } }), 'got ' + JSON.stringify(r));`,
    },
    {
      name: "inc_on_a_non_number_throws",
      code: `let err = null;
try { applyUpdate({ n: 'five' }, { $inc: { n: 1 } }); } catch (e) { err = e; }
assert(err instanceof TypeError && err.message === 'Cannot apply $inc to a non-numeric value at n', 'got ' + (err && err.message));`,
    },
    {
      name: "push_creates_appends_and_supports_each",
      code: `const r = applyUpdate({ tags: ['a'] }, { $push: { tags: 'b', fresh: 1, list: { $each: [1, 2] } } });
assert(JSON.stringify(r) === JSON.stringify({ tags: ['a', 'b'], fresh: [1], list: [1, 2] }), 'got ' + JSON.stringify(r));
let err = null;
try { applyUpdate({ tags: 'a' }, { $push: { tags: 'b' } }); } catch (e) { err = e; }
assert(err instanceof TypeError && err.message === 'Cannot apply $push to a non-array value at tags', 'got ' + (err && err.message));`,
    },
    {
      name: "add_to_set_skips_duplicates_by_value",
      code: `const r = applyUpdate({ tags: ['a'], objs: [{ x: 1 }] }, { $addToSet: { tags: 'a', objs: { x: 1 }, fresh: 'z' } });
assert(JSON.stringify(r) === JSON.stringify({ tags: ['a'], objs: [{ x: 1 }], fresh: ['z'] }), 'got ' + JSON.stringify(r));
const s = applyUpdate({ tags: ['a'] }, { $addToSet: { tags: 'b' } });
assert(s.tags.length === 2, 'new values are added');`,
    },
    {
      name: "pull_removes_every_match",
      code: `const r = applyUpdate({ a: [1, 2, 1, { k: 1 }, { k: 1 }, 3], missing: 1 }, { $pull: { a: 1, ghost: 5 } });
assert(JSON.stringify(r.a) === JSON.stringify([2, { k: 1 }, { k: 1 }, 3]), 'removes every 1, got ' + JSON.stringify(r.a));
const t = applyUpdate({ a: [{ k: 1 }, { k: 2 }, { k: 1 }] }, { $pull: { a: { k: 1 } } });
assert(JSON.stringify(t.a) === JSON.stringify([{ k: 2 }]), 'objects are compared by value, got ' + JSON.stringify(t.a));`,
    },
    {
      name: "unknown_and_plain_keys_are_rejected",
      code: `let e1 = null; let e2 = null;
try { applyUpdate({}, { $rename: { a: 'b' } }); } catch (e) { e1 = e; }
try { applyUpdate({}, { name: 'x' }); } catch (e) { e2 = e; }
assert(e1 && e1.message === 'Unknown update operator: $rename', 'got ' + (e1 && e1.message));
assert(e2 && e2.message === 'Update must use operators', 'got ' + (e2 && e2.message));`,
    },
    {
      name: "operators_apply_in_order_and_input_is_untouched",
      code: `const doc = { n: 1, list: [1] };
const r = applyUpdate(doc, { $set: { n: 10 }, $inc: { n: 5 }, $push: { list: 2 } });
assert(r.n === 15 && r.list.length === 2, 'set then inc gives 15, got ' + JSON.stringify(r));
assert(doc.n === 1 && doc.list.length === 1, 'the input must not change');
r.list.push(99);
assert(doc.list.length === 1, 'the result must be a deep copy');`,
    },
  ],
  solution: {
    code: `function applyUpdate(doc, update) {
  const out = JSON.parse(JSON.stringify(doc));
  const OPS = ['$set', '$unset', '$inc', '$push', '$addToSet', '$pull'];
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  for (const key of Object.keys(update)) {
    if (key[0] !== '$') throw new Error('Update must use operators');
    if (!OPS.includes(key)) throw new Error('Unknown update operator: ' + key);
  }

  const parentOf = (path, create) => {
    const parts = path.split('.');
    let node = out;
    for (let i = 0; i < parts.length - 1; i++) {
      if (typeof node[parts[i]] !== 'object' || node[parts[i]] === null) {
        if (!create) return null;
        node[parts[i]] = {};
      }
      node = node[parts[i]];
    }
    return [node, parts[parts.length - 1]];
  };

  for (const op of Object.keys(update)) {
    for (const path of Object.keys(update[op])) {
      const arg = update[op][path];
      if (op === '$set') {
        const [node, last] = parentOf(path, true);
        node[last] = JSON.parse(JSON.stringify(arg));
      } else if (op === '$unset') {
        const found = parentOf(path, false);
        if (found) delete found[0][found[1]];
      } else if (op === '$inc') {
        const [node, last] = parentOf(path, true);
        const current = node[last] === undefined ? 0 : node[last];
        if (typeof current !== 'number') throw new TypeError('Cannot apply $inc to a non-numeric value at ' + path);
        node[last] = current + arg;
      } else if (op === '$push' || op === '$addToSet') {
        const [node, last] = parentOf(path, true);
        if (node[last] === undefined) node[last] = [];
        if (!Array.isArray(node[last])) throw new TypeError('Cannot apply ' + op + ' to a non-array value at ' + path);
        const items = arg && typeof arg === 'object' && !Array.isArray(arg) && '$each' in arg ? arg.$each : [arg];
        for (const item of items) {
          if (op === '$addToSet' && node[last].some((x) => same(x, item))) continue;
          node[last].push(JSON.parse(JSON.stringify(item)));
        }
      } else if (op === '$pull') {
        const found = parentOf(path, false);
        if (found && Array.isArray(found[0][found[1]])) {
          found[0][found[1]] = found[0][found[1]].filter((x) => !same(x, arg));
        }
      }
    }
  }
  return out;
}

module.exports = applyUpdate;`,
    explanation:
      "Everything starts from a deep copy so the original document can never be changed, and the operator keys are validated before any work so a bad update does not leave a half-applied result. The dotted-path helper is the heart of it: it walks down the parents, creating plain objects when asked (for $set, $inc and the array operators) and returning null instead when creating would be wrong ($unset and $pull must not invent structure). Each operator is then a small read-check-write on the parent: $inc treats a missing value as 0 but refuses non-numbers, $push and $addToSet create an array if the field is missing but refuse to turn a scalar into one, and the two value-based operators compare with JSON equality, which is what makes {x: 1} match {x: 1}. $each is detected by its key, matching MongoDB's modifier syntax.",
  },
};
