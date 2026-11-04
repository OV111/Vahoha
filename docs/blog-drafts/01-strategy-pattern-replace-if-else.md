---
title: "Replace a Growing if/else Chain with the Strategy Pattern"
category: "Backend Development"
difficulty: "Intermediate"
tags: ["JavaScript", "Node.js", "Design Patterns", "Refactoring"]
layerIds: ["software-design-6", "software-design-3"]
description: "Every new business rule adds another else-if. Here is how the Strategy pattern turns that chain into a lookup you can extend without touching tested code."
---

You have seen this function. It starts with two branches, and a year later it has nine, three of which nobody remembers adding.

```js
function shippingCostIf(order) {
  if (order.method === "standard") {
    return order.weightKg * 1.2;
  } else if (order.method === "express") {
    return order.weightKg * 2.5 + 5;
  } else if (order.method === "pickup") {
    return 0;
  }
  throw new Error(`Unknown method: ${order.method}`);
}
```

Nothing is wrong with this today. The problem is what happens when the business adds "overnight" next month. You open a function that other code depends on, edit it, and re-test every branch, including the ones you did not mean to touch. Each new rule makes the function longer and the next change riskier.

## The idea

The Strategy pattern says: put each way of doing the thing behind the same small interface, and pick one at runtime. The function that decides stops knowing how each option works.

In JavaScript, a strategy is usually just a function, so a plain object is enough:

```js
const shippingStrategies = {
  standard: ({ weightKg }) => weightKg * 1.2,
  express: ({ weightKg }) => weightKg * 2.5 + 5,
  pickup: () => 0,
};

function shippingCost(order) {
  const strategy = shippingStrategies[order.method];
  if (!strategy) throw new Error(`Unknown method: ${order.method}`);
  return strategy(order);
}

console.log(shippingCost({ method: "express", weightKg: 2 })); // 10
```

`shippingCost` is now four lines and will stay four lines. Each strategy is small enough to read at a glance and to test on its own.

## Adding a rule without editing old code

This is the payoff. Adding "overnight" means adding an entry, not editing the existing logic:

```js
shippingStrategies.overnight = ({ weightKg }) => weightKg * 4 + 12;

console.log(shippingCost({ method: "overnight", weightKg: 2 })); // 20
```

That is the open/closed principle in practice: the code is open for extension and closed for modification. Existing branches cannot break, because you never touched them.

## When a strategy needs configuration

Real strategies often need settings, such as a rate that differs by country. Return a function from a function:

```js
const perKg = (rate, base = 0) => ({ weightKg }) => weightKg * rate + base;

const euStrategies = {
  standard: perKg(1.4),
  express: perKg(2.8, 6),
  pickup: () => 0,
};

function makeShippingCost(strategies) {
  return (order) => {
    const strategy = strategies[order.method];
    if (!strategy) throw new Error(`Unknown method: ${order.method}`);
    return strategy(order);
  };
}

const euShippingCost = makeShippingCost(euStrategies);
console.log(euShippingCost({ method: "standard", weightKg: 10 })); // 14
```

The same shape works with classes if your codebase prefers them. Each class has one method, such as `cost(order)`, and the caller holds a reference to whichever one applies. The pattern is the interface, not the syntax.

## When not to use it

Do not reach for a strategy at the first `if`. Two branches that will not grow are clearer as an `if`. A good signal that you need the pattern is when you have seen the same chain grow twice, or when the same switch on a type appears in several places.

Also watch for the opposite mistake: a strategy registry with one entry and a factory to build it is more code and no benefit. Add the pattern when change is actually hurting.

## Where you have already met it

- Passport's authentication strategies (local, Google, GitHub) are interchangeable behind one interface.
- A sort function that accepts a comparator is a strategy for ordering.
- Payment providers, pricing rules, retry policies and export formats are all common candidates.

## Try it

Take a function in your own project with three or more branches on a string or enum. Move each branch into a function in a lookup object, keep the same behavior, and make sure your existing tests still pass. Then add a new case without editing the original function. If that felt easy, the refactor worked.
