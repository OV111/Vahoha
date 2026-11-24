import { describe, it, expect } from "vitest";
import { toMermaid } from "@/features/system-map/lib/mermaid";
import { EXAMPLE_GRAPH } from "@/features/system-map/lib/mapGraph";

describe("toMermaid", () => {
  it("draws the example map as a left-to-right flowchart", () => {
    expect(toMermaid(EXAMPLE_GRAPH)).toBe(
      [
        "flowchart LR",
        '  n1(["Web app<br/><small>React</small>"])',
        '  n2["Firewall<br/><small>blocks bad requests</small>"]',
        '  n3["Load balancer<br/><small>spreads traffic</small>"]',
        '  n4["API server<br/><small>Express</small>"]',
        '  n5["API server 2<br/><small>Express</small>"]',
        '  n6[["Cache<br/><small>Redis</small>"]]',
        '  n7[("Database<br/><small>MongoDB</small>")]',
        '  n8[/"Queue<br/><small>BullMQ</small>"/]',
        '  n9["Worker<br/><small>runs jobs</small>"]',
        '  n10{{"Email service<br/><small>sends emails</small>"}}',
        '  n11["File storage<br/><small>images, uploads</small>"]',
        '  n1 -->|"HTTPS"| n2',
        '  n2 -->|"allowed"| n3',
        '  n3 -->|"HTTP"| n4',
        '  n3 -->|"HTTP"| n5',
        '  n4 -->|"hot reads"| n6',
        '  n5 --> n6',
        '  n4 -->|"queries"| n7',
        '  n5 --> n7',
        '  n4 -->|"jobs"| n8',
        '  n5 --> n8',
        '  n8 -->|"jobs"| n9',
        '  n9 -->|"sends"| n10',
        '  n9 -->|"saves"| n11',
        "",
      ].join("\n"),
    );
  });

  it("wraps it in a mermaid code block when fenced", () => {
    const text = toMermaid(EXAMPLE_GRAPH, { fenced: true });
    expect(text.startsWith("```mermaid\nflowchart LR\n")).toBe(true);
    expect(text.endsWith("\n```\n")).toBe(true);
  });

  it("escapes quotes and angle brackets so a title can't break the diagram", () => {
    const graph = {
      nodes: [
        { id: "a", kind: "server", title: 'My "API" <v2>', sub: "" },
        { id: "b", kind: "worker", title: "Jobs", sub: "" },
      ],
      edges: [{ id: "e", source: "a", target: "b", label: 'says "hi"' }],
    };
    const text = toMermaid(graph);
    expect(text).toContain('n1["My #quot;API#quot; #lt;v2#gt;"]');
    expect(text).toContain('n1 -->|"says #quot;hi#quot;"| n2');
  });

  it("uses safe ids whatever the map's ids are, and skips wires to missing parts", () => {
    const graph = {
      nodes: [{ id: "weird id; drop", kind: "client", title: "App", sub: "" }],
      edges: [{ id: "e", source: "weird id; drop", target: "gone", label: "" }],
    };
    expect(toMermaid(graph)).toBe('flowchart LR\n  n1(["App"])\n');
  });

  it("falls back to the kind's name when a part has no title", () => {
    const graph = { nodes: [{ id: "q", kind: "queue", title: "", sub: "" }], edges: [] };
    expect(toMermaid(graph)).toContain('n1[/"Queue"/]');
  });
});
