import { OWNER_COPY } from "@/constants/projectMap";

export const PAGE = "mx-auto max-w-[1500px] px-4 pt-4 pb-16 sm:px-6 sm:pt-6";
export const CANVAS =
  "relative h-[max(340px,min(66svh,600px))] scroll-mt-20 overflow-hidden rounded-2xl border border-neutral-800 bg-[#050505] sm:h-[480px] lg:h-[calc(100vh-14rem)] lg:min-h-[480px]";

export default function MapHeader({ ownerType, status, children }) {
  const copy = OWNER_COPY[ownerType] ?? OWNER_COPY.personal;
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-300">{copy.eyebrow}</p>
      <h1 className="mt-1 text-xl font-extrabold text-white sm:text-3xl">{copy.title}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-300 max-sm:hidden">{copy.pitch}</p>
      <p className="mt-1 min-h-4 text-xs text-neutral-400" role="status">
        {status}
      </p>
      {children}
    </div>
  );
}
