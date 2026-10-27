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

  const strongMatch = (part) => {
    const words = techWords(part);
    const paths = new Set(partPaths(part));
    return nodes.find((n) => {
      if (used.has(n.id) || n.data.kind !== part.kind) return false;
      const label = `${n.data.title} ${n.data.sub}`.toLowerCase();
      return words.some((w) => label.includes(w)) || (n.data.evidence ?? []).some((p) => paths.has(p));
    });
  };

  // Strong matches first, so a kind-only fallback can't steal a node another part names exactly.
  const pending = [];
  for (const part of scan.parts) {
    const node = strongMatch(part);
    if (node) {
      used.add(node.id);
      matched.push({ part, nodeId: node.id });
    } else {
      pending.push(part);
    }
  }

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
