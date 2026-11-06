import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const getNotifications = vi.hoisted(() => vi.fn());
vi.mock("@/services/notificationsApi", () => ({ getNotifications: (...args) => getNotifications(...args) }));
vi.mock("../../../constants/api", () => ({ getAccessToken: () => "token" }));

// A Socket.IO client the test drives by hand.
const sockets = vi.hoisted(() => []);
const session = vi.hoisted(() => ({ token: "token", ensureFreshToken: vi.fn(async () => {}) }));
vi.mock("socket.io-client", () => ({
  io: (url, options) => {
    const handlers = {};
    const socket = {
      url,
      options,
      active: true,
      connect: vi.fn(),
      disconnect: vi.fn(),
      on: (event, fn) => ((handlers[event] ??= []).push(fn), socket),
      fire: (event, ...args) => handlers[event]?.forEach((fn) => fn(...args)),
    };
    sockets.push(socket);
    return socket;
  },
}));
vi.mock("@/lib/session", () => ({
  getAccessToken: () => session.token,
  ensureFreshToken: session.ensureFreshToken,
}));

import useNotificationStore from "@/stores/useNotificationStore";
import { queryCache } from "@/lib/queryCache";
import { RECONNECT_BASE_MS, RECONNECT_MAX_MS } from "@/lib/socket";

const { connectWs, disconnectWs } = useNotificationStore.getState();

beforeEach(() => {
  vi.useFakeTimers();
  sockets.length = 0;
  session.token = "token";
  vi.stubEnv("VITE_WS_URL", "ws://ws.test");
  getNotifications.mockReset();
  getNotifications.mockResolvedValue([]);
  queryCache.clear();
  disconnectWs();
  sockets.length = 0;
  useNotificationStore.setState({ notifications: [], unreadCount: 0, ws: null });
});
afterEach(() => {
  disconnectWs();
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("notification socket reconnects", () => {
  it("asks Socket.IO for the growing, capped, randomised wait between attempts", () => {
    connectWs();
    expect(sockets[0].options).toMatchObject({
      transports: ["websocket"],
      reconnectionDelay: RECONNECT_BASE_MS,
      reconnectionDelayMax: RECONNECT_MAX_MS,
      randomizationFactor: 0.25,
    });
  });

  it("sends the token current at each attempt, not the one from connect time", () => {
    connectWs();
    session.token = "newer";
    const send = vi.fn();
    sockets[0].options.auth(send);
    expect(send).toHaveBeenCalledWith({ token: "newer" });
  });

  it("refetches the inbox once when a reconnect succeeds, not on the first connection", () => {
    connectWs();
    sockets[0].fire("connect"); // the login already loaded the inbox
    expect(getNotifications).not.toHaveBeenCalled();

    sockets[0].fire("disconnect", "transport close");
    expect(getNotifications).not.toHaveBeenCalled();

    sockets[0].fire("connect");
    expect(getNotifications).toHaveBeenCalledTimes(1);
    expect(getNotifications).toHaveBeenCalledWith({ force: true });
  });

  it("refreshes the token and retries after the server refuses an expired one", async () => {
    connectWs();
    sockets[0].active = false;
    sockets[0].fire("connect_error", new Error("unauthorized"));
    await vi.advanceTimersByTimeAsync(10_000);
    expect(session.ensureFreshToken).toHaveBeenCalled();
    expect(sockets[0].connect).toHaveBeenCalledTimes(1);
  });

  it("does not retry a refusal for any other reason", async () => {
    connectWs();
    sockets[0].active = false;
    sockets[0].fire("connect_error", new Error("too_many_connections"));
    await vi.advanceTimersByTimeAsync(60_000);
    expect(sockets[0].connect).not.toHaveBeenCalled();
  });

  it("stops retrying when disconnected on purpose", async () => {
    connectWs();
    const socket = sockets[0];
    socket.active = false;
    socket.fire("connect_error", new Error("unauthorized"));
    disconnectWs();
    await vi.advanceTimersByTimeAsync(60_000);
    expect(socket.disconnect).toHaveBeenCalled();
    expect(socket.connect).not.toHaveBeenCalled();
  });
});

describe("notification inbox cache", () => {
  it("drops the cached inbox when the socket pushes a new notification", async () => {
    await queryCache.load("notifications", async () => [{ _id: "1" }]);
    connectWs();
    sockets[0].fire("notification", { data: { _id: "2", read: false } });

    expect(queryCache.get("notifications").data).toBeUndefined(); // the next visit asks the server
    expect(useNotificationStore.getState().notifications.map((n) => n._id)).toEqual(["2"]);
  });

  it("loads the inbox into the store", async () => {
    getNotifications.mockResolvedValue([{ _id: "1", read: false }]);
    await useNotificationStore.getState().loadNotifications();
    expect(useNotificationStore.getState().unreadCount).toBe(1);
  });
});
