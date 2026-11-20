You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "TypeScript" (typescript, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: typescript-1
Title: TypeScript Setup and Basic Types
Technologies: TypeScript, tsconfig, Node.js, tsx
Description: Install TypeScript, turn on strict mode from day one, and learn the core type system: primitives, arrays, tuples, inference, and the special types any, unknown, never and void. Understand how TypeScript is erased to JavaScript and the modern ways to run it: tsc, tsx, and Node's built-in type stripping.
Topics:
- tsc, tsx, and Node type stripping
- tsconfig.json and strict mode
- Primitive types and type annotations
- Array and tuple types
- any, unknown, never, and void
- Type inference

### Layer 2 of 10 — id: typescript-2
Title: Object Types, Unions, and Literal Types
Technologies: TypeScript, Types
Description: Model data with interfaces and type aliases, combine types with unions, intersections and keyof, and describe fixed sets of values with literal types and as const objects. Learn why modern code prefers these over enums, and how satisfies checks a value without widening it.
Topics:
- Interfaces vs type aliases
- Optional, readonly, and index signatures
- Union, intersection, and literal types
- keyof and typeof
- as const and satisfies
- Enums and their modern alternatives

### Layer 3 of 10 — id: typescript-3
Title: Functions and Type Narrowing
Technologies: TypeScript, Types
Description: Type function signatures precisely, including optional parameters, overloads and return types, and use narrowing to handle union types safely. Learn every narrowing tool TypeScript's control-flow analysis understands, and when an assertion (as, !) is the honest choice versus a hidden bug.
Topics:
- Typed parameters and return types
- Optional, default, and rest parameters
- Function overloads
- typeof, instanceof, in, equality, and truthiness narrowing
- Type predicates and assertion functions
- Type assertions and the non-null operator

### Layer 4 of 10 — id: typescript-4
Title: Generics
Technologies: TypeScript, Generics, Types
Description: Write reusable, type-safe code using generics in functions, interfaces, and classes. Learn constraints, keyof and indexed access, and the modern tools for steering inference: const type parameters and NoInfer.
Topics:
- Generic functions and inference
- Generic interfaces and classes
- Generic constraints (extends)
- keyof and indexed access types
- Default type parameters
- const type parameters and NoInfer

### Layer 5 of 10 — id: typescript-5
Title: Classes and Decorators
Technologies: TypeScript, Classes, Decorators
Description: Use TypeScript classes with access modifiers, parameter properties, abstract classes and the override keyword. Learn standard ECMAScript decorators (TypeScript 5.0+) and how they differ from the legacy experimentalDecorators that NestJS and Angular still use.
Topics:
- Access modifiers vs #private fields
- Parameter properties and readonly
- Abstract classes and override
- Standard decorators (TS 5.0+)
- Legacy decorators in NestJS and Angular
- Mixins in TypeScript

### Layer 6 of 10 — id: typescript-6
Title: Utility Types and Advanced Types - Mapped, Conditional, and Template Literal
Technologies: TypeScript, Types, Generics
Description: Use the built-in utility types (Partial, Pick, Omit, Record, ReturnType and more), then learn how they are built: mapped types, conditional types with infer, template literal types, and recursive types. These let you derive types from each other instead of repeating them.
Topics:
- Built-in utility types
- Mapped types and key remapping
- Conditional types and infer
- Distributive conditional types
- Template literal types
- Recursive and branded types

### Layer 7 of 10 — id: typescript-7
Title: Modules, Declaration Files, and tsconfig Mastery
Technologies: TypeScript, tsconfig, Types
Description: Understand how TypeScript resolves modules today (nodenext and bundler), how ESM and CommonJS interact, and which flags make files safe for single-file transpilers. Write declaration files, augment existing modules, and configure tsconfig for large codebases with project references.
Topics:
- module: nodenext vs bundler
- ESM, CommonJS, and package.json exports
- verbatimModuleSyntax and isolatedModules
- Declaration files (.d.ts) and @types
- Module and global augmentation
- Project references and strict flags

### Layer 8 of 10 — id: typescript-8
Title: Async TypeScript and Error Handling Patterns
Technologies: TypeScript, Types, Zod
Description: Type async code precisely, treat caught errors as unknown, and make failure paths explicit with Result types. Validate data at runtime boundaries (API responses, env vars, user input) with a schema library, so the types you rely on are actually true.
Topics:
- Typing Promises and async functions
- Errors as unknown in catch
- Result types for expected failures
- Validating external data with Zod
- Typed event emitters
- AbortController and cancellation

### Layer 9 of 10 — id: typescript-9
Title: Testing TypeScript Code
Technologies: TypeScript, Vitest, tsconfig
Description: Test TypeScript with Vitest, which runs .ts files without extra setup, and test the types themselves with expectTypeOf. Write typed mocks and test factories, and add tsc --noEmit to CI so type errors fail the build. Know Jest well enough to work in existing codebases.
Topics:
- Vitest setup for TypeScript
- Type tests with expectTypeOf
- Typed mocks with vi.mocked
- Testing generic code
- Mocking HTTP with MSW
- Type checking in CI

### Layer 10 of 10 — id: typescript-10
Title: Production TypeScript - Build Pipelines, Performance, and Ecosystem
Technologies: TypeScript, tsconfig, typescript-eslint, tsdown
Description: Ship production TypeScript: fast builds with incremental compilation and project references, library publishing with correct declaration files, linting with typescript-eslint, and runtime validation at the edges. Learn the native TypeScript compiler (TS 7) and how to migrate a JavaScript codebase.
Topics:
- Incremental builds and project references
- Library publishing with tsdown and isolatedDeclarations
- Checking packages with publint and arethetypeswrong
- typescript-eslint and Prettier
- The native TypeScript compiler (TS 7)
- Migrating from JavaScript to TypeScript

Start now with Layer 1.
