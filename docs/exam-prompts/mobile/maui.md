You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: ".NET MAUI Dev" (maui, category mobile). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: maui-1
Title: C# Fundamentals
Technologies: C#, .NET, CLR
Description: MAUI is built on C# and .NET. Start with the language fundamentals and the .NET runtime.
Topics:
- Variables, types & operators
- Control flow & methods
- The .NET CLR & SDK
- Namespaces & assemblies
- Strings & collections
- dotnet CLI basics

### Layer 2 of 10 — id: maui-2
Title: Object-Oriented C# & .NET
Technologies: OOP, Interfaces, NuGet
Description: Model your app with object-oriented C#. Learn classes, interfaces and how to use the .NET ecosystem.
Topics:
- Classes, properties & inheritance
- Interfaces & abstract classes
- Records & structs
- Exception handling
- NuGet packages
- Dependency injection in .NET

### Layer 3 of 10 — id: maui-3
Title: Async & LINQ
Technologies: async/await, LINQ, Tasks
Description: Write responsive, data-driven C#. Master async/await for non-blocking code and LINQ for querying collections.
Topics:
- Tasks & async/await
- Cancellation & exceptions in async
- LINQ query & method syntax
- Deferred execution
- Working with JSON (System.Text.Json)
- IEnumerable vs IQueryable

### Layer 4 of 10 — id: maui-4
Title: .NET MAUI Basics
Technologies: .NET MAUI, Pages, Controls
Description: Build your first cross-platform app. Learn the MAUI project structure, pages and controls that run on iOS, Android, macOS and Windows.
Topics:
- MAUI project structure
- Single project, multi-platform
- Pages & controls
- The app lifecycle
- Resources & styles
- Running on each platform

### Layer 5 of 10 — id: maui-5
Title: XAML & UI Layout
Technologies: XAML, Layouts, Styles
Description: Design polished UIs declaratively with XAML. Master layouts, styling and reusable controls.
Topics:
- XAML syntax & markup extensions
- Layouts — Grid, StackLayout, FlexLayout
- Styles & resource dictionaries
- Control templates
- Responsive & adaptive layout
- Fonts, images & icons

### Layer 6 of 10 — id: maui-6
Title: MVVM & Data Binding
Technologies: MVVM, Binding, CommunityToolkit
Description: Structure MAUI apps the right way. Adopt the MVVM pattern with data binding and the MVVM Community Toolkit.
Topics:
- The MVVM pattern
- Data binding & BindingContext
- INotifyPropertyChanged
- Commands & the CommunityToolkit.Mvvm
- Value converters
- Collection views & lists

### Layer 7 of 10 — id: maui-7
Title: Navigation & Platform Features
Technologies: Shell, Navigation, Permissions
Description: Build full apps with structured navigation and access to native device capabilities.
Topics:
- MAUI Shell & routing
- Passing data between pages
- Accessing device sensors & APIs
- Permissions handling
- Platform-specific code
- Handlers & customization

### Layer 8 of 10 — id: maui-8
Title: Data & Networking
Technologies: HttpClient, SQLite, REST
Description: Connect your app to the cloud and store data locally. Consume REST APIs and persist with SQLite.
Topics:
- HttpClient & REST consumption
- Serialization & DTOs
- Local storage with SQLite
- Offline-first patterns
- Secure storage & preferences
- Error & connectivity handling

### Layer 9 of 10 — id: maui-9
Title: Testing & Debugging
Technologies: xUnit, Debugging, Profiling
Description: Ship reliable MAUI apps. Unit-test your view models and debug across platforms.
Topics:
- Unit testing with xUnit
- Testing view models
- Mocking services
- Debugging on devices & emulators
- Hot reload
- Performance profiling

### Layer 10 of 10 — id: maui-10
Title: Azure, Distribution & CI/CD
Technologies: Azure, App Center, CI/CD
Description: Take your app to production. Add cloud services, automate builds, and publish to the app stores.
Topics:
- Azure services for mobile (Functions, Storage)
- Push notifications
- Code signing for iOS & Android
- CI/CD with GitHub Actions / Azure DevOps
- Distributing builds
- Publishing to the stores

Start now with Layer 1.
