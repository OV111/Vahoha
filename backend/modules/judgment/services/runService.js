import { ObjectId } from "mongodb";
import { NotFoundError, TooManyRequestsError, ValidationError } from "../../../utils/httpErrors.js";
import { SCENARIOS, getScenario } from "../content/index.js";
import { DAILY_RUNS, RUN_COLLECTION, RUN_STATES } from "../lib/constants.js";
import { applyChoice, currentEvent, findOption, initialRun, reviewRows, scoreRun, totalSlots } from "../lib/engine.js";
import { reviewRun } from "./debriefService.js";

const runs = (db) => db.collection(RUN_COLLECTION);

let indexesReady = null;
const ensureIndexes = (db) => {
  indexesReady ??= Promise.all([
    // One open run per learner and scenario, so two quick clicks on Start can't open two.
    runs(db).createIndex(
      { userId: 1, scenarioId: 1 },
      { unique: true, partialFilterExpression: { state: RUN_STATES.ACTIVE } },
    ),
    runs(db).createIndex({ userId: 1, startedAt: -1 }),
  ]).catch((err) => {
    indexesReady = null; // retry on the next request instead of caching a failure
    throw err;
  });
  return indexesReady;
};

const startOfUtcDay = (now) => new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

const scenarioMeta = (s) => ({
  id: s.id,
  path: s.path,
  title: s.title,
  summary: s.summary,
  setting: s.setting,
  weeks: s.slotWeeks.at(-1) + 1,
  decisions: totalSlots(s),
  start: s.start,
});

// What the learner may see. Option quality and senior notes stay hidden until the run is over,
// otherwise the debrief (and the calibration) would be graded on answers they could read.
const toView = (run, scenario) => {
  const finished = run.state === RUN_STATES.FINISHED;
  const event = finished ? null : currentEvent(scenario, run);
  const history = run.decisions.map((d) => {
    const e = scenario.events.find((x) => x.id === d.eventId);
    const o = findOption(e, d.optionId);
    return { eventId: e.id, week: scenario.slotWeeks[e.slot - 1], title: e.title, choice: o.label, outcome: o.outcome };
  });

  let debrief = null;
  if (finished) {
    const reasoning = run.review ? Object.fromEntries(run.review.decisions.map((d) => [d.eventId, d.reasoning])) : null;
    const feedback = run.review ? Object.fromEntries(run.review.decisions.map((d) => [d.eventId, d.feedback])) : {};
    debrief = {
      score: scoreRun(scenario, run.decisions, reasoning),
      summary: run.review?.summary ?? null,
      aiReviewed: Boolean(run.review),
      decisions: reviewRows(scenario, run.decisions).map((r) => ({
        ...r,
        reasoning: reasoning?.[r.eventId] ?? null,
        feedback: feedback[r.eventId] ?? null,
      })),
    };
  }

  return {
    id: run._id.toString(),
    state: run.state,
    scenario: scenarioMeta(scenario),
    meters: run.meters,
    step: Math.min(run.decisions.length + 1, totalSlots(scenario)),
    event: event && {
      id: event.id,
      week: scenario.slotWeeks[run.slot - 1],
      title: event.title,
      body: event.body,
      options: event.options.map((o) => ({ id: o.id, label: o.label })),
    },
    history,
    debrief,
  };
};

const loadRun = async (db, userId, id) => {
  const run = await runs(db).findOne({ _id: new ObjectId(id), userId: new ObjectId(userId) });
  const scenario = run && getScenario(run.scenarioId);
  if (!run || !scenario) throw new NotFoundError("Run not found.");
  return { run, scenario };
};

/** Every scenario, with the learner's open run and best score on each. */
export const listScenarios = async (db, userId) => {
  await ensureIndexes(db);
  const uid = new ObjectId(userId);
  const [mine, usedToday] = await Promise.all([
    runs(db)
      .find({ userId: uid }, { projection: { scenarioId: 1, state: 1, decisions: 1, review: 1 } })
      .sort({ startedAt: -1 })
      .limit(100)
      .toArray(),
    runs(db).countDocuments({ userId: uid, startedAt: { $gte: startOfUtcDay(new Date()) } }),
  ]);

  const scenarios = SCENARIOS.map((s) => {
    const own = mine.filter((r) => r.scenarioId === s.id);
    const active = own.find((r) => r.state === RUN_STATES.ACTIVE);
    const scores = own
      .filter((r) => r.state === RUN_STATES.FINISHED)
      .map((r) => {
        const reasoning = r.review ? Object.fromEntries(r.review.decisions.map((d) => [d.eventId, d.reasoning])) : null;
        return scoreRun(s, r.decisions, reasoning).judgment;
      });
    return {
      ...scenarioMeta(s),
      activeRunId: active?._id.toString() ?? null,
      bestScore: scores.length ? Math.max(...scores) : null,
      runs: scores.length,
    };
  });
  return { scenarios, quota: { used: usedToday, limit: DAILY_RUNS } };
};

