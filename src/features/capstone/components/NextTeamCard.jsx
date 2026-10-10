import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { Users } from "lucide-react";
import { SURFACE, SectionLabel } from "./ui";
import { fadeUp } from "../lib/motion";

/**
 * Shown once the capstone is passed: the next step in the proof pipeline.
 * Without it the page ends at the certificate and a learner never learns that
 * Build Teams exist (passing a capstone is the entry requirement).
 */
export default function NextTeamCard() {
  return (
    <Motion.aside {...fadeUp(0.12)} className={`${SURFACE} flex flex-col gap-4 p-6`}>
      <SectionLabel>What&apos;s next</SectionLabel>
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-purple-600">
          <Users size={18} aria-hidden="true" />
        </span>
        <p className="text-sm leading-relaxed text-neutral-300">
          You can now join a <span className="font-semibold text-white">Build Team</span>: build
          one real project with other developers, merge pull requests, defend your own changes,
          and get a public evidence page.
        </p>
      </div>
      <Link
        to="/team"
        className="w-fit text-sm font-medium text-purple-400 transition hover:text-purple-300 hover:underline focus-visible:rounded focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
      >
        See Build Teams →
      </Link>
    </Motion.aside>
  );
}
