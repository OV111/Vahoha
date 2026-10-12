import { NavLink, useLocation } from "react-router-dom";
import { findActiveNavPath, isNavLinkActive } from "@/utils/navigation";
import {
  NAV_GROUPS_AUTH,
  NAV_GROUPS_GUEST,
  NAV_LINKS_GUEST,
  TRACK_LINKS,
} from "../../../../constants/Navbar";
import NavGroupMenu from "./NavGroupMenu";
import MentorButton from "./MentorButton";

// Center links on desktop. Guests get the same menus with protected items
// locked (see constants), plus a few plain links.
export default function DesktopNav({ auth, openDropdown, setOpenDropdown, closeDropdown, handleTriggerClick }) {
  const location = useLocation();
  const navGroups = auth ? NAV_GROUPS_AUTH : NAV_GROUPS_GUEST;
  // One winner across every menu, so two items sharing a page can't both light up.
  const activePath = findActiveNavPath(
    location.pathname,
    navGroups.flatMap((g) => [...g.items, ...(g.showTracks ? TRACK_LINKS : [])]),
  );

  return (
    // nav-guest: index.html hides these in the prerendered copy for returning users.
    <ul
      className={`hidden items-center gap-0.5 text-sm font-medium text-gray-100 md:flex ${auth ? "" : "nav-guest"}`}
    >
      {navGroups.map((group) => (
        <NavGroupMenu
          key={group.label}
          group={group}
          activePath={activePath}
          isOpen={openDropdown === group.label}
          onOpen={() => setOpenDropdown(group.label)}
          onClose={closeDropdown}
          onTriggerClick={handleTriggerClick(group.label)}
        />
      ))}

      {auth ? (
        <li className="px-1.5 py-1">
          <MentorButton />
        </li>
      ) : (
        NAV_LINKS_GUEST.map(({ label, to }) => (
          <li key={to} className="px-1.5 py-1 transition hover:text-purple-500">
            <NavLink
              to={to}
              className={({ isActive }) =>
                isNavLinkActive(to, location, isActive) ? "text-purple-500" : ""
              }
            >
              {label}
            </NavLink>
          </li>
        ))
      )}
    </ul>
  );
}
