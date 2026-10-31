import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { layerStatuses, setLessonStatus, markLessonOpened } from "@/features/learn/lib/lessonStatus";
import { markLessonFinished } from "@/features/learn/lib/lessonProgress";

beforeEach(() => localStorage.clear());
afterEach(() => vi.useRealTimers());

describe("lessonStatus store", () => {
  it("returns only lessons that have a status", () => {
    expect(layerStatuses("ts", "ts-1")).toEqual({});
    setLessonStatus("ts", "ts-1", "intro", "in_progress");
    expect(layerStatuses("ts", "ts-1")).toEqual({ intro: "in_progress" });
  });

  it("keeps layers and tracks apart", () => {
    setLessonStatus("ts", "ts-1", "intro", "done");
    expect(layerStatuses("ts", "ts-2")).toEqual({});
    expect(layerStatuses("go", "ts-1")).toEqual({});
  });

  it("rejects an unknown status", () => {
    expect(() => setLessonStatus("ts", "ts-1", "intro", "finished")).toThrow();
  });

  it("counts a lesson finished in the player as done", () => {
    markLessonFinished("ts", "ts-1", "intro");
    expect(layerStatuses("ts", "ts-1")).toEqual({ intro: "done" });
  });

  it("lets the newer of 'finished' and a status change win", () => {
    vi.useFakeTimers();
    vi.setSystemTime(1000);
    markLessonFinished("ts", "ts-1", "intro");
    vi.setSystemTime(2000);
    setLessonStatus("ts", "ts-1", "intro", "not_started"); // learner resets it afterwards
    expect(layerStatuses("ts", "ts-1")).toEqual({ intro: "not_started" });

    vi.setSystemTime(3000);
    markLessonFinished("ts", "ts-1", "intro"); // and finishes it again
    expect(layerStatuses("ts", "ts-1")).toEqual({ intro: "done" });
  });

  it("survives corrupt storage", () => {
    localStorage.setItem("vahoha.learn.status", "{not json");
    expect(layerStatuses("ts", "ts-1")).toEqual({});
  });

  it("marks an opened lesson in progress, but never downgrades a finished one", () => {
    markLessonOpened("ts", "ts-1", "intro");
    expect(layerStatuses("ts", "ts-1")).toEqual({ intro: "in_progress" });

    markLessonFinished("ts", "ts-1", "types");
    markLessonOpened("ts", "ts-1", "types"); // reopening a finished lesson
    expect(layerStatuses("ts", "ts-1").types).toBe("done");
  });
});
