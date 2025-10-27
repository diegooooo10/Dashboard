import { useAuthStore, useModalStore } from "../../store";
import { ImageProfile } from "../Common";
import { IconClose, IconLogout, IconMenu } from "../Icons";
import { logoutUser } from "../../services";
import { SidebarNav } from "./SidebarNav";
import { useIsDesktop } from "../../utils";

export const Sidebar = () => {
  const { isOpenSidebar, changeStateSidebar } = useModalStore();
  const { imageProfile, rol, fullName } = useAuthStore(
    (state) => state.userConfiguration
  );
  const isDesktop = useIsDesktop();

  return (
    <aside
      className={`bg-bg-sidebar border-r border-r-border dark:bg-bg-sidebar-dark dark:border-r-border-dark dark:text-text-dark  flex flex-col text-text transition-size fixed h-dvh z-[100] ${
        isOpenSidebar ? "lg:w-[210px] xl:w-[260px] w-[100%]" : "md:w-20"
      } ${!isDesktop && !isOpenSidebar ? "-left-80" : "left-0"} `}
    >
      <header
        className={`flex items-center px-5 py-2 h-20  ${
          !isDesktop ? "justify-end h-fit" : "justify-between "
        } ${isDesktop && !isOpenSidebar && "justify-center"}`}
      >
        {isDesktop && (
          <section
            className={`flex gap-2  items-center overflow-hidden transition-size ${
              isOpenSidebar ? "opacity-100" : "opacity-0 w-0 h-0"
            }`}
          >
            <ImageProfile
              fullName={fullName}
              src={imageProfile}
              className="min-w-14 h-14"
            />
            <div className="flex flex-col">
              <p className="font-medium text-sm">{fullName}</p>
              <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
                {rol}
              </p>
            </div>
          </section>
        )}
        <button
          aria-label="change menu state"
          onClick={() => changeStateSidebar(!isOpenSidebar)}
          className="cursor-pointer"
        >
          {isOpenSidebar ? <IconClose /> : <IconMenu />}
        </button>
      </header>
      {isDesktop && <hr className="border-divider dark:border-divider-dark" />}

      <SidebarNav
        rol={rol}
        isOpen={isOpenSidebar}
        changeStateSidebar={changeStateSidebar}
      />

      <hr className="border-divider dark:border-divider-dark" />
      <footer
        className={`p-4 ${
          (!isOpenSidebar || (!isDesktop && isOpenSidebar)) &&
          "flex items-center justify-center"
        }`}
      >
        <button
          className="flex items-center gap-2 cursor-pointer font-semibold text-text-secondary dark:text-text-secondary-dark w-fit"
          aria-label="logout user"
          onClick={logoutUser}
        >
          <IconLogout size={20} />
          {isOpenSidebar && <p>Logout</p>}
        </button>
      </footer>
    </aside>
  );
};
