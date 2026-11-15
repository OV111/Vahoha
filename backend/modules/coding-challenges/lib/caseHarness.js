// Grading for challenges whose tests are data instead of JavaScript code.
//
// A case is { name, args, expected }: call the learner's function with `args`
// and compare what it returns with `expected`. Because a case is plain JSON, the
// same cases grade a solution in any language.
//
// The split that makes this safe: the sandbox only CALLS the function and
// prints what came back. The expected values never enter the sandbox, and the
// comparison happens here, on the server. So the learner's code has nothing to
// read an answer from, and a forged report can only pass by containing the
// right answers, which is solving the challenge.
//
// Pure: no network, no database. judgeRunnerService.js does the running.

import { isDeepStrictEqual } from "node:util";
import { JUDGE_LANGUAGES } from "../../../../constants/challengeLanguages.js";
import { buildCppProgram } from "./harness/cpp.js";
import { buildGoProgram } from "./harness/go.js";
import { buildJavaProgram } from "./harness/java.js";
import { REPORT_MARKER } from "./harness/report.js";

export { REPORT_MARKER };

const MAX_SHOWN_CHARS = 200;

// The dynamic languages' harnesses are constants: the learner's code, the
// function name and the arguments all arrive as JSON on stdin, so nothing is
// ever spliced into program text. The typed languages are compiled together
// with the learner's file instead (see ./harness).
const PYTHON_HARNESS = `
import io, json, sys, time

_payload = json.loads(sys.stdin.read())
_stdout = sys.stdout
sys.stdout = io.StringIO()
_report = {}

def _describe(err):
    try:
        return type(err).__name__ + ": " + str(err)
    except BaseException:
        return "Unreadable error"

try:
    _scope = {"__name__": "solution"}
    exec(compile(_payload["code"], "solution.py", "exec"), _scope)
    _fn = _scope.get(_payload["fn"])
    if not callable(_fn):
        raise NameError("your file must define a function named " + _payload["fn"])
except BaseException as err:
    _report["fatal"] = _describe(err)
else:
    _cases = []
    for _args in _payload["cases"]:
        _started = time.perf_counter()
        try:
            _entry = {"ok": True, "value": json.dumps(_fn(*_args), allow_nan=False)}
        except BaseException as err:
            _entry = {"ok": False, "error": _describe(err)}
        _entry["ms"] = round((time.perf_counter() - _started) * 1000)
        _cases.append(_entry)
    _report["cases"] = _cases

_stdout.write(${JSON.stringify(REPORT_MARKER)} + json.dumps(_report))
`;

const RUBY_HARNESS = `
require "json"
require "stringio"

payload = JSON.parse($stdin.read)
real_stdout = $stdout
$stdout = StringIO.new
report = {}

describe = lambda do |err|
  begin
    err.class.name + ": " + err.message.to_s
  rescue Exception
    "Unreadable error"
  end
end

begin
  eval(payload["code"], TOPLEVEL_BINDING, "solution.rb")
  unless respond_to?(payload["fn"], true)
    raise NameError, "your file must define a method named " + payload["fn"]
  end
rescue Exception => err
  report["fatal"] = describe.call(err)
else
  report["cases"] = payload["cases"].map do |args|
    started = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    entry = begin
      { "ok" => true, "value" => JSON.generate(send(payload["fn"], *args)) }
    rescue Exception => err
      { "ok" => false, "error" => describe.call(err) }
    end
    entry["ms"] = ((Process.clock_gettime(Process::CLOCK_MONOTONIC) - started) * 1000).round
    entry
  end
end

real_stdout.write(${JSON.stringify(REPORT_MARKER)} + JSON.generate(report))
`;

