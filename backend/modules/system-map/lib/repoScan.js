// Pure part of the repo scan: which files to read, which signals they hold, and
// the parts and wires those signals add up to. No I/O, so it is unit-tested
// with plain strings (services/scanService.js does the GitHub calls).

import { DEFAULT_LENS, LENS_KINDS } from "./lenses.js";
import { KIND_WHY, LENS_SCAN, WORKER_PATH, WORKER_SIGNALS } from "./scanRules.js";
import { configWires } from "./configWires.js";
import { dirOf, guessUnitKind, imageName, isWorkerService, readLayout } from "./scanLayout.js";

const MAX_EVIDENCE = 5;
const MAX_FILE_BYTES = 200_000; // key files are small; anything bigger is generated or vendored

const base = (path) => path.slice(path.lastIndexOf("/") + 1);
const depth = (path) => path.split("/").length;
const TEST_COMPOSE = /compose[\w.-]*[.-](test|tests|e2e|ci)\.ya?ml$/i; // how the tests run, not the system
// Test projects and generated code look like an app but aren't this one.
const NOT_THE_APP = /(^|\/)(tests?|__tests__|fixtures|test-projects?|e2e|generated)\//i;
// deploy/judge0/docker-compose.yml: someone else's product, run next to the app.
const HELPER_COMPOSE = /(^|\/)(deploy|contrib|infra|third[-_]?party)\/[^/]+\//i;
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
  { kind: "env", test: (p) => /^\.env\.(example|sample|template)$/.test(base(p)) },
  { kind: "prisma", test: (p) => base(p) === "schema.prisma" },
  { kind: "dockerfile", test: (p) => /^Dockerfile(\.[\w.-]+)?$|\.dockerfile$/i.test(base(p)) },
  { kind: "nginx", test: (p) => /(^|\/)nginx\/[^/]+\.conf$|(^|\/)nginx[\w.-]*\.conf$/i.test(p) },
  { kind: "tf", test: (p) => /\.tf$/.test(p) },
  { kind: "workflow", test: (p) => /^\.github\/workflows\/[^/]+\.ya?ml$/.test(p) },
  { kind: "dvc", test: (p) => base(p) === "dvc.yaml" },
  { kind: "script", test: (p) => /backup[^/]*\.(sh|js|ts|py)$/i.test(base(p)) },
  { kind: "k8s", test: (p) => /\.ya?ml$/.test(p) && /(^|\/)([\w-]*(k8s|kubernetes|manifests)[\w-]*|deploy|deployment|helm|charts?)\//i.test(p) },
];

// How many files of each kind to read per lens. They come from a CDN that does not
// count against GitHub's API limit, and are read at the same time.
export const MAX_KEY_FILES = 60;
const LENS_FILES = {
  software: { package: 14, compose: 3, requirements: 5, pyproject: 3, gomod: 5, env: 5, prisma: 2, nginx: 2, k8s: 16 },
  "data-storage": { package: 3, compose: 2, requirements: 1, pyproject: 1, env: 1, prisma: 1, script: 2, workflow: 1 },
  "data-ai": { package: 1, requirements: 3, pyproject: 1, pipfile: 1, dvc: 1, compose: 1, env: 1 },
  security: { package: 3, compose: 1, requirements: 1, pyproject: 1, dockerfile: 1, nginx: 1, env: 2 },
  infrastructure: { package: 1, compose: 2, dockerfile: 2, nginx: 1, tf: 3, k8s: 3 },
};

// Files that list what their own folder uses.
const MANIFEST_KINDS = new Set(["package", "requirements", "pyproject", "pipfile", "gomod", "env", "prisma"]);

const kindOf = (path) => FILE_KINDS.find((k) => k.test(path))?.kind ?? null;

/**
 * The key files worth reading, shallowest first (the root package.json says
 * more than a nested example's). The lens decides which kinds matter.
 * @param {{ path: string, size: number }[]} entries
 * @param {string} [lens]
 */
