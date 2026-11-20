import { ObjectId } from "mongodb";
import { ConflictError, ForbiddenError, NotFoundError } from "../../../utils/httpErrors.js";
import { addWeakSpot, resolveWeakSpot } from "../../../services/weakSpotService.js";
import { trackEvent } from "../../../services/eventService.js";
import {
  ATTEMPT_COLLECTION,
  DAILY_ATTEMPTS,
  DAILY_AUDIO_SEC_ALL_USERS,
  DAILY_AUDIO_SEC_PER_USER,
  EXAM_TIME_SEC,
  EXPLANATION_LIMIT_SEC,
  FOLLOWUP_LIMIT_SEC,
  INPUT_STATES,
  LIVE_STATES,
  MAX_FAILED_TRIES,
  RETRY_AFTER_FAIL_MS,
  RUBRIC_COLLECTION,
  STATES,
} from "../lib/constants.js";
import { decidePass, looksLikeInstruction, pickGroup } from "../lib/grading.js";
import { finalizeConcepts, gradeExplanation, gradeFollowUp } from "./conceptGrader.js";
import { transcribe } from "./transcribeService.js";

const attempts = (db) => db.collection(ATTEMPT_COLLECTION);

// The grace covers the upload of an answer that was finished in time.
const UPLOAD_GRACE_MS = 30_000;

// Out of time, upload grace included.
const isPastDeadline = (attempt, now) => attempt.deadlineAt.getTime() + UPLOAD_GRACE_MS <= now;

// Closes an attempt that ran out of time.
const expire = (db, attempt, now) =>
  attempts(db).updateOne({ _id: attempt._id }, { $set: { state: STATES.EXPIRED, finishedAt: now } });

// The layer's rubric, only once a person has reviewed it.
export const getRubric = (db, layer) => db.collection(RUBRIC_COLLECTION).findOne({ layer, reviewed: true });

// Midnight UTC of the given day: daily limits reset here.
const startOfUtcDay = (now) => new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

// Whisper seconds billed today (all users, or one), rejected recordings included: `whisperSec`
// on each attempt counts every upload Whisper heard, not only the answers that were saved.
// Exams started yesterday that run past midnight count for yesterday: close enough for a cap.
const audioSecondsToday = async (db, now, userId = null) => {
  const [row] = await attempts(db)
    .aggregate([
      { $match: { startedAt: { $gte: startOfUtcDay(now) }, ...(userId && { userId }) } },
      { $group: { _id: null, total: { $sum: { $ifNull: ["$whisperSec", 0] } } } },
    ])
    .toArray();
  return row?.total ?? 0;
};

// Refuses a recording before it reaches Whisper when today's audio is used up.
// 403, not 503: resending the same recording today won't help, so the page doesn't offer it.
const checkAudioAllowance = async (db, userId, now) => {
  const [everyone, mine] = await Promise.all([audioSecondsToday(db, now), audioSecondsToday(db, now, userId)]);
  if (everyone >= DAILY_AUDIO_SEC_ALL_USERS) {
    throw new ForbiddenError("Voice answers are full for today. Type your answer instead.");
  }
  if (mine >= DAILY_AUDIO_SEC_PER_USER) {
    throw new ForbiddenError("You've used today's voice time. Type your answer instead.");
  }
};

// Adds billed Whisper seconds to the attempt, saved even if the answer is then rejected.
const addWhisperSeconds = (db, attempt, seconds) =>
  attempts(db).updateOne({ _id: attempt._id }, { $inc: { whisperSec: seconds } });

// Total tokens of every model call made for this attempt.
const tokensOf = (gradings) => gradings.reduce((sum, g) => sum + (g.tokens ?? 0), 0);

// Can this user take the exam on this layer now? If not, the reasons why.
export const getEligibility = async (db, userId, layer, now = new Date()) => {
  const uid = new ObjectId(userId);
  const [rubric, passedTest, usedToday, lastFail, verified, layerDoc] = await Promise.all([
    getRubric(db, layer),
    db.collection("examHistory").findOne({ userId: uid, layer, passed: true }, { projection: { _id: 1 } }),
    attempts(db).countDocuments({ userId: uid, startedAt: { $gte: startOfUtcDay(now) } }),
    attempts(db).findOne(
      { userId: uid, layer, passed: false, practice: { $ne: true }, finishedAt: { $gte: new Date(now - RETRY_AFTER_FAIL_MS) } },
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

// The question the learner should answer now, or null if none is waiting.
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
  mode: attempt.practice ? "practice" : "graded",
  state: attempt.state,
  secondsLeft: Math.max(0, Math.round((attempt.deadlineAt - now) / 1000)),
  segmentLimitSec: attempt.state === STATES.AWAITING_ANSWER ? FOLLOWUP_LIMIT_SEC : EXPLANATION_LIMIT_SEC,
  currentPrompt: promptOf(attempt),
  result: attempt.result ?? null,
});

// Starts a new exam: checks eligibility, closes any open one, picks a random question group.
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
    // Already verified on this layer: a fail here costs nothing but the try.
    practice: eligibility.verified,
  };
  const { insertedId } = await attempts(db).insertOne(attempt);
  await trackEvent(db, userId, "voice_exam_started", { layer });
  return toView({ ...attempt, _id: insertedId }, now);
};

