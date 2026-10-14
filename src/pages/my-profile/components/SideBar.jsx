import { sidebarArr } from "../../../../constants/sidebars";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore.js";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();

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
      <aside className="flex min-h-screen w-10 flex-col overflow-hidden border-r border-white/10 bg-black transition-all duration-300 lg:w-56 lg:sticky lg:top-0">
        <nav className="flex min-h-0 flex-1 flex-col mt-2 lg:mt-0 gap-3 lg:gap-0 py-0 lg:px-2 lg:py-2">
          {sidebarArr.map((group) => (
            <div
              key={group.section}
              className="grid text-lg py-0 lg:pt-2 gap-3 lg:gap-1"
            >
              <p className="hidden px-2 py-0 text-[11px] uppercase tracking-wider text-[#8A8A93] font-semibold lg:block lg:py-0.5">
                {group.section}
              </p>
              {group.items.map((item) => (
                <NavLink
                  key={`${item.to}-${item.label}`}
                  to={item.to}
                  end={item.end}
                  aria-label={item.label}
                  title={item.label}
                  className={({ isActive }) =>
                    (() => {
                      const isAliasActive = item.activePaths?.includes(
                        location.pathname,
                      );
                      const active = isActive || isAliasActive;
                      return `flex w-10 items-center justify-center gap-0 rounded-none py-0 px-0 text-gray-700 transition-colors lg:hover:bg-black/5 dark:text-gray-100 lg:dark:hover:bg-white/10 lg:mx-auto lg:w-full lg:justify-start lg:gap-2 lg:rounded-lg lg:py-2 lg:px-3 ${
                        active
                          ? " text-purple-600  dark:text-purple-600"
                          : ""
                      }`;
                    })()
                  }
                >
                  <p className="flex items-center">{item.icon}</p>
                  <p className="hidden text-[14px] lg:block">{item.label}</p>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="mt-auto flex flex-col lg:mx-2 lg:mb-2">
          {/* Logout */}
          <button
            type="button"
            onClick={handleLogOut}
            aria-label="Log out"
            className="flex items-center justify-center w-10 py-2 text-gray-100 cursor-pointer transition-colors hover:bg-red-500/20 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-fuchsia-400 lg:w-auto lg:justify-between lg:px-3 lg:rounded-lg lg:bg-fuchsia-950/30 lg:hover:bg-red-600"
          >
            <span className="hidden text-[14px] font-medium lg:block">Logout</span>
            <LogOut size={16} />
          </button>
        </div>
      </aside>
    </>
  );
}
