# Pilot Status

> Updated: 2026-11-09 · The one status doc: what each feature does today, what is done, what is left before the first user, and what comes after. When this disagrees with the code, the code wins.

The technical prep for the pilot is mostly done. What's left is mostly yours: content review, setup, and talking to users. Nothing below has been used by a real user yet.

## Feature status

**Live** = works end to end in code. **Partial** = works with gaps. **Prototype** = UI or mock only.

### Learning core

| Area | Route | Backend | Status | Gaps |
|---|---|---|---|---|
| Roadmaps (15 categories) | `/roadmaps` | `roadmap` | Live | Layer order enforced server-side; layers without seeded data fail open |
| Layer test (MCQ) | `/roadmaps/exam/:layerId` | `exams` | Live | 15 of up to 60 questions, pass 80, 3/day, 30-min cooldown. Banks need re-seeding and a hand check. See `product/EXAM_INTEGRITY.md` |
| Lessons (step player) | `/learn/:track/:layer/:topic` | none (localStorage) | Partial | 2 draft lessons, MERN layer 2 only. Progress not saved server-side |
| Labs | `/labs`, `/labs/:room` | none yet | Partial | 1 lab (closures) with real grading in the worker. `product/LAB_SYSTEM.md` |
| Foundations | `/labs/foundations` | none | Live | Free guest lessons, 3 written (command line, how computers work, version control) |
| Coding challenges | `/coding-challenges` | `coding-challenges` | Partial | 205 challenges, JS/TS. Sandbox-breaking ones rewritten 2026-11-04, not yet seeded (item 15). Judge0 runner reverted |
| Mentor | `/mentor` | `mentor` | Live | 30 messages/day for all; Pro is not higher in code. Groq free tier rate-limits |
| Teach-back (text, dictation) | inside mentor and tests | `exams` | Partial | Few rubrics. Not calibrated against humans |
| Mastery | `/progress` | `mastery` | Live | Detail view is a Pro gate, inert |
| XP | profile, arena | `services/xpService.js` | Live | One ledger. `product/XP_SYSTEM.md` |
| Job readiness (5 areas) | `/progress` | `readiness` | Live, private | Shows "none" until a capstone or team exists |

### Proof

| Area | Route | Backend | Status | Gaps |
|---|---|---|---|---|
| Capstone (brief, repo, AI review, timed defense) | `/capstone/:trackId` | `capstone` | Live | 17 published, 18 drafts, 141 waiting on question banks. Needs the production GitHub OAuth app and Groq paid tier |
| Public certificate / verify page | `/verify/:publicId` | `capstone` | Live | Plan gate inert |
| Build Teams | `/team`, `/evidence/:publicId` | `teams` | Partial | Built, never run with a real team. Manual matching by admin |
| Recruiter scorecard | `/candidate/:username`, `/candidates` | `recruiter` | Partial | Opt-in; candidates list closed to recruiters |
| Project Map | `/project-map`, `/map/:publicId` | `system-map` | Partial | AI parts tested with mocks only (item 12) |
| Voice exam | `/voice-exam/:layerId` | none | Prototype | Mock API, one layer. Frozen |
| Voice review | `/voice-review` | scaffold | Prototype | Empty |

### Community and account

| Area | Route | Status | Gaps |
|---|---|---|---|
| Blogs (tagged to layers) | `/blogs`, `/add-blog` | Live | Blog SEO prerender postponed |
| Library | `/libs` | Live | |
| Profiles, followers, chat, notifications | `/users/:username`, `/chats` | Live | |
| Auth (email, Google, GitHub, magic link) | `/get-started` | Partial | Real email sending not set up, so reset and magic link don't reach users (item 10) |
| Billing (Polar) | `/pricing`, `/billing` | Partial | Not enforced (`BILLING_ENFORCED=false`). Checkout tested against a fake Polar in CI; a real sandbox checkout is unconfirmed |
| Admin (funnel, capstone, team) | `/capstone/admin`, `/team/admin` | Live | Admin-only; non-admins see 404 |

## User flows

Events come from `backend/services/eventService.js`. Use them to find where users drop.

