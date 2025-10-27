import { create } from "zustand";
import type { DashboardState } from "../types/DashboardState";
import { getStatsDashboard } from "../utils";

export const useDashboardStore = create<DashboardState>((set) => ({
  dashboardData: {
    recentSale: [],
    statsSalesOverview: [],
    topProducts: [],
    totalOverview: [],
  },
  setDashboardData: (dashboard) => {
    const { recentSale, statsSalesOverview, topProducts, totalOverview } =
      getStatsDashboard(dashboard);
    set({
      dashboardData: {
        recentSale,
        statsSalesOverview,
        topProducts,
        totalOverview,
      },
    });
  },
}));
