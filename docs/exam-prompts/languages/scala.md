You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Scala" (scala, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: scala-1
Title: Scala Syntax and Basics
Technologies: Scala, val/var, sbt, REPL
Description: Learn Scala syntax, type inference, and the REPL. Understand Scala as a hybrid object-functional language on the JVM.
Topics:
- val and var declarations
- Basic types and type inference
- Control flow: if, match, for, while
- Functions and methods
- String interpolation
- Running Scala with sbt

### Layer 2 of 10 — id: scala-2
Title: OOP in Scala - Classes, Traits, and Objects
Technologies: Scala, class, trait, case class
Description: Model domains with Scala classes, traits, and case classes. Understand companion objects and how Scala OOP unifies with functional idioms.
Topics:
- Classes and primary constructors
- Case classes and structural equality
- Traits as mixins and interfaces
- Companion objects and apply
- Abstract classes vs traits
- Singleton objects

### Layer 3 of 10 — id: scala-3
Title: Functional Programming - Collections and Higher-Order Functions
Technologies: Scala, List, Option, map/flatMap
Description: Use Scala collections functionally with map, flatMap, filter, and fold. Model optionality with Option and chain operations with for-comprehensions.
Topics:
- Immutable collections: List, Vector, Map, Set
- map, flatMap, filter, foldLeft
- Option type and avoiding null
- for-comprehensions
- Tuple and Either types
- Lazy val and lazy evaluation

### Layer 4 of 10 — id: scala-4
Title: Pattern Matching and Algebraic Data Types
Technologies: Scala, match, sealed trait, ADT
Description: Model data with algebraic data types using sealed traits and case classes. Use exhaustive pattern matching to process ADTs safely and expressively.
Topics:
- match expressions
- Sealed trait ADTs
- Pattern guards
- Extractors and unapply
- Nested patterns
- Case class pattern matching

### Layer 5 of 10 — id: scala-5
Title: Type Classes and Implicits
Technologies: Scala, Type Classes, given/using, Implicit
Description: Implement ad-hoc polymorphism with type classes using Scala 3 given and using clauses. Understand how the compiler resolves implicit parameters.
Topics:
- Type class pattern
- given instances and using parameters
- Deriving type class instances
- Context bounds
- Extension methods in Scala 3
- Implicit scope and resolution rules

### Layer 6 of 10 — id: scala-6
Title: sbt Deep Dive and Project Structure
Technologies: Scala, sbt, Multi-module, Plugins
Description: Master sbt for multi-module Scala projects, custom tasks, and plugin integration. Configure build settings, aggregation, and publish workflows.
Topics:
- build.sbt and project structure
- Settings, tasks, and keys
- Multi-module projects and aggregation
- sbt plugins: scalafmt, scoverage
- Publishing to Maven
- Cross-Scala version builds

### Layer 7 of 10 — id: scala-7
Title: Concurrency - Futures and Akka
Technologies: Scala, Future, Akka, ExecutionContext
Description: Write concurrent Scala code using Futures with ExecutionContext and the Akka actor framework. Handle asynchronous failures and backpressure with Akka Streams.
Topics:
- Future and Promise
- ExecutionContext configuration
- Akka actor system and ActorRef
- Message passing and ask pattern
- Akka Streams basics
- Supervision strategies in Akka

### Layer 8 of 10 — id: scala-8
Title: Cats and Functional Effect Systems
Technologies: Scala, Cats, Cats Effect, IO
Description: Use the Cats library for functional abstractions and Cats Effect IO for purely functional async programming. Model side effects as values.
Topics:
- Functor, Monad, Applicative in Cats
- IO type and referential transparency
- Resource for safe resource management
- Fiber for concurrency
- IOApp entry point
- Error handling in IO

### Layer 9 of 10 — id: scala-9
Title: Testing Scala with ScalaTest and ScalaCheck
Technologies: Scala, ScalaTest, ScalaCheck, Mockito
Description: Test Scala code with ScalaTest using multiple spec styles, generate test cases with ScalaCheck property-based testing, and mock dependencies with Mockito.
Topics:
- ScalaTest spec styles: FunSuite, WordSpec
- Matchers and assertions
- ScalaCheck Gen and Prop
- Property-based testing patterns
- Testing IO with Cats Effect TestControl
- Test coverage with sbt-scoverage

### Layer 10 of 10 — id: scala-10
Title: Production Scala - HTTP4s, Doobie, and Deployment
Technologies: Scala, http4s, Doobie, Docker
Description: Build and deploy a production Scala service using http4s for HTTP, Doobie for type-safe SQL, and Docker for containerized deployment with CI.
Topics:
- http4s routing and middleware
- Doobie connection pool and queries
- Circe JSON encoding/decoding
- Configuration with PureConfig
- Dockerizing a Scala app
- CI/CD with GitHub Actions and GraalVM native image

Start now with Layer 1.
