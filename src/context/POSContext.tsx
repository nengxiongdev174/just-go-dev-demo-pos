"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  initOrCheckSession,
  getStoredProducts,
  saveStoredProducts,
  getStoredOrders,
  saveStoredOrders,
  getStoredCurrency,
  saveStoredCurrency,
  getStoredUser,
  saveStoredUser,
} from "@/lib/storage";
import { CENTRAL_PRODUCTS, CENTRAL_INITIAL_ORDERS } from "@/data/mockData";
import { type Product, type Order, type Currency, type DemoUser } from "@/types/pos";

interface POSState {
  user: DemoUser | null;
  products: Product[];
  orders: Order[];
  currency: Currency;
}

const SERVER_SNAPSHOT: POSState = {
  user: null,
  products: CENTRAL_PRODUCTS,
  orders: CENTRAL_INITIAL_ORDERS,
  currency: "LAK",
};

let clientSnapshot: POSState = SERVER_SNAPSHOT;
let isClientInitialized = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getClientSnapshot(): POSState {
  if (typeof window === "undefined") {
    return SERVER_SNAPSHOT;
  }
  if (!isClientInitialized) {
    isClientInitialized = true;
    initOrCheckSession();
    clientSnapshot = {
      user: getStoredUser(),
      products: getStoredProducts(),
      orders: getStoredOrders(),
      currency: getStoredCurrency(),
    };
  }
  return clientSnapshot;
}

function updateState(updater: (prev: POSState) => POSState) {
  clientSnapshot = updater(getClientSnapshot());
  listeners.forEach((listener) => listener());
}

interface POSContextType {
  user: DemoUser | null;
  products: Product[];
  orders: Order[];
  currency: Currency;
  isMounted: boolean;
  login: (user: DemoUser) => void;
  logout: () => void;
  setCurrency: (curr: Currency) => void;
  handleOrderCompleted: (order: Order, updatedProducts: Product[]) => void;
  handleUpdateProducts: (updatedProducts: Product[]) => void;
}

const POSContext = createContext<POSContextType | null>(null);

export function POSProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const state = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    () => SERVER_SNAPSHOT
  );

  const isMounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    if (isMounted && !state.user && pathname !== "/login") {
      router.replace("/login");
    }
  }, [isMounted, state.user, pathname, router]);

  const login = (newUser: DemoUser) => {
    saveStoredUser(newUser);
    updateState((prev) => ({ ...prev, user: newUser }));
    router.push("/dashboard");
  };

  const logout = () => {
    saveStoredUser(null);
    updateState((prev) => ({ ...prev, user: null }));
    router.push("/login");
  };

  const setCurrency = (curr: Currency) => {
    saveStoredCurrency(curr);
    updateState((prev) => ({ ...prev, currency: curr }));
  };

  const handleOrderCompleted = (newOrder: Order, updatedProducts: Product[]) => {
    const nextOrders = [...state.orders, newOrder];
    saveStoredOrders(nextOrders);
    saveStoredProducts(updatedProducts);
    updateState((prev) => ({
      ...prev,
      orders: nextOrders,
      products: updatedProducts,
    }));
  };

  const handleUpdateProducts = (updatedProducts: Product[]) => {
    saveStoredProducts(updatedProducts);
    updateState((prev) => ({ ...prev, products: updatedProducts }));
  };

  return (
    <POSContext.Provider
      value={{
        user: state.user,
        products: state.products,
        orders: state.orders,
        currency: state.currency,
        isMounted,
        login,
        logout,
        setCurrency,
        handleOrderCompleted,
        handleUpdateProducts,
      }}
    >
      {children}
    </POSContext.Provider>
  );
}

export function usePOS() {
  const context = useContext(POSContext);
  if (!context) {
    throw new Error("usePOS must be used within a POSProvider");
  }
  return context;
}
