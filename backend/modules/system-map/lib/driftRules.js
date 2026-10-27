/**
 * Drift rules: which changed files in a merged PR could make a map out of date.
 * Pure, so the rules are tested without a database.
 *
 * Two reasons a file matters, strongest first:
 *   1. it is (or sits under) a path a part of the map lists as evidence, so the
 *      change touches something the learner drew from;
 *   2. it is a dependency or infrastructure file, where a new service tends to
 *      appear (a new package, a new container, a new Terraform resource).
 * Lockfiles are noise: they change with every install and say nothing new.
 */

export const MAX_HINTS_PER_PR = 10;

const LOCKFILE = /(^|\/)(package-lock\.json|npm-shrinkwrap\.json|yarn\.lock|pnpm-lock\.yaml|bun\.lockb?|poetry\.lock|Pipfile\.lock|Cargo\.lock|go\.sum|composer\.lock|Gemfile\.lock)$/;

// [pattern, reason], first match wins.
const INFRA_RULES = [
  [/(^|\/)prisma\/schema\.prisma$/, "Database schema changed"],
  // Dockerfile, Dockerfile.prod, api.Dockerfile; not notes about one (Dockerfile.md, Dockerfile-notes.txt).
  [/(^|\/)(Dockerfile(\.(?!md$|txt$)[\w.-]+)?|[\w.-]+\.Dockerfile)$/, "Container setup changed"],
  [/(^|\/)docker-compose[^/]*\.ya?ml$/, "Container setup changed"],
  [/\.tf$/, "Infrastructure changed"],
  [/(^|\/)\.github\/workflows\/[^/]+\.ya?ml$/, "Build pipeline changed"],
  [/(^|\/)(k8s|kubernetes|helm|charts?)\/.+\.ya?ml$/, "Infrastructure changed"],
  [/(^|\/)Chart\.ya?ml$/, "Infrastructure changed"],
  [/(^|\/)package\.json$/, "Dependencies changed"],
  [/(^|\/)requirements[^/]*\.txt$/, "Dependencies changed"],
  [/(^|\/)pyproject\.toml$/, "Dependencies changed"],
  [/(^|\/)go\.mod$/, "Dependencies changed"],
  [/(^|\/)\.env\.example$/, "Configuration changed"],
];

const normalise = (p) => (typeof p === "string" ? p.replace(/^\.?\//, "") : "");

/** The part (if any) whose evidence this file equals or sits under. */
const backingPart = (path, nodes) =>
  nodes.find((n) => (n.evidence ?? []).some((e) => path === normalise(e) || path.startsWith(`${normalise(e)}/`)));

/**
 * @param {{ path: string }[]} changedFiles  a PR's changed files
 * @param {{ nodes?: { title?: string, evidence?: string[] }[] }} graph
 * @returns {{ path: string, reason: string }[]}  at most MAX_HINTS_PER_PR, one per path
 */
export function findHints(changedFiles, graph) {
  const nodes = graph?.nodes ?? [];
  const hints = [];
  const seen = new Set();

  for (const file of changedFiles ?? []) {
    const path = normalise(file?.path);
    if (!path || seen.has(path) || LOCKFILE.test(path)) continue;

    const part = backingPart(path, nodes);
    const reason = part
      ? `This file backs your ${part.title || "part"} part`
      : INFRA_RULES.find(([pattern]) => pattern.test(path))?.[1];
    if (!reason) continue;

    seen.add(path);
    hints.push({ path, reason });
    if (hints.length === MAX_HINTS_PER_PR) break;
  }
  return hints;
}
