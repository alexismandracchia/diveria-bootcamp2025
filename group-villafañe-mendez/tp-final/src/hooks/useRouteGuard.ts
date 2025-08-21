'use client'

import { useAuth } from '../context/AuthProvider';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { PATH } from '@/lib/common';

type RouteType = "public" | "private";

export function useRouteGuard(type: RouteType) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (type === "private" && !isAuthenticated) {
      router.push(PATH.LOGIN);
    }

    if (type === "public" && isAuthenticated && pathname === PATH.LOGIN) {
      router.push(PATH.DASHBOARD);
    }
  }, [isAuthenticated, type, router, pathname]);

  return { isAuthenticated };
}
