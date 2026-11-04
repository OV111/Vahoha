import { Router } from "express";
import { getCategories, getUsers } from "../controllers/search.controller.js";
import { userSearchLimiter } from "../../../middleware/rateLimits.js";
import { validate } from "../../../middleware/validate.js";
import { searchQuerySchema } from "../schemas/search.schemas.js";

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Search
 *     description: Search across users and categories
 */

/**
 * @openapi
 * /search/users:
 *   get:
 *     tags: [Search]
 *     summary: Search users by name or username
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: Matching users
 */

/**
 * @openapi
 * /search/categories:
 *   get:
 *     tags: [Search]
 *     summary: Search blogs by category
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Matching results
 */

router.get("/users", userSearchLimiter, validate({ query: searchQuerySchema }), getUsers);
router.get("/categories", validate({ query: searchQuerySchema }), getCategories);

export default router;
