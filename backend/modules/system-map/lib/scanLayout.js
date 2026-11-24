// What a repo's deployment and workspace files say about its services: which
// folders are services ("units"), what Compose and Kubernetes call them, and
// the settings they start with. Pure: text in, plain data out.
//
// Values from config can hold passwords, so they stay inside the scan. Only
// setting NAMES ever leave it (see configWires.js).

import { isMap, parseAllDocuments, parseDocument } from "yaml";

const base = (path) => path.slice(path.lastIndexOf("/") + 1);
export const dirOf = (path) => (path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : "");

/** Joins a folder and a relative path the way a config file means it, or null when it leaves the repo. */
export function resolvePath(dir, relative) {
  const out = dir ? dir.split("/") : [];
  for (const piece of String(relative).split("/")) {
    if (piece === "" || piece === ".") continue;
    if (piece === "..") {
      if (!out.length) return null;
      out.pop();
    } else out.push(piece);
  }
  return out.join("/");
}

// Folders that hold helpers, not a running part of the system.
const NOT_SERVICE_DIR = /(^|\/)(node_modules|vendor|dist|e2e|tests?|__tests__|examples?|samples?|docs?|fixtures|scripts|benchmarks?|docker|deploy|infra|ci|seed[\w-]*|\.[\w-]+)(\/|$)/i;
const NOT_SERVICE_NAME = /(^|[-_])(seed|seeder|migrate|migrations?|migrator|tests?|e2e|init|setup|docs|playwright|storybook|loadgen\w*|adminer|mailcatcher|prestart)([-_]|$)/i;
// A shared library in a monorepo: only a service when something deploys it.
const LIBRARY_DIR = /(^|\/)(packages|libs?|shared|common)\//i;
const WORKER_NAME = /(^|[-_])(workers?|celery|consumer|sidekiq|jobs?)([-_]|$)/i;
const WORKER_COMMAND = /\bworker\b/i;
const CLIENT_NAME = /(front|client|(^|[-_])(web|ui|site)([-_]|$))/i;
const WRAPPER_DIR = new Set(["src", "app", "source"]);

const RUNS = /\b(node|nodemon|tsx|ts-node|nest|next|nuxt|vite|react-scripts|ng|astro|remix|webpack-dev-server|bun|deno)\b/;
const BUILDS = /\b(build|tsc|tsup|rollup|watch:types)\b/;

/** The name people would call the service in this folder. */
export function unitName(dir) {
  const pieces = dir.split("/");
  while (pieces.length > 1 && WRAPPER_DIR.has(pieces[pieces.length - 1])) pieces.pop();
  return pieces[pieces.length - 1];
}

export const isDockerfile = (path) => /^Dockerfile(\.(?!md$|txt$)[\w.-]+)?$|\.dockerfile$/i.test(base(path));
const isManifest = (path) => /^(package\.json|pyproject\.toml|go\.mod|Pipfile|pom\.xml|build\.gradle(\.kts)?|composer\.json|Gemfile|Cargo\.toml)$|^requirements[\w.-]*\.txt$|\.csproj$/.test(base(path));

const plain = (doc) => {
  if (doc.errors.length || !isMap(doc.contents)) return null;
  // maxAliasCount stops a small file that expands into a huge one.
  return doc.toJS({ maxAliasCount: 50 });
};

function readYaml(text) {
  try {
    return plain(parseDocument(text));
  } catch {
    return null;
  }
}

function readYamlDocs(text) {
  try {
    return [...parseAllDocuments(text)].map(plain).filter(Boolean);
  } catch {
    return [];
  }
}

const list = (value) => (Array.isArray(value) ? value : []);
const text = (value) => (Array.isArray(value) ? value.join(" ") : typeof value === "string" ? value : "");

// `environment:` is written as a list of NAME=value or as a map.
function envOf(env) {
  const pairs = Array.isArray(env)
    ? env.filter((line) => typeof line === "string" && line.includes("=")).map((line) => [line.slice(0, line.indexOf("=")), line.slice(line.indexOf("=") + 1)])
    : Object.entries(env && typeof env === "object" ? env : {});
  return pairs.filter(([, value]) => ["string", "number"].includes(typeof value)).map(([name, value]) => ({ name, value: String(value) }));
}

