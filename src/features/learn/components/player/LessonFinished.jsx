import { Link } from "react-router-dom";
import { ArrowRight, Check, FlaskConical } from "lucide-react";
import GoDeeper from "../GoDeeper";

// A reload or a deep link can reach this screen with questions unanswered: say so honestly.
function scoreLine({ right, answered, total }) {
  if (answered === 0) return "Answer the questions in this lesson to see how much stuck.";
  const skipped = total - answered;
  return [
    `${right} of ${answered} questions right.`,
    right < answered && "Go back to the ones you missed before the layer test.",
    skipped > 0 && `You skipped ${skipped}.`,
  ]
    .filter(Boolean)
    .join(" ");
}

function SkillMap({ lessons, doneSlugs, current }) {
  return (
    <ul aria-label="Lessons in this layer" className="mt-8 grid gap-2.5 sm:grid-cols-2">
      {lessons.map((l) => {
        const done = doneSlugs.has(l.slug);
        return (
          <li
            key={l.slug}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm ${
              done ? "border-emerald-500/60 text-emerald-300" : "border-neutral-800 text-neutral-400"
            } ${l.slug === current ? "learn-skill-lit" : ""}`}
          >
            {done && <Check size={13} aria-label="Done" />}
            {l.title}
          </li>
        );
      })}
    </ul>
  );
}

/** `completed` is false when this screen was opened by URL without doing the lesson. */
export default function LessonFinished({ lesson, content, score, completed, lessons, doneSlugs, next, layerHref, testHref, labHref }) {
  const remember = content.steps.find((s) => s.kind === "explain").mustMention;
  const allDone = lessons.every((l) => doneSlugs.has(l.slug));
  const fallback = allDone
    ? { href: testHref, title: "Every lesson in this layer is done", label: "Take the layer test" }
    : { href: layerHref, title: "You finished the lessons written so far", label: "Back to the layer" };
  const target = next ?? fallback;

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="text-[32px] font-semibold leading-tight text-balance text-neutral-50">
        {completed ? "Lesson done" : lesson.title}
      </h2>
      {completed && <p className="mt-3 text-[17px] leading-relaxed text-neutral-200">You can now {content.outcome}</p>}
      <p className="mt-2 text-[15px] text-neutral-400">{scoreLine(score)}</p>

      <SkillMap lessons={lessons} doneSlugs={doneSlugs} current={completed ? lesson.slug : null} />

      <section aria-label="What's next" className="mt-10 rounded-2xl border border-purple-800/60 bg-purple-950/20 p-6 sm:p-8">
        {next && <p className="text-sm text-neutral-400">Next</p>}
        <h3 className="mt-1 text-2xl font-semibold leading-snug text-balance text-neutral-50">{target.title}</h3>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            to={target.href}
            className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-purple-600 px-6 text-[15px] font-medium text-white transition-colors hover:bg-purple-500"
          >
            {next ? "Next lesson" : fallback.label} <ArrowRight size={15} aria-hidden="true" />
          </Link>
          {labHref && (
            <Link
              to={labHref}
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-neutral-700 px-5 text-[15px] text-neutral-200 transition-colors hover:border-purple-500"
            >
              <FlaskConical size={15} aria-hidden="true" /> Practice in the lab
            </Link>
          )}
          <Link to="/learn" className="inline-flex min-h-12 items-center px-3 text-[15px] text-neutral-400 hover:text-white">
            Done for today
          </Link>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="remember">
        <h3 id="remember" className="text-xl font-semibold text-neutral-50">
          Remember
        </h3>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[17px] leading-relaxed text-neutral-300">
          {remember.map((idea) => (
            <li key={idea}>{idea}</li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="go-deeper">
        <h3 id="go-deeper" className="text-xl font-semibold text-neutral-50">
          Go deeper
        </h3>
        <p className="mt-1 text-[15px] text-neutral-400">Optional theory. The parts most developers skip.</p>
        <div className="mt-5">
          <GoDeeper levels={content.deeper} docs={lesson.resources} />
        </div>
      </section>
    </div>
  );
}
