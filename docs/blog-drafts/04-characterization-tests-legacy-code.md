---
title: "Characterization Tests: Changing Code You Don't Understand"
category: "Backend Development"
difficulty: "Intermediate"
tags: ["JavaScript", "Testing", "Unit Testing", "Refactoring"]
layerIds: ["software-design-7"]
description: "You need to change a function nobody dares to touch, and there are no tests. Write characterization tests first to pin down what it does today."
---

Sooner or later you inherit a function like this one. It calculates a discount, it has been in production for years, and nobody can explain every rule.

```js
function legacyDiscount(total, years, coupon) {
  let d = 0;
  if (total > 100) d = 5;
  if (total > 500) d = 10;
  if (years >= 2) d += 3;
  if (years >= 5) d += 2;
  if (coupon === "VIP") d = d + 10;
  if (coupon === "VIP" && total < 50) d = 0;
  if (d > 20) d = 20;
  return total - (total * d) / 100;
}
```

You are asked to add a new loyalty tier. Where do you start? Reading the code and guessing is risky. Rewriting it first is riskier. The safe starting point is to write down **what the code actually does today**, whether or not that is what it should do.

## What a characterization test is

A characterization test does not check that the code is correct. It records its current behavior so that you notice any change. If a refactor makes a test fail, you decide on purpose: was that an accident, or a deliberate change?

The recipe has three steps:

1. Call the code with a range of inputs.
2. Record the outputs.
3. Turn those outputs into assertions.

## Step 1 and 2: see what it does

Do not guess the expected values. Run the function and print them:

```js
const totals = [0, 49, 50, 100, 101, 500, 501];
const yearsList = [0, 2, 5];
const coupons = [undefined, "VIP"];

const rows = [];
for (const total of totals) {
  for (const years of yearsList) {
    for (const coupon of coupons) {
      rows.push({ total, years, coupon, result: legacyDiscount(total, years, coupon) });
    }
  }
}

console.log(rows.length); // 42
console.log(rows.find((r) => r.total === 49 && r.coupon === "VIP" && r.years === 5));
// { total: 49, years: 5, coupon: 'VIP', result: 49 }
```

That last line is a surprise worth noticing: a VIP customer with five years of loyalty gets no discount under 50, because a later rule resets the discount to zero. Is that a bug or an intentional rule? Maybe nobody knows yet. The point is that you now have a recorded fact, and you can ask the right person about it.

The input list is chosen on purpose. Each number sits on or next to a boundary in the code (49 and 50, 100 and 101, 500 and 501). Boundaries are where behavior changes, so they are where regressions hide.

## Step 3: freeze the behavior

Print the whole table, check that it looks sensible, and paste it into a test as expected values. Using Vitest or Jest, it can be as direct as this:

```js
import { describe, it, expect } from "vitest";
import { legacyDiscount } from "./discount.js";

describe("legacyDiscount (current behavior)", () => {
  it.each([
    [49, 0, undefined, 49],
    [49, 5, "VIP", 49],
    [100, 0, undefined, 100],
    [101, 2, undefined, 92.92],
    [500, 5, "VIP", 400],
  ])("total %i, %i years, coupon %s", (total, years, coupon, expected) => {
    expect(legacyDiscount(total, years, coupon)).toBeCloseTo(expected, 2);
  });
});
```

Name the suite "current behavior" so the next reader knows these values are observations and not a specification.

## Now you can change things

With the net in place, work in small steps. Rename `d` to `discountPercent`. Extract the loyalty rules into their own function. Run the tests after each change. If one fails, you know exactly which step introduced the difference.

Only after the refactor is clean do you add the new loyalty tier, with its own proper tests that describe the intended behavior.

## Tips

- **Cover the cases that matter first.** You do not need every combination. Focus on the paths your change will touch.
- **Beware of hidden inputs.** If the function reads the current time, a random number or a global, pass those in or control them in the test, or the results will not be stable.
- **Keep the tests until you replace them.** Characterization tests are scaffolding. As you gain understanding, replace them with tests named after the real business rules.
- **Write down the surprises.** Odd results are the most valuable output of this exercise. They are questions for the people who own the rules.

## Try it

Find a function in your codebase with no tests and a change request attached to it. Pick inputs on each side of every `if` in it, record what it returns, and commit those as tests before you touch the code. Then make your change and watch how much calmer it feels.
