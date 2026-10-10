/**
 * Pure: merge each module's proof into the Evidence shape computeReadiness
 * reads, and shape the result for the client. No database, so it is unit-tested
 * directly.
 */

import { computeReadiness } from "./computeReadiness.js";
import { SPHERES } from "./competencies.js";

/**
 * @param {{capstonePassed: boolean, defensesPassed: number}} capstone
 * @param {{mergedPrs: number, reviewsGiven: number, defensesPassed: number, peerAverage: number|null}} teams
 */
export const buildEvidence = (capstone, teams) => ({
  mergedPrs: teams.mergedPrs,
  reviewsGiven: teams.reviewsGiven,
  defensesPassed: capstone.defensesPassed + teams.defensesPassed,
  capstonePassed: capstone.capstonePassed,
  peerAverage: teams.peerAverage,
  // Debug & Ops has no source yet (deploys, incident drills, debug tasks).
  deploys: 0,
  incidentsFixed: 0,
  debugTasksPassed: 0,
});

/** What GET /api/readiness/me returns: the verdict, the sphere details and the counts behind it. */
export const buildReadinessView = (evidence) => {
  const { spheres, overall } = computeReadiness(evidence);
  return {
    overall,
    spheres: SPHERES.map(({ id, title, skills, derived }) => ({
      id,
      title,
      skills,
      derived: Boolean(derived),
      level: spheres[id],
    })),
    evidence: {
      capstonePassed: evidence.capstonePassed,
      mergedPrs: evidence.mergedPrs,
      reviewsGiven: evidence.reviewsGiven,
      defensesPassed: evidence.defensesPassed,
      peerAverage: evidence.peerAverage,
    },
  };
};
