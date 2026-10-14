// Chat persistence: rooms, membership and messages.
// Pure DB logic — no sockets. websocket/chatHandler.js owns the transport
// side (who is connected, broadcasting, notification fan-out) and calls in
// here. Access failures come back as `{ error }` so the handler can relay the
// message to the client; unexpected DB errors still throw.

import { ObjectId } from "mongodb";

const ROOM_LIST_PROJECTION = {
  _id: 1,
  type: 1,
  status: 1,
  requestedBy: 1,
  name: 1,
  avatar: 1,
  members: 1,
  admins: 1,
  createdBy: 1,
  lastMessage: 1,
  updatedAt: 1,
};

// Must match how the client derives a direct room id (Chats.jsx).
export const directRoomId = (a, b) => [String(a), String(b)].sort().join("_");

// Who may message whom. Mutual followers chat freely ("active"). Anyone else
// can send ONE message request ("pending") if the receiver's policy allows it,
// and the receiver must accept before the conversation continues. A block in
// either direction always wins. Returns "active" | "pending" | null (refused).
export const MESSAGE_POLICIES = ["everyone", "followers", "nobody"];
const DEFAULT_MESSAGE_POLICY = "everyone";
const MAX_OPEN_REQUESTS = 20; // unanswered requests one sender may have at once

async function directChatAccess(db, userId, receiverId) {
  if (!ObjectId.isValid(receiverId) || String(receiverId) === String(userId)) return null;
  if (await isBlockedEitherWay(db, String(userId), String(receiverId))) return null;

  const me = new ObjectId(String(userId));
  const them = new ObjectId(String(receiverId));
  const follows = db.collection("follows");
  const [iFollow, theyFollow] = await Promise.all([
    follows.findOne({ followerId: me, followingId: them }, { projection: { _id: 1 } }),
    follows.findOne({ followerId: them, followingId: me }, { projection: { _id: 1 } }),
  ]);
  if (iFollow && theyFollow) return "active";

  const policy = await getMessagePolicy(db, receiverId);
  if (policy === "nobody") return null;
  if (policy === "followers" && !iFollow) return null;

  // Cap unanswered requests so one account can't flood strangers' inboxes.
  const open = await db
    .collection("rooms")
    .countDocuments({
      type: "direct",
      status: "pending",
      requestSent: true,
      requestedBy: String(userId),
    });
  return open >= MAX_OPEN_REQUESTS ? null : "pending";
}

export async function getMessagePolicy(db, userId) {
  if (!ObjectId.isValid(userId)) return DEFAULT_MESSAGE_POLICY;
  const user = await db
    .collection("users")
    .findOne({ _id: new ObjectId(String(userId)) }, { projection: { messagePolicy: 1 } });
  return MESSAGE_POLICIES.includes(user?.messagePolicy) ? user.messagePolicy : DEFAULT_MESSAGE_POLICY;
}

export async function setMessagePolicy(db, { userId, policy }) {
  if (!MESSAGE_POLICIES.includes(policy)) throw serviceError("Invalid policy", 400);
  await db
    .collection("users")
    .updateOne({ _id: new ObjectId(String(userId)) }, { $set: { messagePolicy: policy } });
  return { policy };
}

