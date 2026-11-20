/**
 * Writes one paste-ready prompt per roadmap track for an external LLM (Gemini / ChatGPT)
 * to author that track's voice exam rubrics: a question per subtopic group, a follow-up
 * per subtopic, and the evidence points the judge grades against.
 *
 * Usage:
 *   node scripts/generateRubricPrompts.js mern api-dev     # these tracks
 *   node scripts/generateRubricPrompts.js                  # every track without rubrics yet
 *
 * Output: docs/rubric-prompts/<roadmap file>/<track>.md
 * The replies go into docs/rubric-prompts/<roadmap file>/<track>-output.md and are
 * loaded with `node backend/seeders/rubricImport.js` (validated, written as drafts).
 *
 * Prompts are built from src/data/roadmaps/*.json, so regenerate them instead of
 * editing them by hand.
 */

import process from "process";
import { existsSync } from "fs";
import { mkdir, readFile, readdir, writeFile } from "fs/promises";
import { basename, dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROADMAP_DIR = join(__dirname, "../src/data/roadmaps");
const RUBRIC_DIR = join(__dirname, "../backend/seeders/rubrics");
const OUT_DIR = join(__dirname, "../docs/rubric-prompts");
// A reviewed rubric shown to the model as the bar to meet.
const EXAMPLE_FILE = join(RUBRIC_DIR, "backend/api-dev-1.json");

// Every track of every roadmap file, with the file it lives in (rubrics are stored by file).
const loadTracks = async () => {
  const out = [];
  for (const file of (await readdir(ROADMAP_DIR)).filter((f) => f.endsWith(".json"))) {
    const data = JSON.parse(await readFile(join(ROADMAP_DIR, file), "utf-8"));
    for (const [trackId, layers] of Object.entries(data)) {
      if (Array.isArray(layers) && layers[0]?.id) out.push({ trackId, roadmap: basename(file, ".json"), layers });
    }
  }
  return out;
};

const sectionsOf = (layer) => [...(layer.sideLeft ?? []), ...(layer.sideRight ?? [])];

// One layer as the model sees it: its groups and each subtopic's description.
const layerBlock = (layer, i, total) => {
  const groups = sectionsOf(layer)
    .map(
      (s) => `Group: "${s.title}"
${s.children.map((c) => `  - Subtopic: "${c.title}"\n    ${c.description ?? ""}`).join("\n")}`,
    )
    .join("\n");
  return `### Layer ${i + 1} of ${total}: id ${layer.id}
Title: ${layer.title}
${groups}`;
};

// The first group of the reviewed example, so the model copies its level of detail.
const exampleGroup = async () => {
  const file = JSON.parse(await readFile(EXAMPLE_FILE, "utf-8"));
  return JSON.stringify(file.groups[0], null, 2);
};

const buildPrompt = ({ trackId, roadmap, layers }, example) => `You are a senior engineer writing VOICE EXAM RUBRICS for a developer learning platform. On each roadmap layer, a learner explains a topic OUT LOUD (up to 5 minutes), gets short follow-up questions (90 seconds each) on what they left weak, and an AI judge grades each subtopic against the evidence points you write. A Verified badge depends on it, so the bar must be fair and exact.

Track: ${trackId} (roadmap ${roadmap}). It has ${layers.length} layers, listed at the bottom. Each layer has groups of subtopics. The exam picks ONE group at random and asks its question.

## HOW TO ANSWER
ONE layer per reply, in the order listed. After each reply, stop and wait; I will type "next".

## OUTPUT FORMAT (follow exactly)
First line: the layer marker, with the id from the list:
LAYER: <layer id>
Then ONE \`\`\`json code block with an object { "groups": [ ... ] }: one entry per group of that layer, in order. No text after the block. Each group entry has exactly these fields:
- "title": the group title, copied word for word
- "question": the spoken exam question for the whole group
- "followUps": an object, one key per subtopic (its title copied word for word) -> one follow-up question
- "criteria": an object, one key per subtopic (same titles) -> { "id", "evidence", "notEnough", "misconceptions" }

Example of ONE group, at the level of quality required:
\`\`\`json
${example}
\`\`\`

## QUESTION RULES
1. "question" asks the learner to explain or walk through a realistic situation that touches every subtopic of the group. It must be answerable by speaking, without code or a whiteboard.
2. Each follow-up targets ONE subtopic, is answerable in 90 seconds, and asks why or how, never for a definition or a list of names.

## EVIDENCE RULES (most important)
3. "evidence": 1 to 3 points per subtopic. Each point is ONE idea a correct answer must show, written as a plain statement ("DNS answers are cached for the record's TTL").
4. An idea, never a word: a learner who explains it in everyday words must be able to meet it. Never write "mentions X" or "uses the term X".
5. Checkable from speech: the judge must be able to quote the learner's words as proof.
6. Fair for this layer's level: no expert details a learner at this stage would not have.
7. Not fuzzy: never "understands X" or "knows about X".
8. "notEnough": 1 or 2 answers that sound right but do not count, usually naming the terms without explaining them.
9. "misconceptions": 0 to 2 real wrong beliefs learners hold about this subtopic, each as "Says ..." (what the learner would state). Only ones you are sure are wrong.

## ID RULES
10. Every "id" is lowercase-with-dashes, at most 48 characters. A criterion id is unique within the layer. Evidence and misconception ids are unique within their criterion.
11. Escape quotes so the JSON parses. No trailing commas, no comments.

## LAYERS
${layers.map((l, i) => layerBlock(l, i, layers.length)).join("\n\n")}

Start now with Layer 1.`;

const hasRubrics = ({ roadmap, layers }) => existsSync(join(RUBRIC_DIR, roadmap, `${layers[0].id}.json`));

const main = async () => {
  const only = new Set(process.argv.slice(2));
  const tracks = (await loadTracks()).filter((t) => (only.size ? only.has(t.trackId) : !hasRubrics(t)));
  const unknown = [...only].filter((id) => !tracks.some((t) => t.trackId === id));
  if (unknown.length) throw new Error(`No such track: ${unknown.join(", ")}`);

  const example = await exampleGroup();
  for (const t of tracks) {
    const dir = join(OUT_DIR, t.roadmap);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, `${t.trackId}.md`), `${buildPrompt(t, example)}\n`, "utf-8");
  }
  console.log(`Wrote ${tracks.length} prompt(s) to docs/rubric-prompts/`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
