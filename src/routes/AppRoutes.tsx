import { Route } from "react-router-dom";
import { RouteWithNotFound } from "./RouteWithNotFound";
import { AuthRoute } from "./AuthRoute";
import { DashboardLayout, FormsLayout } from "../layouts";
import { PrivateRoutes } from "./privateRoutes";
import { PublicRoutes } from "./publicRoutes";
import { PublicRoute } from "./PublicRoute";

export const AppRoutes = () => {
  return (
    <RouteWithNotFound>
      <Route element={<AuthRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/home/*" element={<PrivateRoutes />} />
        </Route>
      </Route>
      <Route element={<PublicRoute />}>
        <Route element={<FormsLayout />}>
          <Route path="/*" element={<PublicRoutes />} />
        </Route>
      </Route>
    </RouteWithNotFound>
  );
};
