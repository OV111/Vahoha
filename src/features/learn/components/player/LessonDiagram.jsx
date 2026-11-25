import { useId } from "react";
import { DIAGRAMS } from "../../content/diagrams";

const TONES = {
  hot: "fill-[#3b1d6b] stroke-[#a970ff]",
  scope: "fill-[#a970ff]/5 stroke-[#4a3d66] [stroke-dasharray:5_5]",
  plain: "fill-[#241c35] stroke-[#5b4c7c]",
};

function Box({ box: [x, y, width, height, text, tone = "plain"] }) {
  return (
    <>
      <rect x={x} y={y} width={width} height={height} rx="9" strokeWidth="1.5" className={TONES[tone]} />
      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-white font-mono text-[15px]"
      >
        {text}
      </text>
    </>
  );
}

/** The picture for a step, on a dotted board so it reads as drawn, not as another text card. */
export default function LessonDiagram({ name }) {
  const arrow = `arrow-${useId().replace(/:/g, "")}`;
  const { size, alt, boxes, wires, notes } = DIAGRAMS[name];
  // Containers first, so a wire that starts inside one is drawn over its fill.
  const scopes = boxes.filter((b) => b[5] === "scope");
  const things = boxes.filter((b) => b[5] !== "scope");

  return (
    <div className="lesson-board rounded-xl p-5 sm:p-7">
      <svg viewBox={`-2 0 ${size[0] + 4} ${size[1]}`} role="img" aria-label={alt} className="mx-auto w-full max-w-xl">
        <defs>
          <marker id={arrow} viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" className="fill-[#b9a6dc]" />
          </marker>
        </defs>
        {scopes.map((box) => (
          <Box key={box.join()} box={box} />
        ))}
        {wires.map((d) => (
          <path key={d} d={d} fill="none" strokeWidth="2" className="stroke-[#b9a6dc]" markerEnd={`url(#${arrow})`} />
        ))}
        {things.map((box) => (
          <Box key={box.join()} box={box} />
        ))}
        {notes.map(([x, y, text]) => (
          <text key={text} x={x} y={y} className="fill-[#c9bedd] text-[15px]">
            {text}
          </text>
        ))}
      </svg>
    </div>
  );
}
