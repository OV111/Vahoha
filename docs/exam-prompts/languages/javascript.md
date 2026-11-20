You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "JavaScript" (javascript, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: javascript-1
Title: JavaScript Syntax and Fundamentals
Technologies: JavaScript, Node.js
Description: Learn the core syntax of JavaScript: variables and scope, all eight data types, operators, equality and coercion rules, and control flow. Run code in the browser and in Node.js, and understand the dynamic, loosely-typed nature of the language.
Topics:
- var, let, const, and hoisting
- Primitive types: string, number, bigint, boolean, symbol, null, undefined
- typeof and type coercion
- Equality: ==, ===, and Object.is
- Control flow, loops, and strict mode
- Running JS in the browser and Node.js

### Layer 2 of 10 — id: javascript-2
Title: Functions, Closures, and Scope
Technologies: JavaScript, Node.js
Description: Deeply understand JavaScript function mechanics including closures, the call stack, and how scope chains work. These concepts are the bedrock of advanced JavaScript patterns.
Topics:
- Function declarations vs expressions
- Arrow functions and this binding
- Closures and the scope chain
- IIFE pattern
- call, apply, and bind
- Execution context and call stack

### Layer 3 of 10 — id: javascript-3
Title: Objects, Prototypes, and Classes
Technologies: JavaScript, ES2022+
Description: Understand JavaScript's prototype chain, object creation patterns, and how ES6 classes are syntactic sugar over prototypal inheritance. Learn modern class features including private fields and static methods.
Topics:
- Object literals and property descriptors
- Prototype chain and __proto__
- Object.create and constructor functions
- ES6 class syntax
- Private fields (#)
- Mixins and composition

### Layer 4 of 10 — id: javascript-4
Title: Asynchronous JavaScript
Technologies: JavaScript, Node.js, ES2022+
Description: Master the asynchronous programming model in JavaScript using callbacks, Promises, and async/await. Understand the event loop and how JavaScript handles concurrency in a single-threaded environment.
Topics:
- Event loop, tasks, and microtasks
- Timers: setTimeout and setInterval
- Callbacks and callback hell
- Promise API and combinators
- async/await syntax
- Error handling and cancellation

### Layer 5 of 10 — id: javascript-5
Title: DOM Manipulation and Browser APIs
Technologies: JavaScript, DOM, ES2022+
Description: Learn to interact with the browser DOM, handle events, and use Web APIs including fetch, localStorage, and the History API. Build dynamic, interactive web pages without a framework.
Topics:
- DOM selection and traversal
- Event listeners and event delegation
- DOM mutation (createElement, innerHTML)
- Fetch API and JSON
- localStorage and sessionStorage
- Form handling and validation

### Layer 6 of 10 — id: javascript-6
Title: Modern JavaScript: Collections, Iteration, and ES2025
Technologies: JavaScript, ES2025, Map, Set
Description: Use the collections and iteration tools of modern JavaScript: Map, Set and their weak versions, iterators and generators, and JSON. Then cover the features added from ES2020 to ES2025 (optional chaining, non-mutating array methods, Set methods, iterator helpers) and how to check which browsers support them.
Topics:
- Map, Set, WeakMap, and WeakSet
- Iterators and generators
- JSON and structuredClone
- Destructuring, spread, ?. and ??
- ES2023-2025: toSorted, groupBy, Set methods, iterator helpers
- Browser support with Baseline

### Layer 7 of 10 — id: javascript-7
Title: Modules, Tooling, and Node.js Ecosystem
Technologies: JavaScript, Node.js, ES2022+
Description: Learn ES Modules and CommonJS, understand the Node.js module resolution algorithm, and get comfortable with the npm ecosystem and basic build tooling. These skills bridge browser and server-side JavaScript.
Topics:
- ES Modules and CommonJS
- package.json, npm scripts, and pnpm
- Node.js built-in modules
- Node, Bun, and Deno runtimes
- Vite and esbuild
- Tree shaking and code splitting

### Layer 8 of 10 — id: javascript-8
Title: Error Handling, Debugging, and Testing
Technologies: JavaScript, Node.js
Description: Write robust error handling strategies, learn to use browser and Node.js debuggers effectively, and write tests using a modern JavaScript testing framework. Reliable code requires intentional error management and test coverage.
Topics:
- try/catch/finally in sync and async code
- Custom Error classes and error.cause
- Debugging in DevTools and Node.js
- Vitest basics
- Node's built-in test runner
- Mocking and spies

### Layer 9 of 10 — id: javascript-9
Title: Functional Programming Patterns in JavaScript
Technologies: JavaScript, ES2022+
Description: Apply functional programming to everyday JavaScript: pure functions, immutable updates with non-mutating array methods and structuredClone, map/filter/reduce, currying, and composition. These patterns make code more predictable and are how React and Redux expect state to change.
Topics:
- Pure functions and side effects
- Immutable updates without libraries
- map, filter, and reduce
- Currying and partial application
- Function composition and pipelines
- Immutability in React and Redux

### Layer 10 of 10 — id: javascript-10
Title: Production JavaScript - Performance, Security, and Ecosystem
Technologies: JavaScript, Node.js, ES2022+, DOM
Description: Learn performance profiling, memory leak detection, security best practices like XSS prevention, and how to navigate the production JavaScript ecosystem. Ship code that is fast, secure, and maintainable at scale.
Topics:
- DevTools Performance and Memory panels
- Memory leaks and WeakMap/WeakRef
- XSS and Content Security Policy
- npm supply-chain security
- Code splitting and Web Workers
- Error monitoring and Core Web Vitals

Start now with Layer 1.
