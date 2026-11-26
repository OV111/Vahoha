// Short ways to write the blocks of a topic file. They only build the plain objects
// that backend/modules/learn/schemas/topic.schemas.js describes.

export const text = (id, body) => ({ id, type: "text", body });

export const picture = (id, diagram, alt) => ({ id, type: "picture", diagram, alt });

/** A React example that runs in the preview; it must define `App`. */
export const jsx = (id, caption, source) => ({ id, type: "code", lang: "jsx", runnable: true, caption, source });

export const realCase = (id, title, situation, problem, cause, fix) => ({
  id, type: "realCase", title, situation, problem, cause, fix,
});

export const compare = (id, wrong, right, why) => ({ id, type: "compare", wrong, right, why });

/**
 * A question without its block type, as review questions are stored.
 * `options` maps an option id to its text, or to [text, misconceptionId].
 */
export const reviewQuestion = (id, ideaId, prompt, options, answerId, why, extra = {}) => ({
  id,
  ideaId,
  kind: "choice",
  prompt,
  options: Object.entries(options).map(([optionId, value]) => {
    const [label, misconceptionId] = [value].flat();
    return { id: optionId, text: label, ...(misconceptionId ? { misconceptionId } : {}) };
  }),
  answerId,
  why,
  difficulty: 1,
  ...extra,
});

export const question = (...args) => ({ type: "question", ...reviewQuestion(...args) });
