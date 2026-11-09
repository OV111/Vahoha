import notificationQueue from "../queues/notificationQueue.js";
import connectDB from "../config/db.js";
import {
  getOrCreateRoomForMember,
  saveMessage,
  setMessageReaction,
  loadMessages,
  loadRoomsForUser,
} from "../modules/chat/index.js";
import { chatRoom, getIo } from "./connectionRegistry.js";

// Transport layer only: socket presence, broadcasting and notification
// fan-out. All persistence lives in modules/chat/services/chatService.js.

const sendError = (socket, message) => socket.emit("chat_error", { message });

export const joinRoom = async (socket, data) => {
  const { roomId, receiverId } = data;
  const senderId = socket.data.userId;
  if (!roomId || typeof roomId !== "string") return sendError(socket, "Room ID is missing");

  let db;
  let clearedAt = null;
  try {
    db = await connectDB();
    const { error, room } = await getOrCreateRoomForMember(db, {
      roomId,
      userId: senderId,
      receiverId,
    });
    if (error) return sendError(socket, error);
    clearedAt = room.memberSettings?.[senderId]?.clearedAt ?? null;
  } catch (err) {
    console.error("joinRoom failed:", err);
    return sendError(socket, "Error with DB");
  }

  // The socket can close during the awaits above. Its rooms were already cleaned up
  // by then, so joining now would leave a dead entry in the room for good.
  if (!socket.connected) return;
  socket.join(chatRoom(roomId));
  const messageHistory = await loadMessages(db, roomId, 50, clearedAt);
  socket.emit("message_history", { roomId, messageHistory });
  socket.emit("joined_room", { roomId });
};

// Broadcast to every socket currently viewing this room, and track who's
// actually present so we only queue notifications for absent members —
// works the same way for a 2-person room or an N-person group. Shared by text
// (websocket) and voice notes (HTTP upload).
export const deliverChatMessage = async (roomId, senderId, { members, mutedMembers = [], message, isRequest = false }) => {
  const io = getIo();
  const room = chatRoom(roomId);
  const viewers = await io.in(room).fetchSockets();
  const presentUserIds = new Set(viewers.map((viewer) => viewer.data.userId));
  io.to(room).emit("sended_message", { message });

  // Muted members still receive the message, just no notification.
  members
    .filter(
      (memberId) =>
        memberId !== senderId.toString() &&
        !presentUserIds.has(memberId) &&
        !mutedMembers.includes(memberId),
    )
    .forEach((targetUserId) => {
      // A message request is someone the receiver doesn't follow back: it has
      // its own wording and opens the Requests tab, not the chat list.
      const type = isRequest ? "message_request" : "new_message";
      Promise.resolve(
        notificationQueue.add(type, { type, actorId: String(senderId), targetUserId }),
      ).catch((err) => console.error(`Could not queue ${type} notification:`, err));
    });
};

export const sendMessage = async (socket, data) => {
  const { roomId, text } = data;
  const senderId = socket.data.userId;
  if (!roomId || !text?.trim()) {
    return sendError(socket, "Missing required fields");
  }
  if (!socket.rooms.has(chatRoom(roomId))) {
    return sendError(socket, "Room does not exist");
  }

  try {
    const db = await connectDB();
    const saved = await saveMessage(db, { roomId, senderId, text });
    if (saved.error) return sendError(socket, saved.error);
    await deliverChatMessage(roomId, senderId, saved);
  } catch (error) {
    console.error("sendMessage failed:", error);
    return sendError(socket, "Failed to send message");
  }
};

// emoji === null (or omitted) removes the sender's reaction. The client decides
// toggle-vs-replace, so the server stays a plain "set this user's reaction".
export const reactToMessage = async (socket, data) => {
  const { roomId, messageId, emoji = null } = data;
  const userId = socket.data.userId;
  if (!roomId || !messageId) {
    return sendError(socket, "Missing required fields");
  }
  const room = chatRoom(roomId);
  if (!socket.rooms.has(room)) return sendError(socket, "Room does not exist");

  try {
    const db = await connectDB();
    const result = await setMessageReaction(db, { roomId, messageId, userId, emoji });
    if (result.error) return sendError(socket, result.error);

    getIo().to(room).emit("message_reaction", {
      roomId,
      messageId: result.messageId,
      userId: result.userId,
      emoji: result.emoji,
    });
  } catch (error) {
    console.error("reactToMessage failed:", error);
    return sendError(socket, "Failed to react");
  }
};

// "X is typing…" is a hint, not data: nothing is stored, nobody gets a
// notification, and a bad packet is dropped silently instead of toasting an error.
export const setTyping = (socket, data) => {
  const { roomId, isTyping } = data ?? {};
  if (!roomId || typeof roomId !== "string") return;
  const room = chatRoom(roomId);
  if (!socket.rooms.has(room)) return;
  socket.to(room).emit("typing", { roomId, userId: socket.data.userId, isTyping: Boolean(isTyping) });
};

// A closed tab never sends its "stopped typing", so send it for every chat
// the socket was in. Runs on "disconnecting", while socket.rooms is still filled.
export const clearTyping = (socket) => {
  const prefix = chatRoom("");
  for (const room of socket.rooms) {
    if (!room.startsWith(prefix)) continue;
    socket.to(room).emit("typing", { roomId: room.slice(prefix.length), userId: socket.data.userId, isTyping: false });
  }
};

export const loadLastMessages = async (socket) => {
  const db = await connectDB();
  const roomsData = await loadRoomsForUser(db, socket.data.userId);
  socket.emit("load_last_messages", { roomsData });
};
