# Docs

Start with [`PILOT_STATUS.md`](PILOT_STATUS.md): what is done, what is left before the first user, and what is frozen. Older docs can lag behind the code; when they disagree, the code and `PILOT_STATUS.md` win.

## What Vahoha is

A learning platform for developers. A learner picks a roadmap track and works through ordered layers. Each layer stays locked until a server-graded test is passed. Around that loop: coding challenges, labs, a mentor that knows the learner's weak spots, capstone projects (AI repo review plus a timed defense), and Build Teams that turn merged pull requests into public evidence. Pre-pilot: no real users yet.

## Stack

| Part | Tech |
|---|---|
| Frontend | React 19, Vite 7, React Router 7, Zustand, Tailwind 4, CodeMirror 6, plain `fetch` hooks. SSR prerender pass for SEO |
| Backend | Node 22, Express 5 (ESM), MongoDB native driver, Zod, BullMQ + Redis, Socket.IO, `isolated-vm` code sandbox, JWT |
| AI | Groq (`openai/gpt-oss-120b`) |
| Services | Polar (billing), Resend (email), Cloudinary (media), GitHub API and OAuth, Google sign-in, PostHog |
| Hosting | Vercel (frontend), Render (backend), MongoDB Atlas |
| Tests | Vitest (unit, frontend, integration, API, security, concurrency, WebSocket, queue, performance), Playwright e2e |

## Folder structure

```
src/               frontend: features/<name>/, pages/, components/ui, hooks, lib, stores
backend/modules/   one folder per feature: routes, controllers, services, schemas, index.js
backend/services/  shared learning core (XP ledger, progress, mastery)
backend/seeders/   seeders and importers (roadmap, exams, challenges, capstones)
backend/scripts/   admin and maintenance scripts
config/            one Vitest config per test kind
tests/             Playwright specs
docs/              this folder
```

## engineering/ — how the system is built and run

| Doc | What it is |
|---|---|
| [`ARCHITECTURE.md`](engineering/ARCHITECTURE.md) | Stack, modules, data flow, known limits |
| [`DATA_MODEL.md`](engineering/DATA_MODEL.md) | Collections, fields, relationships, indexes (with an ER diagram) |
| [`API.md`](engineering/API.md) | Every endpoint: method, path, auth, notes |
| [`SECURITY.md`](engineering/SECURITY.md) | How security works, known risks, fix order, the original audit |
| [`DEPLOYMENT.md`](engineering/DEPLOYMENT.md) | Hosting, env vars, build and deploy, CI, seeding, pre-deploy checklist |
| [`AI.md`](engineering/AI.md) | Models, prompts, cost controls, guardrails, evals |
| [`BILLING.md`](engineering/BILLING.md) | Polar billing setup, plan gates and usage limits |
| [`adr/`](engineering/adr/) | Architecture decision records (template plus four inferred decisions) |

## product/ — how features should behave

| Doc | What it is |
|---|---|
| [`EXAM_INTEGRITY.md`](product/EXAM_INTEGRITY.md) | Anti-cheating plan and its honest limits |
| [`LEARNING_SYSTEM.md`](product/LEARNING_SYSTEM.md) | Read-then-practice lessons, Go deeper ladder, auto-tracked progress |
| [`LAB_SYSTEM.md`](product/LAB_SYSTEM.md) | Labs: shared lesson core plus per-track lab kinds |
| [`FOUNDATIONS_LESSON_GUIDE.md`](product/FOUNDATIONS_LESSON_GUIDE.md) | How to write Foundations lessons |
| [`ROADMAP_LAYER_AUTHORING.md`](product/ROADMAP_LAYER_AUTHORING.md) | How to author roadmap layers |
| [`XP_SYSTEM.md`](product/XP_SYSTEM.md) | XP rules, current ledger, ideas with critiques |

## founder/ — why, for whom, and how to find users

Founder-skill outputs (skills write here, keep the path) plus the outreach kit.

| Doc | What it is |
|---|---|
| [`facts.md`](founder/facts.md) | Checked facts about Vahoha |
| [`pitch.md`](founder/pitch.md) | One-page pitch |
| [`business-model.md`](founder/business-model.md) | Pricing and revenue hypotheses |
| [`mvp-scope.md`](founder/mvp-scope.md) | What is in and out for the pilot |
| [`metrics.md`](founder/metrics.md) | The few numbers to watch |
| [`go-to-market.md`](founder/go-to-market.md) | First 100 users |
| [`OUTREACH_KIT.md`](founder/OUTREACH_KIT.md) | Finding and interviewing the first users, the $15 payment ask |
| [`user-interviews.md`](founder/user-interviews.md) | Interview script |
| [`persona-gen.md`](founder/persona-gen.md), [`competitor-matrix.md`](founder/competitor-matrix.md), [`validate-idea.md`](founder/validate-idea.md) | Who it is for, who else is there, the idea verdict |
| [`FOUNDER_THINKING.md`](founder/FOUNDER_THINKING.md) | Learning plan: 7 founder concepts, the problem chain, products to reverse-engineer |

## Other folders

| Folder | What it is |
|---|---|
| [`challenge-prompts/`](challenge-prompts/) | Prompts and outputs for authoring coding challenges |
| [`exam-prompts/`](exam-prompts/) | Prompts and outputs for exam question banks, one folder per track group |
| [`capstone-prompts/`](capstone-prompts/) | Prompts and outputs for generating capstone briefs (`backend/scripts/capstonePrompt.js` writes here) |
| [`brand/`](brand/) | Brand assets, such as the Google sign-in logo |
