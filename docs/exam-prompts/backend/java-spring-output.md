LAYER: java-spring-1

```json
[
  {
    "stem": "Which Java type stores a whole number of about two billion in range?",
    "topic": "Variables, types & operators",
    "choices": [
      "short, a 16 bit signed integer that holds values to about thirty two thousand",
      "byte, an 8 bit signed integer that holds values from minus 128 to 127",
      "int, a 32 bit signed integer",
      "char, a 16 bit unsigned type that stores one character as a number only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the default value of an int field in a class?",
    "topic": "Variables, types & operators",
    "choices": [
      "0, because numeric fields start with zero",
      "null, because every field starts as an empty reference in Java",
      "undefined, because Java leaves the value open until it is assigned",
      "The last value that was stored in that memory location by other code"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens when you assign a double to an int variable without a cast?",
    "topic": "Variables, types & operators",
    "choices": [
      "The value is rounded to the nearest whole number without any warning",
      "The value is truncated at runtime and a warning is printed to the console",
      "The int variable is converted to a double automatically for the rest of the method",
      "A compile error, because the conversion could lose information"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between == and equals for strings?",
    "topic": "Variables, types & operators",
    "choices": [
      "== compares the characters, while equals compares the references",
      "== compares references, while equals compares the characters",
      "They are identical for all strings, since both compare the characters",
      "equals compares only the length of the strings, while == compares their content"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the final keyword mean for a local variable?",
    "topic": "Variables, types & operators",
    "choices": [
      "It makes the variable visible to every class of the whole package",
      "It can be assigned only once, so it cannot point to another value later",
      "It forces the variable to be stored in the heap of the virtual machine",
      "It makes the value of an object impossible to change in any way at all"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the result of the integer expression 7 / 2 in Java?",
    "topic": "Variables, types & operators",
    "choices": [
      "3.5, because Java always keeps the decimal part of a division",
      "4, because the result is rounded to the nearest whole number",
      "2, because the divisor is the part of the expression that is returned",
      "3, because integer division drops the fraction"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the modulo operator % return?",
    "topic": "Variables, types & operators",
    "choices": [
      "The remainder of a division",
      "The quotient of a division rounded down",
      "The percentage of the first value in the second",
      "The absolute difference between the two operands"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is autoboxing?",
    "topic": "Variables, types & operators",
    "choices": [
      "The automatic creation of a new thread for each method call",
      "The automatic closing of a resource at the end of a try block",
      "The automatic conversion between a primitive and its wrapper, such as int and Integer",
      "The automatic sorting of a collection when elements are added"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why can comparing two Integer objects with == give surprising results?",
    "topic": "Variables, types & operators",
    "choices": [
      "Integer objects can never be compared with the == operator in Java",
      "The == operator converts both sides to strings before it compares",
      "Values outside the cached range are different objects, so the references differ",
      "Integer objects change their value each time that they are read"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the var keyword do in a local declaration?",
    "topic": "Variables, types & operators",
    "choices": [
      "The compiler infers the type from the value on the right side",
      "The variable can hold a value of any type during its life",
      "The variable is declared without a type and checked only at runtime",
      "The variable becomes a constant that cannot be assigned again"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which loop is guaranteed to run its body at least once?",
    "topic": "Control flow & loops",
    "choices": [
      "while, since it runs once before the condition is evaluated",
      "for, since the initialiser runs the body one time first",
      "for each, since it always visits the first element of the array",
      "do while, since the condition is checked after the body"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the break statement do inside a loop?",
    "topic": "Control flow & loops",
    "choices": [
      "It skips the rest of the current iteration and starts the next one",
      "It ends the loop immediately and continues after it",
      "It stops the whole program with an exit code of one",
      "It pauses the loop until the next event is received"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does continue do inside a loop?",
    "topic": "Control flow & loops",
    "choices": [
      "It ends the loop and returns from the method",
      "It skips to the next iteration of the loop",
      "It restarts the loop from the first iteration",
      "It continues the program after the last loop of the method"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the advantage of the enhanced for loop over an indexed loop?",
    "topic": "Control flow & loops",
    "choices": [
      "It is always faster than any other loop because it skips all bounds checks",
      "It can modify the length of the array while the loop is running",
      "It visits the elements in a random order to spread the load evenly",
      "It is simpler and avoids index mistakes when you only read the elements"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens in a switch statement when a case has no break?",
    "topic": "Control flow & loops",
    "choices": [
      "Execution falls through into the next case",
      "Execution stops at the end of that case and leaves the switch",
      "The compiler refuses to build the class and reports an error",
      "The next case is skipped and the one after it is run"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a switch expression, available in modern Java?",
    "topic": "Control flow & loops",
    "choices": [
      "A form that works only with integer values and cannot return anything",
      "A form that replaces the if statement in every part of the language",
      "A form that returns a value and uses arrows, with no fall through",
      "A form that runs all matching cases and merges their results"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the ternary operator condition ? a : b return?",
    "topic": "Control flow & loops",
    "choices": [
      "b if the condition is true, otherwise a",
      "Both values together as an array of two elements",
      "a if the condition is true, otherwise b",
      "The condition itself, converted to a number"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is short circuit evaluation in a && b?",
    "topic": "Control flow & loops",
    "choices": [
      "b is not evaluated when a is false",
      "a is not evaluated when b is false",
      "Both sides are always evaluated from the right to the left",
      "The expression is evaluated twice to check the result"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an infinite loop caused by in while (true)?",
    "topic": "Control flow & loops",
    "choices": [
      "The loop variable overflows after about two billion iterations",
      "The compiler rewrites the loop so that it can never stop",
      "The virtual machine ends the loop after a time limit",
      "The condition never becomes false unless the body breaks or returns"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the scope of a variable declared in the header of a for loop?",
    "topic": "Control flow & loops",
    "choices": [
      "It exists in the whole method that contains the loop",
      "It exists only in that loop and cannot be used after it",
      "It exists in the whole class for every other method",
      "It exists until the program ends, in the same way as a static field"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a method signature in Java?",
    "topic": "Methods & parameters",
    "choices": [
      "The method name and its return type",
      "The method name and the types of its parameters",
      "The access modifier and the return type",
      "The names of the parameters and the exceptions that are thrown"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does Java pass arguments to methods?",
    "topic": "Methods & parameters",
    "choices": [
      "By reference, so the method always receives the original variable",
      "By name, so the expression is evaluated when it is used",
      "By pointer, so the method can change the address of the caller variable",
      "By value, so an object reference is copied and not the object"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens if a method changes the field of an object parameter?",
    "topic": "Methods & parameters",
    "choices": [
      "The change is visible to the caller, since both references point to the same object",
      "The change is lost when the method returns, since a copy was used",
      "The compiler reports an error because parameters are read only",
      "The caller receives an exception when the method ends"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is method overloading?",
    "topic": "Methods & parameters",
    "choices": [
      "A subclass that replaces a method of its parent class",
      "A method that calls itself with a smaller input each time",
      "Several methods with the same name and different parameter lists",
      "A method that has so many lines that it is split by the compiler"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the return type void mean?",
    "topic": "Methods & parameters",
    "choices": [
      "The method returns a null reference",
      "The method returns an object of any type",
      "The method returns no value",
      "The method can only be called once"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What are varargs, written as String... names?",
    "topic": "Methods & parameters",
    "choices": [
      "A parameter that accepts zero or more arguments of that type as an array",
      "A parameter that can be of any type chosen at runtime",
      "A parameter that must be filled with at least three values",
      "A parameter that is passed by reference to the method"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a static method?",
    "topic": "Methods & parameters",
    "choices": [
      "A method that cannot be changed by any subclass of the class",
      "A method that runs only once when the program starts",
      "A method that is stored in the memory of the stack only",
      "A method that belongs to the class and can be called without an instance"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why can a static method not use this?",
    "topic": "Methods & parameters",
    "choices": [
      "Static methods are not allowed to use any keyword that starts with t",
      "There is no instance when it is called through the class",
      "The this reference is available only inside constructors",
      "The compiler removes the this keyword from static code"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is recursion?",
    "topic": "Methods & parameters",
    "choices": [
      "A loop that runs forever until the user presses a key",
      "A method that calls itself until a base case stops it",
      "A method that runs on several threads at the same time",
      "A way to call a method from a different class by name"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens when a recursive method has no base case?",
    "topic": "Methods & parameters",
    "choices": [
      "The method returns zero after a fixed number of calls",
      "The virtual machine detects the loop and ends the program silently",
      "The method turns into a loop that runs in constant memory",
      "A StackOverflowError is thrown after the call stack is full"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How is an array declared and created with five int elements?",
    "topic": "Arrays & strings",
    "choices": [
      "int[] numbers = new int[5];",
      "int numbers = new int(5);",
      "int numbers[5] = new int;",
      "array<int> numbers = new array(5);"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the index of the last element of an array with length n?",
    "topic": "Arrays & strings",
    "choices": [
      "n",
      "n plus 1",
      "n minus 1",
      "1"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens when you access an array index outside its bounds?",
    "topic": "Arrays & strings",
    "choices": [
      "The value of the nearest valid element is returned",
      "The array grows automatically to fit the new index",
      "An ArrayIndexOutOfBoundsException is thrown at runtime",
      "The program continues and returns null for that index of the array"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Can the length of an array be changed after it is created?",
    "topic": "Arrays & strings",
    "choices": [
      "No, its length is fixed, so a new array must be created",
      "Yes, by assigning a new value to its length field",
      "Yes, by calling the resize method on the array",
      "Yes, but only when the array holds objects"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why are strings immutable in Java?",
    "topic": "Arrays & strings",
    "choices": [
      "They are stored in a read only part of the file system",
      "They can only be created by the compiler and not by code",
      "They use less memory than a character array in every case",
      "Their content cannot change after creation, which makes them safe to share"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does string.length() return?",
    "topic": "Arrays & strings",
    "choices": [
      "The number of bytes that the string uses in memory",
      "The number of characters in the string",
      "The index of the last character of the string",
      "The number of words in the string"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should you use StringBuilder when building a string in a loop?",
    "topic": "Arrays & strings",
    "choices": [
      "String concatenation is not allowed inside loops in Java",
      "Repeated concatenation creates many new strings, while StringBuilder changes one buffer",
      "StringBuilder is the only class that can join more than two strings",
      "It makes the strings immutable, so they are safe to share between threads"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the method substring(2, 5) of the string \"abcdefg\" return?",
    "topic": "Arrays & strings",
    "choices": [
      "\"bcde\", the characters from index 2 up to and including index 5",
      "\"cdef\", the characters from index 2 with a length of five",
      "\"abcde\", the first five characters of the string",
      "\"cde\", the characters from index 2 up to but not including 5"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which method checks whether two strings have the same content, ignoring case?",
    "topic": "Arrays & strings",
    "choices": [
      "equalsIgnoreCase",
      "compareTo",
      "matches",
      "contentEquals"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the method split(\",\") do for a string?",
    "topic": "Arrays & strings",
    "choices": [
      "Returns the position of the first comma in the string",
      "Removes all commas and returns the remaining string",
      "Returns an array of the parts that are separated by commas",
      "Returns a list of the commas that were found in the string"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the JVM?",
    "topic": "The JVM, JDK & JRE",
    "choices": [
      "The compiler that translates Java source code to bytecode",
      "The library of classes that is shipped with every Java program",
      "The virtual machine that runs Java bytecode on a given platform",
      "The tool that downloads and installs Java dependencies"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between the JDK and the JRE?",
    "topic": "The JVM, JDK & JRE",
    "choices": [
      "The JDK adds development tools, such as the compiler, to the runtime",
      "The JRE adds development tools, such as the compiler, to the JDK",
      "They are the same package that is sold under two names",
      "The JDK is for servers and the JRE is for desktop applications only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Java bytecode?",
    "topic": "The JVM, JDK & JRE",
    "choices": [
      "The source code of the program after comments are removed",
      "A machine code that works only on one type of processor",
      "A compressed form of the standard library classes",
      "An instruction set that the JVM can run on any supported platform"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is Java called platform independent?",
    "topic": "The JVM, JDK & JRE",
    "choices": [
      "Java programs do not use any operating system calls at all",
      "The same bytecode runs on any system that has a JVM",
      "The compiler produces a different file for each platform automatically",
      "Java can only be run on systems that have the same architecture"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the JIT compiler do?",
    "topic": "The JVM, JDK & JRE",
    "choices": [
      "It compiles the source code before the program is deployed",
      "It compiles frequently used bytecode to machine code at runtime for speed",
      "It translates Java source code to C code before it runs",
      "It checks the bytecode for security problems before it runs"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is garbage collection?",
    "topic": "The JVM, JDK & JRE",
    "choices": [
      "The deletion of unused source files by the build tool",
      "The removal of unused import statements by the compiler",
      "The cleaning of log files that the application writes",
      "The automatic freeing of memory of objects that are no longer reachable"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where are objects stored in the JVM memory?",
    "topic": "The JVM, JDK & JRE",
    "choices": [
      "On the heap, which is managed by the garbage collector",
      "On the stack, which is created for each method call",
      "In the method area, which holds only the class names",
      "In the registers of the processor of the machine"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is stored on the stack?",
    "topic": "The JVM, JDK & JRE",
    "choices": [
      "All objects that are created with the new keyword",
      "The bytecode of the classes that are loaded",
      "Local variables and method call frames for each thread",
      "The static fields of every class in the program"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the classpath?",
    "topic": "The JVM, JDK & JRE",
    "choices": [
      "The path of the folder where the source code is stored",
      "The url of the server that provides the libraries",
      "The list of locations where the JVM looks for classes and libraries",
      "The order in which classes are compiled by the tool"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an LTS release of the JDK?",
    "topic": "The JVM, JDK & JRE",
    "choices": [
      "A long term support version that gets updates for many years",
      "A version that is supported only for the first three months after release",
      "A version that includes only the compiler and no libraries",
      "A version that is used only for the testing of new features"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which command compiles the file Hello.java?",
    "topic": "Compiling & running with javac/java",
    "choices": [
      "java Hello.java in the compile mode only",
      "compile Hello.java with the default options",
      "jar Hello.java to create a class file",
      "javac Hello.java"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the compiler produce from Hello.java?",
    "topic": "Compiling & running with javac/java",
    "choices": [
      "A file Hello.exe that runs without a JVM",
      "A file Hello.class that contains bytecode",
      "A file Hello.jar with all the libraries inside",
      "A file Hello.txt with the compiled text"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which command runs the class Hello after compiling?",
    "topic": "Compiling & running with javac/java",
    "choices": [
      "javac Hello",
      "java Hello",
      "run Hello.class",
      "exec Hello.java"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the entry point of a Java application?",
    "topic": "Compiling & running with javac/java",
    "choices": [
      "The first constructor of the first class in the file",
      "The method with the longest body in the program",
      "The static block of the class with the largest name",
      "The main method, public static void main(String[] args)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the package statement at the top of a file define?",
    "topic": "Compiling & running with javac/java",
    "choices": [
      "The namespace of the classes in the file",
      "The folder where the compiled class is installed on a server",
      "The list of libraries that the file needs to be able to run",
      "The visibility of the class for classes from outside"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the import statement do?",
    "topic": "Compiling & running with javac/java",
    "choices": [
      "It copies the source of the class into the file",
      "It downloads the library from the internet at runtime",
      "It lets you use a class by its simple name",
      "It runs the static code of the class at compile time"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the -cp option of java and javac set?",
    "topic": "Compiling & running with javac/java",
    "choices": [
      "The compiler profile used for the build",
      "The name of the class that is run first",
      "The classpath used to find classes and libraries",
      "The count of processors used by the program"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a JAR file?",
    "topic": "Compiling & running with javac/java",
    "choices": [
      "An archive of classes and resources that can be run or used as a library",
      "A folder with source files of a single package",
      "A configuration file of the build tool",
      "A log file written by the virtual machine"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a JAR be run if its manifest names a main class?",
    "topic": "Compiling & running with javac/java",
    "choices": [
      "javac app.jar",
      "jar run app.jar",
      "execute app.jar",
      "java -jar app.jar"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does an unchecked compile error message such as cannot find symbol usually mean?",
    "topic": "Compiling & running with javac/java",
    "choices": [
      "The program has run out of memory while compiling",
      "A name is used that has not been declared or imported",
      "The file has been saved with the wrong encoding",
      "The virtual machine is too old for the compiler"
    ],
    "answerIdx": 1
  }
]
```

LAYER: java-spring-2

