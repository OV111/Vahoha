import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Ellipsis, Users } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import { formatTimeAgo, isOnlineByLastActive } from "../lib/time";

const MENU_ITEM =
  "w-full cursor-pointer rounded-lg border border-transparent bg-white/5 px-3 py-2 text-left text-xs font-medium text-white/80 transition-all duration-200 hover:border-white/10 hover:bg-white/10 disabled:cursor-not-allowed disabled:text-[#8A8A93] disabled:hover:border-transparent disabled:hover:bg-white/5";

const skeleton = { baseColor: "#161616", highlightColor: "#262626" };

/**
 * Top bar of an open chat: back, who it is with, and the actions menu.
 * `onConfirm(kind)` asks the parent to confirm "clear" or "block" first.
 */
const ChatHeader = ({
  isGroup,
  group,
  userSelected,
  userStats,
  isLoadingUserStats,
  clickedUser,
  isMuted,
  isBlockedByMe,
  onBack,
  onToggleMute,
  onManageMembers,
  onConfirm,
}) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsMenuOpen(false);
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Close the menu, then run the item's action.
  const pick = (action) => () => {
    setIsMenuOpen(false);
    action();
  };

  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-black px-2 py-2.5 lg:px-3">
      <div className="flex min-w-0 items-center">
        <button type="button" onClick={onBack} aria-label="Back to conversations" className="relative after:absolute after:-inset-3">
          <ArrowLeft className="mr-2 h-4 w-4 cursor-pointer text-white/70 hover:text-white lg:mr-4 lg:h-5 lg:w-5" />
        </button>
        <div className="flex min-w-0 items-center gap-3">
          {isGroup ? (
            group?.avatar ? (
              <img src={group.avatar} alt="Group" className="mx-auto h-8 w-8 rounded-full bg-purple-100 object-cover lg:mx-0" />
            ) : (
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-fuchsia-950/40 text-fuchsia-300 lg:mx-0">
                <Users size={16} />
              </div>
            )
          ) : isLoadingUserStats ? (
            <Skeleton circle width={32} height={32} {...skeleton} />
          ) : userStats?.profileImage ? (
            <img src={userStats.profileImage} alt="Profile" className="mx-auto h-8 w-8 rounded-full bg-purple-100 object-cover lg:mx-0" />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-fuchsia-950/40 text-sm font-medium text-fuchsia-300">
              {clickedUser?.[0]?.toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            {isGroup ? (
              <div>
                <p className="truncate text-sm text-white/90 lg:text-base">{group?.name || "Group"}</p>
                <p className="text-xs text-[#8A8A93]">{group?.members?.length ?? 0} members</p>
              </div>
            ) : isLoadingUserStats ? (
              <div className="space-y-0">
                <Skeleton width={130} height={12} borderRadius={6} {...skeleton} />
                <Skeleton width={90} height={10} borderRadius={6} {...skeleton} />
              </div>
            ) : (
              <div>
                <p className="truncate text-sm text-white/90 lg:text-base">{clickedUser}</p>
                <div className="flex items-center gap-2 overflow-x-auto text-xs text-[#8A8A93]">
                  {isOnlineByLastActive(userStats?.lastActive) ? (
                    <>
                      <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                      <p className="text-xs text-[#8A8A93]">Online</p>
                    </>
                  ) : (
                    <p className="text-xs text-[#8A8A93]">{formatTimeAgo(userStats?.lastActive)}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative ml-2 shrink-0" ref={menuRef}>
        <button
          type="button"
          aria-label="Open chat actions"
          aria-expanded={isMenuOpen}
          aria-haspopup="menu"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="cursor-pointer rounded-2xl bg-white/5 p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Ellipsis className="h-4 w-4 lg:h-5 lg:w-5" />
        </button>

        {isMenuOpen && (
          <div
            role="menu"
            className="absolute right-0 z-4 mt-2 grid w-52 gap-1 overflow-hidden rounded-2xl border border-white/10 bg-black/95 p-2 shadow-xl shadow-black/40 backdrop-blur-sm"
          >
            {isGroup ? (
              <button type="button" role="menuitem" onClick={pick(onManageMembers)} className={MENU_ITEM}>
                Manage members
              </button>
            ) : (
              <button
                type="button"
                role="menuitem"
                disabled={!userSelected?.username}
                onClick={pick(() => navigate(`/users/${userSelected.username}`))}
                className={MENU_ITEM}
              >
                View Profile
              </button>
            )}
            <button type="button" role="menuitem" onClick={pick(onToggleMute)} className={MENU_ITEM}>
              {isMuted ? "Unmute notifications" : "Mute notifications"}
            </button>
            {/* Destructive-ish actions confirm first. */}
            <button type="button" role="menuitem" onClick={pick(() => onConfirm("clear"))} className={MENU_ITEM}>
              Clear chat
            </button>
            {!isGroup && !isBlockedByMe && (
              <button
                type="button"
                role="menuitem"
                onClick={pick(() => onConfirm("block"))}
                className={`${MENU_ITEM} text-red-300! hover:bg-red-950/40!`}
              >
                Block user
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
