import process from "node:process";
import { describe, it, expect, vi, afterEach } from "vitest";
import { detectParts, inferWires, pickKeyFiles, readSignals } from "../../modules/system-map/lib/repoScan.js";
import { LENSES, LENS_KINDS } from "../../modules/system-map/lib/lenses.js";
import { LENS_SCAN } from "../../modules/system-map/lib/scanRules.js";
import { labelScan } from "../../modules/system-map/services/scanLabelService.js";

const pkg = (deps, devDeps = {}) => JSON.stringify({ dependencies: deps, devDependencies: devDeps });
const scan = (files, paths = files.map((f) => f.path)) => detectParts(readSignals(files), paths);
const keys = (parts) => parts.map((p) => p.key).sort();

describe("pickKeyFiles", () => {
  it("reads key files shallowest first, skips vendored and huge files, and caps package.json at 5", () => {
    const entries = [
      { path: "apps/web/package.json", size: 100 },
      { path: "package.json", size: 100 },
      { path: "node_modules/express/package.json", size: 100 },
      { path: "docker-compose.yml", size: 100 },
      { path: "big/package.json", size: 500_000 },
      { path: ".env.example", size: 50 },
      { path: "README.md", size: 50 },
      ...Array.from({ length: 8 }, (_, i) => ({ path: `pkgs/p${i}/package.json`, size: 10 })),
    ];
    const picked = pickKeyFiles(entries);
    expect(picked[0]).toBe("package.json");
    expect(picked.filter((p) => p.endsWith("package.json"))).toHaveLength(5);
    expect(picked).toContain("docker-compose.yml");
    expect(picked).toContain(".env.example");
    expect(picked.some((p) => p.includes("node_modules") || p.startsWith("big/") || p === "README.md")).toBe(false);
  });
});

describe("detectParts", () => {
  it("finds a MERN stack with evidence and wires", () => {
    const { parts, wires } = scan([
      { path: "server/package.json", text: pkg({ express: "^5", mongoose: "^8", ioredis: "^5", stripe: "^1" }) },
      { path: "client/package.json", text: pkg({ react: "^19" }, { vite: "^7" }) },
    ]);
    expect(keys(parts)).toEqual(["cache-redis", "client-react", "database-mongodb", "external-stripe", "server-express"]);
    const express = parts.find((p) => p.key === "server-express");
    expect(express.evidence).toEqual([{ path: "server/package.json", reason: '"express" in package.json' }]);
    expect(wires).toEqual(
      expect.arrayContaining([
        { source: "client-react", target: "server-express", label: "HTTP" },
        { source: "server-express", target: "database-mongodb", label: "queries" },
        { source: "server-express", target: "cache-redis", label: "cache" },
        { source: "server-express", target: "external-stripe", label: "API calls" },
      ]),
    );
  });

  it("collapses a group into one part, most specific title first, merging evidence", () => {
    const { parts } = scan([
      { path: "package.json", text: pkg({ next: "15", react: "19", pg: "8", prisma: "6" }) },
      { path: "docker-compose.yml", text: "services:\n  db:\n    image: postgres:16\n  cache:\n    image: 'redis:7-alpine'\n" },
    ]);
    expect(parts.filter((p) => p.kind === "client")).toEqual([expect.objectContaining({ key: "client-nextjs", title: "Next.js app" })]);
    const pgPart = parts.find((p) => p.kind === "database");
    expect(pgPart.key).toBe("database-postgresql");
    expect(pgPart.evidence.map((e) => e.path)).toEqual(expect.arrayContaining(["package.json", "docker-compose.yml"]));
    expect(parts.some((p) => p.key === "cache-redis")).toBe(true);
  });

  it("uses the client as the app when there is no separate server", () => {
    const { wires } = scan([{ path: "package.json", text: pkg({ next: "15", mongodb: "6" }) }]);
    expect(wires).toEqual([{ source: "client-nextjs", target: "database-mongodb", label: "queries" }]);
  });

  it("adds a worker only when a queue has somewhere to run", () => {
    const files = [{ path: "package.json", text: pkg({ express: "5", bullmq: "5" }) }];
    expect(keys(scan(files, ["package.json", "src/app.js"]).parts)).not.toContain("worker");

    const { parts, wires } = scan(files, ["package.json", "src/workers/email.js"]);
    expect(parts.find((p) => p.key === "worker").evidence).toEqual([{ path: "src/workers/email.js", reason: "a worker or jobs file" }]);
    expect(wires).toEqual(expect.arrayContaining([{ source: "queue-bullmq", target: "worker", label: "jobs" }]));
  });

  it("reads Python, Go, prisma and .env.example signals", () => {
    const { parts } = scan([
      { path: "requirements.txt", text: "Django==5.0  # web\npsycopg2-binary>=2.9\ncelery[redis]\n" },
      { path: "go.mod", text: "module example.com/x\n\nrequire (\n\tgithub.com/redis/go-redis/v9 v9.5.0\n)\n" },
      { path: "prisma/schema.prisma", text: 'generator client {\n  provider = "prisma-client-js"\n}\ndatasource db {\n  provider = "mongodb"\n}' },
      { path: ".env.example", text: "OPENAI_API_KEY=\nexport CLOUDINARY_URL=x\n" },
    ]);
    expect(keys(parts)).toEqual(
      ["cache-redis", "database-mongodb", "database-postgresql", "external-openai", "queue-celery", "server-django", "storage-cloudinary", "worker"].sort(),
    );
  });

  it("caps evidence at 5 per part and skips a broken package.json", () => {
    const files = [
      { path: "broken/package.json", text: "{ not json" },
      ...Array.from({ length: 8 }, (_, i) => ({ path: `p${i}/package.json`, text: pkg({ express: "5" }) })),
    ];
    const { parts } = scan(files);
    expect(parts).toHaveLength(1);
    expect(parts[0].evidence).toHaveLength(5);
  });

  it("finds nothing in a repo with no known signals", () => {
    expect(scan([{ path: "package.json", text: pkg({ lodash: "4" }) }]).parts).toEqual([]);
  });

  it("never wires a part to itself or twice", () => {
    const parts = [
      { key: "server-x", kind: "server" },
      { key: "database-a", kind: "database" },
    ];
    const wires = inferWires(parts);
    expect(new Set(wires.map((w) => `${w.source}>${w.target}`)).size).toBe(wires.length);
  });
});

