/**
 * Voice review module: the only public entry point.
 *
 * Scaffold only (every endpoint answers 501) and not mounted in app.js on
 * purpose: the voice exam is frozen until pilot data says otherwise.
 */
export { default } from "./routes/voiceReview.routes.js";
