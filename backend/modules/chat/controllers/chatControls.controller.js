import { ObjectId } from "mongodb";
import { getAuthToken } from "../../users/index.js";
import {
  setRoomMuted,
  clearRoomForUser,
  listBlockedIds,
  listBlockedUsers,
  blockUser,
  unblockUser,
  listChatRequests,
  acceptChatRequest,
  declineChatRequest,
  getMessagePolicy,
  setMessagePolicy,
} from "../services/chatService.js";
import { messagePolicySchema } from "../schemas/chat.schemas.js";

// Per-user chat controls: mute, clear-for-me and block. Services throw errors
// carrying a `.status`; this just maps them to HTTP.
const handleServiceError = (res, err) => {
  res.status(err.status ?? 500).json({ message: err.message || "Server Error" });
};

const authenticate = (req, res) => {
  const auth = getAuthToken(req.headers.authorization);
  if (!auth.ok) {
    res.status(auth.status).json({ message: auth.message });
    return null;
  }
  return auth;
};

export const muteRoom = async (req, res) => {
  try {
    const auth = authenticate(req, res);
    if (!auth) return;
    const { muted } = req.body;
    if (typeof muted !== "boolean") {
      return res.status(400).json({ message: "muted must be a boolean" });
    }
    const result = await setRoomMuted(req.app.locals.db, {
      roomId: req.params.roomId,
      userId: auth.userId,
      muted,
    });
    res.status(200).json(result);
  } catch (err) {
    handleServiceError(res, err);
  }
};

export const clearRoom = async (req, res) => {
  try {
    const auth = authenticate(req, res);
    if (!auth) return;
    const result = await clearRoomForUser(req.app.locals.db, {
      roomId: req.params.roomId,
      userId: auth.userId,
    });
    res.status(200).json(result);
  } catch (err) {
    handleServiceError(res, err);
  }
};

export const getBlockedUsers = async (req, res) => {
  try {
    const auth = authenticate(req, res);
    if (!auth) return;
    const blockedIds = await listBlockedIds(req.app.locals.db, auth.userId);
    res.status(200).json({ blockedIds });
  } catch (err) {
    handleServiceError(res, err);
  }
};

export const getBlockedUserList = async (req, res) => {
  try {
    const auth = authenticate(req, res);
    if (!auth) return;
    const users = await listBlockedUsers(req.app.locals.db, auth.userId);
    res.status(200).json({ users });
  } catch (err) {
    handleServiceError(res, err);
  }
};

export const blockChatUser = async (req, res) => {
  try {
    const auth = authenticate(req, res);
    if (!auth) return;
    const { userId } = req.params;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    await blockUser(req.app.locals.db, { blockerId: auth.userId, blockedId: userId });
    res.status(200).json({ blocked: true });
  } catch (err) {
    handleServiceError(res, err);
  }
};

export const unblockChatUser = async (req, res) => {
  try {
    const auth = authenticate(req, res);
    if (!auth) return;
    const { userId } = req.params;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    await unblockUser(req.app.locals.db, { blockerId: auth.userId, blockedId: userId });
    res.status(200).json({ blocked: false });
  } catch (err) {
    handleServiceError(res, err);
  }
};

// Message requests: a stranger's first message waits here until the receiver
// answers. The rules (who may ask, one message only) live in chatService.
export const getChatRequests = async (req, res) => {
  try {
    const auth = authenticate(req, res);
    if (!auth) return;
    res.status(200).json(await listChatRequests(req.app.locals.db, auth.userId));
  } catch (err) {
    handleServiceError(res, err);
  }
};

const answer = (service) => async (req, res) => {
  try {
    const auth = authenticate(req, res);
    if (!auth) return;
    const result = await service(req.app.locals.db, {
      roomId: req.params.roomId,
      userId: auth.userId,
    });
    res.status(200).json(result);
  } catch (err) {
    handleServiceError(res, err);
  }
};

export const acceptRequest = answer(acceptChatRequest);
export const declineRequest = answer(declineChatRequest);

export const getMyMessagePolicy = async (req, res) => {
  try {
    const auth = authenticate(req, res);
    if (!auth) return;
    const policy = await getMessagePolicy(req.app.locals.db, auth.userId);
    res.status(200).json({ policy });
  } catch (err) {
    handleServiceError(res, err);
  }
};

export const setMyMessagePolicy = async (req, res) => {
  try {
    const auth = authenticate(req, res);
    if (!auth) return;
    const parsed = messagePolicySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "policy must be everyone, followers or nobody" });
    }
    const result = await setMessagePolicy(req.app.locals.db, {
      userId: auth.userId,
      policy: parsed.data.policy,
    });
    res.status(200).json(result);
  } catch (err) {
    handleServiceError(res, err);
  }
};
