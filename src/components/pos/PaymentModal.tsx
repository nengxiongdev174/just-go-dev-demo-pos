"use client";

import React from "react";
import { Banknote, QrCode, CreditCard, X, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { type PaymentModalProps } from "@/types/pos";
import { useLanguage } from "@/context/LanguageContext";
import { formatCurrency } from "@/lib/formatters";
import { usePaymentModal } from "@/hooks/usePaymentModal";

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
  const {
    method,
    setMethod,
    receivedAmount,
    setReceivedAmount,
    change,
    handleCompletePayment,
  } = usePaymentModal(
    items,
    subtotal,
    tax,
    discount,
    total,
    currency,
    cashierName,
    onSuccess
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-card text-card-foreground border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-base font-bold mb-1">{dictionary.common.paymentMethod}</h3>
        <p className="text-xs text-muted-foreground mb-4">
          {dictionary.payment.selectChannelDesc}
        </p>

        {/* Method selector */}
        <div className="grid grid-cols-3 gap-2.5 mb-5">
          <button
            type="button"
            onClick={() => setMethod("qr")}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs gap-1.5 transition-all cursor-pointer ${
              method === "qr"
                ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                : "border-border hover:bg-muted/50 text-muted-foreground"
            }`}
          >
            <QrCode className="w-5 h-5" />
            <span>QR Code</span>
          </button>

          <button
            type="button"
            onClick={() => setMethod("cash")}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs gap-1.5 transition-all cursor-pointer ${
              method === "cash"
                ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                : "border-border hover:bg-muted/50 text-muted-foreground"
            }`}
          >
            <Banknote className="w-5 h-5" />
            <span>{dictionary.common.cash}</span>
          </button>

          <button
            type="button"
            onClick={() => setMethod("card")}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs gap-1.5 transition-all cursor-pointer ${
              method === "card"
                ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                : "border-border hover:bg-muted/50 text-muted-foreground"
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span>{dictionary.common.card}</span>
          </button>
        </div>

        {/* Detail Content per method */}
        <div className="bg-muted/30 border border-border/60 rounded-xl p-4 mb-5 text-xs">
          {method === "qr" && (
            <div className="flex flex-col items-center text-center space-y-2 py-2">
              <div className="p-3 bg-white rounded-xl shadow-xs border border-border">
                <QrCode className="w-28 h-28 text-slate-900" />
              </div>
              <Badge variant="outline" className="text-[10px] bg-indigo-50 dark:bg-indigo-950 text-indigo-600 border-indigo-200">
                BCEL OnePay / PromptPay Dynamic QR
              </Badge>
              <p className="text-[11px] text-muted-foreground">
                {dictionary.payment.scanQrDesc}
              </p>
            </div>
          )}

          {method === "cash" && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{dictionary.common.total}:</span>
                <span className="font-bold text-sm font-mono text-foreground">
                  {formatCurrency(total, currency)}
                </span>
              </div>

              <div>
                <label className="text-muted-foreground block mb-1">
                  {dictionary.common.receivedAmount}:
                </label>
                <Input
                  type="number"
                  placeholder="0"
                  value={receivedAmount}
                  onChange={(e) => setReceivedAmount(e.target.value)}
                  className="font-mono text-sm font-bold rounded-xl"
                />
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-border/60">
                <span className="text-muted-foreground">{dictionary.common.change}:</span>
                <span className="font-extrabold text-base font-mono text-emerald-600">
                  {formatCurrency(change, currency)}
                </span>
              </div>
            </div>
          )}

          {method === "card" && (
            <div className="text-center py-4 space-y-1.5">
              <CreditCard className="w-8 h-8 text-muted-foreground mx-auto" />
              <p className="font-semibold text-foreground">{dictionary.payment.cardTapSwipe}</p>
              <p className="text-[11px] text-muted-foreground">
                {dictionary.payment.cardSupportDesc}
              </p>
            </div>
          )}
        </div>

        {/* Total Summary */}
        <div className="flex justify-between items-baseline mb-4 px-1">
          <span className="text-xs text-muted-foreground">{dictionary.payment.finalCharge}:</span>
          <span className="font-extrabold text-lg text-primary font-mono">
            {formatCurrency(total, currency)}
          </span>
        </div>

        {/* Action Button */}
        <Button
          onClick={handleCompletePayment}
          disabled={method === "cash" && (Number(receivedAmount) || 0) < total}
          className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl text-xs gap-2 cursor-pointer shadow-md shadow-primary/20"
        >
          <Check className="w-4 h-4" />
          <span>{dictionary.payment.confirmOrder}</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
