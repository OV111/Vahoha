import { describe, it, expect } from "vitest";
import { lessonSchema } from "./schema.js";
import { buildLessons } from "../lib/curriculum.js";
import { runConsole } from "../lib/consoleRun.js";
import { LESSON_MANIFEST } from "./manifest.js";

// Every lesson file must match the schema and sit at a path that a real
// roadmap lesson resolves to. A typo in the folder or slug would otherwise
// leave the file silently unused.
const lessonFiles = import.meta.glob("./*/*/*.js", { eager: true, import: "default" });
const categories = import.meta.glob("../../../data/roadmaps/*.json", { eager: true, import: "default" });

const findLayer = (trackId, layerId) => {
  for (const tracks of Object.values(categories)) {
    const layer = tracks[trackId]?.find((l) => l.id === layerId);
    if (layer) return layer;
  }
  return null;
};

const entries = Object.entries(lessonFiles).map(([path, lesson]) => {
  const [, trackId, layerId, file] = path.split("/");
  return { path, lesson, trackId, layerId, slug: file.replace(/\.js$/, "") };
});

describe("lesson content", () => {
  it("has at least one lesson", () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it("has a manifest entry for exactly the lesson files, with matching minutes", () => {
    const fromFiles = Object.fromEntries(
      entries.map(({ trackId, layerId, slug, lesson }) => [`${trackId}/${layerId}/${slug}`, { minutes: lesson.minutes }]),
    );
    expect(LESSON_MANIFEST).toEqual(fromFiles);
  });

  describe.each(entries)("$path", ({ lesson, trackId, layerId, slug }) => {
    it("matches the lesson schema", () => {
      const result = lessonSchema.safeParse(lesson);
      expect(result.success, JSON.stringify(result.error?.issues, null, 2)).toBe(true);
    });

    it("has panel code that runs without errors", async () => {
      for (const step of lesson.steps.filter((s) => s.code)) {
        const { lines } = await runConsole(step.code.source);
        const errors = lines.filter((l) => l.level !== "log");
        expect(errors, `step "${step.title ?? step.q}"`).toEqual([]);
        expect(lines.length, `step "${step.title ?? step.q}" prints nothing`).toBeGreaterThan(0);
      }
    });

    it("belongs to a real roadmap lesson", () => {
      const layer = findLayer(trackId, layerId);
      expect(layer, `no layer ${layerId} in track ${trackId}`).not.toBeNull();
      const slugs = buildLessons(layer).map((l) => l.slug);
      expect(slugs).toContain(slug);
    });
  });
});
