import notificationQueue from "../queues/notificationQueue.js";
import connectDB from "../config/db.js";
import {
  getOrCreateRoomForMember,
  saveMessage,
  setMessageReaction,
  loadMessages,
  loadRoomsForUser,
} from "../modules/chat/index.js";

// Transport layer only: socket presence, broadcasting and notification
// fan-out. All persistence lives in modules/chat/services/chatService.js.

const rooms = new Map(); // roomId -> Set<ws> (sockets currently viewing that room)

const sendError = (ws, message) =>
  ws.send(JSON.stringify({ type: "error", message }));

export const joinRoom = async (ws, data) => {
  const { roomId, receiverId } = data;
  const senderId = ws.userId;
  if (!roomId) return sendError(ws, "Room ID is missing");
  if (!senderId) return sendError(ws, "User id is missing");

  if (!rooms.has(roomId)) rooms.set(roomId, new Set());

  let db;
  let clearedAt = null;
  try {
    db = await connectDB();
    const { error, room } = await getOrCreateRoomForMember(db, {
      roomId,
      userId: senderId,
      receiverId,
    });
    if (error) return sendError(ws, error);
    clearedAt = room.memberSettings?.[senderId]?.clearedAt ?? null;
  } catch (err) {
    console.error("joinRoom failed:", err);
    return sendError(ws, "Error with DB");
  }

  rooms.get(roomId).add(ws);
  const messageHistory = await loadMessages(db, roomId, 50, clearedAt);
  ws.send(JSON.stringify({ type: "message_history", roomId, messageHistory }));
  ws.send(JSON.stringify({ type: "joined_room", roomId }));
};

// Broadcast to every socket currently viewing this room, and track who's
// actually present so we only queue notifications for absent members —
// works the same way for a 2-person room or an N-person group. Shared by text
// (websocket) and voice notes (HTTP upload).
export const deliverChatMessage = (roomId, senderId, { members, mutedMembers = [], message }) => {
  const presentUserIds = new Set();
  rooms.get(roomId)?.forEach((clientSocket) => {
    if (clientSocket.readyState === WebSocket.OPEN) {
      presentUserIds.add(clientSocket.userId);
      clientSocket.send(JSON.stringify({ type: "sended_message", message }));
    }
  });

  // Muted members still receive the message, just no notification.
  members
    .filter(
      (memberId) =>
        memberId !== senderId.toString() &&
        !presentUserIds.has(memberId) &&
        !mutedMembers.includes(memberId),
    )
    .forEach((targetUserId) => {
      notificationQueue.add("new_message", {
        type: "new_message",
        actorId: senderId,
        targetUserId,
      });
    });
};

export const sendMessage = async (ws, data) => {
  const { roomId, text } = data;
  const senderId = ws.userId;
  if (!roomId || !senderId || !text?.trim()) {
    return sendError(ws, "Missing required fields");
  }
  if (!rooms.has(roomId)) {
    return sendError(ws, "Room does not exist");
  }

  try {
    const db = await connectDB();
    const saved = await saveMessage(db, { roomId, senderId, text });
    if (saved.error) return sendError(ws, saved.error);
    deliverChatMessage(roomId, senderId, saved);
  } catch (error) {
    console.error("sendMessage failed:", error);
    return sendError(ws, "Failed to send message");
  }
};

// emoji === null (or omitted) removes the sender's reaction. The client decides
// toggle-vs-replace, so the server stays a plain "set this user's reaction".
export const reactToMessage = async (ws, data) => {
  const { roomId, messageId, emoji = null } = data;
  const userId = ws.userId;
  if (!roomId || !messageId || !userId) {
    return sendError(ws, "Missing required fields");
  }
  const sockets = rooms.get(roomId);
  if (!sockets?.has(ws)) return sendError(ws, "Room does not exist");

  try {
    const db = await connectDB();
    const result = await setMessageReaction(db, { roomId, messageId, userId, emoji });
    if (result.error) return sendError(ws, result.error);

    const payload = JSON.stringify({
      type: "message_reaction",
      roomId,
      messageId: result.messageId,
      userId: result.userId,
      emoji: result.emoji,
    });
    sockets.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) client.send(payload);
    });
  } catch (error) {
    console.error("reactToMessage failed:", error);
    return sendError(ws, "Failed to react");
  }
};

export const removeFromRooms = (ws) => {
  for (const [roomId, sockets] of rooms.entries()) {
    sockets.delete(ws);
    if (sockets.size === 0) rooms.delete(roomId);
  }
};

export const loadLastMessages = async (ws) => {
  const userId = ws.userId;
  if (!userId) return sendError(ws, "userId is not defined");

  const db = await connectDB();
  const roomsData = await loadRoomsForUser(db, userId);
  return ws.send(JSON.stringify({ type: "load_last_messages", roomsData }));
};
