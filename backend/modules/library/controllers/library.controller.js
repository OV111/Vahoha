import { ObjectId } from "mongodb";
import {
  getResourcesService,
  getResourceByIdService,
  getResourcesByLayerService,
  getResourceCountsByTypeService,
  toggleSaveResourceService,
  getSavedResourceIdsService,
} from "../services/libraryService.js";
import { makeErrorHandler } from "../../../utils/respond.js";

const sendError = makeErrorHandler("library");

export const getResources = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const result = await getResourcesService(db, req.query);
    res.json({ success: true, ...result });
  } catch (err) {
    sendError(err, req, res);
  }
};

export const getResourceById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid resource id" });
    }
    const db = req.app.locals.db;
    const resource = await getResourceByIdService(db, req.params.id);
    res.json({ success: true, data: resource });
  } catch (err) {
    if (err.message === "Resource not found") err.status = 404;
    sendError(err, req, res);
  }
};

export const getResourcesByLayer = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const resources = await getResourcesByLayerService(db, req.params.layerId);
    res.json({ success: true, data: resources });
  } catch (err) {
    if (err.message === "Invalid layer id") err.status = 400;
    sendError(err, req, res);
  }
};

export const toggleSaveResource = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid resource id" });
    }
    const db = req.app.locals.db;
    const result = await toggleSaveResourceService(db, req.params.id, req.user._id);
    res.json({ success: true, ...result });
  } catch (err) {
    sendError(err, req, res);
  }
};

export const getSavedResourceIds = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const ids = await getSavedResourceIdsService(db, req.user._id);
    res.json({ success: true, ids });
  } catch (err) {
    sendError(err, req, res);
  }
};

export const getResourceCounts = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const counts = await getResourceCountsByTypeService(db);
    res.json({ success: true, data: counts });
  } catch (err) {
    sendError(err, req, res);
  }
};
