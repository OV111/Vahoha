/**
 * Readiness owns no data. It asks each module for its own proof through that
 * module's public entry point, then scores the combination. Adding a source
 * later (deploys, incident drills) means one more call here, nothing else.
 */

import { getCapstoneEvidence } from "../../capstone/index.js";
import { getMemberStats } from "../../teams/index.js";
import { buildEvidence, buildReadinessView } from "../lib/readinessView.js";

export const getReadinessService = async (db, userId) => {
  const [capstone, teams] = await Promise.all([getCapstoneEvidence(db, userId), getMemberStats(db, userId)]);
  return buildReadinessView(buildEvidence(capstone, teams));
};
