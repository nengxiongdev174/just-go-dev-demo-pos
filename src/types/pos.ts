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

// POS Component Props Types
export interface PosTerminalProps {
  products: Product[];
  currency: Currency;
  onOrderCompleted: (order: Order, updatedProducts: Product[]) => void;
}

export interface ProductCatalogGridProps {
  products: Product[];
  currency: Currency;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onAddToCart: (product: Product) => void;
}

export interface CartTicketProps {
  cart: CartItem[];
  currency: Currency;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
}

export interface PaymentModalProps {
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

export interface ReceiptModalProps {
  order: Order | null;
  onClose: () => void;
}