/** Opens a run, or returns the one already open on this scenario. */
export const startRun = async (db, userId, scenarioId, now = new Date()) => {
  const scenario = getScenario(scenarioId);
  if (!scenario) throw new NotFoundError("Scenario not found.");
  await ensureIndexes(db);
  const uid = new ObjectId(userId);

  const open = await runs(db).findOne({ userId: uid, scenarioId, state: RUN_STATES.ACTIVE });
  if (open) return toView(open, scenario);

  const usedToday = await runs(db).countDocuments({ userId: uid, startedAt: { $gte: startOfUtcDay(now) } });
  if (usedToday >= DAILY_RUNS) throw new TooManyRequestsError(`You've used all ${DAILY_RUNS} simulations for today.`);

  const doc = { userId: uid, scenarioId, state: RUN_STATES.ACTIVE, ...initialRun(scenario), decisions: [], startedAt: now };
  try {
    const { insertedId } = await runs(db).insertOne(doc);
    return toView({ ...doc, _id: insertedId }, scenario);
  } catch (err) {
    if (err?.code !== 11000) throw err;
    // A second Start raced this one and won: hand back its run.
    const winner = await runs(db).findOne({ userId: uid, scenarioId, state: RUN_STATES.ACTIVE });
    if (!winner) throw err;
    return toView(winner, scenario);
  }
};

export const getRun = async (db, userId, id) => {
  const { run, scenario } = await loadRun(db, userId, id);
  return toView(run, scenario);
};

/** Applies one decision. The last one finishes the run and asks the AI for the debrief. */
export const submitDecision = async (db, userId, id, { eventId, optionId, why, confidence }, now = new Date()) => {
  const { run, scenario } = await loadRun(db, userId, id);
  const event = run.state === RUN_STATES.ACTIVE ? currentEvent(scenario, run) : null;
  // A resend of an answer that already landed, or a stale tab: show where the run really is.
  if (!event || event.id !== eventId) return toView(run, scenario);

  const option = findOption(event, optionId);
  if (!option) throw new ValidationError("Pick one of the options.");

  const decision = { eventId, optionId, why, confidence, decidedAt: now };
  const next = applyChoice(run, option);
  const decisions = [...run.decisions, decision];
  const finished = !currentEvent(scenario, { ...next, decisions });

  // Filtered on the slot, so two tabs answering the same event can't both apply it.
  const { modifiedCount } = await runs(db).updateOne(
    { _id: run._id, state: RUN_STATES.ACTIVE, slot: run.slot },
    {
      $set: { ...next, state: finished ? RUN_STATES.FINISHED : RUN_STATES.ACTIVE, ...(finished && { finishedAt: now }) },
      $push: { decisions: decision },
    },
  );
  if (!modifiedCount) return getRun(db, userId, id);

  let saved = { ...run, ...next, decisions, state: finished ? RUN_STATES.FINISHED : RUN_STATES.ACTIVE };
  if (finished) {
    // The debrief works without the AI review, so a busy or broken AI never blocks the result.
    const result = await reviewRun(scenario, reviewRows(scenario, decisions)).catch(() => ({ review: null, tokens: 0 }));
    await runs(db).updateOne({ _id: run._id }, { $set: { review: result.review, reviewTokens: result.tokens } });
    saved = { ...saved, review: result.review };
  }
  return toView(saved, scenario);
};

/**
 * For the recruiter scorecard: finished runs and the best judgment score per
 * scenario. Scored the same way as the learner's own list (scoreRun).
 */
export const judgmentSummary = async (db, userId) => {
  const finished = await runs(db)
    .find({ userId: new ObjectId(userId), state: RUN_STATES.FINISHED }, { projection: { scenarioId: 1, decisions: 1, review: 1 } })
    .limit(100)
    .toArray();
  if (!finished.length) return { runs: 0, best: null, scenarios: [] };
  const best = new Map();
  for (const r of finished) {
    const scenario = getScenario(r.scenarioId);
    if (!scenario) continue;
    const reasoning = r.review ? Object.fromEntries(r.review.decisions.map((d) => [d.eventId, d.reasoning])) : null;
    const score = scoreRun(scenario, r.decisions, reasoning).judgment;
    const prev = best.get(scenario.id);
    if (!prev || score > prev.best) best.set(scenario.id, { title: scenario.title, best: score });
  }
  const scenarios = [...best.values()];
  return { runs: finished.length, best: scenarios.length ? Math.max(...scenarios.map((s) => s.best)) : null, scenarios };
};
