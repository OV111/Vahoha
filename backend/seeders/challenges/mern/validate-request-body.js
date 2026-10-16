export default {
  slug: "validate-request-body",
  trackId: "mern",
  layerId: "mern-5",
  type: "CODE",
  difficulty: "easy",
  title: "Validate a request body against a schema",
  summary:
    "Check required fields, types and ranges, and report every problem at once.",
  description:
    "Every Express API needs to reject bad input before touching the database. A small schema describing each field lets one function validate any route's body and return clear messages the client can show.",
  task:
    "Write <code>validateBody(schema, body)</code> returning <code>{ valid, errors }</code>. <code>schema</code> maps a field name to rules: <code>type</code> (<code>'string'</code>, <code>'number'</code>, <code>'boolean'</code>, <code>'array'</code> or <code>'object'</code>), <code>required</code>, <code>min</code>/<code>max</code> (numbers), <code>minLength</code>/<code>maxLength</code> (strings) and <code>oneOf</code> (list of allowed values). Check fields in schema order and report at most one error per field, using the first rule that fails. A field that is <code>undefined</code> or <code>null</code> counts as missing: it is an error only if <code>required</code>, and otherwise skipped. Fields not in the schema are ignored.",
  constraints: [
    "Messages are exactly: <code>NAME is required</code>, <code>NAME must be a TYPE</code>, <code>NAME must be at least N</code>, <code>NAME must be at most N</code>, <code>NAME must be at least N characters</code>, <code>NAME must be at most N characters</code>, <code>NAME must be one of: a, b</code>.",
    "Rule order for one field: required, type, min, max, minLength, maxLength, oneOf.",
    "A number must be a finite <code>typeof 'number'</code>; an object is a non-null, non-array object.",
    "<code>valid</code> is true exactly when <code>errors</code> is empty. Do not modify the inputs.",
  ],
  example: `validateBody(
  { name: { type: 'string', required: true, minLength: 2 }, age: { type: 'number', min: 0 } },
  { name: 'A', age: -1 },
);
// { valid: false, errors: ['name must be at least 2 characters', 'age must be at least 0'] }`,
  tags: ["express","validation","rest"],
  estimatedMins: 20,
  xp: 30,
  starterFiles: [
    {
      name: "validateBody.js",
      lang: "js",
      code: `// validateBody.js
function validateBody(schema, body) {
  // your code here
}

module.exports = validateBody;`,
    },
  ],
  testFile: {
    name: "validateBody_test.js",
    lang: "test",
    code: `// validateBody_test.js
const validateBody = require('./validateBody');

test('valid_body_has_no_errors', () => {
  // see the hidden tests for the full checks
  expect(typeof validateBody).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Loop over <code>Object.keys(schema)</code> so the errors come out in schema order. For each field, read the value and the rules, and use <code>continue</code> as soon as one error is pushed.",
    },
    {
      order: 2,
      cost: 5,
      text: "Treat <code>value === undefined || value === null</code> first: push the required error if needed, then skip every other check.",
    },
    {
      order: 3,
      cost: 10,
      text: "Write a small <code>typeOk(type, value)</code> helper. Remember that arrays are objects in JavaScript, and that <code>typeof NaN</code> is <code>'number'</code>.",
    },
  ],
  hiddenTests: [
    {
      name: "valid_body_has_no_errors",
      code: `const r = validateBody({ name: { type: 'string', required: true }, age: { type: 'number' } }, { name: 'Ana', age: 30, extra: 1 });
assert(r.valid === true && r.errors.length === 0, 'a valid body must pass, got ' + JSON.stringify(r));`,
    },
    {
      name: "required_and_optional_fields",
      code: `const schema = { email: { type: 'string', required: true }, nick: { type: 'string' } };
const r = validateBody(schema, { nick: null });
assert(JSON.stringify(r.errors) === JSON.stringify(['email is required']), 'only the required field is an error, got ' + JSON.stringify(r.errors));
assert(r.valid === false, 'valid must be false');
assert(validateBody(schema, { email: 'a@b.c' }).valid === true, 'an optional field may be missing');`,
    },
    {
      name: "type_checks",
      code: `const schema = { a: { type: 'number' }, b: { type: 'string' }, c: { type: 'array' }, d: { type: 'object' }, e: { type: 'boolean' } };
const r = validateBody(schema, { a: '5', b: 5, c: {}, d: [], e: 'yes' });
assert(JSON.stringify(r.errors) === JSON.stringify(['a must be a number', 'b must be a string', 'c must be a array', 'd must be a object', 'e must be a boolean']), 'wrong type messages: ' + JSON.stringify(r.errors));
assert(validateBody({ n: { type: 'number' } }, { n: NaN }).valid === false, 'NaN is not a valid number');
assert(validateBody({ o: { type: 'object' } }, { o: null }).valid === true, 'null counts as missing, so an optional object may be null');`,
    },
    {
      name: "numeric_and_length_limits",
      code: `const schema = { age: { type: 'number', min: 18, max: 65 }, name: { type: 'string', minLength: 2, maxLength: 4 } };
assert(JSON.stringify(validateBody(schema, { age: 17, name: 'ab' }).errors) === JSON.stringify(['age must be at least 18']), 'min');
assert(JSON.stringify(validateBody(schema, { age: 66, name: 'ab' }).errors) === JSON.stringify(['age must be at most 65']), 'max');
assert(JSON.stringify(validateBody(schema, { age: 20, name: 'a' }).errors) === JSON.stringify(['name must be at least 2 characters']), 'minLength');
assert(JSON.stringify(validateBody(schema, { age: 20, name: 'abcde' }).errors) === JSON.stringify(['name must be at most 4 characters']), 'maxLength');
assert(validateBody(schema, { age: 18, name: 'abcd' }).valid === true, 'boundaries are inclusive');`,
    },
    {
      name: "one_of",
      code: `const schema = { role: { type: 'string', oneOf: ['admin', 'user'] } };
assert(JSON.stringify(validateBody(schema, { role: 'root' }).errors) === JSON.stringify(['role must be one of: admin, user']), 'oneOf message');
assert(validateBody(schema, { role: 'user' }).valid === true, 'allowed value passes');`,
    },
    {
      name: "one_error_per_field_and_schema_order",
      code: `const schema = { z: { type: 'number', required: true, min: 5 }, a: { type: 'string', required: true } };
const r = validateBody(schema, { z: 'x' });
assert(JSON.stringify(r.errors) === JSON.stringify(['z must be a number', 'a is required']), 'one error per field, in schema order, got ' + JSON.stringify(r.errors));`,
    },
  ],
  solution: {
    code: `function validateBody(schema, body) {
  const errors = [];
  const data = body || {};
  const typeOk = (type, v) => {
    if (type === 'number') return typeof v === 'number' && Number.isFinite(v);
    if (type === 'array') return Array.isArray(v);
    if (type === 'object') return typeof v === 'object' && v !== null && !Array.isArray(v);
    return typeof v === type;
  };
  for (const name of Object.keys(schema)) {
    const rules = schema[name];
    const v = data[name];
    if (v === undefined || v === null) {
      if (rules.required) errors.push(name + ' is required');
      continue;
    }
    if (rules.type && !typeOk(rules.type, v)) {
      errors.push(name + ' must be a ' + rules.type);
      continue;
    }
    if (rules.min !== undefined && v < rules.min) { errors.push(name + ' must be at least ' + rules.min); continue; }
    if (rules.max !== undefined && v > rules.max) { errors.push(name + ' must be at most ' + rules.max); continue; }
    if (rules.minLength !== undefined && v.length < rules.minLength) { errors.push(name + ' must be at least ' + rules.minLength + ' characters'); continue; }
    if (rules.maxLength !== undefined && v.length > rules.maxLength) { errors.push(name + ' must be at most ' + rules.maxLength + ' characters'); continue; }
    if (rules.oneOf && !rules.oneOf.includes(v)) { errors.push(name + ' must be one of: ' + rules.oneOf.join(', ')); continue; }
  }
  return { valid: errors.length === 0, errors };
}

module.exports = validateBody;`,
    explanation:
      "The schema drives everything: looping over its keys gives schema-ordered messages, and a single continue after each push enforces 'one error per field, first failing rule'. Missing values are handled before any other rule so an optional field can be absent without tripping its type or range checks, while a required one reports exactly one message. The type helper exists because typeof alone is wrong in three places: NaN is a 'number', null and arrays are 'object'. Reporting all failing fields together, rather than throwing on the first, is what makes the response useful to a form that wants to highlight every problem at once.",
  },
};
