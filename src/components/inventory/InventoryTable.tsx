"use client";

import React, { useState } from "react";
import { Plus, Boxes, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLanguage } from "@/context/LanguageContext";
import { formatCurrency } from "@/lib/formatters";
import { type InventoryTableProps } from "@/types/inventory";

export function InventoryTable({
  products,
  currency,
  onOpenEdit,
  onOpenAdd,
}: InventoryTableProps) {
  const { locale, dictionary } = useLanguage();
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.name.en.toLowerCase().includes(q) ||
      p.name.th.toLowerCase().includes(q) ||
      p.name.lo.toLowerCase().includes(q) ||
      p.barcode.includes(q)
    );
  });

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "drinks":
        return dictionary.common.categoryDrinks;
      case "food":
        return dictionary.common.categoryFood;
      case "retail":
        return dictionary.common.categoryRetail;
      case "electronics":
        return dictionary.common.categoryElectronics;
      default:
        return cat;
    }
  };

  return (
    <div className="space-y-6">
      {/* Catalog Table Card */}
      <Card className="border-border bg-card rounded-2xl shadow-2xs">
        <CardHeader className="p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Boxes className="w-4 h-4 text-primary" />
            <CardTitle className="text-sm font-bold">{dictionary.common.catalogItems}</CardTitle>
            <Badge variant="secondary" className="text-[10px] rounded-lg ml-1">
              {products.length} {dictionary.common.itemsCount}
            </Badge>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={dictionary.common.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 text-xs h-8 rounded-xl bg-muted/40"
              />
            </div>

            <Button
              size="sm"
              onClick={onOpenAdd}
              className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 text-xs shadow-md shadow-primary/20 rounded-xl cursor-pointer shrink-0 h-8"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{dictionary.common.addProduct}</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">SKU</TableHead>
                <TableHead className="text-xs">{dictionary.common.productName}</TableHead>
                <TableHead className="text-xs">{dictionary.common.category}</TableHead>
                <TableHead className="text-xs text-right">{dictionary.common.price}</TableHead>
                <TableHead className="text-xs text-center">{dictionary.common.stock}</TableHead>
                <TableHead className="text-xs text-center">{dictionary.common.action}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-xs text-muted-foreground">
                    {dictionary.common.noProductsFound}
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((p) => {
                  const displayPrice =
                    currency === "LAK"
                      ? p.priceLAK
                      : currency === "THB"
                      ? p.priceTHB
                      : p.priceUSD;

                  const isLow = p.stock <= 5 && p.stock > 0;
                  const isOut = p.stock <= 0;
                  const mainName = p.name[locale] || p.name.lo || p.name.en;
                  const altNames = [
                    locale !== "lo" ? p.name.lo : null,
                    locale !== "th" ? p.name.th : null,
                    locale !== "en" ? p.name.en : null,
                  ].filter(Boolean).join(" • ");

                  return (
                    <TableRow key={p.id} className="text-xs">
                      <TableCell className="font-mono text-muted-foreground text-[11px]">
                        {p.barcode}
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-foreground">
                          {mainName}
                        </div>
                        {altNames && (
                          <div className="text-[10px] text-muted-foreground">
                            {altNames}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-[10px] capitalize rounded-md">
                          {getCategoryLabel(p.category)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono font-bold">
                        {formatCurrency(displayPrice, currency)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={isOut ? "destructive" : isLow ? "warning" : "secondary"}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-lg"
                        >
                          {isOut ? dictionary.common.outOfStock : `${p.stock} ${dictionary.common.units}`}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onOpenEdit(p)}
                          className="h-7 px-3 text-xs gap-1.5 rounded-xl border-border hover:border-primary/50 hover:bg-primary/5 text-foreground hover:text-primary transition-all cursor-pointer"
                        >
                          <SlidersHorizontal className="w-3.5 h-3.5" />
                          <span>{dictionary.common.edit}</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

