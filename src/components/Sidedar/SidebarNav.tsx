import { navItems } from "../../constants";
import type { Rol } from "../../types";
import { NavLink } from "react-router-dom";
import { useIsDesktop } from "../../utils";

type SidebarNavProps = {
  rol: Rol;
  isOpen: boolean;
  changeStateSidebar: (isOpenSidebar: boolean) => void;
};

export const SidebarNav = ({
  rol,
  isOpen,
  changeStateSidebar,
}: SidebarNavProps) => {
  const isDesktop = useIsDesktop();
  return (
    <nav className="flex-1 p-4 ">
      <ul className="space-y-2 mx-auto h-full flex flex-col justify-around lg:justify-start lg:gap-2">
        {navItems.map(
          ({ Icon, Label, AllowedRoles, Route }) =>
            AllowedRoles.includes(rol) && (
              <li
                key={Label}
                className={`max-lg:flex ${
                  !isOpen && "flex"
                } items-center justify-center`}
                aria-label={Label}
                onClick={() => {
                  if (!isDesktop) {
                    changeStateSidebar(false);
                  }
                }}
              >
                <NavLink
                  aria-label={`navigate to ${Label}`}
                  to={Route}
                  className={({ isActive }) =>
                    `flex gap-2 ${
                      isActive
                        ? "text-text font-semibold dark:text-text-dark"
                        : "text-text-secondary dark:text-text-secondary-dark"
                    } flex items-center text-sm`
                  }
                >
                  {Icon}
                  {isOpen && Label}
                </NavLink>
              </li>
            )
        )}
      </ul>
    </nav>
  );
};
