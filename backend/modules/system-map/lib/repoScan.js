// Pure part of the repo scan: which files to read, which signals they hold, and
// the parts and wires those signals add up to. No I/O, so it is unit-tested
// with plain strings (services/scanService.js does the GitHub calls).

import { DEFAULT_LENS, LENS_KINDS } from "./lenses.js";
import { KIND_WHY, LENS_SCAN, WORKER_PATH, WORKER_SIGNALS } from "./scanRules.js";

const MAX_EVIDENCE = 5;
const MAX_FILE_BYTES = 200_000; // key files are small; anything bigger is generated or vendored

const base = (path) => path.slice(path.lastIndexOf("/") + 1);
const depth = (path) => path.split("/").length;
const vendored = (path) => /(^|\/)(node_modules|vendor|dist|build|\.next)\//.test(path);

// What a key file is, by path. Order matters: the first match wins, so the
// specific kinds (compose, workflow) come before the broad one (k8s).
const FILE_KINDS = [
  { kind: "package", test: (p) => base(p) === "package.json" },
  { kind: "compose", test: (p) => /^(docker-)?compose(\.[\w-]+)?\.ya?ml$/i.test(base(p)) },
  { kind: "requirements", test: (p) => /^requirements([-.\w]*)\.txt$/i.test(base(p)) },
  { kind: "pyproject", test: (p) => base(p) === "pyproject.toml" },
  { kind: "pipfile", test: (p) => base(p) === "Pipfile" },
  { kind: "gomod", test: (p) => base(p) === "go.mod" },
  { kind: "env", test: (p) => base(p) === ".env.example" },
  { kind: "prisma", test: (p) => base(p) === "schema.prisma" },
  { kind: "dockerfile", test: (p) => /^Dockerfile(\.[\w.-]+)?$|\.dockerfile$/i.test(base(p)) },
  { kind: "nginx", test: (p) => /(^|\/)nginx\/[^/]+\.conf$|(^|\/)nginx[\w.-]*\.conf$/i.test(p) },
  { kind: "tf", test: (p) => /\.tf$/.test(p) },
  { kind: "workflow", test: (p) => /^\.github\/workflows\/[^/]+\.ya?ml$/.test(p) },
  { kind: "dvc", test: (p) => base(p) === "dvc.yaml" },
  { kind: "script", test: (p) => /backup[^/]*\.(sh|js|ts|py)$/i.test(base(p)) },
  { kind: "k8s", test: (p) => /\.ya?ml$/.test(p) && /(^|\/)(k8s|kubernetes|manifests|deploy|deployment|helm|charts?)\//i.test(p) },
];

// How many files of each kind to read per lens (at most ~16 reads in total).
const LENS_FILES = {
  software: { package: 5, compose: 2, requirements: 2, pyproject: 1, gomod: 1, env: 2, prisma: 1 },
  "data-storage": { package: 3, compose: 2, requirements: 1, pyproject: 1, env: 1, prisma: 1, script: 2, workflow: 1 },
  "data-ai": { package: 1, requirements: 3, pyproject: 1, pipfile: 1, dvc: 1, compose: 1, env: 1 },
  security: { package: 3, compose: 1, requirements: 1, pyproject: 1, dockerfile: 1, nginx: 1, env: 2 },
  infrastructure: { package: 1, compose: 2, dockerfile: 2, nginx: 1, tf: 3, k8s: 3 },
};

const kindOf = (path) => FILE_KINDS.find((k) => k.test(path))?.kind ?? null;

/**
 * The key files worth reading, shallowest first (the root package.json says
 * more than a nested example's). The lens decides which kinds matter.
 * @param {{ path: string, size: number }[]} entries
 * @param {string} [lens]
 */
export function pickKeyFiles(entries, lens = DEFAULT_LENS) {
  const wanted = LENS_FILES[lens] ?? LENS_FILES[DEFAULT_LENS];
  const candidates = entries
    .filter((e) => !vendored(e.path) && e.size <= MAX_FILE_BYTES)
    .sort((a, b) => depth(a.path) - depth(b.path) || a.path.localeCompare(b.path));
  return Object.entries(wanted).flatMap(([kind, max]) =>
    candidates.filter((e) => kindOf(e.path) === kind).slice(0, max).map((e) => e.path),
  );
}

// ---- Readers: a key file's text -> signals ---------------------------------

const npmSignals = (text) => {
  const pkg = JSON.parse(text);
  return Object.keys({ ...pkg.dependencies, ...pkg.devDependencies }).map((name) => [`npm:${name}`, `"${name}" in package.json`]);
};

const requirementsSignals = (text) =>
  text
    .split(/\r?\n/)
    .map((line) => line.replace(/#.*/, "").trim().match(/^([A-Za-z0-9_.-]+)/)?.[1])
    .filter(Boolean)
    .map((name) => [`py:${name.toLowerCase()}`, `"${name}" in requirements`]);

const pyprojectSignals = (text) =>
  [...text.matchAll(/["']([A-Za-z0-9_.-]+)\s*(?:[<>=~!;[\s]|["'])/g)].map(([, name]) => [`py:${name.toLowerCase()}`, `"${name}" in pyproject.toml`]);

// Pipfile: `name = "*"` lines under [packages] and [dev-packages].
const pipfileSignals = (text) => {
  let inPackages = false;
  const out = [];
  for (const line of text.split(/\r?\n/)) {
    const section = line.match(/^\s*\[([^\]]+)\]/);
    if (section) inPackages = /^(dev-)?packages$/.test(section[1]);
    else if (inPackages) {
      const name = line.match(/^\s*"?([A-Za-z0-9_.-]+)"?\s*=/)?.[1];
      if (name) out.push([`py:${name.toLowerCase()}`, `"${name}" in Pipfile`]);
    }
  }
  return out;
};

const goSignals = (text) =>
  [...text.matchAll(/^\s*(?:require\s+)?([a-z0-9.-]+\.[a-z]+\/[^\s]+)\s+v/gm)].map(([, mod]) => [`go:${mod}`, `"${mod}" in go.mod`]);

const composeSignals = (text) =>
  [...text.matchAll(/^\s*image:\s*["']?([^\s"'#]+)/gm)].map(([, image]) => {
    const name = image.split("/").pop().split(":")[0].toLowerCase();
    return [`image:${name}`, `image "${image}" in docker-compose`];
  });

const SECRET_NAME = /(SECRET|TOKEN|API_KEY|PASSWORD|PRIVATE_KEY)/;

const envSignals = (text) =>
  [...text.matchAll(/^\s*(?:export\s+)?([A-Z][A-Z0-9_]*)\s*=/gm)].flatMap(([, name]) => [
    [`env:${name}`, `${name} in .env.example`],
    // Any secret-looking name proves secrets live in env files (security lens).
    ...(SECRET_NAME.test(name) ? [["t:secret-env", `${name} in .env.example`]] : []),
  ]);

const prismaSignals = (text) =>
  [...text.matchAll(/provider\s*=\s*"([a-z]+)"/g)]
    .filter(([, p]) => p !== "prisma-client-js")
    .map(([, provider]) => [`prisma:${provider}`, `provider "${provider}" in schema.prisma`]);

// Patterns searched inside a key file's text. Several entries may share an id
// (any of them proves it). `kinds` is which file kinds they apply to.
const TEXT_PATTERNS = [
  { id: "expose", re: /^\s*EXPOSE\s+\d+/im, label: "EXPOSE", kinds: ["dockerfile"] },
  { id: "nginx-listen", re: /^\s*listen\s+(?:\[::\]:)?(?:80|443)\b/m, label: "listen 80/443", kinds: ["nginx"] },
  { id: "limit-req", re: /\blimit_req(?:_zone)?\b/, label: "limit_req", kinds: ["nginx"] },
  { id: "modsecurity", re: /modsecurity/i, label: "ModSecurity", kinds: ["nginx", "compose"] },
  { id: "nginx-proxy", re: /\b(?:proxy_pass|upstream)\b/, label: "proxy_pass / upstream", kinds: ["nginx"] },
  { id: "compose-services", re: /^services:\s*$/m, label: "services", kinds: ["compose"] },
  // Replication settings only; a bare "replicas:" is just how many copies Compose runs.
  { id: "replica", re: /--replSet|replicaSet|READ_REPLICA|DB_REPLICA|REPLICATION_MODE|REPLICA_SET|POSTGRES_REPLICA/, label: "a replica setting", kinds: ["compose", "env"] },
  { id: "replica", re: /pgbouncer/i, label: "pgbouncer", kinds: ["compose"] },
  { id: "shard", re: /\b(?:mongos|shardsvr|configsvr|citus|vitess|vtgate)\b|SHARD_|_SHARD\b/, label: "sharding", kinds: ["compose", "env"] },
  { id: "backup", re: /\b(?:pg_dump|pg_dumpall|mongodump|mysqldump|restic|wal-g|pgbackrest|barman)\b/, label: "a backup command", kinds: ["script", "workflow", "compose"] },
  { id: "backup", re: /\bBACKUP_[A-Z0-9_]+/, label: "a BACKUP_ setting", kinds: ["env", "compose"] },
  { id: "backup", re: /\bbackup\b/i, label: "a backup job", kinds: ["workflow"] },
  { id: "dvc-stages", re: /^stages:\s*$/m, label: "stages", kinds: ["dvc"] },
  { id: "dvc-metrics", re: /^\s*(?:metrics|evaluate)\b/m, label: "metrics", kinds: ["dvc"] },
  { id: "tf-route53", re: /resource\s+"aws_route53_/, label: "a Route 53 resource", kinds: ["tf"] },
  { id: "tf-cloudflare", re: /resource\s+"cloudflare_/, label: "a Cloudflare resource", kinds: ["tf"] },
  { id: "tf-cloudfront", re: /resource\s+"aws_cloudfront_distribution"/, label: "a CloudFront distribution", kinds: ["tf"] },
  { id: "tf-cdn", re: /resource\s+"(?:google_compute_backend_bucket|azurerm_cdn_[a-z_]+)"/, label: "a CDN resource", kinds: ["tf"] },
  {
    id: "tf-lb",
    re: /resource\s+"(?:aws_lb|aws_alb|aws_elb|google_compute_(?:forwarding_rule|url_map|global_forwarding_rule)|azurerm_lb|azurerm_application_gateway)"/,
    label: "a load balancer resource",
    kinds: ["tf"],
  },
  { id: "tf-eks", re: /resource\s+"(?:aws_eks_cluster|google_container_cluster|azurerm_kubernetes_cluster)"/, label: "a Kubernetes cluster resource", kinds: ["tf"] },
  { id: "tf-ecs", re: /resource\s+"aws_ecs_(?:cluster|service)"/, label: "an ECS resource", kinds: ["tf"] },
  {
    id: "tf-db",
    re: /resource\s+"(?:aws_db_instance|aws_rds_cluster|aws_dynamodb_table|google_sql_database_instance|azurerm_(?:postgresql|mysql|mssql)_[a-z_]+|azurerm_cosmosdb_account)"/,
    label: "a database resource",
    kinds: ["tf"],
  },
  { id: "tf-s3", re: /resource\s+"(?:aws_s3_bucket|google_storage_bucket|azurerm_storage_account)"/, label: "a storage bucket resource", kinds: ["tf"] },
  { id: "k8s-ingress", re: /^kind:\s*Ingress\b/m, label: "kind: Ingress", kinds: ["k8s"] },
  { id: "k8s-workload", re: /^kind:\s*(?:Deployment|StatefulSet|DaemonSet)\b/m, label: "a workload", kinds: ["k8s"] },
];

const textSignals = (kind, path, text) => {
  const seen = new Set();
  return TEXT_PATTERNS.filter((t) => t.kinds.includes(kind) && t.re.test(text))
    .filter((t) => !seen.has(t.id) && seen.add(t.id))
    .map((t) => [`t:${t.id}`, `${t.label} in ${base(path)}`]);
};

const READERS = {
  package: npmSignals,
  compose: (text, path) => [...composeSignals(text), ...textSignals("compose", path, text)],
  requirements: requirementsSignals,
  pyproject: pyprojectSignals,
  pipfile: pipfileSignals,
  gomod: goSignals,
  env: (text, path) => [...envSignals(text), ...textSignals("env", path, text)],
  prisma: prismaSignals,
};

/**
 * Every signal in the key files, with where it came from. A file that doesn't
 * parse (a broken package.json) is skipped, not fatal.
 * @param {{ path: string, text: string }[]} files
 * @returns {{ id: string, path: string, reason: string }[]}
 */
export function readSignals(files) {
  return files.flatMap(({ path, text }) => {
    const kind = kindOf(path);
    if (!kind) return [];
    const read = READERS[kind] ?? ((t, p) => textSignals(kind, p, t));
    try {
      return read(text, path).map(([id, reason]) => ({ id, path, reason }));
    } catch {
      return [];
    }
  });
}

// ---- Signals from the file list alone (nothing is downloaded) ---------------

const PATH_SIGNALS = [
  { id: "dockerfile", re: /(^|\/)Dockerfile(\.[\w.-]+)?$|\.dockerfile$/i, reason: "a Dockerfile" },
  { id: "github-workflows", re: /^\.github\/workflows\/[^/]+\.ya?ml$/, reason: "a GitHub Actions workflow" },
  { id: "gitlab-ci", re: /^\.gitlab-ci\.ya?ml$/, reason: "a GitLab CI file" },
  { id: "jenkinsfile", re: /(^|\/)Jenkinsfile$/, reason: "a Jenkinsfile" },
  { id: "circleci", re: /^\.circleci\/config\.ya?ml$/, reason: "a CircleCI config" },
  { id: "chart", re: /(^|\/)Chart\.yaml$/, reason: "a Helm chart" },
  { id: "haproxy", re: /(^|\/)haproxy\.cfg$/, reason: "an HAProxy config" },
  { id: "traefik", re: /(^|\/)traefik(\.[\w-]+)?\.(?:ya?ml|toml)$/, reason: "a Traefik config" },
  { id: "migrations", re: /(^|\/)(?:migrations?|migrate)\/[^/]+/, reason: "a migrations folder" },
  { id: "alembic", re: /(^|\/)alembic\.ini$/, reason: "an Alembic config" },
  { id: "knexfile", re: /(^|\/)knexfile\.[cm]?[jt]s$/, reason: "a knexfile" },
  { id: "mlproject", re: /(^|\/)MLproject$/, reason: "an MLproject file" },
  { id: "notebook", re: /\.ipynb$/, reason: "a notebook" },
  { id: "data-files", re: /\.(?:csv|parquet|jsonl|feather)$/i, reason: "a data file" },
];

/** One signal per kind of path, pointing at the first matching file (never its contents). */
export function readPathSignals(paths) {
  const real = paths.filter((p) => !vendored(p));
  return PATH_SIGNALS.flatMap(({ id, re, reason }) => {
    const path = real.find((p) => re.test(p));
    return path ? [{ id: `path:${id}`, path, reason }] : [];
  });
}

// ---- Signals -> parts and wires --------------------------------------------

const matches = (wanted, id) => (wanted.startsWith("go:") ? id.startsWith(wanted) : id === wanted);

const addEvidence = (part, items) => {
  for (const item of items) {
    if (part.evidence.length >= MAX_EVIDENCE) return;
    if (!part.evidence.some((e) => e.path === item.path && e.reason === item.reason)) part.evidence.push(item);
  }
};

/**
 * Turns signals into parts (one per rule group) and the wires between them.
 * Only kinds in the lens's palette can come out, so a map never holds a part
 * its own editor can't add.
 * @param {{ id: string, path: string, reason: string }[]} signals
 * @param {string[]} paths  every file path of the repo (for workers, data files, CI files)
 * @param {string} [lens]
 */
export function detectParts(signals, paths, lens = DEFAULT_LENS) {
  const config = LENS_SCAN[lens] ?? LENS_SCAN[DEFAULT_LENS];
  const palette = LENS_KINDS[lens] ?? LENS_KINDS[DEFAULT_LENS];
  const all = [...signals, ...readPathSignals(paths)];
  const byGroup = new Map();

  for (const r of config.rules) {
    if (!palette.includes(r.kind)) continue;
    const hits = all.filter((s) => r.signals.some((w) => matches(w, s.id))).map(({ path, reason }) => ({ path, reason }));
    if (!hits.length) continue;
    const existing = byGroup.get(r.group);
    if (existing) {
      addEvidence(existing, hits);
    } else {
      const part = { key: r.key, kind: r.kind, title: r.title, sub: r.sub, why: KIND_WHY[r.kind], evidence: [] };
      addEvidence(part, hits);
      byGroup.set(r.group, part);
    }
  }

  const parts = [...byGroup.values()];

  if (config.workers && parts.some((p) => p.kind === "queue")) {
    const workerPaths = paths.filter((p) => !vendored(p) && WORKER_PATH.test(p)).slice(0, 3);
    const workerSignals = signals.filter((s) => WORKER_SIGNALS.includes(s.id));
    const evidence = [
      ...workerSignals.map(({ path, reason }) => ({ path, reason })),
      ...workerPaths.map((path) => ({ path, reason: "a worker or jobs file" })),
    ];
    if (evidence.length) {
      const worker = { key: "worker", kind: "worker", title: "Worker", sub: "background jobs", why: KIND_WHY.worker, evidence: [] };
      addEvidence(worker, evidence);
      parts.push(worker);
    }
  }

  return { parts, wires: inferWires(parts, lens) };
}

/** Wires between the detected parts, per the lens's wire rules. */
export function inferWires(parts, lens = DEFAULT_LENS) {
  const config = LENS_SCAN[lens] ?? LENS_SCAN[DEFAULT_LENS];
  const ofKind = (kind) => parts.filter((p) => p.kind === kind);
  const app = config.appKinds.map(ofKind).find((found) => found.length) ?? [];
  const sources = (from) => (from === "app" ? app : ofKind(from));

  const wires = [];
  for (const { from, to, label, unless } of config.wires) {
    if (unless && ofKind(unless).length) continue;
    for (const s of sources(from)) {
      for (const t of ofKind(to)) {
        if (s.key !== t.key && !wires.some((w) => w.source === s.key && w.target === t.key)) {
          wires.push({ source: s.key, target: t.key, label });
        }
      }
    }
  }
  return wires;
}
