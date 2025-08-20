'use client'

import type { ReactNode } from 'react';
import { useRouteGuard } from '@/hooks/useRouteGuard';

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useRouteGuard("private");

  if (!isAuthenticated) {
    return <p>Redirigiendo...</p>;
  }

  return <>{children}</>;
}
