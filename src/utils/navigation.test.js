import { describe, it, expect } from "vitest";
import { findActiveNavPath } from "./navigation";
import { NAV_GROUPS_AUTH, NAV_GROUPS_GUEST, TRACK_LINKS } from "../../constants/Navbar";

const itemsOf = (groups) =>
  groups.flatMap((g) => [...g.items, ...(g.showTracks ? TRACK_LINKS : [])]);
const groupOf = (groups, path) =>
  groups.filter((g) => [...g.items, ...(g.showTracks ? TRACK_LINKS : [])].some((i) => (i.match ?? i.to) === path)).map((g) => g.label);

describe("findActiveNavPath", () => {
  const items = itemsOf(NAV_GROUPS_AUTH);

  it("lights up only Learn on the roadmaps page, not Practice (Exams shares the link)", () => {
    const path = findActiveNavPath("/roadmaps", items);
    expect(path).toBe("/roadmaps");
    expect(groupOf(NAV_GROUPS_AUTH, path)).toEqual(["Learn"]);
  });

  it("lights up only Practice on an exam page", () => {
    const path = findActiveNavPath("/roadmaps/exam/backend-1", items);
    expect(path).toBe("/roadmaps/exam");
    expect(groupOf(NAV_GROUPS_AUTH, path)).toEqual(["Practice"]);
  });

  it("matches nested pages but not look-alike prefixes", () => {
    expect(findActiveNavPath("/capstone/api-dev", items)).toBe("/capstone");
    expect(findActiveNavPath("/capstones", items)).toBeNull();
  });

  it("is null off the menus", () => {
    expect(findActiveNavPath("/about", items)).toBeNull();
  });

  it("never picks a locked guest item, even on the signup page they point to", () => {
    expect(findActiveNavPath("/get-started", itemsOf(NAV_GROUPS_GUEST))).toBeNull();
  });
});