```json
[
  {
    "stem": "What is encapsulation?",
    "topic": "Classes, objects & encapsulation",
    "choices": [
      "Combining several classes into one file to make the code shorter",
      "Allowing every other class to read and change the fields of an object directly",
      "Hiding the internal state of an object and exposing it only through methods",
      "Storing the data of an object in a separate database table by default"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which access modifier makes a member visible only inside its own class?",
    "topic": "Classes, objects & encapsulation",
    "choices": [
      "private",
      "protected",
      "package private, which has no keyword",
      "public, which allows access from everywhere"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why make fields private and provide getters and setters?",
    "topic": "Classes, objects & encapsulation",
    "choices": [
      "Private fields are stored in a faster part of the memory than public ones",
      "Getters and setters are required by the Java compiler for every field",
      "It stops the garbage collector from freeing the object too early",
      "The class can validate changes and change its internals without breaking callers"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the new keyword do?",
    "topic": "Classes, objects & encapsulation",
    "choices": [
      "Declares a variable that can hold a reference to an object",
      "Allocates an object and calls a constructor to initialise it",
      "Copies an existing object into a fresh area of the stack",
      "Loads a class into the virtual machine without creating an object"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a constructor?",
    "topic": "Classes, objects & encapsulation",
    "choices": [
      "A method that deletes an object when it is no longer in use",
      "A special method that initialises a new object and has the name of the class",
      "A static method that returns the number of created objects",
      "A field that stores the name of the class of the object"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens if a class declares no constructor?",
    "topic": "Classes, objects & encapsulation",
    "choices": [
      "The class cannot be instantiated until a constructor is written",
      "The virtual machine creates the object with random field values",
      "The class becomes abstract and must be extended before use",
      "The compiler adds a default constructor with no arguments"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the this keyword refer to inside an instance method?",
    "topic": "Classes, objects & encapsulation",
    "choices": [
      "The current object on which the method was called",
      "The class of the current object as a Class instance",
      "The parent class of the current object",
      "The first parameter that was passed to the method"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between a class and an object?",
    "topic": "Classes, objects & encapsulation",
    "choices": [
      "An object is a blueprint, and a class is an instance created from it",
      "They are the same thing, but class is used for libraries",
      "A class is a blueprint, and an object is an instance created from it",
      "A class lives on the stack, and an object lives in a file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a static field?",
    "topic": "Classes, objects & encapsulation",
    "choices": [
      "A field that cannot be changed after the constructor runs",
      "A field that is stored only in the memory of the stack",
      "A field that is shared by all instances of the class",
      "A field that is created again for every new instance"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is object identity versus object state?",
    "topic": "Classes, objects & encapsulation",
    "choices": [
      "Identity is the reference to the object, and state is the values of its fields",
      "Identity is the values of the fields, and state is the reference to the object",
      "Identity is the name of the class, and state is the name of the variable",
      "They are two names for the memory address of the object"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is inheritance in Java?",
    "topic": "Inheritance & polymorphism",
    "choices": [
      "A class can copy all of the fields of another class by value",
      "A class can have several parent classes at the same time",
      "A class can be loaded from the parent folder of its package",
      "A class can extend another class and reuse and specialise its behaviour"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Does Java allow a class to extend more than one class?",
    "topic": "Inheritance & polymorphism",
    "choices": [
      "Yes, a class can extend as many classes as it needs",
      "No, a class has a single parent class, but it can implement many interfaces",
      "Yes, but only when the parents are in the same package",
      "No, and it cannot implement interfaces either"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is method overriding?",
    "topic": "Inheritance & polymorphism",
    "choices": [
      "A class declares several methods with the same name and different parameters",
      "A subclass provides its own version of a method of the parent class",
      "A method hides a field of the parent class with the same name",
      "A method calls itself with different arguments at every step"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the super keyword do?",
    "topic": "Inheritance & polymorphism",
    "choices": [
      "It refers to the child class that extends the current class and its fields",
      "It makes a method available to every class of the program",
      "It creates a copy of the current object in the heap",
      "It refers to the parent class, for its constructor or its methods"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is polymorphism?",
    "topic": "Inheritance & polymorphism",
    "choices": [
      "A reference of a parent type can refer to a child object, and the child method runs",
      "An object can change its class while the program is running",
      "A class can have several constructors with different parameters",
      "A method can return values of different types at the same time"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the @Override annotation do?",
    "topic": "Inheritance & polymorphism",
    "choices": [
      "It makes the method run faster at runtime by skipping some checks",
      "It prevents subclasses from overriding the method again later",
      "The compiler checks that the method really overrides a method of a parent",
      "It lets the method access the private fields of the parent class"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the final keyword mean on a class?",
    "topic": "Inheritance & polymorphism",
    "choices": [
      "The class cannot be instantiated",
      "The class cannot have any fields",
      "The class cannot be extended",
      "The class must be the last in the package"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is a method call resolved at runtime in Java?",
    "topic": "Inheritance & polymorphism",
    "choices": [
      "For instance methods, by the actual type of the object, which is dynamic dispatch",
      "For static methods, by the actual type of the object at runtime",
      "For private methods, by the actual type of the object at runtime",
      "For every method, by the declared type of the variable only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the effect of casting a parent reference to a child type that the object does not have?",
    "topic": "Inheritance & polymorphism",
    "choices": [
      "The object is converted to the child type automatically",
      "The compiler stops the build and reports a type error",
      "The reference becomes null and the program continues",
      "A ClassCastException is thrown at runtime"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why prefer composition over inheritance in many designs?",
    "topic": "Inheritance & polymorphism",
    "choices": [
      "Inheritance is not supported by modern versions of Java",
      "It is more flexible and avoids tight coupling to a parent class",
      "Composition makes the objects use less memory than inheritance does in every case",
      "It lets one class extend several classes at once"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an interface in Java?",
    "topic": "Interfaces & abstract classes",
    "choices": [
      "A class that cannot have any methods with a body",
      "A type that declares methods that implementing classes must provide",
      "A file that lists the packages that a program may use",
      "A way to connect to a graphical user interface"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between an abstract class and an interface?",
    "topic": "Interfaces & abstract classes",
    "choices": [
      "An interface can hold state and constructors, while an abstract class is only a contract",
      "They are the same, and the name depends on the style of the team",
      "An abstract class can be instantiated, but an interface cannot be",
      "An abstract class can hold state and constructors, while an interface mainly defines a contract"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Can a class implement several interfaces?",
    "topic": "Interfaces & abstract classes",
    "choices": [
      "Yes, a class can implement as many interfaces as it needs",
      "No, a class can implement only one single interface at a time in Java",
      "Yes, but only when the interfaces have no methods",
      "No, unless the class is marked as abstract"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a default method in an interface?",
    "topic": "Interfaces & abstract classes",
    "choices": [
      "A method that is called when no other method matches",
      "A method that is called by the virtual machine at startup",
      "A method with a body that implementing classes inherit unless they override it",
      "A method that is private to the interface and cannot be used"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Can an abstract class have a constructor?",
    "topic": "Interfaces & abstract classes",
    "choices": [
      "No, because abstract classes cannot be instantiated and so never need one",
      "Yes, but it can only be called from a static method",
      "Yes, and it runs when a concrete subclass is created",
      "No, unless it is declared as final"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does an abstract method look like?",
    "topic": "Interfaces & abstract classes",
    "choices": [
      "A method with no body that subclasses must implement",
      "A method with a body that cannot be overridden",
      "A method that can be called without an object",
      "A method that only the compiler can see"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a functional interface?",
    "topic": "Interfaces & abstract classes",
    "choices": [
      "An interface that has only static methods and no abstract methods",
      "An interface that is implemented by the JVM for each class",
      "An interface with many methods that all return a value",
      "An interface with exactly one abstract method, which can be used with lambdas"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why program to an interface instead of a concrete class?",
    "topic": "Interfaces & abstract classes",
    "choices": [
      "Interfaces run faster than classes because they have no fields",
      "Callers depend on a contract, so the implementation can change without side effects",
      "Concrete classes cannot be used as parameters of methods",
      "It is required by the compiler for any public method"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Can an interface have fields?",
    "topic": "Interfaces & abstract classes",
    "choices": [
      "Yes, any mutable field that each implementing object owns",
      "Only constants, since fields are implicitly public static final",
      "No, an interface cannot declare any kind of variable",
      "Yes, but only when it is marked as abstract"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens if a class implements an interface but misses one method?",
    "topic": "Interfaces & abstract classes",
    "choices": [
      "The method is generated by the compiler with an empty body",
      "The method is added at runtime by the virtual machine",
      "The call to the method throws an exception that is checked",
      "The class must be declared abstract, or the code does not compile"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a record in Java?",
    "topic": "Records, enums & sealed classes",
    "choices": [
      "A compact class for immutable data with generated accessors, equals, hashCode and toString",
      "A class that stores its data in a file on the disk",
      "A class that can be modified by any other class freely",
      "A special array that has a fixed length and a name"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Can a record have mutable instance fields declared in its body?",
    "topic": "Records, enums & sealed classes",
    "choices": [
      "Yes, any number of private mutable fields are allowed",
      "Yes, but only when they are marked as volatile",
      "No, a record can only declare the fields in its header",
      "No, but it can declare mutable static fields only in the header"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an enum?",
    "topic": "Records, enums & sealed classes",
    "choices": [
      "A class that counts the number of instances that were created",
      "A list that grows automatically when constants are added",
      "A type with a fixed set of named constants that can have fields and methods",
      "A string that can only hold the values true and false"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use an enum instead of int constants for states?",
    "topic": "Records, enums & sealed classes",
    "choices": [
      "It is type safe, readable, and the compiler can check switch statements",
      "Enums use less memory than int values in every situation",
      "Int constants cannot be compared with the == operator",
      "Enums can be created at runtime from user input freely"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a sealed class or interface?",
    "topic": "Records, enums & sealed classes",
    "choices": [
      "It cannot be used in any package other than its own, even by tests",
      "It cannot have any methods with a body",
      "It is stored in a protected part of the memory",
      "It restricts which classes may extend or implement it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the permits clause of a sealed type list?",
    "topic": "Records, enums & sealed classes",
    "choices": [
      "The users that are allowed to call its methods",
      "The classes that are allowed to extend or implement it",
      "The packages that may import the type",
      "The files that the compiler may read"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a benefit of sealed types with switch patterns?",
    "topic": "Records, enums & sealed classes",
    "choices": [
      "The switch runs faster because the cases are sorted",
      "The compiler can check that all cases are covered",
      "The code does not need any default branch for any type",
      "Sealed types cannot be used with other statements"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the compiler generate for a record automatically?",
    "topic": "Records, enums & sealed classes",
    "choices": [
      "A builder class and a mutable copy of the record",
      "A database table that maps the fields of the record to its columns",
      "A separate interface for each field of the record",
      "A constructor, accessors, equals, hashCode and toString"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Can an enum have a constructor?",
    "topic": "Records, enums & sealed classes",
    "choices": [
      "Yes, which is used to set the fields of each constant",
      "No, because enum constants are created by the JVM only",
      "Yes, but it must be public and have no parameters",
      "No, unless the enum is declared inside a class"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you get all the constants of an enum?",
    "topic": "Records, enums & sealed classes",
    "choices": [
      "By calling its new instance method with no argument",
      "By reading a field named all on the enum type",
      "By calling its static values method",
      "By iterating over its class loader"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between a checked and an unchecked exception?",
    "topic": "Exception handling",
    "choices": [
      "Unchecked exceptions must be handled or declared, checked ones need not be",
      "Checked exceptions are thrown only by the compiler",
      "Checked exceptions must be handled or declared, unchecked ones need not be",
      "Unchecked exceptions can only be thrown by the JVM itself"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which of these is an unchecked exception?",
    "topic": "Exception handling",
    "choices": [
      "NullPointerException",
      "IOException",
      "SQLException",
      "InterruptedException"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the finally block do?",
    "topic": "Exception handling",
    "choices": [
      "It runs only when an exception is thrown in the try block",
      "It runs only when no exception is thrown in the try block",
      "It runs after the program has ended with an error",
      "It runs whether or not an exception was thrown in the try block"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is try with resources used for?",
    "topic": "Exception handling",
    "choices": [
      "It creates new resources faster than the new keyword can",
      "Resources that implement AutoCloseable are closed automatically",
      "It catches all exceptions without a catch block",
      "It limits the memory that a block can use"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why catch the most specific exception type first?",
    "topic": "Exception handling",
    "choices": [
      "The most specific type runs faster than any other type",
      "A broader catch before a narrower one would make the narrower one unreachable",
      "The compiler requires that all catch blocks are sorted alphabetically",
      "Only the first catch block of any try statement can run"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does throw do and what does throws do?",
    "topic": "Exception handling",
    "choices": [
      "throws raises an exception, and throw declares what a method may throw",
      "Both raise an exception, but throws does it later",
      "They are the same keyword written differently",
      "throw raises an exception, and throws declares what a method may throw"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good reason to define a custom exception?",
    "topic": "Exception handling",
    "choices": [
      "It names a domain problem clearly and can carry extra information",
      "It lets the code skip the try and catch blocks completely",
      "It is faster to throw than a standard exception",
      "Standard exceptions cannot be caught by callers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is swallowing an exception with an empty catch block a problem?",
    "topic": "Exception handling",
    "choices": [
      "The compiler reports a warning that stops the build",
      "The catch block slows down the program a lot",
      "Errors disappear, which makes bugs hard to find",
      "The exception is thrown again at the end of the method"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the stack trace of an exception show?",
    "topic": "Exception handling",
    "choices": [
      "The list of variables that were changed by the program",
      "The time that was spent in each method of the program",
      "The chain of method calls that led to the exception",
      "The names of the files that were opened by the program"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is exception chaining?",
    "topic": "Exception handling",
    "choices": [
      "Wrapping a cause in a new exception so that the original problem is kept",
      "Throwing the same exception several times in a loop",
      "Catching several exceptions in a single catch block",
      "Calling a method that throws another method"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the default equals of Object compare?",
    "topic": "equals, hashCode & toString",
    "choices": [
      "The values of all fields of the two objects",
      "The class names of the two objects only",
      "The hash codes of the two objects",
      "The references, so it is true only for the same object"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the contract between equals and hashCode?",
    "topic": "equals, hashCode & toString",
    "choices": [
      "Objects with equal hash codes must be equal",
      "Equal objects must have equal hash codes",
      "Equal objects must have different hash codes",
      "The two methods are unrelated to each other"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What goes wrong if you override equals but not hashCode?",
    "topic": "equals, hashCode & toString",
    "choices": [
      "The compiler reports an error and the class does not build",
      "Objects can be lost in hash based collections such as HashSet and HashMap",
      "The objects can no longer be created with new",
      "The equals method is ignored by all collections"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of toString?",
    "topic": "equals, hashCode & toString",
    "choices": [
      "It converts the object to a number that identifies it",
      "It converts the object into bytes that can be stored",
      "It returns the class name and nothing else",
      "It returns a readable text for the object, for example in logs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which fields should be used in hashCode?",
    "topic": "equals, hashCode & toString",
    "choices": [
      "The same fields that are used in equals",
      "Only the first field of the class that was declared",
      "All fields including those that change often",
      "Random values so that the result is well distributed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which helper class creates a hash code from several fields?",
    "topic": "equals, hashCode & toString",
    "choices": [
      "Objects.random",
      "Arrays.fill",
      "Objects.hash",
      "Math.hashCode"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should objects used as keys in a HashMap be immutable, or their key fields be?",
    "topic": "equals, hashCode & toString",
    "choices": [
      "Keys that are mutable cannot be stored in a map at all",
      "Immutable keys are compared by reference only",
      "Changing a key field can change its hash code, so the entry is no longer found",
      "A map copies each key into a read only buffer"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a record give you for equals?",
    "topic": "equals, hashCode & toString",
    "choices": [
      "Equality based on the values of all its components",
      "Equality based on the reference of the record in the memory of the JVM",
      "Equality based on the first component only",
      "No equals method at all unless you write it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Objects.equals(a, b) do with null arguments?",
    "topic": "equals, hashCode & toString",
    "choices": [
      "It throws a NullPointerException if a is null",
      "It returns false whenever any argument is null",
      "It converts null to the string null and then compares the two texts",
      "It handles null safely and does not throw an exception"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why does the toString of a default Object look like a class name and a hash?",
    "topic": "equals, hashCode & toString",
    "choices": [
      "The runtime hides the content of objects for security",
      "The Object version prints the class name and the hexadecimal hash code",
      "The method prints the memory address of the object in decimal",
      "It prints the stack trace of the place where the object was created"
    ],
    "answerIdx": 1
  }
]
```

LAYER: java-spring-3

```json
[
  {
    "stem": "What is the main difference between List and Set?",
    "topic": "List, Set, Map & their implementations",
    "choices": [
      "A Set keeps order and allows duplicates, while a List holds unique elements",
      "A List can hold only objects, while a Set can hold only primitive values",
      "A List keeps order and allows duplicates, while a Set holds unique elements",
      "A Set is always sorted, while a List is never sorted by any method"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is ArrayList a better choice than LinkedList?",
    "topic": "List, Set, Map & their implementations",
    "choices": [
      "For fast random access by index and mostly appending at the end",
      "For frequent inserts and removals in the middle of a very long list",
      "For storing elements in sorted order without any extra work",
      "For storing key and value pairs that are looked up by name"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the time complexity of get(index) on an ArrayList?",
    "topic": "List, Set, Map & their implementations",
    "choices": [
      "Linear time, because it walks from the start of the list up to the index",
      "Logarithmic time, because the elements are kept in a tree",
      "Quadratic time, because it compares all pairs of elements",
      "Constant time, because the elements are stored in an array"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which Set implementation keeps its elements in sorted order?",
    "topic": "List, Set, Map & their implementations",
    "choices": [
      "HashSet",
      "TreeSet",
      "LinkedHashSet",
      "EnumSet"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does LinkedHashSet preserve that HashSet does not?",
    "topic": "List, Set, Map & their implementations",
    "choices": [
      "The sorted order of the elements in the natural order of their type",
      "The insertion order of the elements",
      "The hash code of each element",
      "The type of each element"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a HashMap find the bucket of a key?",
    "topic": "List, Set, Map & their implementations",
    "choices": [
      "It sorts the keys and uses binary search to find the entry",
      "It scans all entries and compares them one by one with equals",
      "It stores keys in a list and uses the index of the key",
      "It uses the hashCode of the key, and equals to compare keys in the bucket"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens when you put a value with an existing key into a HashMap?",
    "topic": "List, Set, Map & their implementations",
    "choices": [
      "The old value is replaced and returned",
      "A second entry with the same key is added to the map",
      "An exception is thrown because keys must be unique",
      "The new value is ignored and the old value is kept"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which map keeps entries sorted by key?",
    "topic": "List, Set, Map & their implementations",
    "choices": [
      "HashMap",
      "LinkedHashMap",
      "TreeMap",
      "IdentityHashMap"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between Iterator remove and Collection remove inside a loop?",
    "topic": "List, Set, Map & their implementations",
    "choices": [
      "Collection remove is safe during iteration, while the iterator method throws an exception",
      "Both are safe, but the iterator version is slower",
      "Iterator remove is safe during iteration, while the collection method can throw ConcurrentModificationException",
      "Both throw an exception because collections are immutable during loops"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does List.of(1, 2, 3) return?",
    "topic": "List, Set, Map & their implementations",
    "choices": [
      "An immutable list, so changing it throws an exception",
      "A mutable list that can be changed freely by the caller",
      "A fixed size list whose elements can be replaced but not removed",
      "A linked list that is thread safe by default"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a generic class such as Box<T>?",
    "topic": "Generics & bounded types",
    "choices": [
      "A class that can hold values of any type with no type checks",
      "A class that is created by the compiler for each type that exists",
      "A class that can extend more than one parent class",
      "A class that works with a type that is given when it is used"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What benefit do generics give over raw types?",
    "topic": "Generics & bounded types",
    "choices": [
      "Programs run faster because the types are kept and known at runtime",
      "Type errors are found at compile time and no casts are needed",
      "Collections can hold primitive values without boxing",
      "The JVM keeps the type argument for use in reflection"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is type erasure?",
    "topic": "Generics & bounded types",
    "choices": [
      "The runtime removes unused types from memory to save space",
      "The compiler removes generic type information, so it is not available at runtime",
      "The compiler converts each generic type into a new class",
      "The runtime replaces all types with the Object class in the source"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a bounded type, as in T extends Number, mean?",
    "topic": "Generics & bounded types",
    "choices": [
      "T can be any class except Number",
      "T must be exactly the class Number and nothing else",
      "T can be any class that is a parent of Number",
      "T can be Number or any of its subclasses"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the wildcard List<? extends Number> allow?",
    "topic": "Generics & bounded types",
    "choices": [
      "Reading elements as Number, but not adding elements",
      "Adding any Number to the list, but not reading elements",
      "Adding and reading any kind of object",
      "Only reading the first element of the list"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does List<? super Integer> allow?",
    "topic": "Generics & bounded types",
    "choices": [
      "Reading Integer values, while adding of any value is not allowed",
      "Reading and adding any kind of number",
      "Adding Integer values, while reads give only Object",
      "Adding values of any type to the list"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the PECS rule?",
    "topic": "Generics & bounded types",
    "choices": [
      "Primitive extends, class super, used to choose the wildcard",
      "Parent extends, child super",
      "Producer extends, consumer super",
      "Public extends, private super"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why can you not create an array of a generic type such as new T[10]?",
    "topic": "Generics & bounded types",
    "choices": [
      "Generic type information is erased, so array element types cannot be checked",
      "Arrays cannot hold objects, only primitive values",
      "The compiler does not allow arrays in generic classes",
      "Generic classes are always final and so cannot be arrays"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a generic method?",
    "topic": "Generics & bounded types",
    "choices": [
      "A method that can be called with any number of arguments",
      "A method that is inherited by all classes of the program",
      "A method that returns an object of the class Object",
      "A method with its own type parameter, declared before the return type"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is List<Object> not a supertype of List<String>?",
    "topic": "Generics & bounded types",
    "choices": [
      "Strings are not objects, so the types cannot be related",
      "Generics are invariant, and adding a number would break the type safety of the string list",
      "The compiler cannot compare two generic types at all",
      "List<Object> can only hold primitive values"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the map operation of a Stream do?",
    "topic": "The Stream API — map, filter, collect",
    "choices": [
      "Removes elements that do not match a condition",
      "Transforms each element into another value",
      "Collects the elements into a list at the end",
      "Sorts the elements in their natural order"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does filter do in a stream pipeline?",
    "topic": "The Stream API — map, filter, collect",
    "choices": [
      "Changes each element to a new type",
      "Combines all elements into a single result",
      "Counts the number of elements that were seen by the pipeline so far",
      "Keeps only the elements that match a predicate"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between intermediate and terminal operations?",
    "topic": "The Stream API — map, filter, collect",
    "choices": [
      "Intermediate operations return a stream and are lazy, terminal ones produce a result and start the work",
      "Terminal operations return a stream and are lazy, intermediate ones produce a result",
      "They are the same, but terminal operations are written last",
      "Intermediate operations run in parallel, and terminal ones run in sequence"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When does a stream pipeline actually run?",
    "topic": "The Stream API — map, filter, collect",
    "choices": [
      "As soon as each intermediate operation is written",
      "When the stream object is created from the source",
      "When a terminal operation is called",
      "When the garbage collector next runs"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does collect(Collectors.toList()) do?",
    "topic": "The Stream API — map, filter, collect",
    "choices": [
      "Sorts the elements and removes duplicates from the stream",
      "Converts the list back into a stream for later use",
      "Gathers the elements of the stream into a list",
      "Writes the elements to a file in the current folder"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Collectors.groupingBy do?",
    "topic": "The Stream API — map, filter, collect",
    "choices": [
      "Groups elements into a map by a key function",
      "Joins all of the elements into a single string",
      "Counts the elements without keeping them",
      "Sorts the elements by their natural order"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does reduce do?",
    "topic": "The Stream API — map, filter, collect",
    "choices": [
      "Removes the elements that appear more than once",
      "Reverses the order of the elements in the stream",
      "Splits the stream into two smaller streams",
      "Combines the elements into one value with an operation such as sum"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Can a stream be reused after a terminal operation?",
    "topic": "The Stream API — map, filter, collect",
    "choices": [
      "Yes, as many times as you need with no extra cost",
      "No, it throws an IllegalStateException if you try",
      "Yes, but only when it came from a list",
      "No, but you may continue with intermediate operations"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does flatMap do?",
    "topic": "The Stream API — map, filter, collect",
    "choices": [
      "Flattens a map into a list of its keys and values",
      "Maps each element to a stream and merges all the streams into one",
      "Maps each element and removes the nulls from the result",
      "Sorts the elements and then flattens the order"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When can parallelStream be a bad idea?",
    "topic": "The Stream API — map, filter, collect",
    "choices": [
      "For any data set that is larger than a thousand elements",
      "For streams that use filter and map together",
      "For collections that are stored in an ArrayList",
      "For small data sets or tasks that depend on order or shared state"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What problem does Optional solve?",
    "topic": "Optional & null handling",
    "choices": [
      "It makes the possible absence of a value explicit in the return type",
      "It removes the need for any null checks in all code",
      "It stores the value of a variable in a file between runs",
      "It makes every object immutable and thread safe"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Optional.orElse do?",
    "topic": "Optional & null handling",
    "choices": [
      "Throws an exception if the Optional is empty",
      "Returns the Optional with the default value added to it as a second element",
      "Returns the value, or a given default if it is empty",
      "Replaces the value with null if it is present"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between orElse and orElseGet?",
    "topic": "Optional & null handling",
    "choices": [
      "orElse evaluates its argument only when the Optional is empty",
      "They are identical, and the only difference is the name",
      "orElseGet evaluates its supplier only when the Optional is empty",
      "orElseGet throws an exception if the Optional is empty"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Optional.map do?",
    "topic": "Optional & null handling",
    "choices": [
      "Transforms the value if it is present, otherwise stays empty",
      "Converts the Optional into a map of keys and values",
      "Removes the value from the Optional and returns it",
      "Creates a new Optional from a collection of values"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should Optional not be used for fields or method parameters?",
    "topic": "Optional & null handling",
    "choices": [
      "The compiler rejects Optional as a field type",
      "Optional cannot be serialised in any case",
      "Fields must always be non null in Java",
      "It was designed as a return type, and it adds noise and overhead elsewhere"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Optional.of(null) do?",
    "topic": "Optional & null handling",
    "choices": [
      "Returns an empty Optional",
      "Throws a NullPointerException",
      "Returns an Optional with the text null",
      "Returns null to the caller"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which method creates an Optional that may hold null?",
    "topic": "Optional & null handling",
    "choices": [
      "Optional.of",
      "Optional.ofNullable",
      "Optional.empty",
      "Optional.maybe"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does orElseThrow do on an empty Optional?",
    "topic": "Optional & null handling",
    "choices": [
      "Returns null to the caller of the method",
      "Returns an empty string for text values",
      "Logs a warning and continues the pipeline",
      "Throws an exception that you supply, or NoSuchElementException by default"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is calling get() on an Optional without checking risky?",
    "topic": "Optional & null handling",
    "choices": [
      "It throws an exception if the Optional is empty",
      "It returns null when the Optional is empty",
      "It converts the Optional into a list of one element",
      "It blocks until a value becomes available"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Objects.requireNonNull help with?",
    "topic": "Optional & null handling",
    "choices": [
      "Converting null into an empty object automatically",
      "Making every field of the object non null",
      "Failing early with a clear message if an argument is null",
      "Replacing the null value by a default constructor"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a lambda expression?",
    "topic": "Lambdas & functional interfaces",
    "choices": [
      "A method that is defined inside another class",
      "A class that has only one field and no methods",
      "A short anonymous function that implements a functional interface",
      "A statement that repeats a block of code a number of times"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the lambda (a, b) -> a + b match?",
    "topic": "Lambdas & functional interfaces",
    "choices": [
      "A functional interface method with two parameters that returns a value",
      "A method with no parameters that returns nothing",
      "A method with one parameter that returns a boolean",
      "A class with two fields and a constructor"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which functional interface takes one argument and returns a boolean?",
    "topic": "Lambdas & functional interfaces",
    "choices": [
      "Function",
      "Supplier",
      "Consumer",
      "Predicate"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which functional interface takes no argument and returns a value?",
    "topic": "Lambdas & functional interfaces",
    "choices": [
      "Consumer",
      "Supplier",
      "Predicate",
      "Runnable"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which functional interface takes one argument and returns nothing?",
    "topic": "Lambdas & functional interfaces",
    "choices": [
      "Function",
      "Consumer",
      "Supplier",
      "Comparator"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a method reference such as String::length?",
    "topic": "Lambdas & functional interfaces",
    "choices": [
      "A pointer to the memory address of the method",
      "A way of importing a method into another class",
      "A type of annotation that marks a method",
      "A short form of a lambda that calls an existing method"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which variables may a lambda use from the enclosing scope?",
    "topic": "Lambdas & functional interfaces",
    "choices": [
      "Local variables that are final or effectively final",
      "Any local variable, even ones that are changed later",
      "Only static fields of the enclosing class",
      "Only variables that are declared inside the lambda"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does @FunctionalInterface do?",
    "topic": "Lambdas & functional interfaces",
    "choices": [
      "It makes the interface faster at runtime",
      "It allows the interface to be used with threads",
      "The compiler checks that the interface has exactly one abstract method",
      "It converts the interface into a class"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between Function and BiFunction?",
    "topic": "Lambdas & functional interfaces",
    "choices": [
      "Function takes two arguments, BiFunction takes one",
      "BiFunction returns two values, Function returns one",
      "BiFunction takes two arguments, Function takes one",
      "They are the same and the name depends on the package"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why are lambdas often better than anonymous classes?",
    "topic": "Lambdas & functional interfaces",
    "choices": [
      "They are shorter and do not create a new class file for each use",
      "They run on a separate thread by default",
      "They can have their own fields and constructors",
      "They can extend any class that is needed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Comparator.comparing(Person::getAge) sort a list?",
    "topic": "Comparators & sorting",
    "choices": [
      "By the order in which the persons were created",
      "By the hash code of each person object",
      "By the length of the name of each person",
      "By the value that the key extractor returns, in ascending order"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you reverse a comparator?",
    "topic": "Comparators & sorting",
    "choices": [
      "Call back() on it",
      "Call reversed() on it",
      "Call invert() on it to turn the order around for the sort",
      "Call swap() on it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you sort by last name and then by first name?",
    "topic": "Comparators & sorting",
    "choices": [
      "Call sort twice with different comparators in one line",
      "Chain comparators with thenComparing",
      "Concatenate the names and sort the result",
      "Use two separate lists and merge them at the end"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the Comparable interface define?",
    "topic": "Comparators & sorting",
    "choices": [
      "A way to copy an object into a new object",
      "A way to compare the references of two objects in the heap memory",
      "A rule that objects must be immutable",
      "The natural order of a class, through compareTo"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should compareTo return when the receiver is smaller than the argument?",
    "topic": "Comparators & sorting",
    "choices": [
      "A negative number",
      "A positive number",
      "Zero",
      "The value one"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the contract between compareTo and equals, ideally?",
    "topic": "Comparators & sorting",
    "choices": [
      "Opposite, so that compareTo returns zero when equals is false",
      "Unrelated, so that they can use different fields freely",
      "Consistent, so that compareTo returns zero exactly when equals is true",
      "Identical, since both methods must be the same method"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which method sorts a list in place using its natural order?",
    "topic": "Comparators & sorting",
    "choices": [
      "list.reverse()",
      "List.sorted(list)",
      "Collections.sort(list)",
      "Arrays.hash(list)"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Comparator.nullsFirst do?",
    "topic": "Comparators & sorting",
    "choices": [
      "Wraps a comparator so that null values come before other values",
      "Removes all null values from a collection before sorting",
      "Throws an exception if a null value is found",
      "Replaces null values with the smallest number"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is sorting stable useful?",
    "topic": "Comparators & sorting",
    "choices": [
      "It guarantees that sorting takes linear time",
      "It means the list is also protected from changes by other threads",
      "It makes sure that the sort works for all types",
      "Equal elements keep their original relative order"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the time complexity of sorting a list with Collections.sort?",
    "topic": "Comparators & sorting",
    "choices": [
      "O(n), since the list is already partly ordered",
      "O(n log n), by a merge sort based algorithm",
      "O(n squared), since every pair is compared",
      "O(log n), since it uses a binary search"
    ],
    "answerIdx": 1
  }
]
```

