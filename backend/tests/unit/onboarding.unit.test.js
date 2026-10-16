import { describe, it, expect, vi } from "vitest";
import { TOUR_IDS, tourParamsSchema } from "../../modules/onboarding/schemas/onboarding.schemas.js";
import { getSeenTours, markTourSeen } from "../../modules/onboarding/services/onboardingService.js";

// A db whose users collection is a spy. Services take `db` as a parameter, so
// no module mocking is needed.
const makeDb = (userDoc) => {
  const users = {
    findOne: vi.fn(async () => userDoc),
    updateOne: vi.fn(async () => ({ modifiedCount: 1 })),
  };
  return { users, db: { collection: vi.fn(() => users) } };
};

describe("tourParamsSchema", () => {
  it("accepts every known tour id", () => {
    for (const tourId of TOUR_IDS) {
      expect(tourParamsSchema.safeParse({ tourId }).success).toBe(true);
    }
  });

  it("rejects an unknown id, so a client typo can't write junk to the user", () => {
    const result = tourParamsSchema.safeParse({ tourId: "roadmapp" });
    expect(result.success).toBe(false);
    expect(result.error.issues[0].message).toBe("Unknown tour");
  });
});

describe("getSeenTours", () => {
  it("returns the stored list", async () => {
    const { db } = makeDb({ toursSeen: ["roadmap"] });
    expect(await getSeenTours(db, "u1")).toEqual(["roadmap"]);
  });

  it("returns [] for a user who has never finished a tour", async () => {
    const { db } = makeDb({ _id: "u1" });
    expect(await getSeenTours(db, "u1")).toEqual([]);
  });

  it("returns [] when the user is not found", async () => {
    const { db } = makeDb(null);
    expect(await getSeenTours(db, "u1")).toEqual([]);
  });
});

describe("markTourSeen", () => {
  it("uses $addToSet so marking twice can't duplicate the id", async () => {
    const { db, users } = makeDb({ toursSeen: ["arena"] });
    await markTourSeen(db, "u1", "arena");
    expect(users.updateOne).toHaveBeenCalledWith(
      { _id: "u1" },
      { $addToSet: { toursSeen: "arena" } },
    );
  });

  it("returns the user's full list after saving", async () => {
    const { db } = makeDb({ toursSeen: ["roadmap", "arena"] });
    expect(await markTourSeen(db, "u1", "arena")).toEqual(["roadmap", "arena"]);
  });
});
