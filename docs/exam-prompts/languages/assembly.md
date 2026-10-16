You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Assembly" (assembly, category languages). It has 10 layers, listed at the bottom.

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
### Layer 1 of 10 — id: assembly-1
Title: Computer Architecture Fundamentals
Technologies: x86-64, CPU, registers, memory model
Description: Understand how modern CPUs work before writing a single instruction: the fetch-decode-execute cycle, registers, and the memory hierarchy.
Topics:
- Fetch-decode-execute cycle
- CPU registers and their roles
- Von Neumann vs Harvard architecture
- The memory hierarchy (registers, cache, RAM)
- Endianness (little vs big endian)
- Binary, hexadecimal, and two's complement

### Layer 2 of 10 — id: assembly-2
Title: x86-64 Registers and Instructions
Technologies: x86-64, NASM, rax/rbx/rcx, MOV/ADD/SUB
Description: Learn the x86-64 general-purpose registers, data sizes, and fundamental instructions — MOV, ADD, SUB, MUL, DIV — using NASM.
Topics:
- 64/32/16/8-bit register aliases (rax/eax/ax/al)
- MOV, MOVZX, MOVSX
- Arithmetic: ADD, SUB, IMUL, IDIV
- INC, DEC, NEG
- Data size suffixes (byte, word, dword, qword)
- NASM syntax and assembling with nasm + ld

### Layer 3 of 10 — id: assembly-3
Title: Memory and Addressing Modes
Technologies: x86-64, addressing modes, LEA, stack, heap
Description: Access memory using x86-64's addressing modes: register indirect, base+offset, scaled indexed, and RIP-relative.
Topics:
- Register indirect ([rax])
- Base + displacement ([rbx + 8])
- Scaled index ([rax + rcx*8])
- RIP-relative addressing for position-independent code
- LEA for address computation
- Section declarations (data, bss, text)

### Layer 4 of 10 — id: assembly-4
Title: Control Flow
Technologies: x86-64, CMP, JMP, conditional jumps, LOOP
Description: Implement conditionals and loops in assembly using the FLAGS register, CMP, and the full set of conditional jump instructions.
Topics:
- RFLAGS register (CF, ZF, SF, OF, PF)
- CMP and TEST instructions
- Unconditional JMP
- Conditional jumps (JE, JNE, JL, JG, JLE, JGE, JA, JB)
- LOOP and loop unrolling
- Jump tables for switch-like dispatch

### Layer 5 of 10 — id: assembly-5
Title: Stack and Calling Conventions
Technologies: x86-64, CALL/RET, System V ABI, stack frames, rbp
Description: Understand the call stack, System V AMD64 ABI calling conventions, and how to write assembly functions that C code can call.
Topics:
- CALL and RET mechanics
- System V AMD64 ABI: integer arguments (rdi, rsi, rdx, rcx, r8, r9)
- Return values in rax
- Caller-saved vs callee-saved registers
- Stack alignment requirements (16-byte)
- Stack frame setup with push rbp / mov rbp, rsp

### Layer 6 of 10 — id: assembly-6
Title: System Calls
Technologies: x86-64, syscall, Linux ABI, write/read/exit
Description: Make Linux system calls directly from assembly using the syscall instruction to perform I/O, process management, and file operations.
Topics:
- syscall instruction and return in rax
- Linux syscall numbers (write, read, open, close, exit)
- Syscall arguments in rdi, rsi, rdx, r10, r8, r9
- Error handling (negative rax = -errno)
- Reading from stdin and writing to stdout
- File descriptor operations

### Layer 7 of 10 — id: assembly-7
Title: SIMD – SSE and AVX
Technologies: SSE2, AVX2, XMM, YMM, intrinsics
Description: Accelerate data-parallel computations using SSE and AVX SIMD instructions to process multiple integers or floats in a single instruction.
Topics:
- XMM (128-bit) and YMM (256-bit) registers
- Packed integer and float instructions
- MOVAPS, MOVDQU, PADDD, ADDPS
- Shuffle and permute operations
- AVX2 256-bit integer operations
- C intrinsics as an alternative to raw SIMD

### Layer 8 of 10 — id: assembly-8
Title: Debugging with GDB
Technologies: GDB, DWARF, objdump, strace
Description: Debug assembly programs with GDB: set breakpoints, inspect registers and memory, disassemble functions, and trace system calls with strace.
Topics:
- GDB basics (break, run, step, next, continue)
- Examining registers (info registers)
- Inspecting memory (x command)
- Disassembly with disas and objdump
- Watching memory with watchpoints
- strace for system call tracing

### Layer 9 of 10 — id: assembly-9
Title: Inline Assembly in C/C++
Technologies: GCC inline asm, asm volatile, constraints, MSVC intrinsics
Description: Embed assembly snippets in C/C++ using GCC extended asm syntax to optimize hot paths while keeping the rest of the codebase portable.
Topics:
- GCC extended asm syntax (asm volatile)
- Input/output operand constraints
- Clobber lists
- Named operands with symbolic names
- Using CPUID to detect CPU features
- MSVC __asm and __declspec

### Layer 10 of 10 — id: assembly-10
Title: ARM Assembly
Technologies: ARM64, AArch64, AARCH64, Raspberry Pi, QEMU
Description: Learn ARM64 (AArch64) assembly — the architecture behind mobile phones, Apple Silicon, and Raspberry Pi — and compare it to x86-64.
Topics:
- ARM64 register file (x0–x30, sp, lr, pc)
- Load/store architecture vs x86 memory access
- ARM64 instruction encoding and condition codes
- Branch instructions and link register
- ARM64 SIMD with NEON
- Cross-compiling and emulating with QEMU

Start now with Layer 1.
