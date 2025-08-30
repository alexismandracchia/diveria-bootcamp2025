"use client";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { MdErrorOutline, MdCheckCircleOutline } from "react-icons/md";
import type { ToastType } from "@/context/ToastContext";

interface ToastProps {
  message: string | null;
  type?: ToastType;
  duration?: number;
}

export const Toasts = ({ message, type = "error", duration = 5000 }: ToastProps) => {
  const [visible, setVisible] = useState(false);
  const [showDOM, setShowDOM] = useState(false);

  useEffect(() => {
    if (message) {
      setShowDOM(true);
      setVisible(true); 
      const hideTimer = setTimeout(() => setVisible(false), duration); 
      const removeTimer = setTimeout(() => setShowDOM(false), duration + 500); 
      return () => {
        clearTimeout(hideTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [message, duration]);

  if (!showDOM) return null;

  const bgColor = type === "success" ? "bg-green-600" : "bg-red-900";
  const Icon = type === "success" ? MdCheckCircleOutline : MdErrorOutline;
  const title = type === "success" ? "Success:" : "Error:";

  return ReactDOM.createPortal(
    <div
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-center p-3 sm:p-4 max-w-xs sm:max-w-sm
      text-sm sm:text-base text-white 
      ${bgColor} rounded-lg shadow-lg 
      space-y-2
      transition-opacity transition-transform duration-500 ease-in-out
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      <Icon size={24} />
      <div className="break-words text-center">
        <span className="font-medium">{title}</span> {message}
      </div>
    </div>,
    document.body
  );
};
