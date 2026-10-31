export type Currency = "LAK" | "THB" | "USD";

export type ProductCategory = "food" | "drinks" | "retail" | "electronics";

export interface Product {
  id: string;
  name: {
    lo: string;
    th: string;
    en: string;
  };
  category: ProductCategory;
  priceLAK: number;
  priceTHB: number;
  priceUSD: number;
  stock: number;
  barcode: string;
  icon: string;
  color: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  currency: Currency;
  paymentMethod: "cash" | "qr" | "card";
  cashierName: string;
  createdAt: string;
  timestamp: number;
}

export type UserRole = "manager" | "cashier";

export interface DemoUser {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}

