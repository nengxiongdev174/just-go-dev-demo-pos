"use client";

import React from "react";
import { usePOS } from "@/context/POSContext";
import { PosTerminal } from "@/components/pos/PosTerminal";

export default function PosPage() {
  const { products, currency, user, handleOrderCompleted } = usePOS();

  return (
    <PosTerminal
      products={products}
      currency={currency}
      user={user}
      onOrderCompleted={handleOrderCompleted}
    />
  );
}

