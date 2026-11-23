export default function MapAlerts({ conflict, isTeam, notice, info }) {
  return (
    <>
      {conflict && (
        <p role="alert" className="mt-3 flex flex-wrap items-center gap-3 rounded-lg bg-amber-500/10 px-3 py-2 text-sm text-amber-300">
          {isTeam ? "A teammate changed the same part you did" : "This map was changed in another tab or device"}, so your edits here are no longer being saved.
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="min-h-11 cursor-pointer rounded-lg border border-amber-500/40 px-3 hover:bg-amber-500/10"
          >
            Reload the latest
          </button>
        </p>
      )}

      {notice && (
        <p role="alert" className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {notice}
        </p>
      )}

      {info && (
        <p role="status" className="mt-3 rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
          {info}
        </p>
      )}
    </>
  );
}
