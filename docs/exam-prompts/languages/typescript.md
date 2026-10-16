You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "TypeScript" (typescript, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: typescript-1
Title: TypeScript Setup and Basic Types
Technologies: TypeScript, tsconfig
Description: Install TypeScript, configure tsconfig.json, and learn the basic type system including primitives, arrays, and union types. Understand how TypeScript compiles to JavaScript and how to run TS in Node.js.
Topics:
- tsc and ts-node setup
- tsconfig.json essentials
- Primitive types and type annotations
- Array and tuple types
- Union and intersection types
- Type inference

### Layer 2 of 10 — id: typescript-2
Title: Interfaces, Type Aliases, and Enums
Technologies: TypeScript, Types
Description: Learn to model data using interfaces and type aliases, understand when to use each, and use enums for fixed sets of named values. These constructs are the backbone of TypeScript domain modeling.
Topics:
- Interface declaration and extension
- Type aliases vs interfaces
- Optional and readonly properties
- Enum (numeric and string)
- Const enums
- Index signatures

### Layer 3 of 10 — id: typescript-3
Title: Functions and Type Narrowing
Technologies: TypeScript, Types
Description: Type function signatures precisely including overloads and return types, and use type narrowing to safely handle union types at runtime. TypeScript's control-flow analysis makes these patterns highly ergonomic.
Topics:
- Typed function parameters and return types
- Optional and default parameters
- Function overloads
- typeof and instanceof narrowing
- Discriminated unions
- Type predicates (is)

### Layer 4 of 10 — id: typescript-4
Title: Generics
Technologies: TypeScript, Generics, Types
Description: Write reusable, type-safe code using generics in functions, interfaces, and classes. Generics are the most powerful feature of TypeScript's type system for building flexible abstractions.
Topics:
- Generic functions and inference
- Generic interfaces and classes
- Generic constraints (extends)
- Default type parameters
- Multiple type parameters
- Generic utility patterns

### Layer 5 of 10 — id: typescript-5
Title: Classes and Decorators
Technologies: TypeScript, Types, tsconfig
Description: Use TypeScript classes with access modifiers, abstract classes, and decorators to build structured, extensible code. Decorators enable metadata-driven patterns common in frameworks like NestJS and Angular.
Topics:
- Access modifiers (public, private, protected)
- Abstract classes and methods
- Readonly and parameter properties
- Decorators (experimentalDecorators)
- Class decorator patterns
- Mixins in TypeScript

### Layer 6 of 10 — id: typescript-6
Title: Advanced Types - Mapped, Conditional, and Template Literal
Technologies: TypeScript, Types, Generics
Description: Master TypeScript's advanced type-level programming including mapped types, conditional types, and template literal types. These features let you express complex type transformations that eliminate entire categories of bugs.
Topics:
- Mapped types (Partial, Required, Readonly)
- Conditional types (T extends U ? X : Y)
- infer keyword
- Template literal types
- Recursive types
- Distributive conditional types

### Layer 7 of 10 — id: typescript-7
Title: Modules, Declaration Files, and tsconfig Mastery
Technologies: TypeScript, tsconfig, Types
Description: Understand TypeScript module resolution, write declaration files for untyped libraries, and configure tsconfig.json for different build targets and project references. Proper project configuration is critical for large TypeScript codebases.
Topics:
- Module resolution strategies
- Declaration files (.d.ts)
- DefinitelyTyped and @types
- tsconfig paths and baseUrl
- Project references
- Strict mode flags

### Layer 8 of 10 — id: typescript-8
Title: Async TypeScript and Error Handling Patterns
Technologies: TypeScript, Types
Description: Write async/await code with precise typed error handling, use Result types for explicit error paths, and type complex async workflows. TypeScript makes asynchronous code safer when types are applied correctly.
Topics:
- Typing Promises and async functions
- Generic async utilities
- Result and Option types
- Error type narrowing
- Typed event emitters
- AbortController and cancellation patterns

### Layer 9 of 10 — id: typescript-9
Title: Testing TypeScript Code
Technologies: TypeScript, Types, tsconfig
Description: Write type-safe tests using Vitest or Jest with TypeScript, test type correctness with tsd or expect-type, and use advanced mocking with typed stubs. Testing TypeScript code requires understanding both runtime and compile-time correctness.
Topics:
- Vitest or Jest with ts-jest
- Typing mocks and stubs
- expect-type for type tests
- Testing generic code
- Snapshot testing for type outputs
- CI setup for type checking

### Layer 10 of 10 — id: typescript-10
Title: Production TypeScript - Build Pipelines, Performance, and Ecosystem
Technologies: TypeScript, tsconfig, Types, Generics
Description: Ship production TypeScript with optimized build pipelines, understand compiler performance tuning, and navigate the TypeScript ecosystem including popular frameworks and toolchains. Mature TypeScript projects require intentional configuration and build strategy.
Topics:
- Incremental compilation and tsBuildInfo
- esbuild and swc for fast builds
- Declaration emit and library publishing
- TypeScript compiler API basics
- Ecosystem overview (NestJS, tRPC, Zod)
- Migration from JavaScript to TypeScript

Start now with Layer 1.
