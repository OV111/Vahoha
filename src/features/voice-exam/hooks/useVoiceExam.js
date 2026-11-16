import { useCallback, useEffect, useReducer, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  abandonAttempt,
  getEligibility,
  startAttempt,
  submitTurn,
} from "../api/voiceExamApi";

const initial = {
  eligibility: null,
  attempt: null,
  isBusy: false,
  error: null,
  unsent: null,
  sending: null,
};

// One reducer keeps isBusy, error, attempt and the unsent answer consistent with each other.
const reducer = (state, action) => {
  switch (action.type) {
    case "ELIGIBILITY_LOADED":
      return { ...state, eligibility: action.eligibility };
    case "REQUEST_STARTED":
      // `sending` tells the waiting screen whether a recording or typed text is on its way.
      return {
        ...state,
        isBusy: true,
        error: null,
        sending: action.sending ?? null,
      };
    case "ATTEMPT_UPDATED":
      return {
        ...state,
        isBusy: false,
        attempt: action.attempt,
        unsent: null,
        sending: null,
      };
    case "FAILED":
      return {
        ...state,
        isBusy: false,
        error: action.error,
        unsent: action.unsent ?? null,
        sending: null,
      };
    case "UNSENT_DISCARDED":
      return { ...state, unsent: null };
    default:
      return state;
  }
};

// Network drops, busy AI and server errors are worth resending as-is. A 4xx (unclear
// audio, too long) means this recording won't work, so the learner records again.
const canResend = (err) =>
  !err.status || err.status === 429 || err.status >= 500;

/** @param {string} layerId */
export const useVoiceExam = (layerId) => {
  const [searchParams] = useSearchParams();
  const path = searchParams.get("path") ?? "backend";
  const [state, dispatch] = useReducer(reducer, initial);
  // A ref, not state: the double-submit guard must see the latest value inside the same tick.
  const busyRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    getEligibility(layerId)
      .then(
        (eligibility) =>
          !cancelled && dispatch({ type: "ELIGIBILITY_LOADED", eligibility }),
      )
      .catch(
        (err) => !cancelled && dispatch({ type: "FAILED", error: err.message }),
      );
    return () => {
      cancelled = true;
    };
  }, [layerId]);

  const run = useCallback(async (call, answer = null) => {
    if (busyRef.current) return;
    busyRef.current = true;
    dispatch({
      type: "REQUEST_STARTED",
      sending: answer ? (answer.audio ? "audio" : "text") : null,
    });
    try {
      dispatch({ type: "ATTEMPT_UPDATED", attempt: await call() });
    } catch (err) {
      // The answer stays in the browser until the server confirms it, so a failed upload never loses it.
      // Typed text is always kept: retyping a long answer is the bigger loss.
      const keep = answer && (answer.text || canResend(err));
      dispatch({
        type: "FAILED",
        error: err.message,
        unsent: keep ? answer : null,
      });
    } finally {
      busyRef.current = false;
    }
  }, []);

  const attemptId = state.attempt?.id;

  // One key per question: a resend of the same question reuses it, so the server never saves it twice.
  const keyRef = useRef({ question: null, key: null });
  const turnKeyFor = () => {
    const question = `${attemptId}:${state.attempt?.currentPrompt?.n}`;
    if (keyRef.current.question !== question)
      keyRef.current = { question, key: crypto.randomUUID() };
    return keyRef.current.key;
  };

  const send = (answer) =>
    run(
      () => submitTurn(attemptId, { ...answer, turnKey: turnKeyFor() }),
      answer,
    );

  return {
    ...state,
    start: () => run(() => startAttempt({ layerId, path })),
    submitText: (text) => send({ text }),
    submitAudio: (audio) => send({ audio }),
    resend: () => state.unsent && send(state.unsent),
    discardUnsent: () => dispatch({ type: "UNSENT_DISCARDED" }),
    abandon: () => run(() => abandonAttempt(attemptId)),
  };
};
