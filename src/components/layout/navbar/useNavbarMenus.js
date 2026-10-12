import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Open/closed state for every navbar menu, plus the rules that close them.
 * Only one dropdown is open at a time: a group label ("Learn", "Tracks"...),
 * "avatar", "search", or null.
 */
export default function useNavbarMenus(auth) {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const closeDropdown = () => setOpenDropdown(null);

  // Hover already opened the menu for mouse users, so a mouse click must not
  // toggle it shut again. Keyboard activation (e.detail === 0 — no pointer
  // clicks) toggles; pointer clicks only open (that's also how touch opens it).
  const handleTriggerClick = (name) => (e) =>
    setOpenDropdown((current) => (e.detail === 0 && current === name ? null : name));

  // Every navigation (and every login/logout) closes all menus and clears the
  // search. Keyed on location.key, not pathname, so clicking a link to the page
  // you're already on still closes the mobile menu. This replaces an
  // onClick={close} on every single link.
  useEffect(() => {
    setOpenDropdown(null);
    setIsMobileOpen(false);
    setSearchValue("");
  }, [location.key, auth]);

  // Escape closes whichever menu is open.
  useEffect(() => {
    if (!isMobileOpen && !openDropdown) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setIsMobileOpen(false);
      setOpenDropdown(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isMobileOpen, openDropdown]);

  // Lock page scroll behind the open mobile menu, otherwise swiping the
  // menu scrolls the page underneath it.
  useEffect(() => {
    if (!isMobileOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isMobileOpen]);

  return {
    openDropdown,
    setOpenDropdown,
    closeDropdown,
    handleTriggerClick,
    isMobileOpen,
    setIsMobileOpen,
    searchValue,
    setSearchValue,
  };
}
