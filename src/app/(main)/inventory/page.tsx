"use client";

import React from "react";
import { usePOS } from "@/context/POSContext";
import { InventoryManager } from "@/components/inventory/InventoryManager";

export default function InventoryPage() {
  const { products, currency, handleUpdateProducts } = usePOS();

  return (
    <InventoryManager
      products={products}
      currency={currency}
      onUpdateProducts={handleUpdateProducts}
    />
  );
}