// Returns the room if `userId` may enter it. A missing room is only created
// implicitly for the direct-chat flow (first DM or message request,
// signalled by `receiverId`) — groups must be created via the REST endpoint
// first, since they need a name/admins.
export async function getOrCreateRoomForMember(db, { roomId, userId, receiverId }) {
  const rooms = db.collection("rooms");
  const id = roomId.toString();
  const room = await rooms.findOne({ _id: id });

  if (room) {
    return room.members.includes(userId.toString())
      ? { room }
      : { error: "Access denied" };
  }

  if (!receiverId) return { error: "Room does not exist" };

  // Direct room ids are predictable (the pair's ids, sorted), so the id must be
  // the one for THIS pair. Otherwise anyone could create another pair's room
  // first and sit in it, locking the real pair out of their own chat.
  if (id !== directRoomId(userId, receiverId)) return { error: "Access denied" };
  const access = await directChatAccess(db, userId, receiverId);
  if (!access) {
    // Same wording as a blocked send, so this can't be used to learn who blocked whom.
    return { error: "You can't message this user" };
  }

  const newRoom = {
    _id: id,
    members: [receiverId.toString(), userId.toString()],
    type: "direct",
    // "pending" = a message request the receiver hasn't answered yet.
    status: access,
    ...(access === "pending" && { requestedBy: userId.toString() }),
    admins: [],
    name: null,
    avatar: null,
    createdBy: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await rooms.insertOne(newRoom);
  return { room: newRoom };
}

const serviceError = (message, status) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

// Blocks are stored as { blockerId, blockedId } string pairs. A block applies
// in both directions for messaging: neither side can send once either blocked.
async function isBlockedEitherWay(db, a, b) {
  const hit = await db.collection("blocks").findOne({
    $or: [
      { blockerId: a, blockedId: b },
      { blockerId: b, blockedId: a },
    ],
  });
  return Boolean(hit);
}

// Persists a message after re-checking membership (a socket can outlive its
// membership), and bumps the room's lastMessage preview. Returns the room's
// members too, so the caller can notify whoever isn't online.
// Voice notes carry `voice: { url, durationMs }` instead of text.
export const VOICE_PREVIEW = "🎤 Voice message";
export const MAX_VOICE_MS = 2 * 60 * 1000;

// Shared gate for text and voice: the sender must be in the room, and a direct
// room must not have a block either way. Returns the room or `{ error }`.
export async function getSendableRoom(db, { roomId, senderId }) {
  const rooms = db.collection("rooms");
  const room = await rooms.findOne(
    { _id: roomId.toString() },
    { projection: { members: 1, type: 1, memberSettings: 1, status: 1, requestedBy: 1 } },
  );
  if (!room || !room.members.includes(senderId.toString())) {
    return { error: "Access denied" };
  }
  if (room.type === "direct") {
    const other = room.members.find((m) => m !== senderId.toString());
    if (other && (await isBlockedEitherWay(db, senderId.toString(), other))) {
      // Same wording for both directions so a blocked user can't tell who blocked whom.
      return { error: "You can't message this user" };
    }
    if (room.status === "declined") return { error: "You can't message this user" };
    if (room.status === "pending") {
      // The requester gets exactly one message; the receiver must accept first.
      if (room.requestedBy !== senderId.toString()) {
        return { error: "Accept this message request to reply" };
      }
      // Atomic claim of the single allowed message, so two quick sends can't both pass.
      const claimed = await db
        .collection("rooms")
        .updateOne(
          { _id: roomId.toString(), status: "pending", requestSent: { $ne: true } },
          { $set: { requestSent: true } },
        );
      if (!claimed.modifiedCount) {
        return { error: "Wait for them to accept your message request" };
      }
    }
  }
  return { room };
}

// Photos and files carry `attachment: { kind: "image" | "file", url, ... }`.
export const attachmentPreview = (a) => (a.kind === "image" ? "📷 Photo" : `📎 ${a.name}`);

export async function saveMessage(db, { roomId, senderId, text = "", voice = null, attachment = null }) {
  const rooms = db.collection("rooms");
  const id = roomId.toString();

  const { error, room } = await getSendableRoom(db, { roomId, senderId });
  if (error) return { error };

  const messageDoc = {
    roomId: id,
    senderId: senderId.toString(),
    type: voice ? "voice" : attachment ? attachment.kind : "text",
    text: voice || attachment ? "" : text.trim(),
    ...(voice && { audio: { url: voice.url, durationMs: voice.durationMs } }),
    ...(attachment?.kind === "image" && {
      image: { url: attachment.url, width: attachment.width, height: attachment.height },
    }),
    ...(attachment?.kind === "file" && {
      file: { url: attachment.url, name: attachment.name, size: attachment.size },
    }),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const inserted = await db.collection("messages").insertOne(messageDoc);

  await rooms.updateOne(
    { _id: id },
    {
      $set: {
        lastMessage: {
          text: voice ? VOICE_PREVIEW : attachment ? attachmentPreview(attachment) : messageDoc.text,
          senderId: messageDoc.senderId,
          createdAt: new Date(),
        },
        updatedAt: new Date(),
      },
    },
  );

  const mutedMembers = room.members.filter(
    (m) => room.memberSettings?.[m]?.mutedAt,
  );

  return {
    members: room.members,
    mutedMembers,
    message: { _id: inserted.insertedId, ...messageDoc },
  };
}

// Quick-reaction set (Telegram/Instagram style). Anything else is rejected so
// clients can't stuff arbitrary strings into a message document.
export const ALLOWED_REACTIONS = ["👍", "❤️", "😂", "😮", "😢", "🙏", "🔥", "🎉"];

// One reaction per user per message, stored as reactions: { [userId]: emoji }.
// `emoji: null` removes the caller's reaction. The membership check re-runs on
// every call, and the message must belong to the room, so a member of room A
// can't react to a message in room B by guessing its id.
export async function setMessageReaction(db, { roomId, messageId, userId, emoji }) {
  if (emoji !== null && !ALLOWED_REACTIONS.includes(emoji)) {
    return { error: "Unsupported reaction" };
  }
  if (!ObjectId.isValid(messageId)) return { error: "Message not found" };

  const room = await db
    .collection("rooms")
    .findOne({ _id: roomId.toString() }, { projection: { members: 1 } });
  if (!room || !room.members.includes(userId.toString())) {
    return { error: "Access denied" };
  }

  const field = `reactions.${userId}`;
  const result = await db.collection("messages").updateOne(
    { _id: new ObjectId(messageId), roomId: roomId.toString() },
    emoji === null ? { $unset: { [field]: "" } } : { $set: { [field]: emoji } },
  );
  if (result.matchedCount === 0) return { error: "Message not found" };
  return { messageId: String(messageId), userId: userId.toString(), emoji };
}

// Latest `limit` messages, returned oldest-first for display. `after` is the
// viewer's "clear chat" time — older messages stay in the DB (the other member
// still sees them) but are hidden from this viewer.
export async function loadMessages(db, roomId, limit = 50, after = null) {
  const filter = { roomId: roomId.toString() };
  if (after) filter.createdAt = { $gt: new Date(after) };
  const messages = await db
    .collection("messages")
    .find(filter)
    .sort({ createdAt: -1, _id: -1 })
    .limit(limit)
    .toArray();
  return messages.reverse();
}

// Rooms for the sidebar list. memberSettings holds every member's mute/clear
// state, so it's reduced to the caller's own `mySettings` before leaving the
// server, and a preview older than the caller's clear time is hidden.
export async function loadRoomsForUser(db, userId) {
  const uid = userId.toString();
  const rooms = await db
    .collection("rooms")
    .find({ members: uid })
    .project({ ...ROOM_LIST_PROJECTION, memberSettings: 1 })
    .toArray();

  return rooms.map(({ memberSettings, ...room }) => {
    const mine = memberSettings?.[uid] ?? {};
    const cleared =
      mine.clearedAt &&
      room.lastMessage &&
      new Date(room.lastMessage.createdAt) <= new Date(mine.clearedAt);
    return {
      ...room,
      lastMessage: cleared ? null : room.lastMessage,
      mySettings: { muted: Boolean(mine.mutedAt) },
    };
  });
}

async function getMemberRoomOrThrow(db, roomId, userId) {
  const room = await db
    .collection("rooms")
    .findOne({ _id: roomId.toString() }, { projection: { members: 1 } });
  if (!room || !room.members.includes(userId.toString())) {
    throw serviceError("Room not found", 404);
  }
  return room;
}

export async function setRoomMuted(db, { roomId, userId, muted }) {
  await getMemberRoomOrThrow(db, roomId, userId);
  await db.collection("rooms").updateOne(
    { _id: roomId.toString() },
    { $set: { [`memberSettings.${userId}.mutedAt`]: muted ? new Date() : null } },
  );
  return { muted: Boolean(muted) };
}

export async function clearRoomForUser(db, { roomId, userId }) {
  await getMemberRoomOrThrow(db, roomId, userId);
  const clearedAt = new Date();
  await db.collection("rooms").updateOne(
    { _id: roomId.toString() },
    { $set: { [`memberSettings.${userId}.clearedAt`]: clearedAt } },
  );
  return { clearedAt };
}

export async function listBlockedIds(db, userId) {
  const rows = await db
    .collection("blocks")
    .find({ blockerId: userId.toString() })
    .project({ blockedId: 1 })
    .toArray();
  return rows.map((r) => r.blockedId);
}

// Blocked people with enough profile info to render a "Blocked users" list,
// newest block first. Users who no longer exist are dropped (account deletion
// also removes their block rows, so this is just a safety net).
export async function listBlockedUsers(db, userId) {
  const blocks = await db
    .collection("blocks")
    .find({ blockerId: userId.toString() })
    .sort({ createdAt: -1 })
    .toArray();
  const objectIds = blocks
    .map((b) => b.blockedId)
    .filter((id) => ObjectId.isValid(id))
    .map((id) => new ObjectId(id));
  if (objectIds.length === 0) return [];

  const [users, stats] = await Promise.all([
    db
      .collection("users")
      .find({ _id: { $in: objectIds } })
      .project({ firstName: 1, lastName: 1, username: 1 })
      .toArray(),
    db
      .collection("usersStats")
      .find({ userId: { $in: objectIds } })
      .project({ userId: 1, profileImage: 1 })
      .toArray(),
  ]);
  const userById = new Map(users.map((u) => [u._id.toString(), u]));
  const imageById = new Map(stats.map((s) => [s.userId.toString(), s.profileImage ?? null]));

  return blocks.flatMap((b) => {
    const user = userById.get(b.blockedId);
    if (!user) return [];
    return [
      {
        _id: b.blockedId,
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        username: user.username ?? "",
        profileImage: imageById.get(b.blockedId) ?? null,
        blockedAt: b.createdAt ?? null,
      },
    ];
  });
}

export async function blockUser(db, { blockerId, blockedId }) {
  if (blockerId.toString() === blockedId.toString()) {
    throw serviceError("You can't block yourself", 400);
  }
  // Upsert so repeating the request is harmless (PUT is idempotent).
  await db.collection("blocks").updateOne(
    { blockerId: blockerId.toString(), blockedId: blockedId.toString() },
    { $setOnInsert: { createdAt: new Date() } },
    { upsert: true },
  );
}

export async function unblockUser(db, { blockerId, blockedId }) {
  await db.collection("blocks").deleteOne({
    blockerId: blockerId.toString(),
    blockedId: blockedId.toString(),
  });
}

// Message requests, split by state. Incoming = waiting for my answer; outgoing
// = ones I sent that are pending or declined; accepted = requests that became
// real conversations (these people are not mutual followers, so the chat list
// can't find them any other way). A room the requester opened but never sent
// anything in is not a request yet. Each item carries the other person's
// profile info so the UI can render it without extra calls.
export async function listChatRequests(db, userId) {
  const uid = userId.toString();
  const rooms = await db
    .collection("rooms")
    .find({
      type: "direct",
      members: uid,
      $or: [
        { status: "declined" },
        { status: "pending", requestSent: true },
        { status: "active", requestedBy: { $exists: true } },
      ],
    })
    .project({ members: 1, status: 1, requestedBy: 1, lastMessage: 1, updatedAt: 1 })
    .sort({ updatedAt: -1 })
    .toArray();

  const otherIds = rooms.map((r) => r.members.find((m) => m !== uid)).filter(ObjectId.isValid);
  const objectIds = otherIds.map((id) => new ObjectId(id));
  const [users, stats] = objectIds.length
    ? await Promise.all([
        db
          .collection("users")
          .find({ _id: { $in: objectIds } })
          .project({ firstName: 1, lastName: 1, username: 1 })
          .toArray(),
        db
          .collection("usersStats")
          .find({ userId: { $in: objectIds } })
          .project({ userId: 1, profileImage: 1 })
          .toArray(),
      ])
    : [[], []];
  const userById = new Map(users.map((u) => [u._id.toString(), u]));
  const imageById = new Map(stats.map((s) => [s.userId.toString(), s.profileImage ?? null]));

  const incoming = [];
  const outgoing = [];
  const accepted = [];
  for (const room of rooms) {
    const otherId = room.members.find((m) => m !== uid);
    const user = userById.get(otherId);
    if (!user) continue;
    const item = {
      roomId: room._id,
      status: room.status,
      preview: room.lastMessage?.text ?? "",
      updatedAt: room.updatedAt ?? null,
      user: {
        _id: otherId,
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        username: user.username ?? "",
        stats: { profileImage: imageById.get(otherId) ?? null },
      },
    };
    if (room.status === "active") accepted.push(item);
    else if (room.requestedBy === uid) outgoing.push(item);
    else if (room.status === "pending") incoming.push(item);
  }
  return { incoming, outgoing, accepted };
}

// Only the receiver of a pending request can answer it. Accepting opens the
// conversation for both sides; declining closes it for good (the requester can't
// re-send, which also stops repeat requests).
async function answerRequest(db, { roomId, userId, status }) {
  const result = await db.collection("rooms").updateOne(
    {
      _id: roomId.toString(),
      type: "direct",
      status: "pending",
      members: userId.toString(),
      requestedBy: { $ne: userId.toString() },
    },
    { $set: { status, updatedAt: new Date() } },
  );
  if (!result.matchedCount) throw serviceError("Request not found", 404);
  return { roomId: roomId.toString(), status };
}

export const acceptChatRequest = (db, args) => answerRequest(db, { ...args, status: "active" });
export const declineChatRequest = (db, args) => answerRequest(db, { ...args, status: "declined" });
