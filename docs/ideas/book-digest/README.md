# Book Digest (idea, not built)

Status: idea, shaped on 2026-10-16. Not in the current build focus. Pricing, free vs Pro and team access are deliberately out of scope for now.

## 1. The idea in one paragraph

The code library page does not show full books and is not a link list. It shows book titles. When a user clicks a title, the system opens a **digest**: the book's ideas, shortened and filtered down to what a developer actually needs today. An LLM reads the whole book offline, pulls out the ideas, and decides what to keep, shorten or drop. The user never reads the 400 pages, only the useful 10 to 20%.

Example from "Learning TypeScript", chapter on arrays:
- Keep: multidimensional arrays (one short paragraph and one example).
- Keep, trimmed: arrays are unsound, `elements[9001]` compiles but crashes (two lines, not the full section).
- Drop: how members of union-typed arrays are typed (rarely matters in practice).

The filter is the valuable part. A summary tells you what the book says. The filter tells you what you need.

## 2. Core features (kept)

### 2.1 Personalized cut
The same book is cut differently for different readers.
- **By level:** beginner, intermediate, senior. A beginner gets the basics with more examples. A senior gets only the traps and the "why".
- **By goal:** get a job, build a startup, pass the exam, switch from another language. Each goal keeps different ideas.
- **By what they already know:** use existing mastery data and skip ideas the user already passed. If they know arrays, the arrays chapter disappears.
- **By roadmap position:** on the TypeScript layer, show only what that layer needs.

Start with ONE version (no personalization) and add these cuts after the base digest works.

### 2.2 "Expand this"
Each short idea has a button that reveals the original detail that was cut. Nothing is lost, and the user decides the depth. The original detail is generated once at ingest, never at click time.

### 2.3 "I already know this"
One click hides an idea for good. The system records it and learns what to skip, which also feeds the mastery data (a self-reported signal, weaker than a passed challenge or exam, so store it separately and never count it as a pass).

### 2.4 Interview mode
A second kind of digest cut from the same book: only what interviews ask about. Per concept it holds:
- the question an interviewer is likely to ask,
- the short answer a strong candidate gives,
- the common wrong answer or trap,
- one follow-up question.

Example: from the arrays chapter, "Why doesn't TypeScript catch `elements[9001].length`?" with the unsound-indexing answer and `--noUncheckedIndexedAccess` as the follow-up.

Interview mode can run as flashcards, a mock interview with the AI mentor, or voice (the voice-exam feature already exists).

## 3. Connections to what is already built

| From the digest | To | How |
| --- | --- | --- |
| A kept idea | Coding challenge | Each idea links to a challenge that tests it |
| Ideas the user read | Exams | Exam questions are drawn from ideas the user has read, so the exam matches the learning |
| Ideas | Capstone | The mentor says "your project uses auth, read these three ideas" |
| An idea | Teach-back | After reading, the user explains it in their own words (see the Teach-Back idea note) |
| Interview digest | Voice exam / AI mentor | Mock interview from the book's interview questions |
| "I already know this" | Mastery | Skipped ideas shape the next cut |

## 4. Data shape (draft)

```
Source   { _id, title, author, license, sourceUrl, topic, ingestedAt }
Chunk    { _id, sourceId, chapter, order, text }          // raw text, server-side only, never shown
Concept  { _id, sourceId, chapter, order,
           title, summary, example?, whyItMatters,
           detail,                                         // the "Expand this" text
           importance: 1-5, levels: [beginner|intermediate|senior],
           goals: [job|startup|exam|switch], tags: [],
           keep: boolean, dropReason?,
           interview?: { question, answer, trap, followUp },
           challengeIds?: [], reviewed: boolean, promptVersion }
UserConceptState { userId, conceptId, state: hidden | known | read, at }
```

Validate the LLM output with Zod at the boundary, the same way the rest of the backend does.

## 5. Pipeline

1. **Ingest (offline, once per book).** Split by chapter and section, not by raw size. Store as `Chunk`s.
2. **Distill (offline, per chunk).** The LLM extracts concepts and, for each: a short summary, the detail for "Expand this", an importance score, which levels and goals it fits, and keep or drop with a reason. A second field fills the interview block when the concept is interview-worthy.
3. **Merge (per chapter).** Remove duplicates, order the concepts.
4. **Review.** A human approves each digest before it is shown (`reviewed: true`), the same way exam questions carry `reviewed: false` until checked.
5. **Serve.** The page reads stored concepts only. There is no LLM call on click, so it is fast and costs nothing per view.
6. **Personalize at read time.** Filtering by level, goal, mastery and hidden ideas is a database query over stored concepts, not another LLM run.

Version every prompt (`promptVersion`) so improving it later re-runs only the affected books.

## 6. The rule that makes it work

"What counts as needed today" must be written down as an explicit rubric the LLM follows, for example: would a developer building real projects with current tools and AI assistance need this? Is it a common trap? Is it only a niche edge case, or outdated practice? Writing and testing this rubric is the core learning piece of the feature, and it should be written by hand, not generated.

## 7. Risks

- **Copyright.** Commercial books (O'Reilly, Manning, etc.) are copyrighted. Publishing an AI-condensed version of one is a risk even when reworded. Safer sources: open-licensed books, official docs (MDN, the TypeScript Handbook), or books where the author gives permission. Decide the source list before ingesting anything.
- **Accuracy.** The LLM can drop an important idea or state something wrong. The review step is what keeps the digest trustworthy, and a wrong interview answer is worse than a missing one.
- **Cost.** Offline distilling a whole book is a one-time cost per book. Check against Groq limits before a big batch.
- **Scope creep.** Personalization, interview mode and the connections are all good, but the first build is only: one book, one cut, "Expand this".

## 8. Suggested build order (when its turn comes)

1. Write the rubric by hand and test it on one chapter (the pasted TypeScript arrays text is a good test).
2. Schema and a script that distills one open-licensed chapter into `Concept`s, with Zod validation.
3. Read-only digest page with "Expand this".
4. "I already know this" and the user state.
5. Level and goal cuts.
6. Interview mode.
7. Connect to challenges, exams, capstone and teach-back.

## 9. Parked for later (not decided)

Ideas mentioned but not chosen yet: time-based cuts ("I have 10 minutes"), asking questions to a book through the mentor, an "outdated practice" flag with the modern replacement, merging the best ideas from several books into one topic page, showing where two books disagree, and letting authors approve their own digest. Pricing and access (free, Pro, teams) will be decided separately.
