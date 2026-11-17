/**
 * Voice exam grader eval: runs labelled answers through the real grader and scores it.
 *
 * Usage (from the repo root):
 *   node backend/evals/voice-exam/run.js --dry                 check the cases, no AI calls
 *   node backend/evals/voice-exam/run.js --limit=4             a quick smoke run
 *   node backend/evals/voice-exam/run.js --runs=3              full run, 3 tries per case for consistency
 *   options: --layer=api-dev-1  --type=alt  --runs=N  --limit=N  --resume=<progress file>
 *   --grader=v1           the checklist grader, criteria = roadmap descriptions (what runs today)
 *   --grader=v1-criteria  the same single call, but given the evidence points instead
 *   --grader=v2           one judge call per subtopic with evidence points; cases without them are skipped
 *   v2 only: --reasoning=low|medium|high  --json   (the cost levers in judgeService.js)
 * Draft criteria (criteriaReviewed: false) are used here on purpose: they are measured before going live.
 *
 * Every call spends the Groq quota. Set EVAL_GROQ_API_KEY to use a separate key,
 * so an eval can't eat the daily limit real learners need.
 * Reports land in backend/evals/results/ (git-ignored), next to the mentor eval's.
 */

import dotenv from "dotenv";
import process from "process";
import { mkdir, readFile, readdir, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { buildRubric, findLayer } from "../../modules/voice-exam/lib/rubricBuild.js";
import { verifyJudgement, verifyResults } from "../../modules/voice-exam/lib/grading.js";

dotenv.config({ path: "./backend/.env.local" });
dotenv.config({ path: "./backend/.env" });
if (process.env.EVAL_GROQ_API_KEY) process.env.GROQ_API_KEY = process.env.EVAL_GROQ_API_KEY;

const __dirname = dirname(fileURLToPath(import.meta.url));
const CASES_DIR = join(__dirname, "cases");
const RESULTS_DIR = join(__dirname, "..", "results");
const RUBRIC_DIR = join(__dirname, "..", "..", "seeders", "rubrics");
const ROADMAP_DIR = join(__dirname, "..", "..", "..", "src", "data", "roadmaps");

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);
const RUNS = Number(args.runs ?? 1);
const GRADER = args.grader ?? "v1";
if (!["v1", "v1-criteria", "v2"].includes(GRADER)) throw new Error(`unknown --grader=${GRADER}`);
const JUDGE_OPTS = {
  ...(args.reasoning && { reasoningEffort: String(args.reasoning) }),
  ...(args.json && { jsonMode: true }),
};
if (GRADER !== "v2" && Object.keys(JUDGE_OPTS).length) throw new Error("--reasoning and --json apply to --grader=v2 only");
const LABEL = [GRADER, args.reasoning && `reasoning-${args.reasoning}`, args.json && "json"].filter(Boolean).join("-");

// v1 has no "incorrect" status, so a stated misconception is scored as "missing" there.
const STATUSES = GRADER === "v2" ? ["incorrect", "missing", "shallow", "solid"] : ["missing", "shallow", "solid"];
const RANK = { incorrect: 0, missing: 0, shallow: 1, solid: 2 };
const asCurrent = (status) => (GRADER !== "v2" && status === "incorrect" ? "missing" : status);
// "incorrect" and "missing" share a rank, so FP/FN ignore that split; accuracy and kappa don't.

// v1-criteria: the old single call, with each description swapped for the evidence points.
const asChecklist = (s) =>
  GRADER === "v1-criteria" && s.evidence
    ? { ...s, description: `The answer must show: ${s.evidence.map((p) => p.text).join(" ")}` }
    : s;

const loadCases = async () => {
  const files = (await readdir(CASES_DIR)).filter((f) => f.endsWith(".json"));
  const out = [];
  for (const f of files) {
    const doc = JSON.parse(await readFile(join(CASES_DIR, f), "utf8"));
    for (const c of doc.cases) out.push({ ...c, layer: doc.layer, reviewedLabels: doc.reviewed });
  }
  return out
    .filter((c) => !args.layer || c.layer === args.layer)
    .filter((c) => !args.type || c.type === args.type)
    .slice(0, args.limit ? Number(args.limit) : undefined);
};

