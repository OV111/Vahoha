/**
 * Proves a challenge is gradeable before it ships.
 *
 * A challenge is only trustworthy if its hidden tests (a) pass for a correct
 * solution and (b) fail for the starter code. Wrong tests fail good answers
 * silently; weak tests pass bad ones. This runs both through the real graders
 * (`runHiddenTests` and `runCaseTests`, the same functions submissions use),
 * once for every language the challenge is offered in.
 *
 * Usage:
 *   npm run challenges:verify -- node-dev                 every challenge in a track folder
 *   npm run challenges:verify -- node-dev/event-emitter   one challenge
 *
 * Reference solutions sit next to `<slug>.js`, written exactly as a learner
 * would submit them:
 *   - JavaScript: `<slug>.solution.txt` (`module.exports = ...`), or else the
 *     challenge's own `solution.code`
 *   - a judge language: `<slug>.solution.<ext>`, e.g. `.solution.py`; a
 *     challenge written for one judge language may use `.solution.txt`
 * They are not imported by index.js on purpose: the seeder stores every field
 * of a challenge object, so a solution kept on the object would be saved to
 * the database.
 *
 * Locally this uses the child-process runner (isolated-vm doesn't build on
 * Windows). That is enough to check correctness; it says nothing about the
 * production sandbox. Judge languages need JUDGE0_URL, because the solution
 * really runs there.
 */

import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import process from "node:process";
import dotenv from "dotenv";
import { runHiddenTests } from "../modules/coding-challenges/services/runnerService.js";
import { runCaseTests } from "../modules/coding-challenges/services/judgeRunnerService.js";
import {
  JUDGE_LANGUAGES,
  isJudgeLanguage,
  isTypedLanguage,
  judgeStarter,
} from "../../constants/challengeLanguages.js";
import { isTypedSpec, matchesType } from "../../constants/challengeTypes.js";

dotenv.config({ path: join(dirname(fileURLToPath(import.meta.url)), "../.env"), quiet: true });

