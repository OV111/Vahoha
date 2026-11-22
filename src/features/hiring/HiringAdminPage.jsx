import { useEffect, useState } from "react";
import { Check, ExternalLink, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { adminListCompanies, adminOverrideCompany } from "./api/hiringApi";

const FILTERS = [
  { id: "attention", label: "Needs a look" },
  { id: "limited", label: "Limited" },
  { id: "rejected", label: "Rejected" },
  { id: "verified", label: "Verified" },
  { id: "unverified", label: "No code yet" },
];

const LEVEL_TONE = {
  verified: "bg-emerald-500/15 text-emerald-300",
  limited: "bg-amber-500/15 text-amber-300",
  unverified: "bg-neutral-500/15 text-neutral-300",
  rejected: "bg-rose-500/15 text-rose-300",
};

// The checks a row shows, in the order the engine weighs them.
const CHECKS = [
  ["emailVerified", "Code"],
  ["workEmail", "Work email"],
  ["domainMatch", "Domain match"],
  ["websiteLive", "Site live"],
  ["domainNotNew", "Domain age"],
  ["nameOnWebsite", "Name on site"],
];

const CheckChip = ({ ok, label }) => (
  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] ${ok ? "bg-emerald-500/10 text-emerald-300" : "bg-rose-500/10 text-rose-300"}`}>
    {ok ? <Check size={11} aria-hidden="true" /> : <X size={11} aria-hidden="true" />} {label}
  </span>
);

const CompanyRow = ({ c, onDecide }) => {
  const [note, setNote] = useState(c.trust.override?.note ?? "");
  const [busy, setBusy] = useState(null);

  const decide = async (level) => {
    setBusy(level ?? "clear");
    try {
      await onDecide(c.id, { level, note });
    } finally {
      setBusy(null);
    }
  };

  return (
    <li className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium text-white">
            {c.name} <span className="text-sm font-normal text-neutral-500">· {c.type} · {c.teamSize}</span>
          </p>
          <p className="mt-0.5 flex flex-wrap gap-x-3 text-sm text-neutral-400">
            <span>{c.ownerEmail}</span>
            <a href={c.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-purple-400 hover:underline">
              {c.website.replace(/^https?:\/\//, "")} <ExternalLink size={12} aria-hidden="true" />
            </a>
          </p>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${LEVEL_TONE[c.trust.level]}`}>
          {c.trust.level}
          {c.trust.override && " · pinned"}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {CHECKS.map(([key, label]) => (
          <CheckChip key={key} ok={Boolean(c.trust.checks?.[key])} label={label} />
        ))}
      </div>
      {c.trust.reasons?.length > 0 && <p className="mt-2 text-sm text-neutral-400">{c.trust.reasons.join(" ")}</p>}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <input
          aria-label={`Note for ${c.name}`}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={300}
          placeholder="Reason (shown to the recruiter)"
          className="min-w-0 flex-1 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white placeholder:text-neutral-500 focus:border-purple-500 focus:outline-none"
        />
        {[
          ["verified", "Verify", "bg-emerald-600 hover:bg-emerald-500"],
          ["limited", "Limit", "bg-amber-600 hover:bg-amber-500"],
          ["rejected", "Reject", "bg-rose-600 hover:bg-rose-500"],
        ].map(([level, label, tone]) => (
          <button key={level} type="button" disabled={Boolean(busy)} onClick={() => decide(level)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50 ${tone}`}>
            {busy === level ? <Loader2 size={14} className="animate-spin" aria-label="Saving" /> : label}
          </button>
        ))}
        {c.trust.override && (
          <button type="button" disabled={Boolean(busy)} onClick={() => decide(null)}
            className="rounded-md px-3 py-1.5 text-sm text-neutral-300 hover:bg-white/5 disabled:opacity-50">
            Clear pin
          </button>
        )}
      </div>
    </li>
  );
};

// /hiring/admin: the trust engine's exceptions. Admin-only: the API answers 404
// to everyone else, and this page then shows nothing useful.
const HiringAdminPage = () => {
  const [filter, setFilter] = useState("attention");
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(null);

  const [version, setVersion] = useState(0); // bump to reload after a decision

  useEffect(() => {
    let cancelled = false;
    adminListCompanies(filter)
      .then((data) => !cancelled && setRows(data))
      .catch((err) => !cancelled && setError(err.status === 404 ? "Admins only." : err.message));
    return () => {
      cancelled = true;
    };
  }, [filter, version]);

  const pick = (id) => {
    if (id === filter) return;
    setRows(null);
    setError(null);
    setFilter(id);
  };

  const onDecide = async (id, body) => {
    try {
      await adminOverrideCompany(id, body);
      toast.success(body.level ? `Pinned as ${body.level}` : "Pin cleared");
      setVersion((v) => v + 1);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold text-white">Hiring exceptions</h1>
      <p className="mt-1 text-sm text-neutral-400">
        The trust engine decides on its own. Pin a level here only for appeals or abuse; a pin survives re-checks until cleared.
      </p>

      <div className="mt-6 flex flex-wrap gap-2" role="tablist">
        {FILTERS.map((f) => (
          <button key={f.id} type="button" role="tab" aria-selected={filter === f.id} onClick={() => pick(f.id)}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${filter === f.id ? "border-purple-500 bg-purple-500/15 text-purple-200" : "border-white/10 text-neutral-300 hover:border-white/25"}`}>
            {f.label}
          </button>
        ))}
      </div>

      {error && <p className="mt-8 text-sm text-red-400">{error}</p>}
      {!rows && !error && (
        <div className="flex justify-center py-16 text-neutral-500">
          <Loader2 size={20} className="animate-spin" aria-label="Loading" />
        </div>
      )}
      {rows && rows.length === 0 && <p className="mt-8 text-sm text-neutral-500">Nothing here.</p>}
      {rows && rows.length > 0 && (
        <ul className="mt-6 flex flex-col gap-3">
          {rows.map((c) => <CompanyRow key={c.id} c={c} onDecide={onDecide} />)}
        </ul>
      )}
    </div>
  );
};

export default HiringAdminPage;
