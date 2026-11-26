export function SoonTag({ className = "" }) {
  return (
    <span
      className={`inline-block rounded-full border border-purple-500/40 px-1.5 py-px text-[10px] font-medium tracking-wide text-purple-300 uppercase ${className}`}
    >
      Soon
    </span>
  );
}
