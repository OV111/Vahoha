import { CheckCircle2, ShieldAlert, ShieldQuestion } from "lucide-react";
import VerifyEmailStep from "./VerifyEmailStep";
import FixCompanyForm from "./FixCompanyForm";
import { TRUST_COPY } from "../../../../constants/hiring";

const STYLE = {
  verified: { Icon: CheckCircle2, box: "border-emerald-900/60 bg-emerald-950/30 text-emerald-200" },
  limited: { Icon: ShieldQuestion, box: "border-amber-900/60 bg-amber-950/30 text-amber-200" },
  unverified: { Icon: ShieldQuestion, box: "border-amber-900/60 bg-amber-950/30 text-amber-200" },
  rejected: { Icon: ShieldAlert, box: "border-rose-900/60 bg-rose-950/30 text-rose-200" },
};

// The company's trust level on hiring home, with the reasons behind it.
// An unverified account can enter its email code right here.
const TrustBanner = ({ company, email, onUpdated }) => {
  const { level, reasons = [] } = company.trust;
  const { Icon, box } = STYLE[level] ?? STYLE.limited;
  const copy = TRUST_COPY[level] ?? TRUST_COPY.limited;

  return (
    <div role="status" className={`rounded-2xl border px-4 py-3 text-sm ${box}`}>
      <p className="flex items-center gap-2 font-medium">
        <Icon size={16} className="shrink-0" aria-hidden="true" /> {copy.title}
      </p>
      <p className="mt-1 opacity-80">{copy.body}</p>
      {level === "limited" && reasons.length > 0 && (
        <ul className="mt-2 list-disc space-y-0.5 pl-5 opacity-90">
          {reasons.map((r) => <li key={r}>{r}</li>)}
        </ul>
      )}
      {level === "limited" && !company.trust.note && <FixCompanyForm company={company} onUpdated={onUpdated} />}
      {company.trust.note && <p className="mt-2 text-xs opacity-80">Note from Vahoha: {company.trust.note}</p>}
      {level === "unverified" && (
        <div className="mt-4 max-w-sm">
          <VerifyEmailStep email={email} onVerified={onUpdated} />
        </div>
      )}
    </div>
  );
};

export default TrustBanner;
