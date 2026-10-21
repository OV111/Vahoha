# ADR 004: Server-authoritative progression and short-lived tokens

- **Status:** accepted
- **Date:** 2026-06 to 2026-10 (progression and token changes)
- **Basis:** **inferred** from the code and the security status table.

## Context

The product's promise is that a layer unlocks only after a passed test. If the client could send scores or unlock layers, the promise would be worthless. Early versions kept progress in localStorage and used 7-day tokens with no revocation.

## Decision

All grading, unlocking and XP happen on the server. Answer keys never leave it, attempts have a server-side time limit, layer order is checked when an attempt is generated, and all XP goes through one ledger (`awardXp`). Auth uses a 15-minute access token held in memory plus a rotating, revocable refresh token in an httpOnly cookie.

## Consequences

- Good: the credential cannot be forged by editing client state; sessions can be revoked; one place to audit XP.
- Bad: more server code and database writes per action. A multiple-choice test still cannot stop a second-screen LLM, so the strongest proof is the capstone defense, described as "defended", never "verified".
- Revisit when: spoken exams or proctoring are added (`docs/product/EXAM_INTEGRITY.md`).

## Evidence

`modules/exams/services/examEngineService.js`, `services/layerUnlock.js`, `services/xpService.js`, `modules/auth/services/refreshTokenService.js`.
