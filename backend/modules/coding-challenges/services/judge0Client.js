/**
 * Client for Judge0, the engine that runs learner code in the languages the
 * isolated-vm runner cannot (everything that is not JavaScript).
 *
 * This is the only file that knows Judge0's API. Callers get an engine-neutral
 * result, so replacing Judge0 with another engine means rewriting this file and
 * nothing else.
 *
 * Judge0 only RUNS the code here. Whether a test passed is decided by the
 * caller from the program's output, so `expected_output` is never sent.
 */

import { Buffer } from "node:buffer";
import process from "node:process";

const CPU_TIME_LIMIT_S = 5;
const WALL_TIME_LIMIT_S = 10;
const MEMORY_LIMIT_KB = 128_000;


const REQUEST_TIMEOUT_MS = 20_000;
const POLL_INTERVAL_MS = 500;
const POLL_DEADLINE_MS = 30_000;

const FIELDS = "token,status,stdout,stderr,compile_output,message,time,memory";

// What Judge0 writes as compile output when compiling ran out of time.
const COMPILE_TIMEOUT = /^Compilation time limit exceeded\.?$/;

// Judge0 status ids: 1 queued, 2 processing, 3 accepted, 4 wrong answer,
// 5 time limit, 6 compilation error, 7-12 runtime errors, 13-14 engine faults.
const FIRST_FINISHED_STATUS = 3;
const statusOf = (id) => {
  if (id === 3 || id === 4) return "ok";
  if (id === 5) return "time_limit";
  if (id === 6) return "compile_error";
  if (id >= 7 && id <= 12) return "runtime_error";
  return "engine_error";
};

const config = (env = process.env) => ({
  url: (env.JUDGE0_URL ?? "").trim().replace(/\/+$/, ""),
  token: (env.JUDGE0_AUTH_TOKEN ?? "").trim() || null,
});

export const describeJudge = (env = process.env) => ({
  engine: "judge0",
  available: Boolean(config(env).url),
  cpuTimeLimitS: CPU_TIME_LIMIT_S,
  memoryLimitKb: MEMORY_LIMIT_KB,
});

// Base64 both ways: Judge0 rejects a response whose output is not valid UTF-8
// unless it is encoded, and a learner's program can print any bytes.
const encode = (text) => Buffer.from(String(text ?? ""), "utf8").toString("base64");
const decode = (text) => (text == null ? "" : Buffer.from(text, "base64").toString("utf8"));

// The message goes to the learner, so it never carries the engine's own error
// text, which can name hosts and paths. The detail is logged instead.
const unavailable = (detail) => {
  console.error(`judge0: ${detail}`);
  const err = new Error("This language is temporarily unavailable. Please try again in a moment.");
  err.status = 503;
  return err;
};

const request = async (path, init = {}) => {
  const { url, token } = config();
  if (!url) throw unavailable("JUDGE0_URL is not set");

  let response;
  try {
    response = await fetch(`${url}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "X-Auth-Token": token } : {}),
      },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (err) {
    throw unavailable(`request failed: ${err.message}`);
  }
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw unavailable(`HTTP ${response.status}: ${body.slice(0, 300)}`);
  }
  return response.json();
};

// Our language id -> how Judge0 names it. The numeric id is looked up from the
// server's own list and the newest version wins, because the ids and versions
// on offer differ between Judge0 servers (a self-hosted one is usually older
// than the public one).
const LANGUAGE_NAMES = {
  python: /^Python \(3\./,
  ruby: /^Ruby \(/,
  php: /^PHP \(/,
  java: /^Java \(/,
  // GCC rather than Clang: the public server's Clang C++ is years older.
  cpp: /^C\+\+ \(GCC /,
  go: /^Go \(/,
};

// The first number inside the brackets: "(3.12.5)", "(JDK 17.0.6)", "(GCC 14.1.0)".
const versionOf = (name) => (name.match(/\([^\d)]*([\d.]+)/)?.[1] ?? "0").split(".").map(Number);
const newerFirst = (a, b) => {
  const [x, y] = [versionOf(a.name), versionOf(b.name)];
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    if ((x[i] ?? 0) !== (y[i] ?? 0)) return (y[i] ?? 0) - (x[i] ?? 0);
  }
  return 0;
};

let languageList = null;
const resolveLanguage = async (language) => {
  const pattern = LANGUAGE_NAMES[language];
  if (!pattern) throw unavailable(`no Judge0 mapping for language "${language}"`);
  // A failed fetch is not kept, so the next run asks again.
  languageList ??= request("/languages").catch((err) => {
    languageList = null;
    throw err;
  });
  const match = (await languageList).filter((l) => pattern.test(l.name)).sort(newerFirst)[0];
  if (!match) throw unavailable(`this Judge0 server offers no "${language}"`);
  return match;
};

/** Which version of a language this server runs, e.g. "Python (3.12.5)". */
export const languageVersion = async (language) => (await resolveLanguage(language)).name;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// `wait=true` normally returns the finished run. An instance can turn that off
// or give up waiting, and then only a token (or an unfinished status) comes
// back, so the result is fetched by token until it is finished.
const waitForResult = async (first) => {
  let result = first;
  const deadline = Date.now() + POLL_DEADLINE_MS;
  while (!(result.status?.id >= FIRST_FINISHED_STATUS)) {
    if (!result.token) throw unavailable("no status and no token in the response");
    if (Date.now() > deadline) throw unavailable("the run did not finish in time");
    await sleep(POLL_INTERVAL_MS);
    result = await request(`/submissions/${result.token}?base64_encoded=true&fields=${FIELDS}`);
  }
  return result;
};

/**
 * Run one program.
 *
 * @param {{ language: string, sourceCode: string, stdin?: string }} run  language is an id from JUDGE_LANGUAGES
 * @returns {Promise<{
 *   status: "ok"|"time_limit"|"compile_error"|"runtime_error"|"engine_error",
 *   stdout: string, stderr: string, compileOutput: string, message: string,
 *   timeMs: number|null, memoryKb: number|null,
 * }>}  "ok" means the program ran and exited normally, not that its answer is right.
 */
export const runCode = async ({ language, sourceCode, stdin = "" }) => {
  const { id: languageId } = await resolveLanguage(language);
  const submit = async () => {
    const first = await request(`/submissions?base64_encoded=true&wait=true&fields=${FIELDS}`, {
      method: "POST",
      body: JSON.stringify({
        language_id: languageId,
        source_code: encode(sourceCode),
        stdin: encode(stdin),
        cpu_time_limit: CPU_TIME_LIMIT_S,
        wall_time_limit: WALL_TIME_LIMIT_S,
        memory_limit: MEMORY_LIMIT_KB,
        enable_network: false,
      }),
    });
    return waitForResult(first);
  };

  // The compile step has a time limit of the server's own, which the request
  // cannot raise. Go sits close to it on the public server: the same program
  // compiled in about 5 of 6 tries. Running out of compile time says nothing
  // about the learner's code, so it gets one more try.
  let result = await submit();
  if (statusOf(result.status.id) === "compile_error" && COMPILE_TIMEOUT.test(decode(result.compile_output))) {
    result = await submit();
  }

  const status = statusOf(result.status.id);
  if (status === "engine_error") {
    console.error(`judge0: engine fault (status ${result.status.id}): ${decode(result.message).slice(0, 300)}`);
  }
  return {
    status,
    stdout: decode(result.stdout),
    stderr: decode(result.stderr),
    compileOutput: decode(result.compile_output),
    message: decode(result.message),
    timeMs: result.time == null ? null : Math.round(Number(result.time) * 1000),
    memoryKb: result.memory ?? null,
  };
};
