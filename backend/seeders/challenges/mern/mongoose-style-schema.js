export default {
  slug: "mongoose-style-schema",
  trackId: "mern",
  layerId: "mern-6",
  type: "CODE",
  difficulty: "med",
  title: "A Mongoose-style schema validator",
  summary:
    "Apply defaults, cast types and validate fields, producing Mongoose-style error messages.",
  description:
    "A Mongoose schema does three jobs before a document is saved: fill in defaults, convert values to the declared type, and check validators such as required, min and enum. Implementing a small version shows what happens between new Model(data) and save().",
  task:
    "Write <code>defineSchema(definition)</code> returning <code>{ validate(doc) }</code>. <code>definition</code> maps fields to <code>{ type, required, default, enum, min, max, minlength, maxlength, trim, lowercase }</code> where <code>type</code> is <code>'String'</code>, <code>'Number'</code> or <code>'Boolean'</code>. <code>validate(doc)</code> returns <code>{ value, errors }</code>. For each field in definition order: take <code>doc[field]</code>; if undefined use <code>default</code> (call it if it is a function); if still undefined, add the <b>required</b> error when required and move on. Cast: String accepts strings and converts numbers/booleans with <code>String()</code>; Number accepts numbers and numeric strings; Boolean accepts booleans and the strings <code>'true'</code>/<code>'false'</code>. Anything else adds the <b>cast</b> error. For strings apply <code>trim</code> then <code>lowercase</code> before the validators. Validators run in the order enum, min, max, minlength, maxlength and stop at the first failure per field. Fields not in the definition are dropped from <code>value</code>.",
  constraints: [
    "Messages (note the backticks): <code>Path `f` is required.</code>, <code>Cast to Number failed for value \"abc\" at path \"f\"</code>, <code>`x` is not a valid enum value for path `f`.</code>, <code>Path `f` (5) is less than minimum allowed value (10).</code>, <code>Path `f` (50) is more than maximum allowed value (20).</code>, <code>Path `f` (`ab`) is shorter than the minimum allowed length (3).</code>, <code>Path `f` (`abcd`) is longer than the maximum allowed length (3).</code>",
    "In the cast message the value is shown with double quotes, as <code>String(raw)</code>.",
    "A field with an error is left out of <code>value</code>; valid fields are included with their cast values.",
    "Do not modify <code>doc</code>. An empty string counts as a present value, not as missing.",
  ],
  example: `const User = defineSchema({
  name: { type: 'String', required: true, trim: true, minlength: 2 },
  age: { type: 'Number', min: 0, default: 18 },
});
User.validate({ name: '  Ana ', extra: 1 });
// { value: { name: 'Ana', age: 18 }, errors: [] }`,
  tags: ["mongoose","schema","validation"],
  estimatedMins: 40,
  xp: 45,
  starterFiles: [
    {
      name: "defineSchema.js",
      lang: "js",
      code: `// defineSchema.js
function defineSchema(definition) {
  // your code here
}

module.exports = defineSchema;`,
    },
  ],
  testFile: {
    name: "defineSchema_test.js",
    lang: "test",
    code: `// defineSchema_test.js
const defineSchema = require('./defineSchema');

test('defaults_and_unknown_fields', () => {
  // see the hidden tests for the full checks
  expect(typeof defineSchema).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Process one field at a time in a loop over <code>Object.keys(definition)</code>. A <code>cast(type, raw)</code> helper that returns <code>{ ok: true, value }</code> or <code>{ ok: false }</code> keeps the loop readable.",
    },
    {
      order: 2,
      cost: 5,
      text: "Order inside the loop: raw value, default (call functions), required check, cast, trim/lowercase for strings, then the validators in the specified order. <code>continue</code> after each pushed error.",
    },
    {
      order: 3,
      cost: 10,
      text: "Numeric strings: accept them when <code>raw.trim() !== '' &amp;&amp; Number.isFinite(Number(raw))</code>. Build messages by string concatenation; the backtick is just a character inside a normal string.",
    },
  ],
  hiddenTests: [
    {
      name: "defaults_and_unknown_fields",
      code: `const s = defineSchema({ name: { type: 'String' }, role: { type: 'String', default: 'user' }, n: { type: 'Number', default: () => 7 } });
const r = s.validate({ name: 'Ana', hack: true });
assert(JSON.stringify(r.value) === JSON.stringify({ name: 'Ana', role: 'user', n: 7 }), 'got ' + JSON.stringify(r.value));
assert(r.errors.length === 0, 'no errors');`,
    },
    {
      name: "required_error_message",
      code: `const s = defineSchema({ name: { type: 'String', required: true }, other: { type: 'String' } });
const r = s.validate({});
assert(JSON.stringify(r.errors) === JSON.stringify(['Path \`name\` is required.']), 'got ' + JSON.stringify(r.errors));
assert(!('name' in r.value) && !('other' in r.value), 'missing fields are not in value');
assert(s.validate({ name: '' }).errors.length === 0, 'an empty string is present');`,
    },
    {
      name: "casting",
      code: `const s = defineSchema({ a: { type: 'Number' }, b: { type: 'String' }, c: { type: 'Boolean' }, d: { type: 'Boolean' } });
const r = s.validate({ a: '42', b: 7, c: 'true', d: 'false' });
assert(r.value.a === 42 && r.value.b === '7' && r.value.c === true && r.value.d === false, 'cast values, got ' + JSON.stringify(r.value));
assert(r.errors.length === 0, 'castable values are not errors');`,
    },
    {
      name: "cast_errors",
      code: `const s = defineSchema({ a: { type: 'Number' }, b: { type: 'Boolean' }, c: { type: 'String' } });
const r = s.validate({ a: 'abc', b: 'maybe', c: { x: 1 } });
assert(r.errors[0] === 'Cast to Number failed for value "abc" at path "a"', 'got ' + r.errors[0]);
assert(r.errors[1] === 'Cast to Boolean failed for value "maybe" at path "b"', 'got ' + r.errors[1]);
assert(r.errors[2].indexOf('Cast to String failed') === 0 && r.errors[2].slice(-8) === 'path "c"', 'got ' + r.errors[2]);
assert(Object.keys(r.value).length === 0, 'fields with errors are left out');`,
    },
    {
      name: "trim_and_lowercase_before_validators",
      code: `const s = defineSchema({ email: { type: 'String', trim: true, lowercase: true, minlength: 5 } });
const r = s.validate({ email: '  ANA@X.IO ' });
assert(r.value.email === 'ana@x.io' && r.errors.length === 0, 'got ' + JSON.stringify(r));
const short = s.validate({ email: ' A@B ' });
assert(short.errors[0] === 'Path \`email\` (\`a@b\`) is shorter than the minimum allowed length (5).', 'validators see the trimmed, lowercased value, got ' + short.errors[0]);`,
    },
    {
      name: "number_range_messages",
      code: `const s = defineSchema({ n: { type: 'Number', min: 10, max: 20 } });
assert(s.validate({ n: 5 }).errors[0] === 'Path \`n\` (5) is less than minimum allowed value (10).', 'min message');
assert(s.validate({ n: 50 }).errors[0] === 'Path \`n\` (50) is more than maximum allowed value (20).', 'max message');
assert(s.validate({ n: 10 }).errors.length === 0 && s.validate({ n: 20 }).errors.length === 0, 'limits are inclusive');`,
    },
    {
      name: "enum_and_length_messages",
      code: `const s = defineSchema({ role: { type: 'String', enum: ['a', 'b'] }, code: { type: 'String', maxlength: 3 } });
assert(s.validate({ role: 'z' }).errors[0] === '\`z\` is not a valid enum value for path \`role\`.', 'enum message');
assert(s.validate({ code: 'abcd' }).errors[0] === 'Path \`code\` (\`abcd\`) is longer than the maximum allowed length (3).', 'maxlength message');`,
    },
    {
      name: "first_failing_validator_wins_and_fields_keep_definition_order",
      code: `const s = defineSchema({ n: { type: 'Number', min: 10, max: 5 }, role: { type: 'String', required: true } });
const r = s.validate({ n: 1 });
assert(r.errors.length === 2 && r.errors[0].indexOf('less than minimum') !== -1 && r.errors[1] === 'Path \`role\` is required.', 'one error per field, in definition order, got ' + JSON.stringify(r.errors));`,
    },
    {
      name: "does_not_modify_the_input",
      code: `const s = defineSchema({ name: { type: 'String', trim: true } });
const doc = { name: '  a  ' };
s.validate(doc);
assert(doc.name === '  a  ', 'the input document must not change');`,
    },
  ],
  solution: {
    code: `function defineSchema(definition) {
  const BT = String.fromCharCode(96);
  const q = (s) => BT + s + BT;

  const cast = (type, raw) => {
    if (type === 'String') {
      if (typeof raw === 'string') return { ok: true, value: raw };
      if (typeof raw === 'number' || typeof raw === 'boolean') return { ok: true, value: String(raw) };
      return { ok: false };
    }
    if (type === 'Number') {
      if (typeof raw === 'number' && Number.isFinite(raw)) return { ok: true, value: raw };
      if (typeof raw === 'string' && raw.trim() !== '' && Number.isFinite(Number(raw))) return { ok: true, value: Number(raw) };
      return { ok: false };
    }
    if (type === 'Boolean') {
      if (typeof raw === 'boolean') return { ok: true, value: raw };
      if (raw === 'true') return { ok: true, value: true };
      if (raw === 'false') return { ok: true, value: false };
      return { ok: false };
    }
    return { ok: true, value: raw };
  };

  function validate(doc) {
    const input = doc || {};
    const value = {};
    const errors = [];

    for (const field of Object.keys(definition)) {
      const rules = definition[field];
      let raw = input[field];
      if (raw === undefined && rules.default !== undefined) {
        raw = typeof rules.default === 'function' ? rules.default() : rules.default;
      }
      if (raw === undefined) {
        if (rules.required) errors.push('Path ' + q(field) + ' is required.');
        continue;
      }

      const c = cast(rules.type, raw);
      if (!c.ok) {
        errors.push('Cast to ' + rules.type + ' failed for value "' + String(raw) + '" at path "' + field + '"');
        continue;
      }
      let v = c.value;
      if (rules.type === 'String') {
        if (rules.trim) v = v.trim();
        if (rules.lowercase) v = v.toLowerCase();
      }

      let error = null;
      if (rules.enum && !rules.enum.includes(v)) {
        error = q(v) + ' is not a valid enum value for path ' + q(field) + '.';
      } else if (rules.min !== undefined && v < rules.min) {
        error = 'Path ' + q(field) + ' (' + v + ') is less than minimum allowed value (' + rules.min + ').';
      } else if (rules.max !== undefined && v > rules.max) {
        error = 'Path ' + q(field) + ' (' + v + ') is more than maximum allowed value (' + rules.max + ').';
      } else if (rules.minlength !== undefined && v.length < rules.minlength) {
        error = 'Path ' + q(field) + ' (' + q(v) + ') is shorter than the minimum allowed length (' + rules.minlength + ').';
      } else if (rules.maxlength !== undefined && v.length > rules.maxlength) {
        error = 'Path ' + q(field) + ' (' + q(v) + ') is longer than the maximum allowed length (' + rules.maxlength + ').';
      }

      if (error) errors.push(error);
      else value[field] = v;
    }
    return { value, errors };
  }

  return { validate };
}

module.exports = defineSchema;`,
    explanation:
      "The loop mirrors Mongoose's own pipeline for one path: raw value, then default, then the required check, then cast, then setters (trim, lowercase), then validators. Doing the cast before the validators matters because min and maxlength compare the converted value, and trimming before minlength means ' a ' counts as one character. Each field stops at its first problem, which is why continue and the else-if chain appear everywhere. The backtick in the messages is produced with String.fromCharCode(96) so the message-building code stays readable. Fields that fail are left out of the returned value and fields that are not in the definition are never copied, which is Mongoose's strict mode: unknown input is dropped rather than saved.",
  },
};
