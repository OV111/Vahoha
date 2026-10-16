export default {
  slug: "parse-pagination",
  trackId: "mern",
  layerId: "mern-5",
  type: "CODE",
  difficulty: "med",
  title: "Parse and clamp pagination query parameters",
  summary:
    "Turn ?page= and ?limit= into safe skip/limit values, with optional page metadata.",
  description:
    "List endpoints take page and limit from the query string, which arrives as untrusted text. A missing, negative or enormous value must never reach the database. Clients also want to know whether a next page exists.",
  task:
    "Write <code>parsePagination(query, options)</code> returning <code>{ page, limit, skip }</code>. <code>query.page</code> and <code>query.limit</code> may be numbers or strings. Accept only positive whole numbers (<code>'3'</code>, <code>3</code>); anything else (missing, <code>'abc'</code>, <code>'2.5'</code>, <code>0</code>, negative) falls back to the default: page 1 and <code>options.defaultLimit</code> (default 20). A limit above <code>options.maxLimit</code> (default 100) is lowered to <code>maxLimit</code>. <code>skip = (page - 1) * limit</code>. If <code>options.total</code> is a non-negative integer, also return <code>totalPages = ceil(total / limit)</code>, <code>hasNext = page &lt; totalPages</code> and <code>hasPrev = page &gt; 1</code>.",
  constraints: [
    "Numeric strings with surrounding spaces or signs other than digits (like <code>' 2'</code> or <code>'+2'</code>) are invalid.",
    "A page past the last page is allowed (the caller gets an empty list); do not clamp it.",
    "Without <code>options.total</code>, return exactly the three keys <code>page</code>, <code>limit</code>, <code>skip</code>.",
    "<code>defaultLimit</code> itself must also be capped by <code>maxLimit</code>.",
  ],
  example: `parsePagination({ page: '3', limit: '500' }, { maxLimit: 50 });
// { page: 3, limit: 50, skip: 100 }

parsePagination({ page: '2', limit: '10' }, { total: 25 });
// { page: 2, limit: 10, skip: 10, totalPages: 3, hasNext: true, hasPrev: true }`,
  tags: ["express","pagination","rest","input-validation"],
  estimatedMins: 25,
  xp: 45,
  starterFiles: [
    {
      name: "parsePagination.js",
      lang: "js",
      code: `// parsePagination.js
function parsePagination(query, options) {
  // your code here
}

module.exports = parsePagination;`,
    },
  ],
  testFile: {
    name: "parsePagination_test.js",
    lang: "test",
    code: `// parsePagination_test.js
const parsePagination = require('./parsePagination');

test('defaults_when_missing', () => {
  // see the hidden tests for the full checks
  expect(typeof parsePagination).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Write a helper <code>positiveInt(value)</code>: if it is a number, accept it when <code>Number.isInteger(value) &amp;&amp; value &gt; 0</code>; if it is a string, accept it only when it matches <code>/^[1-9][0-9]*$/</code>; otherwise return <code>null</code>.",
    },
    {
      order: 2,
      cost: 5,
      text: "<code>page = positiveInt(query.page) ?? 1</code> and the same for limit with the default. Then <code>limit = Math.min(limit, maxLimit)</code>.",
    },
    {
      order: 3,
      cost: 10,
      text: "Add the metadata only inside <code>if (Number.isInteger(options.total) &amp;&amp; options.total &gt;= 0)</code>, so the result keeps exactly three keys otherwise.",
    },
  ],
  hiddenTests: [
    {
      name: "defaults_when_missing",
      code: `const r = parsePagination({});
assert(r.page === 1 && r.limit === 20 && r.skip === 0, 'defaults should be page 1, limit 20, skip 0, got ' + JSON.stringify(r));
assert(JSON.stringify(Object.keys(r)) === JSON.stringify(['page', 'limit', 'skip']), 'without total only three keys, got ' + Object.keys(r));`,
    },
    {
      name: "parses_numbers_and_numeric_strings",
      code: `const a = parsePagination({ page: '3', limit: '10' });
assert(a.page === 3 && a.limit === 10 && a.skip === 20, 'strings, got ' + JSON.stringify(a));
const b = parsePagination({ page: 2, limit: 5 });
assert(b.page === 2 && b.limit === 5 && b.skip === 5, 'numbers, got ' + JSON.stringify(b));`,
    },
    {
      name: "invalid_values_fall_back_to_defaults",
      code: `for (const bad of ['abc', '2.5', '0', '-1', ' 2', '+2', '', 0, -3, 2.5, NaN, null, [], {}]) {
  const r = parsePagination({ page: bad, limit: bad });
  assert(r.page === 1 && r.limit === 20, 'value ' + JSON.stringify(bad) + ' must fall back to defaults, got ' + JSON.stringify(r));
}`,
    },
    {
      name: "limit_is_clamped_to_max",
      code: `assert(parsePagination({ limit: '500' }).limit === 100, 'default max is 100');
assert(parsePagination({ limit: '500' }, { maxLimit: 50 }).limit === 50, 'custom max');
assert(parsePagination({}, { defaultLimit: 200, maxLimit: 50 }).limit === 50, 'the default limit is also capped by maxLimit');
assert(parsePagination({ limit: '50' }, { maxLimit: 50 }).limit === 50, 'a limit equal to max is allowed');`,
    },
    {
      name: "page_metadata_when_total_is_given",
      code: `const r = parsePagination({ page: '2', limit: '10' }, { total: 25 });
assert(r.totalPages === 3 && r.hasNext === true && r.hasPrev === true, 'middle page, got ' + JSON.stringify(r));
const last = parsePagination({ page: '3', limit: '10' }, { total: 25 });
assert(last.hasNext === false && last.hasPrev === true, 'last page, got ' + JSON.stringify(last));
const first = parsePagination({}, { total: 5 });
assert(first.totalPages === 1 && first.hasNext === false && first.hasPrev === false, 'single page, got ' + JSON.stringify(first));
const empty = parsePagination({}, { total: 0 });
assert(empty.totalPages === 0 && empty.hasNext === false, 'no items means zero pages, got ' + JSON.stringify(empty));`,
    },
    {
      name: "page_past_the_end_is_not_clamped",
      code: `const r = parsePagination({ page: '9', limit: '10' }, { total: 25 });
assert(r.page === 9 && r.skip === 80 && r.hasNext === false && r.hasPrev === true, 'page 9 stays page 9, got ' + JSON.stringify(r));`,
    },
    {
      name: "invalid_total_is_ignored",
      code: `const r = parsePagination({}, { total: -1 });
assert(!('totalPages' in r), 'a negative total adds no metadata');
const s = parsePagination({}, { total: 'many' });
assert(!('totalPages' in s), 'a non-number total adds no metadata');`,
    },
  ],
  solution: {
    code: `function parsePagination(query, options) {
  const q = query || {};
  const opts = options || {};
  const maxLimit = opts.maxLimit === undefined ? 100 : opts.maxLimit;
  const defaultLimit = opts.defaultLimit === undefined ? 20 : opts.defaultLimit;

  const positiveInt = (v) => {
    if (typeof v === 'number') return Number.isInteger(v) && v > 0 ? v : null;
    if (typeof v === 'string') return /^[1-9][0-9]*$/.test(v) ? Number(v) : null;
    return null;
  };

  const page = positiveInt(q.page) === null ? 1 : positiveInt(q.page);
  const asked = positiveInt(q.limit);
  const limit = Math.min(asked === null ? defaultLimit : asked, maxLimit);
  const result = { page, limit, skip: (page - 1) * limit };

  if (Number.isInteger(opts.total) && opts.total >= 0) {
    result.totalPages = Math.ceil(opts.total / limit);
    result.hasNext = page < result.totalPages;
    result.hasPrev = page > 1;
  }
  return result;
}

module.exports = parsePagination;`,
    explanation:
      "Query strings are untrusted text, so the parser accepts only what is clearly a positive whole number: numbers must be integers above zero, and strings must match a strict digits-only pattern, which rules out spaces, signs, decimals and empty strings that Number() would happily coerce. Anything else silently becomes the default instead of an error, which is the friendly behaviour for list endpoints. The limit is clamped last, after the default is chosen, so even a misconfigured defaultLimit cannot exceed maxLimit. skip is derived from the final page and limit, never from the raw input. Metadata is added only when a valid total is supplied, which keeps the plain result at three keys.",
  },
};
