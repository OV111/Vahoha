import { describe, it, expect, vi } from "vitest";
import { createQueryCache } from "./queryCache";

const clock = (start = 1000) => {
  let t = start;
  return { now: () => t, advance: (ms) => (t += ms) };
};

/** A fetcher the test settles by hand. */
const deferred = () => {
  let resolve, reject;
  const promise = new Promise((res, rej) => ((resolve = res), (reject = rej)));
  return { promise, resolve, reject };
};

describe("queryCache.load", () => {
  it("fetches once, then answers from memory while the copy is fresh", async () => {
    const c = clock();
    const cache = createQueryCache({ now: c.now });
    const fetcher = vi.fn().mockResolvedValue("a");

    expect(await cache.load("k", fetcher, { staleMs: 1000 })).toBe("a");
    c.advance(999);
    expect(await cache.load("k", fetcher, { staleMs: 1000 })).toBe("a");
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("refetches once stale, and keeps the old copy readable meanwhile", async () => {
    const c = clock();
    const cache = createQueryCache({ now: c.now });
    await cache.load("k", async () => "old", { staleMs: 1000 });
    c.advance(1001);

    const next = deferred();
    const pending = cache.load("k", () => next.promise, { staleMs: 1000 });
    expect(cache.get("k")).toMatchObject({ data: "old", loading: true }); // stale, not blank
    next.resolve("new");
    expect(await pending).toBe("new");
    expect(cache.get("k")).toMatchObject({ data: "new", loading: false });
  });

  it("shares one request between concurrent callers", async () => {
    const cache = createQueryCache();
    const d = deferred();
    const fetcher = vi.fn(() => d.promise);

    const calls = [cache.load("k", fetcher), cache.load("k", fetcher), cache.load("k", fetcher)];
    d.resolve("v");
    expect(await Promise.all(calls)).toEqual(["v", "v", "v"]);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("never stores a failure as data, keeps the old copy, and retries next time", async () => {
    const c = clock();
    const cache = createQueryCache({ now: c.now });
    await cache.load("k", async () => "good", { staleMs: 1000 });
    c.advance(1001);

    await expect(cache.load("k", async () => Promise.reject(new Error("down")), { staleMs: 1000 })).rejects.toThrow("down");
    expect(cache.get("k")).toMatchObject({ data: "good", loading: false });
    expect(cache.get("k").error.message).toBe("down");

    expect(await cache.load("k", async () => "again", { staleMs: 1000 })).toBe("again");
    expect(cache.get("k").error).toBeNull();
  });

  it("a first failure leaves no data, so the next call fetches again", async () => {
    const cache = createQueryCache();
    const fetcher = vi.fn().mockRejectedValueOnce(new Error("x")).mockResolvedValueOnce("ok");
    await expect(cache.load("k", fetcher)).rejects.toThrow("x");
    expect(cache.get("k").data).toBeUndefined();
    expect(await cache.load("k", fetcher)).toBe("ok");
  });

  it("force fetches even when fresh", async () => {
    const cache = createQueryCache();
    const fetcher = vi.fn().mockResolvedValueOnce(1).mockResolvedValueOnce(2);
    await cache.load("k", fetcher);
    expect(await cache.load("k", fetcher, { force: true })).toBe(2);
  });

  it("an aborted caller stops waiting, but the shared request finishes and fills the cache", async () => {
    const cache = createQueryCache();
    const d = deferred();
    const fetcher = vi.fn(() => d.promise);
    const ac = new AbortController();

    const aborted = cache.load("k", fetcher, { signal: ac.signal });
    const other = cache.load("k", fetcher);
    ac.abort();
    await expect(aborted).rejects.toMatchObject({ name: "AbortError" });

    d.resolve("done");
    expect(await other).toBe("done"); // the other caller was not cancelled
    expect(cache.get("k").data).toBe("done");
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("rejects at once for a signal that is already aborted", async () => {
    const cache = createQueryCache();
    const ac = new AbortController();
    ac.abort();
    await expect(cache.load("k", async () => 1, { signal: ac.signal })).rejects.toMatchObject({ name: "AbortError" });
  });
});

describe("queryCache.invalidate", () => {
  it("forgets an unwatched key, so the next view starts from the server", async () => {
    const cache = createQueryCache();
    const fetcher = vi.fn().mockResolvedValueOnce("before").mockResolvedValueOnce("after");
    await cache.load("mastery", fetcher);
    cache.invalidate("mastery");

    expect(cache.get("mastery").data).toBeUndefined();
    expect(await cache.load("mastery", fetcher)).toBe("after");
  });

  it("reaches every key under a prefix and leaves the rest", async () => {
    const cache = createQueryCache();
    await cache.load("capstone:a", async () => 1);
    await cache.load("capstone:b", async () => 2);
    await cache.load("mastery", async () => 3);
    cache.invalidate("capstone");

    expect(cache.get("capstone:a").data).toBeUndefined();
    expect(cache.get("capstone:b").data).toBeUndefined();
    expect(cache.get("mastery").data).toBe(3);
  });

  it("refetches a watched key in place, keeping its old data on screen until the new arrives", async () => {
    const cache = createQueryCache();
    const fetcher = vi.fn().mockResolvedValueOnce("before").mockResolvedValueOnce("after");
    await cache.load("k", fetcher);
    const listener = vi.fn();
    cache.subscribe("k", listener);

    cache.invalidate("k");
    expect(cache.get("k").data).toBe("before");
    await vi.waitFor(() => expect(cache.get("k").data).toBe("after"));
    expect(listener).toHaveBeenCalled();
  });

  it("does not trust an answer that was already in flight when a write happened", async () => {
    const cache = createQueryCache();
    const first = deferred();
    const fetcher = vi.fn().mockReturnValueOnce(first.promise).mockResolvedValueOnce("fresh");
    cache.subscribe("k", () => {});

    const pending = cache.load("k", fetcher);
    cache.invalidate("k"); // the write lands while the read is out
    first.resolve("predates the write");
    await pending;

    await vi.waitFor(() => expect(cache.get("k").data).toBe("fresh")); // refetched for the watcher
  });
});

describe("queryCache.clear (logout and a change of user)", () => {
  it("removes everything, so another account sees nothing of the last", async () => {
    const cache = createQueryCache();
    await cache.load("mastery", async () => "ada's");
    await cache.load("profile", async () => "ada");
    cache.clear();

    expect(cache.get("mastery").data).toBeUndefined();
    expect(cache.get("profile").data).toBeUndefined();
    expect(cache.size()).toBe(0);
  });

  it("drops an answer that arrives after the clear instead of storing it", async () => {
    const cache = createQueryCache();
    const d = deferred();
    const pending = cache.load("mastery", () => d.promise);
    cache.clear(); // logged out while the request was out
    d.resolve("ada's data");
    await pending;

    expect(cache.get("mastery").data).toBeUndefined();
    expect(await cache.load("mastery", async () => "grace's")).toBe("grace's");
  });

  it("resets a watched entry and tells the watcher", async () => {
    const cache = createQueryCache();
    await cache.load("k", async () => "v");
    const listener = vi.fn();
    cache.subscribe("k", listener);
    cache.clear();
    expect(cache.get("k").data).toBeUndefined();
    expect(listener).toHaveBeenCalled();
  });
});

describe("queryCache.subscribe", () => {
  it("notifies on change, stops after unsubscribe, and frees an empty entry", async () => {
    const cache = createQueryCache();
    const listener = vi.fn();
    const off = cache.subscribe("k", listener);
    cache.set("k", 1);
    expect(listener).toHaveBeenCalledTimes(1);
    off();
    cache.set("k", 2);
    expect(listener).toHaveBeenCalledTimes(1);

    const off2 = cache.subscribe("empty", () => {});
    off2();
    expect(cache.size()).toBe(1); // only "k", which holds data
  });

  it("hands out the same state object until something changes", () => {
    const cache = createQueryCache();
    expect(cache.get("k")).toBe(cache.get("k"));
    cache.set("k", 1);
    const before = cache.get("k");
    expect(cache.get("k")).toBe(before);
    cache.set("k", 2);
    expect(cache.get("k")).not.toBe(before);
  });
});
