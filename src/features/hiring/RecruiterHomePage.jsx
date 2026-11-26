import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bookmark, Search } from "lucide-react";
import TrustBanner from "./components/TrustBanner";
import IntrosSummaryCard from "./components/intros/IntrosSummaryCard";
import { fetchRecruiterMe, fetchSaved } from "./api/hiringApi";
import useProfileStore from "@/stores/useProfileStore";
import { COMPANY_ROLES } from "@/constants/hiring";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";

const CARD = "rounded-2xl border border-white/10 bg-white/[0.02] p-5";
const SHORTLIST_PREVIEW = 5;

const SavedRow = ({ s }) => (
  <li className="border-t border-white/10 first:border-t-0">
    <Link
      to={`/candidate/${s.username}`}
      className="flex items-start justify-between gap-3 py-3.5 transition-colors hover:text-purple-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
    >
      <span className="min-w-0">
        <span className="block font-medium text-white">{s.name}</span>
        <span className="block text-sm text-neutral-500">@{s.username}</span>
        {s.note && <span className="mt-1 block line-clamp-2 text-sm text-neutral-400">{s.note}</span>}
      </span>
      <ArrowRight size={16} className="mt-1 shrink-0 text-neutral-600" aria-hidden="true" />
    </Link>
  </li>
);

// /hiring/home: the recruiter's start page. Company and trust level, then the
// company's intro requests and shortlist, with the way into the candidate list.
const RecruiterHomePage = () => {
  const [me, setMe] = useState(null);
  const [saved, setSaved] = useState(null);
  const [error, setError] = useState(null);
  const email = useProfileStore((st) => st.user?.email);

  useEffect(() => {
    let cancelled = false;
    fetchRecruiterMe()
      .then((d) => !cancelled && setMe(d))
      .catch((err) => !cancelled && setError(err));
    fetchSaved()
      .then((rows) => !cancelled && setSaved(rows))
      .catch(() => !cancelled && setSaved([]));
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
    return <LoadingSuspense />;

  const roleLabel = me.company.type === "agency"
    ? "Recruiting agency"
    : COMPANY_ROLES.find((r) => r.id === me.companyRole)?.title;
  const canBrowse = ["limited", "verified"].includes(me.company.trust.level);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
      <TrustBanner company={me.company} email={email} onUpdated={(company) => setMe({ ...me, emailVerified: true, company })} />

      <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Hiring home</h1>
          <p className="mt-1 text-sm text-neutral-400">{me.company.name}{roleLabel ? ` · ${roleLabel}` : ""}</p>
        </div>
        {canBrowse && (
          <Link to="/candidates" className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-700">
            <Search size={15} aria-hidden="true" /> Browse candidates
          </Link>
        )}
      </div>

      {canBrowse && <IntrosSummaryCard className="mt-8" />}

      <section className={`mt-8 ${CARD}`}>
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="flex items-center gap-2 font-semibold text-white">
            <Bookmark size={16} className="text-purple-400" aria-hidden="true" /> Your shortlist
            {saved?.length > 0 && <span className="text-sm font-normal text-neutral-500 tabular-nums">{saved.length}</span>}
          </h2>
          <span className="text-xs text-neutral-500">Shared with your teammates</span>
        </div>

        {saved === null ? (
          <div className="flex min-h-40"><LoadingSuspense fill size={32} /></div>
        ) : saved.length === 0 ? (
          <p className="mt-3 text-sm text-neutral-400">
            Nobody saved yet. Open a candidate and press <span className="text-white">Save candidate</span> to start your shortlist.
          </p>
        ) : (
          <ul className="mt-2">
            {saved.slice(0, SHORTLIST_PREVIEW).map((s) => <SavedRow key={s.username} s={s} />)}
          </ul>
        )}
      </section>
    </div>
  );
};

export default RecruiterHomePage;
