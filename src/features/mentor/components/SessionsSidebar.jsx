import { useState, useRef, useEffect } from "react";
import { Search, SquarePen, PanelLeft, Trash2, X, Code2, BarChart3 } from "lucide-react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import useMentorStore from "@/stores/useMentorStore";
import {
  SESSIONS_COPY,
  SESSION_SEARCH_DEBOUNCE_MS,
  SIDEBAR_OPEN_STORAGE_KEY,
} from "../../../../constants/mentor";
import SessionsList from "./SessionsList";
import UsageModal from "./UsageModal";

/** How long the sidebar stays open after the pointer leaves, to avoid flicker. */
const CLOSE_DELAY_MS = 260;

// Storage can throw (private windows, blocked site data), and the sidebar must
// still work, so every access is guarded and falls back to "open".
const readOpenPreference = () => {
  try {
    return localStorage.getItem(SIDEBAR_OPEN_STORAGE_KEY) !== "false";
  } catch {
    return true;
  }
};
const writeOpenPreference = (open) => {
  try {
    localStorage.setItem(SIDEBAR_OPEN_STORAGE_KEY, String(open));
  } catch { /* preference is a convenience only */ }
};

export default function SessionsSidebar({
  loading = false,
  sessions,
  total = null,
  hasMore = false,
  loadingMore = false,
  onLoadMore = () => {},
  search = null,
  onSearch = () => {},
  onLoadMoreSearch = () => {},
  activeSessionId,
  onSelectSession,
  onNewSession,
  onRenameSession,
  onDeleteSession,
  onDeleteAllSessions,
  onTogglePinSession,
  mobileOpen = false,
  onMobileClose = () => {},
}) {
  const isStreaming = useMentorStore((s) => s.isStreaming);

  // "Delete all chats" confirm step; keepPinned defaults on so pinned chats are only lost on purpose.
  const [confirmAll, setConfirmAll] = useState(false);
  const [keepPinned, setKeepPinned] = useState(true);
  // The list is paged, so its length is not how many chats the server will delete.
  const totalChats = total ?? sessions.length;
  const pinnedCount = sessions.filter((s) => s.pinned).length;
  const deleteCount = Math.max(0, keepPinned ? totalChats - pinnedCount : totalChats);
  const openConfirmAll = () => {
    setKeepPinned(true);
    setConfirmAll(true);
  };
  const confirmDeleteAll = () => {
    setConfirmAll(false);
    onDeleteAllSessions({ keepPinned: pinnedCount > 0 && keepPinned });
  };
  // `pinned` is the explicit choice made by clicking a chevron; `peeking` is the
  // temporary hover state. Keeping them separate is what stops a hover-out from
  // closing a sidebar the user deliberately opened.
  const [pinned, setPinned] = useState(readOpenPreference);
  const [peeking, setPeeking] = useState(false);
  const [query, setQuery] = useState("");
  const [challengeOnly, setChallengeOnly] = useState(false);
  const [usageOpen, setUsageOpen] = useState(false);
  const closeTimer = useRef(null);

  const expanded = pinned || peeking;

  const setOpen = (open) => {
    setPinned(open);
    writeOpenPreference(open);
  };

  // The debounce lives here (the sidebar owns the text); the parent only sees
  // settled queries. A ref keeps a changing callback from restarting the timer.
  const trimmed = query.trim();
  const onSearchRef = useRef(onSearch);
  onSearchRef.current = onSearch;
  useEffect(() => {
    const timer = setTimeout(
      () => onSearchRef.current(trimmed, challengeOnly),
      SESSION_SEARCH_DEBOUNCE_MS,
    );
    return () => clearTimeout(timer);
  }, [trimmed, challengeOnly]);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const handleEnter = () => {
    cancelClose();
    if (!pinned) setPeeking(true);
  };

  const handleLeave = () => {
    cancelClose();
    // Delay so brushing past the rail, or crossing the gap between the rail and
    // the expanded panel, doesn't snap it shut mid-movement.
    closeTimer.current = setTimeout(() => setPeeking(false), CLOSE_DELAY_MS);
  };

  useEffect(() => cancelClose, []);

  // Escape closes the phone drawer; body scroll is locked while it's open so
  // swiping the list doesn't scroll the page behind it.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => e.key === "Escape" && onMobileClose();
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [mobileOpen, onMobileClose]);

  // While searching, the list is the server's results. Filtering them again here
  // costs nothing on a current server and keeps an older one (which ignores `q`)
  // from showing every chat as a match.
  const searching = trimmed !== "" || challengeOnly;
  const needle = trimmed.toLowerCase();
  const results = searching
    ? (search?.sessions ?? []).filter(
        (s) =>
          (s.title ?? "").toLowerCase().includes(needle) && (!challengeOnly || Boolean(s.challengeSlug)),
      )
    : sessions;
  // The box or the filter has changed but the matching answer has not arrived yet.
  const searchPending =
    searching &&
    (search?.query !== trimmed || Boolean(search?.challenge) !== challengeOnly || Boolean(search?.loading));

  // Picking a chat (or starting one) on a phone should also dismiss the drawer.
  const withClose = (fn) => (...args) => {
    fn(...args);
    onMobileClose();
  };

  // The panel's contents are shared by the desktop sidebar and the phone drawer.
  // `onClose` is only passed by the drawer and makes the panel icon close the drawer.
  const renderPanel = ({ onSelect, onNew, onClose }) => (
    <>
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <span className="text-[11px] font-bold tracking-widest uppercase text-white">
          {SESSIONS_COPY.title}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={onNew}
            className="w-9 h-9 md:w-7 md:h-7 relative max-md:after:absolute max-md:after:-inset-1 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10 cursor-pointer text-white/60 hover:text-white"
            title="New session"
            aria-label="New session"
          >
            <SquarePen size={15} strokeWidth={1.75} />
          </button>
          {onClose ? (
            <button
              onClick={onClose}
              className="w-9 h-9 relative after:absolute after:-inset-1 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10 cursor-pointer text-white/70 hover:text-white"
              aria-label="Close sessions"
            >
              <PanelLeft size={16} strokeWidth={2} />
            </button>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
                setPeeking(false);
              }}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10 cursor-pointer text-white/70 hover:text-white"
              title="Collapse"
              aria-label="Collapse sessions"
            >
              <PanelLeft size={16} strokeWidth={2} />
            </button>
          )}
        </div>
      </div>

      <div className="px-3 pb-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/7 bg-white/3">
          <Search size={13} strokeWidth={1.5} className="shrink-0 text-white/40" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape" && query) {
                e.preventDefault();
                // Don't let the phone drawer's document-level Escape close it too.
                e.stopPropagation();
                setQuery("");
              }
            }}
            placeholder={SESSIONS_COPY.searchPlaceholder}
            aria-label={SESSIONS_COPY.searchLabel}
            // 16px on phones stops iOS zooming the page when the field is focused.
            className="flex-1 min-w-0 bg-transparent outline-none text-base md:text-[12px] text-white/80 placeholder:text-white/40 [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={SESSIONS_COPY.clearSearch}
              className="shrink-0 w-5 h-5 rounded flex items-center justify-center cursor-pointer text-white/50 hover:text-white hover:bg-white/10"
            >
              <X size={12} />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => setChallengeOnly((v) => !v)}
          aria-pressed={challengeOnly}
          className={`mt-2 inline-flex min-h-8 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-[11px] transition-colors focus-visible:outline-2 focus-visible:outline-purple-500 max-md:min-h-10 max-md:text-xs ${
            challengeOnly
              ? "border-purple-500/60 bg-purple-500/15 text-white"
              : "border-white/10 text-white/70 hover:bg-white/5 hover:text-white"
          }`}
        >
          <Code2 size={12} strokeWidth={1.75} aria-hidden="true" />
          {SESSIONS_COPY.challengeFilter}
        </button>
      </div>

      <nav
        aria-label={SESSIONS_COPY.historyNav}
        className="flex-1 overflow-y-auto px-2 pb-3 space-y-0.5 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.2)_transparent]"
      >
        <SessionsList
          sessions={results}
          activeSessionId={activeSessionId}
          streamingId={isStreaming ? activeSessionId : null}
          query={trimmed}
          challengeOnly={challengeOnly}
          loading={searching ? searchPending : loading}
          hasMore={searching ? Boolean(search?.hasMore) : hasMore}
          loadingMore={searching ? Boolean(search?.loadingMore) : loadingMore}
          onLoadMore={searching ? onLoadMoreSearch : onLoadMore}
          onSelect={onSelect}
          onRename={onRenameSession}
          onDelete={onDeleteSession}
          onTogglePin={onTogglePinSession}
        />
      </nav>

      <div className="border-t border-white/5 px-2 py-2">
        <button
          type="button"
          onClick={() => {
            setUsageOpen(true);
            // The phone drawer would otherwise stay open behind the pop-up.
            onMobileClose();
          }}
          aria-haspopup="dialog"
          className="flex min-h-9 w-full cursor-pointer items-center gap-2 rounded-lg px-3 text-[12px] text-white/70 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-500 max-md:min-h-11 max-md:text-sm"
        >
          <BarChart3 size={13} strokeWidth={1.75} aria-hidden="true" />
          {SESSIONS_COPY.usageLink}
        </button>
        {totalChats > 0 && onDeleteAllSessions && (
          <button
            type="button"
            onClick={openConfirmAll}
            className="flex min-h-9 w-full cursor-pointer items-center gap-2 rounded-lg px-3 text-[12px] text-white/50 transition-colors hover:bg-red-500/10 hover:text-red-300 focus-visible:outline-2 focus-visible:outline-purple-500 max-md:min-h-11 max-md:text-sm"
          >
            <Trash2 size={13} strokeWidth={1.75} aria-hidden="true" />
            Delete all chats
          </button>
        )}
      </div>
    </>
  );

  const confirmAllDialog = confirmAll && (
    <ConfirmDialog
      title={deleteCount === 1 ? "Delete 1 chat?" : `Delete ${deleteCount} chats?`}
      body={
        <>
          {deleteCount === 0
            ? "All your chats are pinned, so there's nothing to delete unless you include them."
            : "They're gone for good. Your daily message count doesn't change."}
          {pinnedCount > 0 && (
            <label className="mt-3 flex cursor-pointer items-center gap-2 text-white/80">
              <input
                type="checkbox"
                checked={keepPinned}
                onChange={(e) => setKeepPinned(e.target.checked)}
                className="size-4 accent-purple-500"
              />
              Keep my {pinnedCount} pinned {pinnedCount === 1 ? "chat" : "chats"}
            </label>
          )}
        </>
      }
      confirmLabel="Delete"
      onConfirm={deleteCount === 0 ? () => setConfirmAll(false) : confirmDeleteAll}
      onCancel={() => setConfirmAll(false)}
    />
  );

  const usageDialog = usageOpen && <UsageModal onClose={() => setUsageOpen(false)} />;

  // Below md the desktop sidebar is hidden, so this slide-over is the only way
  // to reach past chats on a phone.
  const mobileDrawer = mobileOpen && (
    <div className="md:hidden fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onMobileClose} />
      <aside
        role="dialog"
        aria-label="Sessions"
        className="absolute inset-y-0 left-0 flex w-[min(20rem,85vw)] flex-col border-r border-white/10 bg-black pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]"
      >
        {renderPanel({
          onSelect: withClose(onSelectSession),
          onNew: withClose(onNewSession),
          onClose: onMobileClose,
        })}
      </aside>
    </div>
  );

  // ── Collapsed rail ────────────────────────────────────────────────────────
  if (!expanded) {
    return (
      <>
        <aside
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          className="w-10 shrink-0 hidden md:flex flex-col items-center border-r border-white/10"
        >
          <button
            onClick={() => setOpen(true)}
            className="mb-4 w-7 h-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer text-white/70 hover:text-white"
            title="Open sessions"
            aria-label="Open sessions"
          >
            <PanelLeft size={16} strokeWidth={2} />
          </button>
          <div className="flex-1" />
        </aside>
        {mobileDrawer}
        {confirmAllDialog}
        {usageDialog}
      </>
    );
  }

  // ── Expanded panel ────────────────────────────────────────────────────────
  return (
    <>
      <aside
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="w-60 shrink-0 flex-col hidden md:flex border-r border-white/10"
      >
        {renderPanel({ onSelect: onSelectSession, onNew: onNewSession })}
      </aside>
      {mobileDrawer}
      {confirmAllDialog}
      {usageDialog}
    </>
  );
}
