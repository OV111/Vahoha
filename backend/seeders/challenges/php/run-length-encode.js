export default {
  slug: "php-run-length-encode",
  trackId: "php",
  layerId: "php-1",
  type: "CODE",
  difficulty: "easy",
  title: "runLengthEncode() — compress repeated characters",
  summary: "Replace each run of the same character with the character followed by how many times it repeats.",
  description:
    "Run-length encoding is the simplest compression there is: instead of storing 'aaaa', store 'a4'. Early image formats used it, and it is a classic exercise in walking a string while remembering what came before.",
  task:
    "Write <code>runLengthEncode($text)</code>. It returns a string where every run of one repeated character is written as that character followed by the length of the run.",
  constraints: [
    "A character that appears once still gets a count: 'abc' becomes 'a1b1c1'.",
    "Runs are counted separately: 'aabaa' becomes 'a2b1a2', not 'a4b1'.",
    "Upper and lower case are different characters.",
    "An empty string gives an empty string. The input contains only letters.",
  ],
  example: `runLengthEncode("aaabbc");
// "a3b2c1"

runLengthEncode("aabaa");
// "a2b1a2"`,
  tags: ["strings", "loops", "compression"],
  estimatedMins: 15,
  xp: 20,
  languages: ["php"],
  functionSpec: { name: "runLengthEncode", params: ["text"] },
  starterFiles: [
    {
      name: "runLengthEncode.php",
      lang: "php",
      code: `<?php

function runLengthEncode($text) {
    // your code here
}
`,
    },
  ],
  hints: [
    {
      order: 1,
      cost: 0,
      text: "<code>strlen($text)</code> gives the length, and <code>$text[$i]</code> reads one character.",
    },
    {
      order: 2,
      cost: 5,
      text: "Keep a counter. While the next character equals the current one, add one to it. When it differs, write the character and the counter, then reset the counter to 1.",
    },
    {
      order: 3,
      cost: 10,
      text: "The last run has no following character to end it, so make sure it is written too. Comparing with <code>$text[$i + 1] ?? null</code> handles the end of the string.",
    },
  ],
  hiddenCases: [
    { name: "encodes_runs", args: ["aaabbc"], expected: "a3b2c1" },
    { name: "single_characters_get_a_count", args: ["abc"], expected: "a1b1c1" },
    { name: "separate_runs_stay_separate", args: ["aabaa"], expected: "a2b1a2" },
    { name: "empty_string_gives_empty_string", args: [""], expected: "" },
    { name: "case_is_significant", args: ["aAAa"], expected: "a1A2a1" },
    { name: "long_run", args: ["zzzzzzzzzzzz"], expected: "z12" },
  ],
  solution: {
    code: `<?php

function runLengthEncode($text) {
    $result = "";
    $count = 1;
    $length = strlen($text);
    for ($i = 0; $i < $length; $i++) {
        if ($i + 1 < $length && $text[$i + 1] === $text[$i]) {
            $count++;
        } else {
            $result .= $text[$i] . $count;
            $count = 1;
        }
    }
    return $result;
}
`,
    explanation:
      "The loop looks one character ahead. While the next character is the same, the run is still going, so only the counter grows. When the next character differs, or there is none, the run has ended: the character and its count are appended and the counter starts again at 1. Checking the index before reading the next character is what makes the last run, and the empty string, work.",
  },
};
