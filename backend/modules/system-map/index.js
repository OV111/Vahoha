/**
 * System-map module: the only public entry point. app.js mounts this router
 * at /api/system-maps.
 */
export { default } from "./routes/systemMap.routes.js";
export { default as understandingRoutes } from "./routes/understanding.routes.js";
export { default as driftRoutes } from "./routes/drift.routes.js";

// For other modules (teams evidence, recruiter scorecard, team PR sync).
export { getTeamMapSnapshot, listSharedCapstoneMaps } from "./services/snapshotService.js";
export { flagMapDrift } from "./services/driftService.js";