describe("labelScan", () => {
  const parts = [
    { key: "server-express", kind: "server", title: "Express API", sub: "Node.js", why: "Receives requests.", evidence: [] },
    { key: "database-mongodb", kind: "database", title: "MongoDB", sub: "document database", why: "Keeps data.", evidence: [] },
  ];
  const wires = [{ source: "server-express", target: "database-mongodb", label: "queries" }];
  const input = { fullName: "ada/shop", parts, wires, paths: ["package.json"] };
  const reply = (obj) => vi.fn(() => Promise.resolve({ content: JSON.stringify(obj) }));

  afterEach(() => {
    delete process.env.GROQ_API_KEY;
  });

  it("skips the model without an API key", async () => {
    const run = reply({ parts: [], wires: [] });
    expect(await labelScan(input, run)).toEqual({ parts, wires, ai: false });
    expect(run).not.toHaveBeenCalled();
  });

  it("relabels known parts and wires, ignores invented ones, and clamps text", async () => {
    process.env.GROQ_API_KEY = "test";
    const run = reply({
      parts: [
        { key: "server-express", title: "Shop API\nwith\tnewlines", sub: "Express", why: "x".repeat(500) },
        { key: "evil-backdoor", title: "Hacker", sub: "", why: "" },
      ],
      wires: [
        { source: "server-express", target: "database-mongodb", label: "orders and users" },
        { source: "server-express", target: "evil-backdoor", label: "steal" },
      ],
    });
    const out = await labelScan(input, run);
    expect(out.ai).toBe(true);
    expect(out.parts.map((p) => p.key)).toEqual(["server-express", "database-mongodb"]);
    expect(out.parts[0]).toMatchObject({ title: "Shop API with newlines", sub: "Express" });
    expect(out.parts[0].why).toHaveLength(200);
    expect(out.parts[1].title).toBe("MongoDB"); // the model skipped it: scanner label stays
    expect(out.wires).toEqual([{ source: "server-express", target: "database-mongodb", label: "orders and users" }]);
  });

  it("sends paths and detected parts, never file contents", async () => {
    process.env.GROQ_API_KEY = "test";
    const run = reply({ parts: [], wires: [] });
    await labelScan({ ...input, paths: Array.from({ length: 300 }, (_, i) => `f${i}.js`) }, run);
    const sent = JSON.parse(run.mock.calls[0][0][1].content);
    expect(Object.keys(sent).sort()).toEqual(["files", "lens", "parts", "repo", "wires"]);
    expect(sent.lens).toBe("software");
    expect(sent.files).toHaveLength(150);
  });

  it.each([
    ["the model throws", () => Promise.reject(new Error("502"))],
    ["the model returns broken JSON", () => Promise.resolve({ content: "{nope" })],
    ["the model returns the wrong shape", () => Promise.resolve({ content: JSON.stringify({ parts: "x" }) })],
  ])("falls back to scanner labels when %s", async (_name, impl) => {
    process.env.GROQ_API_KEY = "test";
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(await labelScan(input, vi.fn(impl))).toEqual({ parts, wires, ai: false });
  });
});

