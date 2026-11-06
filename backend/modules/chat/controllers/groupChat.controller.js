import { notifyUsers } from "../../../websocket/connectionRegistry.js";
import {
  createGroupService,
  addGroupMemberService,
  removeGroupMemberService,
  leaveGroupService,
  setGroupAdminService,
  updateGroupService,
  getGroupDetailsService,
} from "../services/groupChatService.js";
import { makeErrorHandler } from "../../../utils/respond.js";

const sendError = makeErrorHandler("chat");

const handleServiceError = (res, err) => sendError(err, null, res);

export const createGroup = async (req, res) => {
  try {
    const { name, memberIds } = req.body;
    const room = await createGroupService(req.app.locals.db, {
      creatorId: req.user.id,
      name,
      memberIds: Array.isArray(memberIds) ? memberIds : [],
    });

    notifyUsers(room.members, { type: "group_created", room });
    res.status(201).json({ room });
  } catch (err) {
    handleServiceError(res, err);
  }
};

export const addGroupMember = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { memberId } = req.body;
    if (!memberId) return res.status(400).json({ message: "memberId is required" });

    const room = await addGroupMemberService(req.app.locals.db, {
      roomId,
      actorId: req.user.id,
      memberId,
    });

    notifyUsers(room.members, { type: "group_updated", room });
    res.status(200).json({ room });
  } catch (err) {
    handleServiceError(res, err);
  }
};

export const removeGroupMember = async (req, res) => {
  try {
    const { roomId, memberId } = req.params;
    const room = await removeGroupMemberService(req.app.locals.db, {
      roomId,
      actorId: req.user.id,
      memberId,
    });

    notifyUsers([...room.members, memberId], { type: "group_updated", room });
    res.status(200).json({ room });
  } catch (err) {
    handleServiceError(res, err);
  }
};

export const leaveGroup = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await leaveGroupService(req.app.locals.db, {
      roomId,
      userId: req.user.id,
    });

    notifyUsers([...room.members, req.user.id], { type: "group_updated", room });
    res.status(200).json({ room });
  } catch (err) {
    handleServiceError(res, err);
  }
};

export const setGroupAdmin = async (req, res) => {
  try {
    const { roomId, memberId } = req.params;
    const room = await setGroupAdminService(req.app.locals.db, {
      roomId,
      actorId: req.user.id,
      memberId,
      promote: Boolean(req.body?.promote),
    });

    notifyUsers(room.members, { type: "group_updated", room });
    res.status(200).json({ room });
  } catch (err) {
    handleServiceError(res, err);
  }
};

export const updateGroup = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { name, avatar } = req.body;
    const room = await updateGroupService(req.app.locals.db, {
      roomId,
      actorId: req.user.id,
      name,
      avatar,
    });

    notifyUsers(room.members, { type: "group_updated", room });
    res.status(200).json({ room });
  } catch (err) {
    handleServiceError(res, err);
  }
};

export const getGroupDetails = async (req, res) => {
  try {
    const { roomId } = req.params;
    const group = await getGroupDetailsService(req.app.locals.db, roomId, req.user.id);
    res.status(200).json({ group });
  } catch (err) {
    handleServiceError(res, err);
  }
};
