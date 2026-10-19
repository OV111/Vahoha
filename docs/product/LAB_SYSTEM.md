# Lab system

> Status: design proposed 2026-10-19, nothing built. Extends
> `LEARNING_SYSTEM.md`. Lessons teach; labs are where the learner practices.

## The problem

176 tracks, 1,785 layers, 14,329 lessons. A TypeScript learner and a quantum
learner don't practice the same way, so one lesson format with one code panel
can't serve every track. Hand-writing every lesson can't either.

## The idea: same method, different lab

How people learn is the same in every subject. What they practice on is not.

```
LESSON  (shared, every track)        LAB  (one kind per track)
read -> check -> explain -> deeper   why doesn't it work? -> write it yourself
/learn/:track/:layer/:topic          /learn/:track/:layer/:topic/lab
```

- **Lesson core** (built, stage 1): read, predict/MCQ, explain back, Go deeper.
  The inline code panel stays for worked examples ("see it work").
- **Lab** (new, its own route and feature folder): a full-screen workspace with
  graded tasks. Each track declares which lab kind it uses.

## Research behind it

From the learning-science literature I know; send papers and I'll check the
design against them.

| Finding | Source | What it means for labs |
| --- | --- | --- |
| Novices learn best from explicit instruction before solving | Kirschner, Sweller & Clark 2006 | Lesson first, lab second. The lab is never the first screen |
| PRIMM: Predict, Run, Investigate, Modify, Make | Sentance, Waite & Kallia 2019 | Lesson covers P-R-I, lab covers Modify then Make |
| Use-Modify-Create | Lee et al. 2011 | Task order inside a lab: work with given code first, then write new code |
| Finding and fixing errors in given work teaches deeper than only studying correct examples | Adams et al. 2014; McLaren et al. 2016 (erroneous examples) | Task 1 is "why doesn't it work?": broken code, failing tests, find and fix the bug |
| Parsons problems (reorder given lines) teach as well as writing code, in less time and with less load | Parsons & Haden 2006; Ericson et al. 2017 | A cheap middle task type that works in every lab (code lines, SQL clauses, shell steps, circuit gates) |
| Faded worked examples | Renkl & Atkinson 2003 | Starter code shrinks from task to task |
| Expertise reversal: help that aids novices slows experts | Kalyuga et al. 2003 | Experienced learners can skip to the last task |
| Step-level feedback gets close to human tutoring (d ~ 0.76) | VanLehn 2011 | Every lab needs an automatic checker, not "compare with the answer" |
| Feedback that says what is wrong and what to try next beats right/wrong | Hattie & Timperley 2007 | Failed checks show a specific message, then the 3-hint ladder |
| Interactive simulations with built-in limits help learners explore | Wieman, Adams & Perkins 2008 (PhET) | Circuit, SQL and diagram labs are simulations, not videos |
| Retrieval and spacing | Roediger & Karpicke 2006; Cepeda et al. 2006 | Lab tasks feed the daily warm-up later |

## Lab kinds

One small set of lab kinds covers all tracks. A track without a lab still gets
full lessons (the `none` kind). The kind is set per track, and a layer can
override it: the MERN layer on MongoDB uses `nosql`, the rest of MERN uses
`code`.

| Kind | Practice surface | Checker | Tracks | Runtime |
| --- | --- | --- | --- | --- |
| `code` | Editor, Run, tests | Arena test runner (Jest shim, worker) | languages (JS/TS), fullstack, dsa, backend (Node) | built |
| `sql` | Query editor, result table | Compare result rows with expected | postgres-dba, mysql-dba, data-modeler, datascience | PGlite or sql.js in the browser |
| `nosql` | Query shell per store (documents, key-value, graph, vectors) | Compare returned data and final state | mongodb-admin, nosql-engineer, redis-engineer, cassandra-engineer, graph-db-engineer, vector-db-engineer | in-browser engines (for example mingo for Mongo queries); one shell, adapters per store |
| `dbops` | Simulated cluster: replicas, backups, failover, slow-query plans | State after the learner's actions | db-reliability, DBA layers on replication and backups | simulation, no real servers |
| `preview` | HTML/CSS/React with live page | DOM assertions | frontend, web3-frontend, web-game | sandboxed iframe |
| `python` | Editor, Run, tests | pytest-style asserts | python, aiml, datascience | Pyodide |
| `circuit` | Drag gates on qubits, see the state | Compare final state vector | quantum | small JS simulator |
| `contract` | Contract editor, deploy, call functions, send transactions | Call results, events, balances, failed attacks | smart-contract, ethereum-dev, blockchain-security, defi-developer, nft-developer, dao-developer, layer2-dev | solc-js + in-browser EVM; other chains (Solana, Move) later as runtimes of the same kind |
| `chain` | Simulated network: blocks, hashes, signatures, mining, forks, consensus | Final chain state and what the learner predicted | blockchain-core, bitcoin-dev, chain-architect, cosmos-dev, zk-developer (circuits later) | small JS simulation |
| `dapp` | A web page wired to a local chain and a test wallet | Page behaviour plus on-chain result | dapp-developer, web3-frontend, web3-fullstack, wallet-developer, gamefi-developer, web3-indexer | `preview` workspace + the `contract` chain |
| `terminal` | Commands, YAML, Dockerfiles | Rule checks on the result | devops, cloud, cybersecurity | simulated, no real shell |
| `diagram` | Connect boxes and arrows | Required parts and links present | system-design, architect tracks | none |
| `none` | No workspace | Lesson checks only | GRC, manual QA, game design, research | none |

