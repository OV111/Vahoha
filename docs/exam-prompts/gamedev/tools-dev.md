You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Game Tools Developer" (tools-dev, category gamedev). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: tools-dev-1
Title: Tools Programming Foundations
Technologies: C#, Python, Git
Description: This layer introduces the mindset and languages of game tools development. Tools engineers build the software that lets teams make games faster.
Topics:
- Role of tools programming
- C# and Python basics
- Scripting versus compiled
- Reading and writing files
- Command line tools
- Version control

### Layer 2 of 10 — id: tools-dev-2
Title: Unity Editor Scripting
Technologies: C#, Unity Editor, UI Toolkit
Description: This layer covers extending the Unity editor with custom inspectors and windows. Editor scripting is the core of tools work inside Unity.
Topics:
- Custom inspectors
- Editor windows
- Property drawers
- Gizmos and handles
- UI Toolkit for editor
- Menu items and shortcuts

### Layer 3 of 10 — id: tools-dev-3
Title: Asset Pipelines and Importers
Technologies: C#, Python, Unity Editor
Description: This layer covers automating asset import, processing, and validation. Reliable pipelines keep large asset libraries consistent and clean.
Topics:
- Asset import settings
- Scripted importers
- Asset postprocessors
- Naming and validation rules
- Batch processing
- Asset dependency tracking

### Layer 4 of 10 — id: tools-dev-4
Title: Standalone Tools with Qt
Technologies: Python, Qt, PySide
Description: This layer covers building desktop tools with Qt outside the engine. Standalone tools serve pipelines that span multiple applications.
Topics:
- Qt and PySide basics
- Widgets and layouts
- Signals and slots
- File dialogs and trees
- Packaging desktop apps
- Cross platform considerations

### Layer 5 of 10 — id: tools-dev-5
Title: Data Driven Tooling
Technologies: C#, Python, JSON
Description: This layer covers building data formats, editors, and serialization for content. Data driven tools empower designers to author without programmers.
Topics:
- JSON and YAML formats
- Serialization and parsing
- ScriptableObject data
- Spreadsheet import
- Schema and validation
- Data editors

### Layer 6 of 10 — id: tools-dev-6
Title: Level and Content Editors
Technologies: C#, Unity Editor, Handles
Description: This layer covers building in editor level and content authoring tools. Custom editors let designers craft content efficiently and safely.
Topics:
- Scene editing tools
- Custom handles and gizmos
- Brush and placement tools
- Procedural placement
- Undo and redo support
- Snapping and grids

### Layer 7 of 10 — id: tools-dev-7
Title: Automation and Build Tools
Technologies: Python, C#, CI
Description: This layer covers automating builds, tests, and repetitive tasks. Automation removes toil and keeps builds reproducible and reliable.
Topics:
- Automated build scripts
- Command line builds
- Continuous integration
- Test automation
- Asset bundling
- Reporting and notifications

### Layer 8 of 10 — id: tools-dev-8
Title: Debugging and Profiling Tools
Technologies: C#, Unity Editor, Profiler
Description: This layer covers building debug overlays, profilers, and diagnostic tools. Diagnostic tools help the whole team find and fix problems fast.
Topics:
- Debug overlays and HUDs
- In game consoles
- Custom profiler markers
- Logging frameworks
- Cheat and test menus
- Crash reporting

### Layer 9 of 10 — id: tools-dev-9
Title: Pipeline Integration
Technologies: Python, C#, DCC Tools
Description: This layer covers integrating tools across DCC apps, source control, and engines. Connected pipelines move content smoothly from artist to game.
Topics:
- Blender and Maya scripting
- Export and import bridges
- Source control integration
- Naming conventions
- Metadata and tagging
- Pipeline orchestration

### Layer 10 of 10 — id: tools-dev-10
Title: Distribution and Maintenance
Technologies: C#, Python, Packaging
Description: This layer covers packaging, versioning, and maintaining tools for a team. Well maintained tools stay useful and trusted across a studio.
Topics:
- Packaging and distribution
- Versioning tools
- Documentation
- User feedback loops
- Backward compatibility
- Deprecation and support

Start now with Layer 1.
