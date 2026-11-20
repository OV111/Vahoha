You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Software Design & Architecture" (software-design, category cs). It has 12 layers, listed at the bottom.

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
### Layer 1 of 12 — id: software-design-1
Title: Clean Code and Code Smells
Technologies: Naming, Functions, Code Smells
Description: Learn to write code that the next person can read. You will name things well, keep functions small and single-purpose, and spot the smells that signal a design problem.
Topics:
- Meaningful names and intent-revealing code
- Small functions and a single level of abstraction
- Comments: when they help and when they hide a smell
- Common smells: long method, large class, duplication
- Error handling without noise
- Formatting, linters and team conventions

### Layer 2 of 12 — id: software-design-2
Title: Object-Oriented Design Done Right
Technologies: Encapsulation, Composition, Polymorphism
Description: Use objects to model behavior, not just to hold data. You will practice encapsulation, favor composition over inheritance, and decide when polymorphism earns its keep.
Topics:
- Encapsulation and hiding internal state
- Inheritance and its fragility
- Composition over inheritance
- Polymorphism and interfaces
- Cohesion and coupling
- Tell, do not ask; the Law of Demeter

### Layer 3 of 12 — id: software-design-3
Title: SOLID Principles
Technologies: SRP, OCP, Dependency Inversion
Description: Apply the five SOLID principles through before-and-after refactors. For each one you will see the problem it solves and the cost of overdoing it.
Topics:
- Single responsibility principle
- Open/closed principle
- Liskov substitution principle
- Interface segregation principle
- Dependency inversion and dependency injection
- When SOLID is over-engineering

### Layer 4 of 12 — id: software-design-4
Title: Creational Patterns
Technologies: Factory, Builder, Singleton
Description: Control how objects get created. You will use factories, builders and dependency injection, and learn why the singleton is usually a trap.
Topics:
- Factory method and abstract factory
- Builder for complex construction
- Singleton and why it hurts testing
- Prototype and object pools
- Dependency injection as a modern replacement
- Choosing a pattern versus a plain function

### Layer 5 of 12 — id: software-design-5
Title: Structural Patterns
Technologies: Adapter, Decorator, Facade
Description: Combine objects into larger structures without tangling them. You will wrap third-party code with adapters, add behavior with decorators and hide complexity behind facades.
Topics:
- Adapter for third-party APIs
- Decorator for stacking behavior
- Facade for a simple entry point
- Proxy for access control and lazy loading
- Composite for tree structures
- Patterns in everyday middleware

### Layer 6 of 12 — id: software-design-6
Title: Behavioral Patterns
Technologies: Strategy, Observer, State
Description: Organize how objects talk and make decisions. You will replace long conditionals with strategies and states, and decouple components with observers and commands.
Topics:
- Strategy to swap algorithms
- Observer and event-driven design
- Command, undo and queues of actions
- State machines for changing behavior
- Template method and chain of responsibility
- Spotting patterns in frameworks you already use

### Layer 7 of 12 — id: software-design-7
Title: Refactoring Safely
Technologies: Refactoring, Tests, Legacy Code
Description: Change structure without changing behavior. You will write tests around code you do not trust, then improve it in small, reversible steps.
Topics:
- Characterization tests for legacy code
- Small steps and the refactoring catalog
- Extract function, move method, rename
- Replacing conditionals with polymorphism
- Strangler pattern for large rewrites
- Measuring whether a refactor helped

### Layer 8 of 12 — id: software-design-8
Title: Layered, Hexagonal, and Clean Architecture
Technologies: Layers, Ports and Adapters, Dependency Rule
Description: Structure a whole application so business rules do not depend on frameworks or databases. You will compare layered, hexagonal and clean architecture and apply the dependency rule.
Topics:
- Layered architecture and its leaks
- Ports and adapters (hexagonal)
- The dependency rule
- Controllers, services and repositories
- Keeping the domain free of framework code
- Testing each layer in isolation

### Layer 9 of 12 — id: software-design-9
Title: Domain-Driven Design Essentials
Technologies: Entities, Aggregates, Bounded Contexts
Description: Model the business first. You will separate entities from value objects, draw aggregate boundaries and split a system into bounded contexts with a shared language.
Topics:
- Ubiquitous language
- Entities and value objects
- Aggregates and consistency boundaries
- Domain events
- Bounded contexts and context maps
- When DDD is too heavy

### Layer 10 of 12 — id: software-design-10
Title: Modules, Monoliths, and Service Boundaries
Technologies: Modular Monolith, Coupling, Boundaries
Description: Decide where code boundaries belong. You will build a modular monolith, enforce module boundaries and learn when splitting into services is worth the cost.
Topics:
- Modular monolith structure
- Public interfaces and dependency direction
- Detecting hidden coupling
- Shared libraries versus duplication
- Migrating from monolith to services
- Conway's law and team boundaries

### Layer 11 of 12 — id: software-design-11
Title: API and Interface Design
Technologies: Contracts, Errors, Versioning
Description: Design the seams other code depends on. You will define clear contracts, handle errors consistently and change an interface without breaking its users.
Topics:
- Designing small, deep interfaces
- Error handling strategy across a codebase
- Backward-compatible changes and versioning
- Validation at the boundary
- Idempotency and predictable behavior
- Documenting a contract

### Layer 12 of 12 — id: software-design-12
Title: Low-Level Design Interview Problems
Technologies: Parking Lot, LRU Cache, Rate Limiter
Description: Turn everything into interview practice. You will clarify requirements, pick classes and relationships, apply patterns where they fit and code a clean solution under time pressure.
Topics:
- A framework for low-level design rounds
- Parking lot and elevator systems
- LRU cache and rate limiter classes
- Chess, tic-tac-toe and state-heavy games
- Booking and inventory systems
- Presenting trade-offs and extending the design

Start now with Layer 1.
