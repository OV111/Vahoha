# ADR 001: Groq as the only LLM provider

- **Status:** accepted
- **Date:** 2026-09-26 (stated in `streamService.js` and the earlier roadmap plan)
- **Basis:** **inferred** from the code, with the date taken from a code comment. Confirm with the owner.

## Context

Every AI feature (mentor, teach-back grading, capstone review and defense, team defense) needs a hosted model. The project is solo and pre-revenue, so cost is the binding constraint. The earlier plan recommended Anthropic, which has no free tier.

## Decision

Use Groq through `groq-sdk`: `openai/gpt-oss-120b` for conversations and grading, `openai/gpt-oss-20b` for cheap calls (conversation titles). The model name is a constant in each service, with the client in one place (`backend/config/groq.js`).

## Alternatives considered

| Option | Why not |
|---|---|
| Anthropic API | No free tier for a pre-revenue project (the original recommendation was superseded) |
| Google Gemini | A client file exists (`config/gemini.js`) but nothing imports it, so it was dropped or never used |
| Self-hosted model | Operations cost for a solo developer |

## Consequences

- Good: free tier for development, low cost per mentor day on a paid tier, one SDK.
- Bad: the free tier allows about 8k tokens per minute, so real capstone reviews fail with 413 (a local `GROQ_TPM_LIMIT` workaround shrinks requests). Groq retires models, so a 404 means a model constant must be updated. `gpt-oss` is a reasoning model, so `max_tokens` must cover thinking plus the answer. The model is text-only.
- Revisit when: paid-tier cost per learner is known (see [Billing](../BILLING.md)), or answer quality is not good enough for grading.

## Evidence

`backend/config/groq.js`, `modules/ai-agent/services/streamService.js` (comment on retired models), `modules/capstone/lib/tokenBudget.js`, [AI](../AI.md).
