You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Rust" (rust, category languages). It has 12 layers, listed at the bottom.

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
### Layer 1 of 12 — id: rust-1
Title: Rust Setup and Basic Syntax
Technologies: Rust, Cargo
Description: Install Rust via rustup, understand Cargo as the build system and package manager, and learn Rust basic syntax. Rust's compiler is unusually helpful - learning to read its error messages is a core skill.
Topics:
- rustup and toolchain management
- Cargo new, build, run
- Variables and mutability
- Basic types (i32, f64, bool, char)
- Control flow
- println! and format! macros

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
Description: Use Vec, HashMap, and HashSet from the standard library, and master Rust's powerful iterator adapters combined with closures. Rust iterators are lazy and zero-cost - using them is idiomatic and efficient.
Topics:
- Vec<T> operations
- HashMap and HashSet
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
Technologies: Rust, Cargo, Traits
Description: Use Rust threads and message-passing channels for parallelism, and learn async/await with the Tokio runtime for high-performance I/O. Rust guarantees thread safety at compile time - the compiler prevents data races.
Topics:
- std::thread and join handles
- mpsc channels
- Mutex<T> and Arc for shared state
- async/await syntax
- Tokio runtime basics
- tokio::spawn and async tasks

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
Technologies: Rust, Cargo, Traits, Ownership
Description: Write unit and integration tests in Rust, benchmark with Criterion, profile binaries, and survey the production Rust ecosystem for web, CLI, and systems use cases. Rust in production rewards investment in tooling and ecosystem knowledge.
Topics:
- Unit tests with #[test]
- Integration tests in tests/ directory
- Criterion benchmarking
- cargo flamegraph profiling
- unsafe Rust basics
- Ecosystem overview (Axum, Clap, Serde, Diesel)

Start now with Layer 1.
