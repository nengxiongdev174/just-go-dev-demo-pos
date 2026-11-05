import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { POSProvider } from "@/context/POSContext";

export const metadata: Metadata = {
  title: "JustGoDev • Live Demo",
  description: "Next-Gen Cloud POS & Retail Management Suite by JustGoDev - Multilingual (Lao, Thai, English) with Realtime LocalStorage Sandbox",
  icons: {
    icon: "/jgd-latets-logo.png",
    shortcut: "/jgd-latets-logo.png",
    apple: "/jgd-latets-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lo" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <POSProvider>
              {children}
            </POSProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
