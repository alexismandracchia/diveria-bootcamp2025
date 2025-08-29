"use client";

import { useRouteGuard } from "@/hooks/useRouteGuard";
import FullScreenLoader from "@/components/loaders/FullScreenLoader";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isAuthLoading } = useRouteGuard("auth");

  if (isAuthLoading || isAuthenticated) {
    return (
      <FullScreenLoader message="Redirecting..."/>
    );
  }

  return <>{children}</>;
}
