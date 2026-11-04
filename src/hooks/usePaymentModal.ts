import { useState } from "react";
import { type CartItem, type Currency, type Order } from "@/types/pos";

export function usePaymentModal(
  items: CartItem[],
  subtotal: number,
  tax: number,
  discount: number,
  total: number,
  currency: Currency,
  cashierName: string,
  onSuccess: (order: Order) => void
) {
  const [method, setMethod] = useState<"cash" | "qr" | "card">("qr");
  const [receivedAmount, setReceivedAmount] = useState<number | string>(total);

  const numReceived = typeof receivedAmount === "string" ? (receivedAmount.trim() === "" ? 0 : Number(receivedAmount) || 0) : receivedAmount;
  const change = Math.max(0, numReceived - total);

  const handleCompletePayment = () => {
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      items: items.map((ci) => {
        const itemPrice =
          currency === "LAK"
            ? ci.product.priceLAK
            : currency === "THB"
            ? ci.product.priceTHB
            : ci.product.priceUSD;
        return {
          id: ci.product.id,
          name: ci.product.name.en || ci.product.name.th || ci.product.name.lo,
          price: itemPrice,
          quantity: ci.quantity,
          subtotal: itemPrice * ci.quantity,
        };
      }),
      subtotal,
      tax,
      discount,
      total,
      currency,
      paymentMethod: method,
      cashierName,
      createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      timestamp: Date.now(),
    };

    onSuccess(newOrder);
  };

  return {
    method,
    setMethod,
    receivedAmount,
    setReceivedAmount,
    change,
    handleCompletePayment,
  };
}

