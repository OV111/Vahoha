import { getVersionService, listVersionsService } from "../services/versionService.js";
import { dbOf, respond } from "../../../utils/respond.js";

export const listVersions = respond((req) => listVersionsService(dbOf(req), req.params.id, req.user._id));
export const getVersion = respond((req) => getVersionService(dbOf(req), req.params.id, req.params.versionId, req.user._id));
