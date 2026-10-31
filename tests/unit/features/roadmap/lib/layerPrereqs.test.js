import { describe, it, expect } from "vitest";
import { prereqsDone, layerStatus } from "@/features/roadmap/lib/layerPrereqs";

const layers = [{ id: "a-1" }, { id: "a-2" }, { id: "a-3", requires: ["a-1", "a-2"] }];

describe("prereqsDone", () => {
  it("defaults to the previous layer when `requires` is absent", () => {
    expect(prereqsDone(layers[1], 1, layers, { "a-1": "done" })).toBe(true);
    expect(prereqsDone(layers[1], 1, layers, {})).toBe(false);
  });

  it("is false for the first layer without `requires`", () => {
    expect(prereqsDone(layers[0], 0, layers, {})).toBe(false);
  });

  it("needs every id in `requires`", () => {
    expect(prereqsDone(layers[2], 2, layers, { "a-1": "done" })).toBe(false);
    expect(prereqsDone(layers[2], 2, layers, { "a-1": "done", "a-2": "done" })).toBe(true);
  });

  it("treats an unknown required id as not done", () => {
    const l = { id: "x", requires: ["ghost"] };
    expect(prereqsDone(l, 0, [l], { ghost: "done" })).toBe(false);
  });
});

describe("layerStatus", () => {
  it("marks the first layer as up-next when nothing is done", () => {
    expect(layerStatus(layers[0], 0, layers, {})).toBe("up-next");
  });

  it("locks later layers until their prerequisites are done", () => {
    expect(layerStatus(layers[1], 1, layers, {})).toBe("locked");
    expect(layerStatus(layers[1], 1, layers, { "a-1": "done" })).toBe("up-next");
  });

  it("keeps done and in-progress as they are", () => {
    expect(layerStatus(layers[0], 0, layers, { "a-1": "done" })).toBe("done");
    expect(layerStatus(layers[1], 1, layers, { "a-2": "in-progress" })).toBe("in-progress");
  });

  it("treats `requires: []` as a root", () => {
    const root = { id: "r", requires: [] };
    expect(layerStatus(root, 3, [root], {})).toBe("up-next");
  });

  it("ignores a stale locked status when the layer is startable", () => {
    expect(layerStatus({ id: "a-1", status: "locked" }, 0, layers, {})).toBe("up-next");
  });
});
