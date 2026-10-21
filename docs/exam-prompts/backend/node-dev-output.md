LAYER: node-dev-1

```json
[
  {
    "stem": "What does a closure let an inner function do?",
    "topic": "ES modules, closures & scope",
    "choices": [
      "Keep using outer variables after the outer function has returned",
      "Run in a separate thread that holds a private copy of the outer variables",
      "Read outer variables only while the outer function is still on the call stack",
      "Rebind the value of this inside the outer function, whatever its caller is"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does this print?\nfor (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0); }",
    "topic": "ES modules, closures & scope",
    "choices": [
      "0 1 2",
      "2 2 2",
      "3 3 3",
      "undefined undefined undefined"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which statement about a const declaration is true?",
    "topic": "ES modules, closures & scope",
    "choices": [
      "The object it points to becomes deeply immutable once it is assigned",
      "The binding cannot be reassigned, but its object can still be mutated",
      "It is hoisted and initialised to undefined, in the same way as var",
      "It is scoped to the nearest function rather than to the nearest block"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens when this code runs?\nconsole.log(x);\nlet x = 5;",
    "topic": "ES modules, closures & scope",
    "choices": [
      "A ReferenceError, because x is in its temporal dead zone",
      "It logs undefined because the declaration is hoisted without a value",
      "It logs 5 because the declaration is hoisted together with its value",
      "It logs null because x has been declared but not yet assigned"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which is an accurate difference between ES module imports and CommonJS require?",
    "topic": "ES modules, closures & scope",
    "choices": [
      "Imports are evaluated lazily at the line where they appear in the file",
      "Imports copy the exported values into the importing module when it loads",
      "Imports are static and hoisted, so tools can tree-shake unused exports",
      "Imports can only bring in a module's default export, never named ones"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A module has: export let count = 0; export function inc() { count++; }\nAfter another module calls inc(), what does its imported count show?",
    "topic": "ES modules, closures & scope",
    "choices": [
      "Still 0, because the import is a copy made when the module was first loaded",
      "A TypeError is thrown, because exported let bindings cannot be changed",
      "The updated value, since imports are live bindings",
      "undefined, until the importing module is loaded again from scratch"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where is a variable declared with let inside an if block visible?",
    "topic": "ES modules, closures & scope",
    "choices": [
      "Anywhere in the enclosing function",
      "Anywhere in the module after the if statement",
      "Only inside that block",
      "Only on the first line after its declaration"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the value of this at the top level of an ES module?",
    "topic": "ES modules, closures & scope",
    "choices": [
      "globalThis",
      "module.exports",
      "An empty object {}",
      "undefined"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where can top-level await be used in Node.js?",
    "topic": "ES modules, closures & scope",
    "choices": [
      "In a CommonJS file that starts with a 'use async' directive",
      "Only in files loaded through require()",
      "At the top level of an ES module",
      "Only inside functions marked async"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the last line return?\nfunction make() { let n = 0; return () => ++n; }\nconst a = make(), b = make();\na(); a();\nb();",
    "topic": "ES modules, closures & scope",
    "choices": [
      "3",
      "0",
      "1",
      "2"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is logged, in order?\nconsole.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nconsole.log('D');",
    "topic": "Promises, async/await & the event loop",
    "choices": [
      "A B C D",
      "A D C B",
      "A D B C",
      "A C D B"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does an async function always return?",
    "topic": "Promises, async/await & the event loop",
    "choices": [
      "The value it returns, unless it contains an await",
      "A generator object",
      "A thenable only when it contains an await",
      "A promise"
    ],
    "answerIdx": 3
  },
  {
    "stem": "An awaited promise rejects and there is no try/catch around the await. What happens?",
    "topic": "Promises, async/await & the event loop",
    "choices": [
      "The function returns undefined and the error is only logged",
      "The promise returned by the async function rejects with that error",
      "Execution continues after the await with the error as its result",
      "The error is held until a .catch is attached to the awaited promise"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which Promise method resolves with an outcome for every input promise, even when some reject?",
    "topic": "Promises, async/await & the event loop",
    "choices": [
      "Promise.allSettled",
      "Promise.all",
      "Promise.race",
      "Promise.any"
    ],
    "answerIdx": 0
  },
  {
    "stem": "One of the promises passed to Promise.all rejects. What does the returned promise do?",
    "topic": "Promises, async/await & the event loop",
    "choices": [
      "It waits for all to finish, then rejects with an array of reasons",
      "It resolves with undefined in the failed slot",
      "It rejects immediately with that reason",
      "It cancels the remaining promises and resolves with the finished ones"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the main consequence of using await on each request inside a for...of loop over independent requests?",
    "topic": "Promises, async/await & the event loop",
    "choices": [
      "All requests start at once and can overflow the call stack",
      "The results come back in an unpredictable order",
      "The requests run one after another instead of concurrently",
      "The event loop is blocked for the whole loop"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A request handler runs a synchronous loop that takes 5 seconds. What is the effect on a single Node process?",
    "topic": "Promises, async/await & the event loop",
    "choices": [
      "Timers still fire on schedule because they run on a separate thread",
      "Only other incoming requests wait, while timers keep firing on time",
      "Node moves the loop onto a worker thread automatically to stay responsive",
      "Nothing else in it runs until the loop ends, timers and requests included"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does x hold after this runs inside an async function?\nconst x = await 5;",
    "topic": "Promises, async/await & the event loop",
    "choices": [
      "A promise that resolves to 5",
      "Nothing, because await throws a TypeError on non-promises",
      "undefined, because only promises produce values",
      "5, after the function yields to the microtask queue once"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which handlers run?\np.then(() => { throw new Error('x'); })\n .then(onOk)\n .catch(onErr);",
    "topic": "Promises, async/await & the event loop",
    "choices": [
      "onOk, then onErr",
      "Only onErr",
      "Neither, the rejection is unhandled",
      "Only onOk"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you turn a callback-style API into a promise-based one by hand?",
    "topic": "Promises, async/await & the event loop",
    "choices": [
      "Add the async keyword to the callback function and return its result",
      "Return the callback's result straight from the outer function",
      "Put await in front of the call without changing the function at all",
      "Wrap the call in new Promise and call resolve or reject in the callback"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which array method returns a new array of the same length with each element transformed?",
    "topic": "Array & object methods",
    "choices": [
      "forEach",
      "filter",
      "find",
      "map"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens when reduce is called on an empty array with no initial value?\n[].reduce((acc, x) => acc + x)",
    "topic": "Array & object methods",
    "choices": [
      "It returns 0",
      "It returns undefined",
      "It returns NaN",
      "It throws a TypeError"
    ],
    "answerIdx": 3
  },
  {
    "stem": "const b = { ...a } where a.user is itself an object. Does changing b.user.name also change a.user.name?",
    "topic": "Array & object methods",
    "choices": [
      "No, because spread deep copies every nested object it finds",
      "Only if a was declared with const instead of let in its scope",
      "Yes, because spread copies only one level and shares nested objects",
      "No, because nested objects are frozen at the moment they are copied"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Object.entries(obj) return?",
    "topic": "Array & object methods",
    "choices": [
      "An array of [key, value] pairs",
      "An array containing only the keys",
      "A Map built from the object",
      "An iterator over the values"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does [10, 9, 1].sort() return?",
    "topic": "Array & object methods",
    "choices": [
      "[1, 9, 10]",
      "[1, 10, 9]",
      "[10, 9, 1]",
      "[9, 10, 1]"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does arr.find(x => x > 5) return when no element matches?",
    "topic": "Array & object methods",
    "choices": [
      "-1",
      "null",
      "undefined",
      "An empty array"
    ],
    "answerIdx": 2
  },
  {
    "stem": "config.port is 0. What does config.port ?? 3000 evaluate to?",
    "topic": "Array & object methods",
    "choices": [
      "0",
      "3000",
      "undefined",
      "NaN"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which built-in makes an object's existing properties read-only and also stops properties being added or removed?",
    "topic": "Array & object methods",
    "choices": [
      "Object.seal",
      "Object.freeze",
      "Object.preventExtensions",
      "Object.assign"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What do [NaN].includes(NaN) and [NaN].indexOf(NaN) return?",
    "topic": "Array & object methods",
    "choices": [
      "true and 0",
      "true and -1",
      "false and -1",
      "false and 0"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does [1, 2].flatMap(x => [x, x * 2]) return?",
    "topic": "Array & object methods",
    "choices": [
      "[[1, 2], [2, 4]]",
      "[2, 4]",
      "[1, 2, 2, 4]",
      "[1, 2, 4]"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When does TypeScript check types?",
    "topic": "TypeScript types, interfaces & generics",
    "choices": [
      "At runtime, inside the V8 engine as the code is executed line by line",
      "At runtime, when Node loads each file for the first time",
      "At runtime, but only when the strict option is turned on in tsconfig",
      "At compile time, and the types are erased from the output"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which of these can be extended by declaring the same name a second time, so the declarations merge?",
    "topic": "TypeScript types, interfaces & generics",
    "choices": [
      "A type alias",
      "A union type",
      "A const assertion",
      "An interface"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Given function first<T>(arr: T[]): T, what type does first(['a', 'b']) return?",
    "topic": "TypeScript types, interfaces & generics",
    "choices": [
      "string",
      "string[]",
      "any",
      "T"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does <T extends { id: number }> mean on a generic function?",
    "topic": "TypeScript types, interfaces & generics",
    "choices": [
      "T must be exactly the type { id: number } and nothing wider",
      "T must be some type that has a numeric id property",
      "T is created at runtime from an object that has an id",
      "T falls back to that type whenever inference fails"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does the unknown type differ from any?",
    "topic": "TypeScript types, interfaces & generics",
    "choices": [
      "unknown accepts only null and undefined, while any accepts every value",
      "any is checked at runtime, while unknown is checked at compile time only",
      "You must narrow unknown before using it, while any switches checking off",
      "unknown can be used freely like any but cannot be returned from a function"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the readonly modifier on a property do?",
    "topic": "TypeScript types, interfaces & generics",
    "choices": [
      "It makes reassigning the property a compile-time error",
      "It throws an error at runtime when the property is assigned",
      "It freezes the object with Object.freeze when it is created",
      "It hides the property from code outside the class"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the type of user.name when it is declared as name?: string?",
    "topic": "TypeScript types, interfaces & generics",
    "choices": [
      "string | undefined",
      "string | null",
      "string",
      "string | never"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the type { [key: string]: number } describe?",
    "topic": "TypeScript types, interfaces & generics",
    "choices": [
      "An object that has exactly one property, which is called key",
      "An object with any string-named properties, each holding a number",
      "An array of numbers that can be looked up by their position",
      "A built-in Map whose keys are strings and whose values are numbers"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does type C = A & B produce?",
    "topic": "TypeScript types, interfaces & generics",
    "choices": [
      "A type whose values have all the members of both A and B",
      "A type whose values are either an A or a B, but not both at once",
      "A type with only the members that A and B have in common",
      "A type where B's members replace A's members at runtime"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the default in <T = string> do?",
    "topic": "TypeScript types, interfaces & generics",
    "choices": [
      "It forces T to be string in every case, even if another type is passed",
      "It restricts T to subtypes of string, which is a constraint",
      "It uses string for T when none is given or inferred",
      "It converts values of type T into strings when the code runs"
    ],
    "answerIdx": 2
  },
  {
    "stem": "In the else branch, what is the type of x?\nfunction f(x: string | number) {\n  if (typeof x === 'string') { /* ... */ } else { /* here */ }\n}",
    "topic": "Type narrowing & utility types",
    "choices": [
      "number",
      "string | number",
      "never",
      "unknown"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Partial<User> produce?",
    "topic": "Type narrowing & utility types",
    "choices": [
      "A type where only the first property of User is kept",
      "A type where every property of User is optional",
      "A type where every property of User is read-only",
      "A type holding just the required properties of User"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Pick<User, 'id' | 'name'> produce?",
    "topic": "Type narrowing & utility types",
    "choices": [
      "An object type with only the id and name properties of User",
      "An object type with every property of User except id and name",
      "A union type of the strings 'id' and 'name'",
      "A type that requires id and name to be optional"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Record<'a' | 'b', number> describe?",
    "topic": "Type narrowing & utility types",
    "choices": [
      "An array holding the strings 'a' and 'b' in that order",
      "A tuple that contains exactly two number values inside it",
      "An object with a single property whose key is either 'a' or 'b'",
      "An object with a property a and a property b, both numbers"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What makes a union a discriminated union that a switch can narrow?",
    "topic": "Type narrowing & utility types",
    "choices": [
      "Each member is a class, so that instanceof can be used to tell them apart",
      "Every member has exactly the same set of property names and types",
      "The union is declared with the enum keyword instead of a type alias",
      "A shared property with a different literal type in each member"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does 'swim' in animal do to the type of animal in the true branch?",
    "topic": "Type narrowing & utility types",
    "choices": [
      "Nothing, because in only works at runtime and is ignored by types",
      "It casts animal to any",
      "It requires animal to be an object literal",
      "It narrows it to the union members that have a swim property"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the return type x is string tell the compiler?\nfunction isString(x: unknown): x is string",
    "topic": "Type narrowing & utility types",
    "choices": [
      "The function returns a string version of x after converting it",
      "The function throws an error unless x is already a string",
      "That x is a string in the branch where the function returned true",
      "The function can only be called with an argument that is a string"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does ReturnType<typeof getUser> evaluate to for function getUser(id: string): User?",
    "topic": "Type narrowing & utility types",
    "choices": [
      "string",
      "(id: string) => User",
      "Promise<User>",
      "User"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the non-null assertion in user!.name do?",
    "topic": "Type narrowing & utility types",
    "choices": [
      "It throws at runtime when user turns out to be null or undefined",
      "It tells the compiler user is set, with no runtime check",
      "It removes null from the type and also adds a safe runtime check",
      "It replaces a null user with an empty object before the property read"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does as const do on an object literal?",
    "topic": "Type narrowing & utility types",
    "choices": [
      "Infers the narrowest literal types and makes properties readonly",
      "Freezes the object at runtime so nothing can be changed afterwards",
      "Converts the object into an instance of an anonymous class",
      "Widens every property to a plain string or number type"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does \"strict\": true in tsconfig.json do?",
    "topic": "tsconfig & compiling for Node",
    "choices": [
      "It turns on a group of strict checks, such as strictNullChecks",
      "It adds runtime assertions that throw when a value does not match its type",
      "It disables use of the any type entirely across the whole project",
      "It only enforces consistent semicolons and quote styles in source files"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the target option control?",
    "topic": "tsconfig & compiling for Node",
    "choices": [
      "The language level of the JavaScript that is emitted",
      "The Node version the build checks for at install time",
      "The folder where compiled files are written",
      "Which module system the output uses"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the outDir option set?",
    "topic": "tsconfig & compiling for Node",
    "choices": [
      "The folder where compiled files are written",
      "The folder TypeScript searches for type declarations",
      "A folder to leave out of compilation",
      "The folder where the incremental build cache is stored"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which module setting makes TypeScript follow Node's own rules for deciding between ESM and CommonJS?",
    "topic": "tsconfig & compiling for Node",
    "choices": [
      "esnext",
      "commonjs",
      "amd",
      "nodenext"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is esModuleInterop for?",
    "topic": "tsconfig & compiling for Node",
    "choices": [
      "It lets ES modules use top-level await in older Node versions",
      "It makes default imports of CommonJS modules work",
      "It compiles every ES module into CommonJS as part of the build",
      "It allows importing JSON files without any further configuration"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why enable sourceMap in a Node project?",
    "topic": "tsconfig & compiling for Node",
    "choices": [
      "So the compiled output is smaller and loads faster at startup",
      "So stack traces and debuggers can map back to the original .ts files",
      "So Node can run the .ts files directly without a compile step",
      "So that type errors are detected while the program is running"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does running tsc --noEmit do?",
    "topic": "tsconfig & compiling for Node",
    "choices": [
      "It compiles the project but leaves out type declarations",
      "It runs the compiled output without saving it",
      "It type checks the project without writing any output files",
      "It checks only the files changed since the last build"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does skipLibCheck do?",
    "topic": "tsconfig & compiling for Node",
    "choices": [
      "It skips compiling the JavaScript files inside node_modules",
      "It skips type checking of .d.ts files, which speeds up compilation",
      "It silences type errors in your own source files only",
      "It stops TypeScript from looking for @types packages at all"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does installing @types/node provide?",
    "topic": "tsconfig & compiling for Node",
    "choices": [
      "Runtime polyfills for newer Node APIs on older Node versions",
      "A copy of the Node binary pinned for the project",
      "A bundler configuration used to build Node projects for production",
      "Type declarations for built-ins like fs and process"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does declaration: true in tsconfig.json add to the build output?",
    "topic": "tsconfig & compiling for Node",
    "choices": [
      "Runtime checks for each variable that has been declared",
      ".d.ts files describing the public types for package consumers",
      "A bundled copy of every dependency's type definitions",
      "A manifest file listing every source file that was compiled"
    ],
    "answerIdx": 1
  }
]
```
