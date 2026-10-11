/**
 * Exams module: the only public entry point. app.js mounts this router at
 * /api/exams. Exam history itself is shared (services/examHistoryService.js)
 * because the mastery engine, recruiter, users and the mentor all read it.
 */
export { default } from "./routes/exam.routes.js";
