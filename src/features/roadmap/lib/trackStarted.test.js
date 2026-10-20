import { describe, expect, it } from "vitest";
import { trackHasDoneLayer } from "./trackStarted";

describe("trackHasDoneLayer", () => {
  it("is true when a layer of the track is done", () => {
    expect(trackHasDoneLayer({ "api-dev-4": "done" }, "api-dev")).toBe(true);
  });

  it("ignores layers that are not done", () => {
    expect(trackHasDoneLayer({ "api-dev-4": "in-progress", "api-dev-5": "locked" }, "api-dev")).toBe(false);
  });

  it("ignores layers of other tracks, including ones that share a prefix", () => {
    expect(trackHasDoneLayer({ "python-backend-3": "done", "node-dev-1": "done" }, "python")).toBe(false);
  });

  it("is false for empty progress", () => {
    expect(trackHasDoneLayer({}, "api-dev")).toBe(false);
  });
});
