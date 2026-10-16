You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Swift Developer" (swift-dev, category mobile). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: swift-dev-1
Title: Swift Fundamentals
Technologies: Swift, Xcode, Playgrounds
Description: Learn Swift, Apple's modern, safe and expressive language. Start with syntax and core types in Xcode Playgrounds.
Topics:
- let, var & type inference
- Basic types & string interpolation
- Functions & closures
- Control flow — if, switch, loops
- Arrays, dictionaries & sets
- Xcode & Playgrounds

### Layer 2 of 10 — id: swift-dev-2
Title: Types, Optionals & Error Handling
Technologies: Optionals, Enums, Errors
Description: Master Swift's safety features. Use optionals to model absence and handle failures with typed errors.
Topics:
- Optionals, binding & nil-coalescing
- Structs vs classes
- Enums with associated values
- Pattern matching with switch
- Error handling — throws, try, Result
- Guard & early returns

### Layer 3 of 10 — id: swift-dev-3
Title: Protocols, Generics & Value Semantics
Technologies: Protocols, Generics, POP
Description: Write flexible, reusable Swift with protocol-oriented programming, generics and an understanding of value semantics.
Topics:
- Protocols & protocol extensions
- Protocol-oriented programming
- Generics & associated types
- Value vs reference semantics
- Equatable, Hashable, Comparable
- Opaque types (some)

### Layer 4 of 10 — id: swift-dev-4
Title: Memory & Modern Concurrency
Technologies: ARC, async/await, Actors
Description: Understand how Swift manages memory and write safe concurrent code with async/await and actors.
Topics:
- ARC & reference counting
- Strong, weak & unowned references
- Retain cycles & how to break them
- async/await & structured concurrency
- Tasks, task groups & cancellation
- Actors & data isolation

### Layer 5 of 10 — id: swift-dev-5
Title: SwiftUI Fundamentals
Technologies: SwiftUI, Views, Layout
Description: Build declarative UIs with SwiftUI. Compose views, lay them out, and react to data automatically.
Topics:
- Views & view composition
- Stacks, spacers & layout
- Modifiers & styling
- Lists & navigation
- Images, shapes & SF Symbols
- Previews & live editing

### Layer 6 of 10 — id: swift-dev-6
Title: SwiftUI State & Data Flow
Technologies: @State, @Observable, Bindings
Description: Master how data drives SwiftUI. Use the state property wrappers and the observation system to build dynamic apps.
Topics:
- @State & @Binding
- @Observable & @Bindable
- @Environment & dependency passing
- Lists, forms & user input
- Navigation & programmatic routing
- Animations & transitions

### Layer 7 of 10 — id: swift-dev-7
Title: Combine & Reactive Programming
Technologies: Combine, Publishers, Operators
Description: Handle asynchronous events the reactive way with Combine — Apple's framework for processing values over time.
Topics:
- Publishers & subscribers
- Operators — map, filter, combineLatest
- Subjects & @Published
- Error handling & retry
- Scheduling & threading
- Combine vs async/await — when to use which

### Layer 8 of 10 — id: swift-dev-8
Title: Networking & Persistence
Technologies: URLSession, Codable, SwiftData
Description: Connect to APIs and store data locally. Use URLSession with Codable and persist with SwiftData.
Topics:
- URLSession & async networking
- Codable — encoding & decoding JSON
- REST API clients
- SwiftData models & queries
- Caching & offline support
- Error & loading states

### Layer 9 of 10 — id: swift-dev-9
Title: Testing & Debugging
Technologies: XCTest, Swift Testing, Instruments
Description: Ship reliable Swift. Write unit and UI tests, and profile your app with Instruments.
Topics:
- XCTest & the Swift Testing framework
- Unit testing models & logic
- Testing async code
- UI testing
- Debugging with breakpoints & LLDB
- Profiling with Instruments

### Layer 10 of 10 — id: swift-dev-10
Title: Swift Packages & Deployment
Technologies: SwiftPM, Vapor, TestFlight
Description: Package and ship Swift beyond a single app. Build reusable packages, try server-side Swift, and distribute.
Topics:
- Swift Package Manager
- Building & publishing packages
- Server-side Swift with Vapor
- App distribution & TestFlight
- CI with Xcode Cloud
- Versioning & release management

Start now with Layer 1.
