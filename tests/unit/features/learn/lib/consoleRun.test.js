import { describe, it, expect } from "vitest";
import { runConsole } from "@/features/learn/lib/consoleRun.js";

const texts = async (source) => (await runConsole(source)).lines.map((l) => l.text);

describe("runConsole", () => {
  it("keeps event-loop order across sync code, microtasks and timers", async () => {
    const out = await texts(`
      setTimeout(() => console.log("A"), 0);
      queueMicrotask(() => console.log("B"));
      console.log("C");
    `);
    expect(out).toEqual(["C", "B", "A"]);
  });

  it("waits for timers that fire later", async () => {
    const out = await texts(`setTimeout(() => console.log("late"), 50); console.log("now");`);
    expect(out).toEqual(["now", "late"]);
  });

  it("joins arguments and shows non-strings like the console", async () => {
    const out = await texts(`console.log("n =", 2, { a: 1 }, [1, 2], undefined);`);
    expect(out).toEqual(['n = 2 {"a":1} [1,2] undefined']);
  });

  it("reports a thrown error instead of crashing", async () => {
    const { lines } = await runConsole(`console.log("first"); throw new TypeError("boom");`);
    expect(lines.map((l) => [l.level, l.text])).toEqual([
      ["log", "first"],
      ["error", "TypeError: boom"],
    ]);
  });

  it("reports an error thrown inside a timer", async () => {
    const { lines } = await runConsole(`setTimeout(() => { throw new Error("late boom"); }, 0);`);
    expect(lines).toEqual([expect.objectContaining({ level: "error", text: "Error: late boom" })]);
  });

  it("allows top-level await", async () => {
    const out = await texts(`await null; console.log("after await");`);
    expect(out).toEqual(["after await"]);
  });
});