export function pickKeyFiles(entries, lens = DEFAULT_LENS) {
  const wanted = LENS_FILES[lens] ?? LENS_FILES[DEFAULT_LENS];
  const ownCompose = entries.some((e) => kindOf(e.path) === "compose" && !HELPER_COMPOSE.test(e.path) && !TEST_COMPOSE.test(e.path) && !NOT_THE_APP.test(e.path) && !vendored(e.path));
  const candidates = entries
    .filter((e) => !NOT_THE_APP.test(e.path) && !(ownCompose && kindOf(e.path) === "compose" && HELPER_COMPOSE.test(e.path)))
    .filter((e) => !vendored(e.path) && !TEST_COMPOSE.test(e.path) && e.size <= MAX_FILE_BYTES)
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

const k8sImageSignals = (text, path) =>
  [...text.matchAll(/^\s*-?\s*image:\s*["']?([^\s"'#]+)/gm)].map(([, image]) => [`image:${imageName(image)}`, `image "${image}" in ${base(path)}`]);

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
  k8s: (text, path) => [...k8sImageSignals(text, path), ...textSignals("k8s", path, text)],
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

// Parts that run the project's own code: one per service, where the others
// (a database, a queue) are shared by the whole repo.
const UNIT_KINDS = new Set(["client", "server", "endpoint"]);
const CODE_KINDS = new Set([...UNIT_KINDS, "worker", "container"]);

/** The key files with what kind each is, for readLayout. */
export const tagFiles = (files) => files.map((f) => ({ ...f, kind: kindOf(f.path) }));

// Copies of one database (a replica set) are one part; differently named ones are two.
const replicaName = (name) => name.toLowerCase().replace(/[-_]?(\d+|primary|secondary|replica|master|slave|arbiter)$/g, "");

// One part per service for the rules' code parts, named after the service once there is more than one.
function nameServices(drafts) {
  const groups = new Map();
  for (const d of drafts) if (d.unit !== undefined) groups.set(d.group, [...(groups.get(d.group) ?? []), d]);
  for (const list of groups.values()) {
    // The root's copy of a group a real service already has is a hoisted dependency.
    const real = list.filter((d) => d.unit !== "");
    const root = list.find((d) => d.unit === "");
    if (real.length && root) drafts.splice(drafts.indexOf(root), 1);
  }
  const perKind = new Map();
  for (const d of drafts) if (d.unit) perKind.set(d.part.kind, [...(perKind.get(d.part.kind) ?? []), d]);
  for (const list of perKind.values()) {
    if (list.length < 2) continue;
    for (const d of list) {
      d.part.sub = d.generic ? d.part.sub : d.part.title;
      d.part.title = d.unitName;
      d.part.key = `${d.part.key}@${d.unit}`;
    }
  }
}

/**
 * Turns signals into parts and the wires between them. Only kinds in the lens's
 * palette can come out, so a map never holds a part its own editor can't add.
 * @param {{ id: string, path: string, reason: string }[]} signals
 * @param {string[]} paths  every file path of the repo (for workers, data files, CI files)
 * @param {string} [lens]
 * @param {{ path: string, text: string }[]} [files]  the key files, to find several services and the wires config proves
 */
export function detectParts(signals, paths, lens = DEFAULT_LENS, files = []) {
  const config = LENS_SCAN[lens] ?? LENS_SCAN[DEFAULT_LENS];
  const palette = LENS_KINDS[lens] ?? LENS_KINDS[DEFAULT_LENS];
  const tagged = tagFiles(files);
  const layout = readLayout(tagged, paths);
  const unitByDir = new Map(layout.units.map((u) => [u.dir, u]));
  const all = [...signals, ...readPathSignals(paths)];
  const drafts = []; // { part, group, unit?, unitName?, dirs, generic? }
  const byBucket = new Map();
  const rootParts = new Map(); // service name -> part key

  for (const r of config.rules) {
    if (!palette.includes(r.kind)) continue;
    const hits = all.filter((s) => r.signals.some((w) => matches(w, s.id)));
    const perUnit = UNIT_KINDS.has(r.kind);
    const units = perUnit ? [...new Set(hits.map((h) => layout.unitOf(h.path)))] : [undefined];
    for (const unit of units) {
      const mine = hits.filter((h) => !perUnit || layout.unitOf(h.path) === unit);
      if (!mine.length) continue;
      const bucket = `${r.group}@${unit ?? ""}`;
      let draft = byBucket.get(bucket);
      if (!draft) {
        draft = {
          part: { key: r.key, kind: r.kind, title: r.title, sub: r.sub, why: KIND_WHY[r.kind], evidence: [] },
          group: r.group,
          unit,
          unitName: unitByDir.get(unit)?.name,
          dirs: new Set(),
        };
        byBucket.set(bucket, draft);
        drafts.push(draft);
      }
      addEvidence(draft.part, mine.map(({ path, reason }) => ({ path, reason })));
      for (const h of mine) if (MANIFEST_KINDS.has(kindOf(h.path))) draft.dirs.add(dirOf(h.path));
    }
  }

  // Services Compose or Kubernetes runs that no rule knows (another language, no framework).
  for (const u of layout.units) {
    if (!u.confirmed || drafts.some((d) => d.unit === u.dir)) continue;
    const guessed = guessUnitKind(u.name);
    const kind = palette.includes(guessed) && (guessed !== "worker" || config.workers) ? guessed : "server";
    if (!config.appKinds.includes("server") || !palette.includes(kind)) continue;
    const part = { key: `${kind}-service`, kind, title: u.name, sub: "service", why: KIND_WHY[kind], evidence: [] };
    addEvidence(part, u.evidence);
    drafts.push({ part, group: `${kind}-service`, unit: u.dir, unitName: u.name, dirs: new Set([u.dir]), generic: true });
  }
  nameServices(drafts);

  // Compose builds the repo's root, in a language no rule knows: each service it starts is a part.
  const atRoot = layout.services.filter((s) => s.dir === "" && !isWorkerService(s));
  if (config.appKinds.includes("server") && !drafts.some((d) => d.part.kind === "server") && !layout.units.some((u) => u.confirmed)) {
    for (const s of atRoot) {
      const part = { key: `server-service@${s.name}`, kind: "server", title: s.name, sub: "service", why: KIND_WHY.server, evidence: [] };
      addEvidence(part, [{ path: s.path, reason: `service "${s.name}" in ${base(s.path)}` }]);
      drafts.push({ part, group: "root-service", unit: undefined, dirs: new Set([""]) });
      rootParts.set(s.name, part.key);
    }
  }

  const partOfService = new Map(rootParts);
  const infraPart = (image) => drafts.find((d) => d.unit === undefined && config.rules.some((r) => r.group === d.group && r.signals.includes(`image:${image}`)));
  splitDatabases(drafts, layout.services, infraPart);

  if (config.workers) addWorkers({ drafts, layout, signals, paths, partOfService });

  for (const s of layout.services) {
    if (partOfService.has(s.name)) continue;
    const own = s.dir ? unitPart(drafts, layout.unitOf(`${s.dir}/x`) || s.dir) : null;
    const infra = s.image ? (drafts.find((d) => d.service === s.name) ?? infraPart(s.image)) : null;
    const part = s.dir ? own : infra;
    if (part) partOfService.set(s.name, part.part.key);
  }
  // One app and one unnamed service with its settings: the settings are the app's.
  const code = drafts.filter((d) => UNIT_KINDS.has(d.part.kind));
  const main = code.find((d) => d.part.kind === "server" || d.part.kind === "endpoint") ?? code[0];
  const single = main && code.every((d) => d === main || d.part.kind === "client");
  const unnamed = layout.services.filter((s) => !partOfService.has(s.name) && s.env.length && (s.dir === "" || (s.dir === null && !infraPart(s.image ?? ""))));
  if (single && unnamed.length === 1) partOfService.set(unnamed[0].name, main.part.key);
  const container = drafts.find((d) => d.part.kind === "container");
  if (container) for (const s of layout.services) if (!partOfService.has(s.name) && (s.dir !== null || !infraPart(s.image ?? ""))) partOfService.set(s.name, container.part.key);

  const parts = drafts.map((d) => d.part);
  const partKind = new Map(parts.map((p) => [p.key, p.kind]));
  const codePartFor = (dir, side) => {
    const unit = layout.unitOf(`${dir}/x`);
    const inUnit = drafts.filter((d) => d.unit === unit && UNIT_KINDS.has(d.part.kind));
    if (side === "proxy") {
      const proxy = drafts.find((d) => ["loadbalancer", "entry"].includes(d.part.kind));
      return (proxy ?? (unit ? inUnit.find((d) => d.part.kind === "client") : null))?.part.key ?? null;
    }
    const fits = (d) => (side === "client" ? d.part.kind === "client" : d.part.kind !== "client");
    const found = inUnit.filter(fits);
    const pool = found.length ? found : unit ? [] : drafts.filter((d) => UNIT_KINDS.has(d.part.kind) && fits(d));
    if (pool.length) return pool.length === 1 ? pool[0].part.key : null;
    // No separate server: a Next.js app reads its own database settings.
    return side === "code" && inUnit.length === 1 ? inUnit[0].part.key : null;
  };

  const shown = configWires({ files: tagged, layout, partOfService, codePartFor, kindOf: partKind });
  return { parts, wires: mergeWires(inferWires(parts, lens, drafts), shown, config, partKind) };
}

const unitPart = (drafts, unit) =>
  ["server", "endpoint", "worker", "client"].map((kind) => drafts.find((d) => d.unit === unit && d.part.kind === kind)).find(Boolean) ?? null;

// users-db and orders-db on the same engine are two parts, when Compose runs both.
function splitDatabases(drafts, services, infraPart) {
  const byDraft = new Map();
  for (const s of services) {
    if (!s.image || s.dir !== null || /replSet/i.test(s.command)) continue;
    const draft = infraPart(s.image);
    if (draft && ["database", "primary", "cache"].includes(draft.part.kind)) byDraft.set(draft, [...(byDraft.get(draft) ?? []), s]);
  }
  for (const [draft, list] of byDraft) {
    const distinct = list.filter((s, i) => list.findIndex((o) => replicaName(o.name) === replicaName(s.name)) === i);
    if (distinct.length < 2) continue;
    const split = distinct.map((s) => ({
      ...draft,
      service: s.name,
      dirs: new Set(),
      part: { ...draft.part, key: `${draft.part.key}@${s.name}`, title: s.name, sub: draft.part.title, evidence: [{ path: s.path, reason: `service "${s.name}" in ${base(s.path)}` }] },
    }));
    drafts.splice(drafts.indexOf(draft), 1, ...split);
  }
}

function addWorkers({ drafts, layout, signals, paths, partOfService }) {
  const worker = (key, title, sub, evidence, unit, dirs) => {
    const part = { key, kind: "worker", title, sub, why: KIND_WHY.worker, evidence: [] };
    addEvidence(part, evidence);
    const draft = { part, group: key, unit, unitName: title, dirs };
    drafts.push(draft);
    return draft;
  };

  // Compose runs the same code twice: once as the app, once as its worker.
  const services = layout.services.filter((s) => s.dir !== null && isWorkerService(s));
  const separate = services.filter((s) => {
    const own = unitPart(drafts, s.dir);
    if (own?.part.kind === "worker") partOfService.set(s.name, own.part.key);
    return own?.part.kind !== "worker";
  });
  for (const s of separate) {
    // A unit of its own whose only part is the worker: not a server too.
    const twin = layout.services.some((o) => o !== s && o.dir === s.dir);
    const own = unitPart(drafts, s.dir);
    if (own && !twin && s.dir) drafts.splice(drafts.indexOf(own), 1);
    const draft = worker(separate.length > 1 ? `worker@${s.name}` : "worker", s.name, "background jobs", [{ path: s.path, reason: `service "${s.name}" in ${base(s.path)}` }], undefined, new Set([s.dir]));
    partOfService.set(s.name, draft.part.key);
  }
  if (drafts.some((d) => d.part.kind === "worker")) return;

  if (!drafts.some((d) => d.part.kind === "queue")) return;
  const workerPaths = paths.filter((p) => !vendored(p) && WORKER_PATH.test(p)).slice(0, 3);
  const evidence = [
    ...signals.filter((s) => WORKER_SIGNALS.includes(s.id)).map(({ path, reason }) => ({ path, reason })),
    ...workerPaths.map((path) => ({ path, reason: "a worker or jobs file" })),
  ];
  if (!evidence.length) return;
  const manifestDirs = [...new Set(signals.filter((s) => MANIFEST_KINDS.has(kindOf(s.path))).map((s) => dirOf(s.path)))].sort((a, b) => b.length - a.length);
  const home = manifestDirs.find((dir) => evidence.some((e) => dir === "" || e.path.startsWith(`${dir}/`)));
  worker("worker", "Worker", "background jobs", evidence, undefined, new Set(home === undefined ? [] : [home]));
}

const overlap = (a, b) => [...a].some((x) => b.has(x));

/**
 * Wires between the detected parts, per the lens's wire rules. "likely" when the
 * source's own manifest lists what the target is, "guessed" when only the kinds fit.
 * @param {object[]} [drafts]  what detectParts knows about each part's folders
 */
export function inferWires(parts, lens = DEFAULT_LENS, drafts = []) {
  const config = LENS_SCAN[lens] ?? LENS_SCAN[DEFAULT_LENS];
  const ofKind = (kind) => parts.filter((p) => p.kind === kind);
  const dirs = new Map(drafts.map((d) => [d.part.key, d.dirs]));
  const shares = (s, t) => overlap(dirs.get(s.key) ?? new Set(), dirs.get(t.key) ?? new Set());

  const app = config.appKinds.map(ofKind).find((found) => found.length) ?? [];
  // In a monorepo a Next.js app can read the database itself, next to a separate server.
  const appDirs = new Set(app.flatMap((p) => [...(dirs.get(p.key) ?? [])]));
  const fullStack = ofKind("client").filter((p) => p.key.startsWith("client-nextjs") && !app.includes(p) && !overlap(dirs.get(p.key) ?? new Set(), appDirs));
  const gateway = ofKind("server").filter((p) => /gateway|\bbff\b/i.test(p.title));

  const wires = [];
  const add = (s, t, label, level) => {
    if (s.key !== t.key && !wires.some((w) => w.source === s.key && w.target === t.key)) wires.push({ source: s.key, target: t.key, label, level });
  };
  for (const { from, to, label, unless } of config.wires) {
    if (unless && ofKind(unless).length) continue;
    const sources = from === "app" ? app : ofKind(from);
    const targets = from === "client" && to === "server" && gateway.length ? gateway : ofKind(to);
    for (const t of targets) {
      const runsCode = CODE_KINDS.has(t.kind);
      const likely = (from === "app" ? [...sources, ...fullStack] : sources).filter((s) => shares(s, t) && (from === "queue" || (CODE_KINDS.has(s.kind) && !runsCode)));
      for (const s of likely) add(s, t, label, "likely");
      // Several services, and one of them clearly owns this: don't guess the rest.
      if (likely.length && sources.length > 1) continue;
      for (const s of sources) add(s, t, label, "guessed");
    }
  }
  return wires;
}

const LEVELS = { guessed: 0, likely: 1, proven: 2 };
const MAX_WIRE_EVIDENCE = 3;

// Config wires on top of the inferred ones. Once config shows where something
// connects, the guesses about the same connection are dropped.
function mergeWires(inferred, shown, config, partKind) {
  const byPair = new Map(inferred.map((w) => [`${w.source}>${w.target}`, { ...w, evidence: [] }]));
  for (const w of shown) {
    const id = `${w.source}>${w.target}`;
    const kinds = [partKind.get(w.source), partKind.get(w.target)];
    const rule = config.wires.find((r) => (r.from === kinds[0] || (r.from === "app" && CODE_KINDS.has(kinds[0]))) && r.to === kinds[1]);
    const wire = byPair.get(id) ?? { source: w.source, target: w.target, label: rule?.label ?? (kinds[1] === "server" ? "HTTP" : ""), level: w.level, evidence: [] };
    if (LEVELS[w.level] > LEVELS[wire.level]) wire.level = w.level;
    if (wire.evidence.length < MAX_WIRE_EVIDENCE && !wire.evidence.some((e) => e.path === w.evidence.path && e.reason === w.evidence.reason)) wire.evidence.push(w.evidence);
    byPair.set(id, wire);
  }
  const wires = [...byPair.values()];
  const known = wires.filter((w) => w.level !== "guessed");
  return wires
    .filter((w) => {
      if (w.level !== "guessed") return true;
      const [from, to] = [partKind.get(w.source), partKind.get(w.target)];
      // This client's API is known, or the data already has its known users.
      if (from === "client" && to === "server") return !known.some((k) => k.source === w.source && partKind.get(k.target) === "server");
      return !known.some((k) => k.target === w.target && partKind.get(k.source) === from);
    })
    .map(({ evidence, ...w }) => (evidence.length ? { ...w, evidence } : w));
}
