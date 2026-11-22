import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Send } from "lucide-react";
import useViewOnly from "../../useViewOnly";
import IntroStatusPill from "./IntroStatusPill";
import IntroRequestDialog from "./IntroRequestDialog";
import CopyEmail from "./CopyEmail";
import { checkIntro } from "../../api/hiringApi";
import { INTRO_REQUEST_COPY as COPY } from "../../../../../constants/hiring";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";

const PANEL = "flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5";

const Existing = ({ intro }) => (
  <>
    <p className="flex flex-wrap items-center gap-2 font-medium text-white">
      Intro requested <span className="text-neutral-600">·</span> <IntroStatusPill status={intro.status} />
    </p>
    <p className="text-[13px] text-neutral-400">For {intro.job.title}</p>
    {intro.contactEmail && <CopyEmail email={intro.contactEmail} />}
    <Link to="/hiring/intros" className="text-sm text-purple-500 hover:underline">See all intro requests</Link>
  </>
);

// On a candidate's scorecard, for hiring accounts: ask the developer for an
// intro about one of the company's open jobs. The server's /check decides
// whether the button shows at all (trust level, daily cap, an open request).
const RequestIntro = ({ username, name }) => {
  const isRecruiter = useViewOnly();
  const [check, setCheck] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [version, setVersion] = useState(0); // bump to ask /check again

  useEffect(() => {
    if (!isRecruiter) return undefined;
    let cancelled = false;
    checkIntro(username).then(
      (c) => !cancelled && setCheck(c),
      (err) => !cancelled && setError(err.message),
    );
    return () => {
      cancelled = true;
    };
  }, [isRecruiter, username, version]);

  if (!isRecruiter) return null;

  const onSent = (intro) => {
    setOpen(false);
    if (intro) return setCheck((c) => ({ ...c, canSend: false, existing: intro }));
    setCheck(null);
    setError(null);
    setVersion((v) => v + 1);
  };

  let body;
  if (error) body = <p className="text-sm text-red-400">{error}</p>;
  else if (!check) body = <div className="flex min-h-40"><LoadingSuspense fill size={32} /></div>;
  else if (check.existing) body = <Existing intro={check.existing} />;
  else if (check.jobs.length === 0)
    body = (
      <>
        <p className="text-sm text-neutral-400">{check.reason || COPY.noJobs}</p>
        <Link to="/hiring/jobs/new" className="text-sm text-purple-500 hover:underline">{COPY.createJob}</Link>
      </>
    );
  else if (!check.canSend) body = <p className="text-sm text-neutral-400">{check.reason || COPY.verifiedOnly}</p>;
  else
    body = (
      <button type="button" onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700">
        <Send size={15} aria-hidden="true" /> {COPY.open}
      </button>
    );

  return (
    <aside className={PANEL}>
      {body}
      {open && (
        <IntroRequestDialog username={username} name={name} jobs={check.jobs} onClose={() => setOpen(false)} onSent={onSent} />
      )}
    </aside>
  );
};

export default RequestIntro;
