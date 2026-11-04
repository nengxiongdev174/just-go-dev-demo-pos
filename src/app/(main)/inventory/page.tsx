"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePOS } from "@/context/POSContext";
import { InventoryManager } from "@/components/inventory/InventoryManager";

export default function InventoryPage() {
  const { products, currency, handleUpdateProducts, user, isMounted } = usePOS();
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
    <InventoryManager
      products={products}
      currency={currency}
      onUpdateProducts={handleUpdateProducts}
    />
  );
}

