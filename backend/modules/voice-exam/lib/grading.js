// Pure rules: the model only proposes a status and a quote, the app decides what counts.

const normalize = (text) =>
  String(text ?? "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const MIN_QUOTE_WORDS = 3;

/** A credit stands only if its quote really appears in what the learner said. */
export const verifyResults = (results, subtopics, transcript) => {
  const said = normalize(transcript);
  const byTitle = new Map(results.map((r) => [r.title, r]));

  return subtopics.map(({ title }) => {
    const r = byTitle.get(title);
    const quote = normalize(r?.quote);
    const proven =
      r && r.status !== "missing" && quote.split(" ").length >= MIN_QUOTE_WORDS && said.includes(quote);
    if (!proven) return { label: title, status: "missing" };
    return { label: title, status: r.status === "solid" ? "solid" : "shallow", quote: r.quote.trim() };
  });
};

/** Pass: nothing missing, and at least half of the subtopics explained solidly. */
export const decidePass = (concepts) => {
  if (concepts.length === 0) return false;
  const solid = concepts.filter((c) => c.status === "solid").length;
  return concepts.every((c) => c.status !== "missing") && solid * 2 >= concepts.length;
};

export const pickGroup = (groups, random = Math.random) => groups[Math.floor(random() * groups.length)];
