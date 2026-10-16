You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "C#" (csharp, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: csharp-1
Title: C# Syntax and .NET Setup
Technologies: C#, .NET
Description: Set up the .NET SDK, create and run C# projects with the dotnet CLI, and learn basic C# syntax. C# is a modern, statically typed language that runs on the .NET runtime across Windows, Linux, and macOS.
Topics:
- dotnet new, build, run
- Variables, types, and type inference (var)
- Control flow and loops
- Methods and parameters
- Namespaces and using directives
- Console I/O

### Layer 2 of 10 — id: csharp-2
Title: Object-Oriented C#
Technologies: C#, .NET
Description: Use C# classes, inheritance, interfaces, and properties to build structured object-oriented programs. C# OOP has several features not found in Java - properties, partial classes, and explicit interface implementation among them.
Topics:
- Classes, constructors, and properties
- Access modifiers
- Inheritance and virtual/override
- Interfaces and explicit implementation
- Abstract classes
- Object initializers and with expressions

### Layer 3 of 10 — id: csharp-3
Title: Collections, Generics, and LINQ Basics
Technologies: C#, LINQ, .NET
Description: Use .NET generic collections (List<T>, Dictionary<K,V>, HashSet<T>) and write your first LINQ queries to filter and project data. LINQ is one of C# most distinctive and powerful features.
Topics:
- List, Dictionary, HashSet, Queue, Stack
- Generic type parameters and constraints
- IEnumerable<T> and iteration
- LINQ query syntax
- LINQ method syntax (Where, Select, OrderBy)
- Deferred execution

### Layer 4 of 10 — id: csharp-4
Title: Exception Handling and File I/O
Technologies: C#, .NET
Description: Write robust exception handling using C# try/catch/finally, custom exceptions, and the using statement for resource management. Use System.IO for file operations and System.Text.Json for serialization.
Topics:
- Exception hierarchy and custom exceptions
- try/catch/finally and multi-catch
- using statement and IDisposable
- System.IO.File and StreamReader/Writer
- System.Text.Json serialization
- JsonSerializerOptions

### Layer 5 of 10 — id: csharp-5
Title: Async/Await and the Task Parallel Library
Technologies: C#, async/await, .NET
Description: Write asynchronous C# code using async/await and the Task Parallel Library for non-blocking I/O and parallel CPU work. C# async/await is one of the most ergonomic async models in any mainstream language.
Topics:
- Task<T> and async/await
- ConfigureAwait
- Task.WhenAll and Task.WhenAny
- CancellationToken
- Parallel.ForEach and PLINQ
- ValueTask for performance

### Layer 6 of 10 — id: csharp-6
Title: Advanced LINQ and Functional Patterns
Technologies: C#, LINQ, .NET
Description: Go deeper with LINQ including grouping, joining, and custom operators, and apply functional patterns like immutable records and expression trees. LINQ's composability enables a functional style that integrates naturally with C# OOP.
Topics:
- GroupBy, Join, and GroupJoin
- Aggregate and custom operators
- Expression trees basics
- Records and init-only properties
- Pattern matching (switch expressions, is patterns)
- Immutable collections

### Layer 7 of 10 — id: csharp-7
Title: Dependency Injection and Architecture Patterns
Technologies: C#, .NET
Description: Understand dependency injection as built into .NET, and apply common architecture patterns (repository, service layer, options pattern) used throughout the .NET ecosystem. DI is not a framework choice in .NET - it is a core platform feature.
Topics:
- IServiceCollection and DI container
- Constructor injection
- Service lifetimes (transient, scoped, singleton)
- Repository pattern
- Options pattern
- ILogger<T>

### Layer 8 of 10 — id: csharp-8
Title: Testing with xUnit and Moq
Technologies: C#, .NET
Description: Write unit and integration tests using xUnit, mock dependencies with Moq, and measure coverage. The .NET testing ecosystem is mature and well-integrated with the dotnet CLI and CI systems.
Topics:
- xUnit test attributes
- Fact and Theory with InlineData
- Moq setup and verification
- FluentAssertions
- TestServer for integration tests
- dotnet test and coverage

### Layer 9 of 10 — id: csharp-9
Title: Modern C# Features - Nullable Reference Types, Spans, and Channels
Technologies: C#, .NET, async/await
Description: Enable nullable reference types to eliminate null reference exceptions at compile time, use Span<T> for allocation-free data processing, and use System.Threading.Channels for async producer-consumer patterns. These features characterize modern, performance-conscious C#.
Topics:
- Nullable reference types and annotations
- Null-forgiving operator and null checks
- Span<T> and Memory<T>
- System.Threading.Channels
- IAsyncEnumerable<T>
- Source generators basics

### Layer 10 of 10 — id: csharp-10
Title: Production C# - NuGet, Performance, and Ecosystem
Technologies: C#, .NET, LINQ, async/await
Description: Publish NuGet packages, profile .NET apps with dotnet-trace and BenchmarkDotNet, and survey the .NET ecosystem for web, desktop, and cloud development. Production .NET requires understanding the full platform beyond the language itself.
Topics:
- NuGet package creation and publishing
- BenchmarkDotNet micro-benchmarks
- dotnet-trace and dotnet-counters
- Trimming and AOT compilation
- GitHub Actions CI for .NET
- Ecosystem overview (ASP.NET Core, EF Core, MAUI, Blazor)

Start now with Layer 1.
