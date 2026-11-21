<div align="center">

# Vahoha

**Developer learning that won't let you fake it.**

Roadmaps you have to *earn*: server-graded exams gate every layer, spoken exams prove you understood it, and a judgment simulator trains the calls AI can't make for you.

[vahoha.com](https://vahoha.com) · [@vahoha_](https://x.com/vahoha_)

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat-square&logo=vite&logoColor=white)

</div>

<p align="center">
  <img src="docs/brand/screenshots/home.png" alt="Vahoha home page" width="100%">
</p>

<p align="center">
  <img src="docs/brand/screenshots/roadmaps.png" alt="Roadmaps: pick your path" width="49%">
  <img src="docs/brand/screenshots/pricing.png" alt="Pricing" width="49%">
</p>

---

## What is Vahoha?

Vahoha is a learning platform for developers who want proof they actually understood what they studied. Every roadmap layer is locked until you pass a server-graded exam on it; failing records your specific weak spots, and a personal mentor (grounded in your real progress and exam history) helps you close them before you retry. The bet: as AI writes more of the code, the developers who stay needed are the ones with judgment and proof of understanding. That is what Vahoha trains and records. Community posts and coding challenges sit around that core loop. Built from scratch, solo, by Vahe Ohanyan. (Formerly called DevsWebs; the repository folder still uses the old name.)

---

## How it works

```mermaid
flowchart LR
    A[Pick a path] --> B[Study a layer]
    B --> C{Layer exam}
    C -- fail --> D[Weak spots recorded] --> E[Mentor helps you fix them] --> C
    C -- pass --> F[Voice exam<br/>Verified badge]
    F --> G[Next layer unlocks]
    G --> H[Judgment simulator<br/>make the calls]
    H --> I[Capstone + timed defense]
    I --> J[Public proof:<br/>certificate & evidence page]
```

---

## Tech stack

<div align="center">

**Frontend**

