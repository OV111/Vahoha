You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "JavaScript" (javascript, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: javascript-1
Title: JavaScript Syntax and Fundamentals
Technologies: JavaScript, Node.js
Description: Learn the core syntax of JavaScript including variables, types, operators, and control flow in both browser and Node.js environments. Understand the dynamic and loosely-typed nature of the language.
Topics:
- var/let/const and scoping
- Primitive types and coercion
- Control flow and loops
- Functions and hoisting
- Strict mode
- Running JS in browser and Node.js

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
- Event loop and task queue
- Callbacks and callback hell
- Promise API (then/catch/finally)
- Promise.all and Promise.race
- async/await syntax
- Error handling in async code

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
Title: Modern ES2022+ Features
Technologies: JavaScript, ES2022+, Node.js
Description: Explore modern JavaScript features from ES2015 through ES2022+ including destructuring, spread, optional chaining, and top-level await. Staying current with the language makes code more expressive and concise.
Topics:
- Destructuring (array and object)
- Spread and rest operators
- Optional chaining (?.) and nullish coalescing (??)
- Logical assignment operators
- Top-level await
- Array methods (flatMap, at, findLast)

### Layer 7 of 10 — id: javascript-7
Title: Modules, Tooling, and Node.js Ecosystem
Technologies: JavaScript, Node.js, ES2022+
Description: Learn ES Modules and CommonJS, understand the Node.js module resolution algorithm, and get comfortable with the npm ecosystem and basic build tooling. These skills bridge browser and server-side JavaScript.
Topics:
- ES Modules (import/export)
- CommonJS (require/module.exports)
- npm scripts and package.json
- Node.js built-in modules (path, fs, http)
- Module bundlers overview (Vite, esbuild)
- Tree shaking basics

### Layer 8 of 10 — id: javascript-8
Title: Error Handling, Debugging, and Testing
Technologies: JavaScript, Node.js
Description: Write robust error handling strategies, learn to use browser and Node.js debuggers effectively, and write tests using a modern JavaScript testing framework. Reliable code requires intentional error management and test coverage.
Topics:
- try/catch/finally in sync and async code
- Custom Error classes
- Chrome DevTools debugging
- Node.js debugger
- Jest or Vitest basics
- Mocking and spies

### Layer 9 of 10 — id: javascript-9
Title: Functional Programming Patterns in JavaScript
Technologies: JavaScript, ES2022+
Description: Apply functional programming principles to JavaScript including immutability, pure functions, currying, and function composition. These patterns lead to more predictable, testable code.
Topics:
- Pure functions and side effects
- Immutability with Object.freeze and spread
- Map, filter, reduce mastery
- Currying and partial application
- Function composition
- Functors and monads conceptually

### Layer 10 of 10 — id: javascript-10
Title: Production JavaScript - Performance, Security, and Ecosystem
Technologies: JavaScript, Node.js, ES2022+, DOM
Description: Learn performance profiling, memory leak detection, security best practices like XSS prevention, and how to navigate the production JavaScript ecosystem. Ship code that is fast, secure, and maintainable at scale.
Topics:
- Chrome Performance and Memory tabs
- Memory leaks and WeakMap/WeakRef
- XSS and CSP headers
- Code splitting and lazy loading
- Web Workers for CPU tasks
- JavaScript ecosystem landscape (frameworks, runtimes)

Start now with Layer 1.
