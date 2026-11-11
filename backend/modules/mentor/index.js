/**
 * mentor module: the only public entry point. app.js mounts this router at
 * /api/mentor. The learner context (what the mentor knows about a learner)
 * and the tool definitions live in services/.
 */
export { default } from "./routes/mentor.routes.js";
