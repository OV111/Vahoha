# Build Teams v2: levels, roles, task board, AI lead

> Written 2026-11-02. Builds on the Teams MVP (`backend/modules/teams`, `src/features/teams`, status in `docs/PILOT_STATUS.md`).
> **Decision (2026-11-02):** the founder chose to build this now, ahead of pilot data, the same call as the MVP on 2026-10-04. `PILOT_STATUS.md` lists further Teams work as frozen; this spec is the exception.

## Goal

A team on Vahoha should be able to run its whole project here, without Jira, and come out with evidence of the five skills a junior can't show alone:

| Skill | Evidence the platform collects |
| --- | --- |
| Reviewing other people's code | Reviews given on teammates' PRs, depth of comments |
| Splitting up work | The lead's task breakdown vs. what shipped |
| Dealing with merge conflicts | Conflicts resolved in merged PRs |
| Shipping on a deadline | Sprint goals hit vs. planned |
| Explaining decisions in a shared codebase | Defense on your own diffs (built) |

Rule carried over from the MVP: **evidence comes from real work (GitHub), never from a self-report.** A task is done when its PR is merged, not when a card is dragged.

## 1. Team level

Each member gets a team level, computed, never chosen.

| Level | Rule (starting guess, tune with real data) |
| --- | --- |
| Starter | No passed capstone. Can't join a team; shown only if an admin added them anyway |
| Junior | Capstone passed (the existing entry gate) |
| Mid | Readiness `approaching-mid` or better, **or** a confirmed CV estimate of Mid (provisional, see below) |
| Lead-eligible | Readiness `approaching-mid` or better **and** at least one finished team **and** peer average ≥ 4 **and** Judgment `strong` |

- Inputs come from `modules/readiness` (`computeReadiness`), `capstone` and `teams`. Pure rules in `teams/lib/teamLevel.js` (`computeTeamLevel`, `pickLeads`), tested in `tests/unit/teamLevel.unit.test.js`.
- Levels are computed on read, never stored, so they can't go stale. Only the CV extract is stored (`team_profiles`).
- Lead: picked again on every member change while the team is `forming`. After that a human lead stays unless they leave; an AI lead stays for the project. Ties: evidence over CV, peer rating, merged PRs, who joined first.
- Learners without a passed capstone can't join a team (unchanged).
- A level only goes up from evidence. A CV can raise a starting estimate to Mid but **can never make someone Lead-eligible**.

### CV estimate

- A **background feature with no UI** (founder decision 2026-11-02): the CV already on the profile (`cvUrl`) is read when an admin adds the user to a team (awaited, so the lead pick counts it) and when the user opens `/team` (not awaited). Nothing to press, fill in or see.
- AI extracts: skills, technologies, years of experience, past roles, areas (frontend / backend / ops / data).
- It counts straight away. There is no edit or opt-out in the UI; removing or replacing the CV on the profile removes the estimate.
- Never shown anywhere: not on the team page, the public evidence page or the recruiter scorecard. Teammates see a level, not where it came from.
- Weight fades: after the first finished team or second defense, only platform evidence counts.
- Only the extracted fields are stored (`team_profiles`). Deleting the CV deletes them.

## 2. Roles

| Role | Who | Does |
| --- | --- | --- |
| Lead | The highest Lead-eligible member, or the **AI lead** if nobody is Lead-eligible | Owns the breakdown, sprint goal and scope; approves the plan |
| Reviewer | Rotates weekly; every member reviews | Minimum reviews per week on teammates' PRs |
| Builder | Everyone, including the lead | Ships tasks |
| Area (optional) | From strongest mastery areas | frontend / backend / ops tag for task matching |

- A team needs a mix of levels: never all Juniors without the AI lead.
- Roles are per project. A member who grew can lead the next one; that change is itself evidence.

## 3. Task board

A board inside `/team`. Members create their own tasks as well as the AI lead.

**Columns:** Backlog → In progress → In review → Done.

| Move | How |
| --- | --- |
| Backlog → In progress | By hand, when someone takes the task |
| In progress → In review | Automatic: an open PR whose title or branch contains the task key (`VH-9`) |
| In review → Done | Automatic: that PR merged. Can't be done by hand |
| Any → Backlog | By hand (unassign, put back) |

