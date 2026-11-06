import { Router } from "express";
import { getUserProfile, followUser, unfollowUser } from "../controllers/user.controller.js";
import { publicReadLimiter, toggleLimiter } from "../../../middleware/rateLimits.js";
import { authenticate } from "../../../middleware/authenticate.js";

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: Public user profiles and follow system
 */

/**
 * @openapi
 * /users/{username}:
 *   get:
 *     tags: [Users]
 *     summary: Get a user's public profile
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile data
 *       404:
 *         description: User not found
 */

/**
 * @openapi
 * /users/{username}/follow:
 *   post:
 *     tags: [Users]
 *     summary: Follow a user
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Now following
 *       401:
 *         description: Unauthorized
 *   delete:
 *     tags: [Users]
 *     summary: Unfollow a user
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Unfollowed
 */

// Per route: this router is mounted at the root, so router.use() would run on every API request.
router.get("/users/:username", publicReadLimiter, authenticate, getUserProfile);
router.post("/users/:username/follow", toggleLimiter, authenticate, followUser);
router.delete("/users/:username/follow", toggleLimiter, authenticate, unfollowUser);

export default router;
