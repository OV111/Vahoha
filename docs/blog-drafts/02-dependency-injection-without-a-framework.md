---
title: "Dependency Injection Without a Framework"
category: "Backend Development"
difficulty: "Intermediate"
tags: ["JavaScript", "Node.js", "Testing", "Unit Testing"]
layerIds: ["software-design-3", "software-design-8"]
description: "Dependency injection sounds like a framework feature. It is really just passing things in. Here is how that makes code easier to change and test."
---

"Dependency injection" sounds like something that needs a container, decorators and a configuration file. It does not. At its core it means one thing: **a piece of code receives the things it needs instead of creating them itself.**

## The problem

Look at a signup function that creates its own collaborators:

```js
import { MongoClient } from "mongodb";
import { sendEmail } from "./mailer.js";

export async function signUp(email) {
  const db = (await MongoClient.connect(process.env.MONGO_URL)).db("app");
  if (await db.collection("users").findOne({ email })) {
    throw new Error("Email already registered");
  }
  await db.collection("users").insertOne({ email });
  await sendEmail(email, "Welcome!");
}
```

To test this you need a real database and a mail server, or you need to patch modules in ways that break when you rename a file. The function also knows too much: how to connect, which collection to use and which mailer to call. A change to any of those means editing the signup logic.

## The fix: pass them in

Move the collaborators into the constructor. The class now states what it needs, and only what it needs:

```js
class SignupService {
  constructor({ users, mailer }) {
    this.users = users;
    this.mailer = mailer;
  }

  async signUp(email) {
    if (await this.users.exists(email)) {
      throw new Error("Email already registered");
    }
    await this.users.add({ email });
    await this.mailer.send(email, "Welcome!");
  }
}
```

`SignupService` has no idea whether `users` is MongoDB, Postgres or an array. It only relies on two methods, `exists` and `add`. That is the dependency inversion principle: the high-level logic depends on a small interface that it defines, not on a concrete database.

## Testing becomes easy

Now a test can supply simple fakes and run in milliseconds:

```js
const sent = [];
const emails = new Set();

const service = new SignupService({
  users: {
    async exists(email) {
      return emails.has(email);
    },
    async add(user) {
      emails.add(user.email);
    },
  },
  mailer: {
    async send(to, subject) {
      sent.push({ to, subject });
    },
  },
});

await service.signUp("ada@example.com");
console.log(sent); // [ { to: 'ada@example.com', subject: 'Welcome!' } ]

try {
  await service.signUp("ada@example.com");
} catch (error) {
  console.log(error.message); // Email already registered
}
```

No database, no network, no mocking library. This is why testability is the first benefit people notice.

## Where the real objects get built

Somebody still has to create the real database connection and mailer. Do it in one place near the start of the program, often called the composition root:

```js
import { MongoClient } from "mongodb";
import { MongoUsers } from "./adapters/mongoUsers.js";
import { SmtpMailer } from "./adapters/smtpMailer.js";
import { SignupService } from "./signupService.js";

export async function createApp() {
  const client = await MongoClient.connect(process.env.MONGO_URL);
  const users = new MongoUsers(client.db("app"));
  const mailer = new SmtpMailer(process.env.SMTP_URL);
  return { signup: new SignupService({ users, mailer }) };
}
```

Everything that knows about MongoDB and SMTP lives here and in the adapters. To switch mail providers you write a new adapter and change one line in `createApp`.

## Do you need a framework?

Sometimes. Frameworks like NestJS give you a container that builds the object graph for you, which helps once you have dozens of services and want to avoid wiring them by hand. But the idea underneath is the same, and you can learn it without a framework. Start with constructor arguments. Add a container when manual wiring becomes tedious, not before.

## Common mistakes

- **Injecting everything.** Pure helpers such as a date formatter do not need injection. Inject things that do I/O, change over time or you want to replace in tests.
- **Reaching for a global.** A shared singleton hides the dependency again and makes tests leak into each other.
- **Interfaces with one big method list.** Keep what you inject small. `users` needs two methods here, not twenty.

## Try it

Pick a service in your project that imports a database client or an HTTP library directly. Change it to receive that dependency as a constructor argument, update the one place that creates it, and write a test with a hand-made fake. If the test needs no setup, you did it right.
