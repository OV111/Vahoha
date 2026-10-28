import { Router } from "express";
import {
  getResources,
  getResourceById,
  getResourcesByLayer,
  getResourceCounts,
  toggleSaveResource,
  getSavedResourceIds,
} from "../controllers/library.controller.js";
import { authenticate } from "../../../middleware/authenticate.js";
import { cacheControl } from "../../../middleware/cacheControl.js";

const router = Router();

// The public catalogue is the same for everyone and may be a minute old. The
// per-user routes (saved-ids, save) and the single item stay uncached.
const publicCatalogue = cacheControl({ maxAge: 60, staleWhileRevalidate: 300 });

// GET /library/counts      — type breakdown for hub page cards
router.get("/counts", publicCatalogue, getResourceCounts);

// GET /library/saved-ids   — IDs of resources saved by current user
router.get("/saved-ids", authenticate, getSavedResourceIds);

// GET /library/layer/:layerId  — resources for a roadmap layer
router.get("/layer/:layerId", getResourcesByLayer);

// GET /library             — all resources, filterable
router.get("/", publicCatalogue, getResources);

// GET /library/:id         — single resource
router.get("/:id", getResourceById);

// POST /library/:id/save   — toggle save/unsave
router.post("/:id/save", authenticate, toggleSaveResource);

export default router;
