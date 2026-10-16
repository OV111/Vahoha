export default {
  slug: "plan-ci-pipeline",
  trackId: "mern",
  layerId: "mern-10",
  type: "CODE",
  difficulty: "hard",
  title: "Plan CI pipeline stages and skip dependents of failed jobs",
  summary:
    "Group jobs into parallel stages from their `needs`, detect cycles, and work out what is skipped after a failure.",
  description:
    "In GitHub Actions and similar systems a job can declare needs: [other jobs]. The platform runs everything that can run in parallel, waits for dependencies, and skips the jobs downstream of a failure. Understanding that planning step makes pipeline YAML much easier to reason about.",
  task:
    "Write <code>planPipeline(jobs, failed)</code>. <code>jobs</code> maps a job name to <code>{ needs: [names] }</code> (<code>needs</code> optional). <code>failed</code> is an optional array of job names that fail when they run. Return <code>{ stages, skipped }</code>. A job's stage number is <code>0</code> if it has no needs, otherwise <code>1 +</code> the largest stage number among its needs. <code>skipped</code> is the sorted list of jobs that depend, directly or indirectly, on a failed job (failed jobs themselves are not skipped, they run and fail). <code>stages</code> is an array of sorted job-name arrays, one per stage number in increasing order, containing every job that is <b>not</b> skipped; stages that end up empty are removed. Throw <code>Error('Unknown job in needs: DEP (job NAME)')</code> if a job needs a name that is not in <code>jobs</code>, <code>Error('Unknown failed job: NAME')</code> for an unknown name in <code>failed</code>, and <code>Error('Cycle: a -&gt; b -&gt; a')</code> if the needs form a cycle (report the cycle starting at the first repeated job, exploring jobs in alphabetical order and each job's needs in listed order).",
  constraints: [
    "Validate unknown names before looking for cycles; check jobs in alphabetical order.",
    "A job needing itself is a cycle (<code>Cycle: a -&gt; a</code>).",
    "Duplicate names in a <code>needs</code> list count once.",
    "Do not modify the inputs.",
  ],
  example: `planPipeline({
  lint: {}, build: {}, test: { needs: ['build'] }, deploy: { needs: ['test', 'lint'] },
});
// { stages: [['build', 'lint'], ['test'], ['deploy']], skipped: [] }`,
  tags: ["ci-cd","github-actions","graphs","devops"],
  estimatedMins: 50,
  xp: 75,
  starterFiles: [
    {
      name: "planPipeline.js",
      lang: "js",
      code: `// planPipeline.js
function planPipeline(jobs, failed) {
  // your code here
}

module.exports = planPipeline;`,
    },
  ],
  testFile: {
    name: "planPipeline_test.js",
    lang: "test",
    code: `// planPipeline_test.js
const planPipeline = require('./planPipeline');

test('groups_jobs_into_parallel_stages', () => {
  // see the hidden tests for the full checks
  expect(typeof planPipeline).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Normalise first: for every job, <code>needs = [...new Set(jobs[name].needs || [])]</code>. Check every need exists (alphabetical order of jobs), then check <code>failed</code> names.",
    },
    {
      order: 2,
      cost: 5,
      text: "Compute stage numbers with a memoised depth-first search that also tracks the current path; meeting a job already on the path is the cycle, and the message is <code>path.slice(index).concat(name).join(' -&gt; ')</code>.",
    },
    {
      order: 3,
      cost: 10,
      text: "For skipped jobs, a job is skipped if any of its needs is failed or skipped. Because you have stage numbers, you can decide it in increasing stage order (or with the same memoised search).",
    },
  ],
  hiddenTests: [
    {
      name: "groups_jobs_into_parallel_stages",
      code: `const r = planPipeline({ lint: {}, build: {}, test: { needs: ['build'] }, deploy: { needs: ['test', 'lint'] } });
assert(JSON.stringify(r.stages) === JSON.stringify([['build', 'lint'], ['test'], ['deploy']]), 'got ' + JSON.stringify(r.stages));
assert(JSON.stringify(r.skipped) === '[]', 'nothing is skipped without failures');`,
    },
    {
      name: "stage_is_one_more_than_the_deepest_need",
      code: `const r = planPipeline({ a: {}, b: { needs: ['a'] }, c: { needs: ['b'] }, d: { needs: ['a', 'c'] }, e: { needs: ['a'] } });
assert(JSON.stringify(r.stages) === JSON.stringify([['a'], ['b', 'e'], ['c'], ['d']]), 'got ' + JSON.stringify(r.stages));`,
    },
    {
      name: "a_failure_skips_all_downstream_jobs",
      code: `const jobs = { build: {}, test: { needs: ['build'] }, lint: {}, deploy: { needs: ['test', 'lint'] }, notify: { needs: ['deploy'] }, docs: {} };
const r = planPipeline(jobs, ['test']);
assert(JSON.stringify(r.skipped) === JSON.stringify(['deploy', 'notify']), 'deploy and notify depend on test, got ' + JSON.stringify(r.skipped));
assert(JSON.stringify(r.stages) === JSON.stringify([['build', 'docs', 'lint'], ['test']]), 'failed jobs still run, got ' + JSON.stringify(r.stages));`,
    },
    {
      name: "empty_stages_are_removed",
      code: `const r = planPipeline({ a: {}, b: { needs: ['a'] }, c: { needs: ['b'] } }, ['a']);
assert(JSON.stringify(r.stages) === JSON.stringify([['a']]), 'got ' + JSON.stringify(r.stages));
assert(JSON.stringify(r.skipped) === JSON.stringify(['b', 'c']), 'got ' + JSON.stringify(r.skipped));
const s = planPipeline({ x: {}, y: { needs: ['x'] }, z: { needs: ['y'] }, w: { needs: ['z'] }, other: { needs: ['x'] } }, ['y']);
assert(JSON.stringify(s.stages) === JSON.stringify([['x'], ['other', 'y']]), 'stages with no remaining jobs disappear, got ' + JSON.stringify(s.stages));`,
    },
    {
      name: "multiple_failures_and_a_failed_job_downstream_of_another",
      code: `const r = planPipeline({ a: {}, b: { needs: ['a'] }, c: { needs: ['b'] } }, ['a', 'b']);
assert(JSON.stringify(r.skipped) === JSON.stringify(['c']), 'b is failed, not skipped, even though it needs the failed a; got ' + JSON.stringify(r.skipped));
assert(JSON.stringify(r.stages) === JSON.stringify([['a'], ['b']]), 'got ' + JSON.stringify(r.stages));`,
    },
    {
      name: "unknown_names_are_reported",
      code: `let e1 = null; let e2 = null;
try { planPipeline({ b: { needs: ['ghost'] }, a: {} }); } catch (e) { e1 = e; }
try { planPipeline({ a: {} }, ['nope']); } catch (e) { e2 = e; }
assert(e1 && e1.message === 'Unknown job in needs: ghost (job b)', 'got ' + (e1 && e1.message));
assert(e2 && e2.message === 'Unknown failed job: nope', 'got ' + (e2 && e2.message));`,
    },
    {
      name: "cycles_are_reported_with_their_path",
      code: `let e1 = null; let e2 = null; let e3 = null;
try { planPipeline({ a: { needs: ['b'] }, b: { needs: ['c'] }, c: { needs: ['a'] } }); } catch (e) { e1 = e; }
try { planPipeline({ a: { needs: ['a'] } }); } catch (e) { e2 = e; }
try { planPipeline({ ok: {}, x: { needs: ['y'] }, y: { needs: ['x'] } }); } catch (e) { e3 = e; }
assert(e1 && e1.message === 'Cycle: a -> b -> c -> a', 'got ' + (e1 && e1.message));
assert(e2 && e2.message === 'Cycle: a -> a', 'got ' + (e2 && e2.message));
assert(e3 && e3.message === 'Cycle: x -> y -> x', 'got ' + (e3 && e3.message));`,
    },
    {
      name: "duplicate_needs_and_no_mutation",
      code: `const jobs = { a: {}, b: { needs: ['a', 'a'] } };
const failed = ['a'];
const r = planPipeline(jobs, failed);
assert(JSON.stringify(r.skipped) === JSON.stringify(['b']), 'got ' + JSON.stringify(r.skipped));
assert(JSON.stringify(jobs) === JSON.stringify({ a: {}, b: { needs: ['a', 'a'] } }) && failed.length === 1, 'inputs are unchanged');
const empty = planPipeline({});
assert(JSON.stringify(empty) === JSON.stringify({ stages: [], skipped: [] }), 'no jobs, got ' + JSON.stringify(empty));`,
    },
  ],
  solution: {
    code: `function planPipeline(jobs, failed) {
  const names = Object.keys(jobs).sort();
  const needsOf = {};
  for (const name of names) needsOf[name] = [...new Set((jobs[name] && jobs[name].needs) || [])];

  for (const name of names) {
    for (const dep of needsOf[name]) {
      if (!Object.prototype.hasOwnProperty.call(jobs, dep)) {
        throw new Error('Unknown job in needs: ' + dep + ' (job ' + name + ')');
      }
    }
  }
  const failedList = failed || [];
  for (const name of failedList) {
    if (!Object.prototype.hasOwnProperty.call(jobs, name)) throw new Error('Unknown failed job: ' + name);
  }

  const stageOf = {};
  const path = [];
  function visit(name) {
    const at = path.indexOf(name);
    if (at !== -1) throw new Error('Cycle: ' + path.slice(at).concat(name).join(' -> '));
    if (stageOf[name] !== undefined) return stageOf[name];
    path.push(name);
    let stage = 0;
    for (const dep of needsOf[name]) stage = Math.max(stage, visit(dep) + 1);
    path.pop();
    stageOf[name] = stage;
    return stage;
  }
  for (const name of names) visit(name);

  const failedSet = new Set(failedList);
  const skipped = new Set();
  const byStage = names.slice().sort((a, b) => stageOf[a] - stageOf[b] || (a < b ? -1 : 1));
  for (const name of byStage) {
    if (failedSet.has(name)) continue;
    if (needsOf[name].some((dep) => failedSet.has(dep) || skipped.has(dep))) skipped.add(name);
  }

  const stages = [];
  for (const name of names) {
    if (skipped.has(name)) continue;
    (stages[stageOf[name]] = stages[stageOf[name]] || []).push(name);
  }
  return { stages: stages.filter(Boolean), skipped: [...skipped].sort() };
}

module.exports = planPipeline;`,
    explanation:
      "Three separate ideas share one data structure. Validation runs first, in a defined order, so a typo in a job name is reported as an unknown name rather than surfacing later as a confusing cycle. The stage number is longest-path layering: a job is one stage after its deepest dependency, computed with a memoised depth-first search, and the same search keeps the current path so that meeting a job already on it proves a cycle and gives its exact route. Skipping is then a forward pass in stage order, which works because every dependency of a job has a lower stage and has therefore already been classified: a job is skipped if any need failed or was itself skipped, while a failed job is not skipped because it runs and fails. Stages are built by indexing into an array by stage number and filtering the holes, which both orders the stages and drops any stage whose jobs were all skipped.",
  },
};
