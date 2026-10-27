import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Workflow } from "lucide-react";
import { SURFACE, SectionLabel } from "./ui";
import { fadeUp } from "../lib/motion";

/**
 * Link to the capstone's Project Map. Shown once the learner has an attempt:
 * the server only opens the map for a started capstone, so offering it earlier
 * would lead to a refusal.
 */
export default function ProjectMapCard({ trackId }) {
  return (
    <Motion.aside {...fadeUp(0.1)} className={`${SURFACE} flex flex-col gap-4 p-6`}>
      <SectionLabel>Project map</SectionLabel>
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-purple-600">
          <Workflow size={18} aria-hidden="true" />
        </span>
        <p className="text-sm leading-relaxed text-neutral-300">
          Draw how your project works, then explain it.
        </p>
      </div>
      <Link
        to={`/project-map/for/capstone/${trackId}`}
        className="inline-flex min-h-11 w-fit items-center text-sm font-medium text-purple-400 transition hover:text-purple-300 hover:underline focus-visible:rounded focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
      >
        Open your project map →
      </Link>
    </Motion.aside>
  );
}
