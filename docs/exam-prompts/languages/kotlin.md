You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Kotlin" (kotlin, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: kotlin-1
Title: Kotlin Syntax and Basics
Technologies: Kotlin, val/var, Functions, Kotlin REPL
Description: Learn Kotlin syntax, type inference, and basic constructs, including control flow as expressions, labeled returns, and exceptions. Understand how Kotlin differs from Java with its concise and expressive style, and know that current Kotlin (2.x) is built on the faster K2 compiler.
Topics:
- val and var declarations
- Basic types, arrays, and type inference
- String templates
- Control flow: if, when, loops, and labels
- Exceptions and try as an expression
- Functions, default arguments, and null safety overview

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
Description: Use Kotlin classes, data classes, object declarations, and delegation to build concise and idiomatic OOP code. Learn why classes are final by default, how visibility works, when to pick an enum over a sealed class, and how generics with in/out variance keep APIs type-safe.
Topics:
- Constructors, data classes, and copy
- Objects, companions, and delegation
- open, abstract classes, and interfaces
- Visibility modifiers
- Enum classes vs sealed classes
- Generics and variance (in/out)

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
Description: Write non-blocking async code using Kotlin coroutines with suspend functions, structured concurrency, and Flow for reactive streams. Learn how cancellation propagates, how coroutines talk through channels, and how exceptions travel up the job hierarchy.
Topics:
- suspend functions and coroutine builders
- launch, async, and await
- Dispatchers and withContext
- Structured concurrency and cancellation
- Channels, Flow, and StateFlow
- Exception handling and CoroutineExceptionHandler

### Layer 7 of 10 — id: kotlin-7
Title: Testing Kotlin Applications
Technologies: Kotlin, JUnit 5, MockK, Kotest
Description: Test Kotlin code idiomatically using JUnit 5 with Kotlin extensions, MockK for mocking, and Kotest for expressive specs. Test coroutine-based code with runTest.
Topics:
- JUnit 5 and kotlin-test
- MockK mocking library
- Kotest matchers and spec styles
- Testing suspend functions with runTest
- StandardTestDispatcher and UnconfinedTestDispatcher
- Property-based testing basics

### Layer 8 of 10 — id: kotlin-8
Title: Kotlin Multiplatform and Stdlib Internals
Technologies: Kotlin, KMP, Compose Multiplatform, stdlib
Description: Explore the Kotlin standard library deeply and understand Kotlin Multiplatform for sharing code across JVM, Android, iOS, and web (Wasm) targets. See how Compose Multiplatform extends sharing from business logic to the UI.
Topics:
- stdlib: ranges, contracts, reflection
- KMP project structure
- expect and actual declarations
- Sharing business logic across platforms
- Compose Multiplatform for shared UI
- Choosing targets: JVM, iOS, Wasm

### Layer 9 of 10 — id: kotlin-9
Title: Kotlin on the JVM - Performance and Interop
Technologies: Kotlin, JVM, Bytecode, Java Interop
Description: Understand how Kotlin compiles to JVM bytecode and how to interoperate cleanly with Java libraries. Analyze performance characteristics, avoid common pitfalls, and keep the build modern with KSP and the K2 compiler.
Topics:
- Kotlin bytecode inspection with IntelliJ
- Calling Java from Kotlin and vice versa
- @JvmStatic, @JvmField, @JvmOverloads
- Inline functions and reified generics
- Avoiding boxing in performance-critical code
- KSP vs kapt

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
