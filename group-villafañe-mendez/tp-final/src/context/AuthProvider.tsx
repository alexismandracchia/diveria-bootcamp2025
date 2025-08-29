"use client";

import { createContext, useContext, ReactNode } from "react";
import { useAuthState } from "./useAuthState";
import FullScreenLoader from "@/components/loaders/FullScreenLoader";

type AuthContextType = ReturnType<typeof useAuthState>;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuthState();
  if (auth.isAuthLoading) {
    return (
      <FullScreenLoader message="Verifying session..."/>
    );
  }
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
