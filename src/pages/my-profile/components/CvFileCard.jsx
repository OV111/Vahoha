import { useRef, useState } from "react";
import { ExternalLink, FileText, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

const KINDS = {
  PDF: { name: "PDF document", color: "#a855f7" },
  DOC: { name: "Word document", color: "#3b82f6" },
  DOCX: { name: "Word document", color: "#3b82f6" },
};
const FALLBACK_KIND = { name: "Document", color: "#9ca3af" };

// A visible button with an invisible 44px tap area on mobile.
const BTN =
  "relative flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 disabled:opacity-50 max-md:after:absolute max-md:after:-inset-1";

function FileTile({ color, dimmed = false }) {
  return (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${dimmed ? "opacity-40" : ""}`}
      style={{ background: `${color}22`, color }}
    >
      <FileText size={22} strokeWidth={1.75} aria-hidden="true" />
    </div>
  );
}

/**
 * The card only shows what the server has: `cvUrl` from the profile. While an
 * upload or removal runs it shows a busy state, so a failed upload never looks
 * like a saved one. `onUpload(file)` and `onRemove()` return promises.
 *
 * The stored file name is a generated id ("ac8s26ra04vk2e4qub6h.pdf"), which
 * says nothing to the person or to a recruiter, so the card is titled by what
 * the file is and keeps the raw name only as a tooltip.
 */
export default function CvFileCard({ editable = false, cvUrl = null, onUpload, onRemove }) {
  const [busy, setBusy] = useState(null); // null | "uploading" | "removing"
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const fileName = cvUrl ? decodeURIComponent(cvUrl.split("/").pop()) : null;
  const ext = fileName?.split(".").pop()?.toUpperCase() ?? "PDF";
  const kind = KINDS[ext] ?? FALLBACK_KIND;

  const run = async (kind, action) => {
    setBusy(kind);
    try {
      await action();
    } finally {
      setBusy(null);
      setConfirmRemove(false);
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
      <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
        <div className="flex items-center gap-3">
          <FileTile color={kind.color} />
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-semibold text-neutral-100" title={fileName}>
              Resume
            </p>
            <p className="mt-0.5 text-[12px] text-neutral-400">{kind.name}</p>
          </div>
        </div>

        {editable && confirmRemove ? (
          <div className="flex items-center gap-2">
            <p className="flex-1 text-[13px] text-neutral-300">Remove this resume?</p>
            <button
              type="button"
              disabled={busy !== null}
              onClick={() => run("removing", () => onRemove?.())}
              className={`${BTN} border-red-500/40 bg-red-500/10 text-red-300 hover:bg-red-500/20`}
            >
              {busy === "removing" ? "Removing…" : "Remove"}
            </button>
            <button
              type="button"
              disabled={busy !== null}
              onClick={() => setConfirmRemove(false)}
              className={`${BTN} border-white/10 text-neutral-300 hover:border-white/25 hover:text-white`}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <a
              href={cvUrl}
              target="_blank"
              rel="noreferrer"
              className={`${BTN} flex-1 border-purple-500/40 bg-purple-500/10 text-purple-200 hover:border-purple-400 hover:bg-purple-500/20 hover:text-white`}
            >
              View resume
              <ExternalLink size={14} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            {editable && (
              <button
                type="button"
                disabled={busy !== null}
                onClick={() => setConfirmRemove(true)}
                aria-label="Remove resume"
                title="Remove resume"
                className={`${BTN} border-white/10 px-2.5 text-neutral-400 hover:border-red-500/50 hover:text-red-400`}
              >
                <Trash2 size={15} aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // ── Empty / upload state ────────────────────────────────────────────────────
  if (!editable) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-white/10 px-3 py-6 text-center">
        <FileTile color={FALLBACK_KIND.color} dimmed />
        <p className="text-[13px] text-neutral-400">No resume uploaded yet</p>
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
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
          <UploadCloud size={22} strokeWidth={1.75} aria-hidden="true" />
        </div>
        <div className="text-center">
          <p className="text-[14px] font-medium text-purple-300">
            {busy === "uploading" ? "Uploading…" : "Upload your resume"}
          </p>
          <p className="mt-0.5 text-[12px] text-neutral-400">Click or drag a file here</p>
          <p className="mt-1 text-[12px] text-neutral-500">PDF, DOC or DOCX, up to 10 MB</p>
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
