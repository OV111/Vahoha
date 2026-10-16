You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "OCaml" (ocaml, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: ocaml-1
Title: OCaml Syntax and Basics
Technologies: OCaml, utop, OPAM, dune
Description: Learn OCaml's syntax, type inference, and development environment with utop for interactive exploration and OPAM for package management.
Topics:
- let bindings and expressions
- Primitive types and type inference
- if/then/else as expressions
- Function definitions and application
- OPAM switches and package installation
- utop REPL for interactive development

### Layer 2 of 10 — id: ocaml-2
Title: Algebraic Types and Pattern Matching
Technologies: OCaml, variant types, pattern matching, tuples, records
Description: Define algebraic data types with variant types and records, and use exhaustive pattern matching to safely deconstruct them.
Topics:
- Variant types (sum types)
- Recursive types for trees and lists
- Record types and field access
- Pattern matching with match
- Exhaustiveness checking
- Wildcards, guards, and or-patterns

### Layer 3 of 10 — id: ocaml-3
Title: Modules and Functors
Technologies: OCaml, modules, signatures, functors, mli
Description: Structure OCaml programs with the module system — define signatures (.mli), implement them, and compose with functors for generic programming.
Topics:
- Module definitions and signatures
- .mli interface files
- Opening and aliasing modules
- Functors as parameterized modules
- First-class modules
- Module type constraints

### Layer 4 of 10 — id: ocaml-4
Title: Higher-Order Functions and the Standard Library
Technologies: OCaml, List, Array, Option, Result
Description: Use OCaml's standard library modules — List, Array, Option, Result — with higher-order functions for expressive, safe data processing.
Topics:
- List.map, filter, fold_left, fold_right
- Array operations and mutation
- Option for nullable values
- Result for error handling
- Piping with |> operator
- Fun.compose and Function module

### Layer 5 of 10 — id: ocaml-5
Title: Mutable State and Imperative Style
Technologies: OCaml, ref, mutable fields, for/while, Queue
Description: Write imperative OCaml when appropriate using refs, mutable record fields, loops, and standard imperative data structures.
Topics:
- ref cells and the ! / := operators
- Mutable record fields
- for and while loops
- Sequences and unit values
- Mutable data structures (Queue, Stack, Hashtbl)
- When to prefer mutation over recursion

### Layer 6 of 10 — id: ocaml-6
Title: Error Handling and Exceptions
Technologies: OCaml, Result, Option, exception, try/with
Description: Handle errors in OCaml using the Result type for expected failures, exceptions for unexpected conditions, and the Error module pattern.
Topics:
- Defining and raising exceptions
- try/with for exception handling
- Result.t and error propagation with bind
- Option.bind for nullable chains
- Converting exceptions to Results
- Error module and error types

### Layer 7 of 10 — id: ocaml-7
Title: Concurrency with Lwt and Eio
Technologies: Lwt, Eio, promises, async I/O
Description: Write non-blocking I/O and concurrent programs using Lwt's promise-based model or the newer Eio effects-based library.
Topics:
- Lwt.t promise type and >>= bind
- Lwt_list for concurrent collection operations
- Lwt_unix for non-blocking file and network I/O
- Eio fibers and structured concurrency
- Eio resource management with Switch
- Mixing Lwt and async HTTP (Cohttp)

### Layer 8 of 10 — id: ocaml-8
Title: Build System with Dune
Technologies: dune, dune-project, ocamlformat, odoc
Description: Manage multi-library OCaml projects with Dune, format code with ocamlformat, and generate documentation with odoc.
Topics:
- dune and dune-project files
- library and executable stanzas
- Tests with (test) stanza and Alcotest
- Cross-module dependencies
- Code formatting with ocamlformat
- API docs with odoc

### Layer 9 of 10 — id: ocaml-9
Title: Jane Street Libraries and ppx
Technologies: Core, Async, ppx_jane, Sexplib
Description: Use Jane Street's industrial-strength OCaml libraries: Core for standard library extensions, Async for concurrency, and ppx_jane for code generation.
Topics:
- Core for enhanced standard library
- Core.String, Int, Float replacements
- Sexplib and sexp serialization
- ppx_sexp_conv, ppx_compare, ppx_hash
- Jane Street's Async monad
- Deferred.t and async/await style

### Layer 10 of 10 — id: ocaml-10
Title: Production OCaml – Testing, CI, and Deployment
Technologies: Alcotest, QCheck, GitHub Actions, Docker
Description: Ship production OCaml services with unit and property-based tests, Docker packaging, and GitHub Actions CI pipelines.
Topics:
- Unit testing with Alcotest
- Property-based testing with QCheck
- opam-ci for reproducible builds
- Packaging with opam files
- Building minimal Docker images for OCaml
- GitHub Actions CI with opam setup

Start now with Layer 1.
