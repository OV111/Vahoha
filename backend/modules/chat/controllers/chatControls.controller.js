import { ObjectId } from "mongodb";
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
import { makeErrorHandler } from "../../../utils/respond.js";

const sendError = makeErrorHandler("chat");

// Per-user chat controls: mute, clear-for-me and block. Services throw errors
// carrying a `.status`; this just maps them to HTTP.
const handleServiceError = (res, err) => sendError(err, null, res);

export const muteRoom = async (req, res) => {
  try {
    const { muted } = req.body;
    if (typeof muted !== "boolean") {
      return res.status(400).json({ message: "muted must be a boolean" });
    }
    const result = await setRoomMuted(req.app.locals.db, {
      roomId: req.params.roomId,
      userId: req.user.id,
      muted,
    });
    res.status(200).json(result);
  } catch (err) {
    handleServiceError(res, err);
  }
};

export const clearRoom = async (req, res) => {
  try {
    const result = await clearRoomForUser(req.app.locals.db, {
      roomId: req.params.roomId,
      userId: req.user.id,
    });
    res.status(200).json(result);
  } catch (err) {
    handleServiceError(res, err);
  }
};

export const getBlockedUsers = async (req, res) => {
  try {
    const blockedIds = await listBlockedIds(req.app.locals.db, req.user.id);
    res.status(200).json({ blockedIds });
  } catch (err) {
    handleServiceError(res, err);
  }
};

export const getBlockedUserList = async (req, res) => {
  try {
    const users = await listBlockedUsers(req.app.locals.db, req.user.id);
    res.status(200).json({ users });
  } catch (err) {
    handleServiceError(res, err);
  }
};

export const blockChatUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    await blockUser(req.app.locals.db, { blockerId: req.user.id, blockedId: userId });
    res.status(200).json({ blocked: true });
  } catch (err) {
    handleServiceError(res, err);
  }
};

export const unblockChatUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    await unblockUser(req.app.locals.db, { blockerId: req.user.id, blockedId: userId });
    res.status(200).json({ blocked: false });
  } catch (err) {
    handleServiceError(res, err);
  }
};

// Message requests: a stranger's first message waits here until the receiver
// answers. The rules (who may ask, one message only) live in chatService.
export const getChatRequests = async (req, res) => {
  try {
    res.status(200).json(await listChatRequests(req.app.locals.db, req.user.id));
  } catch (err) {
    handleServiceError(res, err);
  }
};

const answer = (service) => async (req, res) => {
  try {
    const result = await service(req.app.locals.db, {
      roomId: req.params.roomId,
      userId: req.user.id,
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
    const policy = await getMessagePolicy(req.app.locals.db, req.user.id);
    res.status(200).json({ policy });
  } catch (err) {
    handleServiceError(res, err);
  }
};

export const setMyMessagePolicy = async (req, res) => {
  try {
    const parsed = messagePolicySchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "policy must be everyone, followers or nobody" });
    }
    const result = await setMessagePolicy(req.app.locals.db, {
      userId: req.user.id,
      policy: parsed.data.policy,
    });
    res.status(200).json(result);
  } catch (err) {
    handleServiceError(res, err);
  }
};
