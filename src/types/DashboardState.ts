import type { DashboardModel } from "../models";
import type {
  RecentSaleType,
  TopProductType,
  TotalOverviewPerMonthType,
} from "./DashboardTypes";
import type { StatsSalesOverviewType } from "./StatsTypes";
export type DashboardData = {
  statsSalesOverview: StatsSalesOverviewType[];
  recentSale: RecentSaleType[];
  topProducts: TopProductType[];
  totalOverview: TotalOverviewPerMonthType[];
};
export type DashboardState = {
  dashboardData: DashboardData;
  setDashboardData: (data: DashboardModel) => void;
};
