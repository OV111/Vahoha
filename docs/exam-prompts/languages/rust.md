You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Rust" (rust, category languages). It has 12 layers, listed at the bottom.

## HOW TO ANSWER
Write the bank for ONE layer per reply, in the order listed. Each reply must contain exactly 60 questions for that layer. After each reply, stop and wait; I will type "next".

## OUTPUT FORMAT — follow exactly
First line of EVERY reply, including every reply after "next": the layer marker, exactly like this, with the layer id from the list. A reply without it is thrown away by the importer.
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
5. LENGTH BIAS IS THE MOST COMMON FAILURE, and earlier banks failed it badly (the correct answer was the longest choice in up to 95% of questions, so learners passed by picking the longest). Follow this plan exactly. Number the questions 1 to 60; the position of question N in a cycle of 4 fixes how long its CORRECT choice is compared with its three wrong choices:
   - N = 1, 5, 9, ...: the correct choice is the SHORTEST of the four.
   - N = 2, 6, 10, ...: the correct choice is the second shortest.
   - N = 3, 7, 11, ...: the correct choice is the second longest.
   - N = 4, 8, 12, ...: the correct choice is the LONGEST of the four.
   Write the wrong choices with the same level of detail, specific terms and qualifiers as the right one; never make the right one the only careful, hedged or complete-sounding choice. Wrong choices must sound like a real technical claim, never absurd ("compiles HTML into machine code").
6. Spread "answerIdx" evenly across 0, 1, 2 and 3 (about 15 each). Do not put the answer at index 0 or 1 most of the time.
7. Difficulty mix per layer: about one third easy, half medium, the rest hard.
8. Cover every topic of the layer, roughly evenly. Never repeat or rephrase a question within the layer.
9. Each question must stand alone: no "see the diagram", no references to earlier questions. Short code snippets inside the stem are fine (use plain text, \n for line breaks, no markdown fences inside the JSON strings).
10. Stay accurate for current stable versions of the technologies. Avoid questions whose answer changed recently or is opinion.
11. Escape quotes properly so the JSON parses. No trailing commas, no comments.

## CHECK BEFORE YOU SEND EACH REPLY
Silently verify all of these, and fix the reply until every one holds. Do not print the check.
- The first line is LAYER: <the right layer id>.
- The array has exactly 60 questions.
- Count the questions whose correct choice is the longest of its four: at most 15. If more, lengthen wrong choices or shorten the right one until it holds.
- Each answerIdx value (0, 1, 2, 3) appears about 15 times.

## LAYERS
### Layer 1 of 12 — id: rust-1
Title: Rust Setup and Basic Syntax
Technologies: Rust, Cargo
Description: Install Rust with rustup, create and run projects with Cargo, and learn the core syntax: variables and mutability, scalar and compound types, the difference between String and &str, and control flow. Understand editions and start every new project on Rust 2024.
Topics:
- rustup, Cargo, and editions (Rust 2024)
- Cargo new, build, run
- Variables and mutability
- Scalar and compound types
- String vs &str
- Control flow and println!/format! macros

### Layer 2 of 12 — id: rust-2
Title: Ownership, Borrowing, and Lifetimes
Technologies: Rust, Ownership
Description: Internalize Rust's ownership system - the most unique and important feature of the language - including moves, borrows, and lifetime annotations. Ownership is what makes Rust memory-safe without a garbage collector.
Topics:
- Ownership rules and move semantics
- References and borrowing
- Borrow checker rules
- Slices and string slices
- Lifetime annotations
- Lifetime elision rules

### Layer 3 of 12 — id: rust-3
Title: Structs, Enums, and Pattern Matching
Technologies: Rust, Ownership
Description: Model domains using Rust structs and enums, and use pattern matching to exhaustively handle variants. Rust enums are algebraic data types - far more powerful than enums in most languages.
Topics:
- Struct definitions and methods (impl)
- Tuple structs and unit structs
- Enum variants with data
- Option<T> and Result<T, E>
- match expressions
- if let and while let

### Layer 4 of 12 — id: rust-4
Title: Collections, Iterators, and Closures
Technologies: Rust, Traits
Description: Work with the standard collections (Vec, HashMap, HashSet, BTreeMap, VecDeque, BinaryHeap) and pick the right one for the job. Process data with lazy iterator chains and closures, and understand how collect() builds any collection through FromIterator.
Topics:
- Vec<T> operations
- HashMap, HashSet, BTreeMap, VecDeque, BinaryHeap
- Iterator trait and adapters (map, filter, fold)
- Chaining iterators
- Closures and capturing
- collect() and FromIterator

