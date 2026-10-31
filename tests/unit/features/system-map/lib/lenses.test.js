import { describe, it, expect } from "vitest";
import { DEFAULT_LENS, LENSES, isLens, lensInfo, paletteFor } from "@/features/system-map/lib/lenses";
import { KIND_ICONS, NODE_KINDS, isKind } from "@/features/system-map/lib/nodeKinds";

describe("lenses", () => {
  it("has unique lens ids, and software is the default", () => {
    expect(new Set(LENSES.map((l) => l.id)).size).toBe(LENSES.length);
    expect(isLens(DEFAULT_LENS)).toBe(true);
    expect(isLens("quantum")).toBe(false);
  });

  it("only offers parts that exist, with no repeats inside one lens", () => {
    for (const lens of LENSES) {
      expect(lens.palette.every(isKind), lens.id).toBe(true);
      expect(new Set(lens.palette).size, lens.id).toBe(lens.palette.length);
    }
  });

  it("offers every part in at least one lens, except the system-lab ones", () => {
    const offered = new Set(LENSES.flatMap((l) => l.palette));
    const unreachable = NODE_KINDS.map((k) => k.kind).filter((k) => !offered.has(k));
    expect(unreachable.sort()).toEqual(["disk", "memory"]);
  });

  it("gives every part an icon", () => {
    expect(NODE_KINDS.filter((k) => !KIND_ICONS[k.kind]).map((k) => k.kind)).toEqual([]);
  });

  it("returns the palette in the lens's order, and falls back to software", () => {
    expect(paletteFor("security").map((k) => k.kind)).toEqual(["client", "entry", "firewall", "auth", "server", "database", "secrets", "external"]);
    expect(lensInfo("nope").id).toBe("software");
  });
});
