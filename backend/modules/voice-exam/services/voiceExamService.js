import { ObjectId } from "mongodb";
import { ConflictError, ForbiddenError, NotFoundError } from "../../../utils/httpErrors.js";
import { addWeakSpot } from "../../../services/weakSpotService.js";
import { trackEvent } from "../../../services/eventService.js";
import {
  ATTEMPT_COLLECTION,
  DAILY_ATTEMPTS,
  DAILY_AUDIO_SEC_ALL_USERS,
  EXAM_TIME_SEC,
  EXPLANATION_LIMIT_SEC,
  FOLLOWUP_LIMIT_SEC,
  INPUT_STATES,
  LIVE_STATES,
  RETRY_AFTER_FAIL_MS,
  RUBRIC_COLLECTION,
  STATES,
} from "../lib/constants.js";
import { decidePass, pickGroup, verifyResults } from "../lib/grading.js";
import { gradeTurns } from "./graderService.js";
import { transcribe } from "./transcribeService.js";

const attempts = (db) => db.collection(ATTEMPT_COLLECTION);
const UPLOAD_GRACE_MS = 30_000;

export const getRubric = (db, layer) => db.collection(RUBRIC_COLLECTION).findOne({ layer, reviewed: true });

const startOfUtcDay = (now) => new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

// Audio transcribed today across all users, against Groq's daily audio allowance.
// Exams started yesterday that run past midnight count for yesterday: close enough for a cap.
const audioSecondsToday = async (db, now) => {
  const [row] = await attempts(db)
    .aggregate([
      { $match: { startedAt: { $gte: startOfUtcDay(now) } } },
      { $unwind: "$turns" },
      { $group: { _id: null, total: { $sum: { $ifNull: ["$turns.audioSec", 0] } } } },
    ])
    .toArray();
  return row?.total ?? 0;
};

export const getEligibility = async (db, userId, layer, now = new Date()) => {
  const uid = new ObjectId(userId);
  const [rubric, passedTest, usedToday, lastFail, verified, layerDoc] = await Promise.all([
    getRubric(db, layer),
    db.collection("examHistory").findOne({ userId: uid, layer, passed: true }, { projection: { _id: 1 } }),
    attempts(db).countDocuments({ userId: uid, startedAt: { $gte: startOfUtcDay(now) } }),
    attempts(db).findOne(
      { userId: uid, layer, passed: false, finishedAt: { $gte: new Date(now - RETRY_AFTER_FAIL_MS) } },
      { sort: { finishedAt: -1 } },
    ),
    attempts(db).findOne({ userId: uid, layer, passed: true }, { projection: { _id: 1 } }),
    db.collection("roadmap_layers").findOne({ layerId: layer }, { projection: { title: 1 } }),
  ]);

  const reasons = [];
  if (!rubric) reasons.push("This layer has no voice exam yet.");
  if (!passedTest) reasons.push("Pass this layer's test first.");
  if (usedToday >= DAILY_ATTEMPTS) reasons.push(`You've used all ${DAILY_ATTEMPTS} voice exams for today.`);
  const cooldownUntil = lastFail ? new Date(lastFail.finishedAt.getTime() + RETRY_AFTER_FAIL_MS) : null;
  if (cooldownUntil) reasons.push("You can retry this layer 24 hours after a failed attempt.");

  return {
    eligible: reasons.length === 0,
    reasons,
    cooldownUntil: cooldownUntil?.toISOString() ?? null,
    quota: { used: usedToday, limit: DAILY_ATTEMPTS },
    layerTitle: layerDoc?.title ?? null,
    // The group names only: one is picked at random, and the checklist under it stays hidden.
    topics: rubric?.groups.map((g) => g.title) ?? [],
    verified: Boolean(verified),
  };
};

const promptOf = (attempt) => {
  if (attempt.state === STATES.AWAITING_EXPLANATION) {
    return { text: attempt.question, kind: "prompt", n: 1, total: 1 + attempt.subtopics.length };
  }
  if (attempt.state === STATES.AWAITING_ANSWER) {
    const n = attempt.turns.length + 1;
    return { text: attempt.followUps[0].question, kind: "followup", n, total: attempt.turns.length + attempt.followUps.length };
  }
  return null;
};