![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite 7](https://img.shields.io/badge/Vite_7-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind v4](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router 7](https://img.shields.io/badge/React_Router_7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-443E38?style=for-the-badge)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black)
![CodeMirror 6](https://img.shields.io/badge/CodeMirror_6-D30707?style=for-the-badge&logo=codemirror&logoColor=white)

**Backend**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express 5](https://img.shields.io/badge/Express_5-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

**AI**

![Groq](https://img.shields.io/badge/Groq-F55036?style=for-the-badge)
![Whisper](https://img.shields.io/badge/Whisper-412991?style=for-the-badge&logo=openai&logoColor=white)

**Infrastructure**

![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![BullMQ](https://img.shields.io/badge/BullMQ-E0234E?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)

**Services**

![Polar](https://img.shields.io/badge/Polar-0062FF?style=for-the-badge)
![Resend](https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=resend&logoColor=white)
![Sentry](https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white)
![PostHog](https://img.shields.io/badge/PostHog-1D4AFF?style=for-the-badge&logo=posthog&logoColor=white)
![Google OAuth](https://img.shields.io/badge/Google_OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white)
![GitHub OAuth](https://img.shields.io/badge/GitHub_OAuth-181717?style=for-the-badge&logo=github&logoColor=white)

**Testing & DX**

![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

</div>

<details>
<summary>Details</summary>

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite 7, Tailwind v4, Zustand, Framer Motion, GSAP, CodeMirror |
| **Backend** | Node.js 22–24 (ESM), Express 5, MongoDB (native driver), Socket.IO, Zod |
| **AI** | Groq (`openai/gpt-oss-120b`) for the mentor, grading and debriefs; Groq Whisper for voice-exam transcription |
| **Auth** | JWT access tokens (15 min) + rotating httpOnly refresh cookie, bcrypt, Google and GitHub OAuth |
| **Billing** | Polar (Merchant of Record), signed webhooks, plan-based caps. Built, **not enforced** (`BILLING_ENFORCED=false`) |
| **Infrastructure** | Redis, BullMQ, Cloudinary, `isolated-vm` (code-runner sandbox), Docker |
| **Email** | Resend |
| **Monitoring** | Sentry (errors, traces, error replays) for the API and the web app; PostHog for product analytics |
| **Testing** | Vitest (unit, integration, API, security, performance, concurrency, WebSocket, queue), Playwright (E2E) |
| **DX** | Husky, lint-staged, ESLint, Swagger UI, nodemon |

</details>

---

## Features

**The core loop**

- **Learning roadmaps:** 15 categories of visual paths with tracks and layers. Each layer is locked until you pass its exam; progress is saved server-side
- **Exam engine:** server-graded multiple choice, 15 questions per attempt, pass mark 80. Answer keys never leave the server, choices are shuffled per attempt, unseen questions are served first, 3 attempts per day plus a cooldown after a fail
- **Mentor:** per-user agent with tools into your progress, exam history and weak spots. Socratic (guides, doesn't hand over answers); streaming, sessions, 30 messages a day
- **Voice exam:** answer a layer's questions out loud; the answer is transcribed and graded against a per-layer rubric with evidence points. Passing marks the layer **Verified** on your profile. Rubrics exist for the 15 fullstack paths
- **Judgment simulator:** run a scenario (stage 1: a backend startup), make decisions under pressure, watch the consequences play out, then get a debrief. Rules code decides outcomes so runs are fair and repeatable; the AI only writes text and debriefs
- **Mastery:** per-topic status and a "next step" derived from exams, teach-back and challenge results
- **Dev library:** curated books, docs and guides mapped to roadmap layers
- **Blog posts tagged to layers:** a layer shows the posts written for it
- **Capstones and certificates:** a project brief per track, repo review and a technical defense; passing issues a certificate anyone can verify at `/verify/:id`
- **Project map:** draw how a system fits together (parts, wires, notes), or scan a repo to start one. Undo/redo, PNG/SVG/Mermaid/JSON export, comments on team maps, public read-only links at `/map`
- **Labs:** the Foundations room and the first system lab

**Around it**

- **Coding challenges (Arena):** catalog, sandboxed grading, solve in JavaScript, Python, Ruby, PHP, Java, C++ or Go, explain your solution, community proposals with admin review, XP-priced hints
- **Build Teams:** teams build together; PR sync, per-member defense, ratings and a public evidence page for recruiters
- **Community:** Markdown blog, profiles, follows, DMs and group chat over Socket.IO (voice notes, attachments, reactions), queue-backed notifications
- **Recruiter scorecards:** opt-in public candidate page. The candidates list is built but switched off (`constants/features.js`)
- **Billing:** Polar checkout, subscription state and Free/Pro caps for mentor and capstone (inert until enabled)
- **Pilot analytics:** 7 server-side events and an admin-only funnel (`GET /api/admin/funnel`)
- **Search**, **OAuth**, **dark/light theme**

---

## Status

| Status | Milestone |
|---|---|
| ✅ | Community platform: blogs, profiles, follows, real-time chat |
| ✅ | Learning roadmap: server-side progress, locked layers |
| ✅ | Dev library: curated resources linked to roadmap layers |
| ✅ | Exam engine: server-graded layer exams, pass at 80 |
| ✅ | Mentor: tools into your progress, Socratic, sessions |
| ✅ | Mastery map and learner context |
| ✅ | Coding challenges (Arena): sandboxed grading, proposals |
| ✅ | Billing: Polar, sandbox-verified, not enforced |
| ✅ | Capstones, certificates and Build Teams |
| ✅ | Project map: editor, repo scan, sharing, comments |
| ✅ | Labs: Foundations room, first system lab |
| ✅ | Pilot analytics: events and funnel |
| ✅ | Error monitoring: Sentry on API and web app |
| ✅ | Voice exam: spoken layer exams, rubric grading, Verified badges |
| ✅ | Judgment simulator: stage 1 (engine + one backend scenario) |
| 🟡 | Exam banks: generator built; banks must be seeded and hand-checked per layer |
| 🟡 | Voice-exam rubrics: fullstack done, other categories pending |
| 🔲 | Judgment simulator stages 2–6: investigation, your-project mode, scores, team mode |
| 🔲 | Public progress profiles, full admin panel |
| 🔲 | Real users: the pilot has not started |

Day-to-day status and the pre-pilot checklist: `docs/PILOT_STATUS.md`.

---

## Docs

Full index: [`docs/README.md`](docs/README.md).

| Doc | What it is |
|---|---|
| `VISION.md` | Business and product framing |
| `docs/PILOT_STATUS.md` | What's done, what's left before the first user |
| `docs/founder/OUTREACH_KIT.md` | How to find and interview the first users |
| `docs/product/EXAM_INTEGRITY.md` | Anti-cheating plan and its honest limits |
| `docs/product/XP_SYSTEM.md` | XP ideas, each with a critique |
| `docs/engineering/BILLING.md` | Billing setup and operations |
| `docs/engineering/ARCHITECTURE.md`, `docs/engineering/SECURITY.md` | Technical status |
| `docs/rubric-prompts/` | Prompts and outputs for voice-exam rubrics |
| `docs/founder/` | Founder-skill outputs: idea validation, personas, interview script, competitor matrix |

---

<div align="center">

*Built by Vahe — one laptop, one idea, every line of code.*

</div>
