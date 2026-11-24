import { Bone, BoneControl, BoneLines, BonePanel, SkeletonRegion } from "@/components/ui/Skeleton";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Mic, MicOff, ShieldCheck, Clock } from "lucide-react";
import { useMicLevel } from "../hooks/useMicLevel";
import { EXPLANATION_LIMIT_SEC, FOLLOWUP_LIMIT_SEC } from "../lib/examStates";
import { formatClock } from "../lib/formatClock";

const INTRO =
  "Explain it out loud, the way you would in an interview. Pass and this layer is marked Verified on your profile.";
const CLOCK_NOTE = "About 10 minutes. The clock doesn't pause.";
const card = "rounded-2xl border border-neutral-800 bg-neutral-950 p-5 sm:p-6";
const heading = "text-[15px] font-semibold text-neutral-100";

const STEPS = [
  {
    title: "Explain",
    time: `up to ${formatClock(EXPLANATION_LIMIT_SEC)}`,
    body: "Answer one open question in your own words.",
  },
  {
    title: "Follow-ups",
    time: `${formatClock(FOLLOWUP_LIMIT_SEC)} each`,
    body: "Only for the parts you skipped or kept vague.",
  },
  {
    title: "Result",
    time: "right away",
    body: "See what counted, with your own words quoted.",
  },
];

const GRADES = [
  {
    label: "Solid",
    dot: "bg-emerald-400",
    body: "You explained it and why it matters.",
  },
  {
    label: "Shallow",
    dot: "bg-amber-400",
    body: "You explained part of it, not all of it.",
  },
  {
    label: "Missing",
    dot: "bg-rose-400",
    body: "Not explained, or only named.",
  },
  {
    label: "Incorrect",
    dot: "bg-rose-600",
    body: "Explained in a way that's wrong.",
  },
];

