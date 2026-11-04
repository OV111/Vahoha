---
title: "Ports and Adapters in a Node.js Service"
category: "Backend Development"
difficulty: "Advanced"
tags: ["Node.js", "Express.js", "Microservices", "Architecture"]
layerIds: ["software-design-8"]
description: "Keep business rules free of Express and MongoDB by putting them behind ports. A small worked example of hexagonal architecture, with code you can run."
---

Many Node.js projects end up with business rules mixed into route handlers and database calls. It works at first, and then a change to the database or the web framework turns into a change everywhere.

Ports and adapters, also called hexagonal architecture, is a way to stop that. The idea is simple:

- The **core** holds your business rules and knows nothing about HTTP or databases.
- A **port** is an interface the core defines for something it needs, such as "save an order".
- An **adapter** is code outside the core that plugs into a port, such as a MongoDB repository or an Express route.

Dependencies point inward. Adapters know about the core. The core never imports an adapter.

## A small example: placing an order

Start with the core. It defines the rule (an order needs at least one item and a positive total) and uses a port called `orders`:

```js
class PlaceOrder {
  constructor({ orders, clock }) {
    this.orders = orders;
    this.clock = clock;
  }

  async execute({ customerId, items }) {
    if (!items.length) throw new Error("An order needs at least one item");

    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    if (total <= 0) throw new Error("Order total must be positive");

    const order = { customerId, items, total, placedAt: this.clock.now() };
    return this.orders.save(order);
  }
}
```

The port is not a class you inherit from. It is just a promise about shape: `orders` has a `save(order)` method that returns the stored order. `clock` has `now()`. Passing the clock in means a test can control time.

## The first adapter: in memory

An in-memory adapter is the simplest one, and it makes tests fast:

```js
class InMemoryOrders {
  constructor() {
    this.items = [];
  }

  async save(order) {
    const stored = { id: String(this.items.length + 1), ...order };
    this.items.push(stored);
    return stored;
  }
}

const orders = new InMemoryOrders();
const placeOrder = new PlaceOrder({
  orders,
  clock: { now: () => new Date("2026-01-01T10:00:00Z") },
});

const saved = await placeOrder.execute({
  customerId: "c1",
  items: [{ sku: "book", price: 12.5, qty: 2 }],
});
console.log(saved.id, saved.total); // 1 25
```

You just tested real business logic without a database, a server or a mocking library.

## The real adapters

A MongoDB adapter implements the same `save` method. This is where the driver code and document shape live:

```js
export class MongoOrders {
  constructor(db) {
    this.collection = db.collection("orders");
  }

  async save(order) {
    const { insertedId } = await this.collection.insertOne(order);
    return { id: String(insertedId), ...order };
  }
}
```

An Express adapter translates HTTP into a call to the core and back:

```js
import express from "express";

export function ordersRouter(placeOrder) {
  const router = express.Router();

  router.post("/orders", async (req, res) => {
    try {
      const order = await placeOrder.execute(req.body);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
}
```

The route handler contains no business rules. If you later add a queue consumer or a CLI that places orders, it calls the same `PlaceOrder` and you do not duplicate anything.

## Wiring it together

One file connects the pieces:

```js
const db = (await MongoClient.connect(process.env.MONGO_URL)).db("shop");
const placeOrder = new PlaceOrder({
  orders: new MongoOrders(db),
  clock: { now: () => new Date() },
});
app.use(ordersRouter(placeOrder));
```

Swapping MongoDB for Postgres is now a new adapter and a one-line change here. The core and its tests do not move.

## Costs and when to skip it

This structure adds files and indirection. For a small CRUD app it is overkill, and a straightforward route-service-repository layout is plenty. It pays off when:

- the business rules are non-trivial and change often,
- you expect to swap or add delivery mechanisms (HTTP, jobs, CLI), or
- you want most tests to run without any infrastructure.

A good habit is to begin with a plain service layer, notice when framework or database types start leaking into your rules, and introduce ports at exactly those points.

## Try it

Choose one use case in a service you own. Write it as a class that receives its storage as an argument, build an in-memory version of that storage, and write three tests for the business rule. Then look at the route handler. If it is now only parsing input and formatting output, the boundary is in the right place.
