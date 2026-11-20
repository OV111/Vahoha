You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "PHP" (php, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: php-1
Title: PHP Syntax and Basics
Technologies: PHP, Docker, Herd, Functions
Description: Set up a local PHP environment, then learn the core language: variables and scope, PHP's type system and type juggling, strings, match expressions, arrays, and functions with named arguments, closures, and arrow functions. Turn on strict_types early so the engine catches type mistakes for you.
Topics:
- Local setup with Docker or Herd
- Variables, scope, and constants
- Types, type juggling, and strict_types
- Strings, arrays, and array functions
- if, match, and loops
- Functions, closures, and arrow functions

### Layer 2 of 10 — id: php-2
Title: Forms, Superglobals, and HTTP
Technologies: PHP, HTTP, Sessions, Cookies
Description: Learn how PHP sees an HTTP request through superglobals, how to validate input and escape output, and how sessions, cookies, file uploads, headers and redirects work. These are the building blocks every PHP framework wraps.
Topics:
- $_GET, $_POST, $_SERVER, and $_FILES
- Validating and sanitizing input
- Sessions, cookies, and session fixation
- Secure file uploads
- Headers, status codes, and redirects
- include vs require and output escaping

### Layer 3 of 10 — id: php-3
Title: Object-Oriented PHP
Technologies: PHP, OOP, Interfaces, Traits
Description: Model code with classes: constructor promotion, inheritance and abstract classes, interfaces, traits, static members, final and magic methods. Organize classes with namespaces and autoloading, and use PHP 8.4 property hooks and asymmetric visibility instead of boilerplate getters and setters.
Topics:
- Classes and constructor property promotion
- Inheritance, abstract classes, and final
- Interfaces and traits
- Static members and magic methods
- Namespaces and autoloading
- Property hooks and asymmetric visibility (8.4)

### Layer 4 of 10 — id: php-4
Title: Composer and Dependency Management
Technologies: Composer, PSR-4, Autoloading, Packagist
Description: Use Composer to install packages, lock exact versions, write version constraints, and autoload your own code with PSR-4. Learn Composer scripts, how to pick packages on Packagist, and how to optimize the autoloader and audit dependencies for production.
Topics:
- composer require and install
- composer.json vs composer.lock
- Version constraints and semver
- PSR-4 autoloading
- Composer scripts
- Packagist, composer audit, and optimized autoloading

### Layer 5 of 10 — id: php-5
Title: Databases and PDO
Technologies: PHP, PDO, MySQL, Prepared Statements
Description: Talk to SQL databases through PDO: connect with a DSN, turn on exception error mode, use prepared statements with bound parameters, pick the right fetch mode, wrap multi-step writes in transactions, and hide SQL behind a repository class.
Topics:
- PDO connections and DSNs
- Error mode and exceptions
- Prepared statements and bound parameters
- Fetch modes and hydrating objects
- Transactions
- Repository pattern

### Layer 6 of 10 — id: php-6
Title: PSR Standards and Clean Architecture
Technologies: PER Coding Style, PHP CS Fixer, Monolog, PSR-7
Description: Follow the PHP-FIG standards that let code and libraries fit together: PER Coding Style enforced by PHP CS Fixer, PSR-3 logging with Monolog, PSR-7 and PSR-15 for HTTP, and a clear exception and error-handling strategy built on Throwable.
Topics:
- PER Coding Style (successor to PSR-12)
- PHP CS Fixer
- PSR-7 HTTP messages and PSR-15 middleware
- Exceptions and the Throwable hierarchy
- Error levels and global handlers
- PSR-3 logging with Monolog

### Layer 7 of 10 — id: php-7
Title: Testing PHP Applications
Technologies: PHPUnit, Pest, PHPStan, CI
Description: Test PHP code with PHPUnit and Pest, isolate dependencies with test doubles, cover many cases with data providers, and catch bugs before running anything with PHPStan. Measure coverage and run it all in CI on every push.
Topics:
- PHPUnit tests and assertions
- Data providers
- Test doubles: stubs and mocks
- Pest
- PHPStan levels and baselines
- Code coverage and CI

### Layer 8 of 10 — id: php-8
Title: Modern PHP 8.x Features
Technologies: PHP 8.x, Enums, Attributes, Fibers
Description: Use the features that define modern PHP: union, intersection and DNF types, enums, readonly properties and classes, attributes, and fibers. Then catch up on PHP 8.4 (property hooks, new array functions, lazy objects) and the PHP 8.5 pipe operator.
Topics:
- Union, intersection, and DNF types
- Enums
- Readonly properties and classes
- Attributes
- Fibers
- PHP 8.4 and the 8.5 pipe operator

### Layer 9 of 10 — id: php-9
Title: Security and Performance
Technologies: PHP, OWASP, OPcache, Xdebug
Description: Defend against the attacks that hit PHP apps most: XSS, SQL injection and CSRF. Store passwords with password_hash and generate secrets with random_bytes. Then make code fast with OPcache and JIT, cache data with APCu, and find real bottlenecks with the Xdebug profiler.
Topics:
- XSS and output escaping
- SQL injection
- CSRF tokens
- password_hash and random_bytes
- OPcache, JIT, and APCu
- Profiling with Xdebug

### Layer 10 of 10 — id: php-10
Title: Production PHP - APIs, Queues, and Deployment
Technologies: PHP-FPM, FrankenPHP, Docker, Queues
Description: Ship PHP to production: build JSON APIs with consistent errors, run background jobs through queues and workers, keep config and secrets in the environment, and serve PHP with PHP-FPM behind Nginx or with FrankenPHP. Package it in Docker and deploy through CI.
Topics:
- JSON encoding and API design
- Queues and background workers
- Configuration and secrets
- PHP-FPM and Nginx
- FrankenPHP and worker mode
- Docker images and CI/CD

Start now with Layer 1.
