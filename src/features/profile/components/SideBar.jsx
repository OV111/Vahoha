import { useEffect } from "react";
import { sidebarArr } from "@/constants/profileSidebar";
import { isRecruiterBlockedPath } from "@shared/recruiterAccess";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/useAuthStore.js";
import useIntroStore from "@/features/profile/hooks/useIntroStore.js";
import useViewOnly from "@/features/hiring/useViewOnly";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

const hasIntros = sidebarArr.some((g) => g.items.some((i) => i.badge === "intros"));

export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();
  const isRecruiter = useViewOnly();
  const introsPending = useIntroStore((s) => s.pending);
  const loadIntrosPending = useIntroStore((s) => s.loadPending);

  useEffect(() => {
    if (hasIntros && !isRecruiter) loadIntrosPending();
  }, [isRecruiter, loadIntrosPending]);

  // Hiring accounts don't get links to learner-only pages they'd be sent away from.
  const groups = isRecruiter
    ? sidebarArr
        .map((g) => ({ ...g, items: g.items.filter((i) => !isRecruiterBlockedPath(i.to)) }))
        .filter((g) => g.items.length > 0)
    : sidebarArr;
  const badgeFor = (item) => (item.badge === "intros" ? introsPending : 0);

  const handleLogOut = async () => {
    // useAuthStore.logout() now owns the DELETE /log-out call (it revokes
    // the refresh token) — calling it here too would just double-fire the
    // request, so this only handles the UI feedback around it.
    await logout();
    toast.success("Logged out", { duration: 1500 });
    navigate("/get-started");
  };

  return (
    <>
      {/* Phones get a 56px icon rail (44px tap targets, a divider between groups);
          from lg up it opens into the labelled sidebar. */}
      <aside className="flex min-h-screen w-14 shrink-0 flex-col border-r border-white/10 bg-black transition-all duration-300 lg:sticky lg:top-0 lg:w-56">
        <nav aria-label="Profile" className="flex min-h-0 flex-1 flex-col items-center py-3 lg:items-stretch lg:px-2 lg:py-2">
          {groups.map((group, gi) => (
            <div
              key={group.section}
              className={`flex w-full flex-col items-center gap-1 lg:items-stretch lg:pt-2 ${
                gi > 0 ? "mt-2 border-t border-white/10 pt-2 lg:mt-0 lg:border-t-0" : ""
              }`}
            >
              <p className="hidden px-2 py-0.5 text-[11px] font-semibold tracking-wider text-[#8A8A93] uppercase lg:block">
                {group.section}
              </p>
              {group.items.map((item) => (
                <NavLink
                  key={`${item.to}-${item.label}`}
                  to={item.to}
                  end={item.end}
                  aria-label={badgeFor(item) > 0 ? `${item.label}, ${badgeFor(item)} waiting` : item.label}
                  title={item.label}
                  className={({ isActive }) => {
                    const active = isActive || item.activePaths?.includes(location.pathname);
                    return `flex h-11 w-11 items-center justify-center rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 lg:h-auto lg:w-full lg:justify-start lg:gap-2 lg:rounded-lg lg:px-3 lg:py-2 ${
                      active
                        ? "bg-purple-500/15 text-purple-400"
                        : "text-gray-300 hover:bg-white/5 hover:text-white lg:text-gray-100"
                    }`;
                  }}
                >
                  <span className="relative flex items-center">
                    {item.icon}
                    {badgeFor(item) > 0 && (
                      <span aria-hidden="true" className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-purple-500 lg:hidden" />
                    )}
                  </span>
                  <span className="hidden text-[14px] lg:block">{item.label}</span>
                  {badgeFor(item) > 0 && (
                    <span aria-hidden="true" className="ml-auto hidden rounded-full bg-purple-600 px-1.5 py-0.5 font-mono text-xs leading-none text-white lg:block">
                      {badgeFor(item)}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="mt-auto flex flex-col items-center border-t border-white/10 py-3 lg:mx-2 lg:mb-2 lg:items-stretch lg:border-t-0 lg:py-0">
          <button
            type="button"
            onClick={handleLogOut}
            aria-label="Log out"
            title="Log out"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl text-gray-300 transition-colors hover:bg-red-500/20 hover:text-red-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 lg:h-auto lg:w-auto lg:justify-between lg:rounded-lg lg:bg-fuchsia-950/30 lg:px-3 lg:py-2 lg:text-gray-100 lg:hover:bg-red-600 lg:hover:text-white"
          >
            <span className="hidden text-[14px] font-medium lg:block">Logout</span>
            <LogOut size={18} aria-hidden="true" />
          </button>
        </div>
      </aside>
    </>
  );
}
