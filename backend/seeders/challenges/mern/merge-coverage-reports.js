export default {
  slug: "merge-coverage-reports",
  trackId: "mern",
  layerId: "mern-9",
  type: "CODE",
  difficulty: "hard",
  title: "Merge coverage reports and compress uncovered lines",
  summary:
    "Combine line hit counts from several test runs and report per-file and total percentages.",
  description:
    "CI usually runs tests in several shards or projects, each producing its own coverage report. A coverage gate must merge them (a line covered by any run is covered) and then report percentages and which lines are still untested, as compact ranges like '4-6, 9'.",
  task:
    "Write <code>mergeCoverage(runs)</code>. Each run is an object mapping a file path to an object mapping a line number (string) to a hit count, for example <code>{ 'a.js': { '1': 2, '2': 0 } }</code>; every listed line is an executable line. Merge all runs: for each file and line, the merged hit count is the sum across runs, and a line listed in only some runs still counts (union of lines). Return <code>{ files, total }</code>. <code>files[path]</code> is <code>{ total, covered, pct, uncovered }</code>: <code>total</code> executable lines, <code>covered</code> lines with a merged count above 0, <code>pct</code> = covered / total * 100 rounded to 2 decimals (100 when <code>total</code> is 0), and <code>uncovered</code> a string of the uncovered line numbers in ascending order, joining consecutive numbers into ranges (<code>'2-3, 7'</code>; empty string if none). <code>total</code> has the same <code>total</code>, <code>covered</code>, <code>pct</code> summed over all files (without <code>uncovered</code>).",
  constraints: [
    "Line numbers are strings of integers; sort them numerically, not as text.",
    "Files appear in <code>files</code> in alphabetical order of path.",
    "A range needs at least two consecutive numbers (<code>'4-5'</code>); a single line is just the number.",
    "An empty list of runs gives <code>{ files: {}, total: { total: 0, covered: 0, pct: 100 } }</code>.",
  ],
  example: `mergeCoverage([
  { 'a.js': { '1': 1, '2': 0, '3': 0 } },
  { 'a.js': { '1': 0, '2': 0, '3': 4 } },
]);
// files['a.js'] = { total: 3, covered: 2, pct: 66.67, uncovered: '2' }`,
  tags: ["testing","coverage","ci","data-processing"],
  estimatedMins: 40,
  xp: 75,
  starterFiles: [
    {
      name: "mergeCoverage.js",
      lang: "js",
      code: `// mergeCoverage.js
function mergeCoverage(runs) {
  // your code here
}

module.exports = mergeCoverage;`,
    },
  ],
  testFile: {
    name: "mergeCoverage_test.js",
    lang: "test",
    code: `// mergeCoverage_test.js
const mergeCoverage = require('./mergeCoverage');

test('sums_hits_across_runs', () => {
  // see the hidden tests for the full checks
  expect(typeof mergeCoverage).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "First merge into a plain object <code>merged[file][line] += hits</code> (start missing entries at 0). Never write into the input objects.",
    },
    {
      order: 2,
      cost: 5,
      text: "For each file, sort the line numbers with <code>(a, b) =&gt; a - b</code>, count the covered ones, and collect the uncovered ones into an array of numbers.",
    },
    {
      order: 3,
      cost: 10,
      text: "Compress with one pass: start a range at the first number, keep extending while the next number is previous + 1, and push either <code>'n'</code> or <code>'start-end'</code> when it breaks. Join with <code>', '</code>.",
    },
  ],
  hiddenTests: [
    {
      name: "sums_hits_across_runs",
      code: `const r = mergeCoverage([
  { 'a.js': { '1': 1, '2': 0, '3': 0 } },
  { 'a.js': { '1': 0, '2': 0, '3': 4 } },
]);
assert(JSON.stringify(r.files['a.js']) === JSON.stringify({ total: 3, covered: 2, pct: 66.67, uncovered: '2' }), 'got ' + JSON.stringify(r.files['a.js']));`,
    },
    {
      name: "union_of_lines_and_files",
      code: `const r = mergeCoverage([
  { 'a.js': { '1': 1 } },
  { 'a.js': { '2': 0 }, 'b.js': { '1': 3 } },
]);
assert(r.files['a.js'].total === 2 && r.files['a.js'].covered === 1 && r.files['a.js'].uncovered === '2', 'a.js has both lines, got ' + JSON.stringify(r.files['a.js']));
assert(r.files['b.js'].pct === 100 && r.files['b.js'].uncovered === '', 'b.js is fully covered, got ' + JSON.stringify(r.files['b.js']));`,
    },
    {
      name: "ranges_are_compressed_and_sorted_numerically",
      code: `const lines = {};
for (const n of [10, 2, 3, 4, 7, 9, 1, 11]) lines[String(n)] = 0;
lines['5'] = 1; lines['6'] = 1;
const r = mergeCoverage([{ 'x.js': lines }]);
assert(r.files['x.js'].uncovered === '1-4, 7, 9-11', 'got ' + r.files['x.js'].uncovered);`,
    },
    {
      name: "pct_is_rounded_to_two_decimals",
      code: `const r = mergeCoverage([{ 'a.js': { '1': 1, '2': 0, '3': 0 } }]);
assert(r.files['a.js'].pct === 33.33, 'got ' + r.files['a.js'].pct);
const s = mergeCoverage([{ 'a.js': { '1': 1, '2': 1, '3': 0 } }]);
assert(s.files['a.js'].pct === 66.67, 'got ' + s.files['a.js'].pct);`,
    },
    {
      name: "total_sums_over_files",
      code: `const r = mergeCoverage([{ 'a.js': { '1': 1, '2': 0 }, 'b.js': { '1': 1, '2': 1, '3': 1, '4': 0 } }]);
assert(JSON.stringify(r.total) === JSON.stringify({ total: 6, covered: 4, pct: 66.67 }), 'got ' + JSON.stringify(r.total));`,
    },
    {
      name: "files_are_listed_alphabetically",
      code: `const r = mergeCoverage([{ 'z.js': { '1': 1 }, 'a.js': { '1': 1 }, 'm.js': { '1': 1 } }]);
assert(Object.keys(r.files).join() === 'a.js,m.js,z.js', 'got ' + Object.keys(r.files).join());`,
    },
    {
      name: "empty_inputs",
      code: `const r = mergeCoverage([]);
assert(JSON.stringify(r) === JSON.stringify({ files: {}, total: { total: 0, covered: 0, pct: 100 } }), 'got ' + JSON.stringify(r));
const s = mergeCoverage([{ 'empty.js': {} }]);
assert(JSON.stringify(s.files['empty.js']) === JSON.stringify({ total: 0, covered: 0, pct: 100, uncovered: '' }), 'a file with no executable lines is 100%, got ' + JSON.stringify(s.files['empty.js']));`,
    },
    {
      name: "inputs_are_not_modified",
      code: `const run = { 'a.js': { '1': 1 } };
const other = { 'a.js': { '1': 2 } };
mergeCoverage([run, other]);
assert(run['a.js']['1'] === 1 && other['a.js']['1'] === 2, 'the runs must not be changed');`,
    },
  ],
  solution: {
    code: `function mergeCoverage(runs) {
  const merged = {};
  for (const run of runs) {
    for (const file of Object.keys(run)) {
      merged[file] = merged[file] || {};
      for (const line of Object.keys(run[file])) {
        merged[file][line] = (merged[file][line] || 0) + run[file][line];
      }
    }
  }

  const pct = (covered, total) => (total === 0 ? 100 : Math.round((covered / total) * 10000) / 100);

  const compress = (nums) => {
    const parts = [];
    let i = 0;
    while (i < nums.length) {
      let j = i;
      while (j + 1 < nums.length && nums[j + 1] === nums[j] + 1) j++;
      parts.push(j > i ? nums[i] + '-' + nums[j] : String(nums[i]));
      i = j + 1;
    }
    return parts.join(', ');
  };

  const files = {};
  let allTotal = 0;
  let allCovered = 0;
  for (const file of Object.keys(merged).sort()) {
    const lines = Object.keys(merged[file]).map(Number).sort((a, b) => a - b);
    const uncovered = lines.filter((n) => merged[file][String(n)] === 0);
    const covered = lines.length - uncovered.length;
    files[file] = { total: lines.length, covered, pct: pct(covered, lines.length), uncovered: compress(uncovered) };
    allTotal += lines.length;
    allCovered += covered;
  }
  return { files, total: { total: allTotal, covered: allCovered, pct: pct(allCovered, allTotal) } };
}

module.exports = mergeCoverage;`,
    explanation:
      "Merging is a union with addition: for every file and line the hit counts are summed, and a line that only some runs mention is still counted, so a shard that skips a file cannot hide its lines. Lines are stored as string keys, so they have to be converted to numbers and sorted numerically; sorting the strings would put '10' before '2' and break both the ranges and the totals. A line is covered when its merged count is above zero, which is why a line hit once in any run counts. The range compressor is a two-pointer pass: j walks forward while the next number is exactly one more, then a single number or a start-end pair is emitted. Percentages use Math.round on covered/total*10000 divided by 100, which rounds to two decimals without the floating-point surprises of toFixed, and an empty file is 100% so it can never fail a coverage gate.",
  },
};
