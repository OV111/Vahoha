You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Java" (java, category languages). It has 11 layers, listed at the bottom.

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
### Layer 1 of 11 — id: java-1
Title: Java Syntax and JVM Basics
Technologies: Java, JVM
Description: Set up the JDK, understand the Java compilation model and JVM, and learn core syntax including variables, control flow, and methods. Java's verbosity is intentional - readability at scale is a core design goal.
Topics:
- JDK vs JRE vs JVM
- Compiling and running with javac/java
- Variables, primitives, and wrappers
- Control flow and loops
- Methods and return types
- Basic I/O with System.out

### Layer 2 of 11 — id: java-2
Title: Object-Oriented Programming in Java
Technologies: Java, OOP
Description: Master Java OOP fundamentals - classes, inheritance, polymorphism, and encapsulation - which are the bedrock of the entire Java ecosystem. Every Java library and framework is built on these principles.
Topics:
- Classes, constructors, and this
- Access modifiers (public, private, protected)
- Inheritance and super
- Method overriding and overloading
- Abstract classes vs interfaces
- final and static

### Layer 3 of 11 — id: java-3
Title: Collections Framework and Generics
Technologies: Java, JVM
Description: Use the Java Collections Framework effectively - List, Set, Map, and Queue - and write generic classes and methods for type-safe reusable code. The collections framework is one of Java's most-used APIs.
Topics:
- ArrayList, LinkedList, ArrayDeque
- HashMap, TreeMap, LinkedHashMap
- HashSet, TreeSet
- Generic type parameters
- Bounded wildcards (? extends, ? super)
- Comparable and Comparator

### Layer 4 of 11 — id: java-4
Title: Exception Handling and File I/O
Technologies: Java, JVM
Description: Handle exceptions correctly in Java using checked and unchecked exception hierarchies, and read and write files using the NIO.2 API. Java's explicit exception handling forces you to think about failure modes.
Topics:
- Checked vs unchecked exceptions
- try/catch/finally and multi-catch
- try-with-resources
- Custom exception classes
- java.nio.file.Path and Files
- Reading and writing text and binary files

### Layer 5 of 11 — id: java-5
Title: Streams API and Lambdas
Technologies: Java, Streams
Description: Transform, filter, and aggregate data using the Java Streams API and lambda expressions introduced in Java 8. Streams are the idiomatic way to process collections in modern Java and often replace explicit loops.
Topics:
- Lambda expression syntax
- Functional interfaces (Function, Predicate, Consumer)
- Stream pipeline (filter, map, collect)
- Collectors API
- Optional<T>
- Method references

### Layer 6 of 11 — id: java-6
Title: Concurrency and Multithreading
Technologies: Java, JVM
Description: Write concurrent Java programs using threads, the Executor framework, and concurrent collections. Java has one of the most mature concurrency APIs in any language, built into the standard library.
Topics:
- Thread and Runnable
- ExecutorService and thread pools
- Callable and Future
- synchronized and volatile
- java.util.concurrent collections
- CompletableFuture

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
Description: Adopt modern Java features from Java 14-21 including records, sealed classes, text blocks, and pattern matching for switch. Modern Java is significantly more expressive than the Java 8 many developers learned.
Topics:
- Records (data carriers)
- Sealed classes and interfaces
- Pattern matching for instanceof
- Pattern matching for switch (Java 21)
- Text blocks
- var local type inference

### Layer 9 of 11 — id: java-9
Title: Testing with JUnit 5 and Mockito
Technologies: Java, JVM
Description: Write unit and integration tests using JUnit 5 with parameterized tests and nested test classes, and mock dependencies with Mockito. Testing is a first-class practice in Java - the ecosystem is among the best in any language.
Topics:
- JUnit 5 annotations (@Test, @BeforeEach, @AfterEach)
- Parameterized tests
- Nested test classes
- AssertJ fluent assertions
- Mockito mocking and stubbing
- Test coverage with JaCoCo

### Layer 10 of 11 — id: java-11
Title: JVM Internals: Memory Model, Garbage Collection, and JIT
Technologies: Java, JVM
Description: Understand what the JVM does with your code. You will learn class loading, the heap and stack, how the garbage collectors differ, how the JIT compiler optimizes hot code, and the Java Memory Model that makes concurrent code correct.
Topics:
- Class loading, linking and initialization
- Heap, stack, metaspace and object layout
- Garbage collectors: G1, ZGC and generational ideas
- JIT compilation, tiers and inlining
- The Java Memory Model and happens-before
- Measuring with JMH and Java Flight Recorder

### Layer 11 of 11 — id: java-10
Title: Production Java - Build Tools, Performance, and Ecosystem
Technologies: Java, JVM, Streams, OOP
Description: Ship production Java with Maven or Gradle, profile JVM performance with JFR and JMC, and navigate the Java ecosystem including Spring, Micronaut, and Jakarta EE. Java's mature ecosystem means there is a well-tested library for nearly every problem.
Topics:
- Maven and Gradle build lifecycle
- JAR and fat JAR packaging
- JVM tuning (heap, GC selection)
- Java Flight Recorder and JMC
- GraalVM native image basics
- Ecosystem overview (Spring Boot, Hibernate, Quarkus)

Start now with Layer 1.
