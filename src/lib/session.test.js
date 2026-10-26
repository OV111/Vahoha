import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// A JWT the client can read the expiry from (the signature is never checked
// client-side, so a fake one is fine).
// iat is deliberately far from the test clock: only exp - iat may matter.
const makeToken = (lifetimeSec, id = "u1") => {
  const b64 = (o) => btoa(JSON.stringify(o)).replace(/=+$/, "");
  const iat = 1_000_000;
  return `${b64({ alg: "HS256" })}.${b64({ id, iat, exp: iat + lifetimeSec })}.sig`;
};

const json = (status, body) =>
  new Response(body ? JSON.stringify(body) : null, { status });

const isRefresh = (url) => String(url).endsWith("/refresh");
const authOf = (init) => new Headers(init?.headers).get("Authorization");

// Fresh module per test: the session keeps its state in module scope.
let session;
let fetchMock;
beforeEach(async () => {
  vi.resetModules();
  vi.useFakeTimers();
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
  session = await import("./session.js");
});
afterEach(() => {
  session.clearAccessToken();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("tokenLifetimeMs", () => {
  it("is exp - iat in ms, whatever the local clock says", () => {
    expect(session.tokenLifetimeMs(makeToken(900))).toBe(900 * 1000);
  });

  it("returns null for garbage", () => {
    expect(session.tokenLifetimeMs("not-a-jwt")).toBeNull();
  });
});

describe("refreshSession", () => {
  it("sets the new token on 200", async () => {
    const fresh = makeToken(900);
    fetchMock.mockResolvedValue(json(200, { accessToken: fresh }));
    expect(await session.refreshSession()).toBe("ok");
    expect(session.getAccessToken()).toBe(fresh);
  });

  it.each([
    [204, "guest"],
    [401, "expired"],
    [403, "expired"],
  ])("clears the token on %i", async (status, result) => {
    session.setAccessToken(makeToken(900));
    fetchMock.mockResolvedValue(json(status));
    expect(await session.refreshSession()).toBe(result);
    expect(session.getAccessToken()).toBeNull();
  });

  it.each([429, 500])("keeps the token on a transient %i", async (status) => {
    const token = makeToken(900);
    session.setAccessToken(token);
    fetchMock.mockResolvedValue(json(status));
    expect(await session.refreshSession()).toBe("offline");
    expect(session.getAccessToken()).toBe(token);
  });

  it("treats a network error as offline", async () => {
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));
    expect(await session.refreshSession()).toBe("offline");
  });

  it("gives up on a hanging request instead of waiting forever", async () => {
    const timeout = vi.spyOn(AbortSignal, "timeout").mockReturnValue(AbortSignal.abort());
    fetchMock.mockImplementation(
      (_url, { signal }) => (signal.aborted ? Promise.reject(signal.reason) : new Promise(() => {})),
    );
    expect(await session.refreshSession()).toBe("offline");
    expect(timeout).toHaveBeenCalledWith(10 * 1000);
    timeout.mockRestore();
  });

  it("shares one request between concurrent callers", async () => {
    fetchMock.mockResolvedValue(json(200, { accessToken: makeToken(900) }));
    const results = await Promise.all([
      session.refreshSession(),
      session.refreshSession(),
      session.refreshSession(),
    ]);
    expect(results).toEqual(["ok", "ok", "ok"]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe("scheduled refresh", () => {
  it("refreshes a minute before expiry", async () => {
    fetchMock.mockResolvedValue(json(200, { accessToken: makeToken(900) }));
    session.setAccessToken(makeToken(900));

    await vi.advanceTimersByTimeAsync(838 * 1000);
    expect(fetchMock).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(2 * 1000);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("ends the session when the refresh cookie is dead", async () => {
    const onEnd = vi.fn();
    session.setSessionEndHandler(onEnd);
    fetchMock.mockResolvedValue(json(401));
    session.setAccessToken(makeToken(900));

    await vi.advanceTimersByTimeAsync(900 * 1000);
    expect(onEnd).toHaveBeenCalledTimes(1);
    expect(session.getAccessToken()).toBeNull();
  });

  it("retries later when offline instead of logging out", async () => {
    const onEnd = vi.fn();
    session.setSessionEndHandler(onEnd);
    fetchMock
      .mockRejectedValueOnce(new TypeError("offline"))
      .mockResolvedValueOnce(json(200, { accessToken: makeToken(900) }));
    session.setAccessToken(makeToken(900));

    await vi.advanceTimersByTimeAsync(840 * 1000);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(30 * 1000);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(onEnd).not.toHaveBeenCalled();
  });

  it("never loops on a token that is stale on arrival", async () => {
    fetchMock.mockResolvedValue(json(200, { accessToken: makeToken(10) }));
    session.setAccessToken(makeToken(10));

    await vi.advanceTimersByTimeAsync(20 * 1000);
    expect(fetchMock.mock.calls.length).toBeLessThanOrEqual(4);
  });
});

describe("apiFetch", () => {
  it("passes requests without a Bearer header straight through", async () => {
    fetchMock.mockResolvedValue(json(401));
    const res = await session.apiFetch("/public");
    expect(res.status).toBe(401);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("sends the current token even if the caller read an old one", async () => {
    const current = makeToken(900, "new");
    session.setAccessToken(current);
    fetchMock.mockResolvedValue(json(200, {}));
    await session.apiFetch("/me", { headers: { Authorization: "Bearer stale" } });
    expect(authOf(fetchMock.mock.calls[0][1])).toBe(`Bearer ${current}`);
  });

  it("refreshes once on 401 and retries with the new token", async () => {
    const fresh = makeToken(900, "fresh");
    session.setAccessToken(makeToken(900, "old"));
    fetchMock.mockImplementation(async (url, init) => {
      if (isRefresh(url)) return json(200, { accessToken: fresh });
      return authOf(init) === `Bearer ${fresh}` ? json(200, { ok: true }) : json(401);
    });

    const res = await session.apiFetch("/me", { headers: session.authHeaders() });
    expect(res.status).toBe(200);
    expect(fetchMock.mock.calls.filter(([u]) => isRefresh(u))).toHaveLength(1);
  });

  it("refreshes once for many parallel 401s", async () => {
    const fresh = makeToken(900, "fresh");
    session.setAccessToken(makeToken(900, "old"));
    fetchMock.mockImplementation(async (url, init) => {
      if (isRefresh(url)) return json(200, { accessToken: fresh });
      return authOf(init) === `Bearer ${fresh}` ? json(200, {}) : json(401);
    });

    const results = await Promise.all(
      [1, 2, 3, 4].map(() => session.apiFetch("/x", { headers: session.authHeaders() })),
    );
    expect(results.map((r) => r.status)).toEqual([200, 200, 200, 200]);
    expect(fetchMock.mock.calls.filter(([u]) => isRefresh(u))).toHaveLength(1);
  });

  it("ends the session when the refresh fails, without looping", async () => {
    const onEnd = vi.fn();
    session.setSessionEndHandler(onEnd);
    session.setAccessToken(makeToken(900));
    fetchMock.mockImplementation(async () => json(401));

    const res = await session.apiFetch("/me", { headers: session.authHeaders() });
    expect(res.status).toBe(401);
    expect(onEnd).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledTimes(2); // request + refresh, no retry
  });

  it("refreshes first when the token is already stale (after sleep)", async () => {
    const fresh = makeToken(900, "fresh");
    session.setAccessToken(makeToken(30, "stale"));
    fetchMock.mockImplementation(async (url) =>
      isRefresh(url) ? json(200, { accessToken: fresh }) : json(200, {}),
    );

    await session.apiFetch("/me", { headers: session.authHeaders() });
    expect(isRefresh(fetchMock.mock.calls[0][0])).toBe(true);
    expect(authOf(fetchMock.mock.calls[1][1])).toBe(`Bearer ${fresh}`);
  });

  it("does not retry a guest's 401", async () => {
    fetchMock.mockResolvedValue(json(401));
    const res = await session.apiFetch("/me", { headers: session.authHeaders() });
    expect(res.status).toBe(401);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
