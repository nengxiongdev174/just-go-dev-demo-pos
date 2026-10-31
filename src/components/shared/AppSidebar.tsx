"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  ShoppingBag,
  Boxes,
  Sun,
  Moon,
  LogOut,
  Globe,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { usePOS } from "@/context/POSContext";
import { type Currency } from "@/types/pos";
import { type Locale } from "@/locales/types";

function emptySubscribe() {
  return () => {};
}

export function AppSidebar() {
  const pathname = usePathname();
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const { locale, setLocale, dictionary } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { user, currency, setCurrency, logout } = usePOS();

  const navItems = [
    {
      href: "/dashboard",
      label: dictionary.common.dashboardTitle,
      icon: BarChart3,
      color: "text-indigo-600",
    },
    {
      href: "/pos",
      label: dictionary.common.posTitle,
      icon: ShoppingBag,
      color: "text-purple-600",
    },
    {
      href: "/inventory",
      label: dictionary.common.inventoryTitle,
      icon: Boxes,
      color: "text-emerald-600",
    },
  ];

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <aside className="w-64 bg-card border-r border-border shrink-0 flex flex-col justify-between hidden md:flex h-screen sticky top-0 shadow-xs z-30">
        <div className="p-5 flex flex-col h-full">
          {/* Brand Header */}
          <Link href="/dashboard" className="flex items-center gap-3 pb-5 border-b border-border/80">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white font-bold text-base shadow-sm">
              NX
            </div>
            <div className="min-w-0">
              <span className="font-bold text-sm tracking-tight text-foreground block">
                JUSTGODEV
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] text-muted-foreground font-medium">
                  Cloud POS • Online
                </span>
              </div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="mt-6 space-y-1.5">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-3 mb-2 block">
              Menu
            </span>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                    isActive
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

          {/* Preferences Section */}
          <div className="mt-auto pt-6 border-t border-border/80 space-y-4">
            {/* Currency Switcher */}
            <div>
              <div className="flex items-center justify-between text-[11px] text-muted-foreground font-medium mb-1.5 px-1">
                <span className="flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5" />
                  <span>{dictionary.common.currency}</span>
                </span>
                <span className="font-mono font-bold text-foreground">
                  {isMounted ? currency : "LAK"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1 bg-muted/60 p-1 rounded-lg border border-border/60">
                {(["LAK", "THB", "USD"] as Currency[]).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                      (isMounted ? currency : "LAK") === curr
                        ? "bg-card text-foreground font-bold shadow-xs border border-border/50"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {curr === "LAK" ? "₭ LAK" : curr === "THB" ? "฿ THB" : "$ USD"}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Switcher */}
            <div>
              <div className="flex items-center justify-between text-[11px] text-muted-foreground font-medium mb-1.5 px-1">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" />
                  <span>Language</span>
                </span>
                <span className="font-semibold text-foreground">
                  {locale === "lo" ? "ພາສາລາວ" : locale === "th" ? "ไทย" : "English"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1 bg-muted/60 p-1 rounded-lg border border-border/60">
                {(["lo", "th", "en"] as Locale[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={`py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                      locale === l
                        ? "bg-card text-foreground font-bold shadow-xs border border-border/50"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l === "lo" ? "ລາວ" : l === "th" ? "ไทย" : "EN"}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Toggle & Logout */}
            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="gap-1.5 text-xs h-8 px-2.5 border-border"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Dark Mode</span>
                  </>
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="h-8 px-2 text-destructive hover:bg-destructive/10 gap-1 text-xs"
                title={dictionary.auth.logout}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{dictionary.auth.logout}</span>
              </Button>
            </div>

            {/* User Profile Footer */}
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
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-xs">
            NX
          </div>
          <div>
            <span className="font-bold text-xs">JUSTGODEV POS</span>
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-muted-foreground">{isMounted ? currency : "LAK"}</span>
            </div>
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
                className={`p-2 rounded-lg text-xs transition-colors ${
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
                title={item.label}
              >
                <Icon className="w-4 h-4" />
              </Link>
            );
          })}
          <Button variant="ghost" size="icon" onClick={logout} className="h-8 w-8 text-destructive">
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>
    </>
  );
}
