/**
 * AI mentor module: the only public entry point. app.js mounts this router at
 * /api/ai-agent. The learner context (what the mentor knows about a learner)
 * and the tool definitions live in services/.
 */
export { default } from "./routes/aiAgent.routes.js";
