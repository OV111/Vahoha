import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Bookmark, Loader2 } from "lucide-react";
import useViewOnly from "@/features/hiring/useViewOnly";
import { fetchSavedStatus, saveCandidate, unsaveCandidate } from "@/features/hiring/api/hiringApi";

const NOTE_MAX = 500;

// On a candidate's scorecard, for hiring accounts: save them to the company's
// shortlist with a private note. Teammates see the same list; the developer and
// other companies never do. Intro requests sit above this (RequestIntro).
const RecruiterActions = ({ username, name }) => {
  const isRecruiter = useViewOnly();
  const [state, setState] = useState(null); // { saved, note } once loaded
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isRecruiter) return undefined;
    let cancelled = false;
    fetchSavedStatus(username)
      .then((s) => {
        if (cancelled) return;
        setState(s);
        setNote(s.note);
      })
      .catch(() => !cancelled && setState({ saved: false, note: "" }));
    return () => {
      cancelled = true;
    };
  }, [isRecruiter, username]);

  if (!isRecruiter) return null;

  const run = async (call, done) => {
    setBusy(true);
    try {
      setState(await call());
      toast.success(done);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  const save = () => run(() => saveCandidate(username, note), state?.saved ? "Note saved" : `${name || "Candidate"} saved`);
  const remove = () =>
    run(async () => {
      const r = await unsaveCandidate(username);
      setNote("");
      return { ...r, note: "" };
    }, "Removed from saved");

  const noteChanged = state && note !== state.note;

  return (
    <aside className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-medium text-white">
          <Bookmark size={16} className={state?.saved ? "fill-purple-400 text-purple-400" : "text-neutral-400"} aria-hidden="true" />
          {state?.saved ? "Saved to your shortlist" : "Not saved yet"}
        </p>
        {!state ? (
          <Loader2 size={16} className="animate-spin text-neutral-500" aria-label="Loading" />
        ) : state.saved ? (
          <button type="button" onClick={remove} disabled={busy} className="text-sm text-neutral-400 hover:text-white disabled:opacity-50">
            Remove
          </button>
        ) : null}
      </div>

      <label htmlFor="recruiter-note" className="text-[13px] text-neutral-400">
        Private note <span className="text-neutral-600">(only your company sees it)</span>
      </label>
      <textarea
        id="recruiter-note"
        rows={3}
        maxLength={NOTE_MAX}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="e.g. Strong on APIs, ask about the capstone defense"
        className="w-full resize-y rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-600 tabular-nums">{note.length}/{NOTE_MAX}</span>
        {(!state?.saved || noteChanged) && (
          <button type="button" onClick={save} disabled={busy || !state}
            className="inline-flex items-center gap-1.5 rounded-md bg-purple-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-50">
            {busy && <Loader2 size={14} className="animate-spin" aria-hidden="true" />}
            {state?.saved ? "Save note" : "Save candidate"}
          </button>
        )}
      </div>
    </aside>
  );
};

export default RecruiterActions;
