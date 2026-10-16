export default {
  slug: "load-env-config",
  trackId: "mern",
  layerId: "mern-10",
  type: "CODE",
  difficulty: "easy",
  title: "Load and validate configuration from environment variables",
  summary:
    "Fail fast at startup with one clear message listing every missing or invalid setting.",
  description:
    "In production, configuration arrives as environment variables, and every one of them is a string. Reading process.env.PORT directly scatters type conversions through the code, and a missing DATABASE_URL shows up as a confusing crash minutes later. A config loader validates everything once, at startup, and reports all problems together.",
  task:
    "Write <code>loadConfig(env, schema)</code>. <code>schema</code> maps a variable name to <code>{ type, required, default, oneOf }</code> where <code>type</code> is <code>'string'</code> (default), <code>'number'</code> or <code>'boolean'</code>. A variable is <b>missing</b> if it is <code>undefined</code> or an empty string. Missing: use <code>default</code> if there is one (as is, no conversion), else report <code>NAME is required</code> if <code>required</code>, else leave it out of the result. Present: convert it. Numbers must satisfy <code>Number(value)</code> being finite, otherwise <code>NAME must be a number</code>. Booleans accept <code>'true'</code>/<code>'1'</code> and <code>'false'</code>/<code>'0'</code> (case-insensitive), otherwise <code>NAME must be true or false</code>. After conversion, if <code>oneOf</code> is given and the value is not in it, report <code>NAME must be one of: a, b</code>. Return the config object (keys in schema order). If there were any problems, throw <code>Error('Invalid environment: ' + problems.join('; '))</code>, listing problems in schema order.",
  constraints: [
    "Never modify <code>env</code>; extra variables in <code>env</code> are ignored.",
    "A default is used only for missing values; an invalid present value is an error even if a default exists.",
    "<code>oneOf</code> is compared after type conversion, with strict equality.",
    "Report at most one problem per variable.",
  ],
  example: `loadConfig({ PORT: '8080', DEBUG: 'true', NODE_ENV: 'production' }, {
  PORT: { type: 'number', default: 3000 },
  DEBUG: { type: 'boolean', default: false },
  NODE_ENV: { oneOf: ['development', 'production'], default: 'development' },
});
// { PORT: 8080, DEBUG: true, NODE_ENV: 'production' }`,
  tags: ["configuration","environment-variables","twelve-factor","validation"],
  estimatedMins: 25,
  xp: 30,
  starterFiles: [
    {
      name: "loadConfig.js",
      lang: "js",
      code: `// loadConfig.js
function loadConfig(env, schema) {
  // your code here
}

module.exports = loadConfig;`,
    },
  ],
  testFile: {
    name: "loadConfig_test.js",
    lang: "test",
    code: `// loadConfig_test.js
const loadConfig = require('./loadConfig');

test('converts_types_and_applies_defaults', () => {
  // see the hidden tests for the full checks
  expect(typeof loadConfig).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Loop over <code>Object.keys(schema)</code> and keep two collections: the result object and a <code>problems</code> array. After the loop, throw if <code>problems</code> is not empty.",
    },
    {
      order: 2,
      cost: 5,
      text: "Treat <code>raw === undefined || raw === ''</code> as missing first. Then convert by type with a small <code>switch</code>, push the problem and <code>continue</code> on failure.",
    },
    {
      order: 3,
      cost: 10,
      text: "Do the <code>oneOf</code> check on the converted value, so <code>'2'</code> matches <code>2</code> for a number variable.",
    },
  ],
  hiddenTests: [
    {
      name: "converts_types_and_applies_defaults",
      code: `const cfg = loadConfig({ PORT: '8080', DEBUG: 'true', NAME: 'api' }, {
  PORT: { type: 'number', default: 3000 },
  DEBUG: { type: 'boolean', default: false },
  NAME: { type: 'string' },
  REGION: { default: 'eu' },
});
assert(JSON.stringify(cfg) === JSON.stringify({ PORT: 8080, DEBUG: true, NAME: 'api', REGION: 'eu' }), 'got ' + JSON.stringify(cfg));`,
    },
    {
      name: "missing_optional_values_are_left_out",
      code: `const cfg = loadConfig({}, { A: { type: 'string' }, B: { type: 'number', default: 1 } });
assert(JSON.stringify(cfg) === JSON.stringify({ B: 1 }), 'got ' + JSON.stringify(cfg));
const empty = loadConfig({ A: '' }, { A: { default: 'fallback' } });
assert(empty.A === 'fallback', 'an empty string counts as missing, got ' + JSON.stringify(empty));`,
    },
    {
      name: "defaults_are_not_converted",
      code: `const cfg = loadConfig({}, { PORT: { type: 'number', default: 3000 }, FLAG: { type: 'boolean', default: false } });
assert(cfg.PORT === 3000 && cfg.FLAG === false, 'defaults are used as they are, got ' + JSON.stringify(cfg));`,
    },
    {
      name: "boolean_spellings",
      code: `const read = (v) => loadConfig({ F: v }, { F: { type: 'boolean' } }).F;
assert(read('true') === true && read('TRUE') === true && read('1') === true, 'truthy spellings');
assert(read('false') === false && read('False') === false && read('0') === false, 'falsy spellings');
let err = null;
try { read('yes'); } catch (e) { err = e; }
assert(err && err.message === 'Invalid environment: F must be true or false', 'got ' + (err && err.message));`,
    },
    {
      name: "number_validation",
      code: `const read = (v) => loadConfig({ N: v }, { N: { type: 'number' } }).N;
assert(read('42') === 42 && read('-1.5') === -1.5 && read('0') === 0, 'numbers are converted');
for (const bad of ['abc', 'Infinity', 'NaN', '12px']) {
  let err = null;
  try { read(bad); } catch (e) { err = e; }
  assert(err && err.message === 'Invalid environment: N must be a number', bad + ' must be rejected, got ' + (err && err.message));
}`,
    },
    {
      name: "one_of_after_conversion",
      code: `const schema = { LEVEL: { type: 'number', oneOf: [1, 2, 3] }, ENV: { oneOf: ['dev', 'prod'] } };
assert(loadConfig({ LEVEL: '2', ENV: 'dev' }, schema).LEVEL === 2, 'converted value is compared');
let err = null;
try { loadConfig({ LEVEL: '9', ENV: 'qa' }, schema); } catch (e) { err = e; }
assert(err && err.message === 'Invalid environment: LEVEL must be one of: 1, 2, 3; ENV must be one of: dev, prod', 'got ' + (err && err.message));`,
    },
    {
      name: "all_problems_are_reported_together_in_schema_order",
      code: `let err = null;
try {
  loadConfig({ PORT: 'x' }, { DATABASE_URL: { required: true }, PORT: { type: 'number' }, SECRET: { required: true } });
} catch (e) { err = e; }
assert(err && err.message === 'Invalid environment: DATABASE_URL is required; PORT must be a number; SECRET is required', 'got ' + (err && err.message));`,
    },
    {
      name: "invalid_present_values_ignore_defaults_and_env_is_untouched",
      code: `let err = null;
try { loadConfig({ PORT: 'abc' }, { PORT: { type: 'number', default: 3000 } }); } catch (e) { err = e; }
assert(err && err.message === 'Invalid environment: PORT must be a number', 'a default does not rescue an invalid value');
const env = { A: '1', EXTRA: 'x' };
loadConfig(env, { A: { type: 'number' } });
assert(JSON.stringify(env) === JSON.stringify({ A: '1', EXTRA: 'x' }), 'env must not be modified');`,
    },
  ],
  solution: {
    code: `function loadConfig(env, schema) {
  const result = {};
  const problems = [];

  for (const name of Object.keys(schema)) {
    const rules = schema[name];
    const raw = env[name];

    if (raw === undefined || raw === '') {
      if (rules.default !== undefined) result[name] = rules.default;
      else if (rules.required) problems.push(name + ' is required');
      continue;
    }

    let value = raw;
    if (rules.type === 'number') {
      value = Number(raw);
      if (!Number.isFinite(value)) {
        problems.push(name + ' must be a number');
        continue;
      }
    } else if (rules.type === 'boolean') {
      const lower = String(raw).toLowerCase();
      if (lower === 'true' || lower === '1') value = true;
      else if (lower === 'false' || lower === '0') value = false;
      else {
        problems.push(name + ' must be true or false');
        continue;
      }
    }

    if (rules.oneOf && !rules.oneOf.includes(value)) {
      problems.push(name + ' must be one of: ' + rules.oneOf.join(', '));
      continue;
    }
    result[name] = value;
  }

  if (problems.length > 0) throw new Error('Invalid environment: ' + problems.join('; '));
  return result;
}

module.exports = loadConfig;`,
    explanation:
      "The loader is the single place where strings from the environment become typed values, so the rest of the app never calls Number() on process.env. Collecting problems in an array and throwing once, instead of throwing at the first one, is the operational feature: a deployment with three missing variables tells you all three in one failed boot. The distinction between missing and invalid matters: a missing value may take a default, but an invalid value is a mistake that a default must not hide, which is why the default branch only runs for undefined or empty strings. Conversion happens before the oneOf check so the allowed list can hold real numbers and booleans, and Number.isFinite rejects the cases Number() would accept silently, such as 'Infinity'.",
  },
};
