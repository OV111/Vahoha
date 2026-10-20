/**
 * Builds docs/exam-prompts/<category>/<track>-output.md from raw questions.
 *
 * A raw file is a JSON array per layer, written by a model or by hand:
 *   [{ "stem": "...", "topic": "...", "correct": "...", "wrong": ["...", "...", "..."] }, ...]
 * The model never picks answer positions; this script deals them out evenly
 * and refuses a layer where the correct answer is too often the longest choice
 * (see backend/seeders/lib/examBuild.js).
 *
 * Usage:
 *   node scripts/buildExamBank.js <category> <track> <layerId>=<raw.json> [<layerId>=<raw.json> ...]
 *   e.g. node scripts/buildExamBank.js backend go-dev go-dev-1=raw/go-dev-1.json go-dev-2=raw/go-dev-2.json
 *
 * Layers are written in the order given; layers already in the output file and
 * not listed are kept. Exit code 1 if any layer has problems (nothing written
 * for that layer). Then validate with: node backend/seeders/examImport.js <track> --dry-run
 */
import process from "node:process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { buildLayer, layerBlock } from "../backend/seeders/lib/examBuild.js";

const [category, track, ...pairs] = process.argv.slice(2);
if (!category || !track || pairs.length === 0) {
  console.error("Usage: node scripts/buildExamBank.js <category> <track> <layerId>=<raw.json> ...");
  process.exit(2);
}

const outFile = `docs/exam-prompts/${category}/${track}-output.md`;
const existing = existsSync(outFile) ? readFileSync(outFile, "utf8") : "";

// Split the current file into { layerId -> block } so untouched layers survive.
const blocks = new Map();
for (const part of existing.split(/^(?=LAYER:)/m)) {
  const id = part.match(/^LAYER:\s*([\w.-]+)/)?.[1];
  if (id) blocks.set(id, part.trimEnd() + "\n");
}

let failed = false;
for (const pair of pairs) {
  const [layerId, rawPath] = pair.split("=");
  const raw = JSON.parse(readFileSync(rawPath, "utf8"));
  const { questions, problems, longestShare } = buildLayer(layerId, raw);
  const dist = [0, 1, 2, 3].map((i) => questions.filter((q) => q.answerIdx === i).length).join("/");
  if (problems.length) {
    failed = true;
    console.error(`✗ ${layerId}:\n  ${problems.join("\n  ")}`);
    continue;
  }
  blocks.set(layerId, layerBlock(layerId, questions));
  console.log(`✓ ${layerId}: ${questions.length} questions, answer positions ${dist}, correct-is-longest ${Math.round(longestShare * 100)}%`);
}

writeFileSync(outFile, [...blocks.values()].join("\n"));
console.log(`wrote ${outFile} (${blocks.size} layer(s))`);
process.exit(failed ? 1 : 0);
