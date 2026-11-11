import { useEffect, useState } from "react";
import { MENTOR_USAGE_COPY as COPY, THIN_SCROLL_CLASS } from "../../../../constants/mentorUsage";
import { formatCompact, formatDay, formatFull, num } from "../lib/usageFormat";

// The drawing is as wide as its container (measured below), not a fixed picture
// scaled down: scaling shrank the 10px axis labels to about 4px on a phone.
const DEFAULT_W = 640;
const MIN_W = 240;
const H = 160;
const PAD_L = 40;
const PAD_B = 22;
const PLOT_H = H - PAD_B;
const RADIUS = 4;

// Rounded at the data end only, flat on the baseline.
const barPath = (x, w, h) => {
  const r = Math.min(RADIUS, w / 2, h);
  const y = PLOT_H - h;
  return `M${x},${PLOT_H} V${y + r} Q${x},${y} ${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${PLOT_H} Z`;
};

/**
 * Tokens per day, one series, so no legend: the title names it. Each day owns a
 * full-height column that is focusable and carries the tooltip, so the target is
 * bigger than the thin bar drawn inside it.
 */
export default function UsageChart({ daily }) {
  const [active, setActive] = useState(null);
  // State, not a ref: the wrapper only exists once there is data to draw, and the
  // observer has to start when it appears.
  const [wrap, setWrap] = useState(null);
  const [width, setWidth] = useState(DEFAULT_W);
  useEffect(() => {
    if (!wrap || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.max(MIN_W, Math.round(entry.contentRect.width))),
    );
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [wrap]);

  const plotW = width - PAD_L;
  const days = Array.isArray(daily) ? daily : [];
  const max = Math.max(0, ...days.map((d) => num(d.totalTokens)));
  const slot = days.length ? plotW / days.length : plotW;
  const barW = Math.min(14, slot * 0.55);
  const labelIdx = days.length > 2 ? [0, Math.floor((days.length - 1) / 2), days.length - 1] : days.map((_, i) => i);
  const activeDay = active !== null ? days[active] : null;
  // Keep the tooltip inside the card: flip to the left edge for the right half.
  const tipLeft = active !== null ? ((PAD_L + (active + 0.5) * slot) / width) * 100 : 0;

  if (!days.length || max === 0) {
    return (
      <p className="rounded-lg bg-gray-50 p-4 text-center text-sm text-gray-500 dark:bg-white/5 dark:text-[#8A8A93]">
        {COPY.chartEmpty}
      </p>
    );
  }

  return (
    <div className="relative" ref={setWrap}>
      <svg
        viewBox={`0 0 ${width} ${H}`}
        height={H}
        className="block w-full"
        role="group"
        aria-label={COPY.chartTitle}
        onMouseLeave={() => setActive(null)}
      >
        {[0, 0.5, 1].map((f) => (
          <line
            key={f}
            x1={PAD_L}
            x2={width}
            y1={PLOT_H - f * PLOT_H}
            y2={PLOT_H - f * PLOT_H}
            className="stroke-gray-200 dark:stroke-white/10"
            strokeWidth="1"
          />
        ))}
        <text x={PAD_L - 6} y={PLOT_H + 4} textAnchor="end" className="fill-gray-500 text-[10px] dark:fill-[#8A8A93]">
          0
        </text>
        <text x={PAD_L - 6} y={10} textAnchor="end" className="fill-gray-500 text-[10px] dark:fill-[#8A8A93]">
          {formatCompact(max)}
        </text>

        {days.map((d, i) => {
          const h = max ? (num(d.totalTokens) / max) * PLOT_H : 0;
          const x = PAD_L + i * slot + (slot - barW) / 2;
          return (
            <g key={d.date ?? i}>
              {h > 0 && (
                <path
                  d={barPath(x, barW, h)}
                  className={active === i ? "fill-purple-600 dark:fill-purple-300" : "fill-purple-500 dark:fill-purple-400"}
                />
              )}
              <rect
                x={PAD_L + i * slot}
                y={0}
                width={slot}
                height={PLOT_H}
                fill="transparent"
                tabIndex={0}
                aria-label={`${formatDay(d.date)}: ${formatFull(d.totalTokens)} tokens, ${formatFull(d.messages)} messages`}
                className="outline-none focus-visible:stroke-purple-500"
                strokeWidth="2"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
              />
            </g>
          );
        })}

        {labelIdx.map((i) => (
          <text
            key={i}
            x={PAD_L + (i + 0.5) * slot}
            y={H - 6}
            textAnchor={i === 0 ? "start" : i === days.length - 1 ? "end" : "middle"}
            className="fill-gray-500 text-[10px] dark:fill-[#8A8A93]"
          >
            {formatDay(days[i].date)}
          </text>
        ))}
      </svg>

      {activeDay && (
        <div
          role="status"
          className="pointer-events-none absolute top-0 z-10 w-max max-w-[200px] -translate-x-1/2 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs shadow-md dark:border-white/10 dark:bg-[#1a1a1f]"
          style={{ left: `${Math.min(Math.max(tipLeft, 15), 85)}%` }}
        >
          <p className="font-medium text-gray-900 dark:text-gray-100">{formatDay(activeDay.date)}</p>
          <p className="text-gray-600 dark:text-gray-300">{formatFull(activeDay.totalTokens)} tokens</p>
          <p className="text-gray-500 dark:text-[#8A8A93]">{formatFull(activeDay.messages)} messages</p>
        </div>
      )}
    </div>
  );
}

/** The same numbers as a table, for screen readers and anyone who prefers rows. */
export function UsageDailyTable({ daily }) {
  const rows = (Array.isArray(daily) ? daily : []).slice().reverse();
  return (
    <div className={`max-h-64 overflow-auto ${THIN_SCROLL_CLASS}`}>
      <table className="w-full text-left text-sm">
        <thead className="text-xs text-gray-500 dark:text-[#8A8A93]">
          <tr>
            <th className="py-1 font-medium">{COPY.colDate}</th>
            <th className="py-1 text-right font-medium">{COPY.colMessages}</th>
            <th className="py-1 text-right font-medium">{COPY.colTokens}</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 dark:text-gray-200">
          {rows.map((d) => (
            <tr key={d.date} className="border-t border-gray-100 dark:border-white/5">
              <td className="py-1">{formatDay(d.date)}</td>
              <td className="py-1 text-right tabular-nums">{formatFull(d.messages)}</td>
              <td className="py-1 text-right tabular-nums">{formatFull(d.totalTokens)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
