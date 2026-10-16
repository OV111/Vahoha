import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, Code2, ChevronRight } from "lucide-react";
import useLearnLayer from "./hooks/useLearnLayer";
import LearnState from "./components/LearnState";

// Groups consecutive lessons by section so the list reads as a short outline.
const groupBySection = (lessons) =>
  lessons.reduce((groups, lesson) => {
    const last = groups[groups.length - 1];
    if (last?.title === lesson.section) last.lessons.push(lesson);
    else groups.push({ title: lesson.section, lessons: [lesson] });
    return groups;
  }, []);

export default function LayerLearnPage() {
  const { trackId, layerId } = useParams();
  const { status, track, layer, lessons } = useLearnLayer(trackId, layerId);

  if (status !== "ready") return <LearnState status={status} />;

  const base = `/learn/${track.id}/${layer.id}`;
  const testHref = `/roadmaps/exam/${layer.id}?path=${track.domain.id}`;

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-10 sm:px-10">
      <Link to="/roadmaps" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-200">
        <ArrowLeft size={14} aria-hidden="true" /> Roadmaps
      </Link>

      <header className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-purple-400">
          {track.title} · Layer {layer.order}
        </p>
        <h1 className="mt-2 text-3xl font-bold text-neutral-100">{layer.title}</h1>
        <p className="mt-3 leading-relaxed text-neutral-400">{layer.description}</p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-neutral-500">
          <Clock size={12} aria-hidden="true" /> {layer.estimatedTime} · {lessons.length} lessons
        </p>
      </header>

      {lessons.length === 0 ? (
        <p className="mt-10 rounded-xl border border-neutral-800 p-5 text-sm text-neutral-400">
          Lessons for this layer are still being written. You can already take the test.
        </p>
      ) : (
        <div className="mt-10 space-y-8">
          {groupBySection(lessons).map((group) => (
            <section key={group.title}>
              <h2 className="mb-3 text-sm font-semibold text-neutral-300">{group.title}</h2>
              <ol className="space-y-2">
                {group.lessons.map((lesson) => (
                  <li key={lesson.slug}>
                    <Link
                      to={`${base}/${lesson.slug}`}
                      className="flex min-h-11 items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-3 transition-colors hover:border-purple-700/60 hover:bg-neutral-900"
                    >
                      <span className="w-6 shrink-0 text-xs tabular-nums text-neutral-600">
                        {String(lesson.order).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1 text-sm text-neutral-200">{lesson.title}</span>
                      <ChevronRight size={14} className="shrink-0 text-neutral-600" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      )}

      <section className="mt-10 rounded-2xl border border-purple-800/40 bg-purple-950/20 p-5">
        <h2 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-purple-400">
          <Code2 size={12} aria-hidden="true" /> Build this
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-neutral-300">{layer.challenge}</p>
      </section>

      <div className="mt-10 flex items-center justify-between gap-4 border-t border-neutral-800 pt-6">
        <p className="text-sm text-neutral-500">Finished the lessons? Prove it.</p>
        <Link
          to={testHref}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-purple-600 px-5 text-sm font-medium text-white transition-colors hover:bg-purple-500"
        >
          Take test <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
