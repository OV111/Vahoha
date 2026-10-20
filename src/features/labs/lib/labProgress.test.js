import { describe, it, expect, beforeEach } from "vitest";
import { finishedTasks, markTaskFinished } from "./labProgress";
import { layerStatuses } from "@/features/learn/lib/lessonStatus";

beforeEach(() => localStorage.clear());

describe("labProgress", () => {
  const all = ["fix", "write", "review"];

  it("remembers finished tasks per lab", () => {
    markTaskFinished("mern", "mern-2", "closures", "fix", all);
    expect([...finishedTasks("mern", "mern-2", "closures")]).toEqual(["fix"]);
    expect(finishedTasks("mern", "mern-2", "other").size).toBe(0);
  });

  it("doesn't mark the lesson done until every task is finished", () => {
    expect(markTaskFinished("mern", "mern-2", "closures", "fix", all)).toBe(false);
    expect(layerStatuses("mern", "mern-2").closures).toBeUndefined();
  });

  it("marks the lesson done on the roadmap when the lab is complete", () => {
    for (const t of all) markTaskFinished("mern", "mern-2", "closures", t, all);
    expect(layerStatuses("mern", "mern-2").closures).toBe("done");
  });

  it("survives corrupt storage", () => {
    localStorage.setItem("vahoha.labs.done", "{oops");
    expect(finishedTasks("mern", "mern-2", "closures").size).toBe(0);
  });
});
