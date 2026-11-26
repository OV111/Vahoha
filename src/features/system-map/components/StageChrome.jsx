import { FLOW_DOTS } from "@/constants/projectMapFlowDots";
import { useState } from "react";
import { Cable, Info, Maximize, Pause, Play, RotateCcw } from "lucide-react";

const controlButton =
  "flex size-9 cursor-pointer items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950/90 text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-400 pointer-coarse:size-11";

// `extra` numbers are left out on a phone, where they would cover the map.
function Metric({ label, value, tone, extra = false }) {
  return (
    <div className={`pm-metric ${tone ? `pm-metric--${tone}` : ""} ${extra ? "max-sm:hidden" : ""}`}>
      <p className="text-[10px] uppercase tracking-widest text-neutral-400 max-sm:tracking-normal">{label}</p>
      <p className="text-sm font-bold text-white">
        <span key={value} className="pm-metric__value">
          {value}
        </span>
      </p>
    </div>
  );
}

export function MetricStrip({ metrics, className = "inset-x-3" }) {
  return (
    <div className={`pointer-events-none absolute top-3 z-10 ${className} flex flex-wrap gap-x-5 gap-y-2 max-sm:gap-x-3`}>
      <Metric label="Parts" value={metrics.parts} />
      <Metric label="Wires" value={metrics.wires} />
      {metrics.unconfirmed > 0 && <Metric label="To confirm" value={metrics.unconfirmed} tone="bad" />}
      <Metric label="Hops / trip" value={metrics.steps} extra />
      <Metric label="Off flow" value={metrics.offFlow} tone={metrics.offFlow ? "bad" : "ok"} />
      <Metric label="Found in repo" value={metrics.found} tone={metrics.found ? "ok" : undefined} extra />
      {metrics.down > 0 && <Metric label="Down" value={metrics.down} tone="bad" />}
    </div>
  );
}

// What each dot means, only for the dots this map uses.
export function FlowLegend({ types, unconfirmed = false, className = "left-3" }) {
  const [open, setOpen] = useState(false); // phones only: it is always shown from sm up
  if (!types.size && !unconfirmed) return null;
  return (
    <>
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      className={`${controlButton} absolute bottom-3 z-10 sm:hidden ${open ? "border-purple-400 text-white" : ""} ${className}`}
      aria-label="What the dots mean"
      title="What the dots mean"
    >
      <Info size={15} aria-hidden="true" />
    </button>
    <div
      className={`pointer-events-none absolute bottom-16 z-10 max-w-[min(26rem,calc(100%-1.5rem))] ${open ? "" : "max-sm:hidden"} rounded-lg border border-neutral-800 bg-neutral-950/90 px-3 py-2 text-[11px] text-neutral-400 sm:bottom-3 sm:max-w-[min(26rem,calc(100%-14rem))] max-sm:inset-x-3 ${className}`}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {Object.entries(FLOW_DOTS)
          .filter(([type]) => types.has(type))
          .map(([type, { label, color, ring }]) => (
            <span key={type} className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full border-2" style={{ borderColor: color, background: ring ? "transparent" : color }} /> {label}
            </span>
          ))}
        {unconfirmed && (
          <span className="flex items-center gap-1.5">
            <span className="w-4 border-t border-dashed border-neutral-400" /> not confirmed yet
          </span>
        )}
      </div>
    </div>
    </>
  );
}

export function StageControls({ linking, onToggleLink, onFit, onReplay, paused, onTogglePause }) {
  return (
    <div className="absolute right-3 bottom-3 z-10 flex gap-2">
      {onToggleLink && (
        <button
          type="button"
          className={`${controlButton} ${linking ? "border-purple-400 text-white" : ""}`}
          onClick={onToggleLink}
          aria-pressed={linking}
          aria-label="Connect parts"
          title={linking ? "Connecting: drag from one part to another" : "Connect parts (or hold Shift and drag)"}
        >
          <Cable size={15} aria-hidden="true" />
        </button>
      )}
      {onFit && (
        <button type="button" className={controlButton} onClick={onFit} aria-label="Show the whole map" title="Show the whole map">
          <Maximize size={15} aria-hidden="true" />
        </button>
      )}
      <button type="button" className={controlButton} onClick={onReplay} aria-label="Replay" title="Replay">
        <RotateCcw size={15} aria-hidden="true" />
      </button>
      <button type="button" className={controlButton} onClick={onTogglePause} aria-label={paused ? "Play" : "Pause"} title={paused ? "Play" : "Pause"}>
        {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
      </button>
    </div>
  );
}
