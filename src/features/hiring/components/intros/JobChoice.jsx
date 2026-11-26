import { motion as Motion, MotionConfig } from "motion/react";
import { Check } from "lucide-react";
import { jobLine, matchText } from "@/features/hiring/lib/intros";

const EASE = [0.22, 1, 0.36, 1];

// The company's open jobs as a radio group, each with how well this candidate
// matches the job's required layers.
const JobChoice = ({ jobs, value, onChange }) => (
  <MotionConfig reducedMotion="user">
    <div role="radiogroup" aria-label="Job" className="grid gap-2">
      {jobs.map((job, i) => {
        const selected = value === job.id;
        const full = job.match.total > 0 && job.match.met === job.match.total;
        return (
          <Motion.label
            key={job.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: EASE, delay: i * 0.05 }}
            className={`relative flex cursor-pointer items-start justify-between gap-3 rounded-xl border p-3.5 transition-colors has-focus-visible:ring-2 has-focus-visible:ring-purple-500/40 ${
              selected ? "border-purple-500 bg-purple-500/10" : "border-white/10 bg-white/[0.03] hover:border-white/20"
            }`}
          >
            <input type="radio" name="intro-job" value={job.id} checked={selected} onChange={() => onChange(job.id)} className="sr-only" />
            <span className="min-w-0">
              <span className="block font-medium text-white">{job.title}</span>
              <span className="mt-0.5 block text-[13px] text-neutral-400">{jobLine(job)}</span>
              <span className={`mt-1 block text-[13px] ${full ? "text-emerald-300" : "text-neutral-500"}`}>
                Matches {matchText(job.match.met, job.match.total)}
              </span>
            </span>
            <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
              selected ? "border-purple-500 bg-purple-500 text-white" : "border-white/20"
            }`}>
              {selected && <Check size={12} strokeWidth={3} aria-hidden="true" />}
            </span>
          </Motion.label>
        );
      })}
    </div>
  </MotionConfig>
);

export default JobChoice;
