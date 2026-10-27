import { Router } from "express";
import { authenticate } from "../../../middleware/authenticate.js";
import { validate } from "../../../middleware/validate.js";
import { driftParamSchema } from "../schemas/drift.schemas.js";
import { dismiss } from "../controllers/drift.controller.js";

const router = Router();

// POST /api/system-maps/:id/drift/dismiss: "I've reviewed these changes"
router.post("/:id/drift/dismiss", authenticate, validate({ params: driftParamSchema }), dismiss);

export default router;
