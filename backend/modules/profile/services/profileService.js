import { ObjectId } from "mongodb";
import { Buffer } from "node:buffer";
import { v2 as cloudinary } from "cloudinary";
import {
  getFollowersData,
  getFollowingData,
} from "../../users/index.js";
import { sanitizeUsername } from "../../../utils/username.js";
import { sniffFileKind, SNIFF_BYTES } from "../../../utils/fileSignature.js";

export const PROFILE_LINK_FIELDS = [
  "githubLink",
  "linkedinLink",
  "twitterLink",
  "mediumLink",
];

// Profile links are rendered as <a href>, so an unchecked value like
// `javascript:alert(1)` would run when someone clicks it. Only http(s) URLs
// are stored; an empty string clears the link.
export const sanitizeProfileLink = (value, field = "link") => {
  const trimmed = String(value ?? "").trim();
  if (trimmed === "") return "";
  let url;
  try {
    url = new URL(trimmed);
  } catch {
    throw { status: 400, message: `${field} must be a valid URL.` };
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw { status: 400, message: `${field} must start with http:// or https://.` };
  }
  return url.toString();
};

export const getProfileService = async (db, userId) => {
  const users = db.collection("users");
  const usersStats = db.collection("usersStats");

  const [user, passwordCount, stats, postsCount] = await Promise.all([
    // Projected out in the query, so the hash never leaves the database.
    // (Destructuring it away after the read is easy to get wrong: renaming the
    // variable to `_password` silently removed a field that doesn't exist.)
    users.findOne({ _id: userId }, { projection: { password: 0 } }),
    // Only a yes/no leaves the database. The settings page needs it to pick
    // between the password form and the type-DELETE form for OAuth accounts.
    users.countDocuments({ _id: userId, password: { $type: "string" } }, { limit: 1 }),
    usersStats.findOne({ userId }),
    // Counted from the blogs themselves: the stored usersStats.postsCount was
    // never updated when a blog was published, so it always read 0.
    db.collection("blogs").countDocuments({ author: userId, status: "published" }),
  ]);

  if (!user) throw { status: 404, message: "User Not Found!" };

  await usersStats.updateOne(
    { userId },
    { $set: { lastActive: new Date() } },
  );

  return {
    userWithoutPassword: { ...user, hasPassword: passwordCount > 0 },
    stats: stats && { ...stats, postsCount },
  };
};

export const updateLastActiveService = async (db, id, lastActive) => {
  const usersStats = db.collection("usersStats");
  return usersStats.findOneAndUpdate(
    { userId: new ObjectId(id) },
    { $set: { lastActive } },
  );
};

export const updateSettingsService = async (db, userId, fields, files) => {
  const users = db.collection("users");
  const usersStats = db.collection("usersStats");
  const usernameHistory = db.collection("usernameHistory");

  const userUpdate = {};
  if (fields.fname !== undefined) userUpdate.firstName = fields.fname;
  if (fields.lname !== undefined) userUpdate.lastName = fields.lname;

  let previousUsername = null;
  if (fields.username !== undefined) {
    const clean = sanitizeUsername(fields.username);
    if (clean.length < 3) {
      throw {
        status: 400,
        message: "Username must be at least 3 characters (letters and numbers only).",
      };
    }
    const existing = await users.findOne({
      username: clean,
      _id: { $ne: userId },
    });
    if (existing) {
      throw { status: 409, message: "That username is already taken." };
    }

    const currentUser = await users.findOne({ _id: userId }, { projection: { username: 1 } });
    if (currentUser?.username && currentUser.username !== clean) {
      previousUsername = currentUser.username;
    }

    userUpdate.username = clean;
  }

  const statsUpdate = { lastActive: new Date() };
  if (fields.bio !== undefined) statsUpdate.bio = fields.bio;
  if (fields.postsCount !== undefined) statsUpdate.postsCount = Number(fields.postsCount);
  for (const key of PROFILE_LINK_FIELDS) {
    if (fields[key] !== undefined) statsUpdate[key] = sanitizeProfileLink(fields[key], key);
  }
  if (fields.location !== undefined) statsUpdate.location = fields.location;
  if (fields.timezone !== undefined) statsUpdate.timezone = fields.timezone;
  if (files.profileImage) statsUpdate.profileImage = files.profileImage;
  if (files.bannerImage) statsUpdate.bannerImage = files.bannerImage;
  if (files.cvFile) statsUpdate.cvUrl = files.cvFile;

  let updatedUser;
  if (Object.keys(userUpdate).length > 0) {
    const result = await users.findOneAndUpdate(
      { _id: userId },
      { $set: userUpdate },
      { returnDocument: "after" },
    );
    updatedUser = result.value || result;

    if (userUpdate.username) {
      // A reclaimed old handle should point at whoever holds it now, not a stale owner.
      await usernameHistory.deleteOne({ oldUsername: userUpdate.username });
    }
    if (previousUsername) {
      await usernameHistory.updateOne(
        { oldUsername: previousUsername },
        { $set: { oldUsername: previousUsername, userId, changedAt: new Date() } },
        { upsert: true },
      );
    }
  } else {
    updatedUser = await users.findOne({ _id: userId });
  }

  const statsResult = await usersStats.findOneAndUpdate(
    { userId },
    { $set: statsUpdate },
    { returnDocument: "after", upsert: true },
  );

  return { user: updatedUser, stats: statsResult.value || statsResult };
};

// A Cloudinary delivery URL carries what destroy() needs:
// .../<resource_type>/upload/v123/<public_id>[.ext]. Raw files keep the
// extension in their public_id; images and videos don't.
export const cloudinaryIdFromUrl = (url) => {
  const match = /\/(image|raw|video)\/upload\/(?:v\d+\/)?(.+)$/.exec(url ?? "");
  if (!match) return null;
  const [, resourceType, path] = match;
  return { resourceType, publicId: resourceType === "raw" ? path : path.replace(/\.[^./]+$/, "") };
};

