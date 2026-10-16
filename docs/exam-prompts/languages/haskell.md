You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Haskell" (haskell, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: haskell-1
Title: Haskell Syntax and GHCi
Technologies: Haskell, GHCi, Types, Functions
Description: Learn Haskell syntax, pure functions, and type signatures using GHCi. Understand Haskell as a purely functional, lazy, statically typed language.
Topics:
- Basic types: Int, Integer, Double, Bool, Char
- Function definition and application
- Guards and where clauses
- Let expressions
- Type signatures
- GHCi commands

### Layer 2 of 10 — id: haskell-2
Title: Lists, Recursion, and Pattern Matching
Technologies: Haskell, Lists, Recursion, Pattern Matching
Description: Work with Haskell lists using recursion and pattern matching on constructors. Understand lazy evaluation and how infinite lists are possible.
Topics:
- List construction: cons : and empty []
- Pattern matching on lists
- Recursive list functions
- List comprehensions
- Lazy evaluation and infinite lists
- foldr, foldl, scanl

### Layer 3 of 10 — id: haskell-3
Title: Type Classes and Polymorphism
Technologies: Haskell, Type Classes, Eq, Ord, Show
Description: Define and use type classes for ad-hoc polymorphism. Understand standard type classes Eq, Ord, Show, Read, Enum, and Num.
Topics:
- Type class declaration and instance
- Deriving standard instances
- Eq, Ord, Show, Read, Enum
- Num and Fractional hierarchies
- Class constraints in type signatures
- Default method implementations

### Layer 4 of 10 — id: haskell-4
Title: Algebraic Data Types and Maybe/Either
Technologies: Haskell, ADT, Maybe, Either
Description: Model domains with Haskell algebraic data types using sum and product types. Use Maybe and Either to handle failure without exceptions.
Topics:
- Sum types with data and |
- Product types and record syntax
- Maybe for optional values
- Either for error handling
- Newtype for type safety
- Deriving instances for ADTs

### Layer 5 of 10 — id: haskell-5
Title: Functors, Applicatives, and Monads
Technologies: Haskell, Functor, Applicative, Monad
Description: Understand the Functor, Applicative, and Monad type classes that unify computation patterns. Use do-notation as syntactic sugar for monadic code.
Topics:
- Functor and fmap
- Applicative and <*>
- Monad and >>= bind
- do-notation desugaring
- Maybe, Either, and List as monads
- Monad laws

### Layer 6 of 10 — id: haskell-6
Title: IO Monad and Side Effects
Technologies: Haskell, IO, do-notation, IORef
Description: Perform side effects in Haskell through the IO monad, separating pure and impure code. Use IORef for mutable state when necessary.
Topics:
- IO actions and main
- do-notation for IO
- Reading and writing files in IO
- IORef for mutable cells
- Exception handling with try and catch
- hPutStrLn and stderr

### Layer 7 of 10 — id: haskell-7
Title: Cabal, Stack, and the Haskell Ecosystem
Technologies: Haskell, Cabal, Stack, Hackage
Description: Manage Haskell projects with Cabal and Stack, add dependencies from Hackage and Stackage, and structure multi-module packages.
Topics:
- cabal init and .cabal file
- Stack project structure and stack.yaml
- Adding dependencies from Hackage
- Library and executable targets
- GHC extensions
- hpack and package.yaml

### Layer 8 of 10 — id: haskell-8
Title: Advanced Type System - GADTs and Type Families
Technologies: Haskell, GADTs, Type Families, DataKinds
Description: Use advanced GHC extensions to enforce invariants at the type level with GADTs, type families, and DataKinds. Write type-safe DSLs.
Topics:
- GADT syntax and uses
- Type families: type and data families
- DataKinds for type-level data
- KindSignatures
- Phantom types
- Type-safe state machines

### Layer 9 of 10 — id: haskell-9
Title: Concurrency and STM
Technologies: Haskell, async, STM, MVar
Description: Write concurrent Haskell using lightweight threads, MVar for synchronization, and Software Transactional Memory for composable atomic operations.
Topics:
- forkIO and lightweight threads
- MVar for shared mutable state
- STM and TVar
- Composing transactions with atomically
- async library: concurrently and race
- Exception handling in concurrent code

### Layer 10 of 10 — id: haskell-10
Title: Production Haskell - Servant, Persistent, and Deployment
Technologies: Haskell, Servant, Persistent, Docker
Description: Build and deploy a production Haskell web service with type-safe APIs using Servant, database access with Persistent, and Docker containerization.
Topics:
- Servant API type definitions
- Handler implementation and server
- Persistent models and migrations
- Esqueleto for complex queries
- Dockerizing a Haskell app
- GHC optimization flags and profiling

Start now with Layer 1.
