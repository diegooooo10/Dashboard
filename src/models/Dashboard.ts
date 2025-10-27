import type { HistoryModel } from "./History";

export interface DashboardModel {
  totalRevenue: number;
  totalSales: number;
  products: number;
  salesOverview: HistoryModel[];
}
