import { Outlet } from "react-router-dom";

export const FormsLayout = () => {
  return (
    <article className="w-full min-h-dvh flex items-center justify-center px-2">
      <Outlet />
    </article>
  );
};
