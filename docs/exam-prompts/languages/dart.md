You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Dart" (dart, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: dart-1
Title: Dart Syntax and Basics
Technologies: Dart, Variables, Functions, DartPad
Description: Learn Dart syntax, types, and control flow using DartPad. Understand Dart as a strongly-typed, compiled language designed for fast development.
Topics:
- Variables: var, final, const
- Built-in types: int, double, String, bool, List, Map
- Control flow: if, for, while, switch
- Functions and arrow syntax
- String interpolation
- Type system overview

### Layer 2 of 10 — id: dart-2
Title: Null Safety in Dart
Technologies: Dart, Null Safety, late, ?
Description: Understand Dart sound null safety with nullable and non-nullable types, late initialization, and the required keyword. Eliminate null-related runtime errors.
Topics:
- Nullable types with ?
- Non-nullable by default
- late keyword for deferred init
- Null-aware operators: ??, ?.', !''
- required parameters
- Null safety migration patterns

### Layer 3 of 10 — id: dart-3
Title: OOP - Classes and Mixins
Technologies: Dart, Classes, Mixins, Interfaces
Description: Model your domain with Dart classes, abstract classes, and mixins. Understand Dart single-inheritance with mixin-based composition.
Topics:
- Classes and constructors
- Named and factory constructors
- Abstract classes and interfaces
- Mixins and with keyword
- Extension methods
- Operator overloading

### Layer 4 of 10 — id: dart-4
Title: Async Programming - Futures and Streams
Technologies: Dart, Future, Stream, async/await
Description: Write async Dart code using Futures, async/await, and Streams for event-driven data. Handle errors in async contexts and transform streams with operators.
Topics:
- Future and async/await
- then, catchError, whenComplete
- Stream types: single-subscription and broadcast
- StreamController
- Stream transformers: map, where
- Completer

### Layer 5 of 10 — id: dart-5
Title: Collections and Functional Patterns
Technologies: Dart, List, Map, Iterables
Description: Use Dart collections idiomatically with the Iterable API, collection-if, collection-for, and spread operators. Apply functional patterns for data transformation.
Topics:
- List, Set, Map operations
- Collection if and collection for
- Spread operator ...
- Iterable map, where, fold, expand
- whereType for type filtering
- SplayTreeMap and LinkedHashMap

### Layer 6 of 10 — id: dart-6
Title: pub, Packages, and Project Structure
Technologies: Dart, pub, pubspec.yaml, Packages
Description: Manage Dart packages with pub, structure a multi-file project, and publish a package to pub.dev. Understand pubspec.yaml, lockfiles, and dependency resolution.
Topics:
- pubspec.yaml structure
- pub get, pub upgrade, pub publish
- Importing packages with package: prefix
- Creating a Dart library package
- Documentation comments and dartdoc
- Semantic versioning

### Layer 7 of 10 — id: dart-7
Title: Testing Dart Code
Technologies: Dart, test, mockito, Coverage
Description: Test Dart applications with the test package, generate mocks with mockito or mocktail, and measure coverage with dart test --coverage. Write async tests.
Topics:
- test package setup and assertions
- group, setUp, tearDown
- Mocking with mockito or mocktail
- Testing Future and Stream code
- Code coverage with lcov
- Integration tests

### Layer 8 of 10 — id: dart-8
Title: Dart Isolates and Concurrency
Technologies: Dart, Isolate, compute, SendPort
Description: Run CPU-intensive work in separate Dart isolates to avoid blocking the event loop. Use SendPort and ReceivePort for message-passing between isolates.
Topics:
- Event loop and microtask queue
- Isolate.spawn
- SendPort and ReceivePort
- compute for simple offloading
- Isolate.run in Dart 2.19+
- Sharing data between isolates

### Layer 9 of 10 — id: dart-9
Title: Dart FFI and Native Interop
Technologies: Dart, FFI, dart:ffi, C Interop
Description: Call native C libraries from Dart using dart:ffi. Understand memory layout, struct mapping, and lifecycle management when crossing the Dart-native boundary.
Topics:
- dart:ffi overview
- Loading dynamic libraries
- Mapping C structs to Dart
- Calling C functions
- Memory allocation with calloc and malloc
- Finalizers for native cleanup

### Layer 10 of 10 — id: dart-10
Title: Production Dart - CLI Tools, Compilation, and Deployment
Technologies: Dart, dart compile, shelf, Docker
Description: Compile Dart to native executables and deploy as CLI tools or containerized HTTP servers with shelf. Apply production logging, error handling, and CI.
Topics:
- dart compile exe for native binaries
- Building CLI tools with args package
- shelf for HTTP servers
- Middleware and routing with shelf_router
- Structured logging
- Docker and GitHub Actions CI

Start now with Layer 1.
