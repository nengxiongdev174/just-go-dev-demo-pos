"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePOS } from "@/context/POSContext";
import { AnalyticsDashboard } from "@/components/dashboard/AnalyticsDashboard";

export default function DashboardPage() {
  const { orders, products, currency, user, isMounted } = usePOS();
  const router = useRouter();

  useEffect(() => {
    if (isMounted && user && user.role === "cashier") {
      router.replace("/pos");
    }
  }, [isMounted, user, router]);

  if (!isMounted || !user || user.role === "cashier") {
    return null;
  }

  return (
    <AnalyticsDashboard
      orders={orders}
      products={products}
      currency={currency}
    />
  );
}

