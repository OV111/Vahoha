/**
 * Judge0 runner: grades whole-program ("stdio") challenges.
 *
 * Judge0 is a separate service on its own machine, so the learner's code never
 * runs next to this process's secrets. This file only speaks HTTP to it.
 *
 * Each hidden test is one Judge0 submission { source, stdin, expected_output }.
 * Judge0 compares stdout itself and reports status 3 (Accepted) or 4 (Wrong
 * Answer). The expected output travels server -> Judge0 only; the learner's
 * program cannot read it, which makes this path harder to cheat than the JS
 * harness (where code and tests share a process).
 *
 * The result has the same shape as runnerService.runHiddenTests, so
 * submissionService grades both identically:
 *   { results: [{ name, passed, ms, message? }], fatal: boolean, error?: string }
 *
 * Env: JUDGE0_URL (no trailing slash), JUDGE0_TOKEN (sent as X-Auth-Token).
 */

import process from "node:process";
import { Buffer } from "node:buffer";
import { stdioLanguage } from "../../../../constants/challengeLanguages.js";

const DEFAULT_TIME_LIMIT_MS = 2000;
const DEFAULT_MEMORY_MB = 128;
const BATCH_SIZE = 20; // Judge0's default MAX_SUBMISSION_BATCH_SIZE
const POLL_INTERVAL_MS = 400;
const OVERALL_DEADLINE_MS = 60_000;
const REQUEST_TIMEOUT_MS = 10_000;
const MESSAGE_MAX_CHARS = 300;

// Judge0 status ids. <= 2 means still waiting or running.
const STATUS = { ACCEPTED: 3, WRONG_ANSWER: 4, TIME_LIMIT: 5, COMPILE_ERROR: 6, INTERNAL_ERROR: 13 };

const config = (env = process.env) => ({
  url: env.JUDGE0_URL?.replace(/\/+$/, "") || null,
  token: env.JUDGE0_TOKEN || null,
});

export const describeJudge0 = (env = process.env) => {
  const { url } = config(env);
  return { configured: Boolean(url) };
};

const unavailable = (detail) => {
  const err = new Error("Code grading is temporarily unavailable. Please try again shortly.");
  err.status = 503;
  err.detail = detail;
  return err;
};

const b64 = (s) => Buffer.from(String(s ?? ""), "utf8").toString("base64");
const unb64 = (s) => (s ? Buffer.from(s, "base64").toString("utf8") : "");
const firstChars = (s) => s.trim().slice(0, MESSAGE_MAX_CHARS);

const request = async (path, { method = "GET", body } = {}) => {
  const { url, token } = config();
  let res;
  try {
    res = await fetch(`${url}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "X-Auth-Token": token } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (e) {
    throw unavailable(`judge0 unreachable: ${e.message}`);
  }
  if (!res.ok) throw unavailable(`judge0 responded ${res.status}`);
  return res.json();
};

const toSubmission = (languageId, source, test) => ({
  language_id: languageId,
  source_code: b64(source),
  stdin: b64(test.stdin),
  expected_output: b64(test.expectedStdout),
  cpu_time_limit: (test.timeLimitMs ?? DEFAULT_TIME_LIMIT_MS) / 1000,
  // Wall time guards against sleeping/blocked programs that use no CPU.
  wall_time_limit: ((test.timeLimitMs ?? DEFAULT_TIME_LIMIT_MS) / 1000) * 3,
  memory_limit: (test.memoryMb ?? DEFAULT_MEMORY_MB) * 1024, // KB
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Poll one batch until every submission has left the queued/running states. */
const awaitBatch = async (tokens, deadline) => {
  const query = `tokens=${tokens.join(",")}&base64_encoded=true&fields=token,status,stdout,stderr,compile_output,time`;
  for (;;) {
    const { submissions } = await request(`/submissions/batch?${query}`);
    if (!Array.isArray(submissions) || submissions.length !== tokens.length) {
      throw unavailable("judge0 returned a malformed batch");
    }
    if (submissions.every((s) => s?.status?.id > 2)) return submissions;
    if (Date.now() > deadline) throw unavailable("judge0 did not finish in time");
    await sleep(POLL_INTERVAL_MS);
  }
};

/** Judge0 status -> the learner-facing result. Never echoes the expected output. */
const toResult = (name, s) => {
  const id = s.status.id;
  const ms = Math.round(Number(s.time ?? 0) * 1000);
  if (id === STATUS.ACCEPTED) return { name, passed: true, ms };
  if (id === STATUS.WRONG_ANSWER) return { name, passed: false, ms, message: "Wrong answer." };
  if (id === STATUS.TIME_LIMIT) return { name, passed: false, ms, message: "Time limit exceeded." };
  const stderr = firstChars(unb64(s.stderr));
  return {
    name,
    passed: false,
    ms,
    message: stderr || s.status.description || "Runtime error.",
  };
};

/**
 * @param {string} code the learner's whole program
 * @param {string} language a STDIO_LANGUAGES id ("python")
 * @param {{name:string, stdin:string, expectedStdout:string, timeLimitMs?:number, memoryMb?:number}[]} hiddenTests
 */
export const runStdioTests = async (code, language, hiddenTests) => {
  const lang = stdioLanguage(language);
  if (!lang) return { results: [], fatal: true, error: "Unknown language." };
  if (!Array.isArray(hiddenTests) || hiddenTests.length === 0) {
    return { results: [], fatal: true, error: "This challenge has no hidden tests yet." };
  }
  if (!describeJudge0().configured) throw unavailable("JUDGE0_URL is not set");

  const deadline = Date.now() + OVERALL_DEADLINE_MS;
  const results = [];

  for (let i = 0; i < hiddenTests.length; i += BATCH_SIZE) {
    const chunk = hiddenTests.slice(i, i + BATCH_SIZE);
    const created = await request("/submissions/batch?base64_encoded=true", {
      method: "POST",
      body: { submissions: chunk.map((t) => toSubmission(lang.judge0Id, code, t)) },
    });
    if (!Array.isArray(created) || created.length !== chunk.length || created.some((c) => !c?.token)) {
      throw unavailable("judge0 rejected the batch");
    }

    const done = await awaitBatch(created.map((c) => c.token), deadline);

    for (let j = 0; j < chunk.length; j++) {
      const s = done[j];
      // Same program for every test, so one compile error ends the run: report
      // it once, as a fatal result, with the compiler's message.
      if (s.status.id === STATUS.COMPILE_ERROR) {
        return { results: [], fatal: true, error: firstChars(unb64(s.compile_output)) || "Compilation failed." };
      }
      if (s.status.id === STATUS.INTERNAL_ERROR) throw unavailable("judge0 internal error");
      results.push(toResult(chunk[j].name, s));
    }
  }

  return { results, fatal: false };
};
