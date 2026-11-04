"use client";

import React from "react";
import { Layers, QrCode, Banknote, CreditCard, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Product } from "@/types/pos";
import { useLanguage } from "@/context/LanguageContext";

interface PaymentChannelsCardProps {
  lowStockProducts: Product[];
}

export function PaymentChannelsCard({ lowStockProducts }: PaymentChannelsCardProps) {
  const { locale, dictionary } = useLanguage();

  const paymentBreakdown = [
    { label: "QR Code (OnePay / PromptPay)", percent: 56, icon: QrCode, color: "text-indigo-600" },
    { label: dictionary.common.cash, percent: 32, icon: Banknote, color: "text-emerald-600" },
    { label: dictionary.common.card, percent: 12, icon: CreditCard, color: "text-amber-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Payment Method Share */}
      <Card className="border-border bg-card rounded-2xl shadow-2xs p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <span className="font-bold text-xs text-foreground flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-primary" />
            {dictionary.dashboard.paymentChannels}
          </span>
          <span className="text-[10px] text-muted-foreground">{dictionary.dashboard.distribution}</span>
        </div>

        <div className="space-y-3">
          {paymentBreakdown.map((pm) => {
            const Icon = pm.icon;
            return (
              <div key={pm.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <Icon className={`w-3.5 h-3.5 ${pm.color}`} />
                    <span>{pm.label}</span>
                  </span>
                  <span className="font-bold font-mono text-xs">{pm.percent}%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    style={{ width: `${pm.percent}%` }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Low Stock Alerts */}
      <Card className="border-border bg-card rounded-2xl shadow-2xs">
        <CardHeader className="p-4 border-b border-border flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <CardTitle className="text-xs font-bold text-foreground">
              {dictionary.dashboard.inventoryAlerts}
            </CardTitle>
          </div>
          <Badge variant="warning" className="text-[10px] py-0 rounded-md">
            {lowStockProducts.length}
          </Badge>
        </CardHeader>

        <CardContent className="p-4 space-y-2">
          {lowStockProducts.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-2">
              {dictionary.dashboard.allInventoryHealthy}
            </p>
          ) : (
            lowStockProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-2 rounded-xl bg-muted/40 border border-border text-xs"
              >
                <div className="min-w-0 pr-2">
                  <p className="font-semibold truncate text-foreground text-[11px]">
                    {p.name[locale] || p.name.lo || p.name.en}
                  </p>
                  <span className="text-[9px] text-muted-foreground font-mono">
                    SKU: {p.barcode}
                  </span>
                </div>

                <Badge
                  variant={p.stock <= 0 ? "destructive" : "warning"}
                  className="text-[9px] font-mono px-1.5 py-0 shrink-0 rounded-md"
                >
                  {p.stock <= 0 ? dictionary.common.outOfStock : `${p.stock} ${dictionary.dashboard.left}`}
                </Badge>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

