// Shared Tailwind class strings for surfaces that have no component of their own.

/**
 * The card surface: near-black, hairline border, a faint top light and a
 * neutral drop shadow. Colour is reserved for state (badges, bars), never for
 * surfaces.
 */
export const SURFACE =
  "rounded-2xl border border-white/[0.08] bg-neutral-950 bg-gradient-to-b from-white/[0.03] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_24px_48px_-28px_rgba(0,0,0,0.8)]";

/**
 * The text-input style. A 4% white wash keeps the fill neutral on any dark
 * surface. Focus is a visible purple border + ring, never `outline-none` alone.
 */
export const INPUT_CLASS =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-base md:text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-100 dark:placeholder:text-[#8A8A93] dark:hover:border-white/20 dark:focus:border-purple-500 dark:scheme-dark";
