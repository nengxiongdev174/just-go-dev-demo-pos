"use client";

import React from "react";
import { Printer, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { type ReceiptModalProps } from "@/types/pos";
import { useLanguage } from "@/context/LanguageContext";
import { formatCurrency } from "@/lib/formatters";

export function ReceiptModal({ order, onClose }: ReceiptModalProps) {
  const { dictionary } = useLanguage();

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto print:fixed print:inset-0 print:bg-white print:p-0 print:m-0 print:z-auto print:block">
      <div className="bg-card text-card-foreground border border-border rounded-2xl max-w-sm w-full p-6 shadow-2xl relative my-8 print:border-none print:shadow-none print:p-0 print:m-0 print:w-full print:max-w-none print:bg-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground cursor-pointer print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Receipt Paper */}
        <div id="printable-receipt" className="bg-white text-zinc-900 rounded-xl p-5 shadow-inner border border-zinc-200 font-mono text-xs print:border-none print:shadow-none print:p-0 print:m-0 print:w-full">
          <div className="text-center mb-4">
            <h2 className="font-bold text-base tracking-tight">JustGoDev CLOUD POS</h2>
            <p className="text-[10px] text-zinc-500">VIENTIANE, LAO PDR • TEL: +856 20 77 426 238</p>
            <p className="text-[10px] text-zinc-400">JustGoDev.com</p>
          </div>

          <Separator className="my-2 bg-zinc-200 border-dashed" />

          <div className="space-y-1 text-[11px] mb-3">
            <div className="flex justify-between">
              <span className="text-zinc-500">{dictionary.common.orderId}:</span>
              <span className="font-bold">{order.orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">{dictionary.common.dateTime}:</span>
              <span>{order.createdAt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">{dictionary.payment.cashier}:</span>
              <span>{order.cashierName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">{dictionary.common.paymentMethod}:</span>
              <span className="uppercase font-semibold text-primary">{order.paymentMethod}</span>
            </div>
          </div>

          <Separator className="my-2 bg-zinc-200" />

          {/* Items */}
          <div className="space-y-2 mb-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start text-[11px]">
                <div className="flex-1 pr-2">
                  <div className="font-semibold text-zinc-800">{item.name}</div>
                  <div className="text-[10px] text-zinc-400">
                    {item.quantity} x {formatCurrency(item.price, order.currency)}
                  </div>
                </div>
                <div className="font-bold text-zinc-800">
                  {formatCurrency(item.subtotal, order.currency)}
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-2 bg-zinc-200 border-dashed" />

          {/* Totals */}
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-zinc-500">{dictionary.common.subtotal}</span>
              <span>{formatCurrency(order.subtotal, order.currency)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>{dictionary.common.discount}</span>
                <span>-{formatCurrency(order.discount, order.currency)}</span>
              </div>
            )}
            <div className="flex justify-between text-zinc-500">
              <span>{dictionary.common.tax}</span>
              <span>{formatCurrency(order.tax, order.currency)}</span>
            </div>
            <Separator className="my-1.5 bg-zinc-300" />
            <div className="flex justify-between text-sm font-bold text-zinc-900">
              <span>{dictionary.common.total}</span>
              <span className="text-purple-700">{formatCurrency(order.total, order.currency)}</span>
            </div>
          </div>

          <div className="text-center mt-5 pt-3 border-t border-dashed border-zinc-200 text-[10px] text-zinc-400">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
            <p>{dictionary.payment.thankYou}</p>
            <p className="text-[9px] mt-0.5">Interactive Demo Sandbox • JustGoDev</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-4 print:hidden">
          <Button
            variant="outline"
            className="flex-1 gap-1.5"
            onClick={handlePrint}
          >
            <Printer className="w-4 h-4" />
            <span>{dictionary.common.printReceipt}</span>
          </Button>

          <Button
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={onClose}
          >
            {dictionary.common.close}
          </Button>
        </div>
      </div>
    </div>
  );
}

