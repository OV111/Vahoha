import { JOB_LEVEL_LABELS, JOB_TYPE_LABELS, WORKPLACE_LABELS } from "../../../../constants/hiring";

const DAY = 24 * 60 * 60 * 1000;

export const shortDate = (iso) =>
  iso ? new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "";

/** "Expires in 3 days" / "Expires today" for a pending request. */
export const expiresText = (iso) => {
  const days = Math.ceil((new Date(iso).getTime() - Date.now()) / DAY);
  if (days <= 0) return "Expires today";
  return `Expires in ${days} day${days === 1 ? "" : "s"}`;
};

/** "Mid-level · Full-time · Remote" */
export const jobLine = (job) =>
  [JOB_LEVEL_LABELS[job.level], JOB_TYPE_LABELS[job.type], WORKPLACE_LABELS[job.workplace]].filter(Boolean).join(" · ");

/** "4 of 5 layers"; a job with no required layers has nothing to match. */
export const matchText = (met, total) => (total > 0 ? `${met} of ${total} layers` : "No required layers");
