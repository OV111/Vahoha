import { useEffect, useRef } from "react";
import { FLOW_DOTS, HOP_SECONDS } from "@/constants/projectMapFlowDots";

const TOUCH_REST_MS = 20; // between frames on phones, about 30 a second: smooth enough for dots, and half the battery
const PAUSED_REST_MS = 100; // how often to look whether it was played again, or the map changed
const MAX_FRAME_SECONDS = 0.1; // a background tab must not skip ahead when it comes back

/**
 * Moves the dots of a simulated timeline (lib/simulation.js) every frame,
 * written straight to the DOM so React doesn't re-render 60 times a second.
 * Runs only while the canvas is on screen.
 *
 * @param {object | null} timeline what to play, or null for nothing
 * @param {(edgeId: string, t: number) => {x: number, y: number} | null} place a point along a wire
 * @param {{ current: { clock: number, paused: boolean } }} control owned by the caller's play and replay buttons
 * @param {{ current: Element | null }} rootRef the canvas, to know when it is scrolled out of view
 * @returns refs to fill: dots ("edge:lane" -> circle), wires (edge -> drawn path)
 */
export default function useFlowPlayback(timeline, place, control, rootRef) {
  const dots = useRef(new Map());
  const wires = useRef(new Map());
  const latest = useRef(null);
  useEffect(() => {
    latest.current = { timeline, place };
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let shown = new Set();
    let held = new Set();
    let typeOf = new WeakMap(); // circle -> the move type it is painted as
    let drawn = null; // what the last frame drew: nothing to do while paused and unchanged
    const rest = window.matchMedia("(pointer: coarse)").matches ? TOUCH_REST_MS : 0;
    let timer = null;
    let last = performance.now();
    let frame = null;

    // Asking for a frame makes the browser produce one, so it sleeps in between instead of skipping frames.
    const ask = (ms) => {
      const request = () => {
        frame = requestAnimationFrame(tick);
      };
      if (ms) timer = setTimeout(request, ms);
      else request();
    };

    const tick = (now) => {
      draw(now);
      ask(control.current.paused ? PAUSED_REST_MS : rest);
    };

    const draw = (now) => {
      const dt = Math.min((now - last) / 1000, MAX_FRAME_SECONDS);
      last = now;
      const { timeline: plan, place: at } = latest.current;
      if (!plan) return;
      if (!control.current.paused) control.current.clock += dt;
      const { clock } = control.current;
      if (drawn?.clock === clock && drawn.latest === latest.current) return;
      drawn = { clock, latest: latest.current };
      const hop = plan.length ? (clock / HOP_SECONDS) % plan.length : 0;

      const nextShown = new Set();
      const nextHeld = new Set();
      for (const m of plan.moves) {
        if (m.start > hop) break; // sorted by start
        const t = hop - m.start;
        if (t >= 1) continue;
        const dot = dots.current.get(`${m.edge}:${m.lane}`);
        const p = dot && at(m.edge, m.back ? 1 - t : t);
        if (!p) continue;
        if (typeOf.get(dot) !== m.type) {
          const { color, ring } = FLOW_DOTS[m.type];
          dot.setAttribute("fill", ring ? "#0a0a0a" : color);
          dot.setAttribute("stroke", ring ? color : "#0a0a0a");
          dot.setAttribute("stroke-width", ring ? 2 : 1);
          typeOf.set(dot, m.type);
        }
        // Position and visibility, not transform and opacity: on SVG those make the browser manage a layer per dot.
        dot.setAttribute("cx", p.x.toFixed(1));
        dot.setAttribute("cy", p.y.toFixed(1));
        if (!shown.has(dot)) dot.setAttribute("visibility", "visible");
        nextShown.add(dot);
        nextHeld.add(m.edge);
      }
      for (const dot of shown) if (!nextShown.has(dot)) dot.setAttribute("visibility", "hidden");
      for (const id of held) if (!nextHeld.has(id)) wires.current.get(id)?.classList.remove("pm-held");
      for (const id of nextHeld) if (!held.has(id)) wires.current.get(id)?.classList.add("pm-held");
      shown = nextShown;
      held = nextHeld;
    };

    let running = false;
    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      ask(0);
    };
    const stop = () => {
      running = false;
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
    start();
    const root = rootRef.current;
    const watcher = root && new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    watcher?.observe(root);
    return () => {
      watcher?.disconnect();
      stop();
    };
  }, [control, rootRef]);

  return { dots, wires };
}