## Architecture

A plugin registry: the lab page knows nothing about any one kind. Each kind is
a lazy chunk, so a quantum learner never downloads the SQL engine.

```
src/features/labs/
  LabPage.jsx            route: /learn/:track/:layer/:topic/lab?task=N
  registry.js            kind -> () => import("./kinds/<kind>")
  trackLabs.js           domain default -> track override -> layer override -> kind
  schema.js              shared task shape + discriminated union of kinds
  components/            TaskList, HintLadder, CheckResult (shared UI)
  kinds/code/            index.js exports { Workspace, check, taskSchema }
  kinds/sql/ ...         added one at a time, by demand
```

Each kind module exports the same three things:

- `Workspace`: the practice UI for that kind.
- `check(task, work)`: runs in a worker, returns `{ passed, results[] }`.
- `taskSchema`: the zod schema for its tasks. The same schema validates
  hand-written labs now and AI-generated labs later.

Grading runs in the browser: fast, free, works offline. A browser result
can be faked, so it only drives practice progress. Anything that counts (XP,
layer pass) is re-checked on the server or comes from the layer test and
voice defense. XP still only goes through `awardXp`.

## Schema (draft)

```js
// shared by every kind
const baseTask = {
  id: z.string(),                 // stable, progress is stored against it
  title: z.string(),
  prompt: z.string(),             // markdown
  hints: z.array(z.string()).length(3), // nudge, hint, near-answer
};

// kinds/code/taskSchema
const codeTask = z.discriminatedUnion("type", [
  // "Why doesn't it work?": starter is broken code that fails the tests
  z.object({ ...baseTask, type: z.literal("fix"), starter, tests, solution, cause }),
  // "Write it yourself": starter is a near-empty stub
  z.object({ ...baseTask, type: z.literal("write"), starter, tests, solution }),
  // later: z.object({ ...baseTask, type: z.literal("parsons"), lines, distractors, tests }),
]);

// lesson file gets an optional lab
lab: z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("code"), runtime: z.enum(["js", "ts"]), tasks: z.array(codeTask).min(2).max(4) }),
  // sql, circuit, ... join here when built
]).optional()
```

Lesson content tests also run every task's `solution` against its `tests`
(must pass) and its `starter` (must fail), so a broken lab can't ship.

## Flow

```
Layer page card:  [Learn] -> [Lab] -> done
Lesson finish:    "Practice it in the lab" (primary) / "Skip to next lesson"
Lab page:         task 1 "why doesn't it work?" -> task 2 "write it yourself" -> done
Fix task:         after the tests pass, one line: "what was the bug?" (checked against `cause`)
Failed check:     specific message -> Hint 1 -> Hint 2 -> Hint 3 -> show solution
```

A lesson counts as done when its lab is passed. Lessons whose track has no lab
count as done after the lesson itself.

## Scope

The smallest version worth building: **a learner finishes the closures lesson,
opens its lab, fixes and writes code against real tests, and passes in under
15 minutes.**

| Feature | Decision | Why |
| --- | --- | --- |
| Lab route + registry + `code` kind | Must | The whole idea; code reuses the Arena runner |
| `fix` ("why doesn't it work?") and `write` tasks with tests | Must | Debugging plus writing: the practice half of PRIMM |
| 3-hint ladder, then show solution | Must | Without it stuck learners quit |
| Labs for the 2 written mern-2 lessons | Must | Proves the flow end to end |
| `parsons` tasks | Should | Cheap, strong research, works in every kind |
| `trackLabs.js` mapping + `none` | Should | Needed before a second track |
| `sql` kind | Later | Second kind, picked by demand |
| Other kinds, AI-generated labs, `/labs` playground, server grading, AI hints | Won't, for now | Each waits for a real trigger (below) |

| Waits for | Trigger to revisit |
| --- | --- |
| Second lab kind | Users ask for a track that needs it, or mern-2 lab completion is above 50% |
| AI-generated labs | 3+ hand-written labs pass review, so the generator has examples |
| `/labs` playground hub | Labs work; it doubles as free-tool SEO |
| Server grading | Labs start awarding XP |

**Riskiest assumption:** learners open the lab instead of skipping to the next
lesson. Test with 5 developers on mern-2 before building a second kind. The
number to watch: lessons finished with the lab passed, per week.

## Build stages

| Stage | What ships | Done when |
| --- | --- | --- |
| L1 | Lab schema, registry, `/lab` route, `code` kind with `fix`/`write`, check in a worker, hint ladder | Closures lab passes and fails correctly in the browser; content tests run solutions and starters |
| L2 | Labs for both mern-2 lessons, lesson finish screen and layer card link to the lab, lab-done progress (localStorage until the progress API) | Layer card shows Learn / Lab / done |
| L3 | `parsons` tasks | One parsons task per lab |
| L4 | `trackLabs.js` mapping, `none` kind, lab picked by track | A non-JS track lesson shows no lab cleanly |
| L5+ | Next kind by demand (likely `sql`), then the generator per kind | Per kind |

Replaces stage 2 ("graded exercises") of `LEARNING_SYSTEM.md`.

## Open: AI writing the answers

A learner can paste a lab task into an AI and get the solution. Not solved yet,
to discuss later. Current position: labs are practice, they award no real XP
and nobody is judged on them. Proof comes from the layer test and the voice
defense, which an AI can't take for the learner.
