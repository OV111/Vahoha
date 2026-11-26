import { useEffect, useState } from "react";
import { markLessonFinished } from "@/features/learn/lib/lessonProgress";
import { loadTopicWork, saveTopicWork } from "@/features/learn/lib/topicWork";

const questionsIn = (section) => section.blocks.filter((b) => b.type === "question");

/** One learner's work on one topic page. */
export default function useTopicSession({ topic, trackId, layerId, slug }) {
  const [work, setWork] = useState(() => loadTopicWork(topic.topicId));
  const { answers, explain } = work;

  const questions = topic.sections.flatMap(questionsIn);
  const answered = questions.filter((q) => answers[q.id]);
  const wrong = answered.filter((q) => answers[q.id].optionId !== q.answerId);
  const done = answered.length === questions.length && explain.revealed;

  useEffect(() => {
    saveTopicWork(topic.topicId, work);
  }, [topic.topicId, work]);

  useEffect(() => {
    if (done) markLessonFinished(trackId, layerId, slug);
  }, [done, trackId, layerId, slug]);

  const weakIds = new Set(wrong.map((q) => q.ideaId));

  return {
    answers,
    explain,
    done,
    total: questions.length,
    answeredCount: answered.length,
    rightCount: answered.length - wrong.length,
    sureButWrong: wrong.filter((q) => answers[q.id].confidence === "sure").length,
    weakIdeas: topic.ideas.filter((i) => weakIds.has(i.id)),
    // A section without questions has nothing to prove, so it never shows as done on its own.
    isSectionDone: (section) => {
      const qs = questionsIn(section);
      return qs.length > 0 && qs.every((q) => answers[q.id]);
    },
    answer: (questionId, optionId, confidence) =>
      setWork((w) => ({ ...w, answers: { ...w.answers, [questionId]: { optionId, confidence } } })),
    setExplain: (next) => setWork((w) => ({ ...w, explain: next })),
  };
}
