import { ShieldCheck } from "lucide-react";
import { TRUST_BADGES } from "../../../../../constants/hiring";

const TrustBadge = ({ level }) => {
  const badge = TRUST_BADGES[level];
  if (!badge) return null;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${badge.tone}`}>
      <ShieldCheck size={12} aria-hidden="true" /> {badge.label}
    </span>
  );
};

export default TrustBadge;
