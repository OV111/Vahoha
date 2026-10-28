import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const apiFetch = vi.hoisted(() => vi.fn());
vi.mock("../../constants/api", () => ({
  API_BASE_URL: "http://api.test",
  getAccessToken: () => "token",
  authHeaders: () => ({ Authorization: "Bearer token" }),
  apiFetch: (...args) => apiFetch(...args),
}));
vi.mock("../lib/posthog", () => ({ default: { identify: vi.fn(), reset: vi.fn() }, isPostHogConfigured: false }));

import useProfileStore from "./useProfileStore";
import { queryCache } from "../lib/queryCache";

const profile = (name = "Ada") => ({ userWithoutPassword: { _id: "u1", firstName: name }, stats: { userId: "u1", xp: 10 } });
const reply = (status, body) => ({ status, ok: status < 400, json: async () => body });

const deferred = () => {
  let resolve;
  const promise = new Promise((res) => (resolve = res));
  return { promise, resolve };
};

beforeEach(() => {
  queryCache.clear();
  useProfileStore.setState({ user: null, stats: null, isLoading: false });
  apiFetch.mockReset();
  apiFetch.mockResolvedValue(reply(200, profile()));
});
afterEach(() => vi.useRealTimers());

const { fetchProfile } = useProfileStore.getState();

describe("fetchProfile", () => {
  it("loads the profile into the store", async () => {
    const stats = await fetchProfile();
    expect(stats).toEqual({ userId: "u1", xp: 10 });
    expect(useProfileStore.getState().user.firstName).toBe("Ada");
    expect(useProfileStore.getState().isLoading).toBe(false);
  });

  it("a second call while the first is out joins it: one request, not two", async () => {
    // The app loads the profile at login and the profile page asks again on mount.
    await Promise.all([fetchProfile(), fetchProfile()]);
    expect(apiFetch).toHaveBeenCalledTimes(1);
  });

  it("does not ask the server again within a minute", async () => {
    await fetchProfile();
    await fetchProfile();
    expect(apiFetch).toHaveBeenCalledTimes(1);
  });

  it("asks again once the copy is more than a minute old, behind the profile on screen", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    await fetchProfile();
    vi.setSystemTime(Date.now() + 61_000);

    const pending = fetchProfile();
    expect(useProfileStore.getState().isLoading).toBe(false); // no full-page spinner over a profile that is already showing
    await pending;
    expect(apiFetch).toHaveBeenCalledTimes(2);
  });

  it("asks again when forced", async () => {
    await fetchProfile();
    await fetchProfile({ force: true });
    expect(apiFetch).toHaveBeenCalledTimes(2);
  });

  it("asks again after a write marked it out of date", async () => {
    await fetchProfile();
    queryCache.invalidate("profile"); // e.g. saved settings, or finished a test
    apiFetch.mockResolvedValue(reply(200, profile("Grace")));
    await fetchProfile();
    expect(useProfileStore.getState().user.firstName).toBe("Grace");
  });

  it("shows the spinner only when there is no profile yet", async () => {
    const d = deferred();
    apiFetch.mockReturnValueOnce(d.promise);
    const pending = fetchProfile();
    expect(useProfileStore.getState().isLoading).toBe(true);
    d.resolve(reply(200, profile()));
    await pending;
    expect(useProfileStore.getState().isLoading).toBe(false);
  });

  it("answers 'unauthorized' on a 401 and caches nothing", async () => {
    apiFetch.mockResolvedValue(reply(401, {}));
    expect(await fetchProfile()).toBe("unauthorized");
    expect(queryCache.get("profile").data).toBeUndefined();
  });

  it("does not cache a failure, so the next call retries", async () => {
    const quiet = vi.spyOn(console, "error").mockImplementation(() => {});
    apiFetch.mockResolvedValueOnce(reply(500, {})).mockResolvedValueOnce(reply(200, profile()));
    expect(await fetchProfile()).toBeUndefined();
    expect(await fetchProfile()).toEqual({ userId: "u1", xp: 10 });
    expect(apiFetch).toHaveBeenCalledTimes(2);
    quiet.mockRestore();
  });
});