// "3000:80", "127.0.0.1:3000:80" or { published: 3000 } -> 3000
function publishedPort(port) {
  if (port && typeof port === "object") return Number(port.published) || null;
  const pieces = String(port).split("/")[0].split(":");
  return pieces.length < 2 ? null : Number(pieces[pieces.length - 2].replace(/^\$\{\w+:-(\d+)$/, "$1")) || null;
}

function buildDir(composePath, build) {
  if (!build) return null;
  const context = resolvePath(dirOf(composePath), typeof build === "string" ? build : (build.context ?? "."));
  if (context === null) return null;
  const dockerfile = typeof build === "object" && build.dockerfile ? resolvePath(context, build.dockerfile) : null;
  // `context: .` with `dockerfile: backend/Dockerfile` builds the backend folder.
  return dockerfile && context === "" ? dirOf(dockerfile) : context;
}

function composeServices({ path, text: source }) {
  const services = readYaml(source)?.services;
  if (!services || typeof services !== "object") return [];
  return Object.entries(services)
    .filter(([, s]) => s && typeof s === "object")
    .map(([name, s]) => ({
      name,
      path,
      image: typeof s.image === "string" ? imageName(s.image) : null,
      dir: buildDir(path, s.build),
      command: `${text(s.command)} ${text(s.entrypoint)}`,
      env: envOf(s.environment),
      dependsOn: Array.isArray(s.depends_on) ? s.depends_on.filter((d) => typeof d === "string") : Object.keys(s.depends_on ?? {}),
      links: list(s.links).map((l) => String(l).split(":")[0]),
      ports: list(s.ports).map(publishedPort).filter(Boolean),
    }));
}

export const imageName = (image) => image.split("@")[0].split("/").pop().split(":")[0].toLowerCase();

const WORKLOADS = new Set(["Deployment", "StatefulSet", "DaemonSet", "Job", "CronJob"]);

function k8sServices({ path, text: source }) {
  return readYamlDocs(source)
    .filter((doc) => WORKLOADS.has(doc.kind) && typeof doc.metadata?.name === "string")
    .map((doc) => {
      const containers = list(doc.spec?.template?.spec?.containers);
      return {
        name: doc.metadata.name,
        path,
        image: typeof containers[0]?.image === "string" ? imageName(containers[0].image) : null,
        dir: null,
        command: containers.map((c) => `${text(c.command)} ${text(c.args)}`).join(" "),
        env: containers.flatMap((c) => list(c.env).flatMap((e) => (typeof e?.value === "string" ? [{ name: String(e.name), value: e.value }] : []))),
        dependsOn: [],
        links: [],
        ports: [],
      };
    });
}

// The same service in docker-compose.yml and docker-compose.dev.yml is one service.
function mergeByName(services) {
  const byName = new Map();
  for (const s of services) {
    const before = byName.get(s.name);
    if (!before) byName.set(s.name, { ...s, paths: [s.path] });
    else {
      byName.set(s.name, {
        ...before,
        image: before.image ?? s.image,
        dir: before.dir ?? s.dir,
        command: `${before.command} ${s.command}`,
        env: [...before.env, ...s.env],
        dependsOn: [...new Set([...before.dependsOn, ...s.dependsOn])],
        links: [...new Set([...before.links, ...s.links])],
        ports: [...before.ports, ...s.ports],
        paths: [...new Set([...before.paths, s.path])],
      });
    }
  }
  return [...byName.values()];
}

// A package that starts something, rather than one other packages import.
function startsSomething({ path, text: source }) {
  if (LIBRARY_DIR.test(`${dirOf(path)}/`) && !/(^|\/)packages\//.test(path)) return false;
  try {
    const scripts = Object.entries(JSON.parse(source).scripts ?? {});
    return scripts.some(([name, command]) => /^(start|dev|serve)(:|$)/.test(name) && typeof command === "string" && RUNS.test(command) && !BUILDS.test(command));
  } catch {
    return false;
  }
}

/**
 * @param {{ path: string, text: string, kind: string }[]} files  key files with what kind each is (repoScan.js)
 * @param {string[]} paths  every file path in the repo
 * @returns {{ units: { dir: string, name: string, confirmed: boolean, evidence: object[] }[], services: object[], unitOf: (path: string) => string }}
 *   `confirmed` units are named by Compose or Kubernetes, so they run even when no rule knows their language.
 */
export function readLayout(files = [], paths = []) {
  const services = mergeByName([
    ...files.filter((f) => f.kind === "compose").flatMap(composeServices),
    ...files.filter((f) => f.kind === "k8s").flatMap(k8sServices),
  ]).filter((s) => !NOT_SERVICE_NAME.test(s.name));

  const units = new Map();
  const add = (dir, reason, path, confirmed) => {
    if (!dir || NOT_SERVICE_DIR.test(`${dir}/`) || NOT_SERVICE_NAME.test(unitName(dir))) return;
    const unit = units.get(dir) ?? { dir, name: unitName(dir), confirmed: false, evidence: [] };
    unit.confirmed ||= confirmed;
    unit.evidence.push({ path, reason });
    units.set(dir, unit);
  };

  for (const s of services) if (s.dir) add(s.dir, `service "${s.name}" in ${base(s.path)}`, s.path, true);
  const manifestDirs = new Set(paths.filter(isManifest).map(dirOf));
  for (const path of paths) if (isDockerfile(path) && manifestDirs.has(dirOf(path))) add(dirOf(path), "a Dockerfile", path, false);
  for (const f of files) if (f.kind === "package" && startsSomething(f)) add(dirOf(f.path), "a start script in package.json", f.path, false);

  // Kubernetes names a service, not its folder: they belong together when the names match.
  for (const s of services) {
    if (s.dir) continue;
    const match = [...units.values()].find((u) => u.name.toLowerCase() === s.name.toLowerCase() || u.name.toLowerCase() === s.image);
    if (match) {
      s.dir = match.dir;
      match.confirmed = true;
      match.evidence.push({ path: s.path, reason: `service "${s.name}" in ${base(s.path)}` });
    }
  }

  const dirs = [...units.keys()].sort((a, b) => b.length - a.length);
  const unitOf = (path) => dirs.find((dir) => path.startsWith(`${dir}/`)) ?? "";
  return { units: [...units.values()], services, unitOf };
}

export const isWorkerService = (service) => WORKER_NAME.test(service.name) || WORKER_COMMAND.test(service.command);
export const guessUnitKind = (name) => (WORKER_NAME.test(name) ? "worker" : CLIENT_NAME.test(name) ? "client" : "server");
