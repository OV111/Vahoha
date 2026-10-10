import { NavLink } from "react-router-dom";
import { ChevronDown, Lock } from "lucide-react";
import { TRACK_LINKS } from "../../../../constants/Navbar";
import { navItemPath } from "@/utils/navigation";
import DropdownPanel from "./DropdownPanel";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400";

const itemClass = ({ isActive }) =>
  `flex rounded-md px-3 py-2 text-sm transition-colors ${
    isActive ? "text-purple-400" : "text-gray-200 hover:bg-white/5 hover:text-white"
  }`;

// Icon + label + one-line description: explains the product, not just links to it.
// `locked` (guests only): still shown, so guests see the whole product, but
// marked and sent to signup.
const RichItem = ({ label, to, icon: Icon, description, locked, isActive }) => (
  <NavLink
    to={to}
    className={itemClass({ isActive })}
    aria-label={locked ? `${label}: sign up to use` : undefined}
  >
    <span className="mt-0.5 mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-purple-600">
      <Icon size={16} />
    </span>
    <span>
      <span className="flex items-center gap-1.5 font-medium">
        {label}
        {locked && <Lock size={11} className="text-gray-500" aria-hidden="true" />}
      </span>
      <span className="block text-xs text-gray-400">{description}</span>
    </span>
  </NavLink>
);

const PlainItem = ({ label, to, isActive }) => (
  <NavLink to={to} className={itemClass({ isActive })}>
    {label}
  </NavLink>
);

// One desktop menu. Groups with a `to` (Learn/Practice/Build) get a label
// that is a real link plus a chevron button for keyboard and touch; groups
// without one (the guests' Tracks) are a single toggle button.
// `activePath` is decided once for the whole navbar (findActiveNavPath), so
// only one item, and one group, can be active at a time.
const NavGroupMenu = ({ group, activePath, isOpen, onOpen, onClose, onTriggerClick }) => {
  const id = `nav-menu-${group.label.toLowerCase()}`;
  const tracks = group.showTracks ? TRACK_LINKS : [];
  const isRich = group.items.some((item) => item.icon);

  const isItemActive = (item) => !item.locked && navItemPath(item) === activePath;
  const isActive = [...group.items, ...tracks].some(isItemActive);
  const labelColor = isActive || isOpen ? "text-purple-500" : "hover:text-purple-500";

  const chevron = (
    <ChevronDown
      size={13}
      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
    />
  );
  const toggleProps = {
    onClick: onTriggerClick,
    "aria-haspopup": "menu",
    "aria-expanded": isOpen,
    "aria-controls": id,
  };

  return (
    <li className="relative px-1.5 py-1" onMouseEnter={onOpen} onMouseLeave={onClose}>
      {group.to ? (
        <span className={`flex items-center gap-0.5 transition ${labelColor}`}>
          <NavLink to={group.to} className={`rounded ${focusRing}`}>
            {group.label}
          </NavLink>
          <button
            {...toggleProps}
            aria-label={`Open ${group.label} menu`}
            className={`cursor-pointer rounded ${focusRing}`}
          >
            {chevron}
          </button>
        </span>
      ) : (
        <button
          {...toggleProps}
          className={`flex cursor-pointer items-center gap-1 rounded transition ${focusRing} ${labelColor}`}
        >
          {group.label}
          {chevron}
        </button>
      )}

      <DropdownPanel
        open={isOpen}
        id={id}
        className={`left-1/2 -translate-x-1/2 p-2 ${
          tracks.length ? "w-[34rem]" : isRich ? "w-80" : "w-44"
        }`}
      >
        <div className={tracks.length ? "grid grid-cols-[1fr_11rem] gap-2" : ""}>
          <ul>
            {group.items.map((item) => (
              <li key={item.label}>
                {isRich ? (
                  <RichItem {...item} isActive={isItemActive(item)} />
                ) : (
                  <PlainItem {...item} isActive={isItemActive(item)} />
                )}
              </li>
            ))}
          </ul>

          {tracks.length > 0 && (
            <div className="border-l border-white/10 pl-2">
              <p className="px-3 pt-2 pb-1 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
                Career tracks
              </p>
              <ul>
                {tracks.map((item) => (
                  <li key={item.to}>
                    <PlainItem {...item} isActive={isItemActive(item)} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DropdownPanel>
    </li>
  );
};

export default NavGroupMenu;
