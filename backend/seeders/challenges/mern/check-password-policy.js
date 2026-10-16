export default {
  slug: "check-password-policy",
  trackId: "mern",
  layerId: "mern-7",
  type: "CODE",
  difficulty: "easy",
  title: "Check a password against a policy",
  summary:
    "Return every rule a new password breaks, before it is ever hashed.",
  description:
    "Hashing with bcrypt protects stored passwords, but it cannot make a weak password strong. Sign-up code should reject obviously weak passwords and tell the user exactly why, so they can fix everything in one try.",
  task:
    "Write <code>checkPassword(password, options)</code> returning an array of failure codes (empty if the password is acceptable). Options: <code>minLength</code> (default 8) and <code>username</code>. Check these rules and report each failure once, always in this order: <code>'too_short'</code> (shorter than <code>minLength</code>), <code>'no_lowercase'</code>, <code>'no_uppercase'</code>, <code>'no_digit'</code>, <code>'no_symbol'</code> (no character that is not a letter or digit), <code>'contains_username'</code> (the username has at least 3 characters and appears in the password, ignoring case), <code>'common'</code> (the whole password, ignoring case, is one of: <code>password</code>, <code>12345678</code>, <code>qwerty123</code>, <code>letmein</code>, <code>iloveyou</code>, <code>admin123</code>).",
  constraints: [
    "Throw <code>TypeError('password must be a string')</code> if the password is not a string.",
    "Letters means ASCII letters A-Z and a-z; a symbol is any other character that is not a digit, including spaces.",
    "Length is the number of UTF-16 code units, i.e. <code>password.length</code>.",
    "Do not trim the password.",
  ],
  example: `checkPassword('abc1', { username: 'Abc' });
// ['too_short', 'no_uppercase', 'no_symbol', 'contains_username']
checkPassword('Tr0ub4dor&3'); // []`,
  tags: ["security","passwords","validation"],
  estimatedMins: 20,
  xp: 30,
  starterFiles: [
    {
      name: "checkPassword.js",
      lang: "js",
      code: `// checkPassword.js
function checkPassword(password, options) {
  // your code here
}

module.exports = checkPassword;`,
    },
  ],
  testFile: {
    name: "checkPassword_test.js",
    lang: "test",
    code: `// checkPassword_test.js
const checkPassword = require('./checkPassword');

test('strong_password_has_no_failures', () => {
  // see the hidden tests for the full checks
  expect(typeof checkPassword).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Build the result by checking rules in the required order and pushing the code for each failure. A small array of <code>[code, test]</code> pairs keeps the order obvious.",
    },
    {
      order: 2,
      cost: 5,
      text: "Use regular expressions: <code>/[a-z]/</code>, <code>/[A-Z]/</code>, <code>/[0-9]/</code>, and <code>/[^A-Za-z0-9]/</code> for a symbol.",
    },
    {
      order: 3,
      cost: 10,
      text: "Lowercase both the password and the username before the contains check, and skip it when the username is missing or shorter than 3 characters.",
    },
  ],
  hiddenTests: [
    {
      name: "strong_password_has_no_failures",
      code: `assert(JSON.stringify(checkPassword('Tr0ub4dor&3')) === '[]', 'a strong password passes, got ' + JSON.stringify(checkPassword('Tr0ub4dor&3')));`,
    },
    {
      name: "reports_character_class_failures_in_order",
      code: `assert(JSON.stringify(checkPassword('abcdefgh')) === JSON.stringify(['no_uppercase', 'no_digit', 'no_symbol']), 'got ' + JSON.stringify(checkPassword('abcdefgh')));
assert(JSON.stringify(checkPassword('ABCDEFG1!')) === JSON.stringify(['no_lowercase']), 'got ' + JSON.stringify(checkPassword('ABCDEFG1!')));`,
    },
    {
      name: "length_rule_and_custom_minimum",
      code: `assert(JSON.stringify(checkPassword('Ab1!')) === JSON.stringify(['too_short']), 'got ' + JSON.stringify(checkPassword('Ab1!')));
assert(JSON.stringify(checkPassword('Ab1!', { minLength: 4 })) === '[]', 'minLength is configurable');
assert(JSON.stringify(checkPassword('Ab1!cdef', { minLength: 12 })) === JSON.stringify(['too_short']), 'longer minimum');`,
    },
    {
      name: "symbols_include_spaces_and_non_ascii",
      code: `assert(JSON.stringify(checkPassword('Abcdefg 1')) === '[]', 'a space counts as a symbol');
assert(JSON.stringify(checkPassword('Abcdefgh1é')) === '[]', 'a non-ASCII character counts as a symbol');`,
    },
    {
      name: "username_is_checked_case_insensitively_when_long_enough",
      code: `assert(JSON.stringify(checkPassword('xxANAxx1!A', { username: 'ana' })) === JSON.stringify(['contains_username']), 'contains the username, got ' + JSON.stringify(checkPassword('xxANAxx1!A', { username: 'ana' })));
assert(JSON.stringify(checkPassword('Zz1!zzzzzz', { username: 'zz' })) === '[]', 'usernames shorter than 3 characters are not checked');`,
    },
    {
      name: "common_passwords_are_rejected_whole_only",
      code: `const r = checkPassword('PassWord');
assert(r.indexOf('common') !== -1, 'a common password is rejected ignoring case, got ' + JSON.stringify(r));
assert(checkPassword('Password1!x').indexOf('common') === -1, 'only exact matches are common');
assert(checkPassword('12345678').indexOf('common') !== -1, 'numeric common password');`,
    },
    {
      name: "every_failure_is_reported_once_in_fixed_order",
      code: `const r = checkPassword('admin123', { username: 'admin' });
assert(JSON.stringify(r) === JSON.stringify(['no_uppercase', 'no_symbol', 'contains_username', 'common']), 'got ' + JSON.stringify(r));`,
    },
    {
      name: "non_strings_throw",
      code: `let err = null;
try { checkPassword(12345678); } catch (e) { err = e; }
assert(err instanceof TypeError && err.message === 'password must be a string', 'got ' + (err && err.message));`,
    },
  ],
  solution: {
    code: `function checkPassword(password, options) {
  if (typeof password !== 'string') throw new TypeError('password must be a string');
  const opts = options || {};
  const minLength = opts.minLength === undefined ? 8 : opts.minLength;
  const COMMON = ['password', '12345678', 'qwerty123', 'letmein', 'iloveyou', 'admin123'];
  const lower = password.toLowerCase();
  const user = typeof opts.username === 'string' ? opts.username.toLowerCase() : '';

  const rules = [
    ['too_short', password.length < minLength],
    ['no_lowercase', !/[a-z]/.test(password)],
    ['no_uppercase', !/[A-Z]/.test(password)],
    ['no_digit', !/[0-9]/.test(password)],
    ['no_symbol', !/[^A-Za-z0-9]/.test(password)],
    ['contains_username', user.length >= 3 && lower.includes(user)],
    ['common', COMMON.includes(lower)],
  ];
  return rules.filter(([, failed]) => failed).map(([code]) => code);
}

module.exports = checkPassword;`,
    explanation:
      "Expressing the policy as an ordered list of [code, failed] pairs makes the required output order a property of the data instead of the control flow, and it means every rule is evaluated and reported, not just the first, which is the point of telling a user everything wrong at once. The username check lowercases both sides and ignores very short usernames, because a two-letter name would otherwise match inside most passwords. The common-password check compares the whole lowercased password, so 'Password1!x' is fine while 'PassWord' is not. Note what this does not do: it never trims or normalises the password, because changing what the user typed would change what gets hashed.",
  },
};