// Loads an attempt only if it belongs to this user.
const loadOwn = async (db, userId, attemptId) => {
  const attempt = await attempts(db).findOne({ _id: new ObjectId(attemptId), userId: new ObjectId(userId) });
  if (!attempt) throw new NotFoundError("Exam not found.");
  return attempt;
};

// Attempts started before per-subtopic grading only stored the explanation's grades.
const currentConcepts = (attempt) => attempt.concepts ?? attempt.explanationConcepts ?? [];

// Final grades, pass/fail, weak spots and analytics.
// `explanationOnly`: no follow-ups were asked, so the explanation's grades are re-checked, not regraded.
const finish = async (db, userId, attempt, now, { explanationOnly = false } = {}) => {
  const { concepts, logs } = await finalizeConcepts(attempt.subtopics, currentConcepts(attempt), attempt.turns, now, {
    regradeChecklist: !explanationOnly,
  });
  const gradings = [...(attempt.gradings ?? []), ...logs];
  const tokensUsed = tokensOf(gradings);
  const passed = decidePass(concepts);
  // Typed answers can be read off another screen, so the result says how it was given.
  const spoken = attempt.turns.every((t) => t.spoken);
  const result = {
    passed,
    concepts,
    spoken,
    retryAvailableAt: passed || attempt.practice ? null : new Date(now.getTime() + RETRY_AFTER_FAIL_MS).toISOString(),
    // So the learner can see exactly what was graded.
    transcript: attempt.turns.map(({ prompt, text }) => ({ prompt, text })),
  };

  // Every gap is recorded, on a pass too (a passed exam can still have shallow parts), and a
  // subtopic proven solid closes the weak spot an earlier test or exam opened for it.
  const spot = { path: attempt.path, layer: attempt.layer, source: "voice_exam" };
  await Promise.all(
    concepts.map((c) =>
      c.status === "solid" ? resolveWeakSpot(db, userId, c.label) : addWeakSpot(db, userId, { topic: c.label, ...spot }),
    ),
  );

  const seconds = concepts.filter((c) => c.secondOpinion);
  const disputed = seconds.filter((c) => !c.secondOpinion.agreed);
  await trackEvent(db, userId, "voice_exam_submitted", {
    layer: attempt.layer,
    passed,
    spoken,
    practice: attempt.practice,
    // Per-subtopic outcomes: a subtopic almost nobody passes usually means a badly written criterion.
    concepts: concepts.map((c) => ({ id: c.criterionId ?? c.label, status: c.status })),
    secondOpinions: seconds.length,
    disputed: disputed.length,
    tokensUsed,
  });
  // Kept off the learner's view: a flag for human review, never an automatic fail.
  const flagged = attempt.turns.some((t) => looksLikeInstruction(t.text)) || disputed.length > 0;
  return { state: STATES.COMPLETED, result, concepts, passed, spoken, flagged, gradings, tokensUsed, finishedAt: now };
};

/**
 * One answer in; the next question or the result out.
 * `audio` (a Buffer) or `text`; `turnKey` is the client's id for this answer, so a
 * retry after a lost response returns the saved result instead of grading twice.
 */
