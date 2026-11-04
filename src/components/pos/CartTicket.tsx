"use client";

import React from "react";
import { ShoppingCart, Trash2, Plus, Minus, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { type CartTicketProps } from "@/types/pos";
import { useLanguage } from "@/context/LanguageContext";
import { formatCurrency } from "@/lib/formatters";

export function CartTicket({
  cart,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  subtotal,
  tax,
  discount,
  total,
}: CartTicketProps & {
  discountPercent: number;
  setDiscountPercent: (pct: number) => void;
}) {
  const { locale, dictionary } = useLanguage();

  return (
    <Card className="border-border bg-card rounded-2xl shadow-sm flex flex-col h-[calc(100vh-10rem)] max-h-[700px] sticky top-4">
      {/* Cart Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 text-primary" />
          <h3 className="font-bold text-sm text-foreground">{dictionary.common.currentOrder}</h3>
          <Badge variant="secondary" className="text-[10px] h-4 px-1.5">
            {cart.length} {dictionary.common.itemsCount}
          </Badge>
        </div>

        {cart.length > 0 && (
          <Button
            variant="ghost"
            size="xs"
            onClick={onClearCart}
            className="text-muted-foreground hover:text-destructive text-[11px] gap-1 cursor-pointer"
          >
            <Trash2 className="w-3 h-3" />
            <span>{dictionary.common.clearCart}</span>
          </Button>
        )}
      </div>

      {/* Cart Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
            <div className="w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center mb-2 text-muted-foreground/50">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <h4 className="font-semibold text-xs text-foreground mb-1">
              {dictionary.common.emptyCartTitle}
            </h4>
            <p className="text-[11px] max-w-[200px]">
              {dictionary.common.emptyCartDesc}
            </p>
          </div>
        ) : (
          cart.map((item) => {
            const name =
              item.product.name[locale] || item.product.name.en || item.product.name.lo;
            const itemPrice =
              currency === "LAK"
                ? item.product.priceLAK
                : currency === "THB"
                ? item.product.priceTHB
                : item.product.priceUSD;
            const itemSubtotal = itemPrice * item.quantity;

            return (
              <div
                key={item.product.id}
                className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-muted/40 border border-border/60 text-xs"
              >
                <div className="flex-1 min-w-0 pr-1">
                  <p className="font-semibold truncate text-foreground">{name}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    {formatCurrency(itemPrice, currency)}
                  </p>
                </div>

                {/* Stepper */}
                <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-0.5">
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, -1)}
                    className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-5 text-center font-bold text-xs font-mono">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.product.id, 1)}
                    disabled={item.quantity >= item.product.stock}
                    className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground disabled:opacity-30 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-right w-16">
                  <span className="font-bold font-mono text-primary text-xs">
                    {formatCurrency(itemSubtotal, currency)}
                  </span>
                </div>

                <button
                  onClick={() => onRemoveItem(item.product.id)}
                  className="text-muted-foreground/60 hover:text-destructive p-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Calculations & Charge Button */}
      {cart.length > 0 && (
        <div className="p-4 border-t border-border bg-card space-y-3 rounded-b-2xl">
          <Separator />

          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>{dictionary.common.subtotal}:</span>
              <span className="font-mono">{formatCurrency(subtotal, currency)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>{dictionary.common.discount}:</span>
                <span className="font-mono">-{formatCurrency(discount, currency)}</span>
              </div>
            )}

            <div className="flex justify-between text-muted-foreground text-[11px]">
              <span>{dictionary.common.tax}:</span>
              <span className="font-mono">{formatCurrency(tax, currency)}</span>
            </div>

            <div className="flex justify-between items-baseline pt-1">
              <span className="font-bold text-sm text-foreground">
                {dictionary.common.total}:
              </span>
              <span className="font-extrabold text-lg text-primary tracking-tight font-mono">
                {formatCurrency(total, currency)}
              </span>
            </div>
          </div>

          <Button
            onClick={onCheckout}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-md shadow-primary/20 text-sm gap-2 rounded-xl cursor-pointer"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{dictionary.common.checkout}</span>
            <span>({formatCurrency(total, currency)})</span>
          </Button>
        </div>
      )}
    </Card>
  );
}
