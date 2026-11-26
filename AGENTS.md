# AGENTS.md

Instructions for AI coding agents working in this repository. Read this before you change anything.

## What Vahoha is

A learning platform for developers that won't let you fake it. A learner picks a roadmap track and works through its ordered layers. Each layer stays locked until the learner passes a server-graded exam. Around that loop are a mentor grounded in the learner's real progress, voice exams, a judgment simulator, coding challenges (the Arena), capstones with a timed defense, Build Teams and a community.

It is pre-pilot: no real users yet. It is built solo. The product was formerly called DevsWebs, which is why the MongoDB database is still named `DevsBlog`.

When docs and code disagree, **the code wins**, then `docs/PILOT_STATUS.md`. Start there for the current status.

## Stack

| Part | Tech |
|---|---|
| Frontend | React 19, Vite 7, React Router 7, Zustand, Tailwind v4, CodeMirror 6, `framer-motion`/`motion`. Plain `fetch` with a small shared cache (no React Query). SSR prerender pass for SEO |
| Backend | Node 22 (`.node-version`; engines `>=22.12 <25`), Express 5, ESM everywhere, **MongoDB native driver (no Mongoose)**, Zod, BullMQ + Redis, Socket.IO, `isolated-vm` |
| AI | Groq (`openai/gpt-oss-120b`) for the mentor, grading and debriefs. Groq Whisper for voice exams |
| Services | Polar (billing), Resend (email), Cloudinary (media), GitHub/Google OAuth, Sentry, PostHog |
| Hosting | Vercel (frontend, deploys `master`), Render (API), MongoDB Atlas |
| Tests | Vitest (one config per kind in `config/`), Playwright (`tests/e2e`) |

The language is JavaScript, not TypeScript. Use JSDoc where a type helps.

## Commands

```bash
npm run dev:full        # Redis (docker) + Vite (:5173) + API (:5000), together
npm run dev             # frontend only (predev splits roadmaps + builds lesson-react.js)
npm run server          # API only, nodemon
npm run lint            # ESLint, the same check CI runs
npm run build           # Vite build + SSR prerender + SEO post-build
npm test                # test:unit + test:frontend
npm run test:security   # also runs in CI
npm run test:integration | test:api | test:websocket | test:queue | test:concurrency | test:performance
npm run seed:roadmap    # REQUIRED after any change to src/data/roadmaps/*.json
```

CI (`.github/workflows/ci.yml`) runs `npm ci`, `npm audit --omit=dev --audit-level=critical`, `lint`, `build`, `test:unit` and `test:security`. Your change must pass all of them. A Husky pre-commit hook runs `eslint --fix` on staged files through lint-staged.

The dev machine runs Windows (Git Bash and PowerShell). Use cross-platform Node scripts, not shell-specific ones.

## Repository map

```
src/
  features/<name>/     one folder per product area: pages/, components/, hooks/, lib/
  pages/               standalone pages (Home, About, legal, GetStarted)
  layouts/             MainLayout, Footer, Wordmark, guards/ (RequireAuth, RequireGuest), navbar/
  components/          shared UI by role: code/ feedback/ primitives/ screens/ home/ tour/
  hooks/ lib/ stores/  shared hooks, session/cache/socket, Zustand stores
  services/            *Api.js fetch wrappers for older areas
  constants/           frontend-only copy, link lists, nav, page config (may use React/icons)
  data/roadmaps/       authored roadmap JSON (the source of truth for layers)
  router.jsx           lazy-loaded routes
shared/                rules used by BOTH frontend and backend (exam rules, limits, enums). Plain JS only
backend/
  app.js, server.js    Express app wiring; HTTP + WebSocket + workers
  modules/<name>/      one feature each: routes/ controllers/ services/ schemas/ lib/ index.js
  services/            shared learning core (progress, unlock, mastery, XP, events)
  middleware/          authenticate, requireAdmin, validate, rate limits, requirePlan
  config/env.js        the only list of backend env vars
  utils/               respond, httpErrors, jwt, uploads, etc.
  seeders/ scripts/    seeders, importers, admin/maintenance scripts
  tests/               Vitest suites by kind
config/                one vitest.<kind>.config.js per suite
scripts/               build-time scripts (splitRoadmaps, buildLessonReact, seoPostBuild)
tests/                 tests/unit (frontend), tests/e2e (Playwright)
docs/                  PILOT_STATUS.md, engineering/, product/, founder/
```

