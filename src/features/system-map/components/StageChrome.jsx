import { Cable, Maximize, Pause, Play, RotateCcw } from "lucide-react";

const controlButton =
  "flex size-9 cursor-pointer items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950/90 text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-400 pointer-coarse:size-11";

function Metric({ label, value, tone }) {
  return (
    <div className={`pm-metric ${tone ? `pm-metric--${tone}` : ""}`}>
      <p className="text-[10px] uppercase tracking-widest text-neutral-500">{label}</p>
      <p className="text-sm font-bold text-white">
        <span key={value} className="pm-metric__value">
          {value}
        </span>
      </p>
    </div>
  );
}

export function MetricStrip({ metrics }) {
  return (
    <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex flex-wrap gap-x-5 gap-y-2">
      <Metric label="Parts" value={metrics.parts} />
      <Metric label="Wires" value={metrics.wires} />
      <Metric label="Hops / trip" value={metrics.steps} />
      <Metric label="Off the flow" value={metrics.offFlow} tone={metrics.offFlow ? "bad" : "ok"} />
      <Metric label="Found in repo" value={metrics.found} tone={metrics.found ? "ok" : undefined} />
      {metrics.down > 0 && <Metric label="Down" value={metrics.down} tone="bad" />}
    </div>
  );
}

export function Legend() {
  return (
    <div className="pointer-events-none absolute bottom-3 left-3 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg border border-neutral-800 bg-neutral-950/90 px-3 py-2 text-[11px] text-neutral-400">
      <span className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-neutral-300" /> request
      </span>
      <span className="flex items-center gap-1.5">
        <span className="w-4 border-t border-dashed border-neutral-500" /> wire
      </span>
      <span className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-red-400" /> failed
      </span>
    </div>
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
