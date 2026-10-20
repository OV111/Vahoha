/**
 * Capstone brief — dsa track (cs), v1.
 *
 * Drafted by Claude, 2026-10-21; NOT yet reviewed by a human.
 * The seeder refuses to publish a brief whose `reviewed` flag is false.
 *
 * Shape notes:
 * - requirements[].check is for the stage-2 automated checks. `file` is a glob
 *   matched against the repo tree at the pinned commit. Requirements without a
 *   check are judged only by the AI rubric review.
 * - rubric[].weight values sum to 100. rubric[].layerId maps a weak criterion
 *   back to the roadmap layer that teaches it, for weak-spot tracking.
 * - Bump `version` for any change that affects grading; never edit a
 *   published version in place (attempts point at the exact brief document).
 */

import { DEFAULT_PASS_THRESHOLDS } from "../../../modules/capstone/lib/constants.js";
import { CHECKS, COMMON_RULES } from "../shared.js";

export default {
  trackId: "dsa",
  categoryId: "cs",
  slug: "dsa-algokit-library",
  version: 1,
  status: "draft",
  reviewed: false,
  title: "AlgoKit: A Tested Data Structures & Algorithms Library",
  summary:
    "Build a small, installable Python library of data structures and algorithms written from scratch (no stdlib " +
    "shortcuts for the structure being built), prove each one correct with property-based tests against a trusted " +
    "oracle, and measure its real running time with a benchmark harness that checks the claimed Big-O. A short pattern " +
    "guide in the README shows how each piece maps to classic problem types.",
  stack: [
    "Python 3.12+",
    "pytest",
    "Hypothesis",
    "mypy",
    "ruff",
    "pyproject.toml",
  ],

  requirements: [
    {
      id: "package",
      text: "A pip-installable package with a src layout and pyproject.toml, fully type-annotated and passing mypy --strict.",
      check: { type: "file", glob: "pyproject.toml" },
    },
    {
      id: "hash-map",
      text: "Implement a hash map from scratch (no dict inside) with a documented collision strategy, load-factor based resizing, and amortized O(1) get and put.",
    },
    {
      id: "lru-cache",
      text: "Implement an LRU cache with O(1) get and put using your own doubly linked list plus your hash map.",
    },
    {
      id: "heap",
      text: "Implement a binary min-heap on an array with push, pop and heapify, and use it for a top-k function and a k-way sorted merge.",
    },
    {
      id: "sorting-search",
      text: "Implement merge sort (stable), quicksort with a randomized pivot, and a binary search that also supports searching on the answer with a monotonic predicate.",
    },
    {
      id: "bst-traversals",
      text: "Implement a binary search tree with insert, search, delete, and iterative in-order, pre-order and level-order traversals.",
    },
    {
      id: "graphs",
      text: "Implement a graph with an adjacency list plus BFS shortest path, DFS connected components, and cycle detection for directed graphs.",
    },
    {
      id: "weighted-graphs",
      text: "Implement Dijkstra using your heap, topological sort (Kahn), and a Union-Find with path compression and union by rank used by a Kruskal minimum spanning tree.",
    },
    {
      id: "dynamic-programming",
      text: "Implement three DP problems in both memoized and tabulated form (for example edit distance, 0/1 knapsack, longest increasing subsequence) and show the space-optimized version of one.",
    },
    {
      id: "trie-advanced",
      text: "Implement a trie with prefix search, plus one of: segment tree with range updates, or Fenwick tree.",
    },
    {
      id: "property-tests",
      text: "Each structure and algorithm has property-based Hypothesis tests that compare against an oracle (sorted(), heapq, dict, networkx or a brute-force version) over random inputs, plus hand-written edge cases (empty, single element, duplicates).",
      check: { type: "file", glob: "tests/**/test_*.py" },
    },
    {
      id: "benchmarks",
      text: "A benchmark script times each operation at growing input sizes (for example n = 1e3 to 1e6) and writes a table or chart to docs/; the README compares measured growth to the claimed complexity.",
      check: {
        type: "file",
        glob: "{benchmarks/**/*.py,bench/**/*.py,scripts/bench*.py}",
      },
    },
    {
      id: "complexity-docs",
      text: "Every public function's docstring states its time and space complexity and the invariant it relies on.",
    },
    {
      id: "pattern-guide",
      text: "README includes a pattern guide listing at least 10 problem patterns (two pointers, sliding window, monotonic stack, BFS on grid, and so on), each pointing to the code in the library and one example problem.",
      check: CHECKS.readme,
    },
    {
      id: "ci",
      text: "CI workflow runs ruff, mypy and pytest on every push.",
      check: CHECKS.ci,
    },
  ],

  rubric: [
    {
      id: "complexity-method",
      name: "Complexity Analysis & Benchmarking",
      weight: 15,
      layerId: "dsa-1",
      description:
        "Correct complexity claims, amortized reasoning, and a benchmark that actually tests them.",
    },
    {
      id: "hash-lists",
      name: "Hashing, Lists & Caches",
      weight: 10,
      layerId: "dsa-3",
      description:
        "Sound collision handling and resizing; LRU built correctly from list plus map.",
    },
    {
      id: "sorting-search",
      name: "Sorting & Binary Search",
      weight: 10,
      layerId: "dsa-6",
      description:
        "Stable merge sort, randomized quicksort, and off-by-one-safe binary search including search on the answer.",
    },
    {
      id: "trees-heaps",
      name: "Trees & Heaps",
      weight: 15,
      layerId: "dsa-7",
      description:
        "Correct BST deletion, iterative traversals, and a heap that holds its invariant under all operations.",
    },
    {
      id: "graph-algorithms",
      name: "Graph Algorithms",
      weight: 20,
      layerId: "dsa-10",
      description:
        "Correct BFS, DFS, Dijkstra, topological sort and Union-Find, including negative or disconnected edge cases.",
    },
    {
      id: "dp",
      name: "Dynamic Programming",
      weight: 10,
      layerId: "dsa-11",
      description:
        "Clear state and transition definitions, equal answers from memoized and tabulated versions.",
    },
    {
      id: "advanced-structures",
      name: "Tries & Range Structures",
      weight: 10,
      layerId: "dsa-14",
      description:
        "Trie and segment or Fenwick tree implemented correctly with the right complexity.",
    },
    {
      id: "pattern-communication",
      name: "Pattern Recognition & Explanation",
      weight: 10,
      layerId: "dsa-15",
      description:
        "The pattern guide shows when to reach for each structure and explains trade-offs clearly.",
    },
  ],

  twistPool: [
    {
      id: "balanced-tree",
      text: "Replace or extend the BST with a self-balancing tree (AVL or red-black) and show in the benchmark that sorted inserts stay O(log n).",
    },
    {
      id: "a-star",
      text: "Add A* search on a weighted grid with a pluggable heuristic and prove with a test that it never returns a longer path than Dijkstra.",
    },
    {
      id: "bloom-filter",
      text: "Add a Bloom filter and measure its false-positive rate against the theoretical formula for several sizes.",
    },
    {
      id: "cli-visualizer",
      text: "Add a CLI that animates one algorithm step by step in the terminal and records each step's comparisons for a test.",
    },
  ],

  rules: COMMON_RULES,

  passThresholds: DEFAULT_PASS_THRESHOLDS,
};
