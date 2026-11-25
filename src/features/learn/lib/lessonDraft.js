// Where the learner stopped inside an unfinished lesson, with their answers, so
// Continue reopens the same screen. Same localStorage stopgap as lessonProgress.js.
const KEY = "vahoha.learn.draft";

const read = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") ?? {};
  } catch {
    return {};
  }
};

const write = (drafts) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(drafts));
  } catch {
    /* storage unavailable: the lesson just starts over */
  }
};

const id = (trackId, layerId, slug) => `${trackId}/${layerId}/${slug}`;

/** The saved draft, or null. A lesson whose step count changed starts over: answers are kept by step number. */
export const loadDraft = (trackId, layerId, slug, total) => {
  const draft = read()[id(trackId, layerId, slug)];
  return draft && (total === undefined || draft.total === total) ? draft : null;
};

export const saveDraft = (trackId, layerId, slug, draft) =>
  write({ ...read(), [id(trackId, layerId, slug)]: draft });

export const clearDraft = (trackId, layerId, slug) => {
  const { [id(trackId, layerId, slug)]: _cleared, ...rest } = read();
  write(rest);
};