// The deadline stays on the server; the client only gets the seconds left.
export const toView = (attempt, now = new Date()) => ({
  id: attempt._id.toString(),
  layerId: attempt.layer,
  mode: "graded",
  state: attempt.state,
  secondsLeft: Math.max(0, Math.round((attempt.deadlineAt - now) / 1000)),
  segmentLimitSec: attempt.state === STATES.AWAITING_ANSWER ? FOLLOWUP_LIMIT_SEC : EXPLANATION_LIMIT_SEC,
  currentPrompt: promptOf(attempt),
  result: attempt.result ?? null,
});

export const startAttempt = async (db, userId, { layer, path }, now = new Date()) => {
  const eligibility = await getEligibility(db, userId, layer, now);
  if (!eligibility.eligible) throw new ForbiddenError(eligibility.reasons[0], { eligibility });

  const uid = new ObjectId(userId);
  // One exam at a time: starting again closes whatever was left open.
  await attempts(db).updateMany(
    { userId: uid, state: { $in: LIVE_STATES } },
    { $set: { state: STATES.ABANDONED, finishedAt: now } },
  );

  const rubric = await getRubric(db, layer);
  const group = pickGroup(rubric.groups);
  const attempt = {
    userId: uid,
    path,
    layer,
    group: group.title,
    question: group.question,
    subtopics: group.subtopics,
    state: STATES.AWAITING_EXPLANATION,
    turns: [],
    followUps: [],
    result: null,
    passed: null,
    startedAt: now,
    deadlineAt: new Date(now.getTime() + EXAM_TIME_SEC * 1000),
    finishedAt: null,
    // What the learner agreed to, and when: recording and transcription for this exam.
    consentAt: now,
  };
  const { insertedId } = await attempts(db).insertOne(attempt);
  await trackEvent(db, userId, "voice_exam_started", { layer });
  return toView({ ...attempt, _id: insertedId }, now);
};

const loadOwn = async (db, userId, attemptId) => {
  const attempt = await attempts(db).findOne({ _id: new ObjectId(attemptId), userId: new ObjectId(userId) });
  if (!attempt) throw new NotFoundError("Exam not found.");
  return attempt;
};

// `concepts` is passed when the explanation alone was already graded, so it isn't graded twice.
const finish = async (db, userId, attempt, now, concepts) => {
  if (!concepts) {
    const transcript = attempt.turns.map((t) => t.text).join(" ");
    concepts = verifyResults(await gradeTurns(attempt.subtopics, attempt.turns), attempt.subtopics, transcript);
  }
  const passed = decidePass(concepts);
  const result = {
    passed,
    concepts,
    retryAvailableAt: passed ? null : new Date(now.getTime() + RETRY_AFTER_FAIL_MS).toISOString(),
    // So the learner can see exactly what was graded.
    transcript: attempt.turns.map(({ prompt, text }) => ({ prompt, text })),
  };

  if (!passed) {
    await Promise.all(
      concepts
        .filter((c) => c.status !== "solid")
        .map((c) => addWeakSpot(db, userId, { topic: c.label, path: attempt.path, layer: attempt.layer, source: "voice_exam" })),
    );
  }
  await trackEvent(db, userId, "voice_exam_submitted", { layer: attempt.layer, passed });
  return { state: STATES.COMPLETED, result, passed, finishedAt: now };
};

/**
 * One answer in; the next question or the result out.
 * `audio` (a Buffer) or `text`; `turnKey` is the client's id for this answer, so a
 * retry after a lost response returns the saved result instead of grading twice.
 */
