import { describe, it, expect } from "vitest";
import { MAX_HISTORY, canRedo, canUndo, record, redo, startHistory, undo } from "@/features/system-map/lib/history";

describe("history", () => {
  it("starts with nothing to undo or redo", () => {
    const h = startHistory("a");
    expect(canUndo(h)).toBe(false);
    expect(canRedo(h)).toBe(false);
  });

  it("records steps and walks back and forward through them", () => {
    let h = record(record(startHistory("a"), "b"), "c");
    h = undo(h);
    expect(h.present).toBe("b");
    h = undo(h);
    expect(h.present).toBe("a");
    expect(canUndo(h)).toBe(false);
    h = redo(h);
    expect(h.present).toBe("b");
    h = redo(h);
    expect(h.present).toBe("c");
    expect(canRedo(h)).toBe(false);
  });

  it("ignores a record that matches the present", () => {
    const h = record(startHistory("a"), "a");
    expect(h).toEqual(startHistory("a"));
  });

  it("clears redo when a new step is recorded", () => {
    const h = record(undo(record(startHistory("a"), "b")), "c");
    expect(h.present).toBe("c");
    expect(canRedo(h)).toBe(false);
    expect(undo(h).present).toBe("a");
  });

  it("records a pending change before undoing, so undo removes that change", () => {
    const h = undo(record(startHistory("a"), "b"), "c");
    expect(h.present).toBe("b");
    expect(redo(h).present).toBe("c");
  });

  it("undo with nothing to undo returns the same history", () => {
    const h = startHistory("a");
    expect(undo(h)).toBe(h);
    expect(redo(h)).toBe(h);
  });

  it(`keeps at most ${MAX_HISTORY} steps`, () => {
    let h = startHistory("0");
    for (let i = 1; i <= MAX_HISTORY + 10; i++) h = record(h, String(i));
    expect(h.past).toHaveLength(MAX_HISTORY);
    expect(h.past[0]).toBe("10");
  });
});
