import { CENTRAL_PRODUCTS, CENTRAL_INITIAL_ORDERS } from "@/data/mockData";
import { type Product, type Order, type Currency, type DemoUser } from "@/types/pos";

export const TTL_DURATION_MS = 3 * 60 * 60 * 1000; // 3 Hours

const KEYS = {
  SESSION_START: "nx_demo_session_created_at",
  PRODUCTS: "nx_demo_products",
  ORDERS: "nx_demo_orders",
  CURRENCY: "nx_demo_currency",
  USER: "nx_demo_user",
};

export function initOrCheckSession(): { expired: boolean; remainingMs: number } {
  if (typeof window === "undefined") {
    return { expired: false, remainingMs: TTL_DURATION_MS };
  }

  const now = Date.now();
  const rawStart = localStorage.getItem(KEYS.SESSION_START);

  if (!rawStart) {
    resetToDefaultData();
    return { expired: false, remainingMs: TTL_DURATION_MS };
  }

  const startTime = parseInt(rawStart, 10);
  const elapsed = now - startTime;

  if (isNaN(startTime) || elapsed >= TTL_DURATION_MS || elapsed < 0) {
    resetToDefaultData();
    return { expired: true, remainingMs: TTL_DURATION_MS };
  }

  return { expired: false, remainingMs: TTL_DURATION_MS - elapsed };
}

export function resetToDefaultData(): void {
  if (typeof window === "undefined") return;

  const now = Date.now();
  try {
    localStorage.setItem(KEYS.SESSION_START, now.toString());
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(CENTRAL_PRODUCTS));
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(CENTRAL_INITIAL_ORDERS));
    localStorage.setItem(KEYS.CURRENCY, "LAK");
    const existingUser = localStorage.getItem(KEYS.USER);
    if (!existingUser) {
      const defaultUser: DemoUser = {
        id: "u-1",
        name: "Nengxiong",
        role: "manager",
        avatar: "NX",
      };
      localStorage.setItem(KEYS.USER, JSON.stringify(defaultUser));
    }
  } catch (err) {
    console.error("Failed to write to localStorage:", err);
  }
}

export function getStoredProducts(): Product[] {
  if (typeof window === "undefined") return CENTRAL_PRODUCTS;
  try {
    const raw = localStorage.getItem(KEYS.PRODUCTS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return CENTRAL_PRODUCTS;
}

export function saveStoredProducts(products: Product[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
  } catch {}
}

export function getStoredOrders(): Order[] {
  if (typeof window === "undefined") return CENTRAL_INITIAL_ORDERS;
  try {
    const raw = localStorage.getItem(KEYS.ORDERS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return CENTRAL_INITIAL_ORDERS;
}

export function saveStoredOrders(orders: Order[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
  } catch {}
}

export function getStoredCurrency(): Currency {
  if (typeof window === "undefined") return "LAK";
  try {
    const raw = localStorage.getItem(KEYS.CURRENCY) as Currency | null;
    if (raw === "LAK" || raw === "THB" || raw === "USD") return raw;
  } catch {}
  return "LAK";
}

export function saveStoredCurrency(currency: Currency): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEYS.CURRENCY, currency);
  } catch {}
}

export function getStoredUser(): DemoUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEYS.USER);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

export function saveStoredUser(user: DemoUser | null): void {
  if (typeof window === "undefined") return;
  try {
    if (user) {
      localStorage.setItem(KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEYS.USER);
    }
  } catch {}
}
