import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { TEXT, MUTED, BORDER, FOCUS } from "../lib/tone";

/**
 * Shown to a free user once billing is enforced. It says exactly what they would
 * get (their own N topics), because "upgrade for more" with no specifics is the
 * weakest possible pitch. The topic names are not here — the server never sent
 * them — so the teaser cannot leak the paid content.
 */
const LockedTopics = ({ count }) => (
  <section className={`flex flex-col items-center gap-3 rounded-xl border border-dashed px-6 py-10 text-center ${BORDER}`}>
    <Lock size={20} className="text-purple-400" aria-hidden="true" />
    <h2 className={`text-base font-semibold ${TEXT}`}>
      Your topic-by-topic map ({count} topic{count === 1 ? "" : "s"})
    </h2>
    <p className={`max-w-md text-[13px] ${MUTED}`}>
      See every topic you&apos;ve touched, your exam and explanation scores, and the
      specific wrong beliefs worth fixing. Part of Pro.
    </p>
    <Link
      to="/pricing"
      className={`rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-500 ${FOCUS}`}
    >
      See Pro
    </Link>
  </section>
);

export default LockedTopics;
