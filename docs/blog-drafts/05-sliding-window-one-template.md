---
title: "The Sliding Window Pattern: One Template, Three Problems"
category: "Backend Development"
difficulty: "Intermediate"
tags: ["JavaScript", "Algorithms", "Interview Prep", "Data Structures"]
layerIds: ["leetcode-patterns-3"]
description: "Most sliding window problems follow the same loop. Learn the template once, then see it solve three different interview questions."
---

Sliding window is one of those patterns that looks like a trick until you see it a few times. Then you notice that dozens of problems are the same loop wearing different clothes.

## When to think of it

Reach for a sliding window when a problem asks about a **contiguous** part of an array or string, with some constraint, and wants the longest, the shortest or a count. Words like "subarray", "substring", "consecutive" and "at most k" are signals.

The brute force checks every start and end, which is quadratic or worse. A window avoids that by never going backward: it moves its right edge forward to include more, and its left edge forward to drop what breaks the rule. Each index enters and leaves the window at most once, so the whole thing is linear.

## The template

```text
left = 0
for right in 0 .. n-1:
    add item[right] to the window
    while the window breaks the rule:
        remove item[left] from the window
        left += 1
    update the answer using the window [left, right]
```

For "longest" problems you record the best size after fixing the window. For "shortest" problems you record it inside the loop, while the window is still valid. That is the main difference to remember.

## Example 1: longest substring without repeating characters

The rule is "no character appears twice". Instead of shrinking one step at a time, a map of the last position of each character lets the left edge jump directly:

```js
function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (lastSeen.has(ch) && lastSeen.get(ch) >= left) {
      left = lastSeen.get(ch) + 1;
    }
    lastSeen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("pwwkew")); // 3
```

The check `lastSeen.get(ch) >= left` matters. A character seen long ago, before the window started, should not push the left edge backward or sideways. It is the most common bug in this problem.

## Example 2: longest run with at most k zeros flipped

Given a binary array, find the longest stretch you could turn into all ones by flipping at most `k` zeros. The rule is "at most k zeros inside the window", so track how many zeros you hold and shrink when it goes over:

```js
function longestOnes(nums, k) {
  let left = 0;
  let zeros = 0;
  let best = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] === 0) zeros++;
    while (zeros > k) {
      if (nums[left] === 0) zeros--;
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}

console.log(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)); // 6
```

The template is identical. Only the thing we count changed.

## Example 3: shortest subarray with sum at least a target

For a "shortest" problem, the window is valid when the sum is big enough, so we shrink while it is valid and record the size inside that loop. This assumes all numbers are positive, which is what makes the window behave.

```js
function minSubArrayLen(target, nums) {
  let left = 0;
  let sum = 0;
  let best = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    while (sum >= target) {
      best = Math.min(best, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }
  return best === Infinity ? 0 : best;
}

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); // 2
```

## When a window does not work

A window relies on a simple property: adding to the right only makes the rule harder to satisfy (or easier), and removing from the left does the opposite. If the array can contain negative numbers and you need a sum, that property breaks, because adding a number can lower the total. For those problems, think prefix sums and a hash map instead.

## How to practice

1. Say out loud what the window must satisfy and what you track to know that.
2. Decide whether the question is longest or shortest, which tells you where to record the answer.
3. Write the loop from the template before thinking about details.
4. Test with an empty input, a single element and a case where the whole array is the answer.

Then solve Longest Repeating Character Replacement, Permutation in String and Minimum Window Substring. They are the same template with a more interesting thing to count.
