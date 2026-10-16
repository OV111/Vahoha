export default {
  slug: "match-mongo-query",
  trackId: "mern",
  layerId: "mern-6",
  type: "CODE",
  difficulty: "hard",
  title: "Match documents against a MongoDB query",
  summary:
    "Evaluate comparison operators, logical operators, dotted paths and array fields the way find() does.",
  description:
    "find({ price: { $gt: 5 } }) is evaluated by comparing each document with a query tree. The interesting parts are the rules that surprise people: a scalar query value matches an array field that contains it, dotted paths reach into arrays of sub-documents, and $ne means 'no candidate value matches'. Implementing the matcher teaches the semantics precisely.",
  task:
    "Write <code>matchQuery(doc, query)</code> returning true if <code>doc</code> matches. Support: field equality; operators <code>$eq $ne $gt $gte $lt $lte $in $nin $exists $regex</code> (with optional <code>$options</code> such as <code>'i'</code>); top-level <code>$and</code>, <code>$or</code>, <code>$nor</code> (arrays of queries). All conditions in one query object must hold. <b>Candidate values:</b> for a path like <code>'a.b'</code>, collect every value found by walking the path, going through arrays of sub-documents; if a final value is itself an array, both the array and each of its elements are candidates. A positive operator (<code>$eq</code>, <code>$gt</code>, <code>$gte</code>, <code>$lt</code>, <code>$lte</code>, <code>$in</code>, <code>$regex</code>, plain equality) matches if <b>any</b> candidate satisfies it. <code>$ne</code> and <code>$nin</code> match only if <b>no</b> candidate matches the positive form. <code>$exists: true</code> needs at least one candidate, <code>false</code> needs none. Equality to <code>null</code> also matches a missing field. Comparisons <code>$gt/$gte/$lt/$lte</code> only compare values of the same type (numbers with numbers, strings with strings). Plain object equality compares with <code>JSON.stringify</code>.",
  constraints: [
    "An unknown operator (a key starting with <code>$</code> that is not listed) throws <code>Error('Unsupported operator: OP')</code>.",
    "An empty query <code>{}</code> matches every document; <code>$and: []</code> matches, <code>$or: []</code> does not, <code>$nor: []</code> matches.",
    "A condition whose value is a plain object containing keys starting with <code>$</code> is an operator expression; any other object value is an equality comparison.",
    "<code>$regex</code> applies only to string candidates.",
  ],
  example: `matchQuery({ tags: ['a', 'b'], price: 7 }, { tags: 'a', price: { $gt: 5, $lt: 10 } }); // true
matchQuery({ items: [{ qty: 1 }, { qty: 5 }] }, { 'items.qty': { $gte: 5 } });          // true
matchQuery({ tags: ['a'] }, { tags: { $ne: 'a' } });                                  // false`,
  tags: ["mongodb","querying","recursion","semantics"],
  estimatedMins: 50,
  xp: 75,
  starterFiles: [
    {
      name: "matchQuery.js",
      lang: "js",
      code: `// matchQuery.js
function matchQuery(doc, query) {
  // your code here
}

module.exports = matchQuery;`,
    },
  ],
  testFile: {
    name: "matchQuery_test.js",
    lang: "test",
    code: `// matchQuery_test.js
const matchQuery = require('./matchQuery');

test('equality_and_missing_fields', () => {
  // see the hidden tests for the full checks
  expect(typeof matchQuery).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Write <code>candidates(doc, path)</code> first: walk the path segments; when the current node is an array and the segment is not a number, fan out over its elements. At the end, if the final value is an array also add each element. Return <code>{ found, values }</code> so you can tell a missing field from an undefined value.",
    },
    {
      order: 2,
      cost: 5,
      text: "Write <code>matchPositive(values, found, op, arg)</code> for equality and the positive operators; then <code>$ne</code> is <code>!matchPositive(..., '$eq', arg)</code> and <code>$nin</code> is <code>!matchPositive(..., '$in', arg)</code>.",
    },
    {
      order: 3,
      cost: 10,
      text: "In the main loop: keys starting with <code>$</code> at the top are $and/$or/$nor (anything else throws); for other keys, a plain object whose keys all start with <code>$</code> is an operator expression, otherwise it is an equality value. Equality to <code>null</code> should be true when the field is not found.",
    },
  ],
  hiddenTests: [
    {
      name: "equality_and_missing_fields",
      code: `const d = { a: 1, s: 'x', n: null };
assert(matchQuery(d, { a: 1 }) === true && matchQuery(d, { a: 2 }) === false, 'equality');
assert(matchQuery(d, { n: null }) === true && matchQuery(d, { missing: null }) === true, 'null matches null and missing');
assert(matchQuery(d, { a: 1, s: 'x' }) === true && matchQuery(d, { a: 1, s: 'y' }) === false, 'all conditions must hold');
assert(matchQuery(d, {}) === true, 'an empty query matches everything');`,
    },
    {
      name: "comparison_operators_compare_same_types_only",
      code: `const d = { n: 5, s: 'b' };
assert(matchQuery(d, { n: { $gt: 4, $lt: 6 } }) === true, 'range');
assert(matchQuery(d, { n: { $gte: 5 } }) === true && matchQuery(d, { n: { $gt: 5 } }) === false, 'boundaries');
assert(matchQuery(d, { s: { $gt: 'a' } }) === true, 'strings compare with strings');
assert(matchQuery(d, { n: { $gt: 'a' } }) === false, 'a number never compares with a string');`,
    },
    {
      name: "in_nin_ne_eq",
      code: `const d = { c: 'red' };
assert(matchQuery(d, { c: { $in: ['red', 'blue'] } }) === true && matchQuery(d, { c: { $in: ['green'] } }) === false, '$in');
assert(matchQuery(d, { c: { $nin: ['green'] } }) === true && matchQuery(d, { c: { $nin: ['red'] } }) === false, '$nin');
assert(matchQuery(d, { c: { $ne: 'blue' } }) === true && matchQuery(d, { c: { $ne: 'red' } }) === false, '$ne');
assert(matchQuery(d, { c: { $eq: 'red' } }) === true, '$eq');
assert(matchQuery(d, { missing: { $ne: 'x' } }) === true, '$ne matches when the field is missing');`,
    },
    {
      name: "exists",
      code: `const d = { a: 1, z: undefined };
assert(matchQuery(d, { a: { $exists: true } }) === true && matchQuery(d, { a: { $exists: false } }) === false, 'present');
assert(matchQuery(d, { b: { $exists: false } }) === true && matchQuery(d, { b: { $exists: true } }) === false, 'absent');`,
    },
    {
      name: "array_fields_match_when_any_element_matches",
      code: `const d = { tags: ['a', 'b'], nums: [1, 5, 9] };
assert(matchQuery(d, { tags: 'a' }) === true && matchQuery(d, { tags: 'z' }) === false, 'scalar matches an element');
assert(matchQuery(d, { tags: ['a', 'b'] }) === true, 'an exact array also matches');
assert(matchQuery(d, { nums: { $gt: 8 } }) === true && matchQuery(d, { nums: { $gt: 9 } }) === false, 'range on array elements');
assert(matchQuery(d, { tags: { $ne: 'a' } }) === false, '$ne is false if any element equals');
assert(matchQuery(d, { tags: { $nin: ['x', 'y'] } }) === true, '$nin is true if no element is listed');
assert(matchQuery(d, { tags: { $in: ['z', 'b'] } }) === true, '$in matches any element');`,
    },
    {
      name: "dotted_paths_through_objects_and_arrays",
      code: `const d = { user: { name: 'ana', tags: ['x'] }, items: [{ qty: 1, sku: 'a' }, { qty: 5, sku: 'b' }] };
assert(matchQuery(d, { 'user.name': 'ana' }) === true, 'nested object');
assert(matchQuery(d, { 'user.tags': 'x' }) === true, 'nested array');
assert(matchQuery(d, { 'items.qty': { $gte: 5 } }) === true, 'path through an array of sub-documents');
assert(matchQuery(d, { 'items.sku': 'b' }) === true && matchQuery(d, { 'items.sku': 'c' }) === false, 'any sub-document can match');
assert(matchQuery(d, { 'user.age': { $exists: false } }) === true, 'missing nested path');`,
    },
    {
      name: "regex_with_options",
      code: `const d = { name: 'Alice', n: 5, tags: ['Foo', 'bar'] };
assert(matchQuery(d, { name: { $regex: '^al', $options: 'i' } }) === true, 'case-insensitive');
assert(matchQuery(d, { name: { $regex: '^al' } }) === false, 'case-sensitive by default');
assert(matchQuery(d, { n: { $regex: '5' } }) === false, 'regex only applies to strings');
assert(matchQuery(d, { tags: { $regex: '^F' } }) === true, 'regex matches any array element');`,
    },
    {
      name: "logical_operators",
      code: `const d = { a: 1, b: 2 };
assert(matchQuery(d, { $and: [{ a: 1 }, { b: 2 }] }) === true && matchQuery(d, { $and: [{ a: 1 }, { b: 3 }] }) === false, '$and');
assert(matchQuery(d, { $or: [{ a: 9 }, { b: 2 }] }) === true && matchQuery(d, { $or: [{ a: 9 }, { b: 9 }] }) === false, '$or');
assert(matchQuery(d, { $nor: [{ a: 9 }, { b: 9 }] }) === true && matchQuery(d, { $nor: [{ a: 1 }] }) === false, '$nor');
assert(matchQuery(d, { $and: [] }) === true && matchQuery(d, { $or: [] }) === false && matchQuery(d, { $nor: [] }) === true, 'empty arrays');
assert(matchQuery(d, { a: 1, $or: [{ b: 1 }, { b: 2 }] }) === true, 'logical operators combine with field conditions');`,
    },
    {
      name: "object_equality_and_unsupported_operators",
      code: `const d = { loc: { x: 1, y: 2 } };
assert(matchQuery(d, { loc: { x: 1, y: 2 } }) === true && matchQuery(d, { loc: { x: 1 } }) === false, 'embedded documents compare as a whole');
let err = null;
try { matchQuery(d, { loc: { $near: 1 } }); } catch (e) { err = e; }
assert(err && err.message === 'Unsupported operator: $near', 'got ' + (err && err.message));
let err2 = null;
try { matchQuery(d, { $where: 'x' }); } catch (e) { err2 = e; }
assert(err2 && err2.message === 'Unsupported operator: $where', 'got ' + (err2 && err2.message));`,
    },
  ],
  solution: {
    code: `function matchQuery(doc, query) {
  const OPS = ['$eq', '$ne', '$gt', '$gte', '$lt', '$lte', '$in', '$nin', '$exists', '$regex', '$options'];
  const isObj = (v) => typeof v === 'object' && v !== null && !Array.isArray(v);
  const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  function candidates(node, parts) {
    if (parts.length === 0) {
      const out = [node];
      if (Array.isArray(node)) for (const x of node) out.push(x);
      return out;
    }
    const [head, ...rest] = parts;
    if (Array.isArray(node) && !/^[0-9]+$/.test(head)) {
      return node.flatMap((x) => candidates(x, parts));
    }
    if (node === null || typeof node !== 'object' || !(head in node)) return [];
    return candidates(node[head], rest);
  }

  const compare = (a, b, test) => typeof a === typeof b && (typeof a === 'number' || typeof a === 'string') && test(a, b);

  function positive(values, op, arg, options) {
    if (op === '$eq') {
      if (arg === null) return values.length === 0 || values.some((v) => v === null);
      return values.some((v) => same(v, arg));
    }
    if (op === '$gt') return values.some((v) => compare(v, arg, (a, b) => a > b));
    if (op === '$gte') return values.some((v) => compare(v, arg, (a, b) => a >= b));
    if (op === '$lt') return values.some((v) => compare(v, arg, (a, b) => a < b));
    if (op === '$lte') return values.some((v) => compare(v, arg, (a, b) => a <= b));
    if (op === '$in') return arg.some((x) => positive(values, '$eq', x, options));
    if (op === '$regex') {
      const re = new RegExp(arg, options || '');
      return values.some((v) => typeof v === 'string' && re.test(v));
    }
    return false;
  }

  function matchField(path, condition) {
    const values = candidates(doc, path.split('.'));
    if (isObj(condition) && Object.keys(condition).length > 0 && Object.keys(condition).every((k) => k[0] === '$')) {
      for (const op of Object.keys(condition)) {
        if (!OPS.includes(op)) throw new Error('Unsupported operator: ' + op);
      }
      for (const op of Object.keys(condition)) {
        const arg = condition[op];
        if (op === '$options') continue;
        let ok;
        if (op === '$exists') ok = arg ? values.length > 0 : values.length === 0;
        else if (op === '$ne') ok = !positive(values, '$eq', arg);
        else if (op === '$nin') ok = !positive(values, '$in', arg);
        else ok = positive(values, op, arg, condition.$options);
        if (!ok) return false;
      }
      return true;
    }
    return positive(values, '$eq', condition);
  }

  function matches(q) {
    for (const key of Object.keys(q)) {
      const cond = q[key];
      if (key[0] === '$') {
        if (key === '$and') { if (!cond.every(matches)) return false; }
        else if (key === '$or') { if (!cond.some(matches)) return false; }
        else if (key === '$nor') { if (cond.some(matches)) return false; }
        else throw new Error('Unsupported operator: ' + key);
      } else if (!matchField(key, cond)) {
        return false;
      }
    }
    return true;
  }

  return matches(query);
}

module.exports = matchQuery;`,
    explanation:
      "The design hinges on one idea: first turn a path into the list of candidate values the way MongoDB does (descending through arrays of sub-documents, and treating an array field as both itself and its elements), then decide matches over that list. Positive operators ask 'does any candidate satisfy this', which is why a scalar query matches an array containing it. The negative operators are defined as the negation of their positive forms over the whole list, so $ne: 'a' is false for ['a','b'], which surprises people but is exactly MongoDB's behaviour. Equality to null is special-cased so a missing field matches. Comparison operators check that both sides are the same primitive type, mirroring MongoDB's type bracketing. A condition is treated as an operator expression only if all of its keys start with $, so an embedded document like { x: 1, y: 2 } is compared as a value, and unknown operators fail loudly instead of silently matching nothing.",
  },
};
