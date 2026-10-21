LAYER: systems-dev-1

```json
[
 {
  "stem": "In which order does a C toolchain process a source file on the way to an executable?",
  "topic": "The compilation pipeline",
  "choices": [
   "Compile, preprocess, link, assemble",
   "Preprocess, assemble, compile, link",
   "Assemble, preprocess, compile, link",
   "Preprocess, compile, assemble, link"
  ],
  "answerIdx": 3
 },
 {
  "stem": "What does the C preprocessor do with a line like #include <stdio.h>?",
  "topic": "The compilation pipeline",
  "choices": [
   "Textually pastes the header's contents into the source before compilation",
   "Links the library's compiled code into the executable at that line",
   "Compiles the header into a separate object file loaded at run time",
   "Imports only the declarations the program uses, checking them by name"
  ],
  "answerIdx": 0
 },
 {
  "stem": "What does running gcc -c main.c produce?",
  "topic": "The compilation pipeline",
  "choices": [
   "An object file, with no linking step",
   "A fully linked executable named a.out",
   "Preprocessed source text with macros expanded",
   "A text file of assembly instructions"
  ],
  "answerIdx": 0
 },
 {
  "stem": "Which gcc flag stops after the assembly text has been generated?",
  "topic": "The compilation pipeline",
  "choices": [
   "-c",
   "-E",
   "-S",
   "-o"
  ],
  "answerIdx": 2
 },
 {
  "stem": "A program calls a function that is declared in a header but defined nowhere. At which stage does the build fail?",
  "topic": "The compilation pipeline",
  "choices": [
   "The preprocessing stage, as a missing macro",
   "The compile stage, as a syntax error",
   "The assemble stage, as an unknown opcode",
   "The link stage, as an undefined reference"
  ],
  "answerIdx": 3
 },
 {
  "stem": "What is a translation unit in C?",
  "topic": "The compilation pipeline",
  "choices": [
   "A single function together with every function that it calls",
   "A group of object files that the linker merges into a library",
   "A source file after preprocessing, compiled into one object file",
   "One line of source that maps to exactly one machine instruction"
  ],
  "answerIdx": 2
 },
 {
  "stem": "What does the preprocessor do when it expands #define SQUARE(x) x*x?",
  "topic": "The compilation pipeline",
  "choices": [
   "It creates a type-checked inline function in the compiler",
   "It emits a run-time function that the linker resolves later",
   "Plain text substitution, with no type checks",
   "It evaluates the constant once, when the program starts up"
  ],
  "answerIdx": 2
 },
 {
  "stem": "What does compiling with -g add to the output?",
  "topic": "The compilation pipeline",
  "choices": [
   "Extra run-time bounds checks on array accesses",
   "A garbage collector linked into the program",
   "Compiler warnings that are promoted to errors",
   "Debug info mapping machine code to source"
  ],
  "answerIdx": 3
 },
 {
  "stem": "Why do compilers like LLVM translate source code into an intermediate representation?",
  "topic": "The compilation pipeline",
  "choices": [
   "So the program can be interpreted instead of compiled",
   "So the linker can skip symbol resolution",
   "So the source can be recovered exactly from the binary",
   "So optimizations can be shared across many languages and target CPUs"
  ],
  "answerIdx": 3
 },
 {
  "stem": "What may an optimizer such as -O2 do to your code?",
  "topic": "The compilation pipeline",
  "choices": [
   "Reorder side effects that the user could observe",
   "Swap compiled code for an interpreted fallback path",
   "Inline calls and drop dead code, keeping behavior",
   "Insert run-time checks that catch bugs but cost speed"
  ],
  "answerIdx": 2
 },
 {
  "stem": "Where do ordinary local variables of a C function usually live?",
  "topic": "Stack vs heap memory",
  "choices": [
   "On the heap",
   "In the .data section",
   "On the call stack",
   "In CPU cache only"
  ],
  "answerIdx": 2
 },
 {
  "stem": "Where does memory returned by malloc come from?",
  "topic": "Stack vs heap memory",
  "choices": [
   "The call stack",
   "The code segment",
   "A CPU register",
   "The heap"
  ],
  "answerIdx": 3
 },
 {
  "stem": "What happens to a function's stack frame when the function returns?",
  "topic": "Stack vs heap memory",
  "choices": [
   "It stays allocated on the stack until free is called",
   "It is reclaimed and later calls may overwrite it",
   "It is moved to the heap so that callers can use it",
   "It is zeroed and kept in place for the next call"
  ],
  "answerIdx": 1
 },
 {
  "stem": "What is wrong with a function that returns the address of its own local array?",
  "topic": "Stack vs heap memory",
  "choices": [
   "The array is copied to the heap and then leaks",
   "The frame is gone after return, so it dangles",
   "The compiler refuses to compile such a return at all",
   "The returned pointer is silently converted to NULL"
  ],
  "answerIdx": 1
 },
 {
  "stem": "Why is stack allocation so fast compared with heap allocation?",
  "topic": "Stack vs heap memory",
  "choices": [
   "The stack lives in faster physical memory chips than the heap",
   "It mostly just moves the stack pointer",
   "The OS never swaps the stack out to disk under any load",
   "The heap needs a system call for each single allocation"
  ],
  "answerIdx": 1
 },
 {
  "stem": "Which situation is a typical cause of a stack overflow?",
  "topic": "Stack vs heap memory",
  "choices": [
   "Calling malloc more times than free is called",
   "Declaring too many global variables in a program",
   "Opening more files than the per-process limit allows",
   "Unbounded recursion, or huge local arrays"
  ],
  "answerIdx": 3
 },
 {
  "stem": "What is a memory leak?",
  "topic": "Stack vs heap memory",
  "choices": [
   "Heap memory that is unreachable but never freed",
   "Reading stack memory after the function has returned",
   "Writing past the end of an array on the stack",
   "Freeing the same heap block twice in a row"
  ],
  "answerIdx": 0
 },
 {
  "stem": "On a typical x86-64 system, in which direction does the stack grow as data is pushed?",
  "topic": "Stack vs heap memory",
  "choices": [
   "Toward higher addresses",
   "It alternates between both directions",
   "Toward lower addresses",
   "It does not grow, its size is fixed per frame"
  ],
  "answerIdx": 2
 },
 {
  "stem": "How long does a heap block stay valid?",
  "topic": "Stack vs heap memory",
  "choices": [
   "Until the function that allocated it returns",
   "Until it is explicitly freed or the process exits",
   "Until the next allocation of the same size",
   "Until the end of the enclosing block"
  ],
  "answerIdx": 1
 },
 {
  "stem": "What is heap fragmentation?",
  "topic": "Stack vs heap memory",
  "choices": [
   "Heap data being spread across several separate processes",
   "Free space split into small pieces, so a big request can fail",
   "The heap being divided into read-only and writable halves",
   "The stack and the heap growing until they collide"
  ],
  "answerIdx": 1
 },
 {
  "stem": "What is 0xFF in decimal?",
  "topic": "Binary, hex & bitwise operations",
  "choices": [
   "256",
   "127",
   "255",
   "15"
  ],
  "answerIdx": 2
 },
 {
  "stem": "What is the result of 0b1010 & 0b0110?",
  "topic": "Binary, hex & bitwise operations",
  "choices": [
   "0b0010",
   "0b1110",
   "0b1100",
   "0b0100"
  ],
  "answerIdx": 0
 },
 {
  "stem": "For an unsigned integer x without overflow, what does x << 3 compute?",
  "topic": "Binary, hex & bitwise operations",
  "choices": [
   "x multiplied by 3",
   "x divided by 8",
   "x raised to the 3rd power",
   "x multiplied by 8"
  ],
  "answerIdx": 3
 },
 {
  "stem": "Which expression tests whether bit n of x is set?",
  "topic": "Binary, hex & bitwise operations",
  "choices": [
   "x | (1 << n)",
   "x ^ n",
   "(x & n) == 1",
   "(x >> n) & 1"
  ],
  "answerIdx": 3
 },
 {
  "stem": "How is -1 represented in 8-bit two's complement?",
  "topic": "Binary, hex & bitwise operations",
  "choices": [
   "11111111",
   "10000001",
   "10000000",
   "01111111"
  ],
  "answerIdx": 0
 },
 {
  "stem": "What does x ^ x evaluate to for any integer x?",
  "topic": "Binary, hex & bitwise operations",
  "choices": [
   "x",
   "All bits set",
   "1",
   "0"
  ],
  "answerIdx": 3
 },
 {
  "stem": "Which expression clears bit 2 of x and leaves the others unchanged?",
  "topic": "Binary, hex & bitwise operations",
  "choices": [
   "x & ~(1 << 2)",
   "x | (1 << 2)",
   "x ^ (1 << 2)",
   "x & (1 << 2)"
  ],
  "answerIdx": 0
 },
 {
  "stem": "How many bits does one hexadecimal digit represent?",
  "topic": "Binary, hex & bitwise operations",
  "choices": [
   "8",
   "2",
   "16",
   "4"
  ],
  "answerIdx": 3
 },
 {
  "stem": "Which expression is true for a nonzero x only when x is a power of two?",
  "topic": "Binary, hex & bitwise operations",
  "choices": [
   "(x | (x - 1)) == 0",
   "(x & (x - 1)) == 0",
   "(x ^ (x - 1)) == 1",
   "(x & (x + 1)) == 0"
  ],
  "answerIdx": 1
 },
 {
  "stem": "Which operation flips bit n of x regardless of its current value?",
  "topic": "Binary, hex & bitwise operations",
  "choices": [
   "x ^ (1 << n)",
   "x | (1 << n)",
   "x & (1 << n)",
   "x & ~(1 << n)"
  ],
  "answerIdx": 0
 },
 {
  "stem": "What does a pointer variable store?",
  "topic": "Pointers & addresses",
  "choices": [
   "A copy of the value it points to",
   "The size of the object it points to",
   "A memory address",
   "The name of the variable it points to"
  ],
  "answerIdx": 2
 },
 {
  "stem": "What does the expression &x yield for a variable x?",
  "topic": "Pointers & addresses",
  "choices": [
   "The value of x",
   "The address of x",
   "The size of x in bytes",
   "The address of the next variable after x"
  ],
  "answerIdx": 1
 },
 {
  "stem": "What does *p do when p is an int pointer?",
  "topic": "Pointers & addresses",
  "choices": [
   "Accesses the int stored at the address in p",
   "Returns the address of p itself",
   "Multiplies p by itself",
   "Allocates a new int and stores it in p"
  ],
  "answerIdx": 0
 },
 {
  "stem": "On a 64-bit platform, how do sizeof(char *) and sizeof(double *) compare?",
  "topic": "Pointers & addresses",
  "choices": [
   "char * is 1 byte, while double * is 8 bytes",
   "Both are 4 bytes, since an int is 4 bytes",
   "char * is 1 byte, while double * is 4 bytes",
   "Both are 8 bytes, whatever the pointee type"
  ],
  "answerIdx": 3
 },
 {
  "stem": "What typically happens when a program dereferences a NULL pointer?",
  "topic": "Pointers & addresses",
  "choices": [
   "Undefined behavior, usually a segmentation fault",
   "It reads the value 0 safely",
   "It allocates memory on demand",
   "The compiler inserts a check and skips the line"
  ],
  "answerIdx": 0
 },
 {
  "stem": "After int a = 1; int *p = &a; *p = 5; what is a?",
  "topic": "Pointers & addresses",
  "choices": [
   "5",
   "1",
   "The address of a",
   "Undefined"
  ],
  "answerIdx": 0
 },
 {
  "stem": "What does the declaration int **pp describe?",
  "topic": "Pointers & addresses",
  "choices": [
   "A pointer to an array of two ints",
   "A pointer that holds the address of another int pointer",
   "Two independent int pointers",
   "A pointer that can only hold NULL"
  ],
  "answerIdx": 1
 },
 {
  "stem": "Why do C functions take a pointer parameter to let callers see a modified value?",
  "topic": "Pointers & addresses",
  "choices": [
   "C passes arguments by reference by default, so pointers are optional",
   "Pointers passed to a function get deep-copied into the callee frame",
   "Only pointer types are allowed as parameters of a C function",
   "C passes arguments by value, so a pointer reaches the caller's variable"
  ],
  "answerIdx": 3
 },
 {
  "stem": "If p is an int * holding address 1000 and sizeof(int) is 4, what is p + 1?",
  "topic": "Pointers & addresses",
  "choices": [
   "Address 1001",
   "Address 1008",
   "Address 1004",
   "Address 996"
  ],
  "answerIdx": 2
 },
 {
  "stem": "Two pointers hold the same address. What follows?",
  "topic": "Pointers & addresses",
  "choices": [
   "A write through one is visible when reading through the other",
   "Each has its own private copy of the pointed object",
   "The second write fails with an error",
   "Both pointers become NULL"
  ],
  "answerIdx": 0
 },
 {
  "stem": "What is the basic loop a CPU repeats to run a program?",
  "topic": "How the CPU executes code",
  "choices": [
   "Parse the source, compile it, run it",
   "Load a page, swap it, flush it",
   "Fetch an instruction, decode it, execute it",
   "Read a line, tokenize it, interpret it"
  ],
  "answerIdx": 2
 },
 {
  "stem": "What does the program counter register hold?",
  "topic": "How the CPU executes code",
  "choices": [
   "The number of instructions executed so far",
   "The address of the next instruction to execute",
   "The current top of the stack",
   "The result of the last arithmetic operation"
  ],
  "answerIdx": 1
 },
 {
  "stem": "Why are CPU registers important for performance?",
  "topic": "How the CPU executes code",
  "choices": [
   "They hold the whole program so RAM is not needed",
   "They are the fastest storage, located inside the CPU",
   "They are large enough to cache the heap",
   "They are shared by all processes for communication"
  ],
  "answerIdx": 1
 },
 {
  "stem": "What does the instruction set architecture (ISA) define?",
  "topic": "How the CPU executes code",
  "choices": [
   "The instructions and registers software sees",
   "The clock speed of the memory bus on the board",
   "The file format that executables use on disk",
   "The layout and size of the L1 cache lines"
  ],
  "answerIdx": 0
 },
 {
  "stem": "What does the call instruction on x86 do besides jumping to the target?",
  "topic": "How the CPU executes code",
  "choices": [
   "Copies the callee's code into the caller",
   "Disables interrupts until return",
   "Pushes the return address onto the stack",
   "Saves all registers to the heap"
  ],
  "answerIdx": 2
 },
 {
  "stem": "Which CPU component performs arithmetic and logical operations?",
  "topic": "How the CPU executes code",
  "choices": [
   "The MMU",
   "The DMA controller",
   "The ALU",
   "The instruction cache"
  ],
  "answerIdx": 2
 },
 {
  "stem": "Why must the OS save registers during a context switch?",
  "topic": "How the CPU executes code",
  "choices": [
   "So that registers are cleared for security reasons only",
   "So the process can later resume where it stopped",
   "Because all running processes share the same registers",
   "So that the CPU cache can be flushed in time"
  ],
  "answerIdx": 1
 },
 {
  "stem": "How does a conditional jump such as je usually decide whether to jump?",
  "topic": "How the CPU executes code",
  "choices": [
   "It re-evaluates the C condition from the source code",
   "It asks the operating system to evaluate the branch",
   "It reads a predicted value stored in the next instruction",
   "It checks flags set by an earlier compare"
  ],
  "answerIdx": 3
 },
 {
  "stem": "What is the purpose of instruction pipelining?",
  "topic": "How the CPU executes code",
  "choices": [
   "Overlapping stages of several instructions to raise throughput",
   "Running each instruction on a separate machine",
   "Compressing instructions in memory",
   "Translating instructions to a simpler ISA"
  ],
  "answerIdx": 0
 },
 {
  "stem": "Can a binary compiled for x86-64 run natively on an ARM64 CPU?",
  "topic": "How the CPU executes code",
  "choices": [
   "Yes, as long as the same operating system is installed",
   "Yes, since machine code is portable between all CPUs",
   "Only if the binary was statically linked beforehand",
   "No, the encodings differ, so recompile or emulate it"
  ],
  "answerIdx": 3
 },
 {
  "stem": "What is the main job of the linker?",
  "topic": "Linkers, loaders & executables",
  "choices": [
   "Translate C source into assembly for the target CPU",
   "Expand macros and includes before the compiler runs",
   "Merge object files, resolving symbols into one executable",
   "Load the finished program into memory and start it"
  ],
  "answerIdx": 2
 },
 {
  "stem": "What does static linking do with a library?",
  "topic": "Linkers, loaders & executables",
  "choices": [
   "Leaves the library to be loaded at run time",
   "Copies the needed library code into the executable",
   "Compiles the library again at each start",
   "Keeps the library on disk and maps it lazily by name only"
  ],
  "answerIdx": 1
 },
 {
  "stem": "What is an advantage of dynamic linking with shared libraries?",
  "topic": "Linkers, loaders & executables",
  "choices": [
   "The executable never depends on files outside itself",
   "Function calls become faster than static calls",
   "Many processes share one copy of the library code in memory",
   "The library is compiled with the application's flags"
  ],
  "answerIdx": 2
 },
 {
  "stem": "Which executable format does Linux use?",
  "topic": "Linkers, loaders & executables",
  "choices": [
   "PE",
   "ELF",
   "Mach-O",
   "COFF"
  ],
  "answerIdx": 1
 },
 {
  "stem": "What does the loader do when you start a program?",
  "topic": "Linkers, loaders & executables",
  "choices": [
   "Recompiles the code for the CPU that it is running on",
   "Maps its segments into memory and starts at the entry point",
   "Resolves macros in the source files before the program starts",
   "Rewrites the symbol table so names become shorter"
  ],
  "answerIdx": 1
 },
 {
  "stem": "What does the linker error undefined reference to foo mean?",
  "topic": "Linkers, loaders & executables",
  "choices": [
   "foo was defined twice in different input files",
   "foo has a different type in two headers",
   "No input provides a definition of foo",
   "foo was declared after its first use in a file"
  ],
  "answerIdx": 2
 },
 {
  "stem": "What causes a multiple definition linker error?",
  "topic": "Linkers, loaders & executables",
  "choices": [
   "The same external symbol is defined in two object files",
   "A header file is included twice",
   "A function is declared twice in one file",
   "A library is missing"
  ],
  "answerIdx": 0
 },
 {
  "stem": "What is stored in the .bss section?",
  "topic": "Linkers, loaders & executables",
  "choices": [
   "Zero-initialized globals, taking no file space",
   "The machine code of the whole program",
   "Read-only string literals and other constants",
   "Initialized globals that have non-zero starting values"
  ],
  "answerIdx": 0
 },
 {
  "stem": "What does the static keyword do on a global function in C?",
  "topic": "Linkers, loaders & executables",
  "choices": [
   "Allocates the function's variables on the stack",
   "Gives it internal linkage, hidden from other files",
   "Makes the function run once when the program starts",
   "Forces the function to be linked statically"
  ],
  "answerIdx": 1
 },
 {
  "stem": "What is relocation in the linking process?",
  "topic": "Linkers, loaders & executables",
  "choices": [
   "Moving the output file into another directory",
   "Copying the heap into a new region of memory",
   "Renaming symbols to avoid conflicts between files",
   "Patching addresses once the final layout is known"
  ],
  "answerIdx": 3
 }
]
```

