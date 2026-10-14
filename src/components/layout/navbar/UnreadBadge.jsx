import useNotificationStore from "@/stores/useNotificationStore";

// Unread notification count. `dot` is the small corner marker for the avatar.
export default function UnreadBadge({ dot = false, className = "" }) {
  const unread = useNotificationStore((s) => s.unreadCount);
  if (unread <= 0) return null;
  const label = `${unread} unread notification${unread === 1 ? "" : "s"}`;
  if (dot) {
    return (
      <span
        role="status"
        aria-label={label}
        className={`absolute -top-0.5 -right-0.5 size-3 rounded-full border-2 border-black bg-fuchsia-500 ${className}`}
      />
    );
  }
  return (
    <span
      role="status"
      aria-label={label}
      className={`ml-auto min-w-5 rounded-full bg-fuchsia-600 px-1.5 py-0.5 text-center text-[11px] leading-none font-semibold text-white ${className}`}
    >
      {unread > 99 ? "99+" : unread}
    </span>
  );
}
