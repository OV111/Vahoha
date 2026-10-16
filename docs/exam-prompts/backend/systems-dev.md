You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Systems Dev" (systems-dev, category backend). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: systems-dev-1
Title: Systems Programming Foundations
Technologies: C, Compilation, Binary
Description: Systems programming starts close to the metal. Understand how programs are built, how memory is laid out, and how code becomes machine instructions.
Topics:
- The compilation pipeline
- Stack vs heap memory
- Binary, hex & bitwise operations
- Pointers & addresses
- How the CPU executes code
- Linkers, loaders & executables

### Layer 2 of 10 — id: systems-dev-2
Title: C & the Memory Model
Technologies: C, Pointers, Memory
Description: C is the lingua franca of systems. Master manual memory management, pointers and the tools that keep them safe.
Topics:
- Pointers & pointer arithmetic
- malloc, free & the heap
- Arrays, strings & structs
- Undefined behavior
- Debugging with gdb & valgrind
- The C standard library

### Layer 3 of 10 — id: systems-dev-3
Title: Modern C++
Technologies: C++, RAII, STL
Description: Build on C with modern C++. Use RAII, smart pointers and the STL to write fast, safer systems code.
Topics:
- References, const & RAII
- Smart pointers & ownership
- The STL — containers & algorithms
- Templates & generic programming
- Move semantics
- Modern C++ (C++17/20) features

### Layer 4 of 10 — id: systems-dev-4
Title: Rust for Systems
Technologies: Rust, Ownership, Cargo
Description: Get memory safety without a garbage collector. Learn how Rust's ownership model prevents whole classes of bugs.
Topics:
- Ownership, borrowing & lifetimes
- Traits & generics
- Error handling with Result
- Cargo & the crate ecosystem
- Zero-cost abstractions
- Interop with C (FFI)

### Layer 5 of 10 — id: systems-dev-5
Title: Linux & the OS Interface
Technologies: Linux, Syscalls, Processes
Description: Systems software talks to the kernel. Learn the Linux process model, system calls and the file system interface.
Topics:
- Processes, threads & scheduling
- System calls & the kernel boundary
- File descriptors & I/O
- Signals & inter-process communication
- Virtual memory & paging
- The shell & process control

### Layer 6 of 10 — id: systems-dev-6
Title: Concurrency & Parallelism
Technologies: Threads, Atomics, Async
Description: Make systems use all the cores. Master threads, synchronization and lock-free techniques.
Topics:
- Threads & shared memory
- Mutexes, condition variables & deadlock
- Atomics & memory ordering
- Lock-free data structures
- Data races & how to avoid them
- Async runtimes (Tokio / coroutines)

### Layer 7 of 10 — id: systems-dev-7
Title: Networking & Sockets
Technologies: TCP/IP, Sockets, epoll
Description: Connect systems over the network. Learn the socket API and how to build high-throughput servers.
Topics:
- TCP/IP & UDP fundamentals
- The Berkeley socket API
- Blocking vs non-blocking I/O
- I/O multiplexing — select, poll, epoll
- Event-driven server design
- Protocol parsing & framing

### Layer 8 of 10 — id: systems-dev-8
Title: Performance & Profiling
Technologies: perf, Cache, Benchmarks
Description: Make code fast and prove it. Understand the memory hierarchy and use profilers to find real bottlenecks.
Topics:
- CPU caches & data locality
- Branch prediction & pipelines
- Profiling with perf & flamegraphs
- Benchmarking methodology
- Allocation & memory bandwidth
- SIMD & vectorization basics

### Layer 9 of 10 — id: systems-dev-9
Title: Building Systems Tools in Go
Technologies: Go, CLI, Concurrency
Description: Go is ideal for fast, portable systems tooling. Build CLIs and network tools that ship as a single binary.
Topics:
- Go for systems tooling
- Goroutines & channels for I/O
- Building CLIs with cobra
- Working with the filesystem & processes
- Cross-compilation
- Static single-binary distribution

### Layer 10 of 10 — id: systems-dev-10
Title: Debugging, Testing & Deployment
Technologies: gdb, Sanitizers, CI
Description: Ship reliable systems software. Master debuggers, sanitizers and build pipelines for native code.
Topics:
- Advanced gdb & lldb
- Sanitizers — ASan, TSan, UBSan
- Fuzzing
- Build systems — CMake, Cargo
- CI for native code
- Packaging & distribution

Start now with Layer 1.
