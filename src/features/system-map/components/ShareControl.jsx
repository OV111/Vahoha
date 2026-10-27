import { useEffect, useState } from "react";
import { Check, Globe, Link2, Lock } from "lucide-react";
import { setSharing } from "../systemMapApi";

const COPIED_MS = 1800;

const button =
  "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-neutral-700 px-3 text-sm text-neutral-200 transition-colors hover:border-neutral-500 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-400 disabled:cursor-wait disabled:opacity-60";

const publicMapUrl =(publicId) => `${window.location.origin}/map/${publicId}`;

/**
 * Share switch for a map saved in the account. Turning sharing on always makes
 * a new link, so "stop, then share again" is also how a leaked link is replaced.
 */
export default function ShareControl({ mapId, initialShared, initialPublicId }) {
  const [sharing, setSharingState] = useState({ shared: initialShared, publicId: initialPublicId });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [copy, setCopy] = useState("idle"); // idle | copied | manual

  useEffect(() => {
    if (copy !== "copied") return;
    const id = setTimeout(() => setCopy("idle"), COPIED_MS);
    return () => clearTimeout(id);
  }, [copy]);

  const toggle = async (shared) => {
    setBusy(true);
    setError(null);
    setCopy("idle");
    try {
      const map = await setSharing(mapId, shared);
      setSharingState({ shared: Boolean(map.shared), publicId: map.publicId ?? null });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(publicMapUrl(sharing.publicId));
      setCopy("copied");
    } catch {
      setCopy("manual"); // clipboard blocked: show the link so it can be copied by hand
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
      <button type="button" className={button} onClick={copyLink}>
        {copy === "copied" ? <Check size={14} aria-hidden="true" /> : <Link2 size={14} aria-hidden="true" />}
        {copy === "copied" ? "Copied" : "Copy link"}
      </button>
      <button type="button" className={button} disabled={busy} onClick={() => toggle(false)}>
        <Lock size={14} aria-hidden="true" /> {busy ? "Stopping…" : "Stop sharing"}
      </button>
      {copy === "manual" && (
        <p className="basis-full text-sm text-neutral-300">
          Copy this link: <span className="select-all break-all font-mono text-neutral-100">{publicMapUrl(sharing.publicId)}</span>
        </p>
      )}
      {error && <p role="alert" className="basis-full text-sm text-red-300">{error}</p>}
    </>
  );
}
