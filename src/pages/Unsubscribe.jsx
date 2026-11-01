import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { unsubscribeWithToken } from "@/services/emailPrefsApi";
import { WEEKLY_SUMMARY_COPY } from "../../constants/weeklySummary";

const COPY = WEEKLY_SUMMARY_COPY.unsubscribePage;

/**
 * Where the email's "Unsubscribe" link lands. A button, not an automatic
 * unsubscribe on load: mail scanners open links before the person does, and
 * the switch must only flip when a human asks for it.
 */
export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [state, setState] = useState(token ? "ready" : "invalid");

  const confirm = async () => {
    setState("saving");
    try {
      await unsubscribeWithToken(token);
      setState("done");
    } catch {
      setState("invalid");
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-8">
      <div className="w-full max-w-[440px] rounded-xl px-5 py-8 sm:px-8 dark:bg-zinc-900">
        <h1 className="mb-2 text-[22px] font-semibold leading-tight text-[#1a1f36] sm:text-[24px] dark:text-white">
          {COPY.title}
        </h1>

        {state === "done" && <p className="text-sm text-[#697386] dark:text-zinc-400">{COPY.done}</p>}
        {state === "invalid" && <p className="text-sm text-red-500">{COPY.invalid}</p>}
        {(state === "ready" || state === "saving") && (
          <>
            <p className="mb-6 text-sm text-[#697386] dark:text-zinc-400">{COPY.body}</p>
            <button
              type="button"
              onClick={confirm}
              disabled={state === "saving"}
              className="w-full cursor-pointer rounded-md bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-700 disabled:opacity-60"
            >
              {COPY.button}
            </button>
          </>
        )}

        {state !== "ready" && state !== "saving" && (
          <Link to="/my-profile/settings" className="mt-4 inline-block text-sm text-fuchsia-600 hover:underline dark:text-fuchsia-400">
            Open Settings
          </Link>
        )}
      </div>
    </div>
  );
}
