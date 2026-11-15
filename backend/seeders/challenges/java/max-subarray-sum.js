import { judgeStarter } from "../../../../constants/challengeLanguages.js";

const functionSpec = {
  name: "maxSubarraySum",
  params: [{ name: "nums", type: "int[]" }],
  returns: "int",
};

export default {
  slug: "java-max-subarray-sum",
  trackId: "java",
  layerId: "java-1",
  type: "CODE",
  difficulty: "easy",
  title: "maxSubarraySum() — the best run of numbers",
  summary: "Find the largest sum you can get from one unbroken run of numbers in an array.",
  description:
    "Daily profit and loss, signal strength over time, scores per round: when the question is 'which stretch was best?', it is this problem. Trying every start and end point works, but there is a single pass that does it with two variables.",
  task:
    "Write <code>maxSubarraySum(int[] nums)</code> in the <code>Solution</code> class. It returns the largest sum of any contiguous, non-empty part of <code>nums</code>.",
  constraints: [
    "nums has at least one element.",
    "The part must be contiguous: neighbouring elements, without gaps.",
    "It must contain at least one element, so for an array of only negative numbers the answer is the largest single one.",
  ],
  example: `maxSubarraySum(new int[]{-2, 1, -3, 4, -1, 2, 1, -5, 4});
// 6, from {4, -1, 2, 1}

maxSubarraySum(new int[]{-3, -1, -2});
// -1`,
  tags: ["arrays", "loops", "dynamic-programming"],
  estimatedMins: 15,
  xp: 25,
  languages: ["java"],
  functionSpec,
  starterFiles: [{ name: "maxSubarraySum.java", lang: "java", code: judgeStarter("java", functionSpec) }],
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Walk the array once. At each element, ask: is it better to extend the run that ended just before, or to start a new run here?",
    },
    {
      order: 2,
      cost: 5,
      text: "Keep two numbers: <code>current</code>, the best sum of a run ending at this element, and <code>best</code>, the best seen anywhere so far.",
    },
    {
      order: 3,
      cost: 10,
      text: "<code>current = Math.max(nums[i], current + nums[i]);</code> then <code>best = Math.max(best, current);</code>. Start both at <code>nums[0]</code>, not 0, or an all-negative array goes wrong.",
    },
  ],
  hiddenCases: [
    { name: "mixed_signs", args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
    { name: "all_negative", args: [[-3, -1, -2]], expected: -1 },
    { name: "single_element", args: [[5]], expected: 5 },
    { name: "all_positive", args: [[1, 2, 3]], expected: 6 },
    { name: "dip_worth_crossing", args: [[5, -2, 7]], expected: 10 },
    { name: "dip_not_worth_crossing", args: [[3, -10, 4]], expected: 4 },
  ],
  solution: {
    code: `class Solution {
    public int maxSubarraySum(int[] nums) {
        int best = nums[0];
        int current = nums[0];
        for (int i = 1; i < nums.length; i++) {
            current = Math.max(nums[i], current + nums[i]);
            best = Math.max(best, current);
        }
        return best;
    }
}
`,
    explanation:
      "This is Kadane's algorithm. current is the best sum of a run that ends exactly at element i: either the run before it plus nums[i], or nums[i] alone when the run before it has gone negative and would only drag the total down. best remembers the largest current seen. Both start at nums[0] so an all-negative array returns its largest element instead of 0. One pass, constant memory.",
  },
};
