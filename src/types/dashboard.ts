import { type Order, type Product, type Currency } from "@/types/pos";

export interface DashboardProps {
  orders: Order[];
  products: Product[];
  currency: Currency;
}

export interface DaySaleStat {
  day: string;
  dateStr: string;
  sales: number;
  orders: number;
  isToday?: boolean;
}

export interface CategoryStat {
  name: string;
  count: number;
  color: string;
}

export interface PaymentChannelStat {
  name: string;
  amount: number;
  percentage: number;
  icon: string;
  color: string;
  badgeColor: string;
}

export interface DashboardKpisProps {
  totalRevenue: number;
  totalOrdersCount: number;
  avgTicket: number;
  activeProductsCount: number;
  totalProductsCount: number;
  lowStockCount: number;
  currency: Currency;
}

export interface SalesTrendsChartProps {
  weeklyData: DaySaleStat[];
  activeDayIdx: number;
  setActiveDayIdx: (idx: number) => void;
  chartView: "revenue" | "orders";
  setChartView: (view: "revenue" | "orders") => void;
  currency: Currency;
}

export interface CategoryBreakdownProps {
  categoryStats: CategoryStat[];
  totalCategorySales: number;
  lowStockProducts: Product[];
}

export interface PaymentChannelsProps {
  paymentStats: PaymentChannelStat[];
  totalPayments: number;
  currency: Currency;
}

export interface RecentOrdersTableProps {
  orders: Order[];
  currency: Currency;
}

