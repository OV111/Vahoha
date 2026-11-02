import { scanRepoService } from "../services/scanService.js";
import {
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
import { dbOf, respond } from "../../../utils/respond.js";

const me = (req) => req.user._id;
const created = { status: 201 };

export const listMine = respond((req) => listMapsService(dbOf(req), me(req)));
export const getMap = respond((req) => getMapService(dbOf(req), req.params.id, me(req)));
export const createMap = respond((req) => createMapService(dbOf(req), me(req), req.body), created);
export const updateMap = respond((req) => updateMapService(dbOf(req), req.params.id, me(req), req.body));
export const deleteMap = respond(async (req) => {
  await deleteMapService(dbOf(req), req.params.id, me(req));
});
export const setSharing = respond((req) => setSharingService(dbOf(req), req.params.id, me(req), req.body.shared));

// GET/POST /for/:ownerType/:ownerId: the capstone's or team's map (GET answers null when none exists yet).
export const getOwnerMap = respond((req) => getOwnerMapService(dbOf(req), req.params.ownerType, req.params.ownerId, me(req)));
export const createOwnerMap = respond(
  (req) => createOwnerMapService(dbOf(req), req.params.ownerType, req.params.ownerId, me(req), req.body),
  created,
);

export const getPublicMap = respond((req) => getPublicMapService(dbOf(req), req.params.publicId));
export const scanRepo = respond((req) => scanRepoService(req.body.repoUrl, req.body.lens));
