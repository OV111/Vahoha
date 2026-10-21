LAYER: rust-dev-1

```json
[
  {
    "stem": "After let x = 5; what happens if the next line is x = 6; ?",
    "topic": "Variables, mutability & shadowing",
    "choices": [
      "A runtime panic when the assignment line executes",
      "The value changes, since let allows later reassignment",
      "A warning only, and the program still builds and runs",
      "A compile error, since bindings default to immutable"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What can shadowing do that declaring a variable with mut cannot?",
    "topic": "Variables, mutability & shadowing",
    "choices": [
      "Change the variable type by re-declaring it with let",
      "Change the value while a borrow of it is still alive",
      "Reassign the name from inside a nested closure scope",
      "Reuse the same name without needing the let keyword"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Given let s = \"abc\"; let s = s.len(); what is true?",
    "topic": "Variables, mutability & shadowing",
    "choices": [
      "It compiles, and the second s is a new binding of type usize",
      "It fails, because the type of s cannot change after declaration",
      "It compiles only if the first s is declared with mut",
      "It compiles, and the original string is mutated in place"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a key difference between const and let?",
    "topic": "Variables, mutability & shadowing",
    "choices": [
      "A const lives on the heap and can be resized at run time",
      "A const may only be declared inside a function body block",
      "A const needs a type annotation and a compile-time value",
      "A const can be shadowed in its scope but let cannot be"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does this print?\\nlet x = 1;\\n{\\n    let x = 2;\\n}\\nprintln!(\"{x}\");",
    "topic": "Variables, mutability & shadowing",
    "choices": [
      "2",
      "3",
      "It does not compile",
      "1"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which keyword makes a local variable binding mutable?",
    "topic": "Variables, mutability & shadowing",
    "choices": [
      "var",
      "static",
      "mut",
      "ref"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does a static item differ from a const item?",
    "topic": "Variables, mutability & shadowing",
    "choices": [
      "A static is recomputed each time it is used in an expression",
      "A static is always mutable without any extra keyword",
      "A static has one fixed memory location for the whole program",
      "A static must be declared inside the main function"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which naming style do Rust conventions and compiler lints expect for local variables?",
    "topic": "Variables, mutability & shadowing",
    "choices": [
      "camelCase",
      "PascalCase",
      "SCREAMING_SNAKE_CASE",
      "snake_case"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A variable is declared but never read, and the compiler warns about it. What is the usual way to silence the warning on purpose?",
    "topic": "Variables, mutability & shadowing",
    "choices": [
      "Declare it with mut",
      "Wrap it in an unsafe block",
      "Add the pub keyword to it",
      "Prefix the name with an underscore"
    ],
    "answerIdx": 3
  },
  {
    "stem": "let x: i32;\\nif cond { x = 1; } else { x = 2; }\\nprintln!(\"{x}\");\\nWhat happens?",
    "topic": "Variables, mutability & shadowing",
    "choices": [
      "It fails, because x was declared without an initial value",
      "It fails, because x is assigned in two places",
      "It compiles, since x is assigned exactly once on every path",
      "It compiles only if x is declared with mut"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which integer type does Rust infer when a literal like 42 has no other type constraints?",
    "topic": "Scalar & compound types",
    "choices": [
      "i64",
      "u32",
      "i32",
      "isize"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which group lists Rust's four primary scalar types?",
    "topic": "Scalar & compound types",
    "choices": [
      "Integers, strings, booleans and tuples in total",
      "Integers, floats, arrays and characters together",
      "Integers, booleans, characters and slices only",
      "Integers, floats, booleans and characters"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How large is a Rust char and what does it represent?",
    "topic": "Scalar & compound types",
    "choices": [
      "One byte, holding an ASCII code",
      "Four bytes, holding a Unicode scalar value",
      "Two bytes, holding a UTF-16 code unit",
      "One byte, holding a UTF-8 code unit"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a tuple differ from an array in Rust?",
    "topic": "Scalar & compound types",
    "choices": [
      "A tuple has a growable length, while an array is fixed",
      "A tuple can mix element types, while an array holds one type",
      "A tuple lives on the heap, while an array lives on the stack",
      "A tuple is indexed with brackets, while an array is not"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens at runtime when code indexes an array past its last element, for example a[i] where i is 10 on a five-element array?",
    "topic": "Scalar & compound types",
    "choices": [
      "It returns a default zero value",
      "The program panics",
      "It reads the neighbouring memory",
      "It wraps around to the start"
    ],
    "answerIdx": 1
  },
  {
    "stem": "In a default debug build, what happens when a u8 holding 255 has 1 added to it at runtime?",
    "topic": "Scalar & compound types",
    "choices": [
      "The value silently wraps to 0",
      "The value saturates and stays at 255",
      "The compiler promotes it to a u16",
      "The program panics because of integer overflow"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the unit type ()?",
    "topic": "Scalar & compound types",
    "choices": [
      "A type with one value, used when nothing meaningful is returned",
      "A null pointer value that functions return when they fail",
      "An alias for an empty array of any element type at all",
      "A marker type for values that have been moved already"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which floating-point type is the default when you write a literal like 2.5?",
    "topic": "Scalar & compound types",
    "choices": [
      "f32",
      "f128",
      "f64",
      "decimal"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is usize mainly used for?",
    "topic": "Scalar & compound types",
    "choices": [
      "Values that must be exactly 32 bits wide on every platform",
      "Indexing and sizes, since it matches the platform pointer width",
      "Storing Unicode characters that come from user input text",
      "File sizes only, and only on 64-bit operating systems"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does let n = \"42\".parse().unwrap(); fail to compile without more information?",
    "topic": "Scalar & compound types",
    "choices": [
      "parse only works on integers written in hexadecimal",
      "parse can produce many types, so the target type must be known",
      "unwrap cannot be called on the result of parse",
      "String slices cannot be parsed at all"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between a statement and an expression in Rust?",
    "topic": "Functions & expressions",
    "choices": [
      "A statement evaluates to a value, while an expression does not",
      "Statements may only appear in main, while expressions appear anywhere",
      "An expression evaluates to a value, while a statement does not",
      "Expressions must end with a semicolon, while statements must not"
    ],
    "answerIdx": 2
  },
  {
    "stem": "fn add(a: i32, b: i32) -> i32 {\\n    a + b;\\n}\\nWhy does this fail to compile?",
    "topic": "Functions & expressions",
    "choices": [
      "The trailing semicolon makes the body return () instead of i32",
      "Function parameters cannot be added together",
      "The return keyword is mandatory for numeric results",
      "The function should have been declared with pub"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Must parameter types be written out in a function signature?",
    "topic": "Functions & expressions",
    "choices": [
      "No, they are always inferred from the call sites",
      "Only for parameters of numeric types",
      "Only when the function is declared pub",
      "Yes, every parameter needs an explicit type annotation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the value of y?\\nlet y = {\\n    let x = 3;\\n    x + 1\\n};",
    "topic": "Functions & expressions",
    "choices": [
      "3",
      "()",
      "It does not compile",
      "4"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does a Rust function return a value without the return keyword?",
    "topic": "Functions & expressions",
    "choices": [
      "The last expression, with no trailing semicolon, is the result",
      "The first declared variable is returned automatically always",
      "It assigns the value to a variable that is named result",
      "It prints the value and the caller captures the output"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a function declared as fn log(msg: &str) { ... } return?",
    "topic": "Functions & expressions",
    "choices": [
      "A null value",
      "An empty string",
      "Whatever its last println! produced",
      "The unit value ()"
    ],
    "answerIdx": 3
  },
  {
    "stem": "let n = if flag { 1 } else { \"one\" };\\nWhy is this rejected?",
    "topic": "Functions & expressions",
    "choices": [
      "Both branches of an if expression must have the same type",
      "An if cannot be used on the right side of let",
      "Strings cannot be compared to integers",
      "The else branch needs braces around the number"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Can a function be called in main before its definition appears later in the file?",
    "topic": "Functions & expressions",
    "choices": [
      "No, it must be declared above its first use",
      "Only if a forward declaration is written first",
      "Only if the function is marked pub",
      "Yes, item order in a file does not matter"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is let x = (let y = 6); invalid?",
    "topic": "Functions & expressions",
    "choices": [
      "Parentheses are never allowed directly around a let",
      "A let binding is a statement and yields no value",
      "The name y would shadow the name x here",
      "The literal 6 needs an explicit type annotation here"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the return type of a function that never returns normally, such as one that always panics?",
    "topic": "Functions & expressions",
    "choices": [
      "The never type, written !",
      "The unit type, written ()",
      "The any type, written dyn",
      "The empty enum Option"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is if 1 { ... } rejected by the compiler?",
    "topic": "Control flow — if, loop, while, for",
    "choices": [
      "The number 1 is too small to be tested as a condition",
      "An if needs an else branch whenever it tests an integer",
      "An if condition must be a bool, with no implicit conversion",
      "Conditions in an if may only be function calls at all"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the value of r?\\nlet mut n = 0;\\nlet r = loop {\\n    n += 1;\\n    if n == 3 { break n * 2; }\\n};",
    "topic": "Control flow — if, loop, while, for",
    "choices": [
      "3",
      "6",
      "0",
      "It does not compile"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which values does the exclusive-end range 1..4 yield in a for loop?",
    "topic": "Control flow — if, loop, while, for",
    "choices": [
      "1, 2 and 3",
      "1, 2, 3 and 4",
      "0, 1, 2 and 3",
      "2, 3 and 4"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which values does the inclusive range 1..=4 yield in a for loop?",
    "topic": "Control flow — if, loop, while, for",
    "choices": [
      "1, 2 and 3 only",
      "0 through 4 inclusive",
      "2, 3 and 4 only",
      "1, 2, 3 and 4"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a loop label such as outer: written before a loop used for?",
    "topic": "Control flow — if, loop, while, for",
    "choices": [
      "Lets break or continue target an outer loop, not the innermost",
      "Names a loop so that it can later be called like a function",
      "Makes the labeled loop run on its own separate thread",
      "Limits how many iterations the labeled loop is allowed to run"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is a for loop over a collection generally preferred to a while loop with a manual index?",
    "topic": "Control flow — if, loop, while, for",
    "choices": [
      "It avoids index mistakes and needless bounds checks",
      "It automatically runs the iterations on several threads",
      "It can change the collection length while iterating",
      "It never needs the collection to be borrowed at all"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When does a while loop stop?",
    "topic": "Control flow — if, loop, while, for",
    "choices": [
      "After exactly one pass through its body",
      "When its condition expression evaluates to false",
      "When any variable inside it changes",
      "When the program receives a signal"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does continue do inside a loop body?",
    "topic": "Control flow — if, loop, while, for",
    "choices": [
      "Exits the loop completely and continues after its body",
      "Restarts the whole program from the main function",
      "Pauses the loop until some external event arrives",
      "Skips the rest of this iteration and starts the next"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which kind of loop can produce a value through break value?",
    "topic": "Control flow — if, loop, while, for",
    "choices": [
      "Only for",
      "Only while",
      "Only loop",
      "All of loop, while and for"
    ],
    "answerIdx": 2
  },
  {
    "stem": "let v = vec![1, 2, 3];\\nfor x in v { println!(\"{x}\"); }\\nprintln!(\"{:?}\", v);\\nWhat happens?",
    "topic": "Control flow — if, loop, while, for",
    "choices": [
      "A compile error, because the for loop moved v",
      "It prints the numbers and then the vector",
      "It panics at runtime on the final line",
      "It compiles with a warning about unused values"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which command creates a new binary project with a Cargo.toml and src/main.rs?",
    "topic": "Cargo, crates & rustc basics",
    "choices": [
      "cargo init-bin",
      "rustc new",
      "cargo new",
      "cargo start"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does cargo check do?",
    "topic": "Cargo, crates & rustc basics",
    "choices": [
      "Runs every unit test and then reports the results",
      "Type-checks without producing a binary, so it is fast",
      "Verifies that no dependency has known security advisories",
      "Formats the source code according to the style guide"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where does cargo build --release place its output by default?",
    "topic": "Cargo, crates & rustc basics",
    "choices": [
      "build/release",
      "target/release",
      "src/release",
      "dist"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of Cargo.lock?",
    "topic": "Cargo, crates & rustc basics",
    "choices": [
      "Recording the exact dependency versions that were resolved",
      "Preventing other people from editing Cargo.toml",
      "Listing the files that cargo should compile",
      "Storing the compiled binary of the project"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a crate in Rust?",
    "topic": "Cargo, crates & rustc basics",
    "choices": [
      "A folder of images and assets bundled with a program",
      "A single function that is exported to other files",
      "The smallest unit the compiler builds, a binary or library",
      "A runtime layer that executes Rust bytecode on a VM"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do rustc and cargo relate?",
    "topic": "Cargo, crates & rustc basics",
    "choices": [
      "Cargo is a compiler and rustc is a package registry for crates",
      "rustc downloads crates while cargo compiles single source files",
      "Cargo drives rustc and also manages dependencies and builds",
      "They are two names for the very same executable program"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does cargo run do?",
    "topic": "Cargo, crates & rustc basics",
    "choices": [
      "Only downloads the dependencies listed in Cargo.toml",
      "Builds the project if needed, then runs the binary",
      "Only runs the tests in the tests directory",
      "Publishes the built binary to crates.io"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A Cargo.toml lists serde = \"1.0\". Which versions can cargo choose?",
    "topic": "Cargo, crates & rustc basics",
    "choices": [
      "Exactly 1.0.0 and nothing else",
      "Any version 1.0.0 or newer, including 2.x",
      "Only versions that start with 1.0",
      "Any compatible 1.x version at or above 1.0.0"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which command runs Clippy to catch common mistakes and non-idiomatic code?",
    "topic": "Cargo, crates & rustc basics",
    "choices": [
      "cargo clippy",
      "cargo lint",
      "cargo fmt",
      "cargo audit"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which directory holds compiled artifacts and is normally kept out of version control?",
    "topic": "Cargo, crates & rustc basics",
    "choices": [
      "src",
      "bin",
      ".cargo",
      "target"
    ],
    "answerIdx": 3
  },
  {
    "stem": "The compiler reports borrow of moved value. What does this mean?",
    "topic": "Reading compiler errors",
    "choices": [
      "A value was borrowed twice at the same time",
      "A value was used before it was declared",
      "A value was used after its ownership was moved elsewhere",
      "A value was dropped at the end of main"
    ],
    "answerIdx": 2
  },
  {
    "stem": "The error says cannot assign twice to immutable variable. What is the usual fix?",
    "topic": "Reading compiler errors",
    "choices": [
      "Add a semicolon after the assignment",
      "Declare the variable with mut",
      "Move the assignment into another function",
      "Change the assigned value to a reference"
    ],
    "answerIdx": 1
  },
  {
    "stem": "An error says mismatched types, expected i32 but found &str. What does it indicate?",
    "topic": "Reading compiler errors",
    "choices": [
      "The program ran out of memory while it was compiling",
      "A function was called with too many arguments at once",
      "A value of one type was given where another is required",
      "A crate version is not compatible with the toolchain"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do compiler warnings differ from errors?",
    "topic": "Reading compiler errors",
    "choices": [
      "Warnings stop compilation, errors do not",
      "Warnings do not stop compilation, errors do",
      "Warnings appear only in release builds",
      "Errors appear only when tests are run"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which command prints a long explanation for an error code such as E0382?",
    "topic": "Reading compiler errors",
    "choices": [
      "cargo docs E0382",
      "rustc --explain E0382",
      "rustc --help E0382",
      "cargo fix E0382"
    ],
    "answerIdx": 1
  },
  {
    "stem": "The compiler prints a long list of errors. What is generally the best place to start?",
    "topic": "Reading compiler errors",
    "choices": [
      "The last error, since it summarises all of the others",
      "The longest error, since it has the most detail",
      "The first error, because later ones are often caused by it",
      "Any error, as they are always independent"
    ],
    "answerIdx": 2
  },
  {
    "stem": "The error says cannot borrow v as mutable because it is also borrowed as immutable. What does this mean?",
    "topic": "Reading compiler errors",
    "choices": [
      "A shared borrow of v is still live while a mutable one is taken",
      "The variable v was declared without the mut keyword at all",
      "The vector v has run out of capacity and cannot grow",
      "Two threads are touching v at exactly the same moment"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the warning unused variable tell you?",
    "topic": "Reading compiler errors",
    "choices": [
      "A variable is declared but its value is never read",
      "A variable was declared twice in the same scope",
      "A variable holds a value that is too large",
      "A variable should have been declared with static"
    ],
    "answerIdx": 0
  },
  {
    "stem": "The compiler says match arms have incompatible types. What caused it?",
    "topic": "Reading compiler errors",
    "choices": [
      "The match has more arms than the compiler permits for a type",
      "Different arms of the match produce values of different types",
      "One arm uses a wildcard pattern before the other arms",
      "The matched value is not a number so it cannot be matched"
    ],
    "answerIdx": 1
  },
  {
    "stem": "The compiler says used binding x is possibly-uninitialized. What does it mean?",
    "topic": "Reading compiler errors",
    "choices": [
      "x was assigned more than once on the same code path",
      "x was assigned a value whose type does not match",
      "x is declared in an outer scope of the function",
      "On some code path, x is read before it is assigned"
    ],
    "answerIdx": 3
  }
]
```
