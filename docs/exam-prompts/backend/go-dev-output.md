LAYER: go-dev-1

```json
[
  {
    "stem": "What is the value of `var n int` immediately after this declaration, with no initializer?",
    "topic": "Variables, constants & basic types",
    "choices": [
      "nil, because the variable has no value yet",
      "0, because every type has a zero value",
      "Undefined, so reading it is a compile error",
      "Whatever bytes were already in that memory"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the zero value of a `string` variable look like in Go?",
    "topic": "Variables, constants & basic types",
    "choices": [
      "The nil string",
      "The string \"null\"",
      "A string of one zero byte",
      "The empty string"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where is the short variable declaration `x := 10` allowed?",
    "topic": "Variables, constants & basic types",
    "choices": [
      "Only at package level",
      "Anywhere, including package level",
      "Only inside functions",
      "Only inside the main function"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Given `const ( A = iota; B; C )`, what is the value of C?",
    "topic": "Variables, constants & basic types",
    "choices": [
      "3",
      "1",
      "0",
      "2"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens with `var x int = 3; var y float64 = x`?",
    "topic": "Variables, constants & basic types",
    "choices": [
      "Compile error: an explicit conversion like float64(x) is required",
      "y becomes 3.0 through an automatic widening conversion",
      "It compiles but panics at runtime",
      "It compiles and x is silently promoted to float64"
    ],
    "answerIdx": 0
  },
  {
    "stem": "`const Pi = 3.14159` followed by `var f float32 = Pi` compiles. Why?",
    "topic": "Variables, constants & basic types",
    "choices": [
      "Pi is an untyped constant, so it adopts the type needed by its context",
      "Constants are always converted to float32 by the compiler",
      "Go allows implicit conversion between all numeric types",
      "Pi is stored as float64 and truncated at runtime"
    ],
    "answerIdx": 0
  },
  {
    "stem": "`rune` is an alias for which built-in type?",
    "topic": "Variables, constants & basic types",
    "choices": [
      "uint8",
      "int32",
      "int",
      "uint16"
    ],
    "answerIdx": 1
  },
  {
    "stem": "For `s := \"héllo\"` where é is encoded as two bytes in UTF-8, what does len(s) return?",
    "topic": "Variables, constants & basic types",
    "choices": [
      "5",
      "6",
      "7",
      "4"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the compiler do when a local variable is declared but never used?",
    "topic": "Variables, constants & basic types",
    "choices": [
      "Prints a warning and continues",
      "Defers the check to go vet only",
      "Removes the variable silently",
      "Reports a compile error"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does this print?\nx := 1\nif true {\n  x := 2\n  _ = x\n}\nfmt.Println(x)",
    "topic": "Variables, constants & basic types",
    "choices": [
      "2, because the inner block overwrites x",
      "Nothing, because the code fails to compile",
      "0, because the inner x resets the outer one",
      "1, because the inner x is a new variable that shadows the outer one"
    ],
    "answerIdx": 3
  },
  {
    "stem": "In what order do multiple deferred calls in one function run when it returns?",
    "topic": "Functions, multiple returns & defer",
    "choices": [
      "First in, first out",
      "In alphabetical order of function names",
      "All at once in parallel",
      "Last in, first out"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does this print?\ni := 1\ndefer fmt.Println(i)\ni = 2",
    "topic": "Functions, multiple returns & defer",
    "choices": [
      "2, because defer reads the final value of i",
      "0, because defer runs before assignments",
      "It does not compile because defer cannot take arguments",
      "1, because deferred call arguments are evaluated when defer executes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "By convention, where does a Go function place the error in its return values?",
    "topic": "Functions, multiple returns & defer",
    "choices": [
      "As the last return value",
      "As the first return value",
      "In a separate global variable",
      "Inside a struct returned with the result"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does this function return?\nfunc f() (n int) {\n  defer func() { n++ }()\n  return 1\n}",
    "topic": "Functions, multiple returns & defer",
    "choices": [
      "1",
      "2",
      "0",
      "It does not compile"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the blank identifier `_` commonly used for in `v, _ := f()`?",
    "topic": "Functions, multiple returns & defer",
    "choices": [
      "Marking the variable as private to the package",
      "Declaring a variable that is constant",
      "Discarding a return value you do not need",
      "Telling the compiler to skip error checking"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Inside `func sum(nums ...int)`, what is the type of nums?",
    "topic": "Functions, multiple returns & defer",
    "choices": [
      "[]int",
      "[...]int",
      "*int",
      "map[int]int"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A deferred call placed inside a for loop body runs when...",
    "topic": "Functions, multiple returns & defer",
    "choices": [
      "The enclosing function returns",
      "The current loop iteration ends",
      "The loop finishes",
      "The garbage collector next runs"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which statement about functions in Go is correct?",
    "topic": "Functions, multiple returns & defer",
    "choices": [
      "They can only be called by name and never stored in variables",
      "They must be declared at package level and cannot be nested as literals",
      "They are first-class values that can be assigned to variables and passed as arguments",
      "They can be overloaded by parameter type"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where does `recover()` actually stop a panic?",
    "topic": "Functions, multiple returns & defer",
    "choices": [
      "When called directly inside a deferred function",
      "When called anywhere in the same file",
      "Only in the main function",
      "When called after the panic in normal code flow"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Given `nums := []int{1,2,3}`, how do you pass it to `func sum(vals ...int)`?",
    "topic": "Functions, multiple returns & defer",
    "choices": [
      "sum(nums)",
      "sum(...nums)",
      "sum([]nums)",
      "sum(nums...)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How many looping keywords does Go have?",
    "topic": "Control flow — if, for, switch",
    "choices": [
      "Two: for and while",
      "Three: for, while and do",
      "One: for",
      "Two: for and foreach"
    ],
    "answerIdx": 2
  },
  {
    "stem": "After a matching `case` in a Go switch finishes its body, what happens next?",
    "topic": "Control flow — if, for, switch",
    "choices": [
      "Execution continues into the next case body",
      "The switch ends, with no fallthrough by default",
      "Execution continues until a break appears",
      "The remaining cases are evaluated too"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does `for i, r := range \"héllo\"` yield for r?",
    "topic": "Control flow — if, for, switch",
    "choices": [
      "Each byte of the UTF-8 encoding",
      "Each rune, with i as the starting byte index",
      "Each grapheme as a string",
      "Each rune, with i as the rune count"
    ],
    "answerIdx": 1
  },
  {
    "stem": "In `if v, ok := m[k]; ok { ... }`, where is v in scope?",
    "topic": "Control flow — if, for, switch",
    "choices": [
      "Throughout the entire function",
      "Only inside the if block, not else",
      "Everywhere in the package",
      "Inside the if and any else blocks only"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a `switch` with no expression, like `switch { case x > 5: ... }`, equivalent to?",
    "topic": "Control flow — if, for, switch",
    "choices": [
      "A loop over all cases",
      "A compile error",
      "An if / else if chain",
      "A switch on the value true that requires fallthrough"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Inside a `for` loop, a `break` placed in a `switch` case ends what?",
    "topic": "Control flow — if, for, switch",
    "choices": [
      "The enclosing for loop",
      "The whole function",
      "Only the switch",
      "Both the switch and the loop"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you write an infinite loop in Go?",
    "topic": "Control flow — if, for, switch",
    "choices": [
      "while (true) { }",
      "loop { }",
      "for (;;;) { }",
      "for { }"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does `continue` do inside a for loop?",
    "topic": "Control flow — if, for, switch",
    "choices": [
      "Exits the loop completely",
      "Skips the rest of the current iteration and starts the next",
      "Restarts the loop from the first iteration",
      "Jumps to the end of the function"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a labeled break such as `break outer` used for?",
    "topic": "Control flow — if, for, switch",
    "choices": [
      "Jumping to any line in the file",
      "Exiting a function early",
      "Exiting an outer loop from inside a nested one",
      "Skipping one iteration of the outer loop"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which rule applies to the body of an `if` statement in Go?",
    "topic": "Control flow — if, for, switch",
    "choices": [
      "Braces are optional for one-line bodies",
      "The condition must be wrapped in parentheses",
      "Braces are mandatory even for a single statement",
      "The body must be on the same line as the condition"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why are `[3]int` and `[4]int` different types in Go?",
    "topic": "Arrays, slices & maps",
    "choices": [
      "The array length is part of the type",
      "They store different kinds of elements",
      "Arrays are always passed by reference",
      "The compiler picks the type from the first element"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What three things does a slice header hold?",
    "topic": "Arrays, slices & maps",
    "choices": [
      "A start address, an end address and an element type",
      "A length, a hash and a lock",
      "A pointer, a length and a reference count",
      "A pointer to an array, a length and a capacity"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens when append is called on a slice whose length equals its capacity?",
    "topic": "Arrays, slices & maps",
    "choices": [
      "The program panics with an out-of-range error",
      "The slice overwrites its first element",
      "The existing array is resized in place",
      "A larger backing array is allocated and elements are copied"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Given `s := []int{1,2,3,4}` and `t := s[1:3]`, what does `t[0] = 99` do?",
    "topic": "Arrays, slices & maps",
    "choices": [
      "Leaves s unchanged, since t is an independent copy",
      "Changes s[0], because slices count from the original start",
      "Panics because t is read-only",
      "Changes s[1], because both share the same backing array"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does `m[\"missing\"]` return if the key is absent from a `map[string]int`?",
    "topic": "Arrays, slices & maps",
    "choices": [
      "A runtime panic",
      "nil",
      "An error value",
      "0, the zero value for int"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens when you assign to an entry of a nil map?",
    "topic": "Arrays, slices & maps",
    "choices": [
      "The map is created automatically",
      "The assignment is silently ignored",
      "A compile error",
      "A runtime panic"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you tell a missing map key apart from a stored zero value?",
    "topic": "Arrays, slices & maps",
    "choices": [
      "Compare the result to nil",
      "Use the two-value form: v, ok := m[k]",
      "Call len(m[k])",
      "Check m.Has(k)"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What are the length and capacity of `make([]int, 3, 10)`?",
    "topic": "Arrays, slices & maps",
    "choices": [
      "Length 3, capacity 10",
      "Length 10, capacity 3",
      "Length 3, capacity 3",
      "Length 13, capacity 10"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does `copy(dst, src)` copy when dst has length 2 and src has length 5?",
    "topic": "Arrays, slices & maps",
    "choices": [
      "5 elements, growing dst to fit",
      "All 5 elements, with the extra ones dropped",
      "2 elements, the smaller of the two lengths",
      "0 elements, because the lengths differ"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which type cannot be used as a map key?",
    "topic": "Arrays, slices & maps",
    "choices": [
      "A string",
      "A slice",
      "An array of ints",
      "A struct of comparable fields"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does Go pass arguments to functions?",
    "topic": "Pointers & value vs reference semantics",
    "choices": [
      "Always by value, copying the argument",
      "By reference for structs and by value for ints",
      "By reference for everything except strings",
      "By value for small types and by reference for large ones"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Given `p := &x`, what does `*p = 5` do?",
    "topic": "Pointers & value vs reference semantics",
    "choices": [
      "Assigns the address 5 to p",
      "Writes 5 into x through the pointer",
      "Copies p into a new variable",
      "Declares a new pointer to 5"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens if you dereference a nil pointer?",
    "topic": "Pointers & value vs reference semantics",
    "choices": [
      "It returns the zero value of the type",
      "A runtime panic",
      "A compile error",
      "The program silently continues"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A function receives a struct by value and changes one of its fields. What does the caller see?",
    "topic": "Pointers & value vs reference semantics",
    "choices": [
      "The original struct is updated",
      "The compiler rejects the assignment",
      "Only nested fields are updated",
      "The original struct is unchanged"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A function changes `s[0]` on a slice parameter. What does the caller see?",
    "topic": "Pointers & value vs reference semantics",
    "choices": [
      "The change is invisible, because the slice was copied",
      "A panic, because slices are read-only in functions",
      "The change is visible, because both share the backing array",
      "The change is visible only if the slice is a pointer"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A function calls `append(s, 1)` on its slice parameter without returning it. What happens to the caller's slice length?",
    "topic": "Pointers & value vs reference semantics",
    "choices": [
      "Nothing, because the caller's header still has the old length",
      "It increases by one",
      "It doubles",
      "It resets to zero"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does `p := new(int)` produce?",
    "topic": "Pointers & value vs reference semantics",
    "choices": [
      "An int with the value 0",
      "A slice of one int",
      "A *int pointing at a zero-valued int",
      "A nil pointer that must be allocated later"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Is it safe to return a pointer to a local variable from a Go function?",
    "topic": "Pointers & value vs reference semantics",
    "choices": [
      "Yes, the compiler moves it to the heap when needed",
      "No, the variable is destroyed and the pointer dangles",
      "Only if the variable is declared with var",
      "Only inside the same package"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which of these is true about pointers in Go?",
    "topic": "Pointers & value vs reference semantics",
    "choices": [
      "Pointer arithmetic is not allowed",
      "You can add integers to a pointer like in C",
      "Pointers cannot point to structs",
      "Pointers are always nil-checked by the compiler"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Given `func (c Counter) Inc() { c.n++ }` with a value receiver, what happens to the caller's counter after calling Inc?",
    "topic": "Pointers & value vs reference semantics",
    "choices": [
      "It is incremented by one",
      "The call does not compile",
      "It is unchanged, because the method works on a copy",
      "It is incremented only if Counter is a struct"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does Go decide whether an identifier is exported from its package?",
    "topic": "Packages & the go command",
    "choices": [
      "It is declared with the export keyword",
      "Its name starts with an uppercase letter",
      "It appears in a public section of the file",
      "Its name ends with an underscore"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which package name and function make a program an executable?",
    "topic": "Packages & the go command",
    "choices": [
      "package app with func start",
      "package main with func main",
      "package main with func init",
      "Any package with a func run"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between `go run` and `go build`?",
    "topic": "Packages & the go command",
    "choices": [
      "go run compiles and runs without keeping a binary; go build produces a binary",
      "go run only checks syntax; go build executes the program",
      "go run builds for production; go build builds for tests",
      "They are identical; one is an alias of the other"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the compiler do about an imported package that is never used?",
    "topic": "Packages & the go command",
    "choices": [
      "Ignores it without any message",
      "Warns but still builds",
      "Fails with a compile error",
      "Removes the import automatically"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When does a package's `init()` function run?",
    "topic": "Packages & the go command",
    "choices": [
      "Automatically before main, after package-level variables are initialized",
      "Only when called explicitly from main",
      "After main returns",
      "Each time the package is imported by another file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the import `import _ \"image/png\"` achieve?",
    "topic": "Packages & the go command",
    "choices": [
      "Imports the package into a private namespace",
      "Marks the package as optional",
      "Runs the package's init for side effects without using its names",
      "Imports only the unexported identifiers"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does `go mod init example.com/app` do?",
    "topic": "Packages & the go command",
    "choices": [
      "Creates a go.mod file for a new module",
      "Downloads the dependencies for example.com/app",
      "Initializes a Git repository",
      "Compiles the app into an executable"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What rule applies to .go files in the same directory (excluding tests)?",
    "topic": "Packages & the go command",
    "choices": [
      "Each file must declare a different package name",
      "They must all declare the same package name",
      "Only one file may contain exported names",
      "They must be named after the package"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does `go build ./...` do?",
    "topic": "Packages & the go command",
    "choices": [
      "Builds only the main package",
      "Builds every package in the current module tree",
      "Builds the current directory without subdirectories",
      "Downloads all dependencies without compiling"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the Go compiler do on an import cycle between two packages?",
    "topic": "Packages & the go command",
    "choices": [
      "Resolves it by loading one package lazily",
      "Builds but warns at runtime",
      "Rejects the build with an error",
      "Allows it as long as no variable is shared"
    ],
    "answerIdx": 2
  }
]
```

LAYER: go-dev-2

```json
[
  {
    "stem": "What does a module's go.mod file record?",
    "topic": "Go modules & dependency management",
    "choices": [
      "The module path, the Go version and required dependency versions",
      "Only the list of source files in the module",
      "The compiled binary's checksum and build flags",
      "The Git history of the module"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of go.sum?",
    "topic": "Go modules & dependency management",
    "choices": [
      "Stores cryptographic hashes of dependencies so downloads can be verified",
      "Lists every function exported by the dependencies",
      "Pins the Go toolchain version for the build",
      "Caches compiled dependency binaries"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does `go mod tidy` do?",
    "topic": "Go modules & dependency management",
    "choices": [
      "Upgrades every dependency to its latest version",
      "Deletes the module cache",
      "Adds missing requirements and removes unused ones from go.mod",
      "Formats the go.mod file only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does Go's Minimal Version Selection choose a dependency version?",
    "topic": "Go modules & dependency management",
    "choices": [
      "It always picks the newest published version",
      "It picks the lowest version that satisfies every requirement in the build",
      "It picks the version with the most downloads",
      "It picks the version listed first in go.mod"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A module at major version 2 or higher, such as v2.1.0, must do what with its module path?",
    "topic": "Go modules & dependency management",
    "choices": [
      "Use a separate repository for each major version",
      "End the path with /v2",
      "Add a v2 build tag to every file",
      "Rename the package to include 2"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does `go get example.com/pkg@v1.4.0` do?",
    "topic": "Go modules & dependency management",
    "choices": [
      "Clones the repository into the current directory",
      "Installs pkg as a system-wide command only",
      "Pins every dependency to v1.4.0",
      "Updates go.mod to require that exact version and downloads it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a `replace` directive in go.mod typically used for?",
    "topic": "Go modules & dependency management",
    "choices": [
      "Redirecting a dependency to a local path or a fork",
      "Renaming an exported function",
      "Replacing the Go standard library",
      "Removing a dependency from go.sum"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does `go mod vendor` do?",
    "topic": "Go modules & dependency management",
    "choices": [
      "Publishes the module to a package registry",
      "Copies dependencies into a vendor directory inside the module",
      "Updates go.sum for the vendor team",
      "Removes unused dependencies from the build cache"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How are Go module versions normally published?",
    "topic": "Go modules & dependency management",
    "choices": [
      "By uploading a zip file to a central Go registry account",
      "By editing the version field in go.mod",
      "By running go publish",
      "By pushing a semantic version tag like v1.2.3 to the repository"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Should go.sum be committed to version control?",
    "topic": "Go modules & dependency management",
    "choices": [
      "No, it is regenerated on every machine",
      "Only for libraries, never for applications",
      "Only when vendoring is enabled",
      "Yes, so everyone verifies the same dependency hashes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does placing a package under an `internal/` directory do?",
    "topic": "Standard project layout",
    "choices": [
      "It hides the package from go doc output only",
      "Only code inside the parent of internal can import it",
      "It marks the package as deprecated",
      "It makes the package importable only by tests"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the usual role of a `cmd/` directory in a Go project?",
    "topic": "Standard project layout",
    "choices": [
      "Holds the main package for each executable the module builds",
      "Holds shared libraries imported by other modules",
      "Holds command-line flag definitions only",
      "Holds generated code"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does the go tool treat a directory named `testdata`?",
    "topic": "Standard project layout",
    "choices": [
      "It compiles it as a test-only package",
      "It ignores it when building packages",
      "It treats it as a vendor directory",
      "It requires it to contain a go.mod file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a `go.work` file make possible?",
    "topic": "Standard project layout",
    "choices": [
      "Running tests across all modules in parallel",
      "Locking dependency versions for the whole company",
      "Working on several local modules together without replace directives",
      "Compiling several modules into one binary"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Module A contains a package at `a/internal/x`. What happens if module B imports it?",
    "topic": "Standard project layout",
    "choices": [
      "It works, because go.mod makes packages public",
      "It works only if B uses a replace directive",
      "It works but prints a vet warning",
      "The build fails, because internal is not importable from outside"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where do Go unit test files normally live?",
    "topic": "Standard project layout",
    "choices": [
      "In a separate top-level tests directory",
      "In a directory named after the package plus -test",
      "Next to the code they test, in files ending in _test.go",
      "In a single test.go file per module"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is `http.Client` preferred over `http.HTTPClient` in Go naming?",
    "topic": "Standard project layout",
    "choices": [
      "Longer names are rejected by the compiler",
      "Exported types must be at most two words",
      "The package name is hidden from callers",
      "Callers already see the package name, so repeating it stutters"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which package name follows common Go convention?",
    "topic": "Standard project layout",
    "choices": [
      "A mixedCase name such as `userService`",
      "A name with underscores such as `user_service`",
      "A short, lowercase single word such as `user`",
      "A name that ends with the word package"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the `./...` pattern skip when matching directories?",
    "topic": "Standard project layout",
    "choices": [
      "Directories that contain test files",
      "Directories deeper than two levels",
      "Directories without a main package",
      "Directories that begin with _ or ."
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why might a module build several programs from `cmd/api/main.go` and `cmd/worker/main.go`?",
    "topic": "Standard project layout",
    "choices": [
      "Go allows only one main per file and merges them at link time",
      "The go tool picks one at random",
      "Each file runs as a goroutine of one program",
      "Each directory is its own main package, so each produces a separate binary"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does gofmt do?",
    "topic": "gofmt, go vet & golangci-lint",
    "choices": [
      "Checks for logic errors and reports them",
      "Compiles the source files into a binary",
      "Sorts exported functions alphabetically",
      "Rewrites source files into Go's single canonical formatting style"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which problem is `go vet` designed to catch?",
    "topic": "gofmt, go vet & golangci-lint",
    "choices": [
      "Syntax errors that stop compilation",
      "Suspicious code such as a Printf format that does not match its arguments",
      "Slow algorithms in hot paths",
      "Unused module dependencies"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is golangci-lint?",
    "topic": "gofmt, go vet & golangci-lint",
    "choices": [
      "A replacement for the Go compiler's type checker",
      "A formatter that replaces gofmt",
      "A package manager for linter plugins only",
      "A runner that executes many linters in one command with shared config"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does `gofmt -l .` print?",
    "topic": "gofmt, go vet & golangci-lint",
    "choices": [
      "The names of files whose formatting differs from gofmt style",
      "The line numbers of every syntax error",
      "A list of every package in the directory",
      "The license of each file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does goimports do beyond what gofmt does?",
    "topic": "gofmt, go vet & golangci-lint",
    "choices": [
      "Downloads missing dependencies from the internet",
      "Adds missing imports and removes unused ones",
      "Sorts struct fields by size",
      "Converts imports to relative paths"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What character does gofmt use for indentation?",
    "topic": "gofmt, go vet & golangci-lint",
    "choices": [
      "Two spaces",
      "Four spaces",
      "Whatever the first line in the file uses",
      "Tabs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where is golangci-lint's configuration normally stored?",
    "topic": "gofmt, go vet & golangci-lint",
    "choices": [
      "In a .golangci.yml file at the repository root",
      "Inside go.mod under a lint section",
      "In environment variables only",
      "In the go.sum file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why do CI pipelines often fail when `gofmt -l .` prints any file?",
    "topic": "gofmt, go vet & golangci-lint",
    "choices": [
      "It enforces one consistent format across every contributor",
      "It proves the program compiles",
      "It detects data races",
      "It checks the test coverage level"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What kind of bug does the errcheck linter report?",
    "topic": "gofmt, go vet & golangci-lint",
    "choices": [
      "Function calls whose returned error is ignored",
      "Errors that are wrapped twice",
      "Error messages that start with a capital letter",
      "Panics inside goroutines"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which statement about go vet is accurate?",
    "topic": "gofmt, go vet & golangci-lint",
    "choices": [
      "It analyzes code statically without running it",
      "It runs the program and records its behavior",
      "It rewrites code to fix issues automatically",
      "It replaces the need for unit tests"
    ],
    "answerIdx": 0
  },
  {
    "stem": "In Go, what is the built-in `error` type?",
    "topic": "Error handling idioms & wrapping",
    "choices": [
      "An interface with a single Error() string method",
      "A struct with a message and a code",
      "A string alias",
      "A special type thrown by panic"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you wrap an error while keeping the original inspectable?",
    "topic": "Error handling idioms & wrapping",
    "choices": [
      "fmt.Errorf(\"load config: %w\", err)",
      "fmt.Errorf(\"load config: %v\", err)",
      "errors.New(\"load config\" + err.Error())",
      "panic(err)"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does `errors.Is(err, ErrNotFound)` do?",
    "topic": "Error handling idioms & wrapping",
    "choices": [
      "Compares err and ErrNotFound by their messages only",
      "Checks whether ErrNotFound appears anywhere in err's wrapped chain",
      "Converts err into the ErrNotFound type",
      "Returns true when err is not nil"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does `errors.As(err, &target)` do?",
    "topic": "Error handling idioms & wrapping",
    "choices": [
      "Checks whether err equals target using ==",
      "Wraps err inside target",
      "Unwraps err one level only",
      "Finds the first error in the chain matching target's type and assigns it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "After `fmt.Errorf(\"read: %v\", err)`, what happens to `errors.Is(newErr, err)`?",
    "topic": "Error handling idioms & wrapping",
    "choices": [
      "It returns true, because the message contains the original text",
      "It panics, because %v is not supported in Errorf",
      "It returns true only for sentinel errors",
      "It returns false, because %v does not keep the original error in the chain"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the idiomatic response to a returned error that the current function cannot handle?",
    "topic": "Error handling idioms & wrapping",
    "choices": [
      "Return it, usually with added context, to the caller",
      "Call panic so the stack trace is printed",
      "Ignore it and continue with the zero value",
      "Log it and call os.Exit"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why compare against io.EOF with errors.Is instead of ==?",
    "topic": "Error handling idioms & wrapping",
    "choices": [
      "== is not defined for interface values",
      "errors.Is runs faster than ==",
      "The error may have been wrapped, and Is looks through the chain",
      "io.EOF is a string, not an error"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is panic the appropriate tool in Go?",
    "topic": "Error handling idioms & wrapping",
    "choices": [
      "For unrecoverable programmer errors or impossible states",
      "For any failure when reading a file",
      "For validating user input",
      "For returning an error to an HTTP client"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does `errors.Join(err1, err2)` return?",
    "topic": "Error handling idioms & wrapping",
    "choices": [
      "Only err1, discarding err2",
      "A new error with err2's message only",
      "An error that wraps both, so Is and As can match either",
      "A slice of errors"
    ],
    "answerIdx": 2
  },
  {
    "stem": "For a custom error type with a pointer receiver, `*MyErr`, how do you extract it from a chain?",
    "topic": "Error handling idioms & wrapping",
    "choices": [
      "var me MyErr; errors.As(err, me)",
      "var me *MyErr; errors.As(err, &me)",
      "me := err.(MyErr)",
      "errors.Is(err, MyErr{})"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the method set of the `io.Reader` interface?",
    "topic": "Reading the standard library",
    "choices": [
      "Read and Close",
      "Read and Write",
      "A single method: Read(p []byte) (n int, err error)",
      "Open and Read"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does `io.Copy(dst, src)` do?",
    "topic": "Reading the standard library",
    "choices": [
      "Copies a file's permissions",
      "Streams data from a Reader to a Writer until EOF or an error",
      "Duplicates an io.Reader into two readers",
      "Loads all of src into memory before writing"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which type is the standard way to read input line by line?",
    "topic": "Reading the standard library",
    "choices": [
      "strings.Reader",
      "bufio.Scanner",
      "bytes.Buffer",
      "os.Args"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use `strings.Builder` instead of repeated `+=` in a loop?",
    "topic": "Reading the standard library",
    "choices": [
      "It makes strings mutable by default",
      "It compresses the string as it builds",
      "It appends into a growing buffer rather than copying the whole string each time",
      "It runs the concatenation in parallel"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is `time.Duration` under the hood?",
    "topic": "Reading the standard library",
    "choices": [
      "A float64 of seconds",
      "A struct of hours, minutes and seconds",
      "A string such as 5s",
      "An int64 counting nanoseconds"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does `json.Marshal(v)` return?",
    "topic": "Reading the standard library",
    "choices": [
      "The JSON encoding of v as a string only",
      "The JSON encoding of v as bytes, plus an error",
      "A decoded copy of v",
      "A reader of JSON data"
    ],
    "answerIdx": 1
  },
  {
    "stem": "After a successful `http.Get`, what must the caller do with `resp.Body`?",
    "topic": "Reading the standard library",
    "choices": [
      "Nothing, because the garbage collector closes it",
      "Reset it with resp.Body.Reset()",
      "Close it, usually with defer, to release the connection",
      "Copy it to a file first"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does `os.ReadFile(\"a.txt\")` do?",
    "topic": "Reading the standard library",
    "choices": [
      "Opens the file and returns a streaming reader",
      "Reads only the first line",
      "Reads the whole file into a byte slice",
      "Returns the file's metadata"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the `slices` package in the standard library for?",
    "topic": "Reading the standard library",
    "choices": [
      "Low-level control of slice memory layout",
      "Generic helpers for slices such as Sort and Contains",
      "Converting arrays to slices at compile time",
      "Splitting strings into slices only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the command `go doc strings.Builder` show?",
    "topic": "Reading the standard library",
    "choices": [
      "The documentation for that type, in the terminal",
      "The compiled assembly for that type",
      "The commit history of the strings package",
      "The list of programs that import it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where must a doc comment be placed to document a function?",
    "topic": "Documentation with godoc",
    "choices": [
      "At the bottom of the file in a comments block",
      "Inside the function body as its first line",
      "Immediately above the declaration, with no blank line between",
      "In a separate .md file with the same name"
    ],
    "answerIdx": 2
  },
  {
    "stem": "By convention, how does a doc comment for function `Parse` begin?",
    "topic": "Documentation with godoc",
    "choices": [
      "With the name of the thing: \"Parse reads ...\"",
      "With the word Description",
      "With the author's name",
      "With a verb like Function that"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How is a package-level doc comment written?",
    "topic": "Documentation with godoc",
    "choices": [
      "As a comment inside func main",
      "In a file named README.go",
      "As a comment directly above the package clause",
      "As a string constant named Doc"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does an `ExampleFoo` function with an `// Output:` comment do?",
    "topic": "Documentation with godoc",
    "choices": [
      "Is ignored by the go tool",
      "Is compiled only into release binaries",
      "Runs as a test and appears as an example in the docs",
      "Prints its output during go build"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where is documentation for public Go modules rendered online?",
    "topic": "Documentation with godoc",
    "choices": [
      "On the module author's own server only",
      "In GitHub Pages automatically",
      "On go.mod's docs field URL",
      "pkg.go.dev, generated from source comments"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What marks an identifier as deprecated in its doc comment?",
    "topic": "Documentation with godoc",
    "choices": [
      "The @deprecated tag at the top of the file",
      "Renaming it with a leading underscore",
      "An attribute above the declaration",
      "A paragraph starting with \"Deprecated:\""
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a `doc.go` file typically used for?",
    "topic": "Documentation with godoc",
    "choices": [
      "Declaring all exported constants",
      "Holding the long package documentation comment",
      "Generating HTML pages at build time",
      "Listing package dependencies"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does go doc show by default for a package?",
    "topic": "Documentation with godoc",
    "choices": [
      "All identifiers including unexported ones",
      "Only the package comment",
      "Exported identifiers only",
      "Only the test functions"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you write a heading in a modern Go doc comment?",
    "topic": "Documentation with godoc",
    "choices": [
      "A line surrounded by equals signs",
      "A line starting with # followed by the title",
      "A line in all capital letters",
      "A line ending with a colon and a blank line"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is documenting exported identifiers expected in Go libraries?",
    "topic": "Documentation with godoc",
    "choices": [
      "The compiler refuses exported names without comments",
      "Undocumented exports are not importable",
      "Tools and linters treat undocumented exports as a gap and users rely on godoc",
      "Go runs doc comments as executable code"
    ],
    "answerIdx": 2
  }
]
```
