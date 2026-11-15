/**
 * Proves a challenge is gradeable before it ships.
 *
 * A challenge is only trustworthy if its hidden tests (a) pass for a correct
 * solution and (b) fail for the starter code. Wrong tests fail good answers
 * silently; weak tests pass bad ones. This runs both through the real grader
 * (`runHiddenTests`, the same function submissions use).
 *
 * Usage:
 *   npm run challenges:verify -- node-dev                 every challenge in a track folder
 *   npm run challenges:verify -- node-dev/event-emitter   one challenge
 *
 * Each challenge `<slug>.js` needs a sibling `<slug>.solution.txt` holding the
 * reference solution, written exactly as a learner would submit it
 * (`module.exports = ...`). It is plain text and not imported by index.js on
 * purpose: the seeder stores every field of a challenge object, so a solution
 * kept on the object would be saved to the database.
 *
 * Locally this uses the child-process runner (isolated-vm doesn't build on
 * Windows). That is enough to check correctness; it says nothing about the
 * production sandbox.
 */

import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import process from "node:process";
import { runHiddenTests } from "../modules/coding-challenges/services/runnerService.js";
import { runCaseTests } from "../modules/coding-challenges/services/judgeRunnerService.js";
import { isJudgeLanguage, isTypedLanguage } from "../../constants/challengeLanguages.js";
import { isTypedSpec, matchesType } from "../../constants/challengeTypes.js";

const CHALLENGES_DIR = join(dirname(fileURLToPath(import.meta.url)), "../seeders/challenges");
const MIN_HIDDEN_TESTS = 4;
const REQUIRED_FIELDS = [
  "slug", "trackId", "layerId", "type", "difficulty", "title", "summary",
  "description", "task", "starterFiles", "hiddenTests", "xp",
];

/**
 * APIs that exist in the local child-process runner but NOT in production.
 * The isolated-vm sandbox hands the code only `global` and a report callback:
 * no timers, console, require, process, Buffer or fetch. A challenge using any
 * of them would pass verification here and then throw a ReferenceError for
 * every learner in production, so they are flagged statically.
 */