const hoursLeft = (iso) => {
  const mins = Math.max(0, Math.ceil((new Date(iso) - Date.now()) / 60000));
  return mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins}m`;
};

function StatusLine({ eligibility }) {
  if (eligibility.verified) {
    return (
      <p className="flex items-center gap-2 text-sm text-emerald-300">
        <ShieldCheck size={15} aria-hidden="true" /> Already verified. Taking it
        again is practice.
      </p>
    );
  }
  if (eligibility.cooldownUntil) {
    return (
      <p className="flex items-center gap-2 text-sm text-amber-300">
        <Clock size={15} aria-hidden="true" /> You can retry in{" "}
        {hoursLeft(eligibility.cooldownUntil)}.
      </p>
    );
  }
  const left = Math.max(0, eligibility.quota.limit - eligibility.quota.used);
  return (
    <p className="text-sm text-neutral-400">
      {left} of {eligibility.quota.limit} tries left today.
    </p>
  );
}

function Timeline() {
  return (
    <ol className="space-y-4">
      {STEPS.map((s, i) => (
        <li key={s.title} className="flex gap-4">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-neutral-700 text-sm tabular-nums text-neutral-300">
            {i + 1}
          </span>
          <div>
            <p className="text-[15px] text-neutral-100">
              {s.title} <span className="text-neutral-500">({s.time})</span>
            </p>
            <p className="mt-0.5 text-sm text-neutral-400">{s.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function MicMeter({ mic }) {
  // The meter is the check: it moves with your voice, so a muted or wrong mic shows before the exam.
  return (
    <div className="mt-3 flex h-12 items-center gap-[3px]" aria-hidden="true">
      {mic.levels.map((level, i) => (
        <span
          key={i}
          className={`w-full rounded-full transition-[height] duration-75 ${
            mic.heard
              ? "bg-emerald-400"
              : mic.status === "listening"
                ? "bg-neutral-400"
                : "bg-neutral-800"
          }`}
          style={{ height: `${Math.max(8, level * 100)}%` }}
        />
      ))}
    </div>
  );
}

function StepMarker({ n, done }) {
  return (
    <span
      className={`flex size-7 shrink-0 items-center justify-center rounded-full border text-sm tabular-nums transition-colors ${
        done
          ? "border-emerald-400 bg-emerald-400 text-neutral-950"
          : "border-neutral-700 text-neutral-300"
      }`}
    >
      {done ? <Check size={15} strokeWidth={3} aria-hidden="true" /> : n}
    </span>
  );
}

// A whole row is the click target, so the checkbox is easy to hit on a phone.
function CheckStep({ n, checked, onChange, title, children }) {
  return (
    <li>
      <label className="flex cursor-pointer gap-3 rounded-xl p-2 -m-2 transition-colors hover:bg-neutral-900">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <span className="rounded-full peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-emerald-300">
          <StepMarker n={n} done={checked} />
        </span>
        <span className="pt-0.5">
          <span className="block text-[15px] text-neutral-100">{title}</span>
          {children && (
            <span className="mt-0.5 block text-sm text-neutral-400">
              {children}
            </span>
          )}
        </span>
      </label>
    </li>
  );
}

function StartPanel({
  mic,
  micReady,
  quiet,
  setQuiet,
  consented,
  setConsented,
  ready,
  isBusy,
  onBegin,
}) {
  const unavailable = mic.status === "denied" || mic.status === "unsupported";
  const doneCount = [micReady, quiet, consented].filter(Boolean).length;

  return (
    <section
      aria-labelledby="start"
      className={`rounded-2xl border bg-neutral-950 p-5 transition-[border-color,box-shadow] duration-300 sm:p-6 ${
        ready
          ? "border-emerald-500/70 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]"
          : "border-neutral-800"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 id="start" className="text-lg font-semibold text-neutral-50">
          Get ready
        </h3>
        <span className="text-sm tabular-nums text-neutral-400">
          {doneCount} of 3 done
        </span>
      </div>
      <div
        className="mt-3 h-1 overflow-hidden rounded-full bg-neutral-800"
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full bg-emerald-400 transition-[width] duration-300"
          style={{ width: `${(doneCount / 3) * 100}%` }}
        />
      </div>

      <ol className="mt-5 space-y-5">
        <li className="flex gap-3">
          <StepMarker n={1} done={micReady} />
          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-[15px] text-neutral-100">
              {unavailable
                ? "No microphone, you'll type"
                : mic.heard
                  ? "We can hear you"
                  : "Test your microphone"}
            </p>
            {unavailable ? (
              <p className="mt-0.5 flex items-start gap-2 text-sm text-amber-300">
                <MicOff
                  size={15}
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                {mic.status === "denied"
                  ? "Allow microphone access in your browser settings, or type your answers in the exam."
                  : "This browser can't record. You can type your answers in the exam."}
              </p>
            ) : (
              <>
                <MicMeter mic={mic} />
                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                  {mic.status === "listening" ? (
                    <>
                      <p className="text-sm text-neutral-400" role="status">
                        {mic.heard
                          ? "Sounds good."
                          : 'Say a sentence, like "I\'m ready."'}
                      </p>
                      <button
                        type="button"
                        onClick={mic.stop}
                        className="min-h-11 text-sm text-neutral-400 underline"
                      >
                        Stop
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={mic.start}
                      className="flex min-h-11 items-center gap-2 rounded-xl border border-neutral-700 px-4 text-sm text-neutral-100 transition-colors hover:bg-neutral-900"
                    >
                      <Mic size={15} aria-hidden="true" />{" "}
                      {mic.heard ? "Test again" : "Test microphone"}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </li>

        <CheckStep
          n={2}
          checked={quiet}
          onChange={(e) => setQuiet(e.target.checked)}
          title="I'm somewhere quiet"
        >
          For the next 10 minutes.
        </CheckStep>

        <CheckStep
          n={3}
          checked={consented}
          onChange={(e) => setConsented(e.target.checked)}
          title="I agree to the recording"
        >
          Your voice goes to our speech-to-text provider (Groq) and is deleted
          once it&apos;s text.{" "}
          <Link
            to="/privacy"
            className="underline"
            onClick={(e) => e.stopPropagation()}
          >
            Privacy policy
          </Link>
        </CheckStep>
      </ol>

      <button
        type="button"
        onClick={onBegin}
        disabled={!ready || isBusy}
        className="mt-6 flex min-h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-emerald-500 text-base font-semibold text-neutral-950 transition-colors hover:bg-emerald-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500"
      >
        <Mic size={18} aria-hidden="true" />
        {isBusy ? "Starting…" : "Begin exam"}
      </button>
      <p className="mt-3 text-center text-sm text-neutral-500">
        {ready
          ? "About 10 minutes. The clock starts when you begin."
          : "Finish the 3 steps to begin."}
      </p>
    </section>
  );
}

/**
 * Before the attempt exists: what the exam looks like, how it's graded, a live
 * mic check and a short ready list that unlocks Begin. The server also refuses
 * to start without consent and saves when it was given.
 *
 * @param {{ eligibility: import("../lib/examStates").Eligibility|null, isBusy: boolean, onBegin: () => void }} props
 */
const PreExam = ({ eligibility, isBusy, onBegin }) => {
  const mic = useMicLevel();
  const [quiet, setQuiet] = useState(false);
  const [consented, setConsented] = useState(false);

  if (!eligibility) {
    return (
      <SkeletonRegion label="Loading exam">
        <div className="space-y-5">
          <div>
            <Bone className="my-1 h-7 w-56" />
            <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-neutral-400">{INTRO}</p>
            <Bone soft className="mt-3 h-5 w-40" />
          </div>
          <div className="grid gap-5 lg:grid-cols-12 lg:items-start">
            <div className={`${card} lg:col-span-7`}>
              <h3 className={`${heading} mb-4`}>How it goes</h3>
              <Timeline />
              <p className="mt-5 text-sm text-neutral-500">{CLOCK_NOTE}</p>
            </div>
            <BonePanel className="p-5 sm:p-6 lg:col-span-5">
              <BoneLines widths={["w-1/2", "w-full", "w-2/3"]} />
              <BoneLines className="mt-8" widths={["w-2/5", "w-full"]} />
              <BoneControl className="mt-8 h-11" bar="w-1/3" />
            </BonePanel>
          </div>
        </div>
      </SkeletonRegion>
    );
  }

  const blocked = !eligibility.eligible;
  // Without a usable mic the exam is still open: answers are typed instead.
  const micReady =
    mic.heard || mic.status === "denied" || mic.status === "unsupported";
  const ready = quiet && micReady && consented;
  const begin = () => {
    mic.stop(); // free the microphone for the exam's own recorder
    onBegin();
  };

  return (
    <div className="space-y-5">
      <header>
        <h2 className="text-2xl font-semibold text-neutral-50 sm:text-[28px]">
          {eligibility.layerTitle ?? "This layer"}
        </h2>
        <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-neutral-400">
          {INTRO}
        </p>
        <div className="mt-3">
          <StatusLine eligibility={eligibility} />
        </div>
      </header>

      {/* Two columns on wide screens: what to expect on the left, the steps to start on the right,
          so everything fits without scrolling. On phones they stack in the same order. */}
      <div className="grid gap-5 lg:grid-cols-12 lg:items-start">
        <div className="space-y-5 lg:col-span-7">
          <section className={card} aria-labelledby="how-it-goes">
            <h3 id="how-it-goes" className={`${heading} mb-4`}>
              How it goes
            </h3>
            <Timeline />
            <p className="mt-5 text-sm text-neutral-500">
              {CLOCK_NOTE}
            </p>
          </section>

          {eligibility.topics?.length > 0 && (
            <section className={card} aria-labelledby="topics">
              <h3 id="topics" className={heading}>
                Your question comes from one of these
              </h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {eligibility.topics.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-sm text-neutral-200"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className={card} aria-labelledby="grading">
            <h3 id="grading" className={heading}>
              How it&apos;s graded
            </h3>
            <ul className="mt-3 space-y-2.5">
              {GRADES.map((g) => (
                <li key={g.label} className="flex items-baseline gap-3 text-sm">
                  <span
                    className={`size-2 shrink-0 translate-y-[-1px] rounded-full ${g.dot}`}
                    aria-hidden="true"
                  />
                  <span className="w-16 shrink-0 text-neutral-100">
                    {g.label}
                  </span>
                  <span className="text-neutral-400">{g.body}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-neutral-400">
              Say why, not only what. A real example counts. Accent, pace and
              grammar are never graded.
            </p>
          </section>
        </div>

        <div className="space-y-5 lg:sticky lg:top-6 lg:col-span-5">
          {blocked && (
            <div
              role="alert"
              className="rounded-2xl border border-amber-800/60 bg-amber-950/30 p-5 text-sm text-amber-200"
            >
              {eligibility.reasons.map((reason) => (
                <p key={reason}>{reason}</p>
              ))}
            </div>
          )}

          {!blocked && (
            <StartPanel
              mic={mic}
              micReady={micReady}
              quiet={quiet}
              setQuiet={setQuiet}
              consented={consented}
              setConsented={setConsented}
              ready={ready}
              isBusy={isBusy}
              onBegin={begin}
            />
          )}

          <p className="text-sm text-neutral-500">
            Not ready yet?{" "}
            <Link
              to="/mentor"
              className="font-medium text-purple-600 underline hover:text-purple-500"
            >
              Practise with the mentor first
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreExam;
