/**
 * Voice Exam Rubric Importer: loads rubrics authored by an external LLM.
 *
 * Flow: scripts/generateRubricPrompts.js writes docs/rubric-prompts/<roadmap>/<track>.md,
 * you paste it into Gemini / ChatGPT, then paste every reply into
 * docs/rubric-prompts/<roadmap>/<track>-output.md. This script reads those files.
 *
 * Usage:
 *   node backend/seeders/rubricImport.js --dry-run        # validate only, write nothing
 *   node backend/seeders/rubricImport.js                  # every *-output.md
 *   node backend/seeders/rubricImport.js mern             # only these tracks
 *   node backend/seeders/rubricImport.js --overwrite mern # replace files that already exist
 *
 * Each layer is checked with the seeder's own buildRubric, so a file that imports here
 * also seeds. Files are written with reviewed: false and criteriaReviewed: false:
 * nothing goes live until a person has read it and backend/seeders/voiceExamRubricSeeder.js runs.
 */

import process from "process";
import { existsSync } from "fs";
import { mkdir, readFile, readdir, writeFile } from "fs/promises";
import { basename, dirname, join } from "path";
import { fileURLToPath } from "url";
import { buildRubric, findLayer } from "../modules/voice-exam/lib/rubricBuild.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROMPT_DIR = join(__dirname, "../../docs/rubric-prompts");
const ROADMAP_DIR = join(__dirname, "../../src/data/roadmaps");
const RUBRIC_DIR = join(__dirname, "rubrics");

// Chat UIs wrap, bold or escape the marker. Accept `LAYER: x`, `**LAYER: x**` and so on.
const LAYER_MARKER = /^[\s>#*_`-]*LAYER:\s*[`*_]*([A-Za-z0-9._-]+)/gim;

// Pasting rendered markdown leaves escapes like \_ that are not valid JSON.
const unescapeMarkdown = (s) => s.replace(/\\([_*[\]#`~>-])/g, "$1");

// The { "groups": [...] } object in one reply, or why it couldn't be read.
const parseReply = (chunk) => {
  const start = chunk.indexOf("{");
  const end = chunk.lastIndexOf("}");
  if (start < 0 || end <= start) return { error: "no JSON object found" };
  const text = chunk.slice(start, end + 1);
  for (const candidate of [text, unescapeMarkdown(text)]) {
    try {
      const parsed = JSON.parse(candidate);
      if (Array.isArray(parsed?.groups)) return { groups: parsed.groups };
    } catch {
      // try the next candidate
    }
  }
  return { error: "JSON did not parse (check quotes, trailing commas, cut-off reply)" };
};

// layerId -> the last reply for it (a re-asked layer replaces the earlier answer).
const parseOutputFile = (raw) => {
  const markers = [...raw.matchAll(LAYER_MARKER)];
  const byLayer = new Map();
  markers.forEach((m, i) => {
    const chunk = raw.slice(m.index + m[0].length, markers[i + 1]?.index ?? raw.length);
    byLayer.set(m[1], parseReply(chunk));
  });
  return byLayer;
};

// Every *-output.md under docs/rubric-prompts, with the roadmap folder it sits in.
const findOutputs = async () => {
  if (!existsSync(PROMPT_DIR)) return [];
  const out = [];
  for (const roadmap of await readdir(PROMPT_DIR)) {
    for (const name of await readdir(join(PROMPT_DIR, roadmap))) {
      if (name.endsWith("-output.md")) out.push({ roadmap, trackId: basename(name, "-output.md") });
    }
  }
  return out;
};

const importTrack = async ({ roadmap, trackId }, { dryRun, overwrite }) => {
  const data = JSON.parse(await readFile(join(ROADMAP_DIR, `${roadmap}.json`), "utf-8"));
  const layers = data[trackId];
  if (!Array.isArray(layers)) throw new Error(`${trackId}: not a track in ${roadmap}.json`);

  const replies = parseOutputFile(await readFile(join(PROMPT_DIR, roadmap, `${trackId}-output.md`), "utf-8"));
  const counts = { written: 0, skipped: 0, failed: 0, missing: 0 };

  for (const layer of layers) {
    const reply = replies.get(layer.id);
    if (!reply) {
      counts.missing += 1;
      console.log(`  · ${layer.id}: no reply yet`);
      continue;
    }
    if (reply.error) {
      counts.failed += 1;
      console.log(`  ✗ ${layer.id}: ${reply.error}`);
      continue;
    }

    const file = { path: roadmap, layer: layer.id, reviewed: false, criteriaReviewed: false, groups: reply.groups };
    try {
      buildRubric(file, findLayer(data, layer.id), { draftCriteria: true });
    } catch (err) {
      counts.failed += 1;
      console.log(`  ✗ ${layer.id}: ${err.message}`);
      continue;
    }

    const target = join(RUBRIC_DIR, roadmap, `${layer.id}.json`);
    // An existing file may already be reviewed by hand: never replace it by accident.
    if (existsSync(target) && !overwrite) {
      counts.skipped += 1;
      console.log(`  - ${layer.id}: file exists, skipped (--overwrite to replace)`);
      continue;
    }
    if (!dryRun) await writeFile(target, `${JSON.stringify(file, null, 2)}\n`, "utf-8");
    counts.written += 1;
    console.log(`  ✓ ${layer.id}: ${reply.groups.length} groups${dryRun ? " (dry run)" : ""}`);
  }
  return counts;
};

const main = async () => {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const overwrite = args.includes("--overwrite");
  const only = new Set(args.filter((a) => !a.startsWith("--")));
  const tracks = (await findOutputs()).filter((t) => !only.size || only.has(t.trackId));
  if (!tracks.length) {
    console.log("No *-output.md files found in docs/rubric-prompts/.");
    return;
  }

  let failed = 0;
  for (const t of tracks) {
    console.log(`${t.roadmap}/${t.trackId}`);
    if (!dryRun) await mkdir(join(RUBRIC_DIR, t.roadmap), { recursive: true });
    const counts = await importTrack(t, { dryRun, overwrite });
    failed += counts.failed;
    console.log(`  ${counts.written} written, ${counts.skipped} skipped, ${counts.failed} failed, ${counts.missing} missing`);
  }
  if (failed) console.log("Re-ask the failed layers in the chat, paste the new reply at the end of the output file, and run again.");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
