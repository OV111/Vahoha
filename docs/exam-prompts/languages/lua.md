You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Lua" (lua, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: lua-1
Title: Lua Syntax and Basics
Technologies: Lua, Variables, Functions, Lua REPL
Description: Learn Lua syntax, dynamic typing, and the interactive REPL. Understand Lua as a lightweight embeddable scripting language.
Topics:
- Variables: local and global
- Basic types: nil, boolean, number, string
- Control flow: if, while, repeat, for
- Functions as first-class values
- Multiple return values
- String manipulation

### Layer 2 of 10 — id: lua-2
Title: Tables - The Universal Data Structure
Technologies: Lua, Tables, Arrays, Dictionaries
Description: Master Lua tables as the single mechanism for arrays, dictionaries, sets, and objects. Understand table constructors and iteration patterns.
Topics:
- Table constructors and indexing
- Tables as arrays with # operator
- Tables as dictionaries
- ipairs vs pairs iteration
- Table library: insert, remove, sort, concat
- Weak tables

### Layer 3 of 10 — id: lua-3
Title: Functions, Closures, and Iterators
Technologies: Lua, Closures, Iterators, Varargs
Description: Use Lua closures for encapsulation and state, write custom iterators for for-in loops, and handle variadic arguments. Understand upvalues.
Topics:
- Closures and upvalues
- Variadic functions with ...
- Custom stateful iterators
- Coroutine-based iterators
- select and table.pack/unpack
- Memoization with closures

### Layer 4 of 10 — id: lua-4
Title: Metatables and OOP
Technologies: Lua, Metatables, OOP, __index
Description: Implement object-oriented programming in Lua using metatables and the __index metamethod. Build class systems with inheritance.
Topics:
- Metatables and setmetatable
- __index for method lookup
- __newindex, __tostring, __add metamethods
- Prototype-based inheritance
- Class factory pattern
- Operator overloading via metamethods

### Layer 5 of 10 — id: lua-5
Title: Coroutines
Technologies: Lua, Coroutines, coroutine.create, yield
Description: Use Lua coroutines for cooperative multitasking, generator patterns, and async-style control flow. Understand the difference from OS threads.
Topics:
- coroutine.create, wrap, resume, yield
- Producer-consumer patterns
- Coroutine-based state machines
- Error handling in coroutines
- Coroutines as iterators
- Scheduling with a simple event loop

### Layer 6 of 10 — id: lua-6
Title: Modules and Package System
Technologies: Lua, require, package.path, Modules
Description: Structure Lua programs using the module pattern and the require system. Understand package.path, package.loaded, and creating reusable Lua libraries.
Topics:
- require and module loading
- package.path and package.cpath
- Returning tables as modules
- Preventing duplicate loading with package.loaded
- Local vs global module patterns
- Submodule organization

### Layer 7 of 10 — id: lua-7
Title: File I/O and the Standard Library
Technologies: Lua, io, os, string patterns
Description: Use Lua standard library modules io, os, string, and math for file handling, system interaction, and text processing. Master Lua string patterns.
Topics:
- io.open, read, write, close
- io.lines for file iteration
- os.time, os.clock, os.date
- string.find, match, gmatch, gsub
- Lua patterns vs regex
- math library functions

### Layer 8 of 10 — id: lua-8
Title: Embedding Lua and the C API
Technologies: Lua, C API, lua_State, luaL_newstate
Description: Embed Lua into a C application using the Lua C API. Push and pop values on the Lua stack, call Lua from C, and expose C functions to Lua scripts.
Topics:
- lua_State and luaL_newstate
- Lua stack: push, pop, and type checking
- Calling Lua functions from C
- Registering C functions in Lua
- luaL_dofile and luaL_dostring
- Error handling with lua_pcall

### Layer 9 of 10 — id: lua-9
Title: LuaJIT and Performance Optimization
Technologies: LuaJIT, FFI, JIT, Profiling
Description: Run Lua at near-native speed using LuaJIT and its tracing JIT compiler. Use LuaJIT FFI to call C functions without the C API overhead.
Topics:
- LuaJIT installation and compatibility
- JIT compilation and traces
- LuaJIT FFI for calling C
- ffi.cdef and ffi.C
- Profiling with jit.p
- Performance pitfalls: tables, closures, varargs

### Layer 10 of 10 — id: lua-10
Title: Production Lua - OpenResty, Testing, and Deployment
Technologies: Lua, OpenResty, Busted, LuaRocks
Description: Deploy production Lua services using OpenResty for high-performance HTTP, manage packages with LuaRocks, and test with the Busted framework.
Topics:
- OpenResty and nginx Lua directives
- Shared memory dictionaries in OpenResty
- Non-blocking I/O with cosocket
- LuaRocks package management
- Busted test framework
- Docker deployment for OpenResty

Start now with Layer 1.
