import { Router } from "express";
import { authenticate } from "../../../middleware/authenticate.js";
import { validate } from "../../../middleware/validate.js";
import { tourParamsSchema } from "../schemas/onboarding.schemas.js";
import { listSeen, markSeen } from "../controllers/onboarding.controller.js";

const router = Router();

/**
 * @openapi
 * tags:
 *   - name: Onboarding
 *     description: Which first-visit tours the signed-in user has already seen
 * /api/onboarding:
 *   get:
 *     tags: [Onboarding]
 *     summary: Ids of the tours the caller finished or skipped
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: "{ seen: string[] }"
 * /api/onboarding/{tourId}/seen:
 *   put:
 *     tags: [Onboarding]
 *     summary: Mark a tour as seen (idempotent)
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tourId
 *         required: true
 *         schema:
 *           type: string
 *           enum: [roadmap, arena, capstone]
 *     responses:
 *       200:
 *         description: "{ seen: string[] }"
 *       400:
 *         description: Unknown tour
 */
router.get("/", authenticate, listSeen);
router.put("/:tourId/seen", authenticate, validate({ params: tourParamsSchema }), markSeen);

export default router;
