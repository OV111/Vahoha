import { Link } from "react-router-dom";
import { Check, ExternalLink, FlaskConical, X } from "lucide-react";
import ExplainBack from "@/features/learn/components/ExplainBack";

const heading = "text-xl font-semibold leading-tight tracking-tight text-white";
const sectionClass = "mt-9 scroll-mt-16 border-t border-(--lesson-line) pt-9";

export function WhenToUse({ whenToUse }) {
  const columns = [
    { title: "Use it when", Icon: Check, tone: "text-emerald-300", items: whenToUse.use },
    { title: "Avoid it when", Icon: X, tone: "text-amber-300", items: whenToUse.avoid },
  ];
  return (
    <section id="when" className={sectionClass}>
      <h2 className={heading}>When to use it</h2>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        {columns.map(({ title, Icon, tone, items }) => (
          <div key={title}>
            <h3 className="text-base font-semibold text-white">{title}</h3>
            <ul className="mt-3 space-y-3">
              {items.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-neutral-200">
                  <Icon size={17} className={`mt-1.5 shrink-0 ${tone}`} aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ExplainSection({ topic, session }) {
  const step = {
    prompt: topic.explain.prompt,
    modelAnswer: topic.explain.modelAnswer,
    mustMention: topic.ideas.map((i) => i.text),
  };
  return (
    <section id="explain" className={sectionClass}>
      <h2 className={`${heading} mb-5`}>Explain it</h2>
      <ExplainBack step={step} value={session.explain} onChange={session.setExplain} />
    </section>
  );
}

export function SummarySection({ topic, done, next, layerHref, labHref }) {
  return (
    <section id="summary" className={sectionClass}>
      <h2 className={heading}>Summary</h2>
      <ul className="mt-6 list-disc space-y-3 pl-6 text-base leading-relaxed text-neutral-200">
        {topic.summary.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <h3 className="mt-10 text-base font-semibold text-white">Sources</h3>
      <ul className="mt-2">
        {topic.sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-sm text-purple-300 hover:text-purple-200"
            >
              {s.label} <ExternalLink size={14} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-2xl bg-(--lesson-raised) p-5 sm:p-6">
        <p className="text-sm text-neutral-300">
          {done ? "You finished this topic." : "Answer every question and explain it to finish this topic."}
        </p>
        <p className="mt-2 text-lg font-semibold leading-snug text-balance text-white">
          {next ? next.title : "You finished the topics written so far"}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Link
            to={next?.href ?? layerHref}
            className="inline-flex min-h-12 items-center rounded-xl bg-purple-600 px-7 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
          >
            {next ? "Next topic" : "Back to the layer"}
          </Link>
          {labHref && (
            <Link
              to={labHref}
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-neutral-700 px-5 text-sm text-neutral-200 transition-colors hover:border-purple-500"
            >
              <FlaskConical size={15} aria-hidden="true" /> Practice in the lab
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
