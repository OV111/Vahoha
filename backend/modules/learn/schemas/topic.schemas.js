import { z } from "zod";
import { PUBLISH_RULES as RULES, QUESTION_KINDS, TOPIC_STATUS } from "../lib/constants.js";

const strict = (shape) => z.object(shape).strict();

// The shape of one learn_topics document. Markdown is allowed in every `text`
// field; it is rendered without raw HTML on the client.

const id = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase words joined by dashes").max(64);
const line = z.string().trim().min(1).max(300);
const text = z.string().trim().min(1).max(6000);
const source = z.string().min(1).max(4000);

const option = strict({
  id,
  text: line,
  misconceptionId: id.optional(), // the wrong idea a learner who picks this probably has
});

const questionFields = {
  id,
  ideaId: id, // what a wrong answer says is weak
  kind: z.enum(QUESTION_KINDS),
  prompt: text,
  code: source.optional(),
  options: z.array(option).min(2).max(5),
  answerId: id,
  why: text,
  difficulty: z.number().int().min(1).max(3),
};

const reviewQuestion = strict(questionFields);

const block = z.discriminatedUnion("type", [
  strict({ type: z.literal("text"), id, body: text }),
  strict({
    type: z.literal("code"),
    id,
    lang: z.string().min(1).max(20),
    source,
    runnable: z.boolean(),
    output: z.array(z.string().max(300)).max(40).optional(), // the lines it prints
    caption: line.optional(),
  }),
  strict({ type: z.literal("picture"), id, diagram: id, alt: line }),
  strict({
    type: z.literal("realCase"),
    id,
    title: line,
    situation: text,
    problem: text,
    cause: text,
    fix: text,
    code: source.optional(),
  }),
  strict({ type: z.literal("compare"), id, wrong: source, right: source, why: text }),
  strict({ type: z.literal("question"), ...questionFields }),
]);

const section = strict({
  id,
  title: line,
  blocks: z.array(block).min(1).max(30),
  simpler: text, // the same section in easier words, for "I don't get it"
});

const topicShape = strict({
  topicId: id, // never changes: progress and answers point at it
  version: z.number().int().min(1),
  status: z.enum(Object.values(TOPIC_STATUS)),

  title: line,
  mystery: line, // the question that makes someone open the page
  minutes: z.number().int().min(5).max(60),
  lang: z.string().min(1).max(20).nullable(), // null: a topic without code
  requires: z.array(id).max(6), // topicIds to know first

  shortAnswer: z.string().trim().min(1).max(500),
  ideas: z.array(strict({ id, text: line })).min(3).max(6), // what the learner must understand
  misconceptions: z.array(strict({ id, belief: line, correction: text })).max(6),

  sections: z.array(section).min(1).max(10),
  whenToUse: strict({ use: z.array(line).max(6), avoid: z.array(line).max(6) }),
  explain: strict({ prompt: text, modelAnswer: text }), // graded against `ideas`
  reviewQuestions: z.array(reviewQuestion).max(12),

  summary: z.array(line).max(8),
  sources: z.array(strict({ label: line, url: z.string().url().startsWith("https://") })).max(10),

  reviewedBy: z.string().max(100).nullable(),
  publishedAt: z.date().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const blocksOf = (topic) => topic.sections.flatMap((s) => s.blocks);
const pageQuestions = (topic) => blocksOf(topic).filter((b) => b.type === "question");

const duplicates = (ids) => [...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))];

/** Ids that must be unique or must exist, checked for drafts too: a broken link is never valid. */
const linkIssues = (topic) => {
  const issues = [];
  const ideaIds = new Set(topic.ideas.map((i) => i.id));
  const misconceptionIds = new Set(topic.misconceptions.map((m) => m.id));
  const questions = [...pageQuestions(topic), ...topic.reviewQuestions];

  const unique = {
    idea: topic.ideas.map((i) => i.id),
    misconception: topic.misconceptions.map((m) => m.id),
    section: topic.sections.map((s) => s.id),
    "block or question": [...blocksOf(topic), ...topic.reviewQuestions].map((b) => b.id),
  };
  for (const [name, ids] of Object.entries(unique))
    for (const dup of duplicates(ids)) issues.push(`Two ${name} entries use the id "${dup}"`);

  for (const q of questions) {
    const optionIds = q.options.map((o) => o.id);
    if (duplicates(optionIds).length) issues.push(`Question "${q.id}" repeats an option id`);
    if (!optionIds.includes(q.answerId)) issues.push(`Question "${q.id}": answerId is not one of its options`);
    if (!ideaIds.has(q.ideaId)) issues.push(`Question "${q.id}": no idea "${q.ideaId}"`);
    for (const o of q.options) {
      if (!o.misconceptionId) continue;
      if (!misconceptionIds.has(o.misconceptionId)) issues.push(`Question "${q.id}": no misconception "${o.misconceptionId}"`);
      if (o.id === q.answerId) issues.push(`Question "${q.id}": the right option can't carry a misconception`);
    }
  }
  if (topic.requires.includes(topic.topicId)) issues.push("A topic can't require itself");
  return issues;
};

/** What still stops a valid topic from being published. Empty means it can be. */
export const publishIssues = (topic) => {
  const issues = [];
  const blocks = blocksOf(topic);
  const questions = pageQuestions(topic);
  const count = (type) => blocks.filter((b) => b.type === type).length;
  const atLeast = (have, need, what) => have < need && issues.push(`Needs ${need} ${what}, has ${have}`);

  atLeast(topic.sections.length, RULES.minSections, "sections");
  atLeast(count("realCase"), RULES.minRealCases, "real cases");
  atLeast(count("picture"), 1, "picture");
  atLeast(questions.length, RULES.minQuestions, "questions on the page");
  atLeast(topic.reviewQuestions.length, RULES.minReviewQuestions, "review questions");
  atLeast(topic.misconceptions.length, RULES.minMisconceptions, "misconceptions");
  atLeast(topic.summary.length, 1, "summary line");
  atLeast(topic.sources.length, 1, "source");
  atLeast(topic.whenToUse.use.length, 1, "case where to use it");
  if (topic.lang) {
    const runnable = blocks.filter((b) => b.type === "code" && b.runnable);
    atLeast(runnable.length, RULES.minRunnableExamples, "runnable examples");
    // An HTML or React example shows a page, so there are no lines to compare.
    for (const b of runnable) if (b.lang === "js" && !b.output) issues.push(`Runnable code "${b.id}" needs its output`);
  }
  // Otherwise a learner's weakness on that idea could never be seen.
  for (const idea of topic.ideas)
    if (!questions.some((q) => q.ideaId === idea.id)) issues.push(`No question on the page checks the idea "${idea.id}"`);
  if (!topic.reviewedBy) issues.push("Nobody has reviewed it");
  return issues;
};

export const topicSchema = topicShape.superRefine((topic, ctx) => {
  const issues = linkIssues(topic);
  if (topic.status === TOPIC_STATUS.PUBLISHED) {
    issues.push(...publishIssues(topic));
    if (!topic.publishedAt) issues.push("A published topic needs publishedAt");
  }
  for (const message of issues) ctx.addIssue({ code: "custom", message });
});
