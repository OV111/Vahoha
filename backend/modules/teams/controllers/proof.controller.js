/**
 * Proof: the per-member defense on their own PRs, peer ratings, and the public
 * evidence page. A defense or rating is always the signed-in member's own,
 * never a userId from the client.
 */

import { ObjectId } from "mongodb";
import { getPublicEvidenceService } from "../services/proof/evidenceService.js";
import { listMyRatingsService, rateMemberService } from "../services/proof/ratingService.js";
import {
  answerTeamDefenseService,
  getTeamDefenseService,
  gradeTeamDefenseService,
  startTeamDefenseService,
} from "../services/proof/teamDefenseService.js";
import { dbOf, respond } from "../../../utils/respond.js";

const me = (req) => new ObjectId(req.user._id);

export const getDefense = respond((req) => getTeamDefenseService(dbOf(req), req.params.teamId, me(req)));
export const startDefense = respond((req) => startTeamDefenseService(dbOf(req), req.params.teamId, me(req)));
export const answerDefense = respond((req) => answerTeamDefenseService(dbOf(req), req.params.teamId, me(req), req.body));
export const gradeDefense = respond((req) => gradeTeamDefenseService(dbOf(req), req.params.teamId, me(req)));

export const rateMember = respond((req) =>
  rateMemberService(dbOf(req), req.params.teamId, me(req), new ObjectId(req.params.userId), req.body),
);
export const listMyRatings = respond((req) => listMyRatingsService(dbOf(req), req.params.teamId, me(req)));

export const getPublicEvidence = respond((req) => getPublicEvidenceService(dbOf(req), req.params.publicId));
