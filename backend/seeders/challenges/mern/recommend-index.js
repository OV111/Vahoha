export default {
  slug: "recommend-index",
  trackId: "mern",
  layerId: "mern-6",
  type: "CODE",
  difficulty: "hard",
  title: "Recommend a compound index with the ESR rule",
  summary:
    "Order index fields as Equality, Sort, Range so a query can use one index efficiently.",
  description:
    "MongoDB can use one compound index for a query, but only if the fields are in a helpful order. The ESR rule says: equality fields first, then the fields you sort by, then range fields. Following it lets the database jump straight to the matching section and return documents already sorted, without an in-memory sort.",
  task:
    "Write <code>recommendIndex({ filter, sort })</code> returning an array of <code>[field, direction]</code> pairs, where direction is <code>1</code> or <code>-1</code>. <b>Equality</b> fields are filter keys whose value is a plain value, <code>{ $eq: v }</code> or <code>{ $in: [...] }</code>. <b>Range</b> fields are filter keys whose value is an operator object with any of <code>$gt $gte $lt $lte $ne $nin</code> (and no equality operator). <b>Sort</b> fields are the keys of <code>sort</code> in order, with direction from the value (<code>1</code> or <code>-1</code>). Output order: equality fields (direction 1) in filter order, then sort fields in sort order (their given direction), then range fields (direction 1) in filter order. A field appears only once, at its first applicable position: a sort field that is already an equality field is skipped, and a range field that is already a sort field keeps its sort position. Filter keys starting with <code>$</code> are ignored. Throw <code>Error('Invalid sort direction for FIELD')</code> if a sort value is not 1 or -1.",
  constraints: [
    "A filter value that is an object with only operators from the equality group is equality; an object that mixes equality and range operators counts as equality.",
    "Dates and other non-plain values are treated as plain values (equality).",
    "<code>sort</code> may be omitted or empty.",
    "Return <code>[]</code> when nothing is filtered or sorted.",
  ],
  example: `recommendIndex({
  filter: { status: 'open', owner: { $in: [1, 2] }, createdAt: { $gte: '2024-01-01' } },
  sort: { priority: -1 },
});
// [['status', 1], ['owner', 1], ['priority', -1], ['createdAt', 1]]`,
  tags: ["mongodb","indexing","performance","esr-rule"],
  estimatedMins: 40,
  xp: 75,
  starterFiles: [
    {
      name: "recommendIndex.js",
      lang: "js",
      code: `// recommendIndex.js
function recommendIndex({ filter, sort }) {
  // your code here
}

module.exports = recommendIndex;`,
    },
  ],
  testFile: {
    name: "recommendIndex_test.js",
    lang: "test",
    code: `// recommendIndex_test.js
const recommendIndex = require('./recommendIndex');

test('equality_then_sort_then_range', () => {
  // see the hidden tests for the full checks
  expect(typeof recommendIndex).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Classify each filter key: a value is a 'range' only if it is a plain object whose keys are all in the range group and none is <code>$eq</code>/<code>$in</code>; everything else (dates, arrays, scalars, mixed objects) is equality.",
    },
    {
      order: 2,
      cost: 5,
      text: "Build three lists (equality, sort, range) and then concatenate them while skipping fields already placed. Keep a <code>Set</code> of used field names.",
    },
    {
      order: 3,
      cost: 10,
      text: "Dates are objects but not plain: check <code>Object.getPrototypeOf(v) === Object.prototype</code> (or <code>v.constructor === Object</code>) to decide whether an object can be an operator expression.",
    },
  ],
  hiddenTests: [
    {
      name: "equality_then_sort_then_range",
      code: `const r = recommendIndex({ filter: { status: 'open', owner: { $in: [1, 2] }, createdAt: { $gte: 5 } }, sort: { priority: -1 } });
assert(JSON.stringify(r) === JSON.stringify([['status', 1], ['owner', 1], ['priority', -1], ['createdAt', 1]]), 'got ' + JSON.stringify(r));`,
    },
    {
      name: "range_field_that_is_also_sorted_keeps_the_sort_position",
      code: `const r = recommendIndex({ filter: { type: 'a', price: { $gt: 1 } }, sort: { price: -1 } });
assert(JSON.stringify(r) === JSON.stringify([['type', 1], ['price', -1]]), 'the sort direction wins and the field is not repeated, got ' + JSON.stringify(r));`,
    },
    {
      name: "sorting_by_an_equality_field_adds_nothing",
      code: `const r = recommendIndex({ filter: { status: 'open' }, sort: { status: 1, created: -1 } });
assert(JSON.stringify(r) === JSON.stringify([['status', 1], ['created', -1]]), 'got ' + JSON.stringify(r));`,
    },
    {
      name: "eq_operator_counts_as_equality_and_ne_as_range",
      code: `const r = recommendIndex({ filter: { a: { $eq: 1 }, b: { $ne: 2 }, c: { $nin: [3] } }, sort: { s: 1 } });
assert(JSON.stringify(r) === JSON.stringify([['a', 1], ['s', 1], ['b', 1], ['c', 1]]), 'got ' + JSON.stringify(r));`,
    },
    {
      name: "mixed_operator_objects_and_plain_values",
      code: `const r = recommendIndex({ filter: { d: new Date(0), e: { $eq: 1, $gt: 0 }, tags: ['x'] }, sort: {} });
assert(JSON.stringify(r) === JSON.stringify([['d', 1], ['e', 1], ['tags', 1]]), 'dates, mixed equality objects and arrays are equality, got ' + JSON.stringify(r));`,
    },
    {
      name: "top_level_operators_are_ignored",
      code: `const r = recommendIndex({ filter: { $or: [{ a: 1 }, { b: 2 }], c: 3 } });
assert(JSON.stringify(r) === JSON.stringify([['c', 1]]), 'got ' + JSON.stringify(r));`,
    },
    {
      name: "multi_field_sort_keeps_order_and_directions",
      code: `const r = recommendIndex({ filter: { a: 1 }, sort: { z: -1, y: 1, x: -1 } });
assert(JSON.stringify(r) === JSON.stringify([['a', 1], ['z', -1], ['y', 1], ['x', -1]]), 'got ' + JSON.stringify(r));`,
    },
    {
      name: "invalid_sort_direction_throws_and_empty_input_is_empty",
      code: `let err = null;
try { recommendIndex({ filter: {}, sort: { a: 'asc' } }); } catch (e) { err = e; }
assert(err && err.message === 'Invalid sort direction for a', 'got ' + (err && err.message));
assert(JSON.stringify(recommendIndex({ filter: {} })) === '[]', 'nothing to index');`,
    },
  ],
  solution: {
    code: `function recommendIndex({ filter, sort }) {
  const RANGE = ['$gt', '$gte', '$lt', '$lte', '$ne', '$nin'];
  const f = filter || {};
  const s = sort || {};
  const isPlain = (v) => typeof v === 'object' && v !== null && !Array.isArray(v) && Object.getPrototypeOf(v) === Object.prototype;

  const equality = [];
  const range = [];
  for (const field of Object.keys(f)) {
    if (field[0] === '$') continue;
    const v = f[field];
    const keys = isPlain(v) ? Object.keys(v) : [];
    const isOps = keys.length > 0 && keys.every((k) => k[0] === '$');
    const isRange = isOps && keys.every((k) => RANGE.includes(k));
    if (isRange) range.push(field);
    else equality.push(field);
  }

  const sortFields = [];
  for (const field of Object.keys(s)) {
    if (s[field] !== 1 && s[field] !== -1) throw new Error('Invalid sort direction for ' + field);
    sortFields.push([field, s[field]]);
  }

  const used = new Set();
  const result = [];
  const add = (field, dir) => {
    if (used.has(field)) return;
    used.add(field);
    result.push([field, dir]);
  };
  for (const field of equality) add(field, 1);
  for (const [field, dir] of sortFields) add(field, dir);
  for (const field of range) add(field, 1);
  return result;
}

module.exports = recommendIndex;`,
    explanation:
      "The rule is simply an ordering over three buckets, so the code classifies first and orders second. Classification looks at the filter value: only a plain object made entirely of range operators is a range; scalars, arrays, dates and objects containing $eq or $in are equality, which is why the plain-object check (prototype is Object.prototype) matters, since a Date is an object that must not be mistaken for an operator expression. Equality comes first because it narrows the index to one contiguous section; sort fields come next so the section is already ordered and no in-memory sort is needed; range fields come last because a range stops the index from staying ordered on anything after it. The used set makes each field appear once at its earliest position, which is exactly why a field that is both ranged and sorted sits at its sort position with the sort direction.",
  },
};
