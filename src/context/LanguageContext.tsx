"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import { type Locale, type TranslationSchema } from "@/locales/types";
import { lo } from "@/locales/lo";
import { th } from "@/locales/th";
import { en } from "@/locales/en";

const dictionaries: Record<Locale, TranslationSchema> = { lo, th, en };

interface LanguageContextType {
  locale: Locale;
  dictionary: TranslationSchema;
  setLocale: (next: Locale) => void;
  isPending: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "lo",
  dictionary: lo,
  setLocale: () => {},
  isPending: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("nx_portfolio_lang") as Locale | null;
        if (saved && (saved === "lo" || saved === "th" || saved === "en")) {
          return saved;
        }
      } catch {
        // Fallback
      }
    }
    return "lo";
  });

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: Locale) => {
    startTransition(() => {
      setLocaleState(next);
      try {
        localStorage.setItem("nx_portfolio_lang", next);
      } catch {
        // Ignore storage errors
      }
    });
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        dictionary: dictionaries[locale],
        setLocale,
        isPending,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
