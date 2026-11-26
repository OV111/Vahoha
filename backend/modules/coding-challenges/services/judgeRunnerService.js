/**
 * Runs a learner's solution against a challenge's hidden cases in a language
 * the JavaScript sandbox cannot run, through the remote judge.
 *
 * Returns the same shape as runnerService.runHiddenTests, so the submission
 * flow treats both runners alike.
 */

import { isJudgeLanguage } from "#shared/challengeLanguages.js";
import { buildCaseRun, gradeCaseReport, hasHarness, parseCaseReport } from "../lib/caseHarness.js";
import { describeJudge, runCode } from "./judge0Client.js";

const fatal = (error) => ({ results: [], fatal: true, error });

const firstLines = (text, count) => String(text).trim().split("\n").slice(0, count).join("\n");
const lastLine = (text) => String(text).trim().split("\n").pop() ?? "";

/**
 * @param {string} language  an id from JUDGE_LANGUAGES
 * @param {string} code      the learner's file
 * @param {{ name: string, params: unknown[], returns?: string }} functionSpec  the function the cases call
 * @param {{ name: string, args: unknown[], expected: unknown }[]} cases
 * @returns {Promise<{results: Array<{name,passed,ms,message?}>, fatal: boolean, error?: string}>}
 */
export const runCaseTests = async (language, code, functionSpec, cases) => {
  if (!Array.isArray(cases) || cases.length === 0 || !functionSpec?.name) {
    return fatal("This challenge has no hidden tests for this language yet.");
  }
  if (!isJudgeLanguage(language) || !hasHarness(language)) return fatal("This language is not supported yet.");

  const run = await runCode({ language, ...buildCaseRun(language, code, functionSpec, cases) });

  if (run.status === "engine_error") {
    const err = new Error("This language is temporarily unavailable. Please try again in a moment.");
    err.status = 503;
    throw err;
  }
  if (run.status === "time_limit") {
    return fatal(`Execution exceeded ${describeJudge().cpuTimeLimitS}s. Check for an infinite loop.`);
  }
  if (run.status === "compile_error") {
    // Still out of compile time after the retry: the server is slow, not the code wrong.
    if (/^Compilation time limit exceeded/.test(run.compileOutput.trim())) {
      return fatal("The code server took too long to compile your code. This is on our side; please submit again.");
    }
    return fatal(`Your code did not compile:\n${firstLines(run.compileOutput, 6)}`);
  }
  if (run.status === "runtime_error" && /Segmentation fault/.test(run.stderr)) {
    // Shell noise like "run.sh: line 1: 3 Segmentation fault (core dumped)" tells a learner nothing.
    return fatal(
      "Your program crashed with a segmentation fault: it read memory it does not own, such as an index past the end of a vector or a null pointer.",
    );
  }

  const report = parseCaseReport(run.stdout);
  if (!report) {
    // The process died before the harness could report: out of memory, a hard
    // exit, or a crash in native code (a C++ segfault has no stderr at all).
    const detail = lastLine(run.stderr) || run.message;
    return fatal(detail ? `Your program stopped before it finished: ${detail}` : "The sandbox produced no result.");
  }
  return gradeCaseReport(report, cases);
};