// ---------------------------------------------------------------------------
// Lenses
// ---------------------------------------------------------------------------

const scanLens = (lens, files, extraPaths = []) => detectParts(readSignals(files), [...files.map((f) => f.path), ...extraPaths], lens);
const wire = (wires, source, target) => wires.find((w) => w.source === source && w.target === target)?.label;
const textOf = (...lines) => lines.join("\n");

describe("lens palettes", () => {
  it("only ever produces kinds from the lens's own palette", () => {
    for (const lens of LENSES) {
      const bad = LENS_SCAN[lens].rules.filter((r) => !LENS_KINDS[lens].includes(r.kind));
      expect(bad.map((r) => r.key)).toEqual([]);
    }
  });

  it("keeps every wire rule inside the lens's palette", () => {
    for (const lens of LENSES) {
      const kinds = new Set([...LENS_KINDS[lens], "app"]);
      for (const w of LENS_SCAN[lens].wires) {
        expect(kinds.has(w.from) && kinds.has(w.to), `${lens}: ${w.from} -> ${w.to}`).toBe(true);
      }
    }
  });

  it("reads at most 16 key files per lens, however big the repo", () => {
    const entries = [
      ...Array.from({ length: 12 }, (_, i) => ({ path: `p${i}/package.json`, size: 10 })),
      ...Array.from({ length: 8 }, (_, i) => ({ path: `r${i}/requirements-${i}.txt`, size: 10 })),
      ...Array.from({ length: 8 }, (_, i) => ({ path: `infra/m${i}.tf`, size: 10 })),
      ...Array.from({ length: 8 }, (_, i) => ({ path: `k8s/d${i}.yaml`, size: 10 })),
      ...Array.from({ length: 6 }, (_, i) => ({ path: `svc${i}/Dockerfile`, size: 10 })),
      ...Array.from({ length: 5 }, (_, i) => ({ path: `.github/workflows/w${i}.yml`, size: 10 })),
      ...Array.from({ length: 5 }, (_, i) => ({ path: `scripts/backup${i}.sh`, size: 10 })),
      { path: "dvc.yaml", size: 10 },
      { path: "nginx.conf", size: 10 },
      { path: "docker-compose.yml", size: 10 },
      { path: "Pipfile", size: 10 },
    ];
    for (const lens of LENSES) expect(pickKeyFiles(entries, lens).length).toBeLessThanOrEqual(16);
  });

  it("picks the files each lens cares about", () => {
    const entries = [
      { path: "Dockerfile", size: 10 },
      { path: "infra/main.tf", size: 10 },
      { path: "k8s/deploy.yaml", size: 10 },
      { path: ".github/workflows/ci.yml", size: 10 },
      { path: "requirements-dev.txt", size: 10 },
      { path: "dvc.yaml", size: 10 },
      { path: "scripts/backup-db.sh", size: 10 },
      { path: "docker-compose.yml", size: 10 },
    ];
    expect(pickKeyFiles(entries, "infrastructure")).toEqual(expect.arrayContaining(["Dockerfile", "infra/main.tf", "k8s/deploy.yaml"]));
    expect(pickKeyFiles(entries, "infrastructure")).not.toContain(".github/workflows/ci.yml");
    expect(pickKeyFiles(entries, "data-ai")).toEqual(expect.arrayContaining(["requirements-dev.txt", "dvc.yaml"]));
    expect(pickKeyFiles(entries, "data-storage")).toEqual(expect.arrayContaining(["scripts/backup-db.sh", ".github/workflows/ci.yml"]));
    expect(pickKeyFiles(entries, "security")).toContain("Dockerfile");
    expect(pickKeyFiles(entries, "software")).toEqual(["docker-compose.yml", "requirements-dev.txt"]);
  });

  it("scans the software lens exactly as before, even when the repo has infrastructure files", () => {
    const files = [{ path: "package.json", text: pkg({ express: "5", mongoose: "8" }) }];
    const before = scan(files);
    const withInfra = detectParts(readSignals(files), ["package.json", "Dockerfile", ".github/workflows/ci.yml", "infra/main.tf"]);
    expect(withInfra).toEqual(before);
  });
});

