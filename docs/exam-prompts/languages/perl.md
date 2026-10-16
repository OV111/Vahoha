You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Perl" (perl, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: perl-1
Title: Perl Syntax and Basics
Technologies: Perl, cpan, perlbrew, perldoc
Description: Learn Perl's syntax, scalar/list/hash data types, and how to set up a modern Perl environment with perlbrew and cpanm.
Topics:
- Scalars, arrays, and hashes
- Context (scalar vs list)
- Control flow (if/unless/for/foreach/while/until)
- String operators and interpolation
- perlbrew and cpanm for environment management
- perldoc for built-in documentation

### Layer 2 of 10 — id: perl-2
Title: Regular Expressions
Technologies: Perl, regex, PCRE, s///, m//
Description: Master Perl's world-class regular expression engine — the template for PCRE used in most modern languages.
Topics:
- Match operator m// and modifiers (i, g, m, s, x)
- Substitution s/// and transliteration tr///
- Capture groups and $1, $2, named captures (?<name>)
- Lookaheads, lookbehinds, and non-greedy
- split and join with regex
- Compiled regex with qr//

### Layer 3 of 10 — id: perl-3
Title: References and Data Structures
Technologies: Perl, references, complex data, Scalar::Util
Description: Use Perl's reference system to build nested data structures — arrays of hashes, hashes of arrays, and arbitrary trees.
Topics:
- Scalar, array, and hash references
- Dereferencing with -> and sigil blocks
- Anonymous constructors ([], {})
- Nested data structure idioms
- Weak references with Scalar::Util
- Data::Dumper and Data::Printer for debugging

### Layer 4 of 10 — id: perl-4
Title: File I/O and Text Processing
Technologies: Perl, open, File::Find, Text::CSV, Path::Tiny
Description: Read, write, and process files at scale using Perl's file handles, glob, and ecosystem modules like Text::CSV and Path::Tiny.
Topics:
- open(), close(), and three-argument open
- Reading line-by-line with while (<FH>)
- In-place editing with -i
- File::Find for recursive traversal
- CSV parsing with Text::CSV
- Path::Tiny for modern file operations

### Layer 5 of 10 — id: perl-5
Title: Object-Oriented Perl
Technologies: Perl, Moose, Moo, bless
Description: Build object-oriented programs in Perl using both the native bless mechanism and the modern Moose/Moo frameworks.
Topics:
- bless and package-based OOP
- Inheritance with @ISA and SUPER::
- Moose attributes, types, and roles
- Moo for lightweight OOP
- Overloading operators
- Destructors and DESTROY

### Layer 6 of 10 — id: perl-6
Title: CPAN and Module System
Technologies: CPAN, cpanm, Carton, Module::Build
Description: Navigate the CPAN ecosystem, manage dependencies with Carton, and create distributable Perl modules.
Topics:
- cpanm for fast module installation
- Carton and cpanfile for reproducible deps
- Writing your own module (Exporter, @EXPORT)
- Module::Build and Makefile.PL
- CPAN distribution structure
- Testing with Test::More and prove

### Layer 7 of 10 — id: perl-7
Title: Database Access with DBI
Technologies: DBI, DBD::Pg, DBD::SQLite, SQL::Abstract
Description: Connect to relational databases using the DBI abstraction layer, use prepared statements to prevent SQL injection, and manage transactions.
Topics:
- DBI connect, prepare, execute, fetch
- Placeholders and bind values
- Transactions with begin_work and commit
- Error handling with RaiseError
- DBD::SQLite for testing
- SQL::Abstract for query building

### Layer 8 of 10 — id: perl-8
Title: Web with Mojolicious
Technologies: Mojolicious, Mojo::UserAgent, Mojo::DOM, morbo
Description: Build web applications and scrapers using Mojolicious — a modern, async-capable Perl web framework.
Topics:
- Mojolicious::Lite route definitions
- Templates with Embedded Perl (ep)
- Form handling and validation
- Mojo::UserAgent for HTTP requests
- Mojo::DOM for HTML parsing
- Deploying with hypnotoad

### Layer 9 of 10 — id: perl-9
Title: Advanced Perl – Closures and Metaprogramming
Technologies: Perl, closures, AUTOLOAD, BEGIN, Exporter
Description: Leverage Perl's advanced features: closures, the symbol table, AUTOLOAD dispatch, and compile-phase hooks with BEGIN/END.
Topics:
- Closures and lexical variable capture
- Dispatch tables with code refs
- AUTOLOAD for method synthesis
- Manipulating the symbol table with typeglobs
- BEGIN, END, CHECK, INIT blocks
- Overloading with use overload

### Layer 10 of 10 — id: perl-10
Title: Modern Perl – Testing, Linting, and Best Practices
Technologies: Perl::Critic, Perl::Tidy, Test2, Devel::Cover
Description: Write clean, maintainable, production-grade Perl using modern best practices, Test2 for comprehensive testing, and Perl::Critic for style enforcement.
Topics:
- use strict and use warnings always
- Perl::Tidy for code formatting
- Perl::Critic for policy enforcement
- Test2::Suite for modern testing
- Code coverage with Devel::Cover
- CI pipeline for Perl with GitHub Actions

Start now with Layer 1.
