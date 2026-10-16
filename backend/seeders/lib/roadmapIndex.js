import { readFile, readdir } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join, basename } from "path";
import { TRACKS } from "../../../constants/roadmapPaths.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROADMAP_DIR = join(__dirname, "../../../src/data/roadmaps");

/**
 * Every track in src/data/roadmaps/*.json with the category id the exam page
 * sends as `path` (same rule as roadmapSeeder.js: constants/roadmapPaths.js
 * wins, the file name is the fallback). Exam banks must be stored under it.
 *
 * @returns {Promise<Array<{ trackId: string, categoryId: string, title: string, layers: object[], hasMeta: boolean }>>}
 */
export const loadTracks = async () => {
  const meta = new Map();
  for (const [categoryId, tracks] of Object.entries(TRACKS)) {
    for (const t of tracks) meta.set(t.id, { categoryId, title: t.title });
  }

  const out = [];
  const files = (await readdir(ROADMAP_DIR)).filter((f) => f.endsWith(".json"));
  for (const file of files) {
    const data = JSON.parse(await readFile(join(ROADMAP_DIR, file), "utf-8"));
    for (const [trackId, layers] of Object.entries(data)) {
      if (!Array.isArray(layers)) continue;
      const m = meta.get(trackId);
      out.push({
        trackId,
        categoryId: m?.categoryId ?? basename(file, ".json"),
        title: m?.title ?? trackId,
        layers,
        hasMeta: Boolean(m),
      });
    }
  }
  return out;
};
