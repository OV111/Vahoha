import { WebSocketServer } from "ws";
import { joinRoom, loadLastMessages, sendMessage, reactToMessage, removeFromRooms } from "./chatHandler.js";
import { registerUserSocket, unregisterUserSocket } from "./connectionRegistry.js";
import { verifyToken } from "../utils/jwtToken.js";
import { isOriginAllowed } from "./origin.js";
import { createMessageLimiter } from "./messageLimiter.js";

// Chat messages are short. Without this the ws default would accept 100 MiB in one frame.
export const MAX_MESSAGE_BYTES = 16 * 1024;

let wss;
export const getWss = () => wss;

export default function initWebSocketServer(server) {
  wss = new WebSocketServer({
    server,
    maxPayload: MAX_MESSAGE_BYTES,
    // Refuse handshakes from foreign websites (see origin.js for why).
    verifyClient: ({ origin }) => isOriginAllowed(origin),
  });
  wss.on("connection", (ws) => {
    console.log("Client Connected!");
    const checkRate = createMessageLimiter();
    // ws emits "error" for protocol faults such as a frame over MAX_MESSAGE_BYTES (it
    // closes the socket itself). With no listener, Node throws it and the process dies.
    ws.on("error", (err) => console.log("WebSocket error:", err.message));

    ws.on("message", async (message) => {
      const rate = checkRate();
      if (rate === "close") return ws.close(1008, "Too many messages");
      if (rate === "limited") {
        return ws.send(JSON.stringify({ type: "error", code: "rate_limited", message: "You're sending messages too fast." }));
      }
      try {
        const data = JSON.parse(message.toString());
        if (data.type === "auth") {
          const decoded = verifyToken(data.token);
          if (!decoded) {
            return ws.close();
          }
          ws.userId = decoded.id;
          registerUserSocket(ws.userId, ws);
        } else {
          if (!ws.userId) return ws.close();
          else if (data.type === "join_room") {
            // calling the joinRoom funciton and load messages
            await joinRoom(ws, data);
          } else if (data.type === "send_message") {
            await sendMessage(ws, data);
          } else if (data.type === "react_message") {
            await reactToMessage(ws, data);
          } else if (data.type === "load_last_messages") {
            await loadLastMessages(ws);
          }
          //   else if (data.type === "leave_room") {// closing connection}
        }
      } catch (err) {
        console.log(err);
      }
    });
    ws.on("close", () => {
      removeFromRooms(ws);
      unregisterUserSocket(ws.userId, ws);
    });
  });

  return wss;
}
