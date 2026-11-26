import { useEffect, useState } from "react";
import { Check, Globe, Link2, Lock, Tag } from "lucide-react";
import { setSharing } from "@/features/system-map/systemMapApi";
import { captureEvent } from "@/lib/posthog";

const COPIED_MS = 1800;

const button =
  "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-neutral-700 px-3 text-sm text-neutral-200 transition-colors hover:border-neutral-500 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-400 disabled:cursor-wait disabled:opacity-60";

const publicMapUrl = (publicId) => `${window.location.origin}/map/${publicId}`;

// Markdown for a GitHub README: a badge that opens the map in 3D.
const readmeBadge = (publicId) =>
  `[![Architecture in 3D](https://img.shields.io/badge/architecture-view_in_3D-9333ea)](${publicMapUrl(publicId)})`;

export default function ShareControl({ mapId, initialShared, initialPublicId }) {
  const [sharing, setSharingState] = useState({ shared: initialShared, publicId: initialPublicId });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(null); // "link" | "badge" while its button says Copied
  const [manual, setManual] = useState(null); // text to copy by hand when the clipboard is blocked

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(null), COPIED_MS);
    return () => clearTimeout(id);
  }, [copied]);

  const toggle = async (shared) => {
    setBusy(true);
    setError(null);
    setCopied(null);
    setManual(null);
    try {
      const map = await setSharing(mapId, shared);
      setSharingState({ shared: Boolean(map.shared), publicId: map.publicId ?? null });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const copyText = async (what, text) => {
    try {
      await navigator.clipboard.writeText(text);
      captureEvent("share_created", { surface: "project_map", channel: what });
      setCopied(what);
      setManual(null);
    } catch {
      setManual(text);
    }
  };

  if (!sharing.shared || !sharing.publicId) {
    return (
      <>
        <button type="button" className={button} disabled={busy} onClick={() => toggle(true)}>
          <Globe size={14} aria-hidden="true" /> {busy ? "Sharing…" : "Share"}
        </button>
        {error && <p role="alert" className="basis-full text-sm text-red-300">{error}</p>}
      </>
    );
  }

  return (
    <>
      <span className="inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 text-sm text-emerald-300">
        <Globe size={14} aria-hidden="true" /> Public
      </span>
      <button type="button" className={button} onClick={() => copyText("link", publicMapUrl(sharing.publicId))}>
        {copied === "link" ? <Check size={14} aria-hidden="true" /> : <Link2 size={14} aria-hidden="true" />}
        {copied === "link" ? "Copied" : "Copy link"}
      </button>
      <button
        type="button"
        className={button}
        onClick={() => copyText("badge", readmeBadge(sharing.publicId))}
        title="A badge for your GitHub README that opens this map in 3D"
      >
        {copied === "badge" ? <Check size={14} aria-hidden="true" /> : <Tag size={14} aria-hidden="true" />}
        {copied === "badge" ? "Copied" : "README badge"}
      </button>
      <button type="button" className={button} disabled={busy} onClick={() => toggle(false)}>
        <Lock size={14} aria-hidden="true" /> {busy ? "Stopping…" : "Stop sharing"}
      </button>
      {manual && (
        <p className="basis-full text-sm text-neutral-300">
          Copy this: <span className="select-all break-all font-mono text-neutral-100">{manual}</span>
        </p>
      )}
      {error && <p role="alert" className="basis-full text-sm text-red-300">{error}</p>}
    </>
  );
}
