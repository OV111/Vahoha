const MOBILE_FACTS = 2;

/**
 * The pill above the catalog heading: a live dot, then short facts separated by
 * dots. The first fact is the lead (the challenge count) and is brighter.
 * The dot only pulses for people who allow motion.
 */
export default function EyebrowBadge({ items }) {
  const facts = items.filter(Boolean);
  if (facts.length === 0) return null;

  return (
    <p className="inline-flex max-w-full flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-purple-500/20 bg-purple-500/[0.06] px-3 py-1.5 text-xs text-zinc-400 select-none">
      <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
        <span className="absolute inset-0 rounded-full bg-purple-400 opacity-60 motion-safe:animate-ping" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-purple-400" />
      </span>
      {facts.map((fact, i) => (
        // Each fact carries its own separator, so a wrap can never strand a "·"
        // at a line end. Past the first two, facts wait for wider screens: on a
        // phone the pill stays one line instead of a lumpy two-line blob.
        <span
          key={fact}
          className={`items-center gap-2 whitespace-nowrap ${i >= MOBILE_FACTS ? "hidden sm:inline-flex" : "inline-flex"}`}
        >
          {i > 0 && (
            <span className="text-zinc-600" aria-hidden="true">
              ·
            </span>
          )}
          <span className={i === 0 ? "font-medium text-zinc-200" : undefined}>{fact}</span>
        </span>
      ))}
    </p>
  );
}
