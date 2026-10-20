import { describe, it, expect } from "vitest";
import { buildLayer, layerBlock, MAX_LONGEST_SHARE } from "../../seeders/lib/examBuild.js";
import { isValidQuestion } from "../../seeders/lib/examBank.js";

// 60 questions whose correct answer is NOT longer than the wrong ones.
const raw = (n = 60, correctLen = 12) =>
  Array.from({ length: n }, (_, i) => ({
    stem: `Question number ${i} about a concept`,
    topic: "Topic A",
    correct: `right answer ${i}`.padEnd(correctLen, "x"),
    wrong: [`wrong one ${i}`.padEnd(22, "y"), `wrong two ${i}`.padEnd(22, "y"), `wrong three ${i}`.padEnd(22, "y")],
  }));

describe("buildLayer", () => {
  it("builds valid questions with the correct answer where answerIdx says", () => {
    const { questions, problems } = buildLayer("x-1", raw());
    expect(problems).toEqual([]);
    expect(questions).toHaveLength(60);
    for (const [i, q] of questions.entries()) {
      expect(isValidQuestion(q)).toBe(true);
      expect(q.choices[q.answerIdx]).toMatch(new RegExp(`^right answer ${i}`));
    }
  });

  it("deals answer positions evenly: 15 each of 0..3", () => {
    const { questions } = buildLayer("x-1", raw());
    for (const pos of [0, 1, 2, 3]) expect(questions.filter((q) => q.answerIdx === pos)).toHaveLength(15);
  });

  it("is deterministic", () => {
    expect(buildLayer("x-1", raw()).questions).toEqual(buildLayer("x-1", raw()).questions);
  });

  it("refuses a layer where the correct answer is usually the longest", () => {
    const { problems, longestShare } = buildLayer("x-1", raw(60, 40));
    expect(longestShare).toBeGreaterThan(MAX_LONGEST_SHARE);
    expect(problems.join(" ")).toMatch(/longest choice/);
  });

  it("reports wrong counts, duplicates, bad topics and malformed questions", () => {
    const bad = raw(3);
    bad[1] = { ...bad[0] };
    bad[2] = { stem: "x", topic: "Topic A", correct: "a", wrong: ["a", "b", "c"] };
    const { problems } = buildLayer("x-1", bad, { topics: ["Topic B"] });
    const text = problems.join("\n");
    expect(text).toMatch(/expected 60/);
    expect(text).toMatch(/duplicate stem/);
    expect(text).toMatch(/not in the layer's topic list/);
    expect(text).toMatch(/3 different non-empty wrong answers/);
  });
});

describe("layerBlock", () => {
  it("writes the format examImport reads", () => {
    const { questions } = buildLayer("x-1", raw());
    const text = layerBlock("x-1", questions);
    expect(text.startsWith("LAYER: x-1\n")).toBe(true);
    const json = JSON.parse(text.split("```json\n")[1].split("\n```")[0]);
    expect(json).toHaveLength(60);
  });
});
