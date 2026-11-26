import { useEffect } from "react";
import { ServerOff, WifiOff, Wrench } from "lucide-react";
import useServerStatusStore from "@/stores/useServerStatusStore";
import useAuthStore from "@/stores/useAuthStore";
import { SERVER_CHECKING, SERVER_RETRY, SERVER_STATUS_COPY } from "@/constants/serverStatus";

const ICONS = { down: ServerOff, offline: WifiOff, maintenance: Wrench };


export default function ServerDown() {
  const { status, checking, check, setPageBlocked } = useServerStatusStore();
  const retrySession = useAuthStore((s) => s.retryNow);
  const kind = status === "up" ? "down" : status;
  const Icon = ICONS[kind];
  const copy = SERVER_STATUS_COPY[kind];

  useEffect(() => {
    setPageBlocked(true);
    return () => setPageBlocked(false);
  }, [setPageBlocked]);

  const retry = async () => {
    await check();
    retrySession();
  };

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-6 text-center" role="alert">
      <Icon size={36} strokeWidth={1.5} className="text-purple-400" aria-hidden="true" />
      <h1 className="mt-5 text-xl font-semibold text-white">{copy.title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-neutral-400">{copy.body}</p>
      <button
        type="button"
        onClick={retry}
        disabled={checking}
        className="mt-6 min-h-11 min-w-32 cursor-pointer rounded-full bg-white px-5 text-sm font-medium text-black transition hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 disabled:cursor-wait disabled:opacity-60"
      >
        {checking ? SERVER_CHECKING : SERVER_RETRY}
      </button>
    </section>
  );
}
