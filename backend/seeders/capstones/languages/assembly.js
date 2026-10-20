/**
 * Capstone brief - assembly track, v1.
 *
 * Drafted by Claude, 2026-10-21; NOT yet reviewed by a human.
 * The seeder refuses to publish a brief whose `reviewed` flag is false.
 */

import { DEFAULT_PASS_THRESHOLDS } from "../../../modules/capstone/lib/constants.js";
import { CHECKS, COMMON_RULES } from "../shared.js";

export default {
  trackId: "assembly",
  categoryId: "languages",
  slug: "assembly-text-toolkit-x86-64",
  version: 1,
  status: "draft",
  reviewed: false,
  title: "x86-64 Linux Text Toolkit in NASM",
  summary:
    "Write a small suite of Linux command line tools in pure x86-64 NASM assembly with no libc: a wc-style counter, a " +
    "number-to-text converter and a hex dumper, plus a SIMD-accelerated byte counter. Everything uses raw system calls and the " +
    "System V calling convention, is tested with a shell harness, and is debugged with GDB.",
  stack: ["NASM", "x86-64 Linux", "GNU ld", "make", "GDB", "SSE2/AVX2", "GitHub Actions"],

  requirements: [
    {
      id: "makefile",
      text: "A Makefile builds every tool with `nasm -f elf64` and `ld`, with `make`, `make test` and `make clean` targets.",
      check: { type: "file", glob: "Makefile" },
    },
    {
      id: "sources",
      text: "Each tool is a separate .asm file with clear section .text, .data and .bss usage, and comments on every non-obvious instruction.",
      check: { type: "file", glob: "**/*.{asm,nasm,s}" },
    },
    {
      id: "syscalls",
      text: "All I/O uses the Linux syscall instruction (read, write, open, close, exit) with correct argument registers, and negative return values are treated as errors with a message and non-zero exit code.",
    },
    {
      id: "wc-tool",
      text: "The counter tool reads a file or stdin with a fixed-size buffer and prints line, word and byte counts that match `wc` on the test files.",
    },
    {
      id: "itoa-atoi",
      text: "Routines convert integers to decimal and hex text and back, handling zero, negative numbers and invalid input, using DIV and IMUL correctly.",
    },
    {
      id: "hexdump",
      text: "The hex dumper prints offset, hex bytes and ASCII columns for any file, using lookup tables and addressing modes such as [base + index*scale].",
    },
    {
      id: "abi",
      text: "Shared routines live in a separate file, follow the System V AMD64 convention (arguments in rdi, rsi, rdx, rcx, return in rax, callee-saved registers preserved) and keep the stack 16-byte aligned at calls.",
    },
    {
      id: "control-flow",
      text: "Loops and branches use CMP/TEST and conditional jumps with flag logic documented, and there are no magic jump offsets.",
    },
    {
      id: "simd",
      text: "A byte-counting function has a scalar version and an SSE2 or AVX2 version (PCMPEQB with PMOVMSKB or similar), with a benchmark comparing them on a large file.",
    },
    {
      id: "c-bridge",
      text: "At least one routine is also callable from a small C test program through extern, or through GCC inline assembly, to show the calling convention in practice.",
    },
    {
      id: "tests",
      text: "A shell test script compares each tool's output to the system utilities on several inputs, including an empty file, a file without a trailing newline and a missing file.",
      check: { type: "file", glob: "{test,tests}/**/*" },
    },
    {
      id: "gdb-notes",
      text: "The README includes a GDB session transcript that debugs one real bug: breakpoints, info registers, examining memory with x and stepping through instructions.",
    },
    {
      id: "ci",
      text: "A GitHub Actions workflow installs nasm, builds and runs the tests on every push.",
      check: CHECKS.ci,
    },
    {
      id: "readme",
      text: "README documents the architecture of each tool, register usage conventions, build steps and benchmark results.",
      check: CHECKS.readme,
    },
  ],

  rubric: [
    { id: "instructions", name: "Registers & Instructions", weight: 10, layerId: "assembly-2", description: "Instructions and register sizes are chosen correctly, and arithmetic is correct including edge cases." },
    { id: "memory", name: "Memory & Addressing", weight: 15, layerId: "assembly-3", description: "Buffers, tables and addressing modes are used correctly with no out-of-bounds access." },
    { id: "flow", name: "Control Flow", weight: 10, layerId: "assembly-4", description: "Loops and conditionals are correct, readable and use flags properly." },
    { id: "abi", name: "Stack & Calling Convention", weight: 20, layerId: "assembly-5", description: "Routines honor the ABI, preserve registers and align the stack, and are callable from C." },
    { id: "syscalls", name: "System Calls", weight: 15, layerId: "assembly-6", description: "Syscalls are used correctly with proper error handling and clean exit codes." },
    { id: "simd", name: "SIMD", weight: 15, layerId: "assembly-7", description: "The vector version is correct, handles tails, and is measured against the scalar one." },
    { id: "debug", name: "Debugging & Interop", weight: 15, layerId: "assembly-8", description: "The GDB workflow is evidenced and the C or inline assembly bridge works as described." },
  ],

  twistPool: [
    { id: "arm64-port", text: "Port the counter tool to ARM64 (AArch64) and run its tests under QEMU user emulation in CI." },
    { id: "avx2-dispatch", text: "Detect AVX2 at runtime with CPUID and choose between the SSE2 and AVX2 byte counter." },
    { id: "elf-reader", text: "Add a tool that reads an ELF64 header and prints the entry point and section count." },
    { id: "static-size", text: "Reduce the binary size of one tool to under 512 bytes and document each trick used." },
  ],

  rules: COMMON_RULES,

  passThresholds: DEFAULT_PASS_THRESHOLDS,
};
