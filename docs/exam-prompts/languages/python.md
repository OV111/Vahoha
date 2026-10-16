You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Python" (python, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: python-1
Title: Python Syntax and Basics
Technologies: Python, pip, venv, REPL
Description: Learn Python syntax, data types, control flow, and how to set up a virtual environment with pip. This layer establishes the foundation for writing readable, idiomatic Python code.
Topics:
- Variables and data types
- Control flow (if/for/while)
- Functions and scope
- pip and venv setup
- Lists, dicts, tuples, sets
- String formatting (f-strings)

### Layer 2 of 10 — id: python-2
Title: Functions, Modules, and Packages
Technologies: Python, pip, venv
Description: Master Python functions including default arguments, *args, **kwargs, and lambda expressions. Learn to organize code into modules and packages and import them correctly.
Topics:
- *args and **kwargs
- Lambda and higher-order functions
- Module system and __init__.py
- Standard library overview
- Package structure
- Docstrings and type hints intro

### Layer 3 of 10 — id: python-3
Title: Object-Oriented Python
Technologies: Python, pip
Description: Understand Python classes, inheritance, dunder methods, and properties to model real-world problems. Learn how Python OOP differs from other languages through special method protocols.
Topics:
- Classes and instances
- Inheritance and super()
- Dunder methods (__str__, __repr__, __eq__)
- Properties and descriptors
- Class vs static methods
- Dataclasses

### Layer 4 of 10 — id: python-4
Title: Iterators, Generators, and Comprehensions
Technologies: Python, venv
Description: Dive into Python's iteration protocol, generator functions, and the expressive power of list and dict comprehensions. These tools are central to idiomatic, memory-efficient Python.
Topics:
- List, dict, and set comprehensions
- Generator functions and yield
- Generator expressions
- Iterator protocol (__iter__, __next__)
- itertools module
- Lazy evaluation

### Layer 5 of 10 — id: python-5
Title: Error Handling, Context Managers, and File I/O
Technologies: Python, pip, venv
Description: Learn robust exception handling, the with statement, and reading and writing files including JSON and CSV. These patterns are essential for reliable, production-quality Python programs.
Topics:
- try/except/finally/else
- Custom exceptions
- Context managers and __enter__/__exit__
- contextlib.contextmanager
- File I/O (text, binary)
- json and csv modules

### Layer 6 of 10 — id: python-6
Title: Decorators, Closures, and Functional Patterns
Technologies: Python, pip
Description: Understand closures and how decorators work under the hood to add behavior to functions without modifying them. Learn functools and common functional programming patterns in Python.
Topics:
- Closures and free variables
- Decorator syntax and stacking
- functools.wraps
- functools.lru_cache and partial
- Higher-order functions
- Pure functions and side effects

### Layer 7 of 10 — id: python-7
Title: Testing with pytest
Technologies: Python, pytest, venv
Description: Write unit and integration tests using pytest, fixtures, and parametrize to ensure code correctness. Learn test-driven development workflows and how to measure code coverage.
Topics:
- pytest basics and assertions
- Fixtures and conftest.py
- Parametrize decorator
- Mocking with unittest.mock
- Code coverage with pytest-cov
- TDD workflow

### Layer 8 of 10 — id: python-8
Title: Concurrency - Threads, Async, and Multiprocessing
Technologies: Python, pip, venv
Description: Learn the difference between threading, multiprocessing, and asyncio, and when to use each for I/O-bound versus CPU-bound tasks. Master async/await syntax for modern asynchronous Python.
Topics:
- GIL and its implications
- threading module
- multiprocessing module
- asyncio event loop
- async/await syntax
- aiofiles and aiohttp basics

### Layer 9 of 10 — id: python-9
Title: Type Hints, Protocols, and Modern Python Idioms
Technologies: Python, pip, venv
Description: Apply full type annotations, use mypy for static analysis, and learn structural subtyping via Protocols. Explore modern Python idioms introduced in 3.10+ including pattern matching.
Topics:
- Type hints and annotations
- mypy static type checking
- TypeVar and generics
- Protocol and structural typing
- Match statement (pattern matching)
- dataclasses vs NamedTuple vs TypedDict

### Layer 10 of 10 — id: python-10
Title: Production Python - Packaging, Performance, and Ecosystem
Technologies: Python, pip, venv, pytest
Description: Learn to package and publish Python projects, profile and optimize performance, and navigate the broader Python ecosystem for production use. Understand CI/CD integration and dependency management best practices.
Topics:
- pyproject.toml and build system
- Publishing to PyPI
- Profiling with cProfile and line_profiler
- Memory optimization techniques
- Dependency management with pip-tools or poetry
- CI/CD with GitHub Actions for Python

Start now with Layer 1.
