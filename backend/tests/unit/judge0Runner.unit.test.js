import process from "node:process";
import { Buffer } from "node:buffer";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { runStdioTests, describeJudge0 } from "../../modules/coding-challenges/services/judge0Runner.js";
import { pickStdioSource } from "../../modules/coding-challenges/lib/submissionSource.js";
import { hiddenTestsSchema } from "../../modules/coding-challenges/schemas/challenge.schemas.js";

const b64 = (s) => Buffer.from(s).toString("base64");
const tests = [
  { name: "t1", stdin: "1 2", expectedStdout: "3" },
  { name: "t2", stdin: "2 2", expectedStdout: "4" },
];

// A fake Judge0: POST /submissions/batch -> tokens, GET -> finished statuses.
const fakeJudge0 = (statuses) => {
  const calls = [];
  vi.stubGlobal("fetch", vi.fn(async (url, init = {}) => {
    calls.push({ url, init });
    const ok = (body) => ({ ok: true, status: 200, json: async () => body });
    if (init.method === "POST") return ok(statuses.map((_, i) => ({ token: `tok${i}` })));
    return ok({ submissions: statuses.map((s) => ({ status: { id: s.id, description: s.d ?? "" }, time: "0.01", ...s.extra })) });
  }));
  return calls;
};

beforeEach(() => {
  process.env.JUDGE0_URL = "http://judge0.test";
  process.env.JUDGE0_TOKEN = "secret";
});
afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.JUDGE0_URL;
  delete process.env.JUDGE0_TOKEN;
});

describe("runStdioTests", () => {
  it("passes when every test is Accepted, and sends token + base64 payload", async () => {
    const calls = fakeJudge0([{ id: 3 }, { id: 3 }]);
    const run = await runStdioTests("print(1)", "python", tests);
    expect(run).toEqual({ results: [expect.objectContaining({ name: "t1", passed: true }), expect.objectContaining({ name: "t2", passed: true })], fatal: false });
    const post = calls.find((c) => c.init.method === "POST");
    expect(post.init.headers["X-Auth-Token"]).toBe("secret");
    const body = JSON.parse(post.init.body);
    expect(body.submissions[0].language_id).toBe(71);
    expect(Buffer.from(body.submissions[0].stdin, "base64").toString()).toBe("1 2");
  });

  it("reports wrong answer without echoing the expected output", async () => {
    fakeJudge0([{ id: 3 }, { id: 4 }]);
    const run = await runStdioTests("x", "python", tests);
    expect(run.results[1]).toMatchObject({ name: "t2", passed: false, message: "Wrong answer." });
    expect(JSON.stringify(run)).not.toContain('"4"');
  });

  it("turns a compile error into a fatal result", async () => {
    fakeJudge0([{ id: 6, extra: { compile_output: b64("SyntaxError: bad") } }, { id: 6 }]);
    const run = await runStdioTests("x", "python", tests);
    expect(run).toMatchObject({ fatal: true, error: "SyntaxError: bad" });
  });

  it("maps time limit and runtime error messages", async () => {
    fakeJudge0([{ id: 5 }, { id: 11, extra: { stderr: b64("ZeroDivisionError") } }]);
    const run = await runStdioTests("x", "python", tests);
    expect(run.results[0].message).toBe("Time limit exceeded.");
    expect(run.results[1].message).toBe("ZeroDivisionError");
  });

  it("throws 503 when Judge0 is unreachable, never a pass", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("ECONNREFUSED"); }));
    await expect(runStdioTests("x", "python", tests)).rejects.toMatchObject({ status: 503 });
  });

  it("throws 503 when JUDGE0_URL is not configured", async () => {
    delete process.env.JUDGE0_URL;
    expect(describeJudge0().configured).toBe(false);
    await expect(runStdioTests("x", "python", tests)).rejects.toMatchObject({ status: 503 });
  });
});

describe("pickStdioSource", () => {
  const challenge = { languages: ["python"], starterFiles: [{ name: "main.py", lang: "python", code: "" }] };
  it("picks the challenge's own starter file", () => {
    expect(pickStdioSource(challenge, [{ name: "main.py", code: "print(1)" }], "python")).toMatchObject({ fileName: "main.py" });
  });
  it("rejects a language the challenge does not list", () => {
    expect(() => pickStdioSource({ ...challenge, languages: [] }, [], "python")).toThrow();
  });
  it("rejects empty code", () => {
    expect(() => pickStdioSource(challenge, [{ name: "main.py", code: "  " }], "python")).toThrow(/no code/);
  });
});

describe("hiddenTestsSchema", () => {
  it("accepts stdio tests and rejects harness-shaped ones for stdio", () => {
    expect(hiddenTestsSchema("stdio").safeParse(tests).success).toBe(true);
    expect(hiddenTestsSchema("stdio").safeParse([{ name: "a", code: "x" }]).success).toBe(false);
    expect(hiddenTestsSchema("harness").safeParse(tests).success).toBe(false);
  });
  it("rejects duplicate names", () => {
    expect(hiddenTestsSchema("stdio").safeParse([tests[0], tests[0]]).success).toBe(false);
  });
});
