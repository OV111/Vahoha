import { describe, it, expect } from "vitest";
import { TRACKS } from "../../../constants/roadmapPaths";
import { ROOMS, roomOfTrack, tracksInRoom, roomById, sectionOfTrack, tracksInSection } from "./rooms";

const allTracks = Object.values(TRACKS).flat();

describe("lab rooms", () => {
  it("has 9 rooms with unique ids", () => {
    expect(ROOMS).toHaveLength(9);
    expect(new Set(ROOMS.map((r) => r.id)).size).toBe(9);
  });

  it("puts every roadmap track in exactly one room", () => {
    const unplaced = allTracks.filter((t) => !roomOfTrack(t.id)).map((t) => t.id);
    expect(unplaced).toEqual([]);
    const total = ROOMS.reduce((n, r) => n + tracksInRoom(r.id).length, 0);
    expect(total).toBe(allTracks.length);
  });

  it("covers every roadmap category", () => {
    const covered = new Set(ROOMS.flatMap((r) => r.categories));
    expect(Object.keys(TRACKS).filter((c) => !covered.has(c))).toEqual([]);
  });

  it("moves overridden tracks to their practice room", () => {
    expect(roomOfTrack("db-engineer")).toBe("data-storage");
    expect(roomOfTrack("security-dev")).toBe("security");
    expect(roomOfTrack("mern")).toBe("build-software");
  });

  it("finds rooms by id", () => {
    expect(roomById("quantum")?.title).toBe("Quantum");
    expect(roomById("nope")).toBeNull();
  });
});

describe("room sections", () => {
  for (const room of ROOMS.filter((r) => r.sections)) {
    it(`${room.id}: has at most 5 sections`, () => {
      expect(room.sections.length).toBeLessThanOrEqual(5);
    });

    it(`${room.id}: every track of the room is in exactly one section`, () => {
      const inSections = room.sections.flatMap((s) => tracksInSection(room, s.id).map((t) => t.id));
      expect(inSections.sort()).toEqual(tracksInRoom(room.id).map((t) => t.id).sort());
    });
  }

  it("puts the MERN pilot in the Web section", () => {
    expect(sectionOfTrack(roomById("build-software"), "mern")?.id).toBe("web");
  });
});
