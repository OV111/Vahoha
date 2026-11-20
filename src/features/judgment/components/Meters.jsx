import { Smile, Server, Wallet } from "lucide-react";

const tone = (pct) => (pct >= 60 ? "bg-emerald-400" : pct >= 35 ? "bg-amber-400" : "bg-rose-500");

const Bar = ({ Icon, label, value, pct, display }) => (
  <div className="min-w-0 flex-1">
    <div className="mb-1.5 flex items-center justify-between gap-2 text-xs">
      <span className="flex items-center gap-1.5 text-neutral-400">
        <Icon size={13} aria-hidden="true" /> {label}
      </span>
      <span className="font-semibold text-neutral-100">{display ?? `${value}%`}</span>
    </div>
    <div className="h-1.5 overflow-hidden rounded-full bg-neutral-800" role="meter" aria-label={label} aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <div className={`h-full rounded-full transition-all duration-500 ${tone(pct)}`} style={{ width: `${pct}%` }} />
    </div>
  </div>
);

/** The state of the company: what every decision moves. */
const Meters = ({ meters, start }) => {
  const budgetPct = Math.round((100 * meters.budget) / Math.max(start.budget, 1));
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-950 p-4 sm:flex-row sm:gap-6">
      <Bar Icon={Smile} label="Users happy" value={meters.users} pct={meters.users} />
      <Bar Icon={Server} label="Stability" value={meters.stability} pct={meters.stability} />
      <Bar Icon={Wallet} label="Budget left" pct={Math.min(budgetPct, 100)} display={`$${meters.budget.toLocaleString()}`} />
    </div>
  );
};

export default Meters;
