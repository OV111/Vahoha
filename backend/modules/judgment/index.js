/**
 * Judgment simulator module: the only public entry point. app.js mounts this
 * router at /api/judgment. Stage 1: hand-written scenarios, typed reasons.
 */
export { default } from "./routes/judgment.routes.js";
export { judgmentSummary } from "./services/runService.js";
