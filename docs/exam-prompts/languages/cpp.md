You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "C++" (cpp, category languages). It has 14 layers, listed at the bottom.

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
### Layer 1 of 14 — id: cpp-1
Title: C++ Syntax and Compilation Model
Technologies: C++
Description: Set up a C++ compiler (GCC or Clang), understand the preprocessing, compilation, and linking pipeline, and learn basic modern syntax: auto, the named C++ casts, and type-safe output with std::format and std::print. C++ is a compiled systems language where understanding the build model is as important as the syntax.
Topics:
- Setting up GCC/Clang and CMake
- Headers vs source files
- Variables, auto, and C++ casts
- Control flow and functions
- Namespaces
- Output with std::print and std::format

### Layer 2 of 14 — id: cpp-2
Title: Pointers, References, and Memory Management
Technologies: C++, RAII
Description: Understand pointers and references, manual memory management with new and delete, and why unmanaged memory is dangerous. This layer is where C++ diverges most sharply from other modern languages.
Topics:
- Pointer syntax and arithmetic
- References vs pointers
- new and delete
- Object lifetime and storage duration
- Memory leaks and dangling pointers
- Valgrind and AddressSanitizer basics

### Layer 3 of 14 — id: cpp-3
Title: Classes, OOP, and RAII
Technologies: C++, RAII
Description: Define C++ classes with constructors, destructors, and operator overloading, use inheritance and virtual dispatch, and learn the class-design rules that keep resource handling correct: the Rule of Zero, Three and Five, move-only types, and the Pimpl idiom.
Topics:
- Class definition and access specifiers
- Constructors and destructors
- Inheritance and virtual functions
- Operator overloading
- Rule of Zero, Three and Five
- Pimpl and non-copyable types

### Layer 4 of 14 — id: cpp-11
Title: Move Semantics and Value Categories
Technologies: C++, RAII, STL
Description: Understand lvalues, rvalues and xvalues, and how rvalue references let an object hand over its resources instead of copying them. Move semantics is why modern containers and smart pointers are cheap to pass around, and getting it wrong silently turns moves back into copies.
Topics:
- Value categories: lvalue, prvalue, xvalue
- Rvalue references and std::move
- Move constructor and move assignment
- Copy elision and return value optimization
- Perfect forwarding with std::forward
- The Rule of Zero and the Rule of Five revisited

### Layer 5 of 14 — id: cpp-4
Title: STL Containers and Algorithms
Technologies: C++, STL
Description: Use the C++ Standard Template Library containers (vector, map, set, unordered_map) and algorithms (sort, find, transform, erase_if) to write efficient, idiomatic C++, and handle dates and times with std::chrono. The STL is one of the most powerful standard libraries in any language.
Topics:
- vector, deque, list
- map, unordered_map, set
- STL algorithms (sort, find, transform, erase_if)
- Iterators and iterator categories
- std::string and string_view
- std::chrono dates and time zones

### Layer 6 of 14 — id: cpp-5
Title: Templates and Generic Programming
Technologies: C++, Templates, STL
Description: Write function templates and class templates to create generic, reusable code that works across types without runtime overhead. C++ templates are Turing-complete and enable zero-cost abstractions unique to the language.
Topics:
- Function template syntax
- Class templates
- Template specialization
- Variadic templates
- Concepts basics
- constexpr and compile-time computation

### Layer 7 of 14 — id: cpp-12
Title: Compile-Time C++: constexpr, Concepts, and Metaprogramming
Technologies: C++, Templates, STL
Description: Move work from run time to compile time and constrain templates with readable requirements. constexpr and consteval compute values during compilation, concepts replace SFINAE error walls with clear constraints, and fold expressions simplify variadic code.
Topics:
- constexpr functions and variables
- consteval and constinit
- Concepts and requires clauses
- Writing your own concepts
- Fold expressions and parameter packs
- Type traits and static_assert

