# Working with me

I'm a solo developer building this to learn, not only to ship. Be a sharp teammate, not a tutorial.

## How to work
- **Just do the task.** No required steps, templates or sections. Read the code, make the change, verify it, report. Pause only when a decision is really mine (naming, tradeoffs, anything outward-facing or hard to undo).
- **Keep answers short.** Simple question, short answer. Long replies don't get read. Lead with the result, then only what I need to decide or check.
- **Explain the why when it isn't obvious**, in a sentence or two, not a lecture. If I ask "how does X work", then go deeper.
- **Say which approach is the current/idiomatic one** when there are several, and flag it when something I wrote is outdated. Mention efficiency or cleanliness problems you notice, briefly.
- **If I say I want to write a piece myself**, give me the plan or pseudocode and review what I write. Otherwise just write it.
- **Verify before saying done.** Run lint/tests/build, and look at UI changes in the browser. If something failed or was skipped, say so plainly.
- Write code a recruiter reading the repo would be happy with: match the surrounding style, no dead code, no needless comments.
- When I ask for an assessment, give honest scores out of 10 per area with one concrete fix each. No cheerleading.

## Hard rules
- Never push, deploy, or write to the Atlas database without my explicit go.
- Another Claude session may work in this repo at the same time. Commit only your own files with explicit paths (`git commit -m ... -- <paths>`), never `git add -A` or the whole index.
- My-profile sidebar design is frozen. Don't change it.
- Progress is recorded by the system (open, finish, test pass), never by manual ticks.
- Mobile: text stays desktop size; use small visuals with invisible 44px hit areas.

---

# Project context

**Product:** Vahoha (owns vahoha.com; package name `vahoha`). Older strings may still say DevsWebs/DevsFlow, which are leftovers. A learning platform for developers: roadmap, exams, coding challenges, labs, AI mentor, capstones, and Build Teams that turn merged PRs into public evidence.

## Stack
- **Frontend:** React 19, Vite 7, React Router 7, Zustand, Tailwind 4, lucide-react, CodeMirror 6. Plain `fetch` hooks, no TanStack Query. Build is Vite plus an SSR prerender pass (`src/entry-prerender.jsx`, `scripts/seoPostBuild.js`).
- **Backend:** Express 5 (ESM), MongoDB native driver (no Mongoose), Zod at the route boundary, BullMQ + ioredis (Redis required for queues and auth rate limits), Groq SDK, JWT auth, helmet.
- **Tooling:** Node >= 22.12, ESLint, husky pre-commit hook.
- **Tests:** Vitest with one config per kind under `config/` (unit, frontend, integration, concurrency, api, websocket, queue, performance, security). Playwright e2e specs in `tests/`.
- **Deploy target:** Render (`render.yaml`, `Dockerfile`) + Vercel (`vercel.json`) + Atlas.

## Layout
- `src/features/<name>/` is one folder per frontend feature (capstone, teams, recruiter, mastery, billing, coding-challenges, roadmap, learn, labs, ai-agent, profile, chat, connections, blogs...). Each has `pages/`, `components/`, `hooks/`, `lib/` as needed. `src/router.jsx` lazy-loads pages.
- `src/pages/` holds only standalone pages (Home, About, Contact, Privacy, Terms, GetStarted, password pages). The profile area lives in `features/profile` (profile, settings, notifications, blog editor, public user profile), chat in `features/chat`, followers in `features/connections`.
- `src/hooks`, `src/lib`, `src/components/ui`: shared code used by several features.
- `backend/modules/<name>/` is `routes/`, `controllers/`, `services/`, `schemas/` per feature, with one `index.js` entry point. Prefer importing another module through its `index.js`. Some deep imports still exist (teams -> capstone, account -> billing, chat -> profile) and are cleanup candidates, not a pattern to copy. Controllers stay thin; services take `db` as a parameter.
- `backend/services/` is the shared learning core (XP ledger, layer progress and unlock, mastery, user progress). Feature modules may use it; it must not import from feature modules.
- `backend/seeders/` and `backend/scripts/` hold seeders, importers, admin/maintenance scripts.
- `docs/` holds live status. Start with `docs/PILOT_STATUS.md`. Root-level strategy docs can be stale.

## Commands
- Dev: `npm run dev` (frontend), `npm run server` (backend with nodemon), `npm start` (backend), `npm run dev:full` (Redis + both).
- Quality: `npm run lint`, `npm run build`, `npm run test:unit` (also `test:integration`, `test:api`, `test:security`, etc.).
- Data: `npm run seed:roadmap`, `seed:challenges`, `seed:capstones`, `challenges:verify`, `npm run admin:grant -- <email>`.

## Current focus
Make existing features work correctly, then deploy, then find users. No new big features: fix, test end to end, deploy what is built (track it in `docs/PILOT_STATUS.md`). Build Teams is built but has never been run end to end with a real team.

## Conventions
- Teams UI uses the scoped Linear-style theme in `src/features/teams/teams-theme.css` (`.teams-theme` wrapper, `t-*` classes, purple as the single accent). Don't use global styles there.
- Admin-only API routes use `requireAdmin`; the UI treats non-admins as 404.
- Express routes with fixed paths (`/mine`, `/admin/...`) go above `/:teamId`.
- All XP goes through the one ledger (`awardXp`). Don't write XP directly.
- Users without a photo show their initial on a purple circle (`components/ui/UserAvatar.jsx`), never a stock image.

## Gotchas
- Files in this repo are often CRLF. Multi-line string replacements can silently miss; normalize first or script the edit.
- On Windows, set `PYTHONUTF8=1` when scripting edits, or characters like `…` won't match.
- Git path case mismatches and untracked imports break Linux builds. Run the HEAD import check before deploy.
- Challenge authoring: graders are picky (file name vs function name, no timers or Buffer in the production sandbox). See the memory note `challenge-authoring-rules`.
- Known backend issues: memory notes `devswebs-known-gaps` and `security-audit-2026-10-12`.
