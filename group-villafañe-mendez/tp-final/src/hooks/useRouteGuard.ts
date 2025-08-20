'use client'

import { useAuth } from '../context/AuthProvider';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

type RouteType = "public" | "private";

export function useRouteGuard(type: RouteType) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (type === "private" && !isAuthenticated) {
      router.push("/login");
    }

    if (type === "public" && isAuthenticated && pathname === "/login") {
      router.push("/dashboard");
    }
  }, [isAuthenticated, type, router, pathname]);

  return { isAuthenticated };
}
