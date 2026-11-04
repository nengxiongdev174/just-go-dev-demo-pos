"use client";

import React from "react";
import { type Product, type Currency, type Order, type DemoUser } from "@/types/pos";
import { usePosTerminal } from "@/hooks/usePosTerminal";
import { ProductCatalogGrid } from "./ProductCatalogGrid";
import { CartTicket } from "./CartTicket";
import { PaymentModal } from "./PaymentModal";
import { ReceiptModal } from "../receipt/ReceiptModal";

interface PosTerminalProps {
  products: Product[];
  currency: Currency;
  user: DemoUser | null;
  onOrderCompleted: (order: Order, updatedProducts: Product[]) => void;
}

export function PosTerminal({
  products,
  currency,
  user,
  onOrderCompleted,
}: PosTerminalProps) {
  const {
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    discountPercent,
    setDiscountPercent,
    subtotal,
    discountAmount,
    tax,
    total,
    showPaymentModal,
    setShowPaymentModal,
    completedOrder,
    setCompletedOrder,
    handleOrderSuccess,
  } = usePosTerminal(products, currency, onOrderCompleted);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <ProductCatalogGrid
            products={products}
            currency={currency}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchQuery={search}
            setSearchQuery={setSearch}
            onAddToCart={addToCart}
          />
        </div>

        <div className="lg:col-span-4">
          <CartTicket
            cart={cart}
            currency={currency}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onClearCart={clearCart}
            onCheckout={() => setShowPaymentModal(true)}
            subtotal={subtotal}
            tax={tax}
            discount={discountAmount}
            total={total}
            discountPercent={discountPercent}
            setDiscountPercent={setDiscountPercent}
          />
        </div>
      </div>

      {showPaymentModal && (
        <PaymentModal
          items={cart}
          subtotal={subtotal}
          tax={tax}
          discount={discountAmount}
          total={total}
          currency={currency}
          cashierName={user?.name || "Nengxiong"}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handleOrderSuccess}
        />
      )}

      {completedOrder && (
        <ReceiptModal
          order={completedOrder}
          onClose={() => setCompletedOrder(null)}
        />
      )}
    </div>
  );
}