Use import aliases, never long `../../` paths:

| From | To `src/` | To `shared/` |
|---|---|---|
| Frontend (`src/`, `tests/unit/`) | `@/constants/site` | `@shared/exam` |
| Backend and `scripts/` (Node) | never | `#shared/exam.js` (`package.json` `"imports"`, `.js` required) |

In the frontend, a file in the same folder uses `./name`, and everything else uses `@/` or `@shared/`. Inside `shared/`, sibling files import each other with `./name.js`. Exception: `src/seo/` files that `scripts/seoPostBuild.js` runs in Node keep relative imports, because Node has no `@` alias.

## Backend rules

**Module shape.** Each feature lives in `backend/modules/<name>/`. Its `index.js` is the module's only public entry point. `app.js` mounts its router from there, and other modules import only what `index.js` exports. Do not add new deep imports into another module's files. The few that exist are cleanup, not a pattern.

**Layering.** Route, then `validate({ body, query, params })` with a Zod schema from `schemas/`, then the controller, then the service. Services hold the logic and the DB calls. `lib/` holds pure functions. `backend/services/` must never import from `modules/`.

**Controllers and errors.** New code uses `respond` and `dbOf` from `utils/respond.js`, and each module mounts one `makeErrorHandler(label)` at the end of its router. Services throw `HttpError` subclasses or `fail(status, message)` from `utils/httpErrors.js`. The message is shown to the user, so write it for them. Anything else becomes a 500 with a generic message and goes to Sentry. Don't add try/catch to controllers that use `respond`. Older controllers still use try/catch with `{ message }`. Leave them alone unless you're working in them.

**Routes.** New routes go under `/api/<feature>`. Legacy community routes (`/blogs`, `/library`, auth, `/my-profile`) stay bare.

**Database.** Use the native driver with `req.app.locals.db` (`dbOf(req)`) and `collection("...")`. Convert ids with `new ObjectId()` only after validating them. Never pass raw request objects into a query (NoSQL operator injection).

**Environment variables.** Add or change them only in `backend/config/env.js` (`ENV_SPECS`). `.env.example` files are generated by `backend/scripts/writeEnvExample.js`. Never edit them by hand. Every `.env*` file is gitignored except the examples. Never commit secrets. Every `VITE_*` value ships in the public bundle.

### Invariants: do not break these

- **Progression is server-authoritative.** Layer N+1 unlocks only on a passed exam stored in `userProgress` (rules in `services/layerUnlock.js`, thresholds in `shared/exam.js`). Never trust a score, a pass or a progress flag sent by the client.
- **Answer keys never leave the server.** Choices are shuffled per attempt. No route accepts a client score.
- **One XP ledger.** All XP goes through `awardXp` in `services/xpService.js`. Never write XP directly.
- **One learner model.** Evidence goes to `learnerMastery` through `recomputeMastery`. Never add a parallel score.
- **Admin routes** use `requireAdmin`. It re-reads the role from the DB and answers **404**, not 403.
- **Untrusted text sent to the LLM** (repos, attachments, user input put into prompts) is fenced and validated. See `docs/engineering/AI.md`. The mentor is Socratic, and `solutionGuard` caps how much code it outputs.
- **Billing stays inert** (`BILLING_ENFORCED=false`) until the owner decides otherwise.
- **The code runner** (`isolated-vm`) fails closed in production. Don't weaken that.

## Roadmap data

- Authored in `src/data/roadmaps/<category>.json`. `scripts/splitRoadmaps.js` writes `public/roadmaps/` for the page, and `npm run seed:roadmap` writes `roadmap_tracks`/`roadmap_layers` for the backend. **Run the seeder after any layer change**, or the frontend and backend disagree.
- Layer ids are **positional and permanent** (`cpp-10`). Never rename or reuse an id. Renaming orphans progress, attempts, mastery and blog tags. Add new layers at the end with the next free id, and use `order` for their position.
- Category and track titles live in `shared/roadmapPaths.js`. Authoring rules are in `docs/product/ROADMAP_LAYER_AUTHORING.md`.

