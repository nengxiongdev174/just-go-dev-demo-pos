"use client";

import React from "react";
import {
  ShoppingBag,
  BarChart3,
  Boxes,
  Sun,
  Moon,
  LogOut,
  User,
  Coins,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { type Currency, type DemoUser } from "@/types/pos";
import { type Locale } from "@/locales/types";

interface NavbarProps {
  activeTab: "pos" | "dashboard" | "inventory";
  setActiveTab: (tab: "pos" | "dashboard" | "inventory") => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  user: DemoUser | null;
  onLogout: () => void;
}

export function Navbar({
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
  user,
  onLogout,
}: NavbarProps) {
  const { locale, setLocale, dictionary } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Tabs */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab("pos")}>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white font-bold shadow-md shadow-purple-500/20">
              NX
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-sm tracking-tight gradient-brand-text block">
                JUSTGODEV
              </span>
              <span className="text-[11px] font-medium text-muted-foreground block -mt-1">
                Cloud POS
              </span>
            </div>
          </div>

          {/* Nav Navigation */}
          <nav className="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border/50">
            <button
              onClick={() => setActiveTab("pos")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === "pos"
                  ? "bg-card text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-primary" />
              <span>{dictionary.common.posTitle}</span>
            </button>

            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === "dashboard"
                  ? "bg-card text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-indigo-500" />
              <span>{dictionary.common.dashboardTitle}</span>
            </button>

            <button
              onClick={() => setActiveTab("inventory")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeTab === "inventory"
                  ? "bg-card text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Boxes className="w-3.5 h-3.5 text-emerald-500" />
              <span className="hidden md:inline">{dictionary.common.inventoryTitle}</span>
            </button>
          </nav>
        </div>

        {/* Controls: Currency, Lang, Theme, User */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Switcher */}
          <div className="flex items-center bg-muted/50 rounded-lg p-0.5 border border-border/40 text-xs">
            <Coins className="w-3.5 h-3.5 text-muted-foreground ml-2 mr-1 hidden sm:inline" />
            {(["LAK", "THB", "USD"] as Currency[]).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                  currency === curr
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {curr === "LAK" ? "₭ LAK" : curr === "THB" ? "฿ THB" : "$ USD"}
              </button>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="flex items-center bg-muted/50 rounded-lg p-0.5 border border-border/40 text-xs">
            <Globe className="w-3.5 h-3.5 text-muted-foreground ml-2 mr-1 hidden sm:inline" />
            {(["lo", "th", "en"] as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                  locale === l
                    ? "bg-card text-foreground font-semibold shadow-xs border border-border/60"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l === "lo" ? "ລາວ" : l === "th" ? "ไทย" : "EN"}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            title="Toggle Dark / Light"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </Button>

          {/* User Info & Logout */}
          {user && (
            <div className="flex items-center gap-2 pl-2 border-l border-border">
              <div className="hidden lg:flex flex-col items-end text-right">
                <span className="text-xs font-semibold leading-none">{user.name}</span>
                <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-4 mt-0.5 border-primary/30 text-primary">
                  {user.role === "manager" ? dictionary.auth.roleManager : dictionary.auth.roleCashier}
                </Badge>
              </div>

              <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary font-bold text-xs">
                {user.avatar || <User className="w-4 h-4" />}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={onLogout}
                className="h-8 w-8 text-destructive/80 hover:text-destructive hover:bg-destructive/10"
                title={dictionary.auth.logout}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

