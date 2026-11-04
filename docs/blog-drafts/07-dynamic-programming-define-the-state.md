---
title: "Dynamic Programming: Start by Defining the State"
category: "Backend Development"
difficulty: "Intermediate"
tags: ["JavaScript", "Algorithms", "Interview Prep", "Dynamic Programming"]
layerIds: ["leetcode-patterns-12", "leetcode-patterns-13"]
description: "Dynamic programming feels hard because people jump to the table. Write one sentence about what each cell means first, and the recurrence follows."
---

Dynamic programming has a reputation for being hard. Most of that comes from one habit: starting with the table or the loops. The better first step has nothing to do with code.

**Write one plain sentence that says what `dp[i]` means.**

If you can say it clearly, the recurrence almost writes itself. If you cannot, no amount of loop tuning will save you.

## When DP applies

Two properties together:

- **Overlapping subproblems.** A plain recursion would solve the same smaller case many times.
- **Optimal substructure.** The best answer for a case can be built from best answers to smaller cases.

If a recursive solution recomputes the same arguments, you can save the results (memoization) or build them from the bottom up (tabulation).

## Example 1: coin change

Given coin values and a target amount, find the fewest coins that make the amount, or -1 if it is impossible.

**State sentence:** `dp[a]` is the fewest coins needed to make amount `a`.

**Recurrence:** the last coin used is one of the coins `c`. So `dp[a] = 1 + min(dp[a - c])` over all coins `c <= a`.

**Base case:** `dp[0] = 0`, since zero coins make zero.

```js
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (coin <= a) dp[a] = Math.min(dp[a], dp[a - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

console.log(coinChange([1, 2, 5], 11)); // 3  (5 + 5 + 1)
console.log(coinChange([2], 3)); // -1
```

Notice we filled the table with `Infinity` rather than 0. Infinity means "not reachable yet", and it lets `Math.min` work without special cases.

## Example 2: house robber

Houses in a row hold money, and you cannot rob two adjacent houses. What is the most you can take?

**State sentence:** `dp[i]` is the most money from the first `i` houses.

**Recurrence:** for house `i`, either skip it (keep `dp[i-1]`) or rob it and add to the best from two houses back (`dp[i-2] + money[i]`).

Since each value uses only the previous two, you can keep two variables instead of an array:

```js
function rob(money) {
  let twoBack = 0;
  let oneBack = 0;

  for (const m of money) {
    const current = Math.max(oneBack, twoBack + m);
    twoBack = oneBack;
    oneBack = current;
  }
  return oneBack;
}

console.log(rob([2, 7, 9, 3, 1])); // 12  (2 + 9 + 1)
```

Always get the full-array version right first. Reducing space is a last, optional step.

## Example 3: two strings and a 2D table

Longest common subsequence: given two strings, find the length of the longest sequence of characters that appears in both in the same order (not necessarily next to each other).

**State sentence:** `dp[i][j]` is the length of the longest common subsequence of the first `i` characters of `a` and the first `j` characters of `b`.

**Recurrence:** compare the last characters considered.

- If they match, they extend the best of the shorter prefixes: `dp[i-1][j-1] + 1`.
- If not, drop one character from either string and take the better: `max(dp[i-1][j], dp[i][j-1])`.

```js
function longestCommonSubsequence(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1] + 1
          : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[a.length][b.length];
}

console.log(longestCommonSubsequence("abcde", "ace")); // 3
```

The extra row and column of zeros represent the empty prefix. They remove the need to special-case the first character, and the `i - 1` indexing is what keeps the string indexes straight.

## A checklist that works

1. **State sentence.** What does one cell mean, in plain words?
2. **Choices.** What decision happens at this step (which coin, rob or skip, match or drop)?
3. **Recurrence.** How does the cell depend on smaller cells?
4. **Base cases.** What are the smallest answers you know without computing?
5. **Order.** Fill so that every cell you read is already computed.
6. **Answer.** Which cell holds the result?

## Common mistakes

- Starting with code before the state sentence.
- Using the wrong initial value (0 where you needed Infinity, or the reverse).
- Off-by-one errors between "first `i` items" and "item at index `i`".
- Memorizing solutions instead of the six questions above.

## Try it

Pick Climbing Stairs and apply the checklist in writing before you touch the editor. Then do Unique Paths, and notice how it is the 2D idea from the third example. Finally, try Edit Distance. The only new part is that you now have three choices (insert, delete, replace) at each cell instead of two.
