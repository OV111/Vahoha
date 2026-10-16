You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Ruby" (ruby, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: ruby-1
Title: Ruby Syntax and the Ruby Way
Technologies: Ruby, Gems
Description: Install Ruby with rbenv or rvm, learn the fundamental syntax, and begin developing a feel for Ruby's philosophy of developer happiness and expressiveness. Ruby is designed to be read like natural language - idiomatic Ruby embraces this.
Topics:
- Ruby installation with rbenv
- Variables, constants, and symbols
- Control flow and loops (times, each)
- Methods and return values
- String interpolation and heredocs
- irb and pry REPL

### Layer 2 of 10 — id: ruby-2
Title: Collections - Arrays, Hashes, and Enumerables
Technologies: Ruby
Description: Master Ruby arrays, hashes, and the Enumerable module which provides an incredibly rich set of collection methods. Enumerable is one of the most elegant parts of the Ruby language and is used throughout idiomatic Ruby code.
Topics:
- Array methods (map, select, reject, reduce)
- Hash creation and iteration
- Enumerable module
- Ranges and their methods
- Symbols as hash keys
- Nested data structures

### Layer 3 of 10 — id: ruby-3
Title: Blocks, Procs, and Lambdas
Technologies: Ruby
Description: Understand Ruby blocks as first-class constructs, the difference between Proc and Lambda, and how to write methods that yield to blocks. Blocks are the foundation of Ruby's DSL capabilities and iterative APIs.
Topics:
- Block syntax (do/end and {})
- yield and block_given?
- Proc.new and proc {}
- Lambda and -> syntax
- Proc vs Lambda (return behavior, arity)
- Method objects and to_proc

### Layer 4 of 10 — id: ruby-4
Title: Object-Oriented Ruby
Technologies: Ruby
Description: Build Ruby classes with the initialize method, attr_accessor, modules for mixins, and understand Ruby's open class model. Ruby OOP is dynamic and flexible - classes can be reopened and modified at any time.
Topics:
- Classes and initialize
- attr_reader, attr_writer, attr_accessor
- Modules as mixins (include, extend)
- Protected and private methods
- Method visibility
- Comparable and Enumerable mixins

### Layer 5 of 10 — id: ruby-5
Title: Metaprogramming Fundamentals
Technologies: Ruby, Metaprogramming
Description: Begin exploring Ruby's metaprogramming capabilities - method_missing, define_method, send, and class macros - which enable Ruby's expressive DSLs and frameworks. Metaprogramming is where Ruby becomes truly unique.
Topics:
- method_missing and respond_to_missing?
- define_method for dynamic methods
- send and public_send
- class macros (class-level methods)
- instance_variable_get and _set
- open classes and monkey patching

### Layer 6 of 10 — id: ruby-6
Title: Exception Handling and File I/O
Technologies: Ruby, Gems
Description: Handle exceptions idiomatically in Ruby using rescue, ensure, retry, and custom exception classes, and read and write files and JSON. Ruby exception handling is concise - many operations have built-in rescue shorthand.
Topics:
- begin/rescue/ensure/else
- Rescue in method bodies
- Custom exception hierarchy
- retry for transient failures
- File.read, File.write, File.open
- JSON gem for serialization

### Layer 7 of 10 — id: ruby-7
Title: Gems and Bundler
Technologies: Ruby, Gems
Description: Create and publish Ruby gems, manage dependencies with Bundler and Gemfile, and understand gem versioning. The Ruby gem ecosystem is vast - learning to navigate it and create gems yourself is essential.
Topics:
- Gemfile and Gemfile.lock
- bundle install and bundle exec
- gem build and gemspec
- Semantic versioning for gems
- RubyGems.org publishing
- gem dependencies and runtime vs development

### Layer 8 of 10 — id: ruby-8
Title: Testing with RSpec
Technologies: Ruby, Gems
Description: Write expressive, behavior-driven tests using RSpec with describe, context, and it blocks, and mock with RSpec mocks or Mocha. RSpec's DSL makes tests read almost like documentation.
Topics:
- RSpec describe and it blocks
- Matchers (eq, include, raise_error)
- before and after hooks
- let and subject helpers
- RSpec mocks and doubles
- SimpleCov for coverage

### Layer 9 of 10 — id: ruby-9
Title: Advanced Metaprogramming and DSL Design
Technologies: Ruby, Metaprogramming
Description: Build internal DSLs using instance_eval, class_eval, and the full suite of Ruby metaprogramming tools. Understanding how Rails, RSpec, and Sinatra build their DSLs will make you a far more capable Ruby developer.
Topics:
- instance_eval and class_eval
- DSL design patterns
- method_added and hooks
- eigenclass and singleton methods
- ObjectSpace and reflection
- Refinements for scoped monkey patching

### Layer 10 of 10 — id: ruby-10
Title: Production Ruby - Concurrency, Performance, and Ecosystem
Technologies: Ruby, Gems, Metaprogramming, Blocks
Description: Understand Ruby's GIL and concurrency options (threads, Ractors, async gem), profile Ruby code with ruby-prof and stackprof, and survey the production Ruby ecosystem. Ruby's production maturity is demonstrated by decades of Rails applications running at scale.
Topics:
- Thread and Mutex in Ruby
- Ractors (Ruby 3+)
- async gem for async I/O
- ruby-prof and stackprof profiling
- Memory optimization and object allocation
- Ecosystem overview (Rails, Sinatra, Hanami, Sidekiq)

Start now with Layer 1.