LAYER: java-spring-4

```json
[
  {
    "stem": "What is the role of Maven in a Java project?",
    "topic": "Maven project structure & lifecycle",
    "choices": [
      "It runs the application on a server and keeps it alive again after a crash",
      "It writes the source code of the classes from a model file",
      "It builds the project, manages dependencies and runs the lifecycle phases",
      "It translates Java source into bytecode and nothing else"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where does Maven expect the main Java sources by default?",
    "topic": "Maven project structure & lifecycle",
    "choices": [
      "src/main/java",
      "src/java/main",
      "app/src/code",
      "main/src/java"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where are the unit tests located in a standard Maven project?",
    "topic": "Maven project structure & lifecycle",
    "choices": [
      "test/src/java",
      "src/tests/main",
      "java/test/src",
      "src/test/java"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which phase of the Maven default lifecycle compiles the source code?",
    "topic": "Maven project structure & lifecycle",
    "choices": [
      "package",
      "compile",
      "install",
      "verify"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the command mvn package usually produce?",
    "topic": "Maven project structure & lifecycle",
    "choices": [
      "A Docker image in the local registry of the machine",
      "A jar or war file in the target folder",
      "A set of generated source files in the src folder",
      "A report of the dependencies that are out of date"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does mvn clean do?",
    "topic": "Maven project structure & lifecycle",
    "choices": [
      "Removes unused dependencies from the pom file",
      "Deletes the source files that failed to compile",
      "Cleans the local repository of every project",
      "Deletes the target folder with the build output"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between mvn install and mvn deploy?",
    "topic": "Maven project structure & lifecycle",
    "choices": [
      "install copies the artifact to the local repository, deploy sends it to a remote one",
      "deploy copies the artifact to the local repository, install sends it to a remote one",
      "They do exactly the same and differ only in name",
      "install builds the code and deploy only runs the tests"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the Maven wrapper, mvnw, provide?",
    "topic": "Maven project structure & lifecycle",
    "choices": [
      "A tool that wraps the jar in a native executable",
      "A plugin that wraps all the tests in a single class",
      "A script that downloads and uses the Maven version of the project",
      "A command that wraps the logs into one file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What are the Maven coordinates of an artifact?",
    "topic": "Maven project structure & lifecycle",
    "choices": [
      "name, author and date",
      "package, class and method, which locate a single method in the code",
      "groupId, artifactId and version",
      "project, folder and file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which command runs the tests of a Maven project?",
    "topic": "Maven project structure & lifecycle",
    "choices": [
      "mvn test",
      "mvn compile",
      "mvn run",
      "mvn check"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the pom.xml file?",
    "topic": "Dependencies & the POM",
    "choices": [
      "A list of the classes that the application loads at startup",
      "A file with the environment variables of the application",
      "A log of the changes made by the Maven plugins",
      "The project object model, which describes the build and its dependencies"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you add a library to a Maven project?",
    "topic": "Dependencies & the POM",
    "choices": [
      "Copy the jar file into the src folder of the project and add it by hand",
      "Add a dependency element with its coordinates to the pom",
      "Write an import statement for it in each source file",
      "Run the javac command with the library name"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the scope test mean for a dependency?",
    "topic": "Dependencies & the POM",
    "choices": [
      "It is available at runtime but not at compile time",
      "It is available only for compiling and running tests",
      "It is available at runtime but not at compile time, so tests cannot see it",
      "It is downloaded only on a test server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a transitive dependency?",
    "topic": "Dependencies & the POM",
    "choices": [
      "A dependency that is used only by the Maven plugins",
      "A dependency that is declared twice in the same pom",
      "A dependency that is used only by the tests of a library and is never shipped",
      "A dependency of a dependency, which Maven adds automatically"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does dependencyManagement in a parent pom do?",
    "topic": "Dependencies & the POM",
    "choices": [
      "It sets the versions of dependencies, without adding them to the child",
      "It adds every listed dependency to all of the child projects automatically",
      "It deletes dependencies that are not used by any child",
      "It downloads the dependencies at the start of each build"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a Maven BOM?",
    "topic": "Dependencies & the POM",
    "choices": [
      "A build output manager that stores the compiled classes",
      "A browser of modules that lists public libraries",
      "A bill of materials pom that defines compatible versions of many libraries",
      "A binary object model of the compiled application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where does Maven store the downloaded dependencies locally?",
    "topic": "Dependencies & the POM",
    "choices": [
      "In the target folder of the project that uses them",
      "In the src folder next to the source files",
      "In the local repository, by default in the .m2 folder of the user",
      "In a temporary folder that is cleaned on every build"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a version conflict between two transitive dependencies mean?",
    "topic": "Dependencies & the POM",
    "choices": [
      "Two libraries need different versions of the same artifact, and Maven picks one",
      "Maven stops the build and deletes both versions of the artifact",
      "The application will always crash on startup in that case",
      "Both versions are loaded and used at the same time by Maven"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the command mvn dependency:tree show?",
    "topic": "Dependencies & the POM",
    "choices": [
      "The folder tree of the source code of the project",
      "The list of the classes inside the final package",
      "The list of the plugins that were run by the last build and their versions",
      "The tree of the direct and transitive dependencies of the project"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why pin dependency versions instead of using ranges?",
    "topic": "Dependencies & the POM",
    "choices": [
      "Ranges are not supported by the Maven repository format",
      "Builds stay reproducible and do not change when a new release appears",
      "Pinned versions download faster from the repository",
      "Maven refuses to build projects that use ranges at all"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Inversion of Control mean?",
    "topic": "Inversion of Control & DI",
    "choices": [
      "The program runs its main method in reverse order",
      "The framework creates and wires objects instead of your code doing it",
      "The compiler inverts the order of the statements in a class before it builds",
      "The control of a program moves to the operating system"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is dependency injection?",
    "topic": "Inversion of Control & DI",
    "choices": [
      "An object copies the fields of another object into itself",
      "An object loads its dependencies at compile time from a pom",
      "An object injects code into the classes of other objects at runtime",
      "An object receives the collaborators it needs from outside, instead of creating them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which form of injection does Spring recommend for required dependencies?",
    "topic": "Inversion of Control & DI",
    "choices": [
      "Constructor injection",
      "Field injection",
      "Setter injection with a default value",
      "Static injection through a utility class"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is constructor injection preferred?",
    "topic": "Inversion of Control & DI",
    "choices": [
      "Constructors run faster than methods in the Spring container",
      "Spring can inject only through constructors in recent versions",
      "Dependencies are explicit and final, and objects are easy to create in tests",
      "It removes the need for any annotations in the class"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the @Autowired annotation do?",
    "topic": "Inversion of Control & DI",
    "choices": [
      "Creates a new object of the field type with the new keyword at startup",
      "Marks the class as the entry point of the application",
      "Asks Spring to provide a bean for the field, constructor or setter",
      "Marks a method to be called when the application stops"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens when Spring finds two beans of the required type?",
    "topic": "Inversion of Control & DI",
    "choices": [
      "It fails with an error unless you choose one, for example with @Primary or @Qualifier",
      "It injects both beans and merges their behaviour",
      "It picks the first bean that was created and ignores the other",
      "It creates a third bean that wraps the two others"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the benefit of coding against interfaces with DI?",
    "topic": "Inversion of Control & DI",
    "choices": [
      "Interfaces make the application start faster in Spring",
      "Spring cannot inject classes that do not have an interface in front of them",
      "It removes the need for the container to create any bean",
      "You can swap implementations, for example with a fake in tests"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a circular dependency between beans?",
    "topic": "Inversion of Control & DI",
    "choices": [
      "A bean that depends on itself through a static field",
      "Two beans depend on each other, which cannot be created in constructors",
      "A bean that is created twice by the application context",
      "A bean that depends on a bean of another application"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where does the container get the information about how to wire the beans?",
    "topic": "Inversion of Control & DI",
    "choices": [
      "From the names of the files in the source folder",
      "From annotations and configuration classes, or from XML files in older setups",
      "From the comments in the source of the classes",
      "From the database that the application uses"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a loosely coupled design?",
    "topic": "Inversion of Control & DI",
    "choices": [
      "Classes share many global variables to exchange data",
      "Classes are stored in the same file for easy access",
      "Classes cannot call methods of each other",
      "Classes depend on abstractions, so they can change independently"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a Spring bean?",
    "topic": "Spring beans & the application context",
    "choices": [
      "An object that is created, wired and managed by the Spring container",
      "Any object that is created with the new keyword in a method of the class",
      "A class that has only getters and setters and no logic",
      "A file that stores the configuration of the application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the ApplicationContext?",
    "topic": "Spring beans & the application context",
    "choices": [
      "A class that stores the url of the application",
      "A file that lists all the controllers of the application",
      "The container that creates and holds the beans and wires them together",
      "A thread pool that runs the beans of the application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the default scope of a Spring bean?",
    "topic": "Spring beans & the application context",
    "choices": [
      "Prototype, a new instance for each injection",
      "Request, a new instance for each HTTP request",
      "Singleton, one shared instance per container",
      "Session, a new instance for each user session"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the prototype scope do?",
    "topic": "Spring beans & the application context",
    "choices": [
      "A new instance is created every time the bean is requested",
      "One instance is shared by the whole application",
      "One instance is shared by all requests of a session",
      "One instance is created at startup and kept for ever for the whole application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which stereotype annotation marks a class for the business logic layer?",
    "topic": "Spring beans & the application context",
    "choices": [
      "@Repository",
      "@Controller",
      "@Entity",
      "@Service"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does @Component do?",
    "topic": "Spring beans & the application context",
    "choices": [
      "Marks a class as a database entity that is stored in a table",
      "Marks a class as a bean that is found by component scanning",
      "Marks a method that runs at the start of the application",
      "Marks a field that is injected by name"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the @Bean annotation on a method in a @Configuration class do?",
    "topic": "Spring beans & the application context",
    "choices": [
      "The method is called each time that the configuration class is created",
      "The returned object is registered as a bean in the context",
      "The method is exposed as an HTTP endpoint",
      "The method is run only in the test environment"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is component scanning?",
    "topic": "Spring beans & the application context",
    "choices": [
      "Spring checks all classes for syntax errors at startup",
      "Spring counts the number of components in the project",
      "Spring downloads components from a remote registry",
      "Spring searches packages for annotated classes and registers them as beans"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the bean lifecycle callback @PostConstruct used for?",
    "topic": "Spring beans & the application context",
    "choices": [
      "Code that runs after the bean is created and its dependencies are injected",
      "Code that runs when the application is shut down",
      "Code that runs before the constructor of the bean",
      "Code that runs on every method call of the bean"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why are singleton beans expected to be stateless?",
    "topic": "Spring beans & the application context",
    "choices": [
      "Singletons cannot have any fields in Spring",
      "Stateful beans are not allowed by the container",
      "They are shared by many threads, so mutable state can cause concurrency bugs",
      "The container clears the fields after each call"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a Spring profile?",
    "topic": "Configuration & profiles",
    "choices": [
      "A user account of the application with a list of roles",
      "A report of the performance of the application",
      "A named set of configuration that is active in a certain environment",
      "A copy of the application that runs in a separate JVM"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you activate a profile?",
    "topic": "Configuration & profiles",
    "choices": [
      "With the property spring.profiles.active or the command line option",
      "By renaming the main class of the application",
      "By adding the profile name to the file name of the jar and nothing else",
      "By creating a bean with the profile name"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is application.properties used for in Spring Boot?",
    "topic": "Configuration & profiles",
    "choices": [
      "Declaring the beans of the application in a text format that Spring reads",
      "Listing the dependencies that the build needs",
      "Storing the compiled classes of the application",
      "Configuration values such as the server port and the database url"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the benefit of application.yml compared with a properties file?",
    "topic": "Configuration & profiles",
    "choices": [
      "It runs faster than a properties file in every case",
      "A hierarchical format that is easier to read for nested values",
      "It is the only format that supports environment variables in Spring Boot",
      "It is required for profiles to work in Spring Boot"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you read a value from configuration into a field?",
    "topic": "Configuration & profiles",
    "choices": [
      "With a static method of the class Environment only",
      "With the @Value annotation and a placeholder such as ${app.name}",
      "With a call to System.exit in the constructor",
      "With an import statement for the file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What file would you use for settings of the dev profile?",
    "topic": "Configuration & profiles",
    "choices": [
      "dev.application.properties in the root folder of the project next to the pom",
      "profile-dev.yml in the main package",
      "application.dev in the resources folder",
      "application-dev.properties or application-dev.yml"
    ],
    "answerIdx": 3
  },
  {
    "stem": "In what order does Spring Boot read external configuration sources?",
    "topic": "Configuration & profiles",
    "choices": [
      "Command line arguments and environment variables override files in the jar",
      "Files inside the jar always override every other source",
      "The order is random and changes at each startup",
      "Environment variables are ignored by Spring Boot"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does @ConfigurationProperties give you over @Value?",
    "topic": "Configuration & profiles",
    "choices": [
      "Faster startup of the application by caching the values",
      "Access to the values in static methods of any class",
      "Type safe binding of a group of properties into a class",
      "Automatic encryption of the values in the file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why keep secrets out of application.properties in the repository?",
    "topic": "Configuration & profiles",
    "choices": [
      "Properties files cannot hold long values",
      "Secrets are not supported in Spring configuration",
      "Files in version control are visible to everyone with access to the repository",
      "Git cannot store files with the extension properties"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does @Profile(\"test\") on a bean do?",
    "topic": "Configuration & profiles",
    "choices": [
      "The bean is registered only when the test profile is active",
      "The bean is deleted from the context when the test profile is active",
      "The bean is registered in all profiles except test",
      "The bean runs the tests of the application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a Spring Boot starter?",
    "topic": "Spring Boot starters & auto-configuration",
    "choices": [
      "A tool that starts the application server from a console",
      "A class that has the main method of the application",
      "A template of a project that is downloaded from the internet",
      "A dependency that brings a set of libraries for a feature, such as web or data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does spring-boot-starter-web include?",
    "topic": "Spring Boot starters & auto-configuration",
    "choices": [
      "A relational database and its driver",
      "Spring MVC, a default embedded server and JSON support",
      "Security configuration for OAuth2 login",
      "A message broker and a client library"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is auto configuration?",
    "topic": "Spring Boot starters & auto-configuration",
    "choices": [
      "Spring Boot rewrites your configuration files at startup",
      "Spring Boot configures beans for you based on the libraries on the classpath",
      "Spring Boot generates the source code of the classes",
      "Spring Boot downloads configuration from a cloud service"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does @SpringBootApplication combine?",
    "topic": "Spring Boot starters & auto-configuration",
    "choices": [
      "@Controller, @Service and @Repository",
      "@Entity, @Table and @Id",
      "@Test, @Mock and @Autowired",
      "@Configuration, @EnableAutoConfiguration and @ComponentScan"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you see which auto configurations are active?",
    "topic": "Spring Boot starters & auto-configuration",
    "choices": [
      "By running with the debug flag, which prints a conditions report",
      "By reading the pom file of the project",
      "By opening the jar with an archive tool",
      "By calling a hidden endpoint after the start"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you disable a specific auto configuration?",
    "topic": "Spring Boot starters & auto-configuration",
    "choices": [
      "By deleting the class from the Spring jar",
      "By renaming the class in the pom file",
      "With the exclude attribute of @SpringBootApplication",
      "By adding a comment above the main method"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the embedded server in a default Spring Boot web application?",
    "topic": "Spring Boot starters & auto-configuration",
    "choices": [
      "Glassfish",
      "WebLogic",
      "Tomcat",
      "WebSphere"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the main method of a Spring Boot app usually call?",
    "topic": "Spring Boot starters & auto-configuration",
    "choices": [
      "SpringApplication.run",
      "Application.start, which is called by the embedded server when it is ready",
      "Boot.launch",
      "Server.listen"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does @ConditionalOnMissingBean allow?",
    "topic": "Spring Boot starters & auto-configuration",
    "choices": [
      "A bean is deleted when another bean is created",
      "A bean is created for every missing class on the classpath of the project",
      "A bean is registered only if the application has no beans",
      "A default bean is registered only if you have not defined your own"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is the Spring Boot executable jar convenient?",
    "topic": "Spring Boot starters & auto-configuration",
    "choices": [
      "It needs no JVM to run on the target machine",
      "It contains the application and its dependencies and can be run with java -jar",
      "It contains a copy of the operating system",
      "It runs without any configuration files at all"
    ],
    "answerIdx": 1
  }
]
```

