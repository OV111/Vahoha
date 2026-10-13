// YOU WRITE THIS HOOK. It is the learning part: a small state machine around the API.
// Until then it returns the idle shape below so the page compiles and renders PreExam.
//
// Contract (what VoiceExamPage expects back):
//   eligibility : Eligibility | null     loaded on mount via getEligibility(layerId)
//   attempt     : AttemptView | null     null until start() succeeds
//   isBusy      : boolean                true while ANY api call is in flight
//   error       : string | null          last failure, human readable
//   start()                              startAttempt({ layerId, mode: "graded" })
//   submitText(text)                     submitTurn(attempt.id, { text })
//   submitAudio(blob)                    submitTurn(attempt.id, { audio: blob })
//   abandon()                            abandonAttempt(attempt.id)
//
// Plan:
//   1. useReducer with actions: ELIGIBILITY_LOADED, REQUEST_STARTED, ATTEMPT_UPDATED, FAILED.
//      One reducer instead of four useState calls keeps isBusy/error/attempt consistent.
//   2. useEffect on layerId loads eligibility; ignore the result if the effect was cleaned
//      up (a `cancelled` flag), so a late response cannot overwrite newer state.
//   3. Each action wraps its api call: dispatch REQUEST_STARTED, await, dispatch
//      ATTEMPT_UPDATED with the returned AttemptView, catch to FAILED.
//   4. Guard against double submit: ignore submit calls while isBusy.
//   5. When attempt.deadlineAt passes while the learner is still in an input state, the
//      server will answer with EXPIRED on the next call. The UI does not decide that.
//
// Import from ../api/voiceExamApi: getEligibility, startAttempt, submitTurn, abandonAttempt.

const noop = () => {};

/** @param {string} _layerId */
export const useVoiceExam = (_layerId) => ({
  eligibility: null,
  attempt: null,
  isBusy: false,
  error: null,
  start: noop,
  submitText: noop,
  submitAudio: noop,
  abandon: noop,
});
