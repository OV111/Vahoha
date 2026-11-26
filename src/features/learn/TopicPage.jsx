import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { hasLab } from "@/features/labs/content";
import { hasTopic, topicMeta } from "./content/topics";
import useLearnLayer from "./hooks/useLearnLayer";
import useTopic from "./hooks/useTopic";
import { findLesson } from "./lib/curriculum";
import { layerStatuses, markLessonOpened } from "./lib/lessonStatus";
import { nextLesson } from "./lib/nextLesson";
import LearnState from "./components/LearnState";
import TopicArticle from "./components/topic/TopicArticle";
import TopicSummary from "./components/topic/TopicSummary";

/** The written topic to open after this one, or null. */
function nextTopicLink(track, layer, lessons, lesson) {
  const isWritten = (slug) => hasTopic(track.id, layer.id, slug);
  const others = lessons.filter((l) => l.slug !== lesson.slug && isWritten(l.slug));
  const next = nextLesson(others, layerStatuses(track.id, layer.id), isWritten);
  return (
    next && {
      href: `/learn/${track.id}/${layer.id}/${next.slug}`,
      title: topicMeta(track.id, layer.id, next.slug).mystery,
    }
  );
}

export default function TopicPage() {
  const { trackId, layerId, topicSlug } = useParams();
  const { status, track, layer, lessons } = useLearnLayer(trackId, layerId);
  const { status: topicStatus, topic } = useTopic(trackId, layerId, topicSlug);

  // Opening a real lesson marks it "in progress" on the roadmap; no manual ticking.
  const exists = status === "ready" && lessons.some((l) => l.slug === topicSlug);
  useEffect(() => {
    if (exists) markLessonOpened(trackId, layerId, topicSlug);
  }, [exists, trackId, layerId, topicSlug]);

  if (status !== "ready") return <LearnState status={status} variant="article" />;
  // A map lesson that another lesson covers opens that one.
  const teacher = lessons.find((l) => l.also?.includes(topicSlug));
  if (teacher) return <Navigate to={`/learn/${track.id}/${layer.id}/${teacher.slug}`} replace />;
  const found = findLesson(lessons, topicSlug);
  if (!found) return <LearnState status="missing" />;
  if (topicStatus === "loading") return <LearnState status="loading" variant="article" />;
  if (topicStatus === "error") return <LearnState status="error" what="topic" />;

  const labHref = hasLab(track.id, layer.id, topicSlug) ? `/learn/${track.id}/${layer.id}/${topicSlug}/lab` : null;

  if (topicStatus === "none") return <TopicSummary track={track} layer={layer} labHref={labHref} {...found} />;

  return (
    <TopicArticle
      // A fresh page per topic, so answers never leak into the next one.
      key={topic.topicId}
      topic={topic}
      track={track}
      layer={layer}
      lesson={found.lesson}
      lessons={lessons}
      next={nextTopicLink(track, layer, lessons, found.lesson)}
      labHref={labHref}
    />
  );
}
