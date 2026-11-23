import { useRef, useState } from "react";
import { Box, History, Redo2, RotateCcw, ScanSearch, Undo2, Upload } from "lucide-react";
import ExportMenu from "./ExportMenu";
import ShareControl from "./ShareControl";

const button =
  "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-neutral-700 px-3 text-sm text-neutral-200 transition-colors hover:border-neutral-500 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-400";

// Phones get a 44px square with just the icon; the text comes back from sm up.
const iconOnPhone = "max-sm:w-11 max-sm:justify-center max-sm:px-0";
const iconOnly = `${button} w-11 justify-center px-0 disabled:cursor-default disabled:opacity-40`;

const Divider = () => <span aria-hidden="true" className="mx-1 h-6 w-px bg-neutral-800" />;

// Ordered by how often each is used: building the map on the left, then
// editing; keeping and sharing it on the right; the destructive reset last.
export default function MapToolbar({ remote, isTeam, scanOpen, onToggleScan, view3d, onToggle3d, history, onTravel, historyOpen, onToggleHistory, onImport, onExport, exporting, onReset }) {
  const fileRef = useRef(null);
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        className={`${button} border-purple-500/60 bg-purple-600 text-white hover:border-purple-400 hover:bg-purple-500`}
        aria-expanded={scanOpen}
        data-tour="map-scan"
        onClick={onToggleScan}
      >
        <ScanSearch size={14} aria-hidden="true" />
        <span className="sm:hidden">Scan repo</span>
        <span className="hidden sm:inline">Suggest from my repo</span>
      </button>
      <button
        type="button"
        className={`${button} ${iconOnPhone} ${view3d ? "border-purple-400 text-white" : ""}`}
        onClick={onToggle3d}
        aria-pressed={view3d}
        data-tour="map-3d"
        title={view3d ? "Switch to the flat view" : "Switch to the 3D view"}
      >
        <Box size={14} aria-hidden="true" /> <span className="max-sm:hidden">3D view</span>
      </button>

      <Divider />

      <button type="button" className={iconOnly} onClick={() => onTravel("undo")} disabled={!history.undo} aria-label="Undo" title="Undo (Ctrl+Z)">
        <Undo2 size={14} aria-hidden="true" />
      </button>
      <button type="button" className={iconOnly} onClick={() => onTravel("redo")} disabled={!history.redo} aria-label="Redo" title="Redo (Ctrl+Shift+Z)">
        <Redo2 size={14} aria-hidden="true" />
      </button>

      <div className="flex flex-wrap items-center gap-2 sm:ml-auto" data-tour="map-keep">
        {remote && (
          <button
            type="button"
            className={`${button} ${iconOnPhone}`}
            aria-expanded={historyOpen}
            onClick={onToggleHistory}
            aria-label="History"
            title="History"
          >
            <History size={14} aria-hidden="true" /> <span className="max-sm:hidden">History</span>
          </button>
        )}
        <button type="button" className={`${button} ${iconOnPhone}`} onClick={() => fileRef.current.click()} aria-label="Import" title="Import">
          <Upload size={14} aria-hidden="true" /> <span className="max-sm:hidden">Import</span>
        </button>
        <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={onImport} />
        <ExportMenu onExport={onExport} disabled={exporting} buttonClass={`${button} ${iconOnPhone} disabled:cursor-wait disabled:opacity-60`} />
        {remote && !isTeam && <ShareControl mapId={remote.id} initialShared={remote.shared} initialPublicId={remote.publicId} />}

        <Divider />

        {confirmReset ? (
          <>
            <button
              type="button"
              className={`${button} border-red-500/50 text-red-300`}
              onClick={() => {
                setConfirmReset(false);
                onReset();
              }}
            >
              Replace my map
            </button>
            <button type="button" className={button} onClick={() => setConfirmReset(false)}>
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            className={`${button} ${iconOnPhone} hover:border-red-500/50 hover:text-red-300`}
            onClick={() => setConfirmReset(true)}
            aria-label="Start over"
            title="Start over"
          >
            <RotateCcw size={14} aria-hidden="true" /> <span className="max-sm:hidden">Start over</span>
          </button>
        )}
      </div>
    </div>
  );
}