LAYER: java-spring-5

```json
[
  {
    "stem": "What does the @RestController annotation do?",
    "topic": "REST controllers & request mapping",
    "choices": [
      "Marks a class that renders HTML pages from templates for browsers",
      "Marks a class that stores records in a database table",
      "Marks a controller whose methods write their return values straight to the HTTP response body",
      "Marks a class that is created once for each HTTP request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which annotation maps a method to HTTP GET requests for a path?",
    "topic": "REST controllers & request mapping",
    "choices": [
      "@GetMapping(\"/users\")",
      "@PostMapping(\"/users\")",
      "@RequestPath(\"/users\")",
      "@Route(\"/users\")"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you read a path variable such as /users/42 in a handler?",
    "topic": "REST controllers & request mapping",
    "choices": [
      "With @RequestParam on a method parameter",
      "With @RequestBody on a method parameter",
      "With @Value on a method parameter",
      "With @PathVariable on a method parameter"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you read a query parameter such as ?page=2?",
    "topic": "REST controllers & request mapping",
    "choices": [
      "With @PathVariable on a method parameter",
      "With @RequestParam on a method parameter",
      "With @ModelAttribute on a class",
      "With @ResponseBody on the method"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does @RequestMapping on a class define?",
    "topic": "REST controllers & request mapping",
    "choices": [
      "The name of the database table that the class is mapped to by the framework",
      "A base path that all of the handler methods inherit",
      "The roles that may call the class",
      "The format of the log lines of the class"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you return a 201 Created response with a body?",
    "topic": "REST controllers & request mapping",
    "choices": [
      "Throw an exception with the code 201 from the method",
      "Set the status in the pom file of the project",
      "Call System.out with the number 201",
      "Return a ResponseEntity with the status CREATED"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the default format of a response object in Spring Boot with the web starter?",
    "topic": "REST controllers & request mapping",
    "choices": [
      "JSON, written by Jackson",
      "XML, written by JAXB",
      "Plain text, written by the servlet",
      "HTML, written by a template engine"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does @ResponseStatus(HttpStatus.NO_CONTENT) do on a handler?",
    "topic": "REST controllers & request mapping",
    "choices": [
      "Deletes the content of the database table",
      "Hides the body of the request from the logs",
      "Sets the status code of the response to 204",
      "Sets the status of a bean in the container"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why keep controllers thin?",
    "topic": "REST controllers & request mapping",
    "choices": [
      "Controllers cannot call any method of a service in Spring",
      "Thin controllers run faster than thick ones in every case",
      "They handle HTTP concerns, while services hold the business logic",
      "Business logic must be in the main class of the application, so controllers stay empty"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between @Controller and @RestController?",
    "topic": "REST controllers & request mapping",
    "choices": [
      "@RestController adds @ResponseBody, so values are written to the body",
      "@Controller adds @ResponseBody, so values are written to the body",
      "They are the same, and only the names differ",
      "@RestController can only return strings, while @Controller returns objects"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does @RequestBody do?",
    "topic": "Request/response bodies & DTOs",
    "choices": [
      "Reads the headers of the request into a map",
      "Writes the response object as JSON to the client",
      "Reads the path variables into the parameters of the method",
      "Converts the JSON of the request body into a Java object"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a DTO?",
    "topic": "Request/response bodies & DTOs",
    "choices": [
      "A database table object that is stored by the persistence layer in each transaction",
      "A data transfer object that carries data between layers or over the API",
      "A design tool object that draws the diagram of the classes",
      "A dynamic type object that is created by the compiler"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why not expose JPA entities directly in the API?",
    "topic": "Request/response bodies & DTOs",
    "choices": [
      "Entities cannot be converted to JSON by Jackson in any way",
      "The API shape would be tied to the database model, and sensitive fields may leak",
      "Entities are not allowed in controllers by the framework",
      "Entities are too small to carry all of the data of a response"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you map between entities and DTOs?",
    "topic": "Request/response bodies & DTOs",
    "choices": [
      "By calling a method that the JVM creates for each class",
      "By using the same class for both and hiding fields with comments",
      "By sending the entity to the database and reading it back",
      "By hand in a mapper class or with a library such as MapStruct"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Jackson do in a Spring Boot web application?",
    "topic": "Request/response bodies & DTOs",
    "choices": [
      "Converts between Java objects and JSON",
      "Connects the application to the database",
      "Handles the login of the users of the application",
      "Compresses the HTTP responses of the server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you exclude a field from the JSON output?",
    "topic": "Request/response bodies & DTOs",
    "choices": [
      "With @Hidden on the controller method",
      "With the private keyword on the class",
      "With @JsonIgnore on the field",
      "With a comment above the field"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a record offer as a DTO?",
    "topic": "Request/response bodies & DTOs",
    "choices": [
      "A mutable object that can be changed by every layer",
      "A class that can be used only inside the database layer and never in the API",
      "Immutable data with less boilerplate and supported by Jackson",
      "A type that cannot be serialised to JSON"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does ResponseEntity let you control?",
    "topic": "Request/response bodies & DTOs",
    "choices": [
      "The status code, the headers and the body of the response",
      "Only the body of the response and nothing else",
      "Only the name of the handler method that is used to process the request",
      "The database transaction of the request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you accept a request body with fields that may be missing?",
    "topic": "Request/response bodies & DTOs",
    "choices": [
      "Declare all fields as primitives so null can never occur",
      "Skip the DTO and read the raw string in every handler",
      "Use a map of objects and cast each value by hand",
      "Use wrapper types or Optional in the DTO and handle null values explicitly"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should DTOs have a clear separate type for creating and updating?",
    "topic": "Request/response bodies & DTOs",
    "choices": [
      "Spring requires a separate class for each HTTP method",
      "Different fields are required or allowed in each case, which avoids accidental changes",
      "It makes the JSON smaller in every case",
      "The compiler needs separate types to build the project"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which dependency adds bean validation to Spring Boot?",
    "topic": "Bean validation",
    "choices": [
      "spring-boot-starter-security, which adds the login and the password checks",
      "spring-boot-starter-validation",
      "spring-boot-starter-actuator",
      "spring-boot-starter-cache"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does @NotBlank check?",
    "topic": "Bean validation",
    "choices": [
      "The value is not null, but may be an empty string",
      "The number is not zero and not negative",
      "The collection is not empty",
      "The string is not null and has at least one non whitespace character"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you trigger validation of a request body in a controller?",
    "topic": "Bean validation",
    "choices": [
      "Add @Valid to the @RequestBody parameter",
      "Call the validate method of the controller class",
      "Add @Validate to the application class",
      "Write the rule in application.properties"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does @Size(min = 3, max = 20) check on a string?",
    "topic": "Bean validation",
    "choices": [
      "The value is between 3 and 20 as a number",
      "The string has exactly 20 characters",
      "The length is between 3 and 20 characters",
      "The string appears 3 times in the text"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What exception does Spring throw when a @Valid body fails validation?",
    "topic": "Bean validation",
    "choices": [
      "IllegalStateException",
      "NullPointerException",
      "MethodArgumentNotValidException",
      "HttpMessageNotWritableException"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which annotation validates an email address format?",
    "topic": "Bean validation",
    "choices": [
      "@Email",
      "@Mail",
      "@Address",
      "@Contact"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does @Min(1) on an int field check?",
    "topic": "Bean validation",
    "choices": [
      "The value must be exactly 1",
      "The value must be less than 1",
      "The field must have a minimum of one character",
      "The value must be at least 1"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you create a custom validation rule?",
    "topic": "Bean validation",
    "choices": [
      "Add an if statement to the application class",
      "Write an annotation and a ConstraintValidator class that implements the logic",
      "Override the toString method of the DTO",
      "Add a rule to the pom file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why validate on the server even if the front end validates?",
    "topic": "Bean validation",
    "choices": [
      "The browser removes all validation from the form data",
      "Clients can send anything, so the server must not trust them",
      "Spring validates only requests that come from servers",
      "Validation on the client is not possible in modern browsers, so the server does it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should an API return for a validation error?",
    "topic": "Bean validation",
    "choices": [
      "A 200 response with an empty body",
      "A 500 response with the stack trace",
      "A 302 redirect to the home page",
      "A 400 response with details about the invalid fields"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does @ControllerAdvice do?",
    "topic": "Exception handling with @ControllerAdvice",
    "choices": [
      "Defines global handling of exceptions and other cross cutting behaviour for controllers",
      "Adds a security check to every method of every class",
      "Marks a class as the controller of the main page",
      "Advises the compiler about the order of the controllers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which annotation marks a method that handles a specific exception type?",
    "topic": "Exception handling with @ControllerAdvice",
    "choices": [
      "@Catch",
      "@OnError, which is placed on the method that logs the failed requests",
      "@ExceptionHandler",
      "@Fault"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why centralise exception handling?",
    "topic": "Exception handling with @ControllerAdvice",
    "choices": [
      "Spring cannot handle exceptions inside controllers",
      "It makes the exceptions faster to throw",
      "All errors get a consistent response and the controllers stay free of try blocks",
      "Exceptions cannot be logged anywhere else"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What status should a handler return for a missing resource?",
    "topic": "Exception handling with @ControllerAdvice",
    "choices": [
      "404 Not Found",
      "400 Bad Request",
      "500 Internal Server Error",
      "204 No Content"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good body for an error response?",
    "topic": "Exception handling with @ControllerAdvice",
    "choices": [
      "The full stack trace of the exception that was thrown",
      "The SQL statement that failed in the database",
      "An empty string with a status of 200",
      "A small JSON object with a message, a code and a time, without internal details"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does ProblemDetail, or RFC 7807, define?",
    "topic": "Exception handling with @ControllerAdvice",
    "choices": [
      "A way to report problems to the Spring team",
      "A standard JSON format for HTTP API errors",
      "A tool for debugging the problems of the code",
      "A class that logs the problems to a file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to an unhandled exception in a controller method?",
    "topic": "Exception handling with @ControllerAdvice",
    "choices": [
      "The application stops and has to be restarted",
      "Spring Boot returns a generic 500 error response",
      "The exception is ignored and the response is empty",
      "The request is repeated until it succeeds"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does @ResponseStatus on an exception class do?",
    "topic": "Exception handling with @ControllerAdvice",
    "choices": [
      "It logs the status of the exception at each throw",
      "It marks the exception as checked by the compiler",
      "It changes the name of the exception in the logs",
      "It sets the HTTP status that is used when the exception is thrown"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can one handler method handle several exception types?",
    "topic": "Exception handling with @ControllerAdvice",
    "choices": [
      "List the types in the value of @ExceptionHandler",
      "Write the same method several times with different names",
      "Use a single catch block in the main class",
      "Declare the types in the pom file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why avoid returning exception messages from the database to API clients?",
    "topic": "Exception handling with @ControllerAdvice",
    "choices": [
      "The messages are in a language that the clients of the API cannot read or parse",
      "Messages from the database are always empty",
      "They can reveal table names, queries or other internal details",
      "Clients cannot show messages with special characters"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does @ConfigurationProperties(prefix = \"app\") do?",
    "topic": "Configuration properties",
    "choices": [
      "Creates a new profile with the name app",
      "Registers all of the beans that start with app",
      "Binds properties that start with app to the fields of a class",
      "Encrypts the properties that start with app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you enable binding of a configuration properties class?",
    "topic": "Configuration properties",
    "choices": [
      "Register it as a bean, or use @EnableConfigurationProperties or scanning",
      "Add the class name to the pom file",
      "Call a static method on it in the main class",
      "Write the class name in a text file of the resources"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a benefit of relaxed binding in Spring Boot?",
    "topic": "Configuration properties",
    "choices": [
      "Properties can be left empty and the application still starts",
      "Properties are validated at the time they are written",
      "All properties are encrypted before they are bound",
      "The property names can be written in several styles, such as kebab case or camel case"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you validate configuration properties at startup?",
    "topic": "Configuration properties",
    "choices": [
      "Write a test that reads the file once a week",
      "Add @Validated to the class and constraint annotations to its fields",
      "Call a method in the main class after the start",
      "Use a comment in the properties file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is an immutable properties class a good idea?",
    "topic": "Configuration properties",
    "choices": [
      "Immutable classes bind faster from the properties file than classes with setters",
      "Settings cannot be changed by accident while the application runs",
      "Spring cannot bind mutable classes at all",
      "It avoids the need for an application context"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the spring.config.import property allow?",
    "topic": "Configuration properties",
    "choices": [
      "Importing Java classes into the application context",
      "Importing the dependencies of the project",
      "Importing the profiles of another project",
      "Importing additional configuration files or sources"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you override a property with an environment variable?",
    "topic": "Configuration properties",
    "choices": [
      "Use the upper case name with underscores, such as SERVER_PORT",
      "Write the property name with spaces in the shell",
      "Add the variable to the pom of the project",
      "Rename the jar to the name of the variable"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What are the default values of configuration properties used for?",
    "topic": "Configuration properties",
    "choices": [
      "They replace all of the values that are set by the operator at startup of the app",
      "They are stored in the database at startup",
      "They keep the application running when a setting is not provided",
      "They are shown to the users of the application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good practice for a list of settings that belong together?",
    "topic": "Configuration properties",
    "choices": [
      "Define each setting in a separate bean",
      "Write all of them in the main class",
      "Group them in one properties class with a prefix instead of many @Value fields",
      "Read them from the system clock"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does the order of property sources matter?",
    "topic": "Configuration properties",
    "choices": [
      "A later source can override an earlier one, so the effective value depends on the order",
      "The order sets the order of the beans in the context",
      "Properties are read only from the first source in the list",
      "The order decides which file is deleted"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does OpenAPI describe?",
    "topic": "API documentation with OpenAPI",
    "choices": [
      "A way to open the application programming interface in a browser",
      "A Java library for connecting to databases",
      "A security protocol for API keys",
      "A standard, language independent description of an HTTP API"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which library is commonly used to generate OpenAPI documentation in Spring Boot?",
    "topic": "API documentation with OpenAPI",
    "choices": [
      "spring-boot-devtools",
      "springdoc-openapi",
      "spring-cloud-gateway",
      "jackson-databind"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where is the generated OpenAPI document usually available?",
    "topic": "API documentation with OpenAPI",
    "choices": [
      "In a file in the root folder of the repository that is created by the build",
      "At an endpoint such as /v3/api-docs, in JSON format",
      "In the logs of the application at startup",
      "In the pom file of the project"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Swagger UI provide?",
    "topic": "API documentation with OpenAPI",
    "choices": [
      "A tool that compiles the API into Java classes",
      "A database browser for the tables of the application and their rows",
      "A load testing tool for the endpoints",
      "A web page that shows the API and lets you try the calls"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What can annotations such as @Operation and @Schema add?",
    "topic": "API documentation with OpenAPI",
    "choices": [
      "Descriptions for the endpoints and the models in the documentation",
      "Security rules for the endpoints in the application",
      "Mappings of the endpoints to database tables",
      "Caching rules for the endpoints"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why keep API documentation generated from the code?",
    "topic": "API documentation with OpenAPI",
    "choices": [
      "Handwritten documentation is not allowed by Spring",
      "Generated documentation is faster to read than any other",
      "It stays closer to the real behaviour and is less likely to be out of date",
      "It removes the need for tests of the API"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a benefit of an OpenAPI file for clients?",
    "topic": "API documentation with OpenAPI",
    "choices": [
      "The client does not need to call the API any more once the file exists",
      "The server is compiled faster with it",
      "Client code and mocks can be generated from it",
      "The API becomes secure by publishing it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should the documentation say about errors?",
    "topic": "API documentation with OpenAPI",
    "choices": [
      "Which status codes and error bodies each endpoint can return",
      "Nothing, since errors are internal",
      "Only the stack trace that is returned",
      "Only the names of the exception classes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Should the API documentation endpoint be public in production?",
    "topic": "API documentation with OpenAPI",
    "choices": [
      "Always, since it has no effect on security",
      "Never, because it cannot be turned off",
      "Only on days when the system is not busy",
      "Only if it is meant to be public, since it exposes the structure of the API"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can API versions be shown in the documentation?",
    "topic": "API documentation with OpenAPI",
    "choices": [
      "Write the version in the title of the file only",
      "Group endpoints by version, for example with several groups or paths",
      "Use a different Java version for each endpoint",
      "Rename the controller classes by date"
    ],
    "answerIdx": 1
  }
]
```

LAYER: java-spring-6

