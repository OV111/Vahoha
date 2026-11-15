export default {
  slug: "py-word-frequencies",
  trackId: "python",
  layerId: "python-1",
  type: "CODE",
  difficulty: "easy",
  title: "word_frequencies() — count the words in a sentence",
  summary: "Turn a sentence into a dictionary that says how many times each word appears.",
  description:
    "Counting things with a dictionary is one of the first patterns every Python programmer learns: log lines per status code, votes per candidate, words per document. It is small, but it uses strings, loops and dictionaries together.",
  task:
    "Write <code>word_frequencies(text)</code>. It returns a dictionary whose keys are the words of <code>text</code> in lowercase and whose values are how many times each word appears.",
  constraints: [
    "Words are separated by whitespace. Any amount of whitespace counts as one separator.",
    "Counting ignores case: 'The' and 'the' are the same word, stored as 'the'.",
    "An empty string, or one with only whitespace, gives an empty dictionary.",
  ],
  example: `word_frequencies("the cat and the hat")
# {"the": 2, "cat": 1, "and": 1, "hat": 1}

word_frequencies("Go go GO")
# {"go": 3}`,
  tags: ["strings", "dictionaries", "loops"],
  estimatedMins: 10,
  xp: 20,
  languages: ["python"],
  functionSpec: { name: "wordFrequencies", params: ["text"] },
  starterFiles: [
    {
      name: "word_frequencies.py",
      lang: "python",
      code: `def word_frequencies(text):
    # your code here
    pass
`,
    },
  ],
  hints: [
    {
      order: 1,
      cost: 0,
      text: "<code>text.split()</code> with no argument splits on any run of whitespace and never returns empty strings.",
    },
    {
      order: 2,
      cost: 5,
      text: "Lowercase the whole text once with <code>text.lower()</code> before splitting, instead of lowercasing each word.",
    },
    {
      order: 3,
      cost: 10,
      text: "<code>counts[word] = counts.get(word, 0) + 1</code> adds one to a word's count and starts from zero the first time it is seen.",
    },
  ],
  hiddenCases: [
    {
      name: "counts_repeated_words",
      args: ["the cat and the hat"],
      expected: { the: 2, cat: 1, and: 1, hat: 1 },
    },
    { name: "ignores_case", args: ["Go go GO"], expected: { go: 3 } },
    { name: "collapses_extra_whitespace", args: ["  one   two\ttwo\n"], expected: { one: 1, two: 2 } },
    { name: "empty_string_gives_empty_dict", args: [""], expected: {} },
    { name: "single_word", args: ["Python"], expected: { python: 1 } },
  ],
  solution: {
    code: `def word_frequencies(text):
    counts = {}
    for word in text.lower().split():
        counts[word] = counts.get(word, 0) + 1
    return counts
`,
    explanation:
      "Lowercasing first makes 'The' and 'the' the same key. split() with no argument handles any amount of whitespace and returns an empty list for an empty string, so the loop simply does not run and the empty dictionary is returned. counts.get(word, 0) reads the current count, or zero for a word seen for the first time.",
  },
};
