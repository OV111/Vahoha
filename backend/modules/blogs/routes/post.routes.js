import { Router } from "express";
import { createPost } from "../controllers/post.controller.js";

const router = Router();

// The /categories/:name and /categories/:name/default reads were removed
// together with the category landing pages, their only caller.
router.post("/blogs", createPost);

export default router;
