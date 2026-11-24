// Compares a repo scan with the map the learner already drew: which scanned
// parts are new, which are already on the map, and which repo-backed parts the
// repo no longer shows (the map has drifted from the code).

// Role words (every lens) say what a part is, not which technology it uses.
const GENERIC = new Set([
  "api", "app", "server", "client", "database", "cache", "queue", "worker", "service", "storage", "the", "and", "for",
  "primary", "replica", "shard", "backup", "migration", "pipeline", "model", "endpoint", "gateway", "balancer",
  "container", "cluster", "firewall", "secrets", "entry", "evaluation", "source",
]);

/** Words that name the technology ("Express", "MongoDB"), not the role. */
const techWords = (part) =>
  `${part.sub ?? ""} ${part.title ?? ""}`
    .toLowerCase()
    .split(/[^a-z0-9.+#-]+/)
    .filter((w) => w.length >= 3 && !GENERIC.has(w));

const partPaths = (part) => (part.evidence ?? []).map((e) => e.path);

/**
 * @param {{ id: string, data: { kind: string, title: string, sub: string, evidence?: string[] } }[]} nodes
 * @param {{ parts: { key: string, kind: string, title: string, sub: string, evidence: { path: string }[] }[] }} scan
 * @returns {{ newParts: object[], matched: { part: object, nodeId: string }[], gone: object[] }}
 */
export function compareScan(nodes, scan) {
  const used = new Set();
  const matched = [];
  const newParts = [];

  // How well a part fits a node: shared words and shared files. Two services on
  // the same framework both fit a little; their own name and folder fit more.
  const fit = (part, node) => {
    if (node.data.kind !== part.kind) return 0;
    const label = `${node.data.title} ${node.data.sub}`.toLowerCase();
    const paths = new Set(partPaths(part));
    return techWords(part).filter((w) => label.includes(w)).length + (node.data.evidence ?? []).filter((p) => paths.has(p)).length;
  };

  // Best fits first, so a weak one (or the kind-only fallback below) can't steal a node another part names exactly.
  const fits = scan.parts
    .flatMap((part) => nodes.map((node) => ({ part, node, score: fit(part, node) })))
    .filter((f) => f.score > 0)
    .sort((a, b) => b.score - a.score);
  const done = new Set();
  for (const { part, node } of fits) {
    if (done.has(part) || used.has(node.id)) continue;
    done.add(part);
    used.add(node.id);
    matched.push({ part, nodeId: node.id });
  }
  const pending = scan.parts.filter((part) => !done.has(part));

  for (const part of pending) {
    const sameKind = nodes.filter((n) => n.data.kind === part.kind);
    const only = sameKind.length === 1 && !used.has(sameKind[0].id) ? sameKind[0] : null;
    if (only) {
      used.add(only.id);
      matched.push({ part, nodeId: only.id });
    } else {
      newParts.push(part);
    }
  }

  const scannedPaths = new Set(scan.parts.flatMap(partPaths));
  const gone = nodes.filter(
    (n) => !used.has(n.id) && (n.data.evidence ?? []).length > 0 && !n.data.evidence.some((p) => scannedPaths.has(p)),
  );

  return { newParts, matched, gone };
}