## Frontend rules

- Put new code in `src/features/<name>/`. Put a page in `src/pages/` only if it's standalone.
- Reads go through `useCachedResource(key, fetcher)` (`src/hooks/useCachedResource.js`) with a module-level fetcher. After a write, invalidate through `src/lib/queryInvalidation.js`.
- Calls that need auth use `apiFetch` / `authHeaders` from `src/lib/session.js` (re-exported by `src/constants/api.js`). The access token lives **only in memory**. Never put tokens in localStorage.
- Analytics go through `captureEvent` (`src/lib/posthog.js`), never through `posthog.capture` directly.
- Don't add new `dangerouslySetInnerHTML`. Render Markdown with `react-markdown`, and sanitize with `src/utils/sanitize.js` when needed.
- Styling uses Tailwind v4 utilities. Reuse the shared pieces in `src/components` (Dropdown, ConfirmDialog, Skeleton, CodeBlock, `SURFACE`/`INPUT_CLASS`) before building new ones. Teams has its own scoped theme (`.teams-theme`, `t-*`).
- Page copy, link lists and per-page config go in `src/constants/<page>.js`, not inline in components.
- Feature flags live in `src/constants/features.js`.

## Code style

- **Comments say *why* or warn about a trap.** Keep reasons the code can't show, "must match X" links, security and data promises, and short JSDoc on services. Leave out commented-out code, comments that restate the code, emoji or ✅ markers, and history ("used to", "previously"). History goes in the commit message.
- **Don't over-engineer.** No generic frameworks, config layers or hooks with a single caller. Choose the smallest split that makes a file readable. Keep behaviour and visuals the same unless asked to change them.
- Long components: split them into a few small, named pieces in the same feature folder.
- Rules shared by the frontend and the backend (limits, thresholds, enums) go in `shared/`, defined once. `shared/` never imports React, icons or `src/` code (ESLint enforces this), and the backend never imports `src/constants/`.
- Match the style of the file you're in: ESM, double quotes in the backend, and no unused variables. Lint allows capitalized names for JSX.
- Don't delete files, routes or collections you didn't create without asking.

## Tests

- Run `npm run lint` and the relevant suites before you say work is done. Report failures honestly, with their output.
- While a feature's data model is still changing (the current state for most features), **don't write new tests unless asked**. Update existing tests only where an intended change breaks them.
- Backend tests use `mongodb-memory-server` and `supertest`. Frontend tests use jsdom and Testing Library.

## Git and deploys

- Work on `master`. The exception is recruiter/hiring work, which lives on the `hiring` branch. If a change touches both, split it.
- **Commit or push only when the user asks.** Pushing `master` triggers a Vercel production deploy, so say so when you push.
- Commit messages use Conventional Commits with a scope: `feat(seo): …`, `fix: …`, `refactor(analytics): …`, `chore(env): …`. Keep the subject short and say *what and why*.
- Never commit `.env*` (other than the examples), `dist/`, `public/lesson-react.js` or `public/roadmaps/`. All of these are generated or secret.

## Working with the owner

- Keep replies short and plain. Skip long reports.
- Product and pricing decisions (Free vs Pro, what to build next) belong to the owner. Suggest options, don't decide.
- Don't spawn subagents or parallel agents unless asked. They cost too many tokens.
- Ask before running anything that touches a real service: seeding Atlas, sending email, Polar, live Groq calls, or deleting data.

## Key docs

| Doc | Use it for |
|---|---|
| `docs/PILOT_STATUS.md` | Current status of every feature and what's left |
| `docs/engineering/ARCHITECTURE.md` | Layout, data model, known limits |
| `docs/engineering/SECURITY.md` | How auth, sessions and validation work, plus open risks |
| `docs/engineering/AI.md` | Mentor, grading, guardrails |
| `docs/engineering/adr/` | Why Groq, Polar, a modular monolith and server-authoritative progression |
| `docs/product/LEARNING_SYSTEM.md` | Learn/lesson system design |
| `VISION.md` | Product direction |
