import { Banknote, Check, MapPin, X } from "lucide-react";
import { salaryText } from "@/features/hiring/lib/salary";
import { jobLine } from "@/features/hiring/lib/intros";
import { INBOX_COPY as COPY } from "../../../../../constants/hiring";

const RequiredLayers = ({ layers, match }) => {
  const metIds = new Set(match.met.map((l) => l.layerId));
  return (
    <div className="mt-3">
      <p className="text-[13px] text-neutral-400">
        Required layers <span className="text-neutral-600">·</span>{" "}
        <span className={match.met.length === match.total ? "text-emerald-300" : "text-neutral-300"}>
          {COPY.matchLine(match.met.length, match.total)}
        </span>
      </p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {layers.map((l) => {
          const met = metIds.has(l.layerId);
          return (
            <li key={l.layerId}
              className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[12px] ${met ? "bg-emerald-500/10 text-emerald-300" : "bg-white/5 text-neutral-400"}`}>
              {met ? <Check size={12} aria-hidden="true" /> : <X size={12} aria-hidden="true" />}
              {l.title}
              <span className="sr-only">{met ? "(you passed this)" : "(not passed yet)"}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// What the job is: title, terms, pay, stack and the layers it expects.
const IntroJobDetails = ({ job, match }) => {
  const salary = salaryText(job.salary);
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
      <p className="font-semibold text-white">{job.title}</p>
      <p className="mt-0.5 text-sm text-neutral-400">{jobLine(job)}</p>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px]">
        {job.location && (
          <span className="inline-flex items-center gap-1 text-neutral-400"><MapPin size={12} aria-hidden="true" />{job.location}</span>
        )}
        <span className={`inline-flex items-center gap-1 ${salary ? "text-emerald-300/90" : "text-neutral-500"}`}>
          <Banknote size={12} aria-hidden="true" />{salary ?? COPY.salaryHidden}
        </span>
      </div>
      {job.stack?.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {job.stack.map((s) => <li key={s} className="rounded-md bg-white/5 px-2 py-0.5 text-[12px] text-neutral-300">{s}</li>)}
        </ul>
      )}
      {job.requiredLayers?.length > 0 && <RequiredLayers layers={job.requiredLayers} match={match} />}
      {job.description && (
        <details className="mt-3 text-sm text-neutral-400">
          <summary className="cursor-pointer text-[13px] text-purple-400 hover:text-purple-300">Job description</summary>
          <p className="mt-2 whitespace-pre-line">{job.description}</p>
        </details>
      )}
    </div>
  );
};

export default IntroJobDetails;
