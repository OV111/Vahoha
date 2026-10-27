import {
  MAX_MAPS_PER_USER,
  createMapService,
  createOwnerMapService,
  deleteMapService,
  getMapService,
  getOwnerMapService,
  getPublicMapService,
  listMapsService,
  setSharingService,
  updateMapService,
} from "../services/systemMapService.js";
import { scanRepoService } from "../services/scanService.js";

const fail = (res, status, message, extra = {}) => res.status(status).json({ success: false, message, ...extra });
const serverError = (res, err) => {
  console.error("system-map:", err);
  fail(res, 500, "Something went wrong with your map.");
};

export const listMine = async (req, res) => {
  try {
    res.json({ success: true, data: await listMapsService(req.app.locals.db, req.user._id) });
  } catch (err) {
    serverError(res, err);
  }
};

export const getMap = async (req, res) => {
  try {
    const map = await getMapService(req.app.locals.db, req.params.id, req.user._id);
    if (!map) return fail(res, 404, "Map not found");
    res.json({ success: true, data: map });
  } catch (err) {
    serverError(res, err);
  }
};

export const createMap = async (req, res) => {
  try {
    const result = await createMapService(req.app.locals.db, req.user._id, req.body);
    if (result.error === "limit") return fail(res, 409, `You can keep up to ${MAX_MAPS_PER_USER} maps. Delete one first.`, { code: "limit" });
    res.status(201).json({ success: true, data: result.map });
  } catch (err) {
    serverError(res, err);
  }
};

export const updateMap = async (req, res) => {
  try {
    const result = await updateMapService(req.app.locals.db, req.params.id, req.user._id, req.body);
    if (!result) return fail(res, 404, "Map not found");
    if (result.error === "conflict") {
      return fail(res, 409, "This map was changed somewhere else.", { code: "conflict", data: result.map });
    }
    res.json({ success: true, data: result.map });
  } catch (err) {
    serverError(res, err);
  }
};

export const deleteMap = async (req, res) => {
  try {
    if (!(await deleteMapService(req.app.locals.db, req.params.id, req.user._id))) return fail(res, 404, "Map not found");
    res.json({ success: true });
  } catch (err) {
    serverError(res, err);
  }
};

export const setSharing = async (req, res) => {
  try {
    const result = await setSharingService(req.app.locals.db, req.params.id, req.user._id, req.body.shared);
    if (!result) return fail(res, 404, "Map not found");
    if (result.error === "team") return fail(res, 403, "Team maps go public through team evidence.");
    res.json({ success: true, data: result.map });
  } catch (err) {
    serverError(res, err);
  }
};

const FORBIDDEN = {
  capstone: "Start this capstone first.",
  team: "Only active team members can open the team map.",
};

// GET /for/:ownerType/:ownerId: the capstone's or team's map, or null when none exists yet.
export const getOwnerMap = async (req, res) => {
  try {
    const { ownerType, ownerId } = req.params;
    const result = await getOwnerMapService(req.app.locals.db, ownerType, ownerId, req.user._id);
    if (result.error === "forbidden") return fail(res, 403, FORBIDDEN[ownerType]);
    res.json({ success: true, data: result.map });
  } catch (err) {
    serverError(res, err);
  }
};

// POST /for/:ownerType/:ownerId: make the capstone's or team's map; 409 when it already exists.
export const createOwnerMap = async (req, res) => {
  try {
    const { ownerType, ownerId } = req.params;
    const result = await createOwnerMapService(req.app.locals.db, ownerType, ownerId, req.user._id, req.body);
    if (result.error === "forbidden") return fail(res, 403, FORBIDDEN[ownerType]);
    if (result.error === "exists") return fail(res, 409, "This project already has a map.", { code: "exists", data: result.map });
    res.status(201).json({ success: true, data: result.map });
  } catch (err) {
    serverError(res, err);
  }
};

export const getPublicMap = async (req, res) => {
  try {
    const map = await getPublicMapService(req.app.locals.db, req.params.publicId);
    if (!map) return fail(res, 404, "Map not found");
    res.json({ success: true, data: map });
  } catch (err) {
    serverError(res, err);
  }
};

export const scanRepo = async (req, res) => {
  try {
    const result = await scanRepoService(req.body.repoUrl, req.body.lens);
    if (result.error === "url") return fail(res, 400, "Paste a public GitHub repo link, like https://github.com/owner/repo.");
    if (result.error === "missing") return fail(res, 404, "We couldn't find that repo, or it's private.");
    if (result.error === "empty") return fail(res, 422, "We couldn't recognise any parts in this repo yet.");
    res.json({ success: true, data: result.data });
  } catch (err) {
    // GitHub being down or rate limiting us: our problem, said plainly.
    if (err.status === 502 || err.status === 503) return fail(res, err.status, err.message);
    serverError(res, err);
  }
};
