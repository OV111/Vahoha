import { describe, it, expect, beforeEach } from "vitest";
import useAuthStore from "@/stores/useAuthStore";
import { queryCache } from "@/lib/queryCache";

// Cached API reads belong to whoever is signed in. These are the moments the
// signed-in person changes, and each must leave the cache empty.

const seed = async () => {
  await queryCache.load("mastery", async () => "ada's progress");
  await queryCache.load("profile", async () => "ada's profile");
};

beforeEach(() => {
  queryCache.clear();
  useAuthStore.setState({ auth: true, session: 1 });
  queryCache.clear();
});

describe("the cache and the session", () => {
  it("is emptied on logout", async () => {
    await seed();
    useAuthStore.setState({ auth: false }); // what dropSession does
    expect(queryCache.size()).toBe(0);
    expect(queryCache.get("mastery").data).toBeUndefined();
  });

  it("is emptied when the session expires", async () => {
    await seed();
    useAuthStore.getState().expire();
    expect(useAuthStore.getState().auth).toBe(false);
    expect(queryCache.get("profile").data).toBeUndefined();
  });

  it("is emptied when a different user signs in on the same tab", async () => {
    await seed();
    // Still signed in, but a new session started: login() does this.
    useAuthStore.setState((state) => ({ session: state.session + 1 }));
    expect(queryCache.get("mastery").data).toBeUndefined();
  });

  it("is emptied by a sign-in from a signed-out state", async () => {
    useAuthStore.setState({ auth: false });
    await seed();
    useAuthStore.setState((state) => ({ auth: true, session: state.session + 1 }));
    expect(queryCache.size()).toBe(0);
  });

  it("is left alone by changes that are not about who is signed in", async () => {
    await seed();
    useAuthStore.setState({ isLoading: false, sessionHint: true });
    expect(queryCache.get("mastery").data).toBe("ada's progress");
  });

  it("does not hand the last user's data to the next, even for a request still out at logout", async () => {
    let finish;
    const slow = queryCache.load("mastery", () => new Promise((resolve) => (finish = resolve)));
    useAuthStore.setState({ auth: false }); // logout while the request is in flight
    finish("ada's progress");
    await slow;

    expect(queryCache.get("mastery").data).toBeUndefined();
    expect(await queryCache.load("mastery", async () => "grace's progress")).toBe("grace's progress");
  });
});
