"use client";

import { useEffect } from "react";
import { initAuthListener } from "@/hooks/use-auth";
import { seedUserIfEmpty } from "@/lib/firestore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const unsubscribe = initAuthListener((user) => {
      if (user) {
        seedUserIfEmpty(user.uid, {
          email: user.email ?? "",
          firstName: user.displayName?.split(" ")[0] ?? "",
          lastName: user.displayName?.split(" ").slice(1).join(" ") ?? "",
          avatar: user.photoURL ?? "",
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return <>{children}</>;
}
