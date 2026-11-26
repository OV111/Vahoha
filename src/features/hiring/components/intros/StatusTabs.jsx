import { INTRO_FILTERS } from "@/constants/hiring";

// Status filter pills, shared by the recruiter's list and the developer inbox.
const StatusTabs = ({ value, onChange }) => (
  <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by status">
    {INTRO_FILTERS.map((f) => (
      <button key={f.id || "all"} type="button" role="tab" aria-selected={value === f.id} onClick={() => onChange(f.id)}
        className={`rounded-full border px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
          value === f.id ? "border-purple-500 bg-purple-500/15 text-purple-200" : "border-white/10 text-neutral-300 hover:border-white/25"
        }`}>
        {f.label}
      </button>
    ))}
  </div>
);

export default StatusTabs;
