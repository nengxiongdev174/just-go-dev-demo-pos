"use client";

import React from "react";
import { PieChart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/formatters";
import { type CategoryBreakdownProps } from "@/types/dashboard";
import { useLanguage } from "@/context/LanguageContext";
import { type Currency } from "@/types/pos";

export function CategoryBreakdown({
  totalCategorySales,
  currency,
}: Omit<CategoryBreakdownProps, "categoryStats"> & { currency: Currency }) {
  const { dictionary } = useLanguage();

  const categories = [
    {
      name: dictionary.common.categoryDrinks,
      color: "bg-purple-600",
      stroke: "#9333ea",
      percent: 42,
      amount: totalCategorySales * 0.42,
    },
    {
      name: dictionary.common.categoryFood,
      color: "bg-emerald-500",
      stroke: "#10b981",
      percent: 28,
      amount: totalCategorySales * 0.28,
    },
    {
      name: dictionary.common.categoryElectronics,
      color: "bg-indigo-500",
      stroke: "#6366f1",
      percent: 20,
      amount: totalCategorySales * 0.2,
    },
    {
      name: dictionary.common.categoryRetail,
      color: "bg-amber-500",
      stroke: "#f59e0b",
      percent: 10,
      amount: totalCategorySales * 0.1,
    },
  ];

  return (
    <Card className="lg:col-span-4 border-border bg-card rounded-2xl shadow-2xs flex flex-col justify-between">
      <CardHeader className="p-5 border-b border-border flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <PieChart className="w-4 h-4 text-primary" />
          <CardTitle className="text-sm font-bold text-foreground">
            {dictionary.dashboard.salesByCategory}
          </CardTitle>
        </div>
        <Badge variant="secondary" className="text-[10px] rounded-lg">
          {categories.length} {dictionary.common.category}
        </Badge>
      </CardHeader>

      <CardContent className="p-5 space-y-4">
        {/* Minimalist Visual Donut SVG */}
        <div className="flex items-center justify-center py-2 relative">
          <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              className="stroke-muted"
              strokeWidth="12"
              fill="transparent"
            />
            {/* Drinks (42%) */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#9333ea"
              strokeWidth="12"
              strokeDasharray="105 251"
              strokeDashoffset="0"
              fill="transparent"
              className="transition-all duration-700"
            />
            {/* Food (28%) */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#10b981"
              strokeWidth="12"
              strokeDasharray="70 251"
              strokeDashoffset="-105"
              fill="transparent"
              className="transition-all duration-700"
            />
            {/* Electronics (20%) */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#6366f1"
              strokeWidth="12"
              strokeDasharray="50 251"
              strokeDashoffset="-175"
              fill="transparent"
              className="transition-all duration-700"
            />
            {/* Retail (10%) */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#f59e0b"
              strokeWidth="12"
              strokeDasharray="26 251"
              strokeDashoffset="-225"
              fill="transparent"
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xl font-bold font-mono text-foreground leading-none">100%</span>
            <span className="text-[10px] text-muted-foreground mt-0.5">Catalog Mix</span>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-3 pt-2">
          {categories.map((cat) => (
            <div key={cat.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-foreground font-medium">
                  <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                  <span>{cat.name}</span>
                </span>
                <span className="font-mono font-bold text-muted-foreground text-[11px]">
                  {cat.percent}% • {formatCurrency(cat.amount, currency)}
                </span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  style={{ width: `${cat.percent}%` }}
                  className={`h-full rounded-full ${cat.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
