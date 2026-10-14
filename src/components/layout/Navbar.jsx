import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import Wordmark from "@/components/ui/Wordmark";
import DesktopNav from "./navbar/DesktopNav";
import NavSearch from "./navbar/NavSearch";
import AvatarMenu from "./navbar/AvatarMenu";
import GuestActions from "./navbar/GuestActions";
import MobileMenu from "./navbar/MobileMenu";
import useNavbarMenus from "./navbar/useNavbarMenus";
import useNavbarHeightVar from "./navbar/useNavbarHeightVar";
import { focusRing } from "./navbar/styles";

const HIDE_SEARCH_ROUTES = new Set(["/get-started", "/forgot-password", "/reset-password"]);

/**
 * Site navbar. This file owns the layout and the auth decisions; each region
 * is its own component under ./navbar, and menu state lives in useNavbarMenus.
 */
const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { auth, isLoading, sessionHint, logout } = useAuthStore();
  // Wait for the session check only if this browser had a session last time.
  // Everyone else gets the guest layout immediately, matching the prerendered HTML.
  const authPending = isLoading && sessionHint;

  const navRef = useRef(null);
  useNavbarHeightVar(navRef);
  const menus = useNavbarMenus(auth);

  const showSearch = !HIDE_SEARCH_ROUTES.has(pathname);

  const handleLogout = () => {
    logout();
    navigate("/get-started");
  };

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 flex w-full items-center bg-black px-4 py-2 text-white backdrop-blur-md lg:px-6"
    >
      {/* Left: logo */}
      <div className="flex-1">
        <Wordmark
          markOnMobile
          className="text-xl leading-6 text-[#E6E6E6] md:text-[21px] transition-transform duration-200 hover:opacity-100 hover:scale-[1.03]"
        />
      </div>

      {/* Center: nav links (desktop). Hidden only while a returning user's session
          is being checked, so they never see the guest links flash first. */}
      {!authPending && (
        <DesktopNav
          auth={auth}
          openDropdown={menus.openDropdown}
          setOpenDropdown={menus.setOpenDropdown}
          closeDropdown={menus.closeDropdown}
          handleTriggerClick={menus.handleTriggerClick}
        />
      )}

      {/* Right: search, avatar / guest actions (desktop), hamburger (mobile) */}
      <div className="flex flex-1 items-center justify-end gap-1">
        {showSearch && (
          <NavSearch
            isOpen={menus.openDropdown === "search"}
            onOpen={() => menus.setOpenDropdown("search")}
            onClose={menus.closeDropdown}
            onTriggerClick={menus.handleTriggerClick("search")}
            value={menus.searchValue}
            onChange={menus.setSearchValue}
          />
        )}

        {authPending ? null : auth ? (
          <AvatarMenu
            isOpen={menus.openDropdown === "avatar"}
            onOpen={() => menus.setOpenDropdown("avatar")}
            onClose={menus.closeDropdown}
            onTriggerClick={menus.handleTriggerClick("avatar")}
            onLogout={handleLogout}
          />
        ) : (
          <GuestActions className="nav-guest ml-2 hidden md:flex" />
        )}

        <button
          onClick={() => menus.setIsMobileOpen((open) => !open)}
          aria-label={menus.isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={menus.isMobileOpen}
          aria-controls="mobile-menu"
          className={`-mr-2 flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-white/10 md:hidden ${focusRing}`}
        >
          {/* Three bars that morph into an X (instead of swapping two icons). */}
          <span className="relative block h-3 w-4" aria-hidden="true">
            {[
              menus.isMobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
              menus.isMobileOpen ? "top-1/2 -translate-y-1/2 opacity-0" : "top-1/2 -translate-y-1/2",
              menus.isMobileOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
            ].map((pos, i) => (
              <span
                key={i}
                className={`absolute left-0 block h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ${pos}`}
              />
            ))}
          </span>
        </button>
      </div>

      {menus.isMobileOpen && (
        <MobileMenu
          auth={auth}
          showSearch={showSearch}
          searchValue={menus.searchValue}
          onSearchChange={menus.setSearchValue}
          onClose={() => menus.setIsMobileOpen(false)}
          onLogout={handleLogout}
        />
      )}
    </nav>
  );
};

export default Navbar;
