"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Store,
  UserCheck,
  Globe,
  Sun,
  Moon,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { type DemoUser, type UserRole } from "@/types/pos";
import { type Locale } from "@/locales/types";

interface LoginViewProps {
  onLogin: (user: DemoUser) => void;
}

export function LoginView({ onLogin }: LoginViewProps) {
  const { locale, setLocale, dictionary } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const [selectedRole, setSelectedRole] = useState<UserRole>("manager");
  const [customName, setCustomName] = useState<string>("");

  const handleQuickLogin = (roleToUse: UserRole = selectedRole) => {
    const defaultName = roleToUse === "manager" ? "Nengxiong (Manager)" : "Khamla (Cashier)";
    const user: DemoUser = {
      id: `u-${Date.now()}`,
      name: customName.trim() || defaultName,
      role: roleToUse,
      avatar: (customName.trim() || defaultName).slice(0, 2).toUpperCase(),
    };
    onLogin(user);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fbfbfe] dark:bg-[#09090b] text-foreground p-4 sm:p-6 transition-colors">
      {/* Top Navbar on Login Screen */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between py-3">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-sm shadow-sm">
            NX
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-foreground block">
              JUSTGODEV
            </span>
            <span className="text-[11px] text-muted-foreground block -mt-0.5">
              Cloud POS Platform
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="flex items-center bg-card rounded-lg p-1 border border-border shadow-2xs text-xs">
            <Globe className="w-3.5 h-3.5 text-muted-foreground ml-1 mr-1" />
            {(["lo", "th", "en"] as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                  locale === l
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l === "lo" ? "ລາວ" : l === "th" ? "ไทย" : "EN"}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <Button variant="outline" size="icon" onClick={toggleTheme} className="h-8 w-8 border-border">
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </Button>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto my-auto py-8">
        {/* Notice Card for Customer */}
        <div className="mb-4 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40 rounded-2xl p-4 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-primary text-white shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-xs text-primary">
                {dictionary.auth.demoNoticeBadge}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                {dictionary.auth.demoNoticeText}
              </p>
            </div>
          </div>
        </div>

        <Card className="border border-border shadow-xl bg-card rounded-2xl">
          <CardHeader className="text-center pb-3 pt-6">
            <div className="h-12 w-12 rounded-2xl bg-purple-100 dark:bg-purple-900/40 text-primary flex items-center justify-center mx-auto mb-2.5">
              <Store className="w-6 h-6" />
            </div>
            <CardTitle className="text-xl font-bold tracking-tight">
              {dictionary.auth.loginTitle}
            </CardTitle>
            <CardDescription className="text-xs">
              {dictionary.auth.loginSubtitle}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pb-6">
            {/* Role Switcher */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-2">
                {dictionary.auth.selectRole}
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <div
                  onClick={() => setSelectedRole("manager")}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    selectedRole === "manager"
                      ? "border-primary bg-purple-50/60 dark:bg-purple-950/40 ring-1 ring-primary shadow-xs"
                      : "border-border hover:border-zinc-300 dark:hover:border-zinc-700 bg-card"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-foreground">{dictionary.auth.roleManager}</span>
                    {selectedRole === "manager" && <ShieldCheck className="w-4 h-4 text-primary" />}
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug">
                    {dictionary.auth.roleManagerDesc}
                  </p>
                </div>

                <div
                  onClick={() => setSelectedRole("cashier")}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    selectedRole === "cashier"
                      ? "border-primary bg-purple-50/60 dark:bg-purple-950/40 ring-1 ring-primary shadow-xs"
                      : "border-border hover:border-zinc-300 dark:hover:border-zinc-700 bg-card"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-foreground">{dictionary.auth.roleCashier}</span>
                    {selectedRole === "cashier" && <UserCheck className="w-4 h-4 text-primary" />}
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug">
                    {dictionary.auth.roleCashierDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Custom Name */}
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1">
                {locale === "lo"
                  ? "ຊື່ຜູ້ເຂົ້າໃຊ້ງານ (ສາມາດໃສ່ຊື່ທ່ານໄດ້):"
                  : locale === "th"
                  ? "ชื่อผู้เข้าใช้งาน (สามารถระบุชื่อคุณได้):"
                  : "Cashier / Staff Name (Optional):"}
              </label>
              <Input
                placeholder={selectedRole === "manager" ? "Nengxiong" : "Khamla"}
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="text-xs h-10 rounded-xl"
              />
            </div>

            {/* 1-Click Login Button */}
            <Button
              onClick={() => handleQuickLogin(selectedRole)}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm shadow-md shadow-primary/20 gap-2 rounded-xl"
            >
              <span>{dictionary.auth.quickLoginBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-muted-foreground">
        <p>
          {dictionary.common.poweredBy} •{" "}
          <a
            href="https://justgodev.com"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline font-semibold"
          >
            justgodev.com
          </a>
        </p>
      </footer>
    </div>
  );
}
