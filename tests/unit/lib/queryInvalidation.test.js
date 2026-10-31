import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createQueryCache } from "@/lib/queryCache";
import { createWriteHandler, keysForWrite } from "@/lib/queryInvalidation";
import { apiFetch, setWriteHandler } from "@/lib/session";

const API = "http://api.test";

describe("keysForWrite", () => {
  it.each([
    ["/api/exams/submit", ["mastery", "readiness", "roadmap-progress", "profile"]],
    ["/api/exams/submit-teach-back", ["mastery", "readiness", "roadmap-progress", "profile"]],
    ["/api/challenges/submit/two-sum", ["mastery", "readiness", "profile"]],
    ["/api/capstone/api-dev/submit", ["capstone", "readiness", "profile"]],
    ["/api/roadmaps/progress", ["roadmap-progress", "readiness"]],
    ["/my-profile/notifications/abc/read", ["notifications"]],
    ["/my-profile/settings", ["profile"]],
    ["/users/ada/follow", ["profile"]],
  ])("%s refreshes %j", (path, keys) => {
    expect(keysForWrite(`${API}${path}`)).toEqual(keys);
  });

  it("leaves writes that change no cached read alone", () => {
    expect(keysForWrite(`${API}/my-profile`)).toEqual([]); // the last-active ping
    expect(keysForWrite(`${API}/blogs`)).toEqual([]);
    expect(keysForWrite("not a url at all")).toEqual([]);
  });

  it("reads the path from a full URL, with a query string and from a relative one", () => {
    expect(keysForWrite(`${API}/api/exams/submit?x=1`)).toContain("mastery");
    expect(keysForWrite("/api/exams/submit")).toContain("mastery");
  });
});

describe("a write through apiFetch refreshes the reads it changed", () => {
  let cache;
  const respond = (status) => vi.fn().mockResolvedValue({ ok: status < 400, status });

  beforeEach(async () => {
    cache = createQueryCache();
    for (const key of ["mastery", "readiness", "profile", "roadmap-progress", "capstone:api-dev", "notifications"]) {
      await cache.load(key, async () => `${key} data`);
    }
    setWriteHandler(createWriteHandler(cache));
  });
  afterEach(() => {
    setWriteHandler(() => {});
    vi.unstubAllGlobals();
  });

  it("finishing an exam leaves no old progress behind", async () => {
    vi.stubGlobal("fetch", respond(200));
    await apiFetch(`${API}/api/exams/submit`, { method: "POST" });

    for (const key of ["mastery", "readiness", "profile", "roadmap-progress"]) expect(cache.get(key).data).toBeUndefined();
    expect(cache.get("capstone:api-dev").data).toBe("capstone:api-dev data"); // unrelated: kept
    expect(cache.get("notifications").data).toBe("notifications data");
  });

  it("a capstone action refreshes every track's copy", async () => {
    vi.stubGlobal("fetch", respond(200));
    await apiFetch(`${API}/api/capstone/api-dev/review`, { method: "POST" });
    expect(cache.get("capstone:api-dev").data).toBeUndefined();
  });

  it("a read does not refresh anything", async () => {
    vi.stubGlobal("fetch", respond(200));
    await apiFetch(`${API}/api/exams/history`);
    await apiFetch(`${API}/api/exams/history`, { method: "GET" });
    expect(cache.get("mastery").data).toBe("mastery data");
  });

  it("a write that failed changed nothing, so nothing is refreshed", async () => {
    vi.stubGlobal("fetch", respond(500));
    await apiFetch(`${API}/api/exams/submit`, { method: "POST" });
    expect(cache.get("mastery").data).toBe("mastery data");
  });

  it("still hands the response back untouched", async () => {
    const response = { ok: true, status: 200, marker: "same object" };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));
    expect(await apiFetch(`${API}/api/exams/submit`, { method: "POST" })).toBe(response);
  });
});
