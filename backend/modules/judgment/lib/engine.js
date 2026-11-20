// The simulator's rules: which event comes next, what a choice does, and the score.
// Pure (no database, no AI) so a run is repeatable: the same choices always give
// the same world. The AI only writes feedback on top (services/debriefService.js).

import { PRINCIPLES } from "../content/principles.js";

const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

export const totalSlots = (scenario) => scenario.slotWeeks.length;

export const initialRun = (scenario) => ({
  meters: { ...scenario.start },
  flags: [],
  slot: 1,
});

const inSlot = (event, slot) => event.slot === slot || (event.alsoSlots ?? []).includes(slot);

/** The event to play in the run's current slot, or null when the run is over. */
export const currentEvent = (scenario, { slot, flags, decisions = [] }) => {
  if (slot > totalSlots(scenario)) return null;
  const played = new Set(decisions.map((d) => d.eventId));
  return (
    scenario.events.find(
      (e) => inSlot(e, slot) && !played.has(e.id) && (e.requires ?? []).every((f) => flags.includes(f)),
    ) ?? null
  );
};

export const findOption = (event, optionId) => event?.options.find((o) => o.id === optionId) ?? null;

const applyEffects = (meters, effects = {}) => ({
  users: clamp(meters.users + (effects.users ?? 0), 0, 100),
  stability: clamp(meters.stability + (effects.stability ?? 0), 0, 100),
  budget: Math.max(0, meters.budget + (effects.budget ?? 0)),
});

/** The run after `option` is chosen in the current slot. */
export const applyChoice = (run, option) => ({
  meters: applyEffects(run.meters, option.effects),
  flags: [...new Set([...run.flags, ...(option.flags ?? [])])],
  slot: run.slot + 1,
});

// Confidence is the learner's own estimate that their choice is the strong one.
// Over- or underconfident when the average estimate misses the real hit rate by more than this.
const CALIBRATION_MARGIN = 0.15;

const calibrationOf = (pairs) => {
  const avg = (xs) => xs.reduce((a, b) => a + b, 0) / xs.length;
  const gap = avg(pairs.map((p) => p.confidence / 100)) - avg(pairs.map((p) => p.quality));
  if (gap > CALIBRATION_MARGIN) return { label: "overconfident", gap };
  if (gap < -CALIBRATION_MARGIN) return { label: "underconfident", gap };
  return { label: "calibrated", gap };
};

// How much the graded "why" counts next to the choices themselves.
const REASONING_WEIGHT = 0.3;
const MAX_REASONING = 3;

/**
 * Scores a finished run. `reasoning` maps eventId → 0..3 from the AI review, or is
 * null when the review failed: the score then rests on the choices alone.
 */
export const scoreRun = (scenario, decisions, reasoning = null) => {
  const pairs = decisions.map((d) => {
    const event = scenario.events.find((e) => e.id === d.eventId);
    return { quality: findOption(event, d.optionId)?.quality ?? 0, confidence: d.confidence };
  });
  const choices = Math.round((100 * pairs.reduce((s, p) => s + p.quality, 0)) / pairs.length);
  const graded = reasoning ? decisions.map((d) => reasoning[d.eventId]).filter((r) => Number.isFinite(r)) : [];
  const reasoningScore = graded.length
    ? Math.round((100 * graded.reduce((a, b) => a + b, 0)) / (graded.length * MAX_REASONING))
    : null;
  const judgment =
    reasoningScore === null ? choices : Math.round((1 - REASONING_WEIGHT) * choices + REASONING_WEIGHT * reasoningScore);
  return { judgment, choices, reasoning: reasoningScore, calibration: calibrationOf(pairs) };
};

const verdictOf = (quality) => (quality >= 1 ? "strong" : quality > 0 ? "mixed" : "weak");

/** Per-decision debrief rows built from the scenario: what a senior would weigh. */
export const reviewRows = (scenario, decisions) =>
  decisions.map((d) => {
    const event = scenario.events.find((e) => e.id === d.eventId);
    const chosen = findOption(event, d.optionId);
    const best = event.options.find((o) => o.quality === 1);
    return {
      eventId: event.id,
      title: event.title,
      chosen: chosen.label,
      verdict: verdictOf(chosen.quality),
      senior: chosen.senior,
      best: chosen.id === best?.id ? null : best?.label ?? null,
      principle: { id: chosen.principle, ...PRINCIPLES[chosen.principle] },
      why: d.why,
      confidence: d.confidence,
    };
  });
