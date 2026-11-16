/**
 * Voice exam module: the only public entry point. app.js mounts this router at
 * /api/voice-exam. Typed answers only until speech-to-text lands.
 */
export { default } from "./routes/voiceExam.routes.js";
// Profiles show the "Verified" layers.
export { listVerifiedLayers } from "./services/voiceExamService.js";
