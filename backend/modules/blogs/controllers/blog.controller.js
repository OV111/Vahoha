import Busboy from "busboy";
import { ObjectId } from "mongodb";
import { uploadImage } from "../../../utils/uploadImage.js";
import { makeErrorHandler } from "../../../utils/respond.js";

const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
]);
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
import {
  createBlogService,
  getBlogsService,
  getBlogBySlugService,
  getBlogByIdService,
  getUserBlogsService,
  toggleLikeService,
  toggleFavouriteService,
  getFavouritesService,
  getSavedIdsService,
  getLikedIdsService,
  updateBlogService,
  getUserAllBlogsService,
  deleteBlogService,
} from "../services/blogService.js";

// Errors with a status (utils/httpErrors.js) go to the user as-is; anything
// else is logged and answered with a generic 500.
const sendError = makeErrorHandler("blogs");

export const createBlog = async (req, res) => {
  const busboy = Busboy({ headers: req.headers, limits: { fileSize: MAX_IMAGE_SIZE } });

  let body = {};
  let fileUploadPromise = null;
  let fileTooLarge = false;
  let invalidMime = false;

  busboy.on("field", (name, value) => {
    body[name] = value;
  });

  busboy.on("file", (name, file, info) => {
    const { filename, mimeType } = info;
    if (!filename) {
      file.resume();
      return;
    }
    if (!ALLOWED_IMAGE_MIME_TYPES.has(mimeType)) {
      invalidMime = true;
      file.resume();
      return;
    }
    file.on("limit", () => {
      fileTooLarge = true;
      file.resume();
    });
    fileUploadPromise = uploadImage(file, "blogs");
  });

  busboy.on("finish", async () => {
    if (invalidMime)
      return res.status(400).json({ success: false, message: "Invalid file type. Allowed: JPEG, PNG, GIF, WebP." });
    if (fileTooLarge)
      return res.status(400).json({ success: false, message: "Image exceeds the 5 MB size limit." });
    try {
      const db = req.app.locals.db;
      const user = req.user;

      let coverImage = null;
      if (fileUploadPromise) {
        coverImage = await fileUploadPromise;
      }

      const blog = await createBlogService(db, body, user, {
        path: coverImage?.url ?? null,
      });

      res.status(201).json({ success: true, data: blog });
    } catch (err) {
      sendError(err, req, res);
    }
  });

  busboy.on("error", () => {
    res.status(400).json({ success: false, message: "Invalid request body" });
  });

  req.pipe(busboy);
};

export const getBlogs = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const result = await getBlogsService(db, req.query);
    res.json({ success: true, ...result });
  } catch (err) {
    sendError(err, req, res);
  }
};

export const getBlogById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid blog id" });
    }
    const db = req.app.locals.db;
    const blog = await getBlogByIdService(db, req.params.id);
    res.json({ success: true, data: blog });
  } catch (err) {
    sendError(err, req, res);
  }
};

export const getUserBlogs = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Bad Request, invalid user id" });
    }
    const db = req.app.locals.db;
    const blogs = await getUserBlogsService(db, req.params.userId);
    res.json({ success: true, data: blogs });
  } catch (err) {
    sendError(err, req, res);
  }
};

export const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id))
      return res
        .status(400)
        .json({ success: false, message: "Invalid blog id" });

    const db = req.app.locals.db;
    const result = await toggleLikeService(db, id, req.user._id);
    res.json({ success: true, ...result });
  } catch (err) {
    sendError(err, req, res);
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const blog = await getBlogBySlugService(db, req.params.slug);
    res.json({ success: true, data: blog });
  } catch (err) {
    sendError(err, req, res);
  }
};

export const getSavedIds = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const ids = await getSavedIdsService(db, req.user._id);
    res.json({ success: true, ids });
  } catch (err) {
    sendError(err, req, res);
  }
};

export const getLikedIds = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const ids = await getLikedIdsService(db, req.user._id);
    res.json({ success: true, ids });
  } catch (err) {
    sendError(err, req, res);
  }
};

export const toggleFavourite = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id))
      return res
        .status(400)
        .json({ success: false, message: "Invalid blog id" });

    const db = req.app.locals.db;
    const result = await toggleFavouriteService(db, id, req.user._id);
    res.json({ success: true, ...result });
  } catch (err) {
    sendError(err, req, res);
  }
};

export const updateBlog = async (req, res) => {
  const busboy = Busboy({ headers: req.headers, limits: { fileSize: MAX_IMAGE_SIZE } });
  let body = {};
  let fileUploadPromise = null;
  let fileTooLarge = false;
  let invalidMime = false;

  busboy.on("field", (name, value) => { body[name] = value; });
  busboy.on("file", (name, file, info) => {
    const { filename, mimeType } = info;
    if (!filename) { file.resume(); return; }
    if (!ALLOWED_IMAGE_MIME_TYPES.has(mimeType)) {
      invalidMime = true;
      file.resume();
      return;
    }
    file.on("limit", () => { fileTooLarge = true; file.resume(); });
    fileUploadPromise = uploadImage(file, "blogs");
  });

  busboy.on("finish", async () => {
    if (invalidMime)
      return res.status(400).json({ success: false, message: "Invalid file type. Allowed: JPEG, PNG, GIF, WebP." });
    if (fileTooLarge)
      return res.status(400).json({ success: false, message: "Image exceeds the 5 MB size limit." });
    try {
      const { id } = req.params;
      if (!ObjectId.isValid(id))
        return res.status(400).json({ success: false, message: "Invalid blog id" });

      const db = req.app.locals.db;
      let coverImage = null;
      if (fileUploadPromise) coverImage = await fileUploadPromise;

      const blog = await updateBlogService(db, id, req.user._id, body, {
        path: coverImage?.url ?? null,
      });
      res.json({ success: true, data: blog });
    } catch (err) {
      sendError(err, req, res);
    }
  });

  busboy.on("error", () => {
    res.status(400).json({ success: false, message: "Invalid request body" });
  });

  req.pipe(busboy);
};

export const getMyBlogs = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const blogs = await getUserAllBlogsService(db, req.user._id);
    res.json({ success: true, data: blogs });
  } catch (err) {
    sendError(err, req, res);
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id))
      return res.status(400).json({ success: false, message: "Invalid blog id" });
    const db = req.app.locals.db;
    await deleteBlogService(db, id, req.user._id);
    res.json({ success: true });
  } catch (err) {
    sendError(err, req, res);
  }
};

export const getFavourites = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const data = await getFavouritesService(db, req.user._id);
    res.json({ success: true, data });
  } catch (err) {
    sendError(err, req, res);
  }
};
