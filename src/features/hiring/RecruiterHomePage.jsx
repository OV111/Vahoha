import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, Loader2, Mic, UserPlus } from "lucide-react";
import TrustBanner from "./components/TrustBanner";
import { fetchRecruiterMe } from "./api/hiringApi";
import useProfileStore from "../../stores/useProfileStore";
import { COMPANY_ROLES, EXAMPLE_CANDIDATES } from "../../../constants/hiring";

const CARD = "rounded-2xl border border-neutral-800 bg-neutral-950 p-5";

const CandidateRow = ({ c }) => (
  <li className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-800 py-4 first:border-t-0">
    <div className="min-w-0">
      <p className="font-medium text-white">{c.name}</p>
      <p className="mt-0.5 text-sm text-neutral-400">
        {c.track} · {c.layers} layers passed
      </p>
      <div className="mt-2 flex flex-wrap gap-2 text-xs">
        {c.verified > 0 && (
          <span className="flex items-center gap-1 rounded-full bg-purple-500/15 px-2 py-0.5 text-purple-300">
            <Mic size={12} aria-hidden="true" /> {c.verified} verified
          </span>
        )}
        {c.capstone && (
          <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-300">
            <BadgeCheck size={12} aria-hidden="true" /> Capstone defended
          </span>
        )}
        {c.openToWork && <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-sky-300">Open to work</span>}
      </div>
    </div>
    <div className="flex items-center gap-4">
      <span className="text-right">
        <span className="block text-xl font-semibold text-white tabular-nums">{c.score}</span>
        <span className="text-xs text-neutral-500">evidence</span>
      </span>
      <button type="button" disabled className="rounded-md border border-neutral-700 px-3 py-1.5 text-sm text-neutral-400">
        Request intro
      </button>
    </div>
  </li>
);

// /hiring/home: the recruiter's start page. Company and trust level are real;
// the candidate rows stay examples until the candidates list is wired in.
const RecruiterHomePage = () => {
  const [me, setMe] = useState(null);
  const [error, setError] = useState(null);
  const email = useProfileStore((st) => st.user?.email);

  useEffect(() => {
    let cancelled = false;
    fetchRecruiterMe()
      .then((d) => !cancelled && setMe(d))
      .catch((err) => !cancelled && setError(err));
    return () => {
      cancelled = true;
    };
  }, []);

  if (error)
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-white">{error.status === 404 ? "This page is for hiring accounts." : error.message}</p>
        {error.status === 404 && (
          <Link to="/hiring/join" className="mt-4 inline-block text-purple-500 hover:underline">Create a hiring account</Link>
        )}
      </div>
    );
  if (!me)
    return (
      <div className="flex justify-center py-24 text-neutral-500">
        <Loader2 size={20} className="animate-spin" aria-label="Loading" />
      </div>
    );

  const roleLabel = me.company.type === "agency"
    ? "Recruiting agency"
    : COMPANY_ROLES.find((r) => r.id === me.companyRole)?.title;

  return (
  <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
    <TrustBanner company={me.company} email={email} onUpdated={(company) => setMe({ ...me, emailVerified: true, company })} />

    <h1 className="mt-8 text-2xl font-semibold text-white">Hiring home</h1>
    <p className="mt-1 text-sm text-neutral-400">{me.company.name}{roleLabel ? ` · ${roleLabel}` : ""}</p>
    <div className="mt-8 grid gap-3 sm:grid-cols-3">
      <div className={CARD}>
        <p className="text-2xl font-semibold text-white tabular-nums">0</p>
        <p className="text-sm text-neutral-400">Saved candidates</p>
      </div>
      <div className={CARD}>
        <p className="text-2xl font-semibold text-white tabular-nums">0</p>
        <p className="text-sm text-neutral-400">Intro requests sent</p>
      </div>
      <div className={CARD}>
        <p className="text-2xl font-semibold text-white tabular-nums">1</p>
        <p className="text-sm text-neutral-400">Teammates</p>
        <button type="button" disabled className="mt-3 flex items-center gap-1.5 text-sm text-purple-400 disabled:opacity-60">
          <UserPlus size={14} aria-hidden="true" /> Invite a teammate
        </button>
      </div>
    </div>

    <section className={`mt-8 ${CARD}`}>
      <div className="flex items-baseline justify-between">
        <h2 className="font-semibold text-white">Candidates</h2>
        <span className="text-xs text-neutral-500">Example rows: real candidates appear after approval</span>
      </div>
      <ul className="mt-3">
        {EXAMPLE_CANDIDATES.map((c) => <CandidateRow key={c.name} c={c} />)}
      </ul>
    </section>
  </div>
  );
};

export default RecruiterHomePage;
