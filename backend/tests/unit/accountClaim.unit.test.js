import { describe, it, expect, vi } from "vitest";
import { ObjectId } from "mongodb";
import { claimVerifiedEmail } from "../../modules/auth/services/accountClaimService.js";

// A db whose collections record what was done to them.
const fakeDb = () => {
  const calls = { users: [] };
  return {
    calls,
    collection: (name) => ({
      updateOne: vi.fn(async (...args) => (calls[name] ??= []).push(["updateOne", ...args])),
      deleteMany: vi.fn(async (...args) => (calls[name] ??= []).push(["deleteMany", ...args])),
    }),
  };
};

describe("claimVerifiedEmail", () => {
  it("wipes an unverified password, revokes sessions and marks the email verified", async () => {
    const db = fakeDb();
    const user = { _id: new ObjectId(), email: "victim@example.com", password: "attacker-hash" };
    expect(await claimVerifiedEmail(db, user)).toBe(true);

    const [, filter, update] = db.calls.users[0];
    expect(filter).toEqual({ _id: user._id });
    expect(update.$set).toEqual({ emailVerified: true, password: null });
    expect(Object.values(db.calls).flat().some((c) => c[0] === "deleteMany")).toBe(true);
  });

  it("marks a password-less unverified account verified without touching sessions", async () => {
    const db = fakeDb();
    const user = { _id: new ObjectId(), email: "a@example.com", password: null };
    expect(await claimVerifiedEmail(db, user)).toBe(false);
    expect(db.calls.users[0][2].$set).toEqual({ emailVerified: true });
    expect(Object.values(db.calls).flat().some((c) => c[0] === "deleteMany")).toBe(false);
  });

  it("leaves an already verified account alone", async () => {
    const db = fakeDb();
    const user = { _id: new ObjectId(), email: "ok@example.com", password: "real-hash", emailVerified: true };
    expect(await claimVerifiedEmail(db, user)).toBe(false);
    expect(Object.values(db.calls).flat()).toHaveLength(0);
  });
});
