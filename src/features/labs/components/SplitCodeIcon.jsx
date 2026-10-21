import "./SplitCodeIcon.css";

// The lucide `</>` icon, drawn by hand so its parts can move, same motion as the
// home page "How it works" practice step: the brackets split apart and the slash
// vanishes, then the slash draws back in as the brackets close. Plays on hover of
// the nearest `.group` ancestor (the room card); static anywhere else.
export default function SplitCodeIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      overflow="visible"
      aria-hidden="true"
      className={`split-code ${className}`}
    >
      <path className="split-code-left" d="m6 8-4 4 4 4" />
      <path className="split-code-right" d="m18 16 4-4-4-4" />
      <path className="split-code-slash" d="m14.5 4-5 16" pathLength="1" />
    </svg>
  );
}

// Tells the room card this icon animates itself, so it skips the generic tilt.
SplitCodeIcon.selfAnimated = true;
