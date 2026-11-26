import { lazy, Suspense } from "react";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";

const NotFound = lazy(() => import("./NotFound"));

// A page's code failed to download: the connection dropped, or a new version was
// deployed and the old file is gone. Reloading fixes both. Browsers word it differently.
const CHUNK_ERROR = /dynamically imported module|importing a module script failed|unable to preload css/i;

/** Shown when a page crashes. Only a real 404 says "not found". */
export default function RouteError() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <Suspense fallback={null}>
        <NotFound />
      </Suspense>
    );
  }
  const chunk = CHUNK_ERROR.test(error?.message ?? "");

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-black px-6 text-center" role="alert">
      <h1 className="text-2xl font-semibold text-white">{chunk ? "This page didn't load" : "Something went wrong"}</h1>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-neutral-400">
        {chunk
          ? "Your connection dropped, or we just released a new version. Reloading usually fixes it."
          : "This page ran into an error. Reload it, or go back home."}
      </p>
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="min-h-11 cursor-pointer rounded-full bg-white px-5 text-sm font-medium text-black transition hover:bg-neutral-200"
        >
          Reload
        </button>
        <Link to="/" className="inline-flex min-h-11 items-center rounded-full border border-neutral-700 px-5 text-sm text-neutral-200 transition hover:border-neutral-500">
          Back to home
        </Link>
      </div>
    </div>
  );
}
