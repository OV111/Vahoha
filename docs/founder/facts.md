# Facts: Vahoha

Checked 2026-10-21 against the code, `docs/PILOT_STATUS.md` and `docs/strategy/`. "TODO: confirm" means the files can't answer it. Strategy docs are partly stale; where they disagree with the code, the code wins.

## What it is
- **One-liner:** a learning platform for developers who want proof, not a completion badge (`docs/strategy/VISION.md` §1).
- **Owner:** Vahe Ohanyan, solo, part time. Owns vahoha.com; package name `vahoha`.
- **Problem:** nothing checks whether a self-taught or junior developer understood what they consumed. Mid-level skills (design, testing, debugging, defending decisions) are the ones nobody verifies.
- **Primary user:** self-taught or bootcamp backend developer, 0-3 years in, aiming at mid-level (persona Daniel, `persona-gen.md`). TODO: confirm with interviews.
- **Position:** "You finished the courses. Now prove you can build and defend it."

## Status
- **Built, never used by real users:** roadmap with layer exams, AI mentor with learner context, coding challenges (JS/TS), labs and step-by-step lessons, mastery, XP ledger, capstone with AI review and timed defense, Build Teams, readiness score, recruiter scorecard, Polar billing (inert), voice teach-back.
- **Content:** 15 roadmap categories; 205 challenges with passing reference solutions (api-dev, node-dev, javascript, mern, web-game); 17 capstones published, 18 drafts, 141 waiting on question banks.
- **Exam banks:** the frontend bank is written (900 questions, none hand-checked). Backend banks written by agents have length bias: do not import. About 135 questions for the pilot track still need a hand check.
- **Deployment:** target is Render + Vercel + Atlas. TODO: confirm whether production is live and which URL.
- **Not safe yet:** email sending (no password reset or magic link for real users), production GitHub OAuth app, Groq paid tier. See `docs/PILOT_STATUS.md` "Left before the first user".
- **Frozen until pilot data:** voice exam, Arena features, new paths, awards, group chat, employer tiers.

## Metrics
| Metric | Value | Source |
|---|---|---|
| Accounts | 13 on 2026-10-11 (0 duplicate emails). TODO: confirm how many are real people vs founder/test | `PILOT_STATUS.md` |
| Paying users | 0. `BILLING_ENFORCED=false`, nobody is charged | `docs/engineering/BILLING.md` |
| Revenue | $0 | same |
| Interviews done | 0 logged in the repo. TODO: confirm | `OUTREACH_KIT.md` tracker is empty |
| Capstone passers | 0 known. TODO: confirm | `validate-idea.md` |

## Stack
- Frontend: React 19, Vite 7, React Router 7, Zustand, Tailwind 4, CodeMirror 6.
- Backend: Express 5 (ESM), MongoDB native driver, Zod, BullMQ + Redis, JWT.
- AI: Groq `openai/gpt-oss-120b` (mentor, reviews). Free tier is rate-limited.
- Billing: Polar (merchant of record). Flat $15/month Pro is a hypothesis.
- Tests: Vitest (unit, integration, api, security, ...), Playwright e2e.

## Decisions on record
- Build Teams was built ahead of pilot data, against the advice of the validate-idea verdict (pivot, 19/35). `PILOT_STATUS.md`, 2026-10-04.
- Payment test before any pricing gates: 15 interviews in 3 weeks, pass at 3 payers, kill at zero (`OUTREACH_KIT.md`).
- Say "defended", never "verified" or "hard to fake" (`docs/product/EXAM_INTEGRITY.md`).

## History
- 2026-10-04 /founder:validate-idea: Idea is Build Teams, capstone passers grouped by shared aim, tracked/reviewed/defended tasks, inactive members released, vacancies posted.
