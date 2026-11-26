import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, FlaskConical, Sparkles } from "lucide-react";
import { mentorOrigin } from "@/features/mentor/lib/mentorOrigin";

const primaryLink =
  "inline-flex min-h-11 items-center gap-2 rounded-xl bg-purple-600 px-5 text-sm font-medium text-white transition-colors hover:bg-purple-500";

/** A topic that isn't written yet: what the roadmap says about it, and links to study. */
export default function TopicSummary({ track, layer, lesson, prev, next, total, labHref }) {
  const base = `/learn/${track.id}/${layer.id}`;

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

      <section className="mt-8 flex flex-wrap gap-3">
        {labHref && (
          <Link
            to={labHref}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-purple-600 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-500"
          >
            <FlaskConical size={14} aria-hidden="true" /> Practice it in the lab
          </Link>
        )}
        <Link
          to="/mentor"
          state={mentorOrigin("lesson", { topic: lesson.title, path: track.id, layer: layer.id })}
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
