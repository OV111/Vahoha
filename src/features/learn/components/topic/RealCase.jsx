import { useState } from "react";
import { Bug } from "lucide-react";
import MarkdownMessage from "@/features/mentor/components/MarkdownMessage";

const body = "mt-1 text-sm leading-relaxed text-neutral-200";

function Part({ title, children }) {
  return (
    <div className="mt-5">
      <h4 className="text-[13px] font-semibold text-white">{title}</h4>
      <MarkdownMessage content={children} className={body} />
    </div>
  );
}

/** A bug as it happens in real work. The cause stays closed until the reader has thought about it. */
export default function RealCase({ block }) {
  const [open, setOpen] = useState(false);
  return (
    <aside aria-label={`Case: ${block.title}`} className="my-7 rounded-2xl border border-[#4d3a1f] bg-[#1f1710] p-5 sm:p-6">
      <p className="flex items-center gap-2 text-[13px] font-medium text-amber-200">
        <Bug size={17} aria-hidden="true" /> Case
      </p>
      <h3 className="mt-2 text-base font-semibold leading-snug text-balance text-white">{block.title}</h3>
      <Part title="The situation">{block.situation}</Part>
      <Part title="What went wrong">{block.problem}</Part>
      {open ? (
        <>
          <Part title="Why it happened">{block.cause}</Part>
          <Part title="How it was fixed">{block.fix}</Part>
          {block.code && (
            <pre className="mt-4 overflow-x-auto rounded-lg bg-(--lesson-code) p-4 font-mono text-[13px] leading-relaxed text-neutral-100">
              {block.code}
            </pre>
          )}
        </>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-6 min-h-11 cursor-pointer rounded-lg bg-amber-300/15 px-5 text-[13px] font-medium text-amber-100 transition-colors hover:bg-amber-300/25"
        >
          I have a guess, show the cause
        </button>
      )}
    </aside>
  );
}
