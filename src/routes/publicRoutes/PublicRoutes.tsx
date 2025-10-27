import { lazy, Suspense } from "react";
import { CircleLoader } from "../../components";
import { RouteWithNotFound } from "../RouteWithNotFound";
import { Route } from "react-router-dom";
const FormAuthPage = lazy(() => import("../../pages/FormAuthPage"));
export const PublicRoutes = () => {
  return (
    <Suspense fallback={<CircleLoader />}>
      <RouteWithNotFound>
        <Route path="/" element={<FormAuthPage />} />
      </RouteWithNotFound>
    </Suspense>
  );
};
