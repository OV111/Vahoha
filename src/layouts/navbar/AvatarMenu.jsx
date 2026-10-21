import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import { AVATAR_MENU_ITEMS } from "../../../constants/navbar";
import { focusRing, DropdownPanel, AvatarImage, UserSummary, UnreadBadge } from "./parts";


// Desktop avatar button and its dropdown (profile links + logout).
export default function AvatarMenu({ isOpen, onOpen, onClose, onTriggerClick, onLogout }) {
  return (
    <div className="relative ml-1 hidden md:block" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        onClick={onTriggerClick}
        aria-label="Open profile menu"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="avatar-dropdown"
        className={`relative flex cursor-pointer items-center rounded-full ${focusRing}`}
      >
        <AvatarImage />
        <UnreadBadge dot />
      </button>

      <DropdownPanel open={isOpen} id="avatar-dropdown" className="right-0 w-52">
        <UserSummary inDropdown className="border-b border-white/10 px-4 py-2" />
        {AVATAR_MENU_ITEMS.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                isActive ? "font-medium text-purple-500" : "text-gray-200 hover:text-purple-500"
              }`
            }
          >
            <Icon size={15} />
            {label}
            {to === "/my-profile/notifications" && <UnreadBadge />}
          </NavLink>
        ))}
        <button
          onClick={onLogout}
          className="flex w-full cursor-pointer items-center gap-3 border-t border-white/10 px-4 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/20 hover:text-red-300"
        >
          <LogOut size={15} />
          Logout
        </button>
      </DropdownPanel>
    </div>
  );
}
