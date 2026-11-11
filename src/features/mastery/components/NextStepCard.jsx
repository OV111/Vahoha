import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ACTION_LABEL, hrefForTarget } from "../lib/statusMeta";
import { PROGRESS_COPY as COPY } from "../../../../constants/progress";
import { TEXT, MUTED, FOCUS } from "../lib/tone";

/**
 * The single most useful thing to do next, as decided by the server's adaptive
 * engine. Deliberately one step, not a list: a list makes the learner choose,
 * and choosing is exactly the thing they came here not to have to do. The only
 * tinted card on the page, so the eye lands here after the path.
 */
const NextStepCard = ({ nextAction }) => {
  if (!nextAction) return null;

  return (
    <section
      aria-labelledby="next-heading"
      className="rounded-xl border border-purple-200 bg-purple-50 p-5 sm:p-6 dark:border-purple-500/40 dark:bg-purple-950/30"
    >
      <p className="text-sm font-medium text-purple-700 dark:text-purple-300">{COPY.nextStep}</p>
      <h2 id="next-heading" className={`mt-1 text-xl font-semibold ${TEXT}`}>
        {nextAction.title ?? ACTION_LABEL[nextAction.action] ?? "Keep going"}
      </h2>
      <p className={`mt-1 text-sm ${MUTED}`}>{nextAction.reason}</p>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          to={hrefForTarget(nextAction.target)}
          className={`inline-flex items-center gap-2 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-500 ${FOCUS}`}
        >
          {ACTION_LABEL[nextAction.action] ?? "Continue"} <ArrowRight size={14} aria-hidden="true" />
        </Link>
        {nextAction.target?.kind !== "mentor" && nextAction.title && (
          <Link
            to="/mentor"
            className={`rounded-md border border-purple-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-purple-100 dark:border-white/15 dark:bg-transparent dark:hover:bg-white/5 ${TEXT} ${FOCUS}`}
          >
            {COPY.askMentor}
          </Link>
        )}
      </div>
    </section>
  );
};

export default NextStepCard;