const roadmaps = new Map();
const groupFor = async (c) => {
  const file = JSON.parse(await readFile(join(RUBRIC_DIR, "backend", `${c.layer}.json`), "utf8"));
  if (!roadmaps.has(file.path)) {
    roadmaps.set(file.path, JSON.parse(await readFile(join(ROADMAP_DIR, `${file.path}.json`), "utf8")));
  }
  const rubric = buildRubric(file, findLayer(roadmaps.get(file.path), c.layer), { draftCriteria: true });
  const group = rubric.groups.find((g) => g.title === c.group);
  if (!group) throw new Error(`${c.id}: no group "${c.group}"`);
  if (!group.subtopics.some((s) => s.title === c.criterion)) throw new Error(`${c.id}: no criterion "${c.criterion}"`);
  return group;
};

const percentile = (xs, p) => {
  if (!xs.length) return null;
  const sorted = [...xs].sort((a, b) => a - b);
  return sorted[Math.min(sorted.length - 1, Math.ceil((p / 100) * sorted.length) - 1)];
};

// Agreement beyond chance between the grader's statuses and the reference labels.
const cohensKappa = (pairs) => {
  const n = pairs.length;
  if (!n) return null;
  const observed = pairs.filter(([a, b]) => a === b).length / n;
  const expected = STATUSES.reduce((sum, s) => {
    const pa = pairs.filter(([a]) => a === s).length / n;
    const pb = pairs.filter(([, b]) => b === s).length / n;
    return sum + pa * pb;
  }, 0);
  return expected === 1 ? 1 : (observed - expected) / (1 - expected);
};

const pct = (num, den) => (den ? Math.round((num / den) * 1000) / 10 : null);

