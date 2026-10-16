You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Kotlin" (kotlin, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: kotlin-1
Title: Kotlin Syntax and Basics
Technologies: Kotlin, val/var, Functions, Kotlin REPL
Description: Learn Kotlin syntax, type inference, and basic constructs. Understand how Kotlin differs from Java with its concise and expressive style.
Topics:
- val and var declarations
- Basic types and type inference
- String templates
- Control flow: if, when, for, while
- Functions and default arguments
- Null safety overview

### Layer 2 of 10 — id: kotlin-2
Title: Null Safety and Type System
Technologies: Kotlin, Null Safety, Smart Casts, Elvis Operator
Description: Master Kotlin null safety with nullable types, the Elvis operator, and safe calls. Understand smart casts and sealed classes for exhaustive type handling.
Topics:
- Nullable types and safe call operator
- Elvis operator and non-null assertion
- Smart casts with is and as
- Sealed classes
- Type aliases
- Nothing type

### Layer 3 of 10 — id: kotlin-3
Title: OOP - Classes, Data Classes, and Objects
Technologies: Kotlin, Data Classes, Companion Objects, Delegation
Description: Use Kotlin classes, data classes, object declarations, and delegation to build concise and idiomatic OOP code. Understand primary constructors and init blocks.
Topics:
- Primary and secondary constructors
- Data classes and destructuring
- Object and companion object
- Interface delegation
- Operator overloading
- Copy and equals

### Layer 4 of 10 — id: kotlin-4
Title: Functional Programming and Collections
Technologies: Kotlin, Lambdas, Sequences, Higher-Order Functions
Description: Apply functional programming with Kotlin lambdas, higher-order functions, and the collections API. Use sequences for lazy evaluation of large datasets.
Topics:
- Lambdas and anonymous functions
- map, filter, reduce, flatMap
- Sequences vs lists
- Scope functions: let, run, with, apply, also
- Grouping and partitioning
- Zip and windowed operations

### Layer 5 of 10 — id: kotlin-5
Title: Extension Functions and DSLs
Technologies: Kotlin, Extensions, DSL, Infix
Description: Extend existing classes without inheritance using extension functions and properties. Build internal DSLs with lambda receivers and infix functions.
Topics:
- Extension functions and properties
- Infix functions
- Operator extensions
- Lambda with receiver
- Building a type-safe DSL
- Extension functions vs utility classes

### Layer 6 of 10 — id: kotlin-6
Title: Coroutines and Async Programming
Technologies: Kotlin, Coroutines, Flow, Suspend
Description: Write non-blocking async code using Kotlin coroutines with suspend functions, structured concurrency, and Flow for reactive streams. Replace callbacks and threads.
Topics:
- suspend functions and coroutine builders
- launch, async, await
- Coroutine context and dispatchers
- Structured concurrency and scopes
- Flow and StateFlow
- Error handling in coroutines

### Layer 7 of 10 — id: kotlin-7
Title: Testing Kotlin Applications
Technologies: Kotlin, JUnit 5, MockK, Kotest
Description: Test Kotlin code idiomatically using JUnit 5 with Kotlin extensions, MockK for mocking, and Kotest for expressive specs. Test coroutine-based code with runTest.
Topics:
- JUnit 5 and kotlin-test
- MockK mocking library
- Kotest matchers and spec styles
- Testing suspend functions with runTest
- TestCoroutineDispatcher
- Property-based testing basics

### Layer 8 of 10 — id: kotlin-8
Title: Kotlin Multiplatform and Stdlib Internals
Technologies: Kotlin, KMP, stdlib, Reflection
Description: Explore the Kotlin standard library deeply and understand Kotlin Multiplatform for sharing code across JVM, native, and JavaScript targets.
Topics:
- stdlib: ranges, progressions, delegates
- Kotlin reflection API
- KMP project structure
- expect and actual declarations
- Sharing business logic across platforms
- Interop with Java and Swift

### Layer 9 of 10 — id: kotlin-9
Title: Kotlin on the JVM - Performance and Interop
Technologies: Kotlin, JVM, Bytecode, Java Interop
Description: Understand how Kotlin compiles to JVM bytecode and how to interoperate cleanly with Java libraries. Analyze performance characteristics and avoid common pitfalls.
Topics:
- Kotlin bytecode inspection with IntelliJ
- Calling Java from Kotlin and vice versa
- @JvmStatic, @JvmField, @JvmOverloads
- Inline functions and reified generics
- Avoiding boxing in performance-critical code
- Kotlin compiler plugins overview

### Layer 10 of 10 — id: kotlin-10
Title: Production Kotlin - Ktor, DI, and Deployment
Technologies: Kotlin, Ktor, Koin, Docker
Description: Build and deploy a production Kotlin backend using Ktor for HTTP, Koin for dependency injection, and Docker for containerization. Apply structured concurrency throughout.
Topics:
- Ktor routing and plugins
- Serialization with kotlinx.serialization
- Koin dependency injection
- Configuration management
- Dockerizing a Ktor app
- CI/CD with GitHub Actions

Start now with Layer 1.
