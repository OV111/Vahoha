# Exam Integrity — Anti-Cheating Plan

> Updated: 2026-11-10 · Built: #1 (bigger-bank seeder, unseen-first), #2 (cooldown), #3 (one question at a time with a per-question timer), #4 (tab leaves, now enforced in the layer test), copy blocking, mentor pause during a test, review flags on coding challenges; also per-user rate limits on the LLM routes. Not built: #5 (oral exam). #6 ruled out. Banks are not yet re-seeded to 60.

## The honest constraint

No unproctored online exam is cheat-proof; HackerRank and CodeSignal accept the same limit. The goal is to **raise the cost of cheating** and to **stop claiming more than the exam proves**. Multiple-choice questions (MCQ) can never be made ChatGPT-proof, because LLMs are very good at them.

## Current state (verified in code 2026-11-10)

Rules live in one place, `constants/exam.js`, and the server and the intro screen both read it.

**Layer test (MCQ)**

- 15 questions per attempt, sampled from a bank of up to 60 per layer; unseen questions are served first. The seeder tops banks up to 60, but the **banks are not re-seeded yet**, so live layers may still serve their old 15.
- The server sends **one question at a time** (`POST /api/exams/answer` returns the next one). 40 seconds per question, checked on the server; a late answer is a skip. No going back.
- Pass mark 80%. 3 submitted attempts per layer per day. 30-minute cooldown after a fail.
- **Tab leaves are enforced.** The browser reports each leave (`POST /api/exams/leave`) and the server counts them: the first is a warning, the second ends the attempt as a fail (`voided`), so the cooldown and the daily limit apply. A voided attempt writes nothing to exam history, weak spots or mastery.
- Question text cannot be selected, copied or right-clicked (`src/components/integrity/NoCopy.jsx`).
- The mentor is paused while a test question is on the clock (`hasLiveExam`), the same way it is during a defense question.
- Layer order is enforced when an attempt is generated (`assertLayerUnlocked`, 403).

**Capstone defense**

- Question text cannot be copied; the answer box refuses paste and drop, so answers are typed.
- Paste attempts and tab switches are stored per question for the admin view. They never change the grade, and a tab leave is **not** punished: the question links to the learner's own file on GitHub.
- The mentor is paused while a defense question is on the clock.

**Coding challenges**

- The problem statement cannot be copied.
- A first passing submission is flagged for review (`challenge_integrity` collection) when a paste of 200+ characters was reported, or when the code was added faster than anyone can type (measured by the server). Flags never change the verdict or the XP. There is no admin screen for these flags yet.

**Limits that remain**

- Tab leaves and pastes are reported by the browser, so a modified client can stay silent. A screenshot, a phone camera or a second device is not detected at all.
- No proctoring. The oral exam is not built (frozen until pilot data).
- `VISION.md` says "defended", not "verified".

## Other ideas, not built

- AI-generated variation of each question per attempt, on top of the reviewed bank.
- For the oral exam: unpredictable follow-ups, a strict time limit, no pause, paste and timing logged as review-only signals; no webcam.

## Techniques, cheapest first

| # | Technique | Stops | Doesn't stop | Cost |
| --- | --- | --- | --- | --- |
| 1 | **Bigger bank:** about 60 questions per layer, serve a random 15, prefer questions this user hasn't seen | Memorizing and sharing answers | Live ChatGPT | 1–2 days + hand-review of 4x more questions |
| 2 | **Turn the cooldown back on** (`COOLDOWN_ENABLED = true`) | Rapid retrying until you pass | Live ChatGPT | Minutes |
| 3 | **Per-question timer** (40s, no going back, one question served at a time) | Slows copy-to-ChatGPT | A fast cheater | Hours (frontend + server-side check) |
| 4 | **Integrity signals:** tab leaves (`visibilitychange`) and paste events. In the layer test the second leave ends the attempt; elsewhere they are flags only | Switching to an AI tab during a test | Second device, modified client | Hours |
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
- **Signals test:** switching tabs once during a layer test shows a warning; switching twice ends the attempt and starts the cooldown.
- **Copy test:** selecting or right-clicking a question does nothing; pasting into a defense answer does nothing.
