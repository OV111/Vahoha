// Layers that have a published voice-exam rubric. Only these show the "Voice exam"
// button, so learners never land on a layer with no content.
// TODO: replace with an eligibility/published-rubric check from the backend (Stage 1).
const PILOT_LAYER_IDS = new Set(["api-dev-6"]);

export const hasVoiceExam = (layerId) => PILOT_LAYER_IDS.has(layerId);
