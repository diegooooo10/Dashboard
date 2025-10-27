import { lazy, Suspense } from "react";
import type {
  RecentSaleType,
  StatsSalesOverviewType,
  TopProductType,
  TotalOverviewPerMonthType,
} from "../../types";
import { CircleLoader } from "../Loaders";
const Graphic = lazy(() => import("./Graphic"));

type StatsGridProps = {
  StatsSalesOverview: StatsSalesOverviewType[];
  totalOverviewPerMonth: TotalOverviewPerMonthType[];
  topProducts: TopProductType[];
  recentSales: RecentSaleType[];
};

export const StatsGrid = ({
  StatsSalesOverview,
  recentSales,
  topProducts,
  totalOverviewPerMonth,
}: StatsGridProps) => {
  return (
    <article className="flex flex-col gap-5">
      <header className="grid md:grid-cols-3  grid-cols-1 gap-5">
        {StatsSalesOverview.map((item) => (
          <div
            className="card flex justify-between items-center gap-2 text-text-secondary dark:text-text-secondary-dark p-4 text-sm"
            key={item.title}
          >
            <aside className="grid">
              <p>{item.title}</p>
              <span className="text-text dark:text-text-dark font-bold text-lg mt-2 mb-1">
                {item.data}
              </span>
              <p className="text-xs">from last month</p>
            </aside>
            {item.icon}
          </div>
        ))}
      </header>
      <section className="flex gap-5 flex-col md:flex-row">
        <div className="w-full card p-4">
          <h3 className="font-semibold text-text dark:text-text-dark">
            Your Monthly Overview
          </h3>
          <span className="text-text-secondary dark:text-text-secondary-dark text-sm">
            See how much you've spent and what you've purchased this month.
          </span>
          {totalOverviewPerMonth.length < 1 ? (
            <p className="text-sm text-center text-text-secondary dark:text-text-secondary-dark my-5">
              No purchases in the last 6 months.
            </p>
          ) : (
            <Suspense fallback={<CircleLoader />}>
              <Graphic
                label="Monthly Overview"
                textDescription="Overview"
                dataChart={totalOverviewPerMonth.map(
                  (totalOverview) => totalOverview.total
                )}
                labels={totalOverviewPerMonth.map(
                  (totalOverview) => totalOverview.month
                )}
              />
            </Suspense>
          )}
        </div>
        <div className="w-full card p-4">
          <h3 className="font-semibold text-text dark:text-text-dark">
            Your Top Products
          </h3>
          <span className="text-text-secondary dark:text-text-secondary-dark text-sm">
            The items you’ve bought the most this month.
          </span>
          {totalOverviewPerMonth.length < 1 ? (
            <p className="text-sm text-center text-text-secondary dark:text-text-secondary-dark my-5">
              No products purchased yet.
            </p>
          ) : (
            <Suspense fallback={<CircleLoader />}>
              <Graphic
                label="Top Products"
                textDescription="Quantity"
                dataChart={topProducts.map((topProduct) => topProduct.quantity)}
                labels={topProducts.map((topProduct) => topProduct.name)}
              />
            </Suspense>
          )}
        </div>
      </section>
      <footer className="card p-4">
        <h3 className="font-semibold text-text dark:text-text-dark">
          Your Recent Purchases
        </h3>
        <span className="text-text-secondary dark:text-text-secondary-dark text-sm">
          A summary of your latest orders and transactions.
        </span>
        {recentSales.length < 1 ? (
          <p className="text-sm text-center text-text-secondary dark:text-text-secondary-dark my-5">
            No recent purchases found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-4">
            {recentSales.map((sale) => (
              <div
                key={sale.name}
                className="flex justify-between items-center p-4 card"
              >
                <div className="flex flex-col">
                  <p className="font-medium text-text dark:text-text-dark">
                    {sale.name}
                  </p>
                </div>

                <p className="font-medium text-text dark:text-text-dark">
                  {`$${sale.price.toFixed(2)}`}
                </p>
              </div>
            ))}
          </div>
        )}
      </footer>
    </article>
  );
};
