You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "C" (c, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: c-1
Title: C Syntax and Compilation
Technologies: C, GCC, Clang, Make
Description: Learn C syntax, integer types, operators, and the compilation pipeline from source to executable. Understand implicit conversions and operator precedence, and compile your first programs with GCC or Clang using modern flags: -std=c23, warnings on, and sanitizers enabled.
Topics:
- Integer types, sizeof, and implicit conversions
- Arithmetic, bitwise operators, and precedence
- Control flow: if, for, while, switch
- Functions and return values
- Standard I/O with printf and scanf
- Compiling with GCC and Clang

### Layer 2 of 10 — id: c-2
Title: Pointers and Memory Model
Technologies: C, Pointers, Address Arithmetic, Arrays
Description: Understand the C memory model, pointer arithmetic, and the relationship between arrays and pointers. Write functions that operate on data via pointers.
Topics:
- Pointer declaration and dereferencing
- Address-of operator
- Pointer arithmetic
- Arrays as pointers
- Pointers to functions
- Null pointer and pointer safety

### Layer 3 of 10 — id: c-3
Title: Strings and Standard Library
Technologies: C, string.h, stdlib.h, char arrays
Description: Work with C strings as char arrays and use the standard library for string manipulation, memory allocation, and sorting. Understand null-termination and buffer safety.
Topics:
- Null-terminated strings
- string.h: strlen, strcmp, snprintf
- stdlib.h: malloc, calloc, realloc, free
- qsort and bsearch
- Parsing with strtol and sscanf
- Buffer overflow prevention

### Layer 4 of 10 — id: c-4
Title: Structs, Unions, and Enums
Technologies: C, struct, union, enum
Description: Group related data using structs, model variant types with unions, and improve readability with enums and typedef. Build linked data structures.
Topics:
- Struct declaration and initialization
- Pointers to structs
- Typedef and named types
- Unions and memory overlap
- Enums for state representation
- Nested structs and self-referential types

### Layer 5 of 10 — id: c-5
Title: File I/O and Error Handling
Technologies: C, stdio.h, errno, File Streams
Description: Read and write files using FILE streams and handle errors robustly using errno and return-code conventions. Implement resource cleanup on all exit paths.
Topics:
- fopen, fclose, fread, fwrite
- fgets, fputs, fprintf, fscanf
- Binary vs text mode
- errno and perror
- Return-code error patterns
- Cleanup with goto or nested ifs

### Layer 6 of 10 — id: c-6
Title: Makefiles and Build Systems
Technologies: Make, GCC flags, Incremental Builds, Headers
Description: Organize a multi-file C project with header files and a Makefile that supports incremental builds, compiler warnings, and release and debug targets.
Topics:
- Header guards, macros, and conditional compilation
- Splitting code across .c and .h files
- Makefile rules, variables, and phony targets
- GCC warning flags: -Wall -Wextra
- Debug vs release builds
- ar and static libraries

### Layer 7 of 10 — id: c-7
Title: Debugging with gdb and Valgrind
Technologies: gdb, Valgrind, AddressSanitizer, Core Dumps
Description: Debug C programs using gdb for step-through inspection and Valgrind for memory error detection. Eliminate leaks, use-after-free, and buffer overruns.
Topics:
- gdb breakpoints, watch, backtrace
- Stepping through code
- Inspecting memory and registers
- Valgrind memcheck usage
- AddressSanitizer with -fsanitize=address
- Reading core dumps

### Layer 8 of 10 — id: c-8
Title: Dynamic Data Structures and Algorithms
Technologies: C, Heap, Hash Tables, Trees
Description: Implement common data structures from scratch in C: dynamic arrays, hash tables, and binary trees. Analyze time and space complexity of each.
Topics:
- Dynamic arrays with realloc
- Hash tables with chaining
- Binary search trees
- Recursive algorithms
- Big-O analysis
- Memory ownership patterns

### Layer 9 of 10 — id: c-9
Title: Systems Programming - Processes, Sockets, and Threads
Technologies: C, POSIX, fork, Sockets, pthreads
Description: Use POSIX APIs to spawn processes, handle signals, communicate over TCP sockets, and run work on threads. Understand file descriptors, the Unix process model, and how to protect shared data with mutexes and C11 atomics.
Topics:
- fork, exec, and waitpid
- Signals and async-signal safety
- Pipes and shared memory
- TCP sockets: bind, listen, accept, connect
- select, poll, and epoll
- pthreads, mutexes, and C11 atomics

### Layer 10 of 10 — id: c-10
Title: Production C - Modern C23, Testing, Profiling, and Embedding
Technologies: C23, CMake, CTest, perf, Sanitizers
Description: Write portable, production-quality C targeting C23, with CMake builds, unit tests run by CTest, profiling tools, sanitizers, and static analysis. Learn the modern C23 features and how to ship C as a shared library that other languages call.
Topics:
- C23 features: nullptr, bool, constexpr, #embed
- CMake project structure and CTest unit tests
- Profiling with gprof and perf
- C as a shared library (.so / .dll)
- Calling C from Python via ctypes
- Static analysis with cppcheck

Start now with Layer 1.
