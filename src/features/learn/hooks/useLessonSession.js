import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { finishedLessons, markLessonFinished } from "../lib/lessonProgress";
import { clearDraft, loadDraft, saveDraft } from "../lib/lessonDraft";

const DONE = "done";
const EMPTY_WORK = {
  answers: {}, // step index -> picked option
  tries: {}, // step index -> "failed" | "passed" | "shown"
  explain: { text: "", revealed: false, covered: [] },
  furthest: 0, // the last step reached; later ones stay closed in the outline
};

export const solved = (result) => result === "passed" || result === "shown";

/**
 * One learner working through one lesson: where they are, what they answered,
 * and saving both. The current step lives in the URL (?step=4), so Back, refresh
 * and shared links all land on the same screen. Without it, the lesson reopens
 * where this browser left off.
 */
export default function useLessonSession({ trackId, layerId, slug, steps }) {
  const [params, setParams] = useSearchParams();
  const [draft] = useState(() => loadDraft(trackId, layerId, slug, steps.length));
  const [doneBefore] = useState(() => finishedLessons(trackId, layerId).has(slug));
  const [work, setWork] = useState(() => ({ ...EMPTY_WORK, ...draft?.work }));

  const raw = params.get("step");
  const asked = raw === null ? (draft?.index ?? 0) : Number.parseInt(raw, 10) - 1 || 0;
  const index = raw === DONE ? steps.length : Math.min(Math.max(asked, 0), steps.length - 1);
  const finished = index === steps.length;
  const step = steps[index];
  const furthest = doneBefore ? steps.length : Math.max(work.furthest, index);

  // Opening ?step=done directly isn't finishing; working through the steps is.
  const engaged = Object.keys(work.answers).length > 0 || work.explain.revealed;

  useEffect(() => {
    if (finished && engaged) {
      markLessonFinished(trackId, layerId, slug);
      clearDraft(trackId, layerId, slug);
    } else if (!finished && (index > 0 || engaged)) {
      saveDraft(trackId, layerId, slug, { index, total: steps.length, work: { ...work, furthest: Math.max(work.furthest, index) } });
    }
  }, [finished, engaged, index, work, steps.length, trackId, layerId, slug]);

  const blocked =
    !finished &&
    ((step.kind === "check" && work.answers[index] == null) ||
      (step.kind === "try" && !solved(work.tries[index])) ||
      (step.kind === "explain" && !work.explain.revealed));

  const goTo = (i) => {
    setWork((w) => ({ ...w, furthest: Math.max(w.furthest, index, Math.min(i, steps.length)) }));
    setParams({ step: i >= steps.length ? DONE : String(i + 1) });
    window.scrollTo({ top: 0 });
  };

  return {
    index,
    step,
    finished,
    furthest,
    engaged,
    work,
    canContinue: !blocked,
    goTo,
    back: () => index > 0 && goTo(index - 1),
    forward: () => !blocked && !finished && goTo(index + 1),
    setAnswer: (i) => setWork((w) => ({ ...w, answers: { ...w.answers, [index]: i } })),
    setTry: (result) => setWork((w) => ({ ...w, tries: { ...w.tries, [index]: result } })),
    setExplain: (explain) => setWork((w) => ({ ...w, explain })),
  };
}
