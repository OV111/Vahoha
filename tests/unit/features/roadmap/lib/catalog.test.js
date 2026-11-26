import { describe, it, expect } from "vitest";
import { buildCatalog } from "@/features/roadmap/lib/catalog.js";

const domains = [
  { id: "fullstack", title: "Full Stack" },
  { id: "mobile", title: "Mobile" },
];
const tracks = {
  fullstack: [
    { id: "mern", title: "MERN Developer", techs: ["MongoDB", "React", "Node.js"] },
    { id: "t3", title: "T3 Stack Dev", techs: ["Next.js", "TypeScript"] },
  ],
  mobile: [{ id: "rn", title: "React Native", techs: ["React", "Expo"] }],
};
const catalog = buildCatalog(tracks, domains);

describe("buildCatalog", () => {
  it("flattens tracks in domain order and tags each with its domain", () => {
    expect(catalog.map((t) => t.id)).toEqual(["mern", "t3", "rn"]);
    expect(catalog[2].domain.id).toBe("mobile");
  });

  it("skips domains that have no tracks", () => {
    expect(buildCatalog({ fullstack: tracks.fullstack }, domains)).toHaveLength(2);
  });
});
