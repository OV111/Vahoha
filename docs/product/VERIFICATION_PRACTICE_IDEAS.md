# Verification practice ideas

Status: **idea, not scoped, parked until the pilot** (see `PILOT_STATUS.md`). Nothing here is built.

## Why

Research on developers in the AI era (Kam et al. FSE '25, the GENIUS vision paper, Alenezi 2026, Acharya 2025) points to one shared claim: code is cheap, and *verifying, explaining, and owning* it is the scarce skill. Juniors are least equipped for it. These ideas train and prove that skill. Figures from these papers were taken from summaries; verify before citing.

Test for every feature below: **"I won't commit code I couldn't explain."**

## 1. Bug hunt (Coding Challenges)

- The learner sees plausible AI-style code with a hidden bug, security hole, or bad design choice.
- They locate it and write *why* it is wrong.
- Content: hand-written bank of samples plus a rubric (known issues, accepted explanations). First version: ~20 hand-written items.
- Grading: location check is deterministic (line or region). The "why" is graded by an LLM against the rubric. Spot-check LLM grading against human judgment.
- Constraint: follow `challenge-authoring-rules` (grader gotchas, no timers).

## 2. Peer code review (Build Teams)

- Teammates review each other's real pull requests inside a team project.
- Review quality is scored against what the PR really contained: issues found, issues missed, useful vs noisy comments.
- Open question: how to score reviews on real PRs where there is no answer key. Options: reviewer agreement, maintainer reaction, an LLM-seeded known-issue list.
- Fits the Teams idea that merged PRs become public evidence: a reviewed PR is stronger evidence than an unreviewed one.

## 3. Oral defense (Capstone and Teams)

- A mock interview about the learner's own project: "why this data structure?", "what breaks at 10x load?", "what would you change?"
- Questions are generated from the actual code and brief, then adapted by the learner's answers.
- Possible gate: a capstone is not marked complete until the defense passes.
- Delivery: text first, voice later (see below).

## 4. Explain-back (voice checker AI): founder's idea

- After finishing a task, the learner explains it aloud. An AI asks follow-ups and grades understanding.
- Already specced as a spoken teach-back exam: see `VOICE_EXAM_SPEC.md` (frozen) and the Teach-Back concept in memory.
- Oral defense (3) and explain-back (4) are the same mechanism at different anchors: a layer/exam vs a capstone/team project. Design them as one engine.

## Principles

- Prove grading quality on text transcripts before building voice infrastructure.
- One loop first: see code, find the flaw, explain it, get feedback. Measure whether people come back.
- Evidence should be hard to fake and explainable by the learner.
