import { judgeStarter } from "../../../../constants/challengeLanguages.js";

const functionSpec = {
  name: "mergeIntervals",
  params: [{ name: "intervals", type: "int[][]" }],
  returns: "int[][]",
};

export default {
  slug: "go-merge-intervals",
  trackId: "go",
  layerId: "go-2",
  type: "CODE",
  difficulty: "med",
  title: "mergeIntervals() — join overlapping ranges",
  summary: "Combine overlapping time ranges into the fewest ranges that cover the same time.",
  description:
    "Calendar free/busy views, booked hotel nights, IP ranges in a firewall: all of them keep ranges that overlap and need them tidied into one clean list. In Go it is practice with slices of slices and with the sort package.",
  task:
    "Write <code>mergeIntervals(intervals [][]int) [][]int</code>. Each interval is <code>[start, end]</code>. Return the merged intervals, sorted by start, where any intervals that overlap or touch have been joined into one.",
  constraints: [
    "The input is not sorted.",
    "Intervals that touch, like [1, 4] and [4, 5], count as overlapping and become [1, 5].",
    "An interval inside another one disappears into it.",
    "An empty input gives an empty result. Do not change the input slice's order in place.",
  ],
  example: `mergeIntervals([][]int{{1, 3}, {2, 6}, {8, 10}, {15, 18}})
// [[1 6] [8 10] [15 18]]

mergeIntervals([][]int{{1, 4}, {4, 5}})
// [[1 5]]`,
  tags: ["slices", "sorting", "intervals"],
  estimatedMins: 20,
  xp: 35,
  languages: ["go"],
  functionSpec,
  starterFiles: [{ name: "mergeIntervals.go", lang: "go", code: judgeStarter("go", functionSpec) }],
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Once the intervals are sorted by start, overlapping ones are always next to each other.",
    },
    {
      order: 2,
      cost: 5,
      text: "Copy the slice first (<code>append([][]int{}, intervals...)</code>), then sort the copy with <code>sort.Slice</code>. You need <code>import \"sort\"</code> at the top.",
    },
    {
      order: 3,
      cost: 10,
      text: "Walk the sorted intervals. If one starts at or before the end of the last merged interval, stretch that end with the larger of the two ends. Otherwise append it as a new interval.",
    },
  ],
  hiddenCases: [
    { name: "merges_overlaps", args: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]] },
    { name: "touching_intervals_merge", args: [[[1, 4], [4, 5]]], expected: [[1, 5]] },
    { name: "unsorted_input", args: [[[8, 10], [1, 3], [2, 6]]], expected: [[1, 6], [8, 10]] },
    { name: "contained_interval", args: [[[1, 10], [2, 3], [4, 5]]], expected: [[1, 10]] },
    { name: "single_interval", args: [[[5, 7]]], expected: [[5, 7]] },
    { name: "nothing_overlaps", args: [[[6, 7], [1, 2], [3, 4]]], expected: [[1, 2], [3, 4], [6, 7]] },
  ],
  solution: {
    code: `import "sort"

func mergeIntervals(intervals [][]int) [][]int {
	sorted := append([][]int{}, intervals...)
	sort.Slice(sorted, func(i, j int) bool { return sorted[i][0] < sorted[j][0] })

	merged := [][]int{}
	for _, interval := range sorted {
		last := len(merged) - 1
		if last >= 0 && interval[0] <= merged[last][1] {
			if interval[1] > merged[last][1] {
				merged[last][1] = interval[1]
			}
		} else {
			merged = append(merged, []int{interval[0], interval[1]})
		}
	}
	return merged
}
`,
    explanation:
      "Sorting by start puts every overlapping interval right after the one it overlaps, so a single pass is enough. The copy keeps the caller's slice in its original order. For each interval, if it starts no later than the end of the last merged one, the two overlap or touch, and the merged end becomes the larger end; that also swallows intervals contained inside another. Otherwise there is a gap and the interval starts a new merged range. Appending a fresh []int{start, end} avoids sharing memory with the input.",
  },
};
