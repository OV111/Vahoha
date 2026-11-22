import { Router } from "express";
import { makeErrorHandler } from "../../../utils/respond.js";
import { authenticate } from "../../../middleware/authenticate.js";
import { validate } from "../../../middleware/validate.js";
import { mapParamSchema, versionParamSchema } from "../schemas/systemMap.schemas.js";
import { getVersion, listVersions } from "../controllers/versions.controller.js";

const router = Router();

// GET /api/system-maps/:id/versions: earlier states of the map, newest first (no graphs)
router.get("/:id/versions", authenticate, validate({ params: mapParamSchema }), listVersions);

// GET /api/system-maps/:id/versions/:versionId: one earlier state, to preview or restore
router.get("/:id/versions/:versionId", authenticate, validate({ params: versionParamSchema }), getVersion);

router.use(makeErrorHandler("system-map versions", "Something went wrong with your map's history."));

export default router;
