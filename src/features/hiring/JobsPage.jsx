import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Banknote, Layers, MapPin, Plus } from "lucide-react";
import { fetchJobs, setJobStatus } from "./api/hiringApi";
import { salaryText } from "./lib/salary";
import {
  JOBS_COPY,
  JOB_LEVEL_LABELS,
  JOB_STATUS_LABELS,
  JOB_TYPE_LABELS,
  WORKPLACE_LABELS,
} from "@/constants/hiring";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";

const STATUS_TONE = {
  open: "bg-emerald-500/15 text-emerald-300",
  draft: "bg-neutral-500/15 text-neutral-300",
  closed: "bg-rose-500/10 text-rose-300",
};

const JobRow = ({ job, onStatus }) => {
  const [busy, setBusy] = useState(false);
  const change = async (status) => {
    setBusy(true);
    try {
      await onStatus(job.id, status);
    } finally {
      setBusy(false);
    }
  };

  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Link to={`/hiring/jobs/${job.id}`} className="text-[15px] font-semibold text-white hover:text-purple-300">{job.title}</Link>
          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_TONE[job.status]}`}>{JOB_STATUS_LABELS[job.status]}</span>
        </div>
        <p className="mt-1 text-sm text-neutral-400">
          {JOB_LEVEL_LABELS[job.level]} · {JOB_TYPE_LABELS[job.type]} · {WORKPLACE_LABELS[job.workplace]}
        </p>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-neutral-500">
          {job.location && <span className="inline-flex items-center gap-1"><MapPin size={12} aria-hidden="true" />{job.location}</span>}
          {job.salary && <span className="inline-flex items-center gap-1 text-emerald-300/80"><Banknote size={12} aria-hidden="true" />{salaryText(job.salary)}</span>}
          {job.requiredLayers.length > 0 && (
            <span className="inline-flex items-center gap-1"><Layers size={12} aria-hidden="true" />{job.requiredLayers.length} required layers</span>
          )}
        </div>
        {job.stack.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {job.stack.map((s) => <li key={s} className="rounded-md bg-white/5 px-2 py-0.5 text-[12px] text-neutral-300">{s}</li>)}
          </ul>
        )}
      </div>
      <div className="flex shrink-0 gap-2">
        <Link to={`/hiring/jobs/${job.id}`} className="rounded-md px-3 py-1.5 text-sm text-neutral-300 hover:bg-white/5">Edit</Link>
        {job.status !== "open" ? (
          <button type="button" disabled={busy} onClick={() => change("open")}
            className="rounded-md bg-purple-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50">Open</button>
        ) : (
          <button type="button" disabled={busy} onClick={() => change("closed")}
            className="rounded-md border border-white/15 px-3 py-1.5 text-sm text-white hover:bg-white/5 disabled:opacity-50">Close</button>
        )}
      </div>
    </li>
  );
};

// /hiring/jobs: the company's jobs, open ones first.
const JobsPage = () => {
  const [jobs, setJobs] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchJobs()
      .then((rows) => !cancelled && setJobs(rows))
      .catch((err) => {
        if (cancelled) return;
        toast.error(err.message);
        setJobs([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const onStatus = async (id, status) => {
    try {
      const updated = await setJobStatus(id, status);
      setJobs((rows) => rows.map((j) => (j.id === id ? updated : j)));
      toast.success(status === "open" ? "Job is open" : "Job closed");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const order = { open: 0, draft: 1, closed: 2 };
  const sorted = jobs ? [...jobs].sort((a, b) => order[a.status] - order[b.status]) : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">{JOBS_COPY.title}</h1>
          <p className="mt-1 max-w-xl text-sm text-neutral-400">{JOBS_COPY.intro}</p>
        </div>
        <Link to="/hiring/jobs/new" className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-700">
          <Plus size={15} aria-hidden="true" /> New job
        </Link>
      </div>

      {!sorted ? (
        <div className="flex min-h-[50vh]"><LoadingSuspense fill /></div>
      ) : sorted.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-neutral-400">{JOBS_COPY.empty}</p>
      ) : (
        <ul className="mt-8 flex flex-col gap-3">
          {sorted.map((job) => <JobRow key={job.id} job={job} onStatus={onStatus} />)}
        </ul>
      )}
    </div>
  );
};

export default JobsPage;
