import { useState, useMemo } from "react";
import { type Order, type Product, type Currency } from "@/types/pos";
import { type DaySaleStat } from "@/types/dashboard";
import { convertCurrency } from "@/lib/formatters";

export function useAnalyticsDashboard(
  orders: Order[],
  products: Product[],
  currency: Currency = "LAK"
) {
  const [activeDayIdx, setActiveDayIdx] = useState<number>(6); // Default: Today (Sunday)
  const [chartView, setChartView] = useState<"revenue" | "orders">("revenue");

  const totalRevenue = useMemo(
    () =>
      orders.reduce(
        (sum, ord) => sum + convertCurrency(ord.total, ord.currency || "LAK", currency),
        0
      ),
    [orders, currency]
  );
  const totalOrdersCount = orders.length;
  const avgTicket = totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0;
  const activeProductsCount = useMemo(
    () => products.filter((p) => p.stock > 0).length,
    [products]
  );
  const lowStockProducts = useMemo(
    () => products.filter((p) => p.stock <= 5),
    [products]
  );

  const weeklyTrends: DaySaleStat[] = useMemo(() => {
    const daysData = [
      { day: "Mon", revFactor: 0.65, orders: 12 },
      { day: "Tue", revFactor: 0.78, orders: 15 },
      { day: "Wed", revFactor: 0.82, orders: 18 },
      { day: "Thu", revFactor: 0.7, orders: 14 },
      { day: "Fri", revFactor: 1.15, orders: 24 },
      { day: "Sat", revFactor: 1.4, orders: 29 },
      { day: "Sun", revFactor: 1.0, orders: Math.max(totalOrdersCount, 16), isToday: true },
    ];

    const baseUnit = totalRevenue > 0 ? totalRevenue : convertCurrency(450000, "LAK", currency);
    return daysData.map((d, i) => ({
      day: d.day,
      dateStr: d.day,
      sales: i === 6 ? totalRevenue : baseUnit * d.revFactor,
      orders: d.orders,
      isToday: d.isToday,
    }));
  }, [totalRevenue, totalOrdersCount, currency]);

  return {
    activeDayIdx,
    setActiveDayIdx,
    chartView,
    setChartView,
    totalRevenue,
    totalOrdersCount,
    avgTicket,
    activeProductsCount,
    lowStockProducts,
    weeklyTrends,
  };
}
