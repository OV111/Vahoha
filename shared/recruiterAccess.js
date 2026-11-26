/**
 * What a hiring account can open on the learner side (see the access table in
 * the hiring plan). The server enforces the same split with blockRecruiters;
 * this list only decides where the app sends a recruiter, so they don't land on
 * a page whose every button would be refused.
 *
 * Paths here (and everything under them) send a recruiter to hiring home.
 * Anything not listed stays open: view-only pages such as roadmaps, lessons,
 * labs, challenge descriptions, the library, blogs and public profiles.
 */
export const RECRUITER_BLOCKED_PATHS = Object.freeze([
  "/roadmaps/exam",
  "/voice-exam",
  "/mentor",
  "/judgment",
  "/capstone",
  "/teams",
  "/team",
  "/progress",
  "/project-map",
  "/billing",
  "/coding-challenges/propose",
  "/coding-challenges/review",
  "/my-profile/chats",
  "/my-profile/add-blog",
  "/my-profile/edit-blog",
  "/my-profile/intros",
]);

export const isRecruiterBlockedPath = (pathname) =>
  RECRUITER_BLOCKED_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
