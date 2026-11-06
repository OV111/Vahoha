// The Socket.IO server and the rooms it addresses. REST endpoints (group create,
// add, remove...) and the notification queue use this to push realtime updates to
// users, even if they don't currently have that chat open.
let io = null;

export const bindIo = (server) => {
  io = server;
};
export const getIo = () => io;

// Prefixed so a client-supplied chat room id can never name another user's private
// room or a socket's own default room.
export const userRoom = (userId) => `user:${userId}`;
export const chatRoom = (roomId) => `chat:${roomId}`;

export const countUserSockets = (userId) => io?.sockets.adapter.rooms.get(userRoom(userId))?.size ?? 0;

export const sendToUser = (userId, { type, ...payload }) => {
  io?.to(userRoom(userId)).emit(type, payload);
};

// One user at a time on purpose: io.to([]) means "everyone", so an empty member
// list passed as an array of rooms would broadcast to the whole server.
export const notifyUsers = (userIds, payload) => {
  new Set(userIds.map(String)).forEach((id) => sendToUser(id, payload));
};