**Task fields:** key (`VH-<n>`, per team), title, description, assignee, creator (member or `ai`), size (S / M / L), skills (roadmap layer ids), area, due date, sprint, status, linked PR number, comments.

**Sprints:** name, goal, start and end date, status (planned / active / closed). One active sprint per team. Progress = done tasks / sprint tasks.

**Views:** board, "My tasks", filter by member and area.

**Leaving out on purpose:** custom workflows, story points, time tracking, permission schemes, Jira-style reports.

### GitHub link

Today `contributionService` pulls merged PRs when an admin presses sync. The board also needs open PRs.

- v1 (built): read open, merged and closed PRs when the board is opened (once per 2 min per team) plus the admin button.
- v2: a GitHub webhook (`pull_request` events) on the team repo, so cards move in seconds.

Task key match: `/\bVH-(\d+)\b/i` in the PR title or head branch. One PR can close several tasks.

## 4. AI lead

The AI's role depends on the team:

| Team | Lead | AI role |
| --- | --- | --- |
| Nobody Lead-eligible | AI lead | Breaks the project into tasks, assigns them, runs sprints |
| Has a Lead-eligible member | Human | AI co-lead: drafts the breakdown and suggests assignees; the human approves or changes it. The human's edits are their "splitting up work" evidence |

**Autonomy (default, to confirm):** in an AI-led team, the AI posts a sprint plan, any member can accept it, then the AI assigns tasks itself; members can swap or reassign. Every AI action is logged on the task (`creator: "ai"`).

**v1, planning:**
- Input: project scope, repo file tree, each member's level, areas and weak spots.
- Output: tasks of 1 to 3 hours, sized, tagged with skills, with a suggested assignee and a one-line reason ("Davit: weak spot on JWT, this task trains it at his level").
- Never gives a Junior an L task on an area they have no evidence in.

**v2, running the team:**
- Weekly team update: shipped, blocked, overloaded, deadline risk.
- Warnings: PR waiting for review 3+ days, one member doing 80%+ of merged work, PR merged without review, task far above the assignee's level, sprint behind pace, member quiet for 5+ days (nudge, then flag to admin).
- PR comments in the mentor's Socratic style: questions, never the fix.

**Never:** grades evidence, removes members, merges code. Grading stays with the defense and peer ratings; removing members stays with the admin.

All AI calls go through the Groq gate (`services/groqChat.js`), priority `background`.

## 5. Admin overview of all teams

Extends `GET /api/teams/admin/overview`.

- One row per team: lead (human or AI), sprint progress, PRs this week, last activity, health (green / yellow / red), open warnings.
- Click through to the team's board, PRs and per-member contribution.
- Health rule: red if any warning is older than 3 days or no merge in 7 days; yellow if any open warning; else green.

## Data model (new collections)

```
team_profiles:  { userId, cv: { level, skills, technologies, years, roles, areas, extractedAt, confirmedAt } }
team_tasks:     { teamId, key (number), title, description, status, assigneeId, creatorId | "ai",
                  size, skills: [layerId], area, dueAt, sprintId, pr: { number, state, url },
                  createdAt, updatedAt, doneAt }
team_sprints:   { teamId, name, goal, startAt, endAt, status }
team_task_events: { teamId, taskId, actor (userId | "ai" | "github"), type, from, to, at }
team_warnings:  { teamId, type, subjectId, message, openedAt, resolvedAt }
```

`teams` gains `leadId` (userId or `"ai"`, stage 1), `coLeadId` (stage 1), `taskPrefix` and `nextTaskKey` (stage 2), `roles: { reviewerId }`. Indexes: `team_tasks { teamId, key }` unique, `{ teamId, status }`, `{ assigneeId, status }`.

## API (new)

