import { describe, it, expect } from "vitest";
import { applyScan } from "./applyScan";
import { MAX_NODES } from "./mapGraph";

const node = (id, kind, title, sub = "", x = 0, y = 0, evidence) => ({
  id,
  type: "system",
  position: { x, y },
  data: { kind, title, sub, ...(evidence ? { evidence } : {}) },
});
const part = (key, kind, title, sub, path) => ({ key, kind, title, sub, why: "", evidence: [{ path, reason: "dependency" }] });

const counter = () => {
  let i = 0;
  return (prefix) => `${prefix}-${++i}`;
};

const scan = {
  repo: { fullName: "ada/shop", sha: "abc1234", htmlUrl: "https://github.com/ada/shop" },
  parts: [
    part("web", "client", "Web app", "React", "client/package.json"),
    part("api", "server", "API", "Express", "package.json"),
    part("db", "database", "Database", "MongoDB", "package.json"),
  ],
  wires: [
    { source: "web", target: "api", label: "HTTP" },
    { source: "api", target: "db", label: "queries" },
  ],
};

describe("applyScan", () => {
  it("adds only accepted parts, with evidence, and the wires between parts on the map", () => {
    const result = applyScan([], [], scan, new Set(["api", "db"]), counter());
    expect(result.added).toBe(2);
    expect(result.nodes.map((n) => n.data.title)).toEqual(["API", "Database"]);
    expect(result.nodes[0].data.evidence).toEqual(["package.json"]);
    expect(result.edges).toEqual([expect.objectContaining({ source: "n-1", target: "n-2", label: "queries" })]);
    expect(result.repo).toEqual({ fullName: "ada/shop", sha: "abc1234" });
  });

  it("lays new parts out left to right by role, without overlaps", () => {
    const { nodes } = applyScan([], [], scan, new Set(["web", "api", "db"]), counter());
    const xs = nodes.map((n) => n.position.x);
    expect(xs).toEqual([...xs].sort((a, b) => a - b));
    const overlap = nodes.some((a, i) => nodes.some((b, j) => i !== j && Math.abs(a.position.x - b.position.x) < 198 && Math.abs(a.position.y - b.position.y) < 88));
    expect(overlap).toBe(false);
  });

  it("merges evidence into parts already on the map instead of duplicating them", () => {
    const existing = [node("mine", "server", "Backend", "Express", 0, 0, ["src/index.js"])];
    const { nodes, added } = applyScan(existing, [], scan, new Set(["api"]), counter());
    expect(added).toBe(0);
    expect(nodes).toHaveLength(1);
    expect(nodes[0].data.evidence).toEqual(["src/index.js", "package.json"]);
  });

  it("wires a new part to a matched one and skips wires that already exist", () => {
    const existing = [node("mine", "server", "Backend", "Express"), node("db0", "database", "Store", "MongoDB", 300)];
    const edges = [{ id: "x", source: "mine", target: "db0" }];
    const result = applyScan(existing, edges, scan, new Set(["web"]), counter());
    expect(result.edges.map((e) => `${e.source}>${e.target}`)).toEqual(["mine>db0", "n-1>mine"]);
  });

  it("puts new parts below the existing map", () => {
    const existing = [node("a", "external", "Stripe", "", 100, 400)];
    const { nodes } = applyScan(existing, [], scan, new Set(["web"]), counter());
    expect(nodes[1].position.y).toBeGreaterThan(400);
  });

  it("stops at the part limit", () => {
    const full = Array.from({ length: MAX_NODES }, (_, i) => node(`f${i}`, "external", `x${i}`, "", i * 300, 0));
    const result = applyScan(full, [], scan, new Set(["web", "api", "db"]), counter());
    expect(result.nodes).toHaveLength(MAX_NODES);
    expect(result.added).toBe(0);
  });
});

describe("applyScan across lenses", () => {
  const dataAiScan = {
    repo: { fullName: "ada/churn", sha: "abc1234", htmlUrl: "https://github.com/ada/churn" },
    parts: [
      part("evalu", "evaluation", "Evaluation", "scikit-learn", "evaluate.py"),
      part("model", "model", "Model", "PyTorch", "requirements.txt"),
      part("source", "datasource", "Data source", "S3", "dvc.yaml"),
      part("pipe", "pipeline", "Pipeline", "Airflow", "dags/train.py"),
      part("serve", "endpoint", "Serving endpoint", "FastAPI", "serve.py"),
    ],
    wires: [
      { source: "source", target: "pipe", label: "raw data" },
      { source: "pipe", target: "model", label: "trains" },
      { source: "model", target: "serve", label: "serves" },
    ],
  };
  const infraScan = {
    repo: { fullName: "ada/infra", sha: "abc1234", htmlUrl: "https://github.com/ada/infra" },
    parts: [
      part("k8s", "cluster", "Cluster", "Kubernetes", "k8s/deploy.yml"),
      part("ci", "cicd", "CI", "GitHub Actions", ".github/workflows/ci.yml"),
      part("lb", "loadbalancer", "Load balancer", "nginx", "nginx.conf"),
      part("dns", "dns", "DNS", "Route 53", "main.tf"),
    ],
    wires: [{ source: "lb", target: "k8s", label: "routes" }],
  };

  const xOf = (nodes, title) => nodes.find((n) => n.data.title === title).position.x;
  const everything = (s) => new Set(s.parts.map((p) => p.key));

  it("lays a data-ai scan out from the data source towards the results", () => {
    const { nodes, edges } = applyScan([], [], dataAiScan, everything(dataAiScan), counter());
    expect(nodes).toHaveLength(5);
    expect(xOf(nodes, "Data source")).toBeLessThan(xOf(nodes, "Pipeline"));
    expect(xOf(nodes, "Pipeline")).toBe(xOf(nodes, "Serving endpoint"));
    expect(xOf(nodes, "Serving endpoint")).toBeLessThan(xOf(nodes, "Model"));
    expect(xOf(nodes, "Model")).toBeLessThan(xOf(nodes, "Evaluation"));
    expect(edges).toHaveLength(3);
  });

  it("lays an infrastructure scan out from what comes in to the cluster", () => {
    const { nodes, edges } = applyScan([], [], infraScan, everything(infraScan), counter());
    expect(nodes.map((n) => n.data.kind).sort()).toEqual(["cicd", "cluster", "dns", "loadbalancer"]);
    expect(xOf(nodes, "DNS")).toBe(xOf(nodes, "CI"));
    expect(xOf(nodes, "DNS")).toBeLessThan(xOf(nodes, "Load balancer"));
    expect(xOf(nodes, "Load balancer")).toBeLessThan(xOf(nodes, "Cluster"));
    expect(edges).toEqual([expect.objectContaining({ label: "routes" })]);
  });

  it("never overlaps parts, and puts an unknown kind in the last column", () => {
    const odd = { ...infraScan, parts: [...infraScan.parts, part("x", "hologram", "Hologram", "", "x.js")], wires: [] };
    const { nodes } = applyScan([], [], odd, everything(odd), counter());
    const overlap = nodes.some((a, i) => nodes.some((b, j) => i !== j && Math.abs(a.position.x - b.position.x) < 198 && Math.abs(a.position.y - b.position.y) < 88));
    expect(overlap).toBe(false);
    expect(xOf(nodes, "Hologram")).toBe(Math.max(...nodes.map((n) => n.position.x)));
  });
});
