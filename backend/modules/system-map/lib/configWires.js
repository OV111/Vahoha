// Wires the repo's own configuration shows: a setting that names another
// service, a proxy that forwards to one, a service that waits for one.
// Pure. A value is only ever compared here; what comes out is the setting's
// name and its file, because the value may hold a password.

import { dirOf } from "./scanLayout.js";

const CLIENT_SETTING = /^(VITE|NEXT_PUBLIC|REACT_APP|NUXT_PUBLIC|EXPO_PUBLIC|PUBLIC)_/;
const API_SETTING = /(API|BACKEND|SERVER|GRAPHQL|GQL)/;
const LOCAL = new Set(["localhost", "127.0.0.1", "0.0.0.0"]);
const base = (path) => path.slice(path.lastIndexOf("/") + 1);

/** Every host[:port] a setting's value points at: URLs, "kafka:9092", comma-separated lists. */
export function hostsIn(value) {
  // ${VAR:-default} means "default" unless the owner overrides it.
  const filled = String(value).replace(/\$\{\w+:?-([^}]*)\}/g, "$1");
  return filled
    .split(/[,\s]+/)
    .map((piece) => piece.match(/^["']?(?:[a-z][a-z0-9+.-]*:\/\/)?(?:[^@/]*@)?([A-Za-z0-9_][A-Za-z0-9_.-]*)(?::(\d{1,5}))?(?:[/?].*)?["']?$/i))
    .filter(Boolean)
    .map(([whole, host, port]) => ({ host: host.toLowerCase(), port: port ? Number(port) : null, explicit: Boolean(port) || whole.includes("://") }));
}

const envLines = (text) =>
  [...text.matchAll(/^\s*(?:export\s+)?([A-Z][A-Z0-9_]*)\s*=\s*(.+?)\s*$/gm)].map(([, name, value]) => ({ name, value: value.replace(/^["']|["']$/g, "") }));

/**
 * @param {object} ctx
 * @param {{ path: string, text: string, kind: string }[]} ctx.files
 * @param {object} ctx.layout        from readLayout
 * @param {Map<string, string>} ctx.partOfService  service name -> part key
 * @param {(dir: string, side: "client" | "code") => string | null} ctx.codePartFor  the part that runs the code in a folder
 * @param {Map<string, string>} ctx.kindOf  part key -> kind
 * @returns {{ source: string, target: string, level: "proven" | "likely", evidence: { path: string, reason: string } }[]}
 */
export function configWires({ files, layout, partOfService, codePartFor, kindOf }) {
  const wires = [];
  const ports = new Map(); // port on the developer's machine -> part key
  for (const s of layout.services) for (const port of s.ports) if (partOfService.has(s.name) && !ports.has(port)) ports.set(port, partOfService.get(s.name));
  const names = new Map([...partOfService].map(([name, key]) => [name.toLowerCase(), key]));

  const add = (source, target, level, path, reason) => {
    if (!source || !target || source === target) return;
    // A worker takes jobs from its queue, whichever of the two holds the address.
    const pulls = kindOf.get(source) === "worker" && kindOf.get(target) === "queue";
    wires.push({ source: pulls ? target : source, target: pulls ? source : target, level, evidence: { path, reason } });
  };

  // `local`: whether localhost in this setting means the developer's machine (an
  // env file, the browser) rather than the container itself.
  const targetsOf = ({ name, value }, local) =>
    hostsIn(value).flatMap(({ host, port, explicit }) => {
      if (LOCAL.has(host)) return local && port && ports.has(port) ? [ports.get(port)] : [];
      // A bare word only counts when the setting says it is an address.
      if (!explicit && !/(HOST|ADDR|URL|URI|SERVER|BROKER)/.test(name)) return [];
      return names.has(host) ? [names.get(host)] : names.has(host.split(".")[0]) && /\.svc(\.|$)/.test(host) ? [names.get(host.split(".")[0])] : [];
    });

  for (const s of layout.services) {
    const source = partOfService.get(s.name);
    if (!source || !["client", "server", "worker", "endpoint", "container"].includes(kindOf.get(source))) continue;
    for (const setting of s.env) {
      for (const target of targetsOf(setting, kindOf.get(source) === "client")) add(source, target, "proven", s.path, `${setting.name} in ${base(s.path)}`);
    }
    // Starting after a service is not proof of talking to it.
    for (const name of [...s.dependsOn, ...s.links]) {
      const target = partOfService.get(name);
      // An app and its worker meet at a queue; one waiting for the other is only start order.
      const ends = [kindOf.get(source), kindOf.get(target)];
      if (ends.includes("worker") && ends.some((k) => k === "server" || k === "client" || k === "endpoint")) continue;
      add(source, target, "likely", s.path, `depends_on in ${base(s.path)}`);
    }
  }

  const servers = [...kindOf].filter(([, kind]) => kind === "server").map(([key]) => key);
  for (const f of files.filter((x) => x.kind === "env")) {
    for (const setting of envLines(f.text)) {
      const fromClient = CLIENT_SETTING.test(setting.name);
      const source = codePartFor(dirOf(f.path), fromClient ? "client" : "code");
      const reason = `${setting.name} in ${base(f.path)}`;
      const targets = targetsOf(setting, true);
      for (const target of targets) add(source, target, "proven", f.path, reason);
      // The address is the owner's own, but the name says it is the API and there is only one.
      if (fromClient && !targets.length && API_SETTING.test(setting.name) && servers.length === 1) add(source, servers[0], "likely", f.path, reason);
    }
  }

  for (const f of files.filter((x) => x.kind === "nginx")) {
    const source = codePartFor(dirOf(f.path), "proxy");
    for (const [, value] of f.text.matchAll(/\bproxy_pass\s+([^;\s]+)/g)) {
      for (const target of targetsOf({ name: "URL", value }, false)) add(source, target, "proven", f.path, `proxy_pass in ${base(f.path)}`);
    }
  }
  return wires;
}