describe("data-storage lens", () => {
  const files = [
    { path: "package.json", text: pkg({ express: "5", pg: "8", knex: "3", ioredis: "5" }) },
    {
      path: "docker-compose.yml",
      text: textOf("services:", "  db:", "    image: postgres:16", "    environment:", "      POSTGRES_REPLICATION_MODE: master", "  pool:", "    image: bitnami/pgbouncer"),
    },
    { path: "scripts/backup.sh", text: 'pg_dump "$DATABASE_URL" | gzip > dump.sql.gz' },
  ];
  const { parts, wires } = scanLens("data-storage", files, ["migrations/001_init.sql"]);

  it("finds the primary, a replica, a backup and the migrations, each with evidence", () => {
    expect(keys(parts)).toEqual(["backup-backup", "cache-redis", "migration-knex", "primary-postgresql", "replica-replica", "server-express"]);
    expect(parts.find((p) => p.key === "backup-backup").evidence).toEqual([{ path: "scripts/backup.sh", reason: "a backup command in backup.sh" }]);
    expect([...new Set(parts.find((p) => p.key === "replica-replica").evidence.map((e) => e.path))]).toEqual(["docker-compose.yml"]);
    expect(parts.find((p) => p.key === "migration-knex").evidence.map((e) => e.path)).toEqual(
      expect.arrayContaining(["package.json", "migrations/001_init.sql"]),
    );
  });

  it("calls the main database a primary, never a plain database", () => {
    expect(parts.some((p) => p.kind === "database")).toBe(false);
    expect(parts.find((p) => p.kind === "primary").title).toBe("PostgreSQL");
  });

  it("wires the server, primary, replica, backup and migrations", () => {
    expect(wire(wires, "server-express", "primary-postgresql")).toBe("writes");
    expect(wire(wires, "server-express", "replica-replica")).toBe("reads");
    expect(wire(wires, "primary-postgresql", "replica-replica")).toBe("replicates");
    expect(wire(wires, "primary-postgresql", "backup-backup")).toBe("snapshots");
    expect(wire(wires, "migration-knex", "primary-postgresql")).toBe("schema changes");
  });

  it("detects sharding but does not mistake Compose's `replicas:` for a database replica", () => {
    const sharded = scanLens("data-storage", [
      {
        path: "docker-compose.yml",
        text: textOf("services:", "  router:", "    image: mongo", "    command: mongos --configdb cfg/c1", "  web:", "    deploy:", "      replicas: 3"),
      },
    ]);
    expect(keys(sharded.parts)).toEqual(expect.arrayContaining(["shard-shard", "primary-mongodb"]));
    expect(sharded.parts.some((p) => p.kind === "replica")).toBe(false);
  });
});

