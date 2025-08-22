'use client'
import { createContext, ReactNode, useContext } from "react";
import {useAppState} from "../hooks/useAppState";
import { AppState } from "../types/app.types";

const AppContext = createContext<AppState | undefined>(undefined );

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const appState = useAppState();

  return (
    <AppContext.Provider value={appState}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = (): AppState => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};