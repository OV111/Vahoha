import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Dropdown from "@/components/primitives/Dropdown";
import LayerPicker from "./components/LayerPicker";
import ChipInput from "./components/ChipInput";
import { createJob, fetchJob, updateJob } from "./api/hiringApi";
import {
  JOB_LEVELS,
  JOB_LIMITS,
  JOB_TYPES,
  SALARY_CURRENCIES,
  SALARY_PERIODS,
  WORKPLACES,
} from "@shared/hiringRules";
import {
  JOBS_COPY,
  JOB_LEVEL_LABELS,
  JOB_TYPE_LABELS,
  SALARY_PERIOD_LABELS,
  WORKPLACE_LABELS,
} from "@/constants/hiring";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";

const INPUT =
  "w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30";
const LABEL = "mb-1.5 block text-sm font-medium text-neutral-300";
const PANEL = "rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6";

const options = (values, labels) => values.map((v) => ({ value: v, label: labels?.[v] ?? v }));

const EMPTY = {
  title: "",
  level: "junior",
  type: "full-time",
  workplace: "remote",
  location: "",
  salaryOn: false,
  salary: { min: "", max: "", currency: "USD", period: "month" },
  stack: [],
  requiredLayers: [],
  description: "",
};

const fromJob = (job) => ({
  ...EMPTY,
  ...job,
  salaryOn: Boolean(job.salary),
  salary: job.salary ?? EMPTY.salary,
});

const toBody = (form, status) => ({
  title: form.title,
  level: form.level,
  type: form.type,
  workplace: form.workplace,
  location: form.location,
  salary: form.salaryOn
    ? { ...form.salary, min: Number(form.salary.min) || 0, max: Number(form.salary.max) || 0 }
    : null,
  stack: form.stack,
  requiredLayers: form.requiredLayers.map((l) => l.layerId),
  description: form.description,
  status,
});