```
GET    /api/teams/me/level                 my team level and its inputs

GET    /api/teams/:teamId/tasks            board (?sprint=&assignee=)
POST   /api/teams/:teamId/tasks            create (any active member)
PATCH  /api/teams/:teamId/tasks/:key       edit, assign, move (not to done)
DELETE /api/teams/:teamId/tasks/:key       creator or lead, only if no PR linked
GET    /api/teams/:teamId/sprints
POST   /api/teams/:teamId/sprints          lead (human) or admin
PATCH  /api/teams/:teamId/sprints/:id

POST   /api/teams/:teamId/ai/plan          AI drafts tasks for the sprint
POST   /api/teams/:teamId/ai/plan/accept   apply a drafted plan
GET    /api/teams/:teamId/warnings
```

Every write checks: active member of this team; lead-only actions check `leadId`.

Permissions as built (stage 2): any active member creates and edits tasks and comments. A member takes a free task or drops their own; assigning someone else is the lead's or co-lead's. Delete: the creator or the lead, never once a PR is linked. Sprints: lead, co-lead or admin. Admins read every board but don't edit tasks. Finished teams (`completed`, `disbanded`) have a read-only board. Writes are limited to 60 a minute per user (`boardWriteLimiter`).

## Build stages

| # | Stage | Done when |
| --- | --- | --- |
| 1 | Team level + roles: `computeTeamLevel`, `team_profiles`, `leadId`, level shown on the team page | Unit tests for every rule; lead picked automatically when a team is created |
| 2 | Task board: tasks, sprints, board UI, member-created tasks | A member can create, assign and move tasks; keys unique under concurrent creates |
| 3 | GitHub link: open + merged PR sync moves cards | Opening a PR with `VH-3` moves the card to In review; merging moves it to Done |
| 4 | CV estimate: extract, confirm, store, fade | Extraction runs once on joining, user confirms, never public |
| 5 | AI lead v1: plan a sprint, suggest assignees, accept | Plan respects levels; every AI change logged |
| 6 | AI lead v2: weekly update, warnings | Each warning type has a test with fixture data |
| 7 | Admin overview with health | One table for all teams |
| Later | Matching (forming mixed-level teams automatically), webhook sync, demo day | |

## Decisions (2026-11-02)

- AI-led team autonomy: any member accepts the AI's sprint plan, then the AI assigns; members can swap or reassign.
- Task keys: a short prefix per team (`TF-12`), set when the team is created.
- Reviews: at least 2 per member per week.
- Co-lead: in an AI-led team, the best Mid member is co-lead.
- CV: read only when the user joins Teams. Members create their own tasks too.

## Stage status

