# Exam Integrity — Anti-Cheating Plan

> Updated: 2026-10-02 · Built: #1 (bigger-bank seeder, unseen-first), #2 (cooldown), #4 (tab-switch and paste flags); also per-user rate limits on the LLM routes. Not built: #3 (per-question timer), #5 (oral exam). #6 ruled out. Banks are not yet re-seeded to 60.

## The honest constraint

No unproctored online exam is cheat-proof; HackerRank and CodeSignal accept the same limit. The goal is to **raise the cost of cheating** and to **stop claiming more than the exam proves**. Multiple-choice questions (MCQ) can never be made ChatGPT-proof, because LLMs are very good at them.

## Current state (verified in code 2026-10-21)

Rules live in one place, `constants/exam.js`, and the server and the intro screen both read it.

- 15 questions per attempt, sampled from a bank of up to 60 per layer; unseen questions are served first. The seeder tops banks up to 60, but the **banks are not re-seeded yet**, so live layers may still serve their old 15.
- Pass mark 80%. Time limit 600 s for the whole exam. 3 submitted attempts per layer per day. 30-minute cooldown after a fail.
- Tab-switch and paste counts are stored on the attempt (`integrity`). They are review-only and never change the grade.
- Layer order is enforced when an attempt is generated (`assertLayerUnlocked`, 403).
- No per-question timer, no proctoring. The oral exam is not built (frozen until pilot data).
- `VISION.md` now says "defended", not "verified".

## Other ideas, not built

- AI-generated variation of each question per attempt, on top of the reviewed bank.
- For the oral exam: unpredictable follow-ups, a strict time limit, no pause, paste and timing logged as review-only signals; no webcam.

## Techniques, cheapest first

| # | Technique | Stops | Doesn't stop | Cost |
| --- | --- | --- | --- | --- |
| 1 | **Bigger bank:** about 60 questions per layer, serve a random 15, prefer questions this user hasn't seen | Memorizing and sharing answers | Live ChatGPT | 1–2 days + hand-review of 4x more questions |
| 2 | **Turn the cooldown back on** (`COOLDOWN_ENABLED = true`) | Rapid retrying until you pass | Live ChatGPT | Minutes |
| 3 | **Per-question timer** (about 45s, no going back) | Slows copy-to-ChatGPT | A fast cheater | Hours (frontend + server-side check) |
| 4 | **Integrity signals:** log tab-switch (`visibilitychange`) and paste events, flag only, never affects the grade | Nothing alone; marks suspicious attempts for review | Second device | Hours |
| 5 | **Oral teach-back with follow-ups** | Most cheating; it's hard to fake explaining something live | A live LLM on a second screen (raises cost, not airtight) | Weeks |
| 6 | **Webcam/screen proctoring** | Most cheating | Determined cheaters | Expensive, invasive, bad for B2C. **Ruled out** |

## Decision (recommended)

1. **Reposition (free, now).** The MCQ exam is *practice and self-diagnosis*: it unlocks layers and finds weak spots, and cheating only cheats yourself. **Only the oral teach-back counts as the credential.** This matches the industry pattern: practice tests are unproctored, certification is proctored.
2. **Build #1, #2 and #4** so the MCQ exam can't be passed by memorizing, and suspicious attempts are visible.
3. **Validate #5 by hand first.** Run 5 Zoom sessions where the founder acts as the examiner before writing any voice code.
4. Until #5 exists, no doc or pitch says "hard to fake" or "verified" about the MCQ exam.

## How to test it worked

- **Memorization test:** take the same layer 3 times; fewer than half the questions should repeat between attempts.
- **ChatGPT test:** someone who hasn't studied, with ChatGPT open, still passes. That's expected for MCQ, and it's why step 1 repositions the exam instead of pretending.
- **Signals test:** switching tabs during an attempt shows up on the stored attempt record.
