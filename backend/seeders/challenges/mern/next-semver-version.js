export default {
  slug: "next-semver-version",
  trackId: "mern",
  layerId: "mern-10",
  type: "CODE",
  difficulty: "med",
  title: "Compute the next version from conventional commits",
  summary:
    "Decide whether a release is a major, minor or patch bump from commit messages.",
  description:
    "Release pipelines often compute the next version automatically from commit messages that follow the Conventional Commits format: feat for new features, fix for bug fixes, and an exclamation mark or a BREAKING CHANGE footer for incompatible changes. Doing this correctly means parsing the message header and picking the largest bump.",
  task:
    "Write <code>nextVersion(current, messages)</code>. <code>current</code> is a version <code>'MAJOR.MINOR.PATCH'</code> (digits only), otherwise throw <code>Error('Invalid version: VALUE')</code>. <code>messages</code> is an array of commit messages (a message may have several lines). The header is the first line; it is conventional if it matches <code>type(scope)!: description</code> where scope and <code>!</code> are optional and <code>type</code> is letters only. Bump rules, taking the highest across all messages: <b>major</b> if any conventional header has <code>!</code> before the colon, or any message has a line that starts with <code>BREAKING CHANGE:</code> or <code>BREAKING-CHANGE:</code>; else <b>minor</b> if any type is <code>feat</code>; else <b>patch</b> if any type is <code>fix</code> or <code>perf</code>; otherwise no bump. A major bump resets minor and patch to 0, a minor bump resets patch to 0. Return the new version string (the same string if there is no bump). Messages that are not conventional are ignored for type purposes, but a <code>BREAKING CHANGE:</code> line inside them still counts.",
  constraints: [
    "Types are compared in lower case (<code>Feat:</code> counts as <code>feat</code>); the <code>BREAKING CHANGE</code> footer is case-sensitive.",
    "Only the first line is checked for the type; a later line starting with <code>feat:</code> does nothing.",
    "Versions below 1.0.0 follow the same rules (no special 0.x handling).",
    "Leading zeros are not allowed in <code>current</code> numbers except a single <code>0</code>.",
  ],
  example: `nextVersion('1.4.2', ['fix: typo', 'feat(api): add search']); // '1.5.0'
nextVersion('1.4.2', ['chore: deps', 'docs: readme']);       // '1.4.2'
nextVersion('1.4.2', ['refactor!: drop v1 routes']);         // '2.0.0'`,
  tags: ["ci-cd","semver","release","conventional-commits"],
  estimatedMins: 30,
  xp: 45,
  starterFiles: [
    {
      name: "nextVersion.js",
      lang: "js",
      code: `// nextVersion.js
function nextVersion(current, messages) {
  // your code here
}

module.exports = nextVersion;`,
    },
  ],
  testFile: {
    name: "nextVersion_test.js",
    lang: "test",
    code: `// nextVersion_test.js
const nextVersion = require('./nextVersion');

test('fix_is_a_patch', () => {
  // see the hidden tests for the full checks
  expect(typeof nextVersion).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Parse the version with <code>/^(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)$/</code> and convert the parts to numbers.",
    },
    {
      order: 2,
      cost: 5,
      text: "For each message, take <code>message.split('\\n')[0]</code> as the header and match <code>/^([A-Za-z]+)(\\([^)]*\\))?(!)?: /</code>. Check the footer with <code>/^BREAKING[ -]CHANGE: /m</code> on the whole message.",
    },
    {
      order: 3,
      cost: 10,
      text: "Track the best level seen so far as a number (0 none, 1 patch, 2 minor, 3 major) and apply it once at the end.",
    },
  ],
  hiddenTests: [
    {
      name: "fix_is_a_patch",
      code: `assert(nextVersion('1.4.2', ['fix: typo']) === '1.4.3', 'got ' + nextVersion('1.4.2', ['fix: typo']));
assert(nextVersion('1.4.2', ['perf(db): faster query']) === '1.4.3', 'perf is a patch too');`,
    },
    {
      name: "feat_is_a_minor_and_resets_patch",
      code: `assert(nextVersion('1.4.2', ['feat: search']) === '1.5.0', 'got ' + nextVersion('1.4.2', ['feat: search']));
assert(nextVersion('1.4.2', ['fix: a', 'feat(api): b', 'fix: c']) === '1.5.0', 'the highest bump wins');`,
    },
    {
      name: "breaking_change_markers_make_a_major",
      code: `assert(nextVersion('1.4.2', ['refactor!: drop old routes']) === '2.0.0', 'bang in the header');
assert(nextVersion('1.4.2', ['feat(api)!: new auth']) === '2.0.0', 'bang after the scope');
assert(nextVersion('1.4.2', ['fix: a\\n\\nBREAKING CHANGE: the format changed']) === '2.0.0', 'footer');
assert(nextVersion('1.4.2', ['fix: a\\n\\nBREAKING-CHANGE: also works']) === '2.0.0', 'hyphenated footer');
assert(nextVersion('1.4.2', ['not conventional\\n\\nBREAKING CHANGE: still counts']) === '2.0.0', 'footers count even in non-conventional messages');`,
    },
    {
      name: "major_beats_everything_and_resets_the_rest",
      code: `assert(nextVersion('1.4.2', ['feat: x', 'fix: y', 'chore!: z']) === '2.0.0', 'got ' + nextVersion('1.4.2', ['feat: x', 'fix: y', 'chore!: z']));
assert(nextVersion('0.9.9', ['feat!: x']) === '1.0.0', 'no special handling below 1.0.0');`,
    },
    {
      name: "other_types_do_not_bump",
      code: `assert(nextVersion('1.4.2', ['chore: deps', 'docs: readme', 'style: fmt', 'test: more', 'ci: cache']) === '1.4.2', 'no bump');
assert(nextVersion('1.4.2', []) === '1.4.2', 'no commits, no bump');`,
    },
    {
      name: "only_the_header_decides_the_type",
      code: `assert(nextVersion('1.0.0', ['chore: x\\n\\nfeat: this is body text']) === '1.0.0', 'body text is not a header');
assert(nextVersion('1.0.0', ['Fix: capital']) === '1.0.1', 'types are case-insensitive');
assert(nextVersion('1.0.0', ['feature: not a real type']) === '1.0.0', 'unknown types do nothing');`,
    },
    {
      name: "non_conventional_messages_are_ignored",
      code: `assert(nextVersion('1.0.0', ['Merge branch main', 'update stuff', 'fix something']) === '1.0.0', 'a header without a colon format is ignored, got ' + nextVersion('1.0.0', ['Merge branch main', 'update stuff', 'fix something']));
assert(nextVersion('1.0.0', ['fix:no space']) === '1.0.0', 'the description must follow a space');`,
    },
    {
      name: "version_validation",
      code: `for (const bad of ['1.2', 'v1.2.3', '1.2.3-beta', '01.2.3', '1.2.x', '', 'a.b.c']) {
  let err = null;
  try { nextVersion(bad, []); } catch (e) { err = e; }
  assert(err && err.message === 'Invalid version: ' + bad, bad + ' must be rejected, got ' + (err && err.message));
}
assert(nextVersion('10.20.30', ['fix: x']) === '10.20.31', 'multi-digit numbers work');`,
    },
  ],
  solution: {
    code: `function nextVersion(current, messages) {
  const m = /^(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)\\.(0|[1-9][0-9]*)$/.exec(current);
  if (!m) throw new Error('Invalid version: ' + current);
  let major = Number(m[1]);
  let minor = Number(m[2]);
  let patch = Number(m[3]);

  let level = 0;
  for (const message of messages) {
    const header = message.split('\\n')[0];
    const h = /^([A-Za-z]+)(\\([^)]*\\))?(!)?: /.exec(header);
    if (/^BREAKING[ -]CHANGE: /m.test(message) || (h && h[3] === '!')) level = Math.max(level, 3);
    if (h) {
      const type = h[1].toLowerCase();
      if (type === 'feat') level = Math.max(level, 2);
      else if (type === 'fix' || type === 'perf') level = Math.max(level, 1);
    }
  }

  if (level === 3) { major += 1; minor = 0; patch = 0; }
  else if (level === 2) { minor += 1; patch = 0; }
  else if (level === 1) { patch += 1; }
  return major + '.' + minor + '.' + patch;
}

module.exports = nextVersion;`,
    explanation:
      "Each message independently votes for a bump level and the final level is the maximum vote, which is why mixing fixes and features gives a minor release. The header regular expression is the Conventional Commits grammar in miniature: a letters-only type, an optional parenthesised scope, an optional exclamation mark, then a colon and a space. Requiring the space is what rejects 'fix:no space' and keeps ordinary prose like 'fix something' out of the release logic. Breaking changes have two spellings, the bang in the header and the BREAKING CHANGE footer; the footer is searched in the whole message with the multiline flag so it works on any line, including in commits that are otherwise not conventional. The version is applied last, with the reset rules in the right order: a major bump zeroes minor and patch, a minor bump zeroes only patch.",
  },
};
