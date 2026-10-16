You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Bash" (bash, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: bash-1
Title: Shell Basics and Navigation
Technologies: Bash, Terminal, man, PATH
Description: Get comfortable with the Unix shell: navigating the filesystem, understanding the environment, and running commands efficiently.
Topics:
- Filesystem navigation (cd, ls, pwd, find)
- File operations (cp, mv, rm, mkdir, touch)
- Environment variables and PATH
- stdin, stdout, stderr and redirection
- Pipes and command chaining (|, &&, ||)
- Reading man pages and --help

### Layer 2 of 10 — id: bash-2
Title: Variables, Quoting, and Expansion
Technologies: Bash, variables, parameter expansion, quoting
Description: Master variable assignment, the quoting rules that prevent word splitting, and the many forms of Bash parameter expansion.
Topics:
- Variable assignment and scope
- Single vs double quoting
- Command substitution $() vs backticks
- Arithmetic expansion $(( ))
- Parameter expansion (${var:-default}, ${#var}, ${var//pattern/replace})
- Arrays and associative arrays

### Layer 3 of 10 — id: bash-3
Title: Control Flow and Functions
Technologies: Bash, if, for, while, functions
Description: Write reusable Bash functions and control flow with if/else, for loops, while loops, and case statements.
Topics:
- if/elif/else and test expressions [[ ]]
- for loops (C-style and over lists)
- while and until loops
- case statements
- Function definitions and local variables
- Return codes and $?

### Layer 4 of 10 — id: bash-4
Title: Text Processing – grep, sed, awk
Technologies: grep, sed, awk, cut, sort, uniq
Description: Process text streams with the classic Unix triumvirate: grep for searching, sed for transforming, and awk for structured field processing.
Topics:
- grep with extended regex (-E) and context flags
- sed substitutions, deletions, and in-place editing
- awk field splitting, patterns, and actions
- cut and paste for columnar data
- sort, uniq, and wc for aggregation
- Combining tools with pipes

### Layer 5 of 10 — id: bash-5
Title: File Operations and Permissions
Technologies: chmod, chown, find, xargs, tar
Description: Manage file permissions, ownership, and bulk operations using find, xargs, and archive tools.
Topics:
- Permission bits and chmod (symbolic and octal)
- chown and chgrp
- find with -exec and -print0 | xargs -0
- Symbolic and hard links
- tar, gzip, and bzip2 archives
- inode information with stat and ls -li

### Layer 6 of 10 — id: bash-6
Title: Process Management
Technologies: ps, kill, jobs, nohup, trap
Description: Manage foreground and background processes, handle signals with trap, and monitor system resources from the shell.
Topics:
- Foreground/background jobs (&, fg, bg, jobs)
- Signals and kill/killall
- trap for signal handling in scripts
- nohup and disown for persistent processes
- ps, top, htop for monitoring
- Process substitution <(cmd)

### Layer 7 of 10 — id: bash-7
Title: Regular Expressions in Bash
Technologies: Bash, =~, POSIX regex, ERE
Description: Use Bash's built-in regex matching ([[ =~ ]]) and POSIX extended regular expressions for validation and extraction.
Topics:
- Basic vs Extended Regular Expressions
- Character classes, anchors, quantifiers
- Capture groups with BASH_REMATCH
- Lookaheads with grep -P (PCRE)
- Validating emails, IPs, and dates
- Non-greedy matching

### Layer 8 of 10 — id: bash-8
Title: I/O, Here-docs, and String Manipulation
Technologies: Bash, heredoc, herestring, printf, read
Description: Handle complex I/O with here-documents, here-strings, read for interactive input, and printf for precise formatting.
Topics:
- Here-documents (<<EOF) and indented (<<-EOF)
- Here-strings (<<<)
- read for user input and line-by-line file parsing
- printf vs echo for reliable formatting
- Colorizing output with ANSI escape codes
- String manipulation without external tools

### Layer 9 of 10 — id: bash-9
Title: Script Robustness and Debugging
Technologies: bash -x, set -euo pipefail, ShellCheck, bashdb
Description: Write production-grade shell scripts using strict mode, error traps, ShellCheck linting, and bash -x tracing.
Topics:
- set -euo pipefail explained
- ERR and EXIT traps
- Debugging with bash -x and bash -n
- ShellCheck for static analysis
- Logging patterns with timestamps
- Idempotent scripts and lock files

### Layer 10 of 10 — id: bash-10
Title: Production Scripts – CI/CD, Automation, and Tooling
Technologies: Bash, cron, GitHub Actions, Makefile
Description: Build production-ready automation scripts for CI/CD pipelines, cron jobs, and developer tooling used in real projects.
Topics:
- Writing reusable script libraries with source
- Parsing CLI arguments with getopts
- cron job syntax and scheduling
- Bash scripts in GitHub Actions workflows
- Makefile targets calling Bash scripts
- Secrets management in shell scripts

Start now with Layer 1.
