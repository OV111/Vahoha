You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of 60 you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "LeetCode Patterns" (leetcode-patterns, category cs). It has 15 layers, listed at the bottom.

## HOW TO ANSWER
Write the bank for ONE layer per reply, in the order listed. Each reply must contain exactly 60 questions for that layer. After each reply, stop and wait; I will type "next".

## OUTPUT FORMAT — follow exactly
First line of EVERY reply, including every reply after "next": the layer marker, exactly like this, with the layer id from the list. A reply without it is thrown away by the importer.
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
5. LENGTH BIAS IS THE MOST COMMON FAILURE, and earlier banks failed it badly (the correct answer was the longest choice in up to 95% of questions, so learners passed by picking the longest). Follow this plan exactly. Number the questions 1 to 60; the position of question N in a cycle of 4 fixes how long its CORRECT choice is compared with its three wrong choices:
   - N = 1, 5, 9, ...: the correct choice is the SHORTEST of the four.
   - N = 2, 6, 10, ...: the correct choice is the second shortest.
   - N = 3, 7, 11, ...: the correct choice is the second longest.
   - N = 4, 8, 12, ...: the correct choice is the LONGEST of the four.
   Write the wrong choices with the same level of detail, specific terms and qualifiers as the right one; never make the right one the only careful, hedged or complete-sounding choice. Wrong choices must sound like a real technical claim, never absurd ("compiles HTML into machine code").
6. Spread "answerIdx" evenly across 0, 1, 2 and 3 (about 15 each). Do not put the answer at index 0 or 1 most of the time.
7. Difficulty mix per layer: about one third easy, half medium, the rest hard.
8. Cover every topic of the layer, roughly evenly. Never repeat or rephrase a question within the layer.
9. Each question must stand alone: no "see the diagram", no references to earlier questions. Short code snippets inside the stem are fine (use plain text, \n for line breaks, no markdown fences inside the JSON strings).
10. Stay accurate for current stable versions of the technologies. Avoid questions whose answer changed recently or is opinion.
11. Escape quotes properly so the JSON parses. No trailing commas, no comments.

## CHECK BEFORE YOU SEND EACH REPLY
Silently verify all of these, and fix the reply until every one holds. Do not print the check.
- The first line is LAYER: <the right layer id>.
- The array has exactly 60 questions.
- Count the questions whose correct choice is the longest of its four: at most 15. If more, lengthen wrong choices or shorten the right one until it holds.
- Each answerIdx value (0, 1, 2, 3) appears about 15 times.

## LAYERS
### Layer 1 of 15 — id: leetcode-patterns-1
Title: How to Practice: Method, Tracking, and Review
Technologies: Practice Plan, Spaced Repetition, Pattern Notes
Description: Build a practice system before you grind. You will set a weekly plan, log every attempt, and review failures so each problem teaches a pattern instead of a one-off answer.
Topics:
- Easy, medium and hard: how to sequence them
- The 20-minute rule before looking at a hint
- Logging attempts and mistakes
- Spaced repetition for solved problems
- Writing your own pattern notes
- Avoiding the memorize-solutions trap

### Layer 2 of 15 — id: leetcode-patterns-2
Title: Arrays and Hashing Patterns
Technologies: Frequency Map, Prefix Sum, Hash Set
Description: Drill the highest-frequency interview patterns. You will solve duplicate, anagram, grouping and prefix-sum problems until the hash map reflex is automatic.
Topics:
- Contains Duplicate and Two Sum
- Group Anagrams and Top K Frequent
- Product of Array Except Self
- Subarray Sum Equals K
- Longest Consecutive Sequence
- Valid Sudoku and encoding problems

### Layer 3 of 15 — id: leetcode-patterns-3
Title: Two Pointers and Sliding Window Patterns
Technologies: Two Pointers, Sliding Window, Fast and Slow
Description: Drill linear-time techniques for sorted data and substrings. You will recognize when a window or a pair of pointers replaces a nested loop.
Topics:
- Valid Palindrome and Two Sum II
- 3Sum and Container With Most Water
- Best Time to Buy and Sell Stock
- Longest Substring Without Repeating Characters
- Minimum Window Substring
- Sliding Window Maximum

### Layer 4 of 15 — id: leetcode-patterns-4
Title: Stack, Queue, and Monotonic Patterns
Technologies: Stack, Monotonic Stack, Queue
Description: Drill problems where order of arrival matters. You will use stacks for matching and nearest-greater problems, and queues for level-by-level work.
Topics:
- Valid Parentheses and Min Stack
- Daily Temperatures
- Next Greater Element
- Largest Rectangle in Histogram
- Evaluate Reverse Polish Notation
- Car Fleet and Generate Parentheses

### Layer 5 of 15 — id: leetcode-patterns-5
Title: Binary Search Patterns
Technologies: Binary Search, Search on Answer, Rotated Arrays
Description: Drill binary search beyond sorted arrays. You will search rotated arrays and search on the answer space, with careful boundary handling.
Topics:
- Binary Search and Search Insert Position
- Search in Rotated Sorted Array
- Find Minimum in Rotated Sorted Array
- Koko Eating Bananas
- Time Based Key-Value Store
- Median of Two Sorted Arrays

