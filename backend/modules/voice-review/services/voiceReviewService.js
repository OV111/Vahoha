// Voice AI Progress Review — scaffold only, not implemented.
//
// Planned responsibilities:
// - transcribeSession(db, userId, path, layer, audio)   -> sends recorded audio to STT (see agent/transcriptionService.js), stores raw transcript
// - reviewTranscript(db, userId, path, layer, transcript) -> reuses the exam engine's grading approach (examEngineService) but scores
//   free-form explanation instead of MCQ answers: correctness, completeness, weak topics
// - getVoiceReviewHistory(db, userId, path, layer)       -> mirrors examHistoryService for past voice review attempts
//
// Async v1 only (record -> review after). Live/sync follow-up questioning is a later iteration.

export const transcribeSession = async () => {
  throw new Error("Not implemented");
};

export const reviewTranscript = async () => {
  throw new Error("Not implemented");
};

export const getVoiceReviewHistory = async () => {
  throw new Error("Not implemented");
};