**1. First session (the pilot loop)**

| Step | Where | Event |
|---|---|---|
| Sign up | `/get-started` | `signup` |
| Pick a path | `/roadmaps` | `path_selected` |
| Study a layer | `/learn/:track/:layer` (lessons, library, posts for the layer) | none |
| Ask the mentor | `/mentor` | `mentor_message` |
| Take the layer test | `/roadmaps/exam/:layerId` | `exam_started`, `exam_submitted` |
| Pass (80+) | next layer unlocks, XP awarded once per layer | none |
| Fail | weak topics recorded, 30-min cooldown, mentor suggests review, retry (3 per day) | none |
| Come back | any later visit | `active_day` |

Success: a stranger completes this in one sitting and returns within 7 days (`founder/metrics.md`).

**2. Practice.** Solve a challenge in JS or TS; hidden tests run in a browser worker or on the server; the first solve gives XP (`challenge_solved`). Hints cost XP. 30 graded submissions a day on Free.

**3. Proof (capstone).** Read the brief and connect GitHub (`capstone_started`), submit a repo owned by your GitHub login (`capstone_submitted`), get an AI repo review (3 attempts), then a timed typed defense about your own code; a failed session waits 72 hours (`capstone_passed` / `capstone_failed`). A pass gives a public certificate and 300 XP.

**4. Team evidence.** An admin places a capstone passer in a team; merged PRs sync; each member defends their own PRs (`team_defense_passed`, 300 XP); peers rate; evidence is issued with consent (`team_evidence_issued`). Never run with real people.

**5. Recruiter view.** The learner opts in, a public scorecard appears at `/candidate/:username`, recruiters browse `/candidates`.

Open: walk a failed test on production to check the copy and next action; decide how a user learns Teams exists before passing a capstone.

## Done

