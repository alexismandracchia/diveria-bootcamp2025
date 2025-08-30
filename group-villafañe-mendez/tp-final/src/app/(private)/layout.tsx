"use client";

import type { ReactNode } from "react";
import { useRouteGuard } from "@/hooks/useRouteGuard";
import FullScreenLoader from "@/components/loaders/FullScreenLoader";
import { ProductProvider } from "../../context/ProductContext";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isAuthLoading } = useRouteGuard("private");

  if (isAuthLoading || !isAuthenticated) {
    return <FullScreenLoader message="Redirecting..." />;
  }

  return (
    <>
      <ProductProvider>{children}</ProductProvider>
    </>
  );
}
