import { ChevronRight, ExternalLink } from "lucide-react";
import MarkdownMessage from "@/features/ai-agent/components/MarkdownMessage";

const LEVEL_LABELS = { 2: "How it works", 3: "Under the hood", 4: "Why this design" };

const SourceLink = ({ label, url }) => (
  <li>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-h-11 items-center justify-between gap-3 text-sm text-neutral-400 hover:text-purple-300"
    >
      <span className="min-w-0 truncate">{label}</span>
      <ExternalLink size={13} className="shrink-0" aria-hidden="true" />
    </a>
  </li>
);

/**
 * The depth ladder. Levels are collapsed so the lesson stays short for anyone
 * who stops at "use it", and one click away for anyone who wants the internals.
 */
export default function GoDeeper({ levels, docs }) {
  return (
    <div className="space-y-3">
      {levels.map((d) => (
        <details key={d.title} className="group rounded-xl border border-neutral-800 bg-neutral-900/40">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden">
            <ChevronRight
              size={14}
              className="shrink-0 text-neutral-500 transition-transform group-open:rotate-90"
              aria-hidden="true"
            />
            <span className="min-w-0 flex-1">
              <span className="block text-xs text-purple-300">
                Level {d.level}: {LEVEL_LABELS[d.level]}
              </span>
              <span className="mt-0.5 block text-[15px] text-neutral-100">{d.title}</span>
            </span>
          </summary>
          <div className="border-t border-neutral-800 px-4 py-4">
            <MarkdownMessage content={d.body} className="text-[15px] leading-relaxed text-neutral-300" />
            {d.sources.length > 0 && (
              <ul className="mt-3 border-t border-neutral-800/60 pt-2">
                {d.sources.map((s) => (
                  <SourceLink key={s.url} {...s} />
                ))}
              </ul>
            )}
          </div>
        </details>
      ))}

      {docs.length > 0 && (
        <div className="px-1 pt-2">
          <p className="text-sm text-neutral-500">Official docs</p>
          <ul className="mt-1">
            {docs.map((r) => (
              <SourceLink key={r.url} label={r.label} url={r.url} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
