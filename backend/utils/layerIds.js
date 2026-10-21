// Roadmap layer ids look like "api-dev-3": lowercase slug, short. Anything
// else is rejected rather than queried, so a tag can't carry markup or operators.
const LAYER_ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,59}$/;

export const isLayerId = (id) => typeof id === "string" && LAYER_ID_PATTERN.test(id);
