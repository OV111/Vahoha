import { describe, it, expect } from "vitest";
import { compareScan } from "@/features/system-map/lib/drift";

const node = (id, kind, title, sub = "", evidence) => ({ id, data: { kind, title, sub, ...(evidence ? { evidence } : {}) } });
const part = (key, kind, title, sub = "", paths = []) => ({ key, kind, title, sub, why: "", evidence: paths.map((path) => ({ path, reason: "" })) });

describe("compareScan", () => {
  it("matches a part to a node of the same kind that names the same technology", () => {
    const nodes = [node("a", "database", "Main DB", "MongoDB"), node("b", "database", "Analytics", "ClickHouse")];
    const { matched, newParts } = compareScan(nodes, { parts: [part("mongo", "database", "Database", "MongoDB")] });
    expect(matched).toEqual([{ part: expect.objectContaining({ key: "mongo" }), nodeId: "a" }]);
    expect(newParts).toEqual([]);
  });

  it("matches on shared evidence even when the names differ", () => {
    const nodes = [node("a", "server", "Backend", "", ["server/index.js"]), node("b", "server", "Other")];
    const { matched } = compareScan(nodes, { parts: [part("api", "server", "API", "Fastify", ["server/index.js"])] });
    expect(matched[0].nodeId).toBe("a");
  });

  it("falls back to the only node of that kind", () => {
    const { matched } = compareScan([node("a", "cache", "Cache")], { parts: [part("redis", "cache", "Cache", "Redis")] });
    expect(matched[0].nodeId).toBe("a");
  });

  it("calls a part new when several nodes of its kind could fit", () => {
    const nodes = [node("a", "database", "Users"), node("b", "database", "Orders")];
    const { newParts, matched } = compareScan(nodes, { parts: [part("pg", "database", "Database", "PostgreSQL")] });
    expect(matched).toEqual([]);
    expect(newParts.map((p) => p.key)).toEqual(["pg"]);
  });

  it("never matches one node to two parts", () => {
    const nodes = [node("a", "queue", "Jobs", "BullMQ")];
    const scan = { parts: [part("bull", "queue", "Queue", "BullMQ"), part("rabbit", "queue", "Queue", "RabbitMQ")] };
    const { matched, newParts } = compareScan(nodes, scan);
    expect(matched.map((m) => m.part.key)).toEqual(["bull"]);
    expect(newParts.map((p) => p.key)).toEqual(["rabbit"]);
  });

  it("lists repo-backed parts the repo no longer shows, but not hand-drawn ones", () => {
    const nodes = [
      node("redis", "cache", "Cache", "Redis", ["docker-compose.yml"]),
      node("drawn", "external", "Payments", "Stripe"),
      node("api", "server", "API", "Express", ["package.json"]),
    ];
    const { gone } = compareScan(nodes, { parts: [part("api", "server", "API", "Express", ["package.json"])] });
    expect(gone.map((n) => n.id)).toEqual(["redis"]);
  });
});

describe("compareScan with lens kinds", () => {
  it("keeps primary and replica apart even when they name the same technology", () => {
    const nodes = [node("p", "primary", "Primary", "PostgreSQL"), node("r", "replica", "Replica", "PostgreSQL")];
    const scan = { parts: [part("pg-primary", "primary", "Primary", "PostgreSQL"), part("pg-replica", "replica", "Replica", "PostgreSQL")] };
    const { matched, newParts } = compareScan(nodes, scan);
    expect(newParts).toEqual([]);
    expect(matched.map((m) => [m.part.key, m.nodeId])).toEqual([
      ["pg-primary", "p"],
      ["pg-replica", "r"],
    ]);
  });

  it("does not match a replica part to a primary node", () => {
    const scan = { parts: [part("pg-replica", "replica", "Replica", "PostgreSQL")] };
    const { matched, newParts } = compareScan([node("p", "primary", "Primary", "PostgreSQL")], scan);
    expect(matched).toEqual([]);
    expect(newParts.map((p) => p.key)).toEqual(["pg-replica"]);
  });

  it("falls back to the only node of a lens kind", () => {
    const { matched } = compareScan([node("m", "model", "Churn model")], { parts: [part("torch", "model", "Model", "PyTorch")] });
    expect(matched[0].nodeId).toBe("m");
  });

  it("does not treat role words as technology", () => {
    // "Pipeline" in both labels must not make an Airflow pipeline match a Dagster one.
    const nodes = [node("a", "pipeline", "Pipeline", "Dagster"), node("b", "pipeline", "Nightly pipeline", "Spark")];
    const { matched, newParts } = compareScan(nodes, { parts: [part("airflow", "pipeline", "Pipeline", "Airflow")] });
    expect(matched).toEqual([]);
    expect(newParts.map((p) => p.key)).toEqual(["airflow"]);
  });
});
