import { describe, it, expect } from "vitest";
import { prereqsDone } from "./layerPrereqs";

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
