You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "F#" (fsharp, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: fsharp-1
Title: F# Syntax and Basics
Technologies: F#, .NET, dotnet CLI, FSI
Description: Learn F#'s whitespace-significant syntax, type inference, and interactive development with the F# Interactive (FSI) REPL.
Topics:
- let bindings and immutability by default
- Basic types and type inference
- if/elif/else expressions
- Functions as first-class values
- dotnet new and project setup
- FSI for interactive scripting

### Layer 2 of 10 — id: fsharp-2
Title: Immutability and Pure Functions
Technologies: F#, immutability, pure functions, pipelines
Description: Embrace F#'s functional-first design: write pure functions, use the pipe operator for readable pipelines, and avoid mutation.
Topics:
- Pure functions and referential transparency
- The pipe operator (|>) and function composition (>>)
- Currying and partial application
- Point-free style
- Mutable variables with mutable keyword
- When and how to use mutation safely

### Layer 3 of 10 — id: fsharp-3
Title: Pattern Matching
Technologies: F#, match, active patterns, guards
Description: Master F#'s exhaustive pattern matching with discriminated unions, active patterns, and guard clauses for expressive control flow.
Topics:
- match expressions with DU cases
- Tuple, record, and list patterns
- Wildcard and variable patterns
- Guards with when
- Active patterns (|...|)
- Nested patterns and pattern matching functions

### Layer 4 of 10 — id: fsharp-4
Title: Collections and Sequences
Technologies: F#, List, Array, Seq, Map, Set
Description: Work with F#'s built-in functional collection types and the Seq module for lazy sequence processing.
Topics:
- List, Array, and Seq modules
- map, filter, fold, collect, zip
- Lazy sequences with seq { }
- Immutable Map and Set
- Sequence expressions and comprehensions
- Performance trade-offs between List/Array/Seq

### Layer 5 of 10 — id: fsharp-5
Title: Discriminated Unions and Type-Driven Design
Technologies: F#, DU, records, option, result
Description: Use F#'s discriminated unions, records, and Result/Option types to model your domain precisely and make illegal states unrepresentable.
Topics:
- Discriminated unions for ADTs
- Records as lightweight value types
- Option<T> for nullable values
- Result<T,E> for error handling
- Making illegal states unrepresentable
- Single-case DUs for type safety

### Layer 6 of 10 — id: fsharp-6
Title: Computation Expressions
Technologies: F#, async, result CE, option CE, custom CE
Description: Write monadic workflows using F#'s computation expressions — the mechanism behind async, seq, and custom effect systems.
Topics:
- async { } computation expression
- Binding with let! and return!
- Option and Result computation expressions
- Custom builder types
- Mixing computation expressions
- do! for side effects in CEs

### Layer 7 of 10 — id: fsharp-7
Title: Async and Task Programming
Technologies: F#, Async, Task, Parallel, CancellationToken
Description: Write non-blocking F# programs using the native Async workflow and .NET Task interop for high-throughput I/O operations.
Topics:
- Async.RunSynchronously and Async.Start
- Async.Parallel and Async.Sequential
- Interop between Async and Task
- CancellationToken propagation
- Error handling in async workflows
- Throttling with Async.throttle

### Layer 8 of 10 — id: fsharp-8
Title: Domain Modeling with F#
Technologies: F#, DDD, value objects, aggregates, events
Description: Apply Domain-Driven Design in F# using the type system to enforce domain invariants, model aggregates, and represent events.
Topics:
- Value objects with single-case DUs
- Aggregate roots and domain events
- Constrained types for validation
- Event sourcing patterns in F#
- Functional domain services
- Separating read and write models (CQRS)

### Layer 9 of 10 — id: fsharp-9
Title: Web Development with Giraffe and SAFE Stack
Technologies: Giraffe, SAFE Stack, Fable, Saturn
Description: Build full-stack F# web applications using the SAFE Stack — Saturn on the server, Fable for ClojureScript-style frontend, and Elmish for UI.
Topics:
- Giraffe HttpHandler model
- Saturn for convention-based routing
- Shared models between client and server
- Fable for F# to JavaScript compilation
- Elmish model-view-update pattern
- Deploying SAFE Stack to Azure

### Layer 10 of 10 — id: fsharp-10
Title: F# in Production – Testing, Tooling, and Deployment
Technologies: Expecto, FsCheck, Fantomas, Docker
Description: Ship production F# services with property-based testing, Fantomas formatting, paket dependency management, and containerized deployment.
Topics:
- Unit testing with Expecto
- Property-based testing with FsCheck
- Code formatting with Fantomas
- Paket for dependency management
- Publishing NuGet packages
- Docker and GitHub Actions for F# CI/CD

Start now with Layer 1.
