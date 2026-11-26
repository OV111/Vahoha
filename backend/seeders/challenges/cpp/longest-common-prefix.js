import { judgeStarter } from "#shared/challengeLanguages.js";

const functionSpec = {
  name: "longestCommonPrefix",
  params: [{ name: "words", type: "string[]" }],
  returns: "string",
};

export default {
  slug: "cpp-longest-common-prefix",
  trackId: "cpp",
  layerId: "cpp-1",
  type: "CODE",
  difficulty: "easy",
  title: "longestCommonPrefix() — what every word starts with",
  summary: "Find the longest beginning that all the words in a list share.",
  description:
    "Autocomplete, grouping file paths, finding the shared root of a set of URLs: they all ask what a group of strings has in common at the start. It is a good first exercise with std::string and std::vector.",
  task:
    "Write <code>longestCommonPrefix(vector&lt;string&gt;&amp; words)</code> in the <code>Solution</code> class. It returns the longest string that every word in <code>words</code> starts with, or an empty string when they share nothing.",
  constraints: [
    "words has at least one word.",
    "Comparison is exact: upper and lower case are different characters.",
    "A word may be empty, and then the answer is empty too.",
  ],
  example: `Solution s;
vector<string> words = {"flower", "flow", "flight"};
s.longestCommonPrefix(words);   // "fl"

vector<string> other = {"dog", "racecar", "car"};
s.longestCommonPrefix(other);   // ""`,
  tags: ["strings", "vectors", "loops"],
  estimatedMins: 15,
  xp: 25,
  languages: ["cpp"],
  functionSpec,
  starterFiles: [{ name: "longestCommonPrefix.cpp", lang: "cpp", code: judgeStarter("cpp", functionSpec) }],
  hints: [
    {
      order: 1,
      cost: 0,
      text: "The answer can never be longer than the first word, so start by assuming the whole first word is the prefix.",
    },
    {
      order: 2,
      cost: 5,
      text: "Compare the prefix with each other word character by character, and cut it down to the part that matched.",
    },
    {
      order: 3,
      cost: 10,
      text: "Count matching characters with a loop that stops at the end of either string or the first difference, then <code>prefix = prefix.substr(0, i);</code>.",
    },
  ],
  hiddenCases: [
    { name: "shared_start", args: [["flower", "flow", "flight"]], expected: "fl" },
    { name: "nothing_shared", args: [["dog", "racecar", "car"]], expected: "" },
    { name: "identical_words", args: [["same", "same"]], expected: "same" },
    { name: "single_word", args: [["alone"]], expected: "alone" },
    { name: "one_word_is_the_prefix", args: [["inter", "internet", "interval"]], expected: "inter" },
    { name: "case_is_significant", args: [["Apple", "apple"]], expected: "" },
  ],
  solution: {
    code: `class Solution {
public:
    string longestCommonPrefix(vector<string>& words) {
        string prefix = words[0];
        for (const string& word : words) {
            size_t i = 0;
            while (i < prefix.size() && i < word.size() && prefix[i] == word[i]) i++;
            prefix = prefix.substr(0, i);
        }
        return prefix;
    }
};
`,
    explanation:
      "The prefix starts as the whole first word, the longest it could possibly be. Each word then trims it: the loop counts how many leading characters match, stopping at the first difference or at the end of the shorter string, and substr keeps only that many. Once the prefix is empty it stays empty, so the answer is correct even if the loop keeps running.",
  },
};
