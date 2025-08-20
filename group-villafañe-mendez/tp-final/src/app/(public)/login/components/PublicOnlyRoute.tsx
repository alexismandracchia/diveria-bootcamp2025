'use client';

import { useRouteGuard } from '../../../../hooks/useRouteGuard';

export function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  useRouteGuard("public");

  return <>{children}</>;
}
