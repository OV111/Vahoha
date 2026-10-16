You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "Data Structures & Algorithms" (dsa, category cs). It has 15 layers, listed at the bottom.

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
### Layer 1 of 15 — id: dsa-1
Title: Complexity Analysis and Problem-Solving Method
Technologies: Big O, Python, Complexity
Description: Learn to measure an algorithm before you write it. You will use Big-O notation for time and space, read constraints to choose an approach, and follow a repeatable method for every problem in the rest of this track.
Topics:
- Big-O, Big-Omega and Big-Theta
- Time versus space trade-offs
- Amortized analysis
- Reading constraints to pick an approach
- A method: clarify, examples, brute force, optimize, test
- Testing with edge cases and counter-examples

### Layer 2 of 15 — id: dsa-2
Title: Arrays, Strings, Two Pointers, and Sliding Window
Technologies: Arrays, Strings, Two Pointers
Description: Master the most common data structure and the patterns that make it fast. Two pointers, sliding windows and prefix sums turn many quadratic problems into linear ones.
Topics:
- Array operations and their costs
- Strings, immutability and building efficiently
- Two pointers on sorted data
- Sliding window: fixed and variable size
- Prefix sums and difference arrays
- In-place algorithms

### Layer 3 of 15 — id: dsa-3
Title: Hashing: Maps, Sets, and Frequency Patterns
Technologies: Hash Maps, Sets, Python
Description: Learn why hash tables are the most useful structure in practice and how to use them to turn searches into lookups. You will also understand collisions, load factor and what makes a good key.
Topics:
- Hash functions, collisions and load factor
- Hash maps and sets in your language
- Counting and frequency maps
- Grouping with canonical keys (anagrams)
- Two-sum style complement lookups
- Hashing pitfalls: mutable keys and ordering

### Layer 4 of 15 — id: dsa-4
Title: Linked Lists, Stacks, and Queues
Technologies: Linked Lists, Stacks, Queues
Description: Build the linear structures that underlie recursion, parsing and scheduling. You will learn when a list beats an array, how a stack models nesting, and how queues model fair ordering.
Topics:
- Singly and doubly linked lists
- Reversing, merging and cycle detection
- Stacks and the call stack
- Monotonic stacks
- Queues, deques and circular buffers
- Implementing a queue with stacks and vice versa

### Layer 5 of 15 — id: dsa-5
Title: Recursion and Backtracking
Technologies: Recursion, Backtracking
Description: Think recursively: define a problem in terms of smaller versions of itself. You will use recursion for divide and conquer, then add backtracking to search all possibilities such as permutations and subsets.
Topics:
- Base case, recursive case and the call stack
- Recursion versus iteration and stack depth
- Divide and conquer
- Subsets, permutations and combinations
- Backtracking with pruning
- Constraint problems: N-Queens and Sudoku

### Layer 6 of 15 — id: dsa-6
Title: Sorting and Binary Search
Technologies: Sorting, Binary Search
Description: Understand how sorting works and use it as a tool. You will implement the main algorithms, learn what stability means, and apply binary search not just to arrays but to any monotonic answer space.
Topics:
- Insertion, merge, quick and heap sort
- Comparison sort lower bound and counting sort
- Stability and in-place sorting
- Binary search and off-by-one care
- Binary search on the answer
- Sorting as a preprocessing step

### Layer 7 of 15 — id: dsa-7
Title: Trees and Binary Search Trees
Technologies: Trees, BST, DFS, BFS
Description: Work with hierarchical data. You will traverse binary trees recursively and level by level, use binary search trees for ordered data, and see why balance matters.
Topics:
- Binary tree terminology and representations
- Depth-first traversals: pre, in and post order
- Breadth-first (level order) traversal
- Binary search trees: search, insert, delete
- Balanced trees: AVL and red-black ideas
- Lowest common ancestor and path problems

### Layer 8 of 15 — id: dsa-8
Title: Heaps and Priority Queues
Technologies: Heaps, Priority Queue
Description: Use heaps to repeatedly get the smallest or largest item quickly. You will build one from an array, then apply it to top-k, merging and scheduling problems.
Topics:
- The heap property and array representation
- Push, pop and heapify costs
- Top-k elements and k-th largest
- Merging k sorted lists
- Two heaps and the running median
- Scheduling with priority queues