const main = async () => {
  const cases = await loadCases();
  const usable = [];
  for (const c of cases) {
    const group = await groupFor(c); // fails fast on a bad case before spending any quota
    const target = group.subtopics.find((s) => s.title === c.criterion);
    if (GRADER === "v1" || target.evidence) usable.push(c);
  }
  const skipped = cases.length - usable.length;
  cases.length = 0;
  cases.push(...usable);
  console.log(`grader ${LABEL}: ${cases.length} cases${skipped ? ` (${skipped} skipped, no evidence points yet)` : ""}, ${RUNS} run(s) each = ${cases.length * RUNS} grader calls`);
  if (cases.some((c) => !c.reviewedLabels)) console.log("Note: some labels are drafts (reviewed: false).");
  if (args.dry) return;

  const { gradeTurns } = await import("../../modules/voice-exam/services/graderService.js");
  const { judgeCriterion } = await import("../../modules/voice-exam/services/judgeService.js");

  // One case, one grade for its target subtopic, as the real exam would grade the explanation.
  const gradeCase = async (group, c, turns) => {
    if (GRADER === "v2") {
      const target = group.subtopics.find((s) => s.title === c.criterion);
      const { judgement, usage } = await judgeCriterion(target, turns, JUDGE_OPTS);
      return { concept: verifyJudgement(judgement, target, c.answer), usage };
    }
    const subtopics = group.subtopics.map(asChecklist);
    const { results, usage } = await gradeTurns(subtopics, turns);
    return { concept: verifyResults(results, subtopics, c.answer).find((x) => x.label === c.criterion), usage };
  };

  // Rate limits are the quota talking, not the grader: wait and grade the same case again.
  const isBusy = (err) => err?.status === 503 || err?.status === 429 || /busy/i.test(err?.message ?? "");
  const gradeWithRetry = async (group, c, turns) => {
    for (let attempt = 1; ; attempt++) {
      try {
        return await gradeCase(group, c, turns);
      } catch (err) {
        if (!isBusy(err) || attempt === 4) throw err;
        console.log(`    busy, waiting 30s (retry ${attempt}/3)`);
        await new Promise((r) => setTimeout(r, 30_000));
      }
    }
  };

  // The Groq gate pauses on a 429 with a timer that doesn't hold the process open (right for the
  // server, which stays up anyway). A script would silently exit mid-run, so it holds itself open.
  const keepAlive = setInterval(() => {}, 60_000);

  // Saved after every case, so a stopped run keeps its work: --resume=<that file> carries on.
  await mkdir(RESULTS_DIR, { recursive: true });
  const prior = args.resume ? JSON.parse(await readFile(String(args.resume), "utf8")) : null;
  if (prior && prior.grader !== LABEL) throw new Error(`--resume file is for ${prior.grader}, not ${LABEL}`);
  const out = prior
    ? String(args.resume)
    : join(RESULTS_DIR, `voice-exam-${LABEL}-${new Date().toISOString().replace(/[:.]/g, "-")}.json`);
  const rows = prior?.rows ?? [];
  const done = new Set(rows.map((r) => r.id));
  if (prior) console.log(`resuming: ${done.size} cases already graded`);
  console.log(`progress file: ${out}`);

  for (const c of cases) {
    if (done.has(c.id)) continue;
    const group = await groupFor(c);
    const turns = [{ prompt: group.question, text: c.answer }];
    const runs = [];
    for (let i = 0; i < RUNS; i++) {
      const t0 = Date.now();
      try {
        const { concept, usage } = await gradeWithRetry(group, c, turns);
        runs.push({
          status: concept.status,
          quote: concept.quote ?? null,
          ...(concept.confidence && { confidence: concept.confidence }),
          ms: Date.now() - t0,
          tokens: usage?.total_tokens ?? null,
        });
      } catch (err) {
        runs.push({ error: err.message, ms: Date.now() - t0 });
      }
    }
    const expected = asCurrent(c.expected);
    const first = runs.find((r) => r.status)?.status ?? null;
    rows.push({ id: c.id, type: c.type, criterion: c.criterion, expected: c.expected, scoredAs: expected, runs });
    await writeFile(out, JSON.stringify({ grader: LABEL, args, partial: true, rows }, null, 2));
    const mark =
      first === expected ? "ok " : first == null ? "ERR" : RANK[first] > RANK[expected] ? "FP " : RANK[first] < RANK[expected] ? "FN " : "MIX";
    console.log(`${mark} ${c.id.padEnd(34)} expected ${expected.padEnd(7)} got ${runs.map((r) => r.status ?? "error").join(",")}`);
    for (const r of runs) if (r.error) console.log(`    error: ${r.error}`);
  }

  // Scored on each case's first successful run; the other runs only measure consistency.
  const graded = rows.filter((r) => r.runs.some((x) => x.status));
  const firstOf = (r) => r.runs.find((x) => x.status).status;
  const fp = graded.filter((r) => RANK[firstOf(r)] > RANK[r.scoredAs]);
  const fn = graded.filter((r) => RANK[firstOf(r)] < RANK[r.scoredAs]);
  const notSolid = graded.filter((r) => r.scoredAs !== "solid");
  const multiRun = graded.filter((r) => r.runs.filter((x) => x.status).length > 1);
  const flipped = multiRun.filter((r) => new Set(r.runs.filter((x) => x.status).map((x) => x.status)).size > 1);
  const calls = rows.flatMap((r) => r.runs);
  const ms = calls.map((x) => x.ms);
  const tokens = calls.map((x) => x.tokens).filter((x) => x != null);

  const byType = {};
  for (const r of graded) {
    byType[r.type] ??= { n: 0, correct: 0 };
    byType[r.type].n += 1;
    if (firstOf(r) === r.scoredAs) byType[r.type].correct += 1;
  }

  const summary = {
    grader: LABEL,
    cases: rows.length,
    skipped,
    runsPerCase: RUNS,
    errors: calls.filter((x) => x.error).length,
    accuracyPct: pct(graded.filter((r) => firstOf(r) === r.scoredAs).length, graded.length),
    // Credit above the label: the number that protects the Verified badge.
    falsePositivePct: pct(fp.length, notSolid.length),
    falseNegativePct: pct(fn.length, graded.length),
    altTerminologyRecallPct: pct(
      graded.filter((r) => r.type === "alt" && firstOf(r) === "solid").length,
      graded.filter((r) => r.type === "alt").length,
    ),
    kappa: cohensKappa(graded.map((r) => [firstOf(r), r.scoredAs])),
    flipRatePct: multiRun.length ? pct(flipped.length, multiRun.length) : null,
    lowConfidencePct: GRADER === "v2" ? pct(calls.filter((x) => x.confidence === "low").length, calls.filter((x) => x.status).length) : null,
    latencyMs: { p50: percentile(ms, 50), p95: percentile(ms, 95) },
    tokensPerCall: tokens.length ? Math.round(tokens.reduce((a, b) => a + b, 0) / tokens.length) : null,
    accuracyByType: Object.fromEntries(Object.entries(byType).map(([t, v]) => [t, pct(v.correct, v.n)])),
  };
  console.log("\n", JSON.stringify(summary, null, 2));

  await writeFile(out, JSON.stringify({ grader: LABEL, args, summary, rows }, null, 2));
  console.log(`\nReport: ${out}`);
  clearInterval(keepAlive);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
