"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePOS } from "@/context/POSContext";
import { LoginView } from "@/components/auth/LoginView";

export default function LoginPage() {
  const { user, login, isMounted } = usePOS();
  const router = useRouter();

  useEffect(() => {
    if (isMounted && user) {
      router.replace("/dashboard");
    }
  }, [isMounted, user, router]);

  if (!isMounted) {
    return null;
  }

  return <LoginView onLogin={login} />;
}

