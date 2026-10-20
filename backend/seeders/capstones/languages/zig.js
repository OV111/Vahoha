/**
 * Capstone brief - zig track, v1.
 *
 * Drafted by Claude, 2026-10-21; NOT yet reviewed by a human.
 * The seeder refuses to publish a brief whose `reviewed` flag is false.
 */

import { DEFAULT_PASS_THRESHOLDS } from "../../../modules/capstone/lib/constants.js";
import { CHECKS, COMMON_RULES } from "../shared.js";

export default {
  trackId: "zig",
  categoryId: "languages",
  slug: "zig-log-search-cli",
  version: 1,
  status: "draft",
  reviewed: false,
  title: "Fast Log Search CLI with Allocator-Aware Design",
  summary:
    "Build a grep-like command line tool in Zig that streams large log files, filters lines by pattern and level, " +
    "aggregates counts in a hash map, and reports errors precisely. Memory use is explicit: every allocation goes " +
    "through a chosen allocator and the tool is tested for leaks, with a small C library linked through build.zig.",
  stack: ["Zig 0.14+", "zig build", "std.testing", "std.heap allocators", "C interop"],

  requirements: [
    {
      id: "build-zig",
      text: "The project has a build.zig and build.zig.zon, and `zig build`, `zig build run` and `zig build test` steps all work.",
      check: { type: "file", glob: "build.zig" },
    },
    {
      id: "allocators",
      text: "main uses a GeneralPurposeAllocator (or DebugAllocator) that reports leaks, and per-request work uses an ArenaAllocator that is freed in one call.",
    },
    {
      id: "streaming-slices",
      text: "Log files are read in a streaming way (buffered reader, line by line) and lines are handled as slices without copying unless needed.",
    },
    {
      id: "comptime-generic",
      text: "At least one generic container or helper is built with comptime type parameters (for example a generic ring buffer for the last N matches).",
    },
    {
      id: "error-handling",
      text: "Functions return custom error sets, use try/catch for propagation, and use errdefer to clean up on failure. Bad flags and missing files print a clear message and a non-zero exit code.",
    },
    {
      id: "hashmap-stats",
      text: "A --stats flag counts matches per log level and per key using std.StringHashMap and prints a sorted summary.",
    },
    {
      id: "c-interop",
      text: "A small C source or system library is linked via build.zig and called through @cImport (for example a C hash or timestamp parser).",
      check: { type: "file", glob: "**/*.{c,h}" },
    },
    {
      id: "cross-compile",
      text: "The README documents cross-compiling to at least two targets with -Dtarget and shows the commands used.",
    },
    {
      id: "tests",
      text: "Unit tests use std.testing, including a test with std.testing.allocator that proves there are no leaks.",
      check: { type: "file", glob: "{src/**/*.zig,test/**/*.zig}" },
    },
    {
      id: "readme",
      text: "README covers usage, flags, design notes on allocator choices, and benchmark numbers against grep.",
      check: CHECKS.readme,
    },
    {
      id: "ci",
      text: "A GitHub Actions workflow installs Zig, runs zig fmt --check and zig build test on every push.",
      check: CHECKS.ci,
    },
  ],

  rubric: [
    { id: "memory", name: "Allocators & Memory Safety", weight: 20, layerId: "zig-2", description: "Allocators are chosen deliberately, ownership is clear, and the tool shows no leaks under the testing allocator." },
    { id: "pointers", name: "Slices & Pointers", weight: 15, layerId: "zig-3", description: "Slices, optionals and sentinel-terminated data are used correctly and without needless copies." },
    { id: "comptime", name: "Comptime & Generics", weight: 15, layerId: "zig-4", description: "comptime is used where it removes duplication, not as decoration." },
    { id: "errors", name: "Error Handling", weight: 15, layerId: "zig-5", description: "Error sets are specific, errdefer is used for cleanup, and failures give useful messages." },
    { id: "std", name: "Standard Library Use", weight: 10, layerId: "zig-6", description: "ArrayList, HashMap and std.fmt are used idiomatically." },
    { id: "interop", name: "C Interoperability", weight: 10, layerId: "zig-7", description: "C code is linked through build.zig and called safely through @cImport." },
    { id: "build-test", name: "Build System & Testing", weight: 15, layerId: "zig-8", description: "build.zig defines clear steps, targets cross-compile, and tests are meaningful." },
  ],

  twistPool: [
    { id: "mmap", text: "Add a memory-mapped file mode and benchmark it against buffered reads." },
    { id: "threads", text: "Search several files in parallel with std.Thread and a work queue, with no data races." },
    { id: "wasm", text: "Compile the matching core to wasm32-freestanding and call it from a small HTML page." },
    { id: "regex-lite", text: "Implement a small regex subset (., *, ^, $, character classes) yourself instead of plain substring search." },
  ],

  rules: COMMON_RULES,

  passThresholds: DEFAULT_PASS_THRESHOLDS,
};
