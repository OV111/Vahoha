import { useLayoutEffect, useRef } from "react";
import { Trash2, X } from "lucide-react";
import { kindInfo } from "../lib/nodeKinds";
import { paletteFor } from "../lib/lenses";
import { MAX_NOTE } from "../lib/mapGraph";
import EvidenceList from "./EvidenceList";
import KindSelect from "./KindSelect";

// Grows with its text, so the whole explanation is always visible while editing.
function GrowingTextarea({ value, className = "", ...props }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight + 2}px`; // +2 for the border
  }, [value]);
  return <textarea ref={ref} rows={3} value={value} className={`${className} resize-none overflow-hidden`} {...props} />;
}

const field =
  "mt-1 min-h-11 w-full rounded-lg border border-neutral-700 bg-black px-3 text-sm text-white placeholder:text-neutral-600 focus-visible:outline-2 focus-visible:outline-purple-400";

function Field({ label, children }) {
  return (
    <label className="mt-3 block text-xs font-medium text-neutral-400">
      {label}
      {children}
    </label>
  );
}

// Delete and close live in the header row, so the sheet a phone shows over the
// canvas stays short and neither needs scrolling to. Both are 44px targets
// around small icons.
const Header = ({ title, deleteLabel, onDelete, onClose }) => (
  <div className="flex items-center gap-2">
    <h2 className="mr-auto text-xs font-semibold uppercase tracking-wider text-neutral-400">{title}</h2>
    <button
      type="button"
      onClick={onDelete}
      className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-red-500/40 px-3 text-sm text-red-300 transition-colors hover:bg-red-500/10 focus-visible:outline-2 focus-visible:outline-purple-400"
    >
      <Trash2 size={14} aria-hidden="true" /> {deleteLabel}
    </button>
    <button
      type="button"
      onClick={onClose}
      className="-mr-2 flex size-11 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-purple-400"
    >
      <X size={16} aria-hidden="true" />
      <span className="sr-only">Close</span>
    </button>
  </div>
);

// The lens's parts, plus the part's own type when it comes from another lens (or the labs),
// so a map keeps its parts when the lens changes.
const typeOptions = (lens, current) => {
  const options = paletteFor(lens);
  return options.some((k) => k.kind === current) ? options : [kindInfo(current), ...options];
};

/**
 * Edits whatever is selected on the canvas: one node, one wire, or nothing.
 * A part's repo evidence is read-only: it comes from a scan, not from typing.
 */
export default function Inspector({ node, edge, repo, lens, onNode, onEdge, onDeleteNode, onDeleteEdge, onClose, nodeExtra = null }) {
  if (node) {
    return (
      <div>
        <Header title="Selected part" deleteLabel="Delete" onDelete={onDeleteNode} onClose={onClose} />
        <Field label="Name">
          <input className={field} value={node.data.title} maxLength={40} onChange={(e) => onNode({ title: e.target.value })} />
        </Field>
        <Field label="Technology or short detail">
          <input className={field} value={node.data.sub} maxLength={60} placeholder="Express, PostgreSQL, runs nightly…" onChange={(e) => onNode({ sub: e.target.value })} />
        </Field>
        <div className="mt-3">
          <label htmlFor="part-kind" className="block text-xs font-medium text-neutral-400">
            Type
          </label>
          <KindSelect id="part-kind" options={typeOptions(lens, node.data.kind)} value={node.data.kind} onChange={(kind) => onNode({ kind })} />
        </div>
        <Field label="What it is and why it's here">
          <GrowingTextarea
            className={`${field} py-2 leading-relaxed`}
            value={node.data.note ?? ""}
            maxLength={MAX_NOTE}
            placeholder="What this part does in your project, and why you chose it."
            onChange={(e) => onNode({ note: e.target.value })}
          />
          {(node.data.note?.length ?? 0) > MAX_NOTE - 100 && (
            <span className="mt-1 block text-right text-[11px] text-neutral-500">
              {node.data.note.length}/{MAX_NOTE}
            </span>
          )}
        </Field>
        {node.data.evidence?.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-medium text-emerald-300">Found in the repo</p>
            <EvidenceList repo={repo} items={node.data.evidence} />
          </div>
        )}
        {nodeExtra}
      </div>
    );
  }

  if (edge) {
    return (
      <div>
        <Header title="Selected wire" deleteLabel="Delete" onDelete={onDeleteEdge} onClose={onClose} />
        <Field label="What travels on it">
          <input
            className={field}
            value={edge.label ?? ""}
            maxLength={30}
            placeholder="HTTP, SQL, job…"
            onChange={(e) => onEdge({ label: e.target.value })}
          />
        </Field>
        <p className="mt-3 text-xs leading-relaxed text-neutral-500">
          To move this wire, drag either end onto another part. Drop an end on empty space to remove the wire.
        </p>
      </div>
    );
  }

  return null;
}