```json
[
  {
    "stem": "What is a JPA entity?",
    "topic": "JPA entities & relationships",
    "choices": [
      "A class that creates the connections to the database for the whole application and shares them",
      "A class that stores the configuration of the database driver",
      "A class mapped to a database table, with each instance representing a row",
      "A class that translates SQL text into Java objects at startup"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which two annotations are the minimum for a simple entity?",
    "topic": "JPA entities & relationships",
    "choices": [
      "@Entity on the class and @Id on the key field",
      "@Table on the class and @Column on every field",
      "@Repository on the class and @Autowired on the key field",
      "@Component on the class and @Value on the key field"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does @GeneratedValue(strategy = GenerationType.IDENTITY) do?",
    "topic": "JPA entities & relationships",
    "choices": [
      "The application assigns the key by counting the existing objects of the class before it saves a new one",
      "The key is calculated from the hash code of the object",
      "The key is copied from the first field of the object",
      "The database assigns the key value, for example with an auto increment column"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does @Column(nullable = false, length = 100) express?",
    "topic": "JPA entities & relationships",
    "choices": [
      "The column can only hold the number 100 in each row",
      "The column cannot be null and has a maximum length of 100",
      "The column is hidden from queries that read the table",
      "The column is created only when the first row is stored, so its length is not checked before then"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does @OneToMany(mappedBy = \"author\") mean?",
    "topic": "JPA entities & relationships",
    "choices": [
      "The author field on this side stores the foreign key",
      "The author field on the other side owns the relationship",
      "The collection is saved in a separate table with the name author",
      "The relationship is loaded only when the author logs in"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which side of a one to many relationship usually holds the foreign key column?",
    "topic": "JPA entities & relationships",
    "choices": [
      "The one side",
      "A separate table that is always created by Hibernate",
      "Neither side, since keys are not stored in tables",
      "The many side"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does @ManyToMany require in the database?",
    "topic": "JPA entities & relationships",
    "choices": [
      "A join table that links the ids of both sides",
      "A single column with a comma separated list of ids",
      "Two foreign keys in the same row of one table",
      "A view that merges the two tables into one"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the default fetch type of @ManyToOne?",
    "topic": "JPA entities & relationships",
    "choices": [
      "LAZY, so the related entity is loaded on first access",
      "NONE, so the related entity is never loaded",
      "EAGER, so the related entity is loaded with the owner",
      "BATCH, so related entities are loaded in groups"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the default fetch type of @OneToMany?",
    "topic": "JPA entities & relationships",
    "choices": [
      "EAGER, so the collection is loaded together with the owner in the same query by default",
      "IMMEDIATE, so the collection is loaded at startup",
      "LAZY, so the collection is loaded when it is first used",
      "CACHED, so the collection is read from a file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does cascade = CascadeType.ALL do on a relationship?",
    "topic": "JPA entities & relationships",
    "choices": [
      "Operations on the parent, such as persist and remove, also apply to the children",
      "Every query on the parent also queries all of the other tables",
      "Every change is written to all of the tables of the database",
      "The parent is deleted whenever a child is read"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the persistence context?",
    "topic": "Hibernate & the persistence context",
    "choices": [
      "The file that stores the SQL statements of the application",
      "The pool of connections that is shared by the threads",
      "The list of the classes that are annotated with @Entity",
      "The set of entities that are managed by an EntityManager inside a transaction"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What states can a JPA entity be in?",
    "topic": "Hibernate & the persistence context",
    "choices": [
      "Open, closed, pending and failed",
      "Transient, managed, detached and removed",
      "Created, active, idle and deleted",
      "Local, remote, cached and archived, depending on where the entity is stored"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does dirty checking mean in Hibernate?",
    "topic": "Hibernate & the persistence context",
    "choices": [
      "Hibernate checks the database for invalid characters in the rows",
      "Changes to a managed entity are detected and written at flush time without an explicit save",
      "Hibernate removes entities that have not been used for some time",
      "Hibernate marks entities as dirty when they are read twice"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the first level cache?",
    "topic": "Hibernate & the persistence context",
    "choices": [
      "A cache shared by all of the applications on the machine",
      "A cache of the query results that is stored in a file",
      "A cache that Hibernate uses for the schema of the tables",
      "The cache of the persistence context, which holds entities within one session"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the N plus one select problem?",
    "topic": "Hibernate & the persistence context",
    "choices": [
      "One query loads a list and then one more query runs for each element to load a relation",
      "One query returns N rows and one extra row is added by Hibernate",
      "N queries are combined into a single query by the optimiser",
      "A query that runs N times faster after the first call"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can the N plus one problem be reduced?",
    "topic": "Hibernate & the persistence context",
    "choices": [
      "By adding more indexes to every column of every table",
      "By switching all of the relations to eager fetching in the entity classes of the project",
      "With a join fetch or an entity graph that loads the relation in the same query",
      "By increasing the size of the connection pool in the settings"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a LazyInitializationException?",
    "topic": "Hibernate & the persistence context",
    "choices": [
      "A lazy entity is created before the database is ready",
      "A lazy query takes too long and is cancelled by the driver",
      "A lazy relation is accessed after the session is closed",
      "A lazy loaded class cannot be found on the classpath"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between persist and merge?",
    "topic": "Hibernate & the persistence context",
    "choices": [
      "persist makes a new entity managed, merge copies the state of a detached one into a managed one",
      "merge makes a new entity managed, persist copies a detached one",
      "They are identical, and Spring chooses one at random",
      "persist deletes the entity and merge restores it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does flush do?",
    "topic": "Hibernate & the persistence context",
    "choices": [
      "Clears the first level cache and drops all of the entities that are managed in the context",
      "Deletes the tables of the entities in the context",
      "Closes the connection to the database",
      "Synchronises the pending changes of the context with the database"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why does open session in view cause debate?",
    "topic": "Hibernate & the persistence context",
    "choices": [
      "It closes the session before the transaction begins",
      "It keeps the session open during the view rendering, which can hide inefficient queries",
      "It makes the application use too few connections",
      "It prevents lazy loading from working at all"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a Spring Data repository?",
    "topic": "Spring Data repositories",
    "choices": [
      "A class that you write with SQL to access the database",
      "An interface that Spring implements to give you data access methods",
      "A configuration file for the data source",
      "A bean that manages the transactions of the application and commits them at the end of a request"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which interface gives CRUD methods in Spring Data JPA?",
    "topic": "Spring Data repositories",
    "choices": [
      "EntityManager, which Spring generates",
      "DataSource, which holds the connections",
      "TransactionManager, which runs commits",
      "JpaRepository, or CrudRepository"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does findById return in a Spring Data repository?",
    "topic": "Spring Data repositories",
    "choices": [
      "An Optional that is empty if no entity is found",
      "The entity itself, or null if no entity is found for the given id in the table",
      "A list with at most one element",
      "A stream of all matching rows"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does save do in JpaRepository?",
    "topic": "Spring Data repositories",
    "choices": [
      "Only inserts a new row, and fails with an error if an entity with that id already exists",
      "Only updates, and fails if the entity is new",
      "Inserts a new entity or updates an existing one",
      "Writes the entity to a file on the disk"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you get a page of results?",
    "topic": "Spring Data repositories",
    "choices": [
      "Call a method that returns all rows and slice them in code",
      "Use the limit keyword in the application properties",
      "Pass a Pageable argument and receive a Page object",
      "Run the query many times with an offset by hand"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a Pageable?",
    "topic": "Spring Data repositories",
    "choices": [
      "An object that holds the page number, size and sort order of a request",
      "A type of entity that is stored page by page",
      "A cache of the previous pages that were requested",
      "A view that is rendered by the template engine"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Page contain besides the content?",
    "topic": "Spring Data repositories",
    "choices": [
      "The SQL that was used to read the rows",
      "The names of the columns of the table",
      "The log of the transactions of the page",
      "The total elements, total pages and the paging information"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does deleteById do when the id does not exist?",
    "topic": "Spring Data repositories",
    "choices": [
      "It always deletes the first row of the table",
      "In recent Spring Data versions nothing happens, and in older ones an exception can be thrown",
      "It always throws a NullPointerException",
      "It creates a new row with that id"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the benefit of a repository interface over writing DAO classes by hand?",
    "topic": "Spring Data repositories",
    "choices": [
      "It makes queries run faster than hand written ones, since the framework tunes each statement",
      "Less boilerplate, since common methods are generated",
      "DAO classes are not allowed in Spring Boot",
      "The interface avoids the need for a database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a projection in Spring Data?",
    "topic": "Spring Data repositories",
    "choices": [
      "A copy of an entity that is stored in another table",
      "A diagram of the entities that is generated by a tool",
      "A tool that projects the data to a front end",
      "A way to read only some fields of an entity, as an interface or a record"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a derived query method?",
    "topic": "Derived & custom queries (JPQL)",
    "choices": [
      "A query that Spring builds from the method name, such as findByEmail",
      "A query that is copied from another repository",
      "A query that the database creates from its statistics",
      "A query that is stored in a text file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does findByLastNameAndAgeGreaterThan do?",
    "topic": "Derived & custom queries (JPQL)",
    "choices": [
      "Finds entities by last name or by age at random",
      "Finds the greatest last name in the table",
      "Finds entities by last name where the age is greater than the value",
      "Finds the age of the person with that last name"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the @Query annotation allow?",
    "topic": "Derived & custom queries (JPQL)",
    "choices": [
      "Marking a method as a query that is only used in the test environment of the project",
      "Creating a database view from the method name",
      "Writing your own JPQL or native SQL for a repository method",
      "Sending the query to a remote server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is JPQL?",
    "topic": "Derived & custom queries (JPQL)",
    "choices": [
      "A query language that works with entities and their fields, not tables",
      "A language for writing stored procedures that run inside of the database and return rows",
      "A format for storing queries in properties files",
      "A tool that converts SQL to Java code"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you pass a parameter to a @Query with a name?",
    "topic": "Derived & custom queries (JPQL)",
    "choices": [
      "Use the percent sign and the position of the argument, such as %1 for the first value",
      "Concatenate the value into the query string",
      "Write the value in the properties file",
      "Use :name in the query and @Param(\"name\") on the argument"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why prefer named parameters to string concatenation in queries?",
    "topic": "Derived & custom queries (JPQL)",
    "choices": [
      "They make the query shorter than other forms",
      "They prevent SQL injection and let the database reuse the plan",
      "Concatenation is not supported by the JVM",
      "They allow the query to run in parallel"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does @Modifying mean on a query method?",
    "topic": "Derived & custom queries (JPQL)",
    "choices": [
      "The query returns modified copies of the entities that are changed by the caller",
      "The query changes data, such as an update or a delete",
      "The query modifies the schema of the table",
      "The query can only be used by an administrator"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a native query?",
    "topic": "Derived & custom queries (JPQL)",
    "choices": [
      "A query that runs inside of the Java virtual machine only",
      "A query that is faster because it uses native threads",
      "A query that works only with the H2 database",
      "A query written in the SQL of the database, run as it is"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When might you use a native query?",
    "topic": "Derived & custom queries (JPQL)",
    "choices": [
      "For database specific features that JPQL cannot express",
      "Whenever you want a portable query that works the same way on all databases",
      "When you want Hibernate to build the query by itself",
      "When you want to avoid the use of parameters"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Specification help with?",
    "topic": "Derived & custom queries (JPQL)",
    "choices": [
      "Documenting the requirements of the application",
      "Defining the schema of the database tables",
      "Building dynamic queries with conditions that are combined at runtime",
      "Choosing the connection pool for the data source"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does @Transactional do on a service method?",
    "topic": "Transactions with @Transactional",
    "choices": [
      "Makes the method run on a separate thread",
      "Caches the result of the method in memory",
      "Runs the method in a transaction that commits at the end or rolls back on an exception",
      "Marks the method as a public endpoint"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When does Spring roll back a transaction by default?",
    "topic": "Transactions with @Transactional",
    "choices": [
      "On unchecked exceptions and errors",
      "On every exception, checked or unchecked",
      "Only when the method returns false",
      "Never, unless you call rollback by hand"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why might @Transactional not work on a method that is called from the same class?",
    "topic": "Transactions with @Transactional",
    "choices": [
      "The method is private by default in Spring",
      "Transactions work only in controllers",
      "The method is too small to start a transaction",
      "The proxy is bypassed on an internal call, so the advice does not run"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does propagation REQUIRES_NEW do?",
    "topic": "Transactions with @Transactional",
    "choices": [
      "Joins the current transaction and never starts another, so all work is committed together",
      "Suspends the current transaction and starts a new independent one",
      "Runs the method without any transaction at all",
      "Starts the transaction only if an exception happens"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does readOnly = true hint to the system?",
    "topic": "Transactions with @Transactional",
    "choices": [
      "The method cannot be called by any other method of the application while it runs",
      "The transaction does not write, which allows optimisations",
      "The result of the method is read from a file",
      "The database is locked for all users"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an isolation level?",
    "topic": "Transactions with @Transactional",
    "choices": [
      "It is the number of tables that a transaction can change",
      "It is the time a transaction can run before it is cancelled",
      "It is the list of users who may start a transaction",
      "It defines how far a transaction is protected from changes made by others"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a dirty read?",
    "topic": "Transactions with @Transactional",
    "choices": [
      "Reading data that another transaction has changed but not yet committed",
      "Reading data that has been deleted from the cache",
      "Reading a row that has invalid characters in it",
      "Reading data from a table that is not indexed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where should @Transactional normally be placed?",
    "topic": "Transactions with @Transactional",
    "choices": [
      "On every entity class of the model",
      "On the main class of the application, so that every method of every bean is covered",
      "On the service layer, where a use case is defined",
      "On the repository interfaces only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens to a lazy collection access after the transaction has ended?",
    "topic": "Transactions with @Transactional",
    "choices": [
      "It is loaded from the second level cache by default",
      "It returns an empty collection without an error",
      "It can throw LazyInitializationException, since the session is closed",
      "It restarts the transaction by itself"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why keep transactions short?",
    "topic": "Transactions with @Transactional",
    "choices": [
      "Long transactions hold locks and connections, which can block other work",
      "Short transactions are required by the JPA specification",
      "Long transactions are not supported by any database",
      "The connection pool closes the transaction after a second"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Flyway used for?",
    "topic": "Migrations with Flyway",
    "choices": [
      "Generating Java classes from the tables of the database",
      "Running load tests against the database",
      "Backing up the data of the database to a file",
      "Versioned migration of the database schema with scripts"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where does Flyway look for SQL migrations by default in Spring Boot?",
    "topic": "Migrations with Flyway",
    "choices": [
      "src/main/sql",
      "db/migration on the classpath",
      "config/database",
      "resources/flyway.txt, a text file that lists the scripts in the order of their execution"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How are Flyway migration files named?",
    "topic": "Migrations with Flyway",
    "choices": [
      "create_users_1.sql, with only the order of the script in the name of the file",
      "V1__create_users.sql, with a version and a description",
      "migration.sql with all changes in one file",
      "1_users.txt, with the date at the end"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should an applied migration never be edited?",
    "topic": "Migrations with Flyway",
    "choices": [
      "The file is read only on all systems",
      "Flyway deletes the file after it is applied",
      "The database cannot read a file twice",
      "Flyway checks checksums, and changing it would break the history on other databases"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the schema history table record?",
    "topic": "Migrations with Flyway",
    "choices": [
      "Which migrations have been applied, with their checksum and time",
      "The size of each table in the schema",
      "The list of users of the database",
      "The SQL queries run by the application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why use migrations instead of spring.jpa.hibernate.ddl-auto=update in production?",
    "topic": "Migrations with Flyway",
    "choices": [
      "ddl-auto=update is not supported by any database",
      "Migrations make the application start faster than ddl-auto",
      "Schema changes are explicit, reviewed and repeatable, while update can do unexpected things",
      "ddl-auto cannot create tables in production"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does ddl-auto=validate do?",
    "topic": "Migrations with Flyway",
    "choices": [
      "It creates all missing tables for the entities at startup",
      "It drops all tables and creates them again each time",
      "It checks that the schema matches the entities and fails if it does not",
      "It validates the data in the tables against the entities"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can Flyway be used for test data in development?",
    "topic": "Migrations with Flyway",
    "choices": [
      "With repeatable or extra migration locations for the dev profile",
      "By editing the production migrations before each run so that test rows are included",
      "By adding the data to the pom file",
      "By creating a bean that inserts rows at each request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a repeatable migration, named with R__, do?",
    "topic": "Migrations with Flyway",
    "choices": [
      "It runs on every start of the application regardless",
      "It runs only once and then is deleted",
      "It runs before every versioned migration in the same order",
      "It runs again whenever its checksum changes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should be done when a migration fails halfway?",
    "topic": "Migrations with Flyway",
    "choices": [
      "Delete the schema history table and start from scratch",
      "Fix the problem, repair the history if needed and apply the migration again",
      "Edit the checksum in the table by hand",
      "Ignore the failure and continue with the next migration"
    ],
    "answerIdx": 1
  }
]
```

LAYER: java-spring-7

