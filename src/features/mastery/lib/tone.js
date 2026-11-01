// Text and surface colours shared by the progress components, so each one
// doesn't repeat the same light/dark pairs. The page itself is pinned to dark
// (see ProgressPage); the light values are there for when MainLayout gets a
// light background.

export const TEXT = "text-zinc-900 dark:text-[#F7F7F8]";
export const MUTED = "text-zinc-500 dark:text-[#A1A0AB]";
export const SOFT = "text-zinc-700 dark:text-[#D4D4DC]";
export const BORDER = "border-zinc-200 dark:border-white/10";
export const SURFACE = "bg-white dark:bg-zinc-950";
export const CHIP = "rounded bg-zinc-100 px-1.5 py-0.5 text-[11px] text-zinc-700 dark:bg-zinc-800 dark:text-[#D4D4DC]";
export const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500";
