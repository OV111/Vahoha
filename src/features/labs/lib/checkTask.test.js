import { describe, it, expect } from "vitest";
import { checkTask, nameItFor } from "./checkTask";
import { runTests } from "@/features/coding-challenges/lib/testRunnerCore";
import lab from "../content/mern/mern-2/how-closures-capture-free-variables-in-the-scope-chain";

const [fix, write, review] = lab.tasks;

describe("checkTask: fix and write", () => {
  it("fails the starter and explains why", async () => {
    const result = await checkTask(fix, { [fix.file]: fix.starter }, runTests);
    expect(result.passed).toBe(false);
    expect(result.tests.find((t) => !t.ok).message).toBeTruthy();
  });

  it("passes the solution", async () => {
    expect((await checkTask(fix, { [fix.file]: fix.solution }, runTests)).passed).toBe(true);
    expect((await checkTask(write, { [write.file]: write.solution }, runTests)).passed).toBe(true);
  });

  it("falls back to the starter when the file is missing", async () => {
    expect((await checkTask(write, {}, runTests)).passed).toBe(false);
  });
});

describe("checkTask: review", () => {
  const files = (code, test) => ({ [review.file]: code, [review.testFile]: test });

  it("passes with a fix and a test that proves the bug", async () => {
    const result = await checkTask(review, files(review.solution, review.proofTest), runTests);
    expect(result.passed).toBe(true);
    expect(result.tests.map((t) => t.group)).toEqual(
      expect.arrayContaining(["AI's tests", "Your test", "Hidden tests"]),
    );
  });

  it("fails when the learner's test doesn't catch the AI's bug", async () => {
    const result = await checkTask(review, files(review.solution, review.testStarter), runTests);
    expect(result.passed).toBe(false);
    const proof = result.tests.find((t) => t.name === "Your test fails on the AI's code");
    expect(proof.ok).toBe(false);
    expect(proof.message).toMatch(/doesn't prove/);
  });

  it("fails the hidden tests when the code isn't fixed", async () => {
    const result = await checkTask(review, files(review.starter, review.proofTest), runTests);
    expect(result.passed).toBe(false);
    expect(result.tests.filter((t) => t.group === "Hidden tests").some((t) => !t.ok)).toBe(true);
  });
});

describe("nameItFor", () => {
  it("asks for the bug on fix tasks and shows the real cause", () => {
    expect(nameItFor(fix)).toMatchObject({ question: "What was the bug?", explanation: fix.cause });
  });

  it("asks for the risk on review tasks", () => {
    expect(nameItFor(review)).toMatchObject({ answer: "Performance", choices: ["Concurrency", "Security", "Performance", "Boundary"] });
  });

  it("asks nothing on write tasks", () => {
    expect(nameItFor(write)).toBeNull();
  });
});
