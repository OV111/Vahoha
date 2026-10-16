export default {
  slug: "build-mongo-filter",
  trackId: "mern",
  layerId: "mern-6",
  type: "CODE",
  difficulty: "easy",
  title: "Build a MongoDB filter from query-string parameters",
  summary:
    "Turn ?price__gte=10&category__in=a,b into a safe MongoDB query object.",
  description:
    "List endpoints often let the client filter by several fields. Building the MongoDB filter by hand per route is repetitive and dangerous: if you copy req.query straight into find(), a client can send operators like $where. A small translator with an allow-list keeps filtering both flexible and safe.",
  task:
    "Write <code>buildFilter(query, allowed)</code>. <code>allowed</code> is an array of field names that may be filtered. For a field <code>f</code> in <code>allowed</code>: <code>query.f</code> becomes equality (<code>{ f: value }</code>); <code>query.f__gt</code>, <code>__gte</code>, <code>__lt</code>, <code>__lte</code> become <code>{ f: { $gt: value } }</code> and so on (several operators for one field merge into one object); <code>query.f__in</code> is a comma-separated list that becomes <code>{ f: { $in: [..] } }</code>. Values are converted: <code>'true'</code>/<code>'false'</code> to booleans, strings that are finite numbers to numbers, anything else stays a string. Ignore every key whose field is not in <code>allowed</code>, and every key starting with <code>$</code>. Return <code>{}</code> if nothing applies.",
  constraints: [
    "Only operator suffixes <code>gt</code>, <code>gte</code>, <code>lt</code>, <code>lte</code> and <code>in</code> are recognised; any other suffix is ignored.",
    "Each item in an <code>__in</code> list is converted the same way as single values, and empty items are dropped.",
    "Empty string values are ignored.",
    "If a field has both an equality value and operators, use the operators and drop the equality.",
  ],
  example: `buildFilter({ category: 'books', price__gte: '10', price__lte: '20', sold: 'true' }, ['category', 'price', 'sold']);
// { category: 'books', price: { $gte: 10, $lte: 20 }, sold: true }`,
  tags: ["mongodb","querying","security","rest"],
  estimatedMins: 25,
  xp: 30,
  starterFiles: [
    {
      name: "buildFilter.js",
      lang: "js",
      code: `// buildFilter.js
function buildFilter(query, allowed) {
  // your code here
}

module.exports = buildFilter;`,
    },
  ],
  testFile: {
    name: "buildFilter_test.js",
    lang: "test",
    code: `// buildFilter_test.js
const buildFilter = require('./buildFilter');

test('equality_with_type_conversion', () => {
  // see the hidden tests for the full checks
  expect(typeof buildFilter).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Write <code>convert(v)</code> first: <code>'true'</code>/<code>'false'</code> to booleans, then <code>v.trim() !== '' &amp;&amp; Number.isFinite(Number(v))</code> to a number, else the string.",
    },
    {
      order: 2,
      cost: 5,
      text: "For each key, split on <code>'__'</code>. The first part is the field; reject it unless it is in <code>allowed</code> and does not start with <code>$</code>. The second part (if any) is the operator suffix.",
    },
    {
      order: 3,
      cost: 10,
      text: "Collect operators into <code>ops[field]</code> and equality into <code>eq[field]</code> separately. At the end, for each field prefer <code>ops</code> over <code>eq</code>.",
    },
  ],
  hiddenTests: [
    {
      name: "equality_with_type_conversion",
      code: `const f = buildFilter({ name: 'pen', qty: '5', active: 'false', ratio: '0.5' }, ['name', 'qty', 'active', 'ratio']);
assert(JSON.stringify(f) === JSON.stringify({ name: 'pen', qty: 5, active: false, ratio: 0.5 }), 'got ' + JSON.stringify(f));`,
    },
    {
      name: "range_operators_merge_per_field",
      code: `const f = buildFilter({ price__gte: '10', price__lte: '20', stock__gt: '0' }, ['price', 'stock']);
assert(JSON.stringify(f) === JSON.stringify({ price: { $gte: 10, $lte: 20 }, stock: { $gt: 0 } }), 'got ' + JSON.stringify(f));`,
    },
    {
      name: "in_operator_splits_and_converts",
      code: `const f = buildFilter({ tag__in: 'a,b,,c', id__in: '1,2' }, ['tag', 'id']);
assert(JSON.stringify(f) === JSON.stringify({ tag: { $in: ['a', 'b', 'c'] }, id: { $in: [1, 2] } }), 'got ' + JSON.stringify(f));`,
    },
    {
      name: "fields_outside_the_allow_list_are_ignored",
      code: `const f = buildFilter({ name: 'x', secret: 'y', secret__gte: '1' }, ['name']);
assert(JSON.stringify(f) === JSON.stringify({ name: 'x' }), 'only allowed fields, got ' + JSON.stringify(f));`,
    },
    {
      name: "operator_keys_cannot_be_injected",
      code: `const f = buildFilter({ $where: 'sleep(1000)', '$or': 'x', name: 'ok' }, ['$where', '$or', 'name']);
assert(JSON.stringify(f) === JSON.stringify({ name: 'ok' }), 'keys starting with $ must never be used, even if allowed; got ' + JSON.stringify(f));`,
    },
    {
      name: "unknown_suffixes_and_empty_values_are_ignored",
      code: `const f = buildFilter({ price__regex: '.*', price__ne: '3', name: '', qty: '4' }, ['price', 'name', 'qty']);
assert(JSON.stringify(f) === JSON.stringify({ qty: 4 }), 'got ' + JSON.stringify(f));`,
    },
    {
      name: "operators_win_over_equality",
      code: `const f = buildFilter({ price: '5', price__gte: '1' }, ['price']);
assert(JSON.stringify(f) === JSON.stringify({ price: { $gte: 1 } }), 'got ' + JSON.stringify(f));`,
    },
    {
      name: "nothing_applies_gives_an_empty_object",
      code: `assert(JSON.stringify(buildFilter({}, ['a'])) === '{}', 'empty query');
assert(JSON.stringify(buildFilter({ a: 'x' }, [])) === '{}', 'empty allow-list');`,
    },
  ],
  solution: {
    code: `function buildFilter(query, allowed) {
  const ok = new Set(allowed);
  const OPS = { gt: '$gt', gte: '$gte', lt: '$lt', lte: '$lte', in: '$in' };
  const convert = (v) => {
    if (v === 'true') return true;
    if (v === 'false') return false;
    if (typeof v === 'string' && v.trim() !== '' && Number.isFinite(Number(v))) return Number(v);
    return v;
  };
  const eq = {};
  const ops = {};

  for (const key of Object.keys(query || {})) {
    const raw = query[key];
    if (typeof raw !== 'string' || raw === '') continue;
    const [field, suffix, ...rest] = key.split('__');
    if (rest.length > 0 || field.startsWith('$') || !ok.has(field)) continue;

    if (suffix === undefined) {
      eq[field] = convert(raw);
    } else if (OPS[suffix]) {
      ops[field] = ops[field] || {};
      ops[field][OPS[suffix]] =
        suffix === 'in' ? raw.split(',').filter((s) => s !== '').map(convert) : convert(raw);
    }
  }

  const filter = {};
  for (const field of Object.keys(eq)) if (!ops[field]) filter[field] = eq[field];
  for (const field of Object.keys(ops)) filter[field] = ops[field];
  return filter;
}

module.exports = buildFilter;`,
    explanation:
      "The allow-list is the security feature: a field is used only if you named it, and any key starting with $ is rejected outright even if it were allowed, which stops clients from smuggling operators such as $where into the query. Each key is split once on the double underscore into field and operator suffix; unknown suffixes are simply ignored rather than guessed. Operators for the same field accumulate in one object so price__gte and price__lte become a single range, and at the end operators override a plain equality for that field, because both together would be ambiguous. The convert function is deliberately conservative about numbers (empty or whitespace strings stay strings) so that a blank query value cannot turn into 0.",
  },
};
