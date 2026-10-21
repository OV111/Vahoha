# API Reference

> **Updated:** 2026-10-21. Built from the route files in `backend/modules/*/routes/` and the mounts in `backend/app.js`.
> The generated Swagger UI is at `/api-docs` and covers part of this. Where a request or response shape is not confirmed here it says `TODO: confirm`.
> See also: [Architecture](ARCHITECTURE.md) · [Security](SECURITY.md) · [Data model](DATA_MODEL.md)

**Contents:** [Conventions](#conventions) · [Auth](#auth) · [Account and profile](#account-and-profile) · [Chat](#chat-http-and-websocket) · [Blogs and library](#blogs-library-and-search) · [Roadmap](#roadmap) · [Exams](#exams) · [Mentor](#ai-mentor) · [Challenges](#coding-challenges) · [Capstone](#capstone) · [Teams](#build-teams) · [Billing](#billing) · [Other](#recruiter-readiness-mastery-onboarding-contact-admin)

---

## Conventions

| Topic | Rule |
|---|---|
| **Auth** | `Authorization: Bearer <access token>` (15 minutes). The refresh token is an httpOnly cookie. Column **Auth** below: `Bearer` = checked by the `authenticate` middleware, `Admin` = `authenticate` + `requireAdmin`, `Bearer*` = token checked inside the controller (`verifyToken`), `-` = public |
| **Prefix** | New routes are under `/api/...`. Legacy routes are bare: `/blogs`, `/library`, `/search`, `/my-profile`, `/users`, auth, account |
| **Validation** | Zod through the `validate` middleware on newer routes (`V` in the Notes column). Older routes validate inside the controller |
| **Response shape** | Not uniform. Some return `{ success, data }`, some `{ message }`, some a bare object (`{ history }`, `{ weakSpot }`). There is no shared error handler (see [Architecture](ARCHITECTURE.md#9-open-fixes-in-priority-order)) |
| **Rate limits** | `L-auth` = login 5 per 15 min, signup 10 per hour (Redis counters with an in-memory fallback). `AI` = 10 per minute per user (`aiBurstLimiter`). `TB` = teach-back 40 per day. Other limiters are named per route |
| **Raw body** | `POST /api/billing/webhook` takes the unparsed body (signature check), registered before `express.json()` |
| **Maintenance** | `MAINTENANCE_MODE=true` makes every route answer 503. `/healthz` is answered before Express and is unaffected |
| **Health** | `GET /healthz` (GET or HEAD), no auth: can this process reach its database |

---

## Auth

Source: `modules/auth/routes/auth.routes.js`. Body schemas: `auth.schemas.js` (signup: firstName, lastName, email, password, username; login: email, password; reset: token, newPassword).

| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | `/get-started` | - | Sign up. V, signup limiter. 409 if the email exists |
| POST | `/login` | - | V, login limiter. Sets the refresh cookie, returns the access token |
| DELETE | `/log-out` | - | Revokes the refresh token, clears the cookie |
| GET | `/verify-token` | - | Validates the token and refreshes the session (`TODO: confirm` exact response) |
| POST | `/google/auth` | - | Google ID-token sign-in |
| GET | `/auth/github` | - | Starts GitHub OAuth (nonce state) |
| GET | `/auth/github/link` | Bearer* | Link GitHub to the signed-in account |
| DELETE | `/auth/github/disconnect` | Bearer* | |
| GET | `/auth/github/callback` | - | OAuth callback, redirects to the frontend `oauth-success` page |
| POST | `/forgot-password` | - | V, 1 per hour limiter. Sends an email |
| POST | `/reset-password` | - | V, 15 min limiter |
| POST | `/login-link` | - | Magic-link request. V, 1 per hour limiter |
| POST | `/login-link/confirm` | - | V, 15 min limiter |

## Account and profile

| Method | Path | Auth | Notes |
|---|---|---|---|
| DELETE | `/deleteAccount` | Bearer | V (email, password, confirmation), own limiter |
| GET / PUT | `/my-profile` | Bearer* | Read profile / update last active |
| PUT | `/my-profile/settings` | Bearer* | |
| DELETE | `/my-profile/cv` | Bearer* | |
| GET | `/my-profile/username-available` | Bearer* | |
| GET | `/my-profile/notifications` | Bearer* | Also `PATCH /read-all`, `PATCH /:id/read`, `DELETE /:id` |
| GET | `/my-profile/following`, `/followers` | Bearer* | |
| GET | `/my-profile/blocked-users` | Bearer* | |
| GET | `/users/:username` | Bearer* | Public profile (token optional, `TODO: confirm`) |
| POST / DELETE | `/users/:username/follow` | Bearer* | |

## Chat (HTTP and WebSocket)

HTTP routes live under `/my-profile/chats/...` (profile module delegates to `modules/chat`):

| Method | Path | Notes |
|---|---|---|
| GET | `/chats/mutual-followers`, `/chats/:receiverId/stats` | |
| PATCH / POST | `/chats/rooms/:roomId/mute`, `/clear` | |
| POST | `/chats/rooms/:roomId/voice`, `/attachment` | Voice notes and files (magic-byte checked) |
| GET / PUT / DELETE | `/chats/blocks`, `/chats/blocks/:userId` | |
| GET / POST | `/chats/requests`, `/requests/:roomId/accept`, `/decline` | Message requests for non-mutual followers |
| GET / PUT | `/chats/policy` | V (`messagePolicySchema`) |
| POST / GET / PATCH | `/chats/groups`, `/groups/:roomId` | Group chat |
| POST / DELETE / PATCH | `/groups/:roomId/members`, `/members/:memberId`, `/leave`, `/admins/:memberId` | |

All of the above: Auth `Bearer*`.

**WebSocket** (same server, `ws`; origin checked by `websocket/origin.js`). Client sends JSON:

| `type` | Payload | Notes |
|---|---|---|
| `auth` | `{ token }` | Must be first. Invalid token closes the socket |
| `join_room` | room data | Membership checked |
| `send_message` | message data | |
| `react_message` | reaction data | |
| `load_last_messages` | - | |

Payload shapes: `TODO: confirm` (`websocket/chatHandler.js`).

## Blogs, library and search

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/blogs` | - | List. `?layer=<id>` filters by roadmap layer |
| POST | `/blogs` | Bearer | Create blog |
| POST | `/blogs` (post router) | Bearer* | `createPost`. `TODO: confirm` why two POST `/blogs` handlers exist |
| GET | `/blogs/favourites`, `/saved-ids`, `/liked-ids`, `/my-blogs` | Bearer | |
| GET | `/blogs/id/:id`, `/blogs/user/:userId`, `/blogs/:slug` | - | |
| PUT / DELETE | `/blogs/:id` | Bearer | |
| POST | `/blogs/:id/like`, `/favourite` | Bearer | |
| GET / POST | `/blogs/:id/comments` | - / Bearer | |
| DELETE | `/blogs/:id/comments/:commentId` | Bearer | |
| GET | `/library`, `/library/:id`, `/library/counts`, `/library/layer/:layerId` | - | |
| GET / POST | `/library/saved-ids`, `/library/:id/save` | Bearer | |
| GET | `/search/users`, `/search/categories` | - | |

## Roadmap

`/api/roadmaps`, all Bearer.

| Method | Path | Notes |
|---|---|---|
| GET | `/progress` | The learner's progress |
| POST | `/start` | Body `{ activePath, skillLevel }` |
| POST | `/progress` | Body `{ layerProgress, activePath, currentLayer }`. Progress is auto-tracked by the app (open, finish, test pass) |

## Exams

`/api/exams`, all Bearer. Answer keys never leave the server.

| Method | Path | Notes |
|---|---|---|
| POST | `/generate` | Body `{ path, layer }`. 403 "This layer is locked" if the previous layer is not done. Returns questions without answers |
| POST | `/submit` | Body `{ attemptId, answers, integrity }`. Server-graded. Integrity flags (tab switch, paste) are review-only |
| POST | `/submit-teach-back` | Body `{ path, layer, topic, answerText }`. AI limiter + TB daily limit |
| POST | `/submit-teach-back-followup` | Body `{ sessionId, answerText }`. Same limits |
| GET | `/history`, `/history/last` | Response `{ history }` / `{ exam }` |
| GET | `/weak-spots` | Response `{ weakSpots }` |
| POST | `/weak-spots` | Body `{ topic, path, layer, source }`. Response `{ weakSpot }` |
| PATCH | `/weak-spots/:topic/resolve` | |

## AI mentor

`/api/ai-agent`, all Bearer. Details in [AI](AI.md).

| Method | Path | Notes |
|---|---|---|
| GET | `/context` | Learner context summary |
| GET / POST | `/sessions` | V on create (`title`) |
| GET / PATCH / DELETE | `/sessions/:id` | V. Patch takes `title`, `pinned` |
| POST | `/stream` | SSE stream. V (`message`, `sessionId`, `activity`, `attachments`). AI limiter. 429 with `resetAt` after 30 messages a day |

## Coding challenges

`/api/challenges`, all Bearer.

| Method | Path | Notes |
|---|---|---|
| GET | `/` | Catalog. V query: track, layer, type, difficulty, tags, time, status, recommended, q, page, limit |
| GET | `/:slug`, `/daily`, `/stats/me`, `/readiness`, `/leaderboard`, `/topics`, `/tracks` | |
| POST / GET / PATCH | `/attempts`, `/attempts/:id` | Start and save an attempt |
| POST | `/attempts/:id/hints/:order` | XP-priced hint |
| GET | `/submissions/runner` | Which runner is live |
| POST | `/submissions/:id` | Graded submission. Body `{ language }` (JS or TS). Daily cap: 30 Free, 300 Pro (429 when reached) |
| POST / GET | `/proposals`, `/proposals/mine` | Community proposals |
| GET | `/proposals` (admin list), `POST /proposals/:id/approve`, `/reject` | Admin |

## Capstone

`/api/capstone`. Body schemas in `capstone.schemas.js`.

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/catalog` | - | Published briefs |
| GET | `/` | Bearer | The learner's attempts |
| GET | `/:trackId` | Bearer | V |
| POST | `/:trackId/start` | Bearer | V |
| POST | `/:trackId/submit` | Bearer | V `{ repoUrl }`. Repo must belong to the learner's GitHub login |
| POST | `/:trackId/review` | Bearer | AI review. AI limiter |
| GET | `/:trackId/defense` | Bearer | |
| POST | `/:trackId/defense/start`, `/grade` | Bearer | AI limiter |
| POST | `/:trackId/defense/answer` | Bearer | V `{ questionId, answer, integrity }` |
| GET | `/certificates` | Bearer | Own certificates |
| GET | `/certificates/:publicId` | - | Public verification, `verifyLimiter` |
| GET | `/admin/attempts`, `/admin/attempts/:attemptId` | Admin | |
| POST | `/admin/attempts/:attemptId/override`, `/admin/certificates/:publicId/revocation` | Admin | |

## Build Teams

`/api/teams`. Fixed paths are registered above `/:teamId`.

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/evidence/:publicId` | - | Public evidence snapshot, `evidenceLimiter` |
| GET | `/mine`, `/leaderboard`, `/:teamId`, `/:teamId/contributions` | Bearer | |
| GET | `/:teamId/defense`, `/:teamId/ratings/mine` | Bearer | |
| POST | `/:teamId/defense/start`, `/answer`, `/grade` | Bearer | AI limiter |
| PUT | `/:teamId/ratings/:userId` | Bearer | Peer rating `{ score, comment }` |
| GET | `/`, `/admin/users`, `/admin/overview`, `/:teamId/evidence` | Admin | |
| POST | `/` | Admin | `{ name, trackId }` |
| PUT | `/:teamId/repo`, `/:teamId/status`, `/:teamId/evidence/revocation` | Admin | |
| POST | `/:teamId/members`, `/:teamId/sync`, `/:teamId/evidence` | Admin | Add member `{ userId, githubLogin }`, sync merged PRs, issue evidence |
| DELETE | `/:teamId/members/:userId` | Admin | |

## Billing

`/api/billing`. Details in [Billing](BILLING.md).

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/subscription` | Bearer | Plan, status, renewal date |
| POST | `/checkout` | Bearer | Returns `{ url }` to Polar. 10 per minute |
| POST | `/portal`, `/sync` | Bearer | 10 per minute |
| POST | `/webhook` | Signed | Polar webhook. 503 with no secret, 403 on a bad signature, 202 for ignored events |

## Recruiter, readiness, mastery, onboarding, contact, admin

| Method | Path | Auth | Notes |
|---|---|---|---|
| GET | `/api/recruiter/candidates` | Bearer | Closed unless `CANDIDATES_ENABLED`. Query: track, openToWork, hasCapstone, minLayers, q, sort, page, limit |
| GET | `/api/recruiter/scorecards/:username` | - | Opt-in public scorecard, limiter |
| GET / PUT | `/api/recruiter/settings` | Bearer | V |
| GET | `/api/readiness/me` | Bearer | Private job-readiness view |
| GET | `/api/mastery` | Bearer | Per-topic view. Detail is a Pro feature, inert until billing is enforced |
| GET | `/api/onboarding` | Bearer | |
| PUT | `/api/onboarding/:tourId/seen` | Bearer | V |
| POST | `/api/contact` | - | V (name, email, topic, message, website), limiter |
| GET | `/api/admin/funnel?days=30` | Admin | Signup-to-team-defense funnel |
| `*` | `/api/voice-review/...` | Bearer | `voice-review` module has routes (`POST /sessions`, `GET /sessions/:id`, `GET /history`), but `TODO: confirm` they are mounted: they are not in `app.js` |

`/api-docs` serves Swagger UI with no auth, in production too (see [Security](SECURITY.md)).