// The learner's file starts with "<?php", so it is evaluated after a closing
// tag. Anything outside the tags is output, and the output buffer swallows it.
const PHP_HARNESS = `<?php
$payload = json_decode(stream_get_contents(STDIN), true);
ob_start();
$report = [];
$describe = function ($err) {
    return get_class($err) . ": " . $err->getMessage();
};

try {
    eval("?>" . $payload["code"]);
    if (!function_exists($payload["fn"])) {
        throw new Exception("your file must define a function named " . $payload["fn"]);
    }
} catch (Throwable $err) {
    $report["fatal"] = $describe($err);
}

if (!isset($report["fatal"])) {
    $cases = [];
    foreach ($payload["cases"] as $args) {
        $started = hrtime(true);
        try {
            $value = call_user_func_array($payload["fn"], $args);
            $entry = ["ok" => true, "value" => json_encode($value, JSON_THROW_ON_ERROR | JSON_PRESERVE_ZERO_FRACTION)];
        } catch (Throwable $err) {
            $entry = ["ok" => false, "error" => $describe($err)];
        }
        $entry["ms"] = intdiv(hrtime(true) - $started, 1000000);
        $cases[] = $entry;
    }
    $report["cases"] = $cases;
}

while (ob_get_level() > 0) {
    ob_end_clean();
}
fwrite(STDOUT, ${JSON.stringify(REPORT_MARKER)} . json_encode($report));
`;

const HARNESSES = {
  python: PYTHON_HARNESS,
  ruby: RUBY_HARNESS,
  php: PHP_HARNESS,
};

const PROGRAM_BUILDERS = {
  java: buildJavaProgram,
  cpp: buildCppProgram,
  go: buildGoProgram,
};

export const hasHarness = (language) =>
  Object.hasOwn(HARNESSES, language) || Object.hasOwn(PROGRAM_BUILDERS, language);

/**
 * The program and the stdin to send to the judge.
 *
 * @param {string} language
 * @param {string} code  the learner's file
 * @param {{ name: string, params: unknown[], returns?: string }} functionSpec
 *   typed (see constants/challengeTypes.js) for Java, C++ and Go
 * @param {{ args: unknown[] }[]} cases
 */
export const buildCaseRun = (language, code, functionSpec, cases) => {
  if (Object.hasOwn(PROGRAM_BUILDERS, language)) {
    return { sourceCode: PROGRAM_BUILDERS[language](code, functionSpec, cases), stdin: "" };
  }
  const functionName = JUDGE_LANGUAGES.find((l) => l.id === language).functionName(functionSpec.name);
  return {
    sourceCode: HARNESSES[language],
    stdin: JSON.stringify({ code, fn: functionName, cases: cases.map((c) => c.args) }),
  };
};

const shown = (text) => (text.length > MAX_SHOWN_CHARS ? `${text.slice(0, MAX_SHOWN_CHARS)}…` : text);

/** The harness report from a run's stdout, or null when there is none. */
export const parseCaseReport = (stdout) => {
  const at = String(stdout ?? "").lastIndexOf(REPORT_MARKER);
  if (at === -1) return null;
  try {
    const report = JSON.parse(stdout.slice(at + REPORT_MARKER.length));
    return report && typeof report === "object" ? report : null;
  } catch {
    return null;
  }
};

/**
 * Compare a report with the cases. The report comes out of the sandbox, so it
 * is untrusted: anything not shaped as expected is a failed case, never a pass.
 *
 * @returns {{ results: {name:string, passed:boolean, ms:number, message?:string}[], fatal: boolean, error?: string }}
 */
export const gradeCaseReport = (report, cases) => {
  if (typeof report?.fatal === "string") {
    return { results: [], fatal: true, error: `Your file could not be loaded: ${shown(report.fatal)}` };
  }
  if (!Array.isArray(report?.cases) || report.cases.length !== cases.length) {
    return { results: [], fatal: true, error: "The sandbox produced no result." };
  }

  const results = cases.map((testCase, i) => {
    const entry = report.cases[i] ?? {};
    const ms = Number.isFinite(entry.ms) ? entry.ms : 0;
    const failed = (message) => ({ name: testCase.name, passed: false, ms, message });

    if (entry.ok !== true) {
      return failed(typeof entry.error === "string" ? shown(entry.error) : "The function did not return.");
    }
    let value;
    try {
      value = JSON.parse(entry.value);
    } catch {
      return failed("The function returned a value that cannot be compared.");
    }
    return isDeepStrictEqual(value, testCase.expected)
      ? { name: testCase.name, passed: true, ms }
      : failed(`Wrong answer: returned ${shown(entry.value)}`);
  });
  return { results, fatal: false };
};
