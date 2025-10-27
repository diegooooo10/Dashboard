import { Outlet } from "react-router-dom";
import { AuthWrapper, Navbar, Sidebar } from "../components";
import { useModalStore } from "../store";

export const DashboardLayout = () => {
  const isOpenSidebar = useModalStore((state) => state.isOpenSidebar);
  return (
    <AuthWrapper>
      <>
        <article className="w-full min-h-dvh flex ">
          <Sidebar />
          <section
            className={`w-full transition-size ${
              isOpenSidebar ? "lg:ml-[210px] xl:ml-[260px] " : "lg:ml-20"
            } `}
          >
            <Navbar />
            <Outlet />
          </section>
        </article>
      </>
    </AuthWrapper>
  );
};
