# Vahoha (formerly DevsWebs) — Architecture

> Last updated: 2026-10-02. Rewritten from the 2026-06-11 review: every item in that review was re-checked against the code, and its status is recorded in [Status of the June review](#status-of-the-june-2026-review). "Built" means the code exists and is mounted; it does not mean tested with real users.

---

## How to explain Vahoha

### What problem it solves and for whom

Developer learning is fragmented. You follow a YouTube tutorial, read an article, practice on LeetCode — and nothing checks whether you understood any of it. Vahoha is for self-taught and early-career developers: a roadmap where each layer stays locked until you pass a server-graded exam, a mentor that knows your weak spots, and a curated library and community around that loop. The bet is that *gated, measurable progression* is more valuable than more content.

### The core loop

```
Pick a path → study a layer (posts + library) → take the layer exam
   → PASS → next layer unlocks
   → FAIL → weak spots recorded → ask the AI mentor → targeted review → retry
```

### How it is built

Single-instance Express 5 + MongoDB (native driver) + Redis/BullMQ, with WebSockets on the same Node process. Frontend is React 19 + Vite + Zustand, code-split with `React.lazy`. Backend on Render, frontend on Vercel, database on MongoDB Atlas (see `docs/DEPLOYMENT.md`).

| Choice | Reasoning |
|---|---|
| MongoDB native driver | Document-shaped data (layers, attempts, weak spots); keeps queries close to the data model. `mongoose` is not used anywhere |
| Groq `openai/gpt-oss-120b` for the mentor | Chosen 2026-09-26 because Groq has a free tier and a solo pre-revenue project is cost-bound. `MODEL` lives in one place (`modules/ai-agent/services/streamService.js`); Groq retires models, so 404s mean check `/models` first |
| BullMQ | Notification jobs retry and survive restarts; in-process queues would lose them on a crash |
| Zustand | Stores are small (auth, roadmap, agent session, notifications); no Redux boilerplate |
| Polar (Merchant of Record) | Handles VAT and sales tax, and pays out to Armenia, which direct Stripe does not support (`docs/engineering/BILLING.md`) |
| Zod at the route boundary | Used on new routes (agent, billing, challenges, mastery). Old community routes are not backfilled |

### The hardest technical problems

1. **Agent tool-use loop with streaming.** The mentor calls backend tools (progress, exam history, weak spots, posts, library, profile) while streaming. Tool results must be interleaved into history before the next model call; the frontend SSE hook handles aborts and incremental chunks.
2. **Exam integrity.** Answer keys never leave the server: the client submits answers and the server grades. Choices are shuffled per attempt, unseen questions are served first, and attempts are limited. Honest limit: a multiple-choice exam cannot be made ChatGPT-proof (`docs/product/EXAM_INTEGRITY.md`).
3. **Server-authoritative progression.** Layer N+1 unlocks only when the exam is passed at `PASS_THRESHOLD = 80`, stored in `userProgress` server-side. The threshold is a hardcoded constant in `examEngineService.js`; the planned `platformConfig` collection was never built.
4. **Learner model.** Mastery per topic is derived from exams, teach-back and challenge results (`learnerMasteryService`, `modules/mastery`) and fed to the mentor as context, so its answers are grounded in what the learner actually struggled with.

### Planned extensions (direction, not built)

`learnerMastery` is the single evidence spine: exams, teach-back and challenge results already feed it, and the Capstone review (rubric scores 0–4 per criterion) and defense are the next evidence sources. New features should write evidence into this spine through `recomputeMastery`, not into a parallel score or progress store. Per-skill progression (e.g. "databases 6.4 → 7.3") would be a derived view over that evidence with a snapshot per recompute. Content completion and demonstrated mastery stay separate signals. See `docs/engineering/ROADMAP_BUILD_PLAN.md` ("Loop strengthening") for what is MVP, V2, future or experiment.

---

## Current layout

### Backend (`backend/`)

Since 2026-10-11 every feature is a module under `backend/modules/<name>/` with the same shape: `routes/`, `controllers/` (`<name>.controller.js`), `services/`, and where needed `schemas/` (Zod) and `lib/` (pure logic). Each module's `index.js` is its only public entry point: `app.js` mounts the router from it, and other modules import only what it exports.

Modules: account, ai-agent, analytics, auth, billing, blogs, capstone, chat, coding-challenges, contact, exams, library, mastery, notifications, profile, readiness, recruiter, roadmap, search, teams, users, voice-review.

Outside `modules/`: `services/` keeps the shared learning core that several modules read (userProgress, learnerMastery, examHistory, weakSpot, challengeResult, concept, rubric, teach-back evaluator, xp, event, cloudinaryCleanup); `middleware/`, `config/`, `utils/`, `websocket/`, `queues/` and `workers/` are infrastructure.

| Area | Where | Notes |
|---|---|---|
| App wiring | `app.js`, `server.js` | `app.js` builds the Express app (helmet, CORS, routes); `server.js` adds HTTP + WebSocket + workers |
| Auth | `modules/auth/routes/auth.routes.js`, `modules/auth/controllers/auth.controller.js`, `modules/auth/services/refreshTokenService.js` | 15-minute access tokens, 7-day rotating refresh tokens in an httpOnly cookie; Google and GitHub OAuth; Redis login throttling with `express-rate-limit` fallback |
| Community | `blogs`, `posts`, `profile`, `user`, `search`, `account` routes | Blogs can be tagged with roadmap layers (`layerIds`) |
| Roadmap | `/api/roadmaps` | Tracks and layers seeded into MongoDB; user progress is server-side |
| Exams | `/api/exams`, `modules/exams/services/examEngineService.js` | Generate, submit, teach-back, history, weak spots; integrity flags recorded per attempt |
| Mentor | `/api/ai-agent`, `modules/ai-agent/services/*`, `modules/ai-agent/services/agentTools.js` | Sessions, SSE streaming, tool loop, 20-turn window, 30 messages/day |
| Mastery | `modules/mastery` | Per-topic status and next action |
| Challenges (Arena) | `modules/coding-challenges` | Catalog, grading in an `isolated-vm` sandbox, proposals with admin review, XP-priced hints, daily submission cap |
| Capstone | `modules/capstone` | Repo review, timed technical defense, certificates, admin overrides |
| Build Teams | `modules/teams`, `/api/teams` | Built 2026-10-04, not yet run on real data. Admin-created team on one GitHub repo; merged PRs synced per member; per-member defense on their own PR diffs (reuses capstone helpers, capstone code untouched); peer ratings; public evidence snapshot at `GET /api/teams/evidence/:publicId` |
| Billing | `modules/billing` | Polar checkout, signed webhook, subscription state. **Inert** until `BILLING_ENFORCED=true` |
| Analytics | `services/eventService.js`, `modules/analytics/routes/analytics.routes.js` | 14 server-side event types and an admin-only funnel at `GET /api/admin/funnel` (signup to team defense) |
| Real time | `websocket/`, `workers/notificationWorker.js`, `queues/` | DMs and group chat; notifications via BullMQ |
| Rate limits | `middleware/aiRateLimit.js` plus per-module limiters | Per-user limits on LLM routes; in-memory store (single instance only) |

### Frontend (`src/`)

`features/` holds one folder per product area: `Roadmap`, `AI-Agent`, `coding-challenges`, `mastery`, `billing`, `blogs`, `profile`, `codingLibs`, `capstone`, `teams` (`/team` for members, public `/evidence/:publicId`), plus an unfinished `voiceReview` shell. Stores are in `stores/` (auth, roadmap, agent, notifications, profile, theme). Access tokens live in memory only; the httpOnly refresh cookie restores the session on load.

### MongoDB collections (database `DevsBlog`)

- **Community:** `users`, `usersStats`, `blogs`, `posts`, `comments`, `favouriteBlogs`, `follows`, `notifications`, `rooms`, `messages`, `contact_messages`, `usernameHistory`
- **Auth:** `refreshTokens`, `passwordResets`
- **Learning:** `roadmap_tracks`, `roadmap_layers`, `userProgress`, `exam_question_banks`, `exam_attempts`, `examHistory`, `weakSpots`, `teach_back_rubrics`, `teach_back_sessions`, `concepts`, `learnerMastery`, `mentor_teaching_log`, `libraryResources`, `savedLibraryResources`
- **Mentor:** `agent_sessions`, `agent_usage`
- **Arena:** `challenges`, `challenge_attempts`, `challengeResults`
- **Capstone:** `capstone_briefs`, `capstone_attempts`, `capstone_submissions`, `capstone_reviews`, `capstone_defenses`, `capstone_admin_actions`, `certificates`
- **Teams:** `teams`, `team_contributions`, `team_defenses`, `team_ratings`, `team_evidence`
- **Analytics:** `userEvents`

### Roadmap data model (tracks and layers)

Authored content: `src/data/roadmaps/<category>.json` is `{ [trackId]: Layer[] }`. `scripts/splitRoadmaps.js` writes one file per track to `public/roadmaps/` for the page, and `backend/seeders/roadmapSeeder.js` flattens the same JSON into `roadmap_tracks` and `roadmap_layers`. Category and track titles live in `constants/roadmapPaths.js`.

The hierarchy is category → track → ordered layers. Inside a track it is a chain by default, not a tree. The `sideLeft` / `sideRight` subtree (layer → subtopic → detail) is display only; progress, exams and mastery never read it.

**A track may have any number of layers.** Most tracks have 10 because of how they were authored, not because code requires it. As of 2026-10-16 the exceptions are `dsa` (15), `frontend-dev` (15, in the Full Stack category), `cpp` (14), `system-design` (12), `ai-agents` (12), `rust` (12), `java`, `elixir`, `smart-contract`, `unreal` and `quantum-developer` (11 each). Nothing in the seeder, `isPathComplete`, the progress map or the graph builder counts to 10. The "10 layers in a track" copy in `HowItWorks.jsx` is the only hardcoded mention. The real cost of a longer track is content: each layer needs its own exam bank (60 questions) and challenges.

Layer fields (see `docs/product/ROADMAP_LAYER_AUTHORING.md` for authoring rules):

| Field | Required | Default | Used by |
|---|---|---|---|
| `id` | yes | none | Globally unique, e.g. `cpp-10`. Today it embeds the position. See limits below |
| `order` | yes | none | Position in the track (seeder, `isPathComplete` sort) |
| `title`, `techs`, `description`, `topics`, `resources`, `challenge`, `estimatedTime` | no | empty | Page content, seeded as-is |
| `requires` | no | the previous layer (none for the first) | Roadmap tree spine (`prereqsDone`). **Display only**, see limits |
| `required` | no | `true` | `isPathComplete`: only layers where `required !== false` must be passed to unlock the capstone |
| `stage` | no | `null` | Chapter label for long tracks. Seeded; not rendered yet |

**Limits (as of 2026-10-16):**
- **Layer order is enforced when an exam attempt is generated** (2026-10-16, `assertLayerUnlocked` in `examEngineService`, pure rules in `services/layerUnlock.js`). It reads the layer's `requires` from `roadmap_layers`, or the previous layer by `order` if the document has none, and answers 403 "This layer is locked" unless the server has them done. It **fails open** for a layer missing from `roadmap_layers`, so an unseeded track is not blocked, and it only runs on `POST` generate: teach-back endpoints are not gated. Reseed after changing a track, or the gate uses stale `order`/`requires`.
- Ids are positional (`api-dev-1`). Inserting a layer in the middle would mean renaming ids, which orphans `layerProgress`, `exam_attempts`, challenges, mastery rows and blog `layerIds`. Add new layers at the end, or move to stable slug ids before authoring more content.
- `required: false` is read only by the capstone check. Percent-complete and readiness still count every layer.
- Seven tracks grew without renaming ids. New layers take the next free id (`cpp-11` to `cpp-14`, `rust-11`, `rust-12`, `java-11`, `elixir-11`, `smart-contract-11`, `unreal-11`, `quantum-developer-11`) and sit mid-track by array position and `order`. In those tracks the id number no longer matches the position; `order` and array position are the truth. Existing capstone `layerId` references stayed valid. Each track's exam prompt in `docs/exam-prompts/` was regenerated to the new layer count.
- Added layers: cpp (move semantics; compile-time C++; coroutines and modules; performance), rust (unsafe and FFI; macros), java (JVM internals), elixir (Phoenix, LiveView, Ecto), smart-contract (security and vulnerabilities), unreal (C++ gameplay framework, subsystems, delegates), quantum-developer (Cirq, PennyLane, Braket). Their reasoning is in the 2026-10-16 layer review: the existing layers only touched these topics as single bullets or not at all.
- The page reads the JSON from the frontend (`public/roadmaps/`, generated by `splitRoadmaps.js`); the backend reads `roadmap_layers`. A JSON edit shows on the page after a dev restart or build, but the backend only sees it after `node backend/seeders/roadmapSeeder.js`. Run the seeder after any layer change or the two will disagree.
- Only `cpp-10` carries `stage` and an explicit `requires` (now `cpp-14`, its new predecessor), as a worked example. Missing fields behave as the defaults.
- A capstone needs every required layer passed, so the capstones for these seven tracks now need 11 to 14 exams. No exam banks exist for the new layers yet; mark a layer `required: false` if a capstone should not wait for it.

---

## Status of the June 2026 review

| June finding | Status (2026-10-02) | Evidence |
|---|---|---|
| `useRoadmapStore` mixes state and persistence | **Partly open.** Progress is now saved through the API, but the store still calls a persistence helper itself | `stores/useRoadmapStore.js` (`persistProgress`) |
| Onboarding answers go nowhere | **Fixed** | `startPath` stores `skillLevel` |
| JWT in localStorage | **Fixed** | Access token in memory; httpOnly refresh cookie (`constants/api.js`, `modules/auth/controllers/auth.controller.js`) |
| `/api` prefix mismatch | **Decided and applied** to all new routes; legacy routes stay bare (`/blogs`, `/library`, auth) | `app.js` |
| WebSocket rooms Map never shrinks | **Fixed** | `removeFromRooms` on close (`websocket/index.js`) |
| Layer gating relied on localStorage | **Fixed**, server-authoritative | `userProgress`, `examEngineService.js` |
| No consistent error response shape | **Open.** Routes return `{ message }` or `{ error }`; no shared `formatError` or global error handler | — |
| `passedAt` sort on failed attempts | **Fixed** (`takenAt`) | `examHistoryService.js` |
| No server-state cache (React Query) | **Open.** Not adopted | `package.json` |
| `src/hooks/` nearly empty | **Open** | `src/hooks/` has two files |
| Inconsistent `features/` depth | **Open** | — |
| Empty `backend/events/` and `backend/jobs/` | **Still empty** | — |
| Two animation libraries | **Open**, not audited | GSAP and Framer Motion both installed |
| Agent on Anthropic | **Superseded:** Groq `openai/gpt-oss-120b` | `streamService.js` |
| Pass threshold in `platformConfig` | **Not built.** Constant `PASS_THRESHOLD = 80` | `examEngineService.js` |

## Known limits

- **One process.** HTTP, WebSocket and the BullMQ worker share one instance; the WebSocket `rooms` map and the rate-limit counters are in memory. Pin to one instance, or move counters to Redis before scaling out.
- **Funnel query loads the whole signup cohort into memory** (`getFunnel`). Fine for a pilot; use an aggregation pipeline before thousands of users.
- **The Arena executes submitted code** inside an `isolated-vm` isolate. In production it fails closed (submissions refused) if that native addon did not build, unless `ALLOW_UNSAFE_RUNNER=true`. The isolate has not had an independent security review (see `docs/engineering/SECURITY.md`).
- **Rate limits are per process,** so a restart resets them.

## Open fixes, in priority order

| # | Fix | Why |
|---|---|---|
| 1 | Sanitize challenge HTML before `dangerouslySetInnerHTML` (`renderInlineCode`) | Challenge content now comes from the database and community proposals, so it is a stored-XSS sink |
| 2 | Verify the runner reports `isolated-vm` in production and get the isolate reviewed before public traffic | Biggest attack surface |
| 3 | Shared error handler and response shape | New contributors keep adding inconsistent shapes |
| 4 | Move rate-limit counters to Redis | Needed before more than one instance |
| 5 | Move `PASS_THRESHOLD` and the mentor caps into config | Tune without a deploy |
| 6 | React Query for server state | Removes refetch-on-navigation |
