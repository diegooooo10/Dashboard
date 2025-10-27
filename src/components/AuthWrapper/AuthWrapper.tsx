import { useEffect, type PropsWithChildren } from "react";
import { useAuthStore } from "../../store";
import { CircleLoader } from "../Loaders";

export const AuthWrapper = ({ children }: PropsWithChildren) => {
  const { initAuth, user, userConfiguration, loading } = useAuthStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  if (loading || !user?.email || !userConfiguration.email)
    return <CircleLoader />;

  return <>{children}</>;
};
