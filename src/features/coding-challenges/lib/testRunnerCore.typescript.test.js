import { describe, it, expect } from "vitest";
import { runTests } from "./testRunnerCore";

const testFile = {
  name: "add_test.js",
  lang: "test",
  code: `const add = require('./add');
test('adds', () => { expect(add(2, 3)).toBe(5); });
test('adds negatives', () => { expect(add(-1, -1)).toBe(-2); });`,
};

describe("runTests with TypeScript", () => {
  it("removes types and runs a .ts solution", async () => {
    const results = await runTests([
      {
        name: "add.ts",
        lang: "ts",
        code: `declare const module: { exports: unknown };
interface Pair { a: number; b: number }
function add(a: number, b: number): number { const p: Pair = { a, b }; return p.a + p.b; }
module.exports = add;`,
      },
      testFile,
    ]);
    expect(results.map((r) => r.passed)).toEqual([true, true]);
  });

  it("does not fail on a type error, only on wrong behaviour", async () => {
    const results = await runTests([
      { name: "add.ts", lang: "ts", code: "const n: string = 5 as any; function add(a: number, b: number) { return a + b } module.exports = add;" },
      testFile,
    ]);
    expect(results.every((r) => r.passed)).toBe(true);
  });

  it("reports a TypeScript syntax error as one clear failure", async () => {
    const results = await runTests([{ name: "add.ts", lang: "ts", code: "function add( {" }, testFile]);
    expect(results).toHaveLength(1);
    expect(results[0].passed).toBe(false);
    expect(results[0].message).toMatch(/TypeScript syntax error/);
  });

  it("still runs plain JavaScript files", async () => {
    const results = await runTests([
      { name: "add.js", lang: "js", code: "function add(a, b) { return a + b } module.exports = add;" },
      testFile,
    ]);
    expect(results.every((r) => r.passed)).toBe(true);
  });
});
