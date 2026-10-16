You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Swift" (swift, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: swift-1
Title: Swift Syntax and Basics
Technologies: Swift, let/var, Types, Playgrounds
Description: Learn Swift syntax, constants, variables, and basic control flow in Xcode Playgrounds. Understand Swift type safety and type inference.
Topics:
- Constants and variables
- Basic types: Int, Double, String, Bool
- String interpolation
- Control flow: if, switch, for-in, while
- Functions and closures
- Tuples

### Layer 2 of 10 — id: swift-2
Title: Optionals and Error Handling
Technologies: Swift, Optionals, guard, throws
Description: Master Swift optionals with optional binding, guard statements, and nil coalescing. Handle errors with throwing functions and do-catch blocks.
Topics:
- Optional types and unwrapping
- Optional binding with if let
- guard let for early exit
- Nil coalescing operator
- Throwing functions and do-catch
- Result type

### Layer 3 of 10 — id: swift-3
Title: Structs, Classes, and Value Semantics
Technologies: Swift, struct, class, Value Semantics
Description: Understand the distinction between value types (structs, enums) and reference types (classes) in Swift. Apply value semantics for predictable state management.
Topics:
- Structs vs classes
- Value vs reference semantics
- Memberwise initializers
- Computed properties and property observers
- Lazy properties
- Mutating methods on structs

### Layer 4 of 10 — id: swift-4
Title: Protocols and Generics
Technologies: Swift, Protocols, Generics, PAT
Description: Define behavior with protocols and write reusable generic types and functions. Understand protocol-oriented programming as the Swift paradigm.
Topics:
- Protocol declaration and conformance
- Protocol extensions and default implementations
- Generics and type constraints
- Associated types
- where clauses
- Opaque types with some

### Layer 5 of 10 — id: swift-5
Title: Collections, Functional Patterns, and Closures
Technologies: Swift, Array, Dictionary, Higher-Order Functions
Description: Use Swift collections idiomatically with map, filter, reduce, and compactMap. Write expressive closures with capture lists and trailing syntax.
Topics:
- Array, Set, and Dictionary operations
- map, flatMap, compactMap
- filter and reduce
- Sorted and sorted(by:)
- Closure capture lists
- Lazy collections

### Layer 6 of 10 — id: swift-6
Title: Concurrency - Async/Await and Actors
Technologies: Swift, async/await, Actor, Task
Description: Write safe concurrent code using Swift structured concurrency with async/await, actors, and task groups. Eliminate data races at compile time.
Topics:
- async and await keywords
- Task and TaskGroup
- Actor isolation and nonisolated
- MainActor for UI updates
- Async sequences and AsyncStream
- Sendable protocol

### Layer 7 of 10 — id: swift-7
Title: Swift Package Manager and Ecosystem
Technologies: Swift, SPM, Package.swift, Dependencies
Description: Manage Swift packages with the Swift Package Manager, create reusable libraries, and integrate third-party dependencies. Understand manifest authoring.
Topics:
- Package.swift manifest
- Targets and products
- Adding dependencies
- Creating a Swift library package
- Versioning and semantic version constraints
- Cross-platform Swift packages

### Layer 8 of 10 — id: swift-8
Title: Testing with XCTest and Swift Testing
Technologies: Swift, XCTest, Swift Testing, Mocks
Description: Test Swift code with XCTest and the new Swift Testing framework using macros. Write async tests, mock protocols, and achieve meaningful coverage.
Topics:
- XCTest assertions and setUp/tearDown
- Swift Testing @Test and #expect macros
- Testing async code with async tests
- Protocol mocking patterns
- Test coverage in Xcode
- Test-driven development workflow

### Layer 9 of 10 — id: swift-9
Title: Advanced Swift - Macros, Result Builders, and Reflection
Technologies: Swift, Macros, Result Builders, Mirror
Description: Use Swift macros and result builders to reduce boilerplate and create expressive APIs. Explore runtime reflection with Mirror for debugging and serialization.
Topics:
- Attached and freestanding macros
- Writing a Swift macro with SwiftSyntax
- Result builders and @resultBuilder
- Mirror for runtime inspection
- Custom string convertible and debug descriptions
- Property wrappers

### Layer 10 of 10 — id: swift-10
Title: Production Swift - Server-Side and Cross-Platform
Technologies: Swift, Vapor, Linux, Docker
Description: Deploy Swift as a server-side language using Vapor, run it on Linux inside Docker, and apply production patterns including logging, metrics, and CI.
Topics:
- Vapor routing and middleware
- Fluent ORM and migrations
- Async request handlers
- Running Swift on Linux
- Dockerizing a Vapor app
- CI with GitHub Actions on Linux runners

Start now with Layer 1.
