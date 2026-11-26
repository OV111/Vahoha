import { Link } from "react-router-dom";
import { Code2, Mic, ShieldCheck } from "lucide-react";
import { EXAM_RULES } from "@shared/exam";

/** The one thing to do once no topic is next: the contents list has the button until then. */
export function UpNext({ title, detail, to, label }) {
  return (
    <section aria-label="Up next" className="grid content-start gap-4 rounded-2xl bg-purple-500/15 p-5">
      <div className="grid gap-1.5">
        <p className="text-[13px] text-purple-200">Up next</p>
        <p className="text-base font-semibold leading-snug text-balance text-white">{title}</p>
        {detail && <p className="text-[13px] text-neutral-300">{detail}</p>}
      </div>
      <Link
        to={to}
        className="grid min-h-12 place-items-center rounded-xl bg-purple-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
      >
        {label}
      </Link>
    </section>
  );
}

function Goal({ Icon, title, body, to, action, badge }) {
  return (
    <li className="grid grid-cols-[20px_minmax(0,1fr)] gap-x-3 py-4 first:pt-0 last:pb-0">
      <Icon size={18} className="mt-0.5 text-neutral-400" aria-hidden="true" />
      <div className="grid gap-1">
        <h3 className="text-sm font-semibold text-white">
          {title}
          {badge && <span className="ml-2 text-xs font-normal text-emerald-300">{badge}</span>}
        </h3>
        <p className="text-[13px] leading-relaxed text-neutral-400">{body}</p>
        <Link to={to} className="grid min-h-11 w-fit items-center text-[13px] font-medium text-purple-500 hover:text-purple-400">
          {action}
        </Link>
      </div>
    </li>
  );
}

/** What comes after the topics: the project, the layer test and the optional voice exam. */
export function AfterTopics({ challenge, challengesHref, testHref, voiceHref, verified }) {
  return (
    <section aria-label="After the topics" className="grid gap-4 rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
      <h2 className="text-base font-semibold text-white">After the topics</h2>
      <ul className="grid divide-y divide-neutral-800">
        <Goal Icon={Code2} title="Build" body={challenge} to={challengesHref} action="Practice challenges" />
        <Goal
          Icon={ShieldCheck}
          title="Test"
          body={`${EXAM_RULES.questionsPerExam} questions, ${EXAM_RULES.passThreshold}% to pass and unlock the next layer.`}
          to={testHref}
          action="I already know this, test out"
        />
        {voiceHref && (
          <Goal
            Icon={Mic}
            title="Voice exam"
            body="Optional, after the test. Explain part of this layer out loud."
            to={voiceHref}
            action="Start voice exam"
            badge={verified ? "Verified" : null}
          />
        )}
      </ul>
    </section>
  );
}
