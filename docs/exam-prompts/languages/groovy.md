You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Groovy" (groovy, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: groovy-1
Title: Groovy Syntax and Basics
Technologies: Groovy, JVM, groovysh, GDK
Description: Learn Groovy's concise syntax, dynamic typing, and how it extends Java with Groovy Development Kit enhancements.
Topics:
- Optional typing and def keyword
- String interpolation (GString)
- Ranges, lists, and maps literals
- Default parameter values
- groovysh REPL
- Safe navigation operator (?.) and Elvis operator (?:)

### Layer 2 of 10 — id: groovy-2
Title: Closures
Technologies: Groovy, closures, delegate, curry
Description: Master Groovy closures — first-class functions with delegate, owner, and this semantics that power Gradle and Spock DSLs.
Topics:
- Closure syntax and implicit it parameter
- Closure delegation strategies
- owner, delegate, and this
- curry() and rcurry() for partial application
- Closures as method parameters
- Memoization with .memoize()

### Layer 3 of 10 — id: groovy-3
Title: Collections and GDK
Technologies: Groovy, collect, findAll, groupBy, inject
Description: Leverage Groovy's enhanced collection methods — collect, findAll, groupBy, inject — for concise, readable data manipulation.
Topics:
- collect (map), findAll (filter), inject (fold)
- groupBy and countBy
- sort and max/min with closures
- Spread operator (*.) for collection methods
- each, eachWithIndex
- Destructuring with multiple assignment

### Layer 4 of 10 — id: groovy-4
Title: Metaprogramming
Technologies: Groovy, ExpandoMetaClass, AST transforms, Traits
Description: Extend and modify classes at runtime using Groovy's ExpandoMetaClass, and at compile time with AST transformations and Traits.
Topics:
- Adding methods to existing classes with metaClass
- methodMissing and propertyMissing
- AST transformations (@Canonical, @Immutable, @ToString)
- Traits for multiple inheritance
- Categories for scoped extensions
- GroovyInterceptable

### Layer 5 of 10 — id: groovy-5
Title: Testing with Spock
Technologies: Spock, Groovy, given/when/then, data tables
Description: Write expressive, readable tests using the Spock framework's given/when/then BDD style and data-driven test tables.
Topics:
- Specification and Feature methods
- given/when/then/expect blocks
- where: blocks for data-driven tests
- Data tables and pipes
- Mocking and stubbing with Mock()/Stub()
- Exception testing with thrown()

### Layer 6 of 10 — id: groovy-6
Title: Gradle Build Scripts
Technologies: Gradle, Groovy DSL, build.gradle, tasks
Description: Write Gradle build scripts in the Groovy DSL — the most widely used JVM build tool powering Android and Java projects.
Topics:
- Project and task model
- Defining custom tasks
- Plugins (java, application, shadow)
- Dependencies and configurations
- Incremental builds and build cache
- Multi-project builds

### Layer 7 of 10 — id: groovy-7
Title: Jenkins Pipeline DSL
Technologies: Jenkins, Groovy, Jenkinsfile, shared libraries
Description: Automate CI/CD pipelines with Jenkins using Groovy-based Declarative and Scripted Pipeline syntax and shared libraries.
Topics:
- Declarative vs Scripted Pipeline
- Stages, steps, and post conditions
- Parallel stages
- Jenkins shared libraries
- Environment variables and credentials
- Pipeline triggers and webhooks

### Layer 8 of 10 — id: groovy-8
Title: Groovy for Scripting and Automation
Technologies: Groovy, groovysh, @Grab, CliBuilder
Description: Use Groovy as a powerful scripting language with @Grab for inline dependencies, CliBuilder for CLI tools, and native XML/JSON support.
Topics:
- @Grab for inline dependency resolution
- CliBuilder for command-line argument parsing
- Groovy XML (XmlSlurper, MarkupBuilder)
- Groovy JSON (JsonSlurper, JsonBuilder)
- File and directory operations with GDK
- HTTP requests with HttpURLConnection/HTTPBuilder

### Layer 9 of 10 — id: groovy-9
Title: Grails Web Framework
Technologies: Grails, GORM, GSP, Spring Boot
Description: Build full-stack web applications with Grails — a convention-over-configuration framework built on Spring Boot with GORM for database access.
Topics:
- Grails project structure and conventions
- Domain classes and GORM querying
- Controllers, services, and dependency injection
- GSP templates and tag libraries
- REST API with grails.rest plugin
- Deploying Grails to production

### Layer 10 of 10 — id: groovy-10
Title: Production Groovy – Static Compilation and Best Practices
Technologies: @CompileStatic, CodeNarc, Groovydoc, Docker
Description: Write type-safe, production-grade Groovy using @CompileStatic, enforce style with CodeNarc, and document with Groovydoc.
Topics:
- @CompileStatic and @TypeChecked for type safety
- Performance implications of static vs dynamic
- CodeNarc for static code analysis
- Groovydoc for API documentation
- Packaging as a Gradle-built JAR
- GitHub Actions CI for Groovy projects

Start now with Layer 1.
