/**
 * One badge for the whole feature: catalog cards, the Arena header and the
 * proposal review page. Callers pick a tone, never raw colors, so every
 * "+50 XP" or "DEBUG" looks the same wherever it appears.
 */

const TONES = {
  neutral: "text-[#a1a1aa] bg-white/[0.03] border-white/[0.08]",
  purple: "text-purple-300 bg-purple-500/10 border-purple-500/25",
  xp: "text-purple-600 bg-purple-600/10 border-purple-600/30",
  green: "text-emerald-300 bg-emerald-500/10 border-emerald-500/25",
  amber: "text-amber-300 bg-amber-500/10 border-amber-500/25",
  orange: "text-orange-300 bg-orange-500/10 border-orange-500/25",
  red: "text-rose-300 bg-rose-500/10 border-rose-500/25",
  blue: "text-sky-300 bg-sky-500/10 border-sky-500/25",
};

export default function Badge({ tone = "neutral", icon: Icon, mono = false, className = "", children }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-[10px] font-semibold leading-none tracking-wide ${
        mono ? "font-mono" : ""
      } ${TONES[tone] ?? TONES.neutral} ${className}`}
    >
      {Icon && <Icon size={10} strokeWidth={2.5} aria-hidden="true" />}
      {children}
    </span>
  );
}
