// Speech-to-text wrapper — scaffold only, not implemented. Plan: docs/product/VOICE_EXAM_SPEC.md (§11).
//
// Groq whisper-large-v3-turbo with the layer glossary as the prompt, called with
// GROQ_VOICE_API_KEY (falls back to GROQ_API_KEY). Every graded answer goes through
// server STT, never the browser Web Speech API: free users must not get worse
// transcription than paid ones, and Web Speech only works in Chrome/Edge.
// The audio buffer is discarded right after transcription; only the text is kept.
// Planned shape: transcribeAudio(audioBuffer, mimeType, { glossary }) -> { text, durationSec, segments }

export const transcribeAudio = async () => {
  throw new Error("Not implemented — see docs/product/VOICE_EXAM_SPEC.md");
};
