import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, Lock, LogOut } from "lucide-react";
import {
  AVATAR_MENU_ITEMS,
  NAV_GROUPS_AUTH,
  NAV_GROUPS_GUEST,
  NAV_LINKS_GUEST,
  TRACK_LINKS,
} from "../../../../constants/navbar";
import SearchBar from "../../search/SearchBar";
import NavSearchResults from "./NavSearchResults";
import UserSummary from "./UserSummary";
import GuestActions from "./GuestActions";

const MobileNavLink = ({ to, children, className = "" }) => (
  <li className="text-base font-medium transition hover:text-purple-300">
    {/* py-2.5 gives a ~44px touch target (WCAG 2.5.5 / Apple HIG minimum). */}
    <NavLink to={to} className={`block py-2.5 ${className}`}>
      {children}
    </NavLink>
  </li>
);

// Collapsible track list (10 items would bury the rest of the menu).
// Its open state lives here, so it resets whenever the menu closes and unmounts.
const MobileTracks = ({ label }) => {
  const [open, setOpen] = useState(false);
  return (
    <li className="text-base font-medium">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center gap-1 py-2.5 transition hover:text-purple-300"
      >
        {label}
        <ChevronDown
          size={15}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul className="mt-1 ml-3 flex flex-col gap-0.5 border-l border-white/20 pl-3">
          {TRACK_LINKS.map(({ label: title, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex min-h-11 items-center text-base transition ${isActive ? "text-purple-400" : "text-purple-100 hover:text-white"}`
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

// Full-width menu under the navbar on small screens, with a backdrop that closes it.
export default function MobileMenu({ auth, showSearch, searchValue, onSearchChange, onClose, onLogout }) {
  const navGroups = auth ? NAV_GROUPS_AUTH : NAV_GROUPS_GUEST;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 md:hidden"
        style={{ top: "var(--navbar-h)" }}
        onClick={onClose}
      />

      <ul
        id="mobile-menu"
        // Capped to the viewport and scrollable, so an expanded Categories
        // list on a short phone can't push links off-screen.
        className="absolute top-full left-0 z-50 flex max-h-[calc(100dvh-var(--navbar-h))] w-full flex-col overflow-y-auto overscroll-contain rounded-b-2xl border-y border-white/10 bg-black px-4 pt-3 pb-5 text-gray-100 shadow-xl md:hidden"
      >
        {showSearch && (
          <li className="relative mb-1">
            <SearchBar
              value={searchValue}
              onChange={onSearchChange}
              onSubmit={onClose}
              placeholder="Search posts..."
            />
            <NavSearchResults query={searchValue} />
          </li>
        )}

        {/* Headed sections instead of accordions: the whole map is visible in
            one scroll, no extra taps. Same data as desktop, so guests see the
            same map with protected items locked. */}
        {navGroups.map((group) => (
          <li key={group.label} className="mt-3">
            <p className="pb-1 text-xs font-semibold tracking-wider text-gray-500 uppercase">
              {group.label}
            </p>
            <ul>
              {group.items.map(({ label, to, icon: Icon, locked }) => (
                <MobileNavLink key={label} to={to} className="flex items-center gap-2">
                  <Icon size={16} className="text-purple-600" />
                  {label}
                  {locked && (
                    <>
                      <Lock size={12} className="text-gray-500" aria-hidden="true" />
                      <span className="sr-only">(sign up to use)</span>
                    </>
                  )}
                </MobileNavLink>
              ))}
              {group.showTracks && <MobileTracks label="Career tracks" />}
            </ul>
          </li>
        ))}

        {auth ? (
          <>
            <li className="mt-2 border-t border-white/20 pt-3">
              <UserSummary />
            </li>
            {AVATAR_MENU_ITEMS.map(({ label, to, icon: Icon }) => (
              <MobileNavLink key={to} to={to} className="flex items-center gap-2">
                <Icon size={14} />
                {label}
              </MobileNavLink>
            ))}

            <li className="mt-1 border-t border-white/20 pt-3">
              <button
                onClick={onLogout}
                className="flex w-full cursor-pointer items-center gap-2 py-2.5 text-base font-medium text-red-300 transition hover:text-red-200"
              >
                <LogOut size={14} />
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            {NAV_LINKS_GUEST.map(({ label, to }) => (
              <MobileNavLink key={to} to={to}>
                {label}
              </MobileNavLink>
            ))}
            <li className="mt-3 border-t border-white/20 pt-4">
              <GuestActions fullWidth />
            </li>
          </>
        )}
      </ul>
    </>
  );
}
