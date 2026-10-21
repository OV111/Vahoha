import useProfileStore from "@/stores/useProfileStore";
import useNotificationStore from "@/stores/useNotificationStore";
import { Link } from "react-router-dom";

// Small pieces shared by several navbar menus (desktop dropdowns, avatar menu,
// mobile menu). Anything used by one menu only lives in that menu's file.

// Shared keyboard focus style for every navbar control.
export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400";

// The panel stays mounted and animates with a CSS transition, so the navbar
// doesn't need an animation library on every page's first load. `invisible`
// (visibility: hidden) also takes the closed panel's links out of the tab
// order and the accessibility tree; visibility is in the transition list so it
// flips only after the fade-out has finished.
export const DropdownPanel = ({ open, id, className = "", children }) => (
  <div
    id={id}
    aria-hidden={!open}
    className={`absolute top-full z-40 origin-top overflow-hidden rounded-md border border-white/10 bg-neutral-900 shadow-lg shadow-black/40 transition-[opacity,translate,scale,visibility] duration-[180ms] ease-out motion-reduce:transition-none ${
      open ? "visible translate-y-0 scale-100 opacity-100" : "pointer-events-none invisible -translate-y-1.5 scale-[0.97] opacity-0"
    } ${className}`}
  >
    {children}
  </div>
);

// One entry point for guests: /get-started opens on signup and has its own
// "log in instead" toggle, so a separate Log in link only splits attention.
// `fullWidth` makes it a thumb-sized button for the mobile menu.
export const GuestActions = ({ fullWidth = false, className = "" }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <Link
      to="/get-started"
      className={`text-sm font-medium text-gray-100 transition hover:text-purple-500 ${
        fullWidth
          ? "flex min-h-11 flex-1 items-center justify-center rounded-md border border-white/20 text-center text-base"
          : "py-1.5"
      }`}
    >
      Get Started
    </Link>
  </div>
);

// Ask Cloudinary for a 64px crop instead of downloading the full upload.
const thumbnail = (url) =>
  url.replace("/upload/", "/upload/w_64,h_64,c_fill,f_auto,q_auto/");

const initials = (user) =>
  `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase();

export const AvatarImage = ({ inDropdown = false }) => {
  const { user, stats } = useProfileStore();

  return (
    <div
      className={`my-1 flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border ${
        inDropdown ? "border-gray-600" : "border-white/50"
      }`}
    >
      {stats?.profileImage ? (
        <img
          src={thumbnail(stats.profileImage)}
          alt=""
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <span
          className={`flex h-full w-full items-center justify-center rounded-full text-sm font-semibold text-white ${
            inDropdown ? "bg-purple-600" : "bg-white/20"
          }`}
        >
          {initials(user)}
        </span>
      )}
    </div>
  );
};

// Avatar + name + @handle. Shared by the desktop dropdown and the mobile menu.
export const UserSummary = ({ inDropdown = false, className = "" }) => {
  const { user } = useProfileStore();

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <AvatarImage inDropdown={inDropdown} />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-gray-100">
          {user?.firstName} {user?.lastName}
        </p>
        {user?.username && (
          <p className="truncate text-xs text-gray-400" title={`@${user.username}`}>
            @{user.username}
          </p>
        )}
      </div>
    </div>
  );
};

// Unread notification count. `dot` is the small corner marker for the avatar.
export function UnreadBadge({ dot = false, className = "" }) {
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