describe("data-ai lens", () => {
  const files = [
    { path: "requirements.txt", text: textOf("torch==2.4", "mlflow", "apache-airflow", "fastapi", "feast", "kaggle", "psycopg2-binary") },
    { path: "dvc.yaml", text: textOf("stages:", "  train:", "    cmd: python train.py", "metrics:", "  - metrics.json") },
  ];
  const { parts, wires } = scanLens("data-ai", files, ["data/train.csv", "notebooks/explore.ipynb"]);

  it("finds the data, the pipeline, the model, its evaluation and the endpoint", () => {
    expect(keys(parts)).toEqual(
      expect.arrayContaining(["datasource-kaggle", "pipeline-airflow", "model-pytorch", "evaluation-mlflow", "endpoint-fastapi", "featurestore-feast", "database-postgresql"]),
    );
    expect(parts.some((p) => p.kind === "server")).toBe(false);
  });

  it("gathers evidence from the key files, the file list and DVC", () => {
    expect(parts.find((p) => p.key === "pipeline-airflow").evidence.map((e) => e.path)).toEqual(
      expect.arrayContaining(["requirements.txt", "dvc.yaml", "notebooks/explore.ipynb"]),
    );
    expect(parts.find((p) => p.key === "datasource-kaggle").evidence.map((e) => e.path)).toEqual(
      expect.arrayContaining(["requirements.txt", "data/train.csv"]),
    );
    expect(parts.find((p) => p.key === "evaluation-mlflow").evidence.map((e) => e.path)).toEqual(
      expect.arrayContaining(["requirements.txt", "dvc.yaml"]),
    );
  });

  it("wires data to pipeline to model, and the model to its evaluation and endpoint", () => {
    expect(wire(wires, "datasource-kaggle", "pipeline-airflow")).toBe("raw data");
    expect(wire(wires, "pipeline-airflow", "model-pytorch")).toBe("training");
    expect(wire(wires, "model-pytorch", "evaluation-mlflow")).toBe("metrics");
    expect(wire(wires, "model-pytorch", "endpoint-fastapi")).toBe("serves");
    expect(wire(wires, "datasource-kaggle", "model-pytorch")).toBeUndefined();
  });

  it("wires data straight to the model when there is no pipeline", () => {
    const { wires: w } = scanLens("data-ai", [{ path: "requirements.txt", text: textOf("scikit-learn", "kaggle") }]);
    expect(wire(w, "datasource-kaggle", "model-sklearn")).toBe("training data");
  });

  it("reads a Pipfile", () => {
    const { parts: p } = scanLens("data-ai", [
      { path: "Pipfile", text: textOf("[packages]", 'tensorflow = "*"', "[dev-packages]", 'wandb = "*"', "[requires]", 'python_version = "3.11"') },
    ]);
    expect(keys(p)).toEqual(["evaluation-wandb", "model-tensorflow"]);
  });
});

describe("security lens", () => {
  const files = [
    {
      path: "package.json",
      text: pkg({ express: "5", helmet: "8", "express-rate-limit": "7", jsonwebtoken: "9", passport: "0.7", mongoose: "8", react: "19", stripe: "17" }),
    },
    { path: "nginx.conf", text: textOf("server {", "  listen 443 ssl;", "  limit_req zone=api burst=10;", "}") },
    { path: "Dockerfile", text: textOf("FROM node:22", "EXPOSE 3000") },
    { path: ".env.example", text: textOf("JWT_SECRET=", "STRIPE_SECRET_KEY=", "PORT=3000") },
  ];
  const { parts, wires } = scanLens("security", files);

  it("finds the entry, firewall, auth and secrets, each with evidence", () => {
    expect(keys(parts)).toEqual(
      expect.arrayContaining(["entry-nginx", "firewall-rate-limit", "auth-passport", "secrets-env", "server-express", "database-mongodb", "client-react", "external-stripe"]),
    );
    expect(parts.find((p) => p.key === "entry-nginx").evidence.map((e) => e.path)).toEqual(expect.arrayContaining(["nginx.conf", "Dockerfile"]));
    expect(parts.find((p) => p.key === "firewall-rate-limit").evidence.map((e) => e.path)).toEqual(expect.arrayContaining(["package.json", "nginx.conf"]));
    expect(parts.find((p) => p.key === "secrets-env").evidence).toEqual(
      expect.arrayContaining([{ path: ".env.example", reason: "JWT_SECRET in .env.example" }]),
    );
  });

  it("groups login libraries into a single auth part", () => {
    expect(parts.filter((p) => p.kind === "auth")).toHaveLength(1);
    expect(parts.find((p) => p.kind === "auth").evidence.map((e) => e.reason)).toEqual(
      expect.arrayContaining(['"passport" in package.json', '"jsonwebtoken" in package.json']),
    );
  });

  it("walks traffic through the firewall to the server, then to auth and secrets", () => {
    expect(wire(wires, "client-react", "entry-nginx")).toBe("HTTPS");
    expect(wire(wires, "entry-nginx", "firewall-rate-limit")).toBe("requests");
    expect(wire(wires, "firewall-rate-limit", "server-express")).toBe("filtered");
    expect(wire(wires, "server-express", "auth-passport")).toBe("verifies");
    expect(wire(wires, "server-express", "secrets-env")).toBe("reads secrets");
    expect(wire(wires, "entry-nginx", "server-express")).toBeUndefined();
  });

  it("goes straight from the entry to the server when nothing filters traffic", () => {
    const { wires: w } = scanLens("security", [{ path: "package.json", text: pkg({ express: "5" }) }]);
    expect(wire(w, "entry-api", "server-express")).toBe("requests");
  });
});

