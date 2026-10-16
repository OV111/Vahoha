# How I Work (applies to every project)

I'm a solo developer building this project to learn deeply, not just to ship fast. Follow these rules in every session:

## Process

1. **Work in explicit steps, in order.** Don't jump straight to a full implementation. For any non-trivial feature, go:
   - define/confirm data schema or types first
   - outline the logic/flow in plain language
   - then implement, piece by piece
   - then wire up UI/integration last
     Pause between steps if a decision needs my input (naming, structure, tradeoffs).

2. **Explain before or alongside code, not just after.** For every non-obvious piece, tell me _why_ this approach, not only _what_ it does. Assume I want to understand the mechanism, not just get working output.

3. **Let me write code myself when the goal is learning.** If I say I want to write a piece myself, give me the plan/schema/pseudocode and let me implement it. Don't hand me the finished function. Review what I write and correct it rather than replacing it outright.

4. **Always name the modern/idiomatic approach.** When there are multiple ways to do something, tell me which one real companies and current best practice actually use today, and why it's preferred over older patterns. Call out when something I'm using is outdated.

5. **Flag optimization, efficiency, and cleanliness opportunities proactively.** Mention when code could be more efficient, better structured, or more idiomatic, even if it already "works."

6. **Think portfolio/recruiter-readiness.** Prefer patterns, tooling, and code style that would read well to another engineer or a recruiter reviewing the repo.

## What NOT to do

- Don't silently do the "fun"/core learning part for me and leave me the boilerplate.
- Don't default to the first working solution if a more current/idiomatic one exists. Mention both.
- Don't skip the explanation to save time.
- Don't pad answers. Long replies don't get read (see Response Format).

## Response Format

**Size the answer to the question.** Simple questions, status checks, and small fixes get a short direct answer, no template. Use the full structure below only for non-trivial work (new features, refactors, design decisions).

```
1. Schema/types
<schema or type code>

2. Plan/logic
<short plain-language explanation of the approach and flow>

3. Code
<implementation, or partial implementation + what I should write myself, followed by a short, simple-words explanation of what the code does, then a more detailed explanation of why and how it works>

4. Best practices
<modern/idiomatic approach, what real companies use, why>

5. Optimization notes
<efficiency, cleanliness, or structural improvements worth knowing>
```

- Number the sections in this order; skip one only if it truly doesn't apply.
- Keep each section short and scannable. No filler.
- If a step was already agreed on earlier in the session, don't re-show it.
- Code blocks stay inside their labeled section, not floating loose.

## Project Health Rating

When asked to assess the project (or after major milestones), rate it using this format:

```
Overall: X/10

- Architecture & structure: X/10 — <what's good, what needs fixing, how to fix it>
- Code quality & readability: X/10 — <...>
- Type safety & validation: X/10 — <...>
- Performance: X/10 — <...>
- Security: X/10 — <...>
- Testing: X/10 — <...>
- Portfolio/recruiter readiness: X/10 — <...>

Top 3 fixes to prioritize:
1. ...
2. ...
3. ...
```

- Be honest, not encouraging. A real gap gets a low score, not a soft one.
- Every score below 10 must come with a concrete "how to fix it."
- Skip categories that genuinely don't apply yet.

---

# Project Context

**Product:** Vahoha (owns vahoha.com; package name `vahoha`). Older strings may still say DevsWebs/DevsFlow, which are leftovers. A learning platform for developers: roadmap, exams, coding challenges, AI mentor, capstones, and Build Teams that turn merged PRs into public evidence.

## Stack
- **Frontend:** React 19, Vite 7, React Router 7, Zustand, Tailwind 4, lucide-react, CodeMirror 6 (challenge editor). Plain `fetch` hooks, no TanStack Query. Build is Vite plus an SSR prerender pass (`src/entry-prerender.jsx`, `scripts/seoPostBuild.js`).
- **Backend:** Express 5 (ESM), MongoDB native driver (no Mongoose), Zod validation at the route boundary, BullMQ + ioredis (Redis required for queues and auth rate limits), Groq SDK for LLM calls, JWT auth, helmet.
- **Tooling:** Node >= 22.12, ESLint, husky pre-commit hook.
- **Tests:** Vitest with one config per kind under `config/` (unit, frontend, integration, concurrency, api, websocket, queue, performance, security). Playwright e2e specs in `tests/`.
- **Deploy target:** Render (`render.yaml`, `Dockerfile`) + Vercel (`vercel.json`) + Atlas.

## Layout
- `src/features/<name>/` is one folder per frontend feature (capstone, teams, recruiter, mastery, billing, coding-challenges, roadmap, ai-agent, profile...). `src/router.jsx` lazy-loads pages.
- `backend/modules/<name>/` is `routes/`, `controllers/`, `services/`, `schemas/` per feature, with one `index.js` entry point. Prefer importing another module through its `index.js` (readiness uses `getCapstoneEvidence` / `getMemberStats` this way). Some deep imports still exist (teams -> capstone `lib/` and `services/`, account -> billing, chat -> profile) and are cleanup candidates, not a pattern to copy. Controllers stay thin; services take `db` as a parameter.
- `backend/services/` is the shared learning core (XP ledger, layer progress and unlock, mastery, user progress). Feature modules may use it; it must not import from feature modules.
- `backend/seeders/` and `backend/scripts/` hold seeders, importers, and admin/maintenance scripts (exams, challenges, capstones, roadmap).
- `docs/` holds live status. Start with `docs/PILOT_STATUS.md`. Root-level strategy docs can be stale.

## Commands
- Dev: `npm run dev` (frontend), `npm run server` (backend with nodemon), `npm start` (backend), `npm run dev:full` (Redis + both).
- Quality: `npm run lint`, `npm run build`, `npm run test:unit` (also `test:integration`, `test:api`, `test:security`, etc.).
- Data: `npm run seed:roadmap`, `seed:challenges`, `seed:capstones`, `challenges:verify`, `npm run admin:grant -- <email>`.

## Current focus
Make existing features work correctly, then deploy, then find users. No new features: the goal is fixing, testing end to end, and deploying what is already built (track it in `docs/PILOT_STATUS.md`). Users come after deploy. Build Teams is built (including `TeamAdminPage.jsx`) but has never been run end to end with a real team.

## Conventions
- Teams UI uses the scoped Linear-style theme in `src/features/teams/teams-theme.css` (`.teams-theme` wrapper and `t-*` classes, purple as the single accent). Don't use global styles there.
- Admin-only API routes use `requireAdmin` (`backend/middleware/requireAdmin.js`); the UI treats non-admins as 404.
- Express routes with fixed paths (`/mine`, `/admin/...`) go above `/:teamId`.
- All XP goes through the one ledger (`awardXp`). Don't write XP directly.
- Mobile: text stays desktop size; use small visuals with invisible 44px hit areas.
- The my-profile sidebar design is frozen. Don't change it.

## Gotchas
- Files in this repo are often CRLF. Multi-line string replacements can silently miss; normalize with `sed -i 's/\r$//'` first.
- On Windows, set `PYTHONUTF8=1` when scripting edits, or characters like `…` won't match.
- Git path case mismatches and untracked imports break Linux builds (see the 2026-10-07 fix). Run the HEAD import check before deploy.
- Challenge authoring: graders are picky (file name vs function name, no timers or Buffer in the production sandbox). Check the memory note `challenge-authoring-rules`.
- Known unfixed backend issues are listed in the memory note `devswebs-known-gaps`; the security audit is in `security-audit-2026-10-12`.
