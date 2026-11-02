import { Construction, RefreshCw } from "lucide-react";

import LoadingSuspense from "@/components/feedback/LoadingSuspense";

// Loading, empty and error states for the roadmap tree. The loader keeps a
// fixed height so the footer doesn't jump up while the tree loads.

export const TreeLoading = () => (
  <div className="h-[60vh] w-full" aria-live="polite">
    <LoadingSuspense fill />
  </div>
);

export const TreeEmpty = () => (
  <div className="mt-20 flex flex-col items-center gap-3 px-6 text-center">
    <Construction size={32} className="text-neutral-500" aria-hidden="true" />
    <p className="text-sm font-semibold text-neutral-200">This roadmap is still being written</p>
    <p className="max-w-xs text-sm text-neutral-400">Its layers and lessons aren&rsquo;t ready yet. Pick another track, or check back soon.</p>
  </div>
);

export const TreeError = ({ onRetry }) => (
  <div className="mt-20 flex flex-col items-center gap-3 px-6 text-center" role="alert">
    <p className="text-sm font-semibold text-neutral-200">Couldn&rsquo;t load this roadmap</p>
    <p className="max-w-xs text-sm text-neutral-400">Check your connection and try again.</p>
    <button
      type="button"
      onClick={onRetry}
      className="mt-1 inline-flex min-h-11 items-center gap-2 rounded-lg border border-neutral-700 px-4 text-sm text-neutral-200 transition-colors duration-150 hover:border-purple-500/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
    >
      <RefreshCw size={14} aria-hidden="true" />
      Try again
    </button>
  </div>
);
