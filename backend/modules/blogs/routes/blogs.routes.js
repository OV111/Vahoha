import {
  createBlog,
  getBlogById,
  getBlogBySlug,
  getBlogs,
  getUserBlogs,
  toggleLike,
  toggleFavourite,
  getFavourites,
  getSavedIds,
  getLikedIds,
  updateBlog,
  getMyBlogs,
  deleteBlog,
} from "../controllers/blog.controller.js";
import {
  getComments,
  postComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { Router } from "express";
import { authenticate } from "../../../middleware/authenticate.js";
import { cacheControl } from "../../../middleware/cacheControl.js";
import { publicReadLimiter, blogCreateLimiter, blogUpdateLimiter, commentLimiter, toggleLimiter } from "../../../middleware/rateLimits.js";

const router = Router();
// Public and the same for everyone, so a browser may reuse it for 15 s (and show it while
// refreshing for 60 s more). A post you just published can take that long to appear in a
// list the browser already holds; the signed-in routes (my-blogs, one post) carry no header.
router.get("/", publicReadLimiter, cacheControl({ maxAge: 15, staleWhileRevalidate: 60 }), getBlogs);
router.post("/", authenticate, blogCreateLimiter, createBlog);
router.get("/favourites", authenticate, getFavourites);
router.get("/saved-ids", authenticate, getSavedIds);
router.get("/liked-ids", authenticate, getLikedIds);
router.get("/my-blogs", authenticate, getMyBlogs);
router.get("/id/:id", getBlogById);
router.get("/user/:userId", getUserBlogs);
router.put("/:id", authenticate, blogUpdateLimiter, updateBlog);
router.delete("/:id", authenticate, deleteBlog);
router.post("/:id/like", authenticate, toggleLimiter, toggleLike);
router.get("/:id/comments", getComments);
router.post("/:id/comments", authenticate, commentLimiter, postComment);
router.delete("/:id/comments/:commentId", authenticate, deleteComment);
router.post("/:id/favourite", authenticate, toggleLimiter, toggleFavourite);
router.get("/:slug", getBlogBySlug);

export default router;