// /hiring/jobs/new and /hiring/jobs/:id: create or edit a company job.
const JobFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(id ? null : EMPTY);
  const [status, setStatus] = useState("draft");
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(null);

  useEffect(() => {
    if (!id) return undefined;
    let cancelled = false;
    fetchJob(id)
      .then((job) => {
        if (cancelled) return;
        setForm(fromJob(job));
        setStatus(job.status);
      })
      .catch((err) => {
        toast.error(err.message);
        navigate("/hiring/jobs", { replace: true });
      });
    return () => {
      cancelled = true;
    };
  }, [id, navigate]);

  if (!form)
    return <LoadingSuspense />;

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));
  const setSalary = (key) => (value) => setForm((f) => ({ ...f, salary: { ...f.salary, [key]: value } }));

  const validate = () => {
    const e = {};
    if (form.title.trim().length < 2) e.title = "Give the job a title.";
    if (form.salaryOn) {
      const min = Number(form.salary.min);
      const max = Number(form.salary.max);
      if (!min || !max) e.salary = "Enter both a minimum and a maximum, or switch salary off.";
      else if (min > max) e.salary = "The minimum is above the maximum.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const save = async (nextStatus) => {
    if (!validate()) return;
    setBusy(nextStatus);
    try {
      const body = toBody(form, nextStatus);
      if (id) await updateJob(id, body);
      else await createJob(body);
      toast.success(nextStatus === "open" ? "Job is open" : "Job saved");
      navigate("/hiring/jobs");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link to="/hiring/jobs" className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white">
        <ArrowLeft size={14} aria-hidden="true" /> Jobs
      </Link>
      <h1 className="mt-3 text-2xl font-semibold text-white">{id ? "Edit job" : "New job"}</h1>

      <form onSubmit={(e) => { e.preventDefault(); save(status === "open" ? "open" : "draft"); }} className="mt-6 flex flex-col gap-5" noValidate>
        <section className={`${PANEL} grid gap-4 sm:grid-cols-2`}>
          <div className="sm:col-span-2">
            <label htmlFor="job-title" className={LABEL}>Job title</label>
            <input id="job-title" value={form.title} onChange={(e) => set("title")(e.target.value)} maxLength={JOB_LIMITS.titleMax}
              placeholder="Backend Developer" className={INPUT} />
            {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title}</p>}
          </div>
          <div>
            <span className={LABEL}>Level</span>
            <Dropdown label="Level" value={form.level} onChange={set("level")} options={options(JOB_LEVELS, JOB_LEVEL_LABELS)} />
          </div>
          <div>
            <span className={LABEL}>Type</span>
            <Dropdown label="Type" value={form.type} onChange={set("type")} options={options(JOB_TYPES, JOB_TYPE_LABELS)} />
          </div>
          <div>
            <span className={LABEL}>Workplace</span>
            <Dropdown label="Workplace" value={form.workplace} onChange={set("workplace")} options={options(WORKPLACES, WORKPLACE_LABELS)} />
          </div>
          <div>
            <label htmlFor="job-location" className={LABEL}>Location <span className="font-normal text-neutral-500">(optional)</span></label>
            <input id="job-location" value={form.location} onChange={(e) => set("location")(e.target.value)} maxLength={JOB_LIMITS.locationMax}
              placeholder={form.workplace === "remote" ? "e.g. Europe time zones" : "e.g. Yerevan"} className={INPUT} />
          </div>
        </section>

        <section className={PANEL}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-neutral-200">Salary</p>
              <p className="mt-0.5 text-xs text-neutral-500">{JOBS_COPY.salaryHint}</p>
            </div>
            <button type="button" role="switch" aria-checked={form.salaryOn} aria-label="Show salary"
              onClick={() => set("salaryOn")(!form.salaryOn)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${form.salaryOn ? "bg-purple-600" : "bg-white/15"}`}>
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${form.salaryOn ? "translate-x-5.5" : "translate-x-0.5"}`} />
            </button>
          </div>
          {form.salaryOn && (
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              <input type="number" min="0" inputMode="numeric" aria-label="Minimum salary" placeholder="Min" value={form.salary.min}
                onChange={(e) => setSalary("min")(e.target.value)} className={INPUT} />
              <input type="number" min="0" inputMode="numeric" aria-label="Maximum salary" placeholder="Max" value={form.salary.max}
                onChange={(e) => setSalary("max")(e.target.value)} className={INPUT} />
              <Dropdown label="Currency" value={form.salary.currency} onChange={setSalary("currency")} options={options(SALARY_CURRENCIES)} />
              <Dropdown label="Period" value={form.salary.period} onChange={setSalary("period")} options={options(SALARY_PERIODS, SALARY_PERIOD_LABELS)} />
              {errors.salary && <p className="text-xs text-red-400 sm:col-span-4">{errors.salary}</p>}
            </div>
          )}
        </section>

        <section className={`${PANEL} flex flex-col gap-4`}>
          <div>
            <label htmlFor="job-stack" className={LABEL}>Stack</label>
            <ChipInput id="job-stack" value={form.stack} onChange={set("stack")} max={JOB_LIMITS.stackMax}
              itemMax={JOB_LIMITS.stackItemMax} placeholder="Node.js, MongoDB… press Enter after each" />
          </div>
          <div>
            <span className={LABEL}>Required Vahoha layers <span className="font-normal text-neutral-500">(optional)</span></span>
            <p className="mb-2 text-xs text-neutral-500">{JOBS_COPY.requiredLayersHint}</p>
            <LayerPicker value={form.requiredLayers} onChange={set("requiredLayers")} max={JOB_LIMITS.requiredLayersMax} />
          </div>
          <div>
            <label htmlFor="job-description" className={LABEL}>Description</label>
            <textarea id="job-description" rows={8} value={form.description} onChange={(e) => set("description")(e.target.value)}
              maxLength={JOB_LIMITS.descriptionMax} placeholder="What the person will build, the team, how you work…" className={`${INPUT} resize-y`} />
            <p className="mt-1 text-right text-xs text-neutral-600 tabular-nums">{form.description.length}/{JOB_LIMITS.descriptionMax}</p>
          </div>
        </section>

        <div className="flex flex-wrap justify-end gap-3">
          <button type="button" disabled={Boolean(busy)} onClick={() => save("draft")}
            className="rounded-md border border-white/15 px-4 py-2 text-sm font-semibold text-white hover:bg-white/5 disabled:opacity-50">
            {busy === "draft" ? "Saving…" : "Save as draft"}
          </button>
          <button type="button" disabled={Boolean(busy)} onClick={() => save("open")}
            className="rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-50">
            {busy === "open" ? "Saving…" : status === "open" ? "Save" : "Save and open"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobFormPage;
