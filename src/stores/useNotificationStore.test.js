import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const getNotifications = vi.hoisted(() => vi.fn());
vi.mock("@/services/notificationsApi", () => ({ getNotifications: (...args) => getNotifications(...args) }));
vi.mock("../../constants/api", () => ({ getAccessToken: () => "token" }));

import useNotificationStore from "./useNotificationStore";
import { queryCache } from "../lib/queryCache";
import { RECONNECT_BASE_MS, RECONNECT_MAX_MS } from "../lib/backoff";

// A WebSocket the test drives by hand.
let sockets;
class FakeSocket {
  constructor() {
    this.sent = [];
    sockets.push(this);
  }
  send(data) {
    this.sent.push(data);
  }
  close() {}
  open() {
    this.onopen?.();
  }
  drop() {
    this.onclose?.();
  }
  push(payload) {
    this.onmessage?.({ data: JSON.stringify(payload) });
  }
}

const { connectWs, disconnectWs } = useNotificationStore.getState();

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(Math, "random").mockReturnValue(1); // the top of the jitter range: delays are exact
  sockets = [];
  vi.stubGlobal("WebSocket", FakeSocket);
  vi.stubEnv("VITE_WS_URL", "ws://ws.test");
  getNotifications.mockReset();
  getNotifications.mockResolvedValue([]);
  queryCache.clear();
  disconnectWs();
  useNotificationStore.setState({ notifications: [], unreadCount: 0, ws: null });
});
afterEach(() => {
  disconnectWs();
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("notification socket reconnects", () => {
  it("waits longer after each failed attempt, up to a cap, and never refetches while failing", async () => {
    connectWs();
    sockets.at(-1).open();
    sockets.at(-1).drop(); // the connection is lost

    const waits = [];
    for (let attempt = 0; attempt < 8; attempt++) {
      const before = sockets.length;
      let waited = 0;
      while (sockets.length === before) {
        await vi.advanceTimersByTimeAsync(1000);
        waited += 1000;
      }
      waits.push(waited);
      sockets.at(-1).drop(); // the new attempt fails to connect (never opens)
    }

    expect(waits).toEqual([3000, 6000, 12_000, 24_000, 48_000, 60_000, 60_000, 60_000]);
    expect(Math.max(...waits)).toBe(RECONNECT_MAX_MS);
    expect(waits[0]).toBe(RECONNECT_BASE_MS);
    expect(getNotifications).not.toHaveBeenCalled(); // no request per failed attempt
  });

  it("refetches the inbox once when a reconnect succeeds, and starts the backoff over", async () => {
    connectWs();
    sockets.at(-1).open();
    sockets.at(-1).drop();
    await vi.advanceTimersByTimeAsync(3000); // first retry
    sockets.at(-1).drop();
    await vi.advanceTimersByTimeAsync(6000); // second retry
    expect(getNotifications).not.toHaveBeenCalled();

    sockets.at(-1).open(); // finally back
    expect(getNotifications).toHaveBeenCalledTimes(1);
    expect(getNotifications).toHaveBeenCalledWith({ force: true });

    sockets.at(-1).drop(); // and lost again: back to the short wait
    const before = sockets.length;
    await vi.advanceTimersByTimeAsync(3000);
    expect(sockets.length).toBe(before + 1);
  });

  it("does not refetch on the first connection of a session (the login already loaded the inbox)", () => {
    connectWs();
    sockets.at(-1).open();
    expect(getNotifications).not.toHaveBeenCalled();
  });

  it("stops retrying when disconnected on purpose", async () => {
    connectWs();
    sockets.at(-1).open();
    sockets.at(-1).drop();
    disconnectWs();
    await vi.advanceTimersByTimeAsync(120_000);
    expect(sockets.length).toBe(1);
  });
});

describe("notification inbox cache", () => {
  it("drops the cached inbox when the socket pushes a new notification", async () => {
    await queryCache.load("notifications", async () => [{ _id: "1" }]);
    connectWs();
    sockets.at(-1).push({ type: "notification", data: { _id: "2", read: false } });

    expect(queryCache.get("notifications").data).toBeUndefined(); // the next visit asks the server
    expect(useNotificationStore.getState().notifications.map((n) => n._id)).toEqual(["2"]);
  });

  it("loads the inbox into the store", async () => {
    getNotifications.mockResolvedValue([{ _id: "1", read: false }]);
    await useNotificationStore.getState().loadNotifications();
    expect(useNotificationStore.getState().unreadCount).toBe(1);
  });
});
