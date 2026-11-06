import { ObjectId } from "mongodb";
import busboy from "busboy";
import {
  getProfileService,
  updateLastActiveService,
  updateSettingsService,
  removeCvService,
  checkUsernameAvailableService,
  uploadToCloudinary,
  UPLOAD_KINDS,
  getFollowingService,
  getFollowersService,
  getMutualFollowersService,
  getChatReceiverStatsService,
} from "../services/profileService.js";
import {
  getNotifications as getNotificationsService,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} from "../../notifications/index.js";
import { makeErrorHandler } from "../../../utils/respond.js";

const sendError = makeErrorHandler("profile");

export const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const result = await getProfileService(req.app.locals.db, userId);
    res.status(200).json(result);
  } catch (err) {
    sendError(err, req, res);
  }
};

export const updateLastActive = async (req, res) => {
  try {
    const userId = req.user._id;
    await updateLastActiveService(req.app.locals.db, userId, new Date());
    res.status(200).json({ message: "Updated" });
  } catch (err) {
    sendError(err, req, res);
  }
};

export const checkUsernameAvailable = async (req, res) => {
  try {
    const username = req.query.username?.toString() || "";
    const userId = req.user._id;
    const result = await checkUsernameAvailableService(
      req.app.locals.db,
      userId,
      username,
    );
    res.status(200).json(result);
  } catch (err) {
    sendError(err, req, res);
  }
};

export const removeCv = async (req, res) => {
  try {
    await removeCvService(req.app.locals.db, req.user._id);
    res.status(200).json({ message: "CV removed" });
  } catch {
    res.status(500).json({ message: "Couldn't remove the CV" });
  }
};


export const updateSettings = (req, res) => {
  const bb = busboy({ headers: req.headers, limits: { fileSize: 10 * 1024 * 1024 } });
  const fields = {};
  const fileUploads = {};
  let fileTooLarge = false;

  bb.on("file", (fieldname, file) => {
    // Only known fields are uploaded; anything else is drained and dropped.
    const kind = UPLOAD_KINDS[fieldname];
    if (!kind) return file.resume();
    file.on("limit", () => {
      fileTooLarge = true;
      res.status(400).json({ message: "File too large. Maximum size is 10 MB." });
      file.resume();
    });
    const upload = uploadToCloudinary(file, kind);
    // Not every upload gets awaited below (an early return, or an earlier one
    // failing first); without this, its rejection would crash the process.
    upload.catch(() => {});
    fileUploads[fieldname] = upload;
  });

  bb.on("field", (fieldname, val) => {
    fields[fieldname] = val;
  });

  bb.on("finish", async () => {
    if (fileTooLarge) return;
    try {
      const resolved = {};
      for (const [key, promise] of Object.entries(fileUploads)) {
        resolved[key] = await promise;
      }

      const userId = req.user._id;
      const result = await updateSettingsService(req.app.locals.db, userId, fields, resolved);
      res.status(200).json({ message: "Changes Saved", ...result });
    } catch (err) {
      sendError(err, req, res);
    }
  });

  req.pipe(bb);
};

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const results = await getNotificationsService(req.app.locals.db, userId);
    res.status(200).json(results);
  } catch (err) {
    sendError(err, req, res);
  }
};

// Notification writes: authenticate, run the owner-scoped service call,
// 404 when nothing of theirs matched.
const notificationAction = (run) => async (req, res) => {
  try {
    const ok = await run(req.app.locals.db, req.user._id, req.params.id);
    if (ok === false) return res.status(404).json({ message: "Notification not found" });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("notification action failed:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const readNotification = notificationAction(markNotificationRead);
export const readAllNotifications = notificationAction((db, userId) =>
  markAllNotificationsRead(db, userId),
);
export const removeNotification = notificationAction(deleteNotification);

export const getFollowing = async (req, res) => {
  try {
    const data = await getFollowingService(
      req.app.locals.db,
      req.user._id,
      Number(req.query.page) || 1,
      Number(req.query.limit) || 25,
    );
    res.status(200).json(data);
  } catch (err) {
    sendError(err, req, res);
  }
};

export const getFollowers = async (req, res) => {
  try {
    const data = await getFollowersService(
      req.app.locals.db,
      req.user._id,
      Number(req.query.page) || 1,
      Number(req.query.limit) || 25,
    );
    res.status(200).json(data);
  } catch (err) {
    sendError(err, req, res);
  }
};

export const getMutualFollowers = async (req, res) => {
  try {
    const mutualFollowers = await getMutualFollowersService(req.app.locals.db, req.user._id);
    res.status(200).json({ mutualFollowers });
  } catch (err) {
    sendError(err, req, res);
  }
};

export const getChatReceiverStats = async (req, res) => {
  try {
    const { receiverId } = req.params;
    if (!ObjectId.isValid(receiverId))
      return res.status(400).json({ message: "Bad Request, invalid receiver id" });

    const stats = await getChatReceiverStatsService(req.app.locals.db, receiverId);
    res.status(200).json({ message: "Success", code: 200, stats });
  } catch (err) {
    sendError(err, req, res);
  }
};
