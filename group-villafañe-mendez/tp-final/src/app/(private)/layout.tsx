"use client";

import type { ReactNode } from "react";
import { useRouteGuard } from "@/hooks/useRouteGuard";
import FullScreenLoader from "@/components/loaders/FullScreenLoader";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isAuthLoading } = useRouteGuard("private");

  if (isAuthLoading || !isAuthenticated) {
    return <FullScreenLoader message="Redirigiendo..." />;
  }

  return <>{children}</>;
}