```json
[
  {
    "stem": "What does Spring Security add to a Spring Boot application by default when it is on the classpath?",
    "topic": "Spring Security architecture",
    "choices": [
      "A new database that stores the passwords of the users in plain text",
      "A firewall in front of the server that blocks every request that comes from outside of the network",
      "A filter chain that protects all endpoints and a generated login for development",
      "A tool that scans the source code for security problems at startup"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the SecurityFilterChain?",
    "topic": "Spring Security architecture",
    "choices": [
      "An ordered list of servlet filters that handle security for requests",
      "A chain of beans that are created for each single user of the application at login",
      "A list of database connections that are used for logins",
      "A sequence of tests that run before the application starts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How is a SecurityFilterChain defined in modern Spring Security?",
    "topic": "Spring Security architecture",
    "choices": [
      "By extending the class WebSecurityConfigurerAdapter and overriding methods",
      "By writing the rules in the application.properties file only",
      "By adding XML configuration files to the resources folder",
      "As a @Bean method that receives HttpSecurity and returns the built chain"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the DelegatingFilterProxy do?",
    "topic": "Spring Security architecture",
    "choices": [
      "It forwards requests to another server of the cluster",
      "It lets the servlet container hand requests to Spring managed filter beans",
      "It stores the sessions of users in a shared cache",
      "It proxies database calls to a replica of the database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the SecurityContext?",
    "topic": "Spring Security architecture",
    "choices": [
      "It holds the roles of all of the users that have ever logged in to the application",
      "It holds the authentication of the current user for the current thread",
      "It holds the configuration of all the security filters",
      "It holds the keys that are used to sign the tokens"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the SecurityContextHolder used for?",
    "topic": "Spring Security architecture",
    "choices": [
      "Storing the password of the administrator of the application",
      "Holding the list of users that are online",
      "Creating new users in the database at runtime",
      "Accessing the SecurityContext of the current request"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens to a request that is not authenticated for a protected path?",
    "topic": "Spring Security architecture",
    "choices": [
      "The filter chain rejects it, for example with 401 or a redirect to a login page",
      "It is passed to the controller, which checks the user",
      "It is logged and then served as a normal request",
      "It is queued until the user logs in"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does csrf().disable() do, in older style configuration?",
    "topic": "Spring Security architecture",
    "choices": [
      "It makes the application faster by removing the session",
      "It turns off all authentication for the whole application",
      "It turns off CSRF protection, which is only acceptable for stateless APIs with tokens",
      "It encrypts the cookies of the users"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does the order of the filters matter?",
    "topic": "Spring Security architecture",
    "choices": [
      "Filters run in parallel, so the order only affects speed",
      "The order is chosen by the JVM at random on each start",
      "Each filter can stop or change the request, so authentication must run before authorization",
      "Only the last filter in the chain can reject a request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the authorizeHttpRequests configuration define?",
    "topic": "Spring Security architecture",
    "choices": [
      "Which requests need which authentication or authority",
      "Which servers the application may call",
      "Which database tables the user may read",
      "Which classes may be loaded by the classloader of the application server at startup"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an AuthenticationManager?",
    "topic": "Authentication & user details",
    "choices": [
      "It creates new users when they register",
      "It renders the login page of the application and shows the errors of failed attempts",
      "It logs out all users at midnight",
      "It decides whether a given set of credentials is valid"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a UserDetailsService?",
    "topic": "Authentication & user details",
    "choices": [
      "A service that sends messages to the users of the application when they sign in",
      "A service that loads the user data by username for authentication",
      "A service that exports user data to a file",
      "A service that counts the users that are logged in"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the UserDetails interface describe?",
    "topic": "Authentication & user details",
    "choices": [
      "The address and phone number of the user",
      "The username, password, authorities and the state of an account",
      "The session that the user has in the browser",
      "The browser that the user uses to log in"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a GrantedAuthority?",
    "topic": "Authentication & user details",
    "choices": [
      "A server that grants tokens to clients",
      "A file that lists the users who may log in",
      "A class that checks the validity of a password",
      "A permission or role that is given to a user, such as ROLE_ADMIN"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the PasswordEncoder interface for?",
    "topic": "Authentication & user details",
    "choices": [
      "Hashing passwords and checking them against stored hashes",
      "Encrypting the whole database with one key",
      "Encoding the url of the login page",
      "Compressing passwords before they are stored so that they use less space in the table"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which PasswordEncoder is the usual default recommendation?",
    "topic": "Authentication & user details",
    "choices": [
      "NoOpPasswordEncoder, which stores plain text",
      "Md5PasswordEncoder, which uses a fast hash",
      "BCryptPasswordEncoder, or the delegating encoder that uses a modern default",
      "Base64PasswordEncoder, which encodes passwords"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the role of the DaoAuthenticationProvider?",
    "topic": "Authentication & user details",
    "choices": [
      "It reads all data directly from the data access objects of the application",
      "It provides the database connections to the application",
      "It checks credentials using a UserDetailsService and a PasswordEncoder",
      "It creates authentication tokens for other applications"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should login failures return the same message for a wrong user and a wrong password?",
    "topic": "Authentication & user details",
    "choices": [
      "A different message would reveal which usernames exist",
      "Spring throws only one type of exception for both cases",
      "The two cases are the same for the database",
      "Messages with two texts are not allowed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does an in memory user store do, and when is it suitable?",
    "topic": "Authentication & user details",
    "choices": [
      "It stores users in the memory of the browser for each session and removes them at logout",
      "It caches all of the users of the database for speed",
      "It encrypts the users before they are saved to disk",
      "It keeps users in memory for demos and tests, and not for production"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the formLogin configuration enable?",
    "topic": "Authentication & user details",
    "choices": [
      "Login with a token in the authorization header",
      "A login page and processing of form based logins with a session",
      "Login with a certificate of the client",
      "Login with an account of another provider"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a JSON Web Token?",
    "topic": "JWT-based stateless auth",
    "choices": [
      "An encrypted file that stores the password of the user for later logins",
      "A signed token that carries claims about a user and can be verified by the server",
      "A cookie that the browser creates on its own after the user has logged in to the site",
      "A database record that the server uses to keep track of open sessions"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What are the three parts of a JWT?",
    "topic": "JWT-based stateless auth",
    "choices": [
      "Key, value and hash, joined by dots in a fixed order",
      "Header, body and footer, as in an email message layout",
      "Token, secret and salt, as used for password storage",
      "Header, payload and signature"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Is the payload of a normal signed JWT encrypted?",
    "topic": "JWT-based stateless auth",
    "choices": [
      "No, it is only encoded, so anyone can read it",
      "Yes, only the server that issued it is able to read the claims",
      "Yes, but the signature part stays visible to every client",
      "It depends on which browser the user has when the token is read"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should you not put a password in a JWT payload?",
    "topic": "JWT-based stateless auth",
    "choices": [
      "The payload is too small to hold a password in a valid token",
      "Passwords inside a payload make the signature of the token invalid",
      "Anyone holding the token can decode and read the payload",
      "Browsers refuse to send tokens that contain a password to servers"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the server do to verify a JWT?",
    "topic": "JWT-based stateless auth",
    "choices": [
      "Look the token up by its text in the users collection of the database on each request",
      "Decrypt the payload using the password that the user has chosen",
      "Check the signature with the secret or public key, and check the expiry",
      "Ask the browser to confirm that the token is the one it was given"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why do access tokens usually have a short lifetime?",
    "topic": "JWT-based stateless auth",
    "choices": [
      "A stolen token stops working soon",
      "Short tokens are smaller to send",
      "The signature cannot be checked after an hour",
      "Browsers delete long tokens"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of a refresh token?",
    "topic": "JWT-based stateless auth",
    "choices": [
      "To store the password of the user safely on the server side",
      "To sign the access token before it is sent to the browser",
      "To replace the secret key of the server when it expires",
      "To get a new access token without logging in again"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should refresh tokens be stored and revocable on the server side?",
    "topic": "JWT-based stateless auth",
    "choices": [
      "So that the server is able to read the password of the user again later",
      "So a stolen or logged out token can be rejected before it expires",
      "So that the token never expires and the user stays logged in forever",
      "So that the browser is allowed to skip the check of the token signature"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which claim sets when a JWT stops being valid?",
    "topic": "JWT-based stateless auth",
    "choices": [
      "iat",
      "exp",
      "sub",
      "iss"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens if the signing secret of your JWT is leaked?",
    "topic": "JWT-based stateless auth",
    "choices": [
      "Nothing happens, because the payload of every token is encrypted anyway",
      "Only the tokens that were issued a long time ago stop working for users",
      "The tokens that the server issues from then on become much longer",
      "Anyone can forge valid tokens, so the secret must be rotated"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does hasRole(\"ADMIN\") check?",
    "topic": "Method & URL authorization",
    "choices": [
      "The user has the authority ROLE_ADMIN",
      "The user name is ADMIN",
      "The user was created by an administrator",
      "The user has logged in from the admin network"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between hasRole and hasAuthority?",
    "topic": "Method & URL authorization",
    "choices": [
      "hasAuthority adds the ROLE_ prefix, while hasRole matches the exact string",
      "They are the same, and only the names differ",
      "hasRole adds the ROLE_ prefix, while hasAuthority matches the exact string",
      "hasRole is for methods and hasAuthority is for urls"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the matcher requestMatchers(\"/admin/**\").hasRole(\"ADMIN\") do?",
    "topic": "Method & URL authorization",
    "choices": [
      "Allows every user to read the paths below /admin",
      "Blocks all requests to the /admin path for everyone",
      "Requires the admin role for all paths below /admin",
      "Redirects the requests to the home page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does @PreAuthorize do?",
    "topic": "Method & URL authorization",
    "choices": [
      "Checks an expression before the method runs, such as the role of the user",
      "Authorizes the user after the method has finished",
      "Loads the user from the database before the call",
      "Encrypts the arguments of the method"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What must you enable to use @PreAuthorize?",
    "topic": "Method & URL authorization",
    "choices": [
      "The actuator endpoints of the application",
      "The embedded server of the application",
      "The caching support of Spring",
      "Method security, with @EnableMethodSecurity on a configuration class"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why combine URL rules and method security?",
    "topic": "Method & URL authorization",
    "choices": [
      "Method security is faster than URL rules in every case",
      "Defence in depth, since a missing rule in one place is covered by the other",
      "URL rules cannot protect any endpoint in a REST API",
      "Spring requires both for the application to start"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the expression #id == authentication.principal.id check in a @PreAuthorize?",
    "topic": "Method & URL authorization",
    "choices": [
      "The id of the user was created before the method call",
      "The id argument of the method equals the id of the current user",
      "The method has an argument named id and nothing else",
      "The user has a principal with the same name as the method that is being called"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does @PostAuthorize allow?",
    "topic": "Method & URL authorization",
    "choices": [
      "Running the method after the user has logged out",
      "Creating a user after a method has returned",
      "Authorizing a request after a timeout",
      "Checking the returned object, such as whether it belongs to the user"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the order of rules in authorizeHttpRequests?",
    "topic": "Method & URL authorization",
    "choices": [
      "The first matching rule wins, so specific rules must come before general ones",
      "The last matching rule wins, so general rules come first",
      "All of the matching rules are combined with an and operator",
      "The order is random and chosen by the framework"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should be the last rule in the list for secure defaults?",
    "topic": "Method & URL authorization",
    "choices": [
      "anyRequest().permitAll(), so that nothing is blocked by mistake while the app is built",
      "No rule, since Spring protects unknown paths already",
      "anyRequest().authenticated() or denyAll, so unknown paths are not open",
      "A rule that allows all methods for administrators"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What problem does OAuth 2.0 solve?",
    "topic": "OAuth2 & resource servers",
    "choices": [
      "It stores the passwords of users in an encrypted database for the app",
      "It proves the identity of a user to the app with a digital certificate",
      "It lets an app get limited access to a user account at another service without the password",
      "It encrypts the traffic between the browser and the app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which roles take part in the authorization code flow?",
    "topic": "OAuth2 & resource servers",
    "choices": [
      "The user, the client app, the authorization server and the resource server",
      "The user, the browser and the database only",
      "The client, the router and the firewall",
      "The developer, the tester and the product owner"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is the authorization code flow with PKCE recommended for public clients such as single page apps?",
    "topic": "OAuth2 & resource servers",
    "choices": [
      "It removes the need for a login page at the provider",
      "It makes the access token never expire",
      "It lets the client keep a secret in the source code",
      "It stops a stolen code from being exchanged for tokens without the secret verifier"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the scope of an access token describe?",
    "topic": "OAuth2 & resource servers",
    "choices": [
      "The time at which the token expires",
      "The permissions that the token grants, such as read access to a profile",
      "The network from which the token can be used",
      "The name of the app that wants the token"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why was the implicit grant removed from current best practice?",
    "topic": "OAuth2 & resource servers",
    "choices": [
      "It was too slow for modern browsers",
      "Tokens were returned in the url, which exposed them in history, logs and referrers",
      "It needed a secret that clients could not keep",
      "It only worked for desktop apps"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the client credentials grant used for?",
    "topic": "OAuth2 & resource servers",
    "choices": [
      "A user signing in with a social account on a phone, which opens a consent screen",
      "A user resetting a password by email",
      "A browser app that has no backend",
      "A service that calls an API as itself, with no user involved"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the state parameter protect against?",
    "topic": "OAuth2 & resource servers",
    "choices": [
      "Cross site request forgery on the redirect back to the client",
      "Theft of the refresh token from the database",
      "Brute force attempts on the login form",
      "Replay of expired passwords"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should a client check on the redirect uri?",
    "topic": "OAuth2 & resource servers",
    "choices": [
      "It must be shorter than 255 characters",
      "It must use a well known top level domain",
      "It must match exactly a value registered for the client, which stops code theft",
      "It can be any address that the user types"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why keep access tokens short lived and use refresh tokens?",
    "topic": "OAuth2 & resource servers",
    "choices": [
      "Refresh tokens are faster to verify than access tokens",
      "Access tokens cannot be stored in memory",
      "A leaked access token is useful for a short time, and the refresh token is protected more strongly",
      "Refresh tokens never need to be revoked"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should a confidential backend client keep its client secret?",
    "topic": "OAuth2 & resource servers",
    "choices": [
      "In a secret store or an environment variable on the server, never in client code",
      "In the url of the redirect after sign in",
      "In the local storage of the browser of each user",
      "In a public repository next to the code"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should passwords be hashed before being stored?",
    "topic": "Password encoding & CSRF",
    "choices": [
      "So the stored passwords take up less space in the users collection",
      "So users can read their passwords back after they have forgotten them",
      "So the server can include the password in the emails it sends out",
      "So a database leak does not reveal the real passwords"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is bcrypt preferred over a plain fast hash like SHA 256 for passwords?",
    "topic": "Password encoding & CSRF",
    "choices": [
      "It produces a shorter hash that takes up less space in the users collection",
      "It is deliberately slow and tunable, which makes guessing attacks costly",
      "It encrypts the password in a way that can be decrypted later by the server",
      "It does not need any random data, so the same input is always hashed alike"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a salt?",
    "topic": "Password encoding & CSRF",
    "choices": [
      "A secret key that is stored only in the browser of the user who signs up",
      "A random value added to each password so equal passwords hash differently",
      "A second password that the user must remember and enter after the first one",
      "A list of banned passwords that the server checks before it saves a new user"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the cost factor in bcrypt control?",
    "topic": "Password encoding & CSRF",
    "choices": [
      "How long the password that the user chooses is allowed to be at most",
      "How many users are allowed to log in at the same moment on the server",
      "The size of the database column that holds the stored hash of the password",
      "How much work each hash takes, which slows attackers down"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you check a login password against the stored bcrypt hash?",
    "topic": "Password encoding & CSRF",
    "choices": [
      "Use bcrypt.compare with the plain password and the stored hash",
      "Hash the password again with bcrypt.hash and compare strings directly",
      "Decrypt the stored hash and compare the result",
      "Send the hash to the browser to compare"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is cross site request forgery, or CSRF?",
    "topic": "Password encoding & CSRF",
    "choices": [
      "An attack that reads the cookies of a user with a script that runs on the page",
      "An attack that guesses session identifiers by trying many values",
      "A site makes the browser of a signed in user send a request the user did not intend",
      "An attack that copies the database of a website over the network"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does CSRF work against cookie based sessions?",
    "topic": "Password encoding & CSRF",
    "choices": [
      "Cookies are always sent in plain text over every kind of network",
      "Cookies can be read by any other website that the user visits",
      "Browsers attach cookies automatically to requests to the site, whichever page started them",
      "Servers cannot tell which user sent a request with a cookie"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which request types are the main target of CSRF?",
    "topic": "Password encoding & CSRF",
    "choices": [
      "State changing requests such as a transfer or a password change",
      "Requests for public images and stylesheets",
      "Requests that load the home page of a site",
      "Requests that check whether the server is alive"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a CSRF token do?",
    "topic": "Password encoding & CSRF",
    "choices": [
      "It encrypts the session cookie of the user",
      "It limits the number of requests that a user may send",
      "It proves that the user has a strong password",
      "It is a secret value that the page must send back, which a forged request cannot know"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the SameSite cookie attribute do?",
    "topic": "Password encoding & CSRF",
    "choices": [
      "It makes the cookie visible to every subdomain of the site",
      "It controls whether the cookie is sent on cross site requests, which reduces CSRF",
      "It encrypts the cookie value with a key of the server",
      "It removes the cookie when the tab is closed"
    ],
    "answerIdx": 1
  }
]
```

LAYER: java-spring-8

```json
[
  {
    "stem": "Which annotation marks a method as a test in JUnit 5?",
    "topic": "JUnit 5 fundamentals",
    "choices": [
      "@Test from junit.framework, which is the annotation of the old JUnit 3 style tests",
      "@Check on the method name",
      "@Test from org.junit.jupiter.api",
      "@Run on the test class"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does @BeforeEach do?",
    "topic": "JUnit 5 fundamentals",
    "choices": [
      "Runs before each test method, so each test starts in a known state",
      "Runs once before all of the tests of the class",
      "Runs before the application context is created",
      "Runs before the compiler builds the test class"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does @BeforeAll require in a default test class lifecycle?",
    "topic": "JUnit 5 fundamentals",
    "choices": [
      "The method must be private",
      "The method must return a value",
      "The method must be synchronized",
      "The method must be static"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which assertion checks that two values are equal?",
    "topic": "JUnit 5 fundamentals",
    "choices": [
      "assertSame(expected, actual)",
      "assertEquals(expected, actual)",
      "assertTrue(expected, actual)",
      "assertCompare(expected, actual)"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you check that code throws an exception?",
    "topic": "JUnit 5 fundamentals",
    "choices": [
      "try and catch with a fail call after the code",
      "assertThrows(Exception.class, () -> code)",
      "@Test(expected = Exception.class) in JUnit 5",
      "assertError(code)"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does @ParameterizedTest do?",
    "topic": "JUnit 5 fundamentals",
    "choices": [
      "Passes the test class as a parameter to the runner",
      "Creates a test with random names",
      "Skips the test when no parameters are given",
      "Runs the same test with several sets of arguments"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does @Disabled do?",
    "topic": "JUnit 5 fundamentals",
    "choices": [
      "Skips the test or the class during the run",
      "Deletes the test from the project",
      "Runs the test on a different thread so that it does not block the other tests",
      "Marks the test as failed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good property of a unit test?",
    "topic": "JUnit 5 fundamentals",
    "choices": [
      "It depends on the order of other tests to set up the data that it needs",
      "It uses the production database for realistic results",
      "It is fast, independent and has one clear reason to fail",
      "It checks as many unrelated things as possible"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does @DisplayName provide?",
    "topic": "JUnit 5 fundamentals",
    "choices": [
      "A name for the class loader",
      "A title for the application window",
      "A readable name for the test in the report",
      "A label for the log file of the build that lists the failed tests"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the arrange, act, assert pattern?",
    "topic": "JUnit 5 fundamentals",
    "choices": [
      "Set up the data, call the code, then check the result",
      "Create the project, build it, then deploy it",
      "Plan the test, write the code, then delete the test when it has passed",
      "Mock the class, call the mock, then verify it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a mock in a test?",
    "topic": "Mocking with Mockito",
    "choices": [
      "A copy of the production database for testing",
      "A tool that generates the data for the tests",
      "A class that runs the tests in parallel",
      "A fake object that replaces a dependency and records how it is used"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you create a mock with Mockito in a JUnit 5 test?",
    "topic": "Mocking with Mockito",
    "choices": [
      "With new Mock() from the standard library",
      "With @Mock and the Mockito extension, or Mockito.mock",
      "With @Bean on a method in the test class",
      "With a call to the constructor of the real class that is wrapped by a proxy"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you define what a mock returns?",
    "topic": "Mocking with Mockito",
    "choices": [
      "mock.method().returns(value)",
      "when(mock.method()).thenReturn(value)",
      "mock.set(method, value)",
      "return(value) inside the mock, written as the first statement of the test"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does verify(mock).save(entity) check?",
    "topic": "Mocking with Mockito",
    "choices": [
      "That the entity was saved in the database",
      "That the mock was created before the test",
      "That the method returns the entity",
      "That the save method was called on the mock with that argument"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between a mock and a spy?",
    "topic": "Mocking with Mockito",
    "choices": [
      "A spy wraps a real object and calls real methods unless they are stubbed",
      "A mock wraps a real object and calls real methods unless they are stubbed",
      "A spy is created only for interfaces",
      "A mock can only be used with static methods"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does @InjectMocks do?",
    "topic": "Mocking with Mockito",
    "choices": [
      "Injects mocks into every bean of the whole application context at startup",
      "Creates a mock of the object under test",
      "Creates the object under test and injects the mocks into it",
      "Injects the real beans into all mocks"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does an ArgumentCaptor allow?",
    "topic": "Mocking with Mockito",
    "choices": [
      "Capturing the exceptions that the mock throws",
      "Capturing the log lines of the test",
      "Capturing the arguments that were passed to a mock for assertions",
      "Capturing the screen output of the console"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why avoid mocking everything?",
    "topic": "Mocking with Mockito",
    "choices": [
      "Tests become tied to the implementation and may not find real problems",
      "Mockito cannot create more than ten mocks",
      "Mocks slow down the compiler a lot",
      "Mocks are not allowed in the service layer"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When is mocking a dependency most useful?",
    "topic": "Mocking with Mockito",
    "choices": [
      "When the dependency is a simple value object",
      "When the dependency is the class under test",
      "When you want to test the real database",
      "When the dependency is slow, outside of your control or hard to set up"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does thenThrow let you test?",
    "topic": "Mocking with Mockito",
    "choices": [
      "How fast the mock reacts to a call",
      "How the code reacts to a failing dependency",
      "How the mock is created by the framework when the test class is loaded",
      "How the stack trace looks in the report"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does @SpringBootTest do?",
    "topic": "@SpringBootTest & slices",
    "choices": [
      "Runs only the tests of the main class of the application and skips the others",
      "Starts the application context so you can test with real beans",
      "Starts a mock of the application on a different port",
      "Compiles the tests into the jar of the application"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a test slice?",
    "topic": "@SpringBootTest & slices",
    "choices": [
      "A part of a test that is run on a separate thread",
      "A copy of the test database with a few rows",
      "A group of tests that are run once a week",
      "A test that loads only the part of the context for a layer, such as web or data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does @WebMvcTest load?",
    "topic": "@SpringBootTest & slices",
    "choices": [
      "The web layer, such as controllers and filters, without services",
      "The whole application with all of its beans",
      "Only the repositories and the database",
      "Only the security configuration of the application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does @DataJpaTest load?",
    "topic": "@SpringBootTest & slices",
    "choices": [
      "All of the controllers and a real server",
      "The security and the messaging configuration",
      "JPA components and an embedded database, with transactions rolled back after each test",
      "Only the main class of the application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why prefer slices to @SpringBootTest for many tests?",
    "topic": "@SpringBootTest & slices",
    "choices": [
      "They test more of the application than a full test",
      "They need no dependencies in the pom",
      "They start faster and focus on one layer",
      "They run in production mode"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does @MockBean, or @MockitoBean in newer versions, do?",
    "topic": "@SpringBootTest & slices",
    "choices": [
      "Replaces a bean in the context with a mock",
      "Creates a bean that exists only in production",
      "Marks a bean that cannot be mocked",
      "Removes the bean from the context for all tests"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does @ActiveProfiles(\"test\") do?",
    "topic": "@SpringBootTest & slices",
    "choices": [
      "Sets the profile of the production server",
      "Creates a profile that is used by all of the tests only",
      "Disables all profiles in the application",
      "Activates the test profile for the context of the test"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does @DirtiesContext do?",
    "topic": "@SpringBootTest & slices",
    "choices": [
      "Deletes the context and the test class",
      "Marks the context as dirty so that it is recreated for the next test",
      "Dirties the database so tests can fail",
      "Marks tests that need a cleanup of the files"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does Spring cache application contexts between tests?",
    "topic": "@SpringBootTest & slices",
    "choices": [
      "Each test class always starts a new context",
      "Contexts with the same configuration are reused, which speeds up a test run",
      "Contexts are stored in the database",
      "Contexts are cached only on continuous integration servers"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a downside of many different test configurations?",
    "topic": "@SpringBootTest & slices",
    "choices": [
      "The tests cannot run on the same machine",
      "The compiler refuses to build the tests",
      "The tests lose their annotations",
      "Many contexts are created, which slows the test run down"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does MockMvc let you do?",
    "topic": "MockMvc for controller tests",
    "choices": [
      "Call controllers through the Spring MVC stack without starting a real server",
      "Mock the database connection of the application",
      "Create mock views for the templates",
      "Send requests to a remote server from a test"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you perform a GET request with MockMvc?",
    "topic": "MockMvc for controller tests",
    "choices": [
      "mockMvc.get(\"/users\").run()",
      "new Request(\"/users\").send(), which sends a real call to a running server",
      "mockMvc.perform(get(\"/users\"))",
      "mockMvc.call(GET, \"/users\")"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you check the status code in a MockMvc test?",
    "topic": "MockMvc for controller tests",
    "choices": [
      "assertStatus(200) on the mock",
      "check(status == 200)",
      "andExpect(status().isOk())",
      "verify(status().ok)"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you check a JSON field in the response?",
    "topic": "MockMvc for controller tests",
    "choices": [
      "andExpect(jsonPath(\"$.name\").value(\"Anna\"))",
      "andExpect(field(\"name\") == \"Anna\")",
      "assertEquals(response.name, \"Anna\"), which reads a field of the response object",
      "andExpect(xpath(\"/name\"))"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you send a JSON body in a MockMvc test?",
    "topic": "MockMvc for controller tests",
    "choices": [
      "post(...).body(object)",
      "post(...).json(object, true)",
      "post(...).data(map)",
      "post(...).contentType(APPLICATION_JSON).content(json)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What do you usually mock in a @WebMvcTest of a controller?",
    "topic": "MockMvc for controller tests",
    "choices": [
      "The controller itself",
      "The service that the controller calls",
      "The servlet container",
      "The Java compiler"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you test a secured endpoint with MockMvc?",
    "topic": "MockMvc for controller tests",
    "choices": [
      "Disable the whole security configuration for all tests",
      "Use annotations such as @WithMockUser or a request post processor",
      "Call the endpoint with a real password from the console",
      "Remove the security rules from the controller"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does andDo(print()) show?",
    "topic": "MockMvc for controller tests",
    "choices": [
      "The memory use of the test run",
      "The SQL of the test database",
      "The names of the beans in the context",
      "The request and the response details in the console"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a controller test verify?",
    "topic": "MockMvc for controller tests",
    "choices": [
      "Status, body, headers and validation behaviour of the endpoint",
      "The internal fields of the controller class",
      "The version of the framework",
      "The size of the response in bytes only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does WebTestClient offer compared with MockMvc?",
    "topic": "MockMvc for controller tests",
    "choices": [
      "A way to mock the browser for the page tests",
      "A tool for generating the requests of a test from a file with examples",
      "A fluent client for reactive and real server tests",
      "A test runner for the database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is Testcontainers?",
    "topic": "Integration tests with Testcontainers",
    "choices": [
      "A tool that packs tests into a container image",
      "A test framework for container orchestration only",
      "A library that starts real services, such as databases, in Docker containers for tests",
      "A cloud service that runs the tests of a team"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use Testcontainers instead of an in memory database?",
    "topic": "Integration tests with Testcontainers",
    "choices": [
      "Tests run against the same type of database as production",
      "In memory databases cannot be used in Java",
      "Containers are always faster than in memory databases in every test run",
      "It removes the need for any SQL in the tests"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is needed on the machine to run Testcontainers tests?",
    "topic": "Integration tests with Testcontainers",
    "choices": [
      "A cloud account with a container registry",
      "A separate database server installed by hand",
      "A Kubernetes cluster",
      "A running Docker environment"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which annotation starts and stops a container for a JUnit 5 test class?",
    "topic": "Integration tests with Testcontainers",
    "choices": [
      "@Container on the test method only, which starts the container for each call",
      "@Testcontainers with @Container fields",
      "@Docker on the class",
      "@Start on the class"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can the dynamic port of the container be passed to Spring?",
    "topic": "Integration tests with Testcontainers",
    "choices": [
      "By hard coding the port number in the properties file of the test",
      "With @DynamicPropertySource or a service connection",
      "By editing the docker file of the project",
      "By reading the port from the pom file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a reusable container setting help with?",
    "topic": "Integration tests with Testcontainers",
    "choices": [
      "A cleaner database for each test of the suite",
      "A smaller image of the application",
      "More secure test data",
      "Faster test runs, since the container is kept between runs on a developer machine"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a drawback of integration tests with real containers?",
    "topic": "Integration tests with Testcontainers",
    "choices": [
      "They are slower and need more resources than unit tests",
      "They cannot find problems with queries",
      "They need the production database",
      "They work only in the cloud"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can tests stay independent when they share one database container?",
    "topic": "Integration tests with Testcontainers",
    "choices": [
      "Run each test with a different version of the database",
      "Use the same test data in every test file",
      "Clean the data between tests or use transactions that roll back",
      "Never run the tests in parallel again"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the @ServiceConnection annotation do in recent Spring Boot versions?",
    "topic": "Integration tests with Testcontainers",
    "choices": [
      "Connects the service to a remote repository",
      "Opens a connection between two beans",
      "Configures the connection properties from a container automatically",
      "Creates a service for the test class"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What kind of test benefits most from Testcontainers?",
    "topic": "Integration tests with Testcontainers",
    "choices": [
      "Repository and migration tests that need a real database",
      "Tests of a pure function with no dependencies",
      "Tests of the formatting of strings",
      "Tests of simple getters and setters"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does code coverage measure?",
    "topic": "Test coverage & CI",
    "choices": [
      "The share of tests that passed in the last run of the pipeline",
      "The number of bugs that the tests found in the last month of work",
      "The speed of the tests compared with the speed of the application",
      "The share of code lines or branches that run during the tests"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Does 100 percent coverage prove the code is correct?",
    "topic": "Test coverage & CI",
    "choices": [
      "Yes, because every line has been run and so every bug has been found",
      "No, it shows code ran, not that the assertions checked the right behaviour",
      "Yes, but only when branch coverage and line coverage are both full",
      "No, because coverage reports are generated before the tests are finished running"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which Jest option collects coverage?",
    "topic": "Test coverage & CI",
    "choices": [
      "--report",
      "--coverage",
      "--measure",
      "--lines"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is continuous integration?",
    "topic": "Test coverage & CI",
    "choices": [
      "Deploying every change to production by hand at the end of the working week",
      "Merging all branches into the main branch without any review step",
      "Writing tests only after the feature has been released to users",
      "Automatically building and testing the code on every push or pull request"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a CI pipeline do when a test fails?",
    "topic": "Test coverage & CI",
    "choices": [
      "Mark the run as failed so the change is blocked from being merged",
      "Ignore the failure and report success if the build step passed",
      "Delete the failing test so that the next run of the pipeline is green",
      "Retry the whole pipeline until the failing test happens to pass"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which file defines a GitHub Actions workflow?",
    "topic": "Test coverage & CI",
    "choices": [
      "A JSON file in the root named actions.json",
      "A script called ci.sh in the src folder",
      "A YAML file in .github/workflows",
      "A package.json field named github"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why set a minimum coverage threshold in CI?",
    "topic": "Test coverage & CI",
    "choices": [
      "To guarantee that no bugs remain in the code that has been merged",
      "To make the test run finish faster by skipping the covered files",
      "To stop the coverage from dropping unnoticed as the code grows",
      "To remove the need for code reviews on the pull requests"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which trigger runs a workflow when a pull request is opened or updated?",
    "topic": "Test coverage & CI",
    "choices": [
      "on pull_request",
      "on commit_message",
      "on build_complete",
      "on issue_closed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why run tests in a clean environment on CI?",
    "topic": "Test coverage & CI",
    "choices": [
      "It makes the tests use more memory so that leaks are found sooner",
      "It lets the tests change the repository files without anyone noticing",
      "It removes the need to install dependencies before the tests run",
      "It shows the code works without hidden local settings or files from one machine"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a flaky test?",
    "topic": "Test coverage & CI",
    "choices": [
      "A test that always fails because the feature was never finished",
      "A test that sometimes passes and sometimes fails without any change to the code",
      "A test that runs slowly because it uses a large amount of sample data",
      "A test that is skipped by the runner because of a syntax mistake"
    ],
    "answerIdx": 1
  }
]
```