| Stage | Status |
| --- | --- |
| 1 Team level + roles | Built 2026-11-02: `GET /api/teams/me/level`, `levels` on the team response, lead and co-lead on the team page |
| 2 Task board | Built 2026-11-02: tasks, sprints, comments and the board on `/team` (drag and drop, "My tasks", sprint progress). Rules in `teams/lib/taskRules.js`. Keys from an atomic per-team counter; one active sprint per team via a partial unique index; task and sprint edits guarded against lost updates. Skills on a task are API-only for now (the AI lead sets them in stage 5) |
| 3 GitHub link | Built 2026-11-02: `POST /api/teams/:teamId/board/sync` runs when the board opens (at most once per team every 2 minutes, claimed atomically) and from a "Sync with GitHub" button; the admin sync button forces it and still copies merged-PR evidence. Reads the 100 most recently updated PRs (`listRecentPulls`). Rules in `teams/lib/prLinks.js`: the team prefix in a PR title or branch links it; only active members' PRs count; merged beats open beats closed. Open → In review, merged → Done (final, `doneAt` = merge time), closed unmerged → back to In progress. Moves are logged with actor `github`. A GitHub error keeps the 2-minute wait so an outage isn't hammered |
| 4 CV estimate | Built 2026-11-02, background only (no UI). `ensureCvEstimate` in `services/cvService.js` reads the profile CV once per file: on admin add-member (awaited, before the lead is picked) and on `GET /api/teams/mine` (not awaited). Atomic claim so two triggers read a file once; a failed read is retried at most hourly; never throws. Downloaded only from `res.cloudinary.com` (5 MB cap, type from magic bytes: PDF via `unpdf`, .docx via `mammoth`, old .doc and scans skipped), the text goes once through the Groq gate (strict JSON, prompt-injection guard) and is not stored. Level from years (2+ paid years = Mid), never from the model. Replacing or removing the CV on the profile deletes the estimate. Rules in `teams/lib/cvEstimate.js` |
| 5 AI lead v1 | Built 2026-11-02: an "AI lead: sprint plan" panel on the board. Who: any active member when the AI leads, else the lead or co-lead. The model gets the goal, members' level, confirmed CV areas and weak spots, the track's layers, open tasks and the repo file list, and drafts up to 12 tasks with sizes, skills, a suggested assignee and a reason. `lib/aiPlan.js` checks it: assignees must be active members, no L task for a Starter or Junior, nobody past a fair share, skills must be real layer ids. Reasons are told never to mention weak spots, levels or CVs (teammates see them). One draft per team (partial unique index), a new draft at most every 2 minutes. Accept keeps or drops each task and can change assignees; the changes are saved on the plan (`team_plans.edits`) as the lead's own decisions. Accepting is atomic, tasks are created with `creatorId: "ai"` through the same `insertTask` as the board. Not built: the AI posting the plan on its own, or assigning without a person accepting |
| 6 AI lead v2 | Built 2026-11-02: "This week" on `/team` (`GET /api/teams/:teamId/pulse`): health (green / yellow / red), open warnings and last week's update. Rules in `teams/lib/teamPulse.js`: review waiting 3+ days, overdue task, L task on a Starter/Junior, merge without review (14 days), one member with 80%+ of 5+ recent merged PRs, member quiet 5+ days (not in their first 5), sprint behind pace or past its end. Warnings are kept in `team_warnings` (one open per subject, partial unique index), rechecked at most every 10 minutes per team. Process warnings go to the whole team; warnings about one person go to the lead, co-lead and admins, and that person sees their own wording. The weekly update is written the first time anyone opens the page in a new week: facts from the data, plus a short note from the model at background priority (skipped if the gate is busy). No in-app notification for a quiet member (notifications need a human sender); they see their reminder on the team page. Not built: AI comments on PRs (needs write access to the repo) |
| 7 Admin overview | Built 2026-11-02: the existing team health table on the admin page (`GET /api/teams/admin/overview`) adds health, lead (person, AI or none) and co-lead, active sprint progress, open tasks and the AI lead's open warnings next to the old flags. Red teams sort first; "need attention" counts red health too. Open tasks and sprint progress for all teams come from two queries; health per open team reuses `getTeamHealthForAdmin` (same 10-minute recheck) |
| 8 Self-serve teams | Built 2026-11-02 (founder decision: no admin step to form teams). A learner with a passed capstone (live, non-test certificate) and a connected GitHub account starts a team on any roadmap track, proven ones listed first (`POST /api/teams/start`; founder decision 2026-11-02: any passed capstone opens Teams, the team's track is a free choice) or joins one that is forming (`GET /api/teams/open`, `POST /:teamId/join`, up to 6). The GitHub login always comes from their own GitHub sign-in. The creator, lead or co-lead sets the repo (`PUT /:teamId/repo`; the owner must be a member's login) and starts the project (`POST /:teamId/begin`: 2+ members and a repo; closes the team to new members). Anyone leaves a running team (`POST /:teamId/leave`); a forming team left empty is disbanded. A person can be on several teams: `MAX_RUNNING_TEAMS` in `constants/teams.js` caps running teams, `null` = no limit (founder decision 2026-11-02). Pages: `/teams` is the hub (your teams, start, teams looking for members, top teams), `/team/:teamId` each team's workspace, `/team` opens your only running team or the hub. `GET /api/teams/mine/all` lists your teams, running first. Rules in `teams/lib/membership.js`. Admins keep the overview, member removal, defense and completion, and alone issue the evidence page |
| Dev: mock teams | `npm run seed:mock-teams` creates three forming teams with fake members (`teams.mock`, `users.mockTeamMember`, no password or sign-in) to try the join flow; `-- --remove` deletes them with their boards and frees any real user who joined one. Refuses a non-local `MONGO_URI` unless `--allow-remote` |
