You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Go" (go, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: go-1
Title: Go Syntax and Toolchain
Technologies: Go, Modules
Description: Set up the Go toolchain, understand the module system, and learn core syntax including variables, types, loops, and functions. Go's simplicity is intentional - the language is small and easy to hold in your head.
Topics:
- go mod init and module structure
- Variables (var, :=, const)
- Basic types and zero values
- Control flow (if, for, switch)
- Functions and multiple return values
- go fmt and go vet

### Layer 2 of 10 — id: go-2
Title: Arrays, Slices, Maps, and Structs
Technologies: Go, Std Library
Description: Master Go's composite types - slices, maps, and structs - and understand the memory model behind them including capacity and append behavior. These types are the foundation of all Go data modeling.
Topics:
- Arrays vs slices
- Slice internals (len, cap, append)
- Maps and nil map gotchas
- Structs and struct embedding
- Anonymous structs
- Comparable types

### Layer 3 of 10 — id: go-3
Title: Interfaces and Methods
Technologies: Go, Std Library
Description: Learn Go's implicit interface satisfaction model, method sets, and how to use interfaces for polymorphism and testability. Go interfaces are small and composable - the standard library demonstrates this with io.Reader and io.Writer.
Topics:
- Method declarations on types
- Interface definition and satisfaction
- Interface embedding
- Type assertions and type switches
- Common interfaces (Stringer, error, io.Reader)
- Empty interface and any

### Layer 4 of 10 — id: go-4
Title: Error Handling
Technologies: Go, Std Library
Description: Embrace Go's explicit error handling model, define custom error types, and learn idiomatic patterns like wrapping and sentinel errors. Go's approach to errors is deliberate - errors are values, not exceptions.
Topics:
- error interface and nil checks
- Custom error types
- fmt.Errorf with %w
- errors.Is and errors.As
- Sentinel errors
- Panic and recover

### Layer 5 of 10 — id: go-5
Title: Goroutines and Channels
Technologies: Go, Goroutines
Description: Harness Go's concurrency primitives - goroutines and channels - to write concurrent programs that are safe and expressive. Go's CSP model encourages sharing memory by communicating rather than communicating by sharing memory.
Topics:
- Goroutine creation and lifecycle
- Unbuffered and buffered channels
- Select statement
- sync.WaitGroup
- Channel direction in signatures
- Goroutine leaks

### Layer 6 of 10 — id: go-6
Title: The Standard Library
Technologies: Go, Std Library, Modules
Description: Explore Go's rich standard library covering HTTP, JSON, file I/O, time, and strings. Go's stdlib is deliberately comprehensive so you can build production-quality programs with minimal external dependencies.
Topics:
- net/http for servers and clients
- encoding/json marshal and unmarshal
- os and io packages
- strings and strconv
- time package
- bufio for efficient I/O

### Layer 7 of 10 — id: go-7
Title: Testing in Go
Technologies: Go, Std Library
Description: Write table-driven tests, benchmarks, and examples using Go's built-in testing package, and use interfaces for testability. Go's testing tooling is built into the language - no external framework is needed.
Topics:
- testing package basics
- Table-driven tests
- Test helpers and t.Helper()
- Benchmarks with testing.B
- Example functions
- go test flags and coverage

### Layer 8 of 10 — id: go-8
Title: Go Modules and Dependency Management
Technologies: Go, Modules
Description: Manage Go module dependencies with go.mod and go.sum, understand versioning semantics, and use popular third-party packages responsibly. The Go module system provides reproducible builds by design.
Topics:
- go.mod and go.sum
- go get, go tidy, go vendor
- Semantic versioning in Go
- Replacing and excluding modules
- Workspace mode (go work)
- Private module proxies

### Layer 9 of 10 — id: go-9
Title: Advanced Go Patterns - Generics, Context, and sync
Technologies: Go, Goroutines, Std Library
Description: Use Go generics (added in 1.18) for reusable data structures, propagate cancellation with context.Context, and synchronize goroutines safely with the sync package. These are the tools of idiomatic production Go.
Topics:
- Generic functions and type constraints
- context.Context propagation
- context.WithTimeout and WithCancel
- sync.Mutex and sync.RWMutex
- sync.Once and sync.Map
- errgroup for goroutine fan-out

### Layer 10 of 10 — id: go-10
Title: Production Go - Build, Deploy, and Ecosystem
Technologies: Go, Modules, Std Library, Goroutines
Description: Build production Go binaries with cross-compilation, profiling, and embed, and understand the broader Go ecosystem for web, CLI, and systems programming. Go's single-binary deployment model is one of its greatest production advantages.
Topics:
- go build flags and ldflags
- Cross-compilation (GOOS, GOARCH)
- go:embed for static assets
- pprof profiling
- Graceful HTTP shutdown
- Go ecosystem overview (Gin, Echo, GORM, Cobra)

Start now with Layer 1.
