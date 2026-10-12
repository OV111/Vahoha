import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

function FileIcon({ label, color = "#9333ea" }) {
  return (
    <svg viewBox="0 0 56 70" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Page body */}
      <path
        d="M4 4C4 2.895 4.895 2 6 2H38L52 16V66C52 67.105 51.105 68 50 68H6C4.895 68 4 67.105 4 66V4Z"
        fill="#1a1a2e"
        stroke="#2a2a3e"
        strokeWidth="1.5"
      />
      {/* Folded corner */}
      <path d="M38 2L52 16H40C38.895 16 38 15.105 38 14V2Z" fill="#2d1f4e" stroke="#3b2060" strokeWidth="1.5" />
      {/* Extension badge */}
      <rect x="8" y="44" width="24" height="14" rx="3" fill={color} opacity="0.9" />
      <text x="20" y="54.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="white" fontFamily="monospace">
        {label}
      </text>
      {/* Lines */}
      <line x1="12" y1="26" x2="44" y2="26" stroke="#2a2a3e" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="32" x2="44" y2="32" stroke="#2a2a3e" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="38" x2="32" y2="38" stroke="#2a2a3e" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// Small visible buttons with an invisible 44px tap area on mobile.
const SMALL_BTN =
  "relative rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 disabled:opacity-50 max-md:after:absolute max-md:after:-inset-2";

/**
 * The card only shows what the server has: `cvUrl` from the profile. While an
 * upload or removal runs it shows a busy state, so a failed upload never looks
 * like a saved one. `onUpload(file)` and `onRemove()` return promises.
 */
export default function CvFileCard({ editable = false, cvUrl = null, onUpload, onRemove }) {
  const [busy, setBusy] = useState(null); // null | "uploading" | "removing"
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const fileName = cvUrl ? decodeURIComponent(cvUrl.split("/").pop()) : null;
  const ext = fileName?.split(".").pop()?.toUpperCase() ?? "PDF";
  const extColor = ext === "PDF" ? "#9333ea" : ext === "DOCX" || ext === "DOC" ? "#2563eb" : "#6b7280";

  const run = async (kind, action) => {
    setBusy(kind);
    try {
      await action();
    } finally {
      setBusy(null);
    }
  };

  const handleFile = (f) => {
    if (!f || busy) return;
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(f.type)) {
      toast.error("Only PDF or Word documents allowed");
      return;
    }
    if (f.size > MAX_SIZE) {
      toast.error("File must be under 10 MB");
      return;
    }
    run("uploading", () => onUpload?.(f));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  // ── Uploaded state ──────────────────────────────────────────────────────────
  if (cvUrl) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
        <div className="h-12 w-10 shrink-0">
          <FileIcon label={ext} color={extColor} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-semibold text-neutral-100" title={fileName}>
            {fileName}
          </p>
          <p className="mt-0.5 text-xs text-neutral-500">{ext}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-1.5">
          <a
            href={cvUrl}
            target="_blank"
            rel="noreferrer"
            className={`${SMALL_BTN} border-white/10 text-center text-neutral-300 hover:border-purple-400/50 hover:text-white`}
          >
            View ↗
          </a>
          {editable && (
            <button
              type="button"
              disabled={busy !== null}
              onClick={() => run("removing", () => onRemove?.())}
              className={`${SMALL_BTN} border-white/10 text-neutral-500 hover:border-red-500/50 hover:text-red-400`}
            >
              {busy === "removing" ? "Removing…" : "Remove"}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── Empty / upload state ────────────────────────────────────────────────────
  if (!editable) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-white/10 px-3 py-6 text-center">
        <div className="h-12 w-10 opacity-20">
          <FileIcon label="PDF" />
        </div>
        <p className="text-[13px] text-neutral-500">No CV uploaded yet</p>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      {/* A real button: reachable with Tab and opened with Enter/Space. */}
      <button
        type="button"
        disabled={busy !== null}
        onClick={() => inputRef.current?.click()}
        className={`flex w-full flex-col items-center gap-3 rounded-xl border border-dashed px-3 py-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 disabled:cursor-wait ${
          isDragging
            ? "border-purple-500 bg-purple-500/10"
            : "border-white/15 hover:border-purple-500/60 hover:bg-purple-500/5"
        }`}
      >
        <div className="h-12 w-10">
          <FileIcon label="PDF" />
        </div>
        <div className="text-center">
          <p className="text-[13px] font-medium text-purple-400">
            {busy === "uploading" ? "Uploading…" : "Upload your CV"}
          </p>
          <p className="mt-0.5 text-xs text-neutral-500">Click or drag a file here</p>
          <p className="mt-1 text-xs text-neutral-600">PDF, DOC or DOCX, up to 10 MB</p>
        </div>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = ""; // so picking the same file again still fires
        }}
      />
    </div>
  );
}
