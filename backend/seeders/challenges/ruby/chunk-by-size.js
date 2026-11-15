export default {
  slug: "rb-chunk-by-size",
  trackId: "ruby",
  layerId: "ruby-1",
  type: "CODE",
  difficulty: "easy",
  title: "chunk_by_size() — split an array into groups",
  summary: "Cut an array into consecutive groups of a given size, with a shorter last group if needed.",
  description:
    "Paging results, sending records in batches, laying out a grid row by row: they all need a list cut into equal groups. Ruby's Enumerable has a method for it, and writing it by hand is good practice with arrays and ranges.",
  task:
    "Write <code>chunk_by_size(items, size)</code>. It returns an array of arrays, where each inner array holds the next <code>size</code> elements of <code>items</code>, in order.",
  constraints: [
    "The last group may be shorter when the elements do not divide evenly.",
    "An empty array gives an empty array, not an array holding one empty group.",
    "The original array must not be changed.",
    "size is always a positive integer.",
  ],
  example: `chunk_by_size([1, 2, 3, 4, 5], 2)
# => [[1, 2], [3, 4], [5]]

chunk_by_size(["a", "b", "c"], 3)
# => [["a", "b", "c"]]`,
  tags: ["arrays", "enumerable", "iteration"],
  estimatedMins: 10,
  xp: 20,
  languages: ["ruby"],
  functionSpec: { name: "chunkBySize", params: ["items", "size"] },
  starterFiles: [
    {
      name: "chunk_by_size.rb",
      lang: "ruby",
      code: `def chunk_by_size(items, size)
  # your code here
end
`,
    },
  ],
  hints: [
    {
      order: 1,
      cost: 0,
      text: "<code>items[start, size]</code> returns up to <code>size</code> elements beginning at <code>start</code>, and fewer near the end.",
    },
    {
      order: 2,
      cost: 5,
      text: "<code>(0...items.length).step(size)</code> yields the starting index of every group: 0, size, 2 × size and so on.",
    },
    {
      order: 3,
      cost: 10,
      text: "Enumerable already has this: <code>items.each_slice(size).to_a</code>.",
    },
  ],
  hiddenCases: [
    { name: "splits_evenly", args: [[1, 2, 3, 4], 2], expected: [[1, 2], [3, 4]] },
    { name: "last_group_is_shorter", args: [[1, 2, 3, 4, 5], 2], expected: [[1, 2], [3, 4], [5]] },
    { name: "size_larger_than_array", args: [["a", "b"], 5], expected: [["a", "b"]] },
    { name: "empty_array_gives_empty_array", args: [[], 3], expected: [] },
    { name: "size_of_one", args: [[7, 8, 9], 1], expected: [[7], [8], [9]] },
  ],
  solution: {
    code: `def chunk_by_size(items, size)
  items.each_slice(size).to_a
end
`,
    explanation:
      "each_slice walks the array and yields consecutive groups of the given size, with a shorter final group when the elements run out. Called without a block it returns an enumerator, and to_a collects the groups into an array. It builds new arrays, so the original is untouched, and an empty array yields no groups at all.",
  },
};
