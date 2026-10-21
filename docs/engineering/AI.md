# AI Features

> **Updated:** 2026-10-21. Read from the code. Cost figures are in [Billing](BILLING.md) and `docs/strategy/BUSINESS_MODEL.md`, not repeated here.
> See also: [Architecture](ARCHITECTURE.md) · [Security](SECURITY.md) · [API](API.md)

**Contents:** [Overview](#overview) · [Where the prompts live](#where-the-prompts-live) · [Mentor](#mentor-devbot) · [Teach-back](#teach-back-grading) · [Capstone review and defense](#capstone-review-and-defense) · [Cost controls](#cost-controls) · [Guardrails](#guardrails) · [Evaluation](#evaluation) · [Not built](#not-built-or-unused)

---

## Overview

All LLM calls go to **Groq** through the `groq-sdk` client in `backend/config/groq.js` (needs `GROQ_API_KEY`). There is no other provider in use.

| Feature | Model | Output | Code |
|---|---|---|---|
| AI mentor ("DevBot") | `openai/gpt-oss-120b` | Streamed text (SSE) with tool calls | `modules/ai-agent/services/streamService.js` |
| Conversation titles | `openai/gpt-oss-20b` | One short title | `modules/ai-agent/services/titleService.js` |
| Teach-back grading and follow-up | `openai/gpt-oss-120b` | JSON score against a rubric / one question | `services/teachBackEvaluatorService.js` |
| Capstone rubric review | `openai/gpt-oss-120b` (`REVIEW_MODEL`) | Strict JSON schema, temperature 0 | `modules/capstone/services/reviewModel.js` |
| Capstone defense questions and grading | same | Strict JSON schema | `modules/capstone/services/defenseService.js` |
| Team defense (per member PRs) | same | Questions from the member's merged PRs, graded with the capstone grader | `modules/teams/lib/teamDefense.js` |

`gpt-oss` is a reasoning model, so `max_tokens` must cover its thinking **and** the answer. Groq retires models: a 404 means check `GET https://api.groq.com/openai/v1/models` and update the model constant.

---

## Where the prompts live

Prompts are string constants in code. There is no prompt store or admin editor.

| Prompt | File |
|---|---|
| Mentor system prompt | `modules/ai-agent/services/streamService.js` (`SYSTEM_PROMPT`, plus the learner summary and current-activity text added per turn) |
| Teach-back evaluator and follow-up | `services/teachBackEvaluatorService.js` (`SYSTEM_PROMPT`, `FOLLOW_UP_SYSTEM_PROMPT`) |
| Capstone review | `modules/capstone/lib/reviewPrompt.js` (versioned: `REVIEW_PROMPT_VERSION = "capstone-review-v3"`, bump on any change) |
| Capstone defense | `modules/capstone/lib/defense.js` |
| Team defense | `modules/teams/lib/teamDefense.js` |
| Exam question banks (offline) | `docs/exam-prompts/`, `docs/challenge-prompts/`, `docs/capstone-prompts/`, written by scripts, pasted into a chat model by hand. Not a runtime feature |

---

## Mentor (DevBot)

`POST /api/ai-agent/stream`. A Socratic mentor: it asks leading questions and gives progressive hints, and never writes test answers, capstone code, defense answers or challenge solutions.

**Flow of one turn**

1. Validate the body (Zod) and check the daily cap and burst limit.
2. Build the system prompt: the fixed `SYSTEM_PROMPT` plus a short **learner summary** (progress, weak spots, mastery, teaching log) injected on every turn, plus the **current activity** (page, layer, topic, challenge) sent by the frontend.
3. Fold any attached files into the user message, fenced as data.
4. Call the model with tools. Run tool calls (up to **5 rounds**), append results, call again.
5. Stream tokens to the client through the `SolutionGuard`, then save the turn.

**Tools** (`agentTools.js`, all read the real database for the signed-in learner): `get_user_progress`, `get_exam_history`, `get_weak_spots`, `log_weak_spot`, `get_learner_context`, `get_concept`, `log_teaching_attempt`, `get_challenge_attempt`, `get_capstone_status`, `search_posts`, `search_library`, `get_user_profile`.

**Memory:** a 20-turn window per session. There is no cross-session free-text memory. Long-term state is held as structured signals in `weakSpots`, `learnerMastery` and `mentor_teaching_log`.

**Attachments:** up to 3 text files, 256 KB each, 8,000 characters per file and 16,000 in total. The model is text-only, so images are rejected with an explanation. Limits are enforced server-side (`aiAgent.schemas.js`); the frontend copy only fails fast.

---

## Teach-back grading

`POST /api/exams/submit-teach-back` and `-followup`. The learner explains a concept in their own words. The evaluator scores it against a stored rubric (`teach_back_rubrics`), lists misconceptions detected, and may ask one follow-up. Temperature 0.1, max 2,048 tokens. Results feed `learnerMastery`. Typed text only today; the spoken exam is a frozen spec (`docs/product/VOICE_EXAM_SPEC.md`).

---

## Capstone review and defense

1. **Repo fetch** (GitHub API, `GITHUB_TOKEN`): up to 1,500 files listed, 60 files reviewed, 12,000 characters per file, files over 200 KB skipped.
2. **Review:** one structured call. Rubric scored 0 to 4 per criterion, grounded in the repository text. Criteria at or below 1 become weak spots.
3. **Defense:** the model writes timed questions about the learner's own code, and later grades the typed answers against a rubric.
4. Prompt versions and the model `usage` (token counts) are stored on the review and defense documents.

Team defense reuses the capstone grader on a member's own merged PR diffs.

---

## Cost controls

| Control | Value | Where |
|---|---|---|
| Mentor messages per user per day | 30 (same for every plan) | `sessionService.js` (`DAILY_MESSAGE_CAP`) |
| Mentor conversation window | 20 turns | `sessionService.js` (`MAX_TURNS`) |
| Tool rounds per turn | 5 | `streamService.js` |
| Burst limit on all LLM routes | 10 per minute per user | `middleware/aiRateLimit.js` |
| Teach-back | 40 per day per user | `aiRateLimit.js` |
| Attachment size | 3 files, 16,000 characters | `aiAgent.schemas.js` |
| Capstone attempts | 3 per learner and track | `capstone/lib/constants.js` |
| Capstone code sent to the model | 80,000 characters by default (`CAPSTONE_REVIEW_MAX_CHARS`) | `lib/constants.js`, `repoFiles.js` |
| Free-tier fit | `GROQ_TPM_LIMIT` sizes input and `max_tokens` to the tier and lowers reasoning effort. **Local only**; unset on a paid tier | `capstone/lib/tokenBudget.js` |
| Retries | The Groq SDK retries 429s; capstone calls add one retry (`callWithOneRetry`) | |
| Titles | Cheaper 20b model, `max_tokens` 80, low reasoning | `titleService.js` |

The limiters are in memory (reset on restart, not shared across instances). No user is billed per token: see [Billing](BILLING.md#when-would-a-user-be-billed-for-usage-not-built).

---

## Guardrails

| Risk | Defence |
|---|---|
| Mentor writes a challenge solution | The prompt forbids it, and `SolutionGuard` sits on the outgoing stream and cuts any fenced code block after 4 lines, so even a jailbroken model cannot hand over a working function |
| Prompt injection through attached files | Files are wrapped in `<<<FILE …>>>` markers and labelled as data, with the instruction restated after the content |
| Prompt injection through a learner's repository | Repository text is wrapped in delimiters carrying a **random nonce per request**, the prompt says to ignore instructions inside, and `scanForInjection` flags known patterns for admin review (`reviewPrompt.js`) |
| Learner answers steering the grader | Defense answers are also untrusted and nonce-delimited (`defense.js`) |
| Mentor hands out exam answers | The prompt tells it never to. The exam-history tool returns scores and missed topics; `TODO: confirm` that no tool can return an answer key. An earlier live test showed a refusal and a Socratic redirect |
| Unreliable grading output | Capstone calls use a strict JSON schema; invalid output is rejected and retried once |
| Copy-paste or tab-switch cheating on defenses | Paste and tab-switch counters are recorded and shown to reviewers, never auto-failed |

**Honest limits:** an LLM-graded capstone is "defended", not "verified". It is not proctored (`docs/product/EXAM_INTEGRITY.md`). Prompt injection defences reduce risk and do not remove it.

---

## Evaluation

`npm run eval:mentor` runs `backend/evals/mentor/cases.json` (20 cases) through the real mentor loop and scores replies with an LLM judge (`EVAL_JUDGE_MODEL`, default `openai/gpt-oss-120b`). Reports are written to `backend/evals/results/`. Rubric quality for teach-back and capstone grading is **not** checked against human graders: only a few sample rubrics exist, so do not show numeric skill scores built on them.

---

## Not built or unused

- **Speech to text:** `transcriptionService.js` is a scaffold that throws "Not implemented". The plan is browser speech recognition for free users.
- **Gemini:** `config/gemini.js` exists, but nothing imports it (`TODO: confirm` and remove the package and `GEMINI_API_KEY` if unused).
- **Voice teach-back exam**, proactive mentor nudges, mentor modes: specs and ideas only (`docs/product/`).
- **Token metering and usage-based billing:** none.