const SANDBOX_MISSING = [
  [/\b(setTimeout|setInterval|setImmediate|queueMicrotask)\b/, "timers"],
  [/\bconsole\./, "console"],
  [/\brequire\s*\(/, "require"],
  [/\bprocess\./, "process"],
  [/\bBuffer\b/, "Buffer"],
  [/\bfetch\s*\(/, "fetch"],
];
const missingApis = (code) => SANDBOX_MISSING.filter(([re]) => re.test(code)).map(([, name]) => name);

// A challenge graded on the judge (Python and so on) carries its tests as data
// in `hiddenCases` instead of JavaScript in `hiddenTests`. Verifying one needs
// JUDGE0_URL, because the solution really runs there.
const isCaseChallenge = (c) => Array.isArray(c.hiddenCases);
const testsOf = (c) => (isCaseChallenge(c) ? c.hiddenCases : c.hiddenTests) ?? [];

/** Structural problems that would make a challenge broken or sloppy. */
const lintChallenge = (c) => {
  const problems = [];
  const byCases = isCaseChallenge(c);
  const required = byCases
    ? [...REQUIRED_FIELDS.filter((f) => f !== "hiddenTests"), "functionSpec", "languages"]
    : REQUIRED_FIELDS;
  for (const field of required) {
    if (c[field] === undefined || c[field] === "") problems.push(`missing field "${field}"`);
  }
  const names = testsOf(c).map((t) => t.name);
  if (names.length < MIN_HIDDEN_TESTS) {
    problems.push(`only ${names.length} hidden tests (minimum ${MIN_HIDDEN_TESTS})`);
  }
  if (new Set(names).size !== names.length) problems.push("duplicate hidden test names");
  const source = (c.starterFiles ?? []).find((f) => f.lang !== "test");
  if (!source) problems.push('no editable starter file (every file has lang "test")');
  if (byCases) {
    if (c.hiddenCases.some((t) => !Array.isArray(t.args) || !("expected" in t))) {
      problems.push("a hidden case needs args (an array) and an expected value");
    }
    if (source && !isJudgeLanguage(source.lang)) problems.push(`starter file lang "${source.lang}" is not a judge language`);
    else if (source && !(c.languages ?? []).includes(source.lang)) problems.push(`languages does not list "${source.lang}"`);
    // A typed language bakes every value into the compiled program, so each one
    // must fit its declared type; a mismatch would only surface for learners.
    if ((c.languages ?? []).some(isTypedLanguage)) {
      if (!isTypedSpec(c.functionSpec)) {
        problems.push("functionSpec needs a type for every parameter and for returns (see constants/challengeTypes.js)");
      } else {
        for (const t of c.hiddenCases) {
          const params = c.functionSpec.params;
          if (!Array.isArray(t.args) || t.args.length !== params.length) {
            problems.push(`hidden case "${t.name}" needs ${params.length} args`);
            continue;
          }
          params.forEach((p, i) => {
            if (!matchesType(t.args[i], p.type)) problems.push(`hidden case "${t.name}": ${p.name} is not a ${p.type}`);
          });
          if (!matchesType(t.expected, c.functionSpec.returns)) {
            problems.push(`hidden case "${t.name}": expected is not a ${c.functionSpec.returns}`);
          }
        }
      }
    }
  } else {
    if ((c.hiddenTests ?? []).some((t) => !t.code?.trim())) problems.push("a hidden test has no code");
    if (source && !/\.js$/.test(source.name)) problems.push(`starter file "${source.name}" must end in .js`);
  }
  return problems;
};

const verify = async (file) => {
  const challenge = (await import(pathToFileURL(file).href)).default;
  const label = `${challenge.trackId}/${challenge.slug}`;
  const problems = lintChallenge(challenge);

  const solutionFile = file.replace(/\.js$/, ".solution.txt");
  if (!existsSync(solutionFile)) problems.push(`no reference solution (${basename(solutionFile)})`);

  let starterPassed = null;
  let weakTests = [];
  let solutionResult = null;
  if (problems.length === 0) {
    const source = challenge.starterFiles.find((f) => f.lang !== "test");
    const exportName = source.name.replace(/\.[^.]+$/, ""); // same rule as submissionService

    const byCases = isCaseChallenge(challenge);
    const tests = testsOf(challenge);
    const run = byCases
      ? (code) => runCaseTests(source.lang, code, challenge.functionSpec, tests)
      : (code) => runHiddenTests(code, exportName, tests);

    const starter = await run(source.code);
    starterPassed = starter.results.filter((r) => r.passed).length;
    // A test the starter already passes would pass for a learner who wrote
    // nothing. Not an error (some tests guard against over-engineering), but
    // worth a look.
    weakTests = starter.results.filter((r) => r.passed).map((r) => r.name);
    if (!starter.fatal && starterPassed === tests.length) {
      problems.push("the starter code already passes every hidden test, so they check nothing");
    }

    const solutionCode = await readFile(solutionFile, "utf-8");
    // The missing-API list describes the JavaScript sandbox only.
    for (const t of byCases ? [] : tests) {
      const apis = missingApis(t.code);
      if (apis.length) problems.push(`hidden test "${t.name}" uses ${apis.join(", ")}, which the production sandbox doesn't have`);
    }
    const solutionApis = byCases ? [] : missingApis(solutionCode);
    if (solutionApis.length) problems.push(`reference solution uses ${solutionApis.join(", ")}, which the production sandbox doesn't have`);

    solutionResult = await run(solutionCode);
    if (solutionResult.fatal) {
      problems.push(`solution did not run: ${solutionResult.error ?? solutionResult.results[0]?.message}`);
    }
    for (const r of solutionResult.results.filter((t) => !t.passed)) {
      problems.push(`solution fails "${r.name}": ${r.message}`);
    }
  }

  const total = testsOf(challenge).length;
  const solutionPassed = solutionResult?.results.filter((r) => r.passed).length ?? 0;
  return { label, problems, total, starterPassed, solutionPassed, weakTests };
};

const collect = async (target) => {
  const dir = join(CHALLENGES_DIR, target);
  if (existsSync(dir) && (await readdir(dir)).length) {
    return (await readdir(dir))
      .filter((f) => f.endsWith(".js") && !f.endsWith(".solution.js"))
      .map((f) => join(dir, f));
  }
  const single = `${join(CHALLENGES_DIR, target)}.js`;
  if (existsSync(single)) return [single];
  throw new Error(`No track folder or challenge found for "${target}"`);
};

const target = process.argv[2];
if (!target) {
  console.error("Usage: npm run challenges:verify -- <track> | <track>/<slug>");
  process.exit(1);
}

const files = await collect(target);
let failed = 0;
for (const file of files) {
  const r = await verify(file);
  const ok = r.problems.length === 0;
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${r.label}`);
  if (r.total) {
    console.log(`      solution ${r.solutionPassed}/${r.total} tests pass · starter ${r.starterPassed ?? "?"}/${r.total} pass`);
  }
  for (const p of r.problems) console.log(`      - ${p}`);
  if (ok && r.weakTests.length) console.log(`      note: starter already passes ${r.weakTests.join(", ")}`);
}
console.log(`\n${files.length - failed}/${files.length} challenges verified`);
process.exit(failed ? 1 : 0);
