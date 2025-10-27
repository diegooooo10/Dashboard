import { lazy, Suspense } from "react";
import { CircleLoader } from "../../components";
import { RouteWithNotFound } from "../RouteWithNotFound";
import { Navigate, Route } from "react-router-dom";
import { useAuthStore } from "../../store";
import { ProtectedRoute } from "./ProtectedRoute";
const DashboardPage = lazy(() => import("../../pages/DashboardPage"));
const ProductPage = lazy(() => import("../../pages/ProductsPage"));
const SettingsPage = lazy(() => import("../../pages/SettingsPage"));
const CartPage = lazy(() => import("../../pages/CartPage"));
const ProfilePage = lazy(() => import("../../pages/ProfilePage"));
const HistoryPage = lazy(() => import("../../pages/HistoryPage"));
const UsersPage = lazy(() => import("../../pages/UsersPage"));

export const PrivateRoutes = () => {
  const {
    user,
    loading,
    userConfiguration: { rol },
  } = useAuthStore();
  if (!loading && !user) return <Navigate replace to="/" />;
  return (
    <Suspense fallback={<CircleLoader />}>
      <RouteWithNotFound>
        <Route path="/" index element={<Navigate to="/home/dashboard" />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              path="/dashboard"
              rol={rol}
              element={<DashboardPage />}
            />
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute
              path="/products"
              rol={rol}
              element={<ProductPage />}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute
              path="/settings"
              rol={rol}
              element={<SettingsPage />}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute path="/cart" rol={rol} element={<CartPage />} />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              path="/profile"
              rol={rol}
              element={<ProfilePage />}
            />
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute
              path="/history"
              rol={rol}
              element={<HistoryPage />}
            />
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute path="/users" rol={rol} element={<UsersPage />} />
          }
        />
      </RouteWithNotFound>
    </Suspense>
  );
};
