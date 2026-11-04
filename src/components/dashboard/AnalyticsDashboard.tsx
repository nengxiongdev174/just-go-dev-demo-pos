"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  CreditCard,
  ShoppingBag,
  Package,
  AlertTriangle,
  ArrowUpRight,
  Clock,
  PieChart,
  Calendar,
  Layers,
  Banknote,
  QrCode,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Order, type Product, type Currency } from "@/types/pos";
import { useLanguage } from "@/context/LanguageContext";

interface AnalyticsDashboardProps {
  orders: Order[];
  products: Product[];
  currency: Currency;
}

export function AnalyticsDashboard({
  orders,
  products,
  currency,
}: AnalyticsDashboardProps) {
  const { locale, dictionary } = useLanguage();
  const [activeDayIdx, setActiveDayIdx] = useState<number>(6); // Default: Today (Sunday)
  const [chartView, setChartView] = useState<"revenue" | "orders">("revenue");

  const formatPrice = (amount: number): string => {
    if (currency === "LAK") {
      return `₭ ${Math.round(amount).toLocaleString()}`;
    } else if (currency === "THB") {
      return `฿ ${amount.toFixed(2)}`;
    }
    return `$ ${amount.toFixed(2)}`;
  };

  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalOrdersCount = orders.length;
  const avgTicket = totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0;
  const activeProductsCount = products.filter((p) => p.stock > 0).length;
  const lowStockProducts = products.filter((p) => p.stock <= 5);

  // Weekly Trend Data (Simulated with current orders added into Today)
  const daysData = [
    { day: "Mon", revFactor: 0.65, orders: 12 },
    { day: "Tue", revFactor: 0.78, orders: 15 },
    { day: "Wed", revFactor: 0.82, orders: 18 },
    { day: "Thu", revFactor: 0.70, orders: 14 },
    { day: "Fri", revFactor: 1.15, orders: 24 },
    { day: "Sat", revFactor: 1.40, orders: 29 },
    { day: "Sun", revFactor: 1.0, orders: Math.max(totalOrdersCount, 16) }, // Today
  ];

  const baseUnit = totalRevenue > 0 ? totalRevenue : 450000;
  const weeklyTrends = daysData.map((d, i) => ({
    ...d,
    revenue: i === 6 ? totalRevenue : baseUnit * d.revFactor,
  }));

  const maxRevenue = Math.max(...weeklyTrends.map((d) => d.revenue), 1);
  const maxOrders = Math.max(...weeklyTrends.map((d) => d.orders), 1);

  // Category Distribution calculation
  const categoryStats = [
    {
      name: dictionary.common.categoryDrinks,
      color: "bg-purple-600",
      stroke: "#9333ea",
      percent: 42,
      amount: totalRevenue * 0.42,
    },
    {
      name: dictionary.common.categoryFood,
      color: "bg-emerald-500",
      stroke: "#10b981",
      percent: 28,
      amount: totalRevenue * 0.28,
    },
    {
      name: dictionary.common.categoryElectronics,
      color: "bg-indigo-500",
      stroke: "#6366f1",
      percent: 20,
      amount: totalRevenue * 0.2,
    },
    {
      name: dictionary.common.categoryRetail,
      color: "bg-amber-500",
      stroke: "#f59e0b",
      percent: 10,
      amount: totalRevenue * 0.1,
    },
  ];

  // Payment Breakdown
  const paymentBreakdown = [
    { label: "QR Code (OnePay / PromptPay)", percent: 56, icon: QrCode, color: "text-indigo-600" },
    { label: dictionary.common.cash, percent: 32, icon: Banknote, color: "text-emerald-600" },
    { label: dictionary.common.card, percent: 12, icon: CreditCard, color: "text-amber-600" },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards (4 Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Revenue */}
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
              {formatPrice(totalRevenue)}
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1.5">
              <ArrowUpRight className="w-3 h-3" />
              <span>{dictionary.dashboard.growthCompare}</span>
            </p>
          </CardContent>
        </Card>

        {/* Orders */}
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

        {/* Avg Ticket */}
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
              {formatPrice(avgTicket)}
            </div>
            <p className="text-[11px] text-muted-foreground mt-1.5">
              {dictionary.dashboard.averageBasketValue}
            </p>
          </CardContent>
        </Card>

        {/* Active Items */}
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
              {activeProductsCount} / {products.length}
            </div>
            <p className="text-[11px] text-amber-600 font-medium mt-1.5">
              {dictionary.dashboard.itemsLowStock.replace("{count}", String(lowStockProducts.length))}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Visual Charts Section (Grid: 8 Cols Bar/Trend Chart + 4 Cols Donut/Category) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Revenue & Volume Chart (8 Cols) */}
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
                  Selected: {weeklyTrends[activeDayIdx].day}
                </span>
                <span className="text-xl font-bold font-mono text-primary">
                  {chartView === "revenue"
                    ? formatPrice(weeklyTrends[activeDayIdx].revenue)
                    : `${weeklyTrends[activeDayIdx].orders} orders`}
                </span>
              </div>
              <Badge variant="outline" className="text-xs border-purple-400/40 text-purple-600 bg-purple-50 dark:bg-purple-950/40 font-mono">
                {activeDayIdx === 6 ? "Today (Live)" : "Historical"}
              </Badge>
            </div>

            {/* Interactive Bar Chart Graphic */}
            <div className="h-52 flex items-end justify-between gap-3 sm:gap-6 pt-4 px-2">
              {weeklyTrends.map((item, idx) => {
                const heightPercent =
                  chartView === "revenue"
                    ? Math.max(15, Math.round((item.revenue / maxRevenue) * 100))
                    : Math.max(15, Math.round((item.orders / maxOrders) * 100));

                const isSelected = activeDayIdx === idx;
                const isToday = idx === 6;

                return (
                  <div
                    key={item.day}
                    onClick={() => setActiveDayIdx(idx)}
                    className="flex-1 flex flex-col items-center h-full justify-end cursor-pointer group"
                  >
                    {/* Hover Value Popup */}
                    <span
                      className={`text-[10px] font-mono font-bold mb-1.5 transition-all ${
                        isSelected ? "text-primary scale-105" : "text-transparent group-hover:text-muted-foreground"
                      }`}
                    >
                      {chartView === "revenue"
                        ? Math.round(item.revenue / (currency === "LAK" ? 1000 : 1)) + (currency === "LAK" ? "k" : "")
                        : item.orders}
                    </span>

                    {/* Bar Pillar */}
                    <div className="w-full max-w-[42px] bg-muted/50 rounded-xl overflow-hidden h-full flex items-end p-1 border border-border/50 group-hover:border-primary/40 transition-colors">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-lg transition-all duration-500 ${
                          isSelected
                            ? "bg-gradient-to-t from-purple-700 via-indigo-600 to-purple-500 shadow-md shadow-purple-500/30"
                            : isToday
                            ? "bg-gradient-to-t from-purple-600 to-indigo-500 opacity-90"
                            : "bg-gradient-to-t from-zinc-300 to-zinc-400 dark:from-zinc-700 dark:to-zinc-600 group-hover:from-purple-400 group-hover:to-indigo-400"
                        }`}
                      />
                    </div>

                    {/* Day Label */}
                    <span
                      className={`text-xs mt-2.5 font-medium transition-colors ${
                        isSelected
                          ? "text-primary font-bold"
                          : isToday
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

        {/* Category Breakdown Donut / Progress (4 Cols) */}
        <Card className="lg:col-span-4 border-border bg-card rounded-2xl shadow-2xs flex flex-col justify-between">
          <CardHeader className="p-5 border-b border-border flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-primary" />
              <CardTitle className="text-sm font-bold text-foreground">
                {dictionary.dashboard.salesByCategory}
              </CardTitle>
            </div>
            <Badge variant="secondary" className="text-[10px] rounded-lg">
              4 {dictionary.common.category}
            </Badge>
          </CardHeader>

          <CardContent className="p-5 space-y-4">
            {/* Minimalist Visual Donut SVG */}
            <div className="flex items-center justify-center py-2 relative">
              <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="stroke-muted"
                  strokeWidth="12"
                  fill="transparent"
                />
                {/* Segment 1: Drinks (42%) */}
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
                {/* Segment 2: Food (28%) */}
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
                {/* Segment 3: Electronics (20%) */}
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
                {/* Segment 4: Retail (10%) */}
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
              {/* Inner Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-bold font-mono text-foreground leading-none">100%</span>
                <span className="text-[10px] text-muted-foreground mt-0.5">Catalog Mix</span>
              </div>
            </div>

            {/* Category Breakdown Progress Bars */}
            <div className="space-y-3 pt-2">
              {categoryStats.map((cat) => (
                <div key={cat.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-foreground font-medium">
                      <span className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                      <span>{cat.name}</span>
                    </span>
                    <span className="font-mono font-bold text-muted-foreground text-[11px]">
                      {cat.percent}% • {formatPrice(cat.amount)}
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
      </div>

      {/* Payment Methods & Transactions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Transactions Table (8 Cols) */}
        <div className="lg:col-span-8">
          <Card className="border-border bg-card rounded-2xl shadow-2xs">
            <CardHeader className="p-5 border-b border-border flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-foreground">
                  {dictionary.dashboard.recentTransactions}
                </CardTitle>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {dictionary.dashboard.liveOrdersDesc}
                </p>
              </div>
              <Badge variant="secondary" className="text-[10px] rounded-lg">
                {orders.length} {dictionary.dashboard.totalBadge}
              </Badge>
            </CardHeader>

            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">{dictionary.dashboard.tableCustomer}</TableHead>
                    <TableHead className="text-xs">{dictionary.dashboard.timeCashier}</TableHead>
                    <TableHead className="text-xs">{dictionary.common.paymentMethod}</TableHead>
                    <TableHead className="text-xs text-right">{dictionary.dashboard.tableAmount}</TableHead>
                    <TableHead className="text-xs text-center">{dictionary.dashboard.tableStatus}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-xs text-muted-foreground">
                        {dictionary.dashboard.noOrdersRecorded}
                      </TableCell>
                    </TableRow>
                  ) : (
                    orders.slice().reverse().map((ord) => (
                      <TableRow key={ord.id} className="text-xs">
                        <TableCell className="font-semibold font-mono text-primary">
                          {ord.orderNumber}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{ord.createdAt}</span>
                            <span>• {ord.cashierName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-[10px] uppercase font-mono py-0 rounded-md">
                            {ord.paymentMethod}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-bold font-mono">
                          {formatPrice(ord.total)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="success" className="text-[10px] py-0 rounded-md">
                            {dictionary.dashboard.statusCompleted}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Payment Channels & Stock Alerts (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Payment Method Share */}
          <Card className="border-border bg-card rounded-2xl shadow-2xs p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="font-bold text-xs text-foreground flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-primary" />
                {dictionary.dashboard.paymentChannels}
              </span>
              <span className="text-[10px] text-muted-foreground">{dictionary.dashboard.distribution}</span>
            </div>

            <div className="space-y-3">
              {paymentBreakdown.map((pm) => {
                const Icon = pm.icon;
                return (
                  <div key={pm.label} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Icon className={`w-3.5 h-3.5 ${pm.color}`} />
                        <span>{pm.label}</span>
                      </span>
                      <span className="font-bold font-mono text-xs">{pm.percent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        style={{ width: `${pm.percent}%` }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Low Stock Alerts */}
          <Card className="border-border bg-card rounded-2xl shadow-2xs">
            <CardHeader className="p-4 border-b border-border flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <CardTitle className="text-xs font-bold text-foreground">
                  {dictionary.dashboard.inventoryAlerts}
                </CardTitle>
              </div>
              <Badge variant="warning" className="text-[10px] py-0 rounded-md">
                {lowStockProducts.length}
              </Badge>
            </CardHeader>

            <CardContent className="p-4 space-y-2">
              {lowStockProducts.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-2">
                  {dictionary.dashboard.allInventoryHealthy}
                </p>
              ) : (
                lowStockProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-muted/40 border border-border text-xs"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="font-semibold truncate text-foreground text-[11px]">
                        {p.name[locale] || p.name.en}
                      </p>
                      <span className="text-[9px] text-muted-foreground font-mono">
                        SKU: {p.barcode}
                      </span>
                    </div>

                    <Badge
                      variant={p.stock <= 0 ? "destructive" : "warning"}
                      className="text-[9px] font-mono px-1.5 py-0 shrink-0 rounded-md"
                    >
                      {p.stock <= 0 ? "Out" : dictionary.dashboard.left.replace("{count}", String(p.stock))}
                    </Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
