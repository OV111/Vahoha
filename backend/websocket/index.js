import { Server } from "socket.io";
import { joinRoom, loadLastMessages, sendMessage, reactToMessage, setTyping, clearTyping } from "./chatHandler.js";
import { bindIo, countUserSockets, userRoom } from "./connectionRegistry.js";
import { verifyToken } from "../utils/jwtToken.js";
import { isOriginAllowed } from "./origin.js";
import { createMessageLimiter } from "./messageLimiter.js";
import { AUTH_DEADLINE_MS, MAX_SOCKETS_PER_USER, clientIp, createPendingTracker } from "./connectionLimits.js";

// Chat messages are short. Without this Socket.IO would accept 1 MB in one packet.
export const MAX_MESSAGE_BYTES = 16 * 1024;

// Read by the client: "unauthorized" means refresh the token and try again.
export const CONNECT_UNAUTHORIZED = "unauthorized";
export const CONNECT_TOO_MANY = "too_many_connections";

const HANDLERS = {
  join_room: joinRoom,
  send_message: sendMessage,
  react_message: reactToMessage,
  typing: setTyping,
  load_last_messages: loadLastMessages,
};

export default function initWebSocketServer(server) {
  const pending = createPendingTracker();

  const io = new Server(server, {
    // WebSocket only: long-polling would need CORS and sticky sessions for nothing,
    // since every browser this app supports has WebSockets.
    transports: ["websocket"],
    serveClient: false,
    maxHttpBufferSize: MAX_MESSAGE_BYTES,
    connectTimeout: AUTH_DEADLINE_MS,
    // Refuse handshakes from foreign websites (see origin.js for why).
    allowRequest: (req, callback) => {
      callback(null, isOriginAllowed(req.headers.origin) && pending.hasRoom(clientIp(req)));
    },
  });
  bindIo(io);

  io.engine.on("connection", (conn) => pending.track(conn, clientIp(conn.request)));

  io.use((socket, next) => {
    const decoded = verifyToken(socket.handshake.auth?.token);
    if (!decoded) return next(new Error(CONNECT_UNAUTHORIZED));
    if (countUserSockets(decoded.id) >= MAX_SOCKETS_PER_USER) return next(new Error(CONNECT_TOO_MANY));
    socket.data.userId = decoded.id;
    next();
  });

  io.on("connection", (socket) => {
    pending.signedIn(socket.conn);
    socket.join(userRoom(socket.data.userId));
    socket.on("disconnecting", () => clearTyping(socket));

    const checkRate = createMessageLimiter();
    socket.use((_packet, next) => {
      const rate = checkRate();
      if (rate === "close") return socket.disconnect(true);
      if (rate === "limited") {
        return socket.emit("chat_error", { code: "rate_limited", message: "You're sending messages too fast." });
      }
      next();
    });

    for (const [event, handler] of Object.entries(HANDLERS)) {
      socket.on(event, async (data) => {
        try {
          await handler(socket, data);
        } catch (err) {
          console.log(err);
        }
      });
    }
  });

  return io;
}