### Layer 5 of 12 — id: rust-5
Title: Traits and Generics
Technologies: Rust, Traits, Cargo
Description: Define and implement traits to share behavior across types, and write generic functions and structs constrained by trait bounds. Rust traits are the foundation of zero-cost abstraction.
Topics:
- Trait definition and implementation
- Default trait methods
- Trait bounds on generics
- Where clauses
- Trait objects (dyn Trait)
- Derive macros (Debug, Clone, PartialEq)

### Layer 6 of 12 — id: rust-6
Title: Error Handling with Result and the ? Operator
Technologies: Rust, Cargo
Description: Write idiomatic Rust error handling using Result<T, E>, the ? operator for propagation, and custom error types. The thiserror and anyhow crates make production error handling ergonomic.
Topics:
- Result<T, E> and error propagation
- The ? operator
- Custom error types
- thiserror crate
- anyhow crate for applications
- Error conversion with From

### Layer 7 of 12 — id: rust-7
Title: Modules, Crates, and Cargo Deep Dive
Technologies: Rust, Cargo
Description: Organize Rust code into modules and crates, manage visibility, and use Cargo workspaces for multi-crate projects. Understanding the module system is essential for building maintainable Rust projects.
Topics:
- mod declarations and file structure
- pub visibility rules
- use and re-exports
- Cargo.toml features and dependencies
- Cargo workspaces
- Publishing to crates.io

### Layer 8 of 12 — id: rust-8
Title: Lifetimes Advanced and Smart Pointers
Technologies: Rust, Ownership, Traits
Description: Go beyond basic lifetimes into advanced scenarios involving structs with references, and learn smart pointers (Box, Rc, RefCell, Arc) for heap allocation and shared ownership. These tools unlock patterns that simple borrowing cannot express.
Topics:
- Lifetime annotations in structs
- Box<T> for heap allocation
- Rc<T> and reference counting
- RefCell<T> and interior mutability
- Arc<T> for thread-safe sharing
- Deref coercions

### Layer 9 of 12 — id: rust-11
Title: Unsafe Rust and FFI
Technologies: Rust, Cargo
Description: Learn exactly what the unsafe keyword allows and how to wrap it in a safe API. You will call C libraries from Rust and expose Rust to other languages, which is how Rust fits into existing systems.
Topics:
- What unsafe permits: raw pointers, unsafe fns, unions
- Upholding invariants behind a safe API
- Calling C with extern blocks and bindgen
- Exposing Rust with extern C and cbindgen
- Memory layout, repr(C) and MaybeUninit
- Finding undefined behavior with Miri

### Layer 10 of 12 — id: rust-9
Title: Concurrency and Async Rust
Technologies: Rust, Cargo, Traits, Tokio
Description: Use threads, channels, locks, and atomics to share work safely, with Send and Sync enforced at compile time. Then move to async/await on the Tokio runtime: spawn tasks, wait on several futures with select!, and write async fn directly in traits.
Topics:
- std::thread, mpsc channels, and Mutex/Arc
- Atomics and memory ordering
- async/await syntax and the Future trait
- Tokio runtime basics
- tokio::spawn and async tasks
- async fn in traits

### Layer 11 of 12 — id: rust-12
Title: Macros and Metaprogramming
Technologies: Rust, Cargo
Description: Write code that writes code. You will build declarative macros with macro_rules and procedural macros such as derives, which power much of the Rust ecosystem, including Serde.
Topics:
- macro_rules! patterns and repetitions
- Macro hygiene and debugging with cargo expand
- Derive macros with syn and quote
- Attribute and function-like procedural macros
- Compile-time errors and spans in macros
- When to use macros versus generics

### Layer 12 of 12 — id: rust-10
Title: Production Rust - Testing, Performance, and Ecosystem
Technologies: Rust, Cargo, Traits, Ownership, tracing, Criterion
Description: Ship Rust with confidence: unit, integration, doc, mock, and property-based tests, Criterion benchmarks and flamegraphs, and structured logging with tracing. Survey the main ecosystem crates (Axum, Clap, Serde) and set up CI and cross-compilation.
Topics:
- Unit tests with #[test]
- Integration tests, doc tests, mocking, and property tests
- Criterion benchmarking
- cargo flamegraph profiling
- Structured logging with tracing
- Ecosystem overview (Axum, Clap, Serde, Diesel)

Start now with Layer 1.
