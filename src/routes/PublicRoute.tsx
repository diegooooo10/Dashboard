import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";
import { CircleLoader } from "../components";

export const PublicRoute = () => {
  const { user, loading } = useAuthStore();
  if (loading) return <CircleLoader />;

  return user === null ? <Outlet /> : <Navigate to="/home/dashboard" replace />;
};
