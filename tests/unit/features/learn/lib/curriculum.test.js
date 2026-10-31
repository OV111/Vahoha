import { describe, it, expect } from "vitest";
import { buildLessons, findLesson, lessonHrefs, slugify } from "@/features/learn/lib/curriculum.js";

const child = (title, url = "https://example.com") => ({
  title,
  description: `About ${title}`,
  resources: [{ label: "Docs", url, type: "docs" }],
});

const layer = {
  sideLeft: [{ title: "L1", children: [child("A"), child("B")] }, { title: "L2", children: [child("E")] }],
  sideRight: [{ title: "R1", children: [child("C"), child("D")] }],
};

describe("slugify", () => {
  it("makes a short url-safe id", () => {
    expect(slugify("Promises & async/await: the basics!")).toBe("promises-async-await-the-basics");
    expect(slugify("x".repeat(100))).toHaveLength(60);
  });
});

describe("buildLessons", () => {
  it("reads rows in order: left, right, left, right", () => {
    expect(buildLessons(layer).map((l) => l.title)).toEqual(["A", "B", "C", "D", "E"]);
  });

  it("numbers lessons from 1 and keeps the section name", () => {
    const [first, , third] = buildLessons(layer);
    expect([first.order, first.section]).toEqual([1, "L1"]);
    expect([third.order, third.section]).toEqual([3, "R1"]);
  });

  it("keeps slugs unique when a title repeats", () => {
    const dup = { sideLeft: [{ title: "S", children: [child("Same"), child("Same")] }] };
    const slugs = buildLessons(dup).map((l) => l.slug);
    expect(new Set(slugs).size).toBe(2);
  });

  it("drops resources without a url and tolerates missing sides", () => {
    const l = buildLessons({ sideLeft: [{ title: "S", children: [{ title: "T", resources: [{ label: "x" }] }] }] });
    expect(l[0].resources).toEqual([]);
    expect(buildLessons({})).toEqual([]);
  });
});

describe("findLesson", () => {
  const lessons = buildLessons(layer);
  it("returns neighbours", () => {
    const r = findLesson(lessons, "c");
    expect([r.prev.title, r.next.title, r.total]).toEqual(["B", "D", 5]);
  });
  it("is null for an unknown slug and has no neighbour at the ends", () => {
    expect(findLesson(lessons, "nope")).toBeNull();
    expect(findLesson(lessons, "a").prev).toBeNull();
    expect(findLesson(lessons, "e").next).toBeNull();
  });
});

describe("lessonHrefs", () => {
  const hrefFor = lessonHrefs("mern", { id: "mern-3", ...layer });
  it("links a subtopic to its lesson url", () => {
    expect(hrefFor("R1", "C")).toBe("/learn/mern/mern-3/c");
  });
  it("is null when the subtopic is not in the layer", () => {
    expect(hrefFor("R1", "Nope")).toBeNull();
  });
});
