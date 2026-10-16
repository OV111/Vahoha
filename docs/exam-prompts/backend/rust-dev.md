You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Rust Developer" (rust-dev, category backend). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: rust-dev-1
Title: Rust Fundamentals
Technologies: Rust, Cargo, rustc
Description: Begin with Rust's syntax and the toolchain. Learn variables, types and control flow while getting comfortable with the compiler.
Topics:
- Variables, mutability & shadowing
- Scalar & compound types
- Functions & expressions
- Control flow — if, loop, while, for
- Cargo, crates & rustc basics
- Reading compiler errors

### Layer 2 of 10 — id: rust-dev-2
Title: Ownership, Borrowing & Lifetimes
Technologies: Ownership, Borrowing, Lifetimes
Description: The heart of Rust. Understand ownership, references and lifetimes — the rules that give Rust memory safety without a garbage collector.
Topics:
- Ownership & move semantics
- Borrowing & references
- Mutable vs immutable borrows
- Slices & string handling
- Lifetimes & the borrow checker
- The stack, the heap & Box

### Layer 3 of 10 — id: rust-dev-3
Title: Traits, Generics & Error Handling
Technologies: Traits, Generics, Result
Description: Write reusable, expressive Rust. Abstract behavior with traits and generics, and handle failure with Result and the ? operator.
Topics:
- Traits & trait bounds
- Generics & monomorphization
- Trait objects & dynamic dispatch
- Result, Option & the ? operator
- Custom error types & thiserror
- Pattern matching & enums

### Layer 4 of 10 — id: rust-dev-4
Title: Collections, Iterators & Closures
Technologies: Iterators, Closures, Collections
Description: Use Rust's powerful standard library. Chain iterators, capture environment with closures, and pick the right collection.
Topics:
- Vec, HashMap & HashSet
- Iterator trait & adapters
- map, filter, fold & collect
- Closures & capture modes
- Rc, RefCell & interior mutability
- Smart pointers overview

### Layer 5 of 10 — id: rust-dev-5
Title: Cargo, Crates & Modules
Technologies: Cargo, Modules, crates.io
Description: Organize and share real Rust projects. Master the module system, workspaces and the crate ecosystem.
Topics:
- Module system — mod, pub, use
- Workspaces & multi-crate projects
- Dependencies & features
- Publishing to crates.io
- Documentation tests & rustdoc
- Common crates — serde, clap, tracing

### Layer 6 of 10 — id: rust-dev-6
Title: Async Rust with Tokio
Technologies: async/await, Tokio, Futures
Description: Write high-performance async Rust. Understand futures, the async/await model, and the Tokio runtime.
Topics:
- Futures & the async/await model
- The Tokio runtime & tasks
- Async I/O & channels
- Concurrency with join & select
- Shared state with Arc & Mutex
- Streams & backpressure

### Layer 7 of 10 — id: rust-dev-7
Title: Web Services with Axum & Actix
Technologies: Axum, Actix Web, Tower
Description: Build production web services in Rust. Create routes, extractors and middleware with Axum or Actix Web.
Topics:
- Routing & handlers
- Extractors & typed requests
- JSON with serde
- Middleware with Tower
- Application state & dependency injection
- Error handling & responses

### Layer 8 of 10 — id: rust-dev-8
Title: Databases with SQLx & Diesel
Technologies: SQLx, Diesel, PostgreSQL
Description: Persist data safely. Use SQLx for compile-time-checked queries or Diesel's ORM against PostgreSQL.
Topics:
- SQLx — async, compile-time checked queries
- Diesel ORM & schema
- Migrations
- Connection pooling
- Transactions
- Mapping rows to structs

### Layer 9 of 10 — id: rust-dev-9
Title: Testing, Benchmarking & Unsafe
Technologies: cargo test, criterion, unsafe
Description: Ensure correctness and speed. Write tests and benchmarks, and learn when (and when not) to reach for unsafe.
Topics:
- Unit & integration tests
- Documentation tests
- Benchmarking with criterion
- Property-based testing
- Unsafe Rust & raw pointers
- FFI basics

### Layer 10 of 10 — id: rust-dev-10
Title: WebAssembly & Production Deployment
Technologies: WebAssembly, wasm-bindgen, Docker
Description: Take Rust to the browser and to production. Compile to WebAssembly and deploy a lean, fast Rust service.
Topics:
- Compiling Rust to WebAssembly
- wasm-bindgen & JS interop
- wasm-pack & bundling
- Multi-stage Docker builds
- Cross-compilation & static binaries
- CI/CD & deployment

Start now with Layer 1.
