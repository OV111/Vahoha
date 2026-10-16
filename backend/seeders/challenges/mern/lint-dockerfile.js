export default {
  slug: "lint-dockerfile",
  trackId: "mern",
  layerId: "mern-10",
  type: "CODE",
  difficulty: "hard",
  title: "Lint a Dockerfile for common mistakes",
  summary:
    "Spot unpinned base images, root users, slow layer ordering and ADD misuse.",
  description:
    "Many production issues start in the Dockerfile: an image tag that moves under you, a container that runs as root, a COPY that invalidates the dependency cache on every code change. A linter finds these from the parsed instructions, and the rules are small enough to write yourself.",
  task:
    "Write <code>lintDockerfile(instructions)</code> where <code>instructions</code> is an array of <code>{ line, instruction, args }</code> (the output of a Dockerfile parser). Return an array of findings <code>{ line, rule, message }</code> sorted by line, then by rule name. Rules: (1) <b>latest-tag</b>: a <code>FROM</code> whose image has no tag or the tag <code>latest</code> (message <code>Pin the base image tag: IMAGE</code>). Skip flags that start with <code>--</code>, the image <code>scratch</code>, images with a digest (<code>@sha256:</code>), and images that name an earlier stage (defined with <code>AS name</code>). The image is the first non-flag word of the arguments; a tag is the part after a <code>:</code> in the last path segment. (2) <b>no-user</b>: the final stage (everything after the last <code>FROM</code>) has no <code>USER</code> instruction, or its last <code>USER</code> is <code>root</code> or <code>0</code>; report once at the line of the last <code>FROM</code> with the message <code>Final stage runs as root; add a USER instruction</code>. (3) <b>cache-busting-copy</b>: inside a stage, a <code>COPY</code> or <code>ADD</code> whose first source is <code>.</code> or <code>./</code>, appearing <b>before</b> a <code>RUN</code> in the same stage that installs dependencies (matching <code>npm ci</code>, <code>npm install</code>, <code>yarn</code>, <code>pnpm install</code>, <code>pip install</code> or <code>bundle install</code> as whole words), reported at the COPY/ADD line with the message <code>Copy dependency manifests and install before copying the whole source</code>. (4) <b>prefer-copy</b>: an <code>ADD</code> whose first source is not an <code>http://</code> or <code>https://</code> URL and does not end in <code>.tar</code>, <code>.tar.gz</code>, <code>.tgz</code>, <code>.tar.bz2</code> or <code>.tar.xz</code> (message <code>Use COPY instead of ADD for local files</code>).",
  constraints: [
    "Instruction names are matched case-insensitively; ignore flags such as <code>--chown=...</code> or <code>--from=...</code> when finding the first COPY/ADD source.",
    "A stage starts at each <code>FROM</code>. Rule 3 applies per stage, and only the first such COPY of a stage before the install is reported once per COPY line.",
    "If there is no <code>FROM</code> at all, return <code>[]</code>.",
    "Do not modify the input.",
  ],
  example: `lintDockerfile([
  { line: 1, instruction: 'FROM', args: 'node' },
  { line: 2, instruction: 'COPY', args: '. .' },
  { line: 3, instruction: 'RUN', args: 'npm ci' },
]);
// [ { line: 1, rule: 'latest-tag', message: 'Pin the base image tag: node' },
//   { line: 1, rule: 'no-user', message: 'Final stage runs as root; add a USER instruction' },
//   { line: 2, rule: 'cache-busting-copy', message: 'Copy dependency manifests and install before copying the whole source' } ]`,
  tags: ["docker","linting","devops","best-practices"],
  estimatedMins: 50,
  xp: 75,
  starterFiles: [
    {
      name: "lintDockerfile.js",
      lang: "js",
      code: `// lintDockerfile.js
function lintDockerfile(instructions) {
  // your code here
}

module.exports = lintDockerfile;`,
    },
  ],
  testFile: {
    name: "lintDockerfile_test.js",
    lang: "test",
    code: `// lintDockerfile_test.js
const lintDockerfile = require('./lintDockerfile');

test('unpinned_base_images', () => {
  // see the hidden tests for the full checks
  expect(typeof lintDockerfile).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Normalise first: copy each instruction with an upper-cased name, and compute the index of every <code>FROM</code>. Everything between two FROMs is one stage.",
    },
    {
      order: 2,
      cost: 5,
      text: "Write helpers: <code>words(args)</code> (split on whitespace), <code>firstNonFlag(args)</code> (skip words starting with <code>--</code>), and <code>stageNames</code> (collect names from <code>AS name</code> as you walk the FROMs, so later FROMs can recognise them).",
    },
    {
      order: 3,
      cost: 10,
      text: "For the cache rule, for each stage find the index of the first dependency-install RUN. Report every COPY/ADD of <code>.</code> or <code>./</code> that comes before it in that stage. Sort the final list by <code>line</code> then <code>rule</code>.",
    },
  ],
  hiddenTests: [
    {
      name: "unpinned_base_images",
      code: `const ins = (line, args) => ({ line, instruction: 'FROM', args });
const r = lintDockerfile([ins(1, 'node'), ins(2, 'node:latest'), ins(3, 'node:20'), ins(4, 'localhost:5000/team/app'), ins(5, 'scratch')].concat([{ line: 6, instruction: 'USER', args: 'app' }]));
const lines = r.filter((f) => f.rule === 'latest-tag').map((f) => f.line);
assert(JSON.stringify(lines) === JSON.stringify([1, 2, 4]), 'node, node:latest and a registry-port image without a tag are flagged, got ' + JSON.stringify(lines));
assert(r.find((f) => f.line === 1).message === 'Pin the base image tag: node', 'message names the image, got ' + r.find((f) => f.line === 1).message);`,
    },
    {
      name: "from_flags_digests_and_stage_names_are_handled",
      code: `const f = (line, args) => ({ line, instruction: 'FROM', args });
const r = lintDockerfile([
  f(1, '--platform=linux/amd64 node:20 AS build'),
  f(2, 'build AS test'),
  f(3, 'node@sha256:abcdef'),
  f(4, '--platform=linux/amd64 alpine'),
  { line: 5, instruction: 'USER', args: 'nobody' },
]);
const flagged = r.filter((x) => x.rule === 'latest-tag').map((x) => x.line);
assert(JSON.stringify(flagged) === JSON.stringify([4]), 'only the unpinned alpine is flagged, got ' + JSON.stringify(flagged));
assert(r.find((x) => x.line === 4).message === 'Pin the base image tag: alpine', 'flags are skipped when naming the image');`,
    },
    {
      name: "final_stage_must_not_run_as_root",
      code: `const base = [{ line: 1, instruction: 'FROM', args: 'node:20' }, { line: 2, instruction: 'RUN', args: 'echo hi' }];
const none = lintDockerfile(base);
assert(none.length === 1 && none[0].rule === 'no-user' && none[0].line === 1, 'no USER at all, got ' + JSON.stringify(none));
assert(none[0].message === 'Final stage runs as root; add a USER instruction', 'message');
assert(lintDockerfile(base.concat([{ line: 3, instruction: 'USER', args: 'app' }])).length === 0, 'a non-root USER is fine');
assert(lintDockerfile(base.concat([{ line: 3, instruction: 'USER', args: 'root' }])).length === 1, 'USER root is still root');
assert(lintDockerfile(base.concat([{ line: 3, instruction: 'USER', args: '0' }])).length === 1, 'USER 0 is root too');
assert(lintDockerfile(base.concat([{ line: 3, instruction: 'USER', args: 'root' }, { line: 4, instruction: 'USER', args: 'app' }])).length === 0, 'the last USER decides');`,
    },
    {
      name: "only_the_final_stage_counts_for_user",
      code: `const r = lintDockerfile([
  { line: 1, instruction: 'FROM', args: 'node:20 AS build' },
  { line: 2, instruction: 'RUN', args: 'npm run build' },
  { line: 3, instruction: 'FROM', args: 'nginx:1.27' },
  { line: 4, instruction: 'USER', args: 'nginx' },
]);
assert(r.length === 0, 'the build stage may run as root, the final stage sets a user, got ' + JSON.stringify(r));
const s = lintDockerfile([
  { line: 1, instruction: 'FROM', args: 'node:20 AS build' },
  { line: 2, instruction: 'USER', args: 'app' },
  { line: 3, instruction: 'FROM', args: 'nginx:1.27' },
]);
assert(s.length === 1 && s[0].rule === 'no-user' && s[0].line === 3, 'reported at the last FROM, got ' + JSON.stringify(s));`,
    },
    {
      name: "copy_everything_before_install_busts_the_cache",
      code: `const user = { line: 9, instruction: 'USER', args: 'app' };
const bad = lintDockerfile([
  { line: 1, instruction: 'FROM', args: 'node:20' },
  { line: 2, instruction: 'COPY', args: '--chown=node:node . /app' },
  { line: 3, instruction: 'RUN', args: 'npm ci --omit=dev' },
  user,
]);
assert(bad.length === 1 && bad[0].rule === 'cache-busting-copy' && bad[0].line === 2, 'got ' + JSON.stringify(bad));
const good = lintDockerfile([
  { line: 1, instruction: 'FROM', args: 'node:20' },
  { line: 2, instruction: 'COPY', args: 'package.json package-lock.json ./' },
  { line: 3, instruction: 'RUN', args: 'npm ci' },
  { line: 4, instruction: 'COPY', args: '. .' },
  user,
]);
assert(good.length === 0, 'copying the manifests first is correct, got ' + JSON.stringify(good));
const after = lintDockerfile([
  { line: 1, instruction: 'FROM', args: 'node:20' },
  { line: 2, instruction: 'COPY', args: './ /app' },
  { line: 3, instruction: 'RUN', args: 'echo done' },
  user,
]);
assert(after.length === 0, 'no install step after the copy means nothing to flag, got ' + JSON.stringify(after));`,
    },
    {
      name: "install_detection_uses_whole_words_and_stages_are_separate",
      code: `const user = { line: 20, instruction: 'USER', args: 'app' };
const r = lintDockerfile([
  { line: 1, instruction: 'FROM', args: 'python:3.12' },
  { line: 2, instruction: 'ADD', args: '. /srv' },
  { line: 3, instruction: 'RUN', args: 'pip install -r requirements.txt' },
  { line: 4, instruction: 'FROM', args: 'python:3.12' },
  { line: 5, instruction: 'COPY', args: '. /srv' },
  { line: 6, instruction: 'RUN', args: 'echo yarnish uses pnpm only' },
  user,
]);
const rules = r.map((f) => f.line + ':' + f.rule).join();
assert(rules === '2:cache-busting-copy,2:prefer-copy', 'stage one is flagged (twice for the ADD), stage two has no install, got ' + rules);`,
    },
    {
      name: "add_is_only_for_urls_and_archives",
      code: `const base = [{ line: 1, instruction: 'FROM', args: 'node:20' }];
const user = { line: 9, instruction: 'USER', args: 'app' };
const check = (args) => lintDockerfile(base.concat([{ line: 2, instruction: 'ADD', args }, user])).filter((f) => f.rule === 'prefer-copy').length;
assert(check('config.json /etc/') === 1, 'a local file should use COPY');
assert(check('https://example.com/a.bin /a') === 0 && check('http://example.com/a.bin /a') === 0, 'URLs are a valid use of ADD');
assert(check('app.tar.gz /opt') === 0 && check('x.tgz /opt') === 0 && check('y.tar /opt') === 0 && check('z.tar.xz /opt') === 0 && check('w.tar.bz2 /opt') === 0, 'archives are extracted by ADD');
assert(check('--chown=app:app config.json /etc/') === 1, 'flags are skipped when finding the source');`,
    },
    {
      name: "findings_are_sorted_and_edge_cases",
      code: `const r = lintDockerfile([
  { line: 3, instruction: 'copy', args: '. .' },
  { line: 1, instruction: 'from', args: 'node' },
  { line: 4, instruction: 'run', args: 'npm install' },
].sort((a, b) => a.line - b.line));
assert(r.map((f) => f.line + ':' + f.rule).join() === '1:latest-tag,1:no-user,3:cache-busting-copy', 'sorted by line then rule, lower-case instructions work, got ' + r.map((f) => f.line + ':' + f.rule).join());
assert(JSON.stringify(lintDockerfile([])) === '[]', 'no instructions');
assert(JSON.stringify(lintDockerfile([{ line: 1, instruction: 'RUN', args: 'ls' }])) === '[]', 'no FROM at all gives no findings');`,
    },
  ],
  solution: {
    code: `function lintDockerfile(instructions) {
  const items = instructions.map((i) => ({ line: i.line, name: String(i.instruction).toUpperCase(), args: i.args || '' }));
  const findings = [];
  const words = (s) => s.split(/\\s+/).filter(Boolean);
  const firstNonFlag = (s) => words(s).find((w) => !w.startsWith('--'));
  const INSTALL = /(^|[^A-Za-z0-9_-])(npm ci|npm install|yarn|pnpm install|pip install|bundle install)($|[^A-Za-z0-9_-])/;
  const ARCHIVE = /\\.(tar|tar\\.gz|tgz|tar\\.bz2|tar\\.xz)$/;

  // stages
  const stages = [];
  for (const item of items) {
    if (item.name === 'FROM') stages.push({ from: item, items: [] });
    else if (stages.length > 0) stages[stages.length - 1].items.push(item);
  }
  if (stages.length === 0) return [];

  const stageNames = new Set();
  for (const stage of stages) {
    const w = words(stage.from.args).filter((x) => !x.startsWith('--'));
    const image = w[0] || '';
    const asAt = w.findIndex((x) => x.toUpperCase() === 'AS');
    const lastSegment = image.split('/').pop();
    const hasTag = lastSegment.includes(':');
    const tag = hasTag ? lastSegment.split(':')[1] : '';
    const pinned = image === 'scratch' || image.includes('@sha256:') || stageNames.has(image);
    if (image && !pinned && (!hasTag || tag === 'latest')) {
      findings.push({ line: stage.from.line, rule: 'latest-tag', message: 'Pin the base image tag: ' + image });
    }
    if (asAt !== -1 && w[asAt + 1]) stageNames.add(w[asAt + 1]);
  }

  // final stage user
  const last = stages[stages.length - 1];
  const users = last.items.filter((i) => i.name === 'USER');
  const lastUser = users.length ? firstNonFlag(users[users.length - 1].args) : null;
  if (!lastUser || lastUser === 'root' || lastUser === '0') {
    findings.push({ line: last.from.line, rule: 'no-user', message: 'Final stage runs as root; add a USER instruction' });
  }

  // per stage rules
  for (const stage of stages) {
    const installAt = stage.items.findIndex((i) => i.name === 'RUN' && INSTALL.test(i.args));
    stage.items.forEach((item, index) => {
      if (item.name !== 'COPY' && item.name !== 'ADD') return;
      const source = firstNonFlag(item.args);
      if (installAt !== -1 && index < installAt && (source === '.' || source === './')) {
        findings.push({ line: item.line, rule: 'cache-busting-copy', message: 'Copy dependency manifests and install before copying the whole source' });
      }
      if (item.name === 'ADD' && source && !/^https?:\\/\\//.test(source) && !ARCHIVE.test(source)) {
        findings.push({ line: item.line, rule: 'prefer-copy', message: 'Use COPY instead of ADD for local files' });
      }
    });
  }

  return findings.sort((a, b) => a.line - b.line || (a.rule < b.rule ? -1 : a.rule > b.rule ? 1 : 0));
}

module.exports = lintDockerfile;`,
    explanation:
      "Everything starts with splitting the flat instruction list into stages at each FROM, because three of the four rules are about a stage rather than the file. The base-image rule reads the image as the first word that is not a flag, decides whether it has a tag by looking only at the last path segment (so a registry port like localhost:5000/app is not mistaken for a tag), and keeps a set of stage names so FROM build AS test is recognised as a reference to an earlier stage and not an unpinned image. The root-user rule looks only at the final stage, since earlier stages are thrown away, and treats root and 0 the same. The cache rule finds where dependencies are installed in a stage and flags a whole-source copy before it, since copying everything first invalidates the install layer on every code change. The install pattern uses boundaries so that 'yarnish' is not mistaken for yarn. Findings are sorted by line and then rule so the output is stable.",
  },
};
