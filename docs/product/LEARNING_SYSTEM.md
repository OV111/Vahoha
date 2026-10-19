# Learning system

> Status: design agreed 2026-10-18, nothing built. Replaces the thin lesson page
> at `/learn/:trackId/:layerId/:topicSlug` (one description plus external links).

## Why

A developer does not learn from an intro paragraph and a link to someone
else's docs. They learn by reading a real explanation, then writing code,
getting feedback, and explaining it back. AI now writes ordinary code, so the
scarce skill is deep understanding. The system is built around that.

## Three levels

```
TRACK   layers ──▶ capstone + defense (exists)
LAYER   lessons ──▶ build project (Arena) ──▶ exam = MCQ + voice defense
LESSON  Learn → See it work → Change it → Write it → Check → Explain → Go deeper
DAILY   5-minute warm-up from your weak topics (spaced review)
```

## One lesson

Read first, then practice, the way programmers learn from a good book.

| Step | The learner | Research |
| --- | --- | --- |
| Learn | Reads a real explanation: how it works, with code | Explicit instruction for novices (Kirschner, Sweller & Clark 2006) |
| See it work | Runs a working example in the browser | Worked examples (Sweller) |
| Change it | Changes the example to do something else; tests check it | Use-Modify-Create (Lee et al. 2011) |
| Write it | Writes a small piece from scratch; hints on request | Fading guidance, deliberate practice (Ericsson) |
| Check | 2 to 3 questions, at least one "predict the output" | Retrieval practice (Roediger & Karpicke 2006) |
| Explain | Says or types the idea in own words; quick feedback, not graded | Self-explanation (Chi et al. 1994) |
| Go deeper | Optional deeper levels (below) | |

- The mentor knows the track, layer and lesson. Hint ladder: nudge, then hint,
  then fix. It never hands over the full answer in "Write it".
- Every step feeds mastery. Weak topics come back in the daily warm-up after
  1, 3, 7 and 14 days (spaced repetition, Cepeda et al. 2006).
- Tracks the browser cannot run (Python, Go, Rust...) replace the three code
  steps with the Foundations `predict`, `trace` and `observe` types until a
  server sandbox exists.

## Go deeper: the depth ladder

Depth is a main feature, not a links box. Each topic has up to four levels.

| Level | Question | Example: JS event loop |
| --- | --- | --- |
| 1. Use it | How do I use it? | `setTimeout`, `await` |
| 2. How it works | What happens? | Call stack, task queue |
| 3. Under the hood | How is it built? | libuv, V8, microtasks vs macrotasks |
| 4. Why this design | Tradeoffs and history | Why JS is single-threaded |

Mastery records the deepest level reached, so a profile can say
"Event loop: level 3, voice-verified". Deep pages are public and pre-rendered,
which also makes them the main source of search and AI-answer traffic.

## Layer exam: MCQ plus voice defense

1. **MCQ** checks knowledge (exists, `examEngineService`).
2. **Voice defense** checks understanding: explain one random topic of the
   layer, then answer 2 follow-ups. Graded against a fixed concept rubric; every
   credited concept must quote the transcript (checked in code). Design and
   rules: `VOICE_EXAM_SPEC.md`.

## Open decisions

| # | Decision | Options | Recommended |
| --- | --- | --- | --- |
| D1 | Voice gate | (a) required to pass the layer, (b) only for "Verified" and capstone access, (c) required, typed explanation accepted as fallback | (c). Changes the "soft gate" decision in `VOICE_EXAM_SPEC.md` |
| D2 | Content source | AI-written, hand-written, or AI-drafted then checked | AI drafts in the lesson schema, a script validates it and runs its code, the founder reviews |
| D3 | Pilot | One layer first | `mern-2` (JavaScript Deep Dive, 8 lessons): every step runs in the browser |

## Build stages

Each stage ships on its own and ends with a working page. A lesson without a
content file keeps today's page, so there is no big-bang migration.

| Stage | What ships | Done when | Reuses |
| --- | --- | --- | --- |
| 1 ✅ 2026-10-18 | Step player: one step per screen (`?step=N`), progress bar, questions between steps, live code panel (edit, Run, console with timings), predict steps lock Run until answered, explain-back, Go deeper on the finish screen. One real lesson | `mern-2` event-loop lesson works end to end; tests validate every lesson file and run its code | Foundations format, `curriculum.js` slugs, Arena `CodeEditor`, `MarkdownMessage` |
| 2 → see `LAB_SYSTEM.md` | Graded exercises: "Change it" and "Write it" steps with tests and a 3-hint ladder | Tests pass/fail in the page, no server | `useCodeRunner`, `testRunner.worker.js` |
| 3 | Progress: `lesson_progress` collection and API; layer page shows 3/8 done and "Continue" | Progress survives reload and devices | backend module pattern |
| 4 | Explain gets AI feedback against `mustMention`; result feeds mastery | Weak explanations mark the topic `shaky` | teach-back evaluator, `learnerMasteryService` |
| 5 | Mentor opens with lesson context | Mentor's first reply names the lesson | `location.state` arrival context in `AiAgent.jsx` |
| 6 | Content pipeline: AI drafts a lesson in the schema, a script validates it and runs its code; write all 8 `mern-2` lessons | `lessons:verify` passes for the layer | `challenges:verify`, exam import flow |
| 7 | Daily warm-up (spaced review, 1/3/7/14 days) | Due items appear on `/progress` | mastery `shaky` topics |
| 8 | Voice defense in the layer exam (decision D1) | Layer passes only with MCQ + defense | `VOICE_EXAM_SPEC.md` |

Stages 1 to 3 make the lesson real. 4 and 5 add AI. 6 scales content. 7 and 8
make it stick and make it proof.