### Layer 9 of 15 — id: dsa-9
Title: Graphs: Representation, BFS, and DFS
Technologies: Graphs, BFS, DFS
Description: Model relationships as graphs and traverse them. You will choose between adjacency lists and matrices, run BFS and DFS, and use them for connectivity, grids and cycle detection.
Topics:
- Vertices, edges, directed and weighted graphs
- Adjacency list versus adjacency matrix
- Breadth-first search and shortest unweighted paths
- Depth-first search and connected components
- Grid problems as implicit graphs
- Cycle detection and bipartite checking

### Layer 10 of 15 — id: dsa-10
Title: Shortest Paths, Topological Sort, and Union-Find
Technologies: Dijkstra, Topological Sort, Union-Find
Description: Solve the graph problems that appear in routing, dependency resolution and clustering. You will learn Dijkstra, Bellman-Ford, topological ordering, minimum spanning trees and disjoint sets.
Topics:
- Dijkstra's algorithm with a priority queue
- Bellman-Ford and negative weights
- Topological sort for dependencies
- Union-Find (disjoint set union)
- Minimum spanning trees: Kruskal and Prim
- Choosing an algorithm from the graph's properties

### Layer 11 of 15 — id: dsa-11
Title: Dynamic Programming I: Memoization and Tabulation
Technologies: Dynamic Programming
Description: Learn the technique that turns exponential recursion into polynomial time. You will define states and transitions, then implement them top-down with memoization and bottom-up with tables.
Topics:
- Overlapping subproblems and optimal substructure
- Defining state and transition
- Top-down memoization
- Bottom-up tabulation and space optimization
- 1D problems: climbing stairs, house robber, coin change
- Recovering the actual solution, not just the value

### Layer 12 of 15 — id: dsa-12
Title: Dynamic Programming II: Grids, Strings, and Knapsack
Technologies: Dynamic Programming, 2D DP
Description: Extend DP to two dimensions and to the problem families that appear most: grid paths, string alignment, knapsack and interval problems. You will learn to spot which family a new problem belongs to.
Topics:
- Grid path counting and minimum path sum
- 0/1 knapsack and unbounded knapsack
- Longest common subsequence and edit distance
- Palindromic substrings and partitions
- Interval DP
- DP with bitmasks (introduction)

### Layer 13 of 15 — id: dsa-13
Title: Greedy Algorithms, Intervals, and Bit Manipulation
Technologies: Greedy, Intervals, Bit Manipulation
Description: Learn when a locally best choice is globally best, and how to prove it. You will also handle interval scheduling and use bit tricks that make some problems short and fast.
Topics:
- The greedy-choice property and exchange arguments
- Interval scheduling, merging and meeting rooms
- Jump game and gas station style problems
- Huffman coding
- Bitwise operators and common tricks
- XOR, masks and counting set bits

### Layer 14 of 15 — id: dsa-14
Title: Tries, Segment Trees, and Advanced Structures
Technologies: Trie, Segment Tree, Fenwick Tree
Description: Add the specialized structures that solve specific problem classes quickly: prefix search, range queries with updates, and amortized sequences. Knowing they exist is half the skill.
Topics:
- Tries for prefix search and autocomplete
- Segment trees for range queries and updates
- Fenwick (binary indexed) trees
- Sparse tables and range minimum queries
- KMP and string matching
- Choosing a structure from query types

### Layer 15 of 15 — id: dsa-15
Title: Interview Strategy and Pattern Recognition
Technologies: Interview Patterns, Communication
Description: Combine everything into performance. You will map problems to patterns quickly, communicate your reasoning, handle hints and follow-ups, and build a practice routine that keeps skills sharp.
Topics:
- Pattern recognition across the whole track
- Thinking aloud and clarifying questions
- Handling hints and recovering from being stuck
- Follow-ups: scaling, memory limits, concurrency
- Mock interviews and review loops
- Spaced repetition for problem patterns

Start now with Layer 1.
