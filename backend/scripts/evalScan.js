// Scores the Project Map repo scan on real repos with hand-written answers
// (backend/evals/system-map/cases.js). Rules only: no AI call, no tokens.
//
//   npm run eval:scan                     every case
//   npm run eval:scan -- --show           also lists what was missed and what was wrong
//   npm run eval:scan -- --repo umami     one case
//   npm run eval:scan -- --lib <file>     score another repoScan.js (to compare two versions)
//
// Downloads are kept in backend/evals/results/ (not in git), so only the first run needs GitHub.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import { CASES } from "../evals/system-map/cases.js";
import { getFileText, getTree } from "../modules/capstone/services/githubClient.js";

const CACHE = path.resolve("backend/evals/results/scan-cache");
const args = process.argv.slice(2);
const option = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : null);
const lib = await import(pathToFileURL(path.resolve(option("--lib") ?? "backend/modules/system-map/lib/repoScan.js")).href);

async function cached(name, load) {
  const file = path.join(CACHE, name);
  if (existsSync(file)) return JSON.parse(readFileSync(file, "utf8"));
  const value = await load();
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(value));
  return value;
}

async function scan({ repo, sha }) {
  const [owner, name] = repo.split("/");
  const folder = repo.replace("/", "__");
  const tree = await cached(`${folder}/tree.json`, () => getTree(owner, name, sha));
  const texts = await Promise.all(
    lib.pickKeyFiles(tree.entries).map(async (p) => ({ path: p, text: await cached(`${folder}/${encodeURIComponent(p)}.json`, () => getFileText(repo, sha, p)) })),
  );
  const files = texts.filter((f) => f.text !== null);
  return lib.detectParts(lib.readSignals(files), tree.paths, "software", files);
}

const label = (p) => `${p.key} ${p.title} ${p.sub}`.toLowerCase();

/** Matches found parts to the answer, one to one. A wire counts when both ends and the direction match. */
export function score(found, truth) {
  const idOf = new Map(); // found part key -> answer id
  const taken = new Set();
  // The unit's own name says more than a shared technology, so the first word listed is tried for every part before the next.
  const words = Math.max(...Object.values(truth.parts).map((t) => t.match.length));
  for (let i = 0; i < words; i += 1) {
    for (const [id, t] of Object.entries(truth.parts)) {
      if (taken.has(id) || !t.match[i]) continue;
      const part = found.parts.find((p) => !idOf.has(p.key) && t.kind.includes(p.kind) && label(p).includes(t.match[i]));
      if (part) {
        idOf.set(part.key, id);
        taken.add(id);
      }
    }
  }

  const isOptional = (id) => truth.parts[id]?.optional;
  const required = Object.keys(truth.parts).filter((id) => !isOptional(id));
  const wrongParts = found.parts.filter((p) => !idOf.has(p.key)).map((p) => p.key);
  const missedParts = required.filter((id) => !taken.has(id));

  const named = found.wires.map((w) => ({ ...w, id: `${idOf.get(w.source) ?? `?${w.source}`}>${idOf.get(w.target) ?? `?${w.target}`}` }));
  const scored = named.filter((w) => !w.id.split(">").some(isOptional));
  const right = scored.filter((w) => truth.wires.includes(w.id));
  const wrong = scored.filter((w) => !truth.wires.includes(w.id));
  const hits = new Set(right.map((w) => w.id));
  return {
    parts: { tp: required.length - missedParts.length, fp: wrongParts.length, fn: missedParts.length },
    wires: { tp: hits.size, fp: wrong.length, fn: truth.wires.length - hits.size },
    levels: Object.fromEntries(["proven", "likely", "guessed"].map((l) => [l, { tp: right.filter((w) => w.level === l).length, fp: wrong.filter((w) => w.level === l).length }])),
    missedParts,
    wrongParts,
    missedWires: truth.wires.filter((w) => !hits.has(w)),
    wrongWires: wrong.map((w) => `${w.id}${w.level ? ` (${w.level})` : ""}`),
  };
}

const pct = (n) => (Number.isFinite(n) ? `${Math.round(n * 100)}%`.padStart(4) : "   -");
const line = ({ tp, fp, fn }) => {
  const p = tp / (tp + fp);
  const r = tp / (tp + fn);
  return `P ${pct(p)}  R ${pct(r)}  F1 ${pct((2 * p * r) / (p + r))}  (${tp} right, ${fp} wrong, ${fn} missed)`;
};
const sum = (list) => list.reduce((a, b) => ({ tp: a.tp + b.tp, fp: a.fp + b.fp, fn: a.fn + (b.fn ?? 0) }), { tp: 0, fp: 0, fn: 0 });

const only = option("--repo");
const results = [];
for (const c of CASES.filter((x) => !only || x.repo.includes(only))) {
  const result = score(await scan(c), c);
  results.push(result);
  console.log(`\n${c.repo}\n  parts ${line(result.parts)}\n  wires ${line(result.wires)}`);
  if (args.includes("--show")) {
    for (const key of ["missedParts", "wrongParts", "missedWires", "wrongWires"]) if (result[key].length) console.log(`  ${key}: ${result[key].join(", ")}`);
  }
}

console.log(`\nALL ${results.length} REPOS\n  parts ${line(sum(results.map((r) => r.parts)))}\n  wires ${line(sum(results.map((r) => r.wires)))}`);
for (const level of ["proven", "likely", "guessed"]) {
  const { tp, fp } = sum(results.map((r) => r.levels[level]));
  if (tp + fp) console.log(`  ${level.padEnd(8)} ${pct(tp / (tp + fp))} right (${tp} of ${tp + fp})`);
}
