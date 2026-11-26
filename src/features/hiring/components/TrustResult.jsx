import { Link } from "react-router-dom";
import { motion as Motion } from "motion/react";
import { CheckCircle2, ShieldAlert, ShieldQuestion } from "lucide-react";
import { TRUST_COPY } from "@/constants/hiring";
import { HIRING_HOME } from "@/features/hiring/lib/landingPath";

const ICONS = { verified: CheckCircle2, limited: ShieldQuestion, unverified: ShieldQuestion, rejected: ShieldAlert };
const TONE = { verified: "text-emerald-400", limited: "text-amber-400", unverified: "text-amber-400", rejected: "text-rose-400" };

// The last screen of hiring sign-up: what the trust engine decided, and why.
const TrustResult = ({ level, reasons = [] }) => {
  const Icon = ICONS[level] ?? ShieldQuestion;
  const copy = TRUST_COPY[level] ?? TRUST_COPY.limited;
  return (
    <Motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Icon size={30} className={`mx-auto ${TONE[level] ?? TONE.limited}`} aria-hidden="true" />
      <h1 className="mt-4 text-xl font-semibold text-white">{copy.title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-neutral-400">{copy.body}</p>
      {reasons.length > 0 && (
        <ul className="mx-auto mt-4 max-w-sm space-y-1 text-left text-sm text-neutral-300">
          {reasons.map((r) => (
            <li key={r} className="flex gap-2"><span className="text-neutral-500">•</span>{r}</li>
          ))}
        </ul>
      )}
      <Link to={HIRING_HOME} className="mt-6 inline-block rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700">
        Go to your hiring home
      </Link>
    </Motion.div>
  );
};

export default TrustResult;