describe("infrastructure lens", () => {
  const files = [
    { path: "Dockerfile", text: "FROM node:22" },
    { path: "docker-compose.yml", text: textOf("services:", "  web:", "    image: myapp", "  proxy:", "    image: traefik:v3") },
    {
      path: "infra/main.tf",
      text: textOf('resource "aws_route53_record" "www" {}', 'resource "aws_lb" "main" {}', 'resource "aws_db_instance" "db" {}', 'resource "aws_s3_bucket" "assets" {}'),
    },
    { path: "k8s/deploy.yaml", text: textOf("apiVersion: apps/v1", "kind: Deployment") },
  ];
  const { parts, wires } = scanLens("infrastructure", files, [".github/workflows/deploy.yml"]);

  it("finds DNS, the load balancer, the cluster, containers, CI and the data stores", () => {
    expect(keys(parts)).toEqual(
      expect.arrayContaining(["dns-route53", "loadbalancer-terraform", "cluster-kubernetes", "container-docker", "cicd-github-actions", "database-managed", "storage-s3"]),
    );
    expect(parts.find((p) => p.key === "cicd-github-actions").evidence).toEqual([{ path: ".github/workflows/deploy.yml", reason: "a GitHub Actions workflow" }]);
    expect(parts.find((p) => p.key === "loadbalancer-terraform").evidence.map((e) => e.path)).toEqual(expect.arrayContaining(["infra/main.tf"]));
    expect(parts.find((p) => p.key === "container-docker").evidence.map((e) => e.path)).toEqual(expect.arrayContaining(["Dockerfile", "docker-compose.yml"]));
  });

  it("wires traffic from DNS to the load balancer to the cluster, and deploys from CI", () => {
    expect(wire(wires, "dns-route53", "loadbalancer-terraform")).toBe("traffic");
    expect(wire(wires, "loadbalancer-terraform", "cluster-kubernetes")).toBe("requests");
    expect(wire(wires, "cluster-kubernetes", "container-docker")).toBe("runs");
    expect(wire(wires, "cicd-github-actions", "cluster-kubernetes")).toBe("deploys");
    expect(wire(wires, "loadbalancer-terraform", "container-docker")).toBeUndefined();
    // containers are the app (they run inside the cluster), so they carry the data-store wires
    expect(wire(wires, "container-docker", "database-managed")).toBe("queries");
    expect(wire(wires, "cluster-kubernetes", "database-managed")).toBeUndefined();
  });

  it("deploys straight to containers when there is no cluster", () => {
    const { wires: w } = scanLens("infrastructure", [{ path: "Dockerfile", text: "FROM node" }], [".github/workflows/ci.yml"]);
    expect(wire(w, "cicd-github-actions", "container-docker")).toBe("deploys");
  });
});

describe("lenses with nothing to find", () => {
  it("returns no parts for a repo that has nothing for the lens", () => {
    const files = [{ path: "package.json", text: pkg({ lodash: "4" }) }];
    for (const lens of LENSES) expect(scanLens(lens, files).parts).toEqual([]);
  });

  it("falls back to the software lens for an unknown lens id", () => {
    const files = [{ path: "package.json", text: pkg({ express: "5" }) }];
    expect(keys(detectParts(readSignals(files), ["package.json"], "nope").parts)).toEqual(["server-express"]);
  });
});
