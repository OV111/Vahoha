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

const { createMap, createOwnerMap, fetchMyMaps, fetchOwnerMap, fetchPublicMap, saveMap, scanRepo, setSharing } = await import("./systemMapApi");

const reply = (status, json) => Promise.resolve({ ok: status < 400, status, json: () => Promise.resolve(json) });

beforeEach(() => {
  apiFetch.mockReset();
  offline = false;
});

describe("systemMapApi", () => {
  it("sends the graph and revision as JSON with the auth header", async () => {
    apiFetch.mockReturnValue(reply(200, { success: true, data: { id: "m1", revision: 2 } }));
    await saveMap("m1", { graph: { v: 1, nodes: [], edges: [] }, revision: 1 });

    const [url, init] = apiFetch.mock.calls[0];
    expect(url).toBe("http://api.test/api/system-maps/m1");
    expect(init.method).toBe("PUT");
    expect(init.headers).toMatchObject({ Authorization: "Bearer t", "Content-Type": "application/json" });
    expect(JSON.parse(init.body)).toEqual({ graph: { v: 1, nodes: [], edges: [] }, revision: 1 });
  });

  it("returns a conflict as a value, with the server's copy, instead of throwing", async () => {
    const server = { id: "m1", revision: 5 };
    apiFetch.mockReturnValue(reply(409, { success: false, code: "conflict", data: server }));
    await expect(saveMap("m1", { graph: {}, revision: 1 })).resolves.toEqual({ conflict: server });
  });

  it("throws the server's message for other failures", async () => {
    apiFetch.mockReturnValue(reply(409, { success: false, code: "limit", message: "You can keep up to 10 maps." }));
    await expect(createMap({ title: "x", graph: {} })).rejects.toThrow("You can keep up to 10 maps.");
    apiFetch.mockReturnValue(reply(500, null));
    await expect(fetchMyMaps()).rejects.toThrow("Couldn't load your maps.");
  });

  it("explains a network failure in plain words", async () => {
    offline = true;
    await expect(fetchMyMaps()).rejects.toThrow("Couldn't reach the server");
  });

  it("turns sharing on with a PUT to /:id/sharing", async () => {
    apiFetch.mockReturnValue(reply(200, { success: true, data: { id: "m1", shared: true, publicId: "abc" } }));
    await expect(setSharing("m1", true)).resolves.toMatchObject({ shared: true, publicId: "abc" });
    const [url, init] = apiFetch.mock.calls[0];
    expect(url).toBe("http://api.test/api/system-maps/m1/sharing");
    expect(init.method).toBe("PUT");
    expect(JSON.parse(init.body)).toEqual({ shared: true });
  });

  it("loads a public map without sending the auth header", async () => {
    apiFetch.mockReturnValue(reply(200, { success: true, data: { title: "Shop" } }));
    await expect(fetchPublicMap("abc")).resolves.toEqual({ title: "Shop" });
    const [url, init] = apiFetch.mock.calls[0];
    expect(url).toBe("http://api.test/api/system-maps/public/abc");
    expect(init.headers.Authorization).toBeUndefined();
  });

  it("explains a missing or unshared public map", async () => {
    apiFetch.mockReturnValue(reply(404, { success: false, message: "Map not found" }));
    await expect(fetchPublicMap("gone")).rejects.toThrow("This map isn't shared, or the link has changed.");
  });

  it("explains a network failure on the public page too", async () => {
    offline = true;
    await expect(fetchPublicMap("abc")).rejects.toThrow("Couldn't reach the server");
  });

  it("posts the repo URL to /scan and returns the proposal", async () => {
    const proposal = { repo: { fullName: "ada/shop", sha: "abc1234", htmlUrl: "https://github.com/ada/shop" }, parts: [], wires: [], ai: false };
    apiFetch.mockReturnValue(reply(200, { success: true, data: proposal }));
    await expect(scanRepo("https://github.com/ada/shop")).resolves.toEqual(proposal);

    const [url, init] = apiFetch.mock.calls[0];
    expect(url).toBe("http://api.test/api/system-maps/scan");
    expect(init.method).toBe("POST");
    expect(init.headers).toMatchObject({ Authorization: "Bearer t" });
    expect(JSON.parse(init.body)).toEqual({ repoUrl: "https://github.com/ada/shop" });
  });

  it("sends the lens with the scan when there is one", async () => {
    apiFetch.mockReturnValue(reply(200, { success: true, data: { parts: [], wires: [], lens: "data-ai" } }));
    await scanRepo("https://github.com/ada/model", "data-ai");
    expect(JSON.parse(apiFetch.mock.calls[0][1].body)).toEqual({ repoUrl: "https://github.com/ada/model", lens: "data-ai" });
  });

  it("passes the server's reason when a scan fails", async () => {
    apiFetch.mockReturnValue(reply(404, { success: false, message: "That repo doesn't exist or is private." }));
    await expect(scanRepo("https://github.com/ada/nope")).rejects.toThrow("That repo doesn't exist or is private.");
    apiFetch.mockReturnValue(reply(503, null));
    await expect(scanRepo("https://github.com/ada/shop")).rejects.toThrow("Couldn't read that repo.");
  });

  it("explains a network failure during a scan", async () => {
    offline = true;
    await expect(scanRepo("https://github.com/ada/shop")).rejects.toThrow("Couldn't reach the server");
  });

  describe("owner maps (capstone and team)", () => {
    it("reads the map that belongs to a capstone, or null when there is none", async () => {
      apiFetch.mockReturnValue(reply(200, { success: true, data: null }));
      await expect(fetchOwnerMap("capstone", "api-dev")).resolves.toBeNull();
      expect(apiFetch.mock.calls[0][0]).toBe("http://api.test/api/system-maps/for/capstone/api-dev");

      const map = { id: "m1", ownerType: "team", ownerId: "t1" };
      apiFetch.mockReturnValue(reply(200, { success: true, data: map }));
      await expect(fetchOwnerMap("team", "t1")).resolves.toEqual(map);
    });

    it("passes the server's reason when the learner isn't eligible", async () => {
      apiFetch.mockReturnValue(reply(403, { success: false, message: "Start this capstone first." }));
      await expect(fetchOwnerMap("capstone", "api-dev")).rejects.toThrow("Start this capstone first.");
    });

    it("creates the map with a POST body", async () => {
      const map = { id: "m1", revision: 1 };
      apiFetch.mockReturnValue(reply(201, { success: true, data: map }));
      await expect(createOwnerMap("team", "t1", { title: "Team map", graph: { v: 1 } })).resolves.toEqual(map);

      const [url, init] = apiFetch.mock.calls[0];
      expect(url).toBe("http://api.test/api/system-maps/for/team/t1");
      expect(init.method).toBe("POST");
      expect(JSON.parse(init.body)).toEqual({ title: "Team map", graph: { v: 1 } });
    });

    it("hands back the existing map when someone else created it first", async () => {
      const existing = { id: "m9", revision: 4 };
      apiFetch.mockReturnValue(reply(409, { success: false, code: "exists", data: existing }));
      await expect(createOwnerMap("team", "t1", { title: "Team map", graph: {} })).resolves.toEqual(existing);
    });

    it("still throws on other failures and on a network error", async () => {
      apiFetch.mockReturnValue(reply(403, { success: false, message: "Only active team members can open the team map." }));
      await expect(createOwnerMap("team", "t1", { title: "x", graph: {} })).rejects.toThrow("Only active team members");
      offline = true;
      await expect(fetchOwnerMap("team", "t1")).rejects.toThrow("Couldn't reach the server");
    });
  });
});
