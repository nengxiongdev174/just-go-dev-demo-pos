"use client";

import React, { useSyncExternalStore } from "react";
import {
  Globe,
  Coins,
  Sun,
  Moon,
  LogOut,
  CheckCircle2,
  HardDrive,
  Printer,
  Barcode,
  Wifi,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { usePOS } from "@/context/POSContext";
import { type Currency } from "@/types/pos";
import { type Locale } from "@/locales/types";

function emptySubscribe() {
  return () => { };
}

export function SettingsView() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const { locale, setLocale, dictionary } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { user, currency, setCurrency, logout } = usePOS();

  const currencies: { id: Currency; code: string; name: string; symbol: string }[] = [
    { id: "LAK", code: "LAK", name: "ກີບລາວ (LAK)", symbol: "₭" },
    { id: "THB", code: "THB", name: "บาทไทย (THB)", symbol: "฿" },
    { id: "USD", code: "USD", name: "US Dollar (USD)", symbol: "$" },
  ];

  const languages: { id: Locale; label: string; subLabel: string; flag: string }[] = [
    { id: "lo", label: "ພາສາລາວ", subLabel: "Lao", flag: "🇱🇦" },
    { id: "th", label: "ภาษาไทย", subLabel: "Thai", flag: "🇹🇭" },
    { id: "en", label: "English", subLabel: "EN", flag: "🇺🇸" },
  ];

  return (
    <div className="w-full space-y-5">

      {/* 3-Column POS Preference Deck */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Column 1: Cash Register Currency */}
        <Card className="border-border bg-card rounded-2xl shadow-2xs flex flex-col justify-between">
          <CardHeader className="p-4 pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-500" />
              <CardTitle className="text-xs font-bold uppercase tracking-wide text-foreground">
                {dictionary.settings.currencyGroup}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-2 flex-1">
            {currencies.map((curr) => {
              const isSelected = (isMounted ? currency : "LAK") === curr.id;
              return (
                <button
                  type="button"
                  key={curr.id}
                  onClick={() => setCurrency(curr.id)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${isSelected
                      ? "bg-primary/10 border-primary ring-1 ring-primary shadow-xs"
                      : "bg-background border-border/70 hover:bg-muted/40"
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`h-7 w-7 rounded-lg flex items-center justify-center font-bold text-xs ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                      {curr.symbol}
                    </span>
                    <span className={`text-xs font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}>
                      {curr.name}
                    </span>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  )}
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Column 2: Terminal Language */}
        <Card className="border-border bg-card rounded-2xl shadow-2xs flex flex-col justify-between">
          <CardHeader className="p-4 pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-500" />
              <CardTitle className="text-xs font-bold uppercase tracking-wide text-foreground">
                {dictionary.settings.languageGroup}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-2 flex-1">
            {languages.map((item) => {
              const isSelected = locale === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setLocale(item.id)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${isSelected
                      ? "bg-primary/10 border-primary ring-1 ring-primary shadow-xs"
                      : "bg-background border-border/70 hover:bg-muted/40"
                    }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg leading-none select-none">{item.flag}</span>
                    <span className={`text-xs font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}>
                      {item.label}
                    </span>
                  </div>
                  {isSelected && (
                    <Badge variant="default" className="text-[9px] py-0 px-1.5 rounded-md">
                      {dictionary.settings.activeBadge}
                    </Badge>
                  )}
                </button>
              );
            })}

            <div className="pt-2">
              <div className="p-2.5 rounded-xl bg-muted/40 border border-border/60 text-center">
                <span className="text-[10px] text-muted-foreground block">
                  Zero-Reload Architecture
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                  Instant Locale Synchronization
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Column 3: Terminal Display & Shift Mode */}
        <Card className="border-border bg-card rounded-2xl shadow-2xs flex flex-col justify-between">
          <CardHeader className="p-4 pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-purple-500" />
              <CardTitle className="text-xs font-bold uppercase tracking-wide text-foreground">
                {dictionary.settings.themeGroup}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-2 flex-1">
            <div className="grid grid-cols-2 gap-2 h-full">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${theme === "light"
                    ? "bg-primary/10 border-primary ring-1 ring-primary shadow-xs"
                    : "bg-background border-border/70 hover:bg-muted/40"
                  }`}
              >
                <div className="h-8 w-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Sun className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-foreground">
                  {dictionary.common.lightMode}
                </span>
                {theme === "light" && (
                  <Badge variant="default" className="text-[9px] py-0 px-1.5 rounded-md">
                    {dictionary.settings.activeBadge}
                  </Badge>
                )}
              </button>

              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${theme === "dark"
                    ? "bg-primary/10 border-primary ring-1 ring-primary shadow-xs"
                    : "bg-background border-border/70 hover:bg-muted/40"
                  }`}
              >
                <div className="h-8 w-8 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center border border-indigo-900">
                  <Moon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-foreground">
                  {dictionary.common.darkMode}
                </span>
                {theme === "dark" && (
                  <Badge variant="default" className="text-[9px] py-0 px-1.5 rounded-md">
                    {dictionary.settings.activeBadge}
                  </Badge>
                )}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom POS Hardware & LocalStorage Status Bar */}
      <div className="p-4 rounded-2xl bg-card border border-border shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-primary" />
            <span>LocalStorage Database Active</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Printer className="w-3.5 h-3.5 text-emerald-500" />
            <span>Thermal Receipt Ready</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Barcode className="w-3.5 h-3.5 text-indigo-500" />
            <span>Barcode Scanner Hooked</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px]">
          <Wifi className="w-3.5 h-3.5 text-emerald-500" />
          <span>JustGoDev Sandbox • Client-only Execution</span>
        </div>
      </div>
      {/* POS Station Quick Status & Operator Bar (No page title/subtitle) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
            {isMounted && user ? user.avatar : "NX"}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-foreground truncate">
                {isMounted && user ? user.name : "Cashier Station"}
              </span>
              <Badge variant="outline" className="text-[10px] py-0 px-2 h-4 border-primary/40 text-primary uppercase font-mono">
                {isMounted && user ? (user.role === "manager" ? dictionary.auth.roleManager : dictionary.auth.roleCashier) : "POS"}
              </Badge>
              <Badge variant="secondary" className="text-[9px] py-0 px-1.5 h-4 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Station #01 Online</span>
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              JustGoDev Cloud POS Register • ID: {user?.id || "usr-01"}
            </p>
          </div>
        </div>

        {/* Prominent Quick Sign-Out Button */}
        <Button
          variant="destructive"
          onClick={logout}
          className="h-9 px-4 text-xs font-bold gap-2 rounded-xl shadow-xs cursor-pointer shrink-0"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>{dictionary.settings.logoutButton}</span>
        </Button>
      </div>
    </div>
  );
}
