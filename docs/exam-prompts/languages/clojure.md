You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Clojure" (clojure, category languages). It has 10 layers, listed at the bottom.

## HOW TO ANSWER
Write the bank for ONE layer per reply, in the order listed. Each reply must contain exactly 60 questions for that layer. After each reply, stop and wait; I will type "next".

## OUTPUT FORMAT — follow exactly
First line: the layer marker, exactly like this, with the layer id from the list:
LAYER: <layer id>
Then ONE ```json code block containing a JSON array of exactly 60 objects. No text after the block. Each object has exactly these fields:

```json
{
  "stem": "the question text",
  "topic": "one topic copied word for word from that layer's Topics list",
  "choices": ["choice A", "choice B", "choice C", "choice D"],
  "answerIdx": 2
}
```

- "choices" has exactly 4 strings; "answerIdx" is the index (0-3) of the one correct choice.
- Do NOT add "id", "explanation" or any other field.

## QUESTION RULES
1. Test understanding of a concept a working developer must know, not trivia, version numbers or memorised syntax.
2. Exactly one choice is correct. Re-read each question and verify the key before you output it. If you are not sure of the answer, replace the question.
3. Distractors must be plausible mistakes a real learner would make, not jokes and not obviously wrong.
4. No "all of the above", "none of the above", "both A and B", and no negative stems ("which is NOT...").
5. LENGTH BIAS IS THE MOST COMMON FAILURE. Models write the correct answer as the longest, most detailed choice, and learners learn to pick it without knowing the material. Write the three wrong choices FIRST, with the same level of detail, specific terms and length as the right one. The correct choice may be the longest in only about 1 of every 4 questions; in about 1 of 4 it should be the shortest. Wrong choices must sound like a real technical claim, never absurd ("compiles HTML into machine code").
6. Spread "answerIdx" evenly across 0, 1, 2 and 3 (about 15 each). Do not put the answer at index 0 or 1 most of the time.
7. Difficulty mix per layer: about one third easy, half medium, the rest hard.
8. Cover every topic of the layer, roughly evenly. Never repeat or rephrase a question within the layer.
9. Each question must stand alone: no "see the diagram", no references to earlier questions. Short code snippets inside the stem are fine (use plain text, \n for line breaks, no markdown fences inside the JSON strings).
10. Stay accurate for current stable versions of the technologies. Avoid questions whose answer changed recently or is opinion.
11. Escape quotes properly so the JSON parses. No trailing commas, no comments.

## LAYERS
### Layer 1 of 10 — id: clojure-1
Title: Clojure Syntax and the REPL
Technologies: Clojure, Leiningen, deps.edn, REPL
Description: Learn Clojure's Lisp syntax, prefix notation, and how to develop interactively with the REPL using Leiningen or the Clojure CLI.
Topics:
- S-expressions and prefix notation
- def, defn, let, and do
- Basic types (numbers, strings, keywords, symbols)
- REPL-driven development workflow
- Leiningen project structure
- deps.edn and the Clojure CLI

### Layer 2 of 10 — id: clojure-2
Title: Persistent Data Structures
Technologies: Clojure, vectors, maps, sets, lists
Description: Understand Clojure's immutable, persistent data structures and how structural sharing makes them efficient.
Topics:
- Vectors, maps, sets, and lists
- conj, assoc, dissoc, update, merge
- Nested updates with update-in and assoc-in
- get-in for deep access
- Structural sharing and copy-on-write
- Equality semantics (= vs identical?)

### Layer 3 of 10 — id: clojure-3
Title: Functional Programming and Higher-Order Functions
Technologies: Clojure, map, filter, reduce, comp, partial
Description: Write idiomatic Clojure using higher-order functions, function composition, and the threading macros -> and ->>.
Topics:
- map, filter, reduce, and keep
- apply and juxt
- comp and partial for function building
- Threading macros (-> and ->>)
- Anonymous functions (#() and fn)
- Transducers for efficient composition

### Layer 4 of 10 — id: clojure-4
Title: Sequences and Laziness
Technologies: Clojure, lazy-seq, range, iterate, take
Description: Work with Clojure's lazy sequence abstraction to process potentially infinite data sources without materializing them in memory.
Topics:
- The sequence abstraction (seq, first, rest, next)
- lazy-seq and memoized laziness
- range, iterate, repeat, cycle, and repeatedly
- take, drop, take-while, drop-while
- Chunked sequences and performance
- Avoiding head retention memory leaks

### Layer 5 of 10 — id: clojure-5
Title: Concurrency – Atoms, Refs, and Agents
Technologies: Clojure, atom, ref, agent, STM
Description: Manage shared mutable state safely using Clojure's reference types: atoms for uncoordinated updates, refs for STM transactions, and agents for async tasks.
Topics:
- atom, swap!, reset!, compare-and-set!
- refs and dosync transactions (STM)
- alter, commute, and ref-set
- agents, send, send-off, and await
- Vars and dynamic binding
- Promise and future for one-time values

### Layer 6 of 10 — id: clojure-6
Title: Macros and Metaprogramming
Technologies: Clojure, defmacro, syntax-quote, macroexpand
Description: Write Clojure macros to extend the language itself — transforming code at compile time using homoiconicity.
Topics:
- Quote (') vs syntax-quote (`)
- Unquote (~) and unquote-splicing (~@)
- defmacro basics
- macroexpand and macroexpand-1 for debugging
- Macro hygiene with gensym
- When to use macros vs functions

### Layer 7 of 10 — id: clojure-7
Title: core.async – Communicating Sequential Processes
Technologies: core.async, chan, go, alt!, pipeline
Description: Build async, non-blocking programs using core.async channels and go blocks — Clojure's CSP concurrency model.
Topics:
- Channels (chan), put (>!!/>!), and take (<!/<!!)
- go blocks and parking vs blocking
- Buffered and transducer channels
- alt! and alt!! for select
- pipeline for parallel transforms
- Channel lifecycle and closing

### Layer 8 of 10 — id: clojure-8
Title: ClojureScript and the Browser
Technologies: ClojureScript, shadow-cljs, Reagent, Re-frame
Description: Compile Clojure to JavaScript with ClojureScript and build reactive browser UIs using Reagent (React wrapper) and Re-frame.
Topics:
- ClojureScript compilation with shadow-cljs
- Interop with JavaScript (js/, .)
- Reagent components as Clojure functions
- Re-frame events, effects, and subscriptions
- CLJS REPL and hot reloading
- Deploying ClojureScript apps

### Layer 9 of 10 — id: clojure-9
Title: Web Development with Ring and Compojure
Technologies: Ring, Compojure, Hiccup, next.jdbc
Description: Build server-side web applications using Ring's handler model, Compojure routing, Hiccup templating, and next.jdbc for database access.
Topics:
- Ring request/response maps and middleware
- Compojure route definitions and destructuring
- Hiccup for HTML generation
- JSON APIs with Cheshire
- Database access with next.jdbc
- Deploying with uberjar and Docker

### Layer 10 of 10 — id: clojure-10
Title: Production Clojure – Testing, Tooling, and Deployment
Technologies: clojure.test, kaocha, clj-kondo, Docker
Description: Ship reliable Clojure services with comprehensive tests, static analysis with clj-kondo, performance profiling, and containerized deployment.
Topics:
- clojure.test and deftest
- kaocha for advanced test running
- clj-kondo for static analysis
- Spec for data validation (clojure.spec)
- Uberjar packaging with Leiningen or deps.edn
- Docker and CI/CD for Clojure services

Start now with Layer 1.
