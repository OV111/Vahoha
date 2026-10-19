import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import useLearnLayer from "./hooks/useLearnLayer";
import useLessonContent from "./hooks/useLessonContent";
import LearnState from "./components/LearnState";
import LessonPlayer from "./components/LessonPlayer";
import { findLesson } from "./lib/curriculum";

const primaryLink =
  "inline-flex min-h-11 items-center gap-2 rounded-xl bg-purple-600 px-5 text-sm font-medium text-white transition-colors hover:bg-purple-500";

export default function TopicPage() {
  const { trackId, layerId, topicSlug } = useParams();
  const { status, track, layer, lessons } = useLearnLayer(trackId, layerId);
  const content = useLessonContent(trackId, layerId, topicSlug);
  // Known before anything loads, so the placeholder already has the right shape.
  const variant = content.status === "none" ? "article" : "lesson";

  if (status !== "ready") return <LearnState status={status} variant={variant} />;
  if (content.status === "loading") return <LearnState status="loading" variant="lesson" />;
  const found = findLesson(lessons, topicSlug);
  if (!found) return <LearnState status="missing" />;

  const { lesson, prev, next, total } = found;
  const base = `/learn/${track.id}/${layer.id}`;

  // A written lesson gets the step-by-step player; the rest keep the summary page.
  if (content.status === "ready") {
    return (
      <LessonPlayer
        // A fresh player per lesson, so answers never leak into the next one.
        key={`${layer.id}/${lesson.slug}`}
        track={track}
        layer={layer}
        lesson={lesson}
        content={content.lesson}
        next={next ? { href: `${base}/${next.slug}`, title: next.title } : null}
        testHref={`/roadmaps/exam/${layer.id}?path=${track.domain.id}`}
      />
    );
  }

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-10 sm:px-10">
      <Link to={base} className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-200">
        <ArrowLeft size={14} aria-hidden="true" /> {layer.title}
      </Link>

      <header className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-purple-400">
          {lesson.section} · {lesson.order} of {total}
        </p>
        <h1 className="mt-2 text-2xl font-bold leading-snug text-neutral-100 sm:text-3xl">{lesson.title}</h1>
      </header>

      {content.status === "error" && (
        <p className="mt-8 text-sm text-neutral-400">
          This lesson didn't load. Check your connection and refresh the page.
        </p>
      )}
      {content.status === "none" && (
        <>
          <section className="mt-8">
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500">The idea</h2>
            <p className="mt-3 leading-relaxed text-neutral-300">{lesson.description}</p>
          </section>

          <section className="mt-8">
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500">Study this</h2>
            <ul className="mt-3 space-y-2">
              {lesson.resources.map((r) => (
                <li key={r.url}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center justify-between gap-3 rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-3 text-sm text-neutral-200 transition-colors hover:border-purple-700/60"
                  >
                    <span className="min-w-0 truncate">{r.label}</span>
                    <ExternalLink size={14} className="shrink-0 text-neutral-500" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      <section className="mt-8">
        <Link
          to="/ai-agent"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-purple-600/50 px-4 text-sm font-medium text-purple-300 transition-colors hover:bg-purple-600/20"
        >
          <Sparkles size={14} aria-hidden="true" /> Ask the mentor about this
        </Link>
      </section>

      <nav
        aria-label="Lesson navigation"
        className="mt-12 flex items-center justify-between gap-4 border-t border-neutral-800 pt-6"
      >
        {prev ? (
          <Link
            to={`${base}/${prev.slug}`}
            className="inline-flex min-h-11 items-center gap-2 text-sm text-neutral-400 hover:text-white"
          >
            <ArrowLeft size={14} aria-hidden="true" /> Previous
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`${base}/${next.slug}`} className={primaryLink}>
            Next <ArrowRight size={14} aria-hidden="true" />
          </Link>
        ) : (
          <Link to={base} className={primaryLink}>
            Ready for the test <ArrowRight size={14} aria-hidden="true" />
          </Link>
        )}
      </nav>
    </article>
  );
}
