import { useEffect, useRef, useState } from "react";
import { Plus, Image as ImageIcon, FileText, LoaderCircle } from "lucide-react";

export const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;

const ITEM =
  "flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-white/80 transition-colors hover:bg-white/10";

// "+" button with a small menu: Photo / File. Each opens the native picker
// (hidden <input type=file>), so the OS handles browsing, and on mobile it
// offers the camera and gallery.
export default function AttachMenu({ onFile, busy }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const photoRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // lets the same file be picked again later
    setOpen(false);
    if (file) onFile(file);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Attach a photo or file"
        aria-haspopup="menu"
        aria-expanded={open}
        disabled={busy}
        onClick={() => setOpen((o) => !o)}
        className="relative flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[#8A8A93] transition-colors after:absolute after:-inset-1 hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? (
          <LoaderCircle size={20} className="animate-spin" />
        ) : (
          <Plus size={20} className={`transition-transform ${open ? "rotate-45" : ""}`} />
        )}
      </button>
      {open && (
        <div
          role="menu"
          className="absolute bottom-full left-0 z-10 mb-2 w-40 rounded-2xl border border-white/10 bg-black/95 p-1 shadow-xl shadow-black/40 backdrop-blur-sm"
        >
          <button type="button" role="menuitem" className={ITEM} onClick={() => photoRef.current?.click()}>
            <ImageIcon size={16} className="text-purple-600" /> Photo
          </button>
          <button type="button" role="menuitem" className={ITEM} onClick={() => fileRef.current?.click()}>
            <FileText size={16} className="text-purple-600" /> File
          </button>
        </div>
      )}
      <input ref={photoRef} type="file" accept="image/jpeg,image/png,image/gif,image/webp" hidden onChange={pick} />
      <input
        ref={fileRef}
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        hidden
        onChange={pick}
      />
    </div>
  );
}
