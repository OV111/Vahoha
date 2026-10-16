You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Zig" (zig, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: zig-1
Title: Zig Syntax and Basics
Technologies: Zig, zig build, std, zig fmt
Description: Learn Zig's syntax, primitive types, control flow, and the zig build system for creating and running simple programs.
Topics:
- Variables (const vs var), types, and integers
- Control flow (if/while/for/switch)
- Functions and return types
- zig build and build.zig
- Standard library overview (std.debug, std.mem)
- zig fmt and code style

### Layer 2 of 10 — id: zig-2
Title: Memory Management and Allocators
Technologies: Zig, Allocator, ArenaAllocator, GeneralPurposeAllocator
Description: Master Zig's explicit allocator pattern — every allocation is visible, every allocator is composable, and there is no hidden GC.
Topics:
- The Allocator interface
- GeneralPurposeAllocator for development
- ArenaAllocator for batch frees
- FixedBufferAllocator for stack allocation
- defer for cleanup patterns
- Detecting memory leaks

### Layer 3 of 10 — id: zig-3
Title: Pointers, Slices, and Arrays
Technologies: Zig, pointers, slices, sentinel-terminated
Description: Understand Zig's pointer types, slices as fat pointers, and sentinel-terminated arrays for safe low-level memory manipulation.
Topics:
- Single-item and many-item pointers
- Slices (*T vs []T)
- Sentinel-terminated arrays and C strings
- Optional pointers (?*T)
- Pointer alignment and casting
- std.mem utilities (copy, eql, indexOf)

### Layer 4 of 10 — id: zig-4
Title: Comptime and Generics
Technologies: Zig, comptime, anytype, type
Description: Use Zig's comptime execution model to write generic data structures and type-checked compile-time code without a separate template syntax.
Topics:
- comptime variables and expressions
- anytype parameters
- Passing types as comptime arguments
- Compile-time type reflection (@typeInfo)
- Inline loops and comptime conditionals
- Building generic containers

### Layer 5 of 10 — id: zig-5
Title: Error Handling
Technologies: Zig, error sets, try, catch, errdefer
Description: Use Zig's explicit error union types, try/catch, and errdefer to write robust code where all failure paths are visible and compiler-enforced.
Topics:
- Error sets and error unions (!T)
- try for propagation
- catch for local handling
- errdefer for cleanup on failure
- Merging error sets
- Returning errors from main()

### Layer 6 of 10 — id: zig-6
Title: Standard Library and Data Structures
Technologies: Zig, std.ArrayList, std.HashMap, std.StringHashMap
Description: Use Zig's standard library collections — ArrayList, HashMap, and StringHashMap — with explicit allocators for real-world data manipulation.
Topics:
- std.ArrayList(T) operations
- std.AutoHashMap and StringHashMap
- std.BoundedArray for fixed-capacity
- std.mem and std.fmt utilities
- std.sort and comparators
- std.io readers and writers

### Layer 7 of 10 — id: zig-7
Title: C Interoperability
Technologies: Zig, @cImport, cABI, translate-c
Description: Call C libraries from Zig and expose Zig code to C using @cImport, extern declarations, and zig translate-c.
Topics:
- @cImport and @cInclude
- Linking C libraries in build.zig
- C calling convention with extern
- zig translate-c for header conversion
- Null-terminated strings and C types
- Exposing Zig as a C shared library

### Layer 8 of 10 — id: zig-8
Title: Build System and Testing
Technologies: zig build, build.zig, std.testing, zig test
Description: Master Zig's build system for multi-target compilation, cross-compilation, and comprehensive unit testing with std.testing.
Topics:
- build.zig structure and steps
- addExecutable, addStaticLibrary, addSharedLibrary
- Cross-compilation targets
- Unit tests with std.testing.expect
- Running tests with zig test
- Integration tests and test filters

### Layer 9 of 10 — id: zig-9
Title: Async I/O and Concurrency
Technologies: Zig, async/await, event loop, std.event
Description: Write non-blocking I/O and concurrent code using Zig's async/await model and event loop for high-performance networked applications.
Topics:
- async functions and suspend/resume
- await and Frame types
- nosuspend for sync call sites
- Event loop and I/O scheduling
- Cooperative multitasking patterns
- Async file and network I/O

### Layer 10 of 10 — id: zig-10
Title: Systems Programming – OS, Embedded, and WebAssembly
Technologies: Zig, WASM, freestanding, linker scripts
Description: Target bare-metal embedded systems, write OS kernel components, and compile Zig to WebAssembly for browser and edge deployment.
Topics:
- Freestanding targets (no libc)
- Linker scripts and custom entry points
- Inline assembly with asm()
- Compiling to WebAssembly with wasm32-freestanding
- Calling Zig WASM from JavaScript
- Writing a minimal bootloader in Zig

Start now with Layer 1.
