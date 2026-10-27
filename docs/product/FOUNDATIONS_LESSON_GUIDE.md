# Foundations lesson guide

How to write a lesson for `/labs/foundations/<slug>`. Lessons are free and need no
login, so every lesson must be finishable by a guest: the learner **does**
something, not only reads.

## Where things go

1. Write `src/features/foundations/topics/lessons/<slug>.js` (template below).
2. In `src/features/foundations/topics/topics.js`, add to that topic:
   `lesson: () => import("./lessons/<slug>.js"),`
   The syllabus row becomes a link and the page joins the sitemap automatically.

Plain JS data only: no JSX, no imports. Accuracy beats length: a lesson that
teaches something wrong is worse than no lesson.

## Page order

What it is → Why it matters now → Key ideas → **Try it** → Check yourself →
**Explain it back** → Practice (login-only challenges and mentor, optional).

## The five Try-it types

| Type | Use when | Example |
| --- | --- | --- |
| `build` | The topic is a thing you can make a crude version of | A 5-line shell script, a 20-line HTTP server |
| `break-fix` | Mistakes in it are common and recoverable | Create a merge conflict, then resolve it |
| `observe` | You can't build it, but a real tool shows it | `top`, `dig`, `traceroute`, the DevTools Network tab |
| `predict` | There's a surprising, checkable result | "How deep can recursion go before it crashes?" |
| `trace` | It's a process you can follow step by step on paper | What happens when you type a URL and press Enter |

Rules:

- Buildable topics (Git, shell, HTTP, SQL…) lead with `build` or `break-fix`.
  Non-buildable ones (CPU, memory, Big O, networking theory…) use `observe`,
  `predict` or `trace`.
- 1 to 3 items per lesson. Each must take under 10 minutes.
- Every command must be real, safe (no `sudo`, nothing outside a throwaway
  folder) and work on macOS and Linux. Put Windows differences in `windows`.
- `expect` describes what the learner should see. Never invent exact tool
  output; quote only messages you have verified (e.g. Git's `CONFLICT (content)`).
- A `predict` item needs 3 or 4 plausible options and a `why` that explains
  the answer, not only states it.

## Check yourself and Explain it back

- 3 questions. At least one is **predict-then-check**: "Predict X, then run Y
  to check", not plain recall.
- `explainBack`: one prompt asking for the core idea in the learner's own
  words, plus a short model answer (2 to 4 sentences) they compare against.

## Template

```js
export default {
  minutes: 12,
  whatItIs: ["Paragraph 1.", "Paragraph 2."],
  whyNow: "Why this matters now that AI writes code.",
  keyIdeas: [{ term: "Term", explain: "One or two sentences." }],
  tryIt: [
    {
      type: "build", // build | break-fix | observe | predict | trace
      title: "Short imperative title",
      steps: ["Step one.", "Step two."],
      command: "the exact command(s) to copy", // optional, may span lines
      windows: "What to do differently on Windows.", // optional
      expect: "What the learner should see.", // optional
      predict: { options: ["A", "B", "C"], answer: "B", why: "Because…" }, // predict only
    },
  ],
  checkYourself: [{ q: "Predict…, then run … to check.", a: "Answer." }],
  explainBack: {
    prompt: "In your own words, explain…",
    modelAnswer: "A short model answer.",
  },
  practice: { challenges: [{ slug: "challenge-slug", title: "Challenge title" }] },
};
```