export const submitTurn = async (db, userId, attemptId, { text, audio, turnKey }, now = new Date()) => {
  const current = await loadOwn(db, userId, attemptId);

  if (current.turns.some((t) => t.key === turnKey)) return toView(current, now);

  if (isPastDeadline(current, now) && LIVE_STATES.includes(current.state)) {
    await expire(db, current, now);
    return toView({ ...current, state: STATES.EXPIRED }, now);
  }
  if (!INPUT_STATES.includes(current.state)) throw new ConflictError("This exam isn't waiting for an answer.");

  const isExplanation = current.state === STATES.AWAITING_EXPLANATION;
  // Claiming the attempt by its state means a double submit can't grade the same answer twice.
  const claimed = await attempts(db).findOneAndUpdate(
    { _id: current._id, state: current.state },
    { $set: { state: isExplanation ? STATES.ANALYZING : STATES.GRADING, claimedAt: now } },
    { returnDocument: "after" },
  );
  if (!claimed) throw new ConflictError("This answer is already being checked.");

  try {
    let audioSec = 0;
    if (audio) {
      await checkAudioAllowance(db, current.userId, now);
      ({ text, durationSec: audioSec } = await transcribe(audio, {
        subtopics: current.subtopics,
        maxSec: isExplanation ? EXPLANATION_LIMIT_SEC : FOLLOWUP_LIMIT_SEC,
        onBilled: (seconds) => addWhisperSeconds(db, current, seconds),
      }));
    }
    const followUp = current.followUps[0];
    const turn = {
      key: turnKey,
      kind: isExplanation ? "explanation" : "followup",
      prompt: isExplanation ? current.question : followUp.question,
      ...(!isExplanation && { subtopic: followUp.subtopic }),
      text,
      spoken: Boolean(audio),
      audioSec,
    };
    const turns = [...current.turns, turn];

    let graded;
    if (isExplanation) {
      // Follow-ups only for what the explanation left weak, in checklist order.
      const { concepts, logs } = await gradeExplanation(current.subtopics, turn, now);
      const followUps = current.subtopics
        .filter((s) => concepts.find((c) => c.label === s.title)?.status !== "solid")
        .map((s) => ({ subtopic: s.title, question: s.followUp }));
      graded = { turns, followUps, concepts, explanationConcepts: concepts, gradings: [...(current.gradings ?? []), ...logs] };
    } else {
      const explanation = turns.find((t) => t.kind === "explanation");
      const { concepts, logs } = await gradeFollowUp(current.subtopics, currentConcepts(current), explanation, turn, now);
      graded = { turns, followUps: current.followUps.slice(1), concepts, gradings: [...(current.gradings ?? []), ...logs] };
    }

    // More follow-ups to ask: wait for the next answer. None left: finish the exam.
    const update = graded.followUps.length
      ? { state: STATES.AWAITING_ANSWER, ...graded }
      : { ...graded, ...(await finish(db, userId, { ...current, ...graded }, now, { explanationOnly: isExplanation })) };
    // A saved answer starts the next question with a clean count of failed tries.
    await attempts(db).updateOne({ _id: current._id }, { $set: { ...update, failedTries: 0 } });
    return toView({ ...current, ...update }, now);
  } catch (err) {
    // Nothing was saved (unclear audio, AI busy or unreadable): give the question back so the learner can resend.
    const failedTries = (current.failedTries ?? 0) + (costsNothing(err) ? 0 : 1);
    if (failedTries >= MAX_FAILED_TRIES) {
      const closed = { state: STATES.FAILED_TECHNICAL, finishedAt: now, failedTries };
      await attempts(db).updateOne({ _id: current._id }, { $set: closed });
      return toView({ ...current, ...closed }, now);
    }
    await attempts(db).updateOne({ _id: current._id }, { $set: { state: current.state, failedTries } });
    throw err;
  }
};

// Refused before any AI ran (audio allowance used up, AI busy): resending these costs us nothing.
const costsNothing = (err) => err?.status === 403 || err?.status === 503;

// Grading takes seconds; a claim older than this means the server died mid-answer.
const STALE_CLAIM_MS = 2 * 60_000;
const INPUT_OF = { [STATES.ANALYZING]: STATES.AWAITING_EXPLANATION, [STATES.GRADING]: STATES.AWAITING_ANSWER };

/** The exam still open on this layer, so a page reload picks it up instead of costing a try. */
export const getLiveAttempt = async (db, userId, layer, now = new Date()) => {
  const current = await attempts(db).findOne(
    { userId: new ObjectId(userId), layer, state: { $in: LIVE_STATES } },
    { sort: { startedAt: -1 } },
  );
  if (!current) return null;

  if (isPastDeadline(current, now)) {
    await expire(db, current, now);
    return null;
  }
  const back = INPUT_OF[current.state];
  if (back && (!current.claimedAt || now - current.claimedAt > STALE_CLAIM_MS)) {
    // The answer was never saved, so the question is asked again.
    const freed = await attempts(db).findOneAndUpdate(
      { _id: current._id, state: current.state },
      { $set: { state: back } },
      { returnDocument: "after" },
    );
    return freed ? toView(freed, now) : null;
  }
  return toView(current, now);
};

/** Every layer this user passed a voice exam on, with the first pass: [{ layer, verifiedAt, spoken }]. */
export const listVerifiedLayers = async (db, userId) => {
  const passes = await attempts(db)
    .find({ userId: new ObjectId(userId), passed: true }, { projection: { layer: 1, finishedAt: 1, spoken: 1 } })
    .sort({ finishedAt: 1 })
    .toArray();
  // The first pass dates the badge; a later spoken pass upgrades a typed one.
  const byLayer = new Map();
  for (const p of passes) {
    const seen = byLayer.get(p.layer);
    if (!seen) byLayer.set(p.layer, { layer: p.layer, verifiedAt: p.finishedAt, spoken: p.spoken !== false });
    else if (p.spoken !== false) seen.spoken = true;
  }
  return [...byLayer.values()].reverse();
};

// The learner quits: the exam closes and counts as a used try.
export const abandonAttempt = async (db, userId, attemptId, now = new Date()) => {
  const current = await loadOwn(db, userId, attemptId);
  if (!INPUT_STATES.includes(current.state)) return toView(current, now);
  await attempts(db).updateOne(
    { _id: current._id, state: { $in: INPUT_STATES } },
    { $set: { state: STATES.ABANDONED, finishedAt: now } },
  );
  return toView({ ...current, state: STATES.ABANDONED }, now);
};
