// A learner's answers and explanation on each topic page, by topicId. Kept in
// this browser until the API stores it (learn_progress, learn_answers).
const KEY = "vahoha.learn.topics";
const EMPTY = { answers: {}, explain: { text: "", revealed: false, covered: [] } };

const readAll = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") ?? {};
  } catch {
    return {};
  }
};

export const loadTopicWork = (topicId) => ({ ...EMPTY, ...readAll()[topicId] });

export const saveTopicWork = (topicId, work) => {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...readAll(), [topicId]: work }));
  } catch {
    /* storage unavailable: answers just aren't remembered */
  }
};
