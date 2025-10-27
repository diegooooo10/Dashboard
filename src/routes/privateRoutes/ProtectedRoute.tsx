import type { ReactNode } from "react";
import type { Rol } from "../../types";
import { navItems } from "../../constants";
import { Navigate } from "react-router-dom";
type ProtectedRouteProps = {
  element: ReactNode;
  rol: Rol;
  path: string;
};
export const ProtectedRoute = ({ element, rol, path }: ProtectedRouteProps) => {
  const item = navItems.find((item) => item.Route === `/home${path}`);
  const allowed = item?.AllowedRoles.includes(rol);

  if (!allowed) return <Navigate to="/home/dashboard" replace />;
  return element;
};
