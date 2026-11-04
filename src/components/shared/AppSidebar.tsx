"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ShoppingBag,
  Boxes,
  Settings,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { usePOS } from "@/context/POSContext";
import { type UserRole } from "@/types/pos";

function emptySubscribe() {
  return () => { };
}

export function AppSidebar() {
  const pathname = usePathname();
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const { dictionary } = useLanguage();
  const { user } = usePOS();

  const allNavItems = [
    {
      href: "/dashboard",
      label: dictionary.common.dashboardTitle,
      icon: BarChart3,
      color: "text-indigo-600",
      roles: ["manager"] as UserRole[],
    },
    {
      href: "/pos",
      label: dictionary.common.posTitle,
      icon: ShoppingBag,
      color: "text-purple-600",
      roles: ["cashier"] as UserRole[],
    },
    {
      href: "/inventory",
      label: dictionary.common.inventoryTitle,
      icon: Boxes,
      color: "text-emerald-600",
      roles: ["manager"] as UserRole[],
    },
    {
      href: "/settings",
      label: dictionary.common.settingsTitle,
      icon: Settings,
      color: "text-sky-600",
      roles: ["manager", "cashier"] as UserRole[],
    },
  ];

  const userRole: UserRole = user?.role || "manager";
  const navItems = allNavItems.filter((item) => item.roles.includes(userRole));
  const homeHref = userRole === "cashier" ? "/pos" : "/dashboard";

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <aside className="w-64 bg-card border-r border-border shrink-0 flex flex-col justify-between hidden md:flex h-screen sticky top-0 shadow-xs z-30">
        <div className="p-5 flex flex-col h-full">
          {/* Brand Header */}
          <Link href={homeHref} className="flex items-center gap-4 pb-5 border-b border-border/80">
            <div className="w-16 relative flex items-center justify-center shrink-0">
              <Image
                src="/jgd-latets-logo-no-bg.png"
                alt="JustGoDev Logo"
                width={100}
                height={100}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="min-w-0">
              <span className="font-bold text-sm tracking-tight text-foreground block">
                JustGoDev
              </span>
              <p className="text-[11px] text-muted-foreground font-medium truncate mt-0.5">
                Demo - POS
              </p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="mt-6 space-y-1.5">
            {/* <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-3 mb-2 block">
              {dictionary.common.menu}
            </span> */}

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${isActive
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                    }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-primary-foreground" : item.color}`} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Bottom Section - User Profile Footer */}
          <div className="mt-auto pt-4 border-t border-border/80">
            {isMounted && user ? (
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-muted/40 border border-border/60">
                <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  {user.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-xs truncate text-foreground leading-none">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-primary font-medium mt-1 leading-none">
                    {user.role === "manager" ? dictionary.auth.roleManager : dictionary.auth.roleCashier}
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-12 w-full rounded-xl bg-muted/20 border border-border/30" />
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-40 bg-card border-b border-border p-3 flex items-center justify-between">
        <Link href={homeHref} className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-xs">
            NX
          </div>
          <div>
            <span className="font-bold text-xs">JustGoDev POS</span>
            <span className="text-[10px] text-muted-foreground block -mt-0.5">
              {userRole === "manager" ? dictionary.auth.roleManager : dictionary.auth.roleCashier}
            </span>
          </div>
        </Link>

        {/* Mobile Nav Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`p-2 rounded-lg text-xs transition-colors ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                title={item.label}
              >
                <Icon className="w-4 h-4" />
              </Link>
            );
          })}
        </div>
      </header>
    </>
  );
}
