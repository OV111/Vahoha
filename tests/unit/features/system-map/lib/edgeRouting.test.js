import { describe, it, expect } from "vitest";
import { routeEdges, sidesFor } from "@/features/system-map/lib/edgeRouting";

const at = (id, x, y) => ({ id, position: { x, y }, measured: { width: 176, height: 64 } });

describe("sidesFor", () => {
  it("joins right to left when the target is to the right", () => {
    expect(sidesFor(at("a", 0, 0), at("b", 300, 0))).toEqual({ sourceHandle: "r", targetHandle: "l" });
  });

  it("joins left to right when the target is to the left, so the arrow points left", () => {
    expect(sidesFor(at("a", 300, 0), at("b", 0, 0))).toEqual({ sourceHandle: "l", targetHandle: "r" });
  });

  it("joins bottom to top when the target is below, and top to bottom when above", () => {
    expect(sidesFor(at("a", 0, 0), at("b", 40, 200))).toEqual({ sourceHandle: "b", targetHandle: "t" });
    expect(sidesFor(at("a", 0, 200), at("b", 40, 0))).toEqual({ sourceHandle: "t", targetHandle: "b" });
  });

  it("treats a wide diagonal as side by side, since parts are wider than tall", () => {
    expect(sidesFor(at("a", 0, 0), at("b", 280, 100))).toEqual({ sourceHandle: "r", targetHandle: "l" });
  });

  it("uses a default size before the parts are measured", () => {
    const a = { id: "a", position: { x: 0, y: 0 } };
    const b = { id: "b", position: { x: -300, y: 10 } };
    expect(sidesFor(a, b)).toEqual({ sourceHandle: "l", targetHandle: "r" });
  });
});

describe("routeEdges", () => {
  const nodes = [at("a", 300, 0), at("b", 0, 0)];

  it("re-sides edges to face each other and keeps the rest of the edge", () => {
    const [edge] = routeEdges(nodes, [{ id: "e", source: "a", target: "b", sourceHandle: "r", targetHandle: "l", label: "HTTP" }]);
    expect(edge).toEqual({ id: "e", source: "a", target: "b", sourceHandle: "l", targetHandle: "r", label: "HTTP" });
  });

  it("returns the same object when nothing changes, and leaves edges to missing parts alone", () => {
    const right = { id: "e", source: "a", target: "b", sourceHandle: "l", targetHandle: "r" };
    const dangling = { id: "d", source: "a", target: "gone", sourceHandle: "r", targetHandle: "l" };
    const routed = routeEdges(nodes, [right, dangling]);
    expect(routed[0]).toBe(right);
    expect(routed[1]).toBe(dangling);
  });
});