export const submitTurn = async (db, userId, attemptId, { text, audio, turnKey }, now = new Date()) => {
  const current = await loadOwn(db, userId, attemptId);

  if (current.turns.some((t) => t.key === turnKey)) return toView(current, now);

  // The grace covers the upload of an answer that was finished in time.
  if (current.deadlineAt.getTime() + UPLOAD_GRACE_MS <= now && LIVE_STATES.includes(current.state)) {
    await attempts(db).updateOne({ _id: current._id }, { $set: { state: STATES.EXPIRED, finishedAt: now } });
    return toView({ ...current, state: STATES.EXPIRED }, now);
  }
  if (!INPUT_STATES.includes(current.state)) throw new ConflictError("This exam isn't waiting for an answer.");

  const working = current.state === STATES.AWAITING_EXPLANATION ? STATES.ANALYZING : STATES.GRADING;
  // Claiming the attempt by its state means a double submit can't grade the same answer twice.
  const claimed = await attempts(db).findOneAndUpdate(
    { _id: current._id, state: current.state },
    { $set: { state: working } },
    { returnDocument: "after" },
  );
  if (!claimed) throw new ConflictError("This answer is already being checked.");

  const isExplanation = current.state === STATES.AWAITING_EXPLANATION;

  try {
    let audioSec = 0;
    if (audio) {
      if ((await audioSecondsToday(db, now)) >= DAILY_AUDIO_SEC_ALL_USERS) {
        // 403, not 503: resending the same recording today won't help, so the page doesn't offer it.
        throw new ForbiddenError("Voice answers are full for today. Type your answer instead.");
      }
      const maxSec = isExplanation ? EXPLANATION_LIMIT_SEC : FOLLOWUP_LIMIT_SEC;
      ({ text, durationSec: audioSec } = await transcribe(audio, { subtopics: current.subtopics, maxSec }));
    }
    const turn = isExplanation
      ? { key: turnKey, kind: "explanation", prompt: current.question, text, spoken: Boolean(audio), audioSec }
      : {
          key: turnKey,
          kind: "followup",
          prompt: current.followUps[0].question,
          subtopic: current.followUps[0].subtopic,
          text,
          spoken: Boolean(audio),
          audioSec,
        };
    const turns = [...current.turns, turn];

    let update;
    if (isExplanation) {
      // Follow-ups only for what the explanation left weak, in checklist order.
      const raw = await gradeTurns(current.subtopics, turns);
      const concepts = verifyResults(raw, current.subtopics, text);
      const followUps = current.subtopics
        .filter((s) => concepts.find((c) => c.label === s.title)?.status !== "solid")
        .map((s) => ({ subtopic: s.title, question: s.followUp }));
      update = followUps.length
        ? { state: STATES.AWAITING_ANSWER, turns, followUps }
        : { turns, followUps, ...(await finish(db, userId, { ...current, turns }, now, concepts)) };
    } else {
      const followUps = current.followUps.slice(1);
      update = followUps.length
        ? { state: STATES.AWAITING_ANSWER, turns, followUps }
        : { turns, followUps, ...(await finish(db, userId, { ...current, turns }, now)) };
    }
    await attempts(db).updateOne({ _id: current._id }, { $set: update });
    return toView({ ...current, ...update }, now);
  } catch (err) {
    // Nothing was saved (unclear audio, AI busy or unreadable): give the question back so the learner can resend.
    await attempts(db).updateOne({ _id: current._id }, { $set: { state: current.state } });
    throw err;
  }
};

/** Every layer this user passed a voice exam on, with the first pass: [{ layer, verifiedAt }]. */
export const listVerifiedLayers = async (db, userId) => {
  const passes = await attempts(db)
    .find({ userId: new ObjectId(userId), passed: true }, { projection: { layer: 1, finishedAt: 1 } })
    .sort({ finishedAt: 1 })
    .toArray();
  const first = new Map();
  for (const p of passes) if (!first.has(p.layer)) first.set(p.layer, p.finishedAt);
  return [...first].map(([layer, verifiedAt]) => ({ layer, verifiedAt })).reverse();
};

export const abandonAttempt = async (db, userId, attemptId, now = new Date()) => {
  const current = await loadOwn(db, userId, attemptId);
  if (!INPUT_STATES.includes(current.state)) return toView(current, now);
  await attempts(db).updateOne(
    { _id: current._id, state: { $in: INPUT_STATES } },
    { $set: { state: STATES.ABANDONED, finishedAt: now } },
  );
  return toView({ ...current, state: STATES.ABANDONED }, now);
};
