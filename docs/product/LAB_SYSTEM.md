# 🧪 Lab system

> **Status · 2026-11-09**
> - ✅ One real lab works end to end: mern-2, closures. Real grading in the sandboxed worker, hint ladder, solution, name-it, saved progress (localStorage), roadmap links both ways
> - ✅ `/labs` shows 10 lab rooms; `/labs/:room` lists a room's tracks; Foundations is a room with its own page
> - ⏳ Every other lesson shows "No lab for this lesson yet"
> - 🎯 Pilot: MERN layers 1–3
>
> Extends [`LEARNING_SYSTEM.md`](LEARNING_SYSTEM.md). **Lessons teach; labs are where the learner practices.**

## 💡 The idea: same method, different lab

How people learn is the same in every subject; what they practice on is not. Every track shares the lesson core (read, check, explain, go deeper). The lab is a full-screen workspace with graded tasks, and its kind depends on the track.

| | Route | What it is |
| --- | --- | --- |
| **Lesson** | `/learn/:track/:layer/:topic` | Read, predict/MCQ, explain back, Go deeper |
| **Lab** | `/learn/:track/:layer/:topic/lab?task=N` | Graded tasks: Debug → Build → Review AI code |
| **Lab hub** | `/labs`, `/labs/:room` | Labs grouped into rooms by how people practice |

## 🧩 Task types

| Type | Color | The learner | Checked by |
| --- | --- | --- | --- |
| `fix` (Debug) | amber | Gets broken code with failing tests, fixes it, names the cause | Tests pass; cause matched |
| `write` (Build) | sky | Writes it from a near-empty stub | Tests pass |
| `review` (Review AI code) | rose | Reads AI-written code that passes its happy-path tests, finds what breaks in production, writes a test that proves it, fixes it, names the risk | Their test fails on `aiCode` and passes on their fix; hidden tests pass; risk matched |

**Why `review` matters:** most new code a developer touches is written by an AI, so the skill to practice is judging it. AI is weakest on **concurrency, security, performance and system boundaries**, so every `review` task hides a bug there. Step "prove it with a failing test" also makes the lab harder to finish by pasting it into an AI.

Example for MERN: an Express handler checks stock, then decrements it in two separate queries. It passes the given tests; two parallel orders oversell. The learner writes the parallel test, fixes it with an atomic update and names the **race condition**.

**Hint ladder:** nudge → hint → near answer, then "Show solution". Failed checks show *expected / received*, grouped as AI's tests · Your test · Hidden tests.

## 🏠 Lab rooms

`src/features/labs/rooms.js`: 10 rooms that group labs by how people practice, not by topic name. Each roadmap category maps to one room; a few tracks override their category's room. Rooms: Foundations, Build Software, Data Storage, Data & AI, Infrastructure & Cloud, Security, Quality & Testing, Blockchain & Web3, Quantum, Games & Graphics.

## 🧰 Lab kinds (planned)

Only `code` exists. The others are the plan for tracks the code runner can't serve. A track without a lab still gets full lessons (`none`).

| Kind | Practice surface | Checker | Tracks | Runtime |
| --- | --- | --- | --- | --- |
| ✅ **`code`** | Editor, Run, tests | Arena test runner (worker) | JS/TS, fullstack, Node backend | built |
| `sql` | Query editor, result table | Compare rows | Postgres, MySQL, data | PGlite or sql.js |
| `nosql` | Query shell | Returned data and final state | MongoDB, Redis, … | in-browser engines |
| `preview` | HTML/CSS/React with live page | DOM assertions | frontend, web-game | sandboxed iframe |
| `python` | Editor, Run, tests | pytest-style asserts | Python, AI/ML, data | Pyodide |
| `circuit` | Drag gates on qubits | Final state vector | quantum | small JS simulator |
| `contract` | Contract editor, deploy, call | Results, events, failed attacks | smart contracts, DeFi | solc-js + in-browser EVM |
| `terminal` | Commands, YAML, Dockerfiles | Rule checks on the result | DevOps, cloud, security | simulated shell |
| `diagram` | Boxes and arrows | Required parts and links | system design | none |
| `none` | No workspace | Lesson checks only | GRC, manual QA, game design | none |

Before building a new kind, write a short brief for that domain: what the job does, how pros test it, what proves progress, and what runs in the browser.

## 🏛️ Code

```text
src/features/labs/
  LabsPage.jsx  RoomPage.jsx  LabPage.jsx   hub, room, workspace
  rooms.js                                   the 10 rooms
  taskTypes.js                               label, icon, colors per task type
  components/   TaskStepper, TaskBrief, HintLadder, Workspace, ResultsDock, NameItCard, LabCard
  content/
    schema.js                                zod: lab + fix / write / review tasks
    index.js, manifest.js                    loadLab(track, layer, lesson), lazy per lab
    <track>/<layer>/<lesson>.js              one lab per lesson, in its own file
  lib/checkTask.js                           runs a task on the Arena's sandboxed worker
  lib/labProgress.js                         lab-done progress (localStorage)
  hooks/useNextLab.js
```

- Labs live in their own files, not inside the lesson file, so a lab can exist before its lesson's steps are written.
- The `review` task also carries `testFile`, `testStarter` and a reference `proofTest`.
- Content tests run every task's `solution` against its `tests` (must pass) and its `starter` (must fail), and check that each `review` task's `aiCode` passes `happyTests` but fails `tests`. A broken lab can't ship.

> [!WARNING]
> Grading runs in the browser: fast, free, works offline. **A browser result can be faked**, so it only drives practice progress. Anything that counts (XP, layer pass) comes from the server: the layer test, the capstone defense, `awardXp`.

## 🔄 Flow

Layer card (Learn → Lab → done) → lesson finish screen ("Practice it in the lab" or skip) → Debug → Build → Review AI code → lab complete. A lesson counts as done when its lab is passed; in a track with no lab, the lesson alone counts.

## 🎯 Next

| Step | What ships | Done when |
| --- | --- | --- |
| 1 | Labs for the rest of MERN layers 1–3, written with the lesson content pipeline | Every pilot lesson has a lab |
| 2 | `parsons` task type (order the lines) | One parsons task per lab |
| 3 | Track → kind mapping and `none` | A non-JS lesson shows no lab cleanly |
| 4 | Next kind by demand (likely `sql`) | Per kind |

| Waits for | Trigger to revisit |
| --- | --- |
| Second lab kind | Users ask for a track that needs it, or mern-2 lab completion is above 50% |
| AI-generated labs | 3+ hand-written labs pass review, so the generator has examples |
| Server grading | Labs start awarding XP |

> [!CAUTION]
> **Riskiest assumption:** learners open the lab instead of skipping to the next lesson. Test with 5 developers on mern-2 before building a second kind. **The number to watch:** lessons finished with the lab passed, per week.

## 📚 Research behind it

- Explicit instruction before solving (Kirschner, Sweller & Clark 2006): lesson first, lab second.
- PRIMM (Sentance et al. 2019) and Use-Modify-Create (Lee et al. 2011): work with given code first, then write new code.
- Finding and fixing errors teaches deeper than correct examples alone (Adams et al. 2014): task 1 is Debug, and `review` exists.
- Parsons problems teach as well as writing code in less time (Ericson et al. 2017).
- Step-level automatic feedback gets close to human tutoring (VanLehn 2011); feedback that says what's wrong beats right/wrong (Hattie & Timperley 2007).

## 🤔 Open: AI writing the answers

A learner can paste a task into an AI and get the solution. Not solved. Labs are practice: they award no real XP and nobody is judged on them. Proof comes from the layer test and the capstone defense.
