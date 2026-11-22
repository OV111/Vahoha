/**
 * Hiring module: recruiter accounts, their companies and the trust engine that
 * checks them. app.js mounts this router at /api/hiring.
 *
 * The developer side of intro requests (modules/intros) uses the named exports.
 */
export { default } from "./routes/hiring.routes.js";
export { hiringOpen } from "./lib/hiringOpen.js";
export { introReportSchema, introIdParamSchema, introListQuerySchema } from "./schemas/hiring.schemas.js";
export {
  acceptIntro,
  blockIntroCompany,
  declineIntro,
  listMyIntros,
  myIntroSummary,
  reportIntro,
} from "./services/introReplyService.js";