LAYER: java-spring-9

```json
[
  {
    "stem": "What is the main idea of event driven design?",
    "topic": "Event-driven design with Kafka/RabbitMQ",
    "choices": [
      "Services call each other synchronously and wait for every answer",
      "All services share a single database and read each other tables",
      "Services communicate by publishing and reacting to events instead of calling each other directly",
      "Services are started by a scheduler at fixed times"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a message broker?",
    "topic": "Event-driven design with Kafka/RabbitMQ",
    "choices": [
      "A system that receives messages from producers and delivers them to consumers",
      "A tool that writes the documentation of the services",
      "A gateway that validates the passwords of the users",
      "A cache that stores the results of queries"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the main difference between Kafka and RabbitMQ in typical use?",
    "topic": "Event-driven design with Kafka/RabbitMQ",
    "choices": [
      "RabbitMQ is a distributed log for high throughput streams, and Kafka is a broker that routes single messages to queues",
      "They are the same product that is sold by two companies",
      "Kafka is a database and RabbitMQ is a web server",
      "Kafka is a distributed log for high throughput streams, and RabbitMQ is a broker for routing messages"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a topic in Kafka?",
    "topic": "Event-driven design with Kafka/RabbitMQ",
    "choices": [
      "A single message with a title",
      "A named stream of records that is split into partitions",
      "A user account of the broker",
      "A connection between two brokers that copies the records from one cluster to another"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a Kafka consumer group do?",
    "topic": "Event-driven design with Kafka/RabbitMQ",
    "choices": [
      "Consumers copy each record to a separate topic",
      "Consumers share the partitions of a topic, so each record is processed by one of them",
      "Consumers are grouped by the colour of their logs",
      "Consumers vote on which record is valid"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an exchange in RabbitMQ?",
    "topic": "Event-driven design with Kafka/RabbitMQ",
    "choices": [
      "A queue that stores the messages for one consumer until they are processed, with an optional expiry",
      "A client library for sending messages",
      "A user that publishes to a broker",
      "A component that routes messages to queues based on rules"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does acknowledging a message mean?",
    "topic": "Event-driven design with Kafka/RabbitMQ",
    "choices": [
      "The consumer tells the broker that processing is done, so it can be removed or committed",
      "The producer tells the broker that it wants to stop sending",
      "The broker tells the producer that the queue is full",
      "The consumer deletes the message without processing it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which Spring project simplifies messaging with Kafka and RabbitMQ?",
    "topic": "Event-driven design with Kafka/RabbitMQ",
    "choices": [
      "Spring Data JPA and Spring Security",
      "Spring Batch and Spring Shell",
      "Spring for Apache Kafka and Spring AMQP",
      "Spring Batch and Spring Shell, which are used for jobs and command line tools"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a benefit of asynchronous messaging between services?",
    "topic": "Event-driven design with Kafka/RabbitMQ",
    "choices": [
      "Messages are always delivered exactly once with no effort",
      "Messages are always delivered exactly once, so the system needs no monitoring or retry logic of its own",
      "Services are decoupled in time, and a slow consumer does not block the producer",
      "Every call returns the result at once to the caller"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a drawback of event driven systems?",
    "topic": "Event-driven design with Kafka/RabbitMQ",
    "choices": [
      "They are harder to trace and to reason about, and consistency is eventual",
      "They cannot scale beyond one server",
      "They need all of the services to be written in the same language and to share one database schema",
      "They remove the possibility to retry failed work"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Spring Cloud Config used for?",
    "topic": "Spring Cloud config & discovery",
    "choices": [
      "Configuring the network of the cloud provider",
      "Generating the configuration files of the build tool from the properties of each service at startup",
      "Encrypting the traffic between services",
      "Serving externalised configuration to many services from a central place"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is service discovery?",
    "topic": "Spring Cloud config & discovery",
    "choices": [
      "Services are found by the search engine of the company, which indexes the documentation of each service",
      "Services find the network location of other services by name at runtime",
      "A tool that discovers the vulnerabilities of services",
      "A list of services that is written in a document"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Eureka provide?",
    "topic": "Spring Cloud config & discovery",
    "choices": [
      "A tool that tests the services in the cluster",
      "A registry where services register themselves and clients look them up",
      "A database for storing the events",
      "A load testing library"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does client side load balancing differ from a central load balancer?",
    "topic": "Spring Cloud config & discovery",
    "choices": [
      "The client sends all requests to one fixed server",
      "A central server picks the instance for every request, and clients never see the list of instances",
      "The client generates load on all servers at once",
      "The client picks an instance from the list of instances, with no extra hop"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the benefit of central configuration?",
    "topic": "Spring Cloud config & discovery",
    "choices": [
      "Settings can be changed for many services in one place, with versioning",
      "Services need no configuration at all",
      "The configuration is stored inside each jar",
      "Each service keeps its own copy of the secrets in a public repository so that it can start alone"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a service pick up a changed configuration without a restart?",
    "topic": "Spring Cloud config & discovery",
    "choices": [
      "By deleting the jar and deploying it again",
      "By changing the system clock of the server",
      "With a refresh mechanism, such as @RefreshScope and a refresh event",
      "By reinstalling the operating system"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should secrets in a config server be encrypted or stored elsewhere?",
    "topic": "Spring Cloud config & discovery",
    "choices": [
      "Secrets are not allowed in text files by Spring, so the server refuses to start with encrypted values",
      "Encrypted values are faster to read",
      "The config repository and server can be read by many people",
      "Config servers cannot serve strings"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a bootstrap or config import step do at startup?",
    "topic": "Spring Cloud config & discovery",
    "choices": [
      "It tells the service where to fetch its configuration from",
      "It compiles the configuration into the jar",
      "It downloads the source code of the service from a repository and compiles it on the host",
      "It creates the database of the service"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a downside of a central config server?",
    "topic": "Spring Cloud config & discovery",
    "choices": [
      "It cannot hold more than one file",
      "It makes the services slower to compile",
      "It forces all of the services to use the same port number and the same version of Java",
      "It becomes a dependency that must be available and secured"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an alternative to a config server on Kubernetes?",
    "topic": "Spring Cloud config & discovery",
    "choices": [
      "A copy of the properties files in each image",
      "ConfigMaps and Secrets that are mounted into the pods",
      "A shared folder on the laptop of the developer",
      "A database table that only an administrator can edit, which the services read at every request"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an API gateway?",
    "topic": "API gateway & load balancing",
    "choices": [
      "A database that stores the APIs of the company",
      "A single entry point that routes requests to the services and handles cross cutting concerns",
      "A tool that generates the code of the services",
      "A class that wraps the main method of a service"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which Spring project provides an API gateway?",
    "topic": "API gateway & load balancing",
    "choices": [
      "Spring Data REST",
      "Spring HATEOAS",
      "Spring Boot DevTools",
      "Spring Cloud Gateway"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which cross cutting concerns does a gateway often handle?",
    "topic": "API gateway & load balancing",
    "choices": [
      "Authentication, rate limiting, routing and logging",
      "Compiling the code of each service",
      "Writing the business rules of each service, so that the services only store the data",
      "Storing the data of every service"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a route in Spring Cloud Gateway?",
    "topic": "API gateway & load balancing",
    "choices": [
      "A path in the file system where the services of the cluster store their log files for each day",
      "A network cable between two servers",
      "A rule with a predicate and filters that sends matching requests to a target",
      "A database relation between two tables"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a predicate in a gateway route?",
    "topic": "API gateway & load balancing",
    "choices": [
      "A function that returns the target server by random choice from the list of all known services",
      "A rule that tests the code of the services",
      "A condition on the request, such as the path or a header, that selects the route",
      "A message that the gateway sends to the broker"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a filter in a gateway?",
    "topic": "API gateway & load balancing",
    "choices": [
      "A piece of logic that changes the request or the response, such as adding a header",
      "A filter that removes users from the database",
      "A tool that removes old log files",
      "A rule that blocks all traffic from other countries"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a gateway support load balancing?",
    "topic": "API gateway & load balancing",
    "choices": [
      "It sends every request to the same instance",
      "It copies each request to all instances",
      "It stops the instances that are slow",
      "It chooses an instance of the target service from the registry for each request"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the risk of putting business logic in a gateway?",
    "topic": "API gateway & load balancing",
    "choices": [
      "Gateways cannot call services",
      "It becomes a bottleneck and a single point of failure with hidden rules",
      "It makes services faster",
      "It is not allowed by Spring"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why add rate limiting at the gateway?",
    "topic": "API gateway & load balancing",
    "choices": [
      "It makes the services respond faster to each request by caching all answers inside the gateway",
      "It protects the services from overload and abuse before requests reach them",
      "It stores the requests for later use",
      "It replaces authentication"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why terminate token checks at the edge and also in services?",
    "topic": "API gateway & load balancing",
    "choices": [
      "The gateway cannot check tokens at all",
      "Tokens are valid only inside services",
      "Services have no access to the tokens",
      "Defence in depth, since internal calls can come from other places too"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Resilience4j provide?",
    "topic": "Resilience with Resilience4j",
    "choices": [
      "Fault tolerance tools such as circuit breakers, retries and rate limiters",
      "A set of database drivers for Java",
      "A tool for building user interfaces",
      "A generator of test data for services"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a circuit breaker?",
    "topic": "Resilience with Resilience4j",
    "choices": [
      "It switches off the servers of the failing service after an error and starts new ones at random",
      "It counts the calls to a service for the bill",
      "It stops calls to a failing service for a while, so failures do not pile up",
      "It creates a copy of the service in the cloud"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What are the states of a circuit breaker?",
    "topic": "Resilience with Resilience4j",
    "choices": [
      "Start, stop and pause, which describe the lifecycle of the process that runs the service",
      "Green, yellow and red",
      "Closed, open and half open",
      "Idle, busy and failed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens in the half open state?",
    "topic": "Resilience with Resilience4j",
    "choices": [
      "A few trial calls are allowed to check whether the service has recovered",
      "All calls are blocked for the whole time",
      "All calls are allowed with no counting",
      "The breaker is deleted and created again"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a fallback method?",
    "topic": "Resilience with Resilience4j",
    "choices": [
      "A method that restarts the service after a crash",
      "A method that deletes the failed requests",
      "A method that logs the result in the database",
      "A method that provides a default result when the call fails or the breaker is open"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a retry policy do?",
    "topic": "Resilience with Resilience4j",
    "choices": [
      "It removes the call from the queue after one failure and reports the error to the developer",
      "It repeats a failed call a number of times, often with a delay",
      "It increases the timeout without limit",
      "It sends the call to a different type of service"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why add backoff and jitter to retries?",
    "topic": "Resilience with Resilience4j",
    "choices": [
      "It makes each retry faster than the one before",
      "It avoids many clients retrying at the same moment and overloading the service",
      "It reduces the number of services",
      "It sets the retries to run at random times of day"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why must retried operations be idempotent?",
    "topic": "Resilience with Resilience4j",
    "choices": [
      "Idempotent calls are faster than other calls",
      "Retries are only allowed for read operations by law, so write operations can never be repeated",
      "The broker refuses calls that are not idempotent",
      "A repeated call must not cause a duplicate effect, such as a second payment"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a bulkhead do?",
    "topic": "Resilience with Resilience4j",
    "choices": [
      "It limits the resources for one part, so a slow dependency cannot use all of them",
      "It encrypts the calls between services",
      "It splits a service into two jars",
      "It stores a backup of each call"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a time limiter do?",
    "topic": "Resilience with Resilience4j",
    "choices": [
      "It limits the time that a developer can work on a service",
      "It sets the time zone of the service",
      "It cancels a call that takes longer than a set time",
      "It schedules calls at a given hour"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is distributed tracing?",
    "topic": "Distributed tracing",
    "choices": [
      "Counting the number of requests per second for each service and showing them on a dashboard",
      "Storing the logs of all services in one file",
      "Following a request across several services with a shared trace id",
      "Drawing a picture of the architecture by hand"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a span?",
    "topic": "Distributed tracing",
    "choices": [
      "A unit of work in a trace with a start, a duration and a parent",
      "A kind of log level for errors",
      "The width of a network connection",
      "A name for a group of services"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which Spring project provides tracing support for Boot 3?",
    "topic": "Distributed tracing",
    "choices": [
      "Spring Batch",
      "Spring Shell",
      "Spring Session, which keeps the sessions of users in a shared store for all of the instances",
      "Micrometer Tracing"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the role of OpenTelemetry?",
    "topic": "Distributed tracing",
    "choices": [
      "A database for storing business events",
      "A standard for collecting traces, metrics and logs from applications",
      "A framework for building web pages",
      "A tool for editing source code"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does the trace id travel between services?",
    "topic": "Distributed tracing",
    "choices": [
      "In the body of each request as a field, which each service has to copy to the next call",
      "In request headers, such as the W3C traceparent header",
      "In a cookie that the browser keeps",
      "In the name of the service"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why add the trace id to log lines?",
    "topic": "Distributed tracing",
    "choices": [
      "Logs are smaller with it",
      "The trace id replaces the timestamp, so lines no longer need to carry the time of the event",
      "It hides the user name in the logs",
      "You can find all logs of one request across services"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does sampling mean in tracing?",
    "topic": "Distributed tracing",
    "choices": [
      "Only a share of the requests is traced, to reduce the cost",
      "Each request is traced twice",
      "The traces are sorted by name",
      "Only requests from testers are traced, while the traffic of real users is skipped for privacy"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What tool shows traces as a timeline of spans?",
    "topic": "Distributed tracing",
    "choices": [
      "A text editor",
      "A load balancer",
      "A tracing backend such as Zipkin or Jaeger",
      "A database client"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is tracing especially important in microservices?",
    "topic": "Distributed tracing",
    "choices": [
      "Microservices cannot write logs",
      "Tracing makes services faster",
      "A single request touches many services, so failures are hard to locate without it",
      "Services need it to start"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a downside of tracing every request in production?",
    "topic": "Distributed tracing",
    "choices": [
      "Extra overhead and data volume, so sampling is often used",
      "Requests cannot be traced at all in production, since tracing tools only work in test systems",
      "Traces make the response wrong",
      "The trace id can be read by users"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a common way for a service to call another service over HTTP in Spring?",
    "topic": "Service-to-service communication",
    "choices": [
      "Calling the main method of the other service directly",
      "Importing the jar of the other service and calling its classes",
      "Writing to the database table of the other service",
      "RestClient, WebClient or a declarative HTTP interface"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is OpenFeign, or a declarative client?",
    "topic": "Service-to-service communication",
    "choices": [
      "A tool that builds user interfaces",
      "An interface with annotations that Spring turns into an HTTP client",
      "A tool for secure file transfer",
      "A parser for JSON files"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should a service call set to avoid waiting for ever?",
    "topic": "Service-to-service communication",
    "choices": [
      "A larger thread pool, so that the caller can wait for the other service as long as it needs",
      "Connect and read timeouts",
      "A bigger heap",
      "A longer password"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the downside of synchronous calls between services?",
    "topic": "Service-to-service communication",
    "choices": [
      "They are not possible in Java",
      "They cannot carry data",
      "They need a database",
      "The caller depends on the availability and speed of the callee"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When might an asynchronous message be better than an HTTP call?",
    "topic": "Service-to-service communication",
    "choices": [
      "When the caller does not need an immediate answer and should not wait",
      "When the answer is needed for the very next line of code, so the caller must wait for it",
      "When the data is only a single number",
      "When the services share the same process"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the saga pattern about?",
    "topic": "Service-to-service communication",
    "choices": [
      "Writing a long story in the log file",
      "Sharing one database transaction across all services",
      "Coordinating a business transaction across services with local transactions and compensations",
      "Locking all services while a request runs"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the outbox pattern for?",
    "topic": "Service-to-service communication",
    "choices": [
      "Sending emails from the outbox of a user",
      "Storing failed requests in a trash folder",
      "Writing events to a table in the same transaction as the data, then publishing them reliably",
      "Deleting events after they are read"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is a shared database between services discouraged?",
    "topic": "Service-to-service communication",
    "choices": [
      "It couples the services through the schema and makes independent changes hard",
      "Databases cannot be shared in any way",
      "It makes the database too small",
      "Services would need the same Java version"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of a correlation id in service calls?",
    "topic": "Service-to-service communication",
    "choices": [
      "Encrypting the messages between the services so that other systems cannot read the content",
      "Counting the number of calls",
      "Naming the services in the registry",
      "Linking related calls and logs together across services"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why keep service contracts versioned and backward compatible?",
    "topic": "Service-to-service communication",
    "choices": [
      "Contracts are required to compile the code of the provider, so they cannot be skipped",
      "Consumers should not break when a provider changes",
      "Versioning makes calls faster",
      "It lets each service use its own port"
    ],
    "answerIdx": 1
  }
]
```

