You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Java" (java, category languages). It has 11 layers, listed at the bottom.

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
### Layer 1 of 11 — id: java-1
Title: Java Syntax and JVM Basics
Technologies: Java, JVM
Description: Set up the JDK, understand the Java compilation model and the JVM, and learn core syntax: variables, primitives, strings, arrays, control flow and methods. Since Java 25 a first program can be a compact source file with an instance main method, so you can start small and add classes as the program grows.
Topics:
- JDK vs JRE vs JVM
- Compiling and running with javac/java
- Variables, primitives, and wrappers
- Strings, arrays, and type casting
- Control flow, loops, and methods
- Compact source files and instance main (Java 25)

### Layer 2 of 11 — id: java-2
Title: Object-Oriented Programming in Java
Technologies: Java, OOP
Description: Master Java OOP fundamentals: classes, inheritance, polymorphism and encapsulation, plus the other class shapes you meet every day: enums, nested classes and records. Builder and Singleton live in the design patterns layer.
Topics:
- Classes, constructors, and this
- Access modifiers and encapsulation
- Inheritance, super, and method overriding
- Abstract classes vs interfaces
- Enums and nested classes
- Records, final, and static

### Layer 3 of 11 — id: java-3
Title: Collections Framework and Generics
Technologies: Java, JVM
Description: Use the Java Collections Framework effectively (List, Set, Map, Queue, and the Java 21 sequenced collection interfaces) and write generic classes and methods for type-safe reusable code. The collections framework is one of Java's most-used APIs.
Topics:
- ArrayList, LinkedList, ArrayDeque
- HashMap, TreeMap, LinkedHashMap, HashSet, TreeSet
- Sequenced collections (Java 21)
- Generic type parameters and type erasure
- Bounded wildcards (? extends, ? super)
- Comparable and Comparator

### Layer 4 of 11 — id: java-4
Title: Exception Handling and File I/O
Technologies: Java, JVM
Description: Handle exceptions correctly using checked and unchecked exception hierarchies, read and write files with the NIO.2 API, and use the core APIs every real program needs: java.time for dates and the built-in HttpClient for calling web services.
Topics:
- Checked vs unchecked exceptions
- try/catch/finally, multi-catch, and try-with-resources
- Custom exception classes
- java.nio.file.Path and Files
- Dates and times with java.time
- HTTP calls with java.net.http.HttpClient

### Layer 5 of 11 — id: java-5
Title: Streams API and Lambdas
Technologies: Java, Streams
Description: Transform, filter, and aggregate data using lambdas and the Streams API. Streams are the idiomatic way to process collections in modern Java: Stream.toList() (Java 16) shortens the most common pipeline, and stream gatherers (Java 24) add custom intermediate operations.
Topics:
- Lambda expression syntax and method references
- Functional interfaces (Function, Predicate, Consumer)
- Stream pipeline (filter, map, collect)
- Collectors API and Stream.toList()
- Stream gatherers (Java 24)
- Optional<T>

### Layer 6 of 11 — id: java-6
Title: Concurrency and Multithreading
Technologies: Java, JVM
Description: Write concurrent Java programs using threads, the Executor framework, concurrent collections and locks, then move to the modern model: virtual threads for cheap blocking I/O, plus structured concurrency and scoped values for managing groups of tasks safely.
Topics:
- Platform threads vs virtual threads
- ExecutorService and thread pools
- synchronized, volatile, and locks
- java.util.concurrent collections and atomics
- CompletableFuture
- Structured concurrency and scoped values

### Layer 7 of 11 — id: java-7
Title: Design Patterns in Java
Technologies: Java, OOP
Description: Apply classic Gang of Four design patterns in Java - singleton, builder, factory, observer, and strategy - and understand when each applies. Design patterns are the shared vocabulary of Java software architecture.
Topics:
- Builder pattern
- Factory and abstract factory
- Singleton and its pitfalls
- Observer pattern
- Strategy pattern
- Dependency injection basics

### Layer 8 of 11 — id: java-8
Title: Modern Java - Records, Sealed Classes, and Pattern Matching
Technologies: Java, JVM, OOP
Description: Adopt modern Java features from Java 14-25 including records, sealed classes, text blocks, pattern matching for switch, record patterns and unnamed variables, and the Java 25 additions that make small programs simpler: compact source files and module imports. Modern Java is far more expressive than the Java 8 many developers learned.
Topics:
- Records and record patterns
- Sealed classes and interfaces
- Pattern matching for instanceof and switch
- Text blocks and var
- Unnamed variables and patterns (_)
- Module imports and compact source files (Java 25)

### Layer 9 of 11 — id: java-9
Title: Testing with JUnit and Mockito
Technologies: Java, JVM
Description: Write unit and integration tests with JUnit Jupiter, including parameterized and nested tests, mock dependencies with Mockito, and test HTTP APIs end to end with REST Assured. Testing is a first-class practice in Java, and its ecosystem is among the best in any language.
Topics:
- JUnit annotations (@Test, @BeforeEach, @AfterEach)
- Parameterized and nested tests
- AssertJ fluent assertions
- Mockito mocking and stubbing
- API tests with REST Assured
- Test coverage with JaCoCo

### Layer 10 of 11 — id: java-11
Title: JVM Internals: Memory Model, Garbage Collection, and JIT
Technologies: Java, JVM
Description: Understand what the JVM does with your code. You will learn class loading, the heap and stack, how the garbage collectors differ, how the JIT compiler optimizes hot code, and the Java Memory Model that makes concurrent code correct.
Topics:
- Class loading, linking and initialization
- Heap, stack, metaspace and object layout
- Garbage collectors: G1 and generational ZGC
- JIT compilation, tiers and inlining
- The Java Memory Model and happens-before
- Measuring with JMH and Java Flight Recorder

### Layer 11 of 11 — id: java-10
Title: Production Java - Build Tools, Performance, and Ecosystem
Technologies: Java, JVM, Streams, OOP
Description: Ship production Java with Maven or Gradle, add structured logging with SLF4J and Logback, profile with JFR and async-profiler, and talk to a database through JDBC and Spring Boot. Java's mature ecosystem means there is a well-tested library for nearly every problem.
Topics:
- Maven and Gradle build lifecycle
- JAR and fat JAR packaging
- Logging with SLF4J and Logback
- Profiling with Java Flight Recorder and async-profiler
- JDBC and data access with Spring Boot
- GraalVM native image and Docker packaging

Start now with Layer 1.