### Layer 8 of 14 — id: cpp-6
Title: Smart Pointers and Modern Memory Management
Technologies: C++, RAII, STL
Description: Replace raw pointers with smart pointers (unique_ptr, shared_ptr, weak_ptr) for automatic, safe memory management. Modern C++ code should rarely if ever use new and delete directly.
Topics:
- unique_ptr and ownership transfer
- shared_ptr and reference counting
- weak_ptr for breaking cycles
- make_unique and make_shared
- Custom deleters
- Moving unique_ptr

### Layer 9 of 14 — id: cpp-7
Title: Lambdas, Ranges, and Modern C++ Idioms
Technologies: C++, STL, Templates
Description: Use C++11/14/17/20 modern idioms including lambdas, range-based for, structured bindings, and the Ranges library. Modern C++ reads very differently from legacy C++ - knowing the new idioms is essential.
Topics:
- Lambda expressions and captures
- Range-based for loop
- Structured bindings (auto [a, b])
- std::optional and std::variant
- C++20 Ranges and views
- std::span

### Layer 10 of 14 — id: cpp-8
Title: Concurrency in C++
Technologies: C++, STL
Description: Write multi-threaded C++ programs using std::jthread, mutexes, condition variables, and atomics from the standard concurrency library. C++ concurrency requires explicit management - the memory model is the foundation.
Topics:
- std::jthread, std::thread and stop_token
- std::mutex and lock_guard
- std::condition_variable
- std::atomic
- std::async and std::future
- Thread-safe data structures

### Layer 11 of 14 — id: cpp-13
Title: Coroutines and Modules (C++20/23)
Technologies: C++, STL
Description: Learn the two big C++20 language features that change how programs are structured. Coroutines let a function suspend and resume without blocking a thread, and modules replace textual header inclusion with compiled interfaces that build faster and leak fewer macros.
Topics:
- co_await, co_yield and co_return
- Promise types and coroutine handles
- std::generator and lazy sequences
- Coroutine lifetime and dangling references
- Module interface units and import std
- Building modules with CMake 3.28+

### Layer 12 of 14 — id: cpp-9
Title: Error Handling and Robust C++
Technologies: C++, RAII, STL
Description: Handle errors in C++ using exceptions, noexcept, std::error_code, and defensive programming techniques. C++ offers multiple error-handling strategies - choosing the right one for each context is a mark of expertise.
Topics:
- Exception hierarchy and throw/catch
- noexcept specification
- std::error_code and std::expected
- C++26 contracts (pre/post/contract_assert) and assert
- Exception safety guarantees (basic/strong/no-throw)
- RAII and copy-and-swap for exception safety

### Layer 13 of 14 — id: cpp-14
Title: Performance Engineering: Cache, Memory Layout, and Allocators
Technologies: C++, STL
Description: Learn why identical algorithms can differ by 10x in speed: cache behavior, data layout and allocation patterns usually matter more than instruction counts. Measure first with a benchmarking harness, then change layout and allocation strategy and verify the gain.
Topics:
- CPU caches, cache lines and locality
- Data layout: array of structs vs struct of arrays
- Alignment, padding and false sharing
- Allocators and std::pmr
- Microbenchmarking with Google Benchmark
- Reading compiler output in Compiler Explorer

### Layer 14 of 14 — id: cpp-10
Title: Production C++ - Build Systems, Profiling, and Ecosystem
Technologies: C++, STL, RAII, Templates
Description: Build production C++ with CMake, test with GoogleTest or Catch2, debug with GDB and LLDB, profile with perf, catch bugs with sanitizers, and manage dependencies with vcpkg or Conan. Production C++ requires mastery of the full toolchain.
Topics:
- CMake targets and modern CMake patterns
- Unit testing with GoogleTest or Catch2
- Debugging with GDB and LLDB
- perf profiling and sanitizers
- vcpkg or Conan for dependencies
- C++ ecosystem overview (Boost, Abseil, fmtlib)

Start now with Layer 1.
