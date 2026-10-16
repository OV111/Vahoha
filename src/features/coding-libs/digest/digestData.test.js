import { describe, expect, it } from "vitest";
import { MOCK_CONCEPTS, estimateMinutes, selectConcepts } from "./digestData";

const ids = (list) => list.map((c) => c.id);

describe("selectConcepts", () => {
  it("shows only ideas tagged for the role and marked keep", () => {
    const { shown, cut } = selectConcepts(MOCK_CONCEPTS, { role: "beginner", mode: "learn", showAll: false });
    expect(ids(shown)).toEqual(["array-types", "multidimensional", "unsound-access"]);
    expect(ids(cut)).toContain("union-members"); // keep:false is always cut
    expect(ids(cut)).toContain("no-unchecked"); // senior-only
  });

  it("gives a senior a different cut of the same chapter", () => {
    const { shown } = selectConcepts(MOCK_CONCEPTS, { role: "senior", mode: "learn", showAll: false });
    expect(ids(shown)).toEqual(["unsound-access", "tuples", "no-unchecked"]);
  });

  it("interview mode only includes ideas that have an interview block", () => {
    const { shown } = selectConcepts(MOCK_CONCEPTS, { role: "backend", mode: "interview", showAll: false });
    expect(shown.every((c) => c.interview)).toBe(true);
    expect(ids(shown)).toEqual(["unsound-access", "tuples"]);
  });

  it("showAll ignores role and keep, and leaves nothing cut", () => {
    const { shown, cut } = selectConcepts(MOCK_CONCEPTS, { role: "senior", mode: "learn", showAll: true });
    expect(shown).toHaveLength(MOCK_CONCEPTS.length);
    expect(cut).toEqual([]);
  });
});

describe("estimateMinutes", () => {
  it("never returns less than one minute", () => {
    expect(estimateMinutes(0, "quick")).toBe(1);
    expect(estimateMinutes(6, "learn")).toBe(6);
  });
});
