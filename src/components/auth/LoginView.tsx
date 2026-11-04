"use client";

import React, { useState } from "react";
import {
  Store,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  KeyRound,
  CheckCircle2,
  Globe,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { type DemoUser, type UserRole } from "@/types/pos";
import { type LoginViewProps } from "@/types/auth";
import { type Locale } from "@/locales/types";

interface DemoAccount {
  id: string;
  name: string;
  role: UserRole;
  roleLabel: string;
  email: string;
  pass: string;
  avatar: string;
}

const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: "usr-mgr",
    name: "Nengxiong WANGTOUAXIONG",
    role: "manager",
    roleLabel: "Store Manager",
    email: "manager@JustGoDev.com",
    pass: "mgr123",
    avatar: "NW",
  },
  {
    id: "usr-csh",
    name: "Khamla Xayyavong",
    role: "cashier",
    roleLabel: "Point of Sale Cashier",
    email: "cashier@JustGoDev.com",
    pass: "cash123",
    avatar: "KX",
  },
];

export function LoginView({ onLogin }: LoginViewProps) {
  const { locale, setLocale, dictionary } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const [email, setEmail] = useState("manager@JustGoDev.com");
  const [password, setPassword] = useState("mgr123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedAccountId, setSelectedAccountId] = useState("usr-mgr");

  const handleFillAccount = (acc: DemoAccount) => {
    setEmail(acc.email);
    setPassword(acc.pass);
    setSelectedAccountId(acc.id);
    setErrorMsg("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !password.trim()) {
      setErrorMsg(dictionary.auth.credentialsRequired);
      return;
    }

    const matchedAccount =
      DEMO_ACCOUNTS.find((a) => a.email.toLowerCase() === email.trim().toLowerCase()) ||
      DEMO_ACCOUNTS[0];

    const user: DemoUser = {
      id: matchedAccount.id,
      name: matchedAccount.name,
      role: matchedAccount.role,
      avatar: matchedAccount.avatar,
    };

    onLogin(user);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-muted/20">
      {/* Everything inside a single unified Form Container - Nothing outside */}
      <div className="w-full max-w-lg bg-card rounded-3xl border border-border shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        {/* Top Control Bar inside Form */}
        <div className="flex items-center justify-between pb-3 border-b border-border/60">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Globe className="w-3.5 h-3.5 text-primary" />
            <div className="flex items-center gap-1">
              {(
                [
                  { code: "lo", label: "ລາວ" },
                  { code: "th", label: "ไทย" },
                  { code: "en", label: "EN" },
                ] as const
              ).map((lang) => (
                <button
                  type="button"
                  key={lang.code}
                  onClick={() => setLocale(lang.code as Locale)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all ${
                    locale === lang.code
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={toggleTheme}
            className="h-7 px-2 text-xs gap-1"
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>{dictionary.common.lightMode}</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
                <span>{dictionary.common.darkMode}</span>
              </>
            )}
          </Button>
        </div>

        {/* Brand Banner Inside Form */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-tr from-primary to-purple-600 text-primary-foreground shadow-md shadow-primary/20 mb-1">
            <Store className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            JustGoDev Cloud POS
          </h1>
          <p className="text-xs text-muted-foreground font-medium">
            {dictionary.auth.loginSubtitle}
          </p>
        </div>

        {/* Real Login Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {/* Email / Username Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground block">
              {dictionary.auth.emailLabel}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="manager@JustGoDev.com"
                className="pl-9 h-10 text-xs bg-background"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground block">
              {dictionary.auth.passwordLabel}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-9 pr-9 h-10 text-xs bg-background"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Remember me row */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary h-3.5 w-3.5"
              />
              <span className="text-muted-foreground">{dictionary.auth.rememberMe}</span>
            </label>
            <span className="text-[11px] text-primary hover:underline cursor-pointer">
              {dictionary.auth.forgotPassword}
            </span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-10 text-xs font-bold gap-2 shadow-sm rounded-xl cursor-pointer"
          >
            <span>{dictionary.auth.quickLoginBtn || "ເຂົ້າສູ່ລະບົບ"}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          {/* Demo Credentials Box (เปะ user & password ไว้ในหน้า form) */}
          <div className="pt-2">
            <div className="p-3.5 rounded-2xl bg-muted/40 border border-border/80 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <KeyRound className="w-3.5 h-3.5 text-primary" />
                  <span>{dictionary.auth.demoCredentialsTitle}</span>
                </div>
                <span className="text-[10px] text-muted-foreground font-medium">
                  {dictionary.auth.clickToAutoFill}
                </span>
              </div>

              <div className="space-y-1.5">
                {DEMO_ACCOUNTS.map((acc) => {
                  const isSelected = selectedAccountId === acc.id;
                  const roleLabel =
                    acc.role === "manager"
                      ? dictionary.auth.roleManager
                      : dictionary.auth.roleCashier;

                  return (
                    <button
                      type="button"
                      key={acc.id}
                      onClick={() => handleFillAccount(acc)}
                      className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between group cursor-pointer ${
                        isSelected
                          ? "bg-primary/10 border-primary text-foreground"
                          : "bg-background border-border/60 hover:border-primary/40 text-foreground"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-xs text-foreground">
                            {roleLabel}
                          </span>
                          {isSelected && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] font-mono text-muted-foreground truncate">
                          <span>User: <strong className="text-foreground">{acc.email}</strong></span>
                          <span>•</span>
                          <span>Pass: <strong className="text-foreground">{acc.pass}</strong></span>
                        </div>
                      </div>

                      <span className="text-[10px] font-medium px-2 py-1 rounded-md bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                        {dictionary.auth.fillButton}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </form>

        {/* Developer Credit Inside Form */}
        <div className="pt-2 border-t border-border/60 text-center">
          <p className="text-[11px] text-muted-foreground">
            {dictionary.auth.developerCredit}{" "}
            <span className="font-semibold text-foreground">JustGoDev</span> (Nengxiong WANGTOUAXIONG)
          </p>
        </div>
      </div>
    </div>
  );
}