const CHALLENGES_DIR = join(dirname(fileURLToPath(import.meta.url)), "../seeders/challenges");
const MIN_HIDDEN_TESTS = 4;
const REQUIRED_FIELDS = [
  "slug", "trackId", "layerId", "type", "difficulty", "title", "summary",
  "description", "task", "starterFiles", "xp",
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
  // Not a method of the same name, like a module registry's `r.require()`.
  [/(?<![.\w$])require\s*\(/, "require"],
  [/\bprocess\./, "process"],
  [/\bBuffer\b/, "Buffer"],
  [/\bfetch\s*\(/, "fetch"],
];
const missingApis = (code) => SANDBOX_MISSING.filter(([re]) => re.test(code)).map(([, name]) => name);

// Tests come in two forms. JavaScript and TypeScript run `hiddenTests`, which
// are JavaScript code. A judge language (Python and so on) runs `hiddenCases`,
// which are data, and needs `functionSpec` to call the function. One challenge
// can carry both and be offered in all of its `languages`.
const hasCases = (c) => Array.isArray(c.hiddenCases);
const hasJsTests = (c) => Array.isArray(c.hiddenTests) && c.hiddenTests.length > 0;
const judgeLanguagesOf = (c) => (c.languages ?? []).filter(isJudgeLanguage);
const mainSource = (c) => (c.starterFiles ?? []).find((f) => f.lang !== "test");

const lintTestNames = (label, tests, problems) => {
  const names = tests.map((t) => t.name);
  if (names.length < MIN_HIDDEN_TESTS) problems.push(`only ${names.length} ${label} (minimum ${MIN_HIDDEN_TESTS})`);
  if (new Set(names).size !== names.length) problems.push(`duplicate ${label} names`);
};

const lintTypedCases = (c, problems) => {
  if (!isTypedSpec(c.functionSpec)) {
    problems.push("functionSpec needs a type for every parameter and for returns (see constants/challengeTypes.js)");
    return;
  }
  const params = c.functionSpec.params;
  for (const t of c.hiddenCases) {
    if (!Array.isArray(t.args) || t.args.length !== params.length) {
      problems.push(`hidden case "${t.name}" needs ${params.length} args`);
      continue;
    }
    params.forEach((p, i) => {
      if (!matchesType(t.args[i], p.type)) problems.push(`hidden case "${t.name}": ${p.name} is not a ${p.type}`);
    });
    if (!("throws" in t) && !matchesType(t.expected, c.functionSpec.returns)) {
      problems.push(`hidden case "${t.name}": expected is not a ${c.functionSpec.returns}`);
    }
  }
};

/** Structural problems that would make a challenge broken or sloppy. */
const lintChallenge = (c) => {
  const problems = [];
  const judged = judgeLanguagesOf(c);
  const required = [...REQUIRED_FIELDS];
  if (!hasCases(c)) required.push("hiddenTests");
  if (hasCases(c)) required.push("functionSpec", "languages");
  for (const field of required) {
    if (c[field] === undefined || c[field] === "") problems.push(`missing field "${field}"`);
  }

  const source = mainSource(c);
  if (!source) problems.push('no editable starter file (every file has lang "test")');

  if (hasJsTests(c)) {
    lintTestNames("hidden tests", c.hiddenTests, problems);
    if (c.hiddenTests.some((t) => !t.code?.trim())) problems.push("a hidden test has no code");
    if (source && !/\.js$/.test(source.name)) problems.push(`starter file "${source.name}" must end in .js`);
    if (c.languages && !c.languages.includes("js")) problems.push('has JavaScript tests but languages does not list "js"');
  }

  if (judged.length && !hasCases(c)) problems.push(`languages lists ${judged.join(", ")} but there are no hiddenCases`);
  if (hasCases(c)) {
    lintTestNames("hidden cases", c.hiddenCases, problems);
    if (c.hiddenCases.some((t) => !Array.isArray(t.args) || !("expected" in t || "throws" in t))) {
      problems.push("a hidden case needs args (an array) and an expected value or throws");
    }
    if (!judged.length) problems.push("hiddenCases but languages lists no judge language");
    if (!hasJsTests(c) && source && !judged.includes(source.lang)) {
      problems.push(`starter file lang "${source.lang}" is not one of the judge languages`);
    }
    // A typed language bakes every value into the compiled program, so each one
    // must fit its declared type; a mismatch would only surface for learners.
    if (judged.some(isTypedLanguage)) lintTypedCases(c, problems);
  }
  return problems;
};

const extOf = (language) => JUDGE_LANGUAGES.find((l) => l.id === language)?.ext;

/** The reference solution for one language (see the header), or null. */
const readSolution = async (file, challenge, language) => {
  const base = file.replace(/\.js$/, "");
  const candidates = language === "js" ? [`${base}.solution.txt`] : [`${base}.solution.${extOf(language)}`];
  if (language !== "js" && mainSource(challenge)?.lang === language) candidates.push(`${base}.solution.txt`);
  for (const path of candidates) if (existsSync(path)) return readFile(path, "utf-8");
  if (language === "js" && challenge.solution?.code) return challenge.solution.code;
  return null;
};

const verifyLanguage = async (file, challenge, language) => {
  const problems = [];
  const notes = [];
  const source = mainSource(challenge);
  const onJudge = language !== "js";
  const tests = onJudge ? challenge.hiddenCases : challenge.hiddenTests;
  const exportName = source.name.replace(/\.[^.]+$/, ""); // same rule as submissionService
  // A judge language without its own starter file gets the generated one, as in the Arena.
  const starterCode = onJudge && source.lang !== language ? judgeStarter(language, challenge.functionSpec) : source.code;
  const run = onJudge
    ? (code) => runCaseTests(language, code, challenge.functionSpec, tests)
    : (code) => runHiddenTests(code, exportName, tests);

  const solutionCode = await readSolution(file, challenge, language);
  if (solutionCode === null) {
    return { language, problems: [`no reference solution`], total: tests.length, weakTests: [] };
  }

  const starter = await run(starterCode);
  const starterPassed = starter.results.filter((r) => r.passed).length;
  // A test the starter already passes would pass for a learner who wrote
  // nothing. Not an error (some tests guard against over-engineering), but
  // worth a look.
  const weakTests = starter.results.filter((r) => r.passed).map((r) => r.name);
  if (!starter.fatal && starterPassed === tests.length) {
    problems.push("the starter code already passes every hidden test, so they check nothing");
  }

  // The missing-API list describes the JavaScript sandbox only.
  if (!onJudge) {
    for (const t of tests) {
      const apis = missingApis(t.code);
      if (apis.length) problems.push(`hidden test "${t.name}" uses ${apis.join(", ")}, which the production sandbox doesn't have`);
    }
    // Only a note: solutions often name a timer or console as a default
    // parameter that the hidden tests replace with a fake, which is fine.
    const solutionApis = missingApis(solutionCode);
    if (solutionApis.length) notes.push(`reference solution mentions ${solutionApis.join(", ")}; make sure the tests inject a fake`);
  }

  const solution = await run(solutionCode);
  if (solution.fatal) problems.push(`solution did not run: ${solution.error ?? solution.results[0]?.message}`);
  for (const r of solution.results.filter((t) => !t.passed)) problems.push(`solution fails "${r.name}": ${r.message}`);

  return {
    language,
    problems,
    total: tests.length,
    starterPassed,
    solutionPassed: solution.results.filter((r) => r.passed).length,
    weakTests,
    notes,
  };
};

const verify = async (file) => {
  const challenge = (await import(pathToFileURL(file).href)).default;
  const label = `${challenge.trackId}/${challenge.slug}`;
  const problems = lintChallenge(challenge);
  if (problems.length) return { label, problems, runs: [] };

  const languages = [...(hasJsTests(challenge) ? ["js"] : []), ...judgeLanguagesOf(challenge)];
  const runs = [];
  for (const language of languages) runs.push(await verifyLanguage(file, challenge, language));
  return { label, problems: runs.flatMap((r) => r.problems.map((p) => `[${r.language}] ${p}`)), runs };
};

const collect = async (target) => {
  const dir = join(CHALLENGES_DIR, target);
  if (existsSync(dir) && (await readdir(dir)).length) {
    return (await readdir(dir)).filter((f) => f.endsWith(".js")).map((f) => join(dir, f));
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
  for (const run of r.runs) {
    if (run.solutionPassed === undefined) continue;
    console.log(`      ${run.language}: solution ${run.solutionPassed}/${run.total} · starter ${run.starterPassed}/${run.total}`);
    if (run.weakTests.length) console.log(`      note (${run.language}): starter already passes ${run.weakTests.join(", ")}`);
    for (const note of run.notes ?? []) console.log(`      note (${run.language}): ${note}`);
  }
  for (const p of r.problems) console.log(`      - ${p}`);
}
console.log(`\n${files.length - failed}/${files.length} challenges verified`);
process.exit(failed ? 1 : 0);
