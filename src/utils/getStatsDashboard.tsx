import { IconArchive, IconDollar, IconProduct } from "../components";
import type { DashboardModel } from "../models";
import type {
  RecentSaleType,
  StatsSalesOverviewType,
  TopProductType,
  TotalOverviewPerMonthType,
} from "../types";
import { isDateThisMonth } from "./isDateThisMonth";

const months = [
  { name: "January", index: 1 },
  { name: "February", index: 2 },
  { name: "March", index: 3 },
  { name: "April", index: 4 },
  { name: "May", index: 5 },
  { name: "June", index: 6 },
  { name: "July", index: 7 },
  { name: "August", index: 8 },
  { name: "September", index: 9 },
  { name: "October", index: 10 },
  { name: "November", index: 11 },
  { name: "December", index: 12 },
];
export const getStatsDashboard = (dashboard: DashboardModel) => {
  const currentMonth = new Date().getMonth();
  const pastMonths = [
    ...months.slice((currentMonth - 5 + 12) % 12, currentMonth + 1),
  ];

  const getStatsOverview = (): StatsSalesOverviewType[] => [
    {
      data: `$${dashboard.salesOverview
        .reduce((prev, curr) => {
          if (isDateThisMonth(curr.date)) return prev + curr.totalPrice;
          return prev;
        }, 0)
        .toFixed(2)}`,
      icon: (
        <IconDollar
          className="self-start text-text-secondary dark:text-text-secondary-dark"
          size={20}
        />
      ),
      title: "Total Spent",
    },
    {
      data: `${dashboard.salesOverview.reduce((prev, curr) => {
        if (isDateThisMonth(curr.date)) return prev + curr.Cart.length;
        return prev;
      }, 0)}`,
      icon: (
        <IconProduct
          className="self-start text-text-secondary dark:text-text-secondary-dark"
          size={20}
        />
      ),
      title: "Total Orders",
    },
    {
      data: `${dashboard.salesOverview.reduce((prev, curr) => {
        if (isDateThisMonth(curr.date))
          return (
            prev + curr.Cart.reduce((acc2, curr2) => acc2 + curr2.quantity, 0)
          );
        return prev;
      }, 0)}`,
      icon: (
        <IconArchive
          className="self-start text-text-secondary dark:text-text-secondary-dark"
          size={20}
        />
      ),
      title: "Total Products Purchased",
    },
  ];

  const getTopProducts = (): TopProductType[] => {
    const productTotals: TopProductType[] = [];
    if (dashboard.salesOverview.length < 1) return productTotals;
    dashboard.salesOverview.forEach((sale) => {
      sale.Cart.forEach((product) => {
        const existingIndex = productTotals.findIndex(
          (item) => item.name === product.title
        );

        if (existingIndex !== -1) {
          productTotals[existingIndex].quantity += product.quantity;
        } else {
          productTotals.push({
            name: product.title,
            quantity: product.quantity,
          });
        }
      });
    });

    return productTotals.sort((a, b) => b.quantity - a.quantity).slice(0, 4);
  };

  const getTotalOverviewPerMonth = () => {
    const totalOverview: TotalOverviewPerMonthType[] = [];
    if (dashboard.salesOverview.length < 1) return totalOverview;

    dashboard.salesOverview.forEach((sale) => {
      const currentYear = new Date().getFullYear();
      const [month, day, year] = sale.date.split("/").map(Number);
      const currentMonth = pastMonths.find((m) => m.index === month);
      if (month <= 12 && day <= 31 && year <= currentYear && currentMonth) {
        const total = sale.Cart.reduce((acc, curr) => acc + curr.quantity, 0);
        const existingMonthIndex = totalOverview.findIndex(
          (overview) => overview.month === currentMonth.name
        );
        if (existingMonthIndex !== -1) {
          totalOverview[existingMonthIndex].total += total;
        } else {
          totalOverview.push({ total, month: currentMonth.name });
        }
      }
    });
    return totalOverview.sort((a, b) => b.total - a.total);
  };

  const getRecentSales = (): RecentSaleType[] => {
    const lastItem = dashboard.salesOverview.at(-1);
    if (!lastItem) return [];

    return lastItem.Cart.slice(0, 4).map((item) => ({
      name: item.title,
      price: item.finalPrice,
    }));
  };

  return {
    statsSalesOverview: getStatsOverview(),
    recentSale: getRecentSales(),
    topProducts: getTopProducts(),
    totalOverview: getTotalOverviewPerMonth(),
  };
};
