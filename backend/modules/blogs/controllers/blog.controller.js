import Busboy from "busboy";
import { ObjectId } from "mongodb";
import { uploadImage } from "../../../utils/uploadImage.js";
import { makeErrorHandler } from "../../../utils/respond.js";
import { verifyAccessToken } from "../../../utils/jwtToken.js";
import { ValidationError } from "../../../utils/httpErrors.js";
import {
  getBlogsService,
  getBlogByIdService,
  getBlogBySlugService,
  getUserBlogsService,
  getUserAllBlogsService,
  createBlogService,
  updateBlogService,
  deleteBlogService,
  toggleLikeService,
  getLikedIdsService,
  toggleFavouriteService,
  getSavedIdsService,
  getFavouritesService,
} from "../services/blogService.js";

const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
]);
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB

// Errors with a status (utils/httpErrors.js) go to the user as-is; anything
// else is logged and answered with a generic 500.
const sendError = makeErrorHandler("blogs");

// Reads the blog form (text fields plus an optional cover image) and uploads the image.
const readBlogForm = (req) =>
  new Promise((resolve, reject) => {
    const badForm = () => reject(new ValidationError("Invalid request body"));

    let busboy;
    try {
      busboy = Busboy({ headers: req.headers, limits: { fileSize: MAX_IMAGE_SIZE } });
    } catch {
      return badForm(); // not a form at all (missing or wrong content type)
    }

    const fields = {};
    let upload = null;
    let imageError = null;

    busboy.on("field", (name, value) => {
      fields[name] = value;
    });

    busboy.on("file", (name, file, { filename, mimeType }) => {
      if (!filename) return file.resume();
      if (!ALLOWED_IMAGE_MIME_TYPES.has(mimeType)) {
        imageError = "Invalid file type. Allowed: JPEG, PNG, GIF, WebP.";
        return file.resume();
      }
      file.on("limit", () => {
        imageError ??= "Image exceeds the 5 MB size limit.";
        file.resume();
      });
      upload = uploadImage(file, "blogs");
      // It can fail before "finish" awaits it; without this Node sees an unhandled rejection.
      upload.catch(() => {});
    });

    busboy.on("finish", async () => {
      if (imageError) return reject(new ValidationError(imageError));
      try {
        const image = await upload;
        resolve({ fields, file: { path: image?.url ?? null } });
      } catch (err) {
        reject(err);
      }
    });

    busboy.on("error", badForm);
    req.pipe(busboy);
  });

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
    // Public route, but the author's own token unlocks their drafts (EditBlog).
    const bearer = req.headers.authorization?.replace("Bearer ", "");
    const viewer = bearer ? verifyAccessToken(bearer) : null;
    const blog = await getBlogByIdService(db, req.params.id, viewer?.id ?? viewer?._id ?? null);
    res.json({ success: true, data: blog });
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

export const getMyBlogs = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const blogs = await getUserAllBlogsService(db, req.user._id);
    res.json({ success: true, data: blogs });
  } catch (err) {
    sendError(err, req, res);
  }
};

export const createBlog = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { fields, file } = await readBlogForm(req);
    const blog = await createBlogService(db, fields, req.user, file);
    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    sendError(err, req, res);
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id))
      return res.status(400).json({ success: false, message: "Invalid blog id" });

    const db = req.app.locals.db;
    const { fields, file } = await readBlogForm(req);
    const blog = await updateBlogService(db, id, req.user._id, fields, file);
    res.json({ success: true, data: blog });
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

export const getSavedIds = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const ids = await getSavedIdsService(db, req.user._id);
    res.json({ success: true, ids });
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
