"use client";

import React, { useState } from "react";
import {
  Search,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Tag,
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
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  type Product,
  type CartItem,
  type Currency,
  type Order,
  type DemoUser,
} from "@/types/pos";
import { useLanguage } from "@/context/LanguageContext";
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
  const { locale, dictionary } = useLanguage();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const getProductPrice = (product: Product): number => {
    if (currency === "LAK") return product.priceLAK;
    if (currency === "THB") return product.priceTHB;
    return product.priceUSD;
  };

  const formatPrice = (amount: number): string => {
    if (currency === "LAK") {
      return `₭ ${Math.round(amount).toLocaleString()}`;
    } else if (currency === "THB") {
      return `฿ ${amount.toFixed(2)}`;
    }
    return `$ ${amount.toFixed(2)}`;
  };

  const filteredProducts = products.filter((p) => {
    const matchesCat =
      selectedCategory === "all" || p.category === selectedCategory;
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.name.lo.toLowerCase().includes(q) ||
      p.name.th.toLowerCase().includes(q) ||
      p.name.en.toLowerCase().includes(q) ||
      p.barcode.includes(q);
    return matchesCat && matchesSearch;
  });

  const addToCart = (product: Product) => {
    if (product.stock <= 0) return;
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id);
      if (idx >= 0) {
        if (prev[idx].quantity >= product.stock) return prev;
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + 1 };
        return copy;
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            if (nextQty > item.product.stock) return item;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setDiscountPercent(0);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + getProductPrice(item.product) * item.quantity,
    0
  );
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = taxableAmount * 0.07;
  const total = taxableAmount + tax;

  const handleOrderSuccess = (newOrder: Order) => {
    const updatedProducts = products.map((prod) => {
      const inCart = cart.find((c) => c.product.id === prod.id);
      if (inCart) {
        return {
          ...prod,
          stock: Math.max(0, prod.stock - inCart.quantity),
        };
      }
      return prod;
    });

    onOrderCompleted(newOrder, updatedProducts);
    setShowPaymentModal(false);
    setCompletedOrder(newOrder);
    clearCart();
  };

  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case "Coffee": return <Coffee className="w-5 h-5" />;
      case "Wine": return <Wine className="w-5 h-5" />;
      case "CupSoda": return <CupSoda className="w-5 h-5" />;
      case "Soup": return <Soup className="w-5 h-5" />;
      case "Flame": return <Flame className="w-5 h-5" />;
      case "Croissant": return <Croissant className="w-5 h-5" />;
      case "Sparkles": return <Sparkles className="w-5 h-5" />;
      case "ShoppingBag": return <ShoppingBag className="w-5 h-5" />;
      case "Zap": return <Zap className="w-5 h-5" />;
      case "Headphones": return <Headphones className="w-5 h-5" />;
      default: return <Tag className="w-5 h-5" />;
    }
  };

  const categories = [
    { id: "all", label: dictionary.common.allCategories },
    { id: "drinks", label: dictionary.common.categoryDrinks },
    { id: "food", label: dictionary.common.categoryFood },
    { id: "retail", label: dictionary.common.categoryRetail },
    { id: "electronics", label: dictionary.common.categoryElectronics },
  ];

  return (
    <div className="space-y-6">
      {/* Top Search & Category Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder={dictionary.common.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border h-10 rounded-xl text-xs shadow-2xs"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all font-medium cursor-pointer ${
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

      {/* Main Grid: Products (Left) & Cart Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Products Grid (8 cols) */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {filteredProducts.map((p) => {
              const name = p.name[locale] || p.name.en || p.name.lo;
              const isOut = p.stock <= 0;
              const isLow = p.stock > 0 && p.stock <= 5;
              const itemPrice = getProductPrice(p);

              return (
                <Card
                  key={p.id}
                  onClick={() => !isOut && addToCart(p)}
                  className={`group relative overflow-hidden transition-all duration-200 border-border bg-card rounded-2xl flex flex-col justify-between ${
                    isOut
                      ? "opacity-50 cursor-not-allowed bg-muted/30"
                      : "hover:border-primary/50 hover:shadow-md cursor-pointer hover:-translate-y-0.5 active:scale-[0.98]"
                  }`}
                >
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Top icon and stock badge */}
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
                            {p.stock} pcs
                          </span>
                        )}
                      </div>

                      <h4 className="font-semibold text-xs leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                        {name}
                      </h4>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-border/60 flex items-center justify-between">
                      <span className="font-bold text-sm text-primary tracking-tight font-mono">
                        {formatPrice(itemPrice)}
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

        {/* Cart Ticket Panel (4 cols) */}
        <div className="lg:col-span-4">
          <Card className="border-border bg-card rounded-2xl shadow-sm flex flex-col h-[calc(100vh-10rem)] max-h-[700px] sticky top-4">
            {/* Cart Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-primary" />
                <h3 className="font-bold text-sm text-foreground">Current Order</h3>
                <Badge variant="secondary" className="text-[10px] h-4 px-1.5">
                  {cart.length} {dictionary.common.itemsCount}
                </Badge>
              </div>

              {cart.length > 0 && (
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={clearCart}
                  className="text-muted-foreground hover:text-destructive text-[11px] gap-1"
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
                    item.product.name[locale] ||
                    item.product.name.en ||
                    item.product.name.lo;
                  const itemPrice = getProductPrice(item.product);
                  const itemSubtotal = itemPrice * item.quantity;

                  return (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-muted/40 border border-border/60 text-xs"
                    >
                      <div className="flex-1 min-w-0 pr-1">
                        <p className="font-semibold truncate text-foreground">{name}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">
                          {formatPrice(itemPrice)}
                        </p>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center gap-1 bg-card border border-border rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center font-bold text-xs font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground disabled:opacity-30 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right w-16">
                        <span className="font-bold font-mono text-primary text-xs">
                          {formatPrice(itemSubtotal)}
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
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
                {/* Discount options */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{dictionary.common.discount} (%):</span>
                  <div className="flex items-center gap-1">
                    {[0, 5, 10, 15].map((pct) => (
                      <button
                        key={pct}
                        onClick={() => setDiscountPercent(pct)}
                        className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all cursor-pointer ${
                          discountPercent === pct
                            ? "bg-primary text-primary-foreground font-bold shadow-2xs"
                            : "bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{dictionary.common.subtotal}:</span>
                    <span className="font-mono">{formatPrice(subtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>{dictionary.common.discount}:</span>
                      <span className="font-mono">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-muted-foreground text-[11px]">
                    <span>{dictionary.common.tax}:</span>
                    <span className="font-mono">{formatPrice(tax)}</span>
                  </div>

                  <div className="flex justify-between items-baseline pt-1">
                    <span className="font-bold text-sm text-foreground">
                      {dictionary.common.total}:
                    </span>
                    <span className="font-extrabold text-lg text-primary tracking-tight font-mono">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                {/* Big Charge Button */}
                <Button
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-md shadow-primary/20 text-sm gap-2 rounded-xl cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{dictionary.common.checkout}</span>
                  <span>({formatPrice(total)})</span>
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Payment Modal */}
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

      {/* Printable Thermal Receipt Modal */}
      {completedOrder && (
        <ReceiptModal
          order={completedOrder}
          onClose={() => setCompletedOrder(null)}
        />
      )}
    </div>
  );
}
