import { useEffect } from "react";
import { useDashboardStore } from "../../store";
import { initialDashboard } from "../../constants";
export const Activity = () => {
  const { dashboardData, setDashboardData } = useDashboardStore();
  useEffect(() => {
    if (dashboardData.statsSalesOverview.length < 1) {
      setDashboardData(initialDashboard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="card p-5 col-span-full ">
      <h3 className="font-bold text-lg">Activity Overview</h3>
      <p className="text-text-secondary dark:text-text-secondary-dark md:text-base text-sm mb-4">
        Your activity statics
      </p>
      <section className="lg:grid-cols-3 grid-cols-1 grid gap-5">
        {dashboardData.statsSalesOverview.map((item) => (
          <div
            key={item.title}
            className="flex flex-col gap-2 bg-bg-sidebar border-border dark:bg-bg-sidebar-dark dark:border-border-dark border rounded-md p-5"
          >
            <h4 className="text-text-secondary dark:text-text-secondary-dark text-sm">
              {item.title}
            </h4>
            <p className="text-xl font-bold text-text dark:text-text-dark">
              {item.data}
            </p>
          </div>
        ))}
      </section>
    </section>
  );
};
