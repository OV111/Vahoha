/**
 * Intros module: a developer's inbox of intro requests from companies (accept,
 * decline, block, report). app.js mounts this router at /api/intros behind
 * `noAccess`, so hiring accounts never reach it. The data and rules live in the
 * hiring module, which owns companies, jobs and trust; this is only the door.
 */
export { default } from "./routes/intros.routes.js";
