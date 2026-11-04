"use client";

import {
  Search,
  Plus,
  Coffee,
  Wine,
  CupSoda,
  Soup,
  Flame,
  Croissant,
  Sparkles,
  ShoppingBag,
  Zap,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { type Product } from "@/types/pos";
import { type ProductCatalogGridProps } from "@/types/pos";
import { useLanguage } from "@/context/LanguageContext";
import { formatCurrency } from "@/lib/formatters";

export function ProductCatalogGrid({
  products,
  currency,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onAddToCart,
}: ProductCatalogGridProps) {
  const { locale, dictionary } = useLanguage();

  const categories = [
    { id: "all", label: dictionary.common.allCategories },
    { id: "drinks", label: dictionary.common.categoryDrinks },
    { id: "food", label: dictionary.common.categoryFood },
    { id: "retail", label: dictionary.common.categoryRetail },
    { id: "electronics", label: dictionary.common.categoryElectronics },
  ]; 

  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case "Coffee":
        return <Coffee className="w-5 h-5" />;
      case "Wine":
        return <Wine className="w-5 h-5" />;
      case "CupSoda":
        return <CupSoda className="w-5 h-5" />;
      case "Soup":
        return <Soup className="w-5 h-5" />;
      case "Flame":
        return <Flame className="w-5 h-5" />;
      case "Croissant":
        return <Croissant className="w-5 h-5" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5" />;
      case "Zap":
        return <Zap className="w-5 h-5" />;
      case "Headphones":
        return <Headphones className="w-5 h-5" />;
      default:
        return <ShoppingBag className="w-5 h-5" />;
    }
  };

  const getProductPrice = (product: Product): number => {
    if (currency === "LAK") return product.priceLAK;
    if (currency === "THB") return product.priceTHB;
    return product.priceUSD;
  };

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === "all" || p.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.name.lo.toLowerCase().includes(q) ||
      p.name.th.toLowerCase().includes(q) ||
      p.name.en.toLowerCase().includes(q) ||
      p.barcode.includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={dictionary.common.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 bg-card border-border rounded-xl text-xs placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === c.id
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border/80 hover:border-zinc-300"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Product Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {filteredProducts.map((p) => {
          const name = p.name[locale] || p.name.en || p.name.lo;
          const isOut = p.stock <= 0;
          const isLow = p.stock > 0 && p.stock <= 5;
          const itemPrice = getProductPrice(p);

          return (
            <Card
              key={p.id}
              onClick={() => !isOut && onAddToCart(p)}
              className={`group relative overflow-hidden transition-all duration-200 border-border bg-card rounded-2xl flex flex-col justify-between ${
                isOut
                  ? "opacity-50 cursor-not-allowed bg-muted/30"
                  : "hover:border-primary/50 hover:shadow-md cursor-pointer hover:-translate-y-0.5 active:scale-[0.98]"
              }`}
            >
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-1 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${p.color} text-white flex items-center justify-center shadow-2xs`}
                    >
                      {getProductIcon(p.icon)}
                    </div>

                    {isOut ? (
                      <Badge variant="destructive" className="text-[10px] px-1.5 py-0 h-4">
                        {dictionary.common.outOfStock}
                      </Badge>
                    ) : isLow ? (
                      <Badge variant="warning" className="text-[10px] px-1.5 py-0 h-4">
                        {dictionary.common.lowStock} ({p.stock})
                      </Badge>
                    ) : (
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {dictionary.common.remaining} {p.stock}
                      </span>
                    )}
                  </div>

                  <h4 className="font-semibold text-xs leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                    {name}
                  </h4>
                </div>

                <div className="mt-4 pt-2.5 border-t border-border/60 flex items-center justify-between">
                  <span className="font-bold text-sm text-primary tracking-tight font-mono">
                    {formatCurrency(itemPrice, currency)}
                  </span>
                  <Button
                    size="icon-xs"
                    variant="secondary"
                    disabled={isOut}
                    className="rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
