export default {
  slug: "validate-jwt-claims",
  trackId: "mern",
  layerId: "mern-7",
  type: "CODE",
  difficulty: "med",
  title: "Validate JWT claims",
  summary:
    "Decide whether a decoded token's issuer, audience and time claims are acceptable.",
  description:
    "A valid signature only proves that the token was issued by someone holding the key. Your API must still check what the token says: that it is for this service, from the expected issuer, and valid right now. Skipping these checks is a classic way to accept a token meant for a different app.",
  task:
    "Write <code>validateClaims(claims, options)</code> returning <code>{ valid: true }</code> or <code>{ valid: false, reason }</code>. <code>options</code>: <code>now</code> (seconds since the epoch, required), <code>issuer</code>, <code>audience</code> and <code>leewaySec</code> (default 0). Check in this order and return the first failure: <code>'malformed'</code> if <code>claims</code> is not a non-null plain object; <code>'bad_issuer'</code> if <code>options.issuer</code> is given and <code>claims.iss</code> differs; <code>'bad_audience'</code> if <code>options.audience</code> is given and it is not equal to <code>claims.aud</code> (a string) nor contained in it (an array); <code>'issued_in_future'</code> if <code>claims.iat &gt; now + leeway</code>; <code>'not_yet_valid'</code> if <code>claims.nbf &gt; now + leeway</code>; <code>'expired'</code> if <code>now - leeway &gt;= claims.exp</code>.",
  constraints: [
    "Time claims that are absent are not checked; time claims that are present but not finite numbers make the token <code>'malformed'</code>.",
    "<code>exp</code> is exclusive: a token with <code>exp === now</code> is expired (with zero leeway).",
    "<code>nbf</code> and <code>iat</code> are inclusive: a value equal to <code>now</code> is fine.",
    "Throw <code>TypeError('now is required')</code> if <code>options.now</code> is not a finite number.",
  ],
  example: `validateClaims({ iss: 'auth.example.com', aud: 'api', exp: 1000 }, { now: 999, issuer: 'auth.example.com', audience: 'api' });
// { valid: true }
validateClaims({ exp: 1000 }, { now: 1000 }); // { valid: false, reason: 'expired' }`,
  tags: ["jwt","security","authentication"],
  estimatedMins: 30,
  xp: 45,
  starterFiles: [
    {
      name: "validateClaims.js",
      lang: "js",
      code: `// validateClaims.js
function validateClaims(claims, options) {
  // your code here
}

module.exports = validateClaims;`,
    },
  ],
  testFile: {
    name: "validateClaims_test.js",
    lang: "test",
    code: `// validateClaims_test.js
const validateClaims = require('./validateClaims');

test('accepts_a_good_token', () => {
  // see the hidden tests for the full checks
  expect(typeof validateClaims).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Do the cheap structural checks first (is it an object, are the time claims numbers), then walk the remaining checks in the documented order with early returns.",
    },
    {
      order: 2,
      cost: 5,
      text: "Let <code>leeway = options.leewaySec || 0</code>. The comparisons are: <code>iat &gt; now + leeway</code>, <code>nbf &gt; now + leeway</code>, <code>now - leeway &gt;= exp</code>.",
    },
    {
      order: 3,
      cost: 10,
      text: "For the audience, normalise: <code>const auds = Array.isArray(aud) ? aud : [aud]</code> and check <code>auds.includes(expected)</code>.",
    },
  ],
  hiddenTests: [
    {
      name: "accepts_a_good_token",
      code: `const r = validateClaims({ iss: 'auth', aud: 'api', iat: 90, nbf: 90, exp: 200 }, { now: 100, issuer: 'auth', audience: 'api' });
assert(r.valid === true && !('reason' in r), 'a good token is valid, got ' + JSON.stringify(r));`,
    },
    {
      name: "expiry_is_exclusive_and_leeway_extends_it",
      code: `assert(validateClaims({ exp: 100 }, { now: 100 }).reason === 'expired', 'exp equal to now is expired');
assert(validateClaims({ exp: 100 }, { now: 99 }).valid === true, 'one second left is valid');
assert(validateClaims({ exp: 100 }, { now: 105, leewaySec: 10 }).valid === true, 'leeway allows a recently expired token');
assert(validateClaims({ exp: 100 }, { now: 110, leewaySec: 10 }).reason === 'expired', 'leeway is exclusive too');`,
    },
    {
      name: "not_before_and_issued_at",
      code: `assert(validateClaims({ nbf: 100 }, { now: 100 }).valid === true, 'nbf equal to now is valid');
assert(validateClaims({ nbf: 101 }, { now: 100 }).reason === 'not_yet_valid', 'nbf in the future');
assert(validateClaims({ nbf: 105 }, { now: 100, leewaySec: 5 }).valid === true, 'leeway applies to nbf');
assert(validateClaims({ iat: 101 }, { now: 100 }).reason === 'issued_in_future', 'iat in the future');
assert(validateClaims({ iat: 100 }, { now: 100 }).valid === true, 'iat equal to now is valid');`,
    },
    {
      name: "issuer_check",
      code: `assert(validateClaims({ iss: 'evil' }, { now: 1, issuer: 'auth' }).reason === 'bad_issuer', 'wrong issuer');
assert(validateClaims({}, { now: 1, issuer: 'auth' }).reason === 'bad_issuer', 'a missing issuer is wrong when one is expected');
assert(validateClaims({ iss: 'whatever' }, { now: 1 }).valid === true, 'no expected issuer means no check');`,
    },
    {
      name: "audience_string_or_array",
      code: `assert(validateClaims({ aud: 'api' }, { now: 1, audience: 'api' }).valid === true, 'string audience');
assert(validateClaims({ aud: ['web', 'api'] }, { now: 1, audience: 'api' }).valid === true, 'array audience containing it');
assert(validateClaims({ aud: ['web'] }, { now: 1, audience: 'api' }).reason === 'bad_audience', 'array without it');
assert(validateClaims({}, { now: 1, audience: 'api' }).reason === 'bad_audience', 'missing audience');`,
    },
    {
      name: "first_failure_wins_in_the_documented_order",
      code: `const r = validateClaims({ iss: 'x', aud: 'y', exp: 1 }, { now: 100, issuer: 'a', audience: 'b' });
assert(r.reason === 'bad_issuer', 'issuer is checked before audience and expiry, got ' + r.reason);
const s = validateClaims({ aud: 'y', exp: 1 }, { now: 100, audience: 'b' });
assert(s.reason === 'bad_audience', 'audience is checked before expiry, got ' + s.reason);
const t = validateClaims({ nbf: 500, exp: 1 }, { now: 100 });
assert(t.reason === 'not_yet_valid', 'nbf is checked before exp, got ' + t.reason);`,
    },
    {
      name: "malformed_inputs",
      code: `for (const bad of [null, undefined, 'token', 5, [], true]) {
  assert(validateClaims(bad, { now: 1 }).reason === 'malformed', 'claims ' + JSON.stringify(bad) + ' are malformed');
}
assert(validateClaims({ exp: '100' }, { now: 1 }).reason === 'malformed', 'exp must be a number');
assert(validateClaims({ nbf: NaN }, { now: 1 }).reason === 'malformed', 'nbf must be finite');
let err = null;
try { validateClaims({}, {}); } catch (e) { err = e; }
assert(err instanceof TypeError && err.message === 'now is required', 'got ' + (err && err.message));`,
    },
  ],
  solution: {
    code: `function validateClaims(claims, options) {
  const opts = options || {};
  if (typeof opts.now !== 'number' || !Number.isFinite(opts.now)) throw new TypeError('now is required');
  const now = opts.now;
  const leeway = opts.leewaySec || 0;
  const fail = (reason) => ({ valid: false, reason });

  if (typeof claims !== 'object' || claims === null || Array.isArray(claims)) return fail('malformed');
  for (const name of ['exp', 'nbf', 'iat']) {
    if (name in claims && (typeof claims[name] !== 'number' || !Number.isFinite(claims[name]))) return fail('malformed');
  }

  if (opts.issuer !== undefined && claims.iss !== opts.issuer) return fail('bad_issuer');
  if (opts.audience !== undefined) {
    const auds = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
    if (!auds.includes(opts.audience)) return fail('bad_audience');
  }
  if (claims.iat !== undefined && claims.iat > now + leeway) return fail('issued_in_future');
  if (claims.nbf !== undefined && claims.nbf > now + leeway) return fail('not_yet_valid');
  if (claims.exp !== undefined && now - leeway >= claims.exp) return fail('expired');
  return { valid: true };
}

module.exports = validateClaims;`,
    explanation:
      "The function is a list of independent checks run in a fixed order with early returns, so the first problem found is the one reported, and the order itself is part of the specification: issuer and audience (is this token even for us?) before the time claims. Structural validation comes first, because a string exp must be rejected as malformed rather than compared with a number, where JavaScript's coercion could make a bad token look valid. Leeway exists for clock skew between servers, so it widens the acceptance window in both directions: a token slightly in the future (nbf, iat) or slightly past its expiry is still accepted. The asymmetry of exp (exclusive) versus nbf and iat (inclusive) follows the JWT specification, where a token is expired as soon as the current time reaches exp.",
  },
};
