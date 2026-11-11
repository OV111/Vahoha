import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Pencil, Trash2, Check, X, Pin, PinOff, Loader2, Code2 } from "lucide-react";
import { SESSIONS_COPY } from "../../../../constants/mentor";

const MENU_ITEM = "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] cursor-pointer focus:outline-none focus-visible:bg-white/10";

/**
 * One row in the sessions list.
 *
 * The row is a <div>, not a <button>: the menu trigger and the rename input are
 * interactive elements, and nesting those inside a button is invalid HTML that
 * breaks keyboard behaviour. Click-to-open lives on the title element instead.
 */
export default function SessionItem({ session, active, streaming = false, onSelect, onRename, onDelete, onTogglePin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [draft, setDraft] = useState(session.title ?? "");
  const [busy, setBusy] = useState(false);

  const menuRef = useRef(null);
  const triggerRef = useRef(null);
  const inputRef = useRef(null);
  // Enter commits and then the input unmounts, which can fire blur → a second
  // commit. State updates are async, so a ref is what actually blocks the repeat.
  const commitLock = useRef(false);
  const cancelled = useRef(false);

  const closeMenu = ({ restoreFocus = false } = {}) => {
    setMenuOpen(false);
    setConfirmDelete(false);
    if (restoreFocus) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) closeMenu();
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  // Land inside the menu whenever it (or its delete-confirm view) shows, so the
  // keyboard user isn't left on the trigger. The confirm view starts on "Cancel":
  // Enter must not delete a chat by default.
  useEffect(() => {
    if (!menuOpen) return;
    const items = menuRef.current?.querySelectorAll('[role="menuitem"]');
    items?.[confirmDelete ? 1 : 0]?.focus();
  }, [menuOpen, confirmDelete]);

  useEffect(() => {
    if (!renaming) return;
    const el = inputRef.current;
    if (!el) return;
    el.focus();
    el.select();
  }, [renaming]);

  const startRename = () => {
    setDraft(session.title ?? "");
    cancelled.current = false;
    setRenaming(true);
    closeMenu();
  };

  const commitRename = async () => {
    if (commitLock.current || cancelled.current) return;
    const next = draft.trim();
    // Nothing to do if it's unchanged or empty — don't spend a request on it.
    if (!next || next === session.title) return setRenaming(false);
    commitLock.current = true;
    setBusy(true);
    try {
      await onRename(session._id, next);
    } finally {
      commitLock.current = false;
      setBusy(false);
      setRenaming(false);
    }
  };

  const cancelRename = () => {
    cancelled.current = true;
    setRenaming(false);
  };

  const handleDelete = async () => {
    setBusy(true);
    await onDelete(session._id);
    // No cleanup after this — the row unmounts when the parent drops it.
  };

  // Roving focus inside the menu: arrows and Home/End move, Escape closes and
  // hands focus back to the button that opened it.
  const onMenuKeyDown = (e) => {
    const items = [...menuRef.current.querySelectorAll('[role="menuitem"]')];
    const i = items.indexOf(document.activeElement);
    const go = (n) => {
      e.preventDefault();
      items[(n + items.length) % items.length]?.focus();
    };
    if (e.key === "ArrowDown") go(i + 1);
    else if (e.key === "ArrowUp") go(i - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(items.length - 1);
    else if (e.key === "Escape") {
      e.preventDefault();
      closeMenu({ restoreFocus: true });
    } else if (e.key === "Tab") closeMenu();
  };

  if (renaming) {
    return (
      <div
        className="flex h-11 items-center gap-1 rounded-lg bg-white/10 px-2.5 ring-1 ring-purple-500/60 md:h-9"
      >
        <input
          ref={inputRef}
          value={draft}
          maxLength={80}
          disabled={busy}
          aria-label="Chat name"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitRename();
            if (e.key === "Escape") cancelRename();
          }}
          // Clicking away saves, matching the inline-rename behaviour people
          // expect from file explorers and chat sidebars.
          onBlur={commitRename}
          className="min-w-0 flex-1 bg-transparent text-[13px] text-white outline-none"
        />
        <button
          onMouseDown={(e) => e.preventDefault()}
          onClick={commitRename}
          className="w-6 h-6 rounded flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 shrink-0 cursor-pointer"
          title="Save"
          aria-label="Save name"
        >
          <Check size={13} />
        </button>
        <button
          // onMouseDown so this fires before onBlur would commit the rename.
          onMouseDown={(e) => {
            e.preventDefault();
            cancelRename();
          }}
          className="w-6 h-6 rounded flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 shrink-0 cursor-pointer"
          title="Cancel"
          aria-label="Cancel rename"
        >
          <X size={13} />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`group relative flex items-center rounded-lg transition-colors ${
        active ? "bg-white/10" : "hover:bg-white/5"
      } ${busy ? "opacity-50" : ""}`}
    >
      <button
        onClick={() => onSelect(session._id)}
        aria-current={active ? "page" : undefined}
        // One line per chat: the date groups already say when, so the exact age
        // moves to the tooltip instead of repeating on every row.
        title={session.when ? `${session.title} · ${session.when}` : session.title}
        className="flex h-11 min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-lg pl-3 pr-8 text-left focus-visible:outline-2 focus-visible:outline-purple-500 md:h-9"
      >
        {session.pinned && <Pin size={11} className="shrink-0 text-purple-400/80" fill="currentColor" aria-hidden="true" />}
        {session.challengeSlug && (
          <Code2 size={12} className="shrink-0 text-white/50" aria-label="Challenge chat" />
        )}
        <span className="truncate text-[13px] text-white">{session.title}</span>
        {streaming && (
          <span role="status" className="shrink-0">
            <Loader2 size={11} className="text-purple-400 motion-safe:animate-spin" aria-hidden="true" />
            <span className="sr-only">{SESSIONS_COPY.replying}</span>
          </span>
        )}
      </button>

      <div
        className="absolute right-1 top-1/2 -translate-y-1/2"
        ref={menuRef}
        onKeyDown={menuOpen ? onMenuKeyDown : undefined}
      >
        <button
          ref={triggerRef}
          onClick={() => setMenuOpen((v) => !v)}
          // Always visible for the active row and while open, otherwise on
          // hover/focus — a permanently visible control on every row is noise,
          // but one that only appears on hover is unreachable by keyboard.
          className={`w-9 h-9 md:w-6 md:h-6 relative max-md:after:absolute max-md:after:-inset-1 rounded flex items-center justify-center transition-all cursor-pointer text-white hover:bg-white/10 focus:opacity-100 pointer-coarse:opacity-100 ${
            menuOpen || active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          title="Session options"
          aria-label="Session options"
          aria-haspopup="menu"
          aria-expanded={menuOpen}
        >
          <MoreHorizontal size={15} />
        </button>

        {menuOpen && (
          <div
            role="menu"
            className="absolute right-0 top-10 md:top-7 w-40 rounded-xl overflow-hidden p-1 z-50 border border-white/10 bg-[#191918] shadow-2xl shadow-black/60"
          >
            {confirmDelete ? (
              <>
                <p className="px-2.5 py-1.5 text-[12px] text-white/60">Delete this chat?</p>
                <button
                  role="menuitem"
                  tabIndex={-1}
                  onClick={handleDelete}
                  className={`${MENU_ITEM} text-red-400 hover:bg-red-500/10`}
                >
                  <Trash2 size={15} strokeWidth={1.5} />
                  Yes, delete
                </button>
                <button
                  role="menuitem"
                  tabIndex={-1}
                  onClick={() => setConfirmDelete(false)}
                  className={`${MENU_ITEM} text-white/70 hover:bg-white/10`}
                >
                  <X size={15} strokeWidth={1.5} />
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  role="menuitem"
                  tabIndex={-1}
                  onClick={() => {
                    onTogglePin(session._id, !session.pinned);
                    closeMenu({ restoreFocus: true });
                  }}
                  className={`${MENU_ITEM} text-white hover:bg-white/10`}
                >
                  {session.pinned ? (
                    <PinOff size={15} strokeWidth={1.5} className="text-white/70" />
                  ) : (
                    <Pin size={15} strokeWidth={1.5} className="text-white/70" />
                  )}
                  {session.pinned ? "Unpin" : "Pin"}
                </button>
                <button
                  role="menuitem"
                  tabIndex={-1}
                  onClick={startRename}
                  className={`${MENU_ITEM} text-white hover:bg-white/10`}
                >
                  <Pencil size={15} strokeWidth={1.5} className="text-white/70" />
                  Rename
                </button>
                <button
                  role="menuitem"
                  tabIndex={-1}
                  onClick={() => setConfirmDelete(true)}
                  className={`${MENU_ITEM} text-red-400 hover:bg-red-500/10`}
                >
                  <Trash2 size={15} strokeWidth={1.5} />
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
