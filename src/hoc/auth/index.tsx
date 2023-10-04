"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/firebase/config";
import useAuthStore from "@/store/useAuthStore";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (result) => {
      if (result) {
        setUser(result);
        router.push("/snippets");
      } else {
        setUser(null);
        router.push("/signin");
      }
      setLoading(false);
    });

    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, router]);

  if (loading) {
    return null;
  }

  return <>{children}</>;
}
