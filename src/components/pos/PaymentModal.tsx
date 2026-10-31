"use client";

import React, { useState } from "react";
import { Banknote, QrCode, CreditCard, X, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { type CartItem, type Currency, type Order } from "@/types/pos";
import { useLanguage } from "@/context/LanguageContext";

interface PaymentModalProps {
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  currency: Currency;
  cashierName: string;
  onClose: () => void;
  onSuccess: (order: Order) => void;
}

export function PaymentModal({
  items,
  subtotal,
  tax,
  discount,
  total,
  currency,
  cashierName,
  onClose,
  onSuccess,
}: PaymentModalProps) {
  const { dictionary } = useLanguage();
  const [method, setMethod] = useState<"cash" | "qr" | "card">("qr");
  const [receivedAmount, setReceivedAmount] = useState<number>(total);

  const formatPrice = (amount: number): string => {
    if (currency === "LAK") {
      return `₭ ${Math.round(amount).toLocaleString()}`;
    } else if (currency === "THB") {
      return `฿ ${amount.toFixed(2)}`;
    }
    return `$ ${amount.toFixed(2)}`;
  };

  const change = Math.max(0, receivedAmount - total);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-card text-card-foreground border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold mb-1">{dictionary.common.checkout}</h3>
        <p className="text-xs text-muted-foreground mb-4">
          {dictionary.auth.loggedInAs}: <span className="font-semibold text-primary">{cashierName}</span>
        </p>

        {/* Total to pay banner */}
        <div className="bg-gradient-to-r from-purple-600/10 via-indigo-600/10 to-pink-600/10 border border-purple-500/30 rounded-xl p-4 text-center mb-5">
          <span className="text-xs text-muted-foreground block">{dictionary.common.total}</span>
          <span className="text-2xl font-extrabold text-primary tracking-tight">
            {formatPrice(total)}
          </span>
          <div className="text-[11px] text-muted-foreground mt-0.5">
            {items.length} {dictionary.common.itemsCount} • VAT 7% ({formatPrice(tax)})
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-5">
          <label className="text-xs font-semibold text-muted-foreground block mb-2">
            {dictionary.common.paymentMethod}
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setMethod("qr")}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                method === "qr"
                  ? "border-primary bg-primary/10 ring-1 ring-primary shadow-xs"
                  : "border-border hover:bg-muted/50"
              }`}
            >
              <QrCode className="w-5 h-5 text-indigo-500" />
              <span className="text-[11px] font-semibold">QR Code</span>
            </button>

            <button
              onClick={() => setMethod("cash")}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                method === "cash"
                  ? "border-primary bg-primary/10 ring-1 ring-primary shadow-xs"
                  : "border-border hover:bg-muted/50"
              }`}
            >
              <Banknote className="w-5 h-5 text-emerald-500" />
              <span className="text-[11px] font-semibold">{dictionary.common.cash}</span>
            </button>

            <button
              onClick={() => setMethod("card")}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                method === "card"
                  ? "border-primary bg-primary/10 ring-1 ring-primary shadow-xs"
                  : "border-border hover:bg-muted/50"
              }`}
            >
              <CreditCard className="w-5 h-5 text-amber-500" />
              <span className="text-[11px] font-semibold">{dictionary.common.card}</span>
            </button>
          </div>
        </div>

        {/* Method-specific View */}
        {method === "qr" && (
          <div className="bg-muted/40 border border-border rounded-xl p-4 text-center mb-5">
            <Badge variant="outline" className="mb-2 text-[10px] border-indigo-500/40 text-indigo-400 bg-indigo-500/10">
              OnePay / PromptPay / Universal QR
            </Badge>
            <div className="w-36 h-36 bg-white p-2 rounded-xl mx-auto shadow-md flex items-center justify-center border border-zinc-200">
              {/* Simulated stylized QR SVG */}
              <div className="w-full h-full border-2 border-dashed border-purple-400 rounded-lg flex flex-col items-center justify-center text-zinc-900">
                <QrCode className="w-20 h-20 text-purple-700" />
                <span className="text-[9px] font-bold mt-1 text-purple-900">SCAN TO PAY</span>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">
              {formatPrice(total)} • Auto-confirms upon scanning
            </p>
          </div>
        )}

        {method === "cash" && (
          <div className="space-y-3 bg-muted/30 border border-border rounded-xl p-4 mb-5">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">
                {dictionary.common.receivedAmount} ({currency})
              </label>
              <Input
                type="number"
                value={receivedAmount}
                onChange={(e) => setReceivedAmount(Number(e.target.value))}
                className="font-mono text-sm"
              />
            </div>
            <div className="flex justify-between items-center text-xs pt-1">
              <span className="text-muted-foreground">{dictionary.common.change}:</span>
              <span className={`font-bold font-mono text-sm ${change >= 0 ? "text-emerald-500" : "text-destructive"}`}>
                {formatPrice(change)}
              </span>
            </div>
          </div>
        )}

        {method === "card" && (
          <div className="bg-muted/30 border border-border rounded-xl p-4 text-center mb-5">
            <CreditCard className="w-10 h-10 text-amber-500 mx-auto mb-2 opacity-80" />
            <p className="text-xs font-medium">Ready for Card Tap / Chip Insert</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Simulated POS Card Terminal</p>
          </div>
        )}

        {/* Submit */}
        <Button
          onClick={handleCompletePayment}
          disabled={method === "cash" && receivedAmount < total}
          className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 shadow-lg shadow-primary/20"
        >
          <Check className="w-4 h-4" />
          <span>{dictionary.common.confirmPayment}</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

