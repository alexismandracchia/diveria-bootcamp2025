"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Toasts } from "@/components/toasts/Toasts";

interface ToastContextProps {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const showToast = (message: string) => {
    setToast(message);
    setVisible(true);
    setTimeout(() => setVisible(false), 5000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toasts message={toast} visible={visible} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe usarse dentro de un ToastProvider");
  }
  return context;
};
