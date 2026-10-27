import { describe, it, expect, vi, beforeEach } from "vitest";

const apiFetch = vi.fn();
// A plain flag, not a mock that throws: vitest fails a test whose mock throws.
let offline = false;
vi.mock("../../../constants/api", () => ({
  API_BASE_URL: "http://api.test",
  authHeaders: () => ({ Authorization: "Bearer t" }),
  apiFetch: (...args) => {
    if (offline) throw new TypeError("Failed to fetch");
    return apiFetch(...args);
  },
}));

const { dismissDrift } = await import("./driftApi");

const reply = (status, json) => Promise.resolve({ ok: status < 400, status, json: () => Promise.resolve(json) });

beforeEach(() => {
  apiFetch.mockReset();
  offline = false;
});

describe("driftApi.dismissDrift", () => {
  it("posts to the map's dismiss route with the auth header", async () => {
    apiFetch.mockReturnValue(reply(200, { success: true, data: { drift: null } }));
    await expect(dismissDrift("m1")).resolves.toBeUndefined();

    const [url, init] = apiFetch.mock.calls[0];
    expect(url).toBe("http://api.test/api/system-maps/m1/drift/dismiss");
    expect(init.method).toBe("POST");
    expect(init.headers).toMatchObject({ Authorization: "Bearer t" });
  });

  it("throws the server's message when it refuses", async () => {
    apiFetch.mockReturnValue(reply(404, { success: false, message: "Map not found" }));
    await expect(dismissDrift("m1")).rejects.toThrow("Map not found");
  });

  it("falls back to a plain message when the reply has no body", async () => {
    apiFetch.mockReturnValue(reply(500, null));
    await expect(dismissDrift("m1")).rejects.toThrow("Couldn't mark this as reviewed.");
  });

  it("explains a network failure in plain words", async () => {
    offline = true;
    await expect(dismissDrift("m1")).rejects.toThrow("Couldn't reach the server");
  });
});