| Item | Commit | Notes |
| --- | --- | --- |
| Exam cooldown back on | `3c4a6f7` | 30 min after a failed attempt |
| Unseen questions served first; seeder tops banks up to 60 | `3c4a6f7` | No effect until the banks are re-seeded (below) |
| Tab-switch and paste flags on exam attempts | `3c4a6f7` | Review only, never graded |
| Rate limits on LLM routes | `1a8c5d2` | 10/min per user on mentor and teach-back; 40/day on teach-back |
| helmet mounted | `1a8c5d2` | After `/api-docs` (Swagger needs inline scripts) |
| JWT tamper tests actually run | `1a8c5d2` | Were erroring on a bad import; now pass |
| Event tracking (7 events) + admin funnel | `c89aadf` | `GET /api/admin/funnel?days=30` |
| Blog posts tagged with roadmap layers; "Posts for this layer" in the layer drawer | `39d6023` | `layerIds` on posts, `GET /blogs?layer=<id>`, layer picker in the blog editors. SEO for the blog (pre-rendering) deliberately left until after the pilot |
| Readiness wired to real data; mentor sees team work | `a508356` | `GET /api/readiness/me` + "Job readiness" card on `/progress`. Capstone and teams each expose one function (`getCapstoneEvidence`, `getMemberStats`); recruiter no longer reads teams collections directly. Private only, not on the scorecard. Shows "none" until a real team exists |
| Funnel follows the proof pipeline | `a508356` | New events `challenge_solved` (first solve), `team_defense_passed`, `team_evidence_issued` (first issue, one per member). `GET /api/admin/funnel` adds `solvedChallenge`, `passedCapstone`, `passedTeamDefense` |
| Unique accounts under concurrent signups | 2026-10-11 | Unique indexes on `users.username` and `users.email` (strings only; GitHub users may have none). Signup, Google and GitHub account creation retry with the next free username on a race; a racing duplicate email gets 409. Index creation at startup is non-fatal (logged). Atlas checked read-only first: 13 users, 0 duplicates |
| Backend modules | 2026-10-11 | Every feature under `backend/modules/<name>/` with one `index.js` entry point; `services/` keeps the shared learning core. All suites pass and a real boot answers all 21 sampled endpoints exactly as before |
| All XP through one ledger | `a508356` | Challenge XP now uses `awardXp` (kind `challenge`, same amounts); fixes double pay when two passing submissions race. New: 300 XP for the first passed defense per team (kind `team_defense`). Test: `challengeXp.integration.test.js` |
| Capstone → Teams pointer; challenge "readiness" renamed | `a508356` | `NextTeamCard` after a passed capstone. `getReadinessService` → `getLayerProgressService` in coding-challenges (URL unchanged) |
| Optional layer fields: `requires`, `required`, `stage` | `2c584cd` | Wired through seeder, `isPathComplete` (skips `required: false`) and the roadmap tree spine; example on `cpp-10`. Tests: `pathCompletion.unit.test.js`, `layerPrereqs.test.js`. Layer order is now enforced server-side when an exam attempt is generated (`assertLayerUnlocked`, 403; fails open for unseeded layers). See ARCHITECTURE "Roadmap data model" |
| Frontend exam banks written, not imported | `2c584cd` | 15 layers x 60 questions in `docs/exam-prompts/fullstack/frontend-dev-output.md`. `examImport.js --dry-run` passes: 900 valid, 0 duplicates, no length-bias warning. **Every answer key still needs your hand check** (about 900 questions), then `node backend/seeders/examImport.js frontend-dev` writes them to Atlas as `reviewed: false`. Other new tracks have no banks yet |
| TypeScript mode for coding challenges | `2c584cd` | JS/TS switch in the Arena (remembered in localStorage). The TS file is the JS starter plus a type header; types are removed with `sucrase` (browser: loaded on demand in the test worker; server: before grading), not checked. `POST /api/challenges/submissions/:id` takes `{ language }`. Needs `worker.format: es` in `vite.config.js`. All 205 reference solutions pass through the TS path |
| mern challenges complete, web-game complete | `2c584cd` | 50 each (5 per layer). Three old mern challenges that used timers were rewritten. The 21 api-dev / node-dev / javascript challenges that used timers, `Buffer` or `require` in their hidden tests were rewritten on 2026-11-04 so they run in the production sandbox (no timers: tests use a microtask `sleep` or an injected `setTimer`/`clearTimer` fake; `parse-multipart-form-data` now takes a `Uint8Array`). Checked by running every reference solution in a bare `node:vm` context, not with `npm run challenges:verify` (that needs `.solution.txt` files that do not exist). The in-browser runner gained `toThrow`, `toContain`, `toBeCloseTo` and `toBeLessThan` the same day (16 challenges used them in visible tests and showed a red test for a correct solution). **Still to do:** run `npm run seed:challenges` so the rewritten challenges reach Atlas |
| Security audit fixes H1-H4, M1, M3, M6 | 2026-10-13, 2026-10-20 | Route that accepted client exam scores deleted; grader harness hardened; chat room squatting closed; upload magic-byte check; password hash no longer sent in the profile response; OAuth sign-in can't take over an unverified account (`claimVerifiedEmail`); capstone repo must belong to the learner's GitHub login. M2 (OAuth state now bound to the browser by a cookie) and some Lows (draft posts by id, mutual-followers email, client `postsCount`, `/api-docs` in production) fixed 2026-11-04. Open: M4, M5, M7 (original audit text not in the repo, to be re-identified), remaining Lows. See memory `security-audit-2026-10-12` |
| Sessions last 30 idle days, renewed before expiry | `bb06978`, `9a714b0` | A session that can't renew drops the user instead of failing silently |
| Auto-tracked roadmap progress, Labs building, step-by-step lessons | `c0d6b09`, `6dac87b` | Progress comes from open / finish / test pass, never manual ticks. Lesson status is in localStorage until the server-side progress stage. Docs: `docs/product/LEARNING_SYSTEM.md`, `docs/product/LAB_SYSTEM.md` |
| Capstone AI review fits the Groq token limit | `3f9b15c` | `capstone/lib/tokenBudget.js`; `GROQ_TPM_LIMIT` is a local-only workaround for the free tier (see `docs/engineering/BILLING.md`) |
| Magic-link sign-in API | `a2d1973` | Needs real email sending (item 10 below) |
| Chat message requests for people who are not mutual followers | `9b36d75` | |
| Recruiter candidates list with a published evidence score | `8a60ebb` | Closed: recruiters only |
| Judge0 runner for stdio-language challenges | `6ac55a8`, `6739629` | Reverted: kept out of production for now |
| Exam bank builder without length bias; `--only-banked` capstone seeding | `2b2c4dd`, `f6d2c0b` | 17 capstones published, 18 drafts, 141 waiting on question banks. Backend banks written by agents showed length bias: do not import them. Next: build banks per category with `scripts/buildExamBank.js`, hand-check keys, import |
| Foundations is a Labs room; first system lab | `18a5a50` | `/labs/foundations` (old `/foundations` URLs redirect permanently via `vercel.json`, sitemap and footer updated). System lab `/labs/foundations/lab/url-shortener-1`: restart a URL shortener and watch the canvas replay what the code did. Only stage 1 of the 6-stage URL-shortener thread exists |
| Project Map: draw, save, share, scan, check | `ec1c062`, `a9f4e92`, `07195cf`, `18a5a50` | `/project-map` (free canvas, 5 lenses, guests save in the browser, accounts on the server), public read-only `/map/:publicId` (new link each share, noindex), capstone and team maps (`/project-map/for/<capstone\|team>/<id>`), repo scan with file evidence, three AI questions about your own map, drift banner after a team PR sync, maps on team evidence and candidate scorecards. Team maps are never public on their own: only through the admin-issued evidence snapshot. Backend: `backend/modules/system-map/`, collections `system_maps` and `system_map_checks`. Not done: defense questions from the map, layers link, a "my maps" hub |
| Rate limits on cheap-to-spam routes; WebSocket flood and size control | 2026-11-04 | `middleware/rateLimits.js`: public map viewer 60/min per IP, challenge submit 10/min, comments 20/min, new posts 30/h, edits 120/h, like/save/follow toggles 120/min (per user, IP when there is no valid token). WebSocket: 20 messages per 10 s per connection (closed after 5 refusals) and a 16 KB frame cap (the `ws` default is 100 MiB), plus the missing `error` listener that a too-big frame would have crashed the process through. Since 2026-11-04: public reads (`/search/users` 90/min per IP; `/blogs`, `/library`, `/users/:username` 120/min per IP, one shared counter), exam generate 10/min and submit 20/min per user, and Project Map create/edit/share/delete 60/min per user (these limiters are off under Vitest). **Still open:** Redis-backed counters before running more than one instance (all limiters are in-memory, per process) |
| Caching: server TTL cache, public list headers, frontend stale-while-revalidate | 2026-10-28 | `backend/utils/ttlCache.js` (one load for simultaneous misses, failures never cached, size cap, off under Vitest). Server-cached: roadmap layers and tracks 10 min, leaderboard 60 s (cleared on a passing solve), admin funnel 5 min, recruiter candidate pool 60 s (opt-outs re-checked on every request), library 5 min, public blog list 30 s (cleared on writes), challenge catalogue 60 s, daily challenge until UTC midnight. `Cache-Control` only on public `GET /library`, `/library/counts` and `/blogs`. Deliberately NOT cached: anything per user, text search, access gates (capstone eligibility, exam unlock), public map and certificate links (kill switches). Frontend: `src/lib/queryCache.js` + `useCachedResource`, cleared on logout and user change, invalidated centrally in `apiFetch` after any successful write; notifications socket backs off 3 s to 60 s; `/roadmaps/*.json` cached 1 h in `vercel.json`. Per process, so fine on one instance |
| App-wide per-IP rate limit | 2026-10-30 | `globalIpLimiter` in `middleware/rateLimits.js`, mounted in `app.js` before body parsing: 300 requests/min per client IP across every route, 429 with `RateLimit` headers. Skips CORS preflights and the Polar webhook; `/healthz` is answered before Express; off under Vitest. Ceiling is high on purpose (schools and offices share an IP). Same limits as the rest: in memory, per process. Test: `globalIpLimiter.unit.test.js` |
| Auth abuse limits: per account + per IP, escalating lockout | 2026-10-30 | `utils/attemptLimiter.js` (Redis Lua, atomic; in-process fallback when Redis is off, slow or erroring, so it never fails closed) and `middleware/authThrottle.js`. Login counts wrong passwords in three scopes: account+IP 5 per 15 min (the tight one, so a stranger can't lock the owner out from another network), IP 20, account 30 per hour. Each lock doubles when failures resume soon after it ends (15 min up to 6 h; account scope up to 1 h). A correct login clears only the account+IP counter, so an attacker can't reset their IP budget with an account of their own. Reset and sign-in emails are capped at 3 and 5 an hour per address, answered identically past the cap. Fixed: the old code keyed on the client-sent `X-Forwarded-For`, so a script could pick a new IP per attempt. Tests: `attemptLimiter.unit.test.js`, `authThrottle.contract.test.js`. **Known trade-off:** 30 wrong passwords from anywhere still lock the account for up to an hour |
| Configuration checked at startup, explicit client settings | 2026-10-28 | `backend/config/env.js` lists every backend variable once (kept in sync with `render.yaml` by tests) and `bootEnv.js` validates before anything connects, reporting every problem together without echoing values. Refuses to start for: bad or missing `MONGO_URI`, missing or identical JWT secrets; in production a non-https `FRONTEND_URL`, `ALLOW_UNSAFE_RUNNER=true`; billing enforced without the three Polar keys. Missing Groq, email, GitHub, Google, Cloudinary or Redis settings only log "feature off: reason". `.env` files load from absolute paths. Mongo timeouts and pool (10 s, 20), Redis error listener and capped retries (a Redis error used to be an unhandled event), Groq 90 s / 2 retries, `/healthz` reports Redis without failing on it, no localhost CORS fallback in production. Frontend: the production build fails fast if `VITE_API_BASE_URL` (https) or `VITE_WS_URL` (wss) is missing or malformed (`scripts/checkViteEnv.js`, `docs/engineering/FRONTEND_ENV.md`) |
| Groq gate: one shared budget for every AI call | 2026-11-04 | `services/groqGate.js` (pure) and `services/groqChat.js` (the wrapper). Token bucket sized by `GROQ_GATE_TPM`, a cap of `GROQ_GATE_CONCURRENCY` calls in flight (a stream counts until its last chunk), priority continuation > interactive > background, and a pause for Groq's `retry-after` after a 429. A call that can't start in time fails with "busy" (mentor: 10 s, or 20 s for a follow-up round after tools; titles: skipped at once). The turn isn't saved or counted against the daily cap. Usage reported by Groq corrects the estimate. **Every AI call now goes through it**: mentor, chat titles, teams, teach-back, capstone review and defense, scan labels and map questions. Teach-back, review and map questions wait up to 10 s (the teach-back follow-up 20 s); scan labels are skipped at once. A busy answer is a 503 that is not saved and does not use up the daily teach-back or map-question allowance. Set `GROQ_GATE_TPM` on Render to your tier's limit, otherwise only the concurrency cap and the 429 pause apply. Tests: `groqGate.unit.test.js`, `groqChat.unit.test.js` |

## Left before the first user

| # | Item | Owner | How |
| --- | --- | --- | --- |
| 1 | Re-seed exam banks for **one track, Layers 1–3** | You | Set `layers: [...]` in `SEED_CONFIG` (`examSeeder.js`), run the seeder |
| 2 | Hand-check every question marked `reviewed: false` | You | About 135 questions. A wrong answer key on a gated exam destroys trust |
| 3 | Make yourself admin so you can read the funnel | You | `npm run admin:grant -- you@example.com` |
| 4 | ~~Pick one product name~~ | Done | Vahoha. README, VISION and strategy docs updated 2026-10-02 |
| 5 | ~~Remove "AI-proctored" and "hard to fake" claims~~ | Done | `VISION.md` now says "defended", not "verified" (see `docs/product/EXAM_INTEGRITY.md`) |
| 6 | Confirm Redis is on in production | You | Auth rate-limit counters depend on it |
| 7 | Check Groq limits for about 10 concurrent users | You | Move to the paid tier if the free tier rate-limits |
| 8 | Create the $15 one-off product in Polar | You | For the payment test in `docs/founder/OUTREACH_KIT.md` |
| 9 | Run the full loop yourself on production with a new account | You | Sign up, pick a path, take an exam, ask the mentor, then check the funnel shows it |
| 10 | **Set up real email sending** (blocks password reset and magic-link sign-in) | You | In Resend, verify `vahoha.com` (DNS records), then set `EMAIL_FROM="Vahoha <no-reply@vahoha.com>"` and `RESEND_API_KEY` on Render. Until then mail comes from Resend's test sender (`onboarding@resend.dev`), which delivers only to the Resend account owner, so no real user gets a reset or sign-in email. Test locally with your own address |
| 11 | Production env for capstones | You | Separate production GitHub OAuth app (prod callback URL) with `GITHUB_CLIENT_ID`/`GITHUB_CLIENT_SECRET`, plus `GITHUB_TOKEN` on Render. No `GROQ_TPM_LIMIT` in production; move Groq to a paid tier first. Regenerate the dev client secret (it was pasted in a chat) |
| 12 | Try Project Map for real on production | You | Needs `GITHUB_TOKEN` (the repo scan uses it; without one GitHub allows 60 requests an hour) and a Groq key. The first start creates 5 indexes on Atlas (`system_maps` x4, `system_map_checks`). Scan a real repo with each lens, run the understanding check, share a map and open the link logged out. Everything AI-related has only been tested with mocks |
| 13 | Before the next deploy, check the production settings against the new startup check | You | On Render: `JWT_Secret` and `JWT_REFRESH_SECRET` must differ, `FRONTEND_URL` must be an https URL with no trailing slash or path. On Vercel: `VITE_GOOGLE_CLIENT_ID` is only in `.env.development`, so set it in the project settings or Google sign-in breaks. A failed boot never replaces the running service (Render keeps the old one) |
| 14 | **Fix mobile logouts: move the API to `api.vahoha.com`** | You, then me | Confirmed on an iPhone in production: the login cookie is third-party (site on vahoha.com, API on onrender.com), and iOS blocks those, so a reload logs the user out. Render custom domain + DNS CNAME first, verify `/healthz`, then change `VITE_API_BASE_URL` and `VITE_WS_URL`, the GitHub OAuth callback and the Polar webhook. Order matters: `docs/engineering/API_DOMAIN_MIGRATION.md` |
| 15 | Seed the rewritten challenges | You | `npm run seed:challenges`, so the 21 api-dev / node-dev / javascript challenges rewritten on 2026-11-04 reach Atlas |
| 16 | Run Build Teams once end to end on a test repo | You | See the Build Teams decision below |

Open question: which track is the pilot track (backend, MERN or frontend)?

## Then: the pilot

- Send 5 DMs a day (`founder/OUTREACH_KIT.md`). Target: 15 interviews in 3 weeks.
- **Pass:** at least 3 of 15 pay $15. **Kill/pivot:** zero payers.
- Read the funnel weekly. The number that matters: share of users who return within 7 days and start a second layer.

## Next: after the first 15 interviews

- Fix the top 3 problems seen in demos.
- Save lesson progress server-side (lesson stage 3 in `product/LEARNING_SYSTEM.md`).
- More MERN lessons and labs for layers 1-3 (today: 2 lessons, 1 lab).
- Enforce Free/Pro gates only if payers appear; make the mentor limit plan-aware.
- Open security items M4, M5, M7 and the remaining Lows.

## Later: only if the pilot supports it

Voice exam backend (after a hand-run oral exam test), more XP changes, blog SEO prerender, more tracks and capstones, employer-side features.

**Not doing:** webcam proctoring, XP that unlocks layers or buys retries, new paths or awards before data.

## After deploy: backend architecture refactor

Behaviour-preserving cleanups to reach a clean layered design (route, controller, service, repository). Do these **after** deploy, not before: they carry risk and add no features. Do them one module at a time. The user writes the first repository themselves; Claude gives the plan and reviews.

| # | Fix | How |
| --- | --- | --- |
| A1 | Repository layer | Add `repositories/<name>.repo.js` per module holding only Mongo queries. Services call repos, never `db.collection()` directly |
| A2 | Enforce layer rules | Route, controller, service, repository, each layer calls only the one below. Add ESLint `no-restricted-imports` or `eslint-plugin-boundaries`. Check `exam.controller.js` and `examEngine.controller.js` for logic that belongs in a service |
| A3 | Centralized error handling | Custom errors (`NotFoundError`, `ValidationError`) thrown from services, one global error middleware, no `try/catch` in controllers (Express 5 handles async) |
| A4 | Module boundaries | Each module gets an `index.js` public API. No imports into another module's `services/`. Write down the `lib/` vs `services/` rule (suggested: services touch `db`, lib is pure functions) |
| A5 | Reusable validation | A `validate(schema)` middleware in place of Zod calls inside controllers |
| A6 | Layer-matched tests | Service unit tests with a fake repository, route integration tests, and coverage on services |
| A7 | Docs | Update `docs/engineering/ARCHITECTURE.md` with the layer diagram and call it a "feature-based modular monolith" in the README |
| A8 | Frontend profile area into features (DONE 2026-10-20) | `src/pages/MyProfile.jsx`, `pages/my-profile/*` and `pages/Users/UserProfile.jsx` predate the `src/features/<name>/` convention. Move them to `features/profile/` (profile, settings, notifications, blocked users, blog editor), `features/chat/` and the existing `features/connections/` (followers). Rename `Users` to lowercase (Linux builds are case-sensitive). Keep standalone pages (Home, About, Contact, Privacy, Terms, GetStarted, password pages) in `pages/`. Update `router.jsx` lazy imports and run the HEAD import check |

## Known limits (fine for the pilot)

- Rate-limit counters are in memory: they reset on restart and aren't shared across instances. Move to Redis before scaling out.
- The funnel loads the whole cohort into memory. Fine at pilot scale; switch to an aggregation pipeline before thousands of users.
- `active_day` comes from login and token refresh, so it means "opened the app that day", not "studied".

## Decision: Build Teams MVP built ahead of pilot data (2026-10-04)

Against the "no new features until pilot data" rule and the validate-idea verdict (pivot, 19/35), the founder chose to build Build Teams now. Risk raised once: the pool of capstone passers is empty. Status: all 8 stages written, ESLint and `vite build` pass; committed (2026-10-05 to 2026-10-12) but never run against GitHub, the database or the model with a real team.

- **Backend:** `backend/modules/teams` at `/api/teams`. Team record (admin-only writes), contribution sync from merged PRs, per-member defense on their own PR diffs, peer ratings, public evidence snapshot.
- **Frontend:** `src/features/teams`: `/team` (entry: card on the profile page) and public `/evidence/:publicId`.
- **Manual for team 1:** matching, applications, GitHub login confirmation, capstone-pass check, inactivity messages. Admin-only API routes plus an admin page (users search, overview) cover team creation, repo, members, sync and evidence.
- **Before real use:** run it end to end on a test repo, get each member's consent before issuing evidence (it publishes names), add a pointer to teams from the capstone page.
- **Not built:** AI skill judge, team moves, demo day, startup support, sponsored projects.
- **2026-11-02, Teams v2 built (founder's call, again ahead of pilot data):** team levels and lead/co-lead (the AI leads when nobody is lead-eligible), a task board with sprints that GitHub PRs move, an optional CV starting estimate, AI sprint planning that a person accepts, weekly update and warnings, and health on the admin page. Spec and status per stage: `docs/product/BUILD_TEAMS_SPEC.md`. Unit, contract and integration tests pass (`teamsBoard.integration.test.js` covers keys, sprints, GitHub sync, plan accept and warning audiences); the real model, a real CV and a real repo have not been tried yet.

## Frozen until pilot data says otherwise

Voice exam, Arena features, new paths, awards, further XP changes (`docs/product/XP_SYSTEM.md`; the founder unfroze two on 2026-10-10: challenge XP through the ledger, and 300 XP per passed team defense), group chat, further Teams work beyond the MVP above, and employer tiers.
