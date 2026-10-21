import { Router } from "express";
import { authenticate } from "../../../middleware/authenticate.js";
import { requireAdmin } from "../../../middleware/requireAdmin.js";
import { validate } from "../../../middleware/validate.js";
import {
  adminConceptParamSchema,
  adminSourceParamSchema,
  importBodySchema,
  reviewedBodySchema,
  visibilityBodySchema,
} from "../schemas/admin.schemas.js";
import {
  getConcepts,
  getDigests,
  importDigest,
  patchConceptReviewed,
  patchVisibility,
} from "../controllers/admin.controller.js";

// Mounted at /api/library/admin. Non-admins get 404 from requireAdmin.
const router = Router();
router.use(authenticate, requireAdmin);

// Fixed paths above /:id.
router.get("/digests", getDigests);

router.post("/import", validate({ body: importBodySchema }), importDigest);

router.get("/:id/concepts", validate({ params: adminSourceParamSchema }), getConcepts);

router.patch(
  "/:id/concepts/:conceptKey",
  validate({ params: adminConceptParamSchema, body: reviewedBodySchema }),
  patchConceptReviewed,
);

router.patch(
  "/:id/visibility",
  validate({ params: adminSourceParamSchema, body: visibilityBodySchema }),
  patchVisibility,
);

export default router;
