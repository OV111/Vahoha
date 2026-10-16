You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Kotlin Developer" (kotlin-dev, category mobile). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: kotlin-dev-1
Title: Kotlin Fundamentals
Technologies: Kotlin, JVM, IntelliJ
Description: Start with Kotlin's expressive, concise syntax on the JVM. Learn the basics that make Kotlin a joy to write.
Topics:
- val, var & type inference
- Basic types & string templates
- Functions & default arguments
- Control flow — if, when, ranges
- Collections overview
- The Kotlin toolchain & REPL

### Layer 2 of 10 — id: kotlin-dev-2
Title: OOP & Null Safety
Technologies: Classes, Null Safety, Data Classes
Description: Model your domain with Kotlin's classes and embrace null safety — the feature that kills NullPointerExceptions.
Topics:
- Classes, constructors & properties
- Data classes & destructuring
- Sealed classes & enums
- Interfaces & abstract classes
- Nullable types, ?., ?: & !!
- Smart casts & is/as

### Layer 3 of 10 — id: kotlin-dev-3
Title: Functional Kotlin & Collections
Technologies: Lambdas, Collections, Sequences
Description: Write idiomatic, functional Kotlin. Master higher-order functions and the rich collections API.
Topics:
- Lambdas & higher-order functions
- map, filter, reduce & fold
- Scope functions — let, run, apply, also, with
- Extension functions
- Sequences & lazy evaluation
- Immutability & collection operations

### Layer 4 of 10 — id: kotlin-dev-4
Title: Coroutines & Concurrency
Technologies: Coroutines, suspend, Dispatchers
Description: Concurrency the Kotlin way. Write asynchronous, non-blocking code with coroutines and structured concurrency.
Topics:
- Coroutines & suspend functions
- launch, async & await
- Structured concurrency & scopes
- Dispatchers & context switching
- Cancellation & timeouts
- Exception handling in coroutines

### Layer 5 of 10 — id: kotlin-dev-5
Title: Flow & Async Streams
Technologies: Flow, StateFlow, Channels
Description: Handle streams of values over time with Kotlin Flow — the reactive backbone of modern Kotlin apps.
Topics:
- Cold flows & flow builders
- Operators — map, filter, transform
- StateFlow & SharedFlow
- Channels & producers
- Backpressure & buffering
- Combining & flattening flows

### Layer 6 of 10 — id: kotlin-dev-6
Title: Build Tooling with Gradle
Technologies: Gradle, Kotlin DSL, Dependencies
Description: Every real Kotlin project is built with Gradle. Learn the build lifecycle, the Kotlin DSL and dependency management.
Topics:
- Gradle build lifecycle
- Kotlin DSL (build.gradle.kts)
- Dependencies & version catalogs
- Multi-module projects
- Tasks & plugins
- Publishing artifacts

### Layer 7 of 10 — id: kotlin-dev-7
Title: Backend with Ktor
Technologies: Ktor, Routing, Serialization
Description: Build asynchronous backend services with Ktor, JetBrains' lightweight Kotlin-first web framework.
Topics:
- Ktor setup & application structure
- Routing & request handling
- Content negotiation & kotlinx.serialization
- Plugins (features) & pipelines
- Client requests with Ktor Client
- Configuration & environments

### Layer 8 of 10 — id: kotlin-dev-8
Title: Data & Persistence
Technologies: Exposed, SQL, PostgreSQL
Description: Persist data from your Ktor backend using Exposed, JetBrains' Kotlin SQL framework, against PostgreSQL.
Topics:
- Exposed DSL & DAO
- Defining tables & schemas
- CRUD & queries
- Connection pooling with HikariCP
- Transactions
- Migrations

### Layer 9 of 10 — id: kotlin-dev-9
Title: Testing in Kotlin
Technologies: JUnit5, MockK, Kotest
Description: Test Kotlin code idiomatically. Use JUnit5, MockK and Kotest to cover units, coroutines and endpoints.
Topics:
- JUnit5 with Kotlin
- Kotest assertions & specs
- Mocking with MockK
- Testing coroutines & flows
- Ktor endpoint testing
- Coverage & CI

### Layer 10 of 10 — id: kotlin-dev-10
Title: Multiplatform & Deployment
Technologies: Kotlin Multiplatform, Docker, CI/CD
Description: Share Kotlin across targets and ship it. Explore Kotlin Multiplatform and deploy your Ktor service.
Topics:
- Kotlin Multiplatform overview
- Sharing logic across JVM/JS/Native
- Building a fat jar / native image
- Dockerizing a Ktor app
- GitHub Actions CI/CD
- Deploying to a cloud platform

Start now with Layer 1.
