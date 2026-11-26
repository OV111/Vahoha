import { useState } from "react";
import { Check, X } from "lucide-react";
import MarkdownMessage from "@/features/mentor/components/MarkdownMessage";
import LessonDiagram from "./LessonDiagram";
import QuestionCard from "./QuestionCard";
import RealCase from "./RealCase";
import RunnableCode from "./RunnableCode";
import LivePreview from "./LivePreview";

const prose = "text-base leading-[1.7] text-neutral-200 [&_p+p]:mt-5! [&_li+li]:mt-2.5!";
const codeBox = "overflow-x-auto bg-(--lesson-code) p-4 font-mono text-[13px] leading-relaxed text-neutral-100";

function Compare({ block }) {
  const sides = [
    { title: "Avoid", Icon: X, tone: "text-amber-300", source: block.wrong },
    { title: "Better", Icon: Check, tone: "text-emerald-300", source: block.right },
  ];
  return (
    <div className="my-7">
      <div className="grid gap-4 lg:grid-cols-2">
        {sides.map(({ title, Icon, tone, source }) => (
          <div key={title} className="min-w-0 overflow-hidden rounded-xl border border-(--lesson-line)">
            <p className={`flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium ${tone}`}>
              <Icon size={16} aria-hidden="true" /> {title}
            </p>
            <pre className={codeBox}>{source}</pre>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-neutral-300">{block.why}</p>
    </div>
  );
}

function Simpler({ text }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="min-h-11 cursor-pointer text-sm text-purple-300 underline decoration-purple-300/40 underline-offset-4 hover:text-purple-200"
      >
        {open ? "Hide the simpler version" : "I don't get it, explain it simpler"}
      </button>
      {open && <p className="mt-3 rounded-xl bg-purple-500/10 p-5 text-base leading-[1.7] text-neutral-100">{text}</p>}
    </div>
  );
}

function Block({ block, session, misconceptions }) {
  switch (block.type) {
    case "text":
      return <MarkdownMessage content={block.body} className={`mt-5 ${prose}`} />;
    case "picture":
      return (
        <div className="my-7">
          <LessonDiagram name={block.diagram} />
        </div>
      );
    case "code":
      if (block.runnable && block.lang !== "js") return <LivePreview lang={block.lang} source={block.source} caption={block.caption} />;
      return block.runnable ? (
        <RunnableCode source={block.source} caption={block.caption} />
      ) : (
        <pre className={`my-7 rounded-xl ${codeBox}`}>{block.source}</pre>
      );
    case "realCase":
      return <RealCase block={block} />;
    case "compare":
      return <Compare block={block} />;
    case "question":
      return (
        <QuestionCard
          question={block}
          answer={session.answers[block.id]}
          misconceptions={misconceptions}
          onAnswer={(optionId, confidence) => session.answer(block.id, optionId, confidence)}
        />
      );
    default:
      return null;
  }
}

export default function TopicSection({ section, session, misconceptions }) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-16 border-t border-(--lesson-line) pt-9 [&+&]:mt-9">
      <h2 id={`${section.id}-title`} className="text-xl font-semibold leading-tight tracking-tight text-balance text-white">
        {section.title}
      </h2>
      {section.blocks.map((block) => (
        <Block key={block.id} block={block} session={session} misconceptions={misconceptions} />
      ))}
      <Simpler text={section.simpler} />
    </section>
  );
}
