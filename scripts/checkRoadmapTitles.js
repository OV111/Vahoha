/**
 * Flags roadmap titles too long to fit in 3 lines on the roadmap tree, so they
 * can be shortened in the data. The tree shows titles in full and only clamps
 * (with a tooltip) as a fallback, so an over-long title is a content bug.
 *
 * Limits come from the card widths in treeTokens.js at the tree's font sizes
 * (about 3 lines each):
 *   lesson (leaf)  260px card, 13px medium  -> 84 characters
 *   topic (parent) 190px card, 14px semi    -> 54 characters
 *
 * Usage: npm run roadmap:titles        (exit code 1 if any title is too long)
 */
import process from "node:process";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const SRC = "src/data/roadmaps";
const LIMITS = { lesson: 84, topic: 54 };

const flagged = [];
for (const file of readdirSync(SRC).filter((f) => f.endsWith(".json"))) {
  const tracks = JSON.parse(readFileSync(join(SRC, file), "utf8"));
  for (const [trackId, layers] of Object.entries(tracks)) {
    for (const layer of layers) {
      for (const section of [...(layer.sideLeft ?? []), ...(layer.sideRight ?? [])]) {
        if (section.title.length > LIMITS.topic) flagged.push({ kind: "topic", trackId, layerId: layer.id, title: section.title });
        for (const child of section.children ?? []) {
          if (child.title.length > LIMITS.lesson) flagged.push({ kind: "lesson", trackId, layerId: layer.id, title: child.title });
        }
      }
    }
  }
}

for (const f of flagged) console.log(`${f.kind.padEnd(6)} ${f.layerId.padEnd(24)} (${f.title.length}) ${f.title}`);
console.log(`\ncheckRoadmapTitles: ${flagged.length} title(s) over the 3-line limit`);
process.exitCode = flagged.length > 0 ? 1 : 0;
