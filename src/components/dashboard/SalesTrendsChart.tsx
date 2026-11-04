"use client";

import React from "react";
import { Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/formatters";
import { type SalesTrendsChartProps } from "@/types/dashboard";
import { useLanguage } from "@/context/LanguageContext";

export function SalesTrendsChart({
  weeklyData,
  activeDayIdx,
  setActiveDayIdx,
  chartView,
  setChartView,
  currency,
}: SalesTrendsChartProps) {
  const { dictionary } = useLanguage();
  const maxRevenue = Math.max(...weeklyData.map((d) => d.sales), 1);
  const maxOrders = Math.max(...weeklyData.map((d) => d.orders), 1);
  const selectedDay = weeklyData[activeDayIdx] || weeklyData[0];

  return (
    <Card className="lg:col-span-8 border-border bg-card rounded-2xl shadow-2xs flex flex-col justify-between">
      <CardHeader className="p-5 border-b border-border flex flex-row items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-primary flex items-center justify-center">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-sm font-bold text-foreground">
              {dictionary.dashboard.weeklySalesTitle}
            </CardTitle>
            <p className="text-[11px] text-muted-foreground">
              {dictionary.dashboard.weeklySalesSubtitle}
            </p>
          </div>
        </div>

        {/* Toggle Revenue / Orders */}
        <div className="flex items-center bg-muted/60 p-1 rounded-lg border border-border text-xs">
          <button
            onClick={() => setChartView("revenue")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
              chartView === "revenue"
                ? "bg-card text-foreground font-bold shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {dictionary.dashboard.revenue}
          </button>
          <button
            onClick={() => setChartView("orders")}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
              chartView === "orders"
                ? "bg-card text-foreground font-bold shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {dictionary.dashboard.orders}
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Active Bar Highlight Info */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-border/60">
          <div>
            <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider block">
              Selected: {selectedDay.day}
            </span>
            <span className="text-xl font-bold font-mono text-primary">
              {chartView === "revenue"
                ? formatCurrency(selectedDay.sales, currency)
                : `${selectedDay.orders} orders`}
            </span>
          </div>
          <Badge
            variant="outline"
            className="text-xs border-purple-400/40 text-purple-600 bg-purple-50 dark:bg-purple-950/40 font-mono"
          >
            {selectedDay.isToday ? "Today (Live)" : "Historical"}
          </Badge>
        </div>

        {/* Interactive Bar Chart Graphic */}
        <div className="h-52 flex items-end justify-between gap-3 sm:gap-6 pt-4 px-2">
          {weeklyData.map((item, idx) => {
            const heightPercent =
              chartView === "revenue"
                ? Math.max(15, Math.round((item.sales / maxRevenue) * 100))
                : Math.max(15, Math.round((item.orders / maxOrders) * 100));

            const isSelected = activeDayIdx === idx;

            return (
              <div
                key={item.day}
                onClick={() => setActiveDayIdx(idx)}
                className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group"
              >
                {/* Value tooltip */}
                <span
                  className={`text-[10px] font-mono font-bold mb-1.5 transition-all ${
                    isSelected
                      ? "text-primary scale-105"
                      : "text-transparent group-hover:text-muted-foreground"
                  }`}
                >
                  {chartView === "revenue"
                    ? Math.round(item.sales / (currency === "LAK" ? 1000 : 1)) +
                      (currency === "LAK" ? "k" : "")
                    : item.orders}
                </span>

                {/* Pillar */}
                <div className="w-full max-w-[42px] bg-muted/50 rounded-xl overflow-hidden h-full flex items-end p-1 border border-border/50 group-hover:border-primary/40 transition-colors">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-lg transition-all duration-500 ${
                      isSelected
                        ? "bg-gradient-to-t from-purple-700 via-indigo-600 to-purple-500 shadow-md shadow-purple-500/30"
                        : item.isToday
                        ? "bg-gradient-to-t from-purple-600 to-indigo-500 opacity-90"
                        : "bg-gradient-to-t from-zinc-300 to-zinc-400 dark:from-zinc-700 dark:to-zinc-600 group-hover:from-purple-400 group-hover:to-indigo-400"
                    }`}
                  />
                </div>

                {/* Label */}
                <span
                  className={`text-xs mt-2.5 font-medium transition-colors ${
                    isSelected
                      ? "text-primary font-bold"
                      : item.isToday
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

