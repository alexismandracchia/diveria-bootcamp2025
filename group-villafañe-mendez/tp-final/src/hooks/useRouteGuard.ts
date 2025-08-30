'use client'

import { useAuth } from '../context/AuthProvider';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { PATH } from '@/lib/common';

type RouteType = "auth" | "private";

export function useRouteGuard(type: RouteType) {
  const { isAuthenticated, isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    if (type === "private" && !isAuthenticated) {
      router.push(PATH.LOGIN);
    }

    if (type === "auth" && isAuthenticated) {
      router.push(PATH.DASHBOARD);
    }
    
  }, [isAuthenticated, type, router]);

  return { isAuthenticated, isAuthLoading };
}
