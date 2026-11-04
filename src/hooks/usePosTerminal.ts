import { useState, useMemo } from "react";
import { type Product, type CartItem, type Currency, type Order } from "@/types/pos";

export function usePosTerminal(
  products: Product[],
  currency: Currency,
  onOrderCompleted: (order: Order, updatedProducts: Product[]) => void
) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

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
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price =
        currency === "LAK"
          ? item.product.priceLAK
          : currency === "THB"
          ? item.product.priceTHB
          : item.product.priceUSD;
      return sum + price * item.quantity;
    }, 0);
  }, [cart, currency]);

  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = taxableAmount * 0.07;
  const total = taxableAmount + tax;

  const handleOrderSuccess = (order: Order) => {
    const updatedProducts = products.map((prod) => {
      const cartItem = cart.find((ci) => ci.product.id === prod.id);
      if (cartItem) {
        return {
          ...prod,
          stock: Math.max(0, prod.stock - cartItem.quantity),
        };
      }
      return prod;
    });

    onOrderCompleted(order, updatedProducts);
    setShowPaymentModal(false);
    setCart([]);
    setCompletedOrder(order);
  };

  return {
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
  };
}
