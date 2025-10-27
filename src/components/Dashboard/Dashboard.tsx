import { useEffect, useState } from "react";
import { useAuthStore, useDashboardStore } from "../../store";
import type { DashboardModel } from "../../models";
import { subscribeToDashboard } from "../../services";
import { handleFirebaseError } from "../../utils";
import { CircleLoader } from "../Loaders";
import { StatsGrid } from "./StatsGrid";
import { initialDashboard } from "../../constants";

export const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const { dashboardData, setDashboardData } = useDashboardStore();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dashboard, setDashboard] = useState<DashboardModel>(initialDashboard);

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = subscribeToDashboard(
      user.uid,
      (data) => {
        setDashboard(data);
        setIsLoading(false);
      },
      (error) => {
        setError(handleFirebaseError(error.code));
        setIsLoading(false);
      }
    );
    return unsubscribe;
  }, [user?.uid]);

  useEffect(() => {
    setDashboardData(dashboard);
  }, [dashboard, setDashboardData]);

  return (
    <article className="mt-[5.05rem] py-3 px-6 text-text dark:text-text-dark">
      <header className="mb-4">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <p className="text-text-secondary dark:text-text-secondary-dark md:text-base text-sm">
          Complete overview of your business performance
        </p>
      </header>
      {isLoading && <CircleLoader />}
      {!isLoading && error !== "" && (
        <p className="text-lg text-error dark:text-error-dark font-semibold text-center">
          {error}
        </p>
      )}
      {!isLoading && error === "" && (
        <StatsGrid
          StatsSalesOverview={dashboardData.statsSalesOverview}
          recentSales={dashboardData.recentSale}
          topProducts={dashboardData.topProducts}
          totalOverviewPerMonth={dashboardData.totalOverview}
        />
      )}
    </article>
  );
};
