// Grades one lab task against the learner's files. Pure: the runner is passed
// in, so the browser uses the sandboxed Web Worker (useCodeRunner) and tests
// use testRunnerCore directly.
//
// Returns { passed, tests: [{ name, ok, message?, group? }] } in the shape the
// results dock shows.
//
//   fix / write  one run: the learner's file against the task's tests.
//   review       four checks, so the learner has to PROVE the problem:
//                1. the AI's own tests still pass on the learner's code
//                2. the learner's test fails on the AI's original code
//                3. the learner's test passes on their fix
//                4. the hidden production tests pass on their fix

/** @typedef {(files: {name: string, lang?: string, code: string}[]) => Promise<{name: string, passed: boolean, message?: string}[]>} Runner */

const asTests = (results, group) =>
  results.map((r) => ({ name: r.name, ok: Boolean(r.passed), ...(r.passed ? {} : { message: r.message }), ...(group ? { group } : {}) }));

const runWith = (run, file, code, testName, tests) =>
  run([
    { name: file, code },
    { name: testName, lang: "test", code: tests },
  ]);

/**
 * @param {object} task  a lab task (content/schema.js)
 * @param {Record<string, string>} files  file name -> the learner's current code
 * @param {Runner} run
 */
export async function checkTask(task, files, run) {
  const code = files[task.file] ?? task.starter;

  if (task.type !== "review") {
    const tests = asTests(await runWith(run, task.file, code, "lab.test.js", task.tests));
    return { passed: tests.length > 0 && tests.every((t) => t.ok), tests };
  }

  const learnerTest = files[task.testFile] ?? task.testStarter;
  // Sequential on purpose: each run gets a fresh worker, and order keeps the
  // results list stable.
  const happy = asTests(await runWith(run, task.file, code, "happy.test.js", task.happyTests), "AI's tests");
  const onAiCode = await runWith(run, task.file, task.starter, task.testFile, learnerTest);
  const onFix = await runWith(run, task.file, code, task.testFile, learnerTest);
  const hidden = asTests(await runWith(run, task.file, code, "hidden.test.js", task.tests), "Hidden tests");

  const wroteATest = onAiCode.length > 0 && !/Could not load|No test file/.test(onAiCode[0]?.message ?? "");
  const catchesBug = wroteATest && onAiCode.some((r) => !r.passed);
  const passesFix = onFix.length > 0 && onFix.every((r) => r.passed);

  const yours = [
    {
      name: "Your test fails on the AI's code",
      ok: catchesBug,
      group: "Your test",
      ...(catchesBug
        ? {}
        : {
            message: wroteATest
              ? "Your test passes on the AI's code, so it doesn't prove the problem yet."
              : onAiCode[0]?.message ?? "Write at least one test in your test file.",
          }),
    },
    {
      name: "Your test passes on your fix",
      ok: passesFix,
      group: "Your test",
      ...(passesFix ? {} : { message: onFix.find((r) => !r.passed)?.message ?? "Your test file has no tests yet." }),
    },
  ];

  const tests = [...happy, ...yours, ...hidden];
  return { passed: tests.every((t) => t.ok), tests };
}

/**
 * The "name it" question for a task, or null when the task has none.
 * fix: free text, then the real cause is shown to compare.
 * review: pick the risk; checked against the task's risk.
 */
export const RISKS = ["concurrency", "security", "performance", "boundary"];
const label = (risk) => risk[0].toUpperCase() + risk.slice(1);

export function nameItFor(task) {
  if (task.type === "fix") {
    return {
      question: "What was the bug?",
      placeholder: "In one line: why did it fail?",
      explanation: task.cause,
    };
  }
  if (task.type === "review") {
    return {
      question: "What was the risk?",
      choices: RISKS.map(label),
      answer: label(task.risk),
      wrongHint: "Not quite. Look again at what your test proved.",
      explanation: task.riskNote,
    };
  }
  return null;
}
