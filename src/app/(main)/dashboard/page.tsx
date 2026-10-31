"use client";

import React from "react";
import { usePOS } from "@/context/POSContext";
import { AnalyticsDashboard } from "@/components/dashboard/AnalyticsDashboard";

export default function DashboardPage() {
  const { orders, products, currency } = usePOS();

  return (
    <AnalyticsDashboard
      orders={orders}
      products={products}
      currency={currency}
    />
  );
}

