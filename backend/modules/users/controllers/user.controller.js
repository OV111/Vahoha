import {
  getUserProfileService,
  followUserService,
  unfollowUserService,
} from "../services/userService.js";
import { makeErrorHandler } from "../../../utils/respond.js";

const sendError = makeErrorHandler("users");

export const getUserProfile = async (req, res) => {
  const userName = decodeURIComponent(req.params.username).trim();
  if (!userName)
    return res.status(400).json({ message: "Username is required", code: 400 });

  const currentUserId = req.user._id;

  try {
    const db = req.app.locals.db;
    const result = await getUserProfileService(db, userName, currentUserId);
    res.status(200).json(result);
  } catch (err) {
    if (err.redirect) err.extra = { redirect: err.redirect };
    sendError(err, req, res);
  }
};

export const followUser = async (req, res) => {
  const userName = decodeURIComponent(req.params.username).trim();
  const currentUserId = req.user._id;

  try {
    const db = req.app.locals.db;
    await followUserService(db, userName, currentUserId);
    res.status(200).json({ message: "Successfully followed user", code: 200 });
  } catch (err) {
    sendError(err, req, res);
  }
};

export const unfollowUser = async (req, res) => {
  const userName = decodeURIComponent(req.params.username).trim();
  const currentUserId = req.user._id;

  try {
    const db = req.app.locals.db;
    await unfollowUserService(db, userName, currentUserId);
    res.status(200).json({ message: "Successfully unfollowed user", code: 200 });
  } catch (err) {
    sendError(err, req, res);
  }
};
