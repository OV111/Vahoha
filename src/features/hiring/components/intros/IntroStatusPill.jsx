import { INTRO_STATUS_LABELS } from "../../../../../constants/hiring";

const TONE = {
  pending: "bg-amber-500/15 text-amber-300",
  accepted: "bg-emerald-500/15 text-emerald-300",
  declined: "bg-rose-500/10 text-rose-300",
  expired: "bg-neutral-500/15 text-neutral-300",
  withdrawn: "bg-neutral-500/15 text-neutral-400",
};

const IntroStatusPill = ({ status }) => (
  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TONE[status] ?? TONE.expired}`}>
    {INTRO_STATUS_LABELS[status] ?? status}
  </span>
);

export default IntroStatusPill;
