import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { EXAM_RULES } from "../../../../../constants/exam";

const actionLink =
  "inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-medium text-purple-300 transition-colors hover:text-purple-200";

function Goal({ title, body, to, action, badge }) {
  return (
    <section aria-label={title} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-5">
      <div className="min-w-0 flex-1 basis-72">
        <h3 className="flex items-center gap-3 text-lg font-semibold text-neutral-50">
          {title}
          {badge && (
            <span className="rounded-full border border-emerald-800/50 bg-emerald-900/30 px-2 py-0.5 text-xs font-normal text-emerald-300">
              {badge}
            </span>
          )}
        </h3>
        <p className="mt-1 text-[15px] leading-relaxed text-neutral-400">{body}</p>
      </div>
      <Link to={to} className={actionLink}>
        {action} <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </section>
  );
}

/** What comes after the lessons: the project, the layer test and the optional voice exam. */
export default function LayerGoals({ challenge, challengesHref, testHref, voiceHref, verified }) {
  return (
    <div className="divide-y divide-neutral-800 border-b border-neutral-800">
      <Goal title="Build" body={challenge} to={challengesHref} action="Practice challenges" />
      <Goal
        title="Test"
        body={`${EXAM_RULES.questionsPerExam} questions, ${EXAM_RULES.secondsPerQuestion} seconds each. ${EXAM_RULES.passThreshold}% to pass and unlock the next layer. Already know this? Take it now.`}
        to={testHref}
        action="Take the test"
      />
      {voiceHref && (
        <Goal
          title="Voice exam"
          body="Optional, after the test. Explain part of this layer out loud to get it verified."
          to={voiceHref}
          action="Start voice exam"
          badge={verified ? "Verified" : null}
        />
      )}
    </div>
  );
}
