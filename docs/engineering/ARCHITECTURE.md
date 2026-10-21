# Vahoha: Architecture

> **Updated:** 2026-10-21. Checked against the code, not against older docs.
> "Built" means the code exists and is mounted. It does not mean tested with real users.

**Contents**

1. [What it is](#1-what-it-is)
2. [Stack and why](#2-stack-and-why)
3. [Backend layout](#3-backend-layout)
4. [Frontend layout](#4-frontend-layout)
5. [Database collections](#5-database-collections)
6. [Roadmap data model](#6-roadmap-data-model)
7. [Hard technical problems](#7-hard-technical-problems)
8. [Known limits](#8-known-limits)
9. [Open fixes](#9-open-fixes-in-priority-order)
10. [Status of the June 2026 review](#10-status-of-the-june-2026-review)

---

## 1. What it is

**Problem:** developer learning is fragmented. You watch a tutorial, read an article, solve a puzzle, and nothing checks that you understood it.

**Who for:** self-taught and early-career developers.

**The bet:** *gated, measurable progression* is worth more than more content.

**The core loop:**

```
Pick a path -> learn a layer -> take the layer test
   PASS -> next layer unlocks
   FAIL -> weak spots saved -> ask the AI mentor -> review -> retry
```

Around that loop sit coding challenges, labs, capstones (a repo review plus a timed defense), Build Teams, a library, and a community (blogs, chat).

---

## 2. Stack and why

One Express 5 process (HTTP + WebSocket + queue worker), MongoDB, Redis. Backend on Render, frontend on Vercel, database on Atlas.

| Choice | Why |
|---|---|
| MongoDB native driver, no Mongoose | Document-shaped data (layers, attempts, weak spots). Queries stay close to the data |
| Groq `openai/gpt-oss-120b` for the mentor | Free tier, and a solo pre-revenue project is cost-bound. `MODEL` lives in `modules/ai-agent/services/streamService.js`. Groq retires models, so a 404 means check `/models` first |
| BullMQ + Redis | Notification jobs survive restarts and retry |
| Zustand | Small stores (auth, roadmap, agent, notifications, profile, theme). No Redux boilerplate |
| Zod at the route boundary | Used through a `validate` middleware on newer routes. Old community routes are not backfilled |
| Polar (merchant of record) | Handles VAT and sales tax, and pays out to Armenia, which direct Stripe does not (`BILLING.md`) |
| `isolated-vm` sandbox | Grades submitted challenge code in the server process (see [limits](#8-known-limits)) |

---

## 3. Backend layout

Every feature is a module in `backend/modules/<name>/` with the same shape:

```
routes/  controllers/  services/  schemas/ (Zod)  lib/ (pure logic)  index.js
```

`index.js` is the module's only public entry point. `app.js` mounts routers from it. Other modules should import only what it exports. A few deep imports still exist (teams to capstone, account to billing, chat to profile). Treat them as cleanup, not as a pattern.

**23 modules:** account, ai-agent, analytics, auth, billing, blogs, capstone, chat, coding-challenges, contact, exams, library, mastery, notifications, onboarding, profile, readiness, recruiter, roadmap, search, teams, users, voice-review.

**Outside `modules/`:**

| Folder | What is in it |
|---|---|
| `services/` | Shared learning core: user progress, layer progress and unlock, mastery, exam history, weak spots, challenge results, concepts, rubrics, teach-back evaluator, XP ledger, events, Cloudinary cleanup. Feature modules may use it. It must not import from them |
| `middleware/` | `authenticate`, `requireAdmin`, `validate`, `aiRateLimit`, `notFound` |
| `websocket/`, `queues/`, `workers/` | Chat sockets, notification queue and worker |
| `config/`, `utils/` | Redis, JWT, and other infrastructure |
| `seeders/`, `scripts/` | Seeders, importers, admin and maintenance scripts |

### What each area does

| Area | Where | Notes |
|---|---|---|
| App wiring | `app.js`, `server.js` | `app.js` builds the Express app (helmet, CORS, routes). `server.js` adds HTTP, WebSocket and workers |
| Auth | `modules/auth` | 15-minute access token. Refresh token valid for **30 idle days**, rotating, in an httpOnly cookie, renewed before expiry. Google and GitHub OAuth, password reset, magic-link sign-in. Redis login throttling with an `express-rate-limit` fallback |
| Roadmap | `modules/roadmap`, `/api/roadmaps` | Tracks and layers seeded into MongoDB. Progress is server-side and auto-tracked (open, finish, test pass), never manual ticks |
| Exams | `modules/exams`, `/api/exams` | Generate, submit, teach-back, history, weak spots, per-attempt integrity flags. Layer order is enforced on generate |
| Mentor | `modules/ai-agent`, `/api/ai-agent` | Sessions, SSE streaming, tool loop, 20-turn window, 30 messages a day |
| Mastery | `modules/mastery` | Per-topic status and next action |
| Challenges (Arena) | `modules/coding-challenges` | Catalog, `isolated-vm` grading, JS and TypeScript, proposals with admin review, XP-priced hints, daily submission cap |
| Capstone | `modules/capstone` | Repo review (repo must belong to the learner's GitHub login), timed defense, certificates, admin overrides. AI review is sized to the Groq token limit (`lib/tokenBudget.js`) |
| Build Teams | `modules/teams`, `/api/teams` | Admin-created team on one GitHub repo, merged PRs synced per member, per-member defense, peer ratings, public evidence at `GET /api/teams/evidence/:publicId`. Admin page exists. **Never run end to end with a real team** |
| Recruiter, readiness | `modules/recruiter`, `modules/readiness` | Opt-in public scorecard, closed candidates list, private "job readiness" at `GET /api/readiness/me` |
| Onboarding | `modules/onboarding` | Onboarding answers and learner setup |
| Billing | `modules/billing` | Polar checkout, signed webhook, subscription state. **Inert** until `BILLING_ENFORCED=true` |
| Analytics | `services/eventService.js`, `modules/analytics` | 14 event types and an admin-only funnel at `GET /api/admin/funnel` |
| Real time | `websocket/`, `workers/`, `queues/` | DMs, group chat, message requests, voice notes. Notifications via BullMQ (delivered without Redis too) |
| Rate limits | `middleware/aiRateLimit.js` plus per-module limiters | Per-user limits on LLM routes, in-memory store |

**The 14 event types:** `signup`, `path_selected`, `exam_started`, `exam_submitted`, `mentor_message`, `teach_back`, `active_day`, `capstone_started`, `capstone_submitted`, `capstone_passed`, `capstone_failed`, `challenge_solved`, `team_defense_passed`, `team_evidence_issued`.

---

## 4. Frontend layout

`src/features/<name>/` is one folder per product area, with `pages/`, `components/`, `hooks/`, `lib/` as needed. `src/router.jsx` lazy-loads pages.

| Group | Features |
|---|---|
| Learning | `roadmap`, `learn` (step-by-step lessons with a live code panel), `foundations`, `labs`, `coding-challenges`, `mastery`, `coding-libs` |
| Proof | `capstone`, `teams` (`/team`, public `/evidence/:publicId`), `recruiter` |
| AI | `ai-agent`, `voice-exam`, `voice-review` (unfinished shell) |
| People | `profile` (profile, settings, notifications, blog editor, public profile), `chat`, `connections` (followers), `blogs` |
| Money | `billing` |

- **Standalone pages** (Home, About, Contact, Privacy, Terms, GetStarted, password pages) live in `src/pages/`.
- **Shared code:** `src/hooks`, `src/lib`, `src/components/ui`.
- **Stores** are in `stores/`. Access tokens live in memory only. The httpOnly refresh cookie restores the session on load.
- **Teams UI** uses the scoped theme `features/teams/teams-theme.css` (`.teams-theme`, `t-*` classes).
- **Build:** Vite plus an SSR prerender pass (`src/entry-prerender.jsx`, `scripts/seoPostBuild.js`).

---

## 5. Database collections

Database name: `DevsBlog`. This list is built from `collection("...")` calls in the backend.

| Group | Collections |
|---|---|
| Community | `users`, `usersStats`, `blogs`, `comments`, `favouriteBlogs`, `follows`, `blocks`, `notifications`, `rooms`, `messages`, `contact_messages`, `usernameHistory` |
| Auth | `refreshTokens`, `passwordResets`, `loginLinks` |
| Learning | `roadmap_tracks`, `roadmap_layers`, `userProgress`, `exam_question_banks`, `exam_attempts`, `examHistory`, `weakSpots`, `teach_back_rubrics`, `teach_back_sessions`, `concepts`, `learnerMastery`, `mentor_teaching_log`, `libraryResources`, `savedLibraryResources` |
| Mentor | `agent_sessions`, `agent_usage` |
| Arena | `challenges`, `challenge_attempts`, `challengeResults` |
| Capstone | `capstone_briefs`, `capstone_attempts`, `capstone_submissions`, `capstone_reviews`, `capstone_defenses`, `capstone_admin_actions`, `certificates` |
| Teams | `teams`, `team_contributions`, `team_defenses`, `team_ratings`, `team_evidence` |
| Billing | `subscriptions` |
| Analytics, XP | `userEvents`, `xpAwards` |

XP awards are stored in `xpAwards` (the ledger behind `awardXp`). The old `posts` collection is gone from the backend; `blogs` replaced it.

---

## 6. Roadmap data model

### Where the data lives

```
src/data/roadmaps/<category>.json      authored: { [trackId]: Layer[] }
   |-- scripts/splitRoadmaps.js  ->  public/roadmaps/<category>/   (the page reads these)
   `-- backend/seeders/roadmapSeeder.js -> roadmap_tracks + roadmap_layers  (the backend reads these)
```

Category and track titles live in `constants/roadmapPaths.js`.

**After any layer change, run `npm run seed:roadmap`.** A JSON edit shows on the page after a restart or build, but the backend only sees it after the seeder runs. Otherwise the two disagree.

### Shape

Category, then track, then ordered layers. Inside a track it is a chain by default. The `sideLeft` / `sideRight` subtree (layer, subtopic, detail) is display only. Progress, exams and mastery never read it.

**A track can have any number of layers.** Most have 10 because of how they were authored. Exceptions as of 2026-10-16: `dsa` 15, `frontend-dev` 15, `cpp` 14, `system-design` 12, `ai-agents` 12, `rust` 12, and 11 each for `java`, `elixir`, `smart-contract`, `unreal`, `quantum-developer`. The only hardcoded "10 layers" is copy in `HowItWorks.jsx`. The real cost of a longer track is content: each layer needs a 60-question exam bank and challenges.

### Layer fields

Authoring rules are in `docs/product/ROADMAP_LAYER_AUTHORING.md`.

| Field | Required | Default | Used by |
|---|---|---|---|
| `id` | yes | none | Globally unique, e.g. `cpp-10`. Positional today (see limits) |
| `order` | yes | none | Position in the track (seeder, `isPathComplete`) |
| `title`, `techs`, `description`, `topics`, `resources`, `challenge`, `estimatedTime` | no | empty | Page content, seeded as-is |
| `requires` | no | previous layer | Exam unlock gate and the tree spine |
| `required` | no | `true` | `isPathComplete`: only layers with `required !== false` must pass to unlock the capstone |
| `stage` | no | `null` | Chapter label for long tracks. Seeded, not rendered yet |

### Limits

- **Layer order is enforced when an exam attempt is generated** (`assertLayerUnlocked` in `examEngineService`, rules in `services/layerUnlock.js`). It answers 403 "This layer is locked" unless the previous layer is done. It **fails open** for a layer missing from `roadmap_layers`, and it runs only on generate, so teach-back endpoints are not gated. Reseed after changing a track or the gate uses stale data.
- **Ids are positional** (`api-dev-1`). Inserting a layer mid-track means renaming ids, which orphans `layerProgress`, `exam_attempts`, challenges, mastery rows and blog `layerIds`. Add new layers at the end, or move to stable slug ids before authoring more.
- **Seven tracks grew without renaming ids.** New layers took the next free id (`cpp-11` to `cpp-14`, `rust-11`, `rust-12`, `java-11`, `elixir-11`, `smart-contract-11`, `unreal-11`, `quantum-developer-11`) and sit mid-track by `order`. In those tracks, `order` and array position are the truth, not the id number.
- **`required: false` is read only by the capstone check.** Percent-complete and readiness still count every layer.
- **Capstones wait on exams.** A capstone needs every required layer passed, so those seven tracks now need 11 to 14 exams, and no banks exist yet for the new layers. Mark a layer `required: false` if a capstone should not wait for it.
- `cpp-10` carries `stage` and an explicit `requires` as a worked example.

---

## 7. Hard technical problems

1. **Agent tool loop with streaming.** The mentor calls backend tools (progress, exam history, weak spots, posts, library, profile) while it streams. Tool results go into history before the next model call. The frontend SSE hook handles aborts and incremental chunks.
2. **Exam integrity.** Answer keys never leave the server. Choices are shuffled per attempt, unseen questions are served first, a 30-minute cooldown follows a failed attempt, and tab-switch and paste flags are recorded for review. Honest limit: a multiple-choice exam cannot be made ChatGPT-proof (`docs/product/EXAM_INTEGRITY.md`).
3. **Server-authoritative progression.** Layer N+1 unlocks only when the exam is passed at the threshold in `constants/exam.js` (`EXAM_RULES`), stored in `userProgress`. Nothing trusts the client.
4. **One learner model.** `learnerMastery` is the single evidence spine. Exams, teach-back and challenge results feed it, and capstone review and defense are the next sources. New features write evidence through `recomputeMastery`, not into a parallel score. Content completion and demonstrated mastery stay separate signals. See `ROADMAP_BUILD_PLAN.md` for MVP, V2 and future items.
5. **One XP ledger.** All XP goes through `awardXp` (`services/xpService.js`). Never write XP directly.

---

## 8. Known limits

| Limit | Impact | Fix |
|---|---|---|
| **One process.** HTTP, WebSocket and the BullMQ worker share an instance. The WebSocket `rooms` map is in memory | Pin to one instance | Move shared state to Redis before scaling out |
| **Rate-limit counters are in memory** (`aiRateLimit.js`) | A restart resets them. Not shared across instances | Redis store |
| **Funnel loads the whole cohort into memory** (`getFunnel`) | Fine for a pilot | Aggregation pipeline before thousands of users |
| **Arena runs submitted code in `isolated-vm`.** In production it fails closed if the addon did not build, unless `ALLOW_UNSAFE_RUNNER=true`. The Judge0 runner was reverted (2026-10-19) | The isolate has had no independent review (`SECURITY.md`) | Verify the runner in production, get it reviewed |
| **Free Render plan sleeps** after about 15 idle minutes | First request is slow, chat sockets drop | Paid instance before a real pilot |

---

## 9. Open fixes, in priority order

| # | Fix | Why |
|---|---|---|
| 1 | Verify the runner reports `isolated-vm` in production and get the isolate reviewed | Biggest attack surface |
| 2 | Shared error handler and response shape (`NotFoundError`, `ValidationError`, one middleware) | There is only `notFound`. Routes return `{ message }` or `{ error }` |
| 3 | Rate-limit counters to Redis | Needed before more than one instance |
| 4 | Mentor daily cap and other tunables into config | `EXAM_RULES` is already in `constants/exam.js`. The mentor caps are not |
| 5 | Repository layer and enforced layer rules | Post-deploy plan A1 to A7 in `docs/PILOT_STATUS.md` |

Closed since the last version of this doc:

- Challenge HTML sink: `renderInlineCode` no longer exists, and `src/utils/sanitize.js` is in place. The only `dangerouslySetInnerHTML` left is in `ThinkingSpinner.jsx`.
- Pass threshold is configured in `constants/exam.js`.

---

## 10. Status of the June 2026 review

| June finding | Status | Evidence |
|---|---|---|
| `useRoadmapStore` mixes state and persistence | **Partly open** | `stores/useRoadmapStore.js` still calls `persistProgress` |
| Onboarding answers go nowhere | **Fixed** | `modules/onboarding`, `startPath` stores `skillLevel` |
| JWT in localStorage | **Fixed** | Access token in memory, httpOnly refresh cookie |
| `/api` prefix mismatch | **Decided** | New routes use `/api`. Legacy routes stay bare (`/blogs`, `/library`, auth) |
| WebSocket rooms map never shrinks | **Fixed** | `removeFromRooms` on close |
| Layer gating relied on localStorage | **Fixed** | `userProgress`, `examEngineService.js` |
| No consistent error response shape | **Open** | See fix 2 above |
| `passedAt` sort on failed attempts | **Fixed** | `takenAt` |
| No server-state cache (React Query) | **Open, by choice** | Plain `fetch` hooks |
| `src/hooks/` nearly empty | **Open** | Still a few files |
| Empty `backend/events/` and `backend/jobs/` | **Still empty** | Delete them |
| Two animation libraries | **Narrowed** | GSAP is gone. `motion` and `framer-motion` are both installed: pick one |
| Agent on Anthropic | **Superseded** | Groq `openai/gpt-oss-120b` |
| Pass threshold in `platformConfig` | **Superseded** | Constant in `constants/exam.js`, no DB collection |
