import { useCallback, useId, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react"; // eslint-disable-line no-unused-vars

// Below this width there is no room to swing, so the road runs straight down the left.
const WIDE_QUERY = "(min-width: 768px)";
const NARROW_ROAD_X = 14;
const NARROW_ANCHOR_Y = 26; // level with a card's status circle

const PURPLE = "#a855f7";
const AHEAD = "#525252";

/**
 * Where the road touches each stop, from layout positions (offset*). Side
 * cards connect on the edge that faces the
 * middle: in near the top, out near the bottom. Centre stops connect top and
 * bottom.
 */
function anchorsFor(el, side, wide) {
  const left = el.offsetLeft;
  const top = el.offsetTop;
  const w = el.offsetWidth;
  const h = el.offsetHeight;

  if (!wide) {
    const p = { x: NARROW_ROAD_X, y: top + NARROW_ANCHOR_Y };
    return { entry: p, exit: p, dots: [p] };
  }
  if (side === "center") {
    const entry = { x: left + w / 2, y: top };
    return { entry, exit: { x: left + w / 2, y: top + h }, dots: [entry] };
  }
  const x = side === "left" ? left + w : left;
  const entry = { x, y: top + h * 0.35 };
  const exit = { x, y: top + h * 0.65 };
  return { entry, exit, dots: [entry, exit] };
}

/** One curve from a stop's exit to the next stop's entry, as an SVG command. */
function segment(a, b, toCenter, wide) {
  if (!wide || Math.abs(a.x - b.x) < 1) return `L ${b.x} ${b.y}`;
  if (toCenter) {
    // Out sideways, then bend down into the top of a centre card.
    return `C ${b.x} ${a.y}, ${b.x} ${(a.y + b.y) / 2}, ${b.x} ${b.y}`;
  }
  // Leave and arrive flat, like a connector: control points share the middle x.
  const midX = (a.x + b.x) / 2;
  return `C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`;
}

/**
 * The road as one SVG path. Between a card's entry and exit the road is
 * hidden by the card, so the visible road jumps there (`M`). The scroll mask
 * must not jump: SVG restarts dashing at every subpath, and pathLength is
 * drawn with dashing, so a jumping mask fills every piece at once. The mask
 * joins entry to exit with a line (`L`) behind the card instead.
 */
function buildPath(stops, anchors, wide, continuous = false) {
  if (anchors.length < 2) return "";
  let d = `M ${anchors[0].exit.x} ${anchors[0].exit.y}`;
  for (let i = 1; i < anchors.length; i++) {
    d += ` ${segment(anchors[i - 1].exit, anchors[i].entry, stops[i].side === "center", wide)}`;
    if (i < anchors.length - 1) d += ` ${continuous ? "L" : "M"} ${anchors[i].exit.x} ${anchors[i].exit.y}`;
  }
  return d;
}

/**
 * A winding road through the layer. Each stop is { key, side, node }, where
 * side is "left", "right" or "center". The road fills with purple as the
 * learner scrolls; the part leading up to `nextIndex` (what is already done)
 * is a brighter, glowing purple on top.
 *
 * The stops stay a real <ol>, so screen readers get a plain ordered list;
 * the road is decoration and hidden from them.
 */
export default function LayerPath({ stops, nextIndex }) {
  const uid = useId().replace(/:/g, "");
  const containerRef = useRef(null);
  const stopRefs = useRef([]);
  const [geo, setGeo] = useState({ d: "", maskD: "", dots: [], width: 0, height: 0, doneY: 0, wide: true });
  const reduceMotion = useReducedMotion();

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const wide = window.matchMedia(WIDE_QUERY).matches;
    // The cards' offsetParent is the <ol>, which sits at the container's origin,
    // so offset* positions are already in the SVG's coordinates.
    const anchors = stopRefs.current
      .slice(0, stops.length)
      .map((el, i) => (el ? anchorsFor(el, stops[i].side, wide) : null))
      .filter(Boolean);
    const doneY = nextIndex > 0 && anchors[nextIndex] ? anchors[nextIndex].entry.y : 0;
    setGeo({
      d: buildPath(stops, anchors, wide),
      maskD: buildPath(stops, anchors, wide, true),
      dots: anchors.slice(1).flatMap((a) => a.dots).concat(anchors[0] ? [anchors[0].exit] : []),
      width: container.offsetWidth,
      height: container.offsetHeight,
      doneY,
      wide,
    });
  }, [stops, nextIndex]);

  useLayoutEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(containerRef.current);
    stopRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [measure]);

  // 0 when the road's top reaches 80% down the screen, 1 when its end does.
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 80%", "end 80%"] });
  const revealed = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  const { d, maskD, dots, width, height, doneY, wide } = geo;
  const ids = { mask: `road-mask-${uid}`, done: `road-done-${uid}`, glow: `road-glow-${uid}` };

  return (
    <div ref={containerRef} className="relative">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-visible"
        width={width}
        height={height}
        viewBox={`0 0 ${width || 1} ${height || 1}`}
        fill="none"
      >
        <defs>
          {/* Scrolling draws this mask, and the mask reveals the purple fill. A mask
              instead of pathLength on the fill itself keeps the round caps and lets
              the fill be any stroke style later (pathLength works through dasharray). */}
          <mask id={ids.mask} maskUnits="userSpaceOnUse" x="-20" y="-20" width={width + 40} height={height + 40}>
            <motion.path
              d={maskD}
              stroke="white"
              strokeWidth="16"
              strokeLinecap="round"
              style={{ pathLength: reduceMotion ? 1 : revealed }}
            />
          </mask>
          <clipPath id={ids.done}>
            <rect x="-20" y="-20" width={width + 40} height={Math.max(doneY + 20, 0)} />
          </clipPath>
          <filter id={ids.glow} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>

        {/* The road and its dashed centre stripe are always there; nothing waits on scrolling to exist. */}
        <path d={d} stroke="#161616" strokeWidth="12" strokeLinecap="round" />
        <path d={d} stroke={AHEAD} strokeWidth="1.5" strokeDasharray="7 9" strokeLinecap="round" />

        {/* Scrolling fills the road with purple. */}
        <g mask={`url(#${ids.mask})`}>
          <path d={d} stroke={PURPLE} strokeWidth="2.5" strokeOpacity="0.6" strokeLinecap="round" />
        </g>

        {/* Finished lessons: brighter and glowing, so progress stands out from scroll position. */}
        <g clipPath={`url(#${ids.done})`}>
          <path d={d} stroke={PURPLE} strokeWidth="6" strokeOpacity="0.45" filter={`url(#${ids.glow})`} />
          <path d={d} stroke={PURPLE} strokeWidth="3.5" strokeLinecap="round" />
        </g>

        {/* Where the road meets a card. */}
        {dots.map((p) => {
          const done = p.y <= doneY;
          return (
            <circle
              key={`${p.x}-${p.y}`}
              cx={p.x}
              cy={p.y}
              r="4.5"
              fill={done ? PURPLE : "#000"}
              stroke={done ? PURPLE : AHEAD}
              strokeWidth="2"
            />
          );
        })}
      </svg>

      <ol className="relative flex flex-col gap-14 md:gap-20">
        {stops.map((stop, i) => {
          const align = !wide || stop.side === "center" ? "justify-center" : stop.side === "left" ? "justify-start" : "justify-end";
          // Side cards keep a readable width; the road crosses the space between them.
          const cardWidth = !wide ? "w-full" : stop.side === "center" ? "w-full max-w-3xl" : "w-[42%]";
          return (
            <li key={stop.key} className={`flex ${align} ${wide ? "" : "pl-8"}`}>
              {/* Cards don't animate: the road is drawn to where they sit, and a card
                  sliding in would leave its connector dot hanging in empty space. */}
              <div ref={(el) => (stopRefs.current[i] = el)} className={cardWidth}>
                {stop.node}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
