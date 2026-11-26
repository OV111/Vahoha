import { AlertTriangle, ArrowLeft, RotateCcw, SearchX, WifiOff } from "lucide-react";
import { C, FONT_SANS } from "@/features/coding-challenges/lib/arenaTheme";

// What to say for each way loading a challenge can fail. "network" means the
// request never got an answer, so trying again is the useful action; a missing
// challenge will be missing next time too, so it only offers the way back.
const STATES = {
  network: {
    icon: WifiOff,
    title: "We can't reach the server",
    body: "This is usually a brief connection problem. Your saved code is safe. Check your internet connection, then try again.",
    retry: true,
  },
  notFound: {
    icon: SearchX,
    title: "This challenge doesn't exist",
    body: "It may have been renamed or removed. You can pick another one from the list.",
    retry: false,
  },
  other: {
    icon: AlertTriangle,
    title: "This challenge didn't load",
    body: "Something went wrong on our side. Try again in a moment.",
    retry: true,
  },
};

export default function ArenaLoadError({ kind, detail, onRetry, onBack }) {
  const state = STATES[kind] ?? STATES.other;
  const Icon = state.icon;

  return (
    <div role="alert" className="flex max-w-[420px] flex-col items-center gap-4 px-6 text-center" style={{ fontFamily: FONT_SANS }}>
      <span
        className="flex h-12 w-12 items-center justify-center rounded-full"
        style={{ background: "rgba(168, 85, 247, 0.1)", border: `1px solid ${C.border}`, color: C.purple }}
      >
        <Icon size={22} aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[17px] font-semibold" style={{ color: C.text }}>
          {state.title}
        </h1>
        <p className="text-[13px] leading-relaxed" style={{ color: C.muted }}>
          {state.body}
        </p>
        {kind === "other" && detail && (
          <p className="text-[12px]" style={{ color: C.faint }}>
            {detail}
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {state.retry && (
          <button
            type="button"
            onClick={onRetry}
            className="flex cursor-pointer items-center gap-1.5 rounded px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:brightness-110"
            style={{ background: C.purple }}
          >
            <RotateCcw size={13} aria-hidden="true" />
            Try again
          </button>
        )}
        <button
          type="button"
          onClick={onBack}
          className="flex cursor-pointer items-center gap-1.5 rounded px-4 py-2 text-[13px] transition-colors hover:text-white"
          style={{ border: `1px solid ${C.faint}`, color: C.muted }}
        >
          <ArrowLeft size={13} aria-hidden="true" />
          Back to challenges
        </button>
      </div>
    </div>
  );
}
