---
title: "Monotonic Stack Explained With Daily Temperatures"
category: "Backend Development"
difficulty: "Intermediate"
tags: ["JavaScript", "Algorithms", "Interview Prep", "Data Structures"]
layerIds: ["leetcode-patterns-4"]
description: "A monotonic stack finds the next greater element in one pass. Walk through Daily Temperatures and Largest Rectangle in Histogram step by step."
---

Some problems ask: for each item, find the next item to the right that is bigger. The obvious solution scans ahead from every position, which is quadratic. A **monotonic stack** does it in one pass.

## The problem

Given daily temperatures, return for each day how many days you must wait for a warmer one, or 0 if there is none.

For `[73, 74, 75, 71, 69, 72, 76, 73]` the answer is `[1, 1, 4, 2, 1, 1, 0, 0]`.

## The idea

Walk through the days from left to right and keep a stack of days that are **still waiting** for a warmer day. Their temperatures are in decreasing order from bottom to top, which is why it is called monotonic.

When a new day arrives:

1. While the new temperature is higher than the temperature of the day on top of the stack, that waiting day has found its answer. Pop it and record the distance.
2. Then push the new day, because it is now waiting too.

Store **indexes**, not temperatures. You need the index both to look up the temperature and to compute the distance.

```js
function dailyTemperatures(temps) {
  const answer = new Array(temps.length).fill(0);
  const stack = [];

  for (let i = 0; i < temps.length; i++) {
    while (stack.length && temps[i] > temps[stack[stack.length - 1]]) {
      const day = stack.pop();
      answer[day] = i - day;
    }
    stack.push(i);
  }
  return answer;
}

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
// [ 1, 1, 4, 2, 1, 1, 0, 0 ]
```

Days that are still on the stack at the end never found a warmer day, so they keep the 0 we started with.

## Why it is linear

The nested `while` looks quadratic, but count the work. Every index is pushed once and popped at most once. Across the whole run that is at most 2n stack operations, so the time is O(n) and the extra space is O(n).

## The template

Most monotonic stack problems have the same shape:

```text
for i in 0 .. n-1:
    while stack is not empty and the new item breaks the order:
        pop and settle the popped item using i
    push i
```

Two choices define the problem: whether the stack is decreasing or increasing, and what you do when you pop.

- **Next greater element:** keep a decreasing stack, and when a bigger value arrives, the popped item's answer is that value.
- **Previous smaller or greater:** read the answer from the item left on top of the stack instead of the one you pop.

## A harder case: largest rectangle in a histogram

Given bar heights, find the area of the largest rectangle that fits inside them. For `[2, 1, 5, 6, 2, 3]` the answer is 10, from the two bars of height 5 and 6 (a width of 2 at height 5).

For each bar, the widest rectangle using that bar as its height extends left and right until it meets a shorter bar. A stack of **increasing** heights finds both edges. When a shorter bar arrives, every taller bar on the stack has found its right edge, and the bar below it on the stack is its left edge.

```js
function largestRectangleArea(heights) {
  const stack = [];
  let best = 0;

  for (let i = 0; i <= heights.length; i++) {
    const current = i === heights.length ? 0 : heights[i];
    while (stack.length && heights[stack[stack.length - 1]] >= current) {
      const height = heights[stack.pop()];
      const left = stack.length ? stack[stack.length - 1] + 1 : 0;
      best = Math.max(best, height * (i - left));
    }
    stack.push(i);
  }
  return best;
}

console.log(largestRectangleArea([2, 1, 5, 6, 2, 3])); // 10
```

Two details to understand rather than memorize:

- The loop runs to `heights.length` with a height of 0. That forces every remaining bar off the stack, so no bar is left unsettled.
- `left` is the index just after the new top of the stack. Everything between that bar and `i` is at least as tall as the one we popped, which is exactly the width we want.

## When to use it

Reach for a monotonic stack when the question is about the **nearest** bigger or smaller item on one side, or about a span that ends at a boundary like that. Related problems include Next Greater Element, Online Stock Span, Trapping Rain Water and Car Fleet.

## Try it

Solve Next Greater Element II, where the array is circular. A hint: you can loop through the array twice, using `i % n`, and only push indexes during the first pass. Write down what changes in the template and what stays the same.
