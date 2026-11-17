// Pure rules: the model only proposes a status and a quote, the app decides what counts.

const normalize = (text) =>
  String(text ?? "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const MIN_QUOTE_WORDS = 3;

// Words aimed at the grader, not at the topic: "ignore the rules", "mark DNS as solid".
// Such a quote is really said, so the quote check alone would let it through.
const INSTRUCTION =
  /\b(ignore|disregard|forget)\b.{0,40}\b(instructions?|rules|prompt|checklist|above|previous)\b|\b(mark|grade|rate|score|label)\b.{0,40}\b(solid|shallow|passed|pass|full marks)\b|\byou are (now )?(an? |the )?(grader|examiner|ai|assistant|model)\b|\bsystem prompt\b/i;

export const looksLikeInstruction = (text) => INSTRUCTION.test(String(text ?? ""));

// A quote counts only if it is long enough, really appears in what the learner said,
// and isn't words aimed at the grader.
const quoteHolds = (quote, said) => {
  const q = normalize(quote);
  return q.split(" ").length >= MIN_QUOTE_WORDS && said.includes(q) && !looksLikeInstruction(quote);
};

/** A credit stands only if its quote really appears in what the learner said. */
export const verifyResults = (results, subtopics, transcript) => {
  const said = normalize(transcript);
  const byN = new Map(results.map((r) => [Number(r?.n), r]));
  const byTitle = new Map(results.map((r) => [normalize(r?.title), r]));

  return subtopics.map(({ title }, i) => {
    const r = byN.get(i + 1) ?? byTitle.get(normalize(title));
    const proven = r && r.status !== "missing" && quoteHolds(r.quote, said);
    if (!proven) return { label: title, status: "missing" };
    return { label: title, status: r.status === "solid" ? "solid" : "shallow", quote: r.quote.trim() };
  });
};

/**
 * Status from the verified points, decided here and never by the model.
 * A stated misconception outranks everything: "incorrect" is a different gap from "missing".
 */
export const deriveStatus = ({ met, solidNeeds, misconception }) => {
  if (misconception) return "incorrect";
  if (met >= solidNeeds) return "solid";
  return met > 0 ? "shallow" : "missing";
};

/**
 * Turns one judge's output for a subtopic with evidence points into a concept result.
 * A point the judge claimed but couldn't back with a real quote lowers confidence:
 * a sign of a confused judge, used to ask for a second opinion.
 */
export const verifyJudgement = (judgement, subtopic, transcript) => {
  const said = normalize(transcript);
  const claimed = new Map((judgement.points ?? []).map((p) => [p.id, p]));
  let unverified = 0;

  const points = subtopic.evidence.map(({ id, text }) => {
    const p = claimed.get(id);
    if (!p?.met) return { id, text, met: false };
    if (!quoteHolds(p.quote, said)) {
      unverified += 1;
      return { id, text, met: false };
    }
    return { id, text, met: true, quote: p.quote.trim() };
  });

  const m = judgement.misconception;
  const known = m && subtopic.misconceptions.find((x) => x.id === m.id);
  const misconception =
    known && quoteHolds(m.quote, said) ? { id: known.id, text: known.text, quote: m.quote.trim() } : null;

  const met = points.filter((p) => p.met);
  return {
    label: subtopic.title,
    criterionId: subtopic.criterionId,
    status: deriveStatus({ met: met.length, solidNeeds: subtopic.solidNeeds, misconception }),
    // The first proof stays in `quote`, which the result screen already shows.
    ...(met[0] && { quote: met[0].quote }),
    points: points.map(({ id, met: ok, quote }) => ({ id, met: ok, ...(quote && { quote }) })),
    // Feedback comes from the rubric's own words, so it can never state something untrue.
    missed: points.filter((p) => !p.met).map((p) => p.text),
    misconception,
    confidence: judgement.confidence === "low" || unverified > 0 ? "low" : "high",
  };
};

const failing = (status) => status === "missing" || status === "incorrect";

/** Pass: nothing missing or wrong, and at least half of the subtopics explained solidly. */
export const decidePass = (concepts) => {
  if (concepts.length === 0) return false;
  const solid = concepts.filter((c) => c.status === "solid").length;
  return concepts.every((c) => !failing(c.status)) && solid * 2 >= concepts.length;
};

export const pickGroup = (groups, random = Math.random) => groups[Math.floor(random() * groups.length)];

const RANK = { incorrect: 0, missing: 0, shallow: 1, solid: 2 };

/**
 * The better grade per subtopic. A subtopic solid in the explanation gets no follow-up,
 * so the final regrade must not take that credit back without giving a chance to answer.
 * On a tie between two failing grades the misconception is kept: it says more.
 */
export const keepBest = (earlier, later) =>
  later.map((c) => {
    const e = earlier?.find((x) => x.label === c.label);
    if (!e) return c;
    if (RANK[e.status] > RANK[c.status]) return e;
    if (RANK[e.status] === RANK[c.status] && e.status === "incorrect") return e;
    return c;
  });

/** Would moving this one subtopic a step up or down change pass/fail? */
export const isDecisive = (concepts, index) => {
  const passed = decidePass(concepts);
  const rank = RANK[concepts[index].status];
  return [rank - 1, rank + 1]
    .filter((r) => r >= 0 && r <= 2)
    .some((r) => {
      const status = ["missing", "shallow", "solid"][r];
      return decidePass(concepts.map((c, i) => (i === index ? { ...c, status } : c))) !== passed;
    });
};

/**
 * Two independent judgements of the same subtopic. Agreement keeps the first;
 * disagreement keeps the lower grade, because a Verified badge must not rest on a disputed call.
 */
export const combineOpinions = (first, second) => {
  const agreed = first.status === second.status;
  const lower = RANK[second.status] < RANK[first.status] ? second : first;
  return { ...(agreed ? first : lower), secondOpinion: { status: second.status, agreed } };
};