LAYER: systems-dev-2

```json
[
 {
  "stem": "Given int a[5]; int *p = a; what does p += 2 make p point to?",
  "topic": "Pointers & pointer arithmetic",
  "choices": [
   "a[2]",
   "a[1], since pointers start at index -1",
   "The byte two bytes after a[0]",
   "a[3], because C counts from one"
  ],
  "answerIdx": 0
 },
 {
  "stem": "If p and q are int pointers into the same array, what does p - q give?",
  "topic": "Pointers & pointer arithmetic",
  "choices": [
   "The number of bytes between them",
   "The address difference divided by 2",
   "The sum of both addresses",
   "The number of elements between them"
  ],
  "answerIdx": 3
 },
 {
  "stem": "In C, which expression is equivalent to a[i]?",
  "topic": "Pointers & pointer arithmetic",
  "choices": [
   "*a + i",
   "&(a + i)",
   "a + *i",
   "*(a + i)"
  ],
  "answerIdx": 3
 },
 {
  "stem": "Why can you not directly dereference a void * in standard C?",
  "topic": "Pointers & pointer arithmetic",
  "choices": [
   "It always holds NULL until a type is assigned at run time",
   "It has no pointee type, so the read size is unknown",
   "It points to read-only memory that programs cannot access",
   "The dereference operator is only defined for array pointers"
  ],
  "answerIdx": 1
 },
 {
  "stem": "What does const int *p allow?",
  "topic": "Pointers & pointer arithmetic",
  "choices": [
   "Changing the int through p, but never moving p again",
   "Moving p, but not changing the int it points to",
   "Neither moving p nor changing the int it points to",
   "Both moving p and changing the int it points to"
  ],
  "answerIdx": 1
 },
 {
  "stem": "What does int *const p mean?",
  "topic": "Pointers & pointer arithmetic",
  "choices": [
   "p cannot be reassigned, but the int can be changed",
   "The int is read-only, but p can be moved elsewhere",
   "p can only ever point at global constant values",
   "p must point to an int that was allocated on the heap"
  ],
  "answerIdx": 0
 },
 {
  "stem": "What does the declaration int (*fp)(int) describe?",
  "topic": "Pointers & pointer arithmetic",
  "choices": [
   "A function that returns a pointer to an int value",
   "An array of pointers to functions that return int",
   "A pointer to a function taking and returning int",
   "A pointer to the int that a function has returned"
  ],
  "answerIdx": 2
 },
 {
  "stem": "Which statement about a pointer one past the last element of an array is correct?",
  "topic": "Pointers & pointer arithmetic",
  "choices": [
   "It can be dereferenced and always reads back as zero",
   "Merely forming such a pointer is undefined behavior",
   "It can be compared, but not dereferenced",
   "It is always equal to NULL on every platform"
  ],
  "answerIdx": 2
 },
 {
  "stem": "For char *c and struct S *s, how far does c + 1 move compared with s + 1?",
  "topic": "Pointers & pointer arithmetic",
  "choices": [
   "Both move exactly 1 byte",
   "Both move by the size of a machine word",
   "c moves 1 byte, s moves sizeof(struct S) bytes",
   "c moves sizeof(char *) bytes, s moves 1 byte"
  ],
  "answerIdx": 2
 },
 {
  "stem": "If s is a pointer to a struct with a field x, what is s->x equivalent to?",
  "topic": "Pointers & pointer arithmetic",
  "choices": [
   "(*s).x",
   "*(s.x)",
   "&s.x",
   "s.*x"
  ],
  "answerIdx": 0
 },
 {
  "stem": "What does malloc return when it cannot satisfy a request?",
  "topic": "malloc, free & the heap",
  "choices": [
   "A pointer to zero bytes",
   "NULL",
   "The address of the stack",
   "It aborts the program"
  ],
  "answerIdx": 1
 },
 {
  "stem": "How does calloc differ from malloc?",
  "topic": "malloc, free & the heap",
  "choices": [
   "calloc allocates on the stack",
   "calloc zero-initializes the memory",
   "calloc never returns NULL",
   "calloc rounds sizes up to a page"
  ],
  "answerIdx": 1
 },
 {
  "stem": "What is the bug in this code?\nchar *p = malloc(8);\nfree(p);\np[0] = 'a';",
  "topic": "malloc, free & the heap",
  "choices": [
   "A memory leak",
   "A use-after-free write",
   "A double free",
   "A stack overflow"
  ],
  "answerIdx": 1
 },
 {
  "stem": "What may happen when the same pointer is passed to free twice?",
  "topic": "malloc, free & the heap",
  "choices": [
   "The second call safely does nothing at all",
   "The block is allocated again by the library",
   "The pointer is reset to NULL by the library",
   "Heap corruption or a crash, as it is undefined"
  ],
  "answerIdx": 3
 },
 {
  "stem": "After a successful realloc to a larger size, what is true about the original pointer?",
  "topic": "malloc, free & the heap",
  "choices": [
   "It may be invalid, since the block can move",
   "It always stays valid and points to the same data",
   "It now refers to the new and larger block",
   "It is reset to NULL by the realloc call"
  ],
  "answerIdx": 0
 },
 {
  "stem": "Why is p = realloc(p, n) risky?",
  "topic": "malloc, free & the heap",
  "choices": [
   "realloc always frees the old block before copying it",
   "On failure the old block leaks, as p becomes NULL",
   "It can only shrink blocks and never grow them",
   "On failure it makes p point into the stack region"
  ],
  "answerIdx": 1
 },
 {
  "stem": "What does free(NULL) do?",
  "topic": "malloc, free & the heap",
  "choices": [
   "Crashes the program",
   "Frees the whole heap",
   "Returns an error code that must be checked",
   "Nothing, it is defined as a no-op"
  ],
  "answerIdx": 3
 },
 {
  "stem": "Why is p = malloc(n * sizeof *p) often preferred over malloc(n * sizeof(int))?",
  "topic": "malloc, free & the heap",
  "choices": [
   "It returns zero-filled memory instead of random bytes",
   "The size stays right if the type of p changes",
   "It makes the NULL check after malloc unnecessary",
   "It lets the compiler use the stack for small sizes"
  ],
  "answerIdx": 1
 },
 {
  "stem": "Which pointer may be passed to free?",
  "topic": "malloc, free & the heap",
  "choices": [
   "Any pointer into the middle of a heap block",
   "Any pointer at all, including a stack address",
   "Only one returned by malloc, calloc or realloc",
   "Any pointer, as long as it is properly aligned"
  ],
  "answerIdx": 2
 },
 {
  "stem": "How does a typical malloc implementation obtain memory from the OS?",
  "topic": "malloc, free & the heap",
  "choices": [
   "It makes one system call for every single malloc",
   "It asks for big chunks with brk or mmap and splits them",
   "It reserves a fixed pool at compile time and reuses it",
   "It borrows spare pages from the stack when needed"
  ],
  "answerIdx": 1
 },
 {
  "stem": "How does C mark the end of a string?",
  "topic": "Arrays, strings & structs",
  "choices": [
   "A length stored before the characters",
   "A newline character",
   "A terminating null byte",
   "The end of the array object"
  ],
  "answerIdx": 2
 },
 {
  "stem": "For char s[] = \"hello\"; what are strlen(s) and sizeof(s)?",
  "topic": "Arrays, strings & structs",
  "choices": [
   "5 and 6",
   "5 and 5",
   "6 and 6",
   "6 and 5"
  ],
  "answerIdx": 0
 },
 {
  "stem": "What happens to an array when it is passed to a function?",
  "topic": "Arrays, strings & structs",
  "choices": [
   "It decays to a pointer to its first element",
   "The whole array is copied to the callee",
   "It is converted to a struct",
   "It is passed as a read-only reference with its length"
  ],
  "answerIdx": 0
 },
 {
  "stem": "What does C do when you read a[10] on an array declared as int a[10]?",
  "topic": "Arrays, strings & structs",
  "choices": [
   "It throws a run-time exception that can be caught",
   "Nothing checks it, so it is undefined",
   "It returns 0 as a safe default value for the type",
   "It wraps around and returns the value of a[0]"
  ],
  "answerIdx": 1
 },
 {
  "stem": "Why can sizeof(struct) be larger than the sum of its members?",
  "topic": "Arrays, strings & structs",
  "choices": [
   "Each struct carries a hidden header",
   "Members are stored twice for safety",
   "The linker adds metadata to every object",
   "The compiler adds padding to align members"
  ],
  "answerIdx": 3
 },
 {
  "stem": "What does assigning one struct to another (b = a) do?",
  "topic": "Arrays, strings & structs",
  "choices": [
   "Makes b an alias that refers to the same storage as a",
   "Deep-copies everything that pointer members refer to",
   "Copies members by value, so pointers still share targets",
   "Fails to compile unless the struct is marked const"
  ],
  "answerIdx": 2
 },
 {
  "stem": "What is the problem with: char *s = \"hi\"; s[0] = 'H';",
  "topic": "Arrays, strings & structs",
  "choices": [
   "The index 0 is out of range for a two-character string",
   "Writing to a string literal is undefined behavior",
   "Pointers to char cannot be indexed with brackets in C",
   "The assignment leaks the memory that holds the literal"
  ],
  "answerIdx": 1
 },
 {
  "stem": "What does if (a == b) compare when a and b are char * strings?",
  "topic": "Arrays, strings & structs",
  "choices": [
   "The addresses, not the text",
   "The characters up to the null byte",
   "The lengths of the strings",
   "The hash values of the strings"
  ],
  "answerIdx": 0
 },
 {
  "stem": "Which indices are valid for int a[10]?",
  "topic": "Arrays, strings & structs",
  "choices": [
   "1 through 10",
   "0 through 9",
   "0 through 10",
   "-1 through 9"
  ],
  "answerIdx": 1
 },
 {
  "stem": "Why is strcpy(dst, src) dangerous?",
  "topic": "Arrays, strings & structs",
  "choices": [
   "It stops copying at the first space character it sees",
   "It frees the source buffer after the copy completes",
   "It only works when src is a string literal",
   "It never checks that dst is big enough"
  ],
  "answerIdx": 3
 },
 {
  "stem": "What does undefined behavior mean in C?",
  "topic": "Undefined behavior",
  "choices": [
   "The program is guaranteed to crash with a fatal signal",
   "The result is implementation-defined and documented for you",
   "No requirements apply, and compilers assume it never happens",
   "The compiler always rejects the program with an error"
  ],
  "answerIdx": 2
 },
 {
  "stem": "Which statement about integer overflow is correct?",
  "topic": "Undefined behavior",
  "choices": [
   "Both signed and unsigned overflow wrap around silently",
   "Signed overflow is undefined, unsigned wraps",
   "Both signed and unsigned overflow are undefined behavior",
   "Unsigned overflow is undefined, while signed overflow wraps"
  ],
  "answerIdx": 1
 },
 {
  "stem": "What is the status of reading an uninitialized local int variable?",
  "topic": "Undefined behavior",
  "choices": [
   "It gives an indeterminate value and may be undefined behavior",
   "It always reads as 0",
   "It reads the last value the stack held, and this is guaranteed",
   "The compiler rejects it"
  ],
  "answerIdx": 0
 },
 {
  "stem": "A program with a use-after-free bug seems to work in testing. What can be said?",
  "topic": "Undefined behavior",
  "choices": [
   "The bug may remain, since UB can hide for a while",
   "The bug is harmless because the output was correct",
   "The allocator guarantees freed memory is kept intact",
   "It is defined behavior on most mainstream systems"
  ],
  "answerIdx": 0
 },
 {
  "stem": "Why might a compiler delete a later if (p == NULL) check after code that dereferenced p?",
  "topic": "Undefined behavior",
  "choices": [
   "Compilers always strip NULL checks in optimized builds",
   "NULL checks are not allowed after the first use of p",
   "The dereference sets p to a valid address by itself",
   "The dereference is UB for NULL, so p is assumed valid"
  ],
  "answerIdx": 3
 },
 {
  "stem": "What does the strict aliasing rule say?",
  "topic": "Undefined behavior",
  "choices": [
   "Two pointers may never hold the same address value",
   "Pointers must never be cast to integer types at all",
   "Access via an incompatible pointer type is undefined",
   "Only char pointers may ever be dereferenced in C"
  ],
  "answerIdx": 2
 },
 {
  "stem": "What is the result of 1 / 0 for ints in C?",
  "topic": "Undefined behavior",
  "choices": [
   "Infinity",
   "Undefined behavior",
   "Zero",
   "A compile-time error in all cases"
  ],
  "answerIdx": 1
 },
 {
  "stem": "What can an out-of-bounds write to a stack array do?",
  "topic": "Undefined behavior",
  "choices": [
   "Overwrite neighbors such as the return address",
   "Safely extend the array into free stack space",
   "Raise a language-level exception for the program",
   "Be silently ignored by the CPU's memory unit"
  ],
  "answerIdx": 0
 },
 {
  "stem": "What happens when shifting a 32-bit int left by 32 bits?",
  "topic": "Undefined behavior",
  "choices": [
   "The result is 0",
   "The value is rotated back to itself",
   "Undefined behavior",
   "A run-time exception is raised"
  ],
  "answerIdx": 2
 },
 {
  "stem": "Why is correct output on your machine not enough to rule out undefined behavior?",
  "topic": "Undefined behavior",
  "choices": [
   "C programs produce random output between runs",
   "The OS rewrites results when the CPU model differs",
   "Only a unit test run can use a different compiler",
   "Results can change with compiler, flags or platform"
  ],
  "answerIdx": 3
 },
 {
  "stem": "Which compiler flag lets gdb show source lines and variable names?",
  "topic": "Debugging with gdb & valgrind",
  "choices": [
   "-O3",
   "-Wall",
   "-static",
   "-g"
  ],
  "answerIdx": 3
 },
 {
  "stem": "What does break main do in gdb?",
  "topic": "Debugging with gdb & valgrind",
  "choices": [
   "Terminates the program being debugged right away",
   "Stops execution at the start of main",
   "Removes every breakpoint that was set earlier on",
   "Prints the full source code of the function main"
  ],
  "answerIdx": 1
 },
 {
  "stem": "What does the gdb command bt show?",
  "topic": "Debugging with gdb & valgrind",
  "choices": [
   "The binary tree of memory",
   "The breakpoints table",
   "The list of threads",
   "The current call stack"
  ],
  "answerIdx": 3
 },
 {
  "stem": "What is the difference between next and step in gdb?",
  "topic": "Debugging with gdb & valgrind",
  "choices": [
   "step enters called functions, next runs them as one step",
   "next enters called functions, step runs them as one step",
   "step goes backward in time, next goes forward",
   "They are the same"
  ],
  "answerIdx": 0
 },
 {
  "stem": "What does valgrind's memcheck tool detect?",
  "topic": "Debugging with gdb & valgrind",
  "choices": [
   "Slow functions and CPU cache misses in hot loops",
   "Data races between threads that run concurrently",
   "Source lines that no test case ever managed to reach",
   "Bad accesses, leaks and uninitialized reads"
  ],
  "answerIdx": 3
 },
 {
  "stem": "What does gdb ./prog core let you do?",
  "topic": "Debugging with gdb & valgrind",
  "choices": [
   "Inspect a crashed process after the fact",
   "Start prog under a sampling profiler run",
   "Recompile prog with extra debug information",
   "Run prog across several CPU cores at once"
  ],
  "answerIdx": 0
 },
 {
  "stem": "What does a gdb watchpoint (watch x) do?",
  "topic": "Debugging with gdb & valgrind",
  "choices": [
   "Stops when the value of x changes",
   "Prints the value of x at every source line run",
   "Prevents any code from modifying the variable x",
   "Stops at every function that reads or uses x anywhere"
  ],
  "answerIdx": 0
 },
 {
  "stem": "In a valgrind leak report, what does definitely lost mean?",
  "topic": "Debugging with gdb & valgrind",
  "choices": [
   "Memory that the program freed twice in a row",
   "Memory still reachable through a global variable",
   "Heap memory with no pointer left at exit",
   "Stack memory that was overwritten by a later call"
  ],
  "answerIdx": 2
 },
 {
  "stem": "What does the gdb command x/4xw &a do?",
  "topic": "Debugging with gdb & valgrind",
  "choices": [
   "Executes the next four instructions in a row",
   "Exits gdb with the status code set to 4",
   "Shows 4 words of memory in hex at a's address",
   "Prints the variable a four times in a row"
  ],
  "answerIdx": 2
 },
 {
  "stem": "Why does running a program under valgrind make it much slower?",
  "topic": "Debugging with gdb & valgrind",
  "choices": [
   "It turns off compiler optimizations in the source",
   "It forces all memory pages to be swapped to disk",
   "It restricts the program to one thread of execution",
   "It simulates the CPU and checks every memory access"
  ],
  "answerIdx": 3
 },
 {
  "stem": "What does printf return?",
  "topic": "The C standard library",
  "choices": [
   "The number of characters printed",
   "The pointer to the output buffer",
   "The length of the format string",
   "Zero on success"
  ],
  "answerIdx": 0
 },
 {
  "stem": "Why is fgets preferred over the removed gets function?",
  "topic": "The C standard library",
  "choices": [
   "fgets reads input noticeably faster than gets does",
   "fgets handles Unicode text while gets did not",
   "fgets returns an integer status instead of a pointer",
   "fgets takes a size limit, which prevents overflows"
  ],
  "answerIdx": 3
 },
 {
  "stem": "When should memmove be used instead of memcpy?",
  "topic": "The C standard library",
  "choices": [
   "When the data being copied is a string of text",
   "When the destination buffer lives on the heap",
   "When the regions may overlap",
   "When the byte count exceeds the size of a page"
  ],
  "answerIdx": 2
 },
 {
  "stem": "What does qsort need as an argument?",
  "topic": "The C standard library",
  "choices": [
   "A pointer to a swap table",
   "A hash function",
   "A comparison function pointer",
   "A sorted copy of the array"
  ],
  "answerIdx": 2
 },
 {
  "stem": "How does errno work?",
  "topic": "The C standard library",
  "choices": [
   "Every successful library call resets it back to 0",
   "It holds the exit status of the last child process",
   "It points to the text of the last error message",
   "Failing calls set it, so read it right after"
  ],
  "answerIdx": 3
 },
 {
  "stem": "What does fopen return when the file cannot be opened?",
  "topic": "The C standard library",
  "choices": [
   "NULL",
   "-1",
   "A closed FILE pointer",
   "0 as a file descriptor"
  ],
  "answerIdx": 0
 },
 {
  "stem": "Why might printf output not appear before a crash?",
  "topic": "The C standard library",
  "choices": [
   "printf writes only when the program exits normally",
   "The crash erases whatever the terminal has shown",
   "stdout is buffered until a newline or fflush",
   "printf sends its text to stderr before stdout gets it"
  ],
  "answerIdx": 2
 },
 {
  "stem": "What is a gotcha of strncpy(dst, src, n)?",
  "topic": "The C standard library",
  "choices": [
   "It always pads the end of dst with space characters",
   "It copies the bytes in reverse order in dst",
   "It frees the src buffer once the copy is finished",
   "It may leave dst without a null terminator"
  ],
  "answerIdx": 3
 },
 {
  "stem": "What does exit() do that dying from a crash does not?",
  "topic": "The C standard library",
  "choices": [
   "Frees every heap block by calling free on each one",
   "Kills all of the child processes of the program",
   "Runs atexit handlers and flushes stdio",
   "Resets the terminal to the state it had before"
  ],
  "answerIdx": 2
 },
 {
  "stem": "Why is strtol better than atoi for parsing user input?",
  "topic": "The C standard library",
  "choices": [
   "It runs a lot faster than atoi on most inputs",
   "It reports errors and where parsing stopped",
   "It also accepts floating point numbers as input",
   "It allocates the parsed result on the heap for you"
  ],
  "answerIdx": 1
 }
]
```
