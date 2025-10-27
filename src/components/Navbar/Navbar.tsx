import { useEffect } from "react";
import { useAuthStore, useModalStore } from "../../store";
import { useIsDesktop } from "../../utils";
import { ImageProfile } from "../Common";
import { IconClose, IconMenu } from "../Icons";

export const Navbar = () => {
  const { rol, fullName, imageProfile } = useAuthStore(
    (store) => store.userConfiguration
  );
  const { isOpenSidebar, changeStateSidebar } = useModalStore();
  const isDesktop = useIsDesktop();
  useEffect(() => {
    if (!isDesktop) changeStateSidebar(false);
  }, [changeStateSidebar, isDesktop]);

  return (
    <header
      className={`flex justify-between items-center px-5 py-2 h-[5.05rem] bg-bg-sidebar border-b border-b-divider dark:bg-bg-sidebar-dark dark:border-b-divider-dark fixed transition-size z-50 
          lg:w-[calc(100%-80px)] w-full `}
    >
      <div className="flex gap-2 items-center">
        {!isDesktop && !isOpenSidebar && (
          <button
            aria-label="change menu state"
            onClick={() => changeStateSidebar(!isOpenSidebar)}
            className="cursor-pointer"
          >
            {isOpenSidebar ? <IconClose /> : <IconMenu />}
          </button>
        )}
        <h1 className="font-bold md:text-xl text-lg">
          {rol
            ? `${rol[0].toUpperCase() + rol.slice(1)} Dashboard`
            : "Dashboard"}
        </h1>
      </div>
      {(!isOpenSidebar && isDesktop) || !isDesktop ? (
        <ImageProfile
          fullName={fullName}
          src={imageProfile}
          className="w-14 h-14"
        />
      ) : null}
    </header>
  );
};
