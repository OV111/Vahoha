# Product status

Checked against the code 2026-10-21 (routes in `src/router.jsx`, modules in `backend/modules/`, `docs/PILOT_STATUS.md`). "Used by real users" is **no** for every row: nothing has had a pilot yet. TODO: confirm if any row has been used by someone other than you.

Status: **Live** = works end to end in code. **Partial** = works with gaps. **Prototype** = UI or mock only. **Spec** = doc only.

## Learning core

| Area | Route | Backend | Status | Gaps |
|---|---|---|---|---|
| Roadmaps (15 categories) | `/roadmaps` | `roadmap` | Live | Layer order enforced server-side; layers without seeded data fail open |
| Layer test (MCQ) | `/roadmaps/exam/:layerId` | `exams` | Live | 15 of up to 60 questions, pass 80, 3/day, 30-min cooldown. Banks need re-seeding and a hand check. See `EXAM_INTEGRITY.md` |
| Lessons (step player) | `/learn/:track/:layer/:topic` | none (localStorage) | Partial | 2 draft lessons, MERN layer 2 only. Progress not saved server-side |
| Labs | `/labs`, `/labs/:room` | none yet | Partial | 1 lab (closures) with real grading in the worker. `LAB_SYSTEM.md` |
| Foundations | `/labs/foundations` | none | Live | Free guest lessons, 3 written (command line, how computers work, version control) |
| Coding challenges | `/coding-challenges` | `coding-challenges` | Partial | 205 challenges, JS/TS. 25 api-dev/node-dev/javascript challenges would fail in the production sandbox. Judge0 runner reverted |
| AI mentor | `/ai-agent` | `ai-agent` | Live | 30 messages/day for all; Pro is not higher in code. Groq free tier rate-limits |
| Teach-back (text, dictation) | inside mentor and tests | `exams` | Partial | Few rubrics. Not calibrated against humans |
| Mastery | `/progress` | `mastery` | Live | Detail view is a Pro gate, inert |
| XP | profile, arena | `services/xpService.js` | Live | One ledger. `XP_SYSTEM.md` |
| Job readiness (5 areas) | `/progress` | `readiness` | Live, private | Shows "none" until a capstone or team exists |

## Proof

| Area | Route | Backend | Status | Gaps |
|---|---|---|---|---|
| Capstone (brief, repo, AI review, timed defense) | `/capstone/:trackId` | `capstone` | Live | 17 published, 18 drafts, 141 waiting on question banks. Needs the production GitHub OAuth app and Groq paid tier |
| Public certificate / verify page | `/verify/:publicId` | `capstone` | Live | Plan gate inert |
| Build Teams | `/team`, `/evidence/:publicId` | `teams` | Partial | Built, never run with a real team. Manual matching by admin |
| Recruiter scorecard | `/candidate/:username`, `/candidates` | `recruiter` | Partial | Opt-in; candidates list closed to recruiters |
| Voice exam | `/voice-exam/:layerId` | none | Prototype | Mock API, one layer. Frozen |
| Voice review | `/voice-review` | scaffold | Prototype | Empty |

## Community and account

| Area | Route | Status | Gaps |
|---|---|---|---|
| Blogs (tagged to layers) | `/blogs`, `/add-blog` | Live | Blog SEO prerender postponed |
| Library | `/libs` | Live | |
| Profiles, followers, chat, notifications | `/users/:username`, `/chats` | Live | Chat requests for non-mutual followers added |
| Auth (email, Google, GitHub, magic link) | `/get-started` | Partial | Real email sending not set up, so reset and magic link don't reach users |
| Billing (Polar) | `/pricing`, `/billing` | Partial | Not enforced (`BILLING_ENFORCED=false`). Checkout tested against a fake Polar in CI. TODO: confirm a real sandbox checkout |
| Admin (funnel, capstone, team) | `/capstone/admin`, `/team/admin` | Live | Admin-only; non-admins see 404 |

## Quality
- Tests: Vitest suites (unit, integration, api, security, concurrency, queue, websocket, performance) and 8 Playwright specs (auth, navigation, mobile, accessibility, settings, profile, protected routes). TODO: run the full set and record pass counts here.
- Known security items: M2, M4, M5, M7 and Lows open (`security-audit-2026-10-12` memory, `PILOT_STATUS.md`).
- Known limits: in-memory rate limits, funnel loads the whole cohort, `active_day` means "opened the app".
