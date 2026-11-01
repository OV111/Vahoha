import { describe, it, expect } from "vitest";
import { EXAMPLE_GRAPH, MAX_EVIDENCE, MAX_NODES, MAX_NOTE, evidenceUrl, freeSpot, fromGraph, loadSaved, save, toGraph } from "@/features/system-map/lib/mapGraph";

const memoryStorage = () => {
  const data = {};
  return { getItem: (k) => data[k] ?? null, setItem: (k, v) => (data[k] = v) };
};

describe("mapGraph", () => {
  it("round-trips the example map", () => {
    const { nodes, edges } = fromGraph(EXAMPLE_GRAPH);
    expect(toGraph(nodes, edges)).toEqual(EXAMPLE_GRAPH);
  });

  it("strips runtime fields such as replay status and selection", () => {
    const { nodes, edges } = fromGraph(EXAMPLE_GRAPH);
    const dirty = nodes.map((n) => ({ ...n, selected: true, data: { ...n.data, status: { text: "x", tone: "ok" } } }));
    expect(toGraph(dirty, edges)).toEqual(EXAMPLE_GRAPH);
  });

  it("rejects things that are not a map", () => {
    for (const bad of [null, undefined, "x", 42, {}, { v: 2, nodes: [], edges: [] }, { v: 1, nodes: {}, edges: [] }]) {
      expect(fromGraph(bad)).toBeNull();
    }
  });

  it("drops edges that point at missing nodes and nodes without an id", () => {
    const graph = {
      v: 1,
      nodes: [{ id: "a", kind: "server", title: "A", x: 0, y: 0 }, { kind: "server" }, null],
      edges: [{ id: "e1", source: "a", target: "ghost" }, { id: "e2", source: "a", target: "a" }],
    };
    const { nodes, edges } = fromGraph(graph);
    expect(nodes.map((n) => n.id)).toEqual(["a"]);
    expect(edges.map((e) => e.id)).toEqual(["e2"]);
  });

  it("falls back for unknown kinds, bad coordinates and long text", () => {
    const { nodes } = fromGraph({ v: 1, nodes: [{ id: "a", kind: "spaceship", title: "x".repeat(200), x: "nope", y: 5 }], edges: [] });
    expect(nodes[0].data.kind).toBe("server");
    expect(nodes[0].data.title).toHaveLength(40);
    expect(nodes[0].position).toEqual({ x: 0, y: 5 });
  });

  it("caps the number of nodes", () => {
    const many = Array.from({ length: MAX_NODES + 20 }, (_, i) => ({ id: `n${i}`, kind: "server", title: "n", x: 0, y: 0 }));
    expect(fromGraph({ v: 1, nodes: many, edges: [] }).nodes).toHaveLength(MAX_NODES);
  });

  it("keeps a part's explanation, leaves out a blank one and caps a long one", () => {
    const graph = {
      ...EXAMPLE_GRAPH,
      nodes: EXAMPLE_GRAPH.nodes.map((n, i) => (i === 1 ? { ...n, note: "Handles every request.\nNo state." } : n)),
    };
    const { nodes, edges } = fromGraph(graph);
    expect(nodes[1].data.note).toBe("Handles every request.\nNo state.");
    expect(toGraph(nodes, edges)).toEqual(graph);

    const blank = fromGraph({ ...EXAMPLE_GRAPH, nodes: [{ ...EXAMPLE_GRAPH.nodes[0], note: "   " }], edges: [] });
    expect(blank.nodes[0].data).not.toHaveProperty("note");
    expect(toGraph([{ ...blank.nodes[0], data: { ...blank.nodes[0].data, note: "  " } }], []).nodes[0]).not.toHaveProperty("note");

    const long = fromGraph({ ...EXAMPLE_GRAPH, nodes: [{ ...EXAMPLE_GRAPH.nodes[0], note: "x".repeat(MAX_NOTE + 50) }], edges: [] });
    expect(long.nodes[0].data.note).toHaveLength(MAX_NOTE);
  });

  it("keeps repo evidence and the scanned repo through a round trip", () => {
    const graph = {
      ...EXAMPLE_GRAPH,
      nodes: EXAMPLE_GRAPH.nodes.map((n, i) => (i === 1 ? { ...n, evidence: ["package.json", "src/server.js"] } : n)),
      repo: { fullName: "ada/shop", sha: "abc1234" },
    };
    const { nodes, edges, repo } = fromGraph(graph);
    expect(nodes[1].data.evidence).toEqual(["package.json", "src/server.js"]);
    expect(toGraph(nodes, edges, repo)).toEqual(graph);
  });

  it("drops unsafe or excess evidence and a malformed repo", () => {
    const paths = ["/etc/passwd", "../secret", "a/../b", 42, "", "x".repeat(201), ...Array.from({ length: 8 }, (_, i) => `f${i}.js`)];
    const { nodes, repo } = fromGraph({
      v: 1,
      nodes: [{ id: "a", kind: "server", title: "A", x: 0, y: 0, evidence: paths }],
      edges: [],
      repo: { fullName: "not a repo", sha: "zzz" },
    });
    expect(nodes[0].data.evidence).toEqual(Array.from({ length: MAX_EVIDENCE }, (_, i) => `f${i}.js`));
    expect(repo).toBeUndefined();
  });

  it("leaves evidence and repo out of hand-drawn maps", () => {
    const { nodes, edges } = fromGraph(EXAMPLE_GRAPH);
    const saved = toGraph(nodes.map((n) => ({ ...n, data: { ...n.data, evidence: [] } })), edges, null);
    expect(saved).toEqual(EXAMPLE_GRAPH);
    expect("repo" in saved).toBe(false);
  });

  it("keeps a non-default lens and any part kind through a round trip", () => {
    const graph = {
      ...EXAMPLE_GRAPH,
      nodes: [...EXAMPLE_GRAPH.nodes, { id: "wall", kind: "firewall", title: "WAF", sub: "", x: 0, y: 300 }],
      lens: "security",
    };
    const { nodes, edges, repo, lens } = fromGraph(graph);
    expect(lens).toBe("security");
    expect(nodes.find((n) => n.id === "wall").data.kind).toBe("firewall");
    expect(toGraph(nodes, edges, repo, lens)).toEqual(graph);
  });

  it("treats a missing or unknown lens as software and never writes the default", () => {
    expect(fromGraph(EXAMPLE_GRAPH).lens).toBe("software");
    expect(fromGraph({ ...EXAMPLE_GRAPH, lens: "quantum" }).lens).toBe("software");
    const { nodes, edges } = fromGraph(EXAMPLE_GRAPH);
    expect("lens" in toGraph(nodes, edges, null, "software")).toBe(false);
    expect("lens" in toGraph(nodes, edges, null, "quantum")).toBe(false);
    expect(toGraph(nodes, edges, null, "data-ai").lens).toBe("data-ai");
  });

  it("links evidence to the scanned commit", () => {
    expect(evidenceUrl({ fullName: "ada/shop", sha: "abc1234" }, "src/app.js")).toBe("https://github.com/ada/shop/blob/abc1234/src/app.js");
  });

  it("finds a free spot that does not overlap existing nodes", () => {
    const at = (x, y) => ({ position: { x, y } });
    expect(freeSpot([], { x: 10, y: 20 })).toEqual({ x: 10, y: 20 });
    const crowded = [at(0, 0), at(220, 0), at(-220, 0), at(0, 110), at(0, -110)];
    const spot = freeSpot(crowded, { x: 0, y: 0 });
    expect(crowded.some((n) => Math.abs(n.position.x - spot.x) < 198 && Math.abs(n.position.y - spot.y) < 88)).toBe(false);
  });

  it("saves and loads through storage, and survives broken storage", () => {
    const storage = memoryStorage();
    const { nodes, edges } = fromGraph(EXAMPLE_GRAPH);
    save(nodes, edges, null, "software", storage);
    const saved = loadSaved(storage);
    expect(toGraph(saved.nodes, saved.edges, saved.repo, saved.lens)).toEqual(EXAMPLE_GRAPH);
    expect(loadSaved(memoryStorage())).toBeNull();
    const broken = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); } };
    expect(loadSaved(broken)).toBeNull();
    expect(() => save(nodes, edges, null, "software", broken)).not.toThrow();
  });
});
