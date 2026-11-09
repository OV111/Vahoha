import { useCallback, useEffect, useRef, useState } from "react";

// While someone keeps typing, "typing" is re-sent this often so the other side's
// indicator does not expire. Every packet counts toward the server's flood limit
// (20 per 10 s, see backend/websocket/messageLimiter.js), so never once per keystroke.
export const TYPING_REFRESH_MS = 3000;
// No keystroke for this long counts as stopped.
export const TYPING_IDLE_MS = 4000;
// The receiving side drops an indicator nobody refreshed: a lost "stop" packet
// or a sender whose connection died without saying so.
export const TYPING_EXPIRE_MS = 6000;

const NO_ONE = [];

/**
 * "X is typing…" for the open chat. Returns who is typing in `roomId` (user ids,
 * never me) and the two calls the composer makes: `notifyTyping` on every edit,
 * `stopTyping` when the draft is sent or emptied.
 */
export default function useTypingIndicator(socket, roomId, myId) {
  const [typers, setTypers] = useState({}); // { [roomId]: userId[] }
  const expiry = useRef(new Map()); // "roomId|userId" -> timeout

  useEffect(() => {
    if (!socket) return;
    const timers = expiry.current;

    const remove = (room, userId) => {
      const key = `${room}|${userId}`;
      clearTimeout(timers.get(key));
      timers.delete(key);
      setTypers((prev) =>
        prev[room]?.includes(userId) ? { ...prev, [room]: prev[room].filter((id) => id !== userId) } : prev,
      );
    };

    const onTyping = ({ roomId: room, userId, isTyping }) => {
      const id = String(userId);
      // The server skips the sending socket, not my other tabs.
      if (id === String(myId)) return;
      if (!isTyping) return remove(room, id);
      const key = `${room}|${id}`;
      clearTimeout(timers.get(key));
      timers.set(key, setTimeout(() => remove(room, id), TYPING_EXPIRE_MS));
      setTypers((prev) => (prev[room]?.includes(id) ? prev : { ...prev, [room]: [...(prev[room] ?? []), id] }));
    };

    // Their message landed, so what they were typing is done. Without this the
    // indicator lingers under the new bubble until their "stop" arrives.
    const onMessage = ({ message }) => {
      if (message?.roomId && message.senderId) remove(String(message.roomId), String(message.senderId));
    };

    socket.on("typing", onTyping);
    socket.on("sended_message", onMessage);
    return () => {
      socket.off("typing", onTyping);
      socket.off("sended_message", onMessage);
      timers.forEach(clearTimeout);
      timers.clear();
    };
  }, [socket, myId]);

  const lastSentAt = useRef(0);
  const idleTimer = useRef(null);

  const stopTyping = useCallback(() => {
    clearTimeout(idleTimer.current);
    if (lastSentAt.current && socket?.connected && roomId) socket.emit("typing", { roomId, isTyping: false });
    lastSentAt.current = 0;
  }, [socket, roomId]);

  const notifyTyping = useCallback(() => {
    // Checked so Socket.IO does not buffer it and replay a stale "typing" on reconnect.
    if (!socket?.connected || !roomId) return;
    const now = Date.now();
    if (now - lastSentAt.current >= TYPING_REFRESH_MS) {
      socket.emit("typing", { roomId, isTyping: true });
      lastSentAt.current = now;
    }
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(stopTyping, TYPING_IDLE_MS);
  }, [socket, roomId, stopTyping]);

  // Switching chats or leaving the page: the cleanup still holds the old roomId,
  // so the chat being left is the one told "stopped".
  useEffect(() => stopTyping, [stopTyping]);

  return { typingUserIds: (roomId && typers[roomId]) || NO_ONE, notifyTyping, stopTyping };
}