### Layer 6 of 15 — id: leetcode-patterns-6
Title: Linked List Patterns
Technologies: Dummy Node, Reversal, Cycle Detection
Description: Drill pointer manipulation. You will reverse, merge and reorder lists, and detect cycles with fast and slow pointers.
Topics:
- Reverse Linked List
- Merge Two Sorted Lists
- Linked List Cycle and Cycle II
- Reorder List and Remove Nth Node From End
- Add Two Numbers
- LRU Cache and Copy List With Random Pointer

### Layer 7 of 15 — id: leetcode-patterns-7
Title: Tree Patterns: DFS and BFS
Technologies: DFS, BFS, Recursion
Description: Drill tree problems. You will choose between depth-first and breadth-first traversals and pass information up or down the recursion.
Topics:
- Invert Binary Tree and Maximum Depth
- Same Tree, Subtree and Balanced Tree
- Level Order Traversal and Right Side View
- Lowest Common Ancestor
- Validate BST and Kth Smallest in BST
- Binary Tree Maximum Path Sum and Serialize/Deserialize

### Layer 8 of 15 — id: leetcode-patterns-8
Title: Heap and Priority Queue Patterns
Technologies: Top K, Two Heaps, Scheduling
Description: Drill problems that ask for the best k items or a running middle. You will pick min-heaps or max-heaps and keep heap sizes bounded.
Topics:
- Kth Largest Element in a Stream
- Last Stone Weight and K Closest Points
- Top K Frequent Elements
- Task Scheduler
- Merge K Sorted Lists
- Find Median from Data Stream

### Layer 9 of 15 — id: leetcode-patterns-9
Title: Backtracking Patterns
Technologies: Backtracking, Pruning, Choose-Explore-Undo
Description: Drill search over choices. You will generate subsets, permutations and combinations, and prune branches early to stay inside the time limit.
Topics:
- Subsets and Subsets II
- Permutations and Combination Sum
- Word Search
- Palindrome Partitioning
- Letter Combinations of a Phone Number
- N-Queens

### Layer 10 of 15 — id: leetcode-patterns-10
Title: Graph Patterns: BFS, DFS, and Union-Find
Technologies: Grid Search, Topological Sort, Union-Find
Description: Drill graph problems, including grids. You will count islands, order dependencies and group connected components.
Topics:
- Number of Islands and Max Area of Island
- Clone Graph and Rotting Oranges
- Pacific Atlantic Water Flow
- Course Schedule I and II
- Number of Connected Components and Graph Valid Tree
- Word Ladder

### Layer 11 of 15 — id: leetcode-patterns-11
Title: Shortest Path and Advanced Graph Patterns
Technologies: Dijkstra, Bellman-Ford, MST
Description: Drill weighted graph problems. You will choose Dijkstra, Bellman-Ford or a minimum spanning tree based on the constraints.
Topics:
- Network Delay Time
- Cheapest Flights Within K Stops
- Path With Minimum Effort
- Min Cost to Connect All Points
- Swim in Rising Water
- Reconstruct Itinerary

### Layer 12 of 15 — id: leetcode-patterns-12
Title: Dynamic Programming Patterns I: 1D and Knapsack
Technologies: 1D DP, Knapsack, Memoization
Description: Drill the first DP families. You will define state and transition, then convert a recursive solution to memoized and tabulated forms.
Topics:
- Climbing Stairs and House Robber I and II
- Coin Change and Coin Change II
- Longest Increasing Subsequence
- Word Break and Decode Ways
- Partition Equal Subset Sum
- Maximum Product Subarray

### Layer 13 of 15 — id: leetcode-patterns-13
Title: Dynamic Programming Patterns II: 2D and Strings
Technologies: 2D DP, LCS, Edit Distance
Description: Drill grid and string DP. You will build tables for paths, subsequences and edit costs, and reduce space where possible.
Topics:
- Unique Paths and Minimum Path Sum
- Longest Common Subsequence
- Edit Distance
- Longest Palindromic Substring
- Interleaving String and Distinct Subsequences
- Regular Expression Matching

### Layer 14 of 15 — id: leetcode-patterns-14
Title: Greedy, Intervals, Bits, and Math Patterns
Technologies: Greedy, Intervals, Bit Manipulation
Description: Drill the remaining common categories. You will merge intervals, justify greedy choices and use bit tricks.
Topics:
- Merge Intervals and Insert Interval
- Non-overlapping Intervals and Meeting Rooms II
- Jump Game I and II
- Gas Station and Partition Labels
- Single Number and Number of 1 Bits
- Reverse Integer and Pow(x, n)

### Layer 15 of 15 — id: leetcode-patterns-15
Title: Timed Mock Rounds and Review
Technologies: Mock Interview, Timing, Communication
Description: Practice the real conditions. You will solve unseen problems in 35-45 minutes, talk through your approach, and review each round for pattern misses and communication gaps.
Topics:
- Setting up a timed round
- Clarifying questions and examples first
- Thinking aloud while coding
- Testing your own solution
- Handling follow-ups and complexity questions
- Weekly review of weak patterns

Start now with Layer 1.