// Clears the CV link, then deletes the file. The delete is best-effort: if
// Cloudinary fails, the CV is still gone from the profile (only an unlisted file is left).
export const removeCvService = async (db, userId) => {
  const stats = await db
    .collection("usersStats")
    .findOneAndUpdate({ userId }, { $unset: { cvUrl: "" } }, { projection: { cvUrl: 1 } });
  const id = cloudinaryIdFromUrl((stats?.value ?? stats)?.cvUrl);
  if (!id) return;
  try {
    await cloudinary.uploader.destroy(id.publicId, { resource_type: id.resourceType });
  } catch (err) {
    console.error("cv delete from Cloudinary failed:", err.message);
  }
};

export const checkUsernameAvailableService = async (db, userId, rawUsername) => {
  const users = db.collection("users");
  const clean = sanitizeUsername(rawUsername);

  if (clean.length < 3) {
    return { available: false, username: clean, reason: "too_short" };
  }

  const existing = await users.findOne({
    username: clean,
    _id: { $ne: userId },
  });

  return { available: !existing, username: clean };
};

// What each profile upload field may hold, and how Cloudinary stores it.
// Images are forced to resource_type "image" (Cloudinary decodes them, so a
// fake image fails there too). The CV stays "auto" so PDF and Word both work:
// safe only because its bytes were checked to be a PDF/Word file first.
export const UPLOAD_KINDS = { profileImage: "image", bannerImage: "image", cvFile: "document" };

const CLOUDINARY_OPTIONS = {
  image: { folder: "devs_website", resource_type: "image", allowed_formats: ["jpg", "png", "gif", "webp"] },
  document: { folder: "devs_website", resource_type: "auto" },
  // Cloudinary stores audio under resource_type "video".
  audio: { folder: "devs_website/voice", resource_type: "video" },
};

// Chat attachments: the kind is decided by the sniffed bytes, not requested.
// Documents are stored "raw" so Cloudinary serves the original file as-is.
const ATTACHMENT_OPTIONS = {
  image: { folder: "devs_website/chat", resource_type: "image", allowed_formats: ["jpg", "png", "gif", "webp"] },
  document: { folder: "devs_website/chat", resource_type: "raw" },
};

const WRONG_TYPE_MESSAGE = {
  image: "Images must be JPEG, PNG, GIF or WebP.",
  document: "Your CV must be a PDF or Word file.",
  audio: "That doesn't look like an audio recording.",
  attachment: "Only photos (JPEG, PNG, GIF, WebP) and PDF or Word files can be sent.",
};

// Reads the first bytes, checks them, and only then opens the Cloudinary
// stream, so a refused file never reaches Cloudinary at all.
// kind "attachment" accepts a photo or a document; what it turned out to be
// (and the photo's size) is written onto `meta` for the caller.
export const uploadToCloudinary = (file, kind, uploader = cloudinary.uploader, meta = {}) =>
  new Promise((resolve, reject) => {
    let head = Buffer.alloc(0);

    const start = (ended) => {
      file.off("data", onData);
      file.off("end", onEnd);
      const sniffed = sniffFileKind(head);
      const isAttachment = kind === "attachment";
      const accepted = isAttachment ? sniffed === "image" || sniffed === "document" : sniffed === kind;
      if (!accepted) {
        file.resume(); // drain the rest so the multipart parser can finish
        const err = new Error(WRONG_TYPE_MESSAGE[kind]);
        err.status = 400;
        return reject(err);
      }
      const options = isAttachment ? ATTACHMENT_OPTIONS[sniffed] : CLOUDINARY_OPTIONS[kind];
      meta.kind = sniffed === "document" ? "file" : sniffed;
      const stream = uploader.upload_stream(options, (error, result) => {
        if (error) return reject(error);
        meta.width = result.width;
        meta.height = result.height;
        resolve(result.secure_url);
      });
      if (ended) return stream.end(head);
      stream.write(head);
      file.pipe(stream);
    };
    const onData = (chunk) => {
      head = Buffer.concat([head, chunk]);
      if (head.length >= SNIFF_BYTES) start(false);
    };
    const onEnd = () => start(true);

    file.on("data", onData);
    file.on("end", onEnd);
  });

export const getFollowingService = (db, userId, page, limit) =>
  getFollowingData({ userId, db, page, limit });

export const getFollowersService = (db, userId, page, limit) =>
  getFollowersData({ userId, db, page, limit });

export const getMutualFollowersService = async (db, userId) => {
  const users = db.collection("users");
  const follows = db.collection("follows");

  const [followingDocs, followersDocs] = await Promise.all([
    follows.find({ followerId: userId }).toArray(),
    follows.find({ followingId: userId }).toArray(),
  ]);

  const followingIds = followingDocs.map((doc) => doc.followingId);
  const followersSet = new Set(
    followersDocs.map((doc) => doc.followerId.toString()),
  );
  const mutualFollowerIds = followingIds.filter((id) =>
    followersSet.has(id.toString()),
  );

  return users
    .aggregate([
      { $match: { _id: { $in: mutualFollowerIds } } },
      {
        $lookup: {
          from: "usersStats",
          localField: "_id",
          foreignField: "userId",
          as: "stats",
        },
      },
      { $unwind: { path: "$stats", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          username: 1,
          email: 1,
          stats: 1,
        },
      },
    ])
    .toArray();
};

export const getChatReceiverStatsService = async (db, receiverId) => {
  const usersStats = db.collection("usersStats");
  return usersStats.findOne({ userId: new ObjectId(receiverId) });
};
