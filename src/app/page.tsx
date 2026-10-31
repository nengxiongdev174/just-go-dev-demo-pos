"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePOS } from "@/context/POSContext";

export default function RootPage() {
  const router = useRouter();
  const { user, isMounted } = usePOS();

  useEffect(() => {
    if (isMounted) {
      if (user) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    }
  }, [isMounted, user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="flex flex-col items-center gap-2.5">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold animate-pulse shadow-sm">
          NX
        </div>
        <span className="text-xs text-muted-foreground font-mono">Loading JUSTGODEV POS...</span>
      </div>
    </div>
  );
}
