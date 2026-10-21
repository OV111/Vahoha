# Digest rubric v1

> **DRAFT, to be rewritten by hand by the founder.** A starting point drawn from
> [README §6](README.md#6--the-rule-that-makes-it-work) and the first test on
> *Learning TypeScript*, chapter 6. The model receives this file verbatim, so
> write it as instructions.

## The three questions

Ask of every idea in the chapter:

1. **Would a developer building real projects with current tools and AI assistance run into this?**
2. **Is it a common trap?** Code that compiles but crashes, a silent wrong type, a confusing error.
3. **Is it only a niche edge case, or outdated practice?**

## Decisions

| Decision | When | How much |
| --- | --- | --- |
| **Keep** | Yes to 1 or 2 | Full: summary, own example, why, detail |
| **Keep, trimmed** | Useful, but the book spends far more words than a developer needs | Two or three lines, one example at most |
| **Drop** | Yes to 3, or it only restates an earlier rule | `keep: false` with a one-line `dropReason` |

Traps (question 2) are never trimmed below a full entry, and they get an interview block.

## Outside the book

The digest may add a fact the chapter does not contain, such as the fix for a
trap the author chose not to cover. It goes **only** in `beyondBook`, never in
the summary, detail or example, so a reviewer can check it separately.

## Always

- Own words and own examples. Never a sentence copied from the book.
- Jokes, exercises, links and summaries of the chapter itself are dropped.
