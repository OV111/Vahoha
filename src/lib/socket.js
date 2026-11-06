import { io } from "socket.io-client";
import { ensureFreshToken, getAccessToken } from "./session";

// 3 s, 6 s, 12 s ... up to 60 s. The random part keeps every open tab from retrying
// at the same instant after a deploy, which would all hit a restarting server at once.
export const RECONNECT_BASE_MS = 3000;
export const RECONNECT_MAX_MS = 60_000;
const REFUSED_RETRY_MS = 10_000;

const closed = new WeakSet();

/** Opens a socket to the API. Socket.IO reconnects by itself after a dropped connection. */
export const openSocket = () => {
  const socket = io(import.meta.env.VITE_WS_URL, {
    transports: ["websocket"],
    // A function, so every reconnect sends the current token, not the one from page load.
    auth: (send) => send({ token: getAccessToken() }),
    reconnectionDelay: RECONNECT_BASE_MS,
    reconnectionDelayMax: RECONNECT_MAX_MS,
    randomizationFactor: 0.25,
  });

  // Socket.IO stops retrying once the server refuses a handshake. An expired token
  // (a laptop waking from sleep) is worth another try; anything else is not.
  socket.on("connect_error", async (err) => {
    if (socket.active || err.message !== "unauthorized") return;
    await ensureFreshToken();
    setTimeout(() => {
      if (!closed.has(socket) && getAccessToken()) socket.connect();
    }, REFUSED_RETRY_MS);
  });

  return socket;
};

export const closeSocket = (socket) => {
  closed.add(socket);
  socket.disconnect();
};
