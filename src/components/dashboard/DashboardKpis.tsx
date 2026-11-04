"use client";

import React from "react";
import { TrendingUp, ShoppingBag, CreditCard, Package, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { formatCurrency } from "@/lib/formatters";
import { type DashboardKpisProps } from "@/types/dashboard";

export function DashboardKpis({
  totalRevenue,
  totalOrdersCount,
  avgTicket,
  activeProductsCount,
  totalProductsCount,
  lowStockCount,
  currency,
}: DashboardKpisProps) {
  const { dictionary } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Gross Revenue */}
      <Card className="border-border bg-card rounded-2xl shadow-2xs hover:border-primary/40 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
          <CardTitle className="text-xs font-semibold text-muted-foreground">
            {dictionary.dashboard.kpiRevenue}
          </CardTitle>
          <div className="h-9 w-9 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-primary flex items-center justify-center">
            <TrendingUp className="w-4 h-4" />
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <div className="text-2xl font-extrabold text-foreground tracking-tight font-mono">
            {formatCurrency(totalRevenue, currency)}
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1.5">
            <ArrowUpRight className="w-3 h-3" />
            <span>{dictionary.dashboard.growthCompare}</span>
          </p>
        </CardContent>
      </Card>

      {/* Orders Count */}
      <Card className="border-border bg-card rounded-2xl shadow-2xs hover:border-primary/40 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
          <CardTitle className="text-xs font-semibold text-muted-foreground">
            {dictionary.dashboard.kpiOrders}
          </CardTitle>
          <div className="h-9 w-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center">
            <ShoppingBag className="w-4 h-4" />
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <div className="text-2xl font-extrabold text-foreground tracking-tight font-mono">
            {totalOrdersCount}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1.5">
            {dictionary.dashboard.completedTransactions}
          </p>
        </CardContent>
      </Card>

      {/* Average Basket */}
      <Card className="border-border bg-card rounded-2xl shadow-2xs hover:border-primary/40 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
          <CardTitle className="text-xs font-semibold text-muted-foreground">
            {dictionary.dashboard.kpiAvgTicket}
          </CardTitle>
          <div className="h-9 w-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
            <CreditCard className="w-4 h-4" />
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <div className="text-2xl font-extrabold text-foreground tracking-tight font-mono">
            {formatCurrency(avgTicket, currency)}
          </div>
          <p className="text-[11px] text-muted-foreground mt-1.5">
            {dictionary.dashboard.averageBasketValue}
          </p>
        </CardContent>
      </Card>

      {/* Active Inventory */}
      <Card className="border-border bg-card rounded-2xl shadow-2xs hover:border-primary/40 transition-colors">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
          <CardTitle className="text-xs font-semibold text-muted-foreground">
            {dictionary.dashboard.kpiActiveItems}
          </CardTitle>
          <div className="h-9 w-9 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center">
            <Package className="w-4 h-4" />
          </div>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <div className="text-2xl font-extrabold text-foreground tracking-tight font-mono">
            {activeProductsCount} / {totalProductsCount}
          </div>
          <p className="text-[11px] text-amber-600 font-medium mt-1.5">
            {lowStockCount} {dictionary.dashboard.itemsLowStock}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