LAYER: java-spring-10

```json
[
  {
    "stem": "What is a Spring Boot executable jar, also called a fat jar?",
    "topic": "Building fat jars & layered images",
    "choices": [
      "A jar that contains only the source code of the application",
      "A jar that needs an external server to run in",
      "A jar that contains the application, its dependencies and an embedded server",
      "A jar that is bigger than one gigabyte"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which Maven goal builds the executable jar with the Boot plugin?",
    "topic": "Building fat jars & layered images",
    "choices": [
      "spring-boot:repackage, which runs as part of package",
      "spring-boot:run, which starts the application",
      "spring-boot:build-image, which also pushes the image to a registry",
      "spring-boot:start, which launches a debugger"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How is a fat jar started?",
    "topic": "Building fat jars & layered images",
    "choices": [
      "mvn start app.jar",
      "spring run app.jar",
      "jar --execute app.jar",
      "java -jar app.jar"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the benefit of layered jars?",
    "topic": "Building fat jars & layered images",
    "choices": [
      "Each layer is encrypted with its own key",
      "Dependencies and application code are in separate layers, which improves image caching",
      "Layers allow the jar to run on several JVMs at once",
      "Layers remove the need for a Dockerfile"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does spring-boot:build-image do?",
    "topic": "Building fat jars & layered images",
    "choices": [
      "Builds a virtual machine image for a cloud provider",
      "Builds an OCI image with Cloud Native Buildpacks, with no Dockerfile",
      "Builds the jar and uploads it to Maven Central",
      "Builds an image of the database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why separate the dependencies layer in a container image?",
    "topic": "Building fat jars & layered images",
    "choices": [
      "Dependencies must be placed at the end of the image",
      "Docker refuses to build images that mix code and libraries",
      "Layers with dependencies are smaller than all other layers",
      "Dependencies change less often than the code, so the layer is reused from the cache"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between a jar and a war?",
    "topic": "Building fat jars & layered images",
    "choices": [
      "A war is a web archive for a servlet container, and a Boot jar embeds the server",
      "A jar is for web applications and a war is for libraries",
      "They are the same type of file with different names",
      "A war can only be run on the command line"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which Java feature helps to start the application faster in containers?",
    "topic": "Building fat jars & layered images",
    "choices": [
      "Increasing the heap size to the maximum",
      "Disabling the garbage collector",
      "Class data sharing or ahead of time compilation with GraalVM native image",
      "Running the application in debug mode"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a drawback of GraalVM native images?",
    "topic": "Building fat jars & layered images",
    "choices": [
      "They cannot run on Linux",
      "They need a larger heap than a jar",
      "Long build times and limits with reflection and dynamic features",
      "They cannot use Spring Boot"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the Boot plugin do with the manifest?",
    "topic": "Building fat jars & layered images",
    "choices": [
      "Sets the launcher class that starts the application from the nested jars",
      "Deletes the manifest from the final jar",
      "Signs the manifest with a certificate of the company",
      "Copies the manifest into the logs"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Spring Boot Actuator?",
    "topic": "Spring Boot Actuator — health & metrics",
    "choices": [
      "A tool that creates the actors of a user interface",
      "A test library for controllers",
      "A tool that deploys the application to the cloud",
      "A module that exposes endpoints for health, metrics and other operational data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which endpoint reports whether the application is healthy?",
    "topic": "Spring Boot Actuator — health & metrics",
    "choices": [
      "/actuator/status",
      "/actuator/health",
      "/actuator/alive",
      "/actuator/check"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you expose more actuator endpoints over HTTP?",
    "topic": "Spring Boot Actuator — health & metrics",
    "choices": [
      "By adding the endpoints to the controller by hand",
      "With management.endpoints.web.exposure.include in the configuration",
      "By editing the jar of Spring Boot",
      "By starting the application with a flag in the JVM"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why secure actuator endpoints in production?",
    "topic": "Spring Boot Actuator — health & metrics",
    "choices": [
      "They slow down the application a lot",
      "They are always public by default and cannot be hidden",
      "They are only used in tests",
      "They can reveal configuration, environment values and internal state"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does /actuator/metrics provide?",
    "topic": "Spring Boot Actuator — health & metrics",
    "choices": [
      "Metrics such as memory, requests and custom counters",
      "The source code of the application",
      "The list of the users of the system",
      "The database schema of the application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which library does Actuator use for metrics?",
    "topic": "Spring Boot Actuator — health & metrics",
    "choices": [
      "Log4j",
      "Jackson",
      "Micrometer",
      "Hibernate"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can Prometheus read the metrics of a Spring Boot app?",
    "topic": "Spring Boot Actuator — health & metrics",
    "choices": [
      "Copy the metrics file by hand each day",
      "Install a plugin in the browser of the developer",
      "Add the Prometheus registry and expose the /actuator/prometheus endpoint",
      "Send the metrics by email every hour"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What are liveness and readiness probes?",
    "topic": "Spring Boot Actuator — health & metrics",
    "choices": [
      "Liveness tells whether the app should be restarted, readiness whether it can receive traffic",
      "Liveness tells whether it can receive traffic, readiness whether it should be restarted",
      "Both tell the same thing, but at different times",
      "They are two names for the same endpoint"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a custom health indicator?",
    "topic": "Spring Boot Actuator — health & metrics",
    "choices": [
      "A custom colour for the health page",
      "A script that restarts the service",
      "A report of the health of the developer team",
      "A bean that adds a check, such as a dependency, to the health result"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the info endpoint usually contain?",
    "topic": "Spring Boot Actuator — health & metrics",
    "choices": [
      "The passwords of the application",
      "Application information, such as the version and build details",
      "The list of all log files",
      "A copy of the database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a Dockerfile?",
    "topic": "Dockerizing a Spring Boot app",
    "choices": [
      "A file that lists the containers that run together as one single application",
      "A text file with instructions for building an image",
      "A file that stores the secrets of the application",
      "A script that starts the Docker daemon"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the FROM instruction set?",
    "topic": "Dockerizing a Spring Boot app",
    "choices": [
      "The folder that is copied into the image",
      "The registry that the image is pushed to",
      "The command that the container runs as soon as it has been started",
      "The base image on which the new image is built"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the COPY instruction do?",
    "topic": "Dockerizing a Spring Boot app",
    "choices": [
      "Copies files from the build context into the image",
      "Copies the running container into a brand new image of the application",
      "Copies the image to another registry",
      "Copies environment variables to the host"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the RUN instruction do?",
    "topic": "Dockerizing a Spring Boot app",
    "choices": [
      "Starts the container when the image is pulled",
      "Runs the tests of the app after every start",
      "Executes a command during the build and stores the result as a layer",
      "Runs a command on the host operating system"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between CMD and ENTRYPOINT?",
    "topic": "Dockerizing a Spring Boot app",
    "choices": [
      "ENTRYPOINT can always be overridden by docker run, CMD cannot be",
      "They are the same instruction under two names",
      "CMD gives the default command that can be overridden, ENTRYPOINT sets the main executable",
      "CMD runs at build time and ENTRYPOINT runs on the host"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why copy package.json and install dependencies before copying the rest of the code?",
    "topic": "Dockerizing a Spring Boot app",
    "choices": [
      "Docker caches the install layer",
      "The installer cannot read package.json after the code is copied",
      "Node refuses to start unless the dependencies exist first",
      "Docker deletes the code if it is copied before the packages"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the WORKDIR instruction do?",
    "topic": "Dockerizing a Spring Boot app",
    "choices": [
      "Creates a volume that is shared with the host",
      "Sets the user that owns all of the files of the image in the container",
      "Defines the port that the container listens on",
      "Sets the working directory for the instructions that follow"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does EXPOSE do?",
    "topic": "Dockerizing a Spring Boot app",
    "choices": [
      "Opens the port to the internet on the host machine",
      "Documents the port that the app listens on",
      "Maps the container port to a random port of the host",
      "Closes every other port of the container"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the build context?",
    "topic": "Dockerizing a Spring Boot app",
    "choices": [
      "The list of instructions that the Dockerfile contains",
      "The set of files that is sent to the Docker daemon when an image is built",
      "The network that the build runs in",
      "The registry that provides the base image"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of a .dockerignore file?",
    "topic": "Dockerizing a Spring Boot app",
    "choices": [
      "Hiding the Dockerfile from the other users of the repository",
      "Making the container start faster by skipping its command",
      "Telling the registry which images to remove after a week",
      "Keeping files such as node_modules and .env out of the build context and the image"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the NEXT_PUBLIC prefix do for an environment variable?",
    "topic": "Externalized configuration & secrets",
    "choices": [
      "Includes it in the browser bundle, so it is visible to everyone",
      "Makes it available only to server components and route handlers",
      "Encrypts the value before it is added to the bundle",
      "Hides it from the build logs of the host"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which variables must never use the NEXT_PUBLIC prefix?",
    "topic": "Externalized configuration & secrets",
    "choices": [
      "Values such as the public name of the site",
      "Public analytics ids and publishable keys",
      "Secrets such as private keys and database passwords",
      "The url of the home page of the site"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should secrets live in development?",
    "topic": "Externalized configuration & secrets",
    "choices": [
      "In a file named secrets.txt in the public folder",
      "In the source code, next to the function that uses them",
      "In a local .env file that is ignored by git",
      "In the readme, so the whole team can find them"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why commit a .env.example file?",
    "topic": "Externalized configuration & secrets",
    "choices": [
      "It documents the names of the variables without any real values",
      "It lets the application start without any real configuration being present",
      "It is required by Next.js in order to load all of the other env files",
      "It stores a backup copy of the real secrets for the members of the team"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should you do if a secret was committed to git?",
    "topic": "Externalized configuration & secrets",
    "choices": [
      "Delete the commit and keep using the same secret",
      "Rename the repository so the secret cannot be found",
      "Add the file to gitignore and keep the secret",
      "Rotate it, since deleting the commit does not undo the exposure"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where do you set secrets for a deployed Next.js app?",
    "topic": "Externalized configuration & secrets",
    "choices": [
      "In a file that is committed to the main branch",
      "In the settings of the hosting platform, per environment",
      "In the browser, through the developer tools",
      "In the url of the deployed site"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use different secrets for preview and production?",
    "topic": "Externalized configuration & secrets",
    "choices": [
      "Production secrets cannot be used in preview builds",
      "A leak or a mistake in preview cannot affect real customers",
      "Preview builds are not allowed to read any variable",
      "The host rotates the secrets every time you deploy"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When is an environment variable read at build time versus runtime?",
    "topic": "Externalized configuration & secrets",
    "choices": [
      "It is always read at build time and is never read a second time",
      "It is always read at runtime, every time that a user visits",
      "It is read only once, at the moment when the repository is cloned",
      "It depends on whether the code runs while building or while serving requests"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you fail fast when a required variable is missing?",
    "topic": "Externalized configuration & secrets",
    "choices": [
      "Validate the environment at startup and throw a clear error",
      "Use an empty string and let the code carry on running without the variable",
      "Catch every error that happens in the app and ignore all of them silently",
      "Add the variable to the public bundle so that it is available as a fallback"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the principle of least privilege for API keys?",
    "topic": "Externalized configuration & secrets",
    "choices": [
      "Give each key every permission that exists so that nothing is ever blocked",
      "Share one single key between all of the services to keep the setup simple",
      "Give each key only the permissions it needs, and nothing more",
      "Remove the permissions from a key after it has been used for one request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a GitHub Actions workflow?",
    "topic": "GitHub Actions CI/CD",
    "choices": [
      "A branch that is created automatically for every release of the application itself",
      "A tool that reviews the code of every pull request without any human help",
      "An automated process defined in YAML that runs jobs on events such as a push",
      "A service that hosts the application after it has been built successfully"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the usual order of steps in a CI job for a Node project?",
    "topic": "GitHub Actions CI/CD",
    "choices": [
      "Check out the code, install dependencies, run lint and tests, then build",
      "Build the app, deploy it, and then run the tests in production at the very end",
      "Install the dependencies after the tests have been run on the code",
      "Run the tests on the code before it is checked out of the repository"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which step action fetches the repository code in a workflow?",
    "topic": "GitHub Actions CI/CD",
    "choices": [
      "actions/download",
      "actions/clone-repo",
      "actions/fetch-source",
      "actions/checkout"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where should secrets used in a workflow, such as a deploy token, be stored?",
    "topic": "GitHub Actions CI/CD",
    "choices": [
      "Directly in the YAML file so that every job can read them",
      "In the encrypted secrets settings of the repository",
      "In the commit message of the last change that was pushed",
      "In a public issue so the team can find them quickly"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a matrix strategy allow?",
    "topic": "GitHub Actions CI/CD",
    "choices": [
      "Running several different jobs one after another in a fixed order",
      "Running the same job for several versions, such as different Node versions",
      "Splitting one test file across the cores of a single machine at once",
      "Deploying one build to several servers at the same moment of time"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why cache dependencies in a CI workflow?",
    "topic": "GitHub Actions CI/CD",
    "choices": [
      "Make the tests give different results on each run of the workflow",
      "Avoid having to commit the node_modules folder to the repository",
      "Allow the workflow to run without a network connection at all",
      "Reduce the time each run needs by reusing downloaded packages"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a pipeline do before it deploys?",
    "topic": "GitHub Actions CI/CD",
    "choices": [
      "Make sure tests and checks passed on the same commit",
      "Wait for a developer to start the deployment from a local machine",
      "Delete the previous deployment to free up space on the host",
      "Skip the tests so that the deployment is finished faster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is continuous deployment compared with continuous delivery?",
    "topic": "GitHub Actions CI/CD",
    "choices": [
      "Every change waits for a manual approval, while delivery releases it at once",
      "They mean the same thing, and only the names are different from each other",
      "Every passing change is released automatically, while delivery keeps a manual approval",
      "Deployment applies only to databases, and delivery applies only to code"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which event runs a workflow when code is pushed to the main branch?",
    "topic": "GitHub Actions CI/CD",
    "choices": [
      "on main_change with the push option",
      "on commit with the deploy option",
      "on push with the branch list set to main",
      "on release_branch with the main option, which watches the release branches"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should workflow permissions follow least privilege?",
    "topic": "GitHub Actions CI/CD",
    "choices": [
      "A compromised step or dependency can then do less damage with the token",
      "Narrow permissions make every workflow run faster on GitHub",
      "The workflow cannot start unless all of its permissions are removed first",
      "Permissions only affect the name that is shown in the log"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the main difference between hosting a static site and a Node API?",
    "topic": "Deploying to the cloud",
    "choices": [
      "A static site needs a running process that listens, while an API needs only file hosting",
      "An API can only ever be hosted on the same server as its own database",
      "A static site must always be run inside a container before it can be served",
      "An API needs a running process that listens, while static files need only file hosting"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which command do most platforms run to start an Express app?",
    "topic": "Deploying to the cloud",
    "choices": [
      "npm build, which launches the server after compiling",
      "npm start, as defined in the scripts of package.json",
      "node index.html, which runs the page in the runtime",
      "npm deploy, which every platform provides by default"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why must the server read the port from process.env.PORT on platforms like Render or Railway?",
    "topic": "Deploying to the cloud",
    "choices": [
      "The platform blocks every port except the one named 3000 in the code",
      "The platform assigns the port at runtime and routes traffic to it",
      "The port is needed only for logging and has no effect on the routing",
      "Express chooses a random port unless the variable has been defined"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a health check endpoint?",
    "topic": "Deploying to the cloud",
    "choices": [
      "A route that returns the full list of users so that the platform can keep a copy",
      "A route that restarts the server every few minutes to free up its memory",
      "A route that writes the administrator password to the logs for easy debugging",
      "A light route, such as /health, that the platform calls to see if the service is alive"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens to files written to the local disk of many cloud hosts when the service restarts?",
    "topic": "Deploying to the cloud",
    "choices": [
      "They are often lost, so uploads should go to external storage",
      "They are kept forever and shared by every new instance of the service",
      "They are encrypted and moved to the database of the platform",
      "They are copied back to the repository by the platform automatically"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can the first request to a free tier service be slow?",
    "topic": "Deploying to the cloud",
    "choices": [
      "The free tier compresses each response very strongly to save its bandwidth",
      "The platform checks the code for errors before each response is sent",
      "The service may be put to sleep after inactivity and has to start again",
      "The database is rebuilt from scratch for every request made"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What must be allowed in the Atlas network access list for a cloud hosted API?",
    "topic": "Deploying to the cloud",
    "choices": [
      "Only the address of the developer laptop where the code was written",
      "No address at all, because Atlas trusts every connection from any host on the net",
      "The outbound addresses of the host, or a wider range if they are not fixed",
      "The address of the front end, so the browser can reach the database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How should the API allow requests from the deployed front end?",
    "topic": "Deploying to the cloud",
    "choices": [
      "Configure CORS with the exact origin of the front end",
      "Disable the browser for the front end so that CORS is not enforced",
      "Add the origin to the package.json file of the front end project",
      "Send the front end code to the API so that it becomes the same origin"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a build command and a start command mean for a Node service?",
    "topic": "Deploying to the cloud",
    "choices": [
      "The start command prepares the code, and the build command runs the server",
      "Both commands do the same thing and only one of them has to be set",
      "The build command is used for the front end and never for any API",
      "The build prepares the code, and the start command runs the server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why log to standard output on a cloud platform?",
    "topic": "Deploying to the cloud",
    "choices": [
      "The platform deletes files created by the app so log files cannot be used",
      "The platform collects the output and shows it as logs for the service",
      "Standard output is encrypted, which keeps the logs safe from other users",
      "Log files are not allowed in Node applications that run in production"
    ],
    "answerIdx": 1
  }
]
```

