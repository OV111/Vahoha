import { useEffect, useRef } from "react";
import { toast } from "sonner";
import useServerStatus from "@/stores/useServerStatus";
import useAuthStore from "@/stores/useAuthStore";
import { SERVER_BACK, SERVER_CHECKING, SERVER_REFRESH, SERVER_RETRY, SERVER_STATUS_COPY } from "../../../constants/serverStatus";

/**
 * Says the server can't be reached without taking the page away: what is already
 * on screen, and anything half typed, stays. Nothing reloads by itself afterwards.
 */
export default function ServerBanner() {
  const { status, checking, check, pageBlocked } = useServerStatus();
  const retrySession = useAuthStore((s) => s.retryNow);
  const previous = useRef(status);

  useEffect(() => {
    const wasDown = previous.current !== "up";
    previous.current = status;
    if (status !== "up" || !wasDown) return;
    retrySession();
    toast.success(SERVER_BACK, {
      id: "server-back",
      action: { label: SERVER_REFRESH, onClick: () => window.location.reload() },
    });
  }, [status, retrySession]);

  // The live region is always there: screen readers only announce changes inside one.
  return (
    <div role="status" className="pointer-events-none fixed inset-x-0 bottom-[calc(var(--banner-lift,1rem)+env(safe-area-inset-bottom))] z-60 flex justify-center px-4">
      {status !== "up" && !pageBlocked && (
        <div className="pointer-events-auto flex max-w-full items-center gap-3 rounded-full border border-amber-500/40 bg-[#0d0d0d] py-1.5 pr-1.5 pl-4 text-sm text-neutral-200 shadow-lg shadow-black/50">
          <span className="size-2 shrink-0 rounded-full bg-amber-400" aria-hidden="true" />
          <span>{SERVER_STATUS_COPY[status].banner}</span>
          <button
            type="button"
            onClick={check}
            disabled={checking}
            className="min-h-11 shrink-0 cursor-pointer rounded-full px-4 text-sm font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-purple-400 disabled:cursor-wait disabled:opacity-60 sm:min-h-9"
          >
            {checking ? SERVER_CHECKING : SERVER_RETRY}
          </button>
        </div>
      )}
    </div>
  );
}
