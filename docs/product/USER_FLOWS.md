# User flows

Core flows as they work in code on 2026-10-21. Events are those recorded by `backend/services/eventService.js`. Use them to find where users drop.

## 1. First session (the pilot loop)

| Step | Where | Event |
|---|---|---|
| Sign up | `/get-started` | `signup` |
| Pick a path | `/roadmaps` | `path_selected` |
| Study a layer | `/learn/:track/:layer` (lessons, library, posts for the layer) | none |
| Ask the mentor | `/ai-agent` | `mentor_message` |
| Take the layer test | `/roadmaps/exam/:layerId` | `exam_started`, `exam_submitted` |
| Pass (80+) | next layer unlocks, XP awarded once per layer | none |
| Fail | weak topics recorded, 30-min cooldown, mentor suggests review, retry (3 per day) | none |
| Come back | any later visit | `active_day` |

Success: a stranger completes this in one sitting and returns within 7 days (`docs/founder/metrics.md`).
Blocked today for real users: password reset and magic link need real email sending.

## 2. Practice
Coding challenge in the arena: solve in JS or TS, hidden tests run in a browser worker or on the server, first solve gives XP (`challenge_solved`). Hints cost XP. 30 graded submissions a day on Free.

## 3. Proof (capstone)
1. Open `/capstone/:trackId`, read the brief, connect GitHub (`capstone_started`).
2. Submit a repository that belongs to your GitHub login (`capstone_submitted`).
3. AI repository review, 3 attempts.
4. Timed defense: typed questions about your own code. Failed sessions wait 72 hours (`capstone_passed` or `capstone_failed`).
5. Pass gives a public certificate at `/verify/:publicId` and 300 XP.

## 4. Team evidence
Capstone passer is placed in a team by an admin, builds in a shared repo, merged PRs are synced, each member defends their own PRs (`team_defense_passed`, 300 XP), peers rate, and evidence is issued with consent (`team_evidence_issued`) at `/evidence/:publicId`. Never run with real people.

## 5. Recruiter view
Learner opts in, a public scorecard appears at `/candidate/:username`, recruiters browse `/candidates` (closed to non-recruiters).

## Open questions
- TODO: confirm what a learner sees right after a failed test (copy and next action) by walking it on production.
- TODO: confirm how a user learns Teams exists before passing a capstone (a pointer card exists after a pass).
