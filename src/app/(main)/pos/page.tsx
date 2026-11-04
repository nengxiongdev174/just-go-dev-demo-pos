"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePOS } from "@/context/POSContext";
import { PosTerminal } from "@/components/pos/PosTerminal";

export default function PosPage() {
  const { products, currency, user, handleOrderCompleted, isMounted } = usePOS();
  const router = useRouter();

  useEffect(() => {
    if (isMounted && user && user.role === "manager") {
      router.replace("/dashboard");
    }
  }, [isMounted, user, router]);

  if (!isMounted || !user || user.role === "manager") {
    return null;
  }

  return (
    <PosTerminal
      products={products}
      currency={currency}
      user={user}
      onOrderCompleted={handleOrderCompleted}
    />
  );
}

